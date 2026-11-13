---
index: App / System crashes and services
---

# Windows operational events (application and system)

Application and System channels: service crashes, unexpected shutdowns, disk and driver faults that are not patching and not Security.

| Feed | What it is |
|---|---|
| `win.eventlog.system` (value) | Disk, SCM, Kernel-Power, clustering, VSS volsnap, DCOM, WAS. |
| `win.eventlog.application` (value) | App crashes, MSI, IIS worker, GPU TDR sibling. |
| `win.eventlog.storage` (value) | StorPort and disk-subsystem channels: bad blocks, predicted failure, controller resets, I/O failures (`disk_failure_predicted` (value), `storage_controller_reset` (value)). |
| `win.eventlog.platform` (value) | PnP, device setup, firmware and kernel channels: devices that failed to start or install drivers (`device_start_failed` (value), `device_software_install_failed` (value)). |

Open `feeds/<id>/reasons.md` and search for the reason. Same reason on two feeds is one fact (example: `disk_failure_predicted` (value) on System and `win.eventlog.storage` (value)).
Explore: `guides/stream-kinds/wel-classic.md` (`subsource` (LQL), then `origin` (LQL) on the multi-channel feeds, then `provider_name` (LQL)).

**Pivots.** Blue screens, program crashes, hangs and unexpected restarts (`kernel_crash` (value), `process_crash` (value), `os_bsod` (value), `unexpected_shutdown` (value), `app_crash` (value), `app_hang` (value)): `playbooks/crashes-and-restarts.md`. Service will not start, keeps stopping or hangs: `playbooks/service-failures.md`. Group Policy failures, slow policy processing and preference items (System 1129 and the uncurated Group Policy errors, Application drive maps and printers): `playbooks/group-policy.md`. File shares and mapped drives (SMB client and server on `win.eventlog.network` (value), `smb_delayed_write_lost` (value) on System): `playbooks/file-share-access.md`. Scheduled task did not run or failed (Task Scheduler on `win.eventlog.management` (value)): `playbooks/scheduled-task-failures.md`. WHEA errors, display driver resets, devices that fail to start or drop off, heat and power (`hardware_error_corrected` (value), `gpu_driver_reset` (value), `device_start_failed` (value), `thermal_cooling_engaged` (value)): `playbooks/hardware-faults.md`. Expired or expiring certificates, Schannel rejections, HTTPS bindings and failed autoenrollment (`service = certificates` (LQL)): `playbooks/certificate-expiry.md`. Failing disks, controller resets, file system corruption and chkdsk, volumes gone or RAW, RAID controller and iSCSI records (`disk_bad_block` (value), `storage_controller_reset` (value), `filesystem_corruption` (value), `volume_unreadable` (value)): `playbooks/raid-or-storage-degraded.md`. Disk filling: `playbooks/disk-full-or-filling.md`.

Patching: `themes/windows-updates-and-patching.md`. What changed on the device before it broke: `playbooks/what-changed.md`. Who changed it: `themes/windows-security-and-audit.md`.

Installed products: `themes/device-health-and-state.md`.
VSS plumbing (writers, snapshots, shadow-copy rotation): `playbooks/windows-vss.md`.
A VSS writer failure is not proof a backup job failed; the job result lives in the backup console.
