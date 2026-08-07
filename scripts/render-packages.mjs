// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';
import { resolveGeneratedPath, safeRmGenerated } from './safe-rm-generated.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const HOSTS = ['claude', 'cursor', 'codex', 'generic'];
const HOST_LABELS = {
  claude: 'Claude',
  codex: 'Codex',
  cursor: 'Cursor',
  generic: 'generic Agent Skills hosts',
};
// Build inputs that must never ride into a shipped package. validate-rendered.mjs asserts the same
// list, so an addition here without one there fails the build rather than shipping quietly.
const MAINTAINER_ONLY = new Set(['SYNC-MANIFEST.json']);

const BRAND_ASSETS = ['logo.svg', 'logo.png', 'icon.svg', 'icon-256.png', 'icon-512.png'];
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

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

async function copyDirMaterialized(src, dst, skip = new Set()) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (skip.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    const stat = await fs.stat(from);
    if (stat.isDirectory()) await copyDirMaterialized(from, to, skip);
    else await copyFile(from, to);
  }
}

async function copyDirPreserve(src, dst, outAbs) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (['.git', 'node_modules', 'build', '.plugin-build'].includes(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    if (path.resolve(from).startsWith(outAbs)) continue;
    if (entry.isDirectory()) {
      await copyDirPreserve(from, to, outAbs);
    } else if (entry.isSymbolicLink()) {
      await fs.symlink(await fs.readlink(from), to);
    } else if (entry.name === 'install-state.gz' && path.basename(path.dirname(from)) === '.yarn') {
      continue;
    } else if (path.basename(path.dirname(from)) === 'cache' && path.basename(path.dirname(path.dirname(from))) === '.yarn') {
      continue;
    } else {
      await copyFile(from, to);
    }
  }
}

function marketplaceId(metadata) {
  return metadata.marketplace?.name ?? 'sparklogs-ai-plugins';
}

function pluginCategory(metadata) {
  return metadata.categories?.[0] ?? 'productivity';
}

function manifest(metadata, host, version) {
  return {
    author: metadata.author,
    categories: metadata.hosts?.[host]?.categories ?? metadata.categories,
    description: metadata.hosts?.[host]?.description ?? metadata.description,
    displayName: metadata.hosts?.[host]?.displayName ?? metadata.displayName,
    homepage: metadata.homepage,
    license: metadata.license,
    name: metadata.name,
    repository: metadata.repository,
    version,
  };
}

/** Claude (Code and Cowork): top-level description, ./ source paths, Anthropic $schema */
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

/** OpenAI Codex agents: plugins[].source.path (no ./) */
function buildCodexMarketplace(metadata) {
  return {
    plugins: [
      {
        author: metadata.author,
        category: pluginCategory(metadata),
        description: metadata.description,
        homepage: metadata.homepage,
        license: metadata.license,
        name: metadata.name,
        repository: metadata.repository,
        source: { path: 'plugins/codex/sparklogs' },
      },
    ],
  };
}

function mcpConfig(metadata) {
  return {
    mcpServers: {
      sparklogs: {
        headers: { Authorization: 'Bearer ${SPARKLOGS_API_TOKEN}' },
        url: metadata.mcp.url,
      },
    },
  };
}

function repositoryRootUrl(metadata) {
  return String(metadata.repository ?? '').replace(/\.git\/?$/, '').replace(/\/$/, '');
}

/** README inside each built plugin package: not the repo root README (avoids broken links). */
function pluginPackageReadme(host, metadata) {
  const label = HOST_LABELS[host] ?? host;
  const repo = repositoryRootUrl(metadata);
  const display = metadata.hosts?.[host]?.displayName ?? metadata.displayName;
  return `# ${display}: ${label} bundle

This directory is the **built SparkLogs AI plugin** for **${label}**, shipped from the SparkLogs plugin repository.

If you have a **full clone** of the repository, these paths are relative to this folder (\`plugins/${host}/${metadata.name}/\`):

- [Install (${label})](../../../docs/install/${host}.md)
- [Repository overview](../../../README.md)
- [Contributing](../../../CONTRIBUTING.md)

*(If you only have this plugin folder: open **${repo}** in the browser and open the same paths from the repository root.)*`;
}

async function writePluginReadme(base, host, metadata) {
  const file = path.join(base, 'README.md');
  await fs.writeFile(file, `${pluginPackageReadme(host, metadata)}\n`, 'utf8');
  await fs.chmod(file, 0o644);
}

