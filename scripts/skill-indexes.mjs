// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Index tables in SKILL.md / playbooks.md are generated from leaf YAML.
// Dist strips authoring keys and unwraps GENERATED markers.

import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { THEME_FILES } from './dist-layout.mjs';
import { FEED_WHAT, MODULES } from './generated-references.config.mjs';

export const INDEX_KINDS = ['corpus-navigation', 'playbooks', 'themes', 'feeds'];
export const CORPUS_NAVIGATION_FILE = path.join('src', 'guides', 'reference-navigation.md');
export const SHIP_FRONTMATTER_KEYS = new Set([
  'name',
  'description',
  'argument-hint',
  'alwaysApply',
  'globs',
  'license',
  'compatibility',
  'metadata',
  'allowed-tools',
  'model',
]);
export const AUTHORING_FRONTMATTER_KEYS = new Set(['index', 'aliases', 'indexes']);
export const GENERATED_BLOCK_RE = /<!-- BEGIN GENERATED ([A-Za-z0-9:_-]+) -->\n?([\s\S]*?)<!-- END GENERATED \1 -->\n?/g;
const MARKER_TAG_RE = /<!-- (BEGIN|END) GENERATED ([A-Za-z0-9:_-]+) -->/g;

export function indexBegin(kind) {
  return `<!-- BEGIN GENERATED INDEX:${kind} -->`;
}
export function indexEnd(kind) {
  return `<!-- END GENERATED INDEX:${kind} -->`;
}

export function parseFrontmatter(text, file = 'markdown') {
  if (!text.startsWith('---\n')) return { data: {}, body: text };
  const end = text.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file} missing closing frontmatter delimiter`);
  const data = parseAuthoringYaml(text.slice(4, end), file);
  return { data, body: text.slice(end + 5) };
}

function parseAuthoringYaml(raw, file) {
  const data = {};
  const lines = raw.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '' || line.trim().startsWith('#')) {
      i += 1;
      continue;
    }
    const listKey = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    const inlineList = line.match(/^([A-Za-z0-9_-]+):\s*\[(.*)\]\s*$/);
    const scalar = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (inlineList) {
      const key = inlineList[1];
      assertKnownKey(key, file);
      data[key] = inlineList[2].split(',').map((part) => part.trim()).filter(Boolean);
      i += 1;
      continue;
    }
    if (listKey) {
      const key = listKey[1];
      assertKnownKey(key, file);
      if (key !== 'aliases') throw new Error(`${file} unsupported block list: ${key}`);
      const aliases = [];
      i += 1;
      let current = null;
      while (i < lines.length && /^\s/.test(lines[i]) && lines[i].trim() !== '') {
        const item = lines[i];
        const start = item.match(/^\s+-\s+label:\s*(.+)$/);
        const note = item.match(/^\s+note:\s*(.+)$/);
        const labelOnly = item.match(/^\s+-\s+(.+)$/);
        if (start) {
          if (current) aliases.push(current);
          current = { label: unquote(start[1]) };
        } else if (note) {
          if (!current) throw new Error(`${file} alias note without label`);
          current.note = unquote(note[1]);
        } else if (labelOnly && !item.includes(':')) {
          if (current) aliases.push(current);
          current = { label: unquote(labelOnly[1]) };
        } else {
          throw new Error(`${file} unsupported alias line: ${item.trim()}`);
        }
        i += 1;
      }
      if (current) aliases.push(current);
      data.aliases = aliases;
      continue;
    }
    if (scalar) {
      const key = scalar[1];
      assertKnownKey(key, file);
      data[key] = unquote(scalar[2]);
      i += 1;
      continue;
    }
    throw new Error(`${file} unsupported frontmatter line: ${line}`);
  }
  return data;
}

function assertKnownKey(key, file) {
  if (SHIP_FRONTMATTER_KEYS.has(key) || AUTHORING_FRONTMATTER_KEYS.has(key)) return;
  throw new Error(`${file} unknown frontmatter key: ${key}`);
}

function unquote(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

const YAML_INDICATOR_CHARS = new Set(['-', '?', ':', ',', '[', ']', '{', '}', '#', '&', '*', '!', '|', '>', "'", '"', '%', '@', '`']);

