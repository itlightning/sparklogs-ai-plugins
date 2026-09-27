<!-- GENERATED reference. Do not hand-edit. -->
# Processes fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.processes.pid` | integer |  | Process ID. Combine with `create_time_ts` to distinguish processes when Windows reuses a PID. |
| `sparklogs.data.processes.create_time_ts` | string | timestamp | When the process started, as RFC3339 UTC with a `Z` suffix, converted from the Windows `FILETIME`. Together with `pid` it is this row's real identity. |
| `sparklogs.data.processes.image_name` | string |  | The process's executable file name. |
| `sparklogs.data.processes.image_path` | string |  | Normalized executable path. Command-line arguments are not collected. |
| `sparklogs.data.processes.resident_bytes` | integer | bytes | Resident memory, including pages this process shares with others. Adding this field across processes counts shared pages more than once. |
| `sparklogs.data.processes.resident_pct_ram` | float | percent | resident_bytes as a percentage of installed physical RAM from the same capture. Absent when that total was not read. Shared pages can make these percentages add up to more than 100. |
| `sparklogs.data.processes.private_resident_bytes` | integer | bytes | Resident memory private to this process. Absent when the operating system did not report it. A total of these values is not the machine's used RAM. |
| `sparklogs.data.processes.private_commit_bytes` | integer | bytes | Private committed memory, including memory that is not currently resident. This is not physical RAM usage. |
| `sparklogs.data.processes.handle_count` | integer | count | How many handles the process holds. |
| `sparklogs.data.processes.age_s` | integer | seconds | How long the process has been running. |
| `sparklogs.data.processes.services` | string_array |  | The services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.processes.cpu_busy_pct_avg` | float | percent | CPU usage since the oldest retained baseline, as a percentage of all logical cores. One saturated core out of eight reads 12.5. Baselines are retained every five minutes for up to an hour. The elapsed-time denominator includes sleep. Requires the same PID and creation time at both observations. A process missing from the baseline has no CPU or I/O averages. Absent for the System Idle Process (PID 0). |
| `sparklogs.data.processes.read_mb_per_s_avg` | float | megabytes_per_second | Read rate over the CPU average baseline interval, in MiB/s (1,048,576 bytes/s). Requires the same process at both observations. Includes file, pipe, device and network I/O. |
| `sparklogs.data.processes.write_mb_per_s_avg` | float | megabytes_per_second | Write rate over the CPU average baseline interval, in MiB/s (1,048,576 bytes/s). Requires the same process at both observations. Includes file, pipe, device and network I/O. |
| `sparklogs.data.processes.process_handle_count_high_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.processes.process_handle_count_high_age_h` | float | hours | How long this condition has been open, in hours. |