async function copyAssets(base) {
  for (const asset of BRAND_ASSETS) {
    const src = path.join(ROOT, 'assets', asset);
    if (!await exists(src)) throw new Error(`Missing required brand asset: assets/${asset}`);
    await copyFile(src, path.join(base, 'assets', asset));
  }
}

async function renderHost(host, out, metadata, version) {
  const base = path.join(out, 'plugins', host, metadata.name);
  await safeRmGenerated(base);
  await fs.mkdir(base, { recursive: true });
  await copyDirMaterialized(path.join(ROOT, '.rulesync', 'skills'), path.join(base, 'skills'));
  await copyDirMaterialized(path.join(ROOT, '.rulesync', 'commands'), path.join(base, 'commands'));
  await copyDirMaterialized(path.join(ROOT, '.rulesync', 'subagents'), path.join(base, 'agents'));
  // Skills cite generated artifacts as `generated/<module>/<file>.md`. Carrying the tree into the
  // package keeps that one path string true both inside an installed plugin and in a source checkout.
  // The sync manifest stays behind: it records which upstream checkout the reference set came from,
  // which is maintainer provenance rather than anything a reader of the package can act on.
  await copyDirMaterialized(path.join(ROOT, 'generated'), path.join(base, 'generated'), MAINTAINER_ONLY);
  if (host === 'cursor' || host === 'generic') {
    await copyDirMaterialized(path.join(ROOT, '.rulesync', 'rules'), path.join(base, 'rules'));
  }
  await copyAssets(base);
  await writePluginReadme(base, host, metadata);
  await copyFile(path.join(ROOT, 'LICENSE'), path.join(base, 'LICENSE'));
  if (host === 'claude') {
    await writeJson(path.join(base, '.claude-plugin', 'plugin.json'), manifest(metadata, host, version));
    await writeJson(path.join(base, '.mcp.json'), mcpConfig(metadata));
  } else if (host === 'cursor') {
    await writeJson(path.join(base, '.cursor-plugin', 'plugin.json'), manifest(metadata, host, version));
    await writeJson(path.join(base, 'mcp.json'), mcpConfig(metadata));
  } else if (host === 'codex') {
    await writeJson(path.join(base, '.codex-plugin', 'plugin.json'), manifest(metadata, host, version));
    await writeJson(path.join(base, '.mcp.json'), mcpConfig(metadata));
  } else {
    await writeJson(path.join(base, 'mcp.json'), mcpConfig(metadata));
  }
}

async function renderMarketplaces(out, metadata) {
  await writeJson(path.join(out, '.claude-plugin', 'marketplace.json'), buildClaudeMarketplace(metadata));
  await writeJson(path.join(out, '.cursor-plugin', 'marketplace.json'), buildCursorMarketplace(metadata));
  await writeJson(path.join(out, '.agents', 'plugins', 'marketplace.json'), buildCodexMarketplace(metadata));
}

async function main() {
  const args = parseArgs(process.argv);
  const out = resolveGeneratedPath(args.out);
  const version = args.version ?? localVersion();
  if (!SEMVER.test(version)) {
    throw new Error(`Version must be SemVer-compatible without leading v: ${version}`);
  }
  const hosts = args.host === 'all' ? HOSTS : [args.host];
  for (const host of hosts) if (!HOSTS.includes(host)) throw new Error(`Unsupported host: ${host}`);
  const metadata = JSON.parse(await fs.readFile(path.join(ROOT, 'metadata', 'plugin.json'), 'utf8'));
  if (metadata.version) throw new Error('metadata/plugin.json must not contain a version field');
  await safeRmGenerated(out);
  await fs.mkdir(out, { recursive: true });
  await copyDirPreserve(ROOT, out, `${out}${path.sep}`);
  for (const host of hosts) await renderHost(host, out, metadata, version);
  if (args.host === 'all' || ['claude', 'cursor', 'codex'].includes(args.host)) {
    await renderMarketplaces(out, metadata);
  }
  const sourceRef = gitValue(['rev-parse', '--abbrev-ref', 'HEAD'], 'unknown');
  const sourceSha = gitValue(['rev-parse', 'HEAD'], 'unknown');
  await writeJson(path.join(out, 'dist-manifest.json'), {
    generatedAt: process.env.SOURCE_DATE_EPOCH ?? 'local-build',
    generator: 'scripts/render-packages.mjs',
    plugin: metadata.name,
    sourceRef,
    sourceSha,
    version,
  });
  await fs.writeFile(
    path.join(out, 'DIST.md'),
    `# Generated Distribution\n\nGenerated from ${sourceRef} at ${sourceSha}.\n\nVersion: ${version}\n\nDo not edit this branch by hand. All PRs target source.\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
