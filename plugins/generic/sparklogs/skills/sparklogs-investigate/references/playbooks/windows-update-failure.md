# Windows Update and patch failures

**Trigger.** "Patching reports `<KB>` failed", "this machine is months behind", "the 24H2 upgrade keeps failing", "updates install and then roll back", or a SparkLogs condition that the device is not scanning or has paused updates.

**Accuracy.** An update passes through stages, and each stage has its own witness: Windows Update scans a service for what the device needs, downloads it, hands it to the servicing stack (CBS) to stage and install, and often finishes it during the next restart.
A failure record says which stage stopped and with what code. The code usually names the cause. The record rarely names the file or component: that is in CBS.log and, for feature updates, the Windows Setup logs (`C:\$WINDOWS.~BT\Sources\Panther`), which SparkLogs does not collect.
The RMM's patch report is the RMM's own view, built from its own scans and approvals. A device can show failed in the RMM while Windows installed the update on a later cycle, and the reverse.
Many records here are routine. An install put off because a Store app was open, a scan rejected because the caller sent a bad query, and a single download that failed and then succeeded need no work. What needs work is the same update failing cycle after cycle, or one device failing every update.
No failure record does not prove the device is patched. A device that is not scanning, is paused, or takes updates from a WSUS server that has not approved them logs no failure at all. Read the OS revision and the scan state as well as the failures.

**Feeds.** Reasons and their codes: each feed's `reasons.md`.

| Stage | Feed | Reasons |
|---|---|---|
| Scan and download | `win.eventlog.management` (Windows Update client and BITS channels) | `patch_scan_failed`, `patch_download_failed`, `bits_transfer_failed` |
| Install outcome | `win.eventlog.system` (Windows Update client event 20) | `patch_install_failed`, `patch_install_deferred` |
| Package servicing | `win.eventlog.setup` (Servicing events) | `patch_install_failed`, `win_component_store_corruption` |
| Servicing stack and component store | `win.servicing.cbs` (CBS.log), `win.servicing.dism` (dism.log) | `win_component_store_*`, `win_servicing_*`, `win_sfc_repair_started`, `win_dism_*` |
| Recovery image | `win.eventlog.system` | `winre_servicing_failed` |
| Agent state | `sparklogs.device.state`, topics `windows_update_agent_state` and `system_info` | `patch_scan_stale`, `patch_updates_paused`, `operating_system_changed` |
| Software installers | `win.eventlog.application` | `win_msi_operation_failed`, `restart_manager_app_pending` |

Fields: each feed's `fields.md`, `../fields/topic-windows-update-agent-state.md`, `../fields/topic-system-info.md`.
The update a record is about is `win.eventlog.system.update_title` (LQL) on install outcomes, `win.eventlog.management.update_title` (LQL) on downloads and `win.eventlog.setup.package` (LQL) on Setup.
The update service a scan asked is `win.eventlog.management.update_service_id` (LQL).

**Reading the codes.** Two fields carry a code, and they spell it differently:

- `sparklogs.result.code` (LQL) is normalized. A 0x8007 code becomes the Win32 error it wraps, in decimal, with its name in `sparklogs.result.code_name` (LQL): 0x80073712 arrives as 14098, ERROR_SXS_COMPONENT_STORE_CORRUPT. Windows Update 0x8024 codes stay in hex with no name. Feature-update codes (0xC1900101 and its family) and the update client's database codes (0xC800...) carry no result code at all.
- The hex Windows wrote, the string to search Microsoft's references for, is `event_data.errorCode` (LQL) on Windows Update client records and `win.eventlog.setup.error_code` (LQL) on Setup records.

Group by the hex field to ask which code. Filter on the normalized field only for codes it carries.

**Which stage failed.** Settle this first.

