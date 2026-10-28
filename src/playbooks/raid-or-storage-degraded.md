---
index: RAID / array degraded
---

# RAID or storage array degraded

**Trigger.** "Array reports degraded", or a controller alert reached the RMM.

**Accuracy.** Controller and disk-subsystem events are curated on System under `service = storage`.
Vendor array tools that never write a Windows channel are invisible here.
Any critical+ row in scope is fetch-first, whatever the ticket said.
A degraded array often keeps serving I/O at higher latency. Disk heat grades busy time and queue depth, not latency, so high latency at moderate load can show no disk heat.

**Device health first.** `device_overview` (value) from before the alert through now.
`disk_latency_ms` (col) in `domains` (col), and `latency_ms_p90_10s` (col) per disk in the `storage` (value) result set, show when I/O slowed and on which disk.
Disk `heat_spans` (col) show when the busiest disk was saturated.
`events` (col) carry `disk_latency_degraded` (value), `disk_unresponsive` (value), `disk_read_only_changed` (value) and `disk_taken_offline` (value) episodes and changes.
Header coverage says whether the device kept reporting through the window.

**Events, for what health named.**

```
source = "<host>" AND service = storage
```

Group by `sparklogs.reason` (LQL), worst first, over the interval the disk heat or episodes named.

**Off-endpoint** (HM7): array management plane, out-of-band controller firmware, SAN fabric.
