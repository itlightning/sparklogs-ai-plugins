// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Packaging gates: the checks that decide whether an installed plugin actually works, as opposed to
// whether it merely renders. Each one exists because its absence shipped a defect:
//   a. an MCP entry with a url and no transport is silently dropped by Claude
//   b. a {{args}} placeholder no host expands leaves the command body reading as literal mustache
//   c. a corpus citation that does not resolve from the citing file makes the skill's references dead
//   d. Desktop has no plugin namespace, so command files must start with <plugin>-
//      (Claude Code then invokes /<plugin>:<plugin>-x). Cursor render must not prefix again.
//   e. a rules file without frontmatter is ignored by Cursor
//   f. a README that points at a file the package does not contain
//   g. the host's own validator, when it is on the machine

import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { assertRepoRoot } from './assert-repo-root.mjs';
import {
  DIST_ROOT_DOCS,
  DIST_ROOT_FILES,
  HOSTS,
  HOST_LAYOUT,
  METADATA_FILE,
} from './dist-layout.mjs';
import { CLAUDE_ROOT_TOKEN, CORPUS_TOPS, isPlaceholderRef } from './host-transforms.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, process.argv[2] ?? 'build/dist');

// Same shape as the render-time citation matcher, widened twice over: to accept the forms the render
// produces (a ${CLAUDE_PLUGIN_ROOT} anchor, a run of ../, a references/ hop), and to accept the forms
// the render CANNOT produce (./ and src/ prefixes). The second group is the point: a prefixed citation
// is invisible to the rewriter, so if one reaches a package it must be resolved here or it ships dead.
const SHIPPED_REF_RE = new RegExp(
  '(?<![\\w./$-])(?:\\$\\{CLAUDE_PLUGIN_ROOT\\}/|(?:\\.{1,2}/)+|src/|references/)?'
  + `(?:${CORPUS_TOPS.join('|')})/[A-Za-z0-9<][A-Za-z0-9._/<>-]*?(?:\\.md|/)(?![\\w-])`,
  'g',
);

// A backticked token in a README that names a file rather than a command or a shell variable.
const README_PATH_RE = /`([.A-Za-z0-9][\w./-]*)`/g;

const failures = [];