| What the device shows | Stage | Section |
|---|---|---|
| `patch_scan_stale`, or `patch_scan_failed` every cycle | Not finding updates | **Scanning** |
| `patch_updates_paused` | A person paused updates | **Scanning** |
| `patch_download_failed`, or install code 0x80246007 | Found, not downloaded | **Downloading** |
| `patch_install_failed` on System and Setup in the same minute | Install failed | **Installing** |
| `win_servicing_*` or `win_component_store_*` failures, Setup event 1015 | Servicing stack or component store damaged | **Servicing stack and component store** |
| Installed, `win_servicing_commit_skipped_reboot_required`, a restart owed | Waiting on a restart | **Restart pending** |
| Commit before a restart (events 218, 216), then event 20 with a 0xC19 code at the next boot | Feature update rolled back | **Feature updates** |
| `winre_servicing_failed`, Secure Boot reasons | Recovery image or boot certificates | **Recovery environment and Secure Boot** |

**Device health first.** `query_device_health`. The views are in `../guides/device-state-fields.md` (**Choose the view**).

- The device's latest state for `windows_update_agent_state`: `sparklogs.data.windows_update_agent_state.last_scan_age_h` (LQL), `sparklogs.data.windows_update_agent_state.wu_never_searched` (LQL), `sparklogs.data.windows_update_agent_state.updates_paused` (LQL) and `sparklogs.data.windows_update_agent_state.wuauserv_start_type` (LQL).
  The Windows Update service at `manual` is normal: Windows starts it on demand. `disabled` or `missing` means nothing on the device can scan or install. A tool or a person turned it off, and `what-changed.md` finds when (`service_start_type_changed`).
- The latest state for `system_info`: `sparklogs.data.system_info.os_build` (LQL), `sparklogs.data.system_info.os_revision` (LQL) and `sparklogs.data.system_info.os_display_version` (LQL) say where the device actually is. Compare the revision with the current month's cumulative update for that build in Microsoft's release information, and with healthy devices of the same build in the client.
  `sparklogs.data.system_info.reboot_pending` (LQL) is often true for reasons unrelated to updates: `file_rename` (a file replacement queued for restart) is set by installers and security products all the time. Only `cbs` or `wu` in `sparklogs.data.system_info.reboot_pending_reasons` (LQL) means updates wait on a restart. `sparklogs.data.system_info.reboot_pending_since` (LQL) is when the agent first saw it, and `sparklogs.data.system_info.uptime_s` (LQL) how long since the last restart.
- Open conditions over a window of days: `patch_scan_stale`, `patch_updates_paused`, `os_volume_space_low`.
- `operating_system_changed` on the device's change timeline is when the revision or version last moved. A device whose revision has not moved for months while its peers moved each month is behind, whatever its failure records say.

## Scanning

`patch_scan_stale` reads the date of the last successful search by Windows' own automatic updates.
Other programs search through the same update client: an RMM or patch tool, Defender checking for new security intelligence, the Microsoft Store, Office. Their searches do not move that date.
A stale reading can mean automatic updates are turned off while another tool scans, or that automatic updates' own search fails against its configured service while another caller succeeds.
Before calling a stale device unscanned, count its completed scans by update service:

```lql
source = "<host>" AND subsource = "win.eventlog.management" AND provider_name = "Microsoft-Windows-WindowsUpdateClient" AND event_id in (25, 26)
```

Group by `event_id` (LQL) and `event_data.serviceGuid` (LQL) (raw, in either letter case). Event 26 is a completed scan and 25 a failed one (`patch_scan_failed`).
Count scans by device and day, not rows: one scan can write a 26 for each service in the same instant.
Microsoft documents these service identifiers:

| Service id | Service |
|---|---|
| 7971F918-A847-4430-9279-4A52D1EFE18D | Microsoft Update (Windows plus Office and other Microsoft products) |
| 9482F4B4-E343-43B6-B170-9A65BC822C77 | Windows Update |
| 3DA21691-E39D-4DA6-8A4B-B43877BCB1B7 | WSUS or Configuration Manager |
| 855E8A7C-ECB4-4CA3-B045-1DFA50104289 | Microsoft Store |
| 8B24B027-1DEE-BABB-9A95-3517DFB9C552 | OS flighting |
| 00000000-0000-0000-0000-000000000000 | Default: whichever service policy selects |

