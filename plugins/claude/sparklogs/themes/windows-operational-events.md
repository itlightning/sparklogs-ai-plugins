# Windows operational events (application and system)

Application and System channels: service crashes, unexpected shutdowns, disk and driver faults that are not patching and not Security.

| Feed | What it is |
|---|---|
| `win.eventlog.system` | Disk, SCM, Kernel-Power, clustering, VSS volsnap, DCOM, WAS. |
| `win.eventlog.application` | App crashes, MSI, IIS worker, GPU TDR sibling. |

Open `${CLAUDE_PLUGIN_ROOT}/feeds/<id>/reasons.md` and search the slug. Same slug on two channels is one fact (example: `iis_worker_crash` System WAS / Application IIS).
Explore: `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-classic.md` (`subsource` (LQL), then `provider_name` (LQL)).

**Pivots.** Service will not stay up: `service_crashed`, `service_start_failed`, `service_hang`. Disk filling is state (`${CLAUDE_PLUGIN_ROOT}/themes/device-health-and-state.md`) plus these disk reasons if the stream shows IO faults.

Patching: `${CLAUDE_PLUGIN_ROOT}/themes/windows-updates-and-patching.md`. Who changed it: `${CLAUDE_PLUGIN_ROOT}/themes/windows-security-and-audit.md`.

A named backup product job failed is not this theme.
Installed products: `${CLAUDE_PLUGIN_ROOT}/themes/device-health-and-state.md`.
Job outcome: `${CLAUDE_PLUGIN_ROOT}/playbooks/backup-failure.md`.
VSS plumbing (writers, snapshots, shadow-copy rotation): `${CLAUDE_PLUGIN_ROOT}/playbooks/windows-vss.md`.
A VSS writer failure is not proof the backup product failed.
