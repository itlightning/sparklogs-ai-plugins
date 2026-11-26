// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
//
// Fails on any known advisory against a dependency this repo locks.
//
// Scans every tracked lockfile (today `yarn.lock`) with the pinned osv-scanner
// (`scripts/osv-scanner-pin.yaml`) against the live OSV database. Any advisory fails, whatever its
// severity, unless `osv-scanner.toml` carries an `[[IgnoredVulns]]` entry with its id, a reason and
// an `ignoreUntil` date at most 90 days out; the entry lapses on that date (UTC), and an entry that
// matches no current advisory fails as stale. A locked package that does not come from the npm
// registry (a patch, git, tarball or file locator) fails unless `advisory-sources.json` declares
// the registry release it copies; that release is then checked through the OSV query API under the
// same exception rules. A package of this repo's own workspace is not a dependency.
//
// Fails closed: an unreachable database, a scanner error, unreadable output, a lockfile that
// yields no packages, a manifest with no lockfile, or a known-vulnerable control package that
// comes back clean is a failure to check, never a pass. Needs network on every run.
//
//   node scripts/check-advisories.mjs [--github-output <file>]
//
// --github-output appends `findings=<ids>` (space-separated advisory ids that failed the check,
// empty when the failure is not an advisory) to <file>, for a CI job output.
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
const SOURCES_FILE = path.join(ROOT, 'advisory-sources.json');
const WORK_DIR = path.join(ROOT, 'build', 'osv-scanner');
const OSV_QUERY_URL = 'https://api.osv.dev/v1/query';
const MAX_EXCEPTION_DAYS = 90;

// A package with a long-published advisory that both the scanner and the query API must return.
// An answer without it means the database did not really answer, whatever the exit code says.
const CONTROL = { ecosystem: 'npm', name: 'lodash', version: '4.17.15', advisory: 'GHSA-p6mc-m468-83gw' };
const CONTROL_LOCKFILE = path.join(WORK_DIR, 'control', 'package-lock.json');

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

/** Today's date in UTC as YYYY-MM-DD; the only reader of the wall clock. */
function utcToday(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

/** Days since the epoch for a real calendar date YYYY-MM-DD, or NaN. */
function dayNumber(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  if (!m) return NaN;
  const ms = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Date(ms).toISOString().slice(0, 10) === iso ? ms / 86_400_000 : NaN;
}

// The ignore file is read with a strict line grammar rather than a general TOML parser: every line
// is blank, a comment, an `[[IgnoredVulns]]` header, or one of the three allowed keys with a
// single-line basic string (no escapes) or a bare date, each optionally followed by a comment.
// Each accepted line means the same to osv-scanner's TOML parser, so the two cannot disagree;
// anything else (other tables, multi-line or escaped strings, other keys) is an error.
const COMMENT = String.raw`\s*(?:#.*)?$`;
const HEADER_RE = new RegExp(String.raw`^\s*\[\[\s*IgnoredVulns\s*\]\]${COMMENT}`);
const STRING_RE = new RegExp(String.raw`^\s*(id|reason)\s*=\s*"([^"\\]*)"${COMMENT}`);
const DATE_RE = new RegExp(String.raw`^\s*(ignoreUntil)\s*=\s*([^\s#]+)${COMMENT}`);
const SKIP_RE = new RegExp(String.raw`^${COMMENT}`);
// One exact advisory id. Matching is by equality, so no entry can cover more than one id; this
// refuses text that looks like a pattern.
const ID_RE = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;

/**
 * Parses the ignore file and checks each entry against `today` (YYYY-MM-DD, UTC).
 * Returns { entries: [{ at, id }], errors }.
 */
function readExceptions(text, today, where = 'osv-scanner.toml') {
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
        + 'id = "...", reason = "..." and ignoreUntil = YYYY-MM-DD, one line each');
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
  const todayDay = dayNumber(today);
  for (const { at, keys } of entries) {
    const id = (keys.id ?? '').trim();
    if (!id) errors.push(`${at}: entry needs an advisory id`);
    else if (!ID_RE.test(id)) errors.push(`${at}: "${id}" is not one advisory id`);
    else if (seen.has(id)) errors.push(`${at}: ${id} is listed twice`);
    else seen.add(id);
    if (!(keys.reason ?? '').trim()) errors.push(`${at}: entry needs a reason`);
    const until = keys.ignoreUntil;
    const untilDay = dayNumber(until);
    if (until === undefined) {
      errors.push(`${at}: entry needs ignoreUntil = YYYY-MM-DD, at most ${MAX_EXCEPTION_DAYS} days out`);
    } else if (Number.isNaN(untilDay)) {
      errors.push(`${at}: ignoreUntil ${until} is not a date YYYY-MM-DD`);
    } else if (untilDay <= todayDay) {
      errors.push(`${at}: ${id} lapsed on ${until} (today ${today} UTC); upgrade, or review and renew it`);
    } else if (untilDay - todayDay > MAX_EXCEPTION_DAYS) {
      errors.push(`${at}: ignoreUntil ${until} is more than ${MAX_EXCEPTION_DAYS} days after ${today}`);
    }
  }
  return { entries: entries.map(({ at, keys }) => ({ at, id: (keys.id ?? '').trim() })), errors };
}

