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
| `win.eventlog.management.job_name` | string | BITS transfer job display name from Bits-Client 61 (`name`), e.g. the update-download job a servicing client created. The recurrence pivot for a transfer that keeps failing. |
| `win.eventlog.management.task_name` | string | Scheduled task path from the Task Scheduler failure ids (`TaskName`), e.g. `\Microsoft\Windows\UpdateOrchestrator\USO_UxBroker`. The recurrence pivot for one task that keeps failing to start or to load. |
| `win.eventlog.management.task_error_description` | string | The internal operation Task Scheduler names beside the failure on ids 104 and 311 (`ErrorDescription`), e.g. the logon call or the elevation check that returned the code. |
| `win.eventlog.management.task_engine_command` | string | Host process Task Scheduler tried to start for a task engine, from TaskScheduler 311 (`Command`). |
| `win.eventlog.management.update_service_id` | string | Identifier of the update service a scan was run against, from WindowsUpdateClient 25 (`serviceGuid`), casefolded. Separates a local update server from the public update service. |
| `win.eventlog.management.update_title` | string | Display title of the update whose download failed, from WindowsUpdateClient 31 (`updateTitle`). |
| `win.eventlog.management.printer_driver_name` | string | Printer driver a failed install was for, from the PrintService driver ids (`DriverName`, `Driver` or `ObjectName`). The pivot that collapses one hash per driver name into one group. |
| `win.eventlog.management.driver_install_stage` | string | Stage of the driver install the spooler was in when it failed, from the PrintService driver ids (`Label`). |
| `win.eventlog.management.driver_install_message` | string | The spooler operation that returned the failure on a driver install, from the PrintService driver ids (`Message`). Separates a real add or import from a driver-store lookup. |
| `win.eventlog.management.bitlocker_drive_role` | string | Drive role a BitLocker compliance check was about, from DeviceManagement 2900 (`Message1`), e.g. the operating-system volume or a fixed data volume. |
| `win.eventlog.management.bitlocker_fve_status` | string | Raw BitLocker status bitmask the device management client reported beside a compliance failure (`HexInt1`). Promoted undecoded: no published value map was read for it. |
| `win.eventlog.management.bitlocker_method_found` | string | Encryption method the operating-system volume is actually using, from DeviceManagement 2902 (`HexInt1`). |
| `win.eventlog.management.bitlocker_method_wanted` | string | Encryption method the policy requires for the operating-system volume, from DeviceManagement 2902 (`HexInt2`). |
| `win.eventlog.management.mdm_csp_uri` | string | Configuration node a management command was addressed to, from the MDM ConfigurationManager ids (`Message5`). The pivot that says WHICH setting did not take effect. |
| `win.eventlog.management.mdm_policy_area` | string | Policy area a management setting belongs to, from the MDM PolicyManager ids (`Message1`). |
| `win.eventlog.management.mdm_policy_name` | string | Policy setting a management command tried to set, from the MDM PolicyManager ids (`Message2`). |
| `win.eventlog.management.locale_registry_key` | string | Registry key holding the locale settings a process could not read, from International 1001 (`RegistryKey`). Separates a machine-wide fault from a per-user one. |
| `win.eventlog.management.vm_name` | string | Virtual machine an event is about, from the Hyper-V ids (`VmName`). An administrator-chosen machine label and the pivot every virtualization reason here needs. |
| `win.eventlog.management.vm_storage_request_ms` | int | Milliseconds one guest storage request took to complete, from Hyper-V-StorageVSP 9 (`Duration`). |
| `win.eventlog.management.vm_storage_opcode` | int | SCSI operation code of the guest storage request, from Hyper-V-StorageVSP 9 (`Command`). Promoted as the number: no constant-name table is claimed for it here. |
| `win.eventlog.management.vm_storage_transfer_bytes` | int | Bytes the guest storage request was transferring, from Hyper-V-StorageVSP 9 (`DataTransferLength`). |
| `win.eventlog.management.vhd_parent_guid_expected` | string | Parent identity a differencing virtual disk expected, from VHDMP 7 (`ExpectedParentLastWriteGUID1`). |
| `win.eventlog.management.vhd_parent_guid_actual` | string | Parent identity the parent virtual disk actually carries, from VHDMP 7 (`ParentLastWriteGUID`). Differs from the expected one when the chain is broken. |
| `win.eventlog.management.replica_retry_minutes` | int | Minutes Hyper-V will wait before retrying replication for a virtual machine, from VMMS 32315 (`Parameter0`). |

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
| `bitlocker_policy_noncompliant` / `default` | 2900, 2902, 2903, 2905, 2906, 2910, 2914 | `win.eventlog.management.bitlocker_drive_role` `win.eventlog.management.bitlocker_fve_status` `win.eventlog.management.bitlocker_method_found` `win.eventlog.management.bitlocker_method_wanted` |  |
| `bits_transfer_failed` / `default` | 61 | `win.eventlog.management.job_name` |  |
| `dfsr_partner_communication_failed` / `default` | 5002, 5008, 5012, 5014 | **fields: none** |  |
| `dfsr_replication_stopped` / `config_unreachable` | 1202 | **fields: none** |  |
| `dfsr_replication_stopped` / `folder_stopped` | 2004, 2104, 4004 | **fields: none** |  |
| `dfsr_replication_stopped` / `offline_too_long` | 4012 | **fields: none** |  |
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
- `dfsr_sysvol_initial_sync_pending` / `default`
- `print_connection_reopen_failed` / `service_profile`
- `print_connection_reopen_failed` / `user_profile`
- `wmi_query_failed`
