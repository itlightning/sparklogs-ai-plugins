---
index: VSS / shadow copies / backup plumbing
---

# Windows VSS

**Trigger.** Writers failing, snapshots not created, shadow copies piling up, `vssadmin` (other) looking wrong.
Job failed: `playbooks/backup-failure.md` first; this file is the plumbing under the product.

**Accuracy.** VSS errors often coexist with a completed backup job.
Never report a backup failure from VSS evidence alone.
Take job outcome from the backup product; cite VSS as a possible contributor.
Do not recommend deleting shadow copies; restore-chain integrity belongs to the backup vendor.

## Feeds

`win.eventlog.application` (value) (provider VSS) and `win.eventlog.system` (value) (Volsnap).
Query both.
`feeds/win.eventlog.application/{fields,reasons,enums}.md` and the System siblings.
Group by `sparklogs.reason` (LQL) first.
`service = backup` is the family; `app` (LQL) is left blank on OS VSS so the backup vendor can occupy it.

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

8231 requester command line is message-tail `process_command_line` (other), not an LQL field.
Inventory of who asked, not a job verdict.

`VSS_CTX_CLIENT_ACCESSIBLE` is Previous Versions / Shadow Copies for Shared Folders, not backup copies.
Absent writer is a real answer: many failures are coordinator-side.

Writer-state enum (`VSS_WS_WAITING_FOR_FREEZE`, `VSS_WS_FAILED_AT_THAW`, …) is what a requester reads via `GetWriterStatus`.
Do not map `vss_state` (other) onto that enum.

## Shadow-copy lifecycle

Microsoft documents creation as: enumerate writers and metadata, prepare, freeze writes, provider commit, thaw, return the location (autorecovery may briefly make the copy writable, then seal).

Documented abort budgets: writers may not stay frozen longer than **60 seconds**; providers may not take longer than **10 seconds** to commit.
`VSS_E_WRITERERROR_TIMEOUT` is the freeze/thaw budget, not "the backup failed".
`VSS_E_FLUSH_WRITES_TIMEOUT` / `VSS_E_HOLD_WRITES_TIMEOUT` are I/O hold at a named volume.

## Queries

Unregistered provider (`0x80040154`) on a handful of hosts can dominate `service = backup` counts.
Pin those hosts before reading an estate histogram as one story.

```
source = "<host>" AND service = backup AND subsource in (win.eventlog.application, win.eventlog.system)
```

Group by `sparklogs.reason` (LQL).

Who is snapshotting (stays Info so default sweeps see it):

```
source = "<host>" AND subsource = win.eventlog.application AND winlog.event_id = 8231
```

Read requesters from the 8231 message tail; there is no command-line LQL field to group by.
Group attempts by `win.eventlog.application.vss_snapshot_set` (LQL).

Writer × code:

```
source = "<host>" AND subsource = win.eventlog.application AND sparklogs.result.code!
```

Group by `win.eventlog.application.vss_writer` (LQL), `sparklogs.result.code_name` (LQL).

Intent:

```
source = "<host>" AND subsource = win.eventlog.application AND win.eventlog.application.vss_operation_intent!
```

Group by `win.eventlog.application.vss_operation_intent` (LQL).

Volsnap reclamation (space 33, count 58, delete-pending 95):

```
source = "<host>" AND subsource = win.eventlog.system AND winlog.event_id in (33, 58, 95)
```

Group by `winlog.event_id` (LQL).
Creation continuing with no 58 is accumulation in the *log stream*, not distance to the 512-copy cap.
Used-% of shadow storage does not speak to that cap.
The log stream does not carry the standing copy count.

Fleet Error+ (two nouns: which reason, which host):

```
service = backup AND subsource in (win.eventlog.application, win.eventlog.system) AND severity >= 17
```

Group by `sparklogs.reason` (LQL), `source` (LQL).

Installed backup products: device-health inventory (`fieldset=rca`).
Two products competing for snapshots shows there, not in VSS prose.

## Off-endpoint

Backup retention and whether the product reclaims its own snapshots; backup target; EDR blocking VSS; guest writers; server-side job state.
