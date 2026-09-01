// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

import { assertRepoRoot } from './assert-repo-root.mjs';
import { harvestCommittedPlugin } from './identifier-sot.mjs';
import { lintSrcTree, proveIdentifierTags } from './identifier-tags.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const FIX = process.argv.includes('--fix-safe');

proveIdentifierTags();
console.log('identifier-tag guards: planted negatives all fired');

const committed = await harvestCommittedPlugin(ROOT);
if (committed.lql.size === 0 || committed.apps.size === 0) {
  throw new Error('committed src/feeds harvest is empty; GitHub CI membership would be vacuous');
}
console.log(`identifier membership fallback: ${committed.lql.size} LQL, ${committed.apps.size} app tokens from committed feeds`);

const errors = await lintSrcTree(ROOT, { fixSafe: FIX });
if (errors.length > 0) {
  throw new Error(`identifier tags failed:\n  ${errors.join('\n  ')}\nFix tags (membership in scripts/identifier-sot.yaml + library). --fix-safe only assigns when exactly one set matches.`);
}
console.log('identifier tags: clean');
