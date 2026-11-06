<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.management`

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

Stored flat under the `win.eventlog.management.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.management.job_name` | string | Display name of the BITS transfer job that failed, from `name` on Bits-Client event 61, such as a download job Windows Update created. Group by it to find one transfer that keeps failing. |
| `win.eventlog.management.task_name` | string | Path of the scheduled task, from `TaskName` on the Task Scheduler failure events, such as `\Microsoft\Windows\UpdateOrchestrator\USO_UxBroker`. Group by it to find one task that keeps failing to start or to load. |
| `win.eventlog.management.task_error_description` | string | Step Task Scheduler names beside the failure code on events 104 and 311, from `ErrorDescription`, such as the logon or the elevation check that failed. |
| `win.eventlog.management.task_engine_command` | string | Program Task Scheduler tried to start to run a task, from `Command` on event 311. |
| `win.eventlog.management.update_service_id` | string | GUID of the update service a Windows Update scan ran against, from `serviceGuid` on WindowsUpdateClient event 25, in lowercase. Tells a local update server (WSUS) apart from Microsoft Update. |
| `win.eventlog.management.update_title` | string | Title of the update whose download failed, from `updateTitle` on WindowsUpdateClient event 31. |
| `win.eventlog.management.printer_driver_name` | string | Printer driver a failed install was for, from `DriverName`, `Driver` or `ObjectName` on the PrintService driver events. Group by it to see which driver keeps failing. |
| `win.eventlog.management.driver_install_stage` | string | Stage the print spooler had reached when a driver install failed, from `Label` on the PrintService driver events. |
| `win.eventlog.management.driver_install_message` | string | Spooler call that failed during a driver install, from `Message` on the PrintService driver events. Tells a real driver add or import from a lookup in the driver store. |
| `win.eventlog.management.bitlocker_drive_role` | string | Kind of drive a BitLocker compliance check was about, from `Message1` on DeviceManagement BitLocker events, such as the operating-system drive or a fixed data drive. |
| `win.eventlog.management.bitlocker_fve_status` | string | BitLocker status flags the device management client reported with a compliance failure, from `HexInt1`, as the hex value Windows wrote. SparkLogs does not decode it. |
| `win.eventlog.management.bitlocker_method_found` | string | Encryption method the operating-system drive is using, from `HexInt1` on DeviceManagement event 2902, as the hex value Windows wrote. |
| `win.eventlog.management.bitlocker_method_wanted` | string | Encryption method policy requires for the operating-system drive, from `HexInt2` on DeviceManagement event 2902, as the hex value Windows wrote. |
| `win.eventlog.management.mdm_csp_uri` | string | Configuration setting path (CSP URI) an MDM command was sent to, from `Message5` on the DeviceManagement-Enterprise-Diagnostics-Provider failure events. Says which setting did not apply. |
| `win.eventlog.management.mdm_policy_area` | string | Policy area of the MDM setting that failed, from `Message1` on PolicyManager events 806 and 821. |
| `win.eventlog.management.mdm_policy_name` | string | Name of the MDM policy setting that failed to apply, from `Message2` on PolicyManager events 806 and 821. |
| `win.eventlog.management.locale_registry_key` | string | Registry key with the locale settings a program could not read, from `RegistryKey` on International event 1001. A key in one user profile points to that user, and a machine-wide key affects everyone on the machine. |
| `win.eventlog.management.vm_name` | string | Name of the virtual machine the Hyper-V event is about, from `VmName`, as the administrator named it. |
| `win.eventlog.management.vm_storage_request_ms` | int | Time in milliseconds one virtual machine storage request took to complete, from `Duration` on Hyper-V-StorageVSP event 9. |
| `win.eventlog.management.vm_storage_opcode` | int | SCSI command code of the slow virtual machine storage request, from `Command` on Hyper-V-StorageVSP event 9, as a number. |
| `win.eventlog.management.vm_storage_transfer_bytes` | int | Size in bytes of the slow virtual machine storage request, from `DataTransferLength` on Hyper-V-StorageVSP event 9. |
| `win.eventlog.management.vhd_parent_guid_expected` | string | Identifier of the parent disk a differencing virtual disk expects, from `ExpectedParentLastWriteGUID1` on VHDMP event 7. |
| `win.eventlog.management.vhd_parent_guid_actual` | string | Identifier the parent virtual disk actually carries, from `ParentLastWriteGUID` on VHDMP event 7. When it differs from the expected identifier, the disk chain is broken, usually because the parent disk was changed or replaced. |
| `win.eventlog.management.replica_retry_minutes` | int | Minutes Hyper-V will wait before it retries replication for the virtual machine, from VMMS event 32315. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `component` | not queryable as a field |
| `result_code` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `bitlocker_policy_noncompliant` / `default` | 2900, 2902, 2903, 2904, 2905, 2906, 2910, 2914 | `win.eventlog.management.bitlocker_drive_role` `win.eventlog.management.bitlocker_fve_status` `win.eventlog.management.bitlocker_method_found` `win.eventlog.management.bitlocker_method_wanted` |  |
| `bits_transfer_failed` / `default` | 61 | `win.eventlog.management.job_name` |  |
| `dfsr_partner_communication_failed` / `default` | 5002, 5008, 5012, 5014 | **fields: none** |  |
| `dfsr_replication_stopped` / `config_unreachable` | 1202 | **fields: none** |  |
| `dfsr_replication_stopped` / `folder_stopped` | 2004, 2104, 4004 | **fields: none** |  |
| `dfsr_replication_stopped` / `offline_too_long` | 4012 | **fields: none** |  |
| `dfsr_replication_stopped` / `wmi_registration_failed` | 6104 | **fields: none** |  |
| `dfsr_sysvol_initial_sync_pending` / `default` | 4612, 4614 | **fields: none** |  |
| `hyperv_replication_failed` / `retrying` | 32315 | `win.eventlog.management.replica_retry_minutes` `win.eventlog.management.vm_name` |  |
| `hyperv_replication_failed` / `state_conflict` | 33676 | `win.eventlog.management.vm_name` |  |
| `hyperv_replication_failed` / `unreachable` | 29292, 29312, 32022, 32552 | `win.eventlog.management.vm_name` |  |
| `hyperv_vm_backup_checkpoint_failed` / `checkpoint_failed` | 3280, 4093, 10150, 10172, 18012 | `win.eventlog.management.vm_name` |  |
| `hyperv_vm_backup_checkpoint_failed` / `guest_writer_failed` | 3280, 4093, 10150, 10172, 18012 | `win.eventlog.management.vm_name` |  |
| `hyperv_vm_backup_checkpoint_failed` / `integration_service_disabled` | 3280, 4093, 10150, 10172, 18012 | `win.eventlog.management.vm_name` |  |
| `hyperv_vm_backup_checkpoint_failed` / `serialisation_wait` | 3280, 4093, 10150, 10172, 18012 | `win.eventlog.management.vm_name` |  |
| `hyperv_vm_start_failed` / `default` | 3050, 3122, 15130, 15500 | `win.eventlog.management.vm_name` |  |
| `hyperv_vm_storage_request_slow` / `default` | 9 | `win.eventlog.management.vm_storage_opcode` `win.eventlog.management.vm_storage_request_ms` `win.eventlog.management.vm_storage_transfer_bytes` |  |
| `hyperv_vm_vhd_chain_corrupted` / `chain_broken` | 7, 16370, 19100 | `win.eventlog.management.vhd_parent_guid_actual` `win.eventlog.management.vhd_parent_guid_expected` `win.eventlog.management.vm_name` |  |
| `hyperv_vm_vhd_chain_corrupted` / `file_in_use` | 7, 16370, 19100 | `win.eventlog.management.vm_name` |  |
| `mdm_policy_apply_failed` / `access_denied` | 201, 404, 454, 806, 821, 4022 | `win.eventlog.management.mdm_csp_uri` `win.eventlog.management.mdm_policy_area` `win.eventlog.management.mdm_policy_name` |  |
| `mdm_policy_apply_failed` / `node_absent` | 201, 404, 454, 806, 821, 4022 | `win.eventlog.management.mdm_csp_uri` |  |
| `mdm_policy_apply_failed` / `other_result` | 201, 404, 454, 806, 821, 4022 | `win.eventlog.management.mdm_csp_uri` |  |
| `mdm_policy_apply_failed` / `throttled` | 201, 404, 454, 806, 821, 4022 | `win.eventlog.management.mdm_csp_uri` |  |
| `patch_download_failed` / `default` | 31 | `win.eventlog.management.update_title` |  |
| `patch_scan_failed` / `bad_criteria` | 25 | `win.eventlog.management.update_service_id` |  |
| `patch_scan_failed` / `other_failure` | 25 | `win.eventlog.management.update_service_id` |  |
| `patch_scan_failed` / `service_unreachable` | 25 | `win.eventlog.management.update_service_id` |  |
| `print_connection_reopen_failed` / `service_profile` | 603 | **fields: none** |  |
| `print_connection_reopen_failed` / `user_profile` | 603 | **fields: none** |  |
| `printer_driver_install_failed` / `default` | 213, 215, 217, 219, 225, 600, 601, 869 | `win.eventlog.management.driver_install_message` `win.eventlog.management.driver_install_stage` `win.eventlog.management.printer_driver_name` |  |
| `scheduled_task_engine_failed` / `engine_unavailable` | 311 | `win.eventlog.management.task_engine_command` `win.eventlog.management.task_error_description` |  |
| `scheduled_task_engine_failed` / `no_user_session` | 311 | `win.eventlog.management.task_engine_command` `win.eventlog.management.task_error_description` |  |
| `scheduled_task_load_failed` / `default` | 146, 151 | `win.eventlog.management.task_name` |  |
| `scheduled_task_sign_in_failed` / `default` | 104 | `win.eventlog.management.task_error_description` |  |
| `scheduled_task_start_failed` / `access_denied` | 101, 103, 202, 203 | `win.eventlog.management.task_name` |  |
| `scheduled_task_start_failed` / `missing_action` | 101, 103, 202, 203 | `win.eventlog.management.task_name` |  |
| `scheduled_task_start_failed` / `other_failure` | 101, 103, 202, 203 | `win.eventlog.management.task_name` |  |
| `win_locale_registry_read_failed` / `default` | 1001 | `win.eventlog.management.locale_registry_key` |  |
| `wmi_query_failed` | 5858 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `dfsr_partner_communication_failed` / `default`
- `dfsr_replication_stopped` / `config_unreachable`
- `dfsr_replication_stopped` / `folder_stopped`
- `dfsr_replication_stopped` / `offline_too_long`
- `dfsr_replication_stopped` / `wmi_registration_failed`
- `dfsr_sysvol_initial_sync_pending` / `default`
- `print_connection_reopen_failed` / `service_profile`
- `print_connection_reopen_failed` / `user_profile`
- `wmi_query_failed`
