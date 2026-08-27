---
index: RAID / array degraded
---

# RAID or storage array degraded

**Trigger.** "Array reports degraded", or a controller alert reached the RMM.

**Accuracy.** Controller and disk-subsystem events are curated on System under `service = storage`.
Vendor array tools that never write a Windows channel are invisible here.
Any critical+ row in scope is fetch-first, whatever the ticket said.

**Queries.**

```
source = "<host>" AND service = storage
```

Group by `sparklogs.reason` (LQL), worst first.
Standing storage conditions: device health, and whether the device kept reporting through the window.

**Off-endpoint** (HM7): array management plane, out-of-band controller firmware, SAN fabric.
