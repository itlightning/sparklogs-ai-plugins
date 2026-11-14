<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.storage`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.storage.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.storage.filesystem` | string | File system the corruption event is about, set from the provider that logged it. Today only NTFS events (Ntfs/WHC event 100) set it, so the value is always ntfs. |
| `win.eventlog.storage.sense_key` | int | SCSI sense key the disk returned for a failed command, from `SenseKey` on Storage-ClassPnP events 505, 506 and 507, as a number. The broad kind of error the disk reports. Group by it to see a disk giving the same answer again and again. |
| `win.eventlog.storage.additional_sense_code` | int | SCSI additional sense code, from `AdditionalSenseCode` on Storage-ClassPnP events 505, 506 and 507. With the sense key it names the specific condition. |
| `win.eventlog.storage.additional_sense_code_qualifier` | int | SCSI additional sense code qualifier, from `AdditionalSenseCodeQualifier` on Storage-ClassPnP event 507. Narrows the condition the sense key and additional sense code name. |
| `win.eventlog.storage.scsi_status` | int | SCSI status the disk returned, from `ScsiStatus` on Storage-ClassPnP event 507, as a number. |
| `win.eventlog.storage.srb_status` | int | Request (SRB) status the storage driver logged, from `SrbStatus` on Storage-ClassPnP events 505, 506 and 507. It includes flag bits, so one status can appear as several numbers. Group by the code without flags instead. |
| `win.eventlog.storage.srb_status_code` | int | Request (SRB) status with its flag bits removed (the low six bits of `SrbStatus`). Group by this one: it is the same number for the same status whatever flags the driver set. |
| `win.eventlog.storage.cdb_bytes` | string | SCSI command the failed request carried (the command descriptor block), from `CdbBytes` on Storage-ClassPnP events 505, 506 and 507 or `Cdb` on Storport events, as hex text with a 0x prefix. |
| `win.eventlog.storage.sense_key_name` | string | Sense key in words, such as not ready, medium error, hardware error, illegal request, unit attention or aborted command, from the published SCSI list. Absent for a number not on that list. |
| `win.eventlog.storage.additional_sense_name` | string | Additional sense code in words, for the few codes SparkLogs names: illegal command, invalid command block, medium changed, bus reset and no media in the device. Absent for other codes. |
| `win.eventlog.storage.srb_status_name` | string | Request (SRB) status in words, such as success, error, busy, timeout or bus reset, from the published list. Absent for a code not on that list. |
| `win.eventlog.storage.bus_type` | int | Bus the disk is attached to, as the number the driver wrote (STORAGE_BUS_TYPE) in `BusType` on Ntfs events 148 and 305. Tells a fixed disk from a removable one, which decides whether a read failure says anything about the disk itself. Absent on class driver and Storport events, which do not state the bus. |
| `win.eventlog.storage.bus_type_name` | string | Bus the disk is attached to, in words, such as USB, SATA, NVMe, RAID or SAS, on the events that carry `bus_type`. Absent for a number not on the published list. |
| `win.eventlog.storage.io_type` | int | Kind of read or write NTFS was doing when it failed, as the number on Ntfs event 148 (`IoType`). |
| `win.eventlog.storage.io_size_bytes` | int | Size in bytes of the read or write NTFS was doing when it failed, from `IoSize` on Ntfs event 148. |
| `win.eventlog.storage.clusters_count` | int | Number of clusters the failed NTFS read or write covered, from `ClustersCount` on Ntfs event 148. With the starting cluster it marks the area of the disk that failed. |
| `win.eventlog.storage.starting_lcn` | int | First cluster number of the failed NTFS read or write, from `StartingLcn` on Ntfs event 148. Each failure names a different one, so do not group by it. |
| `win.eventlog.storage.is_boot_volume` | bool | Whether the volume NTFS failed to read or write is the boot volume, from `IsBootVolume` on Ntfs event 148. |
| `win.eventlog.storage.volume_name` | string | Volume the NTFS event is about, as NTFS names it, from `VolumeName` on Ntfs events 148 and 305. Empty when Windows tried to mount a device that is not present. |
| `win.eventlog.storage.volume_guid` | string | Volume GUID on Ntfs event 305, from `VolumeGuid`. Stays the same when the drive letter changes. Absent when NTFS never got far enough to read one. |
| `win.eventlog.storage.device_number` | int | Disk number Windows assigned the disk, as Disk Management shows it, from `DeviceNumber` on Storage-ClassPnP events. Group by it to see repeated failures on one disk. |
| `win.eventlog.storage.retries_done` | int | Number of times the storage driver retried the request before it gave up, from `NumberOfRetriesDone` on Storage-ClassPnP events 505 and 506. |
| `win.eventlog.storage.miniport_name` | string | Storage controller driver for the disk, from `MiniportName` on Storport events, such as uaspstor for a USB enclosure or stornvme for an internal NVMe drive. |
| `win.eventlog.storage.boot_device` | bool | Whether the disk the storage driver reset is the boot disk, from `BootDevice` on Storport events 500 and 501. Event 550 does not state it. |
| `win.eventlog.storage.bus_reset_reason` | int | Reason the storage driver reset the bus, as the number the driver wrote in `BusResetReason`. Microsoft publishes no list of these numbers. |
| `win.eventlog.storage.reset_type` | int | Kind of reset the storage driver performed, as the number the driver wrote in `ResetType`. Microsoft publishes no list of these numbers. |
| `win.eventlog.storage.reset_status` | string | Result of the reset, from `ResetStatus`, as the hex value the driver wrote. Zero means the reset succeeded, which is usual. |
| `win.eventlog.storage.failed_io_count` | int | Number of pending requests the storage driver failed when it reset the disk path, from `FailedIoCount` on Storport events. |
| `win.eventlog.storage.srb_timeout_s` | int | Timeout in seconds the storage driver allowed each request before it gave up, from `SrbTimeout` on Storport events. |
| `win.eventlog.storage.port_number` | int | Controller port the disk is attached to, from `PortNumber` on Storport events. Part of the disk address. |
| `win.eventlog.storage.path_id` | int | Bus number on the controller, from `PathID` on Storport events. Part of the disk address. |
| `win.eventlog.storage.target_id` | int | Target number on the bus, from `TargetID` on Storport events. Part of the disk address. |
| `win.eventlog.storage.lun` | int | Logical unit number on the target, from `LUN` on Storport events. Part of the disk address. |
| `win.eventlog.storage.removable` | bool | Whether the driver treats the disk as removable, from `Removable` on Storport event 551. A non-removable disk that disappears usually means the path to it failed. Virtual disks also report themselves non-removable and are detached routinely. |
| `win.eventlog.storage.surprise_removal_ok` | bool | Whether the disk says it can be removed without ejecting it first, from `SurpriseRemovalOK` on Storport event 551. |
| `win.eventlog.storage.device_state` | int | State of the disk when it was removed, as the number the driver wrote in `DeviceState` on EhStorClass event 103. |
| `win.eventlog.storage.device_type` | int | SCSI device type, as the number the driver wrote in `DeviceType` on EhStorClass event 103. |
| `win.eventlog.storage.hc_stateid` | int | NTFS corruption handling state the file system moved to, from `hc_stateid` on Ntfs/WHC event 100, as a number. Microsoft publishes no list of these numbers. The event level says how serious it is. |
| `win.eventlog.storage.paging_priority` | int | Priority of the paging request (memory read from or written to disk) that failed, from `PagingPriority` on Storage-ClassPnP events 502 and 503. |
| `win.eventlog.storage.lba` | string | Disk block address (LBA) of the failed paging request, as the hex value the driver wrote, from Storage-ClassPnP events 502 and 503. |
| `win.eventlog.storage.transfer_bytes` | int | Bytes the failed paging request was moving, from `TransferByteCount` on Storage-ClassPnP events 502 and 503. |
| `win.eventlog.storage.nv_cache_priority` | int | Disk cache priority of the failed request, from `NvCachePriority` on Storage-ClassPnP events 502 and 503. |
| `win.eventlog.storage.health_flag_name` | string | Disk health value the storage driver flagged, by the name the driver gave it, from Storport health events 539, 542 and 543. |
| `win.eventlog.storage.health_flag_value` | int | Value of the flagged disk health value, from Storport health events 539, 542 and 543. |
| `win.eventlog.storage.percentage_used_pct` | int | Percent of its rated write endurance the NVMe drive says it has used, from Storport health events. Over 100 means the drive is past its rated life. |
| `win.eventlog.storage.endurance_threshold_pct` | int | Endurance percent the NVMe drive treats as its own warning point, from the same Storport health event. Compare the percent used with it. |
| `win.eventlog.storage.request_duration_ms` | int | How long the slow storage request took, in milliseconds, from `RequestDuration_ms` on Storport event 557. |
| `win.eventlog.storage.request_threshold_ms` | int | Threshold the storage driver reports slow requests against, in milliseconds, from `Threshold_ms` on Storport event 557 (30000 on the fleet). |
| `win.eventlog.storage.disk_guid` | string | Device GUID of the disk the slow request went to, from `ClassDeviceGuid` on Storport event 557. The same disk keeps the same GUID across restarts. |
| `win.eventlog.storage.product_id` | string | Product id the disk reports, from `ProductId` on Storport event 557, such as the drive model. |
| `win.eventlog.storage.serial_number` | string | Serial number the disk reports, from `SerialNumber` on Storport event 557. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
A key is listed with the module field of the same name; a key without one may still be queryable under another field in the table above.

