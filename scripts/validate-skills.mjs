// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';
import { ASSETS_DIR, METADATA_FILE } from './dist-layout.mjs';
import { INDEX_KINDS, checkIndexFiles, listSkillIndexTargets, loadIndexCatalog, parseFrontmatter } from './skill-indexes.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const PORTABLE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
const REQUIRED_ASSETS = ['logo.svg', 'logo.png', 'icon.svg', 'icon-256.png', 'icon-512.png'];
const SHARED_REFERENCES = [
  'category-classes.md',
  'common-mistakes.md',
  'device-state-fields.md',
  'generated-reference-router.md',
  'lql-reference.md',
  'mcp-tool-decision-tree.md',
  'msp-tool-registry.md',
  'off-endpoint-causes.md',
  'scope-ladder.md',
  'scope-resolution.md',
  'service-taxonomy.md',
  'subagent-definitions.md',
  'writing-voice.md',
];
const SKILL_LOCAL_REFERENCES = new Set(['output-template.md', 'hypothesis-generation.md']);

// Pinned snapshot of `service_vocabulary` from the SparkLogs source-library registry
// (registry.yaml). The registry is the authority and is additive-only; this list is the
// sync point for a standalone checkout of this repo. Adding a registry value requires
// adding it here AND as a row in src/guides/service-taxonomy.md in the same change;
// validateServiceTaxonomy() fails until both agree.
const REGISTRY_SERVICE_VALUES = [
  'storage',
  'patching',
  'auth',
  'security_audit',
  'networking',
  'vpn',
  'file_sharing',
  'file_sync',
  'printing',
  'backup',
  'os_stability',
  'app_stability',
  'hardware',
  'performance',
  'user_profiles',
  'remote_access',
  'rmm',
  'endpoint_protection',
  'device_management',
  'directory_services',
  'certificates',
  'virtualization',
  'clustering',
  'database',
  'web',
  'email',
  'time_sync',
  'licensing',
  'telephony',
  'scheduled_tasks',
  'inventory',
];

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

async function validateSkills() {
  const dir = path.join(ROOT, 'src', 'skills');
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const file = path.join(dir, entry.name, 'SKILL.md');
    const { data } = parseFrontmatter(await fs.readFile(file, 'utf8'), file);
    if (!PORTABLE.test(data.name ?? '')) throw new Error(`${file} has non-portable name: ${data.name}`);
    if (data.name !== entry.name) throw new Error(`${file} name must match directory ${entry.name}`);
    if (!data.description || data.description.length < 40) throw new Error(`${file} description is too short`);
    if (data.indexes === undefined) {
      throw new Error(`${file} needs indexes: frontmatter listing generated tables (use indexes: [] when none)`);
    }
    const indexes = data.indexes;
    if (!Array.isArray(indexes)) {
      throw new Error(`${file} indexes: must be a list`);
    }
    for (const kind of indexes) {
      if (!INDEX_KINDS.includes(kind)) throw new Error(`${file} unknown indexes entry: ${kind}`);
    }
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
  if (pkg.scripts?.rulesync) throw new Error('package.json must not keep a rulesync script');
}

async function validateGuides() {
  for (const reference of SHARED_REFERENCES) {
    const file = path.join(ROOT, 'src', 'guides', reference);
    if (!await exists(file)) throw new Error(`Missing guide: src/guides/${reference}`);
    const stat = await fs.lstat(file);
    if (stat.isSymbolicLink()) throw new Error(`src/guides/${reference} must be a real file, not a symlink`);
  }
  const dir = path.join(ROOT, 'src', 'skills');
  const skills = await fs.readdir(dir, { withFileTypes: true });
  for (const skill of skills) {
    if (!skill.isDirectory()) continue;
    const referencesDir = path.join(dir, skill.name, 'references');
    if (!await exists(referencesDir)) continue;
    const names = await fs.readdir(referencesDir);
    for (const name of names) {
      if (SHARED_REFERENCES.includes(name)) {
        throw new Error(`${path.relative(ROOT, path.join(referencesDir, name))} duplicates a guide; cite guides/${name}`);
      }
      if (!SKILL_LOCAL_REFERENCES.has(name)) {
        throw new Error(`${path.relative(ROOT, path.join(referencesDir, name))} is not a skill-local reference`);
      }
    }
  }
}

async function validateServiceTaxonomy() {
  const file = path.join(ROOT, 'src', 'guides', 'service-taxonomy.md');
  const text = await fs.readFile(file, 'utf8');
  const rows = new Set();
  for (const line of text.split('\n')) {
    // Rows are identifier-tagged: `| `storage` (value) |`. Untagged `| `storage` |` still counts.
    const match = line.match(/^\| `([a-z0-9_]+)`(?: \(value\))? \|/);
    if (match) rows.add(match[1]);
  }
  const expected = new Set(REGISTRY_SERVICE_VALUES);
  if (expected.size !== REGISTRY_SERVICE_VALUES.length) {
    throw new Error('REGISTRY_SERVICE_VALUES contains duplicates');
  }
  const missing = REGISTRY_SERVICE_VALUES.filter((value) => !rows.has(value));
  if (missing.length) {
    throw new Error(`service-taxonomy.md lacks rows for registry values: ${missing.join(', ')}`);
  }
  const unknown = [...rows].filter((value) => !expected.has(value));
  if (unknown.length) {
    throw new Error(`service-taxonomy.md has rows outside the registry vocabulary: ${unknown.join(', ')}`);
  }
}

async function validateSkillIndexes() {
  await checkIndexFiles(ROOT);
  const catalog = await loadIndexCatalog(ROOT);
  const targets = await listSkillIndexTargets(ROOT);
  for (const target of targets) {
    const text = await fs.readFile(target.file, 'utf8');
    for (const kind of target.indexes) {
      if (kind === 'feeds') {
        for (const id of catalog.modules) {
          if (!text.includes(`feeds/${id}/`)) {
            throw new Error(`${path.relative(ROOT, target.file)} missing feeds/${id}/`);
          }
        }
      }
      if (kind === 'themes') {
        for (const theme of catalog.themes) {
          if (!text.includes(theme.path)) {
            throw new Error(`${path.relative(ROOT, target.file)} missing ${theme.path}`);
          }
        }
      }
      if (kind === 'playbooks') {
        for (const playbook of catalog.playbooks) {
          if (!text.includes(playbook.path)) {
            throw new Error(`${path.relative(ROOT, target.file)} missing ${playbook.path}`);
          }
        }
      }
    }
  }
}

async function validateAssets() {
  for (const asset of REQUIRED_ASSETS) {
    if (!await exists(path.join(ROOT, ASSETS_DIR, asset))) {
      throw new Error(`Missing required asset: ${ASSETS_DIR}/${asset}`);
    }
  }
}

async function validateMetadata() {
  if (!await exists(path.join(ROOT, METADATA_FILE))) throw new Error(`Missing ${METADATA_FILE}`);
}

await validateSkills();
await validatePackage();
await validateGuides();
await validateServiceTaxonomy();
await validateSkillIndexes();
await validateAssets();
await validateMetadata();
console.log('Source validation passed');
