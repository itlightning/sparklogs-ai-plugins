// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Two gates over the synced generated reference set, plus a self-proof that each gate fires.
//
// Gate A (evidence-instrument exclusion): no synced artifact may carry the source library's
// spec-versus-observed columns, witness counts, or the prose that explains them. The library
// measures its own confidence that way; a consumer reading it as a contract would treat an
// unwitnessed decode as a broken one.
//
// Gate B (uncurated is not unexpected): the expected-pattern decision procedure must file a
// pattern whose head matched nothing as UNCURATED, never as UNEXPECTED. Reason names carrying a
// mixed letter-and-digit token are variabilized away before the pattern is derived, so their
// rendered pattern legitimately matches no head. Filing that as unexpected turns a known,
// harmless shape into a standing drift alarm.
//
// Every rule is proved live against a planted fixture on each run. A gate that can pass by
// matching nothing is worth less than no gate: it reports safety it never checked.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';
import {
  ALNUM_TOKEN,
  FORBIDDEN_TABLE_HEADERS,
  FORBIDDEN_TOKENS,
  GENERATED_DIR,
  HEAD_CAVEAT,
  KNOWN_DEFECTS,
  MODULES,
  PUBLIC_ARTIFACTS,
} from './generated-references.config.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const FIXTURES = path.join(ROOT, 'scripts', 'fixtures', 'generated-reference-gates');

function splitRow(line) {
  return line.split(/(?<!\\)\|/);
}

function isDelimiterRow(line) {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes('-');
}

// A1: a table header cell naming an evidence axis.
function ruleEvidenceColumn(lines) {
  const wanted = new Set(FORBIDDEN_TABLE_HEADERS);
  const findings = [];
  lines.forEach((line, index) => {
    if (!line.trimStart().startsWith('|')) return;
    if (!isDelimiterRow(lines[index + 1] ?? '')) return;
    for (const cell of splitRow(line)) {
      const name = cell.trim().toLowerCase();
      if (wanted.has(name)) findings.push({ line: index + 1, detail: `table column "${cell.trim()}"` });
    }
  });
  return findings;
}

// A2: the witness-counting instrument in prose.
function ruleEvidenceProse(lines) {
  const findings = [];
  lines.forEach((line, index) => {
    for (const token of FORBIDDEN_TOKENS) {
      if (token.test(line)) findings.push({ line: index + 1, detail: `evidence prose matching ${token}` });
    }
  });
  return findings;
}

const NEGATED_UNEXPECTED = /not that it is unexpected|rather than unexpected|not unexpected|never unexpected/gi;

// B1/B2/B3: the no-head-match verdict must be uncurated and must not be unexpected.
function ruleUncuratedVerdict(lines) {
  const findings = [];
  const relevant = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => /\bno match\b/i.test(line));
  if (relevant.length === 0) {
    findings.push({ line: 0, detail: 'no "no match" verdict sentence found; the uncurated rule is missing or was reworded' });
    return findings;
  }
  for (const { line, index } of relevant) {
    if (!/\buncurated\b/i.test(line)) {
      findings.push({ line: index + 1, detail: 'the no-head-match verdict does not say uncurated' });
    }
    if (/\bunexpected\b/i.test(line.replace(NEGATED_UNEXPECTED, ''))) {
      findings.push({ line: index + 1, detail: 'the no-head-match verdict asserts unexpected' });
    }
  }
  return findings;
}

