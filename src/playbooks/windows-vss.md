---
index: VSS / shadow copies / backup plumbing
---

# Windows VSS

## Trigger

Writers failing, snapshots not created, shadow copies piling up, `vssadmin` looking wrong.
From `backup-failure.md` when the backup product looks fine and the plumbing under it is the question.

## Accuracy

VSS errors often coexist with a completed job.
Never report a backup failure from VSS evidence alone.
Take job outcome from the backup product; cite VSS as a possible contributor.

Do not recommend deleting shadow copies.
Restore-chain integrity belongs to the backup vendor.

## Feeds

`win.eventlog.application` (VSS) and `win.eventlog.system` (Volsnap).
Query both.
`reasons.md`, `fields.md`, `enums.md` under each.
Group by `reason` first.

## Query recipes

Pick the calls the ticket needs.

### Installed products

Two backup products competing for snapshots shows here.

```
query_device_health(org_ids=[...], start=..., end=..., fieldset="rca",
                   external_investigation_id="<id>")
```

### Family mix

```
query_event_counts_by_severity(org_ids=[...], start=..., end=...,
  lql='source = "<host>" AND service = backup AND subsource in (win.eventlog.application, win.eventlog.system)',
  group_by=["reason"], external_investigation_id="<id>")
```

A handful of hosts with an unregistered VSS provider (`0x80040154`) can dominate `service = backup` counts.
Pin those hosts before reading an estate histogram as one story.

### Snapshot creators

Application event 8231 names who is snapshotting and at what cadence.
Stays at Info so default sweeps see it.
Process path in `fields.md`.

```
query_logs(org_ids=[...], start=..., end=...,
  lql='source = "<host>" AND subsource = win.eventlog.application AND winlog.event_id = 8231',
  external_investigation_id="<id>")
```

### Writer and call

`vss_operation_intent`: business call (last line of the Operation stack).
`vss_operation_call`: immediate failing API.
`vss_snapshot_context`: VSS context enum (including ClientAccessible).

```
query_event_counts_by_severity(org_ids=[...], start=..., end=...,
  lql='source = "<host>" AND subsource = win.eventlog.application AND sparklogs.result.code!',
  group_by=["win.eventlog.application.vss_writer", "sparklogs.result.code_name"],
  external_investigation_id="<id>")
query_event_counts_by_severity(org_ids=[...], start=..., end=...,
  lql='source = "<host>" AND subsource = win.eventlog.application AND win.eventlog.application.vss_operation_intent!',
  group_by=["win.eventlog.application.vss_operation_intent"],
  external_investigation_id="<id>")
```

### Reclamation

One fact, three axes: space (33), count (58), delete-pending (95).
Axis token in `feeds/win.eventlog.system/fields.md`.
Creation continuing with no 58 is the accumulation signature in the log stream, not a measured distance to the count cap.
Windows also has a shadow-storage **size** max; used-% does not speak to the count cap.
The log stream does not carry the standing copy count.

```
query_event_counts_by_severity(org_ids=[...], start=..., end=...,
  lql='source = "<host>" AND subsource = win.eventlog.system AND winlog.event_id in (33, 58, 95)',
  group_by=["winlog.event_id"], external_investigation_id="<id>")
```

### Fleet

Cross-tab.
A pair of single-field runs cannot tell "one box" from "one reason everywhere."

```
query_event_counts_by_severity(org_ids=[...], start=..., end=...,
  lql='service = backup AND subsource in (win.eventlog.application, win.eventlog.system) AND severity >= 17',
  group_by=["reason", "source"], external_investigation_id="<id>")
```

## Off-endpoint

Backup retention and whether the product reclaims its own snapshots; backup target; EDR blocking VSS; guest writers; server-side job state.
