<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.storage`

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

Stored flat under the `win.eventlog.storage.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.storage.sense_key` | int | SCSI sense key the device returned on a failed command, from Storage-ClassPnP 507 (SenseKey). The top-level classification of what the device is reporting, and the grouping key for a drive answering the same way repeatedly. |
| `win.eventlog.storage.additional_sense_code` | int | SCSI additional sense code from Storage-ClassPnP 507 (AdditionalSenseCode). Read together with the sense key: the pair is what names the specific condition. |
| `win.eventlog.storage.additional_sense_code_qualifier` | int | SCSI additional sense code qualifier from Storage-ClassPnP 507 (AdditionalSenseCodeQualifier). The third element of the sense triple. |
| `win.eventlog.storage.scsi_status` | int | SCSI status byte the device returned, from Storage-ClassPnP 507 (ScsiStatus). |
| `win.eventlog.storage.srb_status` | int | SRB status as the storage port driver logged it, from Storage-ClassPnP 507 (SrbStatus). Carries flag bits above the status itself; group on srb_status_code instead. |
| `win.eventlog.storage.srb_status_code` | int | The SRB status with its flag bits removed (the low six bits of srb_status). One status arrives under several srb_status numbers depending on which flags the driver set, so this is the value a query groups on. |
| `win.eventlog.storage.cdb_bytes` | string | The SCSI command descriptor block the failing command carried, from Storage-ClassPnP 507 (CdbBytes), as hex text with a 0x prefix. The prefix is added here: Windows writes the field without one, and an all-digit hex string is otherwise read as a number and stored as one. |
| `win.eventlog.storage.sense_key_name` | string | Bounded meaning token decoded from the sense key (no_sense, not_ready, medium_error, hardware_error, illegal_request, unit_attention, data_protect, aborted_command and the rest of the published set). The number stays beside it; an unlisted code leaves this unset. |
| `win.eventlog.storage.additional_sense_name` | string | Bounded meaning token decoded from the additional sense code, for the small set this module reads (illegal_command, invalid_cdb, medium_changed, bus_reset, no_media_in_device). An unlisted code leaves this unset. |
| `win.eventlog.storage.srb_status_name` | string | Bounded meaning token decoded from srb_status_code, the SRB status with its flag bits removed (success, error, busy, timeout, bus_reset and the rest of the published set). An unlisted code leaves this unset. |
| `win.eventlog.storage.bus_type` | int | The bus the device sits on, as the STORAGE_BUS_TYPE number the driver wrote. The value that separates a fixed disk from a removable one, which is what decides whether a read failure is a claim about the medium. |
| `win.eventlog.storage.bus_type_name` | string | Bounded meaning token decoded from bus_type (bus_usb, bus_sata, bus_nvme, bus_raid, bus_sas and the rest of the published set). An unlisted code leaves this unset. |
| `win.eventlog.storage.io_type` | int | The kind of IO NTFS was performing when it failed, as the number the file system wrote (Ntfs 148 IoType). |
| `win.eventlog.storage.io_size_bytes` | int | Size in bytes of the IO NTFS was performing when it failed (Ntfs 148 IoSize). |
| `win.eventlog.storage.clusters_count` | int | How many clusters the failed NTFS IO covered (Ntfs 148 ClustersCount). Read with starting_lcn: the pair is the extent the device would not return. |
| `win.eventlog.storage.starting_lcn` | int | The first logical cluster number of the failed NTFS IO (Ntfs 148 StartingLcn). Every occurrence names a different one, which is why it is evidence rather than a grouping key. |
| `win.eventlog.storage.is_boot_volume` | bool | Whether the volume NTFS was reading or writing is the boot volume (Ntfs 148 IsBootVolume). |
| `win.eventlog.storage.volume_name` | string | The volume the NTFS event is about, as the file system named it (VolumeName). Empty on a mount attempt against a device that is not present. |
| `win.eventlog.storage.volume_guid` | string | The volume GUID the NTFS event carried (VolumeGuid). The stable key for a volume across drive-letter changes; null when NTFS never got far enough to have one. |
| `win.eventlog.storage.device_number` | int | The disk number the storage class driver assigned the device (DeviceNumber). The per-host device key a repeated failure groups on. |
| `win.eventlog.storage.retries_done` | int | How many times the class driver had already retried the request before it gave up (NumberOfRetriesDone). |
| `win.eventlog.storage.miniport_name` | string | The Storport miniport driver handling the device path (MiniportName). What separates an external USB enclosure from an internal controller. |
| `win.eventlog.storage.boot_device` | bool | Whether the device the port driver reset is the boot device (BootDevice). The positive test that raises a reset out of the degraded band. |
| `win.eventlog.storage.bus_reset_reason` | int | Why the port driver reset the bus, as the number the driver wrote (BusResetReason). Microsoft publishes no value table, so the number ships undecoded rather than guessed at. |
| `win.eventlog.storage.reset_type` | int | Which level of reset the port driver performed, as the number the driver wrote (ResetType). Microsoft publishes no value table, so the number ships undecoded rather than guessed at. |
| `win.eventlog.storage.reset_status` | string | The status the reset itself returned (ResetStatus), as the hex word the driver wrote. Zero says the reset succeeded, which is the ordinary case. |
| `win.eventlog.storage.failed_io_count` | int | How many outstanding requests the port driver threw away when it reset the path (FailedIoCount). |
| `win.eventlog.storage.srb_timeout_s` | int | The per-request timeout in seconds the port driver was enforcing when the request timed out (SrbTimeout). |
| `win.eventlog.storage.port_number` | int | The adapter port the device is attached to (PortNumber). Part of the device path address. |
| `win.eventlog.storage.path_id` | int | The bus number within the adapter (PathID). Part of the device path address. |
| `win.eventlog.storage.target_id` | int | The target number on the bus (TargetID). Part of the device path address. |
| `win.eventlog.storage.lun` | int | The logical unit number on the target (LUN). Part of the device path address. |
| `win.eventlog.storage.removable` | bool | Whether the driver considers the device removable (Removable). A device that vanishes with this false is a path failure rather than somebody unplugging something. |
| `win.eventlog.storage.surprise_removal_ok` | bool | Whether the device declares that removal without an eject is supported (SurpriseRemovalOK). |
| `win.eventlog.storage.device_state` | int | The device state the port driver recorded at removal, as the number the driver wrote (DeviceState). |
| `win.eventlog.storage.device_type` | int | The SCSI device type the port driver recorded, as the number the driver wrote (DeviceType). |
| `win.eventlog.storage.hc_stateid` | int | The NTFS global corruption-handling state the file system moved to (Ntfs/WHC 100 hc_stateid). Microsoft publishes the template and no value map, so the number ships undecoded and the provider level carries the reading. |
| `win.eventlog.storage.paging_priority` | int | The priority the kernel attached to the paging IO that failed (PagingPriority). |
| `win.eventlog.storage.lba` | string | The logical block address of the failed paging IO (LBA), as the hex text the driver wrote. |
| `win.eventlog.storage.transfer_bytes` | int | How many bytes the failed paging IO was moving (TransferByteCount). |
| `win.eventlog.storage.nv_cache_priority` | int | The non-volatile cache priority the request carried (NvCachePriority). |
| `win.eventlog.storage.health_flag_name` | string | The device-health parameter the miniport named on a Storport health sample, verbatim as the driver wrote it (the ParameterNName whose value the arm tested). |
| `win.eventlog.storage.health_flag_value` | int | The value the miniport reported for health_flag_name (the matching ParameterNValue). |
| `win.eventlog.storage.percentage_used_pct` | int | Percent of rated write endurance the device reports it has consumed, from an NVMe health sample. Values above 100 are legal and mean the drive is past its rated life. |
| `win.eventlog.storage.endurance_threshold_pct` | int | The endurance percentage the device treats as its own threshold, from the same NVMe health sample. Read against percentage_used_pct: the comparison is the claim, not either number alone. |

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `disk_bad_block` / `device_data_error` | 148, 505, 506 | `win.eventlog.storage.additional_sense_code` `win.eventlog.storage.additional_sense_name` `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.clusters_count` `win.eventlog.storage.device_number` `win.eventlog.storage.io_size_bytes` `win.eventlog.storage.io_type` `win.eventlog.storage.is_boot_volume` `win.eventlog.storage.retries_done` `win.eventlog.storage.sense_key` `win.eventlog.storage.sense_key_name` `win.eventlog.storage.srb_status` `win.eventlog.storage.srb_status_code` `win.eventlog.storage.srb_status_name` `win.eventlog.storage.starting_lcn` `win.eventlog.storage.volume_name` |  |
| `disk_bad_block` / `removable_verify` | 148 | `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.clusters_count` `win.eventlog.storage.io_size_bytes` `win.eventlog.storage.io_type` `win.eventlog.storage.is_boot_volume` `win.eventlog.storage.starting_lcn` `win.eventlog.storage.volume_name` |  |
| `disk_failure_predicted` / `default` | 539, 542, 543 | `win.eventlog.storage.endurance_threshold_pct` `win.eventlog.storage.health_flag_name` `win.eventlog.storage.health_flag_value` `win.eventlog.storage.percentage_used_pct` |  |
| `disk_paging_error` / `default` | 502, 503 | `win.eventlog.storage.device_number` `win.eventlog.storage.lba` `win.eventlog.storage.nv_cache_priority` `win.eventlog.storage.paging_priority` `win.eventlog.storage.transfer_bytes` |  |
| `disk_surprise_removal` / `default` | 103, 551 | `win.eventlog.storage.device_state` `win.eventlog.storage.device_type` `win.eventlog.storage.lun` `win.eventlog.storage.miniport_name` `win.eventlog.storage.port_number` `win.eventlog.storage.removable` `win.eventlog.storage.surprise_removal_ok` |  |
| `ntfs_corruption` / `state_error` | 100 | `win.eventlog.storage.hc_stateid` |  |
| `ntfs_corruption` / `state_warning` | 100 | `win.eventlog.storage.hc_stateid` |  |
| `storage_controller_reset` / `default` | 500, 501, 550 | `win.eventlog.storage.boot_device` `win.eventlog.storage.bus_reset_reason` `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.failed_io_count` `win.eventlog.storage.lun` `win.eventlog.storage.miniport_name` `win.eventlog.storage.path_id` `win.eventlog.storage.port_number` `win.eventlog.storage.reset_status` `win.eventlog.storage.reset_type` `win.eventlog.storage.srb_timeout_s` `win.eventlog.storage.target_id` |  |
| `storage_device_command_failed` / `default` | 507 | `win.eventlog.storage.additional_sense_code` `win.eventlog.storage.additional_sense_code_qualifier` `win.eventlog.storage.cdb_bytes` `win.eventlog.storage.scsi_status` `win.eventlog.storage.sense_key` `win.eventlog.storage.srb_status` `win.eventlog.storage.srb_status_code` |  |
| `vol_mount_failed` / `device_offline` | 305 | `win.eventlog.storage.volume_guid` `win.eventlog.storage.volume_name` |  |
| `vol_mount_failed` / `mount_failed` | 305 | `win.eventlog.storage.volume_guid` `win.eventlog.storage.volume_name` |  |
