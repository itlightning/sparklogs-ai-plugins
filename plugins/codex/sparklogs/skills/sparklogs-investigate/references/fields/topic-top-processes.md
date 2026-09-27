<!-- GENERATED reference. Do not hand-edit. -->
# Top processes fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.
`sparklogs.window_measured_s` gives the unrounded duration in seconds used to calculate this topic's rates. It counts accepted intervals only and is absent when none were accepted.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.top_processes.pid` | integer |  | Process ID. Together with `create_time_ts`, identifies a process row. Absent on system and remainder rows. |
| `sparklogs.data.top_processes.create_time_ts` | string | timestamp | Process creation time in RFC3339 UTC, converted from Windows FILETIME. Absent on system and remainder rows, which are not processes. |
| `sparklogs.data.top_processes.image_name` | string |  | The process's executable file name. On a system or remainder row this label is the row's identity, because those rows have no pid or creation time: `(hardware interrupts)`, `(deferred procedure calls)`, or `(other processes)`. |
| `sparklogs.data.top_processes.image_path` | string |  | Normalized executable path, if read while this process identity was alive. Absent when unresolved and on system and remainder rows. Command-line arguments are not collected. |
| `sparklogs.data.top_processes.services` | string_array |  | The services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.top_processes.entry_kind` | string |  | `process`: a selected process. `system`: hardware interrupt or deferred procedure call CPU, with no memory or I/O fields. `remainder`: unlisted-process I/O and memory. Its CPU is machine busy time minus the other rows, floored at zero. If machine counters are unavailable or their processor count differs from the host inventory, system rows are omitted and remainder CPU sums unlisted processes instead. |
| `sparklogs.data.top_processes.top_by` | string_array |  | Rankings that selected this process: `cpu`, `ram` (resident memory), `io_read`, `io_write`. Empty on system and remainder rows. |
| `sparklogs.data.top_processes.cpu_busy_pct_avg` | float | percent | CPU usage over accepted intervals in this five-minute window, as a percentage of all logical cores. The idle process is excluded. |
| `sparklogs.data.top_processes.cpu_busy_pct_max_1m` | float | percent | The highest one-minute CPU sample in that window, as a percent of the whole machine. |
| `sparklogs.data.top_processes.resident_bytes` | integer | bytes | Resident memory at the end of the window, including pages shared with other processes. Absent on a system row, and when the process was not in the closing snapshot. On the remainder row, the sum of unlisted processes still in that snapshot. Adding this field across rows counts shared pages more than once. |
| `sparklogs.data.top_processes.resident_pct_ram` | float | percent | resident_bytes as a percentage of installed physical RAM from the same capture. Absent when resident_bytes is absent, or when that total was not read. Shared pages can make these percentages add up to more than 100. |
| `sparklogs.data.top_processes.private_resident_bytes` | integer | bytes | Resident memory private to this process at the end of the window. Absent on a system row, when the process was not in the closing snapshot, or when the operating system did not report it. On the remainder row, the sum of unlisted processes, omitted entirely when any of them lacks a reading. A total of these values is not the machine's used RAM. |
| `sparklogs.data.top_processes.private_commit_bytes` | integer | bytes | Private committed memory at the end of the window, including memory that is not currently resident. Absent on a system row, and when the process was not in the closing snapshot. On the remainder row, the sum of unlisted processes still in that snapshot. This is not physical RAM usage. |
| `sparklogs.data.top_processes.read_bytes_5m` | integer | bytes | Bytes read during accepted intervals in the window ending at the event time. Includes file, pipe, device and network I/O. Partial-window totals are not scaled up. |
| `sparklogs.data.top_processes.write_bytes_5m` | integer | bytes | Bytes written during accepted intervals in the window ending at the event time. Includes file, pipe, device and network I/O. Partial-window totals are not scaled up. |
| `sparklogs.data.top_processes.read_mb_per_s_avg` | float | megabytes_per_second | Read bytes divided by accepted interval seconds, in MiB/s (1,048,576 bytes/s). Includes process I/O beyond physical disk reads. |
| `sparklogs.data.top_processes.write_mb_per_s_avg` | float | megabytes_per_second | Write bytes divided by accepted interval seconds, in MiB/s (1,048,576 bytes/s). Includes process I/O beyond physical disk writes. |
