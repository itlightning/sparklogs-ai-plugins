<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.platform`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.platform.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.platform.pnp_problem_code` | int | Device Manager problem code for a device that failed to start, from `Problem` on Kernel-PnP event 411. The same number Device Manager shows as "Code N" on the device. |
| `win.eventlog.platform.pnp_problem_code_name` | string | Name Microsoft publishes for the device problem code, such as CM_PROB_FAILED_START for code 10. Set for codes 10, 12, 37 and 43, absent for other codes. |
| `win.eventlog.platform.pnp_veto_type` | int | Type of component that blocked removal of a device, as the number on Kernel-PnP event 1000 (`VetoType`). |
| `win.eventlog.platform.pnp_veto_type_name` | string | Name Microsoft publishes for the removal veto type, such as PNP_VetoOutstandingOpen. Absent when the number is not in the published list. |
| `win.eventlog.platform.pnp_veto_holder` | string | Component that blocked removal of the device, such as a driver or a program with the device open, from `VetoName` on Kernel-PnP event 1000. |
| `win.eventlog.platform.driver_inf` | string | Driver INF file name of a device that failed to start, from `DriverName` on Kernel-PnP event 411. |
| `win.eventlog.platform.device_service` | string | Driver service of a device that failed to start, from `ServiceName` on Kernel-PnP event 411. |
| `win.eventlog.platform.device_class` | string | First part of the device instance ID, such as USB, PCI or HID, which names the bus or device type. The rest of the ID, which can carry a serial number, is left out. |
| `win.eventlog.platform.device_count` | int | Number of child devices removed with the device, from `DeviceCount` on Kernel-PnP event 1011. |
| `win.eventlog.platform.mem_commit_bytes` | int | Committed memory in bytes when Windows detected low virtual memory, from `SystemCommitCharge` on Resource-Exhaustion-Detector event 1003. The Committed figure in Task Manager. |
| `win.eventlog.platform.mem_commit_limit_bytes` | int | Commit limit in bytes when Windows detected low virtual memory, from `SystemCommitLimit` on Resource-Exhaustion-Detector event 1003. The limit beside Committed in Task Manager. |
| `win.eventlog.platform.mem_commit_ratio` | float | Committed memory divided by the commit limit, from Resource-Exhaustion-Detector event 1003. 1.0 means memory is fully committed. |
| `win.eventlog.platform.clock_freq_error_ppm` | float | Average frequency error of the hardware clock in parts per million, measured by the Windows Time service, from `AvgFrequencyErrorPPM` on Time-Service event 282. |
| `win.eventlog.platform.clock_drift_seconds_per_day` | float | Average clock drift in seconds per day, measured by the Windows Time service, from `AvgDailyDriftSeconds` on Time-Service event 282. |
| `win.eventlog.platform.clock_measure_window_minutes` | float | Minutes over which the Windows Time service measured the clock error, from `AvgFreqDurationMins` on Time-Service event 282. |
| `win.eventlog.platform.secure_boot_sbat_failure_point` | int | Step at which the Secure Boot revocation (SBAT) update failed, from `FailurePoint` on Kernel-Boot event 292, as a number. |
| `win.eventlog.platform.secure_boot_sbat_update_status` | int | Status of the Secure Boot revocation (SBAT) update, from `UpdateStatusEnum` on Kernel-Boot event 292, as a number. |
| `win.eventlog.platform.secure_boot_sbat_firmware_level` | string | SBAT revocation level the firmware holds, as Windows reports it in `FwLevel` on Kernel-Boot event 292. |
| `win.eventlog.platform.firmware_indicator_category` | string | Category of the BIOS tamper indicator, from Dell Trusted Device BIOS Events and IoA events 10, 11 and 12. |
| `win.eventlog.platform.firmware_indicator_events` | string | BIOS setting changed behind the tamper indicator, from Dell Trusted Device BIOS Events and IoA events 10, 11 and 12. |
| `win.eventlog.platform.firmware_scan_name` | string | Firmware verification scan that ran, such as the BIOS or Intel ME verification, from Dell Trusted Device scan events. |
| `win.eventlog.platform.firmware_scan_result` | string | Result line of the Dell Trusted Device firmware verification scan, as the event wrote it. |
| `win.eventlog.platform.firmware_scan_result_code` | int | Result code of the Dell Trusted Device firmware verification scan, when the event gives one. |
| `win.eventlog.platform.security_assessment_result` | string | Result line of the Dell Trusted Device security assessment, from events 14 and 15, as the event wrote it. |
| `win.eventlog.platform.security_assessment_score` | int | Score of the Dell Trusted Device security assessment, from events 14 and 15. |
| `win.eventlog.platform.security_assessment_failed_areas` | string | Areas the Dell Trusted Device security assessment marked FAIL or HIGH, separated by commas, from events 14 and 15. |
| `win.eventlog.platform.firmware_event_store` | string | Dell secure event log store the event is about, from Dell Trusted Device Secure Event Log events 21 and 45. |
| `win.eventlog.platform.trace_session_name` | string | Windows event tracing session that reported a problem, from `SessionName` on Kernel-EventTracing Admin events. |
| `win.eventlog.platform.boot_duration_ms` | int | Milliseconds the whole boot took, from `BootTime` on Diagnostics-Performance event 100. |
| `win.eventlog.platform.boot_main_path_ms` | int | Milliseconds of the main boot phase, up to the desktop appearing, from `MainPathBootTime` on Diagnostics-Performance event 100. |
| `win.eventlog.platform.boot_post_boot_ms` | int | Milliseconds from the desktop appearing until the machine became idle, from `BootPostBootTime` on Diagnostics-Performance event 100. |
| `win.eventlog.platform.boot_is_degradation` | bool | Whether Windows judged this boot slower than usual for the machine, from `BootIsDegradation` on Diagnostics-Performance event 100. |
| `win.eventlog.platform.boot_startup_app_count` | int | Number of startup apps during the boot, from `BootNumStartupApps` on Diagnostics-Performance event 100. |
| `win.eventlog.platform.startup_component` | string | Program, driver or service that slowed the boot, from `Name` on Diagnostics-Performance events 101, 103, 107 and 108. |
| `win.eventlog.platform.startup_component_total_ms` | int | Milliseconds that component took during the boot, from `TotalTime` on Diagnostics-Performance events 101, 103, 107 and 108. |
| `win.eventlog.platform.startup_component_degradation_ms` | int | Milliseconds that component took beyond its usual time, from `DegradationTime` on Diagnostics-Performance events 101, 103, 107 and 108. |
| `win.eventlog.platform.shutdown_duration_ms` | int | Milliseconds the whole shutdown took, from `ShutdownTime` on Diagnostics-Performance event 200. |
| `win.eventlog.platform.shutdown_is_degradation` | bool | Whether Windows judged this shutdown slower than usual for the machine, from `ShutdownIsDegradation` on Diagnostics-Performance event 200. |
| `win.eventlog.platform.shutdown_services_ms` | int | Milliseconds services took to stop during the shutdown, from `ShutdownServicesTime` on Diagnostics-Performance event 200. |
| `win.eventlog.platform.shutdown_user_session_ms` | int | Milliseconds the user session took to close during the shutdown, from `ShutdownUserSessionTime` on Diagnostics-Performance event 200. |
| `win.eventlog.platform.shutdown_component` | string | Service that slowed the shutdown, from `Name` on Diagnostics-Performance event 203. |
| `win.eventlog.platform.shutdown_component_degradation_ms` | int | Milliseconds that service took to stop beyond its usual time, from `DegradationTime` on Diagnostics-Performance event 203. |
| `win.eventlog.platform.usb_failure_type` | int | Type of USB controller failure, as the number on USB-USBXHCI events 50 and 62 or UcmUcsiCx event 1. |
| `win.eventlog.platform.usb_failure_subtype` | int | Subtype of the USB controller failure, as the number on USB-USBXHCI events 50 and 62 or UcmUcsiCx event 1. |
| `win.eventlog.platform.usb_error_reason` | int | Error reason of the USB controller failure, as the number on USB-USBXHCI events 50 and 62 or UcmUcsiCx event 1. |
| `win.eventlog.platform.usb_ucsi_command` | int | USB Type-C connector command (UCSI) that failed, as the number on UcmUcsiCx event 1. |
| `win.eventlog.platform.mtp_operation_code` | int | Media Transfer Protocol operation the phone, camera or player did not answer, as the number on WPD-MTPClassDriver events 1006, 1007 and 1008. |
| `win.eventlog.platform.font_load_blocked` | bool | Whether Windows blocked the font from loading, from `Blocked` on Win32k event 260. |
| `win.eventlog.platform.font_source_type` | int | Type of font source, as the number on Win32k event 260. |
| `win.eventlog.platform.font_file` | string | File name (without folder) of the font Windows blocked or flagged, from Win32k event 260. |
| `win.eventlog.platform.thermal_zone` | string | Thermal zone the firmware reported on, from `ThermalZoneDeviceInstance` on Kernel-Power thermal events 114 and 116. |
| `win.eventlog.platform.thermal_temperature_k` | float | Temperature of the thermal zone in kelvin, from `_TMP` on Kernel-Power thermal events 114 and 116. Subtract 273.15 for degrees Celsius. |
| `win.eventlog.platform.thermal_active_trip_k` | float | Temperature in kelvin at which the firmware turns on active cooling (fans), from `_AC0` on Kernel-Power thermal events. |
| `win.eventlog.platform.thermal_passive_trip_k` | float | Temperature in kelvin at which Windows slows the processor to cool it, from `_PSV` on Kernel-Power thermal events. |
| `win.eventlog.platform.thermal_min_throttle` | float | Lowest processor speed Windows may throttle to for passive cooling, from `MinimumThrottle` on Kernel-Power thermal events. |
| `win.eventlog.platform.live_dump_component` | string | Kernel component that asked for a live kernel dump, from `ComponentName` on WERKernel events 1001 and 1002. |
| `win.eventlog.platform.live_dump_requested_policy` | int | Live dump policy the component asked for, as the number on WERKernel events 1001 and 1002. |
| `win.eventlog.platform.live_dump_granted_policy` | int | Live dump policy Windows granted, as the number on WERKernel events 1001 and 1002. |
| `win.eventlog.platform.live_dump_throttled` | bool | Whether Windows throttled the live dump request and did not take the dump, from `ThrottleCheckResult` on WERKernel events 1001 and 1002. |
| `win.eventlog.platform.gpu_memory_bytes` | int | Graphics memory involved when the desktop compositor ran short of GPU resources, from `MemorySize` on Diagnostics-Performance event 500. |
| `win.eventlog.platform.gpu_memory_bandwidth` | int | Graphics memory bandwidth reported when the desktop compositor ran short of GPU resources, from `MemoryBandwidth` on Diagnostics-Performance event 500. |
| `win.eventlog.platform.gpu_contention_scenario` | int | Scenario number Windows gave for the desktop compositor contention, from `Scenario` on Diagnostics-Performance event 500. |
| `win.eventlog.platform.boot_measure_reason_code` | int | Reason code for the measured boot failure, from `ReasonCode` on Kernel-Boot events 208 and 235, as a number. |
| `win.eventlog.platform.boot_measure_init_state` | int | Initialization state of measured boot when it failed, from `InitState` on Kernel-Boot events 208 and 235, as a number. |
| `win.eventlog.platform.tpm_init_position` | int | Point in the boot where TPM initialization failed, from `Position` on Kernel-Boot events 208 and 235, as a number. |
| `win.eventlog.platform.device_software_name` | string | Device companion software Windows tried to install or remove, from `Prop_SoftwareName` on DeviceSetupManager Admin events. |
| `win.eventlog.platform.device_software_exit_code` | int | Exit code of the device companion software installer, from `Error` on DeviceSetupManager Admin events, as Windows wrote it. |
| `win.eventlog.platform.intel_graphics_category` | string | Category the Intel Graphics Software event gives for itself, read from the JSON the Intel service writes. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.process.name` | The process the event is about. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `device_class` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `device_install_reboot_pending` / `default` | 8000 | `win.eventlog.platform.device_class` |  |
| `device_removal_vetoed` / `default` | 1000 | `win.eventlog.platform.device_class` `win.eventlog.platform.pnp_veto_holder` `win.eventlog.platform.pnp_veto_type` `win.eventlog.platform.pnp_veto_type_name` |  |
| `device_removed_after_failure` / `default` | 1011 | `win.eventlog.platform.device_class` `win.eventlog.platform.device_count` |  |
| `device_security_assessment_failed` / `default` | 14, 15 | `win.eventlog.platform.security_assessment_failed_areas` `win.eventlog.platform.security_assessment_result` `win.eventlog.platform.security_assessment_score` |  |
| `device_security_assessment_passed` / `other_assessment` | 14, 15 | `win.eventlog.platform.security_assessment_failed_areas` `win.eventlog.platform.security_assessment_result` `win.eventlog.platform.security_assessment_score` |  |
| `device_security_assessment_passed` / `passed_with_warnings` | 14, 15 | `win.eventlog.platform.security_assessment_failed_areas` `win.eventlog.platform.security_assessment_result` `win.eventlog.platform.security_assessment_score` |  |
| `device_software_install_failed` / `install_failed` | 121, 151, 152, 163, 164, 172, 191 | `win.eventlog.platform.device_class` `win.eventlog.platform.device_software_exit_code` `win.eventlog.platform.device_software_name` |  |
| `device_software_install_failed` / `removal_failed` | 121, 151, 152, 163, 164, 172, 191 | `win.eventlog.platform.device_class` `win.eventlog.platform.device_software_exit_code` `win.eventlog.platform.device_software_name` |  |
| `device_software_install_failed` / `transient` | 121, 151, 152, 163, 164, 172, 191 | `win.eventlog.platform.device_class` `win.eventlog.platform.device_software_exit_code` `win.eventlog.platform.device_software_name` |  |
| `device_software_install_failed` / `update_service_stopped` | 121, 151, 152, 163, 164, 172, 191 | `win.eventlog.platform.device_class` `win.eventlog.platform.device_software_exit_code` `win.eventlog.platform.device_software_name` |  |
| `device_start_failed` / `default` | 411 | `win.eventlog.platform.device_class` `win.eventlog.platform.device_service` `win.eventlog.platform.driver_inf` `win.eventlog.platform.pnp_problem_code` `win.eventlog.platform.pnp_problem_code_name` |  |
| `firmware_event_store_unavailable` / `keys_missing` | 21, 45 | `win.eventlog.platform.firmware_event_store` |  |
| `firmware_event_store_unavailable` / `repair_failed` | 21, 45 | `win.eventlog.platform.firmware_event_store` |  |
| `firmware_verification_scan_failed` / `unreachable` | 2, 20, 42, 43, 47 | `win.eventlog.platform.firmware_scan_name` `win.eventlog.platform.firmware_scan_result` `win.eventlog.platform.firmware_scan_result_code` |  |
| `firmware_verification_scan_failed` / `unsupported` | 2, 20, 42, 43, 47 | `win.eventlog.platform.firmware_scan_name` `win.eventlog.platform.firmware_scan_result` `win.eventlog.platform.firmware_scan_result_code` |  |
| `firmware_verification_scan_failed` / `verification_failed` | 2, 20, 42, 43, 47 | `win.eventlog.platform.firmware_scan_name` `win.eventlog.platform.firmware_scan_result` `win.eventlog.platform.firmware_scan_result_code` |  |
| `font_load_allowed` / `default` | 260 | `win.eventlog.platform.font_file` `win.eventlog.platform.font_load_blocked` `win.eventlog.platform.font_source_type` |  |
| `font_load_blocked` / `default` | 260 | `win.eventlog.platform.font_file` `win.eventlog.platform.font_load_blocked` `win.eventlog.platform.font_source_type` |  |
| `gpu_resources_saturated` / `default` | 500 | `win.eventlog.platform.gpu_contention_scenario` `win.eventlog.platform.gpu_memory_bandwidth` `win.eventlog.platform.gpu_memory_bytes` |  |
| `live_kernel_dump_requested` / `default` | 1001, 1002 | `win.eventlog.platform.live_dump_component` `win.eventlog.platform.live_dump_granted_policy` `win.eventlog.platform.live_dump_requested_policy` `win.eventlog.platform.live_dump_throttled` |  |
| `measured_boot_failed` / `default` | 208 | `win.eventlog.platform.boot_measure_init_state` `win.eventlog.platform.boot_measure_reason_code` |  |
| `os_boot_duration_high` / `component` | 100, 101, 103, 107, 108 | `win.eventlog.platform.startup_component` `win.eventlog.platform.startup_component_degradation_ms` `win.eventlog.platform.startup_component_total_ms` |  |
| `os_boot_duration_high` / `whole_boot` | 100, 101, 103, 107, 108 | `win.eventlog.platform.boot_duration_ms` `win.eventlog.platform.boot_is_degradation` `win.eventlog.platform.boot_main_path_ms` `win.eventlog.platform.boot_post_boot_ms` `win.eventlog.platform.boot_startup_app_count` |  |
| `os_clock_drift` / `default` | 282 | `win.eventlog.platform.clock_drift_seconds_per_day` `win.eventlog.platform.clock_freq_error_ppm` `win.eventlog.platform.clock_measure_window_minutes` |  |
| `os_crash_dump_unavailable` / `default` | 5, 9 | **fields: none** |  |
| `os_shutdown_duration_high` / `component` | 200, 203 | `win.eventlog.platform.shutdown_component` `win.eventlog.platform.shutdown_component_degradation_ms` |  |
| `os_shutdown_duration_high` / `measured` | 200, 203 | `win.eventlog.platform.shutdown_duration_ms` `win.eventlog.platform.shutdown_is_degradation` `win.eventlog.platform.shutdown_services_ms` `win.eventlog.platform.shutdown_user_session_ms` |  |
| `os_shutdown_duration_high` / `whole_shutdown` | 200, 203 | `win.eventlog.platform.shutdown_duration_ms` `win.eventlog.platform.shutdown_is_degradation` `win.eventlog.platform.shutdown_services_ms` `win.eventlog.platform.shutdown_user_session_ms` |  |
| `platform_tamper_indicator_reported` / `cleared` | 10, 11, 12 | `win.eventlog.platform.firmware_indicator_category` |  |
| `platform_tamper_indicator_reported` / `detected` | 10, 11, 12 | `win.eventlog.platform.firmware_indicator_category` `win.eventlog.platform.firmware_indicator_events` |  |
| `platform_tamper_indicator_reported` / `escalated` | 10, 11, 12 | `win.eventlog.platform.firmware_indicator_category` `win.eventlog.platform.firmware_indicator_events` |  |
| `platform_tamper_indicator_reported` / `partial` | 10, 11, 12 | `win.eventlog.platform.firmware_indicator_category` `win.eventlog.platform.firmware_indicator_events` |  |
| `platform_tamper_indicator_reported` / `reported` | 10, 11, 12 | `win.eventlog.platform.firmware_indicator_category` `win.eventlog.platform.firmware_indicator_events` |  |
| `portable_device_unresponsive` / `default` | 1006, 1007, 1008 | `win.eventlog.platform.mtp_operation_code` |  |
| `ram_commit_exhausted` / `allocation_failed` | 1003, 1007, 1008 | **fields: none** |  |
| `ram_commit_exhausted` / `diagnosis_failed` | 1003, 1007, 1008 | **fields: none** |  |
| `ram_commit_exhausted` / `notified` | 1003, 1007, 1008 | `win.eventlog.platform.mem_commit_bytes` `win.eventlog.platform.mem_commit_limit_bytes` `win.eventlog.platform.mem_commit_ratio` |  |
| `secure_boot_revocation_update_failed` / `default` | 292 | `win.eventlog.platform.secure_boot_sbat_failure_point` `win.eventlog.platform.secure_boot_sbat_firmware_level` `win.eventlog.platform.secure_boot_sbat_update_status` |  |
| `thermal_cooling_engaged` / `active` | 114, 116 | `win.eventlog.platform.thermal_active_trip_k` `win.eventlog.platform.thermal_min_throttle` `win.eventlog.platform.thermal_passive_trip_k` `win.eventlog.platform.thermal_temperature_k` `win.eventlog.platform.thermal_zone` |  |
| `thermal_cooling_engaged` / `disengaged` | 114, 116 | `win.eventlog.platform.thermal_active_trip_k` `win.eventlog.platform.thermal_min_throttle` `win.eventlog.platform.thermal_passive_trip_k` `win.eventlog.platform.thermal_temperature_k` `win.eventlog.platform.thermal_zone` |  |
| `thermal_cooling_engaged` / `passive` | 114, 116 | `win.eventlog.platform.thermal_active_trip_k` `win.eventlog.platform.thermal_min_throttle` `win.eventlog.platform.thermal_passive_trip_k` `win.eventlog.platform.thermal_temperature_k` `win.eventlog.platform.thermal_zone` |  |
| `tpm_initialization_failed` / `default` | 235 | `win.eventlog.platform.tpm_init_position` |  |
| `usb_controller_error` / `default` | 1, 50, 62 | `win.eventlog.platform.usb_error_reason` `win.eventlog.platform.usb_failure_subtype` `win.eventlog.platform.usb_failure_type` `win.eventlog.platform.usb_ucsi_command` |  |
| `win_trace_session_failed` / `already_running` | 0, 1, 2, 3, 4, 28 | `win.eventlog.platform.trace_session_name` |  |
| `win_trace_session_failed` / `disk_full` | 0, 1, 2, 3, 4, 28 | `win.eventlog.platform.trace_session_name` |  |
| `win_trace_session_failed` / `file_full` | 0, 1, 2, 3, 4, 28 | `win.eventlog.platform.trace_session_name` |  |
| `win_trace_session_failed` / `other_failure` | 0, 1, 2, 3, 4, 28 | `win.eventlog.platform.trace_session_name` |  |
| `kernel_pnp_device_removed` | 1010 | `win.eventlog.platform.device_class` |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `os_crash_dump_unavailable` / `default`
- `ram_commit_exhausted` / `allocation_failed`
- `ram_commit_exhausted` / `diagnosis_failed`
