// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import { assertRepoRoot } from './assert-repo-root.mjs';
import { checkIndexFiles, stitchIndexFiles } from './skill-indexes.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const check = process.argv.includes('--check');
if (check) {
  await checkIndexFiles(ROOT);
  console.log('Index tables match leaf frontmatter');
} else {
  const written = await stitchIndexFiles(ROOT);
  console.log(`Stitched ${written.length} file(s):\n  ${written.join('\n  ')}`);
}
