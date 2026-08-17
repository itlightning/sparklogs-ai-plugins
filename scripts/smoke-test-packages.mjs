// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.
import fs from 'node:fs/promises';
import path from 'node:path';
import { assertRepoRoot } from './assert-repo-root.mjs';

assertRepoRoot(import.meta);

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, process.argv[2] ?? 'build/dist');
const checks = [
  '.claude-plugin/marketplace.json',
  '.cursor-plugin/marketplace.json',
  '.agents/plugins/marketplace.json',
  'plugins/claude/sparklogs/skills/sparklogs-investigate/SKILL.md',
  'plugins/claude/sparklogs/skills/sparklogs-ask/SKILL.md',
  'plugins/cursor/sparklogs/rules/when-to-use-sparklogs.md',
  'plugins/codex/sparklogs/.codex-plugin/plugin.json',
  'plugins/generic/sparklogs/skills/sparklogs-analyze-cause/SKILL.md',
];

for (const check of checks) await fs.access(path.join(DIST, check));
console.log('Smoke tests passed');
