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

**Pivots.** Service will not stay up: `service_crashed` (value), `service_start_failed` (value), `service_hang` (value). Disk filling is state (`themes/device-health-and-state.md`) plus these disk reasons if the stream shows IO faults.

Patching: `themes/windows-updates-and-patching.md`. What changed on the device before it broke: `playbooks/what-changed.md`. Who changed it: `themes/windows-security-and-audit.md`.

Installed products: `themes/device-health-and-state.md`.
VSS plumbing (writers, snapshots, shadow-copy rotation): `playbooks/windows-vss.md`.
A VSS writer failure is not proof a backup job failed; the job result lives in the backup console.
