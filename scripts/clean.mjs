// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import { assertRepoRoot } from './assert-repo-root.mjs';
import { safeRmGenerated } from './safe-rm-generated.mjs';

assertRepoRoot(import.meta);

for (const dir of ['build', '.plugin-build']) {
  await safeRmGenerated(dir);
}

console.log('Removed local build output');
