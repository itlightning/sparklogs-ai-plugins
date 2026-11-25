// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
//
// Fails on any known advisory against a third-party dependency this repo locks.
//
// Scans every tracked lockfile (today `yarn.lock`) with the pinned osv-scanner
// (`scripts/osv-scanner-pin.yaml`) against the live OSV database. Any advisory fails, whatever its
// severity, unless `osv-scanner.toml` carries an `[[IgnoredVulns]]` entry with its id and a reason;
// that file accepts nothing else, so a package-wide or severity-based exception cannot be written.
// An unreachable database, a scanner error, a lockfile that yields no packages, or a manifest with
// no lockfile also fails: none of them is a clean result. Needs network on every run.
import { spawnSync, execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { assertRepoRoot } from './assert-repo-root.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const PIN_FILE = path.join(ROOT, 'scripts', 'osv-scanner-pin.yaml');
const IGNORE_FILE = path.join(ROOT, 'osv-scanner.toml');

// Lockfile names osv-scanner reads, matched on the basename of every tracked file. A manifest with
// no lockfile beside it cannot be scanned exactly, so it is an error rather than a silent skip.
const LOCKFILE_NAMES = new Set([
  'Pipfile.lock', 'poetry.lock', 'uv.lock', 'pdm.lock', 'pylock.toml',
  'package-lock.json', 'npm-shrinkwrap.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lock',
  'Cargo.lock', 'go.mod', 'Gemfile.lock', 'composer.lock',
]);
const MANIFEST_LOCKFILES = {
  'package.json': ['package-lock.json', 'npm-shrinkwrap.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lock'],
  'pyproject.toml': ['poetry.lock', 'uv.lock', 'pdm.lock', 'pylock.toml'],
  'Cargo.toml': ['Cargo.lock'],
  Gemfile: ['Gemfile.lock'],
  'composer.json': ['composer.lock'],
};

function isLockfile(name) {
  return LOCKFILE_NAMES.has(name) || (name.startsWith('requirements') && name.endsWith('.txt'));
}

/** [lockfiles to scan, errors for manifests with no lockfile beside them]. */
function findLockfiles(paths) {
  const present = new Set(paths);
  const locks = [];
  const errors = [];
  for (const p of [...paths].sort()) {
    const slash = p.lastIndexOf('/');
    const parent = slash < 0 ? '' : p.slice(0, slash + 1);
    const name = p.slice(slash + 1);
    if (isLockfile(name)) locks.push(p);
    const partners = MANIFEST_LOCKFILES[name];
    if (partners && !partners.some((lf) => present.has(`${parent}${lf}`))) {
      errors.push(`${p}: manifest with no lockfile (${partners.join(' or ')}); `
        + 'commit one so its exact versions can be scanned');
    }
  }
  return [locks, errors];
}

// The ignore file is read with a strict line grammar rather than a general TOML parser: every line
// is blank, a comment, an `[[IgnoredVulns]]` header, or one of the three allowed keys with a
// single-line basic string (no escapes) or a date, each optionally followed by a comment. Each
// accepted line means the same to osv-scanner's TOML parser, so the two cannot disagree; anything
// else (other tables, multi-line or escaped strings, other keys) is an error.
const COMMENT = String.raw`\s*(?:#.*)?$`;
const HEADER_RE = new RegExp(String.raw`^\s*\[\[\s*IgnoredVulns\s*\]\]${COMMENT}`);
const STRING_RE = new RegExp(String.raw`^\s*(id|reason)\s*=\s*"([^"\\]*)"${COMMENT}`);
const DATE_RE = new RegExp(String.raw`^\s*(ignoreUntil)\s*=\s*(\d{4}-\d{2}-\d{2})${COMMENT}`);
const SKIP_RE = new RegExp(String.raw`^${COMMENT}`);

/** Every way `text` departs from "a list of advisory ids, each with a reason". */
function ignoreFileErrors(text, where = 'osv-scanner.toml') {
  const errors = [];
  const entries = [];
  text.split(/\r?\n/).forEach((line, i) => {
    const at = `${where}:${i + 1}`;
    if (SKIP_RE.test(line)) return;
    if (HEADER_RE.test(line)) {
      entries.push({ at, keys: {} });
      return;
    }
    const m = STRING_RE.exec(line) ?? DATE_RE.exec(line);
    if (!m) {
      errors.push(`${at}: not allowed; the only exception is an [[IgnoredVulns]] entry with `
        + 'id = "...", reason = "..." and optional ignoreUntil = YYYY-MM-DD, one line each');
      return;
    }
    const entry = entries.at(-1);
    if (!entry) {
      errors.push(`${at}: ${m[1]} outside an [[IgnoredVulns]] entry`);
    } else if (m[1] in entry.keys) {
      errors.push(`${at}: ${m[1]} given twice in one entry`);
    } else {
      entry.keys[m[1]] = m[2];
    }
  });
  const seen = new Set();
  for (const { at, keys } of entries) {
    const id = (keys.id ?? '').trim();
    if (!id) errors.push(`${at}: entry needs an advisory id`);
    else if (seen.has(id)) errors.push(`${at}: ${id} is listed twice`);
    else seen.add(id);
    if (!(keys.reason ?? '').trim()) errors.push(`${at}: entry needs a reason`);
  }
  return errors;
}

function platformKey() {
  const os = { win32: 'windows' }[process.platform] ?? process.platform;
  const arch = { x64: 'x86_64', arm64: 'aarch64' }[process.arch] ?? process.arch;
  return `${os}-${arch}`;
}

function loadScannerAsset() {
  const doc = yaml.load(fs.readFileSync(PIN_FILE, 'utf8')) ?? {};
  const assets = doc.assets ?? {};
  const key = platformKey();
  const entry = assets[key];
  if (!doc.version || !entry?.url || !entry?.sha256) {
    throw new Error(`${PIN_FILE}: no osv-scanner asset for ${key} `
      + `(pinned: ${Object.keys(assets).sort().join(', ') || 'none'})`);
  }
  return { version: String(doc.version), url: String(entry.url), sha256: String(entry.sha256).toLowerCase() };
}

/** Downloads on first use, then verifies the digest on every use; a mismatched file is deleted. */
async function scannerBinary(asset) {
  const binary = path.join(ROOT, 'build', 'osv-scanner', asset.version, asset.url.split('/').at(-1));
  if (!fs.existsSync(binary)) {
    fs.mkdirSync(path.dirname(binary), { recursive: true });
    console.error(`Downloading pinned osv-scanner ${asset.version}...`);
    const tmp = `${binary}.tmp`;
    try {
      const resp = await fetch(asset.url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      fs.writeFileSync(tmp, Buffer.from(await resp.arrayBuffer()));
      fs.renameSync(tmp, binary);
    } catch (error) {
      fs.rmSync(tmp, { force: true });
      throw new Error(`failed to download pinned osv-scanner from ${asset.url}: ${error.message}`);
    }
  }
  const digest = crypto.createHash('sha256').update(fs.readFileSync(binary)).digest('hex');
  if (digest !== asset.sha256) {
    fs.rmSync(binary, { force: true });
    throw new Error(`pinned osv-scanner digest mismatch for ${binary}\n  expected: ${asset.sha256}\n`
      + `  actual:   ${digest}\nStale file removed; re-run to download it again.`);
  }
  if (process.platform !== 'win32') fs.chmodSync(binary, 0o755);
  return binary;
}

function scan(binary, lockfiles) {
  const argv = ['scan', 'source', '--all-vulns', '--all-packages', '--format', 'json',
    '--config', IGNORE_FILE, ...lockfiles.flatMap((lf) => ['--lockfile', lf])];
  const proc = spawnSync(binary, argv, { cwd: ROOT, maxBuffer: 256 * 1024 * 1024 });
  if (proc.error) throw new Error(`osv-scanner did not run: ${proc.error.message}`);
  // 0: no advisory, 1: advisories found. Anything else (network, parse, no packages) is a failure
  // to check, never a pass.
  if (proc.status !== 0 && proc.status !== 1) {
    process.stderr.write(proc.stderr);
    throw new Error(`osv-scanner exited ${proc.status}; advisories NOT checked`);
  }
  let results;
  try {
    results = JSON.parse(proc.stdout.toString('utf8')).results ?? [];
  } catch (error) {
    throw new Error(`unreadable osv-scanner output: ${error.message}`);
  }
  const counts = new Map();
  const findings = [];
  for (const result of results) {
    let source = result.source?.path ?? '?';
    if (path.isAbsolute(source)) source = path.relative(ROOT, source);
    source = source.split(path.sep).join('/');
    const packages = result.packages ?? [];
    counts.set(source, (counts.get(source) ?? 0) + packages.length);
    for (const pkg of packages) {
      const info = pkg.package ?? {};
      for (const vuln of pkg.vulnerabilities ?? []) {
        const aliases = (vuln.aliases ?? []).join(', ');
        findings.push(`${vuln.id} ${info.ecosystem} ${info.name} ${info.version} (${source})`
          + `${aliases ? ` aliases: ${aliases}` : ''}${vuln.summary ? `: ${vuln.summary}` : ''}`);
      }
    }
  }
  const empty = lockfiles.filter((lf) => !counts.get(lf));
  if (empty.length > 0) throw new Error(`no packages read from ${empty.join(', ')}`);
  if (findings.length > 0 || proc.status === 1) {
    throw new Error(`${findings.length} known advisor${findings.length === 1 ? 'y' : 'ies'} `
      + `(upgrade, or add a reviewed [[IgnoredVulns]] entry to osv-scanner.toml):\n  `
      + `${(findings.length ? findings : ['(osv-scanner reported advisories; rerun it for detail)']).join('\n  ')}`);
  }
  return [...counts.values()].reduce((a, b) => a + b, 0);
}

function trackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], { cwd: ROOT }).toString('utf8').split('\0').filter(Boolean);
}

