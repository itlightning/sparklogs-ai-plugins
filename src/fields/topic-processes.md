<!-- GENERATED reference. Do not hand-edit. -->
# Processes fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.processes.pid` | integer |  | The process id. Not itself a stable identity: Windows reuses pids, so `create_time_raw` beside it pins which incarnation this row is about. |
| `sparklogs.data.processes.create_time_raw` | integer |  | The process's creation time as the raw Windows `FILETIME` value, which together with `pid` is this row's real identity. |
| `sparklogs.data.processes.image_name` | string |  | The process's executable file name. |
| `sparklogs.data.processes.image_path` | string |  | The process's normalized executable path. The command line is deliberately never read: it can carry secrets passed as arguments. |
| `sparklogs.data.processes.working_set_bytes` | integer | bytes | The process's current working set. |
| `sparklogs.data.processes.working_set_pct_ram` | float | percent | The process's working set as a percentage of installed RAM. |
| `sparklogs.data.processes.handle_count` | integer | count | How many handles the process holds. |
| `sparklogs.data.processes.age_s` | integer | seconds | How long the process has been running. |
| `sparklogs.data.processes.services` | string_array |  | The services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.processes.cpu_busy_pct_avg` | float | percent | CPU this process used over the hour before this reading (or since the agent started watching, when shorter), as a percent of the whole machine (every logical core). |
| `sparklogs.data.processes.read_mb_per_s_avg` | float | megabytes_per_second | Average read rate over the same span, in 1024-based MB per second. Every read IO the process issued (files, pipes, devices, network), not disk alone. |
| `sparklogs.data.processes.write_mb_per_s_avg` | float | megabytes_per_second | Average write rate over the same span, in 1024-based MB per second. Every write IO the process issued (files, pipes, devices, network), not disk alone. |
| `sparklogs.data.processes.process_handle_count_high_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.processes.process_handle_count_high_age_h` | float | hours | How long this condition has been open, in hours. |
