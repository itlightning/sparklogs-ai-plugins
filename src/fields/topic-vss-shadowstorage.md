<!-- GENERATED reference. Do not hand-edit. -->
# VSS shadow storage fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.vss_shadowstorage.display_name` | string |  | The volume's drive letter or mount path, for display. |
| `sparklogs.data.vss_shadowstorage.volume` | string |  | The volume's stable identity, the same identity `disk_volumes` and `volume_map` use. Falls back to the raw lowercased `vssadmin` string when the volume could not be resolved to that identity. |
| `sparklogs.data.vss_shadowstorage.volume_resolution` | string |  | Present as `unresolved` when this row's key is the raw `vssadmin` string rather than the shared volume identity, so a consumer never mistakes an unjoinable key for a joinable one. |
| `sparklogs.data.vss_shadowstorage.shadowstorage_used_pct` | float | percent | How much of the volume's shadow-storage allocation is used. |
| `sparklogs.data.vss_shadowstorage.shadowstorage_at_cap` | bool |  | Whether shadow-storage usage is at or above its maximum allocation. |
| `sparklogs.data.vss_shadowstorage.shadow_snapshots_deleted_delta` | integer | count | Restore points lost since the prior facts pass, when that could be derived. Normally absent: the underlying commands do not enumerate shadows, so this lights up only when a source happens to supply it. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_7d` | integer | count | How many snapshot failures this volume has recorded in the last 7 days. Zero when the count ran and found none, never absent. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_24h` | integer | count | How many snapshot failures this volume has recorded in the last 24 hours. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_7d_by_id` | object |  | The 7-day snapshot failure count broken out by the Windows Event Log id that recorded each failure. |
| `sparklogs.data.vss_shadowstorage.snap_fail_count_24h_by_id` | object |  | The 24-hour snapshot failure count broken out by the Windows Event Log id that recorded each failure. |
| `sparklogs.data.vss_shadowstorage.snap_fail_first_seen_ts` | string | timestamp | When the oldest snapshot failure counted in the current window was recorded. |
| `sparklogs.data.vss_shadowstorage.snap_fail_last_seen_ts` | string | timestamp | When the newest snapshot failure counted in the current window was recorded. |
| `sparklogs.data.vss_shadowstorage.snap_fail_truncated` | bool |  | Whether the snapshot failure count hit its cap: more failures happened than the counter kept individually. |
| `sparklogs.data.vss_shadowstorage.snap_fail_unresolved_count` | integer | count | How many snapshot failure records could not be attributed to a specific volume. |
| `sparklogs.data.vss_shadowstorage.snap_fail_measured_at` | string | timestamp | When this row's snapshot failure counts were measured. |
| `sparklogs.data.vss_shadowstorage.vss_shadowstorage_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.vss_shadowstorage.vss_shadowstorage_age_h` | float | hours | How long this condition has been open, in hours. |
