<!-- GENERATED reference. Do not hand-edit. -->
# VSS shadow storage fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.vss_shadowstorage.display_name` | string |  | The volume's drive letter. Absent when the volume has no drive letter. |
| `sparklogs.data.vss_shadowstorage.volume` | string |  | The volume's identity, the same key `disk_volumes` and `volume_map` use. When the agent cannot match the volume, the lowercased name `vssadmin` gave it instead. |
| `sparklogs.data.vss_shadowstorage.volume_resolution` | string |  | `unresolved` when the agent could not match the volume, so its key is the name `vssadmin` gave and does not join with other volume topics. Absent otherwise. |
| `sparklogs.data.vss_shadowstorage.shadowstorage_used_pct` | float | percent | How much of the volume's shadow copy storage limit is in use. Can exceed 100 when the limit is lowered below the space already used. |
| `sparklogs.data.vss_shadowstorage.shadowstorage_at_cap` | bool |  | Whether shadow copy storage use is at or above its limit. Windows deletes the oldest shadow copies to make room. |
| `sparklogs.data.vss_shadowstorage.shadow_snapshots_deleted_delta` | integer | count | Shadow copies deleted since the previous reading. Usually absent: `vssadmin` does not list each shadow copy here, so the agent reports it only when it can work it out. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_7d` | integer | count | How many shadow copy failures Windows logged for this volume in the last 7 days, from System log events 25, 35 and 36 (source volsnap). Absent until the agent has first scanned the log after it starts, or while the scan is out of date; 0 when it scanned and found none. Counts `vss_shadow_aborted` and `vss_snapshots_failing_for_space` records; the latest is `sparklogs.data.vss_shadowstorage.snap_fail_last_seen_ts`. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_24h` | integer | count | How many shadow copy failures Windows logged for this volume in the last 24 hours, from System log events 25, 35 and 36 (source volsnap). Absent until the agent has first scanned the log after it starts, or while the scan is out of date; 0 when it scanned and found none. Counts `vss_shadow_aborted` and `vss_snapshots_failing_for_space` records; the latest is `sparklogs.data.vss_shadowstorage.snap_fail_last_seen_ts`. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_7d_by_id` | object |  | The volume's shadow copy failures over the last 7 days, split by the event ID that recorded each one. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_24h_by_id` | object |  | The volume's shadow copy failures over the last 24 hours, split by the event ID that recorded each one. |
| `sparklogs.data.vss_shadowstorage.snap_fail_first_seen_ts` | string | timestamp | When the oldest shadow copy failure in the last 7 days was recorded. |
| `sparklogs.data.vss_shadowstorage.snap_fail_last_seen_ts` | string | timestamp | When the newest shadow copy failure in the last 7 days was recorded. |
| `sparklogs.data.vss_shadowstorage.snap_fail_truncated` | bool |  | Whether the failure scan stopped at its read limit. When true, the failure counts on this machine are lower bounds. |
| `sparklogs.data.vss_shadowstorage.snap_fail_unresolved_count` | integer | count | Shadow copy failure events on this machine that name no volume this topic lists, so no volume row carries them. |
| `sparklogs.data.vss_shadowstorage.snap_fail_measured_at` | string | timestamp | When the agent last scanned the event log for shadow copy failures. |
| `sparklogs.data.vss_shadowstorage.vss_shadowstorage_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.vss_shadowstorage.vss_shadowstorage_age_h` | float | hours | How long this condition has been open, in hours. |
