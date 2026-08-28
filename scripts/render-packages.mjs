// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';
import { resolveGeneratedPath, safeRmGenerated } from './safe-rm-generated.mjs';
import {
  AGENT_PLUGINS_MCP_SCHEMA,
  AGENT_PLUGINS_PLUGIN_SCHEMA,
  ASSETS_DIR,
  BRAND_ASSETS,
  DIST_ROOT_DOCS,
  DIST_ROOT_DOCS_EXCLUDE,
  DIST_ROOT_FILES,
  DOCS_URL,
  HOSTS,
  HOST_LAYOUT,
  METADATA_FILE,
  THEME_FILES,
  classifySrcPath,
} from './dist-layout.mjs';
import {
  CORPUS_TOPS,
  applyHostVariants,
  rewriteArgumentsForCursor,
  rewriteCommandsAsSkillNames,
  rewriteCommandsForCursor,
  rewriteCorpusForClaude,
  rewriteCorpusRelative,
} from './host-transforms.mjs';
import { formatFrontmatter, parseFrontmatter, shipMarkdown } from './skill-indexes.mjs';
import { stripAuthoringTags } from './identifier-tags.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const HOST_LABELS = {
  claude: 'Claude',
  codex: 'Codex',
  cursor: 'Cursor',
  generic: 'generic Agent Plugins hosts',
};
// Build inputs that must never ride into a shipped package. validate-rendered.mjs asserts the same
// list, so an addition here without one there fails the build rather than shipping quietly.
const MAINTAINER_ONLY = new Set(['SYNC-MANIFEST.json']);
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const DIST_README_TEMPLATE_REL = 'scripts/templates/dist-README.md';
const DIST_README_TEMPLATE = path.join(ROOT, DIST_README_TEMPLATE_REL);
// Only a release passes --version (the tag drives it). A plain local build has no release identity,
// so the README says so with a constant: a date or sha here would break the byte-identity rebuild check.
const UNRELEASED_README_VERSION = 'development build';