// A plain YAML scalar cannot start with an indicator character or whitespace, end with
// whitespace, be empty, contain ": " (mapping separator) or " #" (comment start), or end
// with ":" (mapping key). Anything outside that is quoted so the parsed value round-trips.
function isSafePlainScalar(value) {
  if (value === '') return false;
  if (/\s$/.test(value)) return false;
  const first = value[0];
  if (YAML_INDICATOR_CHARS.has(first) || /\s/.test(first)) return false;
  if (value.includes(': ') || value.includes(' #') || value.endsWith(':')) return false;
  return true;
}

function formatFrontmatterValue(value) {
  const text = String(value);
  return isSafePlainScalar(text) ? text : JSON.stringify(text);
}

export function formatFrontmatter(data) {
  const keys = [...SHIP_FRONTMATTER_KEYS].filter((key) => data[key] != null && data[key] !== '');
  if (keys.length === 0) return '';
  const lines = ['---'];
  for (const key of keys) lines.push(`${key}: ${formatFrontmatterValue(data[key])}`);
  lines.push('---', '');
  return `${lines.join('\n')}`;
}

export function unwrapGeneratedBlocks(text) {
  return text.replace(GENERATED_BLOCK_RE, (_, name, inner) => `${inner.replace(/^\n+|\n+$/g, '')}\n`);
}

// GENERATED_BLOCK_RE unwraps only well-formed BEGIN/END pairs, so a missing or misnamed END
// does not throw there: it either leaves the BEGIN marker in place (caught by the shipped-marker
// check) or, when a later unrelated END shares no name constraint, silently swallows everything
// between them. This walks every marker tag in document order and enforces strict, non-nested
// BEGIN/END alternation with matching names before anything is unwrapped.
export function assertBalancedMarkers(text, file) {
  const stack = [];
  for (const match of text.matchAll(MARKER_TAG_RE)) {
    const [, kind, name] = match;
    if (kind === 'BEGIN') {
      if (stack.length > 0) {
        throw new Error(`${file} has nested GENERATED marker ${name} inside ${stack[stack.length - 1]}`);
      }
      stack.push(name);
    } else {
      if (stack.length === 0) {
        throw new Error(`${file} has a stray END GENERATED ${name} with no open BEGIN`);
      }
      const open = stack.pop();
      if (open !== name) {
        throw new Error(`${file} has END GENERATED ${name} that does not match open BEGIN GENERATED ${open}`);
      }
    }
  }
  if (stack.length > 0) {
    throw new Error(`${file} has unclosed GENERATED marker ${stack[stack.length - 1]}`);
  }
}

export function shipMarkdown(text, file = 'markdown') {
  assertBalancedMarkers(text, file);
  const { data, body } = parseFrontmatter(text, file);
  const shipped = {};
  for (const key of SHIP_FRONTMATTER_KEYS) {
    if (data[key] != null && data[key] !== '') shipped[key] = data[key];
  }
  const unwrapped = unwrapGeneratedBlocks(body).replace(/^\n+/, '');
  const head = formatFrontmatter(shipped);
  return head ? `${head}\n${unwrapped}` : unwrapped;
}

export function replaceIndexBlock(text, kind, inner, file) {
  const begin = indexBegin(kind);
  const end = indexEnd(kind);
  const start = text.indexOf(begin);
  const stop = text.indexOf(end);
  if (start < 0 || stop < 0 || stop < start) {
    throw new Error(`${file} missing ${begin} ... ${end}`);
  }
  return `${text.slice(0, start)}${begin}\n${inner.trimEnd()}\n${end}${text.slice(stop + end.length)}`;
}

function mdCell(value) {
  return String(value).replaceAll('|', '\\|');
}

function topicCell(label, note) {
  if (!note) return mdCell(label);
  return mdCell(`${label}: ${note}`);
}

export function renderPlaybooksTable(playbooks) {
  const rows = ['| Symptom | File |', '|---|---|'];
  for (const item of playbooks) {
    rows.push(`| ${topicCell(item.index, null)} | \`${item.path}\` |`);
    for (const alias of item.aliases ?? []) {
      rows.push(`| ${topicCell(alias.label, alias.note)} | \`${item.path}\` |`);
    }
  }
  return rows.join('\n');
}

export function renderThemesTable(themes) {
  const rows = ['| Topic | File |', '|---|---|'];
  for (const item of themes) {
    rows.push(`| ${topicCell(item.index, null)} | \`${item.path}\` |`);
    for (const alias of item.aliases ?? []) {
      rows.push(`| ${topicCell(alias.label, alias.note)} | \`${item.path}\` |`);
    }
  }
  return rows.join('\n');
}

