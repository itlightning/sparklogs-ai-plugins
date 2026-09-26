<!-- GENERATED reference. Do not hand-edit. -->
# Host performance fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.performance.cpu_pct_time_over_90` | float | percent | Percent of the window's sample pairs with CPU busy over 90%. |
| `sparklogs.data.performance.cpu_pct_time_over_70` | float | percent | Percent of the window's sample pairs with CPU busy over 70%. |
| `sparklogs.data.performance.cpu_busy_pct_avg` | float | percent | The host's average CPU busy share over the window, core-normalized. |
| `sparklogs.data.performance.cpu_busy_pct_max_10s` | float | percent | The highest 10-second CPU busy share the window observed, core-normalized: the burst the average hides. |
| `sparklogs.data.performance.cpu_busy_pct_p90_10s` | float | percent | The 90th percentile, across the window's 10-second samples, of the CPU busy share, core-normalized. |
| `sparklogs.data.performance.cpu_kernel_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in kernel mode. |
| `sparklogs.data.performance.cpu_user_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in user mode. |
| `sparklogs.data.performance.cpu_kernel_excl_drivers_pct_of_busy_avg` | float | percent | Average share of busy CPU time spent in kernel mode, excluding interrupt and deferred procedure call time. |
| `sparklogs.data.performance.cpu_interrupt_pct_avg` | float | percent | The average share of busy CPU time spent servicing interrupts. |
| `sparklogs.data.performance.cpu_interrupt_pct_max_10s` | float | percent | The highest 10-second interrupt share the window observed. |
| `sparklogs.data.performance.cpu_dpc_pct_avg` | float | percent | The average share of busy CPU time spent in deferred procedure calls. |
| `sparklogs.data.performance.cpu_dpc_pct_max_10s` | float | percent | The highest 10-second DPC share the window observed. |
| `sparklogs.data.performance.cpu_interrupt_dpc_pct_avg` | float | percent | Average share of busy CPU time spent servicing interrupts and deferred procedure calls. |
| `sparklogs.data.performance.cpu_clock_pct_of_base_avg` | float | percent | Average CPU clock as a percentage of rated non-turbo base frequency. Can exceed 100 under turbo. |
| `sparklogs.data.performance.cpu_base_clock_mhz` | integer |  | The rated non-turbo base clock, in MHz. Absent when the host did not report one. |
| `sparklogs.data.performance.cpu_clock_mhz_avg` | float |  | Average effective clock in MHz: rated base frequency multiplied by `cpu_clock_pct_of_base_avg` / 100. Absent without a base frequency. |
| `sparklogs.data.performance.run_queue_p90_10s` | float |  | The 90th percentile, across the window's 10-second samples, of how many threads were ready to run but waiting for a core. On a virtual machine the queue can be threads waiting on host dispatch, which the guest does not count as busy. |
| `sparklogs.data.performance.run_queue_per_core_p90_10s` | float |  | `run_queue_p90_10s` divided by the logical core count. On a VM, queued threads may be waiting for host scheduling without appearing as busy guest CPU. |
| `sparklogs.data.performance.logical_core_count` | integer | count | How many logical processors the host has, which the per-core queue reading is divided by. |
| `sparklogs.data.performance.commit_pct` | float | percent | The current commit charge as a percentage of the commit limit. |
| `sparklogs.data.performance.commit_pct_max_window` | float | percent | The highest commit charge percentage the window observed. |
| `sparklogs.data.performance.hard_faults_per_s` | float | per_second | Hard page faults per second, latest 10s sample. |
| `sparklogs.data.performance.ram_pct_time_in_hard_fault_storm` | float | percent | Percentage of the window's hard-fault readings above the configured storm-rate threshold. |
| `sparklogs.data.performance.ram_total_bytes` | integer | bytes | Installed physical RAM, the same figure `system_info` reports, at the end of the window. |
| `sparklogs.data.performance.ram_available_bytes` | integer | bytes | Physical RAM available to new allocations (free, zeroed and standby pages) at the end of the window. |
| `sparklogs.data.performance.ram_standby_bytes` | integer | bytes | RAM holding cached pages the memory manager can repurpose (the standby list, all priorities) at the end of the window. Part of available. |
| `sparklogs.data.performance.ram_modified_bytes` | integer | bytes | RAM holding dirty pages waiting to be written out (the modified list) at the end of the window. |
| `sparklogs.data.performance.ram_compressed_bytes` | integer | bytes | Resident memory held by the memory-compression store, from the latest successful process enumeration (at most one process-table generation old). Zero when compression is off. Absent until the first successful enumeration, or when no process-table topic is collected. |
| `sparklogs.data.performance.cpu_busy_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_busy_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_interrupt_storm_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_interrupt_storm_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_kernel_dominated_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_kernel_dominated_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_throttled_under_load_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_throttled_under_load_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.ram_commit_near_cap_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.ram_commit_near_cap_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.ram_hard_fault_storm_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.ram_hard_fault_storm_age_h` | float | hours | How long this condition has been open, in hours. |
