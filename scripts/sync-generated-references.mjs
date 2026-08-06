// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Sync the generated AI reference set from a sibling source-library checkout into generated/.
//
// Usage:
//   node scripts/sync-generated-references.mjs           write generated/ and the sync manifest
//   node scripts/sync-generated-references.mjs --check   fail if generated/ differs from a re-sync
//
// The library checkout is located by SPARKLOGS_SOURCE_LIBRARY_DIR, falling back to the sibling
// path. A path that is set but unusable is a hard failure rather than a fallback: a drift guard
// that quietly reads a different checkout reports green about the wrong tree.
//
// --check with no library checkout present SKIPS and says so. It never reports success, because
// the committed content is unverifiable without the source it came from.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { assertRepoRoot } from './assert-repo-root.mjs';
import {
  ARTIFACT_SUMMARY,
  KNOWN_DEFECTS,
  DEFAULT_SOURCE_LIBRARY_DIR,
  GENERATED_DIR,
  INTERNAL_ARTIFACTS,
  LIBRARY_GENERATED_SUBPATH,
  MANIFEST_FILE,
  MODULES,
  PROJECTION,
  PROJECTION_NOTE,
  PUBLIC_ARTIFACTS,
  ROUTER_BEGIN,
  ROUTER_END,
  ROUTER_FILE,
  SOURCE_LIBRARY_DIR_ENV,
} from './generated-references.config.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const CHECK = process.argv.includes('--check');

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

// Split a table row on separators the generator did not escape.
function splitRow(line) {
  const cells = [];
  let current = '';
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '\\' && line[i + 1] === '|') {
      current += '\\|';
      i += 1;
    } else if (ch === '|') {
      cells.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells;
}

function joinRow(cells) {
  return cells.join('|');
}

function isDelimiterRow(line) {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes('-');
}

// Remove every column whose header cell matches, from the header, the delimiter and the body.
function dropTableColumns(lines, headers) {
  const wanted = new Set(headers.map((h) => h.toLowerCase()));
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const next = lines[i + 1];
    if (!line.trimStart().startsWith('|') || next === undefined || !isDelimiterRow(next)) {
      out.push(line);
      continue;
    }
    const headerCells = splitRow(line);
    const doomed = headerCells
      .map((cell, index) => (wanted.has(cell.trim().toLowerCase()) ? index : -1))
      .filter((index) => index >= 0);
    if (doomed.length === 0) {
      out.push(line);
      continue;
    }
    const keep = (cells) => joinRow(cells.filter((_, index) => !doomed.includes(index)));
    out.push(keep(headerCells));
    out.push(keep(splitRow(next)));
    i += 1;
    while (i + 1 < lines.length && lines[i + 1].trimStart().startsWith('|')) {
      i += 1;
      out.push(keep(splitRow(lines[i])));
    }
  }
  return out;
}

