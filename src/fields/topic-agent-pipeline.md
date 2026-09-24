<!-- GENERATED reference. Do not hand-edit. -->
# Agent pipeline fields

Full inventory on its own schedule; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.agent_pipeline.cpu_pct_of_one_core_avg` | float | percent | This process's average share of one CPU core over the window, from its CPU time over the wall time elapsed: exact, and needs no frequency reference. |
| `sparklogs.data.agent_pipeline.cpu_pct_of_one_core_p95` | float | percent | The 95th percentile of this process's share of one CPU core, across the per-tick readings the window holds. |
| `sparklogs.data.agent_pipeline.working_set_avg_mb` | float | megabytes | This process's average working set over the window. |
| `sparklogs.data.agent_pipeline.spool_dir_bytes` | integer | bytes | How many bytes the agent's event spool currently holds. |
| `sparklogs.data.agent_pipeline.spool_pct_of_cap` | float | percent | The spool's size as a percentage of its cap. Not clamped at 100: the cap is enforced after a write, so a reading can legitimately sit just over it. |
| `sparklogs.data.agent_pipeline.spool_growth_mb_per_h` | float | megabytes_per_hour | The spool's growth rate, fitted from its recent size readings. |
| `sparklogs.data.agent_pipeline.spool_last_drained_at` | string | timestamp | The last instant the pipeline was known to be caught up. Absent when no such instant has ever been observed. |
