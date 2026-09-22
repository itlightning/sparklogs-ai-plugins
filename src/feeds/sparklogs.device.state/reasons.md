<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.device.state`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `agent_cpu_over_budget` | `rmm` |  |  |
| `agent_handle_over_budget` | `rmm` |  |  |
| `agent_ram_over_budget` | `rmm` |  |  |
| `cpu_busy` | `performance` |  |  |
| `cpu_interrupt_storm` | `performance` |  |  |
| `cpu_kernel_dominated` | `performance` |  |  |
| `cpu_throttled_under_load` | `performance` |  |  |
| `disk_latency_degraded` | `storage` |  |  |
| `disk_saturated` | `storage` |  |  |
| `disk_unresponsive` | `storage` |  |  |
| `os_bsod_recurring` | `os_stability` |  |  |
| `os_clock_drift` | `performance` |  |  |
| `os_crash_dump_new` | `os_stability` |  |  |
| `os_dump_pagefile_too_small` | `os_stability` |  |  |
| `patch_scan_stale` | `patching` |  |  |
| `patch_updates_paused` | `patching` |  |  |
| `proc_cpu_runaway` | `performance` |  |  |
| `proc_handle_count_high` | `performance` |  |  |
| `ram_commit_high` | `performance` |  |  |
| `ram_hard_fault_storm` | `performance` |  |  |
| `svc_auto_not_running` | `app_stability` |  |  |
| `svc_flapping` | `app_stability` |  |  |
| `svc_stuck_pending` | `app_stability` |  |  |
| `vol_bitlocker_dropped` | `storage` |  |  |
| `vol_data_space_exhausting` | `storage` |  |  |
| `vol_data_space_low` | `storage` |  |  |
| `vol_fill_rate_high` | `storage` |  |  |
| `vol_os_space_exhausting` | `storage` |  |  |
| `vol_os_space_low` | `storage` |  |  |
| `vol_unreadable` | `storage` |  |  |
| `vss_shadowstorage_near_cap` | `backup` |  |  |
| `vss_snapshots_failing_for_space` | `backup` |  |  |
| `vss_writer_failed` | `backup` |  |  |

## `agent_cpu_over_budget`

The agent stack is over CPU budget.

**Impact:** Monitoring overhead may be higher than expected on this host.

## `agent_handle_over_budget`

The agent stack is over its handle budget.

**Impact:** Monitoring overhead may be higher than expected on this host.

## `agent_ram_over_budget`

The agent stack is over memory budget.

**Impact:** Monitoring overhead may be higher than expected on this host.

## `cpu_busy`

CPU is busy.

## `cpu_interrupt_storm`

CPU time is dominated by interrupt and DPC handling.

**Impact:** Device or driver interrupt load can starve ordinary work on the host.

## `cpu_kernel_dominated`

Busy CPU time is mostly kernel time rather than application work.

**Impact:** Application throughput can be lower than the busy figure alone suggests.

## `cpu_throttled_under_load`

The CPU is running below its rated frequency while under load.

**Impact:** Work takes longer than the hardware would otherwise allow; thermal, power or firmware limits are the usual cause.

## `disk_latency_degraded`

Storage latency is severe while the disk is busy.

**Impact:** Workloads above the storage stack may stall or time out.

## `disk_saturated`

The disk is busy, queueing and slow to respond.

**Impact:** Workloads above the storage stack may wait on IO.

## `disk_unresponsive`

A storage device is busy but moving almost no data.

**Impact:** IO to this device may be stalled, and a writeable volume on it can stop responding.

## `os_bsod_recurring`

The host is bugchecking repeatedly.

**Impact:** Repeated bugchecks can interrupt users and services and require crash-dump analysis.

## `os_clock_drift`

The host clock is drifting from reference time.

**Also reported by:** `win.eventlog.platform`

**Impact:** Kerberos, certificates, log ordering, and scheduled work can fail when drift is large.

## `os_crash_dump_new`

A new crash dump appeared.

**Impact:** The host recently bugchecked.

## `os_dump_pagefile_too_small`

The page file is too small for the configured crash dump.

**Impact:** A future bugcheck may fail to write the expected dump.

## `patch_scan_stale`

Windows Update scan data is stale.

**Impact:** Patch status may be unknown and pending updates may be missed.

## `patch_updates_paused`

Windows Updates are paused for too long.

**Impact:** Security and reliability updates may be deferred past policy intent.

## `proc_cpu_runaway`

A process is consuming CPU continuously.

**Impact:** The process can starve other work or indicate a stuck loop.

## `proc_handle_count_high`

A process has a very high handle count.

**Impact:** The process may be near resource limits even if growth trend is not yet visible.

## `ram_commit_high`

Committed memory is high.

**Also reported by:** `win.eventlog.platform`

## `ram_hard_fault_storm`

The host is thrashing memory.

**Impact:** Paging pressure can degrade every workload on the host.

## `svc_auto_not_running`

An automatic service is not running.

**Impact:** Expected background functionality may be unavailable until the service starts.

## `svc_flapping`

A Windows service is flapping.

**Impact:** The service may be unstable, unavailable between restarts, or masking a crash loop.

## `svc_stuck_pending`

A Windows service is stuck pending.

**Impact:** The service may not be usable and SCM may need intervention.

## `vol_bitlocker_dropped`

BitLocker protection is off or suspended on a fixed volume.

**Impact:** Data-at-rest protection may be reduced while the state persists.

## `vol_data_space_exhausting`

A data volume is projected to run out of space.

**Impact:** Capacity may be exhausted before normal maintenance can intervene.

## `vol_data_space_low`

A fixed data volume is low on free space.

**Impact:** Applications or shares using that volume may fail writes if free space continues to fall.

## `vol_fill_rate_high`

A volume has a high fill rate that current capacity is absorbing.

**Impact:** Capacity trend is worth watching, but no near-term full-volume condition is claimed.

## `vol_os_space_exhausting`

The OS volume is projected to run out of space.

**Impact:** The host may fail updates, logging, paging, or normal service operation if the OS volume fills.

## `vol_os_space_low`

The OS volume is low on free space.

**Impact:** Updates, logs, paging, or temporary files may be constrained if free space keeps falling.

## `vol_unreadable`

A fixed volume filesystem is unavailable or unreadable.

**Impact:** Applications and data on that volume may be unavailable until storage is repaired or remounted.

## `vss_shadowstorage_near_cap`

Shadow storage is near capacity.

**Impact:** Restore points may start being deleted if usage continues to rise.

## `vss_snapshots_failing_for_space`

Shadow copies are failing for want of space, so restore points are being lost.

**Also reported by:** `win.eventlog.application`

**Impact:** Older restore points are being trimmed; backups themselves may still succeed, but restore history depth shrinks.

## `vss_writer_failed`

A VSS writer is failed or unstable.

**Impact:** Backups depending on that writer may fail, exclude data, or fall back to crash-consistent behavior.
