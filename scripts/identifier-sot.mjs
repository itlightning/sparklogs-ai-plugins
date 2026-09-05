// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Load identifier-sot.yaml and harvest LQL paths / reason values / app tokens from committed
// src/feeds (same as GitHub CI). Optional SPARKLOGS_IDENTIFIER_SOT_INCLUDE_LIBRARY=1 merges
// identifiers from a sibling sparklogs-source-library checkout for pre-sync authoring.

import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import {
  DEFAULT_SOURCE_LIBRARY_DIR,
  GENERATED_DIR,
  IDENTIFIER_SOT_INCLUDE_LIBRARY_ENV,
  LIBRARY_GENERATED_SUBPATH,
  MODULES,
  SOURCE_LIBRARY_DIR_ENV,
} from './generated-references.config.mjs';

const APP_VOCAB_BEGIN = '<!-- BEGIN GENERATED APP_VOCABULARY -->';
const APP_VOCAB_END = '<!-- END GENERATED APP_VOCABULARY -->';

const TABLE_CELL_RE = /^\| `([a-z][a-z0-9_.]*)` /gm;
const FAMILY_GLOB_RE = /`([a-z][a-z0-9_.]*)\.\*`/g;

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

function asList(raw, name) {
  if (!Array.isArray(raw) || !raw.every((x) => typeof x === 'string' && x)) {
    throw new Error(`identifier-sot.yaml ${name} must be a list of strings`);
  }
  return raw;
}

function libraryDir(root) {
  const configured = process.env[SOURCE_LIBRARY_DIR_ENV];
  if (configured) return { dir: path.resolve(root, configured), explicit: true };
  return { dir: path.resolve(root, DEFAULT_SOURCE_LIBRARY_DIR), explicit: false };
}

function addAll(set, items) {
  for (const item of items) set.add(item);
}

export function parseTableIdentifiers(text) {
  const out = new Set();
  TABLE_CELL_RE.lastIndex = 0;
  let m;
  while ((m = TABLE_CELL_RE.exec(text)) !== null) {
    if (!m[1].endsWith('.md')) out.add(m[1]);
  }
  return out;
}

export function parseFamilyGlobs(text) {
  const out = new Set();
  FAMILY_GLOB_RE.lastIndex = 0;
  let m;
  while ((m = FAMILY_GLOB_RE.exec(text)) !== null) out.add(m[1]);
  return out;
}

const ALL_IDENT_RE = /`([a-z][a-z0-9_.]*)`/g;

export function parseAllBacktickIdentifiers(text) {
  const out = new Set();
  ALL_IDENT_RE.lastIndex = 0;
  let m;
  while ((m = ALL_IDENT_RE.exec(text)) !== null) {
    if (!m[1].endsWith('.md')) out.add(m[1]);
  }
  return out;
}

