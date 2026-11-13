---
index: Disk or RAID array failing
aliases:
  - label: Disk errors or bad blocks
  - label: Chkdsk or file system corruption
  - label: Volume missing, offline or RAW
  - label: SAN or iSCSI disk lost
---

# Disk, RAID array or storage path failing

**Trigger.** "The array reports degraded", "a drive failed in the server", "files will not open: I/O device error", "Windows wants to run chkdsk", "drive D: is gone or shows RAW", "the server freezes for a few seconds and carries on", or a SMART alert from the RMM.

**Accuracy.** Windows records what its storage stack saw: a block it could not read, a request that timed out, a path it reset, a file system structure it found damaged. It does not record which part is bad. The part is named by repetition on one disk, one path or one volume, and by the layer the records sit in.
A hardware RAID controller shows Windows its virtual disks, not its member drives. Member drive health, rebuilds, patrol reads and the controller battery reach the logs only when the vendor's agent writes them, and the pack does not curate those records: read them by provider (**Array controllers and vendor tools**). A controller with no agent installed is invisible here.
SparkLogs does not read SMART counters, Storage Spaces pool health or the RAID controller's own log, and the disk inventory has no health column.
No storage record does not clear the disk: a drive can wear out silently until it fails, a degraded array keeps serving I/O, and the Storport operational channel, which carries the richer reset and removal records, is off by default on client Windows.
Count disks and days, not rows. One failing drive can write hundreds of rows an hour, and the pack keeps one row per five minutes for some repeating records.

**Feeds.** Windows Event Log, scoped with `subsource` (LQL). Reasons and fields are in each feed's `reasons.md` and `fields.md`. Storage files under `service = storage` (LQL) (`guides/service-taxonomy.md`).

