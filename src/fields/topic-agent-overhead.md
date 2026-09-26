<!-- GENERATED reference. Do not hand-edit. -->
# Agent overhead fields

Reported every 15 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 15 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.agent_overhead.row` | string |  | Which component this row is: `agent` for the agent process itself, `vector` for its Vector child. |
| `sparklogs.data.agent_overhead.agent_version` | string |  | The agent version, plain semver, without build metadata. |
| `sparklogs.data.agent_overhead.agent_build` | string |  | The agent build: semver plus the commit this binary was built from. `.dirty` means the tree was modified. |
| `sparklogs.data.agent_overhead.pid` | integer |  | This component's process ID. Combine with `create_time_ts` to tell one run of it from the next. |
| `sparklogs.data.agent_overhead.create_time_ts` | string | timestamp | When this component's process started, as RFC3339 UTC with a `Z` suffix, converted from the Windows `FILETIME`. |
| `sparklogs.data.agent_overhead.service_name` | string |  | The Windows service this component runs as: `SparkLogsAgent` or `SparkLogsVector` on the default install, the instance-suffixed name on a side-by-side instance. |
| `sparklogs.data.agent_overhead.instance_name` | string |  | The side-by-side instance this install is. Absent on the default install. |
| `sparklogs.data.agent_overhead.cpu_cycles_delta` | integer |  | CPU cycles between the first and last readings retained in the window. Absent without two readings of the same process identity. |
| `sparklogs.data.agent_overhead.user_time_delta_ms` | float | milliseconds | User-mode CPU time between the first and last readings retained in the window. Absent without two readings of the same process identity. |
| `sparklogs.data.agent_overhead.kernel_time_delta_ms` | float | milliseconds | Kernel-mode CPU time between the first and last readings retained in the window. Absent without two readings of the same process identity. |
| `sparklogs.data.agent_overhead.cpu_pct_of_one_core_avg` | float | percent | Mean of CPU percentages measured between consecutive captures, relative to one logical core. Each percentage uses the measured elapsed time. |
| `sparklogs.data.agent_overhead.cpu_pct_of_one_core_p95` | float | percent | 95th percentile of this process's CPU percentages between captures, relative to one logical core. |
| `sparklogs.data.agent_overhead.working_set_avg_bytes` | integer | bytes | This process's mean resident working set over the window. |
| `sparklogs.data.agent_overhead.working_set_peak_bytes` | integer | bytes | The highest working set this process reached in the window. |
| `sparklogs.data.agent_overhead.private_bytes` | integer | bytes | This process's private (non-shared) memory at the most recent reading in the window. |
| `sparklogs.data.agent_overhead.handle_count_peak` | integer | count | The highest handle count this process reached in the window. |
| `sparklogs.data.agent_overhead.handle_count_avg` | float | count | Mean handle count over the window, used to assess the handle budget. |
| `sparklogs.data.agent_overhead.io_read_bytes_delta` | integer | bytes | Bytes read between the first and last readings retained in the window. Absent without two readings of the same process identity. |
| `sparklogs.data.agent_overhead.io_write_bytes_delta` | integer | bytes | Bytes written between the first and last readings retained in the window. Absent without two readings of the same process identity. |
| `sparklogs.data.agent_overhead.io_other_bytes_delta` | integer | bytes | Bytes of I/O other than reads or writes between the first and last readings retained in the window. Absent without two readings of the same process identity. |
| `sparklogs.data.agent_overhead.restart_count_1h` | integer | count | How many times this row's own process restarted in the last hour. |
| `sparklogs.data.agent_overhead.uptime_s` | integer | seconds | How long this process has been running. |
| `sparklogs.data.agent_overhead.combined_working_set_avg_mb` | float | megabytes | Sum of the agent and Vector mean working sets in MiB (1,048,576 bytes), reported on the agent row and used to assess the RAM budget. |
| `sparklogs.data.agent_overhead.private_bytes_monotonic_windows` | integer | count | How many consecutive windows this process's private memory has risen without a drop. |
| `sparklogs.data.agent_overhead.private_bytes_slope_mb_per_h` | float | megabytes_per_hour | This process's private-memory growth rate in MiB (1,048,576 bytes) per hour, present once a rising run holds enough readings to fit a slope. |
| `sparklogs.data.agent_overhead.handle_monotonic_windows` | integer | count | How many consecutive windows this process's handle count has risen without a drop. |
| `sparklogs.data.agent_overhead.sparklogs_agent_cpu_over_budget_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.agent_overhead.sparklogs_agent_cpu_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.agent_overhead.sparklogs_agent_handle_over_budget_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.agent_overhead.sparklogs_agent_handle_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.agent_overhead.sparklogs_agent_memory_over_budget_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.agent_overhead.sparklogs_agent_memory_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
