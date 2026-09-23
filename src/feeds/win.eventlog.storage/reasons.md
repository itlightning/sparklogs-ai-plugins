<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.storage`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `disk_bad_block` | `storage` | Serious when the bus proves the device is fixed to the machine, Warning otherwise. Info on removable media taken away mid-IO, which is not a fault. | benign possible |
| `disk_failure_predicted` | `storage` | Warning |  |
| `disk_paging_error` | `storage` | Error when the device returned a data error, which is the medium failing. Warning otherwise. |  |
| `disk_surprise_removal` | `storage` | Warning |  |
| `filesystem_corruption` | `storage` | Error |  |
| `storage_controller_reset` | `storage` | Error when the device is the one the machine boots from, Warning otherwise. |  |
| `storage_device_command_failed` | `storage` | Info when the device is announcing a change to itself, Notice otherwise. One occurrence claims no fault. |  |
| `volume_mount_failed` | `storage` | Warning or Info | benign possible |

## `disk_bad_block`

A storage device returned a fault instead of the data.

**Also reported by:** `win.eventlog.system`

**Severity:** Serious when the bus proves the device is fixed to the machine, Warning otherwise. Info on removable media taken away mid-IO, which is not a fault.

**Impact:** The file did not come back, and the drive is consuming its spare-block reserve.

**Consider:**

- Read the drive's health counters.
- Plan replacement, not repair. Bad blocks do not heal: they are remapped while spares remain and lost when they do not.

The file NTFS names is not shown here. It carries user document paths.

## `disk_failure_predicted`

A storage device reported that its own reliability is degraded or that it has passed its rated write endurance.

**Severity:** Warning

**Impact:** The drive still serves IO. It is reporting wear before reads or writes start failing.

**Consider:**

- Plan a replacement window: the drive is working and the warning is early.
- Check the backup state for the host before scheduling anything on it.
- Read the endurance percentages together: consumed endurance above the device's own threshold is the claim.

## `disk_paging_error`

A paging read or write to a storage device failed.

**Also reported by:** `win.eventlog.system`

**Severity:** Error when the device returned a data error, which is the medium failing. Warning otherwise.

**Impact:** Nobody chose this IO and no application error surfaces, so this line is the only record.

**Consider:**

- Read the resolved status code and the device model. A paging failure against the boot device is a host problem. Against removable media, it is a device that vanished mid-page.

## `disk_surprise_removal`

A device disappeared without an orderly removal.

**Also reported by:** `win.eventlog.system`

**Severity:** Warning

**Impact:** Open handles and writes in flight were lost with it.

**Consider:**

- Check removable and surprise_removal_ok. A device with both false vanished through a path failure, not a user action.
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

**Severity:** Info when the device is announcing a change to itself, Notice otherwise. One occurrence claims no fault.

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
