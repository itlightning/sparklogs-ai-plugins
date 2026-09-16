<!-- GENERATED reference. Do not hand-edit. -->
# Volume map fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.volume_map.volume` | string |  | The volume's stable identity, the same identity `disk_volumes` uses. |
| `sparklogs.data.volume_map.display_name` | string |  | The volume's drive letter or mount path, for display. |
| `sparklogs.data.volume_map.aliases` | string_array |  | Other names this volume is known by. |
| `sparklogs.data.volume_map.primary_mount` | string |  | The drive letter if the volume has one, else its first mount path. Absent when the volume is unmounted. |
| `sparklogs.data.volume_map.mounts` | string_array |  | Every path this volume is mounted at. Empty is a valid state: zero mounts is not an error. |
| `sparklogs.data.volume_map.filesystem_type` | string |  | The volume's filesystem type. |
| `sparklogs.data.volume_map.filesystem_label` | string |  | The volume's filesystem label. |
| `sparklogs.data.volume_map.drive_type` | string |  | What kind of drive this volume sits on. Carried for every volume, monitored or not: it is the fact that explains why an optical or network volume has no space or IO measurements anywhere else. |
| `sparklogs.data.volume_map.backing_device_ids` | string_array |  | The terminal storage devices visible at this observation boundary that back this volume, deduplicated. Never a claim about ultimate physical media. |
| `sparklogs.data.volume_map.backing_resolution` | string |  | How completely the backing devices could be resolved: `complete`, `partial`, `unavailable`, or `not_applicable`. |
| `sparklogs.data.volume_map.logical_bytes` | integer | bytes | The filesystem's logical size, duplicated from the same observation `disk_volumes` reads. Informational only. |
| `sparklogs.data.volume_map.available_bytes` | integer | bytes | The filesystem's available space, duplicated from the same observation `disk_volumes` reads. Informational only. |
| `sparklogs.data.volume_map.observed_at` | string | timestamp | When this row's reading was taken. |
| `sparklogs.data.volume_map.stale` | bool |  | Whether this row is a held reading from a probe that could not complete rather than a fresh one. |
