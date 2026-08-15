# Device health and state

What is on the box and what is holding or changing: CPU, RAM, disk, installed software, monitors, episodes, deltas.

**Primary data feed:** `sparklogs.agent.state`.

`sparklogs.agent.vector` and `sparklogs.agent.log` are collector-debug only. Use them when diagnosing SparkLogs collection, not as the headline for device health.

Use `query_device_health` (kinds and fieldsets) until `query_device_state` exists.
