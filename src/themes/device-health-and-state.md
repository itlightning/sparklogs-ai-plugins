---
index: CPU, RAM, disk, installed software, monitors
aliases:
  - label: Named backup product (Veeam etc.)
    note: installed products. Not operational events.
---

# Device health and state

What is on the box and what is holding or changing: CPU, RAM, disk, installed software, monitors, episodes, deltas.

**Primary data feed:** `sparklogs.agent.state` (value). Tool: `query_device_health` (tool) (kinds and fieldsets). Use this as the **headline** when the question is device state.
Explore this feed as device state, not WEL: `guides/stream-kinds/device-state.md`.

`sparklogs.agent.vector` (value) and `sparklogs.agent.log` (value) are collector-debug only. Use them when diagnosing SparkLogs collection, not as the answer to "is the disk filling."

Until `query_device_state` (other) exists, inventory and snapshot fieldsets on `query_device_health` (tool) are the surface (performance, storage_io, disk_volumes, processes, services, agent_self_resource, pending_reboot, installed products, crash dump config, VSS writers, Windows Update agent state).

**Honesty (supporting).** `agent_complete_through` (col) and collection liveness decide what you may say about a gap. Open monitor ≠ problem (`guides/category-classes.md`). Duration and clear time: `guides/device-state-fields.md` (`episode_age_basis` (col), `episode_clear_time_basis` (col)).

**Pivots.** Disk filling: monitor reasons on this feed, then logs only if you need a timeline. Named backup product: this theme for what is installed; writer-failed is not the job verdict. Full walk: `playbooks/backup-failure.md`.
