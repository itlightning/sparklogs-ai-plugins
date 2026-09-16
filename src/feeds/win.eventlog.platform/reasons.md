<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.platform`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `boot_integrity_measurement_failed` | `os_stability` | Warning |  |
| `device_install_reboot_pending` | `hardware` | Notice |  |
| `device_removal_vetoed` | `hardware` | Notice |  |
| `device_removed_after_failure` | `hardware` | Warning |  |
| `device_security_assessment_reported` | `hardware` | Notice or Info |  |
| `device_software_install_failed` | `hardware` | Warning when a vendor installer exit code is present, Notice otherwise; Info for retry or stopped-update cases | benign possible |
| `device_start_failed` | `hardware` | Warning |  |
| `firmware_event_store_unavailable` | `hardware` | Warning or Notice |  |
| `firmware_verification_scan_failed` | `hardware` | Notice or Info | benign possible |
| `font_load_blocked` | `os_stability` | Notice or Info | benign possible |
| `gpu_resource_contention` | `performance` | Notice |  |
| `live_kernel_dump_requested` | `os_stability` | Notice |  |
| `os_boot_duration_high` | `performance` | Warning for whole boot at 120 s or with BootIsDegradation; Notice for component degradation at 30 s or whole boot at 60 s |  |
| `os_clock_drift` | `time_sync` | Notice |  |
| `os_crash_dump_unavailable` | `os_stability` | Warning |  |
| `os_shutdown_duration_high` | `performance` | Warning when ShutdownIsDegradation is true; Notice for long shutdown or slow service |  |
| `platform_tamper_indicator_reported` | `endpoint_protection` | Error, Warning or Notice |  |
| `portable_device_unresponsive` | `hardware` | Info |  |
| `ram_commit_high` | `performance` | Warning at or above 95% commit ratio, Notice for diagnosis failure or lower ratio |  |
| `secure_boot_revocation_update_failed` | `os_stability` | Info |  |
| `thermal_cooling_engaged` | `hardware` | Notice or Info |  |
| `usb_controller_error` | `hardware` | Notice |  |
| `win_trace_session_failed` | `os_stability` | Warning or Info | benign possible |

## `boot_integrity_measurement_failed`

Windows reported a boot-measurement library failure or a TPM initialization failure during boot.

**Severity:** Warning

**Impact:** These events identify a boot-measurement or TPM initialization problem. They do not establish TPM absence, BitLocker behavior, attestation results, or a boot-chain attack.

**Consider:**

- Read the event id and status from the promoted fields.
- Check TPM readiness, Secure Boot state, firmware state, and related Windows boot records on the affected host.
- Apply the vendor or Windows remediation for the reported status before changing TPM state.

## `device_install_reboot_pending`

Windows installed a driver and cannot finish until the host restarts.

**Severity:** Notice

**Impact:** The device may work only partly until the host restarts.

**Consider:**

- Restart the host at the next maintenance window.
- When the same device asks on every boot, reinstall the driver package.

## `device_removal_vetoed`

Something on the device still holds the hardware open, so Windows refused the removal request.

**Severity:** Notice

**Impact:** The payload names the holder. The user sees a device-in-use dialog until the holder releases it.

**Consider:**

- Read VetoName in the promoted fields.
- Close the named application or service when the veto type says an app or service holds it.
- Update the driver when the veto type says the driver refused to release the device.

## `device_removed_after_failure`

A device dropped off its bus while the driver was still reporting it as failing.

**Severity:** Warning

**Impact:** Windows removed the device immediately. Internal storage or network devices need hardware attention; USB peripherals often mean cable, hub, or port issues.

**Consider:**

- Read the device class from the promoted fields.
- Treat internal storage or network removal as a hardware ticket.
- For USB peripherals, check cable, hub, and port when it repeats.

## `device_security_assessment_reported`

A Dell security assessment scored this machine's platform posture.

**Severity:** Notice or Info

**Impact:** The result and risk-area lines name settings an administrator controls. The score alone does not say what to fix.

**Consider:**

- Read the risk-area lines, not just the score.
- Fix FAIL or HIGH areas such as missing BIOS password or disk encryption.
- Treat UNAVAILABLE areas as scans that did not run; see firmware verification scan failures.

## `device_software_install_failed`

Windows failed to install companion software or a driver for a device.

**Severity:** Warning when a vendor installer exit code is present, Notice otherwise; Info for retry or stopped-update cases

**Impact:** The user may lack a control panel, vendor utility, or full driver until setup succeeds.

**Consider:**

- Read the exit code on id 163 and the status on id 121.
- Wait or retry when Windows marks the error transient or the update service was stopped.
- Reinstall or replace the vendor package when a fatal installer exit code appears.

## `device_start_failed`

Windows enumerated a device and its driver refused to start it.

**Severity:** Warning

**Impact:** The device does not work until someone fixes the driver or hardware conflict.

**Consider:**

- Read the problem code first.
- Code 10: reinstall or update the driver.
- Code 12: resolve the resource conflict between two devices.

## `firmware_event_store_unavailable`

A Dell secure firmware-event store cannot be verified.

**Severity:** Warning or Notice

**Impact:** The platform-security agent cannot verify records from the named store until it is rebuilt.

**Consider:**

- Read the store name from the promoted fields.
- Reinstall the vendor agent on affected hosts when repair failed.
- Treat tamper-indicator silence on those hosts as unknown, not clean, until the store is rebuilt.

## `firmware_verification_scan_failed`

A vendor firmware verification scan did not finish.

**Severity:** Notice or Info

**Impact:** The result text says why the scan stopped. It does not report a firmware integrity failure by itself.

**Consider:**

- Read the result text from the promoted fields.
- Open the proxy or firewall path when the result names a network error.
- Ignore unsupported-platform results; the check never applies to that model.

## `font_load_blocked`

A process tried to load a font while a font-loading restriction was in force.

**Severity:** Notice or Info

**Impact:** When Blocked is true, the named application renders or prints text incorrectly until the font is installed system-wide or the app is exempted.

**Consider:**

- Install the font system-wide or exempt the application when Blocked is true.
- Treat Blocked false rows as audit-only context, not a user failure.

## `gpu_resource_contention`

The desktop compositor ran short of graphics memory or bandwidth.

**Severity:** Notice

**Impact:** The user sees stutter or display interruptions while contention lasts.

**Consider:**

- Check the display memory figure in the promoted fields.
- Reduce display count or resolution, or move the user to hardware with more graphics memory, when it repeats on one host.

## `live_kernel_dump_requested`

A kernel component requested a live kernel dump and Windows completed the request.

**Severity:** Notice

**Impact:** The component name points to the subsystem that stalled long enough to trip a watchdog.

**Consider:**

- Read the component name from the promoted fields.
- Update the driver behind a network or power watchdog when it repeats daily on one host.

## `os_boot_duration_high`

Windows logged a slow boot or a slow startup component.

**Severity:** Warning for whole boot at 120 s or with BootIsDegradation; Notice for component degradation at 30 s or whole boot at 60 s

**Impact:** The duration fields show whether the whole boot or one named startup item caused the delay.

**Consider:**

- Read DegradationTime and the component name on startup delay ids.
- Remove or update the named product from startup when the same host is slow for several days.

## `os_clock_drift`

This host's clock hardware runs at the wrong rate.

**Severity:** Notice

**Impact:** The time service holds the clock in place with continuous correction. When synchronization stops, the clock walks away at the stated rate.

**Consider:**

- Check that the host reaches its time source.
- Replace the board battery on a desktop when correction exceeds about 50 parts per million.

## `os_crash_dump_unavailable`

Windows could not set up the path it writes a crash dump through.

**Severity:** Warning

**Impact:** The next bugcheck on this host may leave no dump to analyse.

**Consider:**

- Check the page file on the system volume.
- Size the page file for the configured dump type when the status says the file was not found.

## `os_shutdown_duration_high`

Windows logged a slow shutdown or a service that delayed shutdown.

**Severity:** Warning when ShutdownIsDegradation is true; Notice for long shutdown or slow service

**Impact:** The duration fields show whether the whole shutdown or one named service caused the delay.

**Consider:**

- Read Name on id 203 for the service that held shutdown open.
- Update or reconfigure that service when degraded shutdown repeats on one host.

## `platform_tamper_indicator_reported`

A platform-security agent reported a tamper indicator against this machine.

**Also reported by:** `win.eventlog.system`

**Severity:** Error, Warning or Notice

**Impact:** The agent names the category it matched and the firmware or chassis events it built the indicator from. An indicator names what the agent matched; read the named settings to see what the machine is actually set to.

**Consider:**

- Read the Category and the listed events from the message: they name what was matched.
- Check whether a deliberate BIOS change or a hardware service visit explains it.
- Where nothing explains it, treat the named firmware settings as the thing to put back.
- When event 10 clears an indicator, match the category to the earlier partial or escalated event on the same host.

## `portable_device_unresponsive`

A phone, camera, or media player on USB stopped answering.

**Severity:** Info

**Impact:** Nothing on the managed host is affected. The user unlocks the device and plugs it back in.

**Consider:**

- Have the user unplug the device, unlock it, and plug it back in.

## `ram_commit_high`

Committed memory on this host reached its limit.

**Also reported by:** `performance`

**Severity:** Warning at or above 95% commit ratio, Notice for diagnosis failure or lower ratio

**Impact:** Applications can fail allocations while committed memory stays near its limit.

**Consider:**

- Find the process holding the commit and restart or update it.
- Add memory or a larger page file when no single process explains it.

## `secure_boot_revocation_update_failed`

Windows tried to write its boot revocation level into firmware and the firmware refused.

**Severity:** Info

**Impact:** Revocations Microsoft ships in the SBAT list are not enforced on this host until the update succeeds.

**Consider:**

- Check what else boots this machine; dual-boot hosts may hold a different revocation level on purpose.
- On a Windows-only host, apply a firmware update when this appears on a minority of the fleet.

## `thermal_cooling_engaged`

The platform reached a temperature trip point and engaged cooling.

**Severity:** Notice or Info

**Impact:** Active cooling is fan noise. Passive cooling slows the processor while heat persists.

**Consider:**

- Take no action for a single active-cooling event.
- Clean fans or improve airflow when passive cooling runs for hours on one host.

## `usb_controller_error`

The USB host controller or USB-C connector manager reported a fault.

**Severity:** Notice

**Impact:** Devices on that controller stop working or charging until it resets.

**Consider:**

- Unplug and replug the device or dock.
- Update platform firmware when the same host reports this daily.

## `win_trace_session_failed`

A Windows tracing session could not start, write, or continue.

**Severity:** Warning or Info

**Impact:** The status word separates an existing session, a full trace file, a full disk, and other failures.

**Consider:**

- Read the status word from the promoted fields.
- Ignore name-collision and log-file-full statuses; the session already exists or wrapped by design.
- Free disk space when the status says the volume is full.
