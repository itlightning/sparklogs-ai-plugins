<!-- GENERATED reference. Do not hand-edit. -->
# Agent overhead fields

Emitted every 15 minutes on clock boundaries; each row covers the window ending at `t`; a partly watched window carries `sparklogs.window_coverage_pct` below 100; chart with buckets at least 15 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.agent_overhead.row` | string |  | Which component this row is: `agent` for the agent process itself, `vector` for its Vector child. |
| `sparklogs.data.agent_overhead.cpu_cycles_delta` | integer |  | How many CPU cycles this process burned since the previous capture in the ring: frequency-independent, unlike the percent-of-one-core figures. |
| `sparklogs.data.agent_overhead.user_time_delta_ms` | float | milliseconds | How much user-mode CPU time this process spent since the previous capture in the ring. |
| `sparklogs.data.agent_overhead.kernel_time_delta_ms` | float | milliseconds | How much kernel-mode CPU time this process spent since the previous capture in the ring. |
| `sparklogs.data.agent_overhead.cpu_pct_of_one_core_avg` | float | percent | This process's average share of one CPU core over the window, from its CPU time over the wall time elapsed: exact, and needs no frequency reference. |
| `sparklogs.data.agent_overhead.cpu_pct_of_one_core_p95` | float | percent | The 95th percentile of this process's share of one CPU core, across the per-tick readings the window holds. |
| `sparklogs.data.agent_overhead.working_set_avg_mb` | float | megabytes | This process's average working set over the window. |
| `sparklogs.data.agent_overhead.working_set_peak_mb` | float | megabytes | The highest working set this process reached in the window. |
| `sparklogs.data.agent_overhead.private_bytes_mb` | float | megabytes | This process's private (non-shared) memory at the most recent reading in the window. |
| `sparklogs.data.agent_overhead.handle_count_peak` | integer | count | The highest handle count this process reached in the window. |
| `sparklogs.data.agent_overhead.handle_count_avg` | float | count | This process's average handle count over the window: what the handle budget grades, since a burst the process recovered from is not what it holds. |
| `sparklogs.data.agent_overhead.io_read_bytes_delta` | integer | bytes | Bytes this process read since the previous capture in the ring. |
| `sparklogs.data.agent_overhead.io_write_bytes_delta` | integer | bytes | Bytes this process wrote since the previous capture in the ring. |
| `sparklogs.data.agent_overhead.io_other_bytes_delta` | integer | bytes | Bytes this process moved through I/O that is neither a read nor a write, since the previous capture in the ring. |
| `sparklogs.data.agent_overhead.restart_count_1h` | integer | count | How many times this row's own process restarted in the last hour. |
| `sparklogs.data.agent_overhead.uptime_s` | integer | seconds | How long this process has been running. |
| `sparklogs.data.agent_overhead.combined_working_set_avg_mb` | float | megabytes | The agent's and Vector's average working set added together, carried on the agent row: memory is a pool the two share, so the RAM budget grades the sum rather than either process alone. |
| `sparklogs.data.agent_overhead.agent_private_bytes_monotonic_windows` | integer | count | How many consecutive windows the agent's own private memory has risen without a drop, carried on the agent row. |
| `sparklogs.data.agent_overhead.agent_private_bytes_slope_mb_per_h` | float | megabytes_per_hour | The agent's own private-memory growth rate, carried on the agent row once a rising run holds enough readings to fit a slope. |
| `sparklogs.data.agent_overhead.agent_handle_monotonic_windows` | integer | count | How many consecutive windows the agent's own handle count has risen without a drop, carried on the agent row. |
| `sparklogs.data.agent_overhead.vector_restart_count_1h` | integer | count | How many times the Vector child restarted in the last hour, carried on the agent row alongside the agent's own count. |
| `sparklogs.data.agent_overhead.agent_restart_count_1h` | integer | count | How many times the agent process itself restarted in the last hour, carried on the agent row. |
| `sparklogs.data.agent_overhead.sparklogs_agent_cpu_over_budget_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.agent_overhead.sparklogs_agent_cpu_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.agent_overhead.sparklogs_agent_handle_over_budget_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.agent_overhead.sparklogs_agent_handle_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.agent_overhead.sparklogs_agent_memory_over_budget_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.agent_overhead.sparklogs_agent_memory_over_budget_age_h` | float | hours | How long this condition has been open, in hours. |