/**
 * Splits findings ([{ id, line }]) into those no exception covers and the exception entries that
 * cover nothing (stale).
 */
function applyExceptions(findings, exceptions) {
  const excepted = new Set(exceptions.map((e) => e.id));
  const found = new Set(findings.map((f) => f.id));
  return {
    open: findings.filter((f) => !excepted.has(f.id)),
    stale: exceptions.filter((e) => !found.has(e.id))
      .map((e) => `${e.at}: ${e.id} matches no current advisory; remove the entry`),
  };
}

/** Package name of a yarn locator or resolution (`@scope/name@...` or `name@...`). */
function locatorName(locator) {
  const at = locator.indexOf('@', locator.startsWith('@') ? 1 : 0);
  return at < 0 ? locator : locator.slice(0, at);
}

/**
 * Every locked package in a yarn (berry) lockfile that does not come from the registry:
 * [{ name, locked }], `locked` being the resolution exactly as the lockfile records it.
 * `npm:` is the registry; `workspace:` is a package of this repository, so not a dependency.
 */
function yarnNonRegistry(text, where) {
  let doc;
  try {
    doc = yaml.load(text);
  } catch (error) {
    throw new Error(`${where}: unreadable lockfile: ${error.message}`);
  }
  if (!doc?.__metadata?.version) {
    throw new Error(`${where}: not a yarn berry lockfile; its package sources cannot be checked`);
  }
  const out = [];
  for (const [key, entry] of Object.entries(doc)) {
    if (key === '__metadata') continue;
    const locked = entry?.resolution;
    if (typeof locked !== 'string') throw new Error(`${where}: entry ${key} has no resolution`);
    const name = locatorName(locked);
    const protocol = locked.slice(name.length + 1).split(':')[0];
    if (protocol === 'npm' || protocol === 'workspace') continue;
    out.push({ name, locked });
  }
  return out;
}

/** Non-registry packages in one lockfile, by lockfile kind; a kind with no reader fails closed. */
function nonRegistryPackages(lockPath, text) {
  if (path.posix.basename(lockPath) === 'yarn.lock') {
    return yarnNonRegistry(text, lockPath).map((p) => ({ ...p, ecosystem: 'npm', where: lockPath }));
  }
  throw new Error(`${lockPath}: no reader for this lockfile's package sources, so a non-registry `
    + 'package in it could pass undeclared; add one to scripts/check-advisories.mjs');
}

const SOURCE_FIELDS = ['ecosystem', 'upstream', 'version', 'why', 'locked'];
const SOURCE_OPTIONAL = ['commit'];
const ECOSYSTEMS = new Set(['Go', 'npm', 'Pub']);