- `win.eventlog.system` (value): the classic Disk provider (bad blocks 7, controller errors 11, paging errors 51, predicted failure 52, retried and failed I/O 153 and 154, surprise removal 157), the storage miniports (storahci, stornvme, Intel RST, Hyper-V storvsc, USB uaspstor) with resets 129, NTFS corruption and repair (55, 98, 130 to 133, 7), lost delayed writes (50), the NTFS transaction log (134 to 140), and the iSCSI initiator.
- `win.eventlog.storage` (value): the storage class driver (ClassPnP 500 to 507, with sense data), Storport (resets 500, 501 and 550, surprise removal 551, health samples 539 to 543, error and latency summaries), NTFS Operational (I/O failures 148, mounts 305, hourly I/O latency and failure summaries), the NTFS corruption-handling state (100), Storage Spaces, partitions and volumes.
- `win.eventlog.application` (value): vendor RAID tools that write the Application log (MegaRAID's MR_MONITOR, Microchip maxView), and Chkdsk's own results.
- `sparklogs.device.state` (value): the `storage_devices` (value) and `disk_volumes` (value) inventories (`fields/topic-storage-devices.md`, `fields/topic-disk-volumes.md`), disk I/O every five minutes (`fields/topic-storage-device-io.md`), and the disk conditions and changes.

Blue screens: `playbooks/crashes-and-restarts.md`. Hardware errors on the PCI Express link to a controller or NVMe drive, and WHEA 0x124: `playbooks/hardware-faults.md`. A volume running out of space: `playbooks/disk-full-or-filling.md`. Shadow copies and Volsnap: `playbooks/windows-vss.md`. Lost writes to a network share (`smb_delayed_write_lost` (value)): `playbooks/file-share-access.md`.

**Which layer is it.**

| What the device shows | Layer | Read |
|---|---|---|
| `disk_bad_block` (value), `disk_failure_predicted` (value), `disk_paging_error` (value) with a device data error | The drive's medium | **Failing drive** |
| `storage_controller_reset` (value), `disk_controller_error` (value), `disk_io_retried` (value), `disk_io_failed` (value), `disk_surprise_removal` (value) on an internal disk | The path: controller, cable, backplane, firmware | **Controller and path** |
| `filesystem_corruption` (value), `filesystem_delayed_write_lost` (value), `filesystem_transaction_log_operation_failed` (value), a chkdsk request | The file system | **File system damage and chkdsk** |
| `volume_unreadable` (value), `volume_mount_failed` (value), `disk_taken_offline` (value), `disk_read_only_changed` (value) | The volume or disk is not usable | **Volume missing, offline or read-only** |
| Vendor RAID records, Storage Spaces records, a server's management agent | The array | **Array controllers and vendor tools** |
| `iscsi_target_connection_lost` (value), other iSCSI initiator errors, resets through iScsiPrt, a SAN disk slow or gone | The storage network | **SAN and iSCSI** |
| `disk_latency_degraded` (value), `disk_unresponsive` (value), `storage_request_slow` (value), Windows' slow-I/O records | Slow or stalled I/O, cause open | **Slow or stalled disk**, then the layer the events name |
| `disk_saturated` (value) | Load on a working disk | `playbooks/slow-device.md` (**Disk busy or disk slow**) |

**Device health first.** `query_device_health` (tool). Views are in `guides/device-state-fields.md` (**Choose the view**).

- The device overview over the complaint's window. Its storage readings carry `latency_ms_p90_10s` (col), `queue_depth_avg` (col) and `busy_pct_avg` (col) per disk and volume per bucket, and its disk latency reading, `disk_latency_ms` (col), shows when I/O slowed (`guides/device-state-fields.md`, **Read a device view**). Disk heat is busy time and queue depth, not latency: a failing drive at light load can leave no disk heat at all.
  Its episodes carry `disk_latency_degraded` (value), `disk_unresponsive` (value) (**Slow or stalled disk**) and `volume_unreadable` (value) (a fixed volume unmounted, RAW or unreadable). Its changes carry `disk_taken_offline` (value), `disk_brought_online` (value), `disk_read_only_changed` (value) and `disk_partition_layout_changed` (value).
  A disk condition's instance is the disk, labelled as Windows numbers it ("Disk 1"), so the episode names the disk the events must be read on.
- The device's current `storage_devices` (value) inventory names each disk: `sparklogs.data.storage_devices[].disk_number` (LQL), `sparklogs.data.storage_devices[].model` (LQL), `sparklogs.data.storage_devices[].vendor` (LQL), `sparklogs.data.storage_devices[].transport` (LQL), `sparklogs.data.storage_devices[].presentation` (LQL) and `sparklogs.data.storage_devices[].removable` (LQL).
  Event records name disks by number: `\Device\Harddisk2` (other) and "Disk 2" in a message, and `win.eventlog.storage.device_number` (LQL) on the class driver's records, are disk number 2. Windows renumbers disks when they come and go, so match against the inventory from the same day.
  Presentation tells the cases apart. `local_physical` (value) is a drive in this machine, or a RAID controller's virtual disk (the model is the controller's). `san_lun` (value) is SAN or iSCSI storage. `guest_virtual` (value) is a disk the hypervisor gives this virtual machine, whose real drives are on the host. `software_virtual` (value) is Storage Spaces or a mounted VHD. `removable` (value) is USB or card media.
- What changed before the first error (a storage driver, controller firmware, BIOS): `playbooks/what-changed.md`.

## All storage rows on the device

```lql
source = "<host>" AND service = storage AND sparklogs.kind not in (inventory, delta) AND severity >= notice
```

Group by `sparklogs.reason` (LQL), then `subsource` (LQL) and `provider_name` (LQL) for the rows with no reason, over the interval device health named.
The kind filter drops the device-state inventory rows that also file under `storage` (value). Event log rows carry no kind and stay, curated or not.
Vendor RAID tools, ReFS and some management agents write rows the pack files under no service, so this sweep misses them: run the blocks in **Array controllers and vendor tools** as well.

## Slow or stalled disk

- `disk_latency_degraded` (value): operations take a second or more while only a few requests wait. Slow answers with little load point at the drive or its path: a drive retrying bad sectors, a cable or controller fault, old controller drivers or drive firmware, or an unstable path to SAN or iSCSI storage.
- `disk_unresponsive` (value): requests waiting and almost none completing. Anything touching the disk hangs, and on the Windows disk the whole machine freezes.

The condition's instance names the disk. Run **Failing drive** and **Controller and path** over the same hours, and on a `san_lun` (value) disk **SAN and iSCSI**. The records there name the layer.
`storage_request_slow` (value) is StorPort event 557 on `win.eventlog.storage` (value): one I/O that took longer than the port's threshold, with `win.eventlog.storage.request_duration_ms` (LQL), the disk's model and serial, and whether it is the boot disk (`win.eventlog.storage.boot_device` (LQL)). It is kept as one row per disk path and command every five minutes, with a count of the repeats, so count disks and periods, not rows:

