<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `sparklogs.agent.state`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

This source has no named provider payload, so there is no field-shaped raw fallback.
A value that is not promoted here lives in the retained message text and nowhere else.

## Module fields

Stored flat under the `sparklogs.agent.state.` prefix.

| LQL path | Type | Meaning |
|---|---|---|

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `agent_handle_leak_trend` / `held` | n/a | **fields: none** |
| `agent_handle_leak_trend` / `onset` | n/a | **fields: none** |
| `agent_handle_leak_trend` / `recovered` | n/a | **fields: none** |
| `agent_memory_leak_trend` / `held` | n/a | **fields: none** |
| `agent_memory_leak_trend` / `onset` | n/a | **fields: none** |
| `agent_memory_leak_trend` / `recovered` | n/a | **fields: none** |
| `agent_memory_over_budget` / `held` | n/a | **fields: none** |
| `agent_memory_over_budget` / `onset` | n/a | **fields: none** |
| `agent_memory_over_budget` / `recovered` | n/a | **fields: none** |
| `agent_over_budget` / `held` | n/a | **fields: none** |
| `agent_over_budget` / `onset` | n/a | **fields: none** |
| `agent_over_budget` / `recovered` | n/a | **fields: none** |
| `agent_restart_flapping` / `held` | n/a | **fields: none** |
| `agent_restart_flapping` / `onset` | n/a | **fields: none** |
| `agent_restart_flapping` / `recovered` | n/a | **fields: none** |
| `auto_service_not_running` / `held` | n/a | **fields: none** |
| `auto_service_not_running` / `onset` | n/a | **fields: none** |
| `auto_service_not_running` / `recovered` | n/a | **fields: none** |
| `bitlocker_protection_dropped` / `held` | n/a | **fields: none** |
| `bitlocker_protection_dropped` / `onset` | n/a | **fields: none** |
| `bitlocker_protection_dropped` / `recovered` | n/a | **fields: none** |
| `bsod_recurring` / `default` | n/a | **fields: none** |
| `clock_drift` / `held` | n/a | **fields: none** |
| `clock_drift` / `onset` | n/a | **fields: none** |
| `clock_drift` / `recovered` | n/a | **fields: none** |
| `cloud_unreachable` / `held` | n/a | **fields: none** |
| `cloud_unreachable` / `onset` | n/a | **fields: none** |
| `cloud_unreachable` / `recovered` | n/a | **fields: none** |
| `cpu_busy_sustained` / `default` | n/a | **fields: none** |
| `cpu_runaway_process` / `held` | n/a | **fields: none** |
| `cpu_runaway_process` / `onset` | n/a | **fields: none** |
| `cpu_runaway_process` / `recovered` | n/a | **fields: none** |
| `cpu_saturated_queueing` / `held` | n/a | **fields: none** |
| `cpu_saturated_queueing` / `onset` | n/a | **fields: none** |
| `cpu_saturated_queueing` / `recovered` | n/a | **fields: none** |
| `crash_dump_disabled` / `default` | n/a | **fields: none** |
| `crash_dump_new` / `default` | n/a | **fields: none** |
| `data_volume_space_low` / `held` | n/a | **fields: none** |
| `data_volume_space_low` / `onset` | n/a | **fields: none** |
| `data_volume_space_low` / `recovered` | n/a | **fields: none** |
| `dump_pagefile_too_small` / `default` | n/a | **fields: none** |
| `fill_rate_high` / `default` | n/a | **fields: none** |
| `handle_leak_suspected` / `held` | n/a | **fields: none** |
| `handle_leak_suspected` / `onset` | n/a | **fields: none** |
| `handle_leak_suspected` / `recovered` | n/a | **fields: none** |
| `ingest_lag` / `held` | n/a | **fields: none** |
| `ingest_lag` / `onset` | n/a | **fields: none** |
| `ingest_lag` / `recovered` | n/a | **fields: none** |
| `io_elevated` / `default` | n/a | **fields: none** |
| `io_latency_severe` / `held` | n/a | **fields: none** |
| `io_latency_severe` / `onset` | n/a | **fields: none** |
| `io_latency_severe` / `recovered` | n/a | **fields: none** |
| `io_saturated` / `held` | n/a | **fields: none** |
| `io_saturated` / `onset` | n/a | **fields: none** |
| `io_saturated` / `recovered` | n/a | **fields: none** |
| `memory_elevated` / `default` | n/a | **fields: none** |
| `memory_leak_suspected` / `held` | n/a | **fields: none** |
| `memory_leak_suspected` / `onset` | n/a | **fields: none** |
| `memory_leak_suspected` / `recovered` | n/a | **fields: none** |
| `memory_thrashing` / `held` | n/a | **fields: none** |
| `memory_thrashing` / `onset` | n/a | **fields: none** |
| `memory_thrashing` / `recovered` | n/a | **fields: none** |
| `os_volume_space_exhausting` / `held` | n/a | **fields: none** |
| `os_volume_space_exhausting` / `onset` | n/a | **fields: none** |
| `os_volume_space_exhausting` / `recovered` | n/a | **fields: none** |
| `os_volume_space_low` / `held` | n/a | **fields: none** |
| `os_volume_space_low` / `onset` | n/a | **fields: none** |
| `os_volume_space_low` / `recovered` | n/a | **fields: none** |
| `process_handles_high` / `held` | n/a | **fields: none** |
| `process_handles_high` / `onset` | n/a | **fields: none** |
| `process_handles_high` / `recovered` | n/a | **fields: none** |
| `product_category_conflict` / `held` | n/a | **fields: none** |
| `product_category_conflict` / `onset` | n/a | **fields: none** |
| `product_category_conflict` / `recovered` | n/a | **fields: none** |
| `reboot_pending` / `held` | n/a | **fields: none** |
| `reboot_pending` / `onset` | n/a | **fields: none** |
| `reboot_pending` / `recovered` | n/a | **fields: none** |
| `rmm_agent_removed` / `default` | n/a | **fields: none** |
| `service_disabled` / `held` | n/a | **fields: none** |
| `service_disabled` / `onset` | n/a | **fields: none** |
| `service_disabled` / `recovered` | n/a | **fields: none** |
| `service_flapping` / `held` | n/a | **fields: none** |
| `service_flapping` / `onset` | n/a | **fields: none** |
| `service_flapping` / `recovered` | n/a | **fields: none** |
| `service_restarts_elevated` / `default` | n/a | **fields: none** |
| `service_stuck_pending` / `held` | n/a | **fields: none** |
| `service_stuck_pending` / `onset` | n/a | **fields: none** |
| `service_stuck_pending` / `recovered` | n/a | **fields: none** |
| `shadowstorage_exhausted` / `held` | n/a | **fields: none** |
| `shadowstorage_exhausted` / `onset` | n/a | **fields: none** |
| `shadowstorage_exhausted` / `recovered` | n/a | **fields: none** |
| `shadowstorage_near_cap` / `held` | n/a | **fields: none** |
| `shadowstorage_near_cap` / `onset` | n/a | **fields: none** |
| `shadowstorage_near_cap` / `recovered` | n/a | **fields: none** |
| `single_process_memory_dominant` / `default` | n/a | **fields: none** |
| `spool_growth_runaway` / `held` | n/a | **fields: none** |
| `spool_growth_runaway` / `onset` | n/a | **fields: none** |
| `spool_growth_runaway` / `recovered` | n/a | **fields: none** |
| `stack_cpu_elevated` / `default` | n/a | **fields: none** |
| `vector_restart_flapping` / `held` | n/a | **fields: none** |
| `vector_restart_flapping` / `onset` | n/a | **fields: none** |
| `vector_restart_flapping` / `recovered` | n/a | **fields: none** |
| `volume_full_projected_24h` / `held` | n/a | **fields: none** |
| `volume_full_projected_24h` / `onset` | n/a | **fields: none** |
| `volume_full_projected_24h` / `recovered` | n/a | **fields: none** |
| `volume_full_projected_7d` / `held` | n/a | **fields: none** |
| `volume_full_projected_7d` / `onset` | n/a | **fields: none** |
| `volume_full_projected_7d` / `recovered` | n/a | **fields: none** |
| `volume_lost` / `held` | n/a | **fields: none** |
| `volume_lost` / `onset` | n/a | **fields: none** |
| `volume_lost` / `recovered` | n/a | **fields: none** |
| `wmi_side_cost_elevated` / `default` | n/a | **fields: none** |
| `working_set_elevated` / `default` | n/a | **fields: none** |
| `writer_failed` / `held` | n/a | **fields: none** |
| `writer_failed` / `onset` | n/a | **fields: none** |
| `writer_failed` / `recovered` | n/a | **fields: none** |
| `writer_missing` / `held` | n/a | **fields: none** |
| `writer_missing` / `onset` | n/a | **fields: none** |
| `writer_missing` / `recovered` | n/a | **fields: none** |
| `writer_retries` / `default` | n/a | **fields: none** |
| `wu_paused` / `held` | n/a | **fields: none** |
| `wu_paused` / `onset` | n/a | **fields: none** |
| `wu_paused` / `recovered` | n/a | **fields: none** |
| `wu_scan_stale` / `held` | n/a | **fields: none** |
| `wu_scan_stale` / `onset` | n/a | **fields: none** |
| `wu_scan_stale` / `recovered` | n/a | **fields: none** |
| `wu_service_disabled` / `held` | n/a | **fields: none** |
| `wu_service_disabled` / `onset` | n/a | **fields: none** |
| `wu_service_disabled` / `recovered` | n/a | **fields: none** |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `agent_handle_leak_trend` / `held`
- `agent_handle_leak_trend` / `onset`
- `agent_handle_leak_trend` / `recovered`
- `agent_memory_leak_trend` / `held`
- `agent_memory_leak_trend` / `onset`
- `agent_memory_leak_trend` / `recovered`
- `agent_memory_over_budget` / `held`
- `agent_memory_over_budget` / `onset`
- `agent_memory_over_budget` / `recovered`
- `agent_over_budget` / `held`
- `agent_over_budget` / `onset`
- `agent_over_budget` / `recovered`
- `agent_restart_flapping` / `held`
- `agent_restart_flapping` / `onset`
- `agent_restart_flapping` / `recovered`
- `auto_service_not_running` / `held`
- `auto_service_not_running` / `onset`
- `auto_service_not_running` / `recovered`
- `bitlocker_protection_dropped` / `held`
- `bitlocker_protection_dropped` / `onset`
- `bitlocker_protection_dropped` / `recovered`
- `bsod_recurring` / `default`
- `clock_drift` / `held`
- `clock_drift` / `onset`
- `clock_drift` / `recovered`
- `cloud_unreachable` / `held`
- `cloud_unreachable` / `onset`
- `cloud_unreachable` / `recovered`
- `cpu_busy_sustained` / `default`
- `cpu_runaway_process` / `held`
- `cpu_runaway_process` / `onset`
- `cpu_runaway_process` / `recovered`
- `cpu_saturated_queueing` / `held`
- `cpu_saturated_queueing` / `onset`
- `cpu_saturated_queueing` / `recovered`
- `crash_dump_disabled` / `default`
- `crash_dump_new` / `default`
- `data_volume_space_low` / `held`
- `data_volume_space_low` / `onset`
- `data_volume_space_low` / `recovered`
- `dump_pagefile_too_small` / `default`
- `fill_rate_high` / `default`
- `handle_leak_suspected` / `held`
- `handle_leak_suspected` / `onset`
- `handle_leak_suspected` / `recovered`
- `ingest_lag` / `held`
- `ingest_lag` / `onset`
- `ingest_lag` / `recovered`
- `io_elevated` / `default`
- `io_latency_severe` / `held`
- `io_latency_severe` / `onset`
- `io_latency_severe` / `recovered`
- `io_saturated` / `held`
- `io_saturated` / `onset`
- `io_saturated` / `recovered`
- `memory_elevated` / `default`
- `memory_leak_suspected` / `held`
- `memory_leak_suspected` / `onset`
- `memory_leak_suspected` / `recovered`
- `memory_thrashing` / `held`
- `memory_thrashing` / `onset`
- `memory_thrashing` / `recovered`
- `os_volume_space_exhausting` / `held`
- `os_volume_space_exhausting` / `onset`
- `os_volume_space_exhausting` / `recovered`
- `os_volume_space_low` / `held`
- `os_volume_space_low` / `onset`
- `os_volume_space_low` / `recovered`
- `process_handles_high` / `held`
- `process_handles_high` / `onset`
- `process_handles_high` / `recovered`
- `product_category_conflict` / `held`
- `product_category_conflict` / `onset`
- `product_category_conflict` / `recovered`
- `reboot_pending` / `held`
- `reboot_pending` / `onset`
- `reboot_pending` / `recovered`
- `rmm_agent_removed` / `default`
- `service_disabled` / `held`
- `service_disabled` / `onset`
- `service_disabled` / `recovered`
- `service_flapping` / `held`
- `service_flapping` / `onset`
- `service_flapping` / `recovered`
- `service_restarts_elevated` / `default`
- `service_stuck_pending` / `held`
- `service_stuck_pending` / `onset`
- `service_stuck_pending` / `recovered`
- `shadowstorage_exhausted` / `held`
- `shadowstorage_exhausted` / `onset`
- `shadowstorage_exhausted` / `recovered`
- `shadowstorage_near_cap` / `held`
- `shadowstorage_near_cap` / `onset`
- `shadowstorage_near_cap` / `recovered`
- `single_process_memory_dominant` / `default`
- `spool_growth_runaway` / `held`
- `spool_growth_runaway` / `onset`
- `spool_growth_runaway` / `recovered`
- `stack_cpu_elevated` / `default`
- `vector_restart_flapping` / `held`
- `vector_restart_flapping` / `onset`
- `vector_restart_flapping` / `recovered`
- `volume_full_projected_24h` / `held`
- `volume_full_projected_24h` / `onset`
- `volume_full_projected_24h` / `recovered`
- `volume_full_projected_7d` / `held`
- `volume_full_projected_7d` / `onset`
- `volume_full_projected_7d` / `recovered`
- `volume_lost` / `held`
- `volume_lost` / `onset`
- `volume_lost` / `recovered`
- `wmi_side_cost_elevated` / `default`
- `working_set_elevated` / `default`
- `writer_failed` / `held`
- `writer_failed` / `onset`
- `writer_failed` / `recovered`
- `writer_missing` / `held`
- `writer_missing` / `onset`
- `writer_missing` / `recovered`
- `writer_retries` / `default`
- `wu_paused` / `held`
- `wu_paused` / `onset`
- `wu_paused` / `recovered`
- `wu_scan_stale` / `held`
- `wu_scan_stale` / `onset`
- `wu_scan_stale` / `recovered`
- `wu_service_disabled` / `held`
- `wu_service_disabled` / `onset`
- `wu_service_disabled` / `recovered`
