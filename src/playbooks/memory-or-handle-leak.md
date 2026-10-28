---
index: Memory or handle leak
---

# Memory or handle leak

**Trigger.** "Machine slows over days, recovers on reboot", or an app repeatedly exhausts memory.

**Accuracy.** The agent reports memory per process in every window, so a growth curve over the retained observations is a measurement.
An executable row combines every instance with that name: growth on the row does not prove that one instance leaks.
Instance identity is PID plus creation time; read it from the process trend with instance grouping.
Paging heat and a leak are separate facts: a process can grow for days with no paging heat on a host with spare memory.
Crashes and hangs are the consequence trail; a rising count of one `pattern_hash` (LQL) is a rising crash rate, not a leak.
Read open conditions with `sparklogs.episode.age_basis` (col): `observed` (value) supports "for at least N days"; `unknown_ongoing` (value) supports no duration.
Do not straddle a source-pack release when comparing pattern hashes; identity is recomputed at that boundary.

**Device health first.** `device_overview` (value) over days, covering the slowdown and the last reboot if you can.

- `top_processes` (col): `private_commit_bytes_first` (col), `private_commit_bytes_last` (col) and `private_commit_bytes_peak` (col) give each executable's private commit across the window.
  `resident_bytes_peak` (col) is resident memory, which shared pages inflate.
  The reading keeps memory rows by resident peak, so a process that commits much and stays mostly paged out can be missing from it: read the `processes` (value) result set.
- `processes` (value): filter on `image_name` (col) and read `private_commit_bytes_avg` (col) by `bucket_start` (col) for the curve.
- `heat_spans` (col) with `domain` (col) `ram` (value): when memory pressure reached the machine as a whole.
- `events` (col): `ram_commit_near_limit` (value), `ram_pressure` (value) and `process_handle_count_high` (value) episodes, and the reboot that ended a slowdown.
- One instance or a restart cycle: `top_processes_over_time` (value) with `rank_by` (arg) `ram` (value) and `grouping` (arg) `process_instance` (value).
  A curve that starts over with each new instance is a restart cycle; one instance climbing until it exits is the leak shape.
- Handles: `sparklogs.data.processes[].handle_count` (LQL) on `latest_state` (value) rows for the `processes` (value) topic.

**Events, for what health named.** Crashes and hangs of that executable in that interval:

```
source = "<host>" AND subsource = "win.eventlog.application" AND severity >= 17
```

Group by `pattern` (LQL).

**Findings.** Lead with the measured curve and its interval, then the consequence.
Name the executable; say one instance leaks only when instance grouping showed it.
Processes the agent did not retain, and GPU or VM guest memory, go in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM3): application vendor telemetry, anything off-endpoint the process talks to.
