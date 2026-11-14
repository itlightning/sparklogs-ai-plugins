// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Pack-minted `app` tokens are closed vocabulary. Emit `(value)` so src/ matches
// identifier-tag authoring; render strips that tag. The GENERATED block is not linted.
// The same registry read also writes SERVICE_VOCABULARY_FILE, the `service` key list that
// validate-skills.mjs holds src/guides/service-taxonomy.md to on a standalone checkout.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import yaml from 'js-yaml';
import { assertRepoRoot } from './assert-repo-root.mjs';
import {
  DEFAULT_SOURCE_LIBRARY_DIR,
  SOURCE_LIBRARY_DIR_ENV,
} from './generated-references.config.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const TARGET = 'src/guides/app-vocabulary.md';
const BEGIN = '<!-- BEGIN GENERATED APP_VOCABULARY -->';
const END = '<!-- END GENERATED APP_VOCABULARY -->';
export const SERVICE_VOCABULARY_FILE = 'scripts/generated-service-vocabulary.json';

async function exists(file) {
  try {
    await fs.lstat(file);
    return true;
  } catch {
    return false;
  }
}

function libraryDir() {
  const configured = process.env[SOURCE_LIBRARY_DIR_ENV];
  if (configured) return { dir: path.resolve(ROOT, configured), explicit: true };
  return { dir: path.resolve(ROOT, DEFAULT_SOURCE_LIBRARY_DIR), explicit: false };
}

function cell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}

function unpublishedKeys(parsed, vocab) {
  const raw = parsed.app_vocabulary_unpublished;
  if (raw == null) return new Set();
  if (!Array.isArray(raw) || !raw.every((k) => typeof k === 'string' && k)) {
    throw new Error('registry app_vocabulary_unpublished must be a list of keys');
  }
  const missing = raw.filter((k) => !(k in vocab));
  if (missing.length) {
    throw new Error(`app_vocabulary_unpublished names keys not in app_vocabulary: ${missing.join(', ')}`);
  }
  return new Set(raw);
}

function publicBlurb(key, entry) {
  if (typeof entry === 'string') {
    throw new Error(
      `app_vocabulary.${key}: scalar descriptions are not allowed; use a map with public:`,
    );
  }
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error(`app_vocabulary.${key}: value must be a map with public:`);
  }
  const extra = Object.keys(entry).filter((k) => k !== 'public' && k !== 'internal_note');
  if (extra.length) {
    throw new Error(`app_vocabulary.${key}: unknown keys ${extra.join(', ')}`);
  }
  const pub = entry.public;
  if (typeof pub !== 'string' || !pub.trim()) {
    throw new Error(`app_vocabulary.${key}: public is required for the plugin table`);
  }
  return pub.trim();
}

function renderTable(vocab, unpublished) {
  const keys = Object.keys(vocab).filter((k) => !unpublished.has(k)).sort();
  if (keys.length === 0) throw new Error('registry app_vocabulary has no public keys');
  const lines = [
    '| Token | Product |',
    '|---|---|',
    ...keys.map((key) => `| \`${key}\` (value) | ${cell(publicBlurb(key, vocab[key]))} |`),
  ];
  return lines.join('\n');
}

function splice(text, table) {
  const begin = text.indexOf(BEGIN);
  const end = text.indexOf(END);
  if (begin < 0 || end < 0 || end < begin) {
    throw new Error(`${TARGET} is missing ${BEGIN} / ${END} markers`);
  }
  const head = text.slice(0, begin + BEGIN.length);
  const tail = text.slice(end);
  return `${head}\n\n${table}\n\n${tail}`;
}

function serviceVocabularyJson(parsed, registryPath) {
  const services = parsed?.service_vocabulary;
  if (!services || typeof services !== 'object' || Array.isArray(services)) {
    throw new Error(`${registryPath} has no service_vocabulary map`);
  }
  return `${JSON.stringify(Object.keys(services).sort(), null, 2)}
`;
}

async function readOrEmpty(file) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

export async function syncAppVocabulary({ check = false } = {}) {
  const { dir, explicit } = libraryDir();
  const registryPath = path.join(dir, 'registry.yaml');
  if (!await exists(registryPath)) {
    if (explicit) throw new Error(`${SOURCE_LIBRARY_DIR_ENV} is set to ${dir} but registry.yaml is missing`);
    if (check) {
      console.log(`app-vocabulary drift: SKIPPED, no source-library checkout at ${dir}`);
      return;
    }
    throw new Error(`No source-library checkout at ${dir}. Set ${SOURCE_LIBRARY_DIR_ENV}.`);
  }
  const raw = await fs.readFile(registryPath, 'utf8');
  const parsed = yaml.load(raw);
  const vocab = parsed?.app_vocabulary;
  if (!vocab || typeof vocab !== 'object' || Array.isArray(vocab)) {
    throw new Error(`${registryPath} has no app_vocabulary map`);
  }
  const unpublished = unpublishedKeys(parsed, vocab);
  const table = renderTable(vocab, unpublished);
  const file = path.join(ROOT, TARGET);
  const current = await fs.readFile(file, 'utf8');
  const next = splice(current, table);
  const servicesFile = path.join(ROOT, SERVICE_VOCABULARY_FILE);
  const servicesCurrent = await readOrEmpty(servicesFile);
  const servicesNext = serviceVocabularyJson(parsed, registryPath);
  if (check) {
    const drifted = [
      ...(current !== next ? [`${TARGET} (app_vocabulary)`] : []),
      ...(servicesCurrent !== servicesNext ? [`${SERVICE_VOCABULARY_FILE} (service_vocabulary)`] : []),
    ];
    if (drifted.length) {
      throw new Error(`Out of date with source-library registry.yaml: ${drifted.join(', ')}. Run: yarn sync-generated`);
    }
    console.log('app-vocabulary table and service vocabulary match registry.yaml');
    return;
  }
  if (servicesCurrent !== servicesNext) {
    await fs.writeFile(servicesFile, servicesNext);
    console.log(`wrote ${SERVICE_VOCABULARY_FILE}`);
  }
  if (current === next) {
    console.log(`${TARGET}: already current`);
    return;
  }
  await fs.writeFile(file, next);
  const publicN = Object.keys(vocab).filter((k) => !unpublished.has(k)).length;
  console.log(`wrote ${TARGET} (${publicN} public tokens, ${unpublished.size} unpublished)`);
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (invokedDirectly) {
  await syncAppVocabulary({ check: process.argv.includes('--check') });
}
