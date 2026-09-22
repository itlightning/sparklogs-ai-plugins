<!-- GENERATED reference. Do not hand-edit. -->
# Disk volumes fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.disk_volumes.volume` | string |  | The volume's stable identity (its GUID), lowercased. Episode continuity keys off this, never the drive letter. |
| `sparklogs.data.disk_volumes.display_name` | string |  | The drive letter, when the volume has one; otherwise its primary mount path. |
| `sparklogs.data.disk_volumes.volume_label` | string |  | The volume's OS-assigned name. |
| `sparklogs.data.disk_volumes.aliases` | string_array |  | Other names this volume is known by, such as its label: excludes its opaque id and its current `display_name`. |
| `sparklogs.data.disk_volumes.drive_type` | string |  | What kind of drive this volume sits on, from `GetDriveTypeW`. |
| `sparklogs.data.disk_volumes.volume_role` | string |  | What this volume is FOR: `os` for the volume Windows runs from, `fixed_data` for a plain fixed data volume, `removable` for a removable one. Absent when the role could not be determined, which withholds every role-gated claim on the row (fail closed). |
| `sparklogs.data.disk_volumes.volume_role_code` | integer |  | `volume_role` as the numeric code its ladders read. |
| `sparklogs.data.disk_volumes.free_bytes` | integer | bytes | How many bytes are free on the volume. |
| `sparklogs.data.disk_volumes.free_pct` | float | percent | Free space as a percentage of the volume's total. |
| `sparklogs.data.disk_volumes.used_pct` | float | percent | Space used as a percentage of the volume's total (100 minus `free_pct`), carried on the row because the exhaustion floors are written against the used share. |
| `sparklogs.data.disk_volumes.writeable` | bool |  | Whether the filesystem answered that it is writeable. Absent, never `false`, when the filesystem did not answer. |
| `sparklogs.data.disk_volumes.mount_state` | string |  | Whether the volume is `mounted`, `unmounted`, `raw`, or `unreadable`. |
| `sparklogs.data.disk_volumes.mount_state_code` | integer |  | `mount_state` as the numeric code its ladders read. |
| `sparklogs.data.disk_volumes.filesystem` | string |  | The volume's filesystem, lowercased. |
| `sparklogs.data.disk_volumes.bitlocker_protection` | string |  | The volume's BitLocker posture: `on`, `off`, `suspended`, or `n_a` when BitLocker is not in use on this volume. Absent when the provider could not answer. |
| `sparklogs.data.disk_volumes.bitlocker_dropped` | bool |  | Whether BitLocker protection is off or suspended. Absent, never `false`, when the provider did not answer: a volume whose protection could not be read has not been shown to be unprotected. |
| `sparklogs.data.disk_volumes.bitlocker_off_age_min` | float | minutes | How long BitLocker protection has been off or suspended. |
| `sparklogs.data.disk_volumes.fill_rate_bytes_per_h` | float | bytes_per_hour | How fast the volume's free space is shrinking: the sustained p25 of five-minute free-space intervals over the last hour, gated on the last ~10 min still filling. Absent until that hour exists. |
| `sparklogs.data.disk_volumes.fill_slope_sustained_h` | float | hours | How long the current fill trend has held. |
| `sparklogs.data.disk_volumes.projected_full_eta_h` | float | hours | The raw projected time until the volume fills, from the fill rate alone. |
| `sparklogs.data.disk_volumes.exhaustion_eta_h` | float | hours | The projected time until the volume fills, after the ceiling guard: a volume already at its ceiling reads zero time remaining rather than the infinite time a stalled fill rate would otherwise project. This is the figure the exhaustion conditions grade. |
| `sparklogs.data.disk_volumes.backing_bus_permanent` | bool |  | Whether every transport behind this volume is a permanent one (not USB). Absent while the backing transports are unknown. |
| `sparklogs.data.disk_volumes.resource` | object |  | What is measured (`volume_space`), its unit, and where it stands: `used` and `capacity` in bytes. |
| `sparklogs.data.disk_volumes.projection` | object |  | The forecast derived from `resource` and a lookback window: the signed change in used bytes over the window, the window's length, and the horizon that decided the reading's severity. |
| `sparklogs.data.disk_volumes.departure_notice_eligible` | bool |  | Whether this volume's clean departure would be worth reporting: its role is known, its presence baseline is complete, and its backing bus is permanent, gated by whether departure notices are enabled on this host. |
| `sparklogs.data.disk_volumes.seen_count` | integer | count | How many of the observations counted toward this volume's presence baseline actually saw it. |
| `sparklogs.data.disk_volumes.observed_count` | integer | count | How many observations have counted toward this volume's presence baseline. |
| `sparklogs.data.disk_volumes.presence_ratio_pct` | float | percent | `seen_count` over `observed_count`, as a percentage: the ratio the presence baseline is judged on. |
| `sparklogs.data.disk_volumes.presence_tracked_d` | float | days | How long this volume has been tracked for its presence baseline. |
| `sparklogs.data.disk_volumes.observed_at` | string | timestamp | When this row's reading was taken. |
| `sparklogs.data.disk_volumes.stale` | bool |  | Whether this row is a held reading from a probe that could not complete rather than a fresh one. Diffed: a row going stale, or fresh again, is an honesty change a consumer must see. |
| `sparklogs.data.disk_volumes.vol_space_low_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.disk_volumes.vol_space_low_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.disk_volumes.vol_unreadable_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.disk_volumes.vol_unreadable_age_h` | float | hours | How long this condition has been open, in hours. |
