<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.device.state`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `app_crash_recurring` | Application crashing repeatedly | condition | Display to Serious | `app_stability` |  |
| `audit_policy_changed` | Audit policy changed | change |  | `security_audit` |  |
| `audit_policy_coverage_reduced` | Audit coverage reduced | change |  | `security_audit` |  |
| `bios_version_changed` | BIOS version changed | change |  | `patching` |  |
| `boot_mode_changed` | Boot mode changed | change |  | `platform` |  |
| `cpu_busy` | CPU busy | condition | Display to Notice | `performance` |  |
| `cpu_configuration_changed` | CPU configuration changed | change |  | `platform` |  |
| `cpu_interrupt_storm` | CPU interrupt storm | condition | Warning to Error | `performance` |  |
| `cpu_kernel_dominated` | CPU time mostly kernel work | condition | Notice | `performance` |  |
| `cpu_throttled_under_load` | CPU throttled under load | condition | Warning to Error | `performance` |  |
| `crash_dump_page_file_too_small` | Page file too small for crash dumps | condition | Notice | `os_stability` |  |
| `crash_dump_type_changed` | Crash dump type changed | change |  | `os_stability` |  |
| `data_volume_space_low` | Data volume low on space | condition | Display to Warning | `storage` |  |
| `disk_brought_online` | Disk brought online | change |  | `storage` |  |
| `disk_latency_degraded` | Disk latency degraded | condition | Display to Error | `storage` |  |
| `disk_partition_layout_changed` | Disk partition layout changed | change |  | `storage` |  |
| `disk_read_only_changed` | Disk read-only setting changed | change |  | `storage` |  |
| `disk_saturated` | Disk saturated | condition | Display to Minor | `storage` |  |
| `disk_taken_offline` | Disk taken offline | change |  | `storage` |  |
| `disk_unresponsive` | Disk unresponsive | condition | Minor to Critical | `storage` |  |
| `dns_lookup_redirected` | DNS lookup redirected | condition | Display to Notice | `networking` |  |
| `domain_membership_changed` | Domain membership changed | change |  | `platform` |  |
| `driver_installed` | Driver installed | change |  | `platform` |  |
| `driver_removed` | Driver removed | change |  | `platform` |  |
| `driver_updated` | Driver updated | change |  | `platform` |  |
| `hardware_identity_changed` | Hardware identity changed | change |  | `platform` |  |
| `host_booted` | Host booted | occurrence |  | `os_stability` |  |
| `host_clock_stepped` | Host clock stepped | occurrence |  | `os_stability` |  |
| `host_resume_settled` | Host resume settled | occurrence |  | `os_stability` |  |
| `host_role_added` | Role detected | change |  | `platform` |  |
| `host_role_removed` | Role no longer detected | change |  | `platform` |  |
| `host_shutdown` | Host shutting down | occurrence |  | `os_stability` |  |
| `host_sleep_entered` | Host entered sleep | occurrence |  | `os_stability` |  |
| `host_sleep_exited` | Host resumed | occurrence |  | `os_stability` |  |
| `host_unexpected_shutdown` | Unexpected host shutdown | occurrence |  | `os_stability` |  |
| `installed_memory_changed` | Installed memory changed | change |  | `platform` |  |
| `installed_product_changed` | Installed product changed | change |  | `patching` |  |
| `installed_product_installed` | Installed product appeared | change |  | `patching` |  |
| `installed_product_removed` | Installed product removed | change |  | `patching` |  |
| `kernel_crash` | Windows crashed (blue screen) | occurrence |  | `os_stability` |  |
| `kernel_crash_recurring` | Repeated Windows crashes | condition | Display to Critical | `os_stability` |  |
| `kernel_driver_flapping` | Kernel driver loading repeatedly | condition | Notice | `platform` |  |
| `kernel_driver_installed` | Kernel driver installed | change |  | `platform` |  |
| `kernel_driver_installed_repeatedly` | Kernel driver installed repeatedly | condition | Display | `platform` |  |
| `kernel_driver_loaded` | Kernel driver loaded | change |  | `platform` |  |
| `kernel_driver_unloaded` | Kernel driver unloaded | change |  | `platform` |  |
| `kernel_driver_updated` | Kernel driver updated | change |  | `platform` |  |
| `network_adapter_dhcp_failed` | Network adapter DHCP failed | condition | Notice to Error | `networking` |  |
| `network_adapter_disabled` | Network adapter disabled | change |  | `networking` |  |
| `network_adapter_emulated` | Emulated network adapter | condition | Display to Notice | `networking` |  |
| `network_adapter_enabled` | Network adapter enabled | change |  | `networking` |  |
| `network_adapter_filters_changed` | Network adapter filters changed | change |  | `networking` |  |
| `network_adapter_ipv4_dhcp_changed` | Network adapter DHCP setting changed | change |  | `networking` |  |
| `network_adapter_link_downshifted` | Network link speed downshifted | condition | Notice to Warning | `networking` |  |
| `network_adapter_metric_changed` | Network adapter metric changed | change |  | `networking` |  |
| `network_adapter_mtu_changed` | Network adapter MTU changed | change |  | `networking` |  |
| `network_adapter_saturated` | Network link saturated | condition | Display to Notice | `networking` |  |
| `network_adapter_static_address_changed` | Network adapter static address changed | change |  | `networking` |  |
| `network_adapter_static_dns_changed` | Network adapter static DNS changed | change |  | `networking` |  |
| `network_adapter_static_gateway_changed` | Network adapter static gateway changed | change |  | `networking` |  |
| `network_context_changed` | Primary network changed | occurrence |  | `networking` |  |
| `network_ipv6_broken` | IPv6 broken while advertised | condition | Display to Notice | `networking` |  |
| `network_share_added` | Network share added | change |  | `file_sharing` |  |
| `network_share_path_changed` | Network share path changed | change |  | `file_sharing` |  |
| `network_share_permissions_changed` | Network share permissions changed | change |  | `file_sharing` |  |
| `network_share_removed` | Network share removed | change |  | `file_sharing` |  |
| `operating_system_changed` | Operating system changed | change |  | `patching` |  |
| `os_clock_drift` | Clock drifting | condition |  | `performance` |  |
| `os_volume_space_low` | OS volume low on space | condition | Notice to Severe | `storage` |  |
| `page_file_configuration_changed` | Page file configuration changed | change |  | `performance` |  |
| `patch_scan_stale` | Windows Update scan out of date | condition | Warning | `patching` |  |
| `patch_updates_paused` | Windows Updates paused | condition | Notice to Error | `patching` |  |
| `power_wake_loop` | Power wake loop | condition | Display | `platform` |  |
| `primary_dns_suffix_changed` | Primary DNS suffix changed | change |  | `networking` |  |
| `process_cpu_high` | Process using high CPU | condition |  | `performance` |  |
| `process_crash` | Application crashed | occurrence |  | `app_stability` |  |
| `process_handle_count_high` | Process handle count high | condition | Display | `performance` |  |
| `ram_commit_near_limit` | Memory commit near its limit | condition | Notice to Critical | `performance` |  |
| `ram_pressure` | Memory pressure slowing the host | condition | Notice to Severe | `performance` |  |
| `secure_boot_disabled` | Secure Boot disabled | change |  | `security_audit` |  |
| `secure_boot_enabled` | Secure Boot enabled | change |  | `security_audit` |  |
| `service_auto_not_running` | Automatic service not running | condition | Display to Severe | `app_stability` |  |
| `service_command_line_changed` | Service command changed | change |  | `security_audit` |  |
| `service_flapping` | Service crashing and restarting | condition | Display to Serious | `app_stability` |  |
| `service_installed` | Service installed | change |  | `security_audit` |  |
| `service_logon_account_changed` | Service account changed | change |  | `security_audit` |  |
| `service_removed` | Service removed | change |  | `security_audit` |  |
| `service_start_type_changed` | Service start type changed | change |  | `security_audit` |  |
| `service_stuck_pending` | Service stuck starting or stopping | condition | Display to Severe | `app_stability` |  |
| `sparklogs_agent_cpu_over_budget` | SparkLogs agent CPU over budget | condition | Notice | `rmm` |  |
| `sparklogs_agent_handle_over_budget` | SparkLogs agent handles over budget | condition | Notice | `rmm` |  |
| `sparklogs_agent_memory_over_budget` | SparkLogs agent memory over budget | condition | Notice | `rmm` |  |
| `sparklogs_agent_started` | SparkLogs agent started | occurrence |  | `rmm` |  |
| `sparklogs_agent_stopped` | SparkLogs agent stopped | occurrence |  | `rmm` |  |
| `tpm_presence_changed` | TPM presence changed | change |  | `platform` |  |
| `tpm_version_changed` | TPM specification changed | change |  | `platform` |  |
| `virtualization_changed` | Virtualization changed | change |  | `platform` |  |
| `volume_bitlocker_protection_dropped` | BitLocker protection dropped | condition | Notice | `storage` |  |
| `volume_fill_rate_high` | Volume filling quickly | condition | Display | `storage` |  |
| `volume_unreadable` | Volume unreadable | condition | Serious to Severe | `storage` |  |
| `vss_snapshots_failing_for_space` | Shadow copies failing for space | condition | Notice to Error | `backup` |  |
| `vss_writer_failed` | VSS writer failed | condition | Display to Warning | `backup` |  |
| `winhttp_proxy_changed` | WinHTTP proxy changed | change |  | `networking` |  |

## `app_crash_recurring`: Application crashing repeatedly

One program on this machine keeps crashing.

**Severity:** Starts at 3 crashes in 5 days, or 5 in 10 days. A program SparkLogs lists by name becomes more severe as the crashes come faster, up to the level SparkLogs sets for it, at most Serious. Any other program goes no higher than Notice, at 10 crashes in a day.

**Why it matters:** Each crash closes the program: its users lose unsaved work and start again, and a service or background job it runs stops each time.

**In practice:** The agent counts crashes per program, by executable file name, over the last several days, so a crash every day or two adds up even when no single crash looks serious. It names the newest crash's exception, faulting module and program version. The same faulting module and exception each time point at one bug, often in an add-in, a plugin or a recent update of the program. Programs SparkLogs marks as not worth reporting, and SparkLogs' own programs, do not raise it; their crashes still arrive as Application crashed events.

**What to check:**

- Whether the program, or an add-in it loads, was updated or changed around when the crashes began.
- The individual Application crashed events: whether the faulting module and exception are the same each time.
- Update, repair or reinstall the program, or remove the add-in the faulting module belongs to.

**How it ends:** Ends when the program has gone 7 days without a crash, and the machine has spent at least 2 days of that time awake with its Application log read without a gap.

**Related:**

- `kernel_crash_recurring`: Windows itself keeps crashing with blue screens.
- `process_crash`: Each crash on its own, with its faulting module and exception.

**Fields read:**

- `sparklogs.data.app_crashes.process_classified`
- `sparklogs.data.app_crashes.count_1d`
- `sparklogs.data.app_crashes.count_5d`
- `sparklogs.data.app_crashes.count_10d`
- `sparklogs.data.app_crashes.days_since_last`
- `sparklogs.data.app_crashes.quiet_awake_days`

**Example:** A vendor's helper program on a reception PC crashes three times in five days.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/app-crashes#app_crash_recurring, https://sparklogs.com/reference/reasons/app_crash_recurring.json

## `audit_policy_changed`: Audit policy changed

The machine's audit policy now records more kinds of Security events than before.

**Also reported by:** `win.eventlog.security`

**Why it matters:** Windows writes more Security events, so the Security log wraps sooner and log volume rises.

**In practice:** One or more audit subcategories now record success or failure events they did not record before, and none stopped. Group Policy, a security tool, or an administrator running `auditpol` makes this change; a new audit baseline shows it on every machine it reaches.

**What to check:**

- The added events in the event against the client's audit baseline for the machine's role.
- `auditpol /get /category:*` on the machine lists the policy in force, by subcategory name.
- The Security log's maximum size (Event Viewer, Security, Properties), if it now wraps too soon.

**Related:**

- `audit_policy_coverage_reduced`: Raised when the change stops auditing something Windows audited before.

**Example:** A new Group Policy object turns on process creation auditing on a file server, so Windows logs event 4688 for every program that starts.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/audit-policy#audit_policy_changed, https://sparklogs.com/reference/reasons/audit_policy_changed.json

## `audit_policy_coverage_reduced`: Audit coverage reduced

The machine's audit policy stopped recording some Security events it recorded before.

**Why it matters:** Events that are no longer recorded cannot be recovered later: with logon auditing off on a server, an intrusion leaves no trail of who signed in.

**In practice:** At least one audit subcategory stopped recording success or failure events, even if the same change turned others on. An attacker covering their tracks makes this change, and so do a security tool, a cleanup script, or a Group Policy edit that went wider than intended. SparkLogs also collects Security event 4719 from the same machine, which records each audit policy change; when the change was made on the machine itself, it names the account.

**What to check:**

- The removed events in the event against the client's audit baseline for the machine's role, servers and domain controllers first.
- `auditpol /get /category:*` shows the policy in force now.
- `gpresult /h <file>` shows which Group Policy object, if any, sets the audit policy.
- Restore the baseline if the change was not planned.

**Related:**

- `audit_policy_changed`: Every audit policy change, including ones that add auditing.

**Example:** Someone runs auditpol on a file server to switch off logon auditing.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/audit-policy#audit_policy_coverage_reduced, https://sparklogs.com/reference/reasons/audit_policy_coverage_reduced.json

## `bios_version_changed`: BIOS version changed

The machine's BIOS or firmware version changed.

**Why it matters:** A firmware update can bring new faults, such as blue screens, failed sleep or devices that stop working, and it can reset firmware settings such as Secure Boot, the TPM or the boot order.

**In practice:** The version string the firmware reports changed, usually from a BIOS or UEFI update by the vendor's update tool, Windows Update or a technician. It confirms that a firmware rollout reached the machine. Firmware changes take effect at a restart, so the event follows the restart that applied it.

**What to check:**

- The old and new versions in the event, against the vendor's release notes.
- Secure Boot, TPM and boot mode events around the same restart.
- For a problem that started after the update, a newer release from the vendor, or a rollback.

**Example:** Dell Command Update flashes an office OptiPlex's BIOS from 1.18.0 to 1.21.0 overnight.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#bios_version_changed, https://sparklogs.com/reference/reasons/bios_version_changed.json

## `boot_mode_changed`: Boot mode changed

The machine now boots in a different mode, UEFI or legacy BIOS.

**Why it matters:** Secure Boot and Windows 11 need UEFI boot, and a machine with BitLocker can ask for its recovery key at the first start after the switch.

**In practice:** Converting the system disk from MBR to GPT with `mbr2gpt` and switching the firmware to UEFI is the usual planned change. A firmware reset to defaults, or a technician turning on legacy boot to start an old tool, is the usual unplanned one. A machine on legacy boot reports no Secure Boot state, so a move to legacy does not also raise Secure Boot disabled. Firmware changes take effect at a restart, so the event follows the restart that applied it.

**What to check:**

- The old and new modes in the event, and whether a Windows 11 or Secure Boot project planned the change.
- `manage-bde -status` shows whether BitLocker protection is on again after the switch.
- After a move to UEFI, turn Secure Boot on.

**Example:** A technician converts a Windows 10 desktop's disk with MBR2GPT and switches it from legacy BIOS to UEFI boot ahead of a Windows 11 upgrade.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#boot_mode_changed, https://sparklogs.com/reference/reasons/boot_mode_changed.json

## `cpu_busy`: CPU busy

The CPU has been near full load for most of the last several minutes.

**Severity:** More severe when the processor queue length has also stayed at 4 or more per core for an hour.

**Why it matters:** Everything on the machine waits its turn for the CPU, so programs respond slowly and jobs run long.

**In practice:** The CPU is above 90% for 80% or more of a 5-minute stretch; short spikes do not count. The process list from the same period names what is using it: a runaway process, a security scan, an update, or a workload that has outgrown the machine.

**What to check:**

- Which processes used the most CPU in the same period.
- Whether a scheduled scan, backup or update runs at that time.
- Whether steady growth means the machine needs more cores.

**How it ends:** Ends when the CPU spends less than 70% of its time near full load, and stays that way for 20 minutes.

**Related:**

- `cpu_kernel_dominated`: Most of the busy time is Windows and its drivers, not programs.

**Fields read:**

- `sparklogs.data.performance.cpu_pct_time_over_90`
- `sparklogs.data.performance.run_queue_per_core_p90_10s`

**Example:** An antivirus full scan overlaps the nightly backup on an 8-core file server, and threads queue five deep per core.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#cpu_busy, https://sparklogs.com/reference/reasons/cpu_busy.json

## `cpu_configuration_changed`: CPU configuration changed

The machine's processor model or its number of logical processors changed.

**Why it matters:** Per-core licenses, such as SQL Server's and Windows Server's, follow the core count, and fewer logical processors leave less room for the same work.

**In practice:** On a virtual machine, a changed virtual CPU count or a move to a host with a different processor is the usual cause. On a physical machine, it is a processor swap, or a firmware setting such as hyper-threading or a core limit. Per-core figures, such as processor queue length per core, are divided by the new count from here on.

**What to check:**

- The old and new model and logical processor count in the event.
- On a virtual machine, its CPU settings in the hypervisor, and whether a migration moved it.
- On a physical machine, the hyper-threading and core settings in the firmware.
- Licensing for per-core products against the new count.

**Example:** A VMware guest running the accounting database moves to a new cluster and reports a Xeon Gold 6430 in place of its Xeon Gold 6338.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#cpu_configuration_changed, https://sparklogs.com/reference/reasons/cpu_configuration_changed.json

## `cpu_interrupt_storm`: CPU interrupt storm

CPU time is dominated by interrupt and DPC handling.

**Severity:** More severe at 45% of CPU time than at 30%.

**Why it matters:** The machine stutters: audio crackles, the pointer lags and transfers stall, while no process looks busy.

**In practice:** Windows charges time spent handling hardware interrupts and deferred procedure calls (DPCs) to no process, so Task Manager and per-process alerts miss it. A faulty or outdated driver is the usual cause, most often for a network, storage, audio or USB device or a docking station.

**What to check:**

- Drivers updated around the time it started.
- Unplug devices or undock, one at a time.
- A DPC latency tool to name the driver.

**How it ends:** Ends when servicing hardware interrupts and deferred procedure calls takes less than 20% of total CPU time for 20 minutes.

**Fields read:**

- `sparklogs.data.performance.cpu_interrupt_dpc_pct_avg`

**Example:** After a driver update, a server's network adapter spends a third of the CPU's time in interrupt handling.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#cpu_interrupt_storm, https://sparklogs.com/reference/reasons/cpu_interrupt_storm.json

## `cpu_kernel_dominated`: CPU time mostly kernel work

Busy CPU time is mostly kernel work, excluding interrupts and deferred procedure calls.

**Why it matters:** Applications get less done than the CPU figure suggests, because most of the busy time goes to Windows and its drivers.

**In practice:** File system and network filter drivers are the usual cause: antivirus, backup, encryption or data-loss-prevention agents inspecting every file or packet. Heavy paging and a misbehaving system service show the same way.

**What to check:**

- Security or storage software that changed recently.
- Whether excluding a busy application folder from scanning brings kernel time down.

**How it ends:** Ends when CPU load drops below 60%, or kernel-mode work outside interrupt handling falls below 60% of the busy time, and stays that way for 20 minutes.

**Related:**

- `cpu_interrupt_storm`: The time goes to hardware interrupts and DPCs, which no process shows.

**Fields read:**

- `sparklogs.data.performance.cpu_busy_pct_avg`
- `sparklogs.data.performance.cpu_kernel_excl_drivers_pct_of_busy_avg`

**Example:** An endpoint security agent rescans every file a build server writes: CPU sits at 84%, and 85% of that is kernel time.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#cpu_kernel_dominated, https://sparklogs.com/reference/reasons/cpu_kernel_dominated.json

## `cpu_throttled_under_load`: CPU throttled under load

A physical server's CPU is running below its rated speed while it is busy.

**Severity:** More severe the further the clock falls below rated speed.

**Why it matters:** Every job on the server takes longer, while its CPU usage looks normal.

**In practice:** The processor is busy but held below its rated speed. Typical causes are heat (blocked airflow, a failed fan, a hot server room), power (a failing power supply, power capping in the management controller) and the firmware or Windows power profile set to save power. It is raised only while the CPU is actually loaded, so idle power saving never counts, and a CPU-percentage alert cannot see it. It applies only to physical servers: on workstations a low clock under load is ordinary (battery, power plans), and virtual machines cannot see the real clock.

**What to check:**

- Fans, airflow and inlet temperature in the server's management controller (iLO, iDRAC, XClarity).
- Power supply health and any power cap set there.
- The BIOS power profile and the Windows power plan (High performance on a server).

**How it ends:** Ends when CPU load drops below 60% or the clock is back to 80% of rated speed, and stays that way for 20 minutes.

**Fields read:**

- `sparklogs.data.performance.cpu_busy_pct_avg`
- `sparklogs.data.performance.cpu_clock_pct_of_base_avg`

**Example:** A physical tower server in a hot closet with a clogged fan: at 82% CPU load its clock falls to 45% of rated speed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#cpu_throttled_under_load, https://sparklogs.com/reference/reasons/cpu_throttled_under_load.json

## `crash_dump_page_file_too_small`: Page file too small for crash dumps

The page file is too small for the configured crash dump.

**Why it matters:** After the next blue screen, Windows may not be able to write the memory dump it is set to write, which leaves the crash with a stop code and no dump to analyse.

**In practice:** Windows writes a crash dump through the page file, or through a dedicated dump file when one is set, and that space must hold the dump. The page file here is too small for the configured dump type by more than 10%, or is turned off. A complete memory dump needs about as much room as installed memory; a kernel or automatic dump needs far less. It applies only to a page file of fixed size, a page file turned off, or a dedicated dump file of set size. A page file Windows manages raises nothing, and neither do the small memory dump and "none" settings. A common cause is a page file fixed small or turned off to save disk space, often on a server set to write complete memory dumps.

**What to check:**

- The dump type and page file in System Properties, Advanced, Startup and Recovery, and Performance, Virtual Memory.
- Let Windows manage the page file size, or set a fixed size at least as large as the dump needs.
- Or choose a smaller dump type: an automatic or kernel memory dump instead of a complete one.
- A page file change takes effect after a restart.

**How it ends:** Ends when the page file falls short of the size the configured dump type needs by 10% or less.

**Fields read:**

- `sparklogs.data.crash_dump_config.pagefile_shortfall_pct`

**Example:** A 64 GB server is set to write a complete memory dump but has a fixed 32 GB page file.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/crash-dump-config#crash_dump_page_file_too_small, https://sparklogs.com/reference/reasons/crash_dump_page_file_too_small.json

## `crash_dump_type_changed`: Crash dump type changed

The type of memory dump the machine writes after a crash changed.

**Why it matters:** With dumps set to none, the next blue screen leaves no dump to analyse.

**In practice:** The setting under Startup and Recovery changed between none, small memory dump, kernel, complete and automatic. Disk cleanup and tuning scripts often set it to none, and troubleshooting a crash often sets it to complete. A complete dump needs a page file about the size of installed memory, and Page file too small for crash dumps reports when the page file is short for the type chosen.

**What to check:**

- The old and new types in the event, and restore kernel or automatic if nobody chose none.
- Startup and Recovery in System Properties (`sysdm.cpl`, Advanced tab).

**Example:** A disk cleanup script sets a desktop's crash dump type from automatic to none.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#crash_dump_type_changed, https://sparklogs.com/reference/reasons/crash_dump_type_changed.json

## `data_volume_space_low`: Data volume low on space

A fixed drive other than the Windows drive is low on free space.

**Severity:** Display while the drive is only low; Notice while it is still filling, and Warning once a filling drive is down to 2 GB or 2% free. It goes no higher.

**Why it matters:** When the drive fills, writes to it fail: file shares stop accepting files, and databases, backups and other jobs that write there error out.

**In practice:** It starts when the drive has both 10% and 10 GB free or less, so a large drive with plenty of gigabytes left is not flagged. Still filling means free space has kept falling at a rate that would fill the drive soon. Data drives often fill in bursts that end on their own, such as a restore, a new replica seeding or a large copy; steady growth comes from shares, archives, database files and backups kept too long. It applies only to writable drives of 1 GB or more: smaller vendor partitions are full by design.

**What to check:**

- What is writing to the drive now: a restore, copy, sync or backup job.
- Which folders grew, with a folder-size tool.
- Old backups, database dumps and shadow copy storage on the drive (`vssadmin list shadowstorage`).
- Expand the volume or move data once the growth is steady.

**How it ends:** Ends when the volume has either 13% or 13 GB free for 15 minutes, or becomes read-only.

**Related:**

- `volume_fill_rate_high`: Free space falling fast, however much is left; an early warning before a drive runs low.

**Fields read:**

- `sparklogs.data.disk_volumes.volume_role_code`
- `sparklogs.data.disk_volumes.free_bytes`
- `sparklogs.data.disk_volumes.free_pct`
- `sparklogs.data.disk_volumes.total_bytes`
- `sparklogs.data.disk_volumes.volume_filling`
- `sparklogs.data.disk_volumes.writeable`

**Example:** A 2 TB data drive on a file server is down to 8 GB free after a year of scanned documents.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/disk-volumes#data_volume_space_low, https://sparklogs.com/reference/reasons/data_volume_space_low.json

## `disk_brought_online`: Disk brought online

A disk was brought online.

**Why it matters:** The disk's volumes, drive letters and shares come back. A SAN or iSCSI disk online on two servers that are not clustered can have its file system corrupted.

**In practice:** An administrator (Disk Management, `diskpart`, `Set-Disk`), a script, or a failover cluster moving the disk to this node turns it online. Windows' SAN policy leaves new shared disks offline on a server until someone does this. It applies only to fixed disks, not removable media.

**What to check:**

- Whether the change was planned: a change record, a failover in Failover Cluster Manager, or a script.
- For a shared SAN or iSCSI disk, that no other server outside the cluster has it online too.
- Whether the disk is still read-only after coming online: `Get-Disk | Format-Table Number, FriendlyName, IsReadOnly`.

**Example:** The administrator brings the resized iSCSI LUN back online, and drive E: returns.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-devices#disk_brought_online, https://sparklogs.com/reference/reasons/disk_brought_online.json

## `disk_latency_degraded`: Disk latency degraded

Disk operations repeatedly take a second or more each, while only a few requests are waiting.

**Severity:** Starts at Display. On a permanently attached disk (internal, SAN or virtual, not USB) it is higher on a server, and becomes more severe as more of the last hour is slow, up to Error at 9 slow five-minute periods on a disk that holds a writable volume. Removable disks stay at Display.

**Why it matters:** Programs freeze for seconds and then catch up, and file saves, database queries and logons that use the disk can time out.

**In practice:** It opens when 3 or more of the last twelve five-minute periods were slow, and that lasts 10 minutes. A period is slow when, with only a few requests waiting, operations repeatedly average a second or more each, or an otherwise fast disk stalls for two seconds or more at a time. Slow answers with little load point at the drive or its path: a drive retrying bad sectors, a faulty cable or controller, outdated controller drivers or drive firmware, or an unstable path to SAN or iSCSI storage. A disk that is slow because of a long queue is reported as saturated, and one that stops answering as unresponsive.

**What to check:**

- The System log from the same time for disk events 7, 51 and 153 and storage controller resets (event 129); SparkLogs collects these.
- Drive health in the vendor's tool or the server's management controller, or `Get-PhysicalDisk` and `Get-StorageReliabilityCounter` in PowerShell.
- Cables and the controller, and for SAN or iSCSI storage the path and its multipath status.
- Controller driver and drive firmware against the vendor's current release.

**How it ends:** Ends when no more than 1 five-minute period in the last hour has slow disk operations, and that holds for 4 hours.

**Fields read:**

- `sparklogs.data.storage_device_io.bus_permanent`
- `sparklogs.data.storage_device_io.carries_writeable_volume`
- `sparklogs.data.storage_device_io.total_iops_avg`
- `sparklogs.data.storage_device_io.busy_pct_avg`
- `sparklogs.data.storage_device_io.read_latency_ms_avg`
- `sparklogs.data.storage_device_io.write_latency_ms_avg`
- `sparklogs.data.storage_device_io.io_pct_time_stuck`
- `sparklogs.data.storage_device_io.io_slow_window_count_1h`

**Example:** A failing NVMe drive takes two seconds per read while Windows asks it for only a couple of reads a second.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-device-io#disk_latency_degraded, https://sparklogs.com/reference/reasons/disk_latency_degraded.json

## `disk_partition_layout_changed`: Disk partition layout changed

A partition on a disk was created, deleted, resized or changed type, or the disk's partition style changed.

**Why it matters:** A deleted or shrunk partition can take its drive letter and data with it, and a moved or shrunk recovery partition can break Windows recovery.

**In practice:** The event carries the disk's whole partition table before and after, with each partition's offset, size, type and attributes (hidden, no drive letter, read-only). Disk Management, `diskpart`, PowerShell, imaging and partitioning tools and Windows setup make these changes, and a Windows update or a recovery-partition fix can resize the recovery partition. Initializing a new disk as GPT or MBR, and converting MBR to GPT, count too.

**What to check:**

- The before and after tables: which partition changed, and by how much.
- Whether it matches planned work: a disk expansion, a new disk, a Windows update or an imaging job.
- If a data partition is gone, stop writing to the disk before attempting recovery.

**Example:** A feature update shrinks the system partition to make room for a larger recovery partition.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-devices#disk_partition_layout_changed, https://sparklogs.com/reference/reasons/disk_partition_layout_changed.json

## `disk_read_only_changed`: Disk read-only setting changed

A disk's read-only setting changed.

**Why it matters:** While a disk is read-only every write to it fails: saves error with "The media is write protected", and databases, shares and logs on it stop accepting changes.

**In practice:** This is the read-only attribute of the whole disk, which `diskpart` (`attributes disk`), `Set-Disk -IsReadOnly`, storage software and Windows' SAN policy set. A SAN snapshot or replica presented to a server for a restore is often read-only. A read-only flag on one partition is reported as a partition layout change instead.

**What to check:**

- The new value, set or cleared, and whether anyone planned it.
- `Get-Disk | Format-Table Number, FriendlyName, IsReadOnly` lists it for each disk; `diskpart` `attributes disk clear readonly` clears it.
- For a SAN disk, the LUN's access setting on the array.

**Example:** The array presents a SQL server's iSCSI LUN read-only after a snapshot restore.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-devices#disk_read_only_changed, https://sparklogs.com/reference/reasons/disk_read_only_changed.json

## `disk_saturated`: Disk saturated

The disk is working flat out, with a long queue of requests and slow responses.

**Severity:** Display at first, and more severe the longer it lasts: Notice after 1 hour, higher over the following days. It reaches Minor only on a server's permanently attached disk; other fixed disks stop at Warning, and removable disks stay at Display.

**Why it matters:** Everything that reads or writes the disk waits its turn: programs open and save slowly, and on the Windows disk the whole machine feels sluggish.

**In practice:** For 15 minutes the disk has handled at least 100 operations a second or 10 MB/s, with an average of 400% or more requests in flight while busy. In at least one 10-second stretch in ten, responses average 40 ms or more on an SSD, 200 ms on a hard disk, or 100 ms when the media type is unknown. This is load on a working disk: a backup, an antivirus scan, database maintenance, a large copy, or a workload that has outgrown the drive. On a virtual machine, other guests on the same host storage can cause it too. Slow responses with only a short queue are reported as degraded latency instead, which points at the hardware.

**What to check:**

- Resource Monitor's Disk tab: which processes and files are reading and writing the disk.
- Whether a backup, scan, defragmentation or database job runs at that time; move it outside business hours.
- Performance Monitor's PhysicalDisk counters (Avg. Disk sec/Transfer, Current Disk Queue Length) over a day, to tell a burst from the normal workload.
- Faster storage, or splitting the workload across disks, when it is the normal workload.

**How it ends:** Ends when the disk keeps up for 30 minutes: in nine of every ten ten-second stretches, responses average under 40 ms on an SSD, 200 ms on a hard disk or 100 ms on other media; or the queue shortens, or the load falls below 100 operations a second and 10 MB/s. A disk that stalls is reported as slow or unresponsive instead.

**Fields read:**

- `sparklogs.data.storage_device_io.media_code`
- `sparklogs.data.storage_device_io.io_completed_count_5m`
- `sparklogs.data.storage_device_io.total_iops_avg`
- `sparklogs.data.storage_device_io.total_mb_per_s_avg`
- `sparklogs.data.storage_device_io.busy_pct_avg`
- `sparklogs.data.storage_device_io.queue_depth_avg`
- `sparklogs.data.storage_device_io.read_latency_ms_avg`
- `sparklogs.data.storage_device_io.write_latency_ms_avg`
- `sparklogs.data.storage_device_io.latency_ms_p90_10s`
- `sparklogs.data.storage_device_io.io_pct_time_stuck`
- `sparklogs.data.storage_device_io.io_slow_10s_count_5m`
- `sparklogs.data.storage_device_io.io_stall_10s_count_5m`

**Example:** Nightly database maintenance runs into business hours, and the server's SSD has 80 requests queued.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-device-io#disk_saturated, https://sparklogs.com/reference/reasons/disk_saturated.json

## `disk_taken_offline`: Disk taken offline

A disk was taken offline.

**Why it matters:** Every volume, drive letter and share on the disk disappears at once, and anything using them fails.

**In practice:** An administrator (Disk Management, `diskpart`, `Set-Disk -IsOffline`), a script, or a failover cluster moving the disk to another node takes it offline. It applies only to fixed disks, not removable media.

**What to check:**

- Whether the change was planned: a change record, a failover in Failover Cluster Manager, or a maintenance script.
- `Get-Disk | Format-Table Number, FriendlyName, IsOffline, OfflineReason` shows why each offline disk is offline.
- Bring it back with Disk Management or `Set-Disk -IsOffline $false` once the reason is understood.

**Example:** An administrator takes a SQL server's 2 TB iSCSI LUN offline to resize it on the array, and drive E: disappears.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-devices#disk_taken_offline, https://sparklogs.com/reference/reasons/disk_taken_offline.json

## `disk_unresponsive`: Disk unresponsive

The disk has requests waiting but has almost stopped completing them.

**Severity:** Minor on its own. More severe when the disk is permanently attached and holds a writable volume, and Critical when that disk is on a server and the hang lasts 30 minutes.

**Why it matters:** Anything that touches the disk hangs: programs stop responding, shares and databases on it stop answering, and on the Windows disk the whole machine freezes.

**In practice:** For 10 minutes Windows has reported the disk busy 90% or more of the time while at most 1 operation a second completes. Those few take 2 s or more on average, or requests sit outstanding with nothing completing for 50% of the time. A failed or failing drive, a controller or firmware hang, or a lost path to SAN, iSCSI or host storage is the usual cause. USB drives count too, at the lowest level. A disk that still completes work, only slowly, is reported as degraded latency or saturated.

**What to check:**

- The System log from when it started for disk errors, paging errors (event 51) and storage controller resets (event 129); SparkLogs collects these.
- For SAN or iSCSI storage: the array, switch and path status, and whether other servers on the same storage are affected.
- Drive and controller health in the vendor's tool or the server's management controller.
- A restart may bring the disk back; confirm backups of its data, then plan to repair or replace it.

**How it ends:** Ends when the disk completes requests again with none stuck and the slower of reads and writes averaging under 1 s, or goes idle, for 20 minutes.

**Fields read:**

- `sparklogs.data.storage_device_io.bus_permanent`
- `sparklogs.data.storage_device_io.carries_writeable_volume`
- `sparklogs.data.storage_device_io.total_iops_avg`
- `sparklogs.data.storage_device_io.busy_pct_avg`
- `sparklogs.data.storage_device_io.read_latency_ms_avg`
- `sparklogs.data.storage_device_io.write_latency_ms_avg`
- `sparklogs.data.storage_device_io.io_pct_time_stuck`

**Example:** An NVMe drive's firmware hangs, and the server's system disk stops completing any read or write.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/storage-device-io#disk_unresponsive, https://sparklogs.com/reference/reasons/disk_unresponsive.json

## `dns_lookup_redirected`: DNS lookup redirected

DNS lookups on this network are answered with the wrong addresses.

**Why it matters:** Names may resolve to a portal or a filter instead of their servers, so connections to them can fail or reach the wrong host.

**In practice:** The agent regularly looks up a test name whose real addresses it knows, and the answers come back with other addresses, often private ones. A captive portal on hotel or guest Wi-Fi, or a device on the network that intercepts DNS and answers with its own addresses, is the usual cause. Ping and other network checks can stay green, because the network itself is up.

**What to check:**

- Open a browser on the device: is a portal waiting for sign-in?
- The DNS servers the adapter was given.

**How it ends:** Ends when lookups return the expected public addresses again, for example once someone signs in to the portal, or when the device moves to another network.

**Fields read:**

- `sparklogs.data.performance.dns_probe_redirected`

**Example:** A consultant's laptop on hotel Wi-Fi gets a private address for every lookup until the consultant signs in to the portal 36 minutes later.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#dns_lookup_redirected, https://sparklogs.com/reference/reasons/dns_lookup_redirected.json

A lookup reported as `filtered` (a filter blocks the probe domain while the resolver answers other names) does not count toward this condition and carries no DNS latency. Allow the probe domain, named in the probe data, to enable measurement of DNS latency. The answer addresses and their class are on each `network_path` probe entry (`answer_a`, `answer_aaaa`, `answer_a_class`, `answer_aaaa_class`).

## `domain_membership_changed`: Domain membership changed

The machine joined or left an Active Directory domain or Microsoft Entra ID, or its domain or workgroup name changed.

**Why it matters:** After a change nobody planned, users cannot sign in with their domain accounts, and Group Policy, drive mappings and printers stop applying.

**In practice:** The event covers the join type (workgroup, Entra joined, Active Directory joined, or hybrid, which is both) and the domain or workgroup name. A planned join of a new machine, a move between domains, or a rebuild that left the machine in a workgroup is the usual cause.

**What to check:**

- The old and new join type and name in the event.
- `dsregcmd /status` shows the Entra and domain join state.
- `Test-ComputerSecureChannel` in PowerShell checks the machine's trust with the domain.

**Example:** A technician joins a new desktop from WORKGROUP to the corp.example.com domain.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#domain_membership_changed, https://sparklogs.com/reference/reasons/domain_membership_changed.json

## `driver_installed`: Driver installed

A device on this machine started using a driver package it did not use before.

**Why it matters:** A new driver is the first suspect when a device, a new peripheral or the whole machine starts failing soon after, including blue screens.

**In practice:** The event names the package's INF file, provider, version and date, and how many devices use it. Windows Update, a vendor's installer or update tool, and connecting new hardware are the usual sources. A driver replaced by one from a different provider shows as one removal and one install.

**What to check:**

- The install time against when the problem started.
- The provider and version against the device vendor's current release.
- The device's Driver tab in Device Manager, which shows the same version and date.

**Example:** Plugging a USB console cable into a desktop installs the FTDI serial port driver.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/drivers#driver_installed, https://sparklogs.com/reference/reasons/driver_installed.json

## `driver_removed`: Driver removed

No device on this machine uses a driver package it used before.

**Why it matters:** A device whose driver is gone stops working, or falls back to a basic Microsoft driver with less function, such as a display at low resolution.

**In practice:** The event names the package that left, with its provider, version and date, so the same version can be put back. An uninstall, a cleanup tool, Uninstall device in Device Manager, or a replacement driver from a different provider does this. A newer package from the same provider replacing the old one is reported as an update.

**What to check:**

- The device in Device Manager: is it now on a basic driver, or showing an error?
- Reinstall the named version from the vendor if the device still needs it.

**Example:** An uninstall removes the old graphics driver package, and the display falls back to a basic driver.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/drivers#driver_removed, https://sparklogs.com/reference/reasons/driver_removed.json

## `driver_updated`: Driver updated

A driver's version or date changed, or a newer package replaced it.

**Why it matters:** A driver update is the first change to rule out when a device or the whole machine starts failing soon after: blue screens, a dropped network link, a device that stops working.

**In practice:** The event carries the old and new version and date, and, when a new package replaced the old one, the package it replaced. A move to a newer version within the same package, with a date no older, is marked as maintenance and shown at Display. A new package replacing the old one, a version that went backward, or a date that moved alone stays at Notice. Windows Update, the vendor's update tool, an OEM support app or an RMM patch policy usually makes the change.

**What to check:**

- The old and new versions: a planned update, or a rollback?
- Whether the problem started after the update time.
- Roll Back Driver on the device's Driver tab in Device Manager returns to the previous version; hold it in your RMM or Windows Update policy so it is not reinstalled.

**Example:** Windows Update replaces a CAD workstation's NVIDIA display driver 31.0.15.5222 with 32.0.15.6094.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/drivers#driver_updated, https://sparklogs.com/reference/reasons/driver_updated.json

## `hardware_identity_changed`: Hardware identity changed

The machine's manufacturer, model or serial number changed.

**Why it matters:** Asset records, warranty lookups and RMM entries keyed by serial number now point at the wrong hardware, and Windows activation tied to the old hardware may need redoing.

**In practice:** The manufacturer, model or serial number the firmware reports changed under the same Windows installation. On a physical machine, a motherboard replaced under warranty or a disk moved into a new PC is the usual cause. On a virtual machine, a clone, a migration or a change to the virtual hardware is. A replacement board whose serial number was not written back can report placeholder text, such as "To be filled by O.E.M.", which the agent reports as it is.

**What to check:**

- The old and new values in the event, against the asset record.
- After a board replacement, Windows activation (`slmgr /dli`), and the vendor's tool for writing the serial number back.

**Example:** A warranty system board replacement gives an OptiPlex the new service tag 9KTB4Z3.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#hardware_identity_changed, https://sparklogs.com/reference/reasons/hardware_identity_changed.json

## `host_booted`: Host booted

The machine started, after a restart, a power-on, or a Fast Startup.

**Why it matters:** A restart nobody planned means users lost open work and the machine's services were down while it restarted.

**In practice:** The event is dated to when Windows started. The event before it says how the last run ended: Host shutting down for a clean shutdown, Unexpected host shutdown for a crash, a power loss or a reset. A start marked Fast Startup followed the default Shut down on most Windows 10 and 11 PCs: Windows restored a saved kernel, so it was not a full restart, and a driver fault that a restart clears can survive it. Restarts while the agent was not running are read back from the System log when it starts again.

**What to check:**

- The event before it: a clean shutdown or an unexpected one.
- User32 event 1074 in the System log, which SparkLogs also collects, names the program and account that asked for the restart and the reason given.
- Whether the machine restarts more often than its patch schedule explains.

**Example:** An office desktop boots again three minutes after restarting for its monthly updates.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_booted, https://sparklogs.com/reference/reasons/host_booted.json

## `host_clock_stepped`: Host clock stepped

The machine's clock jumped forward or back by ten seconds or more.

**Why it matters:** Log times on either side of the jump do not line up with each other or with other machines. Before a large correction the clock was off by that much, and Kerberos rejects sign-ins from a clock more than five minutes from the domain controller's, the Windows default.

**In practice:** Windows Time correcting a drifted clock, an administrator setting the time, or a virtual machine catching up after the hypervisor paused or restored it is the usual cause. Sleep does not count: the clock moving across a sleep is not a jump. Repeated large jumps point at a bad time source, two sources setting the clock (domain time and the hypervisor's time sync on a virtual machine), or a failing motherboard clock battery. Windows Time failing to reach its source is reported separately, from the System log.

**What to check:**

- The size and direction of the jump in the event, and the clock time on either side.
- `w32tm /query /source` and `w32tm /query /status` show where Windows takes its time from and when it last synchronized.
- On a virtual machine, whether the hypervisor's time sync and domain time both set the clock.

**Example:** Windows Time pulls a laptop's clock back four minutes after it ran fast.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_clock_stepped, https://sparklogs.com/reference/reasons/host_clock_stepped.json

## `host_resume_settled`: Host resume settled

The agent's short wait after a wake from sleep ended.

**Why it matters:** A performance, disk or network problem raised after this point is not the burst of activity that follows a wake.

**In practice:** After a wake from sleep, the agent waits a short time before it judges performance, disk and network readings, so the burst of activity that follows every resume does not open conditions. This marks when the last of those waits ended.

**What to check:**

- A problem raised soon after this point that was not there before the sleep: the power-management settings and recent updates of the network, storage and graphics drivers.

**Example:** A laptop settles 15 seconds after resuming from a night's sleep.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_resume_settled, https://sparklogs.com/reference/reasons/host_resume_settled.json

## `host_role_added`: Role detected

The machine now runs a server role SparkLogs recognizes, such as domain controller or SQL Server.

**Why it matters:** A role nobody planned, such as Hyper-V on a workstation or a DNS server on a member server, is a workload that needs patching, backup and monitoring like any server.

**In practice:** SparkLogs recognizes six roles: DNS server, domain controller, Exchange mailbox server, FSLogix profile containers, Hyper-V host and SQL Server. A role counts once its service is installed, whether or not it is running, and a domain controller is read from Windows itself. The Windows Internal Database that WSUS and other Windows roles use is not SQL Server.

**What to check:**

- The role in the event, against the machine's planned purpose.
- For an unplanned role, the installed programs, or `Get-WindowsFeature` on a server, to see what added it.

**Example:** An administrator adds the Hyper-V role to a 32-core PowerEdge file server.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#host_role_added, https://sparklogs.com/reference/reasons/host_role_added.json

## `host_role_removed`: Role no longer detected

A server role SparkLogs recognized on the machine is gone.

**Why it matters:** If nobody planned it, whatever the role served (sign-in, name resolution, virtual machines, mail, profiles or databases) is no longer on this machine.

**In practice:** The role's service was uninstalled, or the domain controller was demoted. A stopped service does not remove a role: it stays detected while its service is installed.

**What to check:**

- Whether the removal was planned: a demotion, an uninstall, or a server being retired.
- If not, what removed the service, and whether clients now fail to reach what it served.

**Example:** An administrator uninstalls SQL Server from a server whose database moved to a new one.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#host_role_removed, https://sparklogs.com/reference/reasons/host_role_removed.json

## `host_shutdown`: Host shutting down

Windows began shutting down or restarting the machine.

**Why it matters:** Users' sessions and the machine's services stop, and a server stays unavailable until it starts again.

**In practice:** Windows tells running services the machine is going down, for a restart, a shut down or a Fast Startup shut down, and the event is dated from that notice. It does not say whether the machine restarted or powered off: the next Host booted, and how long until it, does. A clean run ends with this event before the next Host booted, and a start without one is reported as Unexpected host shutdown.

**What to check:**

- User32 event 1074 in the System log, which SparkLogs also collects, names the program and account that asked for it and the reason given.
- The time to the next Host booted: how long the machine was down.

**Example:** An office desktop shuts down cleanly to restart for its monthly updates.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_shutdown, https://sparklogs.com/reference/reasons/host_shutdown.json

## `host_sleep_entered`: Host entered sleep

The machine went to sleep, into Modern Standby, or into hibernation.

**Why it matters:** While asleep the machine runs no scheduled tasks, backups or patching, and remote support cannot reach it.

**In practice:** SparkLogs reports a sleep when the machine wakes, dated to when it went to sleep, so a machine that is still asleep has no sleep event yet. Sleeps shorter than thirty seconds do not count, and a virtual machine that the hypervisor pauses or saves is not reported as asleep. For Modern Standby the event says what started it: the lid, the power button, a sleep request, the display timeout or the battery. A server, or a machine that should run overnight jobs, going to sleep points at its power plan.

**What to check:**

- The type of sleep and, for Modern Standby, the reason in the event.
- The power plan's sleep and hibernate timeouts, in Settings or `powercfg /query`.

**Example:** An accountant closes a laptop's lid, and it sleeps for fourteen hours.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_sleep_entered, https://sparklogs.com/reference/reasons/host_sleep_entered.json

## `host_sleep_exited`: Host resumed

The machine woke from sleep, Modern Standby or hibernation.

**Why it matters:** A driver that mishandles the wake leaves users with no Wi-Fi, a black screen, or a dock, display or USB device that stops working until a restart.

**In practice:** The event carries how long the machine was asleep. Problems that start right after a wake are often a driver's power management at fault, and this event dates them. Repeated wakes with nobody at the machine are the Power wake loop condition.

**What to check:**

- `powercfg /lastwake`, or Power-Troubleshooter event 1 in the System log, which SparkLogs also collects, names what woke the machine after classic sleep or hibernation.
- Driver updates for the device that fails after a wake, and the "Allow the computer to turn off this device to save power" setting on its Power Management tab in Device Manager.

**Example:** The laptop resumes the next morning after fourteen hours asleep.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_sleep_exited, https://sparklogs.com/reference/reasons/host_sleep_exited.json

## `host_unexpected_shutdown`: Unexpected host shutdown

The machine started again with no record that it shut down cleanly.

**Severity:** Warning on a server, Display on a workstation.

**Why it matters:** Users lost unsaved work, open files and databases may need repair, and the machine's services were down from the failure until it came back.

**In practice:** A blue screen, a power loss, a held power button, a dead battery, or a hypervisor resetting the virtual machine ends a run this way. The event carries the last time the machine was known to be running, and the failure came after it, sometimes well after. SparkLogs also reports the System log's own records of the same failure (event 6008 and Kernel-Power 41) as a separate unexpected shutdown event. A failure while the agent was not running is read back from the System log when it starts again.

**What to check:**

- A Windows crashed (blue screen) event near the restart: start from its bug check code.
- Repeats with no blue screen: the power supply, UPS, power cable or battery, and overheating.
- On a virtual machine, the hypervisor's log for a reset or a host failure.

**Related:**

- `kernel_crash`: A blue screen, with its stop code.

**Example:** A laptop's worn battery dies without warning, and the laptop is dark for twenty minutes.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#host_unexpected_shutdown, https://sparklogs.com/reference/reasons/host_unexpected_shutdown.json

## `installed_memory_changed`: Installed memory changed

The amount of memory installed in this machine changed.

**Why it matters:** After a drop the same work has less memory, so a machine that was fine starts paging and slows down.

**In practice:** The installed memory the firmware reports changed. The memory Windows can use, which moves with Hyper-V dynamic memory, is not compared. A drop on a physical machine can mean a memory module failed its power-on test or came loose, and the firmware stopped using it. On a virtual machine, a change to its configured memory raises it.

**What to check:**

- The old and new sizes in the event.
- For a drop nobody planned, the firmware's memory log or the server's management controller for a failed module, then reseat or replace it.

**Example:** A technician adds a second 16 GB module to a desktop, taking it from 16 to 32 GB.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#installed_memory_changed, https://sparklogs.com/reference/reasons/installed_memory_changed.json

## `installed_product_changed`: Installed product changed

An installed program's version or publisher changed.

**Why it matters:** A program that changed version just before a problem started is the first suspect for it.

**In practice:** The version or publisher the program lists in the machine's installed programs changed, most often because it updated. A plain update, same publisher and a higher version number, is recorded as routine maintenance at Display. Anything else, such as a downgrade, a new publisher, or a version written in another form, is recorded at Notice. A program whose name includes its version, as many runtimes and utilities do, usually reads as this one program changing version, with the name it had before. When another edition of the same product line stays installed beside it, such as an older Visual C++ redistributable, the upgrade can still read as a removal and an install.

**What to check:**

- The old and new version in the event against when the problem started.
- The vendor's release notes for the new version.
- For a downgrade or a publisher change nobody planned, what installed it: the Windows Installer events in the Application log, or the RMM's job history.

**Example:** Google Chrome updates itself on a desktop from 130.0.6723.92 to 131.0.6778.86.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/installed-products#installed_product_changed, https://sparklogs.com/reference/reasons/installed_product_changed.json

## `installed_product_installed`: Installed product appeared

A program appeared in the machine's list of installed programs.

**Why it matters:** Software nobody approved, such as a remote-access tool, a second antivirus or a bundled browser add-on, can let outsiders in or conflict with what the MSP manages.

**In practice:** A new entry appeared in the machine-wide list behind Programs and Features, which confirms that a deployment reached the machine. Programs installed for one user only, and Microsoft Store and MSIX apps such as the current Teams, are not in that list and do not raise it.

**What to check:**

- The name, publisher and version in the event: was it a planned deployment?
- For an unexpected remote-access or security tool, who installed it: the Windows Installer events in the Application log, or the RMM's job history.

**Example:** An RMM policy deploys a backup agent to a client's workstations.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/installed-products#installed_product_installed, https://sparklogs.com/reference/reasons/installed_product_installed.json

## `installed_product_removed`: Installed product removed

A program left the machine's list of installed programs.

**Why it matters:** When it was a security agent, backup client or remote-access tool, the machine has lost that protection or that way in, often with nobody noticing.

**In practice:** A user with admin rights, an upgrade that failed after removing the old version, or an attacker disabling protection removes a program. An upgrade that only changes the version in the program's name usually reads as a version change instead. It still shows as this removal beside an install of the new name when it renames the program otherwise, or when another edition of the same product line stays installed beside it.

**What to check:**

- Whether an install of the same product under another name came at the same time.
- For a security, backup or remote-access product, when and how it was removed: the Windows Installer events in the Application log.
- Reinstall it if the removal was not planned.

**Example:** A user uninstalls TeamViewer 15.58.5, the tool the MSP supports that desktop through.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/installed-products#installed_product_removed, https://sparklogs.com/reference/reasons/installed_product_removed.json

## `kernel_crash`: Windows crashed (blue screen)

Windows stopped with a bug check (blue screen).

**Why it matters:** The machine restarted without warning: users lost unsaved work, and on a server every share, database and remote session dropped until Windows was back.

**In practice:** At the next start Windows records the stop in the System log (Kernel-Power event 41 with a bug check code, and Windows Error Reporting event 1001). Each event is one blue screen, with its stop code and four parameters. When Windows wrote a memory dump, the agent analyses it before reporting and names the first driver on the crashing stack that is not part of Windows. That driver is where a debugger looks first, not a proven cause. With crash dumps turned off, or a dump Windows could not write, the event carries the stop code and parameters only. The stop code narrows the cause: a driver fault, failing memory or storage, overheating, or power. A power loss or a held power button leaves no stop code; SparkLogs reports that as Unexpected host shutdown.

**What to check:**

- The stop code in Microsoft's bug check code reference, and what its four parameters mean for that code.
- The blamed driver's vendor and version, and whether it, another driver or the BIOS changed shortly before the crash (Driver updated and BIOS version changed events).
- For memory, storage or hardware stop codes (0x1A, 0x7A, 0x124 and similar): Windows Memory Diagnostic, the disk's health, and hardware error events in the System log.
- Whether this machine has crashed before: Repeated Windows crashes counts them.

**Related:**

- `os_bsod`: The System log's own record of the same blue screen; count crashes from the Windows crashed (blue screen) events, one per crash.

**Example:** A laptop blue-screens with stop code 0x9F, a driver power state failure, as it goes to sleep.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/crashes#kernel_crash, https://sparklogs.com/reference/reasons/kernel_crash.json

## `kernel_crash_recurring`: Repeated Windows crashes

Windows on this machine keeps crashing with blue screens.

**Severity:** Starts at 2 blue screens in 30 days; more severe as the crashes come closer together, up to Critical at 3 in one day.

**Why it matters:** Each crash restarts the machine and loses unsaved work, so users cannot rely on it, and a server keeps dropping every connection.

**In practice:** The agent counts blue screens from the System log, so the count is right even when crash dumps are turned off. It names the stop code most of the crashes share, and the driver the newest of those crashes' dump analysis blamed. The same stop code and driver each time point at that driver, though a blamed driver can be the victim of another fault. Different stop codes with no common driver point more often at hardware: memory, storage, power or heat. Each crash also arrives as its own Windows crashed (blue screen) event, with its full details.

**What to check:**

- The newest Windows crashed (blue screen) event for the shared stop code and the blamed driver.
- Drivers, BIOS and Windows updates installed shortly before the first crash.
- When the stop codes vary: Windows Memory Diagnostic, the disk's health, hardware error events in the System log, temperatures and the power supply.

**How it ends:** Ends when the machine has gone 30 days without a blue screen, and has spent at least 5 days of that time awake with its System log read without a gap.

**Fields read:**

- `sparklogs.data.crashes.kernel_crash_count_1d`
- `sparklogs.data.crashes.kernel_crash_count_5d`
- `sparklogs.data.crashes.kernel_crash_count_10d`
- `sparklogs.data.crashes.kernel_crash_count_30d`
- `sparklogs.data.crashes.kernel_crash_days_since_last`
- `sparklogs.data.crashes.kernel_crash_quiet_awake_days`

**Example:** A workstation crashes five times in five days, most often with stop code 0x9F, a driver power state failure.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/crashes#kernel_crash_recurring, https://sparklogs.com/reference/reasons/kernel_crash_recurring.json

## `kernel_driver_flapping`: Kernel driver loading repeatedly

A kernel driver keeps loading and unloading.

**Severity:** Notice from 4 loads in an hour; it does not become more severe.

**Why it matters:** This is not normal for a driver. It is often a crashing or restarting driver or tool, and whatever depends on the driver loses it each time it goes.

**In practice:** The agent checks the loaded drivers once a minute, and past 4 loads in an hour the separate load and unload changes for this driver stop until the count falls. Security and monitoring tools restarting in a loop are a common cause. A Windows component is never reported here, but Microsoft-signed tools such as Process Monitor and Sysmon are. A driver loaded for less than about a minute is not counted; Kernel driver installed repeatedly covers those.

**What to check:**

- What loads the driver: the program or service that installed it, and whether that program is restarting.
- The driver's publisher, signer and file on its row.
- Whether Kernel driver installed repeatedly is reported too, which means something is installing the driver again and again.

**How it ends:** Ends when the driver has loaded 1 or fewer times in the past hour, and stays there for 1 hour.

**Related:**

- `kernel_driver_installed_repeatedly`: A driver installed over and over, usually too briefly to show up as a load.
- `service_flapping`: A service that keeps crashing.

**Fields read:**

- `sparklogs.data.kernel_drivers.load_count_1h`

**Example:** A security agent stuck in a restart loop loads and unloads its filter driver five times in an hour.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/kernel-drivers#kernel_driver_flapping, https://sparklogs.com/reference/reasons/kernel_driver_flapping.json

## `kernel_driver_installed`: Kernel driver installed

A kernel or file-system driver was installed on this machine.

**Why it matters:** A driver runs with full control of the machine, so a new one is the first suspect when a machine starts crashing or a security tool stops working, even if it was gone a moment later.

**In practice:** This comes from Service Control Manager event 7045 in the System log, so it reports a driver the once-a-minute check of loaded drivers never saw. The record means the driver's entry was registered, not that the driver ran. It can appear a few minutes after the install. A tool that leaves its service in place logs no record when it loads the driver again, and when one driver is installed over and over the separate changes stop, and Kernel driver installed repeatedly takes over. If the agent was not running for more than an hour, installs in that gap are not reported, though the System log still holds them.

**What to check:**

- The image path and start type on the event: a driver in a user, temp or download folder deserves a closer look.
- Whether software installed or updated at that time explains it.
- The Kernel driver loaded event for the same driver, which says whether it stayed loaded.

**Related:**

- `driver_installed`: A driver package installed for a device; one install can report both.
- `kernel_driver_installed_repeatedly`: The same driver installed again and again.
- `kernel_driver_loaded`: The driver loaded and staying.

**Example:** A hardware monitoring tool installs its driver when it starts.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/kernel-drivers#kernel_driver_installed, https://sparklogs.com/reference/reasons/kernel_driver_installed.json

## `kernel_driver_installed_repeatedly`: Kernel driver installed repeatedly

A kernel driver is being installed over and over.

**Severity:** Display from 10 installs in an hour; it does not become more severe.

**Why it matters:** Usually nothing is wrong: this is how some monitoring tools work. It matters when no tool on the machine explains it, because a driver that loads for a second can do anything a driver can.

**In practice:** Hardware monitoring and overclocking tools often install a small driver, use it for a second and remove it, once a minute. The once-a-minute check of loaded drivers misses a driver that short-lived, so this counts Service Control Manager event 7045 in the System log. Past 10 installs in an hour the separate changes stop, so the true rate is here. A tool that keeps its service in place logs no record, so it is not counted. Minifilter reinstalls are not counted: fast ones are normal security software updating itself. This is not a vulnerable-driver check.

**What to check:**

- Which program owns the driver: the name and image path on the driver's last Kernel driver installed event.
- Whether that program is meant to be on this machine.
- If it is, and your fleet runs it everywhere, turn this reason off for those machines.

**How it ends:** Ends when the driver has been installed 3 or fewer times in the past hour, and stays there for 1 hour.

**Related:**

- `kernel_driver_flapping`: A driver loading and unloading, for at least a minute at a time.
- `kernel_driver_installed`: One install of a driver.

**Fields read:**

- `sparklogs.data.kernel_drivers.install_count_1h`

**Example:** A hardware monitoring tool reinstalls its driver every minute for an hour.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/kernel-drivers#kernel_driver_installed_repeatedly, https://sparklogs.com/reference/reasons/kernel_driver_installed_repeatedly.json

## `kernel_driver_loaded`: Kernel driver loaded

A kernel or file-system driver loaded on this machine.

**Why it matters:** A driver runs with full control of the machine, so a new one is the first suspect when a machine starts crashing or a security tool stops working, and an unsigned one needs explaining.

**In practice:** The agent checks the Service Control Manager's list of loaded drivers every minute, and a load waits one more check before it is reported, so a driver loaded for less than about a minute does not appear; Kernel driver installed reports short-lived drivers. Plugging in hardware, starting a tool and installing software are the usual sources. Loads during startup are not reported. This list is what Windows reports, so it is an inventory and not a rootkit check.

**What to check:**

- The driver's file, publisher, signer and signature status on the event.
- Whether a tool someone just ran explains it: Process Monitor, a hardware utility or a hypervisor loads its driver on start.
- The Kernel driver installed event for the same driver, when it was also newly installed.

**Related:**

- `driver_installed`: A driver package installed for a device.
- `kernel_driver_installed`: The System log's record of the driver being installed.
- `kernel_driver_unloaded`: The same driver leaving.

**Example:** A technician starts Process Monitor on a server, and its driver loads.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/kernel-drivers#kernel_driver_loaded, https://sparklogs.com/reference/reasons/kernel_driver_loaded.json

## `kernel_driver_unloaded`: Kernel driver unloaded

A kernel or file-system driver unloaded from this machine.

**Why it matters:** A driver that leaves takes its function with it: a filter driver unloading can mean a security or backup tool stopped working.

**In practice:** A driver has to stay gone for a couple of minutes before this is reported, so one that reloads quickly during an update does not appear. Closing a tool, unplugging hardware and stopping a product are the usual sources.

**What to check:**

- How long it was loaded, and whether the event says the agent watched it start.
- Whether the product that owns the driver was stopped or removed on purpose.

**Related:**

- `kernel_driver_loaded`: The same driver arriving.

**Example:** Process Monitor closes after half an hour, and its driver unloads.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/kernel-drivers#kernel_driver_unloaded, https://sparklogs.com/reference/reasons/kernel_driver_unloaded.json

## `kernel_driver_updated`: Kernel driver updated

A loaded driver's file changed version or location.

**Why it matters:** A new driver version is the first suspect when a device or the whole machine starts failing soon after, including blue screens.

**In practice:** The version is read from the file on disk, checked about once an hour, so this can appear up to an hour after the file changed, and the file can be newer than the copy in memory until the driver reloads. Defender platform updates and Windows Update are the usual sources. A forward version from the same publisher, still trusted, is marked as maintenance; a move to a file Windows does not accept reads as a Warning, as such a load does.

**What to check:**

- The old and new version or path on the event.
- Windows Update history and the product's own update log for the same time.

**Related:**

- `driver_updated`: A driver package moved version.

**Example:** A graphics driver update moves the driver to a new driver store folder at a newer version.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/kernel-drivers#kernel_driver_updated, https://sparklogs.com/reference/reasons/kernel_driver_updated.json

## `network_adapter_dhcp_failed`: Network adapter DHCP failed

A network adapter could not get an address from DHCP.

**Severity:** More severe on a server, or when the machine has no other route out (IPv6 on the same adapter counts as one); most severe on a server with no other route out.

**Why it matters:** Users see "No internet" on this adapter, and when the machine has no other way out it is offline.

**In practice:** The adapter is connected with DHCP turned on, but no DHCP server answered it, so Windows gave it a self-assigned 169.254 address that cannot reach the gateway. It is raised once the adapter has held only that address for 5 minutes, so a slow lease at boot does not count. A DHCP server or relay that is down or out of addresses, a switch port on the wrong VLAN, or port security or 802.1X rejecting the device is the usual cause. It does not apply to a phone or payment terminal connected by USB, which decides for itself whether to hand out an address.

**What to check:**

- `ipconfig /all`, then `ipconfig /renew`, on the device.
- The DHCP scope: service running, free addresses, relay configured for this subnet.
- The switch port's VLAN, and any port security or 802.1X on it.
- On a server, a static address or a DHCP reservation.

**How it ends:** Ends when the adapter gets an address from a DHCP server, is given a static address, or disconnects.

**Fields read:**

- `sparklogs.data.network_adapters.ipv4_link_local_only`
- `sparklogs.data.network_adapters.default_route_elsewhere`

**Example:** A print server set to DHCP reboots while the DHCP server is down and comes back with a 169.254 address.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_dhcp_failed, https://sparklogs.com/reference/reasons/network_adapter_dhcp_failed.json

## `network_adapter_disabled`: Network adapter disabled

A network adapter was disabled.

**Why it matters:** Every connection through this adapter drops, and if it was the machine's only way out, the machine is offline.

**In practice:** Windows reports the adapter as turned off while the device is still installed, as after Disable in Network Connections or `Disable-NetAdapter`. A user troubleshooting, an administrator, a script, or VPN or security software that turns off other adapters does this. An adapter that was unplugged or removed does not raise it.

**What to check:**

- Re-enable it in Network Connections or with `Enable-NetAdapter`.
- If it keeps happening, a script, policy, or VPN or security tool that turns adapters off.

**Example:** A user troubleshooting Wi-Fi disables the Ethernet adapter in Network Connections and forgets to turn it back on.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_disabled, https://sparklogs.com/reference/reasons/network_adapter_disabled.json

## `network_adapter_emulated`: Emulated network adapter

This virtual machine's network adapter is an emulated card model, which is slower than the hypervisor's paravirtual adapter.

**Severity:** More severe on Hyper-V and VMware, which always offer a paravirtual adapter, than on other hypervisors.

**Why it matters:** File copies and other network work on the virtual machine run slowly and cost the host extra CPU for every packet; the Hyper-V legacy adapter tops out at 100 Mb/s.

**In practice:** The adapter is an emulated model the hypervisor imitates in software: Intel E1000 or E1000E, the Hyper-V legacy adapter (DEC 21140), or Realtek RTL8139. Virtual machines built from old templates, created with a Hyper-V legacy adapter, or migrated from another platform often keep one. It applies only to virtual machines, and only to an adapter that is up.

**What to check:**

- Install the hypervisor's guest tools (VMware Tools, Hyper-V integration services) so the paravirtual driver is present.
- Add a vmxnet3 adapter on VMware, a synthetic Network Adapter on Hyper-V, or virtio on KVM or Proxmox; move the IP settings to it, then remove the emulated one.

**How it ends:** Ends when the virtual machine's adapter is replaced by the hypervisor's paravirtual model, or the emulated adapter goes down, for 15 minutes.

**Fields read:**

- `sparklogs.data.network_adapters.emulated_nic`

**Example:** A file server migrated into VMware still runs on the emulated e1000e adapter its template was built with, until the administrator switches it to vmxnet3.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_emulated, https://sparklogs.com/reference/reasons/network_adapter_emulated.json

## `network_adapter_enabled`: Network adapter enabled

A network adapter was enabled.

**Why it matters:** A second adapter coming up can change which network the machine uses, or connect it to one it should not reach.

**In practice:** An adapter that was turned off in Windows was turned on again. With the disable before it, it shows how long the adapter was off. It also shows an adapter turned on that policy keeps off, such as a second network card that bridges two networks.

**What to check:**

- Whether policy expects this adapter to stay off.

**Example:** A technician re-enables an office PC's Ethernet adapter that a user disabled while troubleshooting.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_enabled, https://sparklogs.com/reference/reasons/network_adapter_enabled.json

## `network_adapter_filters_changed`: Network adapter filters changed

A network adapter's filter drivers changed.

**Why it matters:** A filter driver sees every packet on the adapter, so a faulty one drops or slows the machine's traffic.

**In practice:** A filter driver was bound to or removed from an adapter, or the order of its filters changed. VPN clients, security and web-filtering software, packet sniffers (Npcap, installed with Wireshark) and virtual switch extensions add these layers. A network problem that starts right after a software install or update often traces to a new one.

**What to check:**

- The filter names the event added or removed.
- `Get-NetAdapterBinding -Name <adapter>` lists what is bound to the adapter.
- Unbind the new filter, or uninstall its software, to test.

**Example:** Installing Wireshark binds its Npcap packet driver to a server's Ethernet adapter as a new filter layer.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_filters_changed, https://sparklogs.com/reference/reasons/network_adapter_filters_changed.json

## `network_adapter_ipv4_dhcp_changed`: Network adapter DHCP setting changed

A network adapter switched between DHCP and a static IPv4 address.

**Why it matters:** A mistyped static address, mask or gateway cuts the machine off, and a server moved to DHCP can get an address its clients and DNS records do not know.

**In practice:** The adapter's IPv4 addressing changed from automatic (DHCP) to manual, or back. A machine that lost the network after someone "set a static IP", or a server that dropped its fixed address, starts here. It covers physical adapters and virtual adapters that hold a routable address.

**What to check:**

- `ipconfig /all`: address, mask, gateway and DNS against the network's plan.
- That a new static address sits outside the DHCP scope, or has a reservation.

**Example:** An administrator moves a print server from a DHCP lease to the static address 10.20.0.20.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_ipv4_dhcp_changed, https://sparklogs.com/reference/reasons/network_adapter_ipv4_dhcp_changed.json

## `network_adapter_link_downshifted`: Network link speed downshifted

A wired network link is running far slower than its recent peak speed.

**Severity:** More severe on a server than on a workstation.

**Why it matters:** Transfers on this machine are slow while its neighbors on the same network are fine.

**In practice:** The wired link renegotiated at 50% or less of the highest speed it held recently; a gigabit port running at 100 Mb/s is the common case. A damaged cable or broken pair, a failing switch port or dock, a switch port set to a fixed lower speed, or a power-saving setting on the adapter is the usual cause. It applies only to wired adapters, because Wi-Fi speeds change all the time. A slower link also fills sooner, so the saturated-link condition can follow.

**What to check:**

- The link speed in the adapter's Status window or `Get-NetAdapter`.
- Reseat or replace the cable, then try another switch port or dock.
- The switch port's speed setting and error counters.
- Energy Efficient Ethernet or Green Ethernet in the adapter's advanced properties.

**How it ends:** Ends when the link runs faster than 50% of its recent peak speed for 15 minutes, or the adapter disconnects.

**Fields read:**

- `sparklogs.data.network_adapters.transmit_link_speed_bps`
- `sparklogs.data.network_adapters.link_speed_baseline_bps`

**Example:** A server's patch cable is crushed by a rack door, and its gigabit link renegotiates at 100 Mb/s.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_link_downshifted, https://sparklogs.com/reference/reasons/network_adapter_link_downshifted.json

## `network_adapter_metric_changed`: Network adapter metric changed

A network adapter's interface metric was set by hand, changed, or returned to automatic.

**Why it matters:** Windows prefers the adapter with the lower metric, so a change can move traffic to Wi-Fi instead of Ethernet, or into or around a VPN.

**In practice:** An administrator, script or VPN client changed the adapter's IPv4 or IPv6 interface metric, or switched it between automatic and manual. Changes Windows makes on its own to an automatic metric do not raise it. When traffic suddenly leaves by the wrong adapter, a metric change is a common cause.

**What to check:**

- `Get-NetIPInterface` shows each adapter's metric and whether it is automatic.
- `route print` shows which default route Windows uses now.

**Example:** A technician sets a docked laptop's Ethernet metric to 5 by hand, so its default route wins over Wi-Fi.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_metric_changed, https://sparklogs.com/reference/reasons/network_adapter_metric_changed.json

## `network_adapter_mtu_changed`: Network adapter MTU changed

A network adapter's MTU changed.

**Why it matters:** If switches or the far end do not carry frames of the new size, large transfers and storage traffic stall while small requests still work.

**In practice:** The adapter's MTU, the largest frame it sends, changed, most often when jumbo frames are turned on or off for iSCSI, storage or backup traffic. Every device on the path must use the same frame size, or the larger frames are dropped.

**What to check:**

- The Jumbo Packet setting in the adapter's advanced properties, or `Get-NetAdapterAdvancedProperty`.
- The MTU on each switch port and the far end on that path.
- `ping -f -l <size> <far end>` shows whether large frames get through.

**Example:** An administrator turns on jumbo frames on a Hyper-V host's iSCSI adapter, raising its MTU from 1500 to 9014 bytes.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_mtu_changed, https://sparklogs.com/reference/reasons/network_adapter_mtu_changed.json

## `network_adapter_saturated`: Network link saturated

The busiest wired network link is running near its full speed.

**Severity:** More severe at 90% of link speed than at 80%.

**Why it matters:** Traffic on this link queues behind its capacity: transfers slow and latency rises for everything sharing it.

**In practice:** The busiest wired adapter carries most of its link speed in one direction, while the machine's CPU and disk can look idle. Typical causes are a backup or large copy during business hours, a big update download, or a link that negotiated a lower speed than the switch port supports. It applies only to wired adapters on physical machines.

**What to check:**

- The process or remote host carrying the traffic.
- The negotiated link speed: a 100 Mb/s link fills ten times sooner than a gigabit one.
- Whether a backup or copy can move outside business hours.

**How it ends:** Ends when the busiest wired adapter carries less than 70% of its link speed for 15 minutes.

**Related:**

- `network_adapter_link_downshifted`: The link is running slower than its usual speed, so it fills sooner.

**Fields read:**

- `sparklogs.data.performance.busiest_nic_wired`
- `sparklogs.data.performance.busiest_nic_utilization_pct_avg`

**Example:** A 16-core file server's 1 Gbit/s link runs at 85% all afternoon, then at 96% once the nightly backup to the NAS starts.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#network_adapter_saturated, https://sparklogs.com/reference/reasons/network_adapter_saturated.json

## `network_adapter_static_address_changed`: Network adapter static address changed

A network adapter's static address changed.

**Why it matters:** Mapped drives, printers, scanners and DNS records that point at the old address stop reaching the machine, and a mistyped address or prefix length can cut it off or clash with another device.

**In practice:** A manually configured IPv4 or IPv6 address, or its prefix length, was added, removed or changed. Addresses from DHCP, router advertisements and link-local addressing do not count. It applies to physical adapters and to virtual adapters that carry a default route, such as a Hyper-V External switch's host adapter, and not to the Hyper-V Default Switch, WSL or Docker adapters that Windows readdresses itself.

**What to check:**

- The old and new addresses in the event against the network's addressing plan.
- Whether another device already uses the new address.
- DNS records and anything else that points at the old address.

**Example:** An administrator readdresses a file server from 10.20.0.15 to 10.20.0.25.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_static_address_changed, https://sparklogs.com/reference/reasons/network_adapter_static_address_changed.json

## `network_adapter_static_dns_changed`: Network adapter static DNS changed

A network adapter's manually set DNS servers changed.

**Why it matters:** The machine now resolves names through the new servers: if they are wrong or unreachable, names fail or resolve to the wrong place, and domain sign-in and Group Policy fail with them.

**In practice:** The DNS servers configured by hand on the adapter, IPv4 or IPv6, changed; servers handed out by DHCP do not count. An administrator replacing a DNS server or domain controller, a VPN or DNS-filtering tool, or malware pointing DNS at servers it controls makes this change.

**What to check:**

- The servers the event added and removed: are they the client's domain controllers or approved filter?
- `nslookup <name> <server>` against each new server.
- Unexpected servers on a machine nobody touched: look for malware or an unwanted DNS tool.

**Example:** A domain controller is replaced, and a technician points each server's DNS at the new one.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_static_dns_changed, https://sparklogs.com/reference/reasons/network_adapter_static_dns_changed.json

## `network_adapter_static_gateway_changed`: Network adapter static gateway changed

A network adapter's manually set IPv4 default gateway changed.

**Why it matters:** With a wrong gateway the machine still reaches its own subnet but nothing beyond it.

**In practice:** The IPv4 default gateway configured by hand on the adapter changed; gateways from DHCP or router advertisements do not count. An address change during a network move or router replacement usually comes with it.

**What to check:**

- The new gateway is the router for this subnet and answers ping.
- `route print` shows the default route Windows uses, and any second one on another adapter.

**Example:** A technician adds the new router as the default gateway on a server with a static address.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-adapters#network_adapter_static_gateway_changed, https://sparklogs.com/reference/reasons/network_adapter_static_gateway_changed.json

## `network_context_changed`: Primary network changed

The device connected to a different primary network.

**Why it matters:** A problem that starts right after a move (a VPN that will not connect, missing drives or printers, a proxy that stops answering) usually belongs to the new network.

**In practice:** Marks the moment a device moved to a different network, such as a laptop leaving the office LAN for home Wi-Fi. It names the adapter in use, so you can tell an undock from a Wi-Fi change.

**What to check:**

- The time of the move against when the problem started, and the adapter it names.

**Example:** A laptop is undocked at the office and reopened at home on Wi-Fi.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#network_context_changed, https://sparklogs.com/reference/reasons/network_context_changed.json

## `network_ipv6_broken`: IPv6 broken while advertised

This network gives the device IPv6 addresses, but IPv6 traffic to the internet fails while IPv4 works.

**Why it matters:** Applications that try IPv6 first can stall or time out before falling back to IPv4.

**In practice:** At least 50% of the agent's test pings to the internet over IPv6 fail while almost all of its IPv4 ones succeed. A router or firewall that advertises IPv6 without routing it is the usual cause, often after a hardware or ISP change.

**What to check:**

- The router or firewall's IPv6 route to the ISP.
- If IPv6 is not wanted, stop the router advertising it.

**How it ends:** Ends when fewer than 50% of recent IPv6 pings to the internet fail for 30 minutes. It also ends when more than 10% of IPv4 pings fail too, or the network stops routing IPv6.

**Fields read:**

- `sparklogs.data.performance.internet_probe_ipv6_fail_pct_rolling`
- `sparklogs.data.performance.internet_probe_ipv4_fail_pct_rolling`

**Example:** A branch office PC's ISP stops routing IPv6: every IPv6 echo fails while IPv4 answers, until the ISP repairs the route.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#network_ipv6_broken, https://sparklogs.com/reference/reasons/network_ipv6_broken.json

## `network_share_added`: Network share added

A network share was added.

**Also reported by:** `win.eventlog.security`

**Severity:** Notice by default; configurable from Info through Warning.

**Why it matters:** Anyone the share's permissions allow can now reach that folder or printer from the network, and an unexpected share is a common path for data exposure.

**In practice:** Windows now offers a share it did not offer before, and the event carries its local path and its share permissions. It covers folder shares, shared printers, and administrative shares that Windows creates again. A user sharing a folder from Explorer, an application or scanner setup, a backup tool, and an attacker staging data all create shares. SparkLogs also collects Security event 5142, which records the account that added a share when file share auditing is on.

**What to check:**

- The path and permissions in the event: is the folder meant to be shared, and with whom?
- `Get-SmbShareAccess -Name <share>` shows the share permissions by account name.
- The folder's NTFS permissions, which also limit what share users can do.
- Remove an unwanted share with `Remove-SmbShare -Name <share>`, or in Computer Management, Shared Folders.

**Example:** An administrator shares a Reports folder on a file server, read-only for authenticated users.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-shares#network_share_added, https://sparklogs.com/reference/reasons/network_share_added.json

## `network_share_path_changed`: Network share path changed

A network share now points at a different folder.

**Severity:** Notice by default; configurable from Info through Warning.

**Why it matters:** Users and mapped drives that open the share by name see different files, or none, and new files are saved to the new folder.

**In practice:** The share kept its name but its local path changed. Computer Management and `Set-SmbShare` cannot change a share's folder, so this is usually a share removed and created again under the same name, as during a data move to a new drive or a server migration. It also reports a path that stops being readable, or becomes readable again; the event then shows a path on one side only. A share that stays gone for a while before it comes back reads as removed, then added.

**What to check:**

- The old and new path in the event: does the new folder hold the data users expect?
- The new folder's NTFS permissions, which may differ from the old folder's.

**Example:** After a data move, the Scans share is pointed from drive E to drive F.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-shares#network_share_path_changed, https://sparklogs.com/reference/reasons/network_share_path_changed.json

## `network_share_permissions_changed`: Network share permissions changed

The share-level permissions on a network share changed.

**Severity:** Notice by default; configurable from Info through Warning.

**Why it matters:** Users can suddenly be refused when they open or save files on the share, or the share can open to people who should not reach it, such as Everyone.

**In practice:** The share permissions (Advanced Sharing, Permissions, or `Grant-SmbShareAccess` and `Revoke-SmbShareAccess`) changed, and the event carries the list before and after. Changes to the folder's NTFS permissions do not raise it, though they also decide who gets in.

**What to check:**

- `Get-SmbShareAccess -Name <share>` lists the entries now in force, by account name.
- In the event's SDDL, WD is Everyone, AU is Authenticated Users, BA is Administrators and FA is full control.
- Whether Everyone, Guest or Authenticated Users gained access, and whether the accounts that need it lost it.
- The folder's NTFS permissions, if users are still refused once the share permissions look right.

**Example:** Authenticated users lose write access to the Scans share, and the office scanner can no longer save to it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-shares#network_share_permissions_changed, https://sparklogs.com/reference/reasons/network_share_permissions_changed.json

## `network_share_removed`: Network share removed

A network share was removed.

**Severity:** Notice by default; configurable from Info through Warning.

**Why it matters:** Mapped drives, scan-to-folder and applications that use the share fail with "The network name cannot be found".

**In practice:** The share is gone from both the shares Windows offers and its saved share list, and has stayed gone, so a share removed and quickly created again does not raise it. A renamed share reads as this share removed and a new one added. Decommissioning, a data move, cleanup by an administrator or script, and hardening that turns off the administrative shares (C$, ADMIN$) are the usual causes.

**What to check:**

- Whether a share was added under another name, or on another server, at the same time.
- Mapped drives, scanner profiles and application settings that still point at it.
- If it was removed by mistake, create it again with the path and permissions the event carries.

**Example:** A decommissioning script removes the Scans share from an old file server.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-shares#network_share_removed, https://sparklogs.com/reference/reasons/network_share_removed.json

## `operating_system_changed`: Operating system changed

The Windows edition, version, build or update revision changed.

**Severity:** Display for a monthly update that changes only the build or revision, Notice for a feature update or an edition change.

**Why it matters:** An update can bring new faults, or break a driver or application that worked before it.

**In practice:** A monthly cumulative update changes the revision, a feature update such as 23H2 to 24H2 changes the version and build, and an edition change such as Pro to Enterprise changes the edition. The event confirms that a patch or upgrade reached the machine.

**What to check:**

- The old and new values in the event.
- For a problem that started after it, the update history in Settings, Windows Update, and the known issues Microsoft lists for that release.
- For an edition change nobody planned, the machine's license and activation (`slmgr /dli`).

**Example:** The 24H2 feature update moves a desktop from build 22631.4317 to 26100.2033.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#operating_system_changed, https://sparklogs.com/reference/reasons/operating_system_changed.json

## `os_clock_drift`: Clock drifting

The host clock is drifting from reference time.

**Also reported by:** `win.eventlog.platform`

**Why it matters:** Kerberos, certificates, log ordering, and scheduled work can fail when drift is large.

## `os_volume_space_low`: OS volume low on space

The drive Windows runs from is low on free space.

**Severity:** Starts at 15% and 10 GB free; more severe as space runs lower, and one step higher while the drive is still filling. At the lowest level a server's Windows drive rates higher than a workstation's.

**Why it matters:** Windows updates fail to install, user profiles fail to load, and programs crash or cannot save once the Windows drive runs out.

**In practice:** Both the share and the gigabytes left must be low, so a large drive with plenty of room is not flagged. Still filling means free space has kept falling at a rate that would soon fill the drive. The usual consumers are update leftovers (the update cache, a previous Windows installation after a feature update), user profiles and Downloads folders, old logs and crash dumps, and the page and hibernation files. On a server, application logs or databases installed on the Windows drive are common too.

**What to check:**

- Disk Cleanup with "Clean up system files", which removes update leftovers and the previous Windows installation.
- The size of `%SystemRoot%\SoftwareDistribution`, `%SystemRoot%\Temp`, crash dumps and each user profile.
- Profiles of users who no longer sign in (System Properties, Advanced, User Profiles).
- `DISM /Online /Cleanup-Image /StartComponentCleanup` to shrink the component store.
- `powercfg /hibernate off` on a server or desktop that never hibernates.

**How it ends:** Ends when the Windows volume has either 18% or 13 GB free for 10 minutes.

**Related:**

- `volume_fill_rate_high`: Free space falling fast, however much is left; an early warning before a drive runs low.

**Fields read:**

- `sparklogs.data.disk_volumes.volume_role_code`
- `sparklogs.data.disk_volumes.free_bytes`
- `sparklogs.data.disk_volumes.free_pct`
- `sparklogs.data.disk_volumes.volume_filling`

**Example:** A 256 GB laptop drive is down to 9 GB free after a feature update left the previous Windows installation behind.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/disk-volumes#os_volume_space_low, https://sparklogs.com/reference/reasons/os_volume_space_low.json

## `page_file_configuration_changed`: Page file configuration changed

The machine's page file configuration changed.

**Why it matters:** A page file that is too small, or removed, lowers how much memory Windows can promise programs, so they fail or crash sooner, and Windows may not be able to write a crash dump.

**In practice:** The page file's location, its initial or maximum size, or whether Windows manages its size changed, or the page file was removed. Tuning scripts that fix a small size, moving it to a data drive, and turning it off to save disk space are the usual causes. Memory commit near its limit and Page file too small for crash dumps report the effects.

**What to check:**

- The old and new settings in the event, as Windows stores them: the path, then the initial and maximum size in MB.
- Turn "Automatically manage paging file size for all drives" back on (System Properties, Advanced, Performance, Virtual memory), unless someone chose a size for a reason.

**Example:** A tuning script replaces a 32 GB desktop's system-managed page file with a fixed 2 GB one.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#page_file_configuration_changed, https://sparklogs.com/reference/reasons/page_file_configuration_changed.json

## `patch_scan_stale`: Windows Update scan out of date

Windows Update has not checked for updates in a long time, or never has.

**Why it matters:** The machine finds no new updates, so it falls behind on security fixes while patch reports can still show it as current.

**In practice:** Windows Update's last successful search for updates is 14 days old or more, or Windows Update reports it has never searched. It is raised once that has held for 12 hours while the agent is running, so a machine that was switched off for weeks has time to catch up. A disabled or broken Windows Update service, a proxy or firewall blocking the update servers, or a WSUS server named in policy that no longer exists is the usual cause.

**What to check:**

- The Windows Update service's start type, which SparkLogs reports with the machine's Windows Update state: a disabled service never searches.
- Settings, Windows Update, Check for updates, and the error it shows.
- The WSUS server in policy (`WUServer` under `HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate`) still exists and answers.
- The machine's WinHTTP proxy (`netsh winhttp show proxy`).
- `Get-WindowsUpdateLog` writes the Windows Update log to the desktop, for the error behind a failing search.

**How it ends:** Ends when the last completed Windows Update scan is less than 14 days old.

**Fields read:**

- `sparklogs.data.windows_update_agent_state.last_scan_age_h`
- `sparklogs.data.windows_update_agent_state.wu_never_searched`

**Example:** A laptop that reaches the internet only through a retired proxy has not checked for updates in a month.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/windows-update-agent-state#patch_scan_stale, https://sparklogs.com/reference/reasons/patch_scan_stale.json

## `patch_updates_paused`: Windows Updates paused

Someone paused Windows Update on this machine, and it has stayed paused.

**Severity:** Starts at Notice; more severe the longer the pause lasts, reaching Error at 14 days.

**Why it matters:** Until the pause ends, the machine installs no updates, security fixes included.

**In practice:** The pause was set with Pause updates in Settings, Windows Update, and has lasted 1 day or more. Users pause updates to avoid a restart and forget to resume them.

**What to check:**

- Resume updates in Settings, Windows Update.
- If a restart was the reason, schedule one with the user.
- On Windows 10 1809 and later, the Group Policy Remove access to "Pause updates" feature (Computer Configuration, Administrative Templates, Windows Components, Windows Update, Manage end user experience) stops users pausing.

**How it ends:** Ends when Windows Update is resumed, or the pause in force is less than 1 day old.

**Fields read:**

- `sparklogs.data.windows_update_agent_state.updates_paused`
- `sparklogs.data.windows_update_agent_state.updates_paused_age_h`

**Example:** A user paused updates three weeks ago to avoid a restart before a presentation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/windows-update-agent-state#patch_updates_paused, https://sparklogs.com/reference/reasons/patch_updates_paused.json

## `power_wake_loop`: Power wake loop

The machine keeps waking from sleep with nobody at it.

**Why it matters:** A laptop comes out of a bag hot or with a flat battery, and a desktop that should sleep is found awake.

**In practice:** The machine has woken by itself, with nobody at it, 8 or more times in every hour for 2 hours. A wake timer from a scheduled task or an update, a network adapter allowed to wake the machine, or a mouse or USB device is the usual cause.

**What to check:**

- `powercfg /lastwake` and `powercfg /waketimers` name the source.
- `powercfg /devicequery wake_armed` lists the devices allowed to wake the machine.

**How it ends:** Ends after 2 hours with no unattended wake.

**Fields read:**

- `sparklogs.data.performance.power_wake_loop_held_min`
- `sparklogs.data.performance.power_unattended_wake_quiet_min`

**Example:** A laptop in a backpack wakes about eight times an hour for four hours because its network adapter is allowed to wake the machine.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#power_wake_loop, https://sparklogs.com/reference/reasons/power_wake_loop.json

## `primary_dns_suffix_changed`: Primary DNS suffix changed

The machine's primary DNS suffix changed.

**Why it matters:** Windows registers the machine's name under the new suffix and tries that suffix first when completing short names, so other machines can stop finding it by its old full name and short names can stop resolving.

**In practice:** Windows takes the primary DNS suffix from the machine's domain when it joins one, from the Group Policy "Primary DNS suffix" setting, or from System Properties, Computer Name, More. A domain join, a move to another domain, or a policy rolled out during a merger or migration is the usual cause. Changes to the DNS suffix search list, or to an adapter's own connection-specific suffix, do not raise it.

**What to check:**

- The old and new suffix in the event against the client's domain name.
- `ipconfig /all` shows the Primary Dns Suffix and the search list in use.
- Whether a Group Policy object sets it (Computer Configuration, Administrative Templates, Network, DNS Client, Primary DNS suffix): `gpresult /h <file>`.
- `ipconfig /registerdns`, then the DNS zones: a record under the new suffix, and a stale one left under the old.

**Example:** A PC moves from the example.local domain to corp.example.com, and its primary DNS suffix follows.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-config#primary_dns_suffix_changed, https://sparklogs.com/reference/reasons/primary_dns_suffix_changed.json

## `process_cpu_high`: Process using high CPU

A process is consuming CPU continuously.

**Why it matters:** The process can starve other work or indicate a stuck loop.

## `process_crash`: Application crashed

A program on this machine crashed.

**Why it matters:** The program closed without warning: its user lost unsaved work, and a service it ran stopped until it was restarted.

**In practice:** Windows logs Application Error event 1000 when a program stops on an error it did not handle; each event is one crash. It names the exception code, the module the fault was in, and the program's version; a .NET program also reports its exception type and stack. The faulting module often matters more than the program: a printer driver, an Office add-in or a security product's library loaded into the program makes the program look broken. When Windows kept a local dump of the crash, the agent analyses it and names the first module on the crashing stack outside the Windows folder. A program that crashes again and again also raises Application crashing repeatedly.

**What to check:**

- The faulting module: its vendor, its version, and whether it changed recently.
- Whether the same module appears in crashes on other machines.
- Update or remove the add-in or plugin the faulting module belongs to, or update the program.

**Example:** An accounting app crashes with an access violation inside a third-party add-in each time a user prints.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/crashes#process_crash, https://sparklogs.com/reference/reasons/process_crash.json

## `process_handle_count_high`: Process handle count high

A process has a very high handle count.

**Why it matters:** A process that keeps leaking handles slowly uses up kernel memory the whole machine shares, and in the end it fails to open files, registry keys or network connections.

**In practice:** The process has held 1,000,000 or more handles for 5 minutes. Each handle is a file, registry key, thread or other object the process opened; a leaking process keeps opening them without closing them. Busy healthy programs (a database, a browser, an antivirus engine) hold tens of thousands, so a count in the millions points to a leak. For a process that hosts services, such as svchost.exe, the event lists them, which names the service to look at. Display is its only level.

**What to check:**

- Task Manager, Details tab, with the Handles column added: whether the count keeps rising.
- Sysinternals Handle or Process Explorer, to see which type of object is piling up.
- The Performance Monitor counters Memory\Pool Paged Bytes and Memory\Pool Nonpaged Bytes, for the cost to the rest of the machine.
- Restart the program or service to free the handles for now; a vendor update is the fix.

**How it ends:** Ends when the process holds fewer than 800,000 handles for 10 minutes, or the process exits.

**Fields read:**

- `sparklogs.data.processes.handle_count`

**Example:** A service inside svchost.exe leaks handles for weeks until it holds more than a million.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/processes#process_handle_count_high, https://sparklogs.com/reference/reasons/process_handle_count_high.json

## `ram_commit_near_limit`: Memory commit near its limit

Memory allocations on this host are close to failing, or failing.

**Severity:** More severe the closer Task Manager's Committed figure gets to its maximum; Serious after an hour at the limit or once a program has crashed because it ran out of memory; Critical while Windows reports that virtual memory is exhausted and such a crash is recent.

**Why it matters:** Programs can fail to start, lose work or crash when Windows cannot give them memory.

**In practice:** Windows refuses new memory once the total it has promised to programs reaches what RAM and the page files can back. That can happen with physical memory to spare, so a RAM-usage alert stays quiet while Task Manager still shows free RAM. The limit here is the most Windows can allow once the page file has grown as far as it can, which can be higher than the limit Task Manager shows today. A process whose memory keeps growing (a leak) is the usual cause.

**What to check:**

- Which processes hold the most committed memory, and whether one of them is growing.
- Whether the page file can grow: a fixed maximum or a full disk caps it.
- Restart or update the growing process; a larger page file buys time.

**How it ends:** Ends when committed memory drops below 86% of the most Windows can commit, with Windows no longer flagging commit as nearly exhausted, for 30 minutes.

**Related:**

- `ram_pressure`: The machine is slow because it is paging; memory can run out for programs without any paging.

**Fields read:**

- `sparklogs.data.performance.commit_pct_of_reachable_max`
- `sparklogs.data.performance.commit_exhausted`
- `sparklogs.data.performance.commit_at_error_min`
- `sparklogs.data.performance.ram_oom_crash_count_24h`
- `sparklogs.data.performance.ram_oom_crash_age_min`
- `sparklogs.data.performance.ram_exhaustion_report_age_min`

**Example:** A line-of-business app leaks memory all morning on a 32 GB server, pushing commit to 92% of what RAM and the page file can back.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#ram_commit_near_limit, https://sparklogs.com/reference/reasons/ram_commit_near_limit.json

## `ram_pressure`: Memory pressure slowing the host

This host is running out of physical memory and slowing down from paging.

**Severity:** Starts when Available memory in Task Manager falls below 5%; more severe once Windows is paging heavily in both directions, and again when that paging slows the disk; most severe when that lasts hours in a day or recurs on several days.

**Why it matters:** Programs wait on the disk for memory they were using, so the machine feels frozen or slow.

**In practice:** Physical memory has run low, and Windows is moving memory to and from the page file, so programs wait on the disk for data they were using. A busy file server whose memory is full of cached files does not trip it: reading files is not paging.

**What to check:**

- Whether the workload has outgrown the installed memory.
- Which processes hold the most memory.
- Close or move a memory-heavy workload, or add RAM.

**How it ends:** Ends when available memory is back to 8% or more and paging is back to normal, for 1 hour.

**Related:**

- `ram_commit_near_limit`: Programs are close to being refused memory, which can happen while the machine still feels fast.

**Fields read:**

- `sparklogs.data.performance.ram_available_pct`
- `sparklogs.data.performance.paging_disk_latency_ms_p90_10s`
- `sparklogs.data.performance.memory_paging_state_code`
- `sparklogs.data.performance.ram_paging_stalled_min_24h`
- `sparklogs.data.performance.ram_paging_stalled_days_7d`

**Example:** An 8 GB server running a database beside a line-of-business app drops to 4% free memory.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/performance#ram_pressure, https://sparklogs.com/reference/reasons/ram_pressure.json

## `secure_boot_disabled`: Secure Boot disabled

Secure Boot was disabled.

**Why it matters:** The machine boots unsigned boot loaders again, so a bootkit can load before Windows and its security software.

**In practice:** Secure Boot was switched off in the firmware setup, usually by a technician starting an older tool, a Linux USB stick or another operating system, who did not switch it back on. A firmware update or a reset to defaults can also turn it off. BitLocker that checks Secure Boot asks for its recovery key at the next start. Firmware changes take effect at a restart, so the event follows the restart that applied it.

**What to check:**

- Whether a technician planned it, and turn Secure Boot back on in the firmware setup once the work is done.
- `Confirm-SecureBootUEFI` in an administrator PowerShell shows the current state.

**Example:** A technician disables Secure Boot to start a recovery USB stick and does not turn it back on.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#secure_boot_disabled, https://sparklogs.com/reference/reasons/secure_boot_disabled.json

## `secure_boot_enabled`: Secure Boot enabled

Secure Boot was enabled.

**Why it matters:** Unsigned boot loaders and older boot tools stop starting, and BitLocker can ask for its recovery key at the first start after the change.

**In practice:** Secure Boot was switched on in firmware, often in a Windows 11 upgrade or a hardening baseline, or by a firmware reset to defaults. Firmware changes take effect at a restart, so the event follows the restart that applied it.

**What to check:**

- Whether a project planned it.
- A boot tool or second operating system that no longer starts needs a signed version.

**Example:** After converting a desktop to UEFI boot, a technician turns Secure Boot on ahead of its Windows 11 upgrade.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#secure_boot_enabled, https://sparklogs.com/reference/reasons/secure_boot_enabled.json

## `service_auto_not_running`: Automatic service not running

A service set to start automatically has stopped with an error and stayed down.

**Severity:** More severe the longer it stays down and the more the service matters: an important service shows within 30 minutes, a critical one is Warning within 15 minutes, and an ordinary one rises past Display only on a server.

**Why it matters:** Whatever the service provides is gone: printing, backups, antivirus or remote management, depending on the service, while the machine itself looks healthy.

**In practice:** The service's last stop carried a nonzero exit code, and nothing has started it again. A service that stopped cleanly (exit code 0) does not count, nor does a trigger-start service, which Windows starts only when something asks for it. A delayed-start service is given a grace period after boot, and time the machine spends asleep or off does not count toward how long it has been down. A service that keeps crashing and coming back is reported as crashing instead, and one hung while starting or stopping as stuck. A few updater services that stop with an error by design are not reported.

**What to check:**

- The exit code in the event, and the Service Control Manager events in the System log for the service (7000, 7023, 7024, 7031, 7034), which SparkLogs collects.
- Start it from Services or with `sc start <name>`, and watch whether it stays up.
- If it fails to start again: the services it depends on (`sc qc <name>`) and whether its logon account's password changed.

**How it ends:** Ends when the service runs again, stops without an error, or is no longer set to start automatically, for 10 minutes. A service that hangs while starting or stopping is reported as stuck instead.

**Related:**

- `service_flapping`: Keeps crashing and restarting.
- `service_stuck_pending`: Hung while starting or stopping.

**Fields read:**

- `sparklogs.data.services.service_tier_code`
- `sparklogs.data.services.current_state_code`
- `sparklogs.data.services.svc_stopped_age_min`
- `sparklogs.data.services.svc_pending_stalled`
- `sparklogs.data.services.auto_start`
- `sparklogs.data.services.has_triggers`
- `sparklogs.data.services.delayed_in_boot_grace`
- `sparklogs.data.services.stopped_with_an_error`
- `sparklogs.data.services.svc_crash_count_24h`

**Example:** The Print Spooler stops with an error after a bad printer driver loads, and nobody can print.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_auto_not_running, https://sparklogs.com/reference/reasons/service_auto_not_running.json

## `service_command_line_changed`: Service command changed

The command Windows runs to start a service changed: its program path or its arguments.

**Why it matters:** The next time the service starts, Windows runs the new command with the service's account and privileges.

**In practice:** Updates often move a service to a new versioned folder under the vendor's install directory. A new path in a folder ordinary users can write to (Temp, a user profile, much of ProgramData), a script host such as `cmd.exe` or `powershell.exe`, or a program the client does not use is how attackers take over a trusted service. The event shows the old and new command as the registry stores it, with environment variables such as `%SystemRoot%` not expanded.

**What to check:**

- Compare the old and new command: the same vendor folder with a new version number is an update.
- The new program's publisher and signature (file Properties, Digital Signatures; or `Get-AuthenticodeSignature` in PowerShell).
- Whether that product was installed or updated around the same time.

**Example:** An upgrade of the Veeam Agent moves its service to a new versioned folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_command_line_changed, https://sparklogs.com/reference/reasons/service_command_line_changed.json

## `service_flapping`: Service crashing and restarting

A Windows service keeps crashing and restarting.

**Severity:** More severe with more crashes in the past day, and sooner for a service that matters more; it shows from 2 crashes in a day.

**Why it matters:** Users lose the service for a moment at each crash: print jobs vanish, connections drop, and work in progress inside the service is lost.

**In practice:** Windows records each crash in the System log as Service Control Manager event 7031, or 7034 when the service has no recovery action set, and the count is of those events over the past day. The service's recovery settings or another program start it again, so a check of its state usually finds it running. A bad update, a faulty driver or plug-in loaded into the service (printer drivers in the Print Spooler are a common one), damaged configuration or a failing dependency is the usual cause. A service that crashes and stays down is reported as not running once the crashes stop.

**What to check:**

- Application Error event 1000 for the service's program names the faulting module, and the same module every time points at one bug.
- What changed before the first crash: an update, a new driver or a plug-in.
- `sc qfailure <name>` shows what Windows does after each crash.

**How it ends:** Ends when the service has crashed 1 or fewer times in the past day, and stays there for 12 hours.

**Related:**

- `service_auto_not_running`: Stopped with an error and stayed down.
- `service_stuck_pending`: Hung while starting or stopping.

**Fields read:**

- `sparklogs.data.services.service_tier_code`
- `sparklogs.data.services.svc_crash_count_24h`

**Example:** A faulty printer driver crashes the Print Spooler six times in a day, and Windows restarts it each time.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_flapping, https://sparklogs.com/reference/reasons/service_flapping.json

## `service_installed`: Service installed

A new Windows service was registered on this device.

**Also reported by:** `win.eventlog.security`, `win.eventlog.system`

**Why it matters:** A service runs with nobody signed in and starts again after every restart, often as LocalSystem, so an unwanted one gives its program lasting, privileged access.

**In practice:** Software installs and updates add services all the time. Remote-access tools and malware install services to survive restarts too. The event shows the new service's start type, the account it runs as and its command. Services already present when the agent was installed are not reported, and nor are the per-user copies Windows creates at each sign-in.

**What to check:**

- System event 7045, which SparkLogs collects, records the same install with its time. Security event 4697 also names the account that installed it, when security system extension auditing is on.
- Whether the program is a product the client uses: its path, publisher and signature.

**Related:**

- `service_removed`: A service was removed from the machine.

**Example:** Installing a backup agent registers its service to start automatically.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_installed, https://sparklogs.com/reference/reasons/service_installed.json

## `service_logon_account_changed`: Service account changed

A service now runs as a different account.

**Why it matters:** The service runs with the access of its new account, which can be more or less than before.

**In practice:** Planned work moves services to a dedicated or managed service account. An unplanned move to LocalSystem or to an administrator account gives the service's program that account's access, and so anyone who can replace the program. Windows applies the new account the next time the service starts. The event shows the old and new account.

**What to check:**

- Read the old and new account in the change: a move to LocalSystem or to a domain account widens what the service can reach.
- Check whether an installer, an update or an administrator made the move around that time.

**Related:**

- `service_installed`: A new service, with the account it runs as.

**Example:** A DBA moves SQL Server from its virtual service account to a domain service account so backups can reach a network share.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_logon_account_changed, https://sparklogs.com/reference/reasons/service_logon_account_changed.json

## `service_removed`: Service removed

A Windows service was removed from this device.

**Why it matters:** What the service did stops for good. A removed security, backup or RMM service leaves the machine unprotected, unbacked-up or unmanaged.

**In practice:** An uninstall, or an update that replaces one service with another, is the usual cause. A security, backup or RMM service removed with no planned change can mean someone is removing protection. The event shows the service's last start type, account and command. The per-user copies Windows creates and removes at each sign-in are not reported.

**What to check:**

- Whether software was uninstalled or updated at the same time.
- Whether an application the client uses relied on the service.

**Related:**

- `service_installed`: A new service was registered on the machine.

**Example:** Uninstalling the old backup agent removes its service.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_removed, https://sparklogs.com/reference/reasons/service_removed.json

## `service_start_type_changed`: Service start type changed

A service's startup type changed, for example from Automatic to Disabled.

**Why it matters:** A service set to Disabled or Manual stops starting at boot, so what it provides goes missing after the next restart.

**In practice:** Hardening scripts, Group Policy and troubleshooting change startup types on purpose. Malware sets security and update services to Disabled. The event shows the old and new startup type: Automatic, Automatic (Delayed Start), Manual or Disabled. Windows changes BITS, IsolationSession and TrustedInstaller on its own, and those changes are not reported.

**What to check:**

- The new value: Disabled on a security, backup, update or RMM service needs an explanation.
- System event 7040 from the Service Control Manager records the change.
- `gpresult /h <file>` shows whether a Group Policy sets this service's startup.

**Example:** A hardening script sets the Print Spooler to disabled, and a branch office loses printing.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_start_type_changed, https://sparklogs.com/reference/reasons/service_start_type_changed.json

## `service_stuck_pending`: Service stuck starting or stopping

A Windows service is stuck starting or stopping.

**Severity:** More severe the longer it stays stuck and the more the service matters; a critical service is Warning within 15 minutes, and an ordinary one rises past Display only on a server.

**Why it matters:** The service does not work, Services cannot start, stop or restart it, and services that depend on it wait behind it.

**In practice:** The service sits in Starting, Stopping, Pausing or Continuing, with the same process, and its reported progress does not move. A hung dependency, a network resource the service waits for, or an update that left the service half-configured is the usual cause. A trigger-start service waiting in Starting for its trigger is not stuck, and time the machine spends asleep does not count. Windows's own events 7011 and 7022 for a slow service are common on healthy machines and do not open this condition by themselves.

**What to check:**

- What the process is waiting on: `sc queryex <name>` gives its PID, and Resource Monitor's Analyze Wait Chain shows what blocks it.
- The services it depends on (`sc qc <name>`) and whether they are running.
- End the process (`taskkill /pid <pid> /f`) and start the service again; if the process is a shared `svchost.exe`, the other services in it stop too.

**How it ends:** Ends when the service settles as running, stopped or paused for 30 minutes. A trigger-start service waiting in Starting for its trigger counts as settled.

**Related:**

- `service_auto_not_running`: Stopped with an error and stayed down.
- `service_flapping`: Keeps crashing and restarting.

**Fields read:**

- `sparklogs.data.services.service_tier_code`
- `sparklogs.data.services.current_state_code`
- `sparklogs.data.services.svc_pending_stalled`
- `sparklogs.data.services.svc_pending_stalled_age_min`
- `sparklogs.data.services.has_triggers`

**Example:** After a failed patch install, the Windows Update service hangs in Starting for half an hour.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/services#service_stuck_pending, https://sparklogs.com/reference/reasons/service_stuck_pending.json

## `sparklogs_agent_cpu_over_budget`: SparkLogs agent CPU over budget

The SparkLogs agent is using more CPU than its budget.

**Severity:** Notice; it goes no higher.

**Why it matters:** On a busy machine, the CPU the agent uses is taken from the client's programs.

**In practice:** The agent process has averaged 20% of one CPU core or more for 3 minutes. The agent is built to stay under this budget, so going over it is unexpected. Its log collector's CPU does not count here, because reading and sending logs is the collector's job. The agent's first few minutes after it starts are not judged.

**What to check:**

- The SparkLogsAgent process's CPU in Task Manager's Details tab, to see whether it is still high.
- If it keeps happening, report it to SparkLogs support with the device name.

**How it ends:** Ends when the agent process averages under 16% of one CPU core for 6 minutes.

**Fields read:**

- `sparklogs.data.agent_overhead.cpu_pct_of_one_core_avg`

**Example:** An application starts writing thousands of log events a minute, and reading them takes more than a full CPU core.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/agent-overhead#sparklogs_agent_cpu_over_budget, https://sparklogs.com/reference/reasons/sparklogs_agent_cpu_over_budget.json

## `sparklogs_agent_handle_over_budget`: SparkLogs agent handles over budget

The SparkLogs agent is holding more open handles than its budget.

**Severity:** Notice; it goes no higher.

**Why it matters:** Every open handle holds kernel memory, so a count far above normal takes memory from the client's programs.

**In practice:** The agent process has averaged 4,000 or more open handles for 3 minutes. The agent normally holds far fewer, so going over the budget is unexpected. Its log collector's handles do not count here.

**What to check:**

- The Handles column for the SparkLogsAgent process in Task Manager's Details tab, to see whether the count is still high or still rising.
- If it keeps happening, report it to SparkLogs support with the device name.

**How it ends:** Ends when the agent process averages fewer than 3,200 open handles for 6 minutes.

**Fields read:**

- `sparklogs.data.agent_overhead.handle_count_avg`

**Example:** A software install drops hundreds of new log files at once, and the agent's handle count passes 4,000 for a few minutes.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/agent-overhead#sparklogs_agent_handle_over_budget, https://sparklogs.com/reference/reasons/sparklogs_agent_handle_over_budget.json

## `sparklogs_agent_memory_over_budget`: SparkLogs agent memory over budget

The SparkLogs agent and its log collector together use more memory than their budget.

**Severity:** Notice; it goes no higher.

**Why it matters:** On a machine short of memory, the agent's memory competes with the client's programs and adds to paging.

**In practice:** The agent and its log collector together have averaged 350 MB of memory (working set) or more for 2 minutes. Both count, because they draw on the same physical memory. The agent is built to stay under this budget, so going over it is unexpected.

**What to check:**

- The Working set column for the SparkLogsAgent and SparkLogsVector processes in Task Manager's Details tab, to see whether it is still high.
- Whether the machine is also short of memory: SparkLogs raises its own low-memory conditions for that.
- If it keeps happening, report it to SparkLogs support with the device name.

**How it ends:** Ends when the agent and its log collector together average under 280 MB of memory for 4 minutes.

**Fields read:**

- `sparklogs.data.agent_overhead.combined_working_set_avg_mb`

**Example:** During a burst of log volume after a server restart, the agent and its log collector together reach 382 MB.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/agent-overhead#sparklogs_agent_memory_over_budget, https://sparklogs.com/reference/reasons/sparklogs_agent_memory_over_budget.json

## `sparklogs_agent_started`: SparkLogs agent started

The SparkLogs agent started.

**Also reported by:** `win.eventlog.system`

**Severity:** Notice when the agent's previous run ended without recording its stop, Display otherwise.

**Why it matters:** The agent took no performance or device readings between its last stop and this start.

**In practice:** The agent starts with Windows, after its own update, or when someone starts the service. A start whose previous run left no stop record means the agent crashed, was ended, or went down with the machine. An Unexpected host shutdown just before it says it was the machine.

**What to check:**

- The previous SparkLogs agent stopped event and its cause, or an Unexpected host shutdown before this start.
- Notice starts that repeat with no machine failure behind them: report them to SparkLogs support with the device name.

**Related:**

- `sparklogs_agent_stopped`: The agent stopped, and why.

**Example:** The agent starts with Windows on an office desktop.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#sparklogs_agent_started, https://sparklogs.com/reference/reasons/sparklogs_agent_started.json

## `sparklogs_agent_stopped`: SparkLogs agent stopped

The SparkLogs agent stopped.

**Also reported by:** `win.eventlog.system`

**Severity:** Notice when the agent stopped on an error, Display for an update, a shutdown, or someone stopping the service.

**Why it matters:** The agent takes no device or performance readings until it starts again. After a crash, logs keep arriving. After an update, a shutdown or someone stopping the service, logs written in the gap arrive once collection starts again. They are lost if the agent is uninstalled or never started again. Event log records can also be lost if Windows overwrites them before the agent starts again; the agent then reports them as skipped events.

**In practice:** The event names the cause: an agent update, Windows shutting down, someone stopping the service (an administrator, an RMM tool or an uninstall), or an error inside the agent. When the agent dies without stopping, the Service Control Manager records it in the System log, and SparkLogs reports that record under this reason at Error.

**What to check:**

- The cause in the event, and for a stop by someone, which administrator or RMM policy stopped it.
- The time to the next SparkLogs agent started: how long the machine had no readings.
- Repeated error stops: report them to SparkLogs support with the device name.

**Related:**

- `sparklogs_agent_started`: The agent started again, and whether its last stop was clean.

**Example:** Windows stops the agent as an office desktop shuts down to install its monthly updates.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/lifecycle#sparklogs_agent_stopped, https://sparklogs.com/reference/reasons/sparklogs_agent_stopped.json

## `tpm_presence_changed`: TPM presence changed

The machine's TPM appeared or disappeared.

**Severity:** Warning when the TPM disappears, Notice when one appears.

**Why it matters:** With the TPM gone, BitLocker asks for its recovery key at start, and Windows Hello PINs and other keys held in the TPM stop working.

**In practice:** Windows stopped or started seeing a TPM. A firmware setting (Intel PTT, AMD fTPM or a discrete TPM switched off or on), a firmware update or reset, or a motherboard replacement is the usual cause. Firmware changes take effect at a restart, so the event follows the restart that applied it.

**What to check:**

- `tpm.msc` or `Get-Tpm` shows whether Windows sees the TPM.
- The TPM setting in the firmware setup, after a firmware update or reset.
- With BitLocker on, the machine's recovery key, before its next start.

**Example:** A BIOS update resets an office desktop's firmware settings and switches its firmware TPM off.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#tpm_presence_changed, https://sparklogs.com/reference/reasons/tpm_presence_changed.json

## `tpm_version_changed`: TPM specification changed

The TPM specification version changed.

**Why it matters:** Windows 11 needs TPM 2.0, and switching a TPM's version can clear it, so keys held in it, such as BitLocker's and Windows Hello's, may need to be set up again.

**In practice:** The TPM stayed present but now reports another specification version, such as 1.2 to 2.0. Some vendors switch a TPM between 1.2 and 2.0 with a firmware update tool. Firmware changes take effect at a restart, so the event follows the restart that applied it.

**What to check:**

- The old and new versions in the event.
- BitLocker protectors (`manage-bde -protectors -get C:`) and Windows Hello sign-in after the change.

**Example:** A firmware update moves a desktop's TPM from version 1.2 to 2.0.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#tpm_version_changed, https://sparklogs.com/reference/reasons/tpm_version_changed.json

## `virtualization_changed`: Virtualization changed

The machine became virtual or physical, or moved to a different hypervisor.

**Why it matters:** Drivers and tools from the old platform stay installed, network adapters come up as new devices without their static settings, and Windows activation may need redoing.

**In practice:** The machine moved from physical to virtual or back, or to another hypervisor or cloud: Hyper-V, VMware, VirtualBox, KVM, Xen, AWS, Google Cloud, Parallels or Nutanix AHV. A physical-to-virtual migration or a platform move is the usual cause. A virtual machine still using an emulated network card is reported as Emulated network adapter.

**What to check:**

- The old and new platform in the event.
- Remove the old platform's tools (hardware vendor agents after a physical-to-virtual move, VMware Tools after leaving VMware), and install the new hypervisor's guest tools.
- Network adapter settings and Windows activation on the new platform.

**Example:** A PowerEdge file server is migrated into a Hyper-V virtual machine with Disk2vhd.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/system-info#virtualization_changed, https://sparklogs.com/reference/reasons/virtualization_changed.json

## `volume_bitlocker_protection_dropped`: BitLocker protection dropped

BitLocker protection is off or suspended on a drive it used to protect, and has stayed off.

**Why it matters:** If the machine is lost or stolen, whoever has it can read the drive without the recovery key.

**In practice:** It opens once protection has been off or suspended for 1 day, counting time asleep, on a drive the agent has found protected. A drive that never used BitLocker raises nothing. Windows and vendor update tools suspend BitLocker for a BIOS, firmware or TPM update, and protection resumes at the next restart. It stays off when the machine is not restarted, when someone suspended it with no restart limit, turned it off, or started decrypting the drive.

**What to check:**

- `manage-bde -status` shows each drive's protection and conversion status.
- Restart the machine if an update is waiting; if protection is still off, resume it with `manage-bde -protectors -enable C:` (elevated, with the drive's letter).
- If nobody meant to turn it off, BitLocker's own log around that time, in Event Viewer under Applications and Services Logs, Microsoft, Windows, BitLocker-API, Management.

**How it ends:** Ends when BitLocker protection on the volume is back on for 10 minutes.

**Fields read:**

- `sparklogs.data.disk_volumes.bitlocker_dropped`
- `sparklogs.data.disk_volumes.bitlocker_off_age_min`
- `sparklogs.data.disk_volumes.bitlocker_was_protected`

**Example:** A laptop's BitLocker was suspended for a firmware update yesterday, and the user has not restarted since.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/disk-volumes#volume_bitlocker_protection_dropped, https://sparklogs.com/reference/reasons/volume_bitlocker_protection_dropped.json

## `volume_fill_rate_high`: Volume filling quickly

A drive's free space is falling fast.

**Why it matters:** Nothing fails yet, but growth this fast fills even a large drive, and writes to it then fail.

**In practice:** Free space has been shrinking by 1 GB an hour or more across the last hour, and is still shrinking, however much space is left. It applies to every fixed drive, the Windows drive included. Typical causes are a log or trace left on verbose, a crash-dump loop, a sync client pulling down a whole library, or a backup or copy writing to the wrong drive. It stays at Display. The two low-space conditions report a drive that is actually running short.

**What to check:**

- Resource Monitor's Disk tab, which lists the processes and files being written.
- Log, trace and crash dump folders, sync client caches and backup targets on the drive.

**How it ends:** Ends when the volume fills slower than 0.8 GB an hour, or stops filling, for 20 minutes.

**Fields read:**

- `sparklogs.data.disk_volumes.free_bytes`
- `sparklogs.data.disk_volumes.free_pct`
- `sparklogs.data.disk_volumes.fill_rate_bytes_per_h`

**Example:** A sync client starts pulling a 1 TB document library onto a 2 TB data drive at 40 GB an hour.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/disk-volumes#volume_fill_rate_high, https://sparklogs.com/reference/reasons/volume_fill_rate_high.json

## `volume_unreadable`: Volume unreadable

A fixed drive's file system is unmounted, shows as RAW, or cannot be read.

**Severity:** Severe on a server, Serious on a workstation.

**Why it matters:** Everything on the drive is out of reach: shares, databases and applications on it fail, the drive letter can vanish, and Explorer may offer to format it.

**In practice:** Windows still lists the volume, but for 15 minutes its file system has been missing or unreadable. It applies only to internal (not USB) drives the agent has found on 95% or more of its checks for 30 days, so external drives and temporary mounts such as backup recovery volumes do not raise it. A drive removed cleanly raises nothing: it leaves the inventory. A failing disk, a failing controller, cable or SAN path, and file system damage after a power loss are the usual causes.

**What to check:**

- Do not format or initialize the disk: that destroys what may be recoverable.
- Disk Management: whether the disk is online and the volume shows RAW or no file system.
- The System log for disk, storage controller and NTFS errors from when it started.
- Check cables, the controller and the SAN path before running chkdsk or restoring from backup.

**How it ends:** Ends when the volume is mounted with a readable file system for 15 minutes.

**Fields read:**

- `sparklogs.data.disk_volumes.volume_role_code`
- `sparklogs.data.disk_volumes.backing_bus_permanent`
- `sparklogs.data.disk_volumes.mount_state_code`
- `sparklogs.data.disk_volumes.presence_ratio_pct`
- `sparklogs.data.disk_volumes.presence_tracked_d`

**Example:** After a power cut, a file server's 4 TB data volume comes back RAW and its shares are gone for three hours.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/disk-volumes#volume_unreadable, https://sparklogs.com/reference/reasons/volume_unreadable.json

## `vss_snapshots_failing_for_space`: Shadow copies failing for space

Windows is deleting shadow copies on a volume, or failing to create them, because their storage could not grow.

**Also reported by:** `win.eventlog.application`, `win.eventlog.system`

**Severity:** Notice at the first failure; more severe as failures repeat, and Error once 3 happen in one day.

**Why it matters:** Previous Versions and restore points go missing, and a backup that relies on shadow copies can fail, or report success while protecting less than it appears to.

**In practice:** It counts System log events from Volsnap for the volume over the last day and week: 25 (shadow copies deleted because their storage could not grow in time), 35 (creation aborted because the storage failed to grow) and 36 (creation aborted at the maximum size set for shadow storage). Windows deleting the oldest shadow copy to stay under that maximum (Volsnap event 33) does not count: that is normal rotation. Event 36 means the maximum is too small for the snapshot schedule. Event 25 often comes from heavy writes outpacing how fast the storage can grow, even with room left under the maximum.

**What to check:**

- `vssadmin list shadowstorage` (elevated): used, allocated and maximum shadow storage for the volume.
- Raise the maximum with `vssadmin resize shadowstorage`, or free space on the volume that holds the storage.
- For event 25 on a busy server volume, move the storage to another volume (`vssadmin add shadowstorage`, servers only), or schedule snapshots away from heavy write jobs.

**How it ends:** Ends when shadow copy failures on the volume in the past week drop below 1.

**Fields read:**

- `sparklogs.data.vss_shadowstorage.snap_fail_count_7d`
- `sparklogs.data.vss_shadowstorage.snap_fail_count_24h`

**Example:** The shadow storage limit on a busy file server's C: drive fills, and Windows discards four snapshots in a day.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/vss-shadowstorage#vss_snapshots_failing_for_space, https://sparklogs.com/reference/reasons/vss_snapshots_failing_for_space.json

## `vss_writer_failed`: VSS writer failed

A VSS writer has stayed in a failed state.

**Also reported by:** `win.eventlog.application`

**Severity:** Display for any writer it covers; Warning when an application writer (SQL Server, Exchange, Hyper-V, Active Directory, DHCP, certificate authority, Cluster Shared Volumes, DFS Replication) is still failed 30 hours after it first failed. It goes no higher.

**Why it matters:** Backups that need the writer warn, skip its data, or copy it without the application's help, as if the power had been cut. For SQL Server, Exchange or Hyper-V that is a backup that may not restore cleanly, even when the job reports success.

**In practice:** The agent reads `vssadmin list writers` every few hours, and the condition opens once a writer has been failed for 6 hours. Most failures are one snapshot timing out on a busy machine, and clear at the next backup. An application writer still failed a day later has missed every snapshot since. The writer's last error, which the row carries, says what went wrong. Writers whose failure costs nothing you would restore (BITS, Task Scheduler, Performance Counters, Shadow Copy Optimization, search and VSS metadata writers) are ignored. A writer missing from the list, for example because its service is stopped, opens nothing. One that goes missing while failed keeps the condition open and does not count as healthy.

**What to check:**

- `vssadmin list writers` (elevated) for the writer's state and last error.
- VSS and writer errors in the Application log around the last backup; SparkLogs collects these.
- Restart the service that hosts the writer: SQL Server VSS Writer for SqlServerWriter, Hyper-V Virtual Machine Management for the Hyper-V writer, Cryptographic Services for the System Writer, Windows Management Instrumentation for the WMI Writer.
- If it fails again at the next backup, look for a backup job that times out or overlaps another one.

**How it ends:** Ends when the writer has been out of a failed state for 6 hours, or missing from the list that long. A writer that leaves the list is not counted as recovered.

**Fields read:**

- `sparklogs.data.vss_writers.writer_state_failed`
- `sparklogs.data.vss_writers.writer_class_code`

**Example:** The System Writer fails after a snapshot times out on a busy server.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/vss-writers#vss_writer_failed, https://sparklogs.com/reference/reasons/vss_writer_failed.json

## `winhttp_proxy_changed`: WinHTTP proxy changed

The machine's default WinHTTP proxy changed.

**Why it matters:** Windows services and management agents that use this proxy can stop reaching the internet when it is wrong: Windows Update searches and Microsoft Defender updates through Windows Update can fail, while browsing still works.

**In practice:** The static machine-wide proxy changed: its mode (direct access or a named proxy), its proxy servers, or its bypass list. `netsh winhttp set proxy`, `netsh winhttp import proxy source=ie`, a deployment script or RMM policy, and VPN or security clients set it; so does unwanted software that routes traffic through a proxy of its own. Browser and per-user proxy settings, automatic configuration scripts (PAC) and WPAD are separate and do not raise it.

**What to check:**

- The old and new proxy and bypass list in the event.
- `netsh winhttp show proxy` on the machine.
- Whether the proxy answers from the machine: `Test-NetConnection <proxy> -Port <port>`.
- If nobody meant to set it, `netsh winhttp reset proxy` returns the machine to direct access.

**Example:** A technician moves the office proxy to a new port, and the machine's services follow the change.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/topics/network-config#winhttp_proxy_changed, https://sparklogs.com/reference/reasons/winhttp_proxy_changed.json