export function renderFeedsTable(modules = MODULES) {
  const rows = ['| Feed | What | Path |', '|---|---|---|'];
  for (const id of modules) rows.push(`| \`${id}\` | ${mdCell(FEED_WHAT[id])} | \`feeds/${id}/\` |`);
  return rows.join('\n');
}

export function renderIndex(kind, catalog) {
  if (kind === 'corpus-navigation') return catalog.corpusNavigation;
  if (kind === 'playbooks') return renderPlaybooksTable(catalog.playbooks);
  if (kind === 'themes') return renderThemesTable(catalog.themes);
  if (kind === 'feeds') return renderFeedsTable(catalog.modules);
  throw new Error(`unknown index kind: ${kind}`);
}

async function readMarkdown(file) {
  return parseFrontmatter(await fs.readFile(file, 'utf8'), file);
}

export async function loadIndexCatalog(root) {
  const themesDir = path.join(root, 'src', 'themes');
  const playbooksDir = path.join(root, 'src', 'playbooks');
  const themeNames = (await fs.readdir(themesDir)).filter((name) => name.endsWith('.md')).sort();
  const extra = themeNames.filter((name) => !THEME_FILES.includes(name));
  if (extra.length) throw new Error(`theme file not in THEME_FILES: ${extra.join(', ')}`);
  const missing = THEME_FILES.filter((name) => !themeNames.includes(name));
  if (missing.length) throw new Error(`THEME_FILES missing on disk: ${missing.join(', ')}`);

  const themes = [];
  for (const name of THEME_FILES) {
    const file = path.join(themesDir, name);
    const { data } = await readMarkdown(file);
    if (!data.index) throw new Error(`${file} needs index: frontmatter`);
    themes.push({
      path: `themes/${name}`,
      index: data.index,
      aliases: data.aliases ?? [],
    });
  }

  const playbookNames = (await fs.readdir(playbooksDir))
    .filter((name) => name.endsWith('.md') && name !== 'playbooks.md')
    .sort();
  const playbooks = [];
  for (const name of playbookNames) {
    const file = path.join(playbooksDir, name);
    const { data } = await readMarkdown(file);
    if (!data.index) throw new Error(`${file} needs index: frontmatter`);
    playbooks.push({
      path: `playbooks/${name}`,
      index: data.index,
      aliases: data.aliases ?? [],
    });
  }

  return { themes, playbooks, modules: MODULES, corpusNavigation: await loadCorpusNavigation(root) };
}

export async function loadCorpusNavigation(root) {
  const file = path.join(root, CORPUS_NAVIGATION_FILE);
  const text = await fs.readFile(file, 'utf8');
  const { body } = parseFrontmatter(text, file);
  if (!body.trim()) throw new Error(`${file} is empty`);
  return body.trimEnd();
}

