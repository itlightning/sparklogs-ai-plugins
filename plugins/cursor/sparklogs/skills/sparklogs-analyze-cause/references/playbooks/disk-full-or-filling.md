# Disk full or filling fast

**Trigger.** A volume crosses 90% or fills; users hit "no space" errors.

**Accuracy.** State answers this category.
One reason per volume role: `os_volume_space_low` or `data_volume_space_low`. Severity rises while the volume is still filling; `sparklogs.data.disk_volumes[](volume_filling=true)` (LQL) finds those volumes.
Two volumes on one host share a reason; `sparklogs.instance` (LQL) tells them apart.
Display `coalesce(sparklogs.display_name, sparklogs.instance)`.
Fleet totals: device-health grouped by reason (no `fieldset` (arg)); that is the exact condition count.

**Queries.**

Storage errors when the volume is filling because something is failing:

```
source = "<host>" AND service = storage
```

Group by `sparklogs.reason` (LQL).

**Off-endpoint** (HM5): mounted network shares, backup shadow locations, sync clients.
