---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
indexes: [playbooks, themes, feeds]
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. This is a conversation with the data, not an investigation report.

**WEL** means Windows Event Log.

No output template. No WHAT WAS NOT CHECKED catalog. Go as deep as the question needs. Follow-ups expected.

`sparklogs-investigate` is a cited system-condition summary with findings; offer when they want a written report. `sparklogs-analyze-cause` only after a summary exists.

## Investigation discipline

1. **Bounded discovery first:** capped structure tools before event payloads (`list_sources` (tool), `query_scope_activity` (tool), `describe_pattern` (tool)).
2. **Aggregate before detail:** counts and rank before `query_logs` (tool).
3. **Cache before re-query:** `refine_query_result` (tool) on the cached slice when it already covers the question.

Per-tool detail: `guides/mcp-tool-decision-tree.md`.

## How to answer

Answer first, then stop. Hedge precisely ("not in this window", "not checked", "insufficient evidence"). Cite `query_url` (col) on facts. Reuse a short `external_investigation_id` (arg) until the topic changes.

**Questions that pick the path:** (e.g., what is on the box? what happened and when? one host or fleet? which symptom domain? is collection trustworthy?)

**Principles:** empty `sparklogs.*` fields = uncurated (not a health finding); completeness from feed reports only (`agent_complete_through` (col)); default to named scope; ask only on fuzzy identity (`match_kind` (col) ties, weak match, zero hits). Fleet hunt only when serious/shared and they agree.

Funnel, scope, LQL errors: `guides/mcp-tool-decision-tree.md`, `guides/scope-resolution.md`, `guides/lql-reference.md`. Stuck: `guides/common-mistakes.md`, `guides/stream-kinds.md`.

## Which tool (quick route)

- Standing state (e.g., CPU/RAM/IO) / inventory (e.g., installed apps and services, device drivers, volume map, processes) / open conditions → `query_device_health` (tool) (`fieldset` (arg) `rca` (value) for one host)
- Counts, patterns, when → `query_event_counts_by_severity` (tool), `describe_pattern` (tool), `query_scope_activity` (tool)
- Named backup product installed → `query_device_health` (tool) first; job verdict in events, not VSS alone
- Raw event lines → `query_logs` (tool) last, then refine
- Collector debug → `sparklogs.agent.vector` (value) / `sparklogs.agent.log` (value) only

## Where to look

Indexes below route to playbooks, themes, and feeds. Open one file when the step needs it; do not preload the corpus.

Playbooks are incomplete recipes. If a recipe LQL produces empty results: widen by `subsource` (LQL), then `guides/stream-kinds.md`, then raw logs.

**Playbooks** (symptom recipes):

<!-- BEGIN GENERATED INDEX:playbooks -->
| Symptom | File |
|---|---|
| Backup job failed | `playbooks/backup-failure.md` |
| BitLocker recovery | `playbooks/bitlocker-recovery.md` |
| Certificate expiry | `playbooks/certificate-expiry.md` |
| Directory replication | `playbooks/directory-replication-failure.md` |
| Disk full or filling | `playbooks/disk-full-or-filling.md` |
| Memory or handle leak | `playbooks/memory-or-handle-leak.md` |
| RAID / array degraded | `playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `playbooks/rmm-connectivity.md` |
| Slow logon | `playbooks/slow-logon.md` |
| Windows Update / patch failure | `playbooks/windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `playbooks/windows-vss.md` |
<!-- END GENERATED INDEX:playbooks -->

**Themes** (domain context):

<!-- BEGIN GENERATED INDEX:themes -->
| Topic | File |
|---|---|
| Patches / CBS / DISM / Setup | `themes/windows-updates-and-patching.md` |
| Who changed what (Security) | `themes/windows-security-and-audit.md` |
| Defender | `themes/endpoint-protection.md` |
| App / System crashes and services | `themes/windows-operational-events.md` |
| CPU, RAM, disk, installed software, monitors | `themes/device-health-and-state.md` |
| Named backup product (Veeam etc.): installed products. Not operational events. | `themes/device-health-and-state.md` |
<!-- END GENERATED INDEX:themes -->

**Data feeds** (`subsource` (LQL) = directory name). Kind: `guides/stream-kinds.md`. Then `feeds/<id>/README.md` and one artifact (`fields.md`, `enums.md`, `reasons.md`). Search `reasons.md` for the matching `##` heading.

<!-- BEGIN GENERATED INDEX:feeds -->
| Feed | What | Path |
|---|---|---|
| `win.eventlog.security` | Security auditing: logons, account and policy changes, actors | `feeds/win.eventlog.security/` |
| `win.eventlog.system` | System channel: services, drivers, kernel, VSS, storage | `feeds/win.eventlog.system/` |
| `win.eventlog.application` | Application channel: app crashes, hangs, vendor app events | `feeds/win.eventlog.application/` |
| `win.eventlog.setup` | Windows Update results per update | `feeds/win.eventlog.setup/` |
| `win.servicing.cbs` | CBS servicing internals: component store, packages | `feeds/win.servicing.cbs/` |
| `win.servicing.dism` | DISM operations and image health | `feeds/win.servicing.dism/` |
| `win.defender.eventlog` | Defender: threats, protection state | `feeds/win.defender.eventlog/` |
| `sparklogs.agent.state` | Device health and state snapshots: CPU, RAM, disk, installed software, monitors | `feeds/sparklogs.agent.state/` |
| `sparklogs.agent.vector` | Collector debug only: data collector internals | `feeds/sparklogs.agent.vector/` |
| `sparklogs.agent.log` | Collector debug only: agent supervisor log | `feeds/sparklogs.agent.log/` |
<!-- END GENERATED INDEX:feeds -->

## Escalation

Offer `sparklogs-investigate` for an in-depth written report (name the matching playbook from the table when it fits). `sparklogs-analyze-cause` only after that report exists.