function proveAdvisoryRules() {
  const failed = [];
  const expect = (name, ok) => { if (!ok) failed.push(name); };
  const errs = (text) => ignoreFileErrors(text, 'planted.toml');
  const has = (text, needle) => errs(text).some((e) => e.includes(needle));
  expect('id + reason entry accepted',
    errs('[[IgnoredVulns]]\nid = "GHSA-1"\nreason = "not reached"  # note\nignoreUntil = 2027-01-31\n').length === 0);
  expect('entry without reason rejected', has('[[IgnoredVulns]]\nid = "GHSA-1"\n', 'needs a reason'));
  expect('blank reason rejected', has('[[IgnoredVulns]]\nid = "GHSA-1"\nreason = "  "\n', 'needs a reason'));
  expect('entry without id rejected', has('[[IgnoredVulns]]\nreason = "x"\n', 'needs an advisory id'));
  expect('duplicate id rejected',
    has('[[IgnoredVulns]]\nid = "A"\nreason = "x"\n[[IgnoredVulns]]\nid = "A"\nreason = "y"\n', 'listed twice'));
  expect('package-wide ignore rejected',
    has('[[PackageOverrides]]\nname = "js-yaml"\necosystem = "npm"\nignore = true\n', 'planted.toml:1'));
  expect('unknown entry key rejected',
    has('[[IgnoredVulns]]\nid = "A"\nreason = "x"\nseverity = "low"\n', 'planted.toml:4'));
  expect('top-level key rejected', has('id = "A"\nreason = "x"\n', 'outside an [[IgnoredVulns]] entry'));
  expect('multi-line string rejected', has('[[IgnoredVulns]]\nid = "A"\nreason = """x\ny"""\n', 'planted.toml:3'));
  expect('escaped string rejected', has('[[IgnoredVulns]]\nid = "A"\nreason = "a\\"b"\n', 'planted.toml:3'));
  expect('repeated key rejected', has('[[IgnoredVulns]]\nid = "A"\nid = "B"\nreason = "x"\n', 'given twice'));

  const [locks, lockErrs] = findLockfiles(['yarn.lock', 'package.json', 'a/package.json', 'b/Cargo.lock',
    'tools/requirements-ci.txt', 'docs/requirements.md', 'c/pyproject.toml', 'c/uv.lock']);
  expect('lockfiles discovered',
    JSON.stringify(locks) === JSON.stringify(['b/Cargo.lock', 'c/uv.lock', 'tools/requirements-ci.txt', 'yarn.lock']));
  expect('manifest without lockfile rejected', lockErrs.length === 1 && lockErrs[0].startsWith('a/package.json'));
  if (failed.length > 0) throw new Error(`advisory check self-proof failed:\n  ${failed.join('\n  ')}`);
}

proveAdvisoryRules();
console.log('advisory rules: planted negatives all fired');

const errors = ignoreFileErrors(fs.readFileSync(IGNORE_FILE, 'utf8'));
const [lockfiles, lockErrors] = findLockfiles(trackedFiles());
errors.push(...lockErrors);
if (lockfiles.length === 0) errors.push('no tracked lockfile found; expected at least yarn.lock');
if (errors.length > 0) throw new Error(`advisory check failed:\n  ${errors.join('\n  ')}`);

const asset = loadScannerAsset();
const started = performance.now();
const total = scan(await scannerBinary(asset), lockfiles);
console.log(`advisories: clean (${total} package(s) in ${lockfiles.length} lockfile(s); `
  + `osv-scanner ${asset.version}, ${((performance.now() - started) / 1000).toFixed(1)}s)`);
