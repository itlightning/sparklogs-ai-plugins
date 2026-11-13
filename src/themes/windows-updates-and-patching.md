---
index: Patches / CBS / DISM / Setup
---

# Windows updates and patching

Join these data feeds when the ticket is patches that did not land, or landed and then failed.
The investigation itself (which stage failed, the codes, one update or one machine): `playbooks/windows-update-failure.md`.

| Feed | What it is |
|---|---|
| `win.eventlog.management` (value) | Windows Update client and BITS channels: scans and downloads that failed (`patch_scan_failed` (value), `patch_download_failed` (value), `bits_transfer_failed` (value)), and the completed scans with the service they asked. |
| `win.eventlog.system` (value) | Windows Update install outcomes (`patch_install_failed` (value), `patch_install_deferred` (value)), recovery image servicing (`winre_servicing_failed` (value)), Secure Boot certificate servicing. |
| `win.eventlog.setup` (value) | Setup channel: per-package servicing results (`patch_install_failed` (value)) and the automatic component-store scan (`win_component_store_corruption` (value)). |
| `win.servicing.cbs` (value) | CBS.log: component-store damage from detection to repair, servicing stack refusals, restart-deferred commits. |
| `win.servicing.dism` (value) | dism.log: health and repair commands run, failed commands and feature changes. |
| `win.eventlog.apps` (value) | Store app (AppX) deployment and provisioning (`appx_deployment_failed` (value)). |
| `win.eventlog.application` (value) | Windows Installer results (`win_msi_operation_failed` (value)). |

Windows Update agent snapshot: `sparklogs.device.state` (value) topic `windows_update_agent_state` (value). Pending restart and OS revision on `system_info` (value). Inventory and state, not the Setup channel.
Explore Setup vs CBS/DISM vs state: `guides/stream-kinds.md`.

**Join.** `win_component_store_corruption` (value) is the same fact on Setup and CBS. Pivot `sparklogs.reason = win_component_store_corruption` (LQL) across those feeds. Do not treat two rows as two incidents.

Defender is `themes/endpoint-protection.md`. Device CPU/disk is `themes/device-health-and-state.md`.
