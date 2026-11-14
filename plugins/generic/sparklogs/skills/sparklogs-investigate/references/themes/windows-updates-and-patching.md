# Windows updates and patching

Join these data feeds when the ticket is patches that did not land, or landed and then failed.
The investigation itself (which stage failed, the codes, one update or one machine): `../playbooks/windows-update-failure.md`.

| Feed | What it is |
|---|---|
| `win.eventlog.management` | Windows Update client and BITS channels: scans and downloads that failed (`patch_scan_failed`, `patch_download_failed`, `bits_transfer_failed`), and the completed scans with the service they asked. |
| `win.eventlog.system` | Windows Update install outcomes (`patch_install_failed`, `patch_install_deferred`), recovery image servicing (`winre_servicing_failed`), Secure Boot certificate servicing. |
| `win.eventlog.setup` | Setup channel: per-package servicing results (`patch_install_failed`) and the automatic component-store scan (`win_component_store_corruption`). |
| `win.servicing.cbs` | CBS.log: component-store damage from detection to repair, servicing stack refusals, restart-deferred commits. |
| `win.servicing.dism` | dism.log: health and repair commands run, failed commands and feature changes. |
| `win.eventlog.apps` | Store app (AppX) deployment and provisioning (`appx_deployment_failed`). |
| `win.eventlog.application` | Windows Installer results (`win_msi_operation_failed`). |

Windows Update agent snapshot: `sparklogs.device.state` topic `windows_update_agent_state`. Pending restart and OS revision on `system_info`. Inventory and state, not the Setup channel.
Explore Setup vs CBS/DISM vs state: `../guides/stream-kinds.md`.

**Join.** `win_component_store_corruption` is the same fact on Setup and CBS. Pivot `sparklogs.reason = win_component_store_corruption` (LQL) across those feeds. Do not treat two rows as two incidents.

Defender is `endpoint-protection.md`. Device CPU/disk is `device-health-and-state.md`.
