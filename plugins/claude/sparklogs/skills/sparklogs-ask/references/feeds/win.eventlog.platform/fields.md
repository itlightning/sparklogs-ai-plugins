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
| `win.eventlog.platform.pnp_problem_code` | int | Device Manager problem code reported for a device start failure. |
| `win.eventlog.platform.pnp_problem_code_name` | string | Published CM_PROB name for the device problem code. |
| `win.eventlog.platform.pnp_veto_type` | int | Published PnP removal veto type number. |
| `win.eventlog.platform.pnp_veto_type_name` | string | Published PNP_Veto name for the removal veto type. |
| `win.eventlog.platform.pnp_veto_holder` | string | Provider label for the component that vetoed device removal. |
| `win.eventlog.platform.driver_inf` | string | INF basename reported for a device start failure. |
| `win.eventlog.platform.device_service` | string | Driver service label reported for a device. |
| `win.eventlog.platform.device_class` | string | Leading device-instance class without the identifying path tail. |
| `win.eventlog.platform.device_count` | int | Number of child devices reported in a removal event. |
| `win.eventlog.platform.mem_commit_bytes` | int | Committed virtual-memory bytes reported by Windows. |
| `win.eventlog.platform.mem_commit_limit_bytes` | int | Virtual-memory commit limit in bytes reported by Windows. |
| `win.eventlog.platform.mem_commit_ratio` | float | Commit charge divided by the positive commit limit. |
| `win.eventlog.platform.clock_freq_error_ppm` | float | Measured hardware-clock frequency error in parts per million. |
| `win.eventlog.platform.clock_drift_seconds_per_day` | float | Measured clock drift in seconds per day. |
| `win.eventlog.platform.clock_measure_window_minutes` | float | Clock frequency measurement window in minutes. |
| `win.eventlog.platform.secure_boot_sbat_failure_point` | int | Firmware revocation update failure point. |
| `win.eventlog.platform.secure_boot_sbat_update_status` | int | Firmware revocation update status number. |
| `win.eventlog.platform.secure_boot_sbat_firmware_level` | string | Firmware SBAT generation list reported by Windows. |
| `win.eventlog.platform.firmware_indicator_category` | string | Category reported for a platform tamper indicator. |
| `win.eventlog.platform.firmware_indicator_events` | string | Firmware setting names reported behind a tamper indicator. |
| `win.eventlog.platform.firmware_scan_name` | string | Vendor firmware verification scan label. |
| `win.eventlog.platform.firmware_scan_result` | string | Result clause reported by a firmware verification scan. |
| `win.eventlog.platform.firmware_scan_result_code` | int | Numeric result code reported by a firmware verification scan. |
| `win.eventlog.platform.security_assessment_result` | string | Result clause reported by the device security assessment. |
| `win.eventlog.platform.security_assessment_score` | int | Device security assessment score. |
| `win.eventlog.platform.security_assessment_failed_areas` | string | Risk areas the device security assessment marked failed or high. |
| `win.eventlog.platform.firmware_event_store` | string | Vendor secure event-store label. |
| `win.eventlog.platform.trace_session_name` | string | Windows tracing session that reported a failure. |
| `win.eventlog.platform.boot_duration_ms` | int | Measured whole-boot duration in milliseconds. |
| `win.eventlog.platform.boot_main_path_ms` | int | Measured main boot-path duration in milliseconds. |
| `win.eventlog.platform.boot_post_boot_ms` | int | Measured post-boot duration in milliseconds. |
| `win.eventlog.platform.boot_is_degradation` | bool | Whether Windows classified the boot measurement as degraded. |
| `win.eventlog.platform.boot_startup_app_count` | int | Startup application count reported for a boot. |
| `win.eventlog.platform.startup_component` | string | Executable or service basename associated with a startup delay. |
| `win.eventlog.platform.startup_component_total_ms` | int | Total startup component duration in milliseconds. |
| `win.eventlog.platform.startup_component_degradation_ms` | int | Startup component degradation duration in milliseconds. |
| `win.eventlog.platform.shutdown_duration_ms` | int | Measured whole-shutdown duration in milliseconds. |
| `win.eventlog.platform.shutdown_is_degradation` | bool | Whether Windows classified the shutdown measurement as degraded. |
| `win.eventlog.platform.shutdown_services_ms` | int | Measured shutdown service duration in milliseconds. |
| `win.eventlog.platform.shutdown_user_session_ms` | int | Measured user-session shutdown duration in milliseconds. |
| `win.eventlog.platform.shutdown_component` | string | Service basename associated with a shutdown delay. |
| `win.eventlog.platform.shutdown_component_degradation_ms` | int | Shutdown component degradation duration in milliseconds. |
| `win.eventlog.platform.usb_failure_type` | int | USB controller failure type reported by Windows. |
| `win.eventlog.platform.usb_failure_subtype` | int | USB controller failure subtype reported by Windows. |
| `win.eventlog.platform.usb_error_reason` | int | USB controller error reason reported by Windows. |
| `win.eventlog.platform.usb_ucsi_command` | int | UCSI command number associated with a connector-manager fault. |
| `win.eventlog.platform.mtp_operation_code` | int | Media transfer operation code reported for an unresponsive device. |
| `win.eventlog.platform.font_load_blocked` | bool | Whether Windows blocked the font load. |
| `win.eventlog.platform.font_source_type` | int | Font source type reported by Windows. |
| `win.eventlog.platform.font_file` | string | Font filename without its source path. |
| `win.eventlog.platform.thermal_zone` | string | ACPI thermal zone object reported by firmware. |
| `win.eventlog.platform.thermal_temperature_k` | float | Thermal zone temperature reported in Kelvin. |
| `win.eventlog.platform.thermal_active_trip_k` | float | Active cooling trip point reported in Kelvin. |
| `win.eventlog.platform.thermal_passive_trip_k` | float | Passive cooling trip point reported in Kelvin. |
| `win.eventlog.platform.thermal_min_throttle` | float | Minimum processor throttle reported for passive cooling. |
| `win.eventlog.platform.live_dump_component` | string | Kernel component that requested a live dump. |
| `win.eventlog.platform.live_dump_requested_policy` | int | Requested live-dump policy number. |
| `win.eventlog.platform.live_dump_granted_policy` | int | Granted live-dump policy number. |
| `win.eventlog.platform.live_dump_throttled` | bool | Whether the live-dump request was throttled. |
| `win.eventlog.platform.gpu_memory_bytes` | int | Graphics memory involved in compositor contention. |
| `win.eventlog.platform.gpu_memory_bandwidth` | int | Graphics memory bandwidth reported during contention. |
| `win.eventlog.platform.gpu_contention_scenario` | int | Desktop compositor contention scenario number. |
| `win.eventlog.platform.boot_measure_reason_code` | int | Measured-boot library reason code. |
| `win.eventlog.platform.boot_measure_init_state` | int | Measured-boot library initialization state. |
| `win.eventlog.platform.tpm_init_position` | int | Boot position where TPM initialization failed. |
| `win.eventlog.platform.device_software_name` | string | Device companion software label reported by setup. |
| `win.eventlog.platform.device_software_exit_code` | int | Raw process exit code reported by device software setup. |
| `win.eventlog.platform.intel_graphics_category` | string | Category parsed from an Intel Graphics Software JSON insert. |

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
