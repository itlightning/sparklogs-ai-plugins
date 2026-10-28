<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.device.state`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `app_crash_recurring` | `app_stability` |  |  |
| `audit_policy_changed` | `security_audit` |  |  |
| `audit_policy_coverage_reduced` | `security_audit` |  |  |
| `bios_version_changed` | `patching` |  |  |
| `boot_mode_changed` | `platform` |  |  |
| `cpu_busy` | `performance` |  |  |
| `cpu_configuration_changed` | `platform` |  |  |
| `cpu_interrupt_storm` | `performance` |  |  |
| `cpu_kernel_dominated` | `performance` |  |  |
| `cpu_throttled_under_load` | `performance` |  |  |
| `crash_dump_page_file_too_small` | `os_stability` |  |  |
| `crash_dump_type_changed` | `os_stability` |  |  |
| `data_volume_space_low` | `storage` | Informational while the volume is only low. Higher while it is still filling, and a warning once a low, filling volume is down to its last few gigabytes or percent. |  |
| `disk_brought_online` | `storage` |  |  |
| `disk_latency_degraded` | `storage` |  |  |
| `disk_partition_layout_changed` | `storage` |  |  |
| `disk_read_only_changed` | `storage` |  |  |
| `disk_saturated` | `storage` |  |  |
| `disk_taken_offline` | `storage` |  |  |
| `disk_unresponsive` | `storage` |  |  |
| `dns_lookup_redirected` | `networking` |  |  |
| `domain_membership_changed` | `platform` |  |  |
| `driver_installed` | `platform` |  |  |
| `driver_removed` | `platform` |  |  |
| `driver_updated` | `platform` |  |  |
| `hardware_identity_changed` | `platform` |  |  |
| `host_booted` | `os_stability` |  |  |
| `host_clock_stepped` | `os_stability` |  |  |
| `host_resume_settled` | `os_stability` |  |  |
| `host_role_added` | `platform` |  |  |
| `host_role_removed` | `platform` |  |  |
| `host_shutdown` | `os_stability` |  |  |
| `host_sleep_entered` | `os_stability` |  |  |
| `host_sleep_exited` | `os_stability` |  |  |
| `host_unexpected_shutdown` | `os_stability` |  |  |
| `installed_memory_changed` | `platform` |  |  |
| `installed_product_changed` | `patching` |  |  |
| `installed_product_installed` | `patching` |  |  |
| `installed_product_removed` | `patching` |  |  |
| `kernel_crash` | `os_stability` |  |  |
| `kernel_crash_recurring` | `os_stability` |  |  |
| `network_adapter_dhcp_failed` | `networking` |  |  |
| `network_adapter_disabled` | `networking` |  |  |
| `network_adapter_emulated` | `networking` |  |  |
| `network_adapter_enabled` | `networking` |  |  |
| `network_adapter_filters_changed` | `networking` |  |  |
| `network_adapter_ipv4_dhcp_changed` | `networking` |  |  |
| `network_adapter_link_downshifted` | `networking` |  |  |
| `network_adapter_metric_changed` | `networking` |  |  |
| `network_adapter_mtu_changed` | `networking` |  |  |
| `network_adapter_saturated` | `networking` |  |  |
| `network_adapter_static_address_changed` | `networking` |  |  |
| `network_adapter_static_dns_changed` | `networking` |  |  |
| `network_adapter_static_gateway_changed` | `networking` |  |  |
| `network_context_changed` | `networking` |  |  |
| `network_ipv6_broken` | `networking` |  |  |
| `network_share_added` | `file_sharing` | Notice by default; configurable from Info through Warning. |  |
| `network_share_path_changed` | `file_sharing` | Notice by default; configurable from Info through Warning. |  |
| `network_share_permissions_changed` | `file_sharing` | Notice by default; configurable from Info through Warning. |  |
| `network_share_removed` | `file_sharing` | Notice by default; configurable from Info through Warning. |  |
| `operating_system_changed` | `patching` |  |  |
| `os_clock_drift` | `performance` |  |  |
| `os_volume_space_low` | `storage` | Rises as free space runs out, and one step higher while the volume is still filling. A server's OS volume rates higher than a workstation's at the bottom bar. |  |
| `page_file_configuration_changed` | `performance` |  |  |
| `patch_scan_stale` | `patching` |  |  |
| `patch_updates_paused` | `patching` |  |  |
| `power_wake_loop` | `platform` |  |  |
| `primary_dns_suffix_changed` | `networking` |  |  |
| `process_cpu_high` | `performance` |  |  |
| `process_crash` | `app_stability` |  |  |
| `process_handle_count_high` | `performance` |  |  |
| `ram_commit_near_limit` | `performance` | Rises as commit nears the most the host can commit; Serious after an hour at the limit or once a program has crashed for lack of memory; Critical while Windows reports memory exhausted and such a crash is recent. |  |
| `ram_pressure` | `performance` | Rises from low free memory to heavy paging to paging that slows the disk; highest when that lasts hours in a day or recurs on several days. |  |
| `secure_boot_disabled` | `security_audit` |  |  |
| `secure_boot_enabled` | `security_audit` |  |  |
| `service_auto_not_running` | `app_stability` |  |  |
| `service_command_line_changed` | `security_audit` |  |  |
| `service_flapping` | `app_stability` |  |  |
| `service_installed` | `security_audit` |  |  |
| `service_logon_account_changed` | `security_audit` |  |  |
| `service_removed` | `security_audit` |  |  |
| `service_start_type_changed` | `security_audit` |  |  |
| `service_stuck_pending` | `app_stability` |  |  |
| `sparklogs_agent_cpu_over_budget` | `rmm` |  |  |
| `sparklogs_agent_handle_over_budget` | `rmm` |  |  |
| `sparklogs_agent_memory_over_budget` | `rmm` |  |  |
| `sparklogs_agent_started` | `rmm` |  |  |
| `sparklogs_agent_stopped` | `rmm` |  |  |
| `tpm_presence_changed` | `platform` |  |  |
| `tpm_version_changed` | `platform` |  |  |
| `virtualization_changed` | `platform` |  |  |
| `volume_bitlocker_protection_dropped` | `storage` |  |  |
| `volume_fill_rate_high` | `storage` |  |  |
| `volume_unreadable` | `storage` |  |  |
| `vss_snapshots_failing_for_space` | `backup` |  |  |
| `vss_writer_failed` | `backup` |  |  |
| `winhttp_proxy_changed` | `networking` |  |  |

## `app_crash_recurring`

One application is crashing repeatedly on this host.

**Impact:** Users or services depending on this application lose work or availability each time it crashes. Compare crash details across the individual crash records for the same executable to narrow the cause.

**Consider:**

- Check whether the application was recently updated or changed around when the recurrence began.
- A single crashy helper process can be excluded from escalation by its own class and tier in the process classification table.

## `audit_policy_changed`

The host's audit policy changed: more Windows Security events are audited, or the audit framework changed.

**Also reported by:** `win.eventlog.security`

**Impact:** A broader audit set means more audit volume and more coverage; nothing that was audited stopped being audited.

**Consider:**

- Compare the added subcategories against your audit policy baseline for this host's role.
- Routine management-tool churn on a workstation usually is not worth a closer look.

## `audit_policy_coverage_reduced`

The host's audit policy changed and now records fewer Windows Security events than before.

**Impact:** Less is recorded than before, so evidence a later investigation needs may never exist on this host.

**Consider:**

- Compare the removed subcategories against your audit policy baseline for this host's role.
- Audit scope reductions on a server are worth a closer look; routine management-tool churn on a workstation usually is not.

## `bios_version_changed`

The machine's BIOS or firmware version changed.

## `boot_mode_changed`

The machine now boots in a different mode, UEFI or legacy BIOS.

## `cpu_busy`

CPU is busy.

## `cpu_configuration_changed`

The machine's processor model or its number of logical processors changed.

## `cpu_interrupt_storm`

CPU time is dominated by interrupt and DPC handling.

**Impact:** Device or driver interrupt load can starve ordinary work on the host.

## `cpu_kernel_dominated`

Busy CPU time is mostly kernel work, excluding interrupts and deferred procedure calls.

**Impact:** Application throughput can be lower than the busy figure alone suggests.

## `cpu_throttled_under_load`

The CPU is running below its rated frequency while under load.

**Impact:** Work takes longer than the hardware would otherwise allow; thermal, power or firmware limits are the usual cause.

## `crash_dump_page_file_too_small`

The page file is too small for the configured crash dump.

**Impact:** A future bugcheck may fail to write the expected dump.

## `crash_dump_type_changed`

The type of memory dump the machine writes after a crash changed.

## `data_volume_space_low`

A fixed data volume is low on free space.

**Severity:** Informational while the volume is only low. Higher while it is still filling, and a warning once a low, filling volume is down to its last few gigabytes or percent.

**Impact:** Applications or shares using that volume may fail writes if free space continues to fall.

## `disk_brought_online`

A disk was brought online.

## `disk_latency_degraded`

Repeated high response time per completed IO under low directional occupancy.

**Impact:** Workloads above the storage stack may stall or time out.

## `disk_partition_layout_changed`

A disk's partition table changed.

## `disk_read_only_changed`

A disk's read-only setting changed.

## `disk_saturated`

Heavy queued load with elevated response time.

**Impact:** Workloads above the storage stack may wait on IO.

## `disk_taken_offline`

A disk was taken offline.

## `disk_unresponsive`

Outstanding IO with essentially no completions.

**Impact:** IO to this device may be stalled, and a writeable volume on it can stop responding.

## `dns_lookup_redirected`

Lookups of the monitored DNS name are answered with addresses that are not its own.

**Impact:** Names may resolve to a portal or a filter instead of their servers, so connections to them can fail or reach the wrong host.

A lookup reported as `filtered` (a filter blocks the probe domain while the resolver answers other names) does not count toward this condition and carries no DNS latency. Allow the probe domain, named in the probe data, to enable measurement of DNS latency. The answer addresses and their class are on each `network_path` probe entry (`answer_a`, `answer_aaaa`, `answer_a_class`, `answer_aaaa_class`).

## `domain_membership_changed`

The machine joined, left or moved to a different domain or workgroup.

## `driver_installed`

A driver was installed.

## `driver_removed`

A driver was removed.

## `driver_updated`

A driver's version, package date or package identity changed.

## `hardware_identity_changed`

The machine's manufacturer, model or serial number changed.

## `host_booted`

The host booted.

## `host_clock_stepped`

The host's wall clock was stepped.

## `host_resume_settled`

The host finished settling after resume.

## `host_role_added`

A host role was detected.

## `host_role_removed`

A host role is no longer detected.

## `host_shutdown`

The host started shutting down.

## `host_sleep_entered`

The host entered sleep.

## `host_sleep_exited`

The host resumed from sleep.

## `host_unexpected_shutdown`

The host restarted without a recorded clean shutdown.

## `installed_memory_changed`

The amount of memory installed in this machine changed.

## `installed_product_changed`

An installed product changed.

## `installed_product_installed`

An installed product appeared.

## `installed_product_removed`

An installed product left the inventory.

## `kernel_crash`

Windows stopped with a bug check (blue screen).

**Impact:** The host restarted unexpectedly, interrupting every user and service on it. The bug check code, its parameters and any analyzed dump are where the investigation starts.

## `kernel_crash_recurring`

The host is crashing with bug checks (blue screens) repeatedly.

**Impact:** Repeated kernel crashes interrupt every user and service on the host. The message names the bug check most of them share; a blamed driver is where the fault was reported, which is not always its cause.

## `network_adapter_dhcp_failed`

A network adapter could not get an address from DHCP.

**Impact:** The adapter has no usable IPv4 address; with no other default route, IPv6 on this adapter included, the device is offline.

## `network_adapter_disabled`

A network adapter was disabled.

## `network_adapter_emulated`

A virtual machine's network adapter is an emulated NIC model rather than the paravirtual one.

**Impact:** An emulated NIC costs the host CPU per packet and caps throughput well below the paravirtual adapter's; the Hyper-V legacy adapter is a 100 Mb/s device.

## `network_adapter_enabled`

A network adapter was enabled.

## `network_adapter_filters_changed`

A network adapter's filter drivers changed.

## `network_adapter_ipv4_dhcp_changed`

A network adapter's IPv4 DHCP setting changed.

## `network_adapter_link_downshifted`

A wired network link is running at half or less of its seven-day peak speed.

**Impact:** Network throughput on this adapter is reduced; a cable, port, dock or power policy is the usual cause.

## `network_adapter_metric_changed`

A network adapter's manual metric changed.

## `network_adapter_mtu_changed`

A network adapter's MTU changed.

## `network_adapter_saturated`

The busiest wired network link is running near its full speed.

**Impact:** Traffic on this link queues behind its capacity: transfers slow and latency rises for everything sharing it.

## `network_adapter_static_address_changed`

A network adapter's static address changed.

## `network_adapter_static_dns_changed`

A network adapter's static DNS servers changed.

## `network_adapter_static_gateway_changed`

A network adapter's static default gateway changed.

## `network_context_changed`

The device connected to a different primary network.

## `network_ipv6_broken`

IPv6 is advertised on this network but its internet echoes fail while IPv4's answer.

**Impact:** Applications that try IPv6 first can stall or time out before falling back to IPv4.

## `network_share_added`

A network share was added.

**Also reported by:** `win.eventlog.security`

**Severity:** Notice by default; configurable from Info through Warning.

## `network_share_path_changed`

The local path exposed by a network share changed.

**Severity:** Notice by default; configurable from Info through Warning.

## `network_share_permissions_changed`

A network share's permissions changed.

**Severity:** Notice by default; configurable from Info through Warning.

## `network_share_removed`

A network share was removed.

**Severity:** Notice by default; configurable from Info through Warning.

## `operating_system_changed`

The operating system changed.

## `os_clock_drift`

The host clock is drifting from reference time.

**Also reported by:** `win.eventlog.platform`

**Impact:** Kerberos, certificates, log ordering, and scheduled work can fail when drift is large.

## `os_volume_space_low`

The OS volume is low on free space.

**Severity:** Rises as free space runs out, and one step higher while the volume is still filling. A server's OS volume rates higher than a workstation's at the bottom bar.

**Impact:** Updates, logs, paging, or temporary files may be constrained if free space keeps falling.

## `page_file_configuration_changed`

The machine's page file configuration changed.

## `patch_scan_stale`

Windows Update scan data is stale.

**Impact:** Patch status may be unknown and pending updates may be missed.

## `patch_updates_paused`

Windows Updates are paused for too long.

**Impact:** Security and reliability updates may be deferred past policy intent.

## `power_wake_loop`

The machine keeps waking from sleep with nobody at it.

**Impact:** Each wake costs battery and wear, and a laptop in a bag can run hot or flat; a wake timer or a device allowed to wake the machine is the usual cause.

## `primary_dns_suffix_changed`

The machine's primary DNS suffix changed.

## `process_cpu_high`

A process is consuming CPU continuously.

**Impact:** The process can starve other work or indicate a stuck loop.

## `process_crash`

An application process crashed.

**Impact:** The process stopped on an unhandled exception, and users or services depending on it may have lost work or availability. The exception code, the faulting module and any analyzed dump narrow the cause.

## `process_handle_count_high`

A process has a very high handle count.

**Impact:** The process may be near resource limits even if growth trend is not yet visible.

## `ram_commit_near_limit`

Memory allocations on this host are close to failing, or failing.

**Severity:** Rises as commit nears the most the host can commit; Serious after an hour at the limit or once a program has crashed for lack of memory; Critical while Windows reports memory exhausted and such a crash is recent.

**Impact:** Programs can fail to start, lose work or crash when Windows cannot give them memory.

**Consider:**

- Which processes hold the most committed memory, and whether one of them is growing.
- Whether the page file can grow: a fixed maximum or a full disk caps it.

## `ram_pressure`

This host is running out of physical memory and slowing down from paging.

**Severity:** Rises from low free memory to heavy paging to paging that slows the disk; highest when that lasts hours in a day or recurs on several days.

**Impact:** Programs wait on the disk for memory they were using, so the machine feels frozen or slow.

**Consider:**

- Whether the workload has outgrown the installed memory.
- Which processes hold the most memory.

## `secure_boot_disabled`

Secure Boot was disabled.

## `secure_boot_enabled`

Secure Boot was enabled.

## `service_auto_not_running`

An automatic service is not running.

**Impact:** Expected background functionality may be unavailable until the service starts.

## `service_command_line_changed`

A service's executable, arguments or configured directory changed.

## `service_flapping`

A Windows service keeps crashing and restarting.

**Impact:** The service may be unstable, unavailable between restarts, or masking a crash loop.

## `service_installed`

A service registration appeared on this device.

**Also reported by:** `win.eventlog.security`, `win.eventlog.system`

**Consider:**

- Check nearby recorded service-install events for the installer, account and recorded time.

## `service_logon_account_changed`

A service now runs as a different account.

**Impact:** The service runs with the access of its new account, which can be more or less than before.

**Consider:**

- Read the old and new account in the change: a move to LocalSystem or to a domain account widens what the service can reach.
- Check whether an installer, an update or an administrator made the move around that time.

## `service_removed`

A previously observed service registration is absent.

## `service_start_type_changed`

A service's configured startup setting changed.

## `service_stuck_pending`

A Windows service is stuck starting or stopping.

**Impact:** The service may not be usable and SCM may need intervention.

## `sparklogs_agent_cpu_over_budget`

SparkLogs Agent CPU usage exceeds its budget.

**Impact:** Monitoring overhead may be higher than expected on this host.

## `sparklogs_agent_handle_over_budget`

SparkLogs Agent handle usage exceeds its budget.

**Impact:** Monitoring overhead may be higher than expected on this host.

## `sparklogs_agent_memory_over_budget`

Combined memory use of the SparkLogs agent and its log collector exceeds its budget.

**Impact:** Monitoring overhead may be higher than expected on this host.

## `sparklogs_agent_started`

The SparkLogs agent started.

**Also reported by:** `win.eventlog.system`

**Consider:**

- Read the span since the agent last stopped as time it was not collecting.

## `sparklogs_agent_stopped`

The SparkLogs agent stopped.

**Also reported by:** `win.eventlog.system`

**Impact:** The host is not collecting until the agent starts again.

**Consider:**

- Read the stop cause: an update or an OS shutdown is routine, an error is the agent failing.
- Read the span to the agent's next start as time it was not collecting.

## `tpm_presence_changed`

TPM availability changed.

## `tpm_version_changed`

The TPM specification version changed.

## `virtualization_changed`

The machine became virtual or physical, or moved to a different hypervisor.

## `volume_bitlocker_protection_dropped`

BitLocker protection was turned off or suspended on a volume it used to protect, and has stayed off for a day.

**Impact:** Data-at-rest protection may be reduced while the state persists.

## `volume_fill_rate_high`

A volume has a high fill rate that current capacity is absorbing.

**Impact:** Capacity trend is worth watching, but no near-term full-volume condition is claimed.

## `volume_unreadable`

A fixed volume filesystem is unavailable or unreadable.

**Impact:** Applications and data on that volume may be unavailable until storage is repaired or remounted.

## `vss_snapshots_failing_for_space`

Shadow copies are failing for want of space, so restore points are being lost.

**Also reported by:** `win.eventlog.application`, `win.eventlog.system`

**Impact:** Older restore points are being trimmed; backups themselves may still succeed, but restore history depth shrinks.

## `vss_writer_failed`

A VSS writer is failed or unstable.

**Also reported by:** `win.eventlog.application`

**Impact:** Backups depending on that writer may fail, exclude data, or fall back to crash-consistent behavior.

## `winhttp_proxy_changed`

The machine's default WinHTTP proxy changed.