function headingLevel(line) {
  const match = /^(#{1,6})\s/.exec(line);
  return match ? match[1].length : 0;
}

// Remove a section by heading text, through to the next heading of the same or higher level.
function dropSections(lines, titles) {
  const wanted = new Set(titles.map((t) => t.toLowerCase()));
  const out = [];
  let skippingAt = 0;
  for (const line of lines) {
    const level = headingLevel(line);
    if (skippingAt > 0) {
      if (level > 0 && level <= skippingAt) skippingAt = 0;
      else continue;
    }
    if (level > 0 && wanted.has(line.slice(level).trim().toLowerCase())) {
      skippingAt = level;
      continue;
    }
    out.push(line);
  }
  return out;
}

// Remove whole blank-line-delimited blocks when any line matches.
function dropBlocks(lines, patterns) {
  const out = [];
  let block = [];
  const flush = () => {
    if (block.length > 0 && !block.some((line) => patterns.some((p) => p.test(line)))) out.push(...block);
    block = [];
  };
  for (const line of lines) {
    if (line.trim() === '') {
      flush();
      out.push(line);
    } else {
      block.push(line);
    }
  }
  flush();
  return out;
}

function dropLinksTo(lines, artifacts) {
  return lines.filter((line) => !artifacts.some((artifact) => line.includes(`(${artifact})`)));
}

function collapseBlankRuns(lines) {
  const out = [];
  for (const line of lines) {
    if (line.trim() === '' && out.length > 0 && out[out.length - 1].trim() === '') continue;
    out.push(line);
  }
  while (out.length > 0 && out[out.length - 1].trim() === '') out.pop();
  return out;
}

// Exact-text repairs, applied after the mechanical rules. Each must match exactly once.
function applyRewrites(artifact, text) {
  let out = text;
  for (const rule of PROJECTION.rewrites) {
    if (rule.artifact !== artifact) continue;
    const hits = out.split(rule.find).length - 1;
    if (hits !== 1) {
      throw new Error(
        `Projection rewrite for ${artifact} matched ${hits} times, expected exactly 1: "${rule.find.slice(0, 60)}...". `
        + 'The library text changed; re-derive the rule or drop it.',
      );
    }
    out = out.split(rule.find).join(rule.replace);
  }
  return out;
}

function project(artifact, text) {
  let lines = text.split('\n');
  lines = dropSections(lines, PROJECTION.dropSections);
  lines = dropBlocks(lines, PROJECTION.dropBlocks);
  lines = dropLinksTo(lines, PROJECTION.dropLinksTo);
  lines = dropTableColumns(lines, PROJECTION.dropTableColumns);
  lines = collapseBlankRuns(lines);
  lines = applyRewrites(artifact, lines.join('\n')).split('\n');
  const generatorNotes = [];
  while (lines.length > 0 && lines[0].startsWith('<!--')) generatorNotes.push(lines.shift());
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  return `${[...generatorNotes, PROJECTION_NOTE, '', ...lines].join('\n')}\n`;
}

function libraryDir() {
  const configured = process.env[SOURCE_LIBRARY_DIR_ENV];
  if (configured) return { dir: path.resolve(ROOT, configured), explicit: true };
  return { dir: path.resolve(ROOT, DEFAULT_SOURCE_LIBRARY_DIR), explicit: false };
}

function libraryCommit(dir) {
  try {
    execFileSync('git', ['rev-parse', '--git-dir'], { cwd: dir, stdio: 'ignore' });
  } catch {
    throw new Error(`Source library path ${dir} is not a git checkout, so no commit can be recorded in the sync manifest`);
  }
  const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: dir, encoding: 'utf8' }).trim();
  const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: dir, encoding: 'utf8' }).trim();
  const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: dir, encoding: 'utf8' }).trim();
  return { sha, branch, dirty: dirty.length > 0 };
}

async function readModule(libDir, module) {
  const src = path.join(libDir, LIBRARY_GENERATED_SUBPATH, module);
  if (!await exists(src)) throw new Error(`Source library has no generated artifacts for module ${module}: ${src}`);
  const present = (await fs.readdir(src)).filter((name) => name.endsWith('.md')).sort();
  const known = new Set([...PUBLIC_ARTIFACTS, ...INTERNAL_ARTIFACTS]);
  const unknown = present.filter((name) => !known.has(name));
  if (unknown.length > 0) {
    throw new Error(
      `Source library produced artifacts this repo has not ruled on for ${module}: ${unknown.join(', ')}. `
      + 'Add each to PUBLIC_ARTIFACTS or INTERNAL_ARTIFACTS in scripts/generated-references.config.mjs.',
    );
  }
  const missing = PUBLIC_ARTIFACTS.filter((name) => !present.includes(name));
  if (missing.length > 0) throw new Error(`Source library is missing expected artifacts for ${module}: ${missing.join(', ')}`);
  const files = new Map();
  for (const name of PUBLIC_ARTIFACTS) {
    files.set(name, project(name, await fs.readFile(path.join(src, name), 'utf8')));
  }
  return files;
}

function manifestBody(commit, modules) {
  return {
    note: 'Generated by scripts/sync-generated-references.mjs. Do not hand-edit generated/.',
    source: {
      repository: 'sparklogs-source-library',
      branch: commit.branch,
      commit: commit.sha,
      generatedSubpath: LIBRARY_GENERATED_SUBPATH,
    },
    projection: {
      internalArtifacts: INTERNAL_ARTIFACTS,
      droppedTableColumns: PROJECTION.dropTableColumns,
      droppedSections: PROJECTION.dropSections,
      droppedBlocksMatching: PROJECTION.dropBlocks.map((p) => p.source),
      droppedLinksTo: PROJECTION.dropLinksTo,
      rewrites: PROJECTION.rewrites.map((rule) => ({ artifact: rule.artifact, find: rule.find, replace: rule.replace, why: rule.why })),
      why: 'Evidence tiers (spec versus observed claims and witness counts) are an internal instrument, not a consumer contract.',
    },
    knownDefects: KNOWN_DEFECTS,
    modules: modules.map(([module, files]) => ({
      module,
      artifacts: [...files.keys()].map((name) => ({ file: name, summary: ARTIFACT_SUMMARY[name] ?? '' })),
    })),
  };
}

