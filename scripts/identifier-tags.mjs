// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Prose backticks that look like identifiers must be tagged in src/:
//   (arg)   tool input        kept on dist
//   (col)   response column   kept on dist
//   (LQL)   log filter/group  kept on dist
//   (tool)  MCP tool name     stripped on render
//   (value) closed-vocab token stripped on render
//   (other) syntax/pedagogy   stripped on render
//
// Fenced code is exempt. src/feeds/ and GENERATED blocks are skipped.
// Membership: each tag must match scripts/identifier-sot.yaml plus library harvest.
// (other) cannot launder a product identifier or a dotted path.

import fs from 'node:fs/promises';
import path from 'node:path';
import { GENERATED_BLOCK_RE } from './skill-indexes.mjs';
import {
  loadIdentifierSot,
  lqlMember,
  membershipError,
  setsContaining,
} from './identifier-sot.mjs';

export const KEEP_TAGS = new Set(['arg', 'col', 'LQL']);
export const STRIP_TAGS = new Set(['tool', 'value', 'other']);
export const ALL_TAGS = new Set([...KEEP_TAGS, ...STRIP_TAGS]);

export const IDENTIFIER_BODY = '[a-z][a-z0-9_.]*';
const TAG_ALT = [...ALL_TAGS].join('|');
const TAGGED_RE = new RegExp('`(' + IDENTIFIER_BODY + ')` \\((' + TAG_ALT + ')\\)', 'g');
const BACKTICK_RE = new RegExp('`(' + IDENTIFIER_BODY + ')`(?: \\((' + TAG_ALT + ')\\))?', 'g');

const FENCE_LINE = /^(```|~~~)/;

function isFenceOpen(line) {
  return FENCE_LINE.test(line.trim());
}

// Split markdown into lintable prose vs skipped regions (fences, GENERATED).
export function proseRanges(text) {
  GENERATED_BLOCK_RE.lastIndex = 0;
  const withoutGenerated = text.replace(GENERATED_BLOCK_RE, (block) => ' '.repeat(block.length));
  const ranges = [];
  const lines = withoutGenerated.split('\n');
  let offset = 0;
  let inFence = false;
  let start = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineLen = line.length + (i < lines.length - 1 ? 1 : 0);
    if (isFenceOpen(line)) {
      if (!inFence) {
        if (offset > start) ranges.push([start, offset]);
        inFence = true;
      } else {
        inFence = false;
        start = offset + lineLen;
      }
    }
    offset += lineLen;
  }
  if (!inFence && offset > start) ranges.push([start, offset]);
  return { text: withoutGenerated, ranges };
}

export function inRanges(index, ranges) {
  for (const [a, b] of ranges) {
    if (index >= a && index < b) return true;
  }
  return false;
}

export function stripAuthoringTags(text) {
  return text.replace(TAGGED_RE, (full, body, tag) => {
    if (STRIP_TAGS.has(tag)) return '`' + body + '`';
    return full;
  });
}

function skipRel(rel) {
  const n = rel.replaceAll('\\', '/');
  return n.startsWith('src/feeds/') || n.includes('/feeds/');
}

function bodyStartOf(text) {
  if (!text.startsWith('---\n')) return 0;
  const end = text.indexOf('\n---\n', 4);
  return end >= 0 ? end + 5 : 0;
}

export function lintMarkdown(text, file, sot) {
  const errors = [];
  const { text: masked, ranges } = proseRanges(text);
  const bodyStart = bodyStartOf(text);
  BACKTICK_RE.lastIndex = 0;
  let m;
  while ((m = BACKTICK_RE.exec(masked)) !== null) {
    if (m.index < bodyStart) continue;
    if (!inRanges(m.index, ranges)) continue;
    const body = m[1];
    if (body.endsWith('.md')) continue;
    const tag = m[2];
    if (!tag) {
      errors.push(`${file}: untagged \`${body}\``);
      continue;
    }
    if (!ALL_TAGS.has(tag)) {
      errors.push(`${file}: unknown tag (${tag}) on \`${body}\``);
      continue;
    }
    const hits = setsContaining(sot, body);
    const err = membershipError(file, body, tag, hits);
    if (err) errors.push(err);
  }
  return errors;
}

export function suggestSafeTag(body, sot) {
  if (body.endsWith('.md')) return null;
  const hits = setsContaining(sot, body);
  if (hits.length === 1) return hits[0];
  return null;
}

export function applySafeTags(text, sot) {
  const { text: masked, ranges } = proseRanges(text);
  const bodyStart = bodyStartOf(text);
  return text.replace(BACKTICK_RE, (full, body, tag, offset) => {
    if (offset < bodyStart) return full;
    if (!inRanges(offset, ranges)) return full;
    if (masked[offset] !== '`') return full;
    if (tag) return full;
    const suggested = suggestSafeTag(body, sot);
    if (!suggested || suggested === 'other') return full;
    return '`' + body + '` (' + suggested + ')';
  });
}

function fixtureSot() {
  return {
    tools: new Set(['query_logs']),
    args: new Set([]),
    cols: new Set(['reason']),
    lql: new Set(['sparklogs.reason', 'pattern_hash']),
    families: new Set(['sparklogs.episode']),
    values: new Set([]),
  };
}

