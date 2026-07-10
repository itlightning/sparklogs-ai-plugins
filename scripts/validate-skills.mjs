// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const PORTABLE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
const REQUIRED_ASSETS = ['logo.svg', 'logo.png', 'icon.svg', 'icon-256.png', 'icon-512.png'];
const SHARED_REFERENCES = [
  'common-mistakes.md',
  'lql-reference.md',
  'mcp-tool-decision-tree.md',
  'msp-tool-registry.md',
  'off-endpoint-causes.md',
  'pattern-catalog.md',
  'scope-ladder.md',
  'scope-resolution.md',
  'subagent-definitions.md',
  'writing-voice.md',
];

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

function parseFrontmatter(text, file) {
  if (!text.startsWith('---\n')) throw new Error(`${file} missing YAML frontmatter`);
  const end = text.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file} missing closing frontmatter delimiter`);
  const data = {};
  for (const line of text.slice(4, end).split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) data[match[1]] = match[2].trim();
  }
  return data;
}

async function validateSkills() {
  const dir = path.join(ROOT, '.rulesync', 'skills');
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const file = path.join(dir, entry.name, 'SKILL.md');
    const data = parseFrontmatter(await fs.readFile(file, 'utf8'), file);
    if (!PORTABLE.test(data.name ?? '')) throw new Error(`${file} has non-portable name: ${data.name}`);
    if (data.name !== entry.name) throw new Error(`${file} name must match directory ${entry.name}`);
    if (!data.description || data.description.length < 40) throw new Error(`${file} description is too short`);
  }
}

async function validatePackage() {
  const pkg = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
  if (pkg.packageManager !== 'yarn@4.10.3') throw new Error('packageManager must be yarn@4.10.3');
  if (pkg.engines?.node !== '>=22.0') throw new Error('engines.node must be >=22.0');
  for (const [name, version] of Object.entries(pkg.devDependencies ?? {})) {
    if (/^[~^]/.test(version)) throw new Error(`Dependency ${name} must be pinned exactly, got ${version}`);
  }
  const yarnrc = await fs.readFile(path.join(ROOT, '.yarnrc.yml'), 'utf8');
  for (const snippet of ['nodeLinker: node-modules', 'yarnPath: .yarn/releases/yarn-4.10.3.cjs', 'enableScripts: false']) {
    if (!yarnrc.includes(snippet)) throw new Error(`.yarnrc.yml missing ${snippet}`);
  }
}

async function validateReferences() {
  const dir = path.join(ROOT, '.rulesync', 'skills');
  const skills = await fs.readdir(dir, { withFileTypes: true });
  for (const skill of skills) {
    if (!skill.isDirectory()) continue;
    const referencesDir = path.join(dir, skill.name, 'references');
    for (const reference of SHARED_REFERENCES) {
      const link = path.join(referencesDir, reference);
      const stat = await fs.lstat(link);
      if (!stat.isSymbolicLink()) {
        throw new Error(`${path.relative(ROOT, link)} must be a symlink to shared-references/${reference}`);
      }
      const target = await fs.realpath(link);
      const expected = await fs.realpath(path.join(ROOT, 'shared-references', reference));
      if (target !== expected) {
        throw new Error(`${path.relative(ROOT, link)} points to ${target}, expected ${expected}`);
      }
    }
  }
}

async function validateAssets() {
  for (const asset of REQUIRED_ASSETS) {
    if (!await exists(path.join(ROOT, 'assets', asset))) throw new Error(`Missing required asset: assets/${asset}`);
  }
}

await validateSkills();
await validatePackage();
await validateReferences();
await validateAssets();
console.log('Source validation passed');