function parseArgs(argv) {
  const args = { out: 'build/dist', host: 'all', version: null };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') args.out = argv[++i];
    else if (arg.startsWith('--out=')) args.out = arg.slice('--out='.length);
    else if (arg === '--host') args.host = argv[++i];
    else if (arg.startsWith('--host=')) args.host = arg.slice('--host='.length);
    else if (arg === '--version') args.version = argv[++i];
    else if (arg.startsWith('--version=')) args.version = arg.slice('--version='.length);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(stable(value), null, 2)}\n`);
  await fs.chmod(file, 0o644);
}

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

function gitValue(args, fallback) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || fallback;
  } catch {
    return fallback;
  }
}

function localVersion() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const sha = gitValue(['rev-parse', '--short=7', 'HEAD'], 'nosha');
  return `0.0.0-dev+${date}-${sha}`;
}

async function copyFile(src, dst) {
  await fs.mkdir(path.dirname(dst), { recursive: true });
  await fs.copyFile(src, dst);
  await fs.chmod(dst, 0o644);
}

async function writeText(file, text) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text, 'utf8');
  await fs.chmod(file, 0o644);
}

// One markdown pipeline for every shipped file: strip authoring frontmatter and GENERATED markers,
// then apply the host dialect for corpus citations and command invocations. pkgRel is the file's
// path inside the rendered package, which is what the corpus rewrite measures against.
function renderMarkdownText(text, srcLabel, host, pkgRel) {
  let out = shipMarkdown(text, srcLabel);
  out = stripAuthoringTags(out);
  out = applyHostVariants(out, { commands: HOST_LAYOUT[host].commands }, srcLabel);
  out = host === 'claude' ? rewriteCorpusForClaude(out) : rewriteCorpusInSkill(out, pkgRel);
  if (host === 'cursor') out = rewriteCommandsForCursor(out);
  else if (host !== 'claude') out = rewriteCommandsAsSkillNames(out);
  if (host === 'cursor' && pkgRel.startsWith('commands/')) out = rewriteArgumentsForCursor(out);
  return out;
}

// Hosts other than Claude hand a skill only its own directory, so the corpus is materialized under
// skills/<skill>/references/ and citations resolve from wherever the citing file landed.
function rewriteCorpusInSkill(text, pkgRel) {
  const match = pkgRel.match(/^skills\/([^/]+)\//);
  if (!match) return text;
  return rewriteCorpusRelative(text, path.posix.dirname(pkgRel), `skills/${match[1]}/references`);
}

// Commands are the one tree whose frontmatter differs by host: Claude reads description and
// argument-hint and namespaces the file name, Cursor reads name and description and has no
// documented argument placeholder. Hosts that ship no commands never reach here.
async function renderCommands(base, host) {
  const dir = path.join(ROOT, 'src', 'commands');
  const names = (await fs.readdir(dir)).filter((name) => name.endsWith('.md')).sort();
  for (const name of names) {
    const from = path.join(dir, name);
    const pkgRel = `commands/${name}`;
    const raw = await fs.readFile(from, 'utf8');
    const { data } = parseFrontmatter(raw, from);
    if (!data.description) throw new Error(`${from} needs a description`);
    const stem = name.replace(/\.md$/, '');
    const shipped = host === 'cursor'
      ? { name: `sparklogs-${stem}`, description: data.description }
      : { description: data.description, 'argument-hint': data['argument-hint'] };
    const body = renderMarkdownText(raw, from, host, pkgRel);
    const withoutHead = parseFrontmatter(body, from).body.replace(/^\n+/, '');
    await writeText(path.join(base, pkgRel), `${formatFrontmatter(shipped)}\n${withoutHead}`);
  }
}

async function renderTreeVerbatim(srcDir, out, relDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const from = path.join(srcDir, entry.name);
    const rel = `${relDir}/${entry.name}`;
    if (DIST_ROOT_DOCS_EXCLUDE.has(rel)) continue;
    if (entry.isDirectory()) await renderTreeVerbatim(from, out, rel);
    else await copyFile(from, path.join(out, rel));
  }
}

async function renderTree(srcDir, base, pkgDir, host, skip = new Set()) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  await fs.mkdir(path.join(base, pkgDir), { recursive: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (skip.has(entry.name)) continue;
    const from = path.join(srcDir, entry.name);
    const pkgRel = pkgDir ? `${pkgDir}/${entry.name}` : entry.name;
    const to = path.join(base, pkgRel);
    if ((await fs.stat(from)).isDirectory()) {
      await renderTree(from, base, pkgRel, host, skip);
    } else if (entry.name.endsWith('.md')) {
      await writeText(to, renderMarkdownText(await fs.readFile(from, 'utf8'), from, host, pkgRel));
    } else {
      await copyFile(from, to);
    }
  }
}

async function walkSrcFiles() {
  const acc = [];
  async function walk(dir, relPrefix) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const rel = `${relPrefix}/${entry.name}`;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full, rel);
      else acc.push(rel.replaceAll('\\', '/'));
    }
  }
  await walk(path.join(ROOT, 'src'), 'src');
  return acc;
}

async function assertSrcInList() {
  const files = await walkSrcFiles();
  const bad = [];
  for (const rel of files) {
    const verdict = classifySrcPath(rel);
    if (!verdict.ok) bad.push(verdict.reason);
  }
  if (bad.length > 0) throw new Error(`src/ IN-list failed:\n  ${bad.join('\n  ')}`);
}

function marketplaceId(metadata) {
  return metadata.marketplace?.name ?? 'sparklogs-ai-plugins';
}

function pluginCategory(metadata) {
  return metadata.categories?.[0] ?? 'productivity';
}

function commonManifest(metadata, version) {
  return {
    author: metadata.author,
    description: metadata.description,
    homepage: metadata.homepage,
    keywords: [...metadata.categories],
    license: metadata.license,
    name: metadata.name,
    repository: metadata.repository,
    version,
  };
}

/** Claude plugin manifest: the documented field set. There is no icon field in it. */
function claudeManifest(metadata, version) {
  return {
    ...commonManifest(metadata, version),
    displayName: metadata.hosts?.claude?.displayName ?? metadata.displayName,
  };
}

/**
 * Cursor plugin manifest. MCP config is URL-only (OAuth). Do not declare a token
 * variable: a required plugin variable blocks connect, and an Authorization header
 * makes Claude-class hosts skip OAuth entirely.
 */
function cursorManifest(metadata, version) {
  return {
    ...commonManifest(metadata, version),
    logo: 'assets/logo.svg',
  };
}

/**
 * Codex plugin manifest: components are path pointers, display metadata sits under interface.
 * `mcpServers` is a path to the bundled config, not an inline object, and Codex requires the `./`
 * prefix and a target inside the plugin root.
 */
function codexManifest(metadata, version) {
  return {
    ...commonManifest(metadata, version),
    skills: './skills/',
    mcpServers: './.mcp.json',
    interface: {
      displayName: metadata.hosts?.codex?.displayName ?? metadata.displayName,
      category: pluginCategory(metadata),
    },
  };
}

/** Agent Plugins v1: $schema plus name are the whole contract; mcp.json is found by convention. */
function genericManifest(metadata, version) {
  return {
    $schema: AGENT_PLUGINS_PLUGIN_SCHEMA,
    ...commonManifest(metadata, version),
  };
}

/** Claude: top-level description, ./ source paths, Anthropic $schema */
function buildClaudeMarketplace(metadata) {
  const owner = { name: metadata.author.name };
  if (metadata.author.email) owner.email = metadata.author.email;
  return {
    $schema: 'https://anthropic.com/claude-code/marketplace.schema.json',
    name: marketplaceId(metadata),
    description: metadata.description,
    owner,
    plugins: [
      {
        author: metadata.author,
        category: pluginCategory(metadata),
        description: metadata.description,
        homepage: metadata.homepage,
        license: metadata.license,
        name: metadata.name,
        repository: metadata.repository,
        source: './plugins/claude/sparklogs',
      },
    ],
  };
}

/** Cursor: metadata.description (not top-level), owner required, source without ./: see Cursor plugins reference */
function buildCursorMarketplace(metadata) {
  const owner = { name: metadata.author.name };
  if (metadata.author.email) owner.email = metadata.author.email;
  return {
    metadata: {
      description: metadata.description,
    },
    name: marketplaceId(metadata),
    owner,
    plugins: [
      {
        author: metadata.author,
        category: pluginCategory(metadata),
        description: metadata.description,
        homepage: metadata.homepage,
        keywords: [...metadata.categories],
        license: metadata.license,
        logo: 'plugins/cursor/sparklogs/assets/logo.svg',
        name: metadata.name,
        repository: metadata.repository,
        source: 'plugins/cursor/sparklogs',
      },
    ],
  };
}

/**
 * Codex marketplace. The documented source forms are a `local` path inside the marketplace repo and
 * a `git-subdir` pointer at another repo. This manifest ships on the same branch it points at, so
 * the local form keeps the reference branch-agnostic and survives forks.
 */
function buildCodexMarketplace(metadata) {
  const owner = { name: metadata.author.name };
  if (metadata.author.email) owner.email = metadata.author.email;
  return {
    name: marketplaceId(metadata),
    owner,
    interface: {
      displayName: metadata.hosts?.codex?.displayName ?? metadata.displayName,
    },
    plugins: [
      {
        author: metadata.author,
        category: pluginCategory(metadata),
        description: metadata.description,
        homepage: metadata.homepage,
        license: metadata.license,
        name: metadata.name,
        repository: metadata.repository,
        source: { source: 'local', path: './plugins/codex/sparklogs' },
      },
    ],
  };
}

/**
 * MCP server entry. URL plus transport only. Claude disables OAuth when
 * headers.Authorization is set, even to an unsubstituted ${VAR}. Codex fails
 * startup if bearer_token_env_var names an unset env var. Default auth is the
 * host's OAuth flow against the SparkLogs authorization server.
 *
 * Every host needs an explicit transport: Claude drops a url entry that omits
 * `type`, and the Agent Plugins schema names the same transport `streamable-http`.
 */
function mcpConfig(metadata, host) {
  const entry = {
    type: host === 'generic' ? 'streamable-http' : 'http',
    url: metadata.mcp.url,
  };
  const config = { mcpServers: { sparklogs: entry } };
  if (host === 'generic') config.$schema = AGENT_PLUGINS_MCP_SCHEMA;
  return config;
}

// Landing page of the published tree. Kept as markdown so it can be edited and reviewed as prose;
// the renderer only fills placeholders. Unfilled placeholders fail the build rather than ship.
async function distRootReadme(version) {
  const template = await fs.readFile(DIST_README_TEMPLATE, 'utf8');
  const text = template.replaceAll('{{version}}', version).replaceAll('{{docs_url}}', DOCS_URL);
  const leftover = text.match(/\{\{[a-z_]+\}\}/);
  if (leftover) throw new Error(`Unfilled placeholder in ${DIST_README_TEMPLATE_REL}: ${leftover[0]}`);
  return text;
}

async function pluginPackageReadme(host, metadata) {
  const file = path.join(ROOT, 'scripts', 'templates', `package-README-${host}.md`);
  const template = await fs.readFile(file, 'utf8');
  const text = template
    .replaceAll('{{display_name}}', metadata.hosts?.[host]?.displayName ?? metadata.displayName)
    .replaceAll('{{host_label}}', HOST_LABELS[host] ?? host)
    .replaceAll('{{docs_url}}', DOCS_URL)
    .replaceAll('{{mcp_url}}', metadata.mcp.url)
    .replaceAll('{{repo_url}}', metadata.repository);
  const leftover = text.match(/\{\{[a-z_]+\}\}/);
  if (leftover) throw new Error(`Unfilled placeholder in package-README-${host}.md: ${leftover[0]}`);
  return text;
}

async function copyAssets(base) {
  for (const asset of BRAND_ASSETS) {
    const src = path.join(ROOT, ASSETS_DIR, asset);
    if (!await exists(src)) throw new Error(`Missing required brand asset: ${ASSETS_DIR}/${asset}`);
    await copyFile(src, path.join(base, 'assets', asset));
  }
}

async function renderSkills(base, host) {
  const skillsDir = path.join(ROOT, 'src', 'skills');
  await renderTree(skillsDir, base, 'skills', host);
  if (host === 'claude') return;
  // Corpus lives inside each skill for hosts that load a skill directory in isolation. Copies, not
  // links: the rendered-package validator rejects symlinks, and several hosts refuse to follow them.
  const skills = (await fs.readdir(skillsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const skill of skills) {
    for (const top of CORPUS_TOPS) {
      await renderTree(
        path.join(ROOT, 'src', top),
        base,
        `skills/${skill}/references/${top}`,
        host,
        MAINTAINER_ONLY,
      );
    }
  }
}

async function renderHost(host, out, metadata, version) {
  const layout = HOST_LAYOUT[host];
  const base = path.join(out, 'plugins', host, metadata.name);
  await safeRmGenerated(base);
  await fs.mkdir(base, { recursive: true });
  await renderSkills(base, host);
  for (const top of layout.trees) {
    await renderTree(path.join(ROOT, 'src', top), base, top, host, MAINTAINER_ONLY);
  }
  if (layout.commands) await renderCommands(base, host);
  await copyAssets(base);
  await writeText(path.join(base, 'README.md'), await pluginPackageReadme(host, metadata));
  await copyFile(path.join(ROOT, 'LICENSE'), path.join(base, 'LICENSE'));
  await writeJson(path.join(base, layout.manifest), HOST_MANIFEST_BUILDERS[host](metadata, version));
  if (layout.mcpFile) await writeJson(path.join(base, layout.mcpFile), mcpConfig(metadata, host));
}

async function renderMarketplaces(out, metadata) {
  await writeJson(path.join(out, '.claude-plugin', 'marketplace.json'), buildClaudeMarketplace(metadata));
  await writeJson(path.join(out, '.cursor-plugin', 'marketplace.json'), buildCursorMarketplace(metadata));
  await writeJson(path.join(out, '.agents', 'plugins', 'marketplace.json'), buildCodexMarketplace(metadata));
}

// The published branch is also the repository's landing page, so the files a reader expects at a repo
// root have to exist there. They are copied verbatim; nothing here is host-specific.
async function copyDistRootDocs(out) {
  for (const file of DIST_ROOT_FILES) {
    await copyFile(path.join(ROOT, file), path.join(out, file));
  }
  for (const dir of DIST_ROOT_DOCS) {
    await renderTreeVerbatim(path.join(ROOT, dir), out, dir);
  }
}

const HOST_MANIFEST_BUILDERS = {
  claude: claudeManifest,
  cursor: cursorManifest,
  codex: codexManifest,
  generic: genericManifest,
};

async function main() {
  const args = parseArgs(process.argv);
  const out = resolveGeneratedPath(args.out);
  const version = args.version ?? localVersion();
  if (!SEMVER.test(version)) {
    throw new Error(`Version must be SemVer-compatible without leading v: ${version}`);
  }
  const hosts = args.host === 'all' ? HOSTS : [args.host];
  for (const host of hosts) if (!HOSTS.includes(host)) throw new Error(`Unsupported host: ${host}`);
  const metadata = JSON.parse(await fs.readFile(path.join(ROOT, METADATA_FILE), 'utf8'));
  if (metadata.version) throw new Error(`${METADATA_FILE} must not contain a version field`);
  await assertSrcInList();
  for (const theme of THEME_FILES) {
    if (!await exists(path.join(ROOT, 'src', 'themes', theme))) {
      throw new Error(`Missing theme stub: src/themes/${theme}`);
    }
  }
  await safeRmGenerated(out);
  await fs.mkdir(out, { recursive: true });
  const readme = await distRootReadme(args.version ?? UNRELEASED_README_VERSION);
  await writeText(path.join(out, 'README.md'), readme);
  await copyDistRootDocs(out);
  for (const host of hosts) await renderHost(host, out, metadata, version);
  if (args.host === 'all' || ['claude', 'cursor', 'codex'].includes(args.host)) {
    await renderMarketplaces(out, metadata);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