```lql
source = "<host>" AND sparklogs.reason = storage_request_slow
```

Windows also writes slow-I/O records that SparkLogs keeps without a reason:

```lql
source = "<host>" AND subsource = "win.eventlog.storage" AND ((provider_name = "Microsoft-Windows-Ntfs" AND event_id in (146, 147, 149, 170)) OR (provider_name = "Microsoft-Windows-StorPort" AND event_id in (504, 554)))
```
<!-- confirmed with data on 2026-11-12 -->

Group by `provider_name` (LQL) and `event_id` (LQL).

- Ntfs 147 is one file system I/O that took more than 30 seconds, naming the process and the file it was for. The file name can carry user document paths: quote no more of it than the ticket needs.
- Ntfs 146, 149 and 170 are hourly summaries for one volume. 149 counts high-latency I/O, failed reads, failed writes and bad clusters relocated. SparkLogs drops the 146 and 170 hours that counted none. Failed reads hour after hour on the boot volume are a drive losing data.
- StorPort 554 is a queue past its threshold. 504 is the period's error summary, and SparkLogs drops the periods that counted none.

These records also appear on healthy workstations, often across sleep and resume or from a single program's slow write. Weight them only beside a disk condition or a disk or controller error on the same disk, or when they repeat hour after hour on one disk. Beside a failing drive they confirm the fault and name the volume and the program that waited.

## Failing drive

