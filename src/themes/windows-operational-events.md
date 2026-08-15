# Windows operational events (application and system)

Application and System channels: service crashes, unexpected shutdowns, disk and driver faults that are not patching and not Security.

| Feed | What it is |
|---|---|
| `win.eventlog.system` | Disk, SCM, Kernel-Power, clustering, VSS volsnap, DCOM, WAS. |
| `win.eventlog.application` | App crashes, MSI, IIS worker, GPU TDR sibling. |

Open `feeds/<id>/reasons.md` and search the slug. Same slug on two channels is one fact (example: `iis_worker_crash` System WAS / Application IIS).

**Pivots.** Service will not stay up: `service_crashed`, `service_start_failed`, `service_hang`. Disk filling is state (`themes/device-health-and-state.md`) plus these disk reasons if the stream shows IO faults.

Patching: `themes/windows-updates-and-patching.md`. Who changed it: `themes/windows-security-and-audit.md`.
