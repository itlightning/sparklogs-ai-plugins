// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Prose backticks that look like identifiers must be tagged in src/:
//   (arg)  tool input        kept on dist
//   (col)  response column   kept on dist
//   (LQL)  log filter/group  kept on dist
//   (tool) MCP tool name     stripped on render
//   (value) closed-vocab token stripped on render
//
// Fenced code is exempt. src/feeds/ and GENERATED blocks are skipped (library/stitch SoT).
// Dual-name denylist: bare reason/class/kind/topic/instance cannot be (LQL).

import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { GENERATED_BLOCK_RE } from './skill-indexes.mjs';

export const KEEP_TAGS = new Set(['arg', 'col', 'LQL']);
export const STRIP_TAGS = new Set(['tool', 'value']);
export const ALL_TAGS = new Set([...KEEP_TAGS, ...STRIP_TAGS]);

export const IDENTIFIER_BODY = '[a-z][a-z0-9_.]*';
const TAG_ALT = [...ALL_TAGS].join('|');
const TAGGED_RE = new RegExp('`(' + IDENTIFIER_BODY + ')` \\((' + TAG_ALT + ')\\)', 'g');
const BACKTICK_RE = new RegExp('`(' + IDENTIFIER_BODY + ')`(?: \\((' + TAG_ALT + ')\\))?', 'g');

const FENCE_LINE = /^(```|~~~)/;

export const LQL_BARE_FORBIDDEN = {
  reason: 'sparklogs.reason',
  class: 'sparklogs.class',
  kind: 'sparklogs.kind',
  topic: 'sparklogs.topic',
  instance: 'sparklogs.instance',
};

export const MCP_TOOLS = new Set([
  'server_info',
  'resolve_scope',
  'list_sources',
  'list_fields',
  'query_scope_activity',
  'describe_pattern',
  'get_query_metadata',
  'query_device_health',
  'query_logs',
  'query_event_counts_by_severity',
  'refine_query_result',
]);

export const VALUE_IDS = new Set([
  'win.eventlog.application',
  'win.eventlog.system',
  'win.eventlog.security',
  'win.eventlog.setup',
  'win.defender.eventlog',
  'win.servicing.cbs',
  'win.servicing.dism',
  'sparklogs.agent.state',
  'sparklogs.agent.vector',
  'sparklogs.agent.log',
  'inventory',
  'monitor',
  'delta',
  'agent_op',
  'config_change',
  'malformed',
  'rca',
  'fleet',
  'minimal',
  'microsoft_hyperv',
  'microsoft_iis',
  'microsoft_sql_server',
  'sparklogs_agent',
  'windows_defender',
  'vmware_tools',
]);

function isFenceOpen(line) {
  return FENCE_LINE.test(line.trim());
}

// Split markdown into lintable prose vs skipped regions (fences, GENERATED).
export function proseRanges(text) {
  GENERATED_BLOCK_RE.lastIndex = 0;
  const withoutGenerated = text.replace(GENERATED_BLOCK_RE, (block) => ' '.repeat(block.length));
  const ranges = [];
  const lines = withoutGenerated.split('\n');
  let offset = 0;
  let inFence = false;
  let start = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineLen = line.length + (i < lines.length - 1 ? 1 : 0);
    if (isFenceOpen(line)) {
      if (!inFence) {
        if (offset > start) ranges.push([start, offset]);
        inFence = true;
      } else {
        inFence = false;
        start = offset + lineLen;
      }
    }
    offset += lineLen;
  }
  if (!inFence && offset > start) ranges.push([start, offset]);
  return { text: withoutGenerated, ranges };
}

export function inRanges(index, ranges) {
  for (const [a, b] of ranges) {
    if (index >= a && index < b) return true;
  }
  return false;
}

export function stripAuthoringTags(text) {
  return text.replace(TAGGED_RE, (full, body, tag) => {
    if (STRIP_TAGS.has(tag)) return '`' + body + '`';
    return full;
  });
}

function skipRel(rel) {
  const n = rel.replaceAll('\\', '/');
  return n.startsWith('src/feeds/') || n.includes('/feeds/');
}

export function loadAllowlist(raw) {
  const doc = yaml.load(raw) || {};
  const tokens = doc.tokens;
  if (!Array.isArray(tokens)) return new Set();
  return new Set(tokens.map((t) => String(t)));
}

export function lintMarkdown(text, file, allowlist) {
  const errors = [];
  const { text: masked, ranges } = proseRanges(text);
  // Frontmatter: skip until the second ---
  let bodyStart = 0;
  if (masked.startsWith('---\n')) {
    const end = masked.indexOf('\n---\n', 4);
    if (end >= 0) bodyStart = end + 5;
  }
  BACKTICK_RE.lastIndex = 0;
  let m;
  while ((m = BACKTICK_RE.exec(masked)) !== null) {
    if (m.index < bodyStart) continue;
    if (!inRanges(m.index, ranges)) continue;
    const body = m[1];
    if (body.endsWith('.md')) continue;
    const tag = m[2];
    if (allowlist.has(body) && !tag) continue;
    if (!tag) {
      errors.push(`${file}: untagged \`${body}\``);
      continue;
    }
    if (!ALL_TAGS.has(tag)) {
      errors.push(`${file}: unknown tag (${tag}) on \`${body}\``);
      continue;
    }
    const want = LQL_BARE_FORBIDDEN[body];
    if (tag === 'LQL' && want) {
      errors.push(`${file}: \`${body}\` (LQL) is a health column name; LQL is \`${want}\``);
    }
    if (tag === 'col' && body.startsWith('sparklogs.') && LQL_BARE_FORBIDDEN[body.slice('sparklogs.'.length)]) {
      const bare = body.slice('sparklogs.'.length);
      errors.push(`${file}: \`${body}\` (col) is a wire path; health column is \`${bare}\``);
    }
  }
  return errors;
}

