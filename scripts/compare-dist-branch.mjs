// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
/**
 * Compare local build/dist to a git ref whose tree matches the published dist branch
 * (repo root on dist == contents of build/dist). Uses a temp directory only.
 *
 * Usage:
 *   yarn run compare-dist
 *   node scripts/compare-dist-branch.mjs [ref]
 *
 * Default ref is origin/dist. Fetch first: git fetch origin dist
 *
 * Streams git archive -> tar (no in-memory tarball; avoids execFileSync ENOBUFS on large trees).
 */
import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { assertRepoRoot } from './assert-repo-root.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const BUILD_DIST = path.join(ROOT, 'build', 'dist');
const ref = process.argv[2] ?? 'origin/dist';

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function waitClose(child) {
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', (code, signal) => {
      if (signal) reject(new Error(`${child.spawnfile ?? 'child'} killed (${signal})`));
      else resolve(code);
    });
  });
}

/**
 * Extract git tree at ref into destDir using a pipe (same as git archive | tar -x).
 */
async function gitArchiveExtractToDir(gitRef, cwd, destDir) {
  const git = spawn('git', ['archive', gitRef], { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
  const tar = spawn('tar', ['-x', '-C', destDir], { stdio: ['pipe', 'pipe', 'inherit'] });

  let gitStderr = '';
  git.stderr.setEncoding('utf8');
  git.stderr.on('data', (chunk) => {
    gitStderr += chunk;
  });

  const gitDone = waitClose(git);
  const tarDone = waitClose(tar);

  try {
    await pipeline(git.stdout, tar.stdin);
  } catch (err) {
    git.kill('SIGTERM');
    tar.kill('SIGTERM');
    await Promise.allSettled([gitDone, tarDone]);
    throw err;
  }

  const [gitCode, tarCode] = await Promise.all([gitDone, tarDone]);

  if (gitCode !== 0) {
    throw new Error(`git archive failed (${gitCode}): ${gitStderr.trim()}`);
  }
  if (tarCode !== 0) {
    throw new Error(`tar failed (${tarCode})`);
  }
}

if (!(await exists(BUILD_DIST))) {
  console.error(`Missing ${BUILD_DIST}. Run yarn fullrebuild first.`);
  process.exit(1);
}

try {
  execFileSync('git', ['rev-parse', '--verify', ref], { cwd: ROOT, stdio: 'pipe' });
} catch {
  console.error(`Git ref "${ref}" is not available. Try: git fetch origin dist`);
  process.exit(1);
}

const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sparklogs-dist-compare-'));

try {
  await gitArchiveExtractToDir(ref, ROOT, tmpDir);

  console.log(`Comparing:\n  local: ${BUILD_DIST}\n  ref:   ${ref} (extracted under ${tmpDir})\n`);

  execFileSync('diff', ['-qr', BUILD_DIST, tmpDir], { cwd: ROOT, stdio: 'inherit' });
  console.log('No differences.');
} catch (error) {
  const status = error.status ?? error.code;
  if (status === 1) {
    console.error('\nDirectories differ.');
    process.exit(1);
  }
  throw error;
} finally {
  await fs.rm(tmpDir, { recursive: true, force: true });
}
