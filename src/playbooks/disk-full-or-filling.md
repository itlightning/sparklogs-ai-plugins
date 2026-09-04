---
index: Disk full or filling
---

# Disk full or filling fast

**Trigger.** A volume crosses 90% or fills; users hit "no space" errors.

**Accuracy.** State answers this category.
Monitor reasons encode the *claim*: a projection-to-empty reason carries projection fields; a `near_cap` (other) reason is a level claim only.
Two volumes on one host share a reason; `sparklogs.instance` (LQL) tells them apart.
Display `coalesce(display_name, instance)`.
Fleet totals: device-health grouped by reason (no `fieldset` (arg)); that is the exact condition count.

**Queries.**

Storage errors when the volume is filling because something is failing:

```
source = "<host>" AND service = storage
```

Group by `sparklogs.reason` (LQL).

**Off-endpoint** (HM5): mounted network shares, backup shadow locations, sync clients.