// B2: a surface whose reason name carries a mixed letter-and-digit token must not claim it renders
// a stable named pattern, because the head is variabilized away before the pattern is derived.
function ruleAlnumHeadClaim(lines) {
  const findings = [];
  let surface = null;
  let surfaceLine = 0;
  let alnum = false;
  let claim = null;
  let claimLine = 0;
  let caveat = false;
  const close = () => {
    if (surface && alnum && claim && !caveat) {
      findings.push({ line: claimLine, detail: `surface ${surface} claims "${claim}" on a head carrying a mixed letter-and-digit token`, surface, claim });
    }
  };
  lines.forEach((line, index) => {
    const heading = /^###\s+(.*)$/.exec(line);
    if (heading) {
      close();
      surface = heading[1].trim();
      surfaceLine = index + 1;
      const reason = /`([^`]+)`/.exec(surface);
      alnum = reason ? ALNUM_TOKEN.test(reason[1]) : false;
      claim = null;
      caveat = false;
      return;
    }
    if (!surface) return;
    if (HEAD_CAVEAT.test(line)) caveat = true;
    if (claim) return;
    if (/renders exactly one pattern/i.test(line) || /^\*\*Renders:\*\*/.test(line)) {
      claim = line.trim();
      claimLine = index + 1;
    }
  });
  close();
  return findings;
}

const RULES = [
  { id: 'A1-evidence-column', gate: 'A', appliesTo: () => true, run: ruleEvidenceColumn },
  { id: 'A2-evidence-prose', gate: 'A', appliesTo: () => true, run: ruleEvidenceProse },
  { id: 'B1-uncurated-verdict', gate: 'B', appliesTo: (file) => path.basename(file) === 'patterns.md', run: ruleUncuratedVerdict },
  { id: 'B2-alnum-head-claim', gate: 'B', appliesTo: (file) => path.basename(file) === 'patterns.md', run: ruleAlnumHeadClaim },
];

function runRules(file, text) {
  const lines = text.split('\n');
  const findings = [];
  for (const rule of RULES) {
    if (!rule.appliesTo(file)) continue;
    for (const finding of rule.run(lines)) findings.push({ rule: rule.id, file, ...finding });
  }
  return findings;
}

// Each fixture is a planted positive: it MUST trip the rule it names, or the rule is decorative.
const FIXTURE_EXPECTATIONS = [
  { file: 'gate-a-evidence-column.md', rule: 'A1-evidence-column' },
  { file: 'gate-a-witness-prose.md', rule: 'A2-evidence-prose' },
  { file: 'gate-b-verdict-unexpected.patterns.md', rule: 'B1-uncurated-verdict' },
  { file: 'gate-b-verdict-missing.patterns.md', rule: 'B1-uncurated-verdict' },
  { file: 'gate-b-alnum-head-claim.patterns.md', rule: 'B2-alnum-head-claim' },
];

async function proveGatesFire() {
  const failures = [];
  for (const expectation of FIXTURE_EXPECTATIONS) {
    const file = path.join(FIXTURES, expectation.file);
    const text = await fs.readFile(file, 'utf8');
    // B rules key off the file name, so a fixture proving one must present as that artifact.
    const asName = expectation.file.endsWith('.patterns.md') ? 'patterns.md' : expectation.file;
    const findings = runRules(asName, text);
    if (!findings.some((finding) => finding.rule === expectation.rule)) {
      failures.push(`fixture ${expectation.file} did not trip ${expectation.rule}; that rule is not doing anything`);
    }
  }
  if (failures.length > 0) throw new Error(`Gate self-proof failed:\n  ${failures.join('\n  ')}`);
  console.log(`generated-references gates: ${FIXTURE_EXPECTATIONS.length} planted positives all fired`);
}

function matchesKnownDefect(artifact, finding) {
  return KNOWN_DEFECTS.find((defect) => defect.artifact === artifact
    && defect.surface === finding.surface
    && defect.claim === finding.claim);
}

async function scanGenerated() {
  const findings = [];
  const excused = new Set();
  let scanned = 0;
  for (const module of MODULES) {
    const dir = path.join(ROOT, GENERATED_DIR, module);
    // Enumerate the directory rather than the config list. Iterating only the artifacts we expect
    // makes every gate blind to anything else committed alongside them, which is the one file
    // that would most want to hide there.
    let present;
    try {
      present = (await fs.readdir(dir)).sort();
    } catch {
      throw new Error(`Missing synced module directory ${path.relative(ROOT, dir)}. Run: yarn sync-generated`);
    }
    for (const artifact of PUBLIC_ARTIFACTS) {
      if (!present.includes(artifact)) {
        throw new Error(`Missing synced artifact ${path.relative(ROOT, path.join(dir, artifact))}. Run: yarn sync-generated`);
      }
    }
    const stray = present.filter((name) => !PUBLIC_ARTIFACTS.includes(name));
    if (stray.length > 0) {
      throw new Error(
        `${path.relative(ROOT, dir)} holds files the sync does not produce: ${stray.join(', ')}. `
        + 'Nothing may be added to a synced module by hand.',
      );
    }
    for (const artifact of present) {
      scanned += 1;
      const text = await fs.readFile(path.join(dir, artifact), 'utf8');
      for (const finding of runRules(artifact, text)) {
        const defect = matchesKnownDefect(artifact, finding);
        if (defect) {
          excused.add(`${defect.artifact}::${defect.surface}::${defect.claim}`);
          continue;
        }
        findings.push({ ...finding, file: path.relative(ROOT, path.join(dir, artifact)) });
      }
    }
  }
  if (findings.length > 0) {
    const lines = findings.map((f) => `  [${f.rule}] ${f.file}:${f.line} ${f.detail}`);
    throw new Error(`generated-references gates failed:\n${lines.join('\n')}`);
  }
  // Checked in both directions: an entry that no longer excuses anything is a defect the library
  // has fixed, and leaving it here would quietly excuse the next occurrence.
  const stale = KNOWN_DEFECTS.filter((defect) => !excused.has(`${defect.artifact}::${defect.surface}::${defect.claim}`));
  if (stale.length > 0) {
    const lines = stale.map((d) => `  ${d.artifact} ${d.surface}: "${d.claim}" (${d.escalation})`);
    throw new Error(`Known-defect entries no longer match anything; delete them:\n${lines.join('\n')}`);
  }
  console.log(`generated-references gates: ${scanned} synced artifact(s) clean, ${KNOWN_DEFECTS.length} known defect(s) pinned`);
}

async function main() {
  await proveGatesFire();
  await scanGenerated();
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
