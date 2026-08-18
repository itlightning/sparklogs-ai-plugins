# Device health and state

What is on the box and what is holding or changing: CPU, RAM, disk, installed software, monitors, episodes, deltas.

**Primary data feed:** `sparklogs.agent.state`. Tool: `query_device_health` (kinds and fieldsets). Use this as the **headline** when the question is device state.

`sparklogs.agent.vector` and `sparklogs.agent.log` are collector-debug only. Use them when diagnosing SparkLogs collection, not as the answer to "is the disk filling."

Until `query_device_state` exists, inventory and snapshot fieldsets on `query_device_health` are the surface (performance, storage_io, disk_volumes, processes, services, agent_self_resource, pending_reboot, installed products, crash dump config, VSS writers, Windows Update agent state).

**Honesty (supporting).** `agent_complete_through` and collection liveness decide what you may say about a gap. Open monitor ≠ problem (`${CLAUDE_PLUGIN_ROOT}/guides/category-classes.md`). Duration and clear time: `${CLAUDE_PLUGIN_ROOT}/guides/device-state-fields.md` (`episode_age_basis`, `episode_clear_time_basis`).

**Pivots.** Disk filling: monitor reasons on this feed, then logs only if you need a timeline. Named backup product: this theme for what is installed; writer-failed is not the job verdict. Full walk: `${CLAUDE_PLUGIN_ROOT}/playbooks/backup-failure.md`.
