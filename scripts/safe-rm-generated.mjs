// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { FEED_ID } from './dist-layout.mjs';

const DEFAULT_ALLOWED_ROOTS = ['build', '.plugin-build'];

export function resolveGeneratedPath(target, { root = process.cwd(), allowedRoots = DEFAULT_ALLOWED_ROOTS } = {}) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(resolvedRoot, target);
  const relative = path.relative(resolvedRoot, resolvedTarget);

  if (relative === '' || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to use generated path outside repo root: ${target}`);
  }

  const firstSegment = relative.split(path.sep)[0];
  if (!allowedRoots.includes(firstSegment)) {
    throw new Error(`Refusing to use non-generated path: ${relative}`);
  }

  return resolvedTarget;
}

async function assertNoSymlinkInExistingPath(target, root) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(resolvedRoot, target);
  const relative = path.relative(resolvedRoot, resolvedTarget);
  const parts = relative.split(path.sep);
  let current = resolvedRoot;

  for (const part of parts) {
    current = path.join(current, part);
    try {
      const stat = await fs.lstat(current);
      if (stat.isSymbolicLink()) {
        throw new Error(`Refusing to remove generated path through symlink: ${path.relative(resolvedRoot, current)}`);
      }
    } catch (error) {
      if (error.code === 'ENOENT') return;
      throw error;
    }
  }
}

export async function safeRmGenerated(target, options = {}) {
  const root = options.root ?? process.cwd();
  const resolvedTarget = resolveGeneratedPath(target, options);
  await assertNoSymlinkInExistingPath(resolvedTarget, root);
  await fs.rm(resolvedTarget, { recursive: true, force: true });
}

// Wipe one feed directory under src/feeds/<id> only. Never src/, never src/feeds/.
export async function safeRmFeedModule(moduleId, options = {}) {
  if (!FEED_ID.test(moduleId)) {
    throw new Error(`Refusing to remove feed with invalid id: ${moduleId}`);
  }
  const root = options.root ?? process.cwd();
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(resolvedRoot, 'src', 'feeds', moduleId);
  const relative = path.relative(resolvedRoot, resolvedTarget);
  const parts = relative.split(path.sep);
  if (parts.length !== 3 || parts[0] !== 'src' || parts[1] !== 'feeds' || parts[2] !== moduleId) {
    throw new Error(`Refusing to remove non-feed path: ${relative}`);
  }
  await assertNoSymlinkInExistingPath(resolvedTarget, root);
  await fs.rm(resolvedTarget, { recursive: true, force: true });
}
