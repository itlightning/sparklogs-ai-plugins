<!-- GENERATED reference. Do not hand-edit. -->
# Processes fields

Full inventory every hour; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.processes.pid` | integer |  | The process id. Not itself a stable identity: Windows reuses pids, so `create_time_ts` beside it pins which incarnation this row is about. |
| `sparklogs.data.processes.create_time_ts` | string | timestamp | When the process started, as RFC3339 UTC with a `Z` suffix, converted from the Windows `FILETIME`. Together with `pid` it is this row's real identity. |
| `sparklogs.data.processes.image_name` | string |  | The process's executable file name. |
| `sparklogs.data.processes.image_path` | string |  | The process's normalized executable path. The command line is deliberately never read: it can carry secrets passed as arguments. |
| `sparklogs.data.processes.working_set_bytes` | integer | bytes | The process's current working set. |
| `sparklogs.data.processes.working_set_pct_ram` | float | percent | The process's working set as a percentage of installed RAM. |
| `sparklogs.data.processes.handle_count` | integer | count | How many handles the process holds. |
| `sparklogs.data.processes.age_s` | integer | seconds | How long the process has been running. |
| `sparklogs.data.processes.services` | string_array |  | The services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.processes.cpu_busy_pct_avg` | float | percent | CPU this process used since the oldest retained baseline (an enumeration kept every 5 minutes, at most an hour old), as a percent of the whole machine: every logical core, so a process saturating one core of eight reads 12.5. The denominator is monotonic elapsed time back to that baseline, and that clock includes time the machine spent asleep. Present only on a process that was already running at that baseline, same pid and creation time; a process younger than the baseline (started within the last hour, or since the agent started watching) has no interval to measure and carries none of the three averages. Absent on the System Idle Process (pid 0), whose CPU time is the machine's idle time. |
| `sparklogs.data.processes.read_mb_per_s_avg` | float | megabytes_per_second | Average read rate over the same span and on the same rule (only a process running at the baseline), in 1024-based MB per second (1 MB = 1,048,576 bytes). Every read IO the process issued (files, pipes, devices, network), not disk alone. |
| `sparklogs.data.processes.write_mb_per_s_avg` | float | megabytes_per_second | Average write rate over the same span and on the same rule (only a process running at the baseline), in 1024-based MB per second (1 MB = 1,048,576 bytes). Every write IO the process issued (files, pipes, devices, network), not disk alone. |
| `sparklogs.data.processes.process_handle_count_high_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.processes.process_handle_count_high_age_h` | float | hours | How long this condition has been open, in hours. |
