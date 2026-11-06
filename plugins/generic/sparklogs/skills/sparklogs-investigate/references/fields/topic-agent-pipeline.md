<!-- GENERATED reference. Do not hand-edit. -->
# Agent pipeline fields

Full inventory on its own schedule. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.agent_pipeline.agent_version` | string |  | The agent version, such as 1.14.9, without build details. |
| `sparklogs.data.agent_pipeline.agent_build` | string |  | The agent version plus the source commit it was built from. A `.dirty` suffix marks a build from modified source. |
| `sparklogs.data.agent_pipeline.cpu_pct_of_one_core_avg` | float | percent | The agent's and Vector's average CPU use over the last several minutes added together, as a percentage of one logical core. Can exceed 100: two busy cores read 200. |
| `sparklogs.data.agent_pipeline.cpu_pct_of_one_core_p95` | float | percent | The 95th percentile of the agent's and Vector's combined CPU use over the last several minutes, as a percentage of one logical core. Can exceed 100: two busy cores read 200. |
| `sparklogs.data.agent_pipeline.working_set_avg_bytes` | integer | bytes | The agent's and Vector's average working sets over the last several minutes added together. |
| `sparklogs.data.agent_pipeline.spool_dir_bytes` | integer | bytes | The size of the agent's event spool on disk. |
| `sparklogs.data.agent_pipeline.spool_pct_of_cap` | float | percent | The spool's size as a percentage of its size limit. Can briefly exceed 100, because the limit is applied after each write. |
| `sparklogs.data.agent_pipeline.spool_growth_mb_per_h` | float | megabytes_per_hour | How fast the spool is growing per hour, fitted from its recent sizes; negative while it drains. |
| `sparklogs.data.agent_pipeline.spool_last_drained_at` | string | timestamp | The time up to which every feed has read all its events: the oldest of the feeds' last caught-up times. Absent while any feed has never been seen caught up. |
| `sparklogs.data.agent_pipeline.tables_pct_of_cap_max` | float | percent | How full the fullest of Vector's saved duplicate and throttle tables is, as a percentage of its size limit. A full table forgets its oldest entries, so repeats of those events pass again. Absent when Vector keeps no such table. |
| `sparklogs.data.agent_pipeline.tables_evictions` | integer | count | How many entries Vector's saved duplicate and throttle tables forgot to stay under their size limits, across all tables, since Vector last started. Absent when Vector keeps no such table. |