```lql
source = "<host>" AND sparklogs.reason in (disk_bad_block, disk_failure_predicted, disk_paging_error, disk_io_failed, storage_device_command_failed)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `win.eventlog.storage.device_number` (LQL), `win.eventlog.storage.sense_key_name` (LQL). The System log's records carry the disk number in the message only.

- **Medium errors.** `disk_bad_block` (value) is the drive's own firmware saying it could not read or write a sector: Disk event 7, and the class driver's 505 or 506 with sense key `medium_error` (value) and status 0xC000009C (STATUS_DEVICE_DATA_ERROR). Bad sectors do not heal, and a count that rises over days is more of the drive failing. Back up first, then replace. chkdsk cannot repair the medium.
  A hardware-error or aborted-command sense key is a transfer that did not finish, without blaming the medium: read **Controller and path** before blaming the drive.
- **Paging errors.** `disk_paging_error` (value) with a device data error is the same failing medium under memory Windows was paging, which no application reports. Programs crash or hang with no message of their own, and on the system disk Windows stops with 0x7A (below).
- **Predicted failure.** `disk_failure_predicted` (value) comes from two places. Disk event 52 is the drive's SMART prediction crossing its maker's limit. The Storport health records are NVMe drives reporting their own state: `win.eventlog.storage.health_flag_name` (LQL) set is the drive saying it can no longer be trusted (replace now); `win.eventlog.storage.percentage_used_pct` (LQL) above `win.eventlog.storage.endurance_threshold_pct` (LQL) is wear past the rated writes (plan a replacement). Reads still work: this is the warning that leaves time.
- **Removable media and the device leaving.** The variants `device_gone` (value) and `removable_verify` (value), and Info and Debug rows, are a USB drive or card pulled during I/O. Pass over them unless a copy or backup to that device failed at the same minute.
- **No SMART behind a RAID controller.** Windows asks each disk for SMART data, and a RAID virtual disk answers that it has none (the pack does not keep those refusals). A drive behind a hardware controller never raises Disk event 52: its predictive failure is in the controller's log (**Array controllers and vendor tools**).

The NTFS and Storport slow-I/O summaries for the same disk confirm a failing drive and name the volume and the program that waited: **Slow or stalled disk**.

**0x7A and other stop codes from the disk.** A blue screen can be the only record when the system disk fails:

```lql
source = "<host>" AND sparklogs.reason = kernel_crash AND sparklogs.data.crashes.bugcheck_code in ("0x0000007A", "0x00000077", "0x000000F4", "0x00000024", "0x000000ED", "0x0000007B")
```

Read `sparklogs.data.crashes.bugcheck_param2` (LQL) on 0x7A (KERNEL_DATA_INPAGE_ERROR) and 0x77 (KERNEL_STACK_INPAGE_ERROR): it is the I/O status (Microsoft's bug check reference). The value can arrive in lower case, without leading zeros or sign-extended to 64 bits, so read its last eight hex digits. 0xC000009C is a bad block, 0xC000016A a disk operation that failed, 0xC0000185 an I/O device error (cable, controller or a drive that stopped answering), 0xC000009D a disk that disconnected. 0xC000009A is insufficient resources, not the disk.
0xF4 (CRITICAL_OBJECT_TERMINATION) after paging errors is a Windows process that could not page in its code. 0x24 (NTFS_FILE_SYSTEM) and 0xED (UNMOUNTABLE_BOOT_VOLUME) are the file system. 0x7B (INACCESSIBLE_BOOT_DEVICE) is the boot disk lost while starting, usually a storage driver or controller mode change: `playbooks/crashes-and-restarts.md`.
A failing system disk can also stop Windows writing the dump, so the crash shows only as an unexpected shutdown.

## Controller and path

```lql
source = "<host>" AND sparklogs.reason in (storage_controller_reset, disk_controller_error, disk_io_retried, disk_io_failed, disk_surprise_removal)
```

Group by `sparklogs.reason` (LQL), `provider_name` (LQL), `win.eventlog.storage.miniport_name` (LQL), `win.eventlog.storage.boot_device` (LQL).

- `storage_controller_reset` (value) is the port driver giving up waiting and resetting the path: miniport event 129 ("Reset to device, \Device\RaidPortN, was issued") on the System log, and Storport 500, 501 or 550 with `win.eventlog.storage.failed_io_count` (LQL) and `win.eventlog.storage.srb_timeout_s` (LQL) where the Storport channel is on. The machine freezes for the timeout, often 30 seconds or more, then carries on.
  The miniport names the path: storahci (SATA), stornvme (NVMe), iaStorAC or iaStorVD (Intel RST, often a laptop's NVMe drive), storvsc (a Hyper-V guest's virtual disk), uaspstor (a USB enclosure), iScsiPrt (**SAN and iSCSI**), or the RAID controller's own driver.
- Repeated resets on one internal path with no medium errors are a cable, backplane slot, controller or drive firmware: update the controller driver and drive firmware from the maker, reseat or replace the cable. NVMe drives that reset after sleep often have a firmware fix, and turning off the drive's power saving is the usual workaround.
- `disk_controller_error` (value) (Disk event 11) on a card reader or an empty USB slot repeats harmlessly on many workstations. The same event on the system disk or a server's data disk is a path fault. The disk's presentation in the inventory says which.
- `disk_io_retried` (value) (Disk 153) recovered after a retry. A burst during a heavy backup is load; a steady rate on one disk comes before resets and failures. On a virtual machine (storvsc), retries and resets are the host's storage being slow: read the host.
- `disk_surprise_removal` (value) on an internal or server disk is the path dropping (power, cable, backplane, enclosure). On USB it is unplugging. A virtual disk that a backup program attaches and detaches removes itself on schedule.
- **Same time every day.** Removals, resets or link losses that start at the same time each night, recover and repeat are a schedule, not a failing part: a backup window that powers drives on and off, rotated drives in hot-swap bays, a power-managed enclosure, or a scan. Compare the times with the backup and maintenance windows before replacing anything.

## File system damage and chkdsk

```lql
source = "<host>" AND sparklogs.reason in (filesystem_corruption, filesystem_delayed_write_lost, filesystem_transaction_log_operation_failed)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `win.eventlog.system.volume` (LQL).

