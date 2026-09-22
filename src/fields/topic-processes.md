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
| `sparklogs.data.processes.proc_handle_count_high_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.processes.proc_handle_count_high_age_h` | float | hours | How long this condition has been open, in hours. |
