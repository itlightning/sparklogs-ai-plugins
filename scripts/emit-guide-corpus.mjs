// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Emit the guide corpus: the rendered reference documents a hosted guide tool serves, plus a
// manifest that indexes their H2 and H3 sections.
//
// Usage: node scripts/emit-guide-corpus.mjs [--out build/guide-corpus]
//
// Output (build output, never committed):
//   <out>/manifest.json   manifest_version, source_library_commit, documents sorted by path
//   <out>/docs/<path>     each document once, as rendered: UTF-8, LF, exactly one trailing LF
//
// Documents are every markdown file in the corpus trees (CORPUS_TOPS) except maintainer-only build
// inputs. Text is the generic-host render of a package-root file: shared render core, no corpus-path
// rewrite (a citation such as `guides/x.md` is itself a corpus path), commands named as skills.
//
// Every run re-reads what it wrote and verifies it against the manifest, and fails on any
// document that breaks the format (H1 count, line endings, duplicate reason code). Node built-ins
// only: runs from a clean checkout with no package install.
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';
import { MAINTAINER_ONLY } from './dist-layout.mjs';
import { MANIFEST_FILE } from './generated-references.config.mjs';
import {
  CORPUS_TOPS,
  isFenceLine,
  renderSharedMarkdown,
  rewriteCommandsAsSkillNames,
} from './host-transforms.mjs';
import { resolveGeneratedPath, safeRmGenerated } from './safe-rm-generated.mjs';

const MANIFEST_VERSION = 1;
const REASONS_DOC = /^feeds\/[^/]+\/reasons\.md$/;
const REASON_HEADING = /^`([a-z0-9_]+)`/;
const USE_WHEN_LINE = /^\*\*Use when:\*\* (.+)$/;
const KEYWORDS_LINE = /^\*\*Keywords:\*\* (.+)$/;
const SHA1_HEX = /^[0-9a-f]{40}$/;

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function byPath(a, b) {
  if (a < b) return -1;
  return a > b ? 1 : 0;
}

// Use when / Keywords lines in one region. A second line of either kind is a shape this parser
// does not know how to merge, so it fails rather than keeping one silently.
function readHints(lines, from, to, label) {
  const hints = {};
  for (let i = from; i < to; i += 1) {
    const useWhen = lines[i].match(USE_WHEN_LINE);
    const keywords = lines[i].match(KEYWORDS_LINE);
    if (useWhen) {
      if (hints.use_when !== undefined) throw new Error(`${label} has more than one Use when line`);
      hints.use_when = useWhen[1].trim();
    }
    if (keywords) {
      if (hints.keywords !== undefined) throw new Error(`${label} has more than one Keywords line`);
      hints.keywords = keywords[1].split(',').map((word) => word.trim()).filter(Boolean);
    }
  }
  return hints;
}

/**
 * Parse one rendered document into its manifest entry (without sha256). Lines are 1-based; a
 * section ends on the last line before the next heading of the same or a higher level, or at the
 * end of the file. Headings inside fenced code are not headings.
 */
function parseDocument(rel, text) {
  if (text.includes('\r')) throw new Error(`${rel}: carries a CR; documents are LF only`);
  if (!text.endsWith('\n') || text.endsWith('\n\n')) throw new Error(`${rel}: must end with exactly one LF`);
  const lines = text.slice(0, -1).split('\n');
  const titles = [];
  const heads = [];
  let fenced = false;
  lines.forEach((line, i) => {
    if (isFenceLine(line)) {
      fenced = !fenced;
      return;
    }
    if (fenced) return;
    if (line.startsWith('# ')) titles.push(line.slice(2));
    else if (line.startsWith('## ')) heads.push({ level: 2, heading: line.slice(3), line: i + 1 });
    else if (line.startsWith('### ')) heads.push({ level: 3, heading: line.slice(4), line: i + 1 });
  });
  if (titles.length !== 1) throw new Error(`${rel}: needs exactly one H1, found ${titles.length}`);
  const preambleEnd = heads.length ? heads[0].line - 1 : lines.length;
  const entry = { path: rel, title: titles[0], ...readHints(lines, 0, preambleEnd, `${rel} preamble`), lines: lines.length };
  const codes = new Set();
  entry.sections = heads.map((head, k) => {
    const close = heads.slice(k + 1).find((next) => next.level <= head.level);
    const section = {
      level: head.level,
      heading: head.heading,
      start_line: head.line,
      end_line: close ? close.line - 1 : lines.length,
    };
    const match = head.level === 2 && REASONS_DOC.test(rel) ? head.heading.match(REASON_HEADING) : null;
    if (match) {
      if (codes.has(match[1])) throw new Error(`${rel}: reason code ${match[1]} heads two sections`);
      codes.add(match[1]);
      section.reason_code = match[1];
    }
    const ownEnd = k + 1 < heads.length ? heads[k + 1].line - 1 : lines.length;
    return { ...section, ...readHints(lines, head.line, ownEnd, `${rel}:${head.line}`) };
  });
  return entry;
}

