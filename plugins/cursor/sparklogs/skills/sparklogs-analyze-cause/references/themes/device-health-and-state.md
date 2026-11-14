# Device health and state

Use `query_device_health` for agent-reported conditions, inventories and measurements from `sparklogs.device.state`.

One device or a few over a window: start with `view` (arg) `device_overview` or `device_network`, and drill down from what the reading points at.
Across a client or the fleet: omit `view` (arg) for open conditions, `group_by_reason` (arg) for device counts, `fleet_processes` and `fleet_performance` for outliers.
Every view and when to use it: `../guides/device-state-fields.md` (**Choose the view**), which also covers inventory observation time, multipart identity and limits on absence claims.
Use `../guides/stream-kinds/device-state.md` for chart and field-query recipes.
Crashes, blue screens and unexpected restarts (topics `crashes`, `kernel_crashes`, `app_crashes`, `crash_dump_config`, `lifecycle`): `../playbooks/crashes-and-restarts.md`.
If the visible tool description omits details you need, `server_info` with `describe_tool: "query_device_health"` returns the full reference.

Collection status and `agent_complete_through` (col) qualify coverage.
An open condition alone does not establish a problem; read its severity and lifecycle.
A slow or freezing device (CPU, interrupt and kernel time, throttling, paging, committed memory, disk latency, boot and shutdown time): `../playbooks/slow-device.md`.
Devices with a Device Manager problem (topic `devices`), the drivers and heat behind interrupt storms and throttling, and memory or CPU that changed: `../playbooks/hardware-faults.md`.
A volume full or filling: `../playbooks/disk-full-or-filling.md`.
A process whose memory or handles grow until a restart: `../playbooks/memory-or-handle-leak.md`.
Internet, Wi-Fi or the local network down, slow or dropping: `../playbooks/network-connectivity.md`.
One application slow or stalling over the network while others work: `../playbooks/application-network-stall.md`.
Changes on a device before an onset (drivers, products, services, adapters, firmware): `../playbooks/what-changed.md`.
Use `query_logs` for underlying application or system events, scoped to the device and interval the health reading named.
A VSS writer failure does not establish a backup job's outcome; the job result lives in the backup console.

Use `sparklogs.agent.vector` and `sparklogs.agent.log` when diagnosing SparkLogs collection.
