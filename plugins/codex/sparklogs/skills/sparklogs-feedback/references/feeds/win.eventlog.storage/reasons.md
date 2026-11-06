<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.storage`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `disk_bad_block` | disk bad block | event | Info to Serious | `storage` | benign possible |
| `disk_failure_predicted` | disk failure predicted | event | Warning to Serious | `storage` |  |
| `disk_io_failed` | disk io failed | event | Debug to Warning | `storage` |  |
| `disk_paging_error` | disk paging error | event | Notice to Error | `storage` |  |
| `disk_surprise_removal` | disk surprise removal | event | Info to Warning | `storage` |  |
| `filesystem_corruption` | filesystem corruption | event | Error | `storage` |  |
| `storage_controller_reset` | storage controller reset | event | Warning to Error | `storage` |  |
| `storage_device_command_failed` | storage device command failed | event | Debug to Notice | `storage` |  |
| `volume_mount_failed` | volume mount failed | event | Info to Warning | `storage` | benign possible |

## `disk_bad_block`: disk bad block

A storage device returned a fault instead of the data.

**Also reported by:** `win.eventlog.system`

**Severity:** ClassPnP medium errors select Serious on fixed disks, Error on removable disks and Warning on removable media, virtual disks or unknown/missing facts. Hardware-error and aborted-command sense keys remain Warning. NTFS data errors retain the fixed-bus Serious raise; verify-required requests against media taken away mid-IO remain Info.

**Why it matters:** The data that was asked for did not come back: a file will not open, a copy stops with an I/O device error, or a backup fails on the same file every run. On an internal drive, a medium error means the drive has started losing sectors.

**In practice:** NTFS writes event 148 in Microsoft-Windows-Ntfs/Operational when a read or write it sent to the device came back with a device data error. The storage class driver reports the same fault one layer down as event 505 or 506 in Microsoft-Windows-Storage-ClassPnP/Operational, with the sense data the device returned. A medium-error sense key is the drive's own firmware saying it could not read or write that sector, which chkdsk cannot repair. A hardware-error or aborted-command sense key says the transfer did not finish without blaming the medium: a cable, controller or enclosure fault produces the same result. Event 148 with a verify-required status is removable media pulled out during the IO, recorded at Info.

**When to ignore:** An Info row with a verify-required status is someone removing a USB stick or card while it was in use. Pass over it unless the user lost a file.

**What to check:**

- Read the drive's health counters: `Get-PhysicalDisk | Get-StorageReliabilityCounter`, or the drive vendor's tool.
- For a medium error on an internal drive, check the backup and plan a replacement. Bad blocks are remapped while spare blocks last and do not heal.
- For a hardware-error or aborted-command row, or a USB drive, reseat or replace the cable or enclosure before blaming the drive.
- Count rows per drive over days. Each row names a different block, so a rising count means more of the drive is failing.

**Related:**

- `disk_paging_error`: the same medium failure on memory Windows was paging, which no application sees
- `storage_device_command_failed`: a failed command that is not a read or a write, on the same kind of device

**Example:** A desktop's internal SATA drive fails a read on volume C:, and NTFS logs event 148 with a device data error.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#disk_bad_block, https://sparklogs.com/reference/reasons/disk_bad_block.json

The file NTFS names is not shown here. It carries user document paths.

## `disk_failure_predicted`: disk failure predicted

A storage device reported that its own reliability is degraded or that it has passed its rated write endurance.

**Also reported by:** `win.eventlog.system`

**Severity:** Serious when a server's drive reports its reliability degraded, Error for the same report on any other host, Warning when the drive has only passed its rated write endurance.

**Why it matters:** Nothing has failed yet, and reads and writes still succeed. The drive is warning that it is wearing out, which leaves time to move the data and replace it before reads start failing.

**In practice:** Storport records device health samples as events 539, 542 and 543 in Microsoft-Windows-Storage-Storport/Health and Microsoft-Windows-Storage-Storport/Operational. Most samples are routine numbers and are not part of this reason. It applies only when the drive's own firmware makes the call: it sets its reliability-degraded flag, or reports the share of its rated write endurance it has used (Percentage Used) above its own endurance threshold. The reliability flag is the stronger of the two: the drive says it can no longer be trusted. Endurance past the rated limit is wear, and drives often keep working well past it. SSDs that take heavy writes, such as database, logging and cache drives, reach that limit first.

**What to check:**

- Check the backup state for the host first.
- Read `health_flag_name` for the reliability flag, and `percentage_used_pct` against `endurance_threshold_pct` for wear.
- For a reliability-degraded drive, schedule a replacement now. For endurance alone, plan one and watch the same drive for read or write errors.
- Compare with the drive vendor's tool or `Get-PhysicalDisk | Get-StorageReliabilityCounter` for wear and error counts.

**Related:**

- `disk_bad_block`: the drive actually failing to return data, which is what this predicts

**Example:** An NVMe drive in a file server sets its reliability-degraded flag in a Storport health sample.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#disk_failure_predicted, https://sparklogs.com/reference/reasons/disk_failure_predicted.json

## `disk_io_failed`: disk io failed

A read or write to a storage device failed.

**Also reported by:** `win.eventlog.system`

**Severity:** Warning or Debug

**Why it matters:** The request did not complete, so the program or backup that asked for it got an error or had to retry. The record alone does not show damaged media.

**In practice:** The storage class driver logs a failed read or write as event 500, 501, 505 or 506 in Microsoft-Windows-Storage-ClassPnP/Operational, with the status code and, on 505 and 506, the sense data the device returned. This reason holds the failures whose sense data names no medium error, hardware error or aborted command, so the cause is open: a timeout, a controller or bus problem, or a device that briefly stopped answering. A no-such-device or verify-required status means the device left the machine, as when a USB drive is unplugged; those rows are kept at Debug for the timeline. Not collected: reads and probes against an empty card reader or optical drive (no media in device), which are the resting state of an empty slot.

**When to ignore:** A Debug row with a no-such-device or verify-required status follows a device being unplugged or detached. Pass over it unless a copy or backup to that device failed at the same moment.

**What to check:**

- Read the resolved status code and the device number, and group rows by device to see whether one drive keeps failing.
- Look for a Storport path reset or a device removal on the same device just before it.
- If an internal drive keeps failing, check its health counters, its cable and its controller driver.

**Related:**

- `disk_bad_block`: the device's sense data names a fault in the medium
- `disk_io_retried`: the storage stack retried the request rather than reporting it failed

**Example:** An external USB drive stops answering during a copy, and the class driver logs event 505 for the read that failed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#disk_io_failed, https://sparklogs.com/reference/reasons/disk_io_failed.json

## `disk_paging_error`: disk paging error

A paging read or write to a storage device failed.

**Also reported by:** `win.eventlog.system`

**Severity:** Device data errors select Error, or Warning on removable disks and Notice on removable media. Other failed transfers remain Warning; recognized device departures remain Notice.

**Why it matters:** No application reports it, so this record is often the only trace. The program whose memory could not be read back can crash or hang, and a failure on the system drive can end in a stop error.

**In practice:** The storage class driver writes event 502 or 503 in Microsoft-Windows-Storage-ClassPnP/Operational when a paging transfer fails: Windows was moving memory between RAM and the page file or a mapped file, and the device did not complete it. A device data error status (0xC000009C) means the medium under the running system could not return what was written to it, the same failing-drive fact as a bad block. Other statuses are a transfer that did not finish, with the cause open. A no-such-device, verify-required or device-does-not-exist status means the device behind the paging IO left, as when a USB drive a program runs from is pulled; those rows are kept at Notice. The classic Disk provider reports the same failure as event 51 in the System log.

**When to ignore:** A Notice row with a departure status after someone removed a USB drive needs no action unless a program running from it failed.

**What to check:**

- Read the resolved status code and the device it names.
- For a device data error on an internal drive, read its health counters and plan a replacement.
- Look for application crashes, or a stop error naming an in-page error, at the same time.
- Against removable media, check what was running from the device when it left.

**Related:**

- `disk_bad_block`: the same medium failure on a read or write an application asked for
- `storage_controller_reset`: the port driver resetting the path to the device, not one transfer failing

**Example:** A failing system drive returns a device data error while Windows pages a background process back into memory.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#disk_paging_error, https://sparklogs.com/reference/reasons/disk_paging_error.json

## `disk_surprise_removal`: disk surprise removal

A storage device disappeared without being safely removed.

**Also reported by:** `win.eventlog.system`

**Severity:** Info on Storport551 USB or mounted-virtual-disk detaches; Warning on other removals.

**Why it matters:** Programs with files open on the device lost their writes in flight, and a copy or backup running to it failed.

**In practice:** Storport writes event 551 in Microsoft-Windows-Storage-Storport/Operational when a device leaves without an orderly removal. The enhanced-storage class driver writes event 103 in Microsoft-Windows-EnhancedStorage-EhStorClass/Operational for the same fact. A removal through the USB attached SCSI driver (uaspstor) or of a mounted virtual disk (vhdmp) is ordinary unplugging or detaching, recorded at Info. Other removals are recorded at Warning: on an internal disk the path dropped, which points at a cable, backplane, controller or power fault. The removable flag does not settle which case it is: a virtual disk reports itself non-removable and is detached routinely. The classic Disk provider reports a surprise removal as event 157 in the System log.

**When to ignore:** Info rows from uaspstor or vhdmp are a USB drive unplugged or a virtual disk detached. Pass over them unless a backup or copy to that device failed.

**What to check:**

- Read `miniport_name` with `removable` and `surprise_removal_ok` to tell an unplugged USB or virtual disk from an internal disk dropping off.
- Check what was writing to the device at the time: a backup, a copy, or an application with files open.
- If an internal disk keeps disappearing, check its cable, backplane slot and power, and look for path resets on it just before.

**Related:**

- `storage_controller_reset`: the same device path being reset and recovering, not disappearing

**Example:** A user pulls a USB drive from a laptop without ejecting it, and Storport logs event 551 from uaspstor.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#disk_surprise_removal, https://sparklogs.com/reference/reasons/disk_surprise_removal.json

## `filesystem_corruption`: filesystem corruption

NTFS moved this machine's corruption-handling state away from normal.

**Also reported by:** `win.eventlog.system`

**Severity:** Error

**Why it matters:** NTFS has met something it treats as a problem on this machine. Users may find files that will not open or folders that look wrong, and the record does not say which volume.

**In practice:** NTFS keeps one corruption-handling state for the whole machine and writes event 100 in Microsoft-Windows-Ntfs/WHC each time it changes. NTFS writes the normal state at Information level, and those rows are not part of this reason. A move written at Warning or Error level is a state NTFS itself treats as off normal. Microsoft publishes no meaning for the state numbers (`hc_stateid`), so the record proves the state change, not a confirmed damaged file. NTFS events 55, 98 and 130 to 133 in the System log name the volume and the damage when NTFS finds it.

**What to check:**

- Check the backup state for the host.
- Run `chkdsk <volume> /scan` on the volumes in use, then schedule a repair (`chkdsk /f` or `Repair-Volume`) where it finds errors.
- Look for NTFS events 55, 98 or 130 to 133 in the System log, which name the volume.
- Confirm a later event 100 reports the state back at Information level.

**Example:** NTFS on a workstation moves its corruption-handling state off normal and logs event 100 at Warning level.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#filesystem_corruption, https://sparklogs.com/reference/reasons/filesystem_corruption.json

Microsoft publishes the template with no value map, so the state number ships undecoded.

## `storage_controller_reset`: storage controller reset

The storage port driver reset the path to a device.

**Also reported by:** `win.eventlog.system`

**Severity:** Error when the device is the one the machine boots from, Warning otherwise.

**Why it matters:** Disk access on that path stalls while the driver waits, often for several seconds, and the requests in flight are thrown away. Users see the machine or an external drive freeze, then carry on.

**In practice:** Storport writes event 500, 501 or 550 in Microsoft-Windows-Storage-Storport/Operational when it stops waiting for a device and resets the path to it: the device first, then the bus, then the adapter. `failed_io_count` says how many requests were discarded, and `srb_timeout_s` how long the driver waited. Repeated resets on an internal controller usually come before a controller, cable or backplane failure. On an external enclosure, reached through the USB attached SCSI driver (uaspstor), the enclosure or its cable is usually at fault. The storage miniport reports the same reset as event 129 in the System log, without these details.

**When to ignore:** An occasional reset of an external USB enclosure with `boot_device` false, after which disk access carries on, needs no action unless it repeats.

**What to check:**

- Check `boot_device` and `miniport_name`. uaspstor points at an external enclosure; an internal miniport such as storahci or stornvme with `boot_device` true points at the host's own disk path.
- Count resets per device over days. A rising rate on one path is a failing cable, backplane or controller.
- Update the storage controller driver and firmware, and reseat or replace the cable.

**Related:**

- `disk_bad_block`: a fault in the medium rather than in the path to it
- `disk_surprise_removal`: the same device path ending in the device disappearing rather than recovering

**Example:** An external USB enclosure stops answering, and Storport resets the path to it and discards 43 requests.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#storage_controller_reset, https://sparklogs.com/reference/reasons/storage_controller_reset.json

## `storage_device_command_failed`: storage device command failed

A storage device did not complete a command, and reported sense data saying why.

**Severity:** Info when the device is announcing a change to itself, Debug for a drive rejecting TRIM, Notice otherwise. One occurrence claims no fault.

**Why it matters:** A single occurrence usually reaches no application, because the driver reissues the command. A rising count against one drive is an early sign of it going bad.

**In practice:** The storage class driver writes event 507 in Microsoft-Windows-Storage-ClassPnP/Operational when a command to a device fails, with the sense data the device returned. The sense key is the device's top-level answer, the additional sense code and its qualifier name the condition, and the SRB status is the port driver's account of how the request ended. A unit-attention sense key is the device announcing a change, such as media inserted or a reset, and is recorded at Info. A TRIM (UNMAP) the drive aborts is recorded at Debug: some SATA SSDs refuse every TRIM, the data is untouched and only free space is not reclaimed. Not collected: an empty card reader or optical drive reporting no medium, commands the device does not support, and commands that never ran against the medium (busy, invalid request, flushed). None of these is a fault.

**When to ignore:** Info rows (unit attention) and Debug rows for a rejected TRIM are routine. A single Notice row is too, unless its count on one drive keeps rising.

**What to check:**

- Group by device and sense key over time. A rising count against one drive is the signal; a single row is not.
- Read the sense key with the additional sense code and its qualifier. Together they name the condition.
- Compare against the drive's health counters before planning a replacement.

**Example:** A USB card reader answers a command with unit attention after a card is inserted.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#storage_device_command_failed, https://sparklogs.com/reference/reasons/storage_device_command_failed.json

Sense data is the device's own account of a failure, so it is the one place a drive's answer is recorded rather than inferred. Empty removable slots and unsupported-command probes are not kept.

## `volume_mount_failed`: volume mount failed

NTFS could not mount a volume.

**Severity:** Warning or Info

**Why it matters:** Files on that volume are unavailable until it mounts, and shares or databases on a data volume go offline with it. The record reports one mount attempt, not how long the volume stayed down.

**In practice:** NTFS writes event 305 in Microsoft-Windows-Ntfs/Operational when it is asked to mount a volume and cannot; the status code says why. A device-offline status (0x80000010) means there was nothing to mount: an empty card reader or bay, or a detached image, as Windows enumerates it. Those rows are recorded at Info, with no volume name. Any other status, or none, is a volume that would not come up. Not collected: a mount attempt against a slot with no medium in it (0xC0000013).

**When to ignore:** Info rows with a device-offline status and no volume name are Windows probing an empty card reader, bay or detached image. Pass over them.

**What to check:**

- Read the resolved status code and `volume_name`.
- For any status other than device offline, open Disk Management or run `Get-Volume` to see whether the volume is present and healthy now.
- Check whether the volume_unreadable condition opened for the same volume, which shows it stayed unusable.
- Look for a device removal or a path reset just before it.

**Related:**

- `disk_surprise_removal`: the device behind a volume leaving the machine
- `volume_unreadable`: the SparkLogs condition for a volume that stays unusable, read from the device's state

**Example:** Volume D: on a workstation fails to mount, and NTFS logs event 305 with an object-name-not-found status.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-storage#volume_mount_failed, https://sparklogs.com/reference/reasons/volume_mount_failed.json
