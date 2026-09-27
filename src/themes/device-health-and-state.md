---
index: CPU, RAM, disk, installed software, monitors
aliases:
  - label: Named backup product (Veeam etc.)
    note: installed products. Not operational events.
---

# Device health and state

Use `query_device_health` (tool) for agent-reported conditions, inventories and measurements from `sparklogs.device.state` (value).

- Process charts: `view` (arg) `top_processes_over_time` (value), with `rank_by` (arg).
- Installed software and latest subject readings: `latest_state` (value).
- Raw performance, memory and storage samples: `series` (value).
- Available topics and sampled fields: `topics` (value).
- Episode history: `event_timeline` (value). Omit the view for the latest event of each episode or occurrence.

Read `guides/device-state-fields.md` for inventory observation time, multipart identity and limits on absence claims.
Use `guides/stream-kinds/device-state.md` for chart and field-query recipes.
If the visible tool description omits details you need, `server_info` (tool) with `describe_tool: "query_device_health"` returns the full reference.

Collection status and `agent_complete_through` (col) qualify coverage.
An open condition alone does not establish a problem; read its severity and lifecycle.
Use `query_logs` (tool) for underlying application or system events.
A VSS writer failure does not establish a backup job's outcome: follow `playbooks/backup-failure.md` for that investigation.

Use `sparklogs.agent.vector` (value) and `sparklogs.agent.log` (value) when diagnosing SparkLogs collection.