/**
 * Checks `advisory-sources.json` against the non-registry packages the lockfiles hold.
 * Returns { declared: [{ name, ecosystem, upstream, version }], errors }.
 */
function declaredSources(doc, packages, where = 'advisory-sources.json') {
  const errors = [];
  const declared = [];
  if (doc === null || typeof doc !== 'object' || Array.isArray(doc)) {
    return { declared, errors: [`${where}: must be a JSON object keyed by package name`] };
  }
  const byName = new Map();
  for (const p of packages) {
    const prior = byName.get(p.name);
    if (prior) {
      errors.push(`${p.where}: ${p.name} has two non-registry locators (${prior.locked}, ${p.locked}); `
        + 'one entry declares one');
    } else {
      byName.set(p.name, p);
    }
  }
  for (const [name, entry] of Object.entries(doc)) {
    const at = `${where}: ${name}`;
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${at}: entry must be an object`);
      continue;
    }
    const missing = SOURCE_FIELDS.filter((f) => typeof entry[f] !== 'string' || !entry[f].trim());
    const unknown = Object.keys(entry).filter((f) => !SOURCE_FIELDS.includes(f) && !SOURCE_OPTIONAL.includes(f));
    if (missing.length) errors.push(`${at}: missing ${missing.join(', ')}`);
    if (unknown.length) errors.push(`${at}: unknown field ${unknown.join(', ')}`);
    if ('commit' in entry && (typeof entry.commit !== 'string' || !entry.commit.trim())) {
      errors.push(`${at}: commit must be a non-empty string when given`);
    }
    if (missing.length || unknown.length) continue;
    if (!ECOSYSTEMS.has(entry.ecosystem)) {
      errors.push(`${at}: ecosystem ${entry.ecosystem} is not one of ${[...ECOSYSTEMS].join(', ')}`);
      continue;
    }
    const pkg = byName.get(name);
    if (!pkg || pkg.ecosystem !== entry.ecosystem) {
      errors.push(`${at}: matches no non-registry dependency; remove the entry`);
      continue;
    }
    if (pkg.locked !== entry.locked) {
      errors.push(`${at}: locked is ${entry.locked} but ${pkg.where} locks ${pkg.locked}; `
        + 'review the new copy and update the entry');
      continue;
    }
    declared.push({ name, ecosystem: entry.ecosystem, upstream: entry.upstream, version: entry.version });
  }
  for (const p of byName.values()) {
    if (!Object.hasOwn(doc, p.name)) {
      errors.push(`${p.where}: ${p.locked} does not come from the registry; declare the release it `
        + `copies in ${where}`);
    }
  }
  return { declared, errors };
}

/** Advisory ids OSV holds for one registry package version; any transport or shape fault throws. */
async function queryOsv(fetchFn, { ecosystem, name, version }) {
  const ids = [];
  let pageToken;
  do {
    const body = { package: { name, ecosystem }, version };
    if (pageToken) body.page_token = pageToken;
    let json;
    try {
      const resp = await fetchFn(OSV_QUERY_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30_000),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      json = await resp.json();
    } catch (error) {
      throw new Error(`OSV query for ${ecosystem} ${name} ${version} failed: ${error.message}; advisories NOT checked`);
    }
    // No advisory is `{}`; a long answer pages through next_page_token.
    if (json === null || typeof json !== 'object' || (json.vulns !== undefined && !Array.isArray(json.vulns))) {
      throw new Error(`OSV query for ${ecosystem} ${name} ${version}: unexpected response shape`);
    }
    for (const v of json.vulns ?? []) {
      if (typeof v?.id !== 'string') throw new Error(`OSV query for ${name}: advisory without an id`);
      ids.push(v.id);
    }
    pageToken = json.next_page_token;
  } while (pageToken);
  return ids;
}

/** Findings for declared sources, after proving the query API answers for the control package. */
async function declaredFindings(fetchFn, declared) {
  if (declared.length === 0) return [];
  const control = await queryOsv(fetchFn, CONTROL);
  if (!control.includes(CONTROL.advisory)) {
    throw new Error(`OSV query API did not return ${CONTROL.advisory} for control ${CONTROL.name} `
      + `${CONTROL.version}; the database did not really answer, advisories NOT checked`);
  }
  const findings = [];
  for (const d of declared) {
    for (const id of await queryOsv(fetchFn, { ecosystem: d.ecosystem, name: d.upstream, version: d.version })) {
      findings.push({ id, line: `${id} ${d.ecosystem} ${d.upstream} ${d.version} (declared source ${d.name})` });
    }
  }
  return findings;
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
  const binary = path.join(WORK_DIR, asset.version, asset.url.split('/').at(-1));
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

/** Writes the control lockfile and an exception-free scanner config, fresh on every run. */
function writeScanInputs() {
  fs.mkdirSync(path.dirname(CONTROL_LOCKFILE), { recursive: true });
  fs.writeFileSync(CONTROL_LOCKFILE, `${JSON.stringify({
    name: 'osv-control',
    lockfileVersion: 3,
    requires: true,
    packages: {
      '': { name: 'osv-control', dependencies: { [CONTROL.name]: CONTROL.version } },
      [`node_modules/${CONTROL.name}`]: {
        version: CONTROL.version,
        resolved: `https://registry.npmjs.org/${CONTROL.name}/-/${CONTROL.name}-${CONTROL.version}.tgz`,
      },
    },
  }, null, 2)}\n`);
  // Exceptions are applied here, not by the scanner, so an entry that matches nothing is visible.
  const config = path.join(WORK_DIR, 'no-exceptions.toml');
  fs.writeFileSync(config, '');
  return config;
}

/** Scans the lockfiles plus the control. Returns { findings: [{ id, line }], total }. */
function scan(binary, lockfiles) {
  const config = writeScanInputs();
  const control = path.relative(ROOT, CONTROL_LOCKFILE).split(path.sep).join('/');
  const argv = ['scan', 'source', '--all-vulns', '--all-packages', '--format', 'json',
    '--config', config, ...[...lockfiles, control].flatMap((lf) => ['--lockfile', lf])];
  const proc = spawnSync(binary, argv, { cwd: ROOT, maxBuffer: 256 * 1024 * 1024 });
  if (proc.error) throw new Error(`osv-scanner did not run: ${proc.error.message}`);
  // 0: no advisory, 1: advisories found (always, given the control). Anything else (network,
  // parse, no packages) is a failure to check, never a pass.
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
  let controlSeen = false;
  for (const result of results) {
    let source = result.source?.path ?? '?';
    if (path.isAbsolute(source)) source = path.relative(ROOT, source);
    source = source.split(path.sep).join('/');
    const packages = result.packages ?? [];
    counts.set(source, (counts.get(source) ?? 0) + packages.length);
    for (const pkg of packages) {
      const info = pkg.package ?? {};
      for (const vuln of pkg.vulnerabilities ?? []) {
        if (source === control) {
          if (vuln.id === CONTROL.advisory) controlSeen = true;
          continue;
        }
        const aliases = (vuln.aliases ?? []).join(', ');
        findings.push({
          id: String(vuln.id),
          line: `${vuln.id} ${info.ecosystem} ${info.name} ${info.version} (${source})`
            + `${aliases ? ` aliases: ${aliases}` : ''}${vuln.summary ? `: ${vuln.summary}` : ''}`,
        });
      }
    }
  }
  if (!controlSeen) {
    throw new Error(`osv-scanner did not report ${CONTROL.advisory} for control ${CONTROL.name} `
      + `${CONTROL.version}; the database did not really answer, advisories NOT checked`);
  }
  const empty = lockfiles.filter((lf) => !counts.get(lf));
  if (empty.length > 0) throw new Error(`no packages read from ${empty.join(', ')}`);
  return { findings, total: lockfiles.reduce((sum, lf) => sum + counts.get(lf), 0) };
}

function trackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], { cwd: ROOT }).toString('utf8').split('\0').filter(Boolean);
}

/** Planted inputs for every rule above; runs in-process with no network before each real check. */
async function proveAdvisoryRules() {
  const failed = [];
  const expect = (name, ok) => { if (!ok) failed.push(name); };
  const today = '2026-11-25';
  const errs = (text, day = today) => readExceptions(text, day, 'planted.toml').errors;
  const has = (text, needle, day = today) => errs(text, day).some((e) => e.includes(needle));
  const entry = (until) => `[[IgnoredVulns]]\nid = "GHSA-1"\nreason = "not reached"\n${until}`;

  expect('id + reason + ignoreUntil entry accepted', errs(entry('ignoreUntil = 2027-01-31  # note\n')).length === 0);
  expect('entry without reason rejected', has('[[IgnoredVulns]]\nid = "GHSA-1"\nignoreUntil = 2027-01-01\n', 'needs a reason'));
  expect('blank reason rejected', has('[[IgnoredVulns]]\nid = "GHSA-1"\nreason = "  "\n', 'needs a reason'));
  expect('entry without id rejected', has('[[IgnoredVulns]]\nreason = "x"\n', 'needs an advisory id'));
  expect('wildcard id rejected',
    has('[[IgnoredVulns]]\nid = "GHSA-*"\nreason = "x"\nignoreUntil = 2027-01-01\n', 'not one advisory id'));
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
  expect('missing ignoreUntil rejected', has(entry(''), 'needs ignoreUntil'));
  expect('impossible ignoreUntil date rejected', has(entry('ignoreUntil = 2027-02-30\n'), 'is not a date'));
  expect('quoted ignoreUntil rejected', has(entry('ignoreUntil = "2027-01-01"\n'), 'is not a date'));
  expect('ignoreUntil 90 days out accepted', errs(entry('ignoreUntil = 2027-02-23\n')).length === 0);
  expect('ignoreUntil 91 days out rejected', has(entry('ignoreUntil = 2027-02-24\n'), 'more than 90 days'));
  expect('entry lapses on its date', has(entry('ignoreUntil = 2026-11-25\n'), 'lapsed on 2026-11-25'));
  expect('entry holds the day before its date', errs(entry('ignoreUntil = 2026-11-26\n')).length === 0);
  expect('lapse across a month end', has(entry('ignoreUntil = 2026-12-01\n'), 'lapsed', '2026-12-01'));
  expect('today is the UTC date', utcToday(new Date('2026-11-25T23:30:00-05:00')) === '2026-11-26');

  const applied = applyExceptions([{ id: 'A', line: 'A' }, { id: 'B', line: 'B' }],
    [{ at: 'x:1', id: 'A' }, { at: 'x:4', id: 'C' }]);
  expect('exception covers exactly its id', applied.open.length === 1 && applied.open[0].id === 'B');
  expect('exception matching nothing is stale', applied.stale.length === 1 && applied.stale[0].startsWith('x:4: C'));

  const [locks, lockErrs] = findLockfiles(['yarn.lock', 'package.json', 'a/package.json', 'b/Cargo.lock',
    'tools/requirements-ci.txt', 'docs/requirements.md', 'c/pyproject.toml', 'c/uv.lock']);
  expect('lockfiles discovered',
    JSON.stringify(locks) === JSON.stringify(['b/Cargo.lock', 'c/uv.lock', 'tools/requirements-ci.txt', 'yarn.lock']));
  expect('manifest without lockfile rejected', lockErrs.length === 1 && lockErrs[0].startsWith('a/package.json'));

  const lock = [
    '__metadata:\n  version: 8\n',
    '"js-yaml@npm:4.3.2":\n  resolution: "js-yaml@npm:4.3.2"\n',
    '"@scope/x@npm:1.0.0":\n  resolution: "@scope/x@npm:1.0.0"\n',
    '"me@workspace:.":\n  resolution: "me@workspace:."\n',
    '"typescript@patch:typescript@npm%3A5.9.3#~builtin<compat/typescript>":\n'
      + '  resolution: "typescript@patch:typescript@npm%3A5.9.3#optional!builtin<compat/typescript>::version=5.9.3&hash=5786d5"\n',
    '"left@https://github.com/o/left.git#commit=abc":\n  resolution: "left@https://github.com/o/left.git#commit=abc"\n',
    '"@s/tar@https://example.com/t.tgz":\n  resolution: "@s/tar@https://example.com/t.tgz"\n',
    '"vendored@file:./vendor/v.tgz::locator=me%40workspace%3A.":\n'
      + '  resolution: "vendored@file:./vendor/v.tgz#./vendor/v.tgz::hash=1&locator=me%40workspace%3A."\n',
  ].join('');
  const pkgs = nonRegistryPackages('yarn.lock', lock);
  expect('registry and workspace packages need no declaration',
    JSON.stringify(pkgs.map((p) => p.name)) === JSON.stringify(['typescript', 'left', '@s/tar', 'vendored']));
  const throws = (fn) => { try { fn(); return false; } catch { return true; } };
  expect('yarn v1 lockfile fails closed',
    throws(() => nonRegistryPackages('yarn.lock', '# yarn lockfile v1\n\nx@^1:\n  version "1.0.0"\n')));
  expect('lockfile kind with no source reader fails closed', throws(() => nonRegistryPackages('b/Cargo.lock', '')));

  const decl = (name, over = {}) => ({ [name]: {
    ecosystem: 'npm', upstream: name, version: '1.0.0', why: 'fork with a fix',
    locked: pkgs.find((p) => p.name === name)?.locked ?? 'x', ...over,
  } });
  const all = { ...decl('typescript'), ...decl('left', { commit: 'abc' }), ...decl('@s/tar'), ...decl('vendored') };
  const ds = (doc) => declaredSources(doc, pkgs, 'planted.json');
  const dsHas = (doc, needle) => ds(doc).errors.some((e) => e.includes(needle));
  expect('every source declared accepted', ds(all).errors.length === 0 && ds(all).declared.length === 4);
  expect('undeclared non-registry package rejected',
    dsHas(Object.fromEntries(Object.entries(all).filter(([k]) => k !== 'vendored')), 'vendored@file:'));
  expect('entry missing a field rejected', dsHas({ ...all, ...decl('left', { why: undefined }) }, 'missing why'));
  expect('entry with an unknown field rejected', dsHas({ ...all, ...decl('left', { severity: 'low' }) }, 'unknown field severity'));
  expect('stale entry rejected', dsHas({ ...all, ...decl('gone') }, 'gone: matches no non-registry dependency'));
  expect('entry for another ecosystem is stale', dsHas({ ...all, ...decl('left', { ecosystem: 'Go' }) }, 'left: matches no'));
  expect('locked locator mismatch rejected',
    dsHas({ ...all, ...decl('left', { locked: 'left@https://github.com/o/left.git#commit=old' }) }, 'left: locked is'));
  expect('non-object file rejected', dsHas([], 'must be a JSON object'));

  const reply = (status, body) => async () => ({ ok: status === 200, status, json: async () => body });
  const replies = (...bodies) => async () => ({ ok: true, status: 200, json: async () => bodies.shift() });
  const rejects = async (fn) => { try { await fn(); return false; } catch { return true; } };
  const one = [{ name: 'left', ecosystem: 'npm', upstream: 'left', version: '1.0.0' }];
  const paged = await queryOsv(replies({ vulns: [{ id: 'X-1' }], next_page_token: 't' }, { next_page_token: 'u' },
    { vulns: [{ id: 'X-2' }] }), CONTROL);
  expect('query follows every page', JSON.stringify(paged) === JSON.stringify(['X-1', 'X-2']));
  const found = await declaredFindings(replies({ vulns: [{ id: CONTROL.advisory }] }, { vulns: [{ id: 'X-3' }] }), one);
  expect('declared source advisory is a finding', found.length === 1 && found[0].id === 'X-3');
  expect('declared source with no advisory is clean',
    (await declaredFindings(replies({ vulns: [{ id: CONTROL.advisory }] }, {}), one)).length === 0);
  expect('control without its advisory fails closed', await rejects(() => declaredFindings(reply(200, {}), one)));
  expect('HTTP error fails closed', await rejects(() => queryOsv(reply(503, {}), CONTROL)));
  expect('network error fails closed', await rejects(() => queryOsv(async () => { throw new Error('down'); }, CONTROL)));
  expect('unexpected shape fails closed', await rejects(() => queryOsv(reply(200, { vulns: 'x' }), CONTROL)));
  expect('no query without a declared source', (await declaredFindings(reply(503, {}), [])).length === 0);

  if (failed.length > 0) throw new Error(`advisory check self-proof failed:\n  ${failed.join('\n  ')}`);
}

function githubOutputPath() {
  const i = process.argv.indexOf('--github-output');
  if (i < 0) return null;
  const file = process.argv[i + 1];
  if (!file) throw new Error('--github-output needs a file path');
  return file;
}

async function main(outputFile) {
  const failedIds = [];
  try {
    await proveAdvisoryRules();
    console.log('advisory rules: planted negatives all fired');

    const today = utcToday();
    const { entries: exceptions, errors } = readExceptions(fs.readFileSync(IGNORE_FILE, 'utf8'), today);
    const [lockfiles, lockErrors] = findLockfiles(trackedFiles());
    errors.push(...lockErrors);
    if (lockfiles.length === 0) errors.push('no tracked lockfile found; expected at least yarn.lock');
    const packages = [];
    for (const lf of lockfiles) {
      try {
        packages.push(...nonRegistryPackages(lf, fs.readFileSync(path.join(ROOT, lf), 'utf8')));
      } catch (error) {
        errors.push(error.message);
      }
    }
    let sources;
    try {
      sources = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));
    } catch (error) {
      throw new Error(`advisory-sources.json: ${error.message} (commit it, {} when empty)`);
    }
    const { declared, errors: sourceErrors } = declaredSources(sources, packages);
    errors.push(...sourceErrors);
    if (errors.length > 0) throw new Error(`advisory check failed:\n  ${errors.join('\n  ')}`);

    const asset = loadScannerAsset();
    const started = performance.now();
    const scanned = scan(await scannerBinary(asset), lockfiles);
    const findings = [...scanned.findings, ...await declaredFindings(fetch, declared)];
    const { open, stale } = applyExceptions(findings, exceptions);
    failedIds.push(...new Set(open.map((f) => f.id)));
    if (open.length > 0 || stale.length > 0) {
      const parts = [];
      if (open.length) {
        parts.push(`${open.length} known advisor${open.length === 1 ? 'y' : 'ies'} (upgrade, or add a `
          + `reviewed [[IgnoredVulns]] entry to osv-scanner.toml):\n  ${open.map((f) => f.line).join('\n  ')}`);
      }
      if (stale.length) parts.push(`stale exception${stale.length === 1 ? '' : 's'}:\n  ${stale.join('\n  ')}`);
      throw new Error(parts.join('\n'));
    }
    console.log(`advisories: clean (${scanned.total} package(s) in ${lockfiles.length} lockfile(s), `
      + `${declared.length} declared source(s), ${exceptions.length} exception(s); osv-scanner `
      + `${asset.version}, control answered, ${((performance.now() - started) / 1000).toFixed(1)}s)`);
  } finally {
    if (outputFile) fs.appendFileSync(outputFile, `findings=${failedIds.filter((id) => ID_RE.test(id)).join(' ')}\n`);
  }
}

await main(githubOutputPath());
