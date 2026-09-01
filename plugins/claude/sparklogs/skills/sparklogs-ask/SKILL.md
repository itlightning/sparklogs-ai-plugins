---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. This is a conversation with the data, not an investigation report.

**WEL** means Windows Event Log.

No output template. No WHAT WAS NOT CHECKED catalog. You may go as deep as the question needs. Follow-up queries are expected.

`sparklogs-investigate` is the written pass: a cited system-condition summary they can put on a ticket. Offer it when they want that artifact. Do not switch to it just because the chat went deep.

## How to answer

Answer first, then stop talking, never mid-query. Hedge precisely: "not in this window", "not checked", "insufficient evidence". Suggest likely causes and practical next steps when the evidence supports them.

- Empty `sparklogs.*` fields on an event mean the event is uncurated (this is not a health finding). A field this feed does not write is not "no problem" and not a problem.
- If org/host/window is not obvious, `resolve_scope`. Ask only if identity is fuzzy: tied org or host matches, weak `match_kind` (col), or zero hits. Many devices under one resolved org is normal; keep them. Do not guess.
- Funnel: coverage before claims. `list_sources` for what arrived in the window (any source type). `query_device_health` when SparkLogs Agents are in scope and the question is standing state, inventory, or silence. `query_scope_activity` for what combinations exist. Pattern mining: `query_event_counts_by_severity` and `describe_pattern`. `query_logs` last. `list_fields` rare.
- Completeness claims need `agent_complete_through` (col) / feed reports, never first/last event bounds.
- Cite a `query_url` (col) on factual claims.
- Default to the named scope (one org, one host, or the set they named). Do not scan the whole fleet unprompted. If a finding looks serious or shared (same `pattern_hash` (LQL), `service` (LQL), or reason; ransomware-class, backup-wide, identity), suggest a fleet hunt and wait unless they already asked. Fleet hunt: climb the scope ladder and pattern counts first (`query_scope_activity`, `query_event_counts_by_severity` with `group_by` (arg), `describe_pattern`). `query_logs` only after that list is narrow.
- Prefer coverage, then `query_device_health` or counts, over `query_logs`. Prefer `refine_query_result` on a cached slice over a new scan. If refine returns `cache_invalidated`, issue a new tool call; do not retry that `query_id` (arg).
- Every data-access call needs `external_investigation_id` (arg). Pick a short id that names the topic and reuse it across follow-ups until the topic clearly changes.

## Which tool

- "What is on the box / CPU / RAM / disk / installed / open condition" → `query_device_health` (`fieldset=rca` for one host).
- Named backup product (Veeam, Datto, Axcient, Acronis, MSP360, Cove, Slide) → `query_device_health` first for what is installed, then counts for a timeline. Vendor channels are collected, queryable; events carry the job verdict, not VSS. Application `reasons.md` skips vendor products; query events directly.
- "What happened / how many / when" → `query_event_counts_by_severity` (pattern mining) or `query_scope_activity` first; `query_logs` only for a narrow slice.
- Collector debug only → `sparklogs.agent.vector` / `sparklogs.agent.log`. Not the headline for device health.

Load a guide when you are stuck on that topic (`${CLAUDE_PLUGIN_ROOT}/guides/scope-resolution.md`, `${CLAUDE_PLUGIN_ROOT}/guides/mcp-tool-decision-tree.md`, `${CLAUDE_PLUGIN_ROOT}/guides/lql-reference.md`, `${CLAUDE_PLUGIN_ROOT}/guides/common-mistakes.md`, `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds.md`). Open the one you need, never the whole set.

## Where to look

You may open the matching playbook for domain facts and starter LQL. Do not emit the investigation report from it.
Playbooks are incomplete. Empty recipe LQL is not "nothing happened": widen by `subsource` (LQL), then that kind's explore ladder (`${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds.md`), then raw logs, before you say you cannot answer.

**Playbooks** (symptom recipes):

