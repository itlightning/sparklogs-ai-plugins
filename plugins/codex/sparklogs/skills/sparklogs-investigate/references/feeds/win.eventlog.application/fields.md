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

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface and per event id, because promotion is a property of the branch, not of the module.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `app_crash` / `default` | 1000 | `win.eventlog.application.app_name` `win.eventlog.application.exception_code` `win.eventlog.application.module_name` `win.eventlog.application.report_id` `win.eventlog.application.rm_session_id` |
| `app_crash_report` / `default` | 1001 | `win.eventlog.application.app_name` `win.eventlog.application.event_name` `win.eventlog.application.fault_bucket` `win.eventlog.application.report_id` `win.eventlog.application.rm_session_id` |
| `app_hang` / `default` | 1002 | `win.eventlog.application.app_name` `win.eventlog.application.hang_type` `win.eventlog.application.report_id` `win.eventlog.application.rm_session_id` |
| `ca_chain_fail` / `default` | 58, 65, 66 | `win.eventlog.application.rm_session_id` |
| `ca_crl_fail` / `default` | 74 | `win.eventlog.application.rm_session_id` |
| `cert_enroll_fail` / `failed` | 86, 87 | `win.eventlog.application.rm_session_id` |
| `cert_enroll_fail` / `retired_aik` | 86, 87 | `win.eventlog.application.rm_session_id` |
| `db_corruption` / `io_error` | 823, 824, 825 | `win.eventlog.application.rm_session_id` |
| `db_corruption` / `logical_corruption` | 823, 824, 825 | `win.eventlog.application.rm_session_id` |
| `db_corruption` / `read_retry` | 823, 824, 825 | `win.eventlog.application.rm_session_id` |
| `dotnet_unhandled` / `default` | 1026 | `win.eventlog.application.rm_session_id` |
| `e2e_test_event` / `default` | 777 | `win.eventlog.application.rm_session_id` |
| `esent_corruption` / `default` | 447, 448, 474 | `win.eventlog.application.rm_session_id` |
| `gpu_driver_error` / `default` | n/a | `win.eventlog.application.rm_session_id` |
| `install_error` / `error` | 1013, 1032, 10005, 11722, 11729, 11923 | `win.eventlog.application.rm_session_id` |
| `install_error` / `retry_later` | 1013, 1032, 10005, 11722, 11729, 11923 | `win.eventlog.application.msi_status` `win.eventlog.application.rm_session_id` |
| `install_failed` / `failed` | 11708 | `win.eventlog.application.rm_session_id` |
| `install_failed` / `retry_later` | 11708 | `win.eventlog.application.msi_status` `win.eventlog.application.rm_session_id` |
| `profile_load_fail` / `default` | 1511, 1542 | `win.eventlog.application.rm_session_id` |
| `restart_blocked` / `default` | 10006, 10007 | `win.eventlog.application.blocked_app` `win.eventlog.application.blocked_app_path` `win.eventlog.application.rm_session_id` `win.eventlog.application.rm_status` |
| `vendor_svc_fail` / `default` | n/a | `win.eventlog.application.rm_session_id` |
