<!-- GENERATED reference. Do not hand-edit. -->
# Host performance fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.performance.cpu_pct_time_over_90` | float | percent | Percent of the window's sample pairs with CPU busy over 90%. |
| `sparklogs.data.performance.cpu_pct_time_over_70` | float | percent | Percent of the window's sample pairs with CPU busy over 70%. |
| `sparklogs.data.performance.cpu_busy_pct_avg` | float | percent | The host's average CPU busy share over the window, core-normalized. |
| `sparklogs.data.performance.cpu_kernel_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in kernel mode. |
| `sparklogs.data.performance.cpu_user_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in user mode. |
| `sparklogs.data.performance.cpu_kernel_excl_drivers_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in kernel mode, excluding interrupt and DPC time attributed to drivers: what the kernel-dominated condition grades. |
| `sparklogs.data.performance.cpu_interrupt_pct_avg` | float | percent | The average share of busy CPU time spent servicing interrupts. |
| `sparklogs.data.performance.cpu_interrupt_pct_max_10s` | float | percent | The highest 10-second interrupt share the window observed. |
| `sparklogs.data.performance.cpu_dpc_pct_avg` | float | percent | The average share of busy CPU time spent in deferred procedure calls. |
| `sparklogs.data.performance.cpu_dpc_pct_max_10s` | float | percent | The highest 10-second DPC share the window observed. |
| `sparklogs.data.performance.cpu_interrupt_dpc_pct_avg` | float | percent | The average combined interrupt and DPC share: what the interrupt-storm condition grades. |
| `sparklogs.data.performance.cpu_frequency_pct_avg` | float | percent | The average CPU clock as a share of its nominal frequency. Reads over 100 under turbo, unlike every other `_pct` field on this row. |
| `sparklogs.data.performance.run_queue_p90_10s` | float |  | The 90th percentile, across the window's 10-second samples, of how many threads were ready to run but waiting for a core. |
| `sparklogs.data.performance.run_queue_per_core_p90_10s` | float |  | `run_queue_p90_10s` divided by the logical core count, so a deep queue on a big server and a shallow one on a laptop are judged on the same scale. |
| `sparklogs.data.performance.logical_core_count` | integer | count | How many logical processors the host has, which the per-core queue reading is divided by. |
| `sparklogs.data.performance.commit_pct` | float | percent | The current commit charge as a percentage of the commit limit. |
| `sparklogs.data.performance.commit_pct_max_window` | float | percent | The highest commit charge percentage the window observed. |
| `sparklogs.data.performance.hard_faults_per_s` | float | per_second | Hard page faults per second, latest 10s sample. |
| `sparklogs.data.performance.ram_pct_time_in_hard_fault_storm` | float | percent | Percent of the window's time spent in a hard-fault storm. |
| `sparklogs.data.performance.cpu_busy_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.performance.cpu_busy_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_interrupt_storm_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.performance.cpu_interrupt_storm_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_kernel_dominated_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.performance.cpu_kernel_dominated_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_throttled_under_load_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.performance.cpu_throttled_under_load_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.ram_commit_high_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.performance.ram_commit_high_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.ram_hard_fault_storm_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.performance.ram_hard_fault_storm_age_h` | float | hours | How long this condition has been open, in hours. |
