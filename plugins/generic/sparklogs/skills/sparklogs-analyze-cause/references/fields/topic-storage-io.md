<!-- GENERATED reference. Do not hand-edit. -->
# Storage IO fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.storage_io.volume` | string |  | The volume's GUID, the same key `disk_volumes` uses. |
| `sparklogs.data.storage_io.display_name` | string |  | The volume's drive letter. Absent when the volume has no drive letter. |
| `sparklogs.data.storage_io.volume_role` | string |  | What the volume is used for: `os` (the Windows volume), `fixed_data` (another fixed volume) or `removable`. Absent when the role is unknown. |
| `sparklogs.data.storage_io.volume_role_code` | integer |  | A numeric code for the volume's role. |
| `sparklogs.data.storage_io.busy_pct_avg` | float | percent | The average share of the 5-minute window the volume's storage was busy. |
| `sparklogs.data.storage_io.busy_pct_p90_10s` | float | percent | The 90th percentile of the volume's storage's busy share across the window's 10-second readings. |
| `sparklogs.data.storage_io.busy_pct_max_10s` | float | percent | The volume's storage's highest busy share in any 10-second reading in the window. |
| `sparklogs.data.storage_io.read_iops_avg` | float | iops | Average reads per second over the window. |
| `sparklogs.data.storage_io.read_iops_max_10s` | float | iops | The highest reads per second in any 10-second reading in the window. |
| `sparklogs.data.storage_io.write_iops_avg` | float | iops | Average writes per second over the window. |
| `sparklogs.data.storage_io.write_iops_max_10s` | float | iops | The highest writes per second in any 10-second reading in the window. |
| `sparklogs.data.storage_io.read_mb_per_s_avg` | float | megabytes_per_second | Average read throughput over the window. |
| `sparklogs.data.storage_io.read_mb_per_s_max_10s` | float | megabytes_per_second | The highest read throughput in any 10-second reading in the window. |
| `sparklogs.data.storage_io.write_mb_per_s_avg` | float | megabytes_per_second | Average write throughput over the window. |
| `sparklogs.data.storage_io.write_mb_per_s_max_10s` | float | megabytes_per_second | The highest write throughput in any 10-second reading in the window. |
| `sparklogs.data.storage_io.read_latency_ms_avg` | float | milliseconds | Average time a read took to complete over the window, weighted by the number of reads. |
| `sparklogs.data.storage_io.write_latency_ms_avg` | float | milliseconds | Average time a write took to complete over the window, weighted by the number of writes. |
| `sparklogs.data.storage_io.latency_ms_p90_10s` | float | milliseconds | The 90th percentile of the average I/O time across the window's 10-second readings. |
| `sparklogs.data.storage_io.latency_ms_max_10s` | float | milliseconds | The highest average I/O time in any 10-second reading in the window. |
| `sparklogs.data.storage_io.avg_read_kb` | float | kilobytes | The average size of a read over the window. |
| `sparklogs.data.storage_io.avg_write_kb` | float | kilobytes | The average size of a write over the window. |
| `sparklogs.data.storage_io.queue_depth_avg` | float |  | An estimate of how many I/O requests were in progress on average, worked out from the response times of completed requests. It counts only completed I/O, so a device with stuck requests can read 0. |
| `sparklogs.data.storage_io.queue_depth_max_10s` | float |  | The highest estimate of I/O requests in progress in any 10-second reading, worked out from completed requests only. |
| `sparklogs.data.storage_io.topology_segment_count` | integer | count | How many different disk layouts the window's readings saw, such as a disk added or removed during the window. More than two sets `topology_mixed` until every reading shows one layout again. |
| `sparklogs.data.storage_io.topology_mixed` | bool |  | Whether the disk layout changed too often during the window for its figures to be trusted. Absent when the layout held steady. |
