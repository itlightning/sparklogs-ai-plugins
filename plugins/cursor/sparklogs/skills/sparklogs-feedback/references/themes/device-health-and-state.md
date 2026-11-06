# Device health and state

Use `query_device_health` for agent-reported conditions, inventories and measurements from `sparklogs.device.state`.

- One device or a few over a window: `view` (arg) `device_overview` (CPU, memory, disk, processes, storage, episodes and changes) or `device_network` (link, Wi-Fi, probes, TCP by route, connections, network events). Start here and drill down from what the reading points at.
- Process charts: `view` (arg) `top_processes_over_time`, with `rank_by` (arg).
- Installed software and latest subject readings: `latest_state`.
- Raw performance, memory and storage samples: `series`.
- Available topics and sampled fields: `topics`.
- Episode history: `event_timeline`. Omit the view for the latest event of each episode or occurrence.

Read `../guides/device-state-fields.md` for the device views, inventory observation time, multipart identity and limits on absence claims.
Use `../guides/stream-kinds/device-state.md` for chart and field-query recipes.
If the visible tool description omits details you need, `server_info` with `describe_tool: "query_device_health"` returns the full reference.

Collection status and `agent_complete_through` (col) qualify coverage.
An open condition alone does not establish a problem; read its severity and lifecycle.
Use `query_logs` for underlying application or system events, scoped to the device and interval the health reading named.
A VSS writer failure does not establish a backup job's outcome: follow `../playbooks/backup-failure.md` for that investigation.

Use `sparklogs.agent.vector` and `sparklogs.agent.log` when diagnosing SparkLogs collection.
