---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
indexes: [corpus-navigation, playbooks, themes, feeds]
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

<!-- BEGIN GENERATED INDEX:corpus-navigation -->
## Curated data (read this before opening reference files)

- **`subsource` (LQL) = feed id.** Scope ladder before `query_logs` (tool): `service` (LQL) → `app` (LQL) → `subsource` (LQL) → `category` (LQL) → `pattern_hash` (LQL).
- **Curated events** carry `sparklogs.reason` (LQL), `sparklogs.class` (LQL), and module fields. Empty `sparklogs.*` on an event means **uncurated** (not a collection-health finding).
- **Reason slug** = our vocabulary (`sparklogs.reason` (LQL)). **Vendor code** = NTSTATUS, HRESULT, MSI exit, Kerberos result, etc. **pattern_hash** (LQL) = stable shape id on every event.
- **Device row** (`query_device_health` (tool), feed health, `agent_complete_through` (col)) is authoritative for collection and completeness. Event volume is not coverage.
- **Playbooks** = symptom recipes. **Themes** = investigation topic bundles (not customer marketing themes).

## What is in the pack

`playbooks/`, `themes/`, `feeds/<id>/` (`README.md`, `reasons.md`, `enums.md`, `fields.md`, `recipes.md`, `patterns.md` where present), `guides/`. Artifact choice detail: `guides/generated-reference-router.md`.

## After you pick a `subsource` (LQL)

1. Open `feeds/<id>/README.md` (short index).
2. **Stream kind** and explore ladder: `guides/stream-kinds.md`. Classic WEL: `provider_name` (LQL) before `pattern` (LQL); device state: `query_device_health` (tool) with `sparklogs.kind` (LQL) / `sparklogs.topic` (LQL) / `sparklogs.reason` (LQL).
3. Open **one** artifact (read-mode table below). Rich feeds (especially `win.eventlog.security` (value)) often need `recipes.md` or `reasons.md` first, not only `fields.md` or `enums.md`. Security also carries `patterns.md` and `mapping-ecs.md` / `mapping-ocsf.md` when shape or external taxonomy is the question.

**Reason slug meaning:** the slug and the event `message` (col) together; grep `reasons.md` for the matching `##` heading (summary table first, one section only).

## Decode tables (`enums.md`)

Per-feed closed vocabularies. **Grep** the code, constant, or `##` heading; never load a whole file.

| Kind | Typical feed | Use when |
|---|---|---|
| NTSTATUS / security status | `win.eventlog.security` (value) | Logon/auth failure codes |
| Win32 / HRESULT | `win.eventlog.application` (value), `win.eventlog.system` (value), `win.eventlog.setup` (value) | Servicing, app, VSS errors |
| MSI exit codes | `win.eventlog.application` (value) | Installer failures |
| Logon types, WU result codes | `win.eventlog.security` (value), `win.eventlog.application` (value) | Discriminate 4625/4624, update errors |

## How much to read

| Material | When | How |
|---|---|---|
| Playbook | Symptom matches index below | One file, whole |
| Theme | Investigation topic matches index | One file, whole |
| Feed `README.md` | You picked a `subsource` (LQL) | Whole (short index) |
| `reasons.md` | Need reason slug meaning | Skim summary table (~first 100 lines), then **one** `##` section |
| `enums.md` | Vendor/status code | **Search only** |
| `fields.md` | Filter/group on a field | Search for field name |
| `recipes.md` | Worked pivot for this feed | One section |
| `patterns.md` | Is this pattern string expected? | Search one surface heading (grammar/drift, not meaning) |
| Guides | Cross-cutting stuck point | One file from skill when→file table |

## Unfamiliar `pattern_hash` (LQL)

1. `describe_pattern` (tool) for text, examples, fleet spread.
2. Grep `feeds/<id>/reasons.md` or `recipes.md` if a slug or pivot is the question.
3. `patterns.md` only when the question is whether the pack meant to produce that string shape.
<!-- END GENERATED INDEX:corpus-navigation -->

Routing indexes below. Open one file when the step needs it.

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

**Data feeds** (`subsource` (LQL) = directory name). Follow **After you pick a `subsource` (LQL)** in the corpus block above.

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