export const ARG_NAMES = new Set([
  'org_ids',
  'include_sub_orgs',
  'start',
  'end',
  'lql',
  'select',
  'group_by',
  'bucket',
  'limit',
  'query_id',
  'filter_lql',
  'having_lql',
  'order_by',
  'offset',
  'sample',
  'fieldset',
  'kinds',
  'reasons',
  'add_fields',
  'min_severity',
  'agent_ids',
  'group_by_reason',
  'include_top_interesting_patterns',
  'include_examples',
  'pattern_hashes',
  'top_n',
  'field_match',
  'query',
  'rmm_client_id',
  'psa_client_id',
  'device_classes',
  'device_roles',
  'include_agents',
  'external_investigation_id',
]);

export const LOG_FIELDS = new Set([
  'message',
  'severity',
  'source',
  'app',
  'subsource',
  'service',
  'category',
  'pattern',
  'pattern_hash',
  't',
  'agent_id',
  'service_hash',
  'app_hash',
  'subsource_hash',
  'category_hash',
  'source_hash',
  'filename',
]);

export const COL_NAMES = new Set([
  'query_url',
  'event_count',
  'agent_complete_through',
  'agent_status',
  'match_kind',
  'last_event_at',
  'first_event_at',
  'advisories',
  'cnt_critical_plus',
  'lookups',
  'top_interesting_patterns',
  'episode_age_basis',
  'collection_status',
  'collection_reasons',
  'row_kind',
  'reported_hostname',
  'page.next',
  'summary.scope',
  'cnt_interesting',
  'episode_replaced_id',
  'episode_clear_time_basis',
  'window_partial',
  'stuck_reason',
  'sent_via',
  'last_data_at',
  'cnt_warning',
  'last_heartbeat_at',
  'severity_level',
  'malformed_event',
  'open_monitors_count',
  'max_severity',
  'name',
  'as_of',
  'as_of_age_s',
  'observed_at',
  'epoch_id',
  'epoch_prev_id',
  'epoch_seq',
  'episode_id',
  'episode_recovery_attempts',
  'episode_post_gap_s',
  'episode_max_observation_gap_s',
  'episode_first_observed_ts',
  'episode_last_confirmed_ts',
  'episode_cleared_ts',
  'episode_phase',
  'episode_transition',
  'episode_occurrence',
  'episode_event_seq',
  'episode_end_reason',
  'inventory_part_number',
  'inventory_total_parts',
  'inventory_row_count',
  'actor_id',
  'actor_name',
  'actor_type',
  'target_id',
  'target_name',
  'target_type',
  'config_change_type',
  'config_change_action',
  'config_change_target',
  'distinct_interesting',
  'summary.severity_histogram',
  'schema.fields_with_no_values',
]);

