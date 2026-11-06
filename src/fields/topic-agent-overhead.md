<!-- GENERATED reference. Do not hand-edit. -->
# Agent overhead fields

Reported every 15 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 15 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.agent_overhead.row` | string |  | Which component this row describes: `agent` for the SparkLogs Agent process, `vector` for the Vector process it runs. |
| `sparklogs.data.agent_overhead.agent_version` | string |  | The agent version, such as 1.14.9, without build details. |
| `sparklogs.data.agent_overhead.agent_build` | string |  | The agent version plus the source commit it was built from. A `.dirty` suffix marks a build from modified source. |
| `sparklogs.data.agent_overhead.pid` | integer |  | This component's process ID. With `create_time_ts`, it tells one run of the process from the next. |
| `sparklogs.data.agent_overhead.create_time_ts` | string | timestamp | When this component's process started, in UTC. |
| `sparklogs.data.agent_overhead.service_name` | string |  | The Windows service this component runs as: `SparkLogsAgent` or `SparkLogsVector` on a default install, with the instance name added on a side-by-side install. |
| `sparklogs.data.agent_overhead.instance_name` | string |  | The side-by-side instance name of this install. Absent on a default install. |
| `sparklogs.data.agent_overhead.cpu_cycles_delta` | integer |  | CPU cycles this process used over the last several minutes. Absent until the agent has read the same run of the process twice. |
| `sparklogs.data.agent_overhead.user_time_delta_ms` | float | milliseconds | User-mode CPU time this process used over the last several minutes. Absent until the agent has read the same run of the process twice. |
| `sparklogs.data.agent_overhead.kernel_time_delta_ms` | float | milliseconds | Kernel-mode CPU time this process used over the last several minutes. Absent until the agent has read the same run of the process twice. |
| `sparklogs.data.agent_overhead.cpu_pct_of_one_core_avg` | float | percent | This process's average CPU use over the last several minutes, as a percentage of one logical core. Can exceed 100: two busy cores read 200. |
| `sparklogs.data.agent_overhead.cpu_pct_of_one_core_p95` | float | percent | The 95th percentile of this process's CPU use over the last several minutes, as a percentage of one logical core. Can exceed 100: two busy cores read 200. |
| `sparklogs.data.agent_overhead.working_set_avg_bytes` | integer | bytes | This process's average working set over the last several minutes. |
| `sparklogs.data.agent_overhead.working_set_peak_bytes` | integer | bytes | The highest working set this process reached over the last several minutes. |
| `sparklogs.data.agent_overhead.private_bytes` | integer | bytes | This process's private memory (memory not shared with other processes) at the latest reading. |
| `sparklogs.data.agent_overhead.handle_count_peak` | integer | count | The highest handle count this process reached over the last several minutes. |
| `sparklogs.data.agent_overhead.handle_count_avg` | float | count | This process's average handle count over the last several minutes. |
| `sparklogs.data.agent_overhead.io_read_bytes_delta` | integer | bytes | Bytes this process read over the last several minutes. Absent until the agent has read the same run of the process twice. |
| `sparklogs.data.agent_overhead.io_write_bytes_delta` | integer | bytes | Bytes this process wrote over the last several minutes. Absent until the agent has read the same run of the process twice. |
| `sparklogs.data.agent_overhead.io_other_bytes_delta` | integer | bytes | Bytes of I/O other than reads and writes (control operations) this process did over the last several minutes. Absent until the agent has read the same run of the process twice. |
| `sparklogs.data.agent_overhead.restart_count_1h` | integer | count | How many times this process restarted in the last hour. |
| `sparklogs.data.agent_overhead.uptime_s` | integer | seconds | How long this process has been running. |
| `sparklogs.data.agent_overhead.combined_working_set_avg_mb` | float | megabytes | The agent's and Vector's average working sets added together. On the `agent` row only. |
| `sparklogs.data.agent_overhead.private_bytes_monotonic_windows` | integer | count | How many captures in a row this process's private memory has grown. A reading that holds steady or falls resets it to 0. |
| `sparklogs.data.agent_overhead.private_bytes_slope_mb_per_h` | float | megabytes_per_hour | How fast this process's private memory is growing per hour, fitted from its recent readings; negative when it shrinks. Present once two readings taken at different times exist. |
| `sparklogs.data.agent_overhead.handle_monotonic_windows` | integer | count | How many captures in a row this process's handle count has grown. A reading that holds steady or falls resets it to 0. |
| `sparklogs.data.agent_overhead.sparklogs_agent_cpu_over_budget_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.agent_overhead.sparklogs_agent_cpu_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.agent_overhead.sparklogs_agent_handle_over_budget_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.agent_overhead.sparklogs_agent_handle_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.agent_overhead.sparklogs_agent_memory_over_budget_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.agent_overhead.sparklogs_agent_memory_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
