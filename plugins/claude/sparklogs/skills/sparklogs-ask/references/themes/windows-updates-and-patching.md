# Windows updates and patching

Join these data feeds when the ticket is patches that did not land, or landed and then failed.

| Feed | What it is |
|---|---|
| `win.eventlog.setup` | Setup channel: package target-state failures (`win_servicing_package_state_change_failed`), component-store scan (`win_component_store_scan_found_corruption`). |
| `win.servicing.cbs` | CBS.log: realized store corruption, servicing operations. |
| `win.servicing.dism` | DISM.log: repair and image servicing. |

Windows Update agent snapshot: `sparklogs.agent.state` topic `windows_update_agent_state`. Open `../feeds/sparklogs.agent.state/` only after this theme. That is inventory/state, not the Setup channel.
Explore Setup vs CBS/DISM vs state: `../guides/stream-kinds.md`.

**Join.** `win_component_store_scan_found_corruption` is the same fact on Setup and CBS. Pivot `sparklogs.reason = win_component_store_scan_found_corruption` across those feeds; do not treat two rows as two incidents.

**Pivots.** Consecutive failed cycles beat a single Setup/3. Read `../feeds/<id>/reasons.md` for the reason, then counts grouped by `sparklogs.reason` (LQL). HRESULT lives on Setup fields (`../feeds/win.eventlog.setup/fields.md`).

Defender is `endpoint-protection.md`. Device CPU/disk is `device-health-and-state.md`.
