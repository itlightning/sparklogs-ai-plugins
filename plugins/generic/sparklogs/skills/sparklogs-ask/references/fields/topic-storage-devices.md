<!-- GENERATED reference. Do not hand-edit. -->
# Storage devices fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.storage_devices.device` | string |  | The device's stable identity. |
| `sparklogs.data.storage_devices.display_name` | string |  | The device's friendly name, for display. |
| `sparklogs.data.storage_devices.disk_number` | integer |  | The Windows disk number: the N in `\\.\PhysicalDriveN` and `\Device\HarddiskN` that storage event log records name. Reassigned when devices come and go; never an identity. Absent when the device has none. |
| `sparklogs.data.storage_devices.presentation` | string |  | What the device presents as at this observation boundary, one of exactly seven classes: `local_physical`, `san_lun`, `guest_virtual`, `software_virtual`, `cloud_block`, `removable`, or `unknown`. Never an inferred ultimate implementation: an NVMe presentation can be remote durable block storage. |
| `sparklogs.data.storage_devices.native_kind` | string |  | The platform's own term for this device kind. |
| `sparklogs.data.storage_devices.transport` | string |  | The bus this device is attached over: `scsi`, `ata`, `fibre`, `usb`, `raid`, `iscsi`, `sas`, `sata`, `sd`, `mmc`, `virtual`, `file_backed_virtual` (a mounted VHD or VHDX), `spaces` (a Storage Spaces virtual disk) or `nvme`. Absent when the bus was not reported or is none of these. |
| `sparklogs.data.storage_devices.media` | string |  | The device's media: `ssd`, `hdd`, or `unknown`. |
| `sparklogs.data.storage_devices.removable` | bool |  | Whether the device reports removable media. |
| `sparklogs.data.storage_devices.vendor` | string |  | The device's reported vendor. |
| `sparklogs.data.storage_devices.model` | string |  | The device's reported model. |
| `sparklogs.data.storage_devices.identifiers` | object_array |  | Every recognized hardware identifier for this device (serials, WWNs, and the like), each scheme-tagged with `scheme`, `value`, `scope`, `source` and `stability`. Never an arbitrary provider string, a raw device path, or an unbounded blob. |
| `sparklogs.data.storage_devices.identifiers[].scheme` | string |  | In each `identifiers` entry. |
| `sparklogs.data.storage_devices.identifiers[].value` | string |  | In each `identifiers` entry. |
| `sparklogs.data.storage_devices.identifiers[].scope` | string |  | In each `identifiers` entry. |
| `sparklogs.data.storage_devices.identifiers[].source` | string |  | In each `identifiers` entry. |
| `sparklogs.data.storage_devices.identifiers[].stability` | string |  | In each `identifiers` entry. |
| `sparklogs.data.storage_devices.logical_bytes` | integer | bytes | The device's logical capacity. |
| `sparklogs.data.storage_devices.partition_table` | string |  | The disk's partition table scheme: `gpt`, `mbr`, or `raw` (never initialized, which Windows itself reports as an MBR layout with no signature and no entry in use). Absent when the layout was not read. |
| `sparklogs.data.storage_devices.usable_offset_bytes` | integer | bytes | Where partitions can start. GPT: the header's usable range. MBR: the start of the addressable range. Raw: 0. |
| `sparklogs.data.storage_devices.usable_length_bytes` | integer | bytes | How much of the disk partitions can occupy, capped for MBR at 2^32 sectors so a disk over 2 TiB shows its unusable tail. `logical_bytes` stays the disk total. |
| `sparklogs.data.storage_devices.offline` | bool |  | Whether the disk is administratively offline (no layout is read for an offline disk). |
| `sparklogs.data.storage_devices.read_only` | bool |  | Whether the disk is read-only. |
| `sparklogs.data.storage_devices.partitions` | object_array |  | The partition table, ordered by `offset_bytes` (an MBR extended container before its first logical partition). Each entry: `offset_bytes`, `length_bytes`, `type` (`efi_system`, `msr`, `basic_data`, `recovery`, `ldm_metadata`, `ldm_data`, `storage_spaces`, `extended`, `unknown`), `type_id` (GPT type GUID or MBR type byte as two hex digits), and when present `number` (absent on an MBR extended container), `partition_guid` (GPT), `name` (GPT), `attributes` (the raw GPT attribute bits or the MBR active flag: any of `required`, `no_drive_letter`, `hidden`, `shadow_copy`, `read_only`, `active`; an EFI or MSR partition carries `hidden` only when its bit is set, unlike Get-Partition's IsHidden, which follows the type) and `logical` (true inside an MBR extended container). Absent when the layout was not read; `[]` when read and empty. |
| `sparklogs.data.storage_devices.partitions[].number` | integer |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].offset_bytes` | integer | bytes | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].length_bytes` | integer | bytes | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].type` | string |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].type_id` | string |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].partition_guid` | string |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].name` | string |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].attributes` | string_array |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.partitions[].logical` | bool |  | In each `partitions` entry. |
| `sparklogs.data.storage_devices.observed_at` | string | timestamp | When this row's reading was taken. |
| `sparklogs.data.storage_devices.stale` | bool |  | Whether this row is a held reading from a probe that could not complete rather than a fresh one. |
