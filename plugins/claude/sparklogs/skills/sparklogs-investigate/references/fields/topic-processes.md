<!-- GENERATED reference. Do not hand-edit. -->
# Processes fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.processes.pid` | integer |  | The process ID. Windows reuses IDs, so `pid` with `create_time_ts` identifies one process. |
| `sparklogs.data.processes.create_time_ts` | string | timestamp | When the process started, in UTC. With `pid`, it identifies the process. |
| `sparklogs.data.processes.image_name` | string |  | The process's executable file name. |
| `sparklogs.data.processes.image_path` | string |  | The full path of the process's executable. The agent never collects command-line arguments. |
| `sparklogs.data.processes.resident_bytes` | integer | bytes | Physical memory the process holds, including pages it shares with other processes. Adding this up across processes counts shared pages more than once. |
| `sparklogs.data.processes.resident_pct_ram` | float | percent | The process's resident memory as a percentage of installed RAM. Shared pages can make these add up to more than 100 across processes. Absent when installed RAM was not read. |
| `sparklogs.data.processes.private_resident_bytes` | integer | bytes | Physical memory private to this process. Absent when Windows did not report it. The total across processes is not the machine's used RAM. |
| `sparklogs.data.processes.private_commit_bytes` | integer | bytes | Private memory the process has committed, including memory not currently in RAM (Task Manager's Commit size). It is not physical RAM use. |
| `sparklogs.data.processes.handle_count` | integer | count | How many handles the process holds. |
| `sparklogs.data.processes.age_s` | integer | seconds | How long the process has been running. |
| `sparklogs.data.processes.services` | string_array |  | The Windows services this process hosts, sorted. Absent when it hosts none. |
| `sparklogs.data.processes.cpu_busy_pct_avg` | float | percent | The process's average CPU use over up to the last hour, or since the agent's first kept reading of the process if that is later, as a percentage of all logical cores: one fully busy core of eight reads 12.5. Time the machine slept counts in the average. Absent for up to five minutes after the agent first sees the process, and always for the System Idle Process. |
| `sparklogs.data.processes.read_mb_per_s_avg` | float | megabytes_per_second | The process's average read rate over up to the last hour, or since the agent's first kept reading of the process if that is later, counting file, pipe, device and network reads. Absent for up to five minutes after the agent first sees the process. |
| `sparklogs.data.processes.write_mb_per_s_avg` | float | megabytes_per_second | The process's average write rate over up to the last hour, or since the agent's first kept reading of the process if that is later, counting file, pipe, device and network writes. Absent for up to five minutes after the agent first sees the process. |
| `sparklogs.data.processes.tcp_rx_bytes_per_s_avg` | float | bytes_per_second | The process's average rate of TCP payload received over up to the last hour, or since the agent's first kept reading of the process if that is later, from the connections the agent measures and over the time it measured them; 0 when none of the measured traffic the agent could tie to a process was this process's (traffic it could not tie to any process is not counted for any process). Absent when TCP was not measured, and for up to five minutes after the agent first sees the process. When the agent reached its limit on measured connections, a process with no measured traffic has no value, and one with traffic can read lower than its real traffic. |
| `sparklogs.data.processes.tcp_tx_bytes_per_s_avg` | float | bytes_per_second | The process's average rate of TCP payload sent, including resent data, over up to the last hour, or since the agent's first kept reading of the process if that is later, from the connections the agent measures and over the time it measured them; 0 when none of the measured traffic the agent could tie to a process was this process's (traffic it could not tie to any process is not counted for any process). Absent when TCP was not measured, and for up to five minutes after the agent first sees the process. When the agent reached its limit on measured connections, a process with no measured traffic has no value, and one with traffic can read lower than its real traffic. |
| `sparklogs.data.processes.process_handle_count_high_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.processes.process_handle_count_high_age_h` | float | hours | How long this condition has been open, in hours. |
