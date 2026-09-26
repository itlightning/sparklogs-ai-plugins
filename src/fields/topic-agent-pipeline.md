<!-- GENERATED reference. Do not hand-edit. -->
# Agent pipeline fields

Full inventory on its own schedule. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.agent_pipeline.agent_version` | string |  | The agent version, plain semver, without build metadata. |
| `sparklogs.data.agent_pipeline.agent_build` | string |  | The agent build: semver plus the commit this binary was built from. `.dirty` means the tree was modified. |
| `sparklogs.data.agent_pipeline.cpu_pct_of_one_core_avg` | float | percent | Mean of the combined agent and Vector CPU percentages measured between consecutive captures, relative to one logical core. Includes whichever processes were measured in each interval. |
| `sparklogs.data.agent_pipeline.cpu_pct_of_one_core_p95` | float | percent | 95th percentile of the combined agent and Vector CPU percentages between captures, relative to one logical core. |
| `sparklogs.data.agent_pipeline.working_set_avg_bytes` | integer | bytes | Sum of the agent and Vector mean resident working sets over the window. Includes available readings. |
| `sparklogs.data.agent_pipeline.spool_dir_bytes` | integer | bytes | How many bytes the agent's event spool currently holds. |
| `sparklogs.data.agent_pipeline.spool_pct_of_cap` | float | percent | Spool size as a percentage of its limit. May exceed 100 because the limit is enforced after a write. |
| `sparklogs.data.agent_pipeline.spool_growth_mb_per_h` | float | megabytes_per_hour | The spool's growth rate in MiB (1,048,576 bytes) per hour, fitted from its recent size readings. |
| `sparklogs.data.agent_pipeline.spool_last_drained_at` | string | timestamp | The last instant the pipeline was known to be caught up. Absent when no such instant has ever been observed. |
