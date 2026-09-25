<!-- GENERATED reference. Do not hand-edit. -->
# Top processes fields

Emitted every 5 minutes on clock boundaries; each row covers the window ending at `t`; a partly watched window carries `sparklogs.window_coverage_pct` below 100; chart with buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.top_processes.pid` | integer |  | The process id; with `create_time_ts` it is this row's identity, the same one the processes topic uses. 0 on the system and remainder rows. |
| `sparklogs.data.top_processes.create_time_ts` | string | timestamp | When the process started, as RFC3339 UTC with a `Z` suffix, converted from the Windows `FILETIME`. On the rows that are not a process it is a fixed instant in the first seconds of the Unix epoch, which no real process carries: the epoch itself for `(other processes)`, one second after for `(hardware interrupts)`, two for `(deferred procedure calls)`. |
| `sparklogs.data.top_processes.image_name` | string |  | The process's executable file name; `(hardware interrupts)` or `(deferred procedure calls)` on a system row, `(other processes)` on the remainder row. |
| `sparklogs.data.top_processes.image_path` | string |  | The process's normalized executable path, when one was read for this identity while the process was still alive. Absent on the system and remainder rows, and when the path could not be read, including a process that exited before it was ever resolved. The command line is deliberately never read: it can carry secrets passed as arguments. |
| `sparklogs.data.top_processes.services` | string_array |  | The services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.top_processes.entry_kind` | string |  | What the row is. `process`: one process the rankings named. `system`: CPU the kernel spent outside any process, one row for hardware interrupt service routines and one for deferred procedure calls; CPU fields only. `remainder`: `(other processes)`, whose CPU is machine busy time minus every other row (the unlisted processes, and whatever a process that exited inside the window spent after its last enumeration), so the CPU of all rows adds up to the machine's busy time; its IO is the sum of the unlisted processes' own counters. |
| `sparklogs.data.top_processes.top_by` | string_array |  | Which rankings named this process: `cpu`, `ram`, `io_read`, `io_write`. Empty on the system and remainder rows. |
| `sparklogs.data.top_processes.cpu_busy_pct_avg` | float | percent | CPU this process used over the five-minute window that ends at the event's time, as a percent of the whole machine (every logical core). The idle process is never counted. |
| `sparklogs.data.top_processes.cpu_busy_pct_max_1m` | float | percent | The highest one-minute CPU sample in that window, as a percent of the whole machine. |
| `sparklogs.data.top_processes.working_set_bytes` | integer | bytes | The process's working set at the end of the window. Absent for a process that exited inside it. |
| `sparklogs.data.top_processes.working_set_pct_ram` | float | percent | That working set as a percentage of installed RAM. |
| `sparklogs.data.top_processes.read_bytes_5m` | integer | bytes | Bytes the process read in the window that ends at the event's time, as measured (never scaled up for a partly watched window). Counts every read IO it issued (files, pipes, devices, network), not disk alone. |
| `sparklogs.data.top_processes.write_bytes_5m` | integer | bytes | Bytes the process wrote in the window that ends at the event's time, as measured (never scaled up for a partly watched window). Counts every write IO it issued (files, pipes, devices, network), not disk alone. |
| `sparklogs.data.top_processes.read_mb_per_s_avg` | float | megabytes_per_second | Average read rate over the watched part of the window, in 1024-based MB per second. Every read IO the process issued, not disk alone. |
| `sparklogs.data.top_processes.write_mb_per_s_avg` | float | megabytes_per_second | Average write rate over the watched part of the window, in 1024-based MB per second. Every write IO the process issued, not disk alone. |