// Section ranges against the document's own heading lines: each heading starts exactly one
// section, a section stays inside the file, and an H3 stays inside the H2 above it. Ranges of
// same-level siblings therefore cannot overlap.
function checkTiling(doc, text) {
  const reparsed = parseDocument(doc.path, text);
  const starts = doc.sections.map((section) => section.start_line);
  const headingLines = reparsed.sections.map((section) => section.start_line);
  if (starts.join(',') !== headingLines.join(',')) {
    throw new Error(`${doc.path}: section starts ${starts.join(',')} are not the heading lines ${headingLines.join(',')}`);
  }
  let parent = null;
  let previous = null;
  for (const section of doc.sections) {
    if (section.start_line > section.end_line || section.end_line > doc.lines) {
      throw new Error(`${doc.path}:${section.start_line}: range ends at ${section.end_line}`);
    }
    if (previous && previous.level === section.level && previous.end_line >= section.start_line) {
      throw new Error(`${doc.path}:${section.start_line}: overlaps the sibling at ${previous.start_line}`);
    }
    if (section.level === 2) parent = section;
    else if (parent && section.end_line > parent.end_line) {
      throw new Error(`${doc.path}:${section.start_line}: H3 runs past its H2 at ${parent.start_line}`);
    }
    previous = section;
  }
}

/**
 * Verify a corpus held as manifest text plus a map of docs/ relative path to bytes. Every file is
 * listed once and nothing listed is missing; bytes, line counts and sections match; paths sorted.
 */
function verifyCorpus(manifestText, files) {
  const manifest = JSON.parse(manifestText);
  if (manifest.manifest_version !== MANIFEST_VERSION) throw new Error(`manifest_version is ${manifest.manifest_version}`);
  if (!SHA1_HEX.test(manifest.source_library_commit ?? '')) throw new Error('source_library_commit is not a full sha');
  const listed = manifest.documents.map((doc) => doc.path);
  if (listed.join('\n') !== [...listed].sort(byPath).join('\n')) throw new Error('documents are not sorted by path');
  if (new Set(listed).size !== listed.length) throw new Error('a document path is listed twice');
  const unlisted = [...files.keys()].filter((rel) => !listed.includes(rel));
  if (unlisted.length) throw new Error(`docs/ holds files the manifest does not list: ${unlisted.join(', ')}`);
  for (const doc of manifest.documents) {
    const bytes = files.get(doc.path);
    if (!bytes) throw new Error(`manifest lists ${doc.path} but docs/ has no such file`);
    if (sha256(bytes) !== doc.sha256) throw new Error(`${doc.path}: sha256 does not match the file bytes`);
    const text = bytes.toString('utf8');
    const { sections, ...head } = parseDocument(doc.path, text);
    const { sha256: _sha, sections: listedSections, ...listedHead } = doc;
    if (JSON.stringify(head) !== JSON.stringify(listedHead)) throw new Error(`${doc.path}: title, hints or line count differ from the file`);
    if (JSON.stringify(sections) !== JSON.stringify(listedSections)) throw new Error(`${doc.path}: sections differ from the file`);
    checkTiling(doc, text);
  }
  return manifest;
}

async function walkMarkdown(dir, rel, acc) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const childRel = `${rel}/${entry.name}`;
    if (entry.isDirectory()) await walkMarkdown(full, childRel, acc);
    else if (MAINTAINER_ONLY.has(entry.name)) continue;
    else if (entry.name.endsWith('.md')) acc.push({ rel: childRel, full });
    else throw new Error(`corpus tree holds a file that is not markdown: src/${childRel}`);
  }
}

async function buildCorpus(root) {
  const sources = [];
  for (const top of CORPUS_TOPS) await walkMarkdown(path.join(root, 'src', top), top, sources);
  sources.sort((a, b) => byPath(a.rel, b.rel));
  const files = new Map();
  const documents = [];
  for (const { rel, full } of sources) {
    const text = rewriteCommandsAsSkillNames(renderSharedMarkdown(await fs.readFile(full, 'utf8'), full, { commands: false }));
    const bytes = Buffer.from(text, 'utf8');
    const { sections, ...head } = parseDocument(rel, text);
    documents.push({ ...head, sha256: sha256(bytes), sections });
    files.set(rel, bytes);
  }
  const sync = JSON.parse(await fs.readFile(path.join(root, MANIFEST_FILE), 'utf8'));
  const manifest = {
    manifest_version: MANIFEST_VERSION,
    source_library_commit: sync.source.commit,
    documents,
  };
  return { manifestText: `${JSON.stringify(manifest, null, 2)}\n`, files };
}

