<!-- GENERATED reference. Do not hand-edit. -->
# Host performance fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.performance.busiest_disk_device` | string |  | Device identity of the measured disk with highest mean queue occupancy; ties use throughput then device key. When all measured queues are below 0.05, uses the OS-volume disk when measured. Matches storage_device_io device/instance. |
| `sparklogs.data.performance.busiest_disk_busy_pct_avg` | float | percent | Mean active time of busiest_disk_device over its accepted intervals. Absent without a measured disk. |
| `sparklogs.data.performance.busiest_disk_queue_depth_avg` | float |  | Completed-response-derived mean queue occupancy of busiest_disk_device, from the canonical device window. |
| `sparklogs.data.performance.busiest_disk_latency_ms_p90_10s` | float | milliseconds | 90th percentile of completed-IO mean latency across accepted intervals of busiest_disk_device. Absent without completed IO. |
| `sparklogs.data.performance.busiest_disk_media` | string |  | Reported media of busiest_disk_device: ssd or hdd. Absent when unknown. |
| `sparklogs.data.performance.busiest_disk_total_iops_avg` | float | iops | Read plus write completions per second of busiest_disk_device over its accepted intervals. |
| `sparklogs.data.performance.busiest_disk_total_mb_per_s_avg` | float | megabytes_per_second | Read plus write megabytes per second of busiest_disk_device over its accepted intervals. |
| `sparklogs.data.performance.all_disks_total_iops_avg` | float | iops | Sum of canonical read and write completion rates across measured eligible disks. Excludes file-backed virtual disks. Absent without a measured disk. |
| `sparklogs.data.performance.all_disks_total_mb_per_s_avg` | float | megabytes_per_second | Sum of canonical read and write megabytes per second across measured eligible disks. Excludes file-backed virtual disks. Absent without a measured disk. |
| `sparklogs.data.performance.all_disks_latency_ms_avg` | float | milliseconds | Mean completed-IO response latency across measured eligible disks, weighted by actual read and write completion counts over each disk's accepted intervals. Absent without completed IO. |
| `sparklogs.data.performance.cpu_pct_time_over_90` | float | percent | Percent of the window's sample pairs with CPU busy over 90%. |
| `sparklogs.data.performance.cpu_pct_time_over_70` | float | percent | Percent of the window's sample pairs with CPU busy over 70%. |
| `sparklogs.data.performance.cpu_busy_pct_avg` | float | percent | The host's average CPU busy share over the window, core-normalized. |
| `sparklogs.data.performance.cpu_busy_pct_max_10s` | float | percent | The highest 10-second CPU busy share the window observed, core-normalized: the burst the average hides. |
| `sparklogs.data.performance.cpu_busy_pct_p90_10s` | float | percent | The 90th percentile, across the window's 10-second samples, of the CPU busy share, core-normalized. |
| `sparklogs.data.performance.cpu_kernel_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in kernel mode. |
| `sparklogs.data.performance.cpu_user_pct_of_busy_avg` | float | percent | The average share of busy CPU time spent in user mode. |
| `sparklogs.data.performance.cpu_kernel_excl_drivers_pct_of_busy_avg` | float | percent | Average share of busy CPU time spent in kernel mode, excluding interrupt and deferred procedure call time. |
| `sparklogs.data.performance.cpu_interrupt_pct_avg` | float | percent | The average share of total CPU time (all cores, idle included: the denominator of `cpu_busy_pct_avg`) spent servicing interrupts. |
| `sparklogs.data.performance.cpu_interrupt_pct_max_10s` | float | percent | The highest 10-second interrupt share the window observed. |
| `sparklogs.data.performance.cpu_dpc_pct_avg` | float | percent | The average share of total CPU time (all cores, idle included: the denominator of `cpu_busy_pct_avg`) spent in deferred procedure calls. |
| `sparklogs.data.performance.cpu_dpc_pct_max_10s` | float | percent | The highest 10-second DPC share the window observed. |
| `sparklogs.data.performance.cpu_interrupt_dpc_pct_avg` | float | percent | The average share of total CPU time (all cores, idle included: the denominator of `cpu_busy_pct_avg`) spent servicing interrupts and deferred procedure calls. |
| `sparklogs.data.performance.cpu_clock_pct_of_base_avg` | float | percent | Average CPU clock as a percentage of rated non-turbo base frequency. Can exceed 100 under turbo. |
| `sparklogs.data.performance.cpu_base_clock_mhz` | integer |  | The rated non-turbo base clock, in MHz. Absent when the host did not report one. |
| `sparklogs.data.performance.cpu_clock_mhz_avg` | float |  | Average effective clock in MHz: rated base frequency multiplied by `cpu_clock_pct_of_base_avg` / 100. Absent without a base frequency. |
| `sparklogs.data.performance.run_queue_p90_10s` | float |  | The 90th percentile, across the window's 10-second samples, of how many threads were ready to run but waiting for a core. On a virtual machine the queue can be threads waiting on host dispatch, which the guest does not count as busy. |
| `sparklogs.data.performance.run_queue_per_core_p90_10s` | float |  | `run_queue_p90_10s` divided by the logical core count. On a VM, queued threads may be waiting for host scheduling without appearing as busy guest CPU. |
| `sparklogs.data.performance.logical_core_count` | integer | count | How many logical processors the host has, which the per-core queue reading is divided by. |
| `sparklogs.data.performance.commit_pct` | float | percent | The current commit charge as a percentage of the commit limit. |
| `sparklogs.data.performance.commit_pct_max_window` | float | percent | The highest commit charge percentage the window observed. |
| `sparklogs.data.performance.hard_faults_per_s` | float | per_second | Hard page faults per second, latest 10s sample. |
| `sparklogs.data.performance.hard_faults_per_s_avg` | float | per_second | The mean of the window's 10 s hard-fault rates. Hard faults read files and images as well as the page file, so a high rate alone is not memory pressure. |
| `sparklogs.data.performance.hard_faults_per_s_max_10s` | float | per_second | The highest 10 s hard-fault rate in the window. |
| `sparklogs.data.performance.ram_total_bytes` | integer | bytes | Physical memory the OS can use (installed RAM less what firmware and drivers reserve), the same figure `system_info` reports, at the end of the window. |
| `sparklogs.data.performance.ram_available_bytes` | integer | bytes | Physical RAM available to new allocations (free, zeroed and standby pages) at the end of the window. |
| `sparklogs.data.performance.ram_standby_bytes` | integer | bytes | RAM holding cached pages the memory manager can repurpose (the standby list, all priorities) at the end of the window. Part of available. |
| `sparklogs.data.performance.ram_modified_bytes` | integer | bytes | RAM holding dirty pages waiting to be written out (the modified list) at the end of the window. |
| `sparklogs.data.performance.ram_compressed_bytes` | integer | bytes | Resident memory held by the memory-compression store, from the latest successful process enumeration (at most one process-table generation old). Zero when compression is off. Absent until the first successful enumeration, or when no process-table topic is collected. |
| `sparklogs.data.performance.ram_installed_bytes` | integer | bytes | RAM physically installed, the figure `system_info` reports, on this row as the ceiling a chart of the RAM readings draws against. Absent when the firmware tables do not say. |
| `sparklogs.data.performance.ram_available_bytes_min_window` | integer | bytes | The lowest available RAM (free, zeroed and standby pages) any sampler tick in the window read. |
| `sparklogs.data.performance.ram_available_pct` | float | percent | Available RAM (free, zeroed and standby pages) as a percentage of `ram_total_bytes`, at the end of the window: the `ram_pressure` input. |
| `sparklogs.data.performance.ram_free_bytes` | integer | bytes | RAM on the free and zeroed lists, holding nothing at all, at the end of the window. Part of available; the rest of available is standby. |
| `sparklogs.data.performance.ram_file_cache_bytes` | integer | bytes | RAM the system file cache holds in use (its working set) at the end of the window. |
| `sparklogs.data.performance.kernel_paged_pool_bytes` | integer | bytes | The kernel's paged pool at the end of the window. |
| `sparklogs.data.performance.kernel_nonpaged_pool_bytes` | integer | bytes | The kernel's nonpaged pool, always resident, at the end of the window. |
| `sparklogs.data.performance.commit_bytes` | integer | bytes | The commit charge at the end of the window: memory promised to processes and the kernel that RAM or a page file must back. |
| `sparklogs.data.performance.commit_bytes_max_window` | integer | bytes | The highest commit charge any sampler tick in the window read. |
| `sparklogs.data.performance.commit_limit_bytes` | integer | bytes | The current commit limit: usable RAM plus the page files at their current size. A system-managed page file grows when commit nears it, so a high share of it is not exhaustion. |
| `sparklogs.data.performance.commit_peak_bytes` | integer | bytes | The highest commit charge since boot. |
| `sparklogs.data.performance.commit_reachable_max_bytes` | integer | bytes | The most the host can ever commit: the RAM part of the commit limit plus each page file at the size it can still reach, its maximum or less when its volume runs out of room first (keeping 1 GiB free). Absent when the page files or a growing file's volume were not read. |
| `sparklogs.data.performance.commit_pct_of_reachable_max` | float | percent | The commit charge as a percentage of `commit_reachable_max_bytes`: how close allocations are to failing. Absent when the ceiling is. |
| `sparklogs.data.performance.commit_pct_of_reachable_max_max_window` | float | percent | The highest `commit_pct_of_reachable_max` any sampler tick in the window read. |
| `sparklogs.data.performance.commit_exhausted` | bool |  | Whether Windows reports commit near the most it can ever reach (`\KernelObjects\MaximumCommitCondition` set) at the end of the window. Absent when the event could not be read. |
| `sparklogs.data.performance.commit_at_error_min` | float | minutes | Minutes since the first capture of the current run at the `ram_commit_near_limit` Error bar (Windows reporting exhaustion, or the error share of `commit_pct_of_reachable_max`); the run lasts until commit falls under that rung's lowering bar. Absent while commit is under the bar. |
| `sparklogs.data.performance.ram_oom_crash_count_24h` | integer | count | Processes that crashed out of memory in the last day: Application Error 1000 records whose exception code is `0xC0000017` (no memory) or `0xC000012D` (commit limit reached). Absent when the event log query has not answered recently. |
| `sparklogs.data.performance.ram_oom_crash_age_min` | float | minutes | Minutes since the newest out-of-memory process crash counted in `ram_oom_crash_count_24h`. Absent when there is none. |
| `sparklogs.data.performance.ram_exhaustion_report_count_24h` | integer | count | Times in the last day Windows diagnosed a low virtual memory condition (Resource-Exhaustion-Detector 2004). Absent when the event log query has not answered recently. |
| `sparklogs.data.performance.ram_exhaustion_report_age_min` | float | minutes | Minutes since the newest diagnosis counted in `ram_exhaustion_report_count_24h`. Absent when there is none. |
| `sparklogs.data.performance.pagefile_bytes` | integer | bytes | The page files' current size, summed. Zero when the host has none. |
| `sparklogs.data.performance.pagefile_max_bytes` | integer | bytes | The size the page files may grow to, summed. |
| `sparklogs.data.performance.pagefile_in_use_bytes` | integer | bytes | How much of the page files holds pages, summed. |
| `sparklogs.data.performance.pagefile_growth_limit` | string |  | Why the page files cannot grow further: `none` (one can still grow to its maximum), `at_max` (every one is at its maximum), `disk_space` (a volume runs out of room first) or `no_pagefile`. Absent when not read. |
| `sparklogs.data.performance.user_session_count` | integer | count | Active interactive user sessions in the window's latest session listing, console and remote. A count only: no user, account or session name is read. On a Remote Desktop server many sessions can be active at once. Absent when no listing in the window answered. |
| `sparklogs.data.performance.user_session_unlocked_count` | integer | count | Active sessions known unlocked in the window's latest session listing. An unlocked console nobody is using reads unlocked: per-session idle time is not collected. A session whose lock state could not be read is not counted. Absent when no listing in the window answered, or no session is known unlocked and one's lock state was unread. |
| `sparklogs.data.performance.user_session_disconnected_count` | integer | count | Disconnected sessions in the window's latest session listing: a user still logged on, not connected. Active plus disconnected is the logged-on user sessions (a console, 0 or 1, plus Remote Desktop); session 0, listener sessions and a console at the sign-in screen are not counted. Counts sessions, not distinct users. Absent when no listing in the window answered. |
| `sparklogs.data.performance.user_pct_time_unlocked` | float | percent | Percent of the window's sampler ticks with at least one unlocked active session, out of the ticks whose lock state was read (a tick whose session listing failed, missed its deadline or could not tell is left out of both counts): evidence of the hours someone is at the machine. A Remote Desktop server with many sessions reads unlocked most of the time. Absent when no tick read the lock state. |
| `sparklogs.data.performance.host_class` | string |  | The agent's host class, `workstation`, `server` or `unknown`, copied here so a baseline can group rows without a join. |
| `sparklogs.data.performance.chassis_type` | string |  | The chassis type `system_info` reports, copied here as a cohort key. Absent when the firmware tables do not say. |
| `sparklogs.data.performance.is_vm` | bool |  | Whether the machine is virtual, as `system_info` reports it, copied here as a cohort key. Absent when the firmware strings were unread. |
| `sparklogs.data.performance.manufacturer` | string |  | The system manufacturer `system_info` reports, copied here as a cohort key. Absent when the firmware tables do not say. |
| `sparklogs.data.performance.model` | string |  | The system model `system_info` reports, copied here as a cohort key. Absent when the firmware tables do not say. |
| `sparklogs.data.performance.timezone_utc_offset_min` | integer | minutes | The time zone's offset from UTC now, in signed minutes EAST of UTC with any daylight saving in effect (Pacific daylight time is -420), as `system_info` reports it, copied here as a cohort key. Absent when the time zone read failed. |
| `sparklogs.data.performance.pagefiles` | object_array |  | Every page file, ordered by `path`: its path, the `volume` holding it (the volume id `storage_io` rows carry; left out when it did not resolve), its current size `bytes`, the `max_bytes` it may grow to and the `in_use_bytes` holding pages. Empty when the host has no page file; absent when the page files were not read. |
| `sparklogs.data.performance.pagefiles[].path` | string |  | In each `pagefiles` entry. |
| `sparklogs.data.performance.pagefiles[].volume` | string |  | In each `pagefiles` entry. |
| `sparklogs.data.performance.pagefiles[].bytes` | integer | bytes | In each `pagefiles` entry. |
| `sparklogs.data.performance.pagefiles[].max_bytes` | integer | bytes | In each `pagefiles` entry. |
| `sparklogs.data.performance.pagefiles[].in_use_bytes` | integer | bytes | In each `pagefiles` entry. |
| `sparklogs.data.performance.paging_stall_device` | string |  | The `storage_device` id whose read latency fed `paging_stall_ms_per_s` this window: the slowest disk under the page file holding the most pages. Absent when the stall had no measured latency to use. |
| `sparklogs.data.performance.paging_disk_latency_ms_p90_10s` | float | milliseconds | The 90th percentile, across the window's 10 s intervals, of the mean I/O latency (reads and writes) of `paging_stall_device`: whether the disk the host pages to is slow. Absent with `paging_stall_device`, and when that disk completed no I/O. |
| `sparklogs.data.performance.pagefile_write_bytes_per_s_avg` | float | bytes_per_second | Bytes per second the modified page writer wrote to the page files, exact over the window. Writes to memory-mapped files are not here. |
| `sparklogs.data.performance.pagefile_write_bytes_per_s_max_10s` | float | bytes_per_second | The highest 10 s page-file write rate in the window. |
| `sparklogs.data.performance.pagefile_write_ios_per_s_avg` | float | iops | Page-file write operations per second, exact over the window. |
| `sparklogs.data.performance.mapped_write_bytes_per_s_avg` | float | bytes_per_second | Bytes per second written back to memory-mapped files (databases, mapped I/O), exact over the window: disk work, not paging. |
| `sparklogs.data.performance.mapped_write_bytes_per_s_max_10s` | float | bytes_per_second | The highest 10 s mapped-file write rate in the window. |
| `sparklogs.data.performance.mapped_write_ios_per_s_avg` | float | iops | Mapped-file write operations per second, exact over the window. |
| `sparklogs.data.performance.page_read_bytes_per_s_avg` | float | bytes_per_second | Bytes per second read from disk to resolve hard faults, from page files and mapped files alike, exact over the window. |
| `sparklogs.data.performance.page_read_bytes_per_s_max_10s` | float | bytes_per_second | The highest 10 s paging read rate in bytes in the window. |
| `sparklogs.data.performance.page_read_ios_per_s_avg` | float | iops | Read operations per second that resolved hard faults, exact over the window. |
| `sparklogs.data.performance.page_read_ios_per_s_max_10s` | float | iops | The highest 10 s paging read operation rate in the window. |
| `sparklogs.data.performance.transition_faults_per_s_avg` | float | per_second | Faults per second resolved from the standby or modified list without a disk read, exact over the window: working sets being trimmed, an early sign of memory pressure. |
| `sparklogs.data.performance.transition_faults_per_s_max_10s` | float | per_second | The highest 10 s transition fault rate in the window. |
| `sparklogs.data.performance.paging_stall_ms_per_s_avg` | float |  | Estimated thread-milliseconds per second spent waiting on paging reads: paging read operations per second times the read latency of the disk holding the page file. 1000 is one thread blocked the whole time. Absent when that disk has no measured read latency and paging reads happened. |
| `sparklogs.data.performance.paging_stall_ms_per_s_max_10s` | float |  | The highest 10 s paging wait in the window, each interval's paging reads times the window's read latency of the page-file disk. |
| `sparklogs.data.performance.memory_paging_state` | string |  | The worst paging state of the window's 10 s intervals: `none`, `elevated` (available RAM under its bar with page-file writes active, and the paging wait at its elevated bar or the writes sustained) or `heavy` (the paging wait at its heavy bar with page-file writes and paging reads both active). Absent when an interval could not be graded and none was heavy. |
| `sparklogs.data.performance.memory_paging_state_code` | integer |  | Numeric code for `memory_paging_state`: 0 `none`, 1 `elevated`, 2 `heavy`. |
| `sparklogs.data.performance.ram_pct_time_paging_elevated` | float | percent | Percent of the window's measured time whose 10 s interval was in `elevated`. |
| `sparklogs.data.performance.ram_pct_time_paging_heavy` | float | percent | Percent of the window's measured time whose 10 s interval was in `heavy`. |
| `sparklogs.data.performance.ram_paging_stalled_min_24h` | float | minutes | Minutes in the last day this agent's captures found the host paging heavily (`memory_paging_state` `heavy`) with the page-file disk slow (`paging_disk_latency_ms_p90_10s` at its bar): the stalled state `ram_pressure` grades at Error. Each such capture counts its capture interval. Absent when no interval of the window had its paging graded. |
| `sparklogs.data.performance.ram_paging_stalled_days_7d` | integer | count | Days in the last week on which a capture found the stalled state `ram_paging_stalled_min_24h` counts, each day starting at the device's local midnight (its time zone offset at the capture; UTC when the offset was unread). Absent when no interval of the window had its paging graded. |
| `sparklogs.data.performance.system_read_ops_per_s_avg` | float | iops | System-wide read operations per second the I/O manager completed, every device and file, exact over the window. Context for the disk topics. |
| `sparklogs.data.performance.system_read_ops_per_s_max_10s` | float | iops | The highest 10 s rate of read operations per second the I/O manager completed, every device and file in the window. |
| `sparklogs.data.performance.system_write_ops_per_s_avg` | float | iops | System-wide write operations per second the I/O manager completed, exact over the window. Context for the disk topics. |
| `sparklogs.data.performance.system_write_ops_per_s_max_10s` | float | iops | The highest 10 s rate of write operations per second the I/O manager completed in the window. |
| `sparklogs.data.performance.system_other_ops_per_s_avg` | float | iops | System-wide operations per second that were neither reads nor writes (device controls and kin), exact over the window. Context for the disk topics. |
| `sparklogs.data.performance.system_other_ops_per_s_max_10s` | float | iops | The highest 10 s rate of operations per second that were neither reads nor writes (device controls and kin) in the window. |
| `sparklogs.data.performance.system_read_bytes_per_s_avg` | float | bytes_per_second | System-wide bytes per second read by every completed I/O, exact over the window. Context for the disk topics. |
| `sparklogs.data.performance.system_read_bytes_per_s_max_10s` | float | bytes_per_second | The highest 10 s rate of bytes per second read by every completed I/O in the window. |
| `sparklogs.data.performance.system_write_bytes_per_s_avg` | float | bytes_per_second | System-wide bytes per second written by every completed I/O, exact over the window. Context for the disk topics. |
| `sparklogs.data.performance.system_write_bytes_per_s_max_10s` | float | bytes_per_second | The highest 10 s rate of bytes per second written by every completed I/O in the window. |
| `sparklogs.data.performance.cpu_busy_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_busy_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_interrupt_storm_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_interrupt_storm_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_kernel_dominated_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_kernel_dominated_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.cpu_throttled_under_load_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.cpu_throttled_under_load_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.ram_commit_near_limit_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.ram_commit_near_limit_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.performance.ram_pressure_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.performance.ram_pressure_age_h` | float | hours | How long this condition has been open, in hours. |
