---
index: RAID / array degraded
---

# RAID or storage array degraded

**Trigger.** "Array reports degraded", or a controller alert reached the RMM.

**Accuracy.** Controller and disk-subsystem events are curated on System under `service = storage`.
Vendor array tools that never write a Windows channel are invisible here.
Any critical+ row in scope is fetch-first, whatever the ticket said.
A degraded array often keeps serving I/O at higher latency, so disk heat can show the impact before or without a controller event.

**Device health first.** `device_overview` (value) from before the alert through now.
Disk `heat_spans` (col) with their `driver` (col) (latency, busy time or queue depth) and the `storage` (value) result set per disk show when I/O slowed and on which disk.
`events` (col) carry `disk_latency_degraded` (value), `disk_unresponsive` (value), `disk_read_only_changed` (value) and `disk_taken_offline` (value) episodes and changes.
Header coverage says whether the device kept reporting through the window.

**Events, for what health named.**

```
source = "<host>" AND service = storage
```

Group by `sparklogs.reason` (LQL), worst first, over the interval the disk heat or episodes named.

**Off-endpoint** (HM7): array management plane, out-of-band controller firmware, SAN fabric.
