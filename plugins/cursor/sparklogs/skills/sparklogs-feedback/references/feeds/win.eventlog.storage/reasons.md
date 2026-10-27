<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.storage`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `disk_bad_block` | `storage` | ClassPnP medium errors select Serious on fixed disks, Error on removable disks and Warning on removable media, virtual disks or unknown/missing facts. Hardware-error and aborted-command sense keys remain Warning. NTFS data errors retain the fixed-bus Serious raise; verify-required requests against media taken away mid-IO remain Info. | benign possible |
| `disk_failure_predicted` | `storage` | Serious when a server's drive reports its reliability degraded, Error for the same report on any other host, Warning when the drive has only passed its rated write endurance. |  |
| `disk_io_failed` | `storage` | Warning or Debug |  |
| `disk_paging_error` | `storage` | Device data errors select Error, or Warning on removable disks and Notice on removable media. Other failed transfers remain Warning; recognized device departures remain Notice. |  |
| `disk_surprise_removal` | `storage` | Info on Storport551 USB or mounted-virtual-disk detaches; Warning on other removals. |  |
| `filesystem_corruption` | `storage` | Error |  |
| `storage_controller_reset` | `storage` | Error when the device is the one the machine boots from, Warning otherwise. |  |
| `storage_device_command_failed` | `storage` | Info when the device is announcing a change to itself, Debug for a drive rejecting TRIM, Notice otherwise. One occurrence claims no fault. |  |
| `volume_mount_failed` | `storage` | Warning or Info | benign possible |

## `disk_bad_block`

A storage device returned a fault instead of the data.

**Also reported by:** `win.eventlog.system`

**Severity:** ClassPnP medium errors select Serious on fixed disks, Error on removable disks and Warning on removable media, virtual disks or unknown/missing facts. Hardware-error and aborted-command sense keys remain Warning. NTFS data errors retain the fixed-bus Serious raise; verify-required requests against media taken away mid-IO remain Info.

**Impact:** The file did not come back, and the drive is consuming its spare-block reserve.

**Consider:**

- Read the drive's health counters.
- Plan replacement, not repair. Bad blocks do not heal: they are remapped while spares remain and lost when they do not.

The file NTFS names is not shown here. It carries user document paths.

## `disk_failure_predicted`

A storage device reported that its own reliability is degraded or that it has passed its rated write endurance.

**Also reported by:** `win.eventlog.system`

**Severity:** Serious when a server's drive reports its reliability degraded, Error for the same report on any other host, Warning when the drive has only passed its rated write endurance.

**Impact:** The drive still serves IO. It is reporting wear before reads or writes start failing.

**Consider:**

- Plan a replacement window: the drive is working and the warning is early.
- Check the backup state for the host before scheduling anything on it.
- Read the endurance percentages together: consumed endurance above the device's own threshold is the claim.

## `disk_io_failed`

A device IO operation failed.

**Also reported by:** `win.eventlog.system`

**Severity:** Warning or Debug

**Impact:** The request did not complete; the event alone does not prove damaged media or a lasting host fault.

**Consider:**

- Check the named device and status, then correlate repeated failures with controller resets and device behavior.

## `disk_paging_error`

A paging read or write to a storage device failed.

**Also reported by:** `win.eventlog.system`

**Severity:** Device data errors select Error, or Warning on removable disks and Notice on removable media. Other failed transfers remain Warning; recognized device departures remain Notice.

**Impact:** Nobody chose this IO and no application error surfaces, so this line is the only record.

**Consider:**

- Read the resolved status code and the device model. A paging failure against the boot device is a host problem. Against removable media, it is a device that vanished mid-page.

## `disk_surprise_removal`

A device disappeared without an orderly removal.

**Also reported by:** `win.eventlog.system`

**Severity:** Info on Storport551 USB or mounted-virtual-disk detaches; Warning on other removals.

**Impact:** Open handles and writes in flight were lost with it.

**Consider:**

- Read miniport_name beside removable and surprise_removal_ok. A virtual disk can report both flags false during an ordinary detach.
- Check what was writing to it.

## `filesystem_corruption`

NTFS moved this machine's global corruption-handling state off nominal.

**Also reported by:** `win.eventlog.system`

**Severity:** Error

**Impact:** This reports a state change, not confirmed damage to a file, and does not name a volume.

**Consider:**

- Schedule a chkdsk and check the backup state for that host.
- Confirm the state returns to a nominal value afterwards.

Microsoft publishes the template with no value map, so the state number ships undecoded.

## `storage_controller_reset`

The storage port driver reset the path to a device.

**Also reported by:** `win.eventlog.system`

**Severity:** Error when the device is the one the machine boots from, Warning otherwise.

**Impact:** Requests in flight were discarded. Repeated resets on a fixed controller usually precede a controller, cable, or backplane failure.

**Consider:**

- Check boot_device and miniport_name. A reset on a USB attached-storage miniport points to the enclosure. A reset on an internal miniport with boot_device true points to the host.
- Check failed_io_count and the rate.

## `storage_device_command_failed`

A storage device did not complete a command, and reported sense data saying why.

**Severity:** Info when the device is announcing a change to itself, Debug for a drive rejecting TRIM, Notice otherwise. One occurrence claims no fault.

**Impact:** The command was not carried out as issued. The driver reissues, so a single occurrence usually reaches no application.

**Consider:**

- Group by device and sense key over time. A rising count against one drive is the signal, not a single record.
- Read the sense key with the additional sense code and its qualifier. Together the three name the condition.
- Compare against the device's own health counters before planning a replacement.

Sense data is the device's own account of a failure, so it is the one place a drive's answer is recorded rather than inferred. Empty removable slots and unsupported-command probes are not kept.

## `volume_mount_failed`

NTFS could not mount a volume.

**Severity:** Warning or Info

**Impact:** The volume did not come up. The event states the attempt, not how long the condition lasted.

**Consider:**

- Read the resolved status code. If the device is offline or has no medium, look at whether a removable bay, card reader or mounted image is being polled.
- If the status is anything else, treat the volume as unavailable and pivot to the device-state stream's volume_unreadable for whether it stayed that way.
