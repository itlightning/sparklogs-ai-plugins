<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.platform`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `device_install_reboot_pending` | device install reboot pending | event | Notice | `hardware` |  |
| `device_removal_vetoed` | device removal vetoed | event | Notice | `hardware` |  |
| `device_removed_after_failure` | device removed after failure | event | Warning | `hardware` |  |
| `device_security_assessment_failed` | device security assessment failed | event | Notice | `hardware` |  |
| `device_security_assessment_passed` | device security assessment passed | event | Info to Notice | `hardware` |  |
| `device_software_install_failed` | device software install failed | event | Info to Warning | `hardware` | benign possible |
| `device_start_failed` | device start failed | event | Warning | `hardware` |  |
| `firmware_event_store_unavailable` | firmware event store unavailable | event | Notice to Warning | `hardware` |  |
| `firmware_verification_scan_failed` | firmware verification scan failed | event | Info to Notice | `hardware` | benign possible |
| `font_load_allowed` | font load allowed | event | Info | `os_stability` | benign |
| `font_load_blocked` | font load blocked | event | Notice | `os_stability` |  |
| `gpu_resources_saturated` | gpu resources saturated | event | Notice | `performance` |  |
| `live_kernel_dump_requested` | live kernel dump requested | event | Notice | `os_stability` |  |
| `measured_boot_failed` | measured boot failed | event | Warning | `os_stability` |  |
| `os_boot_duration_high` | os boot duration high | event | Info to Warning | `performance` |  |
| `os_clock_drift` | os clock drift | event | Notice | `time_sync` |  |
| `os_crash_dump_unavailable` | os crash dump unavailable | event | Warning | `os_stability` |  |
| `os_shutdown_duration_high` | os shutdown duration high | event | Info to Warning | `performance` |  |
| `platform_tamper_indicator_reported` | platform tamper indicator reported | event | Notice to Error | `endpoint_protection` |  |
| `portable_device_unresponsive` | portable device unresponsive | event | Info | `hardware` |  |
| `ram_commit_exhausted` | ram commit exhausted | event | Info to Warning | `performance` |  |
| `secure_boot_revocation_update_failed` | secure boot revocation update failed | event | Info | `os_stability` |  |
| `thermal_cooling_engaged` | thermal cooling engaged | event | Info to Notice | `hardware` |  |
| `tpm_initialization_failed` | tpm initialization failed | event | Warning | `os_stability` |  |
| `usb_controller_error` | usb controller error | event | Notice | `hardware` |  |
| `win_trace_session_failed` | win trace session failed | event | Info to Warning | `os_stability` | benign possible |

## `device_install_reboot_pending`: device install reboot pending

Windows installed a driver and cannot finish until the host restarts.

**Severity:** Notice

**Why it matters:** The device may work only partly, or not at all, until the host restarts.

**In practice:** Windows writes event 8000 in Microsoft-Windows-UserPnp/DeviceInstall when a driver install for a device needs a restart to complete, with the device's instance ID. It is normal after a driver install or a driver update from Windows Update. The same device asking on every boot means the install never completes, often because another driver or a security product holds the old one in place.

**When to ignore:** A single record after a driver install, followed by a restart, is routine.

**What to check:**

- Restart the host at the next maintenance window.
- When the same device asks on every boot, reinstall the driver package.

**Related:**

- `device_software_install_failed`: an install that failed, rather than waiting for a restart

**Example:** After Windows Update installs a new graphics driver on a laptop, Windows logs event 8000 and waits for a restart to finish.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_install_reboot_pending, https://sparklogs.com/reference/reasons/device_install_reboot_pending.json

## `device_removal_vetoed`: device removal vetoed

Something on the device still holds the hardware open, so Windows refused the removal request.

**Severity:** Notice

**Why it matters:** The device cannot be safely removed or ejected, and the user sees a device-in-use message until the holder releases it.

**In practice:** Windows writes event 1000 in Microsoft-Windows-Kernel-PnP/Device Management when a request to remove or eject a device is refused, with the veto type and the name of what refused it. The veto type says what kind of holder it is: an application, a service, a driver, or open handles to the device. This is Windows protecting data in flight, so nothing has failed.

**When to ignore:** An occasional refusal that the user resolves by closing the program is routine. Look further only when the same holder vetoes the same device every day.

**What to check:**

- Read the veto holder and the veto type on the event.
- Close the named application or stop the named service when the veto type says an app or service holds it.
- Update the driver when the veto type says the driver refused to release the device.

**Related:**

- `device_removed_after_failure`: the opposite outcome, when the device drops off instead of being held open

**Example:** A user tries to eject a USB drive while a backup program still has a file open on it, and Windows refuses the removal.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_removal_vetoed, https://sparklogs.com/reference/reasons/device_removal_vetoed.json

## `device_removed_after_failure`: device removed after failure

A device dropped off its bus while the driver was still reporting it as failing.

**Severity:** Warning

**Why it matters:** The device is gone from the machine until it is reconnected or the machine restarts. For an internal storage or network device, that can take a disk or the network connection with it.

**In practice:** Windows writes event 1011 in Microsoft-Windows-Kernel-PnP/Device Management when it removes a device that its driver had reported as failed, so the removal follows a fault, not a user unplugging it. The event carries the bus the device was on, the first part of its device instance ID (such as PCI or USB), and how many devices went with it. On an internal device this points at failing hardware or a driver fault; on USB it is often a cable, hub, dock or port.

**What to check:**

- Read the bus on the event: PCI or another internal bus is a hardware ticket; USB points at the cable, hub, dock or port first.
- Check the System log for driver errors from the same device just before.
- Update the device's driver and the platform firmware when it repeats.

**Related:**

- `device_removal_vetoed`: the opposite outcome, when something holds the device open instead
- `driver_load_failed`: a driver failure that can come before this removal

**Example:** A USB network adapter on a dock drops off after its driver reports it failed, and Windows logs event 1011.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_removed_after_failure, https://sparklogs.com/reference/reasons/device_removed_after_failure.json

## `device_security_assessment_failed`: device security assessment failed

A Dell security assessment reported a failing result for this machine's platform posture.

**Severity:** Notice

**Why it matters:** One or more security settings on the machine, such as a BIOS password, disk encryption, firewall or antivirus, are below what the assessment expects.

**In practice:** Dell Trusted Device writes event 14 or 15 from its Security Assessment provider in the Dell event log after it scores the machine's security posture. This reason is a result of FAILED; the areas marked FAIL or HIGH are listed in the event and in `security_assessment_failed_areas`. The score alone does not say what to fix. Areas marked UNAVAILABLE are checks that did not run, not findings.

**What to check:**

- Read the failed areas, not just the score.
- Fix FAIL or HIGH areas such as a missing BIOS password or disk encryption.
- Treat UNAVAILABLE areas as scans that did not run; look for firmware verification scan failures on the same machine.

**Related:**

- `device_security_assessment_passed`: the same assessment passing
- `platform_tamper_indicator_reported`: a tamper finding from the same Dell security agent

**Example:** A Dell laptop's security assessment fails because no BIOS administrator password is set and disk encryption is off.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_security_assessment_failed, https://sparklogs.com/reference/reasons/device_security_assessment_failed.json

## `device_security_assessment_passed`: device security assessment passed

A Dell security assessment reported a passing result (with or without warnings) for this machine's platform posture.

**Severity:** Notice or Info

**Why it matters:** The machine meets the assessment. A pass with warnings names softer areas an administrator may still want to change.

**In practice:** Dell Trusted Device writes event 14 or 15 from its Security Assessment provider in the Dell event log after it scores the machine's security posture. A result of PASSED, with warnings is recorded at Notice; the warning areas are listed in the event. A plain pass, or a score with no result line, is recorded at Info.

**When to ignore:** Info rows for a plain pass are a record that the assessment ran.

**What to check:**

- On a pass with warnings, read the warning areas and decide whether to change them.

**Related:**

- `device_security_assessment_failed`: the same assessment failing
- `platform_tamper_indicator_reported`: a tamper finding from the same Dell security agent

**Example:** A Dell desktop passes its security assessment with a warning about the firewall settings.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_security_assessment_passed, https://sparklogs.com/reference/reasons/device_security_assessment_passed.json

## `device_software_install_failed`: device software install failed

Windows failed to install companion software or a driver for a device.

**Severity:** Warning when a vendor installer exit code is present, Notice otherwise; Info for retry or stopped-update cases

**Why it matters:** The device may work at a basic level with no control panel or vendor utility, or with no full driver, until setup succeeds.

**In practice:** Windows writes events 121, 151, 152, 163, 164, 172 and 191 in Microsoft-Windows-DeviceSetupManager/Admin when it cannot install the driver or companion app a device asks for, with the software name, a status code and, when a vendor installer ran, its exit code. Event 164 says Windows will retry later, and 121 or 172 with WU_E_SERVICE_STOP (0x8024001E) means the Windows Update service stopped during the install; both are recorded at Info. Events 151 and 152 mean a device would not leave the device list, recorded at Notice. A vendor installer that ran and returned an exit code is recorded at Warning.

**When to ignore:** Info rows for a later retry or a stopped update service, when a later install succeeds.

**What to check:**

- Read the software name, the exit code and the status code.
- Wait or retry when Windows marks the error transient or the update service was stopped.
- Reinstall or replace the vendor package when an installer exit code appears.

**Related:**

- `device_install_reboot_pending`: the pending-restart state an install can also end in
- `device_start_failed`: the device failing to start, which can follow a bad install

**Example:** A printer's vendor utility fails to install from Windows Update with an installer exit code, and Windows logs event 163.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_software_install_failed, https://sparklogs.com/reference/reasons/device_software_install_failed.json

## `device_start_failed`: device start failed

Windows enumerated a device and its driver refused to start it.

**Severity:** Warning

**Why it matters:** The device does not work until someone fixes the driver or the hardware conflict.

**In practice:** Windows writes event 411 in Microsoft-Windows-Kernel-PnP/Configuration when a device fails to start, with the Device Manager problem code, the driver's inf, the driver service and a status code. The problem code names the stage that failed: code 10 means the device did not start, code 12 is a resource conflict, code 37 means the driver failed to load, and code 43 means Windows stopped the device after it reported problems. A driver that does not match the hardware or the Windows version, failing hardware, or two devices claiming the same resources is the usual cause.

**What to check:**

- Read the problem code first, then the driver inf and service.
- Code 10 or 37: reinstall or update the driver from the hardware vendor.
- Code 12: resolve the resource conflict, often by updating the BIOS or moving a card.
- Code 43: update the driver and firmware; if it persists, suspect the hardware.

**Related:**

- `device_software_install_failed`: an install failure that can leave the driver unable to start the device
- `driver_load_failed`: the driver failing to load, one cause of a device refusing to start

**Example:** After a Windows feature update, a laptop's fingerprint reader fails to start with problem code 10.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#device_start_failed, https://sparklogs.com/reference/reasons/device_start_failed.json

## `firmware_event_store_unavailable`: firmware event store unavailable

A Dell secure firmware-event store cannot be verified.

**Severity:** Warning or Notice

**Why it matters:** The Dell security agent cannot vouch for the records in that store, so BIOS events and tamper indicators it would report from it cannot be trusted until the store is rebuilt.

**In practice:** Dell Trusted Device keeps tamper-evident stores for BIOS events, firmware messages and tamper indicators, and writes events from its Secure Event Log provider in the Dell event log. Event 21 means the signing keys for one store are missing, so its records cannot be verified; it is recorded at Notice. Event 45 means the agent tried to repair the store and could not; that gap does not clear on its own and is recorded at Warning.

**What to check:**

- Read the store name on the event.
- Reinstall or update the Dell Trusted Device agent when the repair failed.
- Treat the absence of tamper indicators on that machine as unknown, not clean, until the store is rebuilt.

**Related:**

- `firmware_verification_scan_failed`: another firmware check from the same Dell agent that did not finish

**Example:** After a BIOS reset, the Dell agent finds the signing keys for its BIOS event store missing and logs event 21.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#firmware_event_store_unavailable, https://sparklogs.com/reference/reasons/firmware_event_store_unavailable.json

## `firmware_verification_scan_failed`: firmware verification scan failed

A vendor firmware verification scan did not finish.

**Severity:** Notice or Info

**Why it matters:** The firmware check did not run to completion, so this machine's BIOS, Intel ME or component integrity was not checked on that scan. It is not a finding that the firmware is bad.

**In practice:** Dell Trusted Device checks the BIOS, the Intel Management Engine, known firmware vulnerabilities and the factory component record, and writes events 2, 20, 47, 42 and 43 in the Dell event log when a scan stops. The result text says why. A network or connectivity error means the machine could not reach Dell's verification service, usually because of a proxy or firewall, and is recorded at Notice. An unsupported-platform result means the check does not apply to this model, recorded at Info.

**When to ignore:** Info rows with an unsupported-platform result: the check never applies to that model.

**What to check:**

- Read the scan name and the result text on the event.
- Allow the Dell verification service through the proxy or firewall when the result names a network error.
- For any other failure that repeats, update the Dell Trusted Device agent.

**Related:**

- `firmware_event_store_unavailable`: a Dell event store that cannot be verified, another gap in the same agent's checks

**Example:** A Dell laptop behind a web proxy cannot reach Dell's verification service, and the BIOS verification scan stops with a network error.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#firmware_verification_scan_failed, https://sparklogs.com/reference/reasons/firmware_verification_scan_failed.json

## `font_load_allowed`: font load allowed

A process loaded a font under an audit-mode font-loading policy.

**Severity:** Info

**Why it matters:** Nothing was refused. The record shows which fonts the block policy would stop if it were switched from audit to block.

**In practice:** Windows writes event 260 in Microsoft-Windows-Win32k/Operational when a process loads a font from outside the Windows font folder while the untrusted-font blocking policy is set to audit. The event names the font file and the process, and its text says the load was restricted even though Windows allowed it.

**When to ignore:** These records are routine while the policy is in audit mode.

**What to check:**

- Before switching the policy to block, list the fonts and processes these records name and install the fonts that are needed in the Windows font folder.

**Related:**

- `font_load_blocked`: the same policy refusing a load

**Example:** With untrusted font blocking set to audit, a desktop publishing application loads a font from a user's Downloads folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#font_load_allowed, https://sparklogs.com/reference/reasons/font_load_allowed.json

## `font_load_blocked`: font load blocked

A process tried to load a font while a font-loading restriction was in force, and Windows refused it.

**Severity:** Notice

**Why it matters:** The named application shows or prints text in the wrong font until the font is installed system-wide or the application is exempted.

**In practice:** Windows writes event 260 in Microsoft-Windows-Win32k/Operational when the untrusted-font blocking policy stops a process from loading a font from outside the Windows font folder. The event names the font file and the process. An administrator sets this policy on purpose, usually through Group Policy, to block font-based attacks.

**What to check:**

- Install the font in the Windows font folder, or exempt the application from the policy.

**Related:**

- `font_load_allowed`: the same policy allowing a load in audit mode

**Example:** Untrusted font blocking stops a line-of-business application from loading its own font from its install folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#font_load_blocked, https://sparklogs.com/reference/reasons/font_load_blocked.json

## `gpu_resources_saturated`: gpu resources saturated

The desktop compositor ran short of graphics memory or bandwidth.

**Severity:** Notice

**Why it matters:** The user sees stutter, dropped frames or a brief black screen while the contention lasts.

**In practice:** Windows writes event 500 in Microsoft-Windows-Diagnostics-Performance/Operational, "The Desktop Window Manager is experiencing heavy resource contention", with the graphics memory size and bandwidth.

**When to ignore:** An occasional record on a machine whose user reports no display problems.

**What to check:**

- Check the graphics memory figure and the number and resolution of displays.
- Update the graphics driver.
- When it repeats on one host, reduce display count or resolution, or move the user to hardware with more graphics memory.

**Related:**

- `gpu_driver_reset`: the graphics driver resetting, which can follow sustained contention

**Example:** A laptop with integrated graphics drives two 4K monitors on a dock, and Windows logs event 500 as the desktop stutters.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#gpu_resources_saturated, https://sparklogs.com/reference/reasons/gpu_resources_saturated.json

## `live_kernel_dump_requested`: live kernel dump requested

A kernel component requested a live kernel dump and Windows completed the request.

**Severity:** Notice

**Why it matters:** The machine kept running, but the component that asked for the dump, often a network, graphics or power driver, stalled long enough to trip a watchdog, and users may have noticed a freeze.

**In practice:** Windows writes events 1001 and 1002 in Microsoft-Windows-WerKernel/Operational when a kernel component asks Windows to write a dump of the machine's state without crashing it. The component name says which watchdog fired. Windows saves the dump under the LiveKernelReports folder in the Windows directory, and may throttle repeated requests.

**What to check:**

- Read the component name on the event.
- Update the driver behind that component, and the platform firmware, when it repeats on one host.
- Collect the dump from the LiveKernelReports folder for the hardware or driver vendor when updates do not help.

**Related:**

- `os_bsod`: a crash that stopped the machine, rather than a dump taken while it kept running

**Example:** A laptop's display freezes for a few seconds and recovers, and Windows writes a live kernel dump for the graphics watchdog.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#live_kernel_dump_requested, https://sparklogs.com/reference/reasons/live_kernel_dump_requested.json

## `measured_boot_failed`: measured boot failed

Windows reported a boot-measurement library failure during boot.

**Severity:** Warning

**Why it matters:** The record of what loaded during this boot may be incomplete, so features that rely on it, such as device health attestation, can fail for this boot.

**In practice:** Windows writes event 208 in Microsoft-Windows-Kernel-Boot/Operational when the library that measures the boot components into the TPM fails, with reason and state codes and a status code. Boot continued. The event identifies a boot-measurement problem; it does not show that the TPM is absent, that BitLocker is affected, or that the boot chain was attacked.

**What to check:**

- Read the status code on the event.
- Check TPM readiness (`Get-Tpm` or tpm.msc), Secure Boot state and firmware version on the host.
- Apply the PC maker's firmware update or Windows fix for the reported status before clearing or resetting the TPM.

**Related:**

- `tpm_attestation_failed`: the attestation failure a broken boot measurement can cause
- `tpm_initialization_failed`: the TPM itself failing to initialize, a different fact

**Example:** After a BIOS update, a laptop logs event 208 at boot when the boot-measurement library fails.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#measured_boot_failed, https://sparklogs.com/reference/reasons/measured_boot_failed.json

## `os_boot_duration_high`: os boot duration high

Windows logged a slow boot or a slow startup component.

**Severity:** Warning for whole boot at 120 s or with BootIsDegradation; Notice for component degradation at 30 s or whole boot at 60 s

**Why it matters:** Users wait longer at every start before they can work, and a component that keeps slowing boot keeps costing that time.

**In practice:** Windows writes event 100 in Microsoft-Windows-Diagnostics-Performance/Operational with how long the whole boot took, in milliseconds, and whether Windows itself judged it slower than normal (BootIsDegradation). Events 101, 103, 107 and 108 each name one startup item, such as an application, a driver or a service, and how much time it added. The provider's own level on these events reflects a duration bucket, so the duration and degradation fields decide how the row is recorded. Startup applications, security and management agents, slow disks and pending updates are the usual causes.

**When to ignore:** Info rows: boots and startup items within the normal range.

**What to check:**

- Read the boot time on event 100, and the component name and degradation time on the component events.
- Remove or update the named product from startup when the same host is slow for several days.
- Check Task Manager's Startup tab for high-impact startup apps.

**Related:**

- `os_shutdown_duration_high`: the same slowness on the shutdown side

**Example:** A desktop takes over two minutes to boot, and Windows names a third-party update agent as the startup item that added most of the time.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#os_boot_duration_high, https://sparklogs.com/reference/reasons/os_boot_duration_high.json

## `os_clock_drift`: os clock drift

This host's clock hardware runs at the wrong rate.

**Severity:** Notice

**Why it matters:** The clock is right for now because the time service keeps correcting it. If synchronization stops, the clock walks away at the stated rate, and sign-ins, certificates and log timestamps start failing or disagreeing.

**In practice:** The Windows Time service writes event 282 in Microsoft-Windows-Time-Service/Operational with the average frequency error it is correcting, in parts per million, the drift that adds up to per day, and the time window it covers. A large correction means the clock source on this machine runs fast or slow, and only constant synchronization keeps it right.

**What to check:**

- Check that the host reaches its time source: `w32tm /query /status`.
- On a virtual machine, check the host's time configuration and the guest time integration service.
- When the same host reports a large correction every day, raise it with the hardware vendor.

**Example:** A desktop's clock gains several seconds a day, and the time service logs event 282 with the correction it applies.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#os_clock_drift, https://sparklogs.com/reference/reasons/os_clock_drift.json

## `os_crash_dump_unavailable`: os crash dump unavailable

Windows could not set up the path it writes a crash dump through.

**Severity:** Warning

**Why it matters:** If the host crashes, it may leave no dump, so the cause of the crash cannot be analyzed.

**In practice:** Windows writes event 5 or 9 in Microsoft-Windows-Kernel-Dump/Operational at startup when it cannot prepare to write a crash dump, with a status code. A file-not-found status usually means there is no page file on the system volume, or it is too small for the dump type set in Startup and Recovery. The event repeats at every boot until the page file or the dump settings are fixed.

**What to check:**

- Check the page file on the system volume in System Properties, Advanced, Performance.
- Size the page file for the dump type in Startup and Recovery, or choose a smaller dump type.
- A kernel crash reported without dump analysis after this event is explained by it.

**Related:**

- `crash_dump_page_file_too_small`: a page file too small to hold the configured dump
- `kernel_crash`: a kernel crash on this host, which can arrive without dump analysis after this event

**Example:** A server with its page file moved off the system drive logs event 5 at every boot, with a file-not-found status.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#os_crash_dump_unavailable, https://sparklogs.com/reference/reasons/os_crash_dump_unavailable.json

## `os_shutdown_duration_high`: os shutdown duration high

Windows logged a slow shutdown or a service that delayed shutdown.

**Severity:** Warning when ShutdownIsDegradation is true; Notice for long shutdown or slow service

**Why it matters:** Restarts and shutdowns take longer, and a user who gives up and holds the power button causes an unclean shutdown.

**In practice:** Windows writes event 200 in Microsoft-Windows-Diagnostics-Performance/Operational with how long the whole shutdown took and whether Windows itself judged it slower than normal (ShutdownIsDegradation). Event 203 names one service that delayed shutdown and how much time it added. Backup, database and security agents that are slow to stop, and updates installing at shutdown, are the usual causes.

**When to ignore:** Info rows: shutdowns and services within the normal range.

**What to check:**

- Read Name on event 203 for the service that held shutdown open.
- Update or reconfigure that service when slow shutdowns repeat on one host.

**Related:**

- `os_boot_duration_high`: the same slowness on the startup side

**Example:** A workstation's restart takes several minutes because a backup agent's service is slow to stop, and Windows logs event 203 naming it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#os_shutdown_duration_high, https://sparklogs.com/reference/reasons/os_shutdown_duration_high.json

## `platform_tamper_indicator_reported`: platform tamper indicator reported

A platform-security agent reported a tamper indicator against this machine.

**Also reported by:** `win.eventlog.system`

**Severity:** Error, Warning or Notice

**Why it matters:** BIOS settings on the machine, such as allowing BIOS downgrade or capsule firmware updates, or the chassis, are in a state the agent links to tampering. Settings like these weaken the machine's firmware protection however they came to be set.

**In practice:** Dell Trusted Device writes events 10, 11 and 12 from its BIOS Events and IoA provider in the Dell event log, with the category it matched and the BIOS or chassis events it built the indicator from. A partial indicator means the agent has matched part of a pattern and is still watching, and is recorded at Warning. An indicator that has escalated, or is detected outright, means the pattern is complete, and is recorded at Error. Event 10 records the indicator clearing, at Notice. A technician opening the case to add memory, or an administrator allowing BIOS downgrade for a planned rollback, produces the same records.

**When to ignore:** Indicators that line up with a recorded service visit or planned BIOS change, followed by event 10 clearing them.

**What to check:**

- Read the category and the listed events from the message: they name what was matched.
- Check whether a planned BIOS change or a hardware service visit explains it.
- Where nothing explains it, put the named BIOS settings back and investigate who had access to the machine.
- When event 10 clears an indicator, match the category to the earlier partial or escalated event on the same host.

**Example:** A technician opens a desktop's case to add memory, and the Dell agent reports a chassis-intrusion indicator.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#platform_tamper_indicator_reported, https://sparklogs.com/reference/reasons/platform_tamper_indicator_reported.json

## `portable_device_unresponsive`: portable device unresponsive

A phone, camera, or media player on USB stopped answering.

**Severity:** Info

**Why it matters:** A file transfer to or from the device stopped. Nothing on the computer itself is affected.

**In practice:** The Media Transfer Protocol driver writes these in Microsoft-Windows-WPD-MTPClassDriver/Operational. Event 1007 says the device did not respond to an operation within 5 minutes and Windows tried to cancel it. Event 1008 says the device did not report its status for an operation, and event 1006 says the driver failed to start, with an HRESULT. A phone that locked or went to sleep during a transfer, a loose cable, or the user unplugging it is the usual cause.

**When to ignore:** Almost always: it describes the phone or camera, not the managed computer.

**What to check:**

- Have the user unplug the device, unlock it, and plug it back in.

**Example:** A user's phone locks halfway through copying photos to a laptop, and Windows logs event 1007.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#portable_device_unresponsive, https://sparklogs.com/reference/reasons/portable_device_unresponsive.json

## `ram_commit_exhausted`: ram commit exhausted

Committed memory on this host reached its limit.

**Also reported by:** `win.eventlog.system`

**Severity:** Warning, Notice or Info

**Why it matters:** Programs fail to allocate memory, so they hang, crash or refuse to open files until memory is freed.

**In practice:** The Windows resource exhaustion detector writes events in Microsoft-Windows-Resource-Exhaustion-Detector/Operational. Event 1003 is the low-memory notification, with the committed memory and its limit; the same condition appears as event 2004 in the System log, which names the top consumers, so 1003 is recorded at Info. Event 1007 means the detector itself could not allocate memory, recorded at Warning. Event 1008 means its diagnosis pass failed, usually for lack of memory, recorded at Notice. A process leaking memory, or a page file too small for the workload, is the usual cause.

**When to ignore:** Info rows for event 1003 when you already read event 2004 for the same moment: they report the same condition.

**What to check:**

- Read event 2004 in the System log at the same time for the processes using the most memory.
- Restart or update the process holding the commit when one process explains it.
- Add memory or a larger page file when no single process explains it.

**Example:** A terminal server runs out of committed memory during the morning logon rush, and the detector logs event 1003 beside event 2004 in the System log.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#ram_commit_exhausted, https://sparklogs.com/reference/reasons/ram_commit_exhausted.json

## `secure_boot_revocation_update_failed`: secure boot revocation update failed

Windows tried to write its boot revocation level into firmware and the firmware refused.

**Severity:** Info

**Why it matters:** The boot components Microsoft has revoked in its Secure Boot Advanced Targeting (SBAT) list can still boot on this machine until the update succeeds.

**In practice:** Windows writes event 292 in Microsoft-Windows-Kernel-Boot/Operational when it cannot apply the SBAT revocation level to the firmware, with the failure point, an update status, the firmware's current level and a status code. Machines that also boot Linux can hold a different SBAT level on purpose. The same failure across a whole model points at the firmware rather than at one machine.

**When to ignore:** When every machine of the same model reports it and no firmware update is available yet.

**What to check:**

- Check what else boots this machine; dual-boot hosts may hold a different revocation level on purpose.
- On a Windows-only host, apply the PC maker's latest firmware update and let Windows retry.

**Related:**

- `secure_boot_cert_update_pending`: the Secure Boot certificate update that uses the same firmware write path

**Example:** A Windows-only desktop's firmware refuses the SBAT update at boot, and Windows logs event 292.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#secure_boot_revocation_update_failed, https://sparklogs.com/reference/reasons/secure_boot_revocation_update_failed.json

## `thermal_cooling_engaged`: thermal cooling engaged

The platform reached a temperature trip point and engaged cooling.

**Severity:** Notice or Info

**Why it matters:** Active cooling is fan noise. Passive cooling slows the processor, so the machine feels sluggish while the heat lasts.

**In practice:** Windows writes event 116 in Microsoft-Windows-Kernel-Power/Thermal-Operational when a thermal zone turns on active cooling (fans), and event 114 when it turns on passive cooling, which throttles the processor. The events carry the zone, its temperature and the trip points. Active cooling is recorded at Info, passive cooling at Notice, and a cooling state of zero, the zone back under its trip point, closes the episode. Blocked vents, dust, a failing fan, or a laptop used on a soft surface is the usual cause of long passive cooling.

**When to ignore:** A single active-cooling record, and the record of cooling turning off.

**What to check:**

- Check how long passive cooling lasts on the host.
- Clean fans and vents, check the fan works, and improve airflow when passive cooling runs for hours on one host.
- Update the BIOS and the chipset or thermal drivers from the PC maker.

**Related:**

- `cpu_busy`: sustained CPU load that can bring on this cooling

**Example:** A laptop used on a bed reaches its passive trip point during a video call, and Windows throttles the processor and logs event 114.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#thermal_cooling_engaged, https://sparklogs.com/reference/reasons/thermal_cooling_engaged.json

## `tpm_initialization_failed`: tpm initialization failed

Windows reported a TPM initialization failure during boot.

**Severity:** Warning

**Why it matters:** Features that need the TPM during boot, such as BitLocker unlocking with the TPM or device health attestation, can fail or fall back for this boot.

**In practice:** Windows writes event 235 in Microsoft-Windows-Kernel-Boot/Operational when the boot environment cannot initialize the TPM, with a position code and a status code. The event does not show that the TPM is absent, that BitLocker is affected or that the boot chain was attacked.

**What to check:**

- Read the status code on the event.
- Check TPM readiness (`Get-Tpm` or tpm.msc), whether the TPM is enabled in the firmware, Secure Boot state and firmware version.
- Apply the PC maker's firmware or TPM update for the reported status before clearing or resetting the TPM.

**Related:**

- `measured_boot_failed`: the boot-measurement library failing, a different fact
- `tpm_attestation_failed`: the attestation failure a TPM problem can cause

**Example:** After a firmware update resets TPM settings, a laptop logs event 235 at boot.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#tpm_initialization_failed, https://sparklogs.com/reference/reasons/tpm_initialization_failed.json

## `usb_controller_error`: usb controller error

The USB host controller or USB-C connector manager reported a fault.

**Severity:** Notice

**Why it matters:** Devices on that controller, or on a dock behind it, stop working or charging until it resets.

**In practice:** Windows writes events 50 and 62 in Microsoft-Windows-USB-USBXHCI-Operational when the USB 3 (xHCI) host controller driver reports a fault, and event 1 in Microsoft-Windows-USB-UCMUCSICX/Operational when the USB-C connector manager reports one, with failure type codes and a status. Docks, and outdated platform or dock firmware, are common sources.

**What to check:**

- Unplug and replug the device or dock.
- Update the chipset driver, the platform firmware and the dock firmware when the same host reports this daily.
- Try another port or dock to tell a controller fault from a dock fault.

**Related:**

- `portable_device_unresponsive`: a USB device that stopped answering, which a controller fault can cause

**Example:** A laptop's USB-C dock stops working after the laptop resumes from sleep, and the xHCI driver logs event 62.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#usb_controller_error, https://sparklogs.com/reference/reasons/usb_controller_error.json

## `win_trace_session_failed`: win trace session failed

A Windows tracing session could not start, write, or continue.

**Severity:** Warning or Info

**Why it matters:** The program that owns the trace session loses that trace data; nothing else on the machine is affected unless the disk is full.

**In practice:** Windows writes events 0, 1, 2, 3, 4 and 28 in Microsoft-Windows-Kernel-EventTracing/Admin when a trace session, which diagnostic tools, security agents and Windows components use to collect events, fails to start, write or keep running, with the session name and a status code. A name-collision status (0xC0000035) is a product starting a session it already has running, and a log-file-full status (0xC0000188) is a bounded trace file wrapping; both are routine and recorded at Info. A disk-full status (0xC000007F) means the volume is out of space, a host problem recorded at Warning.

**When to ignore:** Name-collision and log-file-full statuses: the session already exists or its file wrapped by design.

**What to check:**

- Read the session name and the status code on the event.
- Free disk space when the status says the volume is full.
- When one product's session fails with any other status, update or reinstall that product.

**Example:** A security agent tries to start its trace session again after an update, and Windows logs event 2 with a name-collision status.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-platform#win_trace_session_failed, https://sparklogs.com/reference/reasons/win_trace_session_failed.json
