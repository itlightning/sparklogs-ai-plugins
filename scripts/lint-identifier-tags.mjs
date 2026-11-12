// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

import { assertRepoRoot } from './assert-repo-root.mjs';
import { harvestCommittedPlugin, loadIdentifierSot } from './identifier-sot.mjs';
import {
  lintSrcTree,
  proveIdentifierTags,
  proveLqlRefsInMarkdown,
  vetLqlFieldsInTree,
} from './identifier-tags.mjs';
import { proveLqlFieldRefs } from './lql-field-refs.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const FIX = process.argv.includes('--fix-safe');

proveIdentifierTags();
proveLqlFieldRefs();
proveLqlRefsInMarkdown();
console.log('identifier-tag and LQL field guards: planted negatives all fired');

const committed = await harvestCommittedPlugin(ROOT);
if (committed.lql.size === 0 || committed.apps.size === 0) {
  throw new Error('committed src/feeds harvest is empty; GitHub CI membership would be vacuous');
}
console.log(`identifier membership fallback: ${committed.lql.size} LQL, ${committed.apps.size} app tokens from committed feeds`);

const sot = await loadIdentifierSot(ROOT);
const errors = await lintSrcTree(ROOT, { fixSafe: FIX, sot });
if (errors.length > 0) {
  throw new Error(`identifier tags failed:\n  ${errors.join('\n  ')}\nFix tags (membership in scripts/identifier-sot.yaml + library). --fix-safe only assigns when exactly one set matches.`);
}
console.log('identifier tags: clean');

const lql = await vetLqlFieldsInTree(ROOT, sot);
if (lql.packOnly.size > 0) {
  console.log(`LQL fields declared by the pack but absent from the live snapshot (rare events; passing):`);
  for (const [field, where] of [...lql.packOnly].sort()) console.log(`  ${field}  (${where.join(', ')})`);
}
for (const warning of lql.warnings) console.log(`WARNING generated reference: ${warning}`);
if (lql.errors.length > 0) {
  throw new Error(`LQL field vet failed:\n  ${lql.errors.join('\n  ')}\nUse a real field (list_fields), or a name on lql_pedagogical in scripts/identifier-sot.yaml marked illustrative in the guide.`);
}
console.log(`LQL fields: every name in src/ is vetted (${sot.live.size} live, ${sot.packLql.size} pack-declared)`);
