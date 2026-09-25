<!-- GENERATED reference. Do not hand-edit. -->
# Windows Update agent state fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.windows_update_agent_state.updates_paused` | bool |  | Whether Windows Update is currently paused on this host. |
| `sparklogs.data.windows_update_agent_state.updates_paused_age_h` | float | hours | How long the pause has been in force. Absent when the pause start stamp is present but cannot be parsed, which leaves the posture on the row and the duration unclaimed. |
| `sparklogs.data.windows_update_agent_state.last_scan_age_h` | float | hours | How long since Windows Update last completed a scan for updates. |
| `sparklogs.data.windows_update_agent_state.wuauserv_start_type` | string |  | The start type configured for the Windows Update service: `boot`, `system`, `auto`, `auto_delayed`, `manual` or `disabled`. Absent when the configuration could not be read, never a reassuring default. |
| `sparklogs.data.windows_update_agent_state.patch_updates_paused_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