function fail(message) {
  failures.push(message);
}

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir, acc = []) {
  for (const entry of (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

function pkgBase(host) {
  return path.join(DIST, 'plugins', host, 'sparklogs');
}

/** a. Every MCP server entry that names a url must declare its transport. */
async function checkMcpTransport() {
  for (const file of await walkFiles(DIST)) {
    if (!file.endsWith('.json')) continue;
    let parsed;
    try {
      parsed = JSON.parse(await fs.readFile(file, 'utf8'));
    } catch {
      fail(`${path.relative(DIST, file)} is not valid JSON`);
      continue;
    }
    const servers = parsed?.mcpServers;
    if (!servers || typeof servers !== 'object') continue;
    for (const [name, entry] of Object.entries(servers)) {
      if (!entry?.url) continue;
      if (!entry.type) {
        fail(`${path.relative(DIST, file)}: mcpServers.${name} has a url but no type`);
      }
    }
  }
}

/** b. No mustache argument placeholder survives anywhere, in source or in the rendered tree. */
async function checkNoMustacheArgs() {
  for (const dir of [path.join(ROOT, 'src'), DIST]) {
    for (const file of await walkFiles(dir)) {
      if (!file.endsWith('.md') && !file.endsWith('.json')) continue;
      if ((await fs.readFile(file, 'utf8')).includes('{{args}}')) {
        fail(`${path.relative(ROOT, file)} contains {{args}}, which no host expands`);
      }
    }
  }
}

/** c. Every corpus citation in shipped markdown resolves to a real file from the citing directory. */
async function checkCorpusRefsResolve() {
  let checked = 0;
  for (const host of HOSTS) {
    const base = pkgBase(host);
    if (!await exists(base)) continue;
    for (const file of await walkFiles(base)) {
      if (!file.endsWith('.md')) continue;
      const rel = path.relative(base, file).split(path.sep).join('/');
      const text = await fs.readFile(file, 'utf8');
      for (const match of text.matchAll(SHIPPED_REF_RE)) {
        const ref = match[0];
        if (isPlaceholderRef(ref)) continue;
        checked += 1;
        const anchored = ref.startsWith(CLAUDE_ROOT_TOKEN);
        if (anchored && host !== 'claude') {
          fail(`${host}/${rel}: ${ref} anchors on a Claude token in a non-Claude package`);
          continue;
        }
        const target = anchored
          ? path.join(base, ref.slice(`${CLAUDE_ROOT_TOKEN}/`.length))
          : path.join(path.dirname(file), ref);
        if (!await exists(target)) {
          fail(`${host}/${rel}: ${ref} does not resolve (looked for ${path.relative(base, target)})`);
        }
      }
    }
  }
  if (checked === 0) fail('corpus citation check matched nothing; the matcher is broken');
  return checked;
}

// A package is host-specific, so its prose must be too. Each rule names the host property that makes
// the text true; anywhere else the same sentence is a promise the installed plugin cannot keep.
// Scope is package markdown only. The dist root is cross-host by design and describes every variant.
const HOST_PROSE_RULES = [
  {
    what: 'Claude command syntax',
    pattern: /\/sparklogs:[a-z][a-z-]*/g,
    allowed: (host) => host === 'claude',
  },
  {
    what: 'Cursor command invocation',
    pattern: /(?<!\w)\/sparklogs-(?:summary|explain)\b/g,
    allowed: (host) => host === 'cursor',
  },
  {
    what: 'a slash-command claim',
    pattern: /slash[ -]commands?/gi,
    allowed: (host) => HOST_LAYOUT[host].commands,
  },
  {
    what: 'a commands/ path',
    pattern: /(?<![\w./-])commands\//g,
    allowed: (host) => HOST_LAYOUT[host].commands,
  },
];

/** M2. Host-specific prose may only ship to the host it is true for. */
async function checkHostProse() {
  for (const host of HOSTS) {
    const base = pkgBase(host);
    if (!await exists(base)) continue;
    for (const file of await walkFiles(base)) {
      if (!file.endsWith('.md')) continue;
      const rel = path.relative(base, file).split(path.sep).join('/');
      const text = await fs.readFile(file, 'utf8');
      for (const rule of HOST_PROSE_RULES) {
        if (rule.allowed(host)) continue;
        const hits = [...text.matchAll(rule.pattern)].map((match) => match[0]);
        if (hits.length > 0) {
          fail(`${host}/${rel}: ships ${rule.what} (${[...new Set(hits)].sort().join(', ')}), which is not true for this host`);
        }
      }
    }
  }
}

/** d. Desktop has no plugin namespace; command files must carry the plugin prefix. */
async function checkCommandNames() {
  const metadata = JSON.parse(await fs.readFile(path.join(ROOT, METADATA_FILE), 'utf8'));
  const plugin = metadata.name;
  const roots = [path.join(ROOT, 'src', 'commands')];
  for (const host of HOSTS) {
    const dir = path.join(pkgBase(host), 'commands');
    if (await exists(dir)) roots.push(dir);
  }
  for (const dir of roots) {
    for (const name of await fs.readdir(dir)) {
      if (!name.endsWith('.md')) continue;
      if (!name.startsWith(`${plugin}-`)) {
        fail(`${path.relative(ROOT, path.join(dir, name))} must start with ${plugin}- so Desktop's picker matches skill naming`);
      }
    }
  }
}

/** e. Cursor ignores a rules file that has no frontmatter. */
async function checkCursorRules() {
  const dir = path.join(pkgBase('cursor'), 'rules');
  if (!await exists(dir)) {
    fail('cursor package ships no rules/ directory');
    return;
  }
  for (const file of await walkFiles(dir)) {
    if (!file.endsWith('.md')) continue;
    const rel = path.relative(DIST, file);
    const text = await fs.readFile(file, 'utf8');
    if (!text.startsWith('---\n')) {
      fail(`${rel} has no frontmatter; Cursor ignores it`);
      continue;
    }
    const end = text.indexOf('\n---\n', 4);
    if (end < 0) {
      fail(`${rel} frontmatter is unterminated`);
      continue;
    }
    const data = yaml.load(text.slice(4, end));
    if (!data || typeof data !== 'object' || !data.description) {
      fail(`${rel} frontmatter needs a description`);
    }
  }
}

/** f. Every file path a package README names exists in the published tree. */
async function checkReadmeLinks() {
  for (const host of HOSTS) {
    const base = pkgBase(host);
    const file = path.join(base, 'README.md');
    if (!await exists(file)) {
      fail(`${host} package has no README.md`);
      continue;
    }
    const text = await fs.readFile(file, 'utf8');
    const tokens = new Set();
    for (const match of text.matchAll(README_PATH_RE)) tokens.add(match[1]);
    for (const match of text.matchAll(/\]\((?!https?:)([^)\s]+)\)/g)) tokens.add(match[1]);
    for (const token of [...tokens].sort()) {
      const looksLikePath = token.includes('/') || /\.(json|md|toml)$/.test(token);
      if (!looksLikePath) continue;
      if (token.endsWith('.toml')) continue; // user config outside the package
      const inPackage = await exists(path.join(base, token));
      const inDist = await exists(path.join(DIST, token));
      if (!inPackage && !inDist) {
        fail(`${host}/README.md names ${token}, which is in neither the package nor the published root`);
      }
    }
  }
}

/**
 * M7. The dist root is the repository's landing page, so its relative links have to resolve THERE.
 * A doc written for a checkout can link at files the published tree does not carry; either the link
 * is rewritten or the doc stays on `source`.
 */
async function checkDistRootLinks() {
  const roots = [
    ...['README.md', ...DIST_ROOT_FILES].map((name) => path.join(DIST, name)),
    ...(await Promise.all(DIST_ROOT_DOCS.map(async (dir) => (
      await exists(path.join(DIST, dir)) ? walkFiles(path.join(DIST, dir)) : []
    )))).flat(),
  ];
  for (const file of roots) {
    if (!file.endsWith('.md') || !await exists(file)) continue;
    const rel = path.relative(DIST, file).split(path.sep).join('/');
    const text = await fs.readFile(file, 'utf8');
    for (const match of text.matchAll(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target) continue;
      if (!await exists(path.resolve(path.dirname(file), target))) {
        fail(`${rel} links to ${target}, which the published tree does not contain`);
      }
    }
  }
}

/** g. The host's own validator, when the CLI is installed. */
function checkClaudeCli() {
  const probe = spawnSync('claude', ['--version'], { encoding: 'utf8' });
  if (probe.status !== 0) {
    console.log('claude CLI not available; skipping `claude plugin validate`');
    return;
  }
  const base = pkgBase('claude');
  try {
    const out = execFileSync('claude', ['plugin', 'validate', base], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    console.log(`claude plugin validate: ${out.trim().split('\n').pop()}`);
  } catch (error) {
    fail(`claude plugin validate failed:\n${error.stdout ?? ''}${error.stderr ?? ''}`);
  }
}

if (!await exists(DIST)) throw new Error(`Rendered directory does not exist: ${DIST}`);
await checkMcpTransport();
await checkNoMustacheArgs();
const refCount = await checkCorpusRefsResolve();
await checkHostProse();
await checkCommandNames();
await checkCursorRules();
await checkReadmeLinks();
await checkDistRootLinks();
checkClaudeCli();

if (failures.length > 0) {
  console.error(`Packaging validation failed:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`Packaging validation passed (${refCount} corpus citations resolved)`);
