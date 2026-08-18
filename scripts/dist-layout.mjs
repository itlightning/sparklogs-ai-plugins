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

export const AGENT_PLUGINS_PLUGIN_SCHEMA = 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json';
export const AGENT_PLUGINS_MCP_SCHEMA = 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json';

// What each host package actually contains, and where its two config files go.
// `trees` excludes skills/ (always rendered) and the corpus, which Claude carries at the package
// root and every other host carries inside each skill's references/ subtree.
// Codex documents skills, MCP servers and hooks as the bundled component kinds: no commands, no
// rules, no subagents. Generic follows Agent Plugins v1, which defines skills and mcp.json only.
export const HOST_LAYOUT = {
  claude: {
    trees: ['agents', 'guides', 'playbooks', 'themes', 'feeds'],
    commands: true,
    manifest: '.claude-plugin/plugin.json',
    mcpFile: '.mcp.json',
  },
  cursor: {
    trees: ['agents', 'rules'],
    commands: true,
    manifest: '.cursor-plugin/plugin.json',
    mcpFile: 'mcp.json',
  },
  // Codex reads a bundled .mcp.json through the same server config type as ~/.codex/config.toml, so
  // the entry takes url and bearer_token_env_var rather than an interpolated header. A config.toml
  // entry of the same name outranks the plugin's, so the install guide offers it only as a fallback.
  codex: {
    trees: [],
    commands: false,
    manifest: '.codex-plugin/plugin.json',
    mcpFile: '.mcp.json',
  },
  generic: {
    trees: [],
    commands: false,
    manifest: 'plugin.json',
    mcpFile: 'mcp.json',
  },
};

// The published branch is the repository's default branch, so its root has to answer the questions a
// visitor arrives with: what is this, how do I install it, how do I contribute, where do I report a
// vulnerability. These ride to the dist root verbatim.
export const DIST_ROOT_FILES = ['LICENSE', 'NOTICE', 'CONTRIBUTING.md', 'AGENTS.md', 'SECURITY.md'];
export const DIST_ROOT_DOCS = ['docs'];

// Authoring and maintainer docs stay on `source`. They address someone with the repo checked out and
// link to files (`.github/workflows`, `CODEOWNERS`) and a branch context that the published tree does
// not have, so publishing them would ship dead links and claims that are false where they landed.
export const DIST_ROOT_DOCS_EXCLUDE = new Set([
  'docs/information-architecture.md',
  'docs/maintainer-guide.md',
]);

export const FEED_ID = /^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/;

// SKILL.md is ~59 KiB today. A dump that is not an index should fail before it ships.
export const MAX_SRC_FILE_BYTES = 128 * 1024;
// Hosts other than Claude carry a copy of the reference corpus inside every skill, so a package is
// roughly the corpus times the skill count. The caps are sized for that plus room to grow, and are
// still small enough that an accidental tree (node_modules, a build dir) trips them.
export const MAX_DIST_BYTES = 12 * 1024 * 1024;
export const MAX_PACKAGE_BYTES = 3 * 1024 * 1024;

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
  const rootFiles = new Set(['README.md', ...DIST_ROOT_FILES]);
  const unexpected = [];
  for (const rel of relativePosixPaths) {
    if (rootFiles.has(rel)) continue;
    if (rel === '.claude-plugin/marketplace.json') continue;
    if (rel === '.cursor-plugin/marketplace.json') continue;
    if (rel === '.agents/plugins/marketplace.json') continue;
    if (rel.startsWith('plugins/')) continue;
    if (DIST_ROOT_DOCS.some((dir) => rel.startsWith(`${dir}/`))) continue;
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
    if (rel.startsWith('scripts/') || rel.startsWith('src/')) {
      hits.push(rel);
    }
    // docs/ is a published landing-page tree at the dist root only; a package must never carry it.
    if (rel.startsWith('plugins/') && rel.includes('/docs/')) {
      hits.push(rel);
    }
  }
  return hits;
}

export function extraFeedDirs(dirNames, modules) {
  const allowed = new Set(modules);
  return dirNames.filter((name) => !allowed.has(name));
}

const PACKAGE_TOP_FILES = new Set(['README.md', 'LICENSE', 'mcp.json', '.mcp.json', 'plugin.json']);
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
  const distBad = unexpectedDistPaths([
    'yarn.lock', 'README.md', 'LICENSE', 'SECURITY.md', 'docs/install/claude.md',
    'plugins/claude/sparklogs/LICENSE',
  ]);
  if (!distBad.includes('yarn.lock') || distBad.length !== 1) {
    throw new Error(`dist unexpected-path guard misfired: ${distBad.join(',')}`);
  }
  const forbid = forbiddenDistNames([
    'plugins/claude/sparklogs/yarn.lock', 'README.md', 'docs/install/claude.md',
    'plugins/claude/sparklogs/docs/leak.md',
  ]);
  if (!forbid.includes('plugins/claude/sparklogs/yarn.lock')) {
    throw new Error('forbidden-name guard missed yarn.lock inside a package');
  }
  if (forbid.includes('docs/install/claude.md')) {
    throw new Error('forbidden-name guard rejected the published root docs tree');
  }
  if (!forbid.includes('plugins/claude/sparklogs/docs/leak.md')) {
    throw new Error('forbidden-name guard missed docs/ inside a package');
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
