// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

import { assertRepoRoot } from './assert-repo-root.mjs';
import { lintSrcTree, proveIdentifierTags } from './identifier-tags.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const FIX = process.argv.includes('--fix-safe');

proveIdentifierTags();
console.log('identifier-tag guards: planted negatives all fired');

const errors = await lintSrcTree(ROOT, { fixSafe: FIX });
if (errors.length > 0) {
  throw new Error(`identifier tags failed:\n  ${errors.join('\n  ')}\nFix tags or run: node scripts/lint-identifier-tags.mjs --fix-safe`);
}
console.log('identifier tags: clean');
