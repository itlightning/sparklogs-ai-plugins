---
index: VSS / shadow copies / backup plumbing
aliases:
  - label: Backup fails with a VSS error
---

# Windows VSS

**Trigger.** Writers failing, snapshots not created, shadow copies piling up, `vssadmin` (other) looking wrong.
This file is the Windows plumbing under a backup product; the job result itself lives in the backup console.

**Accuracy.** VSS errors often coexist with a completed backup job.
Never report a backup failure from VSS evidence alone.
Take job outcome from the backup product; cite VSS as a possible contributor.
Do not recommend deleting shadow copies; restore-chain integrity belongs to the backup vendor.
Shadow copies deleted by a script (`vssadmin` (other), `Remove-CimInstance`): who ran it is in `playbooks/powershell-script-blocks.md`.

## Feeds

`win.eventlog.application` (value) (provider VSS) and `win.eventlog.system` (value) (Volsnap).
Query both.
`feeds/win.eventlog.application/{fields,reasons,enums}.md` and the System siblings.
Group by `sparklogs.reason` (LQL) first.
Find the rows by reason (Queries, below), and the uncurated VSS and Volsnap rows by `provider_name` (LQL). `app` (LQL) is left blank on OS VSS so the backup vendor can occupy it.

## Field schema

| Field | What it is |
|---|---|
| `sparklogs.result.code` (LQL) / `code_name` (other) | Result as logged; names are Microsoft constants (`VSS_E_*`, `ERROR_*`) when the pack knows the space |
| `win.eventlog.application.vss_operation_call` (LQL) | First Operation-stack line: the immediate API that failed |
| `win.eventlog.application.vss_operation_intent` (LQL) | Last Operation-stack line: what the call was for |
| `win.eventlog.application.vss_writer` (LQL) | Writer Name from Context, vendor casing |
| `win.eventlog.application.vss_state` (LQL) | Current State from Context: coordinator/requester *phase names* (`DoSnapshotSet`, `PrepareForBackup`, …). Not the `VSS_WS_*` writer-state enum |
| `win.eventlog.application.vss_execution_context` (LQL) | Role: Coordinator, Requestor, Writer, System Provider |
| `win.eventlog.application.vss_snapshot_context` (LQL) | Kind of copy (`VSS_CTX_BACKUP`, `VSS_CTX_CLIENT_ACCESSIBLE`, `VSS_CTX_APP_ROLLBACK`, …) |
| `win.eventlog.application.vss_snapshot_attrs` (LQL) | Modifier flags on that context (`VSS_VOLSNAP_ATTR_*`) |
| `win.eventlog.application.vss_snapshot_set` (LQL) | Snapshot Set GUID from Application 8231 |
| `win.eventlog.application.vss_routine` (LQL) | API symbol on call-failure ids (8193, 12289, 12293) |

8231 carries the requester's command line in `command_line` (LQL).
Inventory of who asked, not a job verdict.

`VSS_CTX_CLIENT_ACCESSIBLE` is Previous Versions / Shadow Copies for Shared Folders, not backup copies.
Absent writer is a real answer: many failures are coordinator-side.

Writer-state enum (`VSS_WS_WAITING_FOR_FREEZE`, `VSS_WS_FAILED_AT_THAW`, …) is what a requester reads via `GetWriterStatus`.
Do not map `vss_state` (other) onto that enum.

## Device health first

Open conditions `vss_writer_failed` (value) and `vss_snapshots_failing_for_space` (value) name the writer or volume and how long it has been open.
`latest_state` (value) on topic `vss_writers` (value) gives each writer's state and last error (`sparklogs.data.vss_writers[].writer_state_failed` (LQL), `sparklogs.data.vss_writers[].writer_last_error` (LQL)), and `sparklogs.data.vss_writers[].writer_expected` (LQL) says whether an installed backup product relies on it.
`latest_state` (value) on topic `vss_shadowstorage` (value) gives per-volume shadow storage use against its limit (`sparklogs.data.vss_shadowstorage[].shadowstorage_used_pct` (LQL), `sparklogs.data.vss_shadowstorage[].shadowstorage_at_cap` (LQL)) and the volsnap failure counts (`sparklogs.data.vss_shadowstorage[].snap_fail_count_24h` (LQL), `sparklogs.data.vss_shadowstorage[].snap_fail_count_7d` (LQL)).
Filter a failed writer with `sparklogs.data.vss_writers[](writer_state_failed=true)` (LQL) and a capped volume with `sparklogs.data.vss_shadowstorage[](shadowstorage_at_cap=true)` (LQL).
A writer listed as failed between backups is a standing state; whether the last job failed is still the backup product's answer.

