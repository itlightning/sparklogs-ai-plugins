// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Ensures process.cwd() matches the sparklogs-ai-plugins repo root (parent of scripts/).
 * Call at startup with the caller's import.meta (scripts live in scripts/).
 */
export function assertRepoRoot(importMeta) {
  const scriptDir = importMeta.dirname ?? path.dirname(fileURLToPath(importMeta.url));
  const repoRoot = path.dirname(scriptDir);
  let cwd;
  let resolvedRoot;
  try {
    cwd = fs.realpathSync(process.cwd());
    resolvedRoot = fs.realpathSync(repoRoot);
  } catch (error) {
    throw new Error(`Cannot resolve repository root for cwd check: ${error.message}`);
  }
  if (cwd !== resolvedRoot) {
    throw new Error(
      `Run this command from the repository root (expected ${resolvedRoot}, cwd is ${cwd})`,
    );
  }
}
