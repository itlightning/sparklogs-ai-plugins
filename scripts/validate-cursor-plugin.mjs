// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, process.argv[2] ?? 'build/dist');
const base = path.join(DIST, 'plugins', 'cursor', 'sparklogs');

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

const marketplace = await readJson(path.join(DIST, '.cursor-plugin', 'marketplace.json'));
if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length !== 1) {
  throw new Error('Cursor marketplace must list one plugin');
}
if (marketplace.plugins[0].source !== 'plugins/cursor/sparklogs') {
  throw new Error('Cursor marketplace source path is incorrect');
}

const manifest = await readJson(path.join(base, '.cursor-plugin', 'plugin.json'));
for (const key of ['name', 'description', 'version', 'variables']) {
  if (!manifest[key]) throw new Error(`Cursor plugin manifest missing ${key}`);
}
if (manifest.variables.type !== 'object' || !manifest.variables.properties) {
  throw new Error('Cursor plugin variables must be a JSON-Schema object with properties');
}

await fs.access(path.join(base, 'rules', 'when-to-use-sparklogs.md'));
await fs.access(path.join(base, 'mcp.json'));
console.log('Cursor plugin validation passed');
