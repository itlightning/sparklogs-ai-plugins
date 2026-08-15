// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';
import {
  MAX_SRC_FILE_BYTES,
  classifySrcPath,
  extraFeedDirs,
  oversize,
  proveLayoutGuards,
} from './dist-layout.mjs';
import { MODULES } from './generated-references.config.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const FEEDS = path.join(ROOT, 'src', 'feeds');

async function walkFiles(dir, relPrefix, acc) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const rel = `${relPrefix}/${entry.name}`;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkFiles(full, rel, acc);
    else acc.push({ rel, full });
  }
}

async function lintSrc() {
  const files = [];
  await walkFiles(SRC, 'src', files);
  const failures = [];
  for (const file of files) {
    const verdict = classifySrcPath(file.rel);
    if (!verdict.ok) failures.push(verdict.reason);
    const stat = await fs.stat(file.full);
    if (oversize(stat.size, MAX_SRC_FILE_BYTES)) {
      failures.push(`${file.rel} is ${stat.size} bytes (cap ${MAX_SRC_FILE_BYTES})`);
    }
  }
  let feedNames = [];
  try {
    feedNames = (await fs.readdir(FEEDS, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  for (const orphan of extraFeedDirs(feedNames, MODULES)) {
    failures.push(`src/feeds/${orphan} is not in MODULES; remove it or add it to the sync config`);
  }
  if (failures.length > 0) {
    throw new Error(`src/ layout failed:\n  ${failures.join('\n  ')}`);
  }
  console.log(`src/ layout: ${files.length} file(s), ${feedNames.length} feed dir(s)`);
}

proveLayoutGuards();
console.log('layout guards: planted negatives all fired');
await lintSrc();
