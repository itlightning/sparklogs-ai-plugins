# Windows updates and patching

Join these data feeds when the ticket is patches that did not land, or landed and then failed.

| Feed | What it is |
|---|---|
| `win.eventlog.setup` | Setup channel: package target-state failures (`patch_servicing_failed`), component-store scan (`store_corruption`). |
| `win.servicing.cbs` | CBS.log: realized store corruption, servicing operations. |
| `win.servicing.dism` | DISM.log: repair and image servicing. |

Windows Update agent snapshot: `sparklogs.agent.state` topic `windows_update_agent_state`. Open `feeds/sparklogs.agent.state/` only after this theme. That is inventory/state, not the Setup channel.

**Join.** `store_corruption` is the same fact on Setup and CBS. Pivot `sparklogs.reason = store_corruption` across those feeds; do not treat two rows as two incidents.

**Pivots.** Consecutive failed cycles beat a single Setup/3. Read `feeds/<id>/reasons.md` for the slug, then counts grouped by `sparklogs.reason`. HRESULT lives on Setup fields (`feeds/win.eventlog.setup/fields.md`).

Defender is `themes/endpoint-protection.md`. Device CPU/disk is `themes/device-health-and-state.md`.