VALUE_IDS.add('unresolved');
VALUE_IDS.add('ingest_key');
VALUE_IDS.add('observed');
VALUE_IDS.add('insufficient_evidence');
VALUE_IDS.add('agent');
VALUE_IDS.add('onset');
VALUE_IDS.add('held');
VALUE_IDS.add('recovering');
VALUE_IDS.add('ended');
VALUE_IDS.add('recovered');
VALUE_IDS.add('opened');
VALUE_IDS.add('relapsed');
VALUE_IDS.add('closed');
VALUE_IDS.add('unobserved_gap');
VALUE_IDS.add('unknown_ongoing');
VALUE_IDS.add('severity_raised');
VALUE_IDS.add('severity_lowered');

VALUE_IDS.add('online');
VALUE_IDS.add('offline');
VALUE_IDS.add('never_seen');
VALUE_IDS.add('stopped');
VALUE_IDS.add('system_shutdown');
VALUE_IDS.add('uninstalled');
VALUE_IDS.add('upgrading_overdue');
VALUE_IDS.add('deleted');
VALUE_IDS.add('unknown');
VALUE_IDS.add('exact');
VALUE_IDS.add('prefix');
VALUE_IDS.add('word');
VALUE_IDS.add('substring');
VALUE_IDS.add('high');
VALUE_IDS.add('medium');
VALUE_IDS.add('low');
VALUE_IDS.add('backup');
VALUE_IDS.add('storage');
VALUE_IDS.add('security_audit');

function isHealthColFile(fileRel) {
  const n = fileRel.replaceAll('\\', '/');
  return n.includes('device-state-fields.md')
    || n.includes('stream-kinds/device-state.md')
    || n.includes('themes/device-health-and-state.md')
    || n.endsWith('generated-reference-router.md');
}

function isLogHeavyFile(fileRel) {
  const n = fileRel.replaceAll('\\', '/');
  if (isHealthColFile(n) || n.endsWith('names.md')) return false;
  return n.startsWith('src/');
}

export function suggestSafeTag(body, fileRel = '') {
  if (body.endsWith('.md')) return null;
  if (MCP_TOOLS.has(body)) return 'tool';
  if (VALUE_IDS.has(body)) return 'value';
  if (ARG_NAMES.has(body)) return 'arg';
  if (COL_NAMES.has(body)) return 'col';
  if (LOG_FIELDS.has(body)) {
    return fileRel.replaceAll('\\', '/').includes('device-state-fields.md') ? 'col' : 'LQL';
  }
  if (LQL_BARE_FORBIDDEN[body]) {
    if (isHealthColFile(fileRel) || fileRel.includes('device-state-fields.md')) return 'col';
    return null;
  }
  if (body.startsWith('sparklogs.') && !VALUE_IDS.has(body)) return 'LQL';
  if (body.startsWith('win.eventlog.') || body.startsWith('win.servicing.') || body.startsWith('win.defender.')) {
    return body.split('.').length > 3 ? 'LQL' : 'value';
  }
  if (body === 'winlog.event_id' || body === 'provider_name' || body === 'origin') return 'LQL';
  if (fileRel.replaceAll('\\', '/').includes('service-taxonomy.md')) return 'value';
  return null;
}

