<!-- GENERATED reference. Do not hand-edit. -->
# Storage IO fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.storage_io.volume` | string |  | The volume's stable identity (its GUID), the same identity `disk_volumes` uses. |
| `sparklogs.data.storage_io.display_name` | string |  | The volume's drive letter or mount path, for display. |
| `sparklogs.data.storage_io.device_class` | string |  | The latency class of the volume's backing device: `hdd` or `flash`. Absent when the backing device is not fully resolved. |
| `sparklogs.data.storage_io.device_class_code` | float |  | `device_class` as the number the latency rules compare. |
| `sparklogs.data.storage_io.latency_warn_ms` | float | milliseconds | The latency bar, chosen by device class and host class, at or above which this volume's latency reads as degraded. |
| `sparklogs.data.storage_io.latency_error_ms` | float | milliseconds | The latency bar at or above which this volume's latency reads as severely degraded. |
| `sparklogs.data.storage_io.latency_recover_ms` | float | milliseconds | The latency this volume must fall back under before a latency episode is considered closed. |
| `sparklogs.data.storage_io.busy_pct_avg` | float | percent | The average share of the window this volume's backing store spent busy. |
| `sparklogs.data.storage_io.busy_pct_p90_10s` | float | percent | The 90th percentile, across the window's 10-second samples, of busy share. |
| `sparklogs.data.storage_io.busy_pct_max_10s` | float | percent | The highest 10-second busy share the window observed. |
| `sparklogs.data.storage_io.read_iops_avg` | float | iops | The average read rate over the window. |
| `sparklogs.data.storage_io.read_iops_max_10s` | float | iops | The highest 10-second read rate the window observed. |
| `sparklogs.data.storage_io.write_iops_avg` | float | iops | The average write rate over the window. |
| `sparklogs.data.storage_io.write_iops_max_10s` | float | iops | The highest 10-second write rate the window observed. |
| `sparklogs.data.storage_io.read_mb_per_s_avg` | float | megabytes_per_second | The average read throughput over the window, in 1024-based MB per second. |
| `sparklogs.data.storage_io.read_mb_per_s_max_10s` | float | megabytes_per_second | The highest 10-second read throughput the window observed, in 1024-based MB per second. |
| `sparklogs.data.storage_io.write_mb_per_s_avg` | float | megabytes_per_second | The average write throughput over the window, in 1024-based MB per second. |
| `sparklogs.data.storage_io.write_mb_per_s_max_10s` | float | megabytes_per_second | The highest 10-second write throughput the window observed, in 1024-based MB per second. |
| `sparklogs.data.storage_io.read_latency_ms_avg` | float | milliseconds | The count-weighted average read latency over the window. |
| `sparklogs.data.storage_io.write_latency_ms_avg` | float | milliseconds | The count-weighted average write latency over the window. |
| `sparklogs.data.storage_io.latency_ms_p90_10s` | float | milliseconds | The 90th percentile, across the window's 10-second mean-latency samples, of latency. Chosen over a per-IO percentile because the tail matters and a median converges on the mean. |
| `sparklogs.data.storage_io.latency_ms_max_10s` | float | milliseconds | The highest 10-second mean latency the window observed. |
| `sparklogs.data.storage_io.avg_read_kb` | float | kilobytes | The average size of a read over the window. |
| `sparklogs.data.storage_io.avg_write_kb` | float | kilobytes | The average size of a write over the window. |
| `sparklogs.data.storage_io.queue_depth_avg` | float |  | The average outstanding IO queue depth over the window. |
| `sparklogs.data.storage_io.queue_depth_max_10s` | float |  | The highest 10-second queue depth the window observed. |
| `sparklogs.data.storage_io.topology_segment_count` | integer | count | How many distinct topology signatures the window's samples held. More than two in one window marks `topology_mixed` and holds until every sample shares one topology again. |
| `sparklogs.data.storage_io.topology_mixed` | bool |  | Whether the topology changed too many times within one window to trust a single reduction. Absent when the topology held steady. |
| `sparklogs.data.storage_io.disk_latency_degraded_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.storage_io.disk_latency_degraded_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.storage_io.disk_saturated_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.storage_io.disk_saturated_age_h` | float | hours | How long this condition has been open, in hours. |