- `filesystem_corruption` (value) variants: `corruption_discovered` (value) (NTFS event 55; the message names the structure, and a corrupted Master File Table record reaches every file on the volume), `offline_repair_required` (value) (98, a Full Chkdsk offline), `spot_fix_required` (value) (98, a short offline Spot Fix), `online_scan_required` (value) (98, an Online Scan at the next maintenance), `shadow_copy_volume` (value) (98 on a shadow copy, at Verbose), `correction_required` (value) (131), `torn_write_detected` (value) (7, a write that reached the disk only in part, usually after power loss), `repair_activity` (value) (130, NTFS fixed it itself), `repair_posting_throttled` (value), `disk` (value) (Disk 55), and `state_error` (value) or `state_warning` (value) (the machine-wide NTFS corruption-handling state on `win.eventlog.storage` (value), which names no volume).
- Corruption is the symptom, and the cause is usually below it. Read **Failing drive** and **Controller and path** for the same volume and days before running chkdsk, and look for unexpected shutdowns before the first record (`playbooks/crashes-and-restarts.md`): power loss during writes is the common cause of a single torn write or index repair. Repeated damage on one volume with no power loss is the device.
- **Shadow copy volumes.** A volume named `\Device\HarddiskVolumeShadowCopyN` (other) in the message is a snapshot, not a live volume. Windows' online scan (chkdsk /scan and the scheduled maintenance scan) checks a snapshot of the live volume, and Chkdsk event 26226 on `win.eventlog.application` (value) says "Chkdsk was executed in scan mode on a volume snapshot". The label before the device name (`Volume OS (\Device\HarddiskVolumeShadowCopy5)` (other)) names the live volume, which held the damage when the snapshot was taken. A label that reads like a backup set (a server name and a date) is a backup image a backup program mounted: the damage is in that image.
- `filesystem_delayed_write_lost` (value) (NTFS 50) is cached data Windows accepted and then could not write: realized loss, with the file named when Windows knows it. The fix is the path to the device, not chkdsk. On USB it is a drive pulled before the cache flushed.
- `filesystem_transaction_log_operation_failed` (value) on a volume that no longer exists (a removed drive) is nothing. On a live volume, read the disk's path for the same minutes.

NTFS 98 is the volume's verdict. Its repair arms are above; "is healthy. No action is needed" stays without a reason, at Info. The newest verdict on the live volume says where it stands: healthy after a repair closes it, a Spot Fix (chkdsk /spotfix) is a short offline repair, and an Online Scan runs at the next maintenance. Read `shadow_copy_volume` (value) as described under **Shadow copy volumes**, never as damage on the live volume by itself. Chkdsk's own result is event 26226 on `win.eventlog.application` (value), uncurated, with the stages and what it found.

Repair: check the backup first. `chkdsk <volume> /scan` or `Repair-Volume -Scan` online shows how much is damaged; `chkdsk /spotfix`, `chkdsk /f` or `Repair-Volume -OfflineScanAndFix` repairs it, at the next restart for the system volume. Do not run a repair on a drive that still throws medium errors: copy the data off first.

## Volume missing, offline or read-only

- `volume_unreadable` (value) is a fixed volume the agent has seen on nearly every check for weeks that is now unmounted, RAW or unreadable. Do not format or initialize it. Read the disk and file system records from when it started, then the cables, controller or SAN path.
- `volume_mount_failed` (value): the variant `device_offline` (value) is Windows probing an empty card reader, bay or detached image, and floods on a few devices; pass over it. `mount_failed` (value) is a volume that would not come up: read `win.eventlog.storage.volume_name` (LQL) and the status.
- `disk_taken_offline` (value) and `disk_brought_online` (value) are an administrator, a script, the SAN policy or a cluster failover. A shared SAN disk online on two servers outside a cluster gets its file system corrupted.
- `disk_read_only_changed` (value): every write fails while it is set. A SAN snapshot presented for a restore is often read-only.
- ReFS volumes report their own failures uncurated, such as ReFS 134 ("unable to write metadata ... ReFS will take the volume offline"): group the `provider_name = "Microsoft-Windows-ReFS"` (LQL) rows on `win.eventlog.system` (value) by `event_id` (LQL).

## Array controllers and vendor tools

What a RAID controller knows (a member drive failed, the array is degraded or rebuilding, a drive predicts failure, the cache battery is learning) reaches Windows only through the vendor's agent. Run this when the ticket is about an array or a server's drives:

```lql
source = "<host>" AND subsource in ("win.eventlog.system", "win.eventlog.application") AND provider_name in ("Server Administrator", "MR_MONITOR", "maxView Storage Manager Agent", "iDRAC Service Module")
```

Group by `provider_name` (LQL), `event_id` (LQL), `severity` (LQL), and read the messages.