- Daily completed scans against Microsoft Update, Windows Update or WSUS say some program on the device is scanning. The record does not name which one, and a Defender or Office check counts too. A stale reading then says Windows' automatic updates are not searching. Whether the device is patched comes from its revision: compare `sparklogs.data.system_info.os_revision` (LQL) and the last `operating_system_changed` with the current cumulative update for its build before closing it.
- Failures only against the Store or flighting services, with OS scans completing, are Store app traffic, often on devices where policy blocks Microsoft's internet endpoints. They are not an OS patching problem.
- No completed OS scan in days: read the failure code.
  0x80240438 is an endpoint the device could not reach: a WSUS server that is down, renamed or retired but still named in policy (`WUServer` under `HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate`), or a proxy or firewall in the way.
  0x8024402C is a server name that did not resolve, 0x8024401C a request that timed out, 0x80244022 the server answering 503 (on WSUS, often its application pool stopped), 0x80244018 a 403 from a proxy, 0x80072EE2 (12002 normalized) a connection timeout, and 0x800B0109 a certificate chain the device does not trust, usually TLS inspection or a missing root.
- 0x80240032 (invalid search criteria, Info) is the calling program's mistake and says nothing about the device.
- Codes starting 0xC800 come from the update client's local database. With low free space they usually mean the system drive filled. After freeing space, resetting the SoftwareDistribution folder rebuilds the database.
- No scans at all: the service start type above, and policy that turns automatic updates off or removes access to Windows Update (`NoAutoUpdate`, `DisableWindowsUpdateAccess`, `DoNotConnectToWindowsUpdateInternetLocations` under the same policy key), set by Group Policy, Intune or the RMM.

`patch_updates_paused` is a pause someone set in Settings. It escalates the longer it lasts. Windows Update for Business deferral policies are not a pause and raise no condition: a device deferring feature updates for a year is behaving as configured.

## Downloading

```lql
source = "<host>" AND sparklogs.reason in (patch_download_failed, bits_transfer_failed)
```

Group by `sparklogs.reason` (LQL), `event_data.errorCode` (LQL) and `win.eventlog.management.update_title` (LQL). For BITS, group by `win.eventlog.management.job_name` (LQL).
`bits_transfer_failed` is Info, and most of it is Office, browser and device-maker updater jobs retrying. Read it when its job is a Windows Update download, or when one job and code repeat hour after hour.
Two routine job families have their own arm on `sparklogs.reason_variant` (LQL), recorded at Verbose because they retry on their own: `http_401` is the Outlook offline address book job answering 401 (0x80190191), and `http_404` a Dell update client job answering 404 (0x80190194). Every other failure, including a 401 or 404 from any other job, is `transfer_error` at Info.

- ERROR_INSTALL_OUT_OF_DISK_SPACE (0x80073CF4, 15604 normalized) or ERROR_DISK_FULL (112): free space on the system drive (`disk-full-or-filling.md`). A cumulative update needs several GB free to download and stage, and a feature update more.
- 0x80246008: the update client could not reach BITS. Check the BITS service (`service-failures.md`).
- 0x80D0 codes (0x80D02002, 0x80D03805) come from Delivery Optimization, the layer that downloads updates from Microsoft and from peers: a proxy, a firewall or a Delivery Optimization policy blocking its traffic. Setting its download mode to HTTP only isolates it.
- 0x80244018 and 0x8024401C on a download: a proxy refusing or timing out.
- 0x80246007 on an install outcome means the update was never downloaded: read the download records before it.

## Installing

The install outcome and the package record:

```lql
source = "<host>" AND sparklogs.reason = patch_install_failed
```