// The router's prose is authored; only the inventory of what exists is generated.
function routerInventory(modules) {
  const lines = ['*Generated by `scripts/sync-generated-references.mjs`. Edits between the markers are overwritten.*', ''];
  for (const [module, files] of modules) {
    lines.push(`### \`${module}\``, '');
    for (const name of files.keys()) {
      lines.push(`- \`generated/${module}/${name}\`: ${ARTIFACT_SUMMARY[name] ?? ''}`);
    }
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

async function renderRouter(modules) {
  const file = path.join(ROOT, ROUTER_FILE);
  const text = await fs.readFile(file, 'utf8');
  const begin = text.indexOf(ROUTER_BEGIN);
  const end = text.indexOf(ROUTER_END);
  if (begin < 0 || end < 0 || end < begin) {
    throw new Error(`${ROUTER_FILE} is missing the inventory markers; the router cannot be kept in step with the sync`);
  }
  const head = text.slice(0, begin + ROUTER_BEGIN.length);
  const tail = text.slice(end);
  return { file, body: `${head}\n\n${routerInventory(modules)}\n\n${tail}`, current: text };
}

async function main() {
  const { dir, explicit } = libraryDir();
  const available = await exists(path.join(dir, LIBRARY_GENERATED_SUBPATH));
  if (!available) {
    if (explicit) throw new Error(`${SOURCE_LIBRARY_DIR_ENV} is set to ${dir} but it holds no ${LIBRARY_GENERATED_SUBPATH}`);
    if (CHECK) {
      console.log(`generated-references drift: SKIPPED, no source-library checkout at ${dir}`);
      console.log(`  set ${SOURCE_LIBRARY_DIR_ENV} to verify committed content against its source`);
      return;
    }
    throw new Error(`No source-library checkout at ${dir}. Set ${SOURCE_LIBRARY_DIR_ENV}.`);
  }

  const commit = libraryCommit(dir);
  if (commit.dirty) throw new Error(`Source library checkout at ${dir} has uncommitted changes; sync only from a clean tree`);

  const libraryModules = (await fs.readdir(path.join(dir, LIBRARY_GENERATED_SUBPATH), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const unlisted = libraryModules.filter((name) => !MODULES.includes(name));
  if (unlisted.length > 0) {
    throw new Error(
      `Source library produces modules this repo has not ruled on: ${unlisted.join(', ')}. `
      + 'Add each to MODULES in scripts/generated-references.config.mjs, or record why it is held back.',
    );
  }

  const modules = [];
  for (const module of MODULES) modules.push([module, await readModule(dir, module)]);
  const manifest = `${JSON.stringify(manifestBody(commit, modules), null, 2)}\n`;
  const router = await renderRouter(modules);

  if (CHECK) {
    const drifted = [];
    for (const [module, files] of modules) {
      const dest = path.join(ROOT, GENERATED_DIR, module);
      for (const [name, body] of files) {
        const target = path.join(dest, name);
        const current = await exists(target) ? await fs.readFile(target, 'utf8') : null;
        if (current !== body) drifted.push(path.relative(ROOT, target));
      }
      // Enumerate the destination too. Comparing only the expected paths is blind to anything
      // extra that was committed there, which is exactly how a stripped artifact leaks back.
      const present = await exists(dest) ? (await fs.readdir(dest)).sort() : [];
      for (const name of present) {
        if (!files.has(name)) drifted.push(`${path.relative(ROOT, path.join(dest, name))} (not produced by the sync)`);
      }
    }
    const manifestPath = path.join(ROOT, MANIFEST_FILE);
    const currentManifest = await exists(manifestPath) ? await fs.readFile(manifestPath, 'utf8') : null;
    if (currentManifest !== manifest) drifted.push(MANIFEST_FILE);
    if (router.current !== router.body) drifted.push(ROUTER_FILE);
    if (drifted.length > 0) {
      throw new Error(`generated/ differs from a re-sync of ${commit.sha}:\n  ${drifted.join('\n  ')}\nRun: yarn sync-generated`);
    }
    console.log(`generated-references drift: clean against ${commit.branch} ${commit.sha}`);
    return;
  }

  for (const [module, files] of modules) {
    const dest = path.join(ROOT, GENERATED_DIR, module);
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(dest, { recursive: true });
    for (const [name, body] of files) await fs.writeFile(path.join(dest, name), body, 'utf8');
  }
  await fs.writeFile(path.join(ROOT, MANIFEST_FILE), manifest, 'utf8');
  await fs.writeFile(router.file, router.body, 'utf8');
  console.log(`Synced ${MODULES.length} module(s) from ${commit.branch} ${commit.sha}`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