| Symptom | File |
|---|---|
| Backup job failed | `${CLAUDE_PLUGIN_ROOT}/playbooks/backup-failure.md` |
| BitLocker recovery | `${CLAUDE_PLUGIN_ROOT}/playbooks/bitlocker-recovery.md` |
| Certificate expiry | `${CLAUDE_PLUGIN_ROOT}/playbooks/certificate-expiry.md` |
| Directory replication | `${CLAUDE_PLUGIN_ROOT}/playbooks/directory-replication-failure.md` |
| Disk full or filling | `${CLAUDE_PLUGIN_ROOT}/playbooks/disk-full-or-filling.md` |
| Memory or handle leak | `${CLAUDE_PLUGIN_ROOT}/playbooks/memory-or-handle-leak.md` |
| RAID / array degraded | `${CLAUDE_PLUGIN_ROOT}/playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `${CLAUDE_PLUGIN_ROOT}/playbooks/rmm-connectivity.md` |
| Slow logon | `${CLAUDE_PLUGIN_ROOT}/playbooks/slow-logon.md` |
| Windows Update / patch failure | `${CLAUDE_PLUGIN_ROOT}/playbooks/windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `${CLAUDE_PLUGIN_ROOT}/playbooks/windows-vss.md` |

**Themes** (domain, feeds that join):

| Topic | File |
|---|---|
| Patches / CBS / DISM / Setup | `${CLAUDE_PLUGIN_ROOT}/themes/windows-updates-and-patching.md` |
| Who changed what (Security) | `${CLAUDE_PLUGIN_ROOT}/themes/windows-security-and-audit.md` |
| Defender | `${CLAUDE_PLUGIN_ROOT}/themes/endpoint-protection.md` |
| App / System crashes and services | `${CLAUDE_PLUGIN_ROOT}/themes/windows-operational-events.md` |
| CPU, RAM, disk, installed software, monitors | `${CLAUDE_PLUGIN_ROOT}/themes/device-health-and-state.md` |
| Named backup product (Veeam etc.): installed products. Not operational events. | `${CLAUDE_PLUGIN_ROOT}/themes/device-health-and-state.md` |

**Data feeds** (`subsource` (LQL) = directory name). Kind (how to explore): `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds.md`. Then `${CLAUDE_PLUGIN_ROOT}/feeds/<id>/README.md` and one artifact (`fields.md`, `enums.md`, `reasons.md`). Search `reasons.md` for the `##` heading that matches the reason slug. Do not read the whole file.

| Feed | What | Path |
|---|---|---|
| `win.eventlog.security` | Security auditing: logons, account and policy changes, actors | `${CLAUDE_PLUGIN_ROOT}/feeds/win.eventlog.security/` |
| `win.eventlog.system` | System channel: services, drivers, kernel, VSS, storage | `${CLAUDE_PLUGIN_ROOT}/feeds/win.eventlog.system/` |
| `win.eventlog.application` | Application channel: app crashes, hangs, vendor app events | `${CLAUDE_PLUGIN_ROOT}/feeds/win.eventlog.application/` |
| `win.eventlog.setup` | Windows Update results per update | `${CLAUDE_PLUGIN_ROOT}/feeds/win.eventlog.setup/` |
| `win.servicing.cbs` | CBS servicing internals: component store, packages | `${CLAUDE_PLUGIN_ROOT}/feeds/win.servicing.cbs/` |
| `win.servicing.dism` | DISM operations and image health | `${CLAUDE_PLUGIN_ROOT}/feeds/win.servicing.dism/` |
| `win.defender.eventlog` | Defender: threats, protection state | `${CLAUDE_PLUGIN_ROOT}/feeds/win.defender.eventlog/` |
| `sparklogs.agent.state` | Device health and state snapshots: CPU, RAM, disk, installed software, monitors | `${CLAUDE_PLUGIN_ROOT}/feeds/sparklogs.agent.state/` |
| `sparklogs.agent.vector` | Collector debug only: data collector internals | `${CLAUDE_PLUGIN_ROOT}/feeds/sparklogs.agent.vector/` |
| `sparklogs.agent.log` | Collector debug only: agent supervisor log | `${CLAUDE_PLUGIN_ROOT}/feeds/sparklogs.agent.log/` |

## Written investigation

Name the matching playbook when you offer `sparklogs-investigate` and the table fits.

Cause hypotheses: `sparklogs-analyze-cause` only after an investigation summary exists.
