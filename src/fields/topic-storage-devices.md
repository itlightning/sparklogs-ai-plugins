<!-- GENERATED reference. Do not hand-edit. -->
# Storage devices fields

Full inventory every hour; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.storage_devices.device` | string |  | The device's stable identity. |
| `sparklogs.data.storage_devices.display_name` | string |  | The device's friendly name, for display. |
| `sparklogs.data.storage_devices.presentation` | string |  | What the device presents as at this observation boundary, one of exactly seven classes: `local_physical`, `san_lun`, `guest_virtual`, `software_virtual`, `cloud_block`, `removable`, or `unknown`. Never an inferred ultimate implementation: an NVMe presentation can be remote durable block storage. |
| `sparklogs.data.storage_devices.native_kind` | string |  | The platform's own term for this device kind. |
| `sparklogs.data.storage_devices.transport` | string |  | The bus this device is attached over. |
| `sparklogs.data.storage_devices.media` | string |  | The device's media: `ssd`, `hdd`, or `unknown`. |
| `sparklogs.data.storage_devices.removable` | bool |  | Whether the device reports removable media. |
| `sparklogs.data.storage_devices.vendor` | string |  | The device's reported vendor. |
| `sparklogs.data.storage_devices.model` | string |  | The device's reported model. |
| `sparklogs.data.storage_devices.identifiers` | object_array |  | Every recognized hardware identifier for this device (serials, WWNs, and the like), each scheme-tagged with `scheme`, `value`, `scope`, `source` and `stability`. Never an arbitrary provider string, a raw device path, or an unbounded blob. |
| `sparklogs.data.storage_devices.logical_bytes` | integer | bytes | The device's logical capacity. |
| `sparklogs.data.storage_devices.observed_at` | string | timestamp | When this row's reading was taken. |
| `sparklogs.data.storage_devices.stale` | bool |  | Whether this row is a held reading from a probe that could not complete rather than a fresh one. |
