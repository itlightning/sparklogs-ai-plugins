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
// Fenced code is exempt. Generated reference trees and GENERATED blocks are skipped.
// LQL field names in ```lql blocks and (LQL) spans are vetted separately (lqlRefsInMarkdown).
// Membership: each tag must match scripts/identifier-sot.yaml plus library harvest
// (committed src/feeds + app-vocabulary.md when the sibling library is absent).
// (other) cannot launder a product identifier or a dotted path.

import fs from 'node:fs/promises';
import path from 'node:path';
import { GENERATED_BLOCK_RE } from './skill-indexes.mjs';
import {
  LIVE_FIELDS_FILE,
  loadIdentifierSot,
  lqlMember,
  membershipError,
  setsContaining,
} from './identifier-sot.mjs';
import {
  canonicalField,
  extractLqlFields,
  extractTaggedSpan,
  makeFieldVet,
  stripAnnotation,
  vetSotLists,
} from './lql-field-refs.mjs';

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
// fences: each fenced block's info string and body as [start, end) offsets into text.
export function proseRanges(text) {
  GENERATED_BLOCK_RE.lastIndex = 0;
  const withoutGenerated = text.replace(GENERATED_BLOCK_RE, (block) => ' '.repeat(block.length));
  const ranges = [];
  const fences = [];
  const lines = withoutGenerated.split('\n');
  let offset = 0;
  let fence = null;
  let start = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineLen = line.length + (i < lines.length - 1 ? 1 : 0);
    if (isFenceOpen(line)) {
      if (!fence) {
        if (offset > start) ranges.push([start, offset]);
        fence = { info: line.trim().slice(3).trim(), body: [offset + lineLen, offset + lineLen] };
      } else {
        fence.body[1] = offset;
        fences.push(fence);
        fence = null;
        start = offset + lineLen;
      }
    }
    offset += lineLen;
  }
  if (!fence && offset > start) ranges.push([start, offset]);
  return { text: withoutGenerated, ranges, fences };
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
  return n.startsWith('src/feeds/') || n.includes('/feeds/')
    || n.startsWith('src/fields/') || n.includes('/fields/');
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

async function srcMarkdownFiles(root) {
  const out = [];
  async function walk(dir, relPrefix) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const rel = `${relPrefix}/${entry.name}`;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full, rel);
      else if (entry.name.endsWith('.md')) out.push({ rel, full });
    }
  }
  await walk(path.join(root, 'src'), 'src');
  return out;
}

export async function lintSrcTree(root, { fixSafe = false, sot: given } = {}) {
  const sot = given ?? await loadIdentifierSot(root);
  const errors = [];
  for (const { rel, full } of await srcMarkdownFiles(root)) {
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
  return errors;
}

const LQL_TAGGED_RE = /`([^`\n]+)` \(LQL\)/g;

function lineIndex(text) {
  const starts = [0];
  for (let k = 0; k < text.length; k += 1) if (text.charCodeAt(k) === 10) starts.push(k + 1);
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

// LQL field references in one markdown file, each with its 1-based line: every line of a
// ```lql block (of every fenced block when allFences, for generated trees with no info
// string) and every `...` (LQL) prose span.
export function lqlRefsInMarkdown(text, { allFences = false } = {}) {
  const { text: masked, ranges, fences } = proseRanges(text);
  const bodyStart = bodyStartOf(text);
  const lineOf = lineIndex(text);
  const refs = [];
  for (const fence of fences) {
    if (!allFences && fence.info !== 'lql') continue;
    let at = fence.body[0];
    for (const line of masked.slice(fence.body[0], fence.body[1]).split('\n')) {
      for (const ref of extractLqlFields(stripAnnotation(line))) refs.push({ ...ref, line: lineOf(at) });
      at += line.length + 1;
    }
  }
  LQL_TAGGED_RE.lastIndex = 0;
  let m;
  while ((m = LQL_TAGGED_RE.exec(masked)) !== null) {
    if (m.index < bodyStart || !inRanges(m.index, ranges)) continue;
    for (const ref of extractTaggedSpan(m[1])) refs.push({ ...ref, line: lineOf(m.index) });
  }
  return refs;
}

// Hand-written src/ fails on an unvetted LQL field; generated src/feeds/ only warns (its
// fix belongs in the source library). packOnly: vetted by the pack alone, field -> places.
export async function vetLqlFieldsInTree(root, sot) {
  const vet = makeFieldVet({
    live: sot.live, pack: sot.packLql, pedagogical: sot.pedagogical, families: new Set(sot.familyList),
  });
  const errors = vetSotLists({
    resident: sot.resident, families: sot.familyList, live: sot.live, pack: sot.packLql,
  });
  const warnings = [];
  const packOnly = new Map();
  for (const { rel, full } of await srcMarkdownFiles(root)) {
    if (rel.includes('/fields/')) continue;
    const generated = skipRel(rel);
    const text = await fs.readFile(full, 'utf8');
    for (const ref of lqlRefsInMarkdown(text, { allFences: generated })) {
      const where = `${rel}:${ref.line}`;
      const verdict = vet(ref);
      if (verdict === null) {
        const msg = `${where}: LQL field \`${ref.field}\` is not in ${LIVE_FIELDS_FILE}, the pack harvest, or lql_pedagogical`;
        (generated ? warnings : errors).push(msg);
      } else if (verdict === 'pack') {
        const key = canonicalField(ref.field);
        if (!packOnly.has(key)) packOnly.set(key, []);
        packOnly.get(key).push(where);
      }
    }
  }
  return { errors, warnings, packOnly };
}

export function proveLqlRefsInMarkdown() {
  const text = [
    '---', 'name: t', '---',
    'Prose `winlog.event_id = 1` (LQL) and `source` (LQL).',
    '<!-- BEGIN GENERATED INVENTORY -->', '```lql', 'masked.field = 1', '```', '<!-- END GENERATED INVENTORY -->',
    '```', 'bare.block = 1', '```',
    '```json', '{"json.field": 1}', '```',
    '```lql', 'event_id = 1   <- note.field = 2', '  sparklogs.data.services[](name=x)', '```',
  ].join('\n');
  const got = lqlRefsInMarkdown(text).map((r) => `${r.line}:${r.field}`).join(' ');
  const want = '17:event_id 18:sparklogs.data.services[] 18:sparklogs.data.services[].name 4:winlog.event_id 4:source';
  if (got !== want) throw new Error(`lql refs in markdown: got ${got}, want ${want}`);
  const all = lqlRefsInMarkdown(text, { allFences: true }).map((r) => r.field);
  if (!all.includes('bare.block')) throw new Error('allFences did not scan a bare block');
}
