# Windows operational events (application and system)

Application and System channels: service crashes, unexpected shutdowns, disk and driver faults that are not patching and not Security.

| Feed | What it is |
|---|---|
| `win.eventlog.system` | Disk, SCM, Kernel-Power, clustering, VSS volsnap, DCOM, WAS. |
| `win.eventlog.application` | App crashes, MSI, IIS worker, GPU TDR sibling. |
| `win.eventlog.storage` | StorPort and disk-subsystem channels: bad blocks, predicted failure, controller resets, I/O failures (`disk_failure_predicted`, `storage_controller_reset`). |
| `win.eventlog.platform` | PnP, device setup, firmware and kernel channels: devices that failed to start or install drivers (`device_start_failed`, `device_software_install_failed`). |

Open `../feeds/<id>/reasons.md` and search for the reason. Same reason on two feeds is one fact (example: `disk_failure_predicted` on System and `win.eventlog.storage`).
Explore: `../guides/stream-kinds/wel-classic.md` (`subsource` (LQL), then `origin` (LQL) on the multi-channel feeds, then `provider_name` (LQL)).

**Pivots.** Blue screens, program crashes, hangs and unexpected restarts (`kernel_crash`, `process_crash`, `os_bsod`, `unexpected_shutdown`, `app_crash`, `app_hang`): `../playbooks/crashes-and-restarts.md`. Service will not start, keeps stopping or hangs: `../playbooks/service-failures.md`. Group Policy failures, slow policy processing and preference items (System 1129 and the uncurated Group Policy errors, Application drive maps and printers): `../playbooks/group-policy.md`. File shares and mapped drives (SMB client and server on `win.eventlog.network`, `smb_delayed_write_lost` on System): `../playbooks/file-share-access.md`. Scheduled task did not run or failed (Task Scheduler on `win.eventlog.management`): `../playbooks/scheduled-task-failures.md`. WHEA errors, display driver resets, devices that fail to start or drop off, heat and power (`hardware_error_corrected`, `gpu_driver_reset`, `device_start_failed`, `thermal_cooling_engaged`): `../playbooks/hardware-faults.md`. Expired or expiring certificates, Schannel rejections, HTTPS bindings and failed autoenrollment (`service = certificates` (LQL)): `../playbooks/certificate-expiry.md`. Failing disks, controller resets, file system corruption and chkdsk, volumes gone or RAW, RAID controller and iSCSI records (`disk_bad_block`, `storage_controller_reset`, `filesystem_corruption`, `volume_unreadable`): `../playbooks/raid-or-storage-degraded.md`. Disk filling: `../playbooks/disk-full-or-filling.md`.

Patching: `windows-updates-and-patching.md`. What changed on the device before it broke: `../playbooks/what-changed.md`. Who changed it: `windows-security-and-audit.md`.

Installed products: `device-health-and-state.md`.
VSS plumbing (writers, snapshots, shadow-copy rotation): `../playbooks/windows-vss.md`.
A VSS writer failure is not proof a backup job failed; the job result lives in the backup console.
