---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
indexes: [playbooks, themes, feeds]
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. This is a conversation with the data, not an investigation report.

No output template. No WHAT WAS NOT CHECKED catalog. You may go as deep as the question needs. Follow-up queries are expected.

`/sparklogs-investigate` is the written pass: a cited system-condition summary they can put on a ticket. Offer it when they want that artifact. Do not switch to it just because the chat went deep.

## How to answer

- Answer first. Then stop talking, not mid-query.
- Precise hedges: "not in this window", "not checked", "insufficient evidence".
- Active voice. No em dash.
- Empty is not healthy. A field this feed does not write is not "no problem".
- Do not treat VSS writer-failed as proof the backup product failed.
- Completeness claims need `agent_complete_through` / feed reports, never first/last event bounds.
- Cite a `query_url` on factual claims.
- Suggest likely causes and practical next steps when the evidence supports them.
- If org/host/window is not obvious, `resolve_scope`. If several matches, ask. Do not guess.
- Prefer `query_device_health` or counts over `query_logs`. Prefer `refine_query_result` on a cached slice over a new scan.
- Every data-access call needs `external_investigation_id`. Reuse one id for this question.

## Which tool

- "What is on the box / CPU / RAM / disk / installed / open condition" → `query_device_health` (`fieldset=rca` for one host).
- Named backup product (Veeam, Datto, Axcient, Acronis, MSP360, Cove, Slide) → `query_device_health` first (what is installed). Do not search Application `reasons.md` for the vendor. Then counts if you still need a timeline.
- "What happened / how many / when" → `query_event_counts_by_severity` or `query_scope_activity` first; `query_logs` only for a narrow slice.
- Collector debug only → `sparklogs.agent.vector` / `sparklogs.agent.log`. Not the headline for device health.

Load a guide when you are stuck on that topic (`guides/scope-resolution.md`, `guides/mcp-tool-decision-tree.md`, LQL, honesty). Do not dump the folder.

## Where to look

You may open the matching playbook as a query recipe. Do not emit the investigation report from it.

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

**Data feeds** (`subsource` = directory name). Open `feeds/<id>/README.md`, then the artifact you need (`fields.md`, `enums.md`, `reasons.md`). Search `reasons.md` for the `##` heading that matches the reason slug. Do not read the whole file.

<!-- BEGIN GENERATED INDEX:feeds -->
| Feed | Path |
|---|---|
| `sparklogs.agent.log` | `feeds/sparklogs.agent.log/` |
| `sparklogs.agent.state` | `feeds/sparklogs.agent.state/` |
| `sparklogs.agent.vector` | `feeds/sparklogs.agent.vector/` |
| `win.defender.eventlog` | `feeds/win.defender.eventlog/` |
| `win.eventlog.application` | `feeds/win.eventlog.application/` |
| `win.eventlog.security` | `feeds/win.eventlog.security/` |
| `win.eventlog.setup` | `feeds/win.eventlog.setup/` |
| `win.eventlog.system` | `feeds/win.eventlog.system/` |
| `win.servicing.cbs` | `feeds/win.servicing.cbs/` |
| `win.servicing.dism` | `feeds/win.servicing.dism/` |
<!-- END GENERATED INDEX:feeds -->

## Written investigation

Offer `/sparklogs-investigate` when they want a cited ticket write-up or a full investigation report. Name the matching playbook in that offer when the table fits.

Cause hypotheses: `/sparklogs-analyze-cause` only after an investigation summary exists.
