<!-- GENERATED reference. Do not hand-edit. -->
# Storage device IO fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.storage_device_io.device` | string |  | The device's identity, the same key `storage_devices` uses. |
| `sparklogs.data.storage_device_io.display_name` | string |  | The device's name, as Device Manager shows it. |
| `sparklogs.data.storage_device_io.transport` | string |  | The bus the device is attached over, such as `nvme`, `sata`, `usb`, `iscsi`, `virtual`, `spaces` (a Storage Spaces disk) or `file_backed_virtual` (a mounted VHD). When adding I/O across devices, leave out `file_backed_virtual` rows: a mounted VHD's I/O is also counted on the disk that holds its file. Keep `spaces` rows: the pool's member disks have no rows of their own. |
| `sparklogs.data.storage_device_io.media` | string |  | The device's media: `hdd` or `ssd`. Absent when not read. |
| `sparklogs.data.storage_device_io.presentation` | string |  | What the device presents as: `local_physical`, `san_lun`, `guest_virtual` (a virtual disk a hypervisor gives this virtual machine), `software_virtual` (Storage Spaces or a mounted VHD), `cloud_block`, `removable` or `unknown`. |
| `sparklogs.data.storage_device_io.io_completed_count_5m` | float |  | How many I/O requests the device completed in the 5-minute window. |
| `sparklogs.data.storage_device_io.media_code` | integer |  | A numeric code for the device's media, used to pick disk latency thresholds: 0 unknown, 1 HDD, 2 SSD. |
| `sparklogs.data.storage_device_io.volumes` | string_array |  | The mounted volumes stored on this device. |
| `sparklogs.data.storage_device_io.total_iops_avg` | float | iops | Average reads and writes per second, together, over the window. |
| `sparklogs.data.storage_device_io.total_mb_per_s_avg` | float | megabytes_per_second | Average read and write throughput, together, over the window. |
| `sparklogs.data.storage_device_io.bus_permanent` | bool |  | Whether the device is connected by a permanent bus, not USB. |
| `sparklogs.data.storage_device_io.carries_writeable_volume` | bool |  | Whether the device holds at least one mounted volume that allows writes. |
| `sparklogs.data.storage_device_io.carries_os_volume` | bool |  | Whether the device holds the Windows volume. False when it does not, and when the Windows volume could not be identified. |
| `sparklogs.data.storage_device_io.busy_pct_avg` | float | percent | The average share of the 5-minute window the device was busy. |
| `sparklogs.data.storage_device_io.busy_pct_p90_10s` | float | percent | The 90th percentile of the device's busy share across the window's 10-second readings. |
| `sparklogs.data.storage_device_io.busy_pct_max_10s` | float | percent | The device's highest busy share in any 10-second reading in the window. |
| `sparklogs.data.storage_device_io.read_iops_avg` | float | iops | Average reads per second over the window. |
| `sparklogs.data.storage_device_io.read_iops_max_10s` | float | iops | The highest reads per second in any 10-second reading in the window. |
| `sparklogs.data.storage_device_io.write_iops_avg` | float | iops | Average writes per second over the window. |
| `sparklogs.data.storage_device_io.write_iops_max_10s` | float | iops | The highest writes per second in any 10-second reading in the window. |
| `sparklogs.data.storage_device_io.read_mb_per_s_avg` | float | megabytes_per_second | Average read throughput over the window. |
| `sparklogs.data.storage_device_io.read_mb_per_s_max_10s` | float | megabytes_per_second | The highest read throughput in any 10-second reading in the window. |
| `sparklogs.data.storage_device_io.write_mb_per_s_avg` | float | megabytes_per_second | Average write throughput over the window. |
| `sparklogs.data.storage_device_io.write_mb_per_s_max_10s` | float | megabytes_per_second | The highest write throughput in any 10-second reading in the window. |
| `sparklogs.data.storage_device_io.read_latency_ms_avg` | float | milliseconds | Average time a read took to complete over the window, weighted by the number of reads. |
| `sparklogs.data.storage_device_io.write_latency_ms_avg` | float | milliseconds | Average time a write took to complete over the window, weighted by the number of writes. |
| `sparklogs.data.storage_device_io.latency_ms_p90_10s` | float | milliseconds | The 90th percentile of the average I/O time across the window's 10-second readings. |
| `sparklogs.data.storage_device_io.latency_ms_max_10s` | float | milliseconds | The highest average I/O time in any 10-second reading in the window. |
| `sparklogs.data.storage_device_io.avg_read_kb` | float | kilobytes | The average size of a read over the window. |
| `sparklogs.data.storage_device_io.avg_write_kb` | float | kilobytes | The average size of a write over the window. |
| `sparklogs.data.storage_device_io.queue_depth_avg` | float |  | An estimate of how many I/O requests were in progress on average, worked out from the response times of completed requests. It counts only completed I/O, so a device with stuck requests can read 0. |
| `sparklogs.data.storage_device_io.queue_depth_max_10s` | float |  | The highest estimate of I/O requests in progress in any 10-second reading, worked out from completed requests only. |
| `sparklogs.data.storage_device_io.io_pct_time_stuck` | float | percent | The share of the window's 10-second readings in which the device was at least 99% busy, completed no I/O, and had I/O waiting at the start and end of the reading. |
| `sparklogs.data.storage_device_io.io_slow_10s_count_5m` | integer |  | How many 10-second readings in the window had reads or writes taking at least 1 second on average, while 16 or fewer requests were waiting in that direction (a lightly loaded device that is slow anyway). |
| `sparklogs.data.storage_device_io.io_stall_10s_count_5m` | integer |  | How many 10-second readings in the window had reads or writes taking at least 2 seconds on average, while 16 or fewer requests were waiting in that direction. |
| `sparklogs.data.storage_device_io.io_slow_window_count_1h` | integer |  | How many of the last twelve 5-minute stretches (about an hour) the agent judged slow for this device. Only stretches the agent fully watched count; sleep and gaps do not. |
| `sparklogs.data.storage_device_io.topology_segment_count` | integer | count | How many different disk layouts the window's readings saw, such as a disk added or removed during the window. More than two sets `topology_mixed` until every reading shows one layout again. |
| `sparklogs.data.storage_device_io.topology_mixed` | bool |  | Whether the disk layout changed too often during the window for its figures to be trusted. Absent when the layout held steady. |
| `sparklogs.data.storage_device_io.disk_latency_degraded_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.storage_device_io.disk_latency_degraded_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.storage_device_io.disk_saturated_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.storage_device_io.disk_saturated_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.storage_device_io.disk_unresponsive_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.storage_device_io.disk_unresponsive_age_h` | float | hours | How long this condition has been open, in hours. |
