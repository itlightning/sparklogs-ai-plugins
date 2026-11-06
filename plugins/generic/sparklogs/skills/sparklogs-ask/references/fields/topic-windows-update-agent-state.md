<!-- GENERATED reference. Do not hand-edit. -->
# Update agent state fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.windows_update_agent_state.updates_paused` | bool |  | Whether Windows Update is paused on this machine. |
| `sparklogs.data.windows_update_agent_state.updates_paused_age_h` | float | hours | How long Windows Update has been paused. Absent when the pause start time could not be read. |
| `sparklogs.data.windows_update_agent_state.last_scan_age_h` | float | hours | How long since Windows Update last finished checking for updates. |
| `sparklogs.data.windows_update_agent_state.wu_never_searched` | bool |  | Whether Windows Update has never checked for updates: no last-check date from Windows Update or the registry. False when the last check is dated. Absent when the check time could not be read. |
| `sparklogs.data.windows_update_agent_state.wuauserv_start_type` | string |  | The start type of the Windows Update service: `boot`, `system`, `auto`, `auto_delayed`, `manual` or `disabled`, or `missing` when the service is not installed. Absent when the service configuration could not be read. |
| `sparklogs.data.windows_update_agent_state.patch_updates_paused_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
