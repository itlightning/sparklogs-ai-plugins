---
index: CPU, RAM, disk, network, installed software, monitors
aliases:
  - label: Named backup product (Veeam etc.)
    note: installed products. Not operational events.
---

# Device health and state

Use `query_device_health` (tool) for agent-reported conditions, inventories and measurements from `sparklogs.device.state` (value).

One device or a few over a window: start with `view` (arg) `device_overview` (value) or `device_network` (value), and drill down from what the reading points at.
Across a client or the fleet: omit `view` (arg) for open conditions, `group_by_reason` (arg) for device counts, `fleet_processes` (value) and `fleet_performance` (value) for outliers.
Every view and when to use it: `guides/device-state-fields.md` (**Choose the view**), which also covers inventory observation time, multipart identity and limits on absence claims.
Use `guides/stream-kinds/device-state.md` for chart and field-query recipes.
Crashes, blue screens and unexpected restarts (topics `crashes` (value), `kernel_crashes` (value), `app_crashes` (value), `crash_dump_config` (value), `lifecycle` (value)): `playbooks/crashes-and-restarts.md`.
If the visible tool description omits details you need, `server_info` (tool) with `describe_tool: "query_device_health"` returns the full reference.

Collection status and `agent_complete_through` (col) qualify coverage.
An open condition alone does not establish a problem; read its severity and lifecycle.
A slow or freezing device (CPU, interrupt and kernel time, throttling, paging, committed memory, disk latency, boot and shutdown time): `playbooks/slow-device.md`.
Devices with a Device Manager problem (topic `devices` (value)), the drivers and heat behind interrupt storms and throttling, and memory or CPU that changed: `playbooks/hardware-faults.md`.
Changes on a device before an onset (drivers, products, services, adapters, firmware): `playbooks/what-changed.md`.
Use `query_logs` (tool) for underlying application or system events, scoped to the device and interval the health reading named.
A VSS writer failure does not establish a backup job's outcome; the job result lives in the backup console.

Use `sparklogs.agent.vector` (value) and `sparklogs.agent.log` (value) when diagnosing SparkLogs collection.
