# Disk full or filling fast

**Trigger.** A volume crosses 90% or fills; users hit "no space" errors.

**Accuracy.** State answers this category.
One reason per volume role: `os_volume_space_low` or `data_volume_space_low`. Severity rises while the volume is still filling; `sparklogs.data.disk_volumes[](volume_filling=true)` (LQL) finds those volumes.
Two volumes on one host share a reason; `sparklogs.instance` (LQL) tells them apart.
Show `sparklogs.display_name` (col), else `sparklogs.instance` (col).
Fleet totals: the device count per space-low reason (`affected_agents` (col)). A device can carry both reasons, so do not sum them.

**Device health first.** The space-low and `volume_fill_rate_high` conditions, then `latest_state` on the `disk_volumes` topic for free space, and, while the volume is filling, its fill rate and projected time to full.
Who is writing: `device_overview` over the filling interval.
Its `top_processes` (col) carry `io_write_mb` (col) per executable, and `storage` carries write throughput per volume by bucket.
Process write bytes include writes that do not reach the disk: they rank writers without measuring what landed on the volume.
`events` (col) on the same reading show the changes that overlapped the start of the fill, such as a product install or a new network share.

**Events, for what health named.** A volume that fills because something is failing (a backup retrying, a log growing on errors) shows those errors on the device. Disk, controller and file system errors on the volume itself: `raid-or-storage-degraded.md`.

**Well-known causes.** Where the space usually goes, and what points at it:

- Shadow copies: shadow storage use against its limit on the `vss_shadowstorage` topic, in `windows-vss.md`.
- Windows Update: the download cache, a feature update that keeps downloading and failing (`windows-update-failure.md`, **Feature updates**), and the previous Windows kept for rollback after an upgrade. The component store grows with each cumulative update until cleanup removes superseded versions.
- Memory dumps: a full dump is about the size of RAM and is rewritten at each blue screen (`crashes-and-restarts.md`).
- The page file and the hibernation file on the OS volume, both sized from RAM.
- Logs growing on errors: a web server, database, backup or vendor tool writing to its own folder. The top writer in `top_processes` (col) names the program.
- User data: Outlook data files, sync clients pulling cloud files down, and profiles and temp folders on a terminal server.
- An install or a new product at the start of the fill: `what-changed.md`.

**Off-endpoint** (HM5): mounted network shares, backup shadow locations, sync clients.
