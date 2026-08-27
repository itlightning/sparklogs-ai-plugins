---
index: App / System crashes and services
---

# Windows operational events (application and system)

Application and System channels: service crashes, unexpected shutdowns, disk and driver faults that are not patching and not Security.

| Feed | What it is |
|---|---|
| `win.eventlog.system` (value) | Disk, SCM, Kernel-Power, clustering, VSS volsnap, DCOM, WAS. |
| `win.eventlog.application` (value) | App crashes, MSI, IIS worker, GPU TDR sibling. |

Open `feeds/<id>/reasons.md` and search the slug. Same slug on two channels is one fact (example: `iis_worker_crash` (value) System WAS / Application IIS).
Explore: `guides/stream-kinds/wel-classic.md` (`subsource` (LQL), then `provider_name` (LQL)).

**Pivots.** Service will not stay up: `service_crashed` (value), `service_start_failed` (value), `service_hang` (value). Disk filling is state (`themes/device-health-and-state.md`) plus these disk reasons if the stream shows IO faults.

Patching: `themes/windows-updates-and-patching.md`. Who changed it: `themes/windows-security-and-audit.md`.

A named backup product job failed is not this theme.
Installed products: `themes/device-health-and-state.md`.
Job outcome: `playbooks/backup-failure.md`.
VSS plumbing (writers, snapshots, shadow-copy rotation): `playbooks/windows-vss.md`.
A VSS writer failure is not proof the backup product failed.