export async function listSkillIndexTargets(root) {
  const dir = path.join(root, 'src', 'skills');
  const skills = (await fs.readdir(dir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const targets = [];
  for (const name of skills) {
    const file = path.join(dir, name, 'SKILL.md');
    const { data } = await readMarkdown(file);
    const indexes = data.indexes ?? [];
    if (!Array.isArray(indexes)) throw new Error(`${file} indexes: must be a list`);
    for (const kind of indexes) {
      if (!INDEX_KINDS.includes(kind)) throw new Error(`${file} unknown indexes entry: ${kind}`);
    }
    targets.push({ file, indexes });
  }
  targets.push({
    file: path.join(root, 'src', 'playbooks', 'playbooks.md'),
    indexes: ['playbooks'],
  });
  return targets;
}

export async function stitchIndexFiles(root) {
  const catalog = await loadIndexCatalog(root);
  const targets = await listSkillIndexTargets(root);
  const written = [];
  for (const target of targets) {
    let text = await fs.readFile(target.file, 'utf8');
    for (const kind of target.indexes) {
      text = replaceIndexBlock(text, kind, renderIndex(kind, catalog), target.file);
    }
    await fs.writeFile(target.file, text);
    written.push(path.relative(root, target.file));
  }
  return written;
}

export async function checkIndexFiles(root) {
  const catalog = await loadIndexCatalog(root);
  const targets = await listSkillIndexTargets(root);
  const drifted = [];
  for (const target of targets) {
    const text = await fs.readFile(target.file, 'utf8');
    let next = text;
    for (const kind of target.indexes) {
      next = replaceIndexBlock(next, kind, renderIndex(kind, catalog), target.file);
    }
    if (next !== text) drifted.push(path.relative(root, target.file));
  }
  if (drifted.length) {
    throw new Error(
      `index tables stale:\n  ${drifted.join('\n  ')}\nRun: yarn stitch-indexes`,
    );
  }
}

export function proveShipMarkdown() {
  const skill = `---
name: sparklogs-ask
description: Query logs.
indexes: [playbooks, themes, feeds]
---

# Title

${indexBegin('feeds')}
| Feed | Path |
|---|---|
| \`win.eventlog.security\` | \`feeds/win.eventlog.security/\` |
${indexEnd('feeds')}
`;
  const shipped = shipMarkdown(skill, 'SKILL.md');
  if (shipped.includes('indexes:')) throw new Error('shipMarkdown kept authoring key indexes');
  if (!shipped.includes('name: sparklogs-ask')) throw new Error('shipMarkdown dropped name');
  if (shipped.includes('BEGIN GENERATED')) throw new Error('shipMarkdown left GENERATED markers');
  if (!shipped.includes('feeds/win.eventlog.security/')) {
    throw new Error('shipMarkdown dropped generated table');
  }
  const theme = `---
index: Defender
aliases:
  - label: Named backup product (Veeam etc.)
    note: installed products. Not operational events.
---

# Endpoint protection
`;
  const themeShipped = shipMarkdown(theme, 'theme.md');
  if (themeShipped.startsWith('---')) throw new Error('shipMarkdown left theme frontmatter');
  if (!themeShipped.startsWith('# Endpoint protection')) {
    throw new Error('shipMarkdown did not start at H1');
  }
  const inventory = `# Router

<!-- BEGIN GENERATED INVENTORY -->
body
<!-- END GENERATED INVENTORY -->
`;
  const inventoryShipped = unwrapGeneratedBlocks(inventory);
  if (inventoryShipped.includes('BEGIN GENERATED')) {
    throw new Error('unwrapGeneratedBlocks left INVENTORY markers');
  }
  if (!inventoryShipped.includes('body')) {
    throw new Error('unwrapGeneratedBlocks dropped INVENTORY body');
  }
  const agent = `---
name: sparklogs-cluster-interpreter
model: haiku
description: Interprets clusters.
---

# Agent
`;
  const agentShipped = shipMarkdown(agent, 'agent.md');
  if (!agentShipped.includes('model: haiku')) throw new Error('shipMarkdown dropped model');
  if (agentShipped.includes('index:')) throw new Error('shipMarkdown kept authoring key on agent');

  const colonDescription = 'Cited investigation: gather logs into a summary';
  const unsafeSkill = `---
name: sparklogs-ask
description: ${colonDescription}
---

# Title
`;
  const unsafeShipped = shipMarkdown(unsafeSkill, 'SKILL.md');
  const parsedFrontmatter = yaml.load(unsafeShipped.slice(4, unsafeShipped.indexOf('\n---\n', 4)));
  if (parsedFrontmatter.description !== colonDescription) {
    throw new Error('formatFrontmatter did not round-trip a description containing ": "');
  }
}

function expectThrow(fn, label) {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error(`assertBalancedMarkers did not reject: ${label}`);
}

export function proveBalancedMarkers() {
  expectThrow(
    () => assertBalancedMarkers('<!-- BEGIN GENERATED A -->\nbody\n', 'missing-end.md'),
    'missing END',
  );
  expectThrow(
    () => assertBalancedMarkers(
      '<!-- BEGIN GENERATED X -->\nbody\n<!-- END GENERATED Y -->\n',
      'mismatched-name.md',
    ),
    'BEGIN X followed by END Y',
  );
  expectThrow(
    () => assertBalancedMarkers(
      '<!-- BEGIN GENERATED A -->\n<!-- BEGIN GENERATED B -->\nbody\n<!-- END GENERATED B -->\n<!-- END GENERATED A -->\n',
      'nested.md',
    ),
    'nested BEGIN',
  );
  expectThrow(
    () => assertBalancedMarkers('<!-- END GENERATED A -->\n', 'stray-end.md'),
    'stray END',
  );
  // The old regex (no backreference) matched BEGIN A ... up to the NEXT END of any name, so a
  // missing END A silently swallowed everything through END B, including B's own markers, into
  // A's content. The fix must throw here rather than strip.
  expectThrow(
    () => assertBalancedMarkers(
      '<!-- BEGIN GENERATED A -->\nfirst\n<!-- BEGIN GENERATED B -->\nsecond\n<!-- END GENERATED B -->\n',
      'silent-swallow.md',
    ),
    'BEGIN A with no END A, later BEGIN B + END B',
  );
}
