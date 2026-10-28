---
index: Disk full or filling
---

# Disk full or filling fast

**Trigger.** A volume crosses 90% or fills; users hit "no space" errors.

**Accuracy.** State answers this category.
One reason per volume role: `os_volume_space_low` (value) or `data_volume_space_low` (value). Severity rises while the volume is still filling; `sparklogs.data.disk_volumes[](volume_filling=true)` (LQL) finds those volumes.
Two volumes on one host share a reason; `sparklogs.instance` (LQL) tells them apart.
Display `coalesce(sparklogs.display_name, sparklogs.instance)`.
Fleet totals: device-health grouped by reason (no `fieldset` (arg)); that is the exact condition count.

**Device health first.** The space-low and `volume_fill_rate_high` (value) conditions, then `latest_state` (value) on the `disk_volumes` (value) topic for free space, fill rate and projected time to full.
Who is writing: `device_overview` (value) over the filling interval.
Its `top_processes` (col) carry `io_write_mb` (col) per executable, and `storage` (value) carries write throughput per volume by bucket.
Process write bytes include writes that do not reach the disk: they rank writers without measuring what landed on the volume.
`events` (col) on the same reading show the changes that overlapped the start of the fill, such as a product install or a new network share.

**Events, for what health named.** Storage errors when the volume is filling because something is failing:

```
source = "<host>" AND service = storage
```

Group by `sparklogs.reason` (LQL).

**Off-endpoint** (HM5): mounted network shares, backup shadow locations, sync clients.
