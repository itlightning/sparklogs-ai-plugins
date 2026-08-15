// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { assertRepoRoot } from './assert-repo-root.mjs';
import {
  ASSETS_DIR,
  BRAND_ASSETS,
  HOSTS,
  MAX_DIST_BYTES,
  MAX_PACKAGE_BYTES,
  METADATA_FILE,
  classifyPackageRel,
  forbiddenDistNames,
  oversize,
  unexpectedDistPaths,
} from './dist-layout.mjs';
import { MODULES } from './generated-references.config.mjs';
import { AUTHORING_FRONTMATTER_KEYS, parseFrontmatter } from './skill-indexes.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, process.argv[2] ?? 'build/dist');
const LICENSE = await fs.readFile(path.join(ROOT, 'LICENSE'));
const ALLOWED_EXTS = new Set(['.md', '.json', '.svg', '.png']);
const ALLOWED_NAMES = new Set(['README.md', 'LICENSE', '.mcp.json', 'mcp.json']);
const MAINTAINER_ONLY = ['SYNC-MANIFEST.json'];
const ALLOWED_MCP_HOSTS = new Set(['mcp.sparklogs.app', 'us.mcp.sparklogs.app', 'eu.mcp.sparklogs.app']);
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function walk(dir, callback) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name);
    const stat = await fs.lstat(file);
    await callback(file, stat);
    if (stat.isDirectory()) await walk(file, callback);
  }
}

async function collectRelFiles(dir) {
  const files = [];
  await walk(dir, async (file, stat) => {
    if (stat.isFile()) files.push(path.relative(dir, file).split(path.sep).join('/'));
  });
  return files;
}

async function validateMarketplace() {
  const meta = await readJson(path.join(ROOT, METADATA_FILE));

  const claude = await readJson(path.join(DIST, '.claude-plugin', 'marketplace.json'));
  if (claude.$schema !== 'https://anthropic.com/claude-code/marketplace.schema.json') {
    throw new Error('Claude marketplace missing or wrong $schema');
  }
  if (claude.name !== (meta.marketplace?.name ?? 'sparklogs-ai-plugins')) {
    throw new Error('Claude marketplace name must match metadata.marketplace.name');
  }
  if (claude.description !== meta.description) throw new Error('Claude marketplace description mismatch');
  if (!claude.owner?.name) throw new Error('Claude marketplace missing owner.name');
  if (claude.plugins[0].source !== './plugins/claude/sparklogs') throw new Error('Claude marketplace source path incorrect');
  if ('version' in claude.plugins[0]) throw new Error('Claude marketplace entry must not duplicate plugin version');

  const cursor = await readJson(path.join(DIST, '.cursor-plugin', 'marketplace.json'));
  if ('$schema' in cursor) throw new Error('Cursor marketplace must not include $schema');
  if (!cursor.name) throw new Error('Cursor marketplace missing name');
  if (!cursor.owner?.name) throw new Error('Cursor marketplace missing owner.name');
  if (cursor.metadata?.description !== meta.description) throw new Error('Cursor marketplace metadata.description mismatch');
  if (cursor.plugins[0].source !== 'plugins/cursor/sparklogs') throw new Error('Cursor marketplace source path incorrect');
  if (typeof cursor.plugins[0].source !== 'string') throw new Error('Cursor marketplace source must be a string path');
  if ('version' in cursor.plugins[0]) throw new Error('Cursor marketplace entry must not duplicate plugin version');

  const codex = await readJson(path.join(DIST, '.agents', 'plugins', 'marketplace.json'));
  if (codex.plugins[0].source.path !== 'plugins/codex/sparklogs') throw new Error('Codex marketplace source.path incorrect');
  if ('version' in codex.plugins[0]) throw new Error('Codex marketplace entry must not duplicate plugin version');
}

async function validateDistTree() {
  const files = await collectRelFiles(DIST);
  const unexpected = unexpectedDistPaths(files);
  if (unexpected.length > 0) {
    throw new Error(`dist contains paths outside the IN-list:\n  ${unexpected.join('\n  ')}`);
  }
  const forbidden = forbiddenDistNames(files);
  if (forbidden.length > 0) {
    throw new Error(`dist contains maintainer files:\n  ${forbidden.join('\n  ')}`);
  }
  let total = 0;
  for (const rel of files) {
    total += (await fs.stat(path.join(DIST, rel))).size;
  }
  if (oversize(total, MAX_DIST_BYTES)) {
    throw new Error(`dist is ${total} bytes (cap ${MAX_DIST_BYTES})`);
  }
}