export function applySafeTags(text, allowlist, fileRel = '') {
  const { ranges } = proseRanges(text);
  let bodyStart = 0;
  if (text.startsWith('---\n')) {
    const end = text.indexOf('\n---\n', 4);
    if (end >= 0) bodyStart = end + 5;
  }
  return text.replace(BACKTICK_RE, (full, body, tag, offset) => {
    if (offset < bodyStart) return full;
    if (!inRanges(offset, ranges)) return full;
    if (tag) return full;
    if (allowlist.has(body)) return full;
    if (!tag && LQL_BARE_FORBIDDEN[body] && isLogHeavyFile(fileRel)) {
      return '`' + LQL_BARE_FORBIDDEN[body] + '` (LQL)';
    }
    const suggested = suggestSafeTag(body, fileRel);
    if (!suggested) return full;
    return '`' + body + '` (' + suggested + ')';
  });
}

export function proveIdentifierTags() {
  const src = 'Use `query_logs` (tool) then `sparklogs.reason` (LQL) and `reason` (col).\n';
  const stripped = stripAuthoringTags(src);
  if (stripped.includes('(tool)')) throw new Error('strip left (tool)');
  if (!stripped.includes('`sparklogs.reason` (LQL)')) throw new Error('strip dropped (LQL)');
  if (!stripped.includes('`reason` (col)')) throw new Error('strip dropped (col)');
  const fence = 'Prose `query_logs`\n```\nquery_logs(lql="x")\n```\n';
  const ferr = lintMarkdown(fence, 't.md', new Set());
  if (!ferr.some((e) => e.includes('untagged'))) throw new Error('prose untagged not caught');
  if (ferr.some((e) => e.includes('query_logs(lql'))) throw new Error('linted inside fence');
  const dual = lintMarkdown('x `reason` (LQL) y', 't.md', new Set());
  if (!dual.some((e) => e.includes('sparklogs.reason'))) throw new Error('denylist missed bare reason LQL');
  const english = lintMarkdown('use `pattern_hash` (finest grain)', 't.md', new Set());
  if (!english.some((e) => e.includes('untagged `pattern_hash`'))) {
    throw new Error('english parenthetical was parsed as a tag');
  }
  const allowed = lintMarkdown('see `notafield` here', 't.md', new Set(['notafield']));
  if (allowed.length) throw new Error('allowlist ignored');
  const inventory = 'Prose `query_logs`\n<!-- BEGIN GENERATED INVENTORY -->\n### `win.eventlog.security`\n<!-- END GENERATED INVENTORY -->\n';
  const ierr = lintMarkdown(inventory, 't.md', new Set());
  if (!ierr.some((e) => e.includes('untagged `query_logs`'))) throw new Error('prose outside inventory not caught');
  if (ierr.some((e) => e.includes('win.eventlog.security'))) throw new Error('linted generated inventory');
}

export async function lintSrcTree(root, { fixSafe = false } = {}) {
  const allowPath = path.join(root, 'scripts', 'identifier-tag-allowlist.yaml');
  const allowlist = loadAllowlist(await fs.readFile(allowPath, 'utf8'));
  const errors = [];
  const src = path.join(root, 'src');

  async function walk(dir, relPrefix) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const rel = `${relPrefix}/${entry.name}`;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, rel);
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;
      if (skipRel(rel)) continue;
      let text = await fs.readFile(full, 'utf8');
      if (fixSafe) {
        const next = applySafeTags(text, allowlist, rel);
        if (next !== text) {
          await fs.writeFile(full, next);
          text = next;
        }
      }
      errors.push(...lintMarkdown(text, rel, allowlist));
    }
  }
  await walk(src, 'src');
  return errors;
}