- **Dell OpenManage Server Administrator** writes the System log. Newer builds start each message with "Severity: ..., Category: Storage, MessageID: ..." (filter `message: "Category: Storage"` (LQL)), and the message ID prefix says what it is about (PDR a physical disk, VDR a virtual disk, CTL the controller, BAT its battery). Older builds write the bare sentence. The same agent reports power supplies and fans ("Redundancy lost", "Power supply detected a failure"), which explain unexpected shutdowns better than the storage does.
- **MegaRAID (MR_MONITOR)** writes the Application log, each message starting "Controller ID:". "PD removed", "PD inserted" and "Link lost on SAS wide port" with the PHY number name the slot. Read them against the time of day (**Controller and path**, same time every day).
- **Battery relearn and write cache.** A controller battery charging, discharging or "relearn will start" (both vendors) means the controller may switch from write-back to write-through caching while it runs: writes slow down for hours with no fault. A battery or cache module that fails leaves the array in write-through until it is replaced. Disk events 32 and 34 (write cache enabled or disabled) are configuration, which the pack holds at Info.
- **Not certified or not supported** drive warnings (Dell PDR214, CTL55) are a drive not bought from the server's maker: a support question, not a failure.
- Other makers' agents (HPE, Lenovo, Intel RST and others) write under their own provider names. Find them on the device among the rows the pack files under no service, grouped by `provider_name` (LQL):

```lql
source = "<host>" AND subsource in ("win.eventlog.system", "win.eventlog.application") AND NOT service! AND severity >= warning
```

- **Storage Spaces** writes `Microsoft-Windows-StorageSpaces-Driver` (other) records on `win.eventlog.storage` (value), uncurated and capped at Warning. Arrival records (207) are routine at every boot, and "failed while arriving ... There is no disk in the drive" (208) is an empty card reader. Group the rest by `event_id` (LQL) and read the messages for a physical disk failed, missing or retired, or a space degraded. A Storage Spaces virtual disk shows in the inventory as `sparklogs.data.storage_devices[](transport = "spaces")` (LQL), and its member disks have no I/O rows of their own. The pool's current health (`Get-StoragePool`, `Get-VirtualDisk`, `Get-PhysicalDisk`) is not collected.

No vendor rows proves only that no agent wrote any. Say so, and put the controller's console or the server's management controller in WHAT WAS NOT CHECKED.

## SAN and iSCSI

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name in ("iScsiPrt", "MSiSCSI")
```

Group by `sparklogs.reason` (LQL) and `event_id` (LQL). `iscsi_target_connection_lost` (value) arm `connection_failed` (value) is 1 (could not connect to the target), 7 (could not send), 20 (connection lost, retrying) and 49 (the target not answering a task management request); arm `reconnected` (value) is 34 (connection lost and reconnected). The target address and status are in the event's binary data only. Without a reason: 9 (target did not answer a SCSI request in time) and 39 (a task management reset sent). Resets through iScsiPrt arrive as `storage_controller_reset` (value) with `win.eventlog.storage.miniport_name` (LQL) iScsiPrt.
A burst of connection losses with `disk_latency_degraded` (value) or `disk_unresponsive` (value) on the same disk is the path: the network, the switch ports, the storage array, or the array's own maintenance. Run the query over the client, grouped by `source` (LQL): every server on one array failing in the same minutes is the array or its network; one server alone is its network adapters, cabling or initiator settings (multipath, timeouts).
Fibre Channel and multipath failures show only as resets, retries and surprise removals on `san_lun` (value) disks.
On a virtual machine, the real path is the host's: read the Hyper-V host (`hyperv_vm_storage_request_slow` (value) on its `win.eventlog.management` (value)) or the hypervisor's own monitoring.

## One device or many

The same reason on many devices of one model, with one controller driver or firmware, is that platform: the maker's updates.
Several servers with path errors in the same minutes share an array, a switch or a power feed. Unexpected shutdowns on several devices in the same minute are power, not storage (`playbooks/crashes-and-restarts.md`).
One device alone with a rising count on one disk is that disk or its path.

## Findings

Lead with the layer and the disk: the disk number, its model and presentation from the inventory, the volume, and the count of rows and days.
Say what the records prove (a medium error, a reset, damage found, a removal) and what they cannot (member drive health behind a controller, SMART counters, the array's own log).
Name a failing drive only with medium errors or a prediction on that disk, or the vendor tool naming it. For resets and timeouts, name the path and list the cable, controller firmware and drive firmware as the checks.
For a server with a RAID controller and no vendor rows, say the array was not checked and name its console.

**Off-endpoint** (HM7): the RAID controller's log and console, the server's management controller and its hardware log, SMART counters and the drive maker's tools, Storage Spaces pool state, the SAN or NAS array's logs and its switches, the hypervisor host's storage, firmware advisories for drives and controllers.