async function validatePackage(host) {
  const base = path.join(DIST, 'plugins', host, 'sparklogs');
  if (!await exists(base)) throw new Error(`Missing package ${base}`);
  let packageBytes = 0;
  await walk(base, async (file, stat) => {
    const relative = path.relative(base, file).split(path.sep).join('/');
    if (stat.isSymbolicLink()) throw new Error(`Rendered package contains symlink: ${relative}`);
    if (stat.isFile() && (stat.mode & 0o111)) throw new Error(`Rendered package contains executable file: ${relative}`);
    if (stat.isFile()) {
      packageBytes += stat.size;
      const ext = path.extname(file);
      const name = path.basename(file);
      if (MAINTAINER_ONLY.includes(name)) {
        throw new Error(`${host} package ships a maintainer-only build input: ${relative}`);
      }
      const classified = classifyPackageRel(relative);
      if (!classified.ok) throw new Error(`${host}: ${classified.reason}`);
      if (!ALLOWED_NAMES.has(name) && !ALLOWED_EXTS.has(ext)) throw new Error(`Unexpected rendered file type: ${relative}`);
    }
  });
  if (oversize(packageBytes, MAX_PACKAGE_BYTES)) {
    throw new Error(`${host} package is ${packageBytes} bytes (cap ${MAX_PACKAGE_BYTES})`);
  }
  const license = await fs.readFile(path.join(base, 'LICENSE'));
  if (!license.equals(LICENSE)) throw new Error(`${host} LICENSE differs from repo root LICENSE`);
  for (const asset of BRAND_ASSETS) {
    if (!await exists(path.join(ROOT, ASSETS_DIR, asset))) throw new Error(`Missing source asset ${ASSETS_DIR}/${asset}`);
    if (!await exists(path.join(base, 'assets', asset))) throw new Error(`${host} missing rendered asset ${asset}`);
  }
  if (!await exists(path.join(base, 'feeds', 'win.eventlog.security', 'README.md'))) {
    throw new Error(`${host} missing feeds/win.eventlog.security/README.md`);
  }
  if (await exists(path.join(base, 'generated'))) {
    throw new Error(`${host} still ships generated/; use feeds/`);
  }
  const mcpFile = host === 'cursor' || host === 'generic' ? 'mcp.json' : '.mcp.json';
  const mcp = await readJson(path.join(base, mcpFile));
  const url = new URL(mcp.mcpServers.sparklogs.url);
  if (url.protocol !== 'https:') throw new Error(`${host} MCP URL must be HTTPS`);
  if (!ALLOWED_MCP_HOSTS.has(url.hostname)) throw new Error(`${host} MCP host is not allowlisted: ${url.hostname}`);
  if (url.pathname !== '/mcp') throw new Error(`${host} MCP URL must end in /mcp, got path ${url.pathname || '(none)'}`);
  if (host !== 'generic') {
    const manifestFile = host === 'claude' ? '.claude-plugin/plugin.json' : host === 'cursor' ? '.cursor-plugin/plugin.json' : '.codex-plugin/plugin.json';
    const manifest = await readJson(path.join(base, manifestFile));
    if (manifest.name !== 'sparklogs') throw new Error(`${host} manifest name must be sparklogs`);
    if (!SEMVER.test(manifest.version)) throw new Error(`${host} manifest version is invalid`);
  }
  await validateShippedMarkdown(host, base);
}

async function validateShippedMarkdown(host, base) {
  const markerHits = [];
  const authoringHits = [];
  const yamlHits = [];
  await walk(base, async (file, stat) => {
    if (!stat.isFile() || !file.endsWith('.md')) return;
    const relative = path.relative(base, file).split(path.sep).join('/');
    const text = await fs.readFile(file, 'utf8');
    if (/BEGIN GENERATED|END GENERATED/.test(text)) markerHits.push(relative);
    const { data } = parseFrontmatter(text, `${host}:${relative}`);
    for (const key of Object.keys(data)) {
      if (AUTHORING_FRONTMATTER_KEYS.has(key)) authoringHits.push(`${relative} key ${key}`);
    }
    if (text.startsWith('---\n')) {
      const end = text.indexOf('\n---\n', 4);
      if (end >= 0) {
        const raw = text.slice(4, end);
        let parsed;
        try {
          parsed = yaml.load(raw);
        } catch (error) {
          yamlHits.push(`${host}:${relative}: ${error.message}`);
          return;
        }
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          yamlHits.push(`${host}:${relative}: frontmatter is not a plain object`);
        }
      }
    }
  });
  if (markerHits.length) {
    throw new Error(`${host} shipped GENERATED markers:\n  ${markerHits.join('\n  ')}`);
  }
  if (authoringHits.length) {
    throw new Error(`${host} shipped authoring frontmatter:\n  ${authoringHits.join('\n  ')}`);
  }
  if (yamlHits.length) {
    throw new Error(`frontmatter fails strict YAML parse:\n  ${yamlHits.join('\n  ')}`);
  }
  for (const skill of ['sparklogs-ask', 'sparklogs-investigate', 'sparklogs-analyze-cause']) {
    const text = await fs.readFile(path.join(base, 'skills', skill, 'SKILL.md'), 'utf8');
    for (const id of MODULES) {
      if (!text.includes(`feeds/${id}/`)) {
        throw new Error(`${host} ${skill} missing generated feed ${id}`);
      }
    }
    if (skill === 'sparklogs-analyze-cause') {
      if (text.includes('playbooks/backup-failure.md')) {
        throw new Error(`${host} ${skill} should not carry the playbook table`);
      }
    } else if (!text.includes('playbooks/backup-failure.md')) {
      throw new Error(`${host} ${skill} missing generated playbook table`);
    }
  }
}

if (!await exists(DIST)) throw new Error(`Rendered directory does not exist: ${DIST}`);
await validateMarketplace();
await validateDistTree();
for (const host of HOSTS) await validatePackage(host);
console.log('Rendered validation passed');
