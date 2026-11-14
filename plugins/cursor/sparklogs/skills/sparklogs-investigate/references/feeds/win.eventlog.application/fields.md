<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.application`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.

## Raw fallback

There is NO general raw fallback on this module.
Its values come from positional string inserts, which the provider emits without names, so there is no name to ask for at rest.
A value that is not promoted here is readable in the message text and nowhere else.
Where the provider does name a payload field, that one follows the ordinary `event_data.<ProviderFieldName>` rule.

## Module fields

Stored flat under the `win.eventlog.application.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.application.quickbooks_edition` | string | QuickBooks edition named in the quoted header of a QuickBooks event 4. |
| `win.eventlog.application.event_name` | string | Kind of Windows Error Reporting report, from `EventName` on event 1001: for example APPCRASH (an application crash), AppHangB1 (a hang), BEX (a blocked exploit or buffer overrun), CLR20r3 (a .NET crash), BlueScreen (a stop error), or a StoreAgentInstall report for a Store install. Filter on it to pick crash reports out of event 1001. |
| `win.eventlog.application.fault_bucket` | string | Fault bucket ID Windows Error Reporting assigned to the report on event 1001. Reports with the same bucket share one crash signature. |
| `win.eventlog.application.appx_app_id` | string | ID of the packaged app the shell could not start, from `AppId` on Immersive-Shell event 5973 in the Application log: the package family name and the app ID inside it. |
| `win.eventlog.application.app_name` | string | Program the crash or hang is about: from Application Error 1000, Application Hang 1002, .NET Runtime 1026, and the first parameter of a Windows Error Reporting 1001 crash or hang report. Group by it to count crashes of one program across these events. |
| `win.eventlog.application.app_version` | string | Version of the crashed program, from Application Error 1000 and the second parameter of a Windows Error Reporting 1001 APPCRASH or CLR20r3 report. |
| `win.eventlog.application.module_name` | string | Module (DLL or EXE) where the crash happened, from Application Error 1000 and the fourth parameter of a Windows Error Reporting 1001 APPCRASH report. The module where a crash is reported is not always the module that caused it. |
| `win.eventlog.application.module_version` | string | Version of the module where the crash happened, from Application Error 1000 and the fifth parameter of a Windows Error Reporting 1001 APPCRASH report. |
| `win.eventlog.application.module_path` | string | Full path of the module where the crash happened, from Application Error 1000. |
| `win.eventlog.application.esent_database_path` | string | Path of the ESENT database the corruption event names, from ESENT events 447, 448 and 474. The database decides the impact: a cache Windows can rebuild, the store of a server role, or the data of an application. |
| `win.eventlog.application.exception_code` | string | Exception code of the crash, eight hex digits in lowercase, such as c0000005 (0xc0000005 where Windows writes the prefix), from Application Error 1000 and the seventh parameter of a Windows Error Reporting 1001 APPCRASH report. |
| `win.eventlog.application.fault_offset` | string | Hex offset inside the faulting module where the crash happened, as Windows wrote it, from Application Error 1000 and the eighth parameter of a Windows Error Reporting 1001 APPCRASH report. Together with the module name and version it points to the failing instruction. |
| `win.eventlog.application.process_start_filetime` | string | Start time of the crashed process, from Application Error 1000, as Windows wrote it: a FILETIME in hex. With the process ID it identifies the one process run that crashed. |
| `win.eventlog.application.managed_exception_type` | string | Type of the unhandled .NET exception, such as System.NullReferenceException, from .NET Runtime 1026 and the ninth parameter of a Windows Error Reporting 1001 CLR20r3 report. The exception message is not included. |
| `win.eventlog.application.bugcheck_name` | string | Name of the stop error, such as DRIVER_IRQL_NOT_LESS_OR_EQUAL, for the stop code in a Windows Error Reporting 1001 BlueScreen report. Absent when the code is not a documented bug check. |
| `win.eventlog.application.framework_version` | string | .NET runtime version the crashed program ran on, such as v4.0.30319, from the Framework Version line of .NET Runtime 1026. Absent when Windows writes that line in another language. |
| `win.eventlog.application.report_id` | string | GUID of the Windows Error Reporting report, from Windows Error Reporting 1001, Application Error 1000 and Application Hang 1002. Matches the crash event to its report and to the report folder kept on the machine. |
| `win.eventlog.application.hang_type` | string | Hang type Windows recorded on Application Hang 1002, often Unknown. |
| `win.eventlog.application.product` | string | Product name of the Windows Installer package, from MsiInstaller 1033 and from the text of the MsiInstaller 11101 to 13002 messages. |
| `win.eventlog.application.msi_status` | string | Windows Installer code that says the install must try again later: 1618 (another installation is already in progress), or its HRESULT form 0x80070652. Present on MsiInstaller failure events 1013, 1032, 10005 and 11101 to 13002 that carry it. |
| `win.eventlog.application.rm_session_id` | string | Restart Manager session ID, from `RmSessionId` on RestartManager events. Filter on it to follow how one install shut down and restarted running apps. |
| `win.eventlog.application.blocked_app` | string | Display name of the app Restart Manager could not shut down or restart, from `DisplayName` on RestartManager events 10006 and 10007. |
| `win.eventlog.application.blocked_app_path` | string | Full path of the program Restart Manager could not shut down or restart, from `FullPath` on RestartManager events 10006 and 10007. |
| `win.eventlog.application.rm_status` | string | Status code Restart Manager logged with the app it could not shut down or restart, from `Status` on RestartManager events 10006 and 10007, as Windows wrote it. |
| `win.eventlog.application.drive` | string | Drive letter, in lowercase with its colon, that Group Policy Drive Maps failed to map, from event 4117. The same failure on two drive letters is one problem. |
| `win.eventlog.application.share` | string | Network share (UNC path) Group Policy Drive Maps failed to map the drive to, from event 4117. Group by it to see which share is failing across machines. |
| `win.eventlog.application.msi_code_meaning` | string | Meaning of the Windows Installer message code in the event ID (event ID minus 10000, on MsiInstaller events 11101 to 13002), as a short English name from the Windows Installer error list. It is the same on every Windows language, and it names completions as well as failures. |
| `win.eventlog.application.vss_routine` | string | Routine the Volume Shadow Copy service was running when a call failed, as the function name in the message of VSS events 8193, 12289 and 12293. Group by it to see which routine is failing. Absent when the message names no routine, and when Windows writes the message in another language. |
| `win.eventlog.application.vss_operation_call` | string | First line of the Operation list on a VSS event: the call that failed. On the busiest events it is the same on every row, so group by it together with the last line of the list (what VSS was trying to do). Absent when the event has no Operation list, and when Windows writes it in another language. |
| `win.eventlog.application.vss_operation_intent` | string | Last line of the Operation list on a VSS event: what VSS was trying to do when the call failed, such as checking volume support, getting shadow copy properties or deleting shadow copies. Group by it to see what is failing. Equals the first line when the list has one line. Absent when the event has no Operation list, and when Windows writes it in another language. |
| `win.eventlog.application.vss_writer` | string | VSS writer named in the Context section of a VSS event, as Windows spells it, such as SqlServerWriter or Registry Writer. Group by it to see which writer is failing across machines. Absent when no writer is named: many VSS failures happen in the VSS service itself and involve no writer. |
| `win.eventlog.application.vss_state` | string | Snapshot phase VSS was in, from Current State in the Context section, as Windows wrote it, such as GatherWriterMetadata, DoSnapshotSet or BackupComplete. Expect new values: Microsoft publishes no fixed list. |
| `win.eventlog.application.vss_execution_context` | string | Role of the code that failed, from Execution Context in the Context section of a VSS event: Coordinator (the VSS service), Requestor (the backup program), Writer or System Provider. Absent when that line names something else, such as a writer product name. |
| `win.eventlog.application.vss_snapshot_context` | string | Kind of shadow copy, from Snapshot Context in the Context section of a VSS event, as the Microsoft constant name, such as VSS_CTX_BACKUP for a backup copy or VSS_CTX_CLIENT_ACCESSIBLE for the copies behind Previous Versions. Absent when the value matches no published context. |
| `win.eventlog.application.vss_snapshot_set` | string | Snapshot set ID a backup program received when it asked for a shadow copy, from VSS event 8231. Filter on it to follow one snapshot request through the later VSS events, or count it to see how often a machine takes snapshots. |
| `win.eventlog.application.vss_snapshot_attrs` | string | Extra snapshot options the backup program set on top of the snapshot kind, as Microsoft constant names separated by spaces, such as VSS_VOLSNAP_ATTR_AUTORECOVER, always in the same order. Absent when none were set, which is usual. |
| `win.eventlog.application.cert_template` | string | Certificate template the enrollment asked for, from `TemplateName` on CertificateServicesClient-CertEnroll events 13 and 82, such as DomainController or Machine. |
| `win.eventlog.application.profile_path` | string | Profile file or folder the User Profile Service could not load or delete, from `File` on events 1508 and 1509 or `Folder` on event 1533, such as a UsrClass.dat path under the user folder. |
| `win.eventlog.application.profile_error` | string | Windows error text the User Profile Service reported, from `Error` on events 1500, 1502, 1508 and 1533, such as Access is denied. |
| `win.eventlog.application.winlogon_subscriber` | string | Winlogon notification subscriber that was slow, from the first insert of Winlogon events 6005 and 6006, such as TrustedInstaller, GPClient or Profiles. |
| `win.eventlog.application.winlogon_notification` | string | Session event the subscriber was handling, from Winlogon events 6005 and 6006, such as CreateSession, Logon or Logoff. |
| `win.eventlog.application.winlogon_handle_s` | int | Seconds the subscriber took to handle the session event, from the second insert of Winlogon event 6006. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.throttle.window_s` |  |
| `sparklogs.process.id` | The process the event is about. |
| `sparklogs.process.path` | The process the event is about. |
| `sparklogs.process.name` | The process the event is about. |
| `sparklogs.result.code` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.code_space` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.code_name` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.failed` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
A key is listed with the module field of the same name; a key without one may still be queryable under another field in the table above.

| Tail key | Queryable as |
|---|---|
| `full_path` | no field of the same name |
| `status` | no field of the same name |
| `product` | `win.eventlog.application.product` |
| `msi_code` | no field of the same name |
| `msi_code_meaning` | `win.eventlog.application.msi_code_meaning` |
| `drive` | `win.eventlog.application.drive` |
| `share` | `win.eventlog.application.share` |
| `snapshot_set` | no field of the same name |
| `process_command_line` | no field of the same name |
| `file_spec` | no field of the same name |
| `account` | no field of the same name |
| `volume` | no field of the same name |
| `writer` | no field of the same name |
| `error_code` | no field of the same name |
| `error_code_name` | no field of the same name |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `adcs_ca_chain_failed` / `default` | 58 | **fields: none** |  |
| `adcs_crl_publish_failed` / `default` | 65, 66, 74, 75 | **fields: none** |  |
| `app_crash` / `application_error` | 4, 1000 | `win.eventlog.application.app_name` `win.eventlog.application.app_version` `win.eventlog.application.exception_code` `win.eventlog.application.fault_offset` `win.eventlog.application.module_name` `win.eventlog.application.module_path` `win.eventlog.application.module_version` `win.eventlog.application.process_start_filetime` `win.eventlog.application.report_id` |  |
| `app_crash` / `quickbooks_shutdown` | 4, 1000 | `win.eventlog.application.quickbooks_edition` |  |
| `app_hang` / `default` | 1002 | `win.eventlog.application.app_name` `win.eventlog.application.hang_type` `win.eventlog.application.report_id` |  |
| `appx_activation_failed` / `administrator_token` | 5973 | `win.eventlog.application.appx_app_id` |  |
| `appx_activation_failed` / `other_failure` | 5973 | `win.eventlog.application.appx_app_id` |  |
| `aspnet_compilation_failed` / `default` | 1310 | **fields: none** |  |
| `aspnet_unhandled_exception` / `default` | 1309 | **fields: none** |  |
| `cert_enroll_failed` / `autoenroll_cycle_failed` | 1, 6, 13, 82, 86, 87 | **fields: none** |  |
| `cert_enroll_failed` / `enrollment_failed` | 1, 6, 13, 82, 86, 87 | `win.eventlog.application.cert_template` |  |
| `cert_enroll_failed` / `failed` | 1, 6, 13, 82, 86, 87 | **fields: none** |  |
| `cert_enroll_failed` / `retired_aik` | 1, 6, 13, 82, 86, 87 | **fields: none** |  |
| `cert_expiring` / `default` | 64 | **fields: none** |  |
| `dotnet_unhandled_exception` / `default` | 1026 | `win.eventlog.application.app_name` `win.eventlog.application.framework_version` `win.eventlog.application.managed_exception_type` |  |
| `e2e_test_event` / `default` | 777 | **fields: none** |  |
| `entra_password_hash_sync_failed` / `default` | 611 | **fields: none** |  |
| `entra_sync_run_failed` / `default` | 6056 | **fields: none** |  |
| `entra_sync_scheduler_aborted` / `default` | 906 | **fields: none** |  |
| `esent_db_corruption` / `os_cache` | 447, 448, 474 | `win.eventlog.application.esent_database_path` |  |
| `esent_db_corruption` / `other_database` | 447, 448, 474 | `win.eventlog.application.esent_database_path` |  |
| `esent_db_corruption` / `server_role` | 447, 448, 474 | `win.eventlog.application.esent_database_path` |  |
| `gpu_driver_error` / `default` | n/a | **fields: none** |  |
| `group_policy_drive_map_failed` / `credential_rejected` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |  |
| `group_policy_drive_map_failed` / `letter_in_use` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |  |
| `group_policy_drive_map_failed` / `network_name_invalid` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |  |
| `group_policy_drive_map_failed` / `other_error` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |  |
| `group_policy_drive_map_failed` / `share_unreachable` | 4117 | `win.eventlog.application.drive` `win.eventlog.application.share` |  |
| `group_policy_extension_apply_failed` / `default` | 8194 | **fields: none** |  |
| `group_policy_preference_item_failed` / `credential_rejected` | 4098 | **fields: none** |  |
| `group_policy_preference_item_failed` / `other_error` | 4098 | **fields: none** |  |
| `mfa_not_configured` / `default` | 0 | **fields: none** |  |
| `mfa_sign_in_succeeded` / `default` | 0 | **fields: none** |  |
| `mfa_unavailable_access_granted` / `default` | 0 | **fields: none** |  |
| `mfa_user_not_enrolled` / `default` | 0 | **fields: none** |  |
| `mssql_agent_job_failed` / `default` | 208 | **fields: none** |  |
| `mssql_db_io_failed` / `default` | 823 | **fields: none** |  |
| `mssql_db_page_corruption` / `default` | 824 | **fields: none** |  |
| `mssql_db_read_retried` / `default` | 825 | **fields: none** |  |
| `mssql_login_failed` / `default` | 18456 | **fields: none** |  |
| `office_subscription_licensing_failed` / `default` | 0 | **fields: none** |  |
| `quickbooks_verify_database_advised` / `default` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `remote_assist_session_started` / `default` | 0 | **fields: none** |  |
| `restart_manager_app_pending` / `default` | 10006, 10007 | `win.eventlog.application.blocked_app` `win.eventlog.application.blocked_app_path` `win.eventlog.application.rm_session_id` `win.eventlog.application.rm_status` |  |
| `security_agent_config_fetch_failed` / `default` | 4 | **fields: none** |  |
| `security_agent_host_isolated` / `isolated` | 1, 2 | **fields: none** |  |
| `security_agent_host_isolated` / `released` | 1, 2 | **fields: none** |  |
| `vpn_dial_failed` / `default` | 20227 | **fields: none** |  |
| `vss_optimization_time_budget_reached` / `default` | 8219, 8220, 8226 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_writer` |  |
| `vss_provider_class_not_registered` / `default` | 22, 8193, 12292 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |  |
| `vss_snapshot_call_failed` / `diff_area_resize_denied` | 12289 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |  |
| `vss_snapshot_call_failed` / `phase_parameter_rejected` | 12289 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` |  |
| `vss_snapshots_failing_for_space` / `default` | 25, 8193 | **fields: none** |  |
| `vss_writer_callback_query` / `default` | 8194 | `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_writer` |  |
| `vss_writer_failed` / `default` | 8193, 24581, 24582, 24583 | `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_writer` |  |
| `wcf_request_failed` / `default` | 3 | **fields: none** |  |
| `win_msi_operation_failed` / `failed` | 1013, 1032, 1033, 10005, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |  |
| `win_msi_operation_failed` / `file_in_use` | 1013, 1032, 1033, 10005, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |  |
| `win_msi_operation_failed` / `install_error` | 1013, 1032, 1033, 10005, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | **fields: none** |  |
| `win_msi_operation_failed` / `outcome_failed` | 1013, 1032, 1033, 10005, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.product` |  |
| `win_msi_operation_failed` / `privilege_refused` | 1013, 1032, 1033, 10005, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |  |
| `win_msi_operation_failed` / `retry_later` | 1013, 1032, 1033, 10005, 11306, 11321, 11500, 11708, 11714, 11729, 11730 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.msi_status` `win.eventlog.application.product` |  |
| `win_msi_product_install_succeeded` / `default` | 1033, 11707 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |  |
| `win_msi_product_reconfigure_succeeded` / `default` | 11728 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |  |
| `win_msi_product_removal_succeeded` / `default` | 11724 | `win.eventlog.application.msi_code_meaning` `win.eventlog.application.product` |  |
| `win_user_profile_file_access_failed` / `folder_delete_failed` | 1508, 1509, 1533 | `win.eventlog.application.profile_error` `win.eventlog.application.profile_path` |  |
| `win_user_profile_file_access_failed` / `hive_load_failed` | 1508, 1509, 1533 | `win.eventlog.application.profile_error` `win.eventlog.application.profile_path` |  |
| `win_user_profile_load_failed` / `backup_profile_used` | 1500, 1502, 1511, 1515, 1542 | **fields: none** |  |
| `win_user_profile_load_failed` / `load_failed` | 1500, 1502, 1511, 1515, 1542 | `win.eventlog.application.profile_error` |  |
| `winlogon_notification_subscriber_slow` / `taking_long` | 6005, 6006 | `win.eventlog.application.winlogon_notification` `win.eventlog.application.winlogon_subscriber` |  |
| `winlogon_notification_subscriber_slow` / `took_long` | 6005, 6006 | `win.eventlog.application.winlogon_handle_s` `win.eventlog.application.winlogon_notification` `win.eventlog.application.winlogon_subscriber` |  |
| `wmi_provider_registered_as_localsystem` / `default` | 63 | **fields: none** |  |
| `app_crash_report` | 1001 | `win.eventlog.application.app_name` `win.eventlog.application.app_version` `win.eventlog.application.bugcheck_name` `win.eventlog.application.event_name` `win.eventlog.application.exception_code` `win.eventlog.application.fault_bucket` `win.eventlog.application.fault_offset` `win.eventlog.application.managed_exception_type` `win.eventlog.application.module_name` `win.eventlog.application.module_version` `win.eventlog.application.report_id` |  |
| `intel_dynamic_tuning_not_started` | n/a | **fields: none** |  |
| `quickbooks_bank_feed_decryption_failed` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_cache_save_failed` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_connection_login_refused` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_connection_probe` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_database_disconnected` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_document_print_failed` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_oauth_identity_empty` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_print_abort_close` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_print_job_end_failed` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_printer_add_denied` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_printer_already_exists` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_printer_driver_unknown` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_printer_open_failed` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `quickbooks_printer_setup_failed` | 4 | `win.eventlog.application.quickbooks_edition` |  |
| `therefore_db_error` | 101 | **fields: none** |  |
| `vss_account_resolve_failed` | 8230 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |  |
| `vss_flush_writes_timeout` | 12297 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |  |
| `vss_hold_writes_timeout` | 12298 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |  |
| `vss_legacy_driver_scan` | 513 | **fields: none** |  |
| `vss_snapshot_creation_initiated` | 8231 | `command_line` `win.eventlog.application.vss_snapshot_set` |  |
| `vss_snapshot_process_exited` | 8193 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |  |
| `vss_snapshot_shutdown_in_progress` | 13, 8193 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_routine` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |  |
| `vss_writer_rejected_event` | 8229 | `command_line` `win.eventlog.application.vss_execution_context` `win.eventlog.application.vss_operation_call` `win.eventlog.application.vss_operation_intent` `win.eventlog.application.vss_snapshot_attrs` `win.eventlog.application.vss_snapshot_context` `win.eventlog.application.vss_state` `win.eventlog.application.vss_writer` |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `adcs_ca_chain_failed` / `default`
- `adcs_crl_publish_failed` / `default`
- `aspnet_compilation_failed` / `default`
- `aspnet_unhandled_exception` / `default`
- `cert_enroll_failed` / `autoenroll_cycle_failed`
- `cert_enroll_failed` / `failed`
- `cert_enroll_failed` / `retired_aik`
- `cert_expiring` / `default`
- `e2e_test_event` / `default`
- `entra_password_hash_sync_failed` / `default`
- `entra_sync_run_failed` / `default`
- `entra_sync_scheduler_aborted` / `default`
- `gpu_driver_error` / `default`
- `group_policy_extension_apply_failed` / `default`
- `group_policy_preference_item_failed` / `credential_rejected`
- `group_policy_preference_item_failed` / `other_error`
- `mfa_not_configured` / `default`
- `mfa_sign_in_succeeded` / `default`
- `mfa_unavailable_access_granted` / `default`
- `mfa_user_not_enrolled` / `default`
- `mssql_agent_job_failed` / `default`
- `mssql_db_io_failed` / `default`
- `mssql_db_page_corruption` / `default`
- `mssql_db_read_retried` / `default`
- `mssql_login_failed` / `default`
- `office_subscription_licensing_failed` / `default`
- `remote_assist_session_started` / `default`
- `security_agent_config_fetch_failed` / `default`
- `security_agent_host_isolated` / `isolated`
- `security_agent_host_isolated` / `released`
- `vpn_dial_failed` / `default`
- `vss_snapshots_failing_for_space` / `default`
- `wcf_request_failed` / `default`
- `win_msi_operation_failed` / `install_error`
- `win_user_profile_load_failed` / `backup_profile_used`
- `wmi_provider_registered_as_localsystem` / `default`
- `intel_dynamic_tuning_not_started`
- `therefore_db_error`
- `vss_legacy_driver_scan`
