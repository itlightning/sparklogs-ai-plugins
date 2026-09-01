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

## Reconstruction guarantee

4 curated surface(s) drop the vendor body text below the synthesized first line.
That is never data loss: the provider payload is retained at rest, so a dropped body can be reconstructed from it.
What the body said is derivable; what it cost to ship it repeatedly is not.

## Module fields

Stored flat under the `win.eventlog.system.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.system.service_name` | string | Windows service (or driver service) the event is about: SCM 7000/7009/7011/7023/7024/7031/7034/7045, UserPnp 20003. The recurrence + vendor-recognition join key (vendor service crashes arrive as SCM events keyed on this name). |
| `win.eventlog.system.image_path` | string | Installed service IMAGE path from SCM 7045, with the arguments of the ImagePath command line removed. Unset where the image cannot be split off unambiguously (an unterminated quote, or an unquoted path containing spaces), so the value is always a path and never a command line. The full ImagePath text is root command_line. |
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
| `win.eventlog.system.update_title` | string | Update the WindowsUpdateClient 20 install outcome is about (updateTitle). The fleet pivot for separating a bad update from a bad device. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.config_change.type` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.action` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.target` | What configuration changed, in what direction, on what. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `volume` | not queryable as a field |
| `bugcheck_code` | not queryable as a field |
| `power_button_timestamp` | not queryable as a field |
| `update_title` | not queryable as a field |
| `error_code` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `app_popup_error` / `default` | 26 | **fields: none** |
| `av_unsigned_code_blocked` / `default` | 514 | **fields: none** |
| `bugcheck` / `default` | 1001 | `win.eventlog.system.bugcheck_text` `win.eventlog.system.dump_file` `win.eventlog.system.report_id` |
| `cluster_csv_unavailable` / `default` | 5120, 5142 | **fields: none** |
| `cluster_node_removed` / `default` | 1135 | **fields: none** |
| `cluster_quorum_loss` / `default` | 1561 | **fields: none** |
| `cluster_resource_failed` / `default` | 1069 | **fields: none** |
| `cluster_resource_hang` / `default` | 1230 | **fields: none** |
| `cluster_rhs_crash` / `default` | 1146 | **fields: none** |
| `cluster_service_down` / `default` | 1006, 1073, 1177 | **fields: none** |
| `dcom_activation_timeout` / `default` | 10029 | **fields: none** |
| `dcom_register_timeout` / `default` | 10010 | `win.eventlog.system.clsid` |
| `dcom_start_error` / `default` | 10005 | **fields: none** |
| `dirty_shutdown` / `default` | 41 | `win.eventlog.system.bugcheck_code` |
| `disk_bad_block` / `default` | 7 | **fields: none** |
| `disk_controller_error` / `default` | 11 | **fields: none** |
| `disk_corruption` / `default` | 55 | **fields: none** |
| `disk_io_retried` / `default` | 153 | **fields: none** |
| `disk_paging_error` / `default` | 51 | **fields: none** |
| `disk_surprise_removal` / `default` | 157 | **fields: none** |
| `driver_load_failed` / `default` | 219 | `win.eventlog.system.device_instance` `win.eventlog.system.driver_name` `win.eventlog.system.ntstatus` |
| `ephemeral_port_alloc_failed` / `default` | 4231, 4266 | **fields: none** |
| `gpu_driver_reset` / `default` | 153 | **fields: none** |
| `hardware_error_corrected` / `default` | 17, 19 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `hardware_error_uncorrected` / `default` | 18, 20 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |
| `http_ssl_binding_created` / `default` | 120, 15301 | **fields: none** |
| `http_ssl_binding_deleted` / `default` | 119, 15300 | **fields: none** |
| `http_ssl_config_failed` / `default` | 15021 | **fields: none** |
| `iis_apppool_disabled` / `default` | 5002 | **fields: none** |
| `iis_apppool_failure` / `default` | 5009, 5021, 5057, 5059 | **fields: none** |
| `iis_worker_crash` / `default` | 5011 | **fields: none** |
| `kerberos_cert_domain_unresolved` / `default` | 11 | **fields: none** |
| `kerberos_etype_unsupported` / `default` | 16, 203 | **fields: none** |
| `kerberos_pac_verify_failed` / `default` | 18 | **fields: none** |
| `kerberos_smartcard_cert_missing` / `default` | 19, 29 | **fields: none** |
| `kerberos_weak_krbtgt_key` / `default` | 42 | **fields: none** |
| `nic_driver_fault` / `load_failed` | 5000, 5002, 5005 | **fields: none** |
| `nic_driver_fault` / `self_reported_fault` | 5000, 5002, 5005 | **fields: none** |
| `nic_link_down` / `default` | 2, 27 | **fields: none** |
| `nic_link_up` / `default` | 9, 14, 32 | **fields: none** |
| `ntfs_corruption` / `correction_required` | 7, 55, 130, 131, 132, 133 | `win.eventlog.system.volume` |
| `ntfs_corruption` / `corruption_discovered` | 7, 55, 130, 131, 132, 133 | `win.eventlog.system.volume` |
| `ntfs_corruption` / `repair_activity` | 7, 55, 130, 131, 132, 133 | `win.eventlog.system.volume` |
| `ntfs_corruption` / `repair_posting_throttled` | 7, 55, 130, 131, 132, 133 | `win.eventlog.system.volume` |
| `ntfs_corruption` / `torn_write_detected` | 7, 55, 130, 131, 132, 133 | `win.eventlog.system.volume` |
| `ntfs_delayed_write_lost` / `default` | 50 | `win.eventlog.system.volume` |
| `ntfs_transaction_log_error` / `flush_failed` | 134, 136, 137, 140 | `win.eventlog.system.volume` |
| `ntfs_transaction_log_error` / `metadata_reset` | 134, 136, 137, 140 | `win.eventlog.system.volume` |
| `ntfs_transaction_log_error` / `recovery_error` | 134, 136, 137, 140 | `win.eventlog.system.volume` |
| `ntfs_transaction_log_error` / `start_failed` | 134, 136, 137, 140 | `win.eventlog.system.volume` |
| `patch_install_failed` / `failed` | 20 | `win.eventlog.system.update_title` |
| `patch_install_failed` / `interrupted` | 20 | `win.eventlog.system.update_title` |
| `patch_install_failed` / `packages_in_use` | 20 | `win.eventlog.system.update_title` |
| `patch_install_failed` / `retry_later` | 20 | `win.eventlog.system.update_title` |
| `platform_integrity_indicator` / `escalated` | 11, 12 | **fields: none** |
| `platform_integrity_indicator` / `partial` | 11, 12 | **fields: none** |
| `rds_license_server_unactivated` / `default` | 18 | **fields: none** |
| `rds_license_tracking_failed` / `default` | 4105 | **fields: none** |
| `rds_licensing_service_failed` / `database_error` | 37, 44, 4097 | **fields: none** |
| `rds_licensing_service_failed` / `start_failed` | 37, 44, 4097 | **fields: none** |
| `secure_boot_cert_update_pending` / `default` | 1801 | **fields: none** |
| `security_agent_service_start_failed` / `default` | 6 | **fields: none** |
| `security_agent_service_terminated` / `default` | 5 | **fields: none** |
| `service_crashed` / `default` | 7031, 7034 | `win.eventlog.system.crash_count` `win.eventlog.system.service_name` |
| `service_exited_error` / `default` | 7023, 7024 | `win.eventlog.system.service_error` `win.eventlog.system.service_name` |
| `service_hang` / `default` | 7011 | `win.eventlog.system.service_name` |
| `service_installed` / `default` | 7045 | `command_line` `win.eventlog.system.account_name` `win.eventlog.system.image_path` `win.eventlog.system.service_name` `win.eventlog.system.service_type` `win.eventlog.system.start_type` |
| `service_start_failed` / `default` | 7000 | `win.eventlog.system.service_error` `win.eventlog.system.service_name` |
| `service_start_timeout` / `default` | 7009 | `win.eventlog.system.service_name` |
| `smb_delayed_write_lost` / `default` | 50, 139 | **fields: none** |
| `smb_server_transport_bind_failed` / `default` | 2504 | **fields: none** |
| `smb_share_recreate_failed` / `default` | 2511 | **fields: none** |
| `storage_controller_reset` / `default` | n/a | **fields: none** |
| `time_sync_failed` / `default` | 134 | `win.eventlog.system.time_peer` |
| `tls_cert_expired` / `default` | 36881 | **fields: none** |
| `tls_cert_name_mismatch` / `default` | 36884 | **fields: none** |
| `tls_cert_untrusted_ca` / `default` | 36882 | **fields: none** |
| `tls_cipher_mismatch` / `default` | 36874 | **fields: none** |
| `tls_client_credential_failed` / `default` | 36871 | **fields: none** |
| `tls_server_credential_failed` / `default` | 36870 | **fields: none** |
| `tpm_attestation_failed` / `default` | 1040 | **fields: none** |
| `unexpected_shutdown` / `default` | 6008 | **fields: none** |
| `vpn_connected` / `default` | 20267 | **fields: none** |
| `vss_shadow_aborted` / `abort_on_failure` | 13, 14, 15, 16, 20, 23, 24, 27, 28, 29, 32, 35, 36 | `win.eventlog.system.volume` |
| `vss_shadow_aborted` / `storage_growth_failed` | 13, 14, 15, 16, 20, 23, 24, 27, 28, 29, 32, 35, 36 | `win.eventlog.system.volume` |
| `vss_shadow_aborted` / `storage_limit_reached` | 13, 14, 15, 16, 20, 23, 24, 27, 28, 29, 32, 35, 36 | `win.eventlog.system.volume` |
| `vss_shadow_lost` / `default` | 25 | `win.eventlog.system.volume` |
| `vswitch_config_restore_failed` / `default` | 15 | `win.eventlog.system.ntstatus` |
| `winre_servicing_failed` / `default` | 4502 | **fields: none** |
| `wlan_limited_connectivity` / `default` | 4003 | **fields: none** |
| `vss_shadow_copy_reclaimed` | 33, 58, 95 | `win.eventlog.system.volume` |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `app_popup_error` / `default`
- `av_unsigned_code_blocked` / `default`
- `cluster_csv_unavailable` / `default`
- `cluster_node_removed` / `default`
- `cluster_quorum_loss` / `default`
- `cluster_resource_failed` / `default`
- `cluster_resource_hang` / `default`
- `cluster_rhs_crash` / `default`
- `cluster_service_down` / `default`
- `dcom_activation_timeout` / `default`
- `dcom_start_error` / `default`
- `disk_bad_block` / `default`
- `disk_controller_error` / `default`
- `disk_corruption` / `default`
- `disk_io_retried` / `default`
- `disk_paging_error` / `default`
- `disk_surprise_removal` / `default`
- `ephemeral_port_alloc_failed` / `default`
- `gpu_driver_reset` / `default`
- `http_ssl_binding_created` / `default`
- `http_ssl_binding_deleted` / `default`
- `http_ssl_config_failed` / `default`
- `iis_apppool_disabled` / `default`
- `iis_apppool_failure` / `default`
- `iis_worker_crash` / `default`
- `kerberos_cert_domain_unresolved` / `default`
- `kerberos_etype_unsupported` / `default`
- `kerberos_pac_verify_failed` / `default`
- `kerberos_smartcard_cert_missing` / `default`
- `kerberos_weak_krbtgt_key` / `default`
- `nic_driver_fault` / `load_failed`
- `nic_driver_fault` / `self_reported_fault`
- `nic_link_down` / `default`
- `nic_link_up` / `default`
- `platform_integrity_indicator` / `escalated`
- `platform_integrity_indicator` / `partial`
- `rds_license_server_unactivated` / `default`
- `rds_license_tracking_failed` / `default`
- `rds_licensing_service_failed` / `database_error`
- `rds_licensing_service_failed` / `start_failed`
- `secure_boot_cert_update_pending` / `default`
- `security_agent_service_start_failed` / `default`
- `security_agent_service_terminated` / `default`
- `smb_delayed_write_lost` / `default`
- `smb_server_transport_bind_failed` / `default`
- `smb_share_recreate_failed` / `default`
- `storage_controller_reset` / `default`
- `tls_cert_expired` / `default`
- `tls_cert_name_mismatch` / `default`
- `tls_cert_untrusted_ca` / `default`
- `tls_cipher_mismatch` / `default`
- `tls_client_credential_failed` / `default`
- `tls_server_credential_failed` / `default`
- `tpm_attestation_failed` / `default`
- `unexpected_shutdown` / `default`
- `vpn_connected` / `default`
- `winre_servicing_failed` / `default`
- `wlan_limited_connectivity` / `default`