async function readCorpus(out) {
  const files = new Map();
  async function walk(dir, rel) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const childRel = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(path.join(dir, entry.name), childRel);
      else files.set(childRel, await fs.readFile(path.join(dir, entry.name)));
    }
  }
  await walk(path.join(out, 'docs'), '');
  return { manifestText: await fs.readFile(path.join(out, 'manifest.json'), 'utf8'), files };
}

function expectThrow(fn, label) {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error(`guide corpus guard did not fire: ${label}`);
}

function proveGuideCorpus() {
  // Hand-computed: 12 lines. H2 a_b runs to the line before H2 c (3..10); its H3 also ends at 10;
  // the fenced "## not" (line 9) is code. H2 c runs to end of file (11..12).
  const sample = [
    '# T', 'pre', '## `a_b`: x', '**Use when:** u', '**Keywords:** k1, k2', '### Sub', 'body',
    '```', '## not', '```', '## `c`: y', 'end',
  ].join('\n') + '\n';
  const want = {
    path: 'feeds/x/reasons.md',
    title: 'T',
    lines: 12,
    sections: [
      { level: 2, heading: '`a_b`: x', start_line: 3, end_line: 10, reason_code: 'a_b', use_when: 'u', keywords: ['k1', 'k2'] },
      { level: 3, heading: 'Sub', start_line: 6, end_line: 10 },
      { level: 2, heading: '`c`: y', start_line: 11, end_line: 12, reason_code: 'c' },
    ],
  };
  const got = parseDocument('feeds/x/reasons.md', sample);
  if (JSON.stringify(got) !== JSON.stringify(want)) throw new Error(`parseDocument: got ${JSON.stringify(got)}`);
  if (parseDocument('guides/x.md', sample).sections[0].reason_code !== undefined) {
    throw new Error('parseDocument set a reason code outside a reasons file');
  }
  parseDocument('guides/x.md', '# T\n```\n# fenced\n```\n');
  expectThrow(() => parseDocument('guides/x.md', 'no title\n'), 'no H1');
  expectThrow(() => parseDocument('guides/x.md', '# A\n# B\n'), 'two H1s');
  expectThrow(() => parseDocument('feeds/x/reasons.md', '# T\n## `a`: 1\n## `a`: 2\n'), 'duplicate reason code');
  expectThrow(() => parseDocument('guides/x.md', '# T\r\n'), 'CRLF');
  expectThrow(() => parseDocument('guides/x.md', '# T\n\n'), 'two trailing LFs');
  expectThrow(() => parseDocument('guides/x.md', '# T'), 'no trailing LF');

  const bytes = Buffer.from(sample, 'utf8');
  const doc = { ...want, sha256: sha256(bytes) };
  const { sections, ...head } = doc;
  const manifest = (docs) => JSON.stringify({ manifest_version: 1, source_library_commit: 'a'.repeat(40), documents: docs });
  const files = () => new Map([['feeds/x/reasons.md', bytes]]);
  verifyCorpus(manifest([{ ...head, sections }]), files());
  const extra = files().set('guides/extra.md', Buffer.from('# E\n'));
  expectThrow(() => verifyCorpus(manifest([{ ...head, sections }]), extra), 'unlisted file');
  expectThrow(() => verifyCorpus(manifest([{ ...head, sections }]), new Map()), 'missing file');
  const edited = files().set('feeds/x/reasons.md', Buffer.from(sample.replace('body', 'bodY'), 'utf8'));
  expectThrow(() => verifyCorpus(manifest([{ ...head, sections }]), edited), 'hand edit');
  expectThrow(() => verifyCorpus(manifest([{ ...head, lines: 11, sections }]), files()), 'line count');
  const overlap = sections.map((s, i) => (i === 0 ? { ...s, end_line: 11 } : s));
  expectThrow(() => verifyCorpus(manifest([{ ...head, sections: overlap }]), files()), 'overlapping siblings');
}

function parseArgs(argv) {
  let out = 'build/guide-corpus';
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--out') out = argv[++i];
    else if (argv[i].startsWith('--out=')) out = argv[i].slice('--out='.length);
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return out;
}

async function main() {
  assertRepoRoot(import.meta);
  const root = process.cwd();
  const out = resolveGeneratedPath(parseArgs(process.argv));
  proveGuideCorpus();
  const { manifestText, files } = await buildCorpus(root);
  await safeRmGenerated(out);
  for (const [rel, bytes] of files) {
    const target = path.join(out, 'docs', rel);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, bytes);
  }
  await fs.writeFile(path.join(out, 'manifest.json'), manifestText, 'utf8');
  const written = await readCorpus(out);
  const manifest = verifyCorpus(written.manifestText, written.files);
  const sections = manifest.documents.reduce((sum, doc) => sum + doc.sections.length, 0);
  const bytes = [...written.files.values()].reduce((sum, file) => sum + file.length, 0);
  console.log(`guide corpus: ${manifest.documents.length} document(s), ${sections} section(s), ${bytes} byte(s) at ${path.relative(root, out)}`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
