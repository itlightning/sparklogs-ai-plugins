// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, process.argv[2] ?? 'build/dist');
const LICENSE = await fs.readFile(path.join(ROOT, 'LICENSE'));
const BRAND_ASSETS = ['logo.svg', 'logo.png', 'icon.svg', 'icon-256.png', 'icon-512.png'];
const HOSTS = ['claude', 'cursor', 'codex', 'generic'];
const ALLOWED_EXTS = new Set(['.md', '.json', '.svg', '.png']);
const ALLOWED_NAMES = new Set(['README.md', 'LICENSE', '.mcp.json', 'mcp.json']);
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

function assertSafeSource(source, expected) {
  if (source !== expected) throw new Error(`Marketplace source ${source} did not match ${expected}`);
  if (!source.startsWith('./')) throw new Error(`Marketplace source must start with ./ : ${source}`);
  if (source.includes('..')) throw new Error(`Marketplace source must not contain .. : ${source}`);
}

async function validateMarketplace() {
  const claude = await readJson(path.join(DIST, '.claude-plugin', 'marketplace.json'));
  assertSafeSource(claude.plugins[0].source, './plugins/claude/sparklogs');
  if ('version' in claude.plugins[0]) throw new Error('Claude marketplace entry must not duplicate plugin version');

  const cursor = await readJson(path.join(DIST, '.cursor-plugin', 'marketplace.json'));
  assertSafeSource(cursor.plugins[0].source, './plugins/cursor/sparklogs');
  if ('version' in cursor.plugins[0]) throw new Error('Cursor marketplace entry must not duplicate plugin version');

  const codex = await readJson(path.join(DIST, '.agents', 'plugins', 'marketplace.json'));
  assertSafeSource(codex.plugins[0].source.path, './plugins/codex/sparklogs');
  if ('version' in codex.plugins[0]) throw new Error('Codex marketplace entry must not duplicate plugin version');
}

async function validatePackage(host) {
  const base = path.join(DIST, 'plugins', host, 'sparklogs');
  if (!await exists(base)) throw new Error(`Missing package ${base}`);
  await walk(base, async (file, stat) => {
    const relative = path.relative(base, file);
    if (stat.isSymbolicLink()) throw new Error(`Rendered package contains symlink: ${relative}`);
    if (stat.isFile() && (stat.mode & 0o111)) throw new Error(`Rendered package contains executable file: ${relative}`);
    if (stat.isFile()) {
      const ext = path.extname(file);
      const name = path.basename(file);
      if (!ALLOWED_NAMES.has(name) && !ALLOWED_EXTS.has(ext)) throw new Error(`Unexpected rendered file type: ${relative}`);
    }
  });
  const license = await fs.readFile(path.join(base, 'LICENSE'));
  if (!license.equals(LICENSE)) throw new Error(`${host} LICENSE differs from repo root LICENSE`);
  for (const asset of BRAND_ASSETS) {
    if (!await exists(path.join(ROOT, 'assets', asset))) throw new Error(`Missing source asset assets/${asset}`);
    if (!await exists(path.join(base, 'assets', asset))) throw new Error(`${host} missing rendered asset ${asset}`);
  }
  const mcpFile = host === 'cursor' || host === 'generic' ? 'mcp.json' : '.mcp.json';
  const mcp = await readJson(path.join(base, mcpFile));
  const url = new URL(mcp.mcpServers.sparklogs.url);
  if (url.protocol !== 'https:') throw new Error(`${host} MCP URL must be HTTPS`);
  if (!ALLOWED_MCP_HOSTS.has(url.hostname)) throw new Error(`${host} MCP host is not allowlisted: ${url.hostname}`);
  if (host !== 'generic') {
    const manifestFile = host === 'claude' ? '.claude-plugin/plugin.json' : host === 'cursor' ? '.cursor-plugin/plugin.json' : '.codex-plugin/plugin.json';
    const manifest = await readJson(path.join(base, manifestFile));
    if (manifest.name !== 'sparklogs') throw new Error(`${host} manifest name must be sparklogs`);
    if (!SEMVER.test(manifest.version)) throw new Error(`${host} manifest version is invalid`);
  }
}

if (!await exists(DIST)) throw new Error(`Rendered directory does not exist: ${DIST}`);
await validateMarketplace();
for (const host of HOSTS) await validatePackage(host);
console.log('Rendered validation passed');
