<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.application`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

There is NO general raw fallback on this module.
Its values come from positional string inserts, which the provider emits without names, so there is no name to ask for at rest.
A value that is not promoted here is readable in the message text and nowhere else.
Where the provider does name a payload field, that one follows the ordinary `event_data.<ProviderFieldName>` rule.

## Module fields

Stored flat under the `win.eventlog.application.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.application.event_name` | string | WER report EventName from Windows Error Reporting 1001 (APPCRASH \| AppHangB1 \| BEX \| BlueScreen \| StoreAgentInstall* \| ...). The discriminator of the heterogeneous 1001 id; the recognition pivot for crash-report queries. |
| `win.eventlog.application.fault_bucket` | string | WER fault bucket id from Windows Error Reporting 1001. The dedup/recurrence key: same bucket = same crash signature. |
| `win.eventlog.application.app_name` | string | Application the crash/hang record is about: WER 1001 (P1), Application Error 1000, Application Hang 1002. The cross-family crash-recurrence join key. |
| `win.eventlog.application.module_name` | string | Faulting module from Application Error 1000. Pins the crash to a DLL. |
| `win.eventlog.application.exception_code` | string | Exception code from Application Error 1000 (e.g. 0xc0000005), as logged. |
| `win.eventlog.application.report_id` | string | WER report GUID: Windows Error Reporting 1001, Application Error 1000, Application Hang 1002. Joins the crash event to its report record and the local WER archive. |
| `win.eventlog.application.hang_type` | string | Hang type from Application Hang 1002; often Unknown. |
| `win.eventlog.application.product` | string | Product name from MsiInstaller 1033. |
| `win.eventlog.application.msi_status` | string | Windows Installer result code from the MsiInstaller 1033 status insert (0 = success, 1603 = fatal, 1618 = another install in progress, ...). The retry-later codes read as an install that will come back rather than as a failure. |
| `win.eventlog.application.rm_session_id` | string | Restart Manager session id from the RestartManager 100xx family. Joins the shutdown/restart narration around one install operation. |
| `win.eventlog.application.blocked_app` | string | Display name of the app that could not be shut down/restarted, from RestartManager 10006/10007 (user_data DisplayName). |
| `win.eventlog.application.blocked_app_path` | string | Full binary path of the blocking app, from RestartManager 10006/10007 (user_data FullPath). |
| `win.eventlog.application.rm_status` | string | Restart Manager status code from RestartManager 10006/10007 (user_data Status), as logged. |
| `win.eventlog.application.drive` | string | Drive letter the Group Policy Drive Maps diagnostic (4117) was mapping, with its colon. The per-user configuration value: the same failure on two letters is one finding, so it is a field rather than part of the message head. |
| `win.eventlog.application.share` | string | UNC path the Group Policy Drive Maps diagnostic (4117) was mapping the drive to. The pivot for "which share is failing across the fleet". |
| `win.eventlog.application.msi_code_meaning` | string | Decoded meaning of the Windows Installer outcome code the event id carries (MsiInstaller 1xxxx, id = 10000 + code), as a stable token from the library decode table. The table names completions as well as failures, so the token states which. The pivot for "which installer condition is this", independent of the rendered language. |
| `win.eventlog.application.vss_routine` | string | The routine VSS was executing when a call failed, from the VSS call-failure ids (8193, 12289, 12293), as the API symbol the message names. Group by this rather than by the message pattern when asking which routine is failing: the pattern does not carry the routine on every shape it takes, so the same routine appears under more than one pattern. Absent where the message names free prose in place of a routine, and on a non-English host. |
| `win.eventlog.application.vss_operation_call` | string | First line of the Operation call stack on a VSS event: the immediate call that failed. Constant across an entire event population on the busiest ids, so it answers "which call" and is the wrong thing to group by on its own; pair it with vss_operation_intent. Absent where the event carries no Operation block, and on a non-English host. |
| `win.eventlog.application.vss_operation_intent` | string | Last line of the Operation call stack on a VSS event: what the call was being made FOR, in the coordinator vocabulary (checking volume support, getting shadow copy properties, deleting shadow copies). The half of the stack that varies, and the grouping key for "what was VSS trying to do when this failed". Equal to vss_operation_call on a one-line stack. Absent where the event carries no Operation block, and on a non-English host. |
| `win.eventlog.application.vss_writer` | string | Writer Name from the VSS Context block, verbatim and in the vendor casing (SqlServerWriter, Registry Writer, Shadow Copy Optimization Writer). The pivot for "which writer is failing across the estate". Absent where the block names no writer, which is a real answer rather than a gap: many VSS failures are coordinator-side and belong to no writer. |
| `win.eventlog.application.vss_state` | string | Current State from the VSS Context block, verbatim: the phase of the snapshot the coordinator was in (GatherWriterMetadata, DoSnapshotSet, BackupComplete and the like). Requester-side call and phase names, NOT the documented writer-state enum, and not a closed set: treat an unseen value as new vocabulary rather than as a defect. |
| `win.eventlog.application.vss_execution_context` | string | The architecture ROLE the failing code was running as, from Execution Context in the VSS Context block: Coordinator, Requestor, Writer or System Provider, spelled as the event spells them. Writer product names occupy the same slot in the raw text and deliberately do not reach this field, so it stays a role axis; use vss_writer for the product. Absent where the slot names something else. |
| `win.eventlog.application.vss_snapshot_context` | string | The KIND of shadow copy, from Snapshot Context in the VSS Context block, as the Microsoft constant name (VSS_CTX_BACKUP, VSS_CTX_APP_ROLLBACK, VSS_CTX_CLIENT_ACCESSIBLE, VSS_CTX_ALL and the rest). The base context only: modifier attributes composed onto it ride vss_snapshot_attrs. VSS_CTX_CLIENT_ACCESSIBLE is the Previous Versions and Shadow Copies for Shared Folders axis, so this is the field that separates those copies from backup copies. Absent where the value composes to no published constant. |
| `win.eventlog.application.vss_snapshot_set` | string | The Snapshot Set identifier a requester was given when it asked for a shadow copy, from the snapshot-initiation record. The join key between the request and everything the coordinator later logs about that set, and the axis that answers how many snapshot attempts a host makes in a window. |
| `win.eventlog.application.vss_snapshot_attrs` | string | Modifier attributes a requester composed onto the snapshot context, as space-separated Microsoft constant names (VSS_VOLSNAP_ATTR_AUTORECOVER and siblings), ascending by bit so the same value always renders the same string. Absent when the context carries no modifiers, which is the common case. A bit the library holds no name for contributes nothing here; the raw value stays in the retained event body. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.result.code` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.code_space` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.code_name` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.failed` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `full_path` | not queryable as a field |
| `status` | not queryable as a field |
| `product` | not queryable as a field |
| `msi_code` | not queryable as a field |
| `msi_code_meaning` | not queryable as a field |
| `drive` | not queryable as a field |
| `share` | not queryable as a field |
| `snapshot_set` | not queryable as a field |
| `process_command_line` | not queryable as a field |
| `file_spec` | not queryable as a field |
| `account` | not queryable as a field |
| `volume` | not queryable as a field |
| `writer` | not queryable as a field |
| `error_code` | not queryable as a field |
| `error_code_name` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `app_crash` / `default` | 1000 | `win.eventlog.application.app_name` `win.eventlog.application.exception_code` `win.eventlog.application.module_name` `win.eventlog.application.report_id` |
| `app_crash_report` / `default` | 1001 | `win.eventlog.application.app_name` `win.eventlog.application.event_name` `win.eventlog.application.fault_bucket` `win.eventlog.application.report_id` |
| `app_hang` / `default` | 1002 | `win.eventlog.application.app_name` `win.eventlog.application.hang_type` `win.eventlog.application.report_id` |
| `aspnet_compilation_failed` / `default` | 1310 | **fields: none** |
| `aspnet_unhandled_exception` / `default` | 1309 | **fields: none** |
| `ca_chain_fail` / `default` | 58, 65, 66 | **fields: none** |
| `ca_crl_fail` / `default` | 74 | **fields: none** |
| `cert_enroll_fail` / `autoenroll_cycle_failed` | 1, 6, 86, 87 | **fields: none** |
| `cert_enroll_fail` / `failed` | 1, 6, 86, 87 | **fields: none** |
| `cert_enroll_fail` / `retired_aik` | 1, 6, 86, 87 | **fields: none** |
| `cert_expiring` / `default` | 64 | **fields: none** |
| `db_corruption` / `io_error` | 823, 824, 825 | **fields: none** |
| `db_corruption` / `logical_corruption` | 823, 824, 825 | **fields: none** |
| `db_corruption` / `read_retry` | 823, 824, 825 | **fields: none** |
| `dotnet_unhandled` / `default` | 1026 | **fields: none** |
| `e2e_test_event` / `default` | 777 | **fields: none** |
| `entra_password_hash_sync_failed` / `default` | 611 | **fields: none** |
| `entra_sync_run_failed` / `default` | 6056 | **fields: none** |
| `entra_sync_scheduler_aborted` / `default` | 906 | **fields: none** |
| `esent_corruption` / `default` | 447, 448, 474 | **fields: none** |
| `gpu_driver_error` / `default` | n/a | **fields: none** |
| `group_policy_cse_apply_failed` / `default` | 8194 | **fields: none** |
| `group_policy_drive_map_failed` / `credential_rejected` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |
| `group_policy_drive_map_failed` / `letter_in_use` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |
| `group_policy_drive_map_failed` / `network_name_invalid` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |
| `group_policy_drive_map_failed` / `other_error` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |
| `group_policy_drive_map_failed` / `share_unreachable` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |
| `group_policy_pref_item_failed` / `credential_rejected` | 4098 | **fields: none** |
| `group_policy_pref_item_failed` / `other_error` | 4098 | **fields: none** |
| `install_error` / `error` | 1013, 1032, 10005 | **fields: none** |
| `install_error` / `retry_later` | 1013, 1032, 10005 | `win.eventlog.application.msi_status` |
| `install_failed` / `failed` | 1033, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |
| `install_failed` / `file_in_use` | 1033, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |
| `install_failed` / `outcome_failed` | 1033, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_status` `win.eventlog.application.product` |
| `install_failed` / `privilege_refused` | 1033, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |
| `install_failed` / `retry_later` | 1033, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.msi_status` `win.eventlog.application.product` |
| `mfa_login_succeeded` / `default` | 0 | **fields: none** |
| `mfa_not_configured` / `default` | 0 | **fields: none** |
| `mfa_unavailable_access_granted` / `default` | 0 | **fields: none** |
| `mfa_user_not_enrolled` / `default` | 0 | **fields: none** |
| `office_subscription_licensing_failed` / `default` | 0 | **fields: none** |
| `profile_load_fail` / `default` | 1511, 1542 | **fields: none** |
| `remote_assist_session_started` / `default` | 0 | **fields: none** |
| `restart_blocked` / `default` | 10006, 10007 | `win.eventlog.application.blocked_app` `win.eventlog.application.blocked_app_path` `win.eventlog.application.rm_session_id` `win.eventlog.application.rm_status` |
| `security_agent_config_fetch_failed` / `default` | 4 | **fields: none** |
| `security_agent_host_isolated` / `isolated` | 1, 2 | **fields: none** |
| `security_agent_host_isolated` / `released` | 1, 2 | **fields: none** |
| `shadowstorage_exhausted` / `default` | 8193 | **fields: none** |
| `vendor_svc_fail` / `default` | n/a | **fields: none** |
| `vpn_dial_failed` / `default` | 20227 | **fields: none** |
| `vss_call_failed_during_shutdown` / `default` | 13, 8193 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |
| `vss_data_integrity_writer_failed` / `default` | 8193, 24581, 24582, 24583 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_writer` |
| `vss_process_image_name_handle_invalid` / `default` | 8193 | `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_state` |
| `vss_provider_class_not_registered` / `default` | 22, 8193, 12292 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |
| `vss_snapshot_call_failed` / `diff_area_resize_denied` | 12289 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |
| `vss_snapshot_call_failed` / `phase_parameter_rejected` | 12289 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |
| `vss_snapshot_optimization_incomplete` / `default` | 8219, 8220, 8226 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_writer` |
| `vss_system_writer_driver_unreadable` / `default` | 513 | **fields: none** |
| `vss_writer_callback_access_denied` / `default` | 8194 | `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_writer` |
| `wcf_request_failed` / `default` | 3 | **fields: none** |
| `win_msi_product_install_succeeded` / `default` | 1033, 11707 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.msi_status` `win.eventlog.application.product` |
| `win_msi_product_reconfigure_succeeded` / `default` | 11728 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |
| `win_msi_product_removal_succeeded` / `default` | 11724 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |
| `wmi_provider_registered_as_localsystem` / `default` | 63 | **fields: none** |
| `vss_account_resolve_failed` | 8230 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |
| `vss_flush_writes_timeout` | 12297 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |
| `vss_hold_writes_timeout` | 12298 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |
| `vss_snapshot_creation_initiated` | 8231 | `command_line` `win.eventlog.application.vss_snapshot_set` |
| `vss_writer_rejected_event` | 8229 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `aspnet_compilation_failed` / `default`
- `aspnet_unhandled_exception` / `default`
- `ca_chain_fail` / `default`
- `ca_crl_fail` / `default`
- `cert_enroll_fail` / `autoenroll_cycle_failed`
- `cert_enroll_fail` / `failed`
- `cert_enroll_fail` / `retired_aik`
- `cert_expiring` / `default`
- `db_corruption` / `io_error`
- `db_corruption` / `logical_corruption`
- `db_corruption` / `read_retry`
- `dotnet_unhandled` / `default`
- `e2e_test_event` / `default`
- `entra_password_hash_sync_failed` / `default`
- `entra_sync_run_failed` / `default`
- `entra_sync_scheduler_aborted` / `default`
- `esent_corruption` / `default`
- `gpu_driver_error` / `default`
- `group_policy_cse_apply_failed` / `default`
- `group_policy_pref_item_failed` / `credential_rejected`
- `group_policy_pref_item_failed` / `other_error`
- `install_error` / `error`
- `mfa_login_succeeded` / `default`
- `mfa_not_configured` / `default`
- `mfa_unavailable_access_granted` / `default`
- `mfa_user_not_enrolled` / `default`
- `office_subscription_licensing_failed` / `default`
- `profile_load_fail` / `default`
- `remote_assist_session_started` / `default`
- `security_agent_config_fetch_failed` / `default`
- `security_agent_host_isolated` / `isolated`
- `security_agent_host_isolated` / `released`
- `shadowstorage_exhausted` / `default`
- `vendor_svc_fail` / `default`
- `vpn_dial_failed` / `default`
- `vss_system_writer_driver_unreadable` / `default`
- `wcf_request_failed` / `default`
- `wmi_provider_registered_as_localsystem` / `default`