Group by `subsource` (LQL), `win.eventlog.system.update_title` (LQL), `win.eventlog.setup.package` (LQL), `event_data.errorCode` (LQL) and `win.eventlog.setup.error_code` (LQL).
On the System copy, `sparklogs.reason_variant` (LQL) `failed` is a real failure and `interrupted` (0x8024001E shutdown, 0x80242008 cancelled) changed nothing. Records from older agents can also file a package in use here. The code 0x80073D02 says it was only deferred, the fact `patch_install_deferred` carries now.

The Setup package can carry a different KB from the Windows Update title: a monthly update is staged as several packages, so an update titled with one KB can fail on a companion package. Match a Setup record to its install outcome by the minute, not by KB.
Read the device's servicing sequence around the failure: each package's begin (1), success (2), failure (3) and wait for a restart (4), and the automatic store scan Windows starts after a failure (1013 start, 1014 counts, 1015 damage left unrepaired):

```lql
source = "<host>" AND subsource = "win.eventlog.setup" AND provider_name = "Microsoft-Windows-Servicing" AND event_id in (1, 2, 3, 4, 1013, 1014, 1015)
```

Group by `win.eventlog.setup.package` (LQL) and `event_id` (LQL) for a package's history. `win.eventlog.setup.target_state` (LQL) says whether Windows was installing, staging or removing it, and `win.eventlog.setup.client` (LQL) who asked: UpdateAgentLCU is Windows Update with a cumulative update, DISM a technician or a script.
One package failing again and again, minutes apart, is a loop that will not clear on its own.

Common codes on a failed install:

| Code | Meaning | Next step |
|---|---|---|
| 0x80073712, 0x800F0831, 0x800F0984, 0x800F0986, 0x8007370D, 0x800736B3, 0x800705B9, 0x80070306 | Damaged or missing files, packages or manifests in the component store | **Servicing stack and component store** |
| 0x800F081F, 0x800F0954 | A repair or feature install found no source files | Repair source, in the same section |
| 0x800F0823, 0x80242017 | The update needs a newer servicing stack | Install the servicing stack update first |
| 0x800F0922 | The update could not finish at restart: commonly too little space on the system reserved or EFI partition, or a VPN or proxy blocking a download it needs | Partition free space, then retry off the VPN |
| 0x80070643 | A generic installer failure: on .NET updates usually the .NET install itself, on recovery image updates a recovery partition too small | Read the title, then **Recovery environment and Secure Boot** |
| 0x8024200B | The update's own installer failed: SQL Server, Office and .NET updates run their own setup | That product's setup log on the device, and `win_msi_operation_failed` in the same minute |
| 0x80242016 | The update was not in the state Windows expected after its restart | Retry. A repeat goes to the store repair |
| 0x800704C7 (ERROR_CANCELLED) | A restart or shutdown started by a person or a tool stopped the install | `os_restart_requested` in the same minute names who |
| 0x8024001E, 0x80242008 | A shutdown or the update service stopped the attempt | Nothing: the next cycle retries |
| 0x80240017 | Not applicable to this device | Wrong product or build, or the update is already superseded |
| 0x80248007 | The update client's database lacked the update's data | Usually clears after a fresh scan. If it persists, reset SoftwareDistribution |
| 0x80070002, 0x80070003 | A file or path the update expected is missing | Retry after a fresh download. A repeat goes to the store repair |
| 0x80070070, 112 | Disk full | Free space |

Store apps (titles such as `9NTXGKQ8P7N0-MicrosoftWindows.CrossDevice`), Defender intelligence updates and drivers fail and retry often and rarely decide patch compliance: separate them from the cumulative update before counting.

## Servicing stack and component store

The component store (`C:\Windows\WinSxS`) holds the files every update is built from. While it is damaged, every cumulative update fails, usually at the same package, until it is repaired.

```lql
source = "<host>" AND subsource in ("win.servicing.cbs", "win.servicing.dism", "win.eventlog.setup") AND sparklogs.reason: win_*
```

Group by `sparklogs.reason` (LQL) and `sparklogs.reason_variant` (LQL), then read the rows in time order around the failed install.