export function proveIdentifierTags() {
  const sot = fixtureSot();
  const src = 'Use `query_logs` (tool) then `sparklogs.reason` (LQL) and `reason` (col) and `in` (other).\n';
  const stripped = stripAuthoringTags(src);
  if (stripped.includes('(tool)')) throw new Error('strip left (tool)');
  if (stripped.includes('(other)')) throw new Error('strip left (other)');
  if (!stripped.includes('`sparklogs.reason` (LQL)')) throw new Error('strip dropped (LQL)');
  if (!stripped.includes('`reason` (col)')) throw new Error('strip dropped (col)');
  const fence = 'Prose `query_logs`\n```\nquery_logs(lql="x")\n```\n';
  const ferr = lintMarkdown(fence, 't.md', sot);
  if (!ferr.some((e) => e.includes('untagged'))) throw new Error('prose untagged not caught');
  if (ferr.some((e) => e.includes('query_logs(lql'))) throw new Error('linted inside fence');
  const dual = lintMarkdown('x `reason` (LQL) y', 't.md', sot);
  if (!dual.some((e) => e.includes('(LQL)') && e.includes('col'))) {
    throw new Error(`denylist-via-membership missed: ${dual.join('; ')}`);
  }
  const english = lintMarkdown('use `pattern_hash` (finest grain)', 't.md', sot);
  if (!english.some((e) => e.includes('untagged `pattern_hash`'))) {
    throw new Error('english parenthetical was parsed as a tag');
  }
  const otherOk = lintMarkdown('operator `in` (other)', 't.md', sot);
  if (otherOk.length) throw new Error(`in (other) should pass: ${otherOk.join('; ')}`);
  const otherCol = lintMarkdown('launder `reason` (other)', 't.md', sot);
  if (!otherCol.some((e) => e.includes('(other)'))) throw new Error('reason (other) not caught');
  const otherDot = lintMarkdown('path `sparklogs.reason` (other)', 't.md', sot);
  if (!otherDot.some((e) => e.includes('dotted'))) throw new Error('dotted other not caught');
  const future = lintMarkdown('soon `query_device_state` (tool)', 't.md', sot);
  if (!future.some((e) => e.includes('query_device_state'))) {
    throw new Error('unknown tool not caught');
  }
  const unknownLql = lintMarkdown('nope `not_a_field` (LQL)', 't.md', sot);
  if (!unknownLql.some((e) => e.includes('not_a_field'))) throw new Error('unknown LQL not caught');
  const inventory = 'Prose `query_logs`\n<!-- BEGIN GENERATED INVENTORY -->\n### `win.eventlog.security`\n<!-- END GENERATED INVENTORY -->\n';
  const ierr = lintMarkdown(inventory, 't.md', sot);
  if (!ierr.some((e) => e.includes('untagged `query_logs`'))) throw new Error('prose outside inventory not caught');
  if (ierr.some((e) => e.includes('win.eventlog.security'))) throw new Error('linted generated inventory');
  if (!lqlMember({ lql: new Set(), families: new Set(['sparklogs.episode']) }, 'sparklogs.episode.*')) {
    throw new Error('family glob not accepted');
  }
  proveDistIdentifierScan();
}

function shippedTagRe(tags) {
  return new RegExp('`(' + IDENTIFIER_BODY + ')` \\((' + [...tags].join('|') + ')\\)', 'g');
}

export function leftoverAuthoringTags(text) {
  return [...text.matchAll(shippedTagRe(STRIP_TAGS))].map((m) => m[0]);
}

export function keepTagKindsFound(text) {
  const kinds = new Set();
  for (const m of text.matchAll(shippedTagRe(KEEP_TAGS))) kinds.add(m[2]);
  return kinds;
}

// Dist: leftover strip-tags fail; missing any keep-tag kind fails (empty match is not a pass).
export function assertShippedIdentifierTags(text, label) {
  const leftover = leftoverAuthoringTags(text);
  if (leftover.length) {
    throw new Error(`${label} leftover authoring tags:\n  ${leftover.join('\n  ')}`);
  }
  const kinds = keepTagKindsFound(text);
  for (const need of KEEP_TAGS) {
    if (!kinds.has(need)) {
      throw new Error(`${label} missing kept identifier tag (${need}); empty scan is not a pass`);
    }
  }
}

function expectThrow(fn, needle) {
  try {
    fn();
  } catch (error) {
    if (String(error.message).includes(needle)) return;
    throw error;
  }
  throw new Error(`expected throw containing ${needle}`);
}

export function proveDistIdentifierScan() {
  assertShippedIdentifierTags(
    'Use `lql` (arg) and `reason` (col) and `sparklogs.reason` (LQL).',
    'planted keep',
  );
  expectThrow(
    () => assertShippedIdentifierTags('Use `query_logs` (tool).', 'planted strip'),
    'leftover',
  );
  expectThrow(
    () => assertShippedIdentifierTags('Use `rca` (value) and `in` (other).', 'planted strip'),
    'leftover',
  );
  expectThrow(
    () => assertShippedIdentifierTags('Use `lql` (arg) and `reason` (col).', 'planted vacuous'),
    '(LQL)',
  );
}

export async function lintSrcTree(root, { fixSafe = false } = {}) {
  const sot = await loadIdentifierSot(root);
  const errors = [];
  const src = path.join(root, 'src');

  async function walk(dir, relPrefix) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const rel = `${relPrefix}/${entry.name}`;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, rel);
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;
      if (skipRel(rel)) continue;
      let text = await fs.readFile(full, 'utf8');
      if (fixSafe) {
        const next = applySafeTags(text, sot);
        if (next !== text) {
          await fs.writeFile(full, next);
          text = next;
        }
      }
      errors.push(...lintMarkdown(text, rel, sot));
    }
  }
  await walk(src, 'src');
  return errors;
}
