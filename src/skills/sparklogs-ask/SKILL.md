---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
indexes: [playbooks, themes, feeds]
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. This is a conversation with the data, not an investigation report.

**WEL** means Windows Event Log.

No output template. No WHAT WAS NOT CHECKED catalog. You may go as deep as the question needs. Follow-up queries are expected.

`/sparklogs:investigate` is the written pass: a cited system-condition summary they can put on a ticket. Offer it when they want that artifact. Do not switch to it just because the chat went deep.

## How to answer

Answer first, then stop talking, never mid-query. Hedge precisely: "not in this window", "not checked", "insufficient evidence". Suggest likely causes and practical next steps when the evidence supports them.

- Empty is not healthy. A field this feed does not write is not "no problem".
- Completeness claims need `agent_complete_through` (col) / feed reports, never first/last event bounds.
- Cite a `query_url` (col) on factual claims.
- If org/host/window is not obvious, `resolve_scope` (tool). On several matches, ask. Do not guess.
- Prefer `query_device_health` (tool) or counts over `query_logs` (tool). Prefer `refine_query_result` (tool) on a cached slice over a new scan. If refine returns `cache_invalidated` (value), issue a new tool call; do not retry that `query_id` (arg).
- Every data-access call needs `external_investigation_id` (arg). Pick a short id that names the topic and reuse it across follow-ups until the topic clearly changes.

## Which tool

- "What is on the box / CPU / RAM / disk / installed / open condition" → `query_device_health` (tool) (`fieldset=rca` for one host).
- Named backup product (Veeam, Datto, Axcient, Acronis, MSP360, Cove, Slide) → `query_device_health` (tool) first for what is installed, then counts for a timeline. Vendor channels are collected, queryable; events carry the job verdict, not VSS. Application `reasons.md` skips vendor products; query events directly.
- "What happened / how many / when" → `query_event_counts_by_severity` (tool) or `query_scope_activity` (tool) first; `query_logs` (tool) only for a narrow slice.
- Collector debug only → `sparklogs.agent.vector` (value) / `sparklogs.agent.log` (value). Not the headline for device health.

Load a guide when you are stuck on that topic (`guides/scope-resolution.md`, `guides/mcp-tool-decision-tree.md`, `guides/lql-reference.md`, `guides/common-mistakes.md`, `guides/stream-kinds.md`). Open the one you need, never the whole set.

## Where to look

You may open the matching playbook for domain facts and starter LQL. Do not emit the investigation report from it.
Playbooks are incomplete. Empty recipe LQL is not "nothing happened": widen by `subsource` (LQL), then that kind's explore ladder (`guides/stream-kinds.md`), then raw logs, before you say you cannot answer.

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

**Themes** (domain, feeds that join):

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

**Data feeds** (`subsource` (LQL) = directory name). Kind (how to explore): `guides/stream-kinds.md`. Then `feeds/<id>/README.md` and one artifact (`fields.md`, `enums.md`, `reasons.md`). Search `reasons.md` for the `##` heading that matches the reason slug. Do not read the whole file.

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

## Written investigation

Name the matching playbook when you offer `/sparklogs:investigate` and the table fits.

Cause hypotheses: `/sparklogs:analyze-cause` only after an investigation summary exists.