function markdownSection(text, heading) {
  const startRe = new RegExp('^## ' + heading + '(?:\\n|$)', 'm');
  const start = text.search(startRe);
  if (start < 0) return '';
  const from = text.slice(start);
  const next = from.slice(3).search(/^## /m);
  return next < 0 ? from : from.slice(0, next + 3);
}

export async function harvestPublicTree(publicRoot) {
  const lql = new Set();
  const families = new Set();
  const reasons = new Set();
  for (const module of MODULES) {
    const fieldsPath = path.join(publicRoot, module, 'fields.md');
    if (!await exists(fieldsPath)) {
      throw new Error(`missing fields.md for ${module}: ${fieldsPath}`);
    }
    const fields = await fs.readFile(fieldsPath, 'utf8');
    addAll(lql, parseTableIdentifiers(markdownSection(fields, 'Module fields')));
    const portable = markdownSection(fields, 'Portable families');
    addAll(lql, parseTableIdentifiers(portable));
    addAll(families, parseFamilyGlobs(portable));
    addAll(families, parseFamilyGlobs(markdownSection(fields, 'Module fields')));
    const reasonsPath = path.join(publicRoot, module, 'reasons.md');
    if (await exists(reasonsPath)) {
      addAll(reasons, parseTableIdentifiers(await fs.readFile(reasonsPath, 'utf8')));
    }
    const enumsPath = path.join(publicRoot, module, 'enums.md');
    if (await exists(enumsPath)) {
      addAll(reasons, parseAllBacktickIdentifiers(await fs.readFile(enumsPath, 'utf8')));
    }
  }
  return { lql, families, reasons };
}

async function harvestAppsFromRegistry(libRoot) {
  const registryPath = path.join(libRoot, 'registry.yaml');
  if (!await exists(registryPath)) {
    throw new Error(`missing registry.yaml at ${registryPath}`);
  }
  const parsed = yaml.load(await fs.readFile(registryPath, 'utf8'));
  const vocab = parsed?.app_vocabulary;
  if (!vocab || typeof vocab !== 'object' || Array.isArray(vocab)) {
    throw new Error(`${registryPath} has no app_vocabulary map`);
  }
  const unpublished = new Set(Array.isArray(parsed.app_vocabulary_unpublished)
    ? parsed.app_vocabulary_unpublished : []);
  return new Set(Object.keys(vocab).filter((k) => !unpublished.has(k)));
}

async function harvestAppsFromPluginGuide(root) {
  const guidePath = path.join(root, 'src/guides/app-vocabulary.md');
  const text = await fs.readFile(guidePath, 'utf8');
  const begin = text.indexOf(APP_VOCAB_BEGIN);
  const end = text.indexOf(APP_VOCAB_END);
  if (begin < 0 || end < 0 || end < begin) {
    throw new Error(`${guidePath} is missing ${APP_VOCAB_BEGIN} / ${APP_VOCAB_END}`);
  }
  return parseTableIdentifiers(text.slice(begin, end));
}

export async function harvestLibrary(libRoot) {
  const publicRoot = path.join(libRoot, LIBRARY_GENERATED_SUBPATH);
  if (!await exists(publicRoot)) {
    throw new Error(`source-library has no ${LIBRARY_GENERATED_SUBPATH} at ${publicRoot}`);
  }
  const tree = await harvestPublicTree(publicRoot);
  const apps = await harvestAppsFromRegistry(libRoot);
  return { ...tree, apps };
}

export async function harvestCommittedPlugin(root) {
  const publicRoot = path.join(root, GENERATED_DIR);
  if (!await exists(publicRoot)) {
    throw new Error(`committed feed tree missing at ${publicRoot}`);
  }
  const tree = await harvestPublicTree(publicRoot);
  const apps = await harvestAppsFromPluginGuide(root);
  return { ...tree, apps };
}

export function mergeSot(fileDoc, harvested, modules) {
  const tools = new Set(asList(fileDoc.tools, 'tools'));
  const args = new Set(asList(fileDoc.args, 'args'));
  const cols = new Set(asList(fileDoc.cols, 'cols'));
  const lql = new Set(asList(fileDoc.lql_resident, 'lql_resident'));
  const families = new Set(asList(fileDoc.lql_families, 'lql_families'));
  const values = new Set();
  addAll(lql, harvested.lql);
  addAll(families, harvested.families);
  addAll(lql, families);
  addAll(values, harvested.reasons);
  addAll(values, harvested.apps);
  addAll(values, modules);
  const groups = fileDoc.values || {};
  if (typeof groups !== 'object' || Array.isArray(groups)) {
    throw new Error('identifier-sot.yaml values must be a map of lists');
  }
  for (const [name, list] of Object.entries(groups)) {
    addAll(values, asList(list, `values.${name}`));
  }
  return { tools, args, cols, lql, families, values };
}

export function lqlMember(sot, body) {
  if (sot.lql.has(body)) return true;
  if (body.endsWith('.*')) return sot.families.has(body.slice(0, -2));
  return false;
}

export function setsContaining(sot, body) {
  const hits = [];
  if (sot.tools.has(body)) hits.push('tool');
  if (sot.args.has(body)) hits.push('arg');
  if (sot.cols.has(body)) hits.push('col');
  if (lqlMember(sot, body)) hits.push('LQL');
  if (sot.values.has(body)) hits.push('value');
  return hits;
}

export function membershipError(file, body, tag, hits) {
  const elsewhere = hits.filter((t) => t !== tag);
  const hint = elsewhere.length ? ` (this body is a ${elsewhere.join('/')})` : '';
  if (tag === 'other') {
    if (body.includes('.')) {
      return `${file}: \`${body}\` (other) cannot be dotted; use LQL/col/value or drop backticks`;
    }
    if (hits.length) {
      return `${file}: \`${body}\` (other) is a product identifier${hint}`;
    }
    return null;
  }
  if (hits.includes(tag)) return null;
  return `${file}: \`${body}\` (${tag}) is not in the ${tag} set${hint}`;
}

function includeLibraryHarvest() {
  const raw = process.env[IDENTIFIER_SOT_INCLUDE_LIBRARY_ENV];
  return raw === '1' || raw === 'true';
}

export async function loadIdentifierSot(root) {
  const yamlPath = path.join(root, 'scripts', 'identifier-sot.yaml');
  const doc = yaml.load(await fs.readFile(yamlPath, 'utf8'));
  if (!doc || typeof doc !== 'object') throw new Error('identifier-sot.yaml is empty');
  let harvested;
  if (includeLibraryHarvest()) {
    const { dir, explicit } = libraryDir(root);
    const libPublic = path.join(dir, LIBRARY_GENERATED_SUBPATH);
    if (await exists(libPublic)) {
      console.log(`identifier membership: merging sibling source-library at ${dir}`);
      harvested = await harvestLibrary(dir);
    } else if (explicit) {
      throw new Error(`${SOURCE_LIBRARY_DIR_ENV} is set to ${dir} but it holds no ${LIBRARY_GENERATED_SUBPATH}`);
    } else {
      console.log(`identifier membership: ${IDENTIFIER_SOT_INCLUDE_LIBRARY_ENV} set but no checkout at ${dir}; using committed ${GENERATED_DIR}`);
      harvested = await harvestCommittedPlugin(root);
    }
  } else {
    console.log(`identifier membership: using committed ${GENERATED_DIR}`);
    harvested = await harvestCommittedPlugin(root);
  }
  return mergeSot(doc, harvested, MODULES);
}
