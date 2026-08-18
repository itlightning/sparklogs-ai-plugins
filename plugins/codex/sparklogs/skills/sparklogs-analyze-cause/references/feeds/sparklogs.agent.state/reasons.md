<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.agent.state`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `agent_handle_leak_trend` | `rmm` | Warning; Info when recovered |
| `agent_memory_leak_trend` | `rmm` | Warning; Info when recovered |
| `agent_memory_over_budget` | `rmm` | Warning; Info when recovered |
| `agent_over_budget` | `rmm` | Warning; Info when recovered |
| `agent_restart_flapping` | `rmm` | Warning; Info when recovered |
| `auto_service_not_running` | `app_stability` | Warning; Error for a priority service class; Info when recovered |
| `bitlocker_protection_dropped` | `storage` | Warning; Info when recovered |
| `bsod_recurring` | `os_stability` | Error; Critical at the recurrence-critical band |
| `clock_drift` | `performance` | Warning; Error past the large-drift threshold; Info when recovered |
| `cloud_unreachable` | `performance` | Error on servers; Info on workstations (offline is routine); Info when recovered |
| `cpu_busy_sustained` | `performance` | Info |
| `cpu_runaway_process` | `performance` | Warning; Info when recovered |
| `cpu_saturated_queueing` | `performance` | Notice; Info when recovered |
| `crash_dump_disabled` | `os_stability` | Warning |
| `crash_dump_new` | `os_stability` | Error |
| `data_volume_space_low` | `storage` | Info |
| `dump_pagefile_too_small` | `os_stability` | Warning |
| `fill_rate_high` | `storage` | Info |
| `handle_leak_suspected` | `performance` | Warning; Info when recovered |
| `ingest_lag` | `performance` | Error on servers; Info on workstations (spool drain after offline is routine); Info when recovered |
| `io_elevated` | `storage` | Info |
| `io_latency_severe` | `storage` | Error; Info when recovered |
| `io_saturated` | `storage` | Warning; Info when recovered |
| `memory_elevated` | `performance` | Info |
| `memory_leak_suspected` | `performance` | Warning; Error past the high RAM share band; Info when recovered |
| `memory_thrashing` | `performance` | Error; Info when recovered |
| `os_volume_space_exhausting` | `storage` | Error; Critical under the deepest free-space band; Info when recovered |
| `os_volume_space_low` | `storage` | Warning; Info when recovered |
| `process_handles_high` | `performance` | Warning; Info when recovered |
| `product_category_conflict` | `inventory` | Info |
| `reboot_pending` | `patching` | Info; Warning when stale; Error when ancient; Info when recovered |
| `rmm_agent_removed` | `inventory` | Info |
| `service_disabled` | `app_stability` | Info; Warning for a priority service class |
| `service_flapping` | `app_stability` | Warning; Info when recovered |
| `service_restarts_elevated` | `app_stability` | Info |
| `service_stuck_pending` | `app_stability` | Error; Info when recovered |
| `shadowstorage_exhausted` | `backup` | Warning; Info when recovered |
| `shadowstorage_near_cap` | `backup` | Notice; Info when recovered |
| `single_process_memory_dominant` | `performance` | Info |
| `spool_growth_runaway` | `rmm` | Warning; Error near spool cap; Info when recovered |
| `stack_cpu_elevated` | `rmm` | Info |
| `vector_restart_flapping` | `rmm` | Warning; Info when recovered |
| `volume_full_projected_24h` | `storage` | Error; Critical when the OS volume is projected full; Info when recovered |
| `volume_full_projected_7d` | `storage` | Warning; Info when recovered |
| `volume_lost` | `storage` | Severe; Info when recovered |
| `wmi_side_cost_elevated` | `rmm` | Info |
| `working_set_elevated` | `rmm` | Info |
| `writer_failed` | `backup` | Warning; Info when recovered |
| `writer_missing` | `backup` | Warning; Info when recovered |
| `writer_retries` | `backup` | Info |
| `wu_paused` | `patching` | Warning; Info when recovered |
| `wu_scan_stale` | `patching` | Warning; Error past the stale-scan error band; Info when recovered |
| `wu_service_disabled` | `patching` | Error; Info when recovered |

## `agent_handle_leak_trend`

The agent shows a handle leak trend.

**Severity:** Warning; Info when recovered

**Impact:** Agent resource usage may keep rising until restart or fix.

## `agent_memory_leak_trend`

The agent shows a memory leak trend.

**Severity:** Warning; Info when recovered

**Impact:** Agent resource usage may keep rising until restart or fix.

## `agent_memory_over_budget`

The agent stack is over memory budget.

**Severity:** Warning; Info when recovered

**Impact:** Monitoring overhead may be higher than expected on this host.

## `agent_over_budget`

The agent stack is over CPU budget.

**Severity:** Warning; Info when recovered

**Impact:** Monitoring overhead may be higher than expected on this host.

## `agent_restart_flapping`

The agent is restarting repeatedly.

**Severity:** Warning; Info when recovered

**Impact:** Signals from this host may be incomplete or delayed while the agent flaps.

## `auto_service_not_running`

An automatic service is not running.

**Severity:** Warning; Error for a priority service class; Info when recovered

**Impact:** Expected background functionality may be unavailable until the service starts.

## `bitlocker_protection_dropped`

BitLocker protection is off or suspended on a fixed volume.

**Severity:** Warning; Info when recovered

**Impact:** Data-at-rest protection may be reduced while the state persists.

## `bsod_recurring`

The host is bugchecking repeatedly.

**Severity:** Error; Critical at the recurrence-critical band

**Impact:** Repeated bugchecks can interrupt users and services and require crash-dump analysis.

## `clock_drift`

The host clock is drifting from reference time.

**Severity:** Warning; Error past the large-drift threshold; Info when recovered

**Impact:** Kerberos, certificates, log ordering, and scheduled work can fail when drift is large.

## `cloud_unreachable`

The agent cannot reach the cloud endpoint.

**Severity:** Error on servers; Info on workstations (offline is routine); Info when recovered

**Impact:** Telemetry from this host may be delayed, and current data may be incomplete.

## `cpu_busy_sustained`

CPU is busy but not queueing.

**Severity:** Info

## `cpu_runaway_process`

A process is consuming CPU continuously.

**Severity:** Warning; Info when recovered

**Impact:** The process can starve other work or indicate a stuck loop.

## `cpu_saturated_queueing`

CPU is saturated with queueing.

**Severity:** Notice; Info when recovered

**Impact:** Interactive and service workloads may be delayed while queueing persists.

## `crash_dump_disabled`

Crash dump collection is disabled.

**Severity:** Warning

**Impact:** Future bugchecks may leave no dump for root-cause analysis.

## `crash_dump_new`

A new crash dump appeared.

**Severity:** Error

**Impact:** The host recently bugchecked.

## `data_volume_space_low`

A fixed data volume is low on free space.

**Severity:** Info

**Impact:** Applications or shares using that volume may fail writes if free space continues to fall.

## `dump_pagefile_too_small`

The page file is too small for the configured crash dump.

**Severity:** Warning

**Impact:** A future bugcheck may fail to write the expected dump.

## `fill_rate_high`

A volume has a high fill rate that current capacity is absorbing.

**Severity:** Info

**Impact:** Capacity trend is worth watching, but no near-term full-volume condition is claimed.

## `handle_leak_suspected`

A process may be leaking handles.

**Severity:** Warning; Info when recovered

**Impact:** The process may eventually hit handle limits or become unstable.

## `ingest_lag`

The host has significant ingest lag.

**Severity:** Error on servers; Info on workstations (spool drain after offline is routine); Info when recovered

**Impact:** Investigations may be reading stale data from this host.

## `io_elevated`

Storage IO is elevated but still responsive.

**Severity:** Info

## `io_latency_severe`

Storage latency is severe while the disk is busy.

**Severity:** Error; Info when recovered

**Impact:** Workloads above the storage stack may stall or time out.

## `io_saturated`

Storage IO is saturated.

**Severity:** Warning; Info when recovered

**Impact:** Applications may feel slow or intermittently unresponsive while IO remains saturated.

## `memory_elevated`

Memory use is elevated without thrashing.

**Severity:** Info

## `memory_leak_suspected`

A process may be leaking memory.

**Severity:** Warning; Error past the high RAM share band; Info when recovered

**Impact:** The process can eventually exhaust memory or destabilize its workload.

## `memory_thrashing`

The host is thrashing memory.

**Severity:** Error; Info when recovered

**Impact:** Paging pressure can degrade every workload on the host.

## `os_volume_space_exhausting`

The OS volume is close to full.

**Severity:** Error; Critical under the deepest free-space band; Info when recovered

**Impact:** The host may fail updates, logging, paging, or normal service operation if the OS volume fills.

## `os_volume_space_low`

The OS volume is low on free space.

**Severity:** Warning; Info when recovered

**Impact:** Updates, logs, paging, or temporary files may be constrained if free space keeps falling.

## `process_handles_high`

A process has a very high handle count.

**Severity:** Warning; Info when recovered

**Impact:** The process may be near resource limits even if growth trend is not yet visible.

## `product_category_conflict`

Multiple protection products are installed in the same category.

**Severity:** Info

**Impact:** Overlapping protection or backup products can contend and reduce effective protection.

## `reboot_pending`

A reboot is pending.

**Severity:** Info; Warning when stale; Error when ancient; Info when recovered

**Impact:** Later installs or updates may not take effect until the host reboots.

## `rmm_agent_removed`

The RMM agent was removed from installed products.

**Severity:** Info

**Impact:** Remote management or remediation for the endpoint may be unavailable.

## `service_disabled`

A Windows service was disabled or remains disabled.

**Severity:** Info; Warning for a priority service class

**Impact:** A disabled service can remove expected application, backup, endpoint, or management functionality.

## `service_flapping`

A Windows service is flapping.

**Severity:** Warning; Info when recovered

**Impact:** The service may be unstable, unavailable between restarts, or masking a crash loop.

## `service_restarts_elevated`

A service has elevated restart activity.

**Severity:** Info

## `service_stuck_pending`

A Windows service is stuck pending.

**Severity:** Error; Info when recovered

**Impact:** The service may not be usable and SCM may need intervention.

## `shadowstorage_exhausted`

Shadow storage is exhausted and restore points are being deleted.

**Severity:** Warning; Info when recovered

**Impact:** Older restore points are being trimmed; backups themselves may still succeed, but restore history depth shrinks.

## `shadowstorage_near_cap`

Shadow storage is near capacity.

**Severity:** Notice; Info when recovered

**Impact:** Restore points may start being deleted if usage continues to rise.

## `single_process_memory_dominant`

One process dominates memory without host pressure.

**Severity:** Info

## `spool_growth_runaway`

The agent spool is growing faster than it drains.

**Severity:** Warning; Error near spool cap; Info when recovered

**Impact:** Telemetry may be delayed or at risk of later drop if the spool reaches its cap.

## `stack_cpu_elevated`

Agent stack CPU is elevated but within budget on average.

**Severity:** Info

## `vector_restart_flapping`

The shipper is restarting repeatedly.

**Severity:** Warning; Info when recovered

**Impact:** Collection can be interrupted while restart flapping continues.

## `volume_full_projected_24h`

A volume is projected to fill within 24 hours.

**Severity:** Error; Critical when the OS volume is projected full; Info when recovered

**Impact:** Capacity may be exhausted before normal maintenance can intervene.

## `volume_full_projected_7d`

A volume is projected to fill within seven days.

**Severity:** Warning; Info when recovered

**Impact:** Capacity planning is needed before the projected full date.

## `volume_lost`

A fixed volume filesystem is unavailable or unreadable.

**Severity:** Severe; Info when recovered

**Impact:** Applications and data on that volume may be unavailable until storage is repaired or remounted.

## `wmi_side_cost_elevated`

WMI side cost is elevated for the agent stack.

**Severity:** Info

## `working_set_elevated`

Agent working set is elevated.

**Severity:** Info

## `writer_failed`

A VSS writer is failed or unstable.

**Severity:** Warning; Info when recovered

**Impact:** Backups depending on that writer may fail, exclude data, or fall back to crash-consistent behavior.

## `writer_missing`

An expected VSS writer is missing.

**Severity:** Warning; Info when recovered

**Impact:** Backups for that product may lack application-consistent snapshots.

## `writer_retries`

A VSS writer retried and recovered.

**Severity:** Info

**Impact:** The backup path succeeded but may be showing early stress.

## `wu_paused`

Windows Updates are paused for too long.

**Severity:** Warning; Info when recovered

**Impact:** Security and reliability updates may be deferred past policy intent.

## `wu_scan_stale`

Windows Update scan data is stale.

**Severity:** Warning; Error past the stale-scan error band; Info when recovered

**Impact:** Patch status may be unknown and pending updates may be missed.

## `wu_service_disabled`

The Windows Update service is disabled.

**Severity:** Error; Info when recovered

**Impact:** Windows cannot scan, download, or install updates through the normal update path.
