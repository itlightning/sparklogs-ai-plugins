<!-- GENERATED reference. Do not hand-edit. -->
# Disk volumes fields

Full inventory every 15 minutes. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.disk_volumes.volume` | string |  | The volume's GUID, lowercased. It stays the same when the drive letter changes, so it is the key to follow a volume by. |
| `sparklogs.data.disk_volumes.display_name` | string |  | The volume's drive letter. Absent when the volume has no drive letter. |
| `sparklogs.data.disk_volumes.volume_label` | string |  | The volume's label, as File Explorer shows it. |
| `sparklogs.data.disk_volumes.aliases` | string_array |  | Other names the volume is known by, such as its label, besides its drive letter or mount path and its GUID. |
| `sparklogs.data.disk_volumes.drive_type` | string |  | The kind of drive Windows reports for the volume, such as `fixed` or `removable`. |
| `sparklogs.data.disk_volumes.volume_role` | string |  | What the volume is used for: `os` (the Windows volume), `fixed_data` (another fixed volume) or `removable`. Absent when unknown; conditions that need a known role do not open then. |
| `sparklogs.data.disk_volumes.volume_role_code` | integer |  | A numeric code for the volume's role. |
| `sparklogs.data.disk_volumes.free_bytes` | integer | bytes | Free space on the volume. |
| `sparklogs.data.disk_volumes.free_pct` | float | percent | Free space as a percentage of the volume's size. |
| `sparklogs.data.disk_volumes.used_pct` | float | percent | Used space as a percentage of the volume's size. |
| `sparklogs.data.disk_volumes.total_bytes` | integer | bytes | The volume's size. |
| `sparklogs.data.disk_volumes.writeable` | bool |  | Whether the file system allows writes. Absent when the file system did not answer. |
| `sparklogs.data.disk_volumes.mount_state` | string |  | Whether the volume is `mounted`, `unmounted`, `raw` (no recognized file system) or `unreadable`. Absent when the file system did not answer this reading. |
| `sparklogs.data.disk_volumes.mount_state_code` | integer |  | A numeric code for the volume's mount state. |
| `sparklogs.data.disk_volumes.filesystem` | string |  | The volume's file system, lowercased, such as `ntfs`. Absent when the file system did not answer this reading. |
| `sparklogs.data.disk_volumes.bitlocker_protection` | string |  | The volume's BitLocker protection: `on`, `off`, `suspended`, or `n_a` when BitLocker does not apply to the volume. Absent when BitLocker status could not be read. |
| `sparklogs.data.disk_volumes.bitlocker_encryption_method` | string |  | The algorithm BitLocker encrypts the volume with: `xts_aes_128` (the Windows default), `xts_aes_256`, `aes_128`, `aes_256`, `aes_128_diffuser`, `aes_256_diffuser`, `hardware` (the drive's own encryption), or `none` when the volume is not encrypted; a code Windows adds later is reported as its number. Absent when BitLocker status could not be read or the volume is not encryptable. |
| `sparklogs.data.disk_volumes.bitlocker_dropped` | bool |  | Whether BitLocker protection is off or suspended. Absent when BitLocker status could not be read. |
| `sparklogs.data.disk_volumes.bitlocker_off_age_min` | float | minutes | How long BitLocker protection has been off or suspended. Time asleep counts, since a sleeping device without protection is exposed all the same. |
| `sparklogs.data.disk_volumes.bitlocker_was_protected` | bool |  | Whether the agent has seen BitLocker protection on for this volume since it began watching it. A volume never seen protected raises no dropped-protection condition. |
| `sparklogs.data.disk_volumes.fill_rate_bytes_per_h` | float | bytes_per_hour | How fast the volume's free space is shrinking, from its steady rate over the last hour. Absent until the agent has an hour of readings, and when the volume is not steadily filling or has stopped filling in the last several minutes. |
| `sparklogs.data.disk_volumes.fill_slope_sustained_h` | float | hours | How long the volume has been steadily filling. Absent when it is not. |
| `sparklogs.data.disk_volumes.projected_full_eta_h` | float | hours | How long until the volume is full at its current fill rate. Absent when it is not steadily filling. |
| `sparklogs.data.disk_volumes.volume_filling` | bool |  | Whether the volume is filling fast enough to matter: for a sustained stretch, every reading projected it full soon (with a longer horizon on a server) and free space dropped by a meaningful amount. Stays true for several hours after the last such reading. Only time the machine was awake and the agent watching counts. Absent when free space was not read. |
| `sparklogs.data.disk_volumes.backing_bus_permanent` | bool |  | Whether every disk behind the volume is connected by a permanent bus, not USB. Absent while the disks behind it are unknown. |
| `sparklogs.data.disk_volumes.resource` | object |  | What is measured (`volume_space`), its unit, and where it stands: `used` and `capacity` in bytes. |
| `sparklogs.data.disk_volumes.projection` | object |  | The fill forecast: how much used space changed over the recent lookback, how long that lookback was, and the horizon the volume is judged against for filling. |
| `sparklogs.data.disk_volumes.departure_notice_eligible` | bool |  | Whether SparkLogs would report it if this volume went away: its role is known, the agent has seen it reliably for long enough, it is not on USB, and volume departure notices are on for this machine. |
| `sparklogs.data.disk_volumes.seen_count` | integer | count | How many of the agent's checks while learning this volume's presence found it. |
| `sparklogs.data.disk_volumes.observed_count` | integer | count | How many checks the agent has made while learning this volume's presence. |
| `sparklogs.data.disk_volumes.presence_ratio_pct` | float | percent | The share of the agent's checks that found this volume, as a percentage. A volume must be seen often enough before its departure is reported. |
| `sparklogs.data.disk_volumes.presence_tracked_d` | float | days | How long the agent has been tracking this volume's presence. |
| `sparklogs.data.disk_volumes.observed_at` | string | timestamp | When this row's reading was taken. |
| `sparklogs.data.disk_volumes.stale` | bool |  | True when the latest reading of the volume failed and the row repeats the previous reading. A change between a repeated and a fresh reading raises a change event. |
| `sparklogs.data.disk_volumes.volume_space_low_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.disk_volumes.volume_space_low_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.disk_volumes.volume_unreadable_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.disk_volumes.volume_unreadable_age_h` | float | hours | How long this condition has been open, in hours. |
