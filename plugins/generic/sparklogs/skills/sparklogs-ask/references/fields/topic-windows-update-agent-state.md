<!-- GENERATED reference. Do not hand-edit. -->
# Windows Update status

One row per machine: whether Windows Update is paused and for how long, how long since it last checked for updates successfully, whether it has never checked, and the Windows Update service's startup type; it lists no installed or missing updates.

**Use when:** a machine is not getting patches, updates look paused, or the Windows Update service may be disabled.

A disabled Windows Update service is reported as a changed setting, not an alert; alerts come from a long pause or a long stretch with no successful check.

Full inventory every 6 hours. Changes are reported between inventories.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.windows_update_agent_state.updates_paused` | bool |  | Whether Windows Update is paused on this machine. |
| `sparklogs.data.windows_update_agent_state.updates_paused_age_h` | float | hours | How long Windows Update has been paused. Absent when the pause start time could not be read. |
| `sparklogs.data.windows_update_agent_state.last_scan_age_h` | float | hours | How long since Windows Update last finished checking for updates. |
| `sparklogs.data.windows_update_agent_state.wu_never_searched` | bool |  | Whether Windows Update has never checked for updates: no last-check date from Windows Update or the registry. False when the last check is dated. Absent when the check time could not be read. |
| `sparklogs.data.windows_update_agent_state.wuauserv_start_type` | string |  | The start type of the Windows Update service: `boot`, `system`, `auto`, `auto_delayed`, `manual` or `disabled`, or `missing` when the service is not installed. Absent when the service configuration could not be read. |
| `sparklogs.data.windows_update_agent_state.patch_updates_paused_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