## Shadow-copy lifecycle

Microsoft documents creation as: enumerate writers and metadata, prepare, freeze writes, provider commit, thaw, return the location (autorecovery may briefly make the copy writable, then seal).

Documented abort budgets: writers may not stay frozen longer than **60 seconds**; providers may not take longer than **10 seconds** to commit.
`VSS_E_WRITERERROR_TIMEOUT` is the freeze/thaw budget, not "the backup failed".
`VSS_E_FLUSH_WRITES_TIMEOUT` / `VSS_E_HOLD_WRITES_TIMEOUT` are I/O hold at a named volume.

## Queries

```lql
source = "<host>" AND sparklogs.reason in (vss_writer_failed, vss_snapshot_call_failed, vss_provider_class_not_registered, vss_snapshots_failing_for_space, vss_shadow_aborted)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL).
`vss_provider_class_not_registered` (value) (`0x80040154`) repeats on every attempt on the few hosts that have it, so it can dominate counts: pin those hosts before reading an estate histogram as one story.
VSS and Volsnap records outside the curated reasons:

```lql
source = "<host>" AND provider_name in ("VSS", "Volsnap") AND NOT sparklogs.reason!
```

Group by `provider_name` (LQL), `event_id` (LQL). The VSS service stopping after it sat idle is routine.

Who is snapshotting (stays Info so default sweeps see it):

```lql
source = "<host>" AND subsource = win.eventlog.application AND provider_name = "VSS" AND event_id = 8231
```
<!-- confirmed with data on 2026-11-12 -->

Group by `command_line` (LQL) for who asked.
Group attempts by `win.eventlog.application.vss_snapshot_set` (LQL).

Writer × code:

```lql
source = "<host>" AND subsource = win.eventlog.application AND provider_name = "VSS" AND sparklogs.result.code!
```

Group by `win.eventlog.application.vss_writer` (LQL), `sparklogs.result.code_name` (LQL).

Intent:

```lql
source = "<host>" AND subsource = win.eventlog.application AND win.eventlog.application.vss_operation_intent!
```

Group by `win.eventlog.application.vss_operation_intent` (LQL).

Volsnap reclamation (space 33, count 58, delete-pending 95):

```lql
source = "<host>" AND subsource = win.eventlog.system AND provider_name = "Volsnap" AND event_id in (33, 58, 95)
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_id` (LQL). The partition manager also writes a 58 on System, so keep the provider in the filter.
Creation continuing with no 58 is accumulation in the *log stream*, not distance to the 512-copy cap.
Used-% of shadow storage does not speak to that cap.
Neither the log stream nor the `vss_shadowstorage` (value) topic carries the standing copy count; the topic carries storage use against its limit.

Fleet, failure side (two nouns: which reason, which host):

```lql
sparklogs.reason in (vss_writer_failed, vss_snapshot_call_failed, vss_provider_class_not_registered, vss_snapshots_failing_for_space, vss_shadow_aborted) AND severity >= warning
```

Group by `sparklogs.reason` (LQL), `source` (LQL).

Installed backup products: `latest_state` (value) on topic `installed_products` (value).
Two products competing for snapshots shows there, not in VSS prose.

## Well-known causes

- Shadow storage too small, or the volume nearly full: `vss_snapshots_failing_for_space` (value), `vss_shadow_aborted` (value) with a storage arm, Volsnap 33 deleting the oldest copy. Where the space went: `playbooks/disk-full-or-filling.md`.
- Two backup products, or a backup and System Restore, snapshotting the same volumes: 8231 rows from different command lines, two products on `installed_products` (value).
- A VSS provider left behind by an uninstalled backup or storage product: `vss_provider_class_not_registered` (value).
- A writer that cannot freeze within its budget while the disk is slow: `VSS_E_WRITERERROR_TIMEOUT` (other). Disk latency at the snapshot time: `playbooks/raid-or-storage-degraded.md` (**Slow or stalled disk**).
- A writer's own service stopped or failing (SQL Server VSS Writer, the Hyper-V or Exchange writer), or the Volume Shadow Copy service disabled: `playbooks/service-failures.md`.
- A small recovery or system partition with too little free space for its snapshot during an image or system-state backup.
- A writer that began failing after an update or a new product: `playbooks/what-changed.md`.

**Off-endpoint** (HM1): backup retention and whether the product reclaims its own snapshots; backup target; EDR blocking VSS; guest writers; server-side job state.