| Tail key | Queryable as |
|---|---|
| `ioctl_control_code` | no field of the same name |
| `ioctl_name` | no field of the same name |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `disk_bad_block` / `device_data_error` | 148, 505, 506 | `win.eventlog.storage.additional_sense_code` `win.eventlog.storage.additional_sense_name` `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.cdb_bytes` `win.eventlog.storage.clusters_count` `win.eventlog.storage.device_number` `win.eventlog.storage.io_size_bytes` `win.eventlog.storage.io_type` `win.eventlog.storage.is_boot_volume` `win.eventlog.storage.retries_done` `win.eventlog.storage.sense_key` `win.eventlog.storage.sense_key_name` `win.eventlog.storage.srb_status` `win.eventlog.storage.srb_status_code` `win.eventlog.storage.srb_status_name` `win.eventlog.storage.starting_lcn` `win.eventlog.storage.volume_name` |  |
| `disk_bad_block` / `removable_verify` | 148 | `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.clusters_count` `win.eventlog.storage.io_size_bytes` `win.eventlog.storage.io_type` `win.eventlog.storage.is_boot_volume` `win.eventlog.storage.starting_lcn` `win.eventlog.storage.volume_name` |  |
| `disk_failure_predicted` / `default` | 539, 542, 543 | `win.eventlog.storage.endurance_threshold_pct` `win.eventlog.storage.health_flag_name` `win.eventlog.storage.health_flag_value` `win.eventlog.storage.percentage_used_pct` |  |
| `disk_io_failed` / `device_gone` | 500, 501, 505, 506 | `win.eventlog.storage.additional_sense_code` `win.eventlog.storage.additional_sense_name` `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.cdb_bytes` `win.eventlog.storage.device_number` `win.eventlog.storage.retries_done` `win.eventlog.storage.sense_key` `win.eventlog.storage.sense_key_name` `win.eventlog.storage.srb_status` `win.eventlog.storage.srb_status_code` `win.eventlog.storage.srb_status_name` |  |
| `disk_io_failed` / `transfer_failed` | 500, 501, 505, 506 | `win.eventlog.storage.cdb_bytes` |  |
| `disk_paging_error` / `device_gone` | 502, 503 | `win.eventlog.storage.device_number` `win.eventlog.storage.lba` `win.eventlog.storage.nv_cache_priority` `win.eventlog.storage.paging_priority` `win.eventlog.storage.transfer_bytes` |  |
| `disk_paging_error` / `paging_failed` | 502, 503 | `win.eventlog.storage.device_number` `win.eventlog.storage.lba` `win.eventlog.storage.nv_cache_priority` `win.eventlog.storage.paging_priority` `win.eventlog.storage.transfer_bytes` |  |
| `disk_surprise_removal` / `default` | 103, 551 | `win.eventlog.storage.device_state` `win.eventlog.storage.device_type` `win.eventlog.storage.lun` `win.eventlog.storage.miniport_name` `win.eventlog.storage.port_number` `win.eventlog.storage.removable` `win.eventlog.storage.surprise_removal_ok` |  |
| `filesystem_corruption` / `state_error` | 100 | `win.eventlog.storage.filesystem` `win.eventlog.storage.hc_stateid` |  |
| `filesystem_corruption` / `state_warning` | 100 | `win.eventlog.storage.filesystem` `win.eventlog.storage.hc_stateid` |  |
| `storage_controller_reset` / `default` | 500, 501, 550 | `win.eventlog.storage.boot_device` `win.eventlog.storage.bus_reset_reason` `win.eventlog.storage.bus_type` `win.eventlog.storage.bus_type_name` `win.eventlog.storage.cdb_bytes` `win.eventlog.storage.failed_io_count` `win.eventlog.storage.lun` `win.eventlog.storage.miniport_name` `win.eventlog.storage.path_id` `win.eventlog.storage.port_number` `win.eventlog.storage.reset_status` `win.eventlog.storage.reset_type` `win.eventlog.storage.srb_timeout_s` `win.eventlog.storage.target_id` |  |
| `storage_device_command_failed` / `command_failed` | 507 | `win.eventlog.storage.additional_sense_code` `win.eventlog.storage.additional_sense_code_qualifier` `win.eventlog.storage.cdb_bytes` `win.eventlog.storage.scsi_status` `win.eventlog.storage.sense_key` `win.eventlog.storage.srb_status` `win.eventlog.storage.srb_status_code` |  |
| `storage_device_command_failed` / `trim_rejected` | 507 | `win.eventlog.storage.additional_sense_code` `win.eventlog.storage.additional_sense_code_qualifier` `win.eventlog.storage.cdb_bytes` `win.eventlog.storage.scsi_status` `win.eventlog.storage.sense_key` `win.eventlog.storage.srb_status` `win.eventlog.storage.srb_status_code` |  |
| `storage_request_slow` / `default` | 557 | `win.eventlog.storage.boot_device` `win.eventlog.storage.disk_guid` `win.eventlog.storage.lun` `win.eventlog.storage.path_id` `win.eventlog.storage.port_number` `win.eventlog.storage.product_id` `win.eventlog.storage.request_duration_ms` `win.eventlog.storage.request_threshold_ms` `win.eventlog.storage.serial_number` `win.eventlog.storage.target_id` |  |
| `volume_mount_failed` / `device_offline` | 305 | `win.eventlog.storage.volume_guid` `win.eventlog.storage.volume_name` |  |
| `volume_mount_failed` / `mount_failed` | 305 | `win.eventlog.storage.volume_guid` `win.eventlog.storage.volume_name` |  |
| `storport_sample_repeat` | 548, 554 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `storport_sample_repeat`
