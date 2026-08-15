// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Published layout: src/ is what ships. Dist is src plus host wrappers and one README.
// An unknown path in src/ or in dist output fails validation.

export const SRC_DIR = 'src';
export const FEEDS_DIR = 'src/feeds';
export const GUIDES_DIR = 'src/guides';
export const THEMES_DIR = 'src/themes';
export const PLAYBOOKS_DIR = 'src/playbooks';
export const SKILLS_DIR = 'src/skills';
export const COMMANDS_DIR = 'src/commands';
export const AGENTS_DIR = 'src/agents';
export const RULES_DIR = 'src/rules';
export const ASSETS_DIR = 'src/assets';
export const METADATA_FILE = 'src/metadata/plugin.json';

export const THEME_FILES = [
  'windows-updates-and-patching.md',
  'windows-security-and-audit.md',
  'endpoint-protection.md',
  'windows-operational-events.md',
  'device-health-and-state.md',
];

export const BRAND_ASSETS = ['logo.svg', 'logo.png', 'icon.svg', 'icon-256.png', 'icon-512.png'];

export const HOSTS = ['claude', 'cursor', 'codex', 'generic'];

export const FEED_ID = /^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/;

// SKILL.md is ~59 KiB today. A dump that is not an index should fail before it ships.
export const MAX_SRC_FILE_BYTES = 128 * 1024;
export const MAX_DIST_BYTES = 8 * 1024 * 1024;
export const MAX_PACKAGE_BYTES = 2 * 1024 * 1024;

export const DOCS_URL = 'https://sparklogs.com/docs/it-fleet-intelligence';

const SRC_TOP = new Set([
  'skills', 'commands', 'agents', 'rules', 'guides', 'feeds',
  'playbooks', 'themes', 'assets', 'metadata',
]);

const SRC_EXTS = new Set(['.md', '.json', '.svg', '.png']);

export function posixRel(from, to) {
  return to.split('\\').join('/');
}

export function classifySrcPath(relativePosix) {
  const parts = relativePosix.split('/');
  if (parts[0] !== 'src' || parts.length < 2) {
    return { ok: false, reason: `not under src/: ${relativePosix}` };
  }
  const top = parts[1];
  if (!SRC_TOP.has(top)) {
    return { ok: false, reason: `unknown src/ directory: ${relativePosix}` };
  }
  const name = parts[parts.length - 1];
  const dot = name.lastIndexOf('.');
  const ext = dot >= 0 ? name.slice(dot) : '';
  if (!SRC_EXTS.has(ext)) {
    return { ok: false, reason: `disallowed file type in src/: ${relativePosix}` };
  }
  return { ok: true };
}

export function unexpectedDistPaths(relativePosixPaths) {
  const unexpected = [];
  for (const rel of relativePosixPaths) {
    if (rel === 'README.md') continue;
    if (rel === '.claude-plugin/marketplace.json') continue;
    if (rel === '.cursor-plugin/marketplace.json') continue;
    if (rel === '.agents/plugins/marketplace.json') continue;
    if (rel.startsWith('plugins/')) continue;
    unexpected.push(rel);
  }
  return unexpected;
}

export function forbiddenDistNames(relativePosixPaths) {
  const hits = [];
  for (const rel of relativePosixPaths) {
    const base = rel.split('/').pop();
    if (base === 'yarn.lock' || base === 'package.json' || base === 'SYNC-MANIFEST.json') {
      hits.push(rel);
    }
    if (rel.startsWith('scripts/') || rel.startsWith('docs/') || rel.startsWith('src/')) {
      hits.push(rel);
    }
  }
  return hits;
}

export function extraFeedDirs(dirNames, modules) {
  const allowed = new Set(modules);
  return dirNames.filter((name) => !allowed.has(name));
}

const PACKAGE_TOP_FILES = new Set(['README.md', 'LICENSE', 'mcp.json', '.mcp.json']);
const PACKAGE_TOP_DIRS = new Set([
  'skills', 'commands', 'agents', 'rules', 'themes', 'feeds',
  'playbooks', 'guides', 'assets',
  '.claude-plugin', '.cursor-plugin', '.codex-plugin',
]);

export function classifyPackageRel(relativePosix) {
  if (PACKAGE_TOP_FILES.has(relativePosix)) return { ok: true };
  const top = relativePosix.split('/')[0];
  if (!PACKAGE_TOP_DIRS.has(top)) {
    return { ok: false, reason: `unexpected path in host package: ${relativePosix}` };
  }
  return { ok: true };
}

export function oversize(bytes, cap) {
  return bytes > cap;
}

export function proveLayoutGuards() {
  const srcBad = classifySrcPath('src/oops.md');
  if (srcBad.ok) throw new Error('IN-list guard did not reject src/oops.md');
  const srcOk = classifySrcPath('src/guides/lql-reference.md');
  if (!srcOk.ok) throw new Error('IN-list guard rejected a legal guide');
  const distBad = unexpectedDistPaths(['yarn.lock', 'README.md', 'plugins/claude/sparklogs/LICENSE']);
  if (!distBad.includes('yarn.lock') || distBad.length !== 1) {
    throw new Error(`dist unexpected-path guard misfired: ${distBad.join(',')}`);
  }
  const forbid = forbiddenDistNames(['plugins/claude/sparklogs/yarn.lock', 'README.md']);
  if (!forbid.includes('plugins/claude/sparklogs/yarn.lock')) {
    throw new Error('forbidden-name guard missed yarn.lock inside a package');
  }
  const orphans = extraFeedDirs(['win.eventlog.security', 'old-module'], ['win.eventlog.security']);
  if (orphans.length !== 1 || orphans[0] !== 'old-module') {
    throw new Error('feed-orphan guard misfired');
  }
  const pkgBad = classifyPackageRel('yarn.lock');
  if (pkgBad.ok) throw new Error('package IN-list did not reject yarn.lock');
  if (!oversize(MAX_SRC_FILE_BYTES + 1, MAX_SRC_FILE_BYTES)) {
    throw new Error('per-file size guard did not fire over the cap');
  }
  if (oversize(MAX_SRC_FILE_BYTES, MAX_SRC_FILE_BYTES)) {
    throw new Error('per-file size guard fired on the cap itself');
  }
  if (!oversize(MAX_DIST_BYTES + 1, MAX_DIST_BYTES)) {
    throw new Error('dist size guard did not fire over the cap');
  }
}
