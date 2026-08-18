<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.system`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.system.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.system.service_name` | string | Windows service (or driver service) the event is about: SCM 7000/7009/7011/7023/7024/7031/7034/7045, UserPnp 20003. The recurrence + vendor-recognition join key (vendor service crashes arrive as SCM events keyed on this name). |
| `win.eventlog.system.image_path` | string | Service binary path from SCM 7045 (service install). Change-analysis join key for persistence review. |
| `win.eventlog.system.service_type` | string | Service type text from SCM 7045 (kernel mode driver \| user mode service \| ...). |
| `win.eventlog.system.start_type` | string | Service start type text from SCM 7045 (auto start \| demand start \| ...). |
| `win.eventlog.system.account_name` | string | Account the installed service runs as, from SCM 7045 (LocalSystem etc.). |
| `win.eventlog.system.crash_count` | int | How many times the service has terminated unexpectedly, from SCM 7031/7034. The flapping-service recurrence datum. |
| `win.eventlog.system.service_error` | string | Error the service exited/failed with, from SCM 7000/7023/7024. Stored as logged; may be a %%nnnn message-catalog reference. |
| `win.eventlog.system.bugcheck_code` | string | BugcheckCode from Kernel-Power 41 (decimal, as logged; 0 = power loss without a crash). Distinguishes crash-driven dirty shutdowns from power-loss ones. |
| `win.eventlog.system.bugcheck_text` | string | Full bugcheck string from WER-SystemErrorReporting 1001, e.g. "0x0000001e (0x..., ...)". Kept verbatim: the code plus its four parameters are the crash identity. |
| `win.eventlog.system.dump_file` | string | Memory-dump path from WER-SystemErrorReporting 1001. |
| `win.eventlog.system.report_id` | string | WER report id (GUID) from WER-SystemErrorReporting 1001; joins to the WER report store. |
| `win.eventlog.system.driver_name` | string | Driver that failed to load, from Kernel-PnP 219 (FailureName, e.g. \Driver\WUDFRd). |
| `win.eventlog.system.device_instance` | string | Device instance path the event is about: Kernel-PnP 219, WHEA-Logger 17-20 (PrimaryDeviceName), UserPnp 20003, DriverFrameworks-UserMode driver installs. |
| `win.eventlog.system.ntstatus` | string | NTSTATUS code as logged (decimal string on modern providers): Kernel-PnP 219, Hyper-V-VmSwitch 15. |
| `win.eventlog.system.error_source` | string | WHEA error source enum from WHEA-Logger 17-20 (ErrorSource; numeric string, locale-stable). |
| `win.eventlog.system.framework_version` | string | UMDF framework version from DriverFrameworks-UserMode install narration. |
| `win.eventlog.system.volume` | string | Volume the storage event is about: Ntfs 55/130 (DriveName/VolumeName), Volsnap 25/36 (VolumeName). |
| `win.eventlog.system.clsid` | string | COM server CLSID from DistributedCOM 10010. |
| `win.eventlog.system.time_peer` | string | Configured NTP peer from Time-Service 134 (DomainPeer). |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.config_change.type` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.action` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.target` | What configuration changed, in what direction, on what. |

## What sets each field

Presence is per curated surface and per event id, because promotion is a property of the branch, not of the module.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `app_popup_error` / `default` | 26 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `bugcheck` / `default` | 1001 | `win.eventlog.system.bugcheck_text` `win.eventlog.system.device_instance` `win.eventlog.system.dump_file` `win.eventlog.system.error_source` `win.eventlog.system.report_id` |
| `cluster_csv_unavailable` / `default` | 5120, 5142 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `cluster_node_removed` / `default` | 1135 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `cluster_quorum_loss` / `default` | 1561 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `cluster_resource_failed` / `default` | 1069 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `cluster_resource_hang` / `default` | 1230 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `cluster_rhs_crash` / `default` | 1146 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `cluster_service_down` / `default` | 1006, 1073, 1177 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `dcom_activation_timeout` / `default` | 10029 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `dcom_register_timeout` / `default` | 10010 | `win.eventlog.system.clsid` `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `dcom_start_error` / `default` | 10005 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `dirty_shutdown` / `default` | 41 | `win.eventlog.system.bugcheck_code` `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `disk_controller_error` / `default` | 11 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `disk_corruption` / `default` | 55 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.volume` |
| `disk_io_retried` / `default` | 153 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `disk_paging_error` / `default` | 51 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `disk_surprise_removal` / `default` | 157 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `driver_load_failed` / `default` | 219 | `win.eventlog.system.device_instance` `win.eventlog.system.driver_name` `win.eventlog.system.error_source` `win.eventlog.system.ntstatus` |
| `ephemeral_port_alloc_failed` / `default` | 4231, 4266 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `gpu_driver_reset` / `default` | 153 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `hardware_error_corrected` / `default` | 17, 19 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `hardware_error_uncorrected` / `default` | 18, 20 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `iis_apppool_disabled` / `default` | 5002 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `iis_apppool_failure` / `default` | 5009, 5021, 5057, 5059 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `iis_worker_crash` / `default` | 5011 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `kerberos_cert_domain_unresolved` / `default` | 11 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `ntfs_corruption` / `corruption_discovered` | 55, 130 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.volume` |
| `ntfs_corruption` / `repair_activity` | 55, 130 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.volume` |
| `patch_install_failed` / `default` | 20 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `secure_boot_cert_update_pending` / `default` | 1801 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `service_crashed` / `default` | 7031, 7034 | `win.eventlog.system.crash_count` `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.service_name` |
| `service_exited_error` / `default` | 7023, 7024 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.service_error` `win.eventlog.system.service_name` |
| `service_hang` / `default` | 7011 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.service_name` |
| `service_installed` / `default` | 7045 | `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `win.eventlog.system.account_name` `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.image_path` `win.eventlog.system.service_name` `win.eventlog.system.service_type` `win.eventlog.system.start_type` |
| `service_start_failed` / `default` | 7000 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.service_error` `win.eventlog.system.service_name` |
| `service_start_timeout` / `default` | 7009 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.service_name` |
| `storage_controller_reset` / `default` | n/a | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `time_sync_failed` / `default` | 134 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.time_peer` |
| `tls_cert_name_mismatch` / `default` | 36884 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `tpm_attestation_failed` / `default` | 1040 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `unexpected_shutdown` / `default` | 6008 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `vss_shadow_aborted` / `default` | 36 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.volume` |
| `vss_shadow_lost` / `default` | 25 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.volume` |
| `vswitch_config_restore_failed` / `default` | 15 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` `win.eventlog.system.ntstatus` |
| `winre_servicing_failed` / `default` | 4502 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `wlan_limited_connectivity` / `default` | 4003 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
