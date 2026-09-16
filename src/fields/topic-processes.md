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
| `sparklogs.data.processes.ws_growth_monotonic_snapshots` | integer | count | How many consecutive snapshots this process's working set has risen without a drop. |
| `sparklogs.data.processes.commit_pct` | float | percent | The host's current commit charge as a percentage of the commit limit, carried on every process row because the growth rungs that read it are per-row predicates and cannot reach a host-level field. |
| `sparklogs.data.processes.commit_pct_of_ram` | float | percent | The host's current commit charge as a percentage of installed RAM, carried on every process row for the same reason as `commit_pct`. |
| `sparklogs.data.processes.hard_fault_churn_sustained` | bool |  | Whether the host has sustained hard-page-fault churn across the window, carried on every process row: the half of the RAM-share growth route that keeps committed-but-untouched memory from reading as distress. |
| `sparklogs.data.processes.ram_growth_peak_mb` | float | megabytes | The highest working set this process has reached, the high-water mark a growth episode's exit is measured against. |
| `sparklogs.data.processes.ram_growth_release_target_mb` | float | megabytes | The working set this process must fall back under, a fifth below its peak, before a growth episode is considered closed. |
| `sparklogs.data.processes.age_s` | integer | seconds | How long the process has been running. |
| `sparklogs.data.processes.services` | string_array |  | The services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.processes.proc_handle_count_high_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.processes.proc_handle_count_high_age_h` | float | hours | How long this condition has been open, in hours. |
