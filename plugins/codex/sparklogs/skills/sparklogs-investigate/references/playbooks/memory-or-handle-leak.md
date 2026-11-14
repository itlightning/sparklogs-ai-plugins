# Memory or handle leak

**Trigger.** "Machine slows over days, recovers on reboot", or an app repeatedly exhausts memory.

**Accuracy.** The agent reports memory for the processes it lists in each window. For a process listed in every window, its growth curve is a measurement.
An executable row combines every instance with that name: growth on the row does not prove that one instance leaks.
Instance identity is PID plus creation time. Read it from the process trend with instance grouping.
Paging heat and a leak are separate facts: a process can grow for days with no paging heat on a host with spare memory.
Kernel memory a driver leaks (paged or nonpaged pool) belongs to no process: machine-wide commit or RAM in use climbs while no process row grows. Pool tags are read on the device (Poolmon) or by the driver vendor.
Shut down with Fast Startup on keeps the kernel session, so a driver leak survives it. Restart clears it.
Crashes and hangs are the consequence trail. A rising crash count for one program is a rising crash rate, not a leak.
Read open conditions with `sparklogs.episode.age_basis` (col): `observed` supports "for at least N days"; `unknown_ongoing` supports no duration.

**Device health first.** `device_overview` over days, covering the slowdown and the last reboot if you can.

- `top_processes` (col): `private_commit_bytes_first` (col), `private_commit_bytes_last` (col) and `private_commit_bytes_peak` (col) give each executable's private commit across the window.
  `resident_bytes_peak` (col) is resident memory, which shared pages inflate.
  The reading keeps memory rows by resident peak, so a process that commits much and stays mostly paged out can be missing from it: read the `processes` result set.
- `processes`: filter on `image_name` (col) and read `private_commit_bytes_avg` (col) by `bucket_start` (col) for the curve.
- `heat_spans` (col) with `domain` (col) `ram`: when memory pressure reached the machine as a whole.
- `events` (col): `ram_commit_near_limit`, `ram_pressure` and `process_handle_count_high` episodes. The handle condition opens only at a very high count, so its absence does not clear a slower handle leak: read the handle counts below.
- The reboot that ended a slowdown: `powered_off` evidence, and its shutdown and boot marks in the `events` result set.
- One instance or a restart cycle: `top_processes_over_time`, ranked by memory with one row per process instance (`../guides/device-state-fields.md`).
  A curve that starts over with each new instance is a restart cycle. One instance climbing until it exits is the leak shape.
- Handles: `sparklogs.data.processes[].handle_count` (LQL) on `latest_state` rows for the `processes` topic.

**Events, for what health named.** Crashes and hangs in that interval (the pack grades most of them Minor, below Error):

```lql
source = "<host>" AND sparklogs.reason in (app_crash, app_hang, process_crash)
```

Group by `sparklogs.reason` (LQL), then read the rows for the executable.
`app_crash` and `app_hang` are the Application-channel records; `process_crash` is the device-state occurrence for the same crash. A crash out of memory shows as `ram_commit_near_limit` at Serious or above beside it. Reading the crashes themselves (faulting module, exception, one device or many): `crashes-and-restarts.md`.
When committed memory reached its limit, Windows' own diagnosis (`ram_commit_exhausted`, event 2004) names the program holding the most in `win.eventlog.system.mem_top_consumer_image` (LQL). The same program across several diagnoses is the leak candidate. Whether a small or missing page file set the limit instead: `slow-device.md` (**Committed memory at its limit**).

**Well-known causes.** A vendor service hosted in svchost.exe (the process row lists its services), security agents and their scan engines, printer drivers loaded into the Print Spooler, WMI provider hosts serving a monitoring tool, browser extensions and Office add-ins, and kernel drivers (network, storage filter, antivirus) leaking pool. A leak that starts with an update or a new driver: `what-changed.md`. A leaking service that crashes or is restarted by its recovery settings: `service-failures.md`.

**Findings.** Lead with the measured curve and its interval, then the consequence.
Name the executable; say one instance leaks only when instance grouping showed it.
Processes the agent did not retain, and GPU or VM guest memory, go in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM3): application vendor telemetry, anything off-endpoint the process talks to.