- `win_component_store_corruption` is one fact with two witnesses, Setup and CBS: count one incident, not one per witness. Its variants, on `sparklogs.reason_variant` (LQL):
  - `scan_found`: a scan counted damage, in `win.servicing.cbs.detected_corruption` (LQL).
  - `unrepaired`: what a repair left, `win.eventlog.setup.corruption_total` (LQL) against `win.eventlog.setup.corruption_repaired` (LQL).
  - `detection_only`: a scan that only looked for damage (`win.eventlog.setup.detection_only` (LQL) true) and repairs nothing by design. Its counts say what is damaged, not what a repair left.
  - `operation_failed` and `package_blocked`: an operation stopped on the damage.
  - `recovered`: the damage was fixed.
- An automatic scan that reports zero corruption does not clear the store. Devices failing with 0x8007370D or 0x800736B3 have shown a zero count on Setup event 1014 while CBS logged files it could not repair in the same run.
- `win_component_store_payload_corrupt` and `win_component_store_payload_unrepairable` arrive one row per file, hundreds from one repair. Group by `win.servicing.cbs.corrupt_component` (LQL) or `win.servicing.cbs.unrepairable_file` (LQL) to see what is damaged.
- `win_component_store_repair_unavailable` is SFC unable to fix a running system file because the store's own copy is bad: repair the store, then run SFC again.
- `win_servicing_source_files_missing` (0x800F081F), and `win_dism_command_failed` with 0x800F0954: the repair had no source. On a WSUS-managed device DISM reaches Windows Update only when the Group Policy setting "Specify settings for optional component installation and component repair" allows it. Otherwise give DISM `/Source` with install media of the same build and edition, and `/LimitAccess`.
- `win_servicing_update_package_create_failed` (0x800F0823): the update needs a newer servicing stack. It repeats every cycle on devices far behind, often servers left unpatched for years or a WSUS group whose servicing stack updates were never approved.
- `win_servicing_delta_patch_failed`, `win_servicing_component_manifest_unreadable`, `win_component_store_reprojection_failed`, `win_component_store_assembly_missing`: single damaged components, with the same repair.
- `win_component_store_corruption_recurring` rising, or damage back within weeks of a repair: check the disk (`raid-or-storage-degraded.md`) and the memory before repairing again.
- `win_dism_health_command_run` and `win_sfc_repair_started` mean someone is already working on the device. The CBS rows after them say what the run found.

The repair order is DISM `/Online /Cleanup-Image /RestoreHealth`, then `sfc /scannow`, then the update again.
When RestoreHealth cannot repair everything, or the same package keeps failing after a clean repair, an in-place repair upgrade (Windows setup from media of the same version, keeping files and apps) replaces the whole store.

## Restart pending

`win_servicing_commit_skipped_reboot_required` and `win_dism_reboot_required`: the change is staged and finishes at the next restart. Setup event 4 says the same per package.
A device with `cbs` or `wu` pending for days installs nothing more and reports the update as not installed. Read `os_restart_requested` and the boots for who keeps postponing it (active hours, a user, an RMM policy that never forces a restart), and schedule the restart.
`win_servicing_startup_package_failed` is a package that failed while the restart was finishing it: the update did not install. Read Setup event 3 from the same boot for the code.
`restart_manager_app_pending` names an application an installer could not close. It is routine, and matters only when the same update keeps failing.

## Feature updates

