---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. This is a conversation with the data, not an investigation report.

No output template. No WHAT WAS NOT CHECKED catalog. You may go as deep as the question needs. Follow-up queries are expected.

`sparklogs-investigate` is the written pass: a cited system-condition summary they can put on a ticket. Offer it when they want that artifact. Do not switch to it just because the chat went deep.

## How to answer

Answer first, then stop talking, never mid-query. Hedge precisely: "not in this window", "not checked", "insufficient evidence". Suggest likely causes and practical next steps when the evidence supports them.

- Empty is not healthy. A field this feed does not write is not "no problem".
- Completeness claims need `agent_complete_through` / feed reports, never first/last event bounds.
- Cite a `query_url` on factual claims.
- If org/host/window is not obvious, `resolve_scope`. On several matches, ask. Do not guess.
- Prefer `query_device_health` or counts over `query_logs`. Prefer `refine_query_result` on a cached slice over a new scan.
- Every data-access call needs `external_investigation_id`. Pick a short id that names the topic and reuse it across follow-ups until the topic clearly changes.

## Which tool

- "What is on the box / CPU / RAM / disk / installed / open condition" → `query_device_health` (`fieldset=rca` for one host).
- Named backup product (Veeam, Datto, Axcient, Acronis, MSP360, Cove, Slide) → `query_device_health` first for what is installed, then counts for a timeline. Vendor channels are collected, queryable; events carry the job verdict, not VSS. Application `reasons.md` skips vendor products; query events directly.
- "What happened / how many / when" → `query_event_counts_by_severity` or `query_scope_activity` first; `query_logs` only for a narrow slice.
- Collector debug only → `sparklogs.agent.vector` / `sparklogs.agent.log`. Not the headline for device health.

Load a guide when you are stuck on that topic (`references/guides/scope-resolution.md`, `references/guides/mcp-tool-decision-tree.md`, `references/guides/lql-reference.md`, `references/guides/common-mistakes.md`). Open the one you need, never the whole set.

## Where to look

You may open the matching playbook as a query recipe. Do not emit the investigation report from it.

**Playbooks** (symptom recipes):

| Symptom | File |
|---|---|
| Backup job failed | `references/playbooks/backup-failure.md` |
| BitLocker recovery | `references/playbooks/bitlocker-recovery.md` |
| Certificate expiry | `references/playbooks/certificate-expiry.md` |
| Directory replication | `references/playbooks/directory-replication-failure.md` |
| Disk full or filling | `references/playbooks/disk-full-or-filling.md` |
| Memory or handle leak | `references/playbooks/memory-or-handle-leak.md` |
| RAID / array degraded | `references/playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `references/playbooks/rmm-connectivity.md` |
| Slow logon | `references/playbooks/slow-logon.md` |
| Windows Update / patch failure | `references/playbooks/windows-update-failure.md` |

**Themes** (domain, feeds that join):

| Topic | File |
|---|---|
| Patches / CBS / DISM / Setup | `references/themes/windows-updates-and-patching.md` |
| Who changed what (Security) | `references/themes/windows-security-and-audit.md` |
| Defender | `references/themes/endpoint-protection.md` |
| App / System crashes and services | `references/themes/windows-operational-events.md` |
| CPU, RAM, disk, installed software, monitors | `references/themes/device-health-and-state.md` |
| Named backup product (Veeam etc.): installed products. Not operational events. | `references/themes/device-health-and-state.md` |

**Data feeds** (`subsource` = directory name). Open `references/feeds/<id>/README.md`, then the artifact you need (`fields.md`, `enums.md`, `reasons.md`). Search `reasons.md` for the `##` heading that matches the reason slug. Do not read the whole file.

| Feed | What | Path |
|---|---|---|
| `win.eventlog.security` | Security auditing: logons, account and policy changes, actors | `references/feeds/win.eventlog.security/` |
| `win.eventlog.system` | System channel: services, drivers, kernel, VSS, storage | `references/feeds/win.eventlog.system/` |
| `win.eventlog.application` | Application channel: app crashes, hangs, vendor app events | `references/feeds/win.eventlog.application/` |
| `win.eventlog.setup` | Windows Update results per update | `references/feeds/win.eventlog.setup/` |
| `win.servicing.cbs` | CBS servicing internals: component store, packages | `references/feeds/win.servicing.cbs/` |
| `win.servicing.dism` | DISM operations and image health | `references/feeds/win.servicing.dism/` |
| `win.defender.eventlog` | Defender: threats, protection state | `references/feeds/win.defender.eventlog/` |
| `sparklogs.agent.state` | Device health and state snapshots: CPU, RAM, disk, installed software, monitors | `references/feeds/sparklogs.agent.state/` |
| `sparklogs.agent.vector` | Collector debug only: data collector internals | `references/feeds/sparklogs.agent.vector/` |
| `sparklogs.agent.log` | Collector debug only: agent supervisor log | `references/feeds/sparklogs.agent.log/` |

## Written investigation

Name the matching playbook when you offer `sparklogs-investigate` and the table fits.

Cause hypotheses: `sparklogs-analyze-cause` only after an investigation summary exists.
