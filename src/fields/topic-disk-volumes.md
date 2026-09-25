<!-- GENERATED reference. Do not hand-edit. -->
# Disk volumes fields

Full inventory every 15 minutes. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.disk_volumes.volume` | string |  | The volume's stable identity (its GUID), lowercased. Episode continuity keys off this, never the drive letter. |
| `sparklogs.data.disk_volumes.display_name` | string |  | The drive letter, when the volume has one; otherwise its primary mount path. |
| `sparklogs.data.disk_volumes.volume_label` | string |  | The volume's OS-assigned name. |
| `sparklogs.data.disk_volumes.aliases` | string_array |  | Other names this volume is known by, such as its label: excludes its opaque id and its current `display_name`. |
| `sparklogs.data.disk_volumes.drive_type` | string |  | What kind of drive this volume sits on, from `GetDriveTypeW`. |
| `sparklogs.data.disk_volumes.volume_role` | string |  | `os`: Windows volume. `fixed_data`: other fixed data volume. `removable`: removable volume. Absent when unknown, which prevents conditions requiring a known role from firing. |
| `sparklogs.data.disk_volumes.volume_role_code` | integer |  | Numeric code for `volume_role`. |
| `sparklogs.data.disk_volumes.free_bytes` | integer | bytes | How many bytes are free on the volume. |
| `sparklogs.data.disk_volumes.free_pct` | float | percent | Free space as a percentage of the volume's total. |
| `sparklogs.data.disk_volumes.used_pct` | float | percent | Space used as a percentage of the volume's total (100 minus `free_pct`), carried on the row because the exhaustion floors are written against the used share. |
| `sparklogs.data.disk_volumes.writeable` | bool |  | Whether the filesystem reports that writes are allowed. Absent when the filesystem did not answer. |
| `sparklogs.data.disk_volumes.mount_state` | string |  | Whether the volume is `mounted`, `unmounted`, `raw`, or `unreadable`. |
| `sparklogs.data.disk_volumes.mount_state_code` | integer |  | Numeric code for `mount_state`. |
| `sparklogs.data.disk_volumes.filesystem` | string |  | The volume's filesystem, lowercased. |
| `sparklogs.data.disk_volumes.bitlocker_protection` | string |  | The volume's BitLocker posture: `on`, `off`, `suspended`, or `n_a` when BitLocker is not in use on this volume. Absent when the provider could not answer. |
| `sparklogs.data.disk_volumes.bitlocker_dropped` | bool |  | Whether BitLocker protection is off or suspended. Absent when protection status could not be read. |
| `sparklogs.data.disk_volumes.bitlocker_off_age_min` | float | minutes | How long BitLocker protection has been off or suspended. |
| `sparklogs.data.disk_volumes.fill_rate_bytes_per_h` | float | bytes_per_hour | How fast the volume's free space is shrinking: the sustained p25 of five-minute free-space intervals over the last hour, gated on the last ~10 min still filling. Absent until that hour exists. |
| `sparklogs.data.disk_volumes.fill_slope_sustained_h` | float | hours | How long the current fill trend has held. |
| `sparklogs.data.disk_volumes.projected_full_eta_h` | float | hours | The raw projected time until the volume fills, from the fill rate alone. |
| `sparklogs.data.disk_volumes.exhaustion_eta_h` | float | hours | Projected hours until the volume fills. Zero when it has already reached its capacity ceiling, even if the fill rate has stalled. |
| `sparklogs.data.disk_volumes.backing_bus_permanent` | bool |  | Whether every transport behind this volume is a permanent one (not USB). Absent while the backing transports are unknown. |
| `sparklogs.data.disk_volumes.resource` | object |  | What is measured (`volume_space`), its unit, and where it stands: `used` and `capacity` in bytes. |
| `sparklogs.data.disk_volumes.projection` | object |  | The forecast derived from `resource` and a lookback window: the signed change in used bytes over the window, the window's length, and the horizon that decided the reading's severity. |
| `sparklogs.data.disk_volumes.departure_notice_eligible` | bool |  | Whether this volume's clean departure would be worth reporting: its role is known, its presence baseline is complete, and its backing bus is permanent, gated by whether departure notices are enabled on this host. |
| `sparklogs.data.disk_volumes.seen_count` | integer | count | How many of the observations counted toward this volume's presence baseline actually saw it. |
| `sparklogs.data.disk_volumes.observed_count` | integer | count | How many observations have counted toward this volume's presence baseline. |
| `sparklogs.data.disk_volumes.presence_ratio_pct` | float | percent | `seen_count` over `observed_count`, as a percentage: the ratio the presence baseline is judged on. |
| `sparklogs.data.disk_volumes.presence_tracked_d` | float | days | How long this volume has been tracked for its presence baseline. |
| `sparklogs.data.disk_volumes.observed_at` | string | timestamp | When this row's reading was taken. |
| `sparklogs.data.disk_volumes.stale` | bool |  | True when a failed probe left a previous reading in place. Changes between stale and fresh readings produce a delta. |
| `sparklogs.data.disk_volumes.volume_space_low_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.disk_volumes.volume_space_low_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.disk_volumes.volume_unreadable_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.disk_volumes.volume_unreadable_age_h` | float | hours | How long this condition has been open, in hours. |