A feature update (23H2 to 24H2, and so on) runs Windows Setup. It installs during the restart and, when something fails, rolls back to the old version.
On the System log it shows as commit started (218) and committed (216) before the restart, then an install outcome with the feature update's title and a 0xC19 code after the next boot:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-WindowsUpdateClient" AND event_id in (19, 20, 216, 218)
```

Narrow to feature updates with `win.eventlog.system.update_title: ", version"` (LQL) and read `event_data.errorCode` (LQL): feature-update codes have no normalized result code.
An unchanged `sparklogs.data.system_info.os_display_version` (LQL) and no `operating_system_changed` after the attempt confirm the rollback.

- 0xC1900101, with a second code after it: a driver failed during setup and Windows rolled back. Storage, display, network, VPN and security product drivers are the usual ones: update or remove them first. SetupDiag, run on the device, names the driver from the Setup logs.
- 0xC1900208: an incompatible application blocks the upgrade, often old security or VPN software.
- 0xC1900200, 0xC1900202: the hardware does not meet the version's requirements (TPM 2.0, Secure Boot, a supported processor for Windows 11).
- 0xC190020E: not enough free space. 0xC1900107: a previous attempt's cleanup is still pending: restart, and Disk Cleanup removes the old setup files.
- 0x800F0922, 0x80070002 and component-store codes on a feature update: the same causes as on a cumulative update.
- One feature update failing on many devices of one model points at that model's drivers or firmware. Microsoft places safeguard holds on known-bad combinations and lists them for each release.

A feature or cumulative update that leaves the device unable to start, or restarting in a loop, is `crashes-and-restarts.md` (0x7B and boot loops, unexpected restarts).
Windows 10 22H2 is out of support. A Windows 10 device whose revision stopped at the last free update (October 2025) receives later security updates only through Extended Security Updates. Otherwise it needs the upgrade to Windows 11.

## Recovery environment and Secure Boot

- `winre_servicing_failed`: an update could not service the recovery image, most often because the recovery partition is too small. The update that carries the change can keep failing, often with 0x80070643. `reagentc /info` and the partition sizes come next.
- Secure Boot certificate updates are applied by a Windows servicing task, not as Windows Update installs: `secure_boot_cert_update_pending`, `secure_boot_update_failed`, `secure_boot_certs_current` and `secure_boot_database_update_applied` (a DB or DBX update written to the firmware) on System, `secure_boot_revocation_update_failed` on `win.eventlog.platform`. Pending is normal until the servicing task reaches the device: install the latest cumulative update and look for `secure_boot_certs_current` (1808). Pending that persists after that, or `secure_boot_update_failed` 1795, 1802 or 1803, points at firmware from the device maker. Suspend BitLocker before a firmware update. Applying them changes what the TPM measures and can trigger BitLocker recovery: `bitlocker-recovery.md`.

## Store apps and software installers

Store app updates go through the same Windows Update client: `patch_install_deferred` with 0x80073D02 is an app that was open, and the next cycle replaces it. Group failed titles by app before calling them patch failures.
Software installed by Windows Installer (RMM agents, runtimes, line-of-business packages, Office repairs) reports through `win_msi_operation_failed`, with the product in `win.eventlog.application.product` (LQL) and the installer code's meaning in `win.eventlog.application.msi_code_meaning` (LQL). Its reason text says which codes are retries.

## One update or one machine

Count the failing update across the client or the fleet, grouped by `source` (LQL):

```lql
sparklogs.reason = patch_install_failed AND sparklogs.reason_variant = failed AND win.eventlog.system.update_title: "<KB>"
```

- The same update and code on many devices: the update, its approval, or something those devices share (a security product, a model's drivers, a WSUS server). Check Microsoft's known issues for that KB before working on devices.
- One device failing every update with component-store codes: that device's store. Repair it.
- Many devices on one site failing scans or downloads at the same time: the network path, proxy or WSUS server they share (HM4).
- Then count the healthy side: devices of the same build whose `operating_system_changed` moved them to this month's revision.

## Findings

Lead with the stage that failed and how it is known, the update title and package, the code and its meaning, and whether it repeats.
Say where the device actually is (build and revision against current), whether it scans and against which service, and whether a restart is owed.
Give the one-update-or-one-machine contrast with counts.
When the codes leave the failing component unnamed, list the device's own logs (`C:\Windows\Logs\CBS\CBS.log`, `Get-WindowsUpdateLog`, the Panther folder for a feature update) in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM4): the WSUS or Configuration Manager server and its approvals, the RMM's patch policy and approvals, Microsoft's release health and known issues, proxies and firewalls on the path to the update service, and driver updates pushed by device makers' own tools.
