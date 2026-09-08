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
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `agent_cpu_over_budget` / `held` | n/a | **fields: none** |  |
| `agent_cpu_over_budget` / `onset` | n/a | **fields: none** |  |
| `agent_cpu_over_budget` / `recovered` | n/a | **fields: none** |  |
| `agent_ram_over_budget` / `held` | n/a | **fields: none** |  |
| `agent_ram_over_budget` / `onset` | n/a | **fields: none** |  |
| `agent_ram_over_budget` / `recovered` | n/a | **fields: none** |  |
| `cpu_busy` / `default` | n/a | **fields: none** |  |
| `disk_latency_degraded` / `held` | n/a | **fields: none** |  |
| `disk_latency_degraded` / `onset` | n/a | **fields: none** |  |
| `disk_latency_degraded` / `recovered` | n/a | **fields: none** |  |
| `os_bsod_recurring` / `default` | n/a | **fields: none** |  |
| `os_clock_drift` / `held` | n/a | **fields: none** |  |
| `os_clock_drift` / `onset` | n/a | **fields: none** |  |
| `os_clock_drift` / `recovered` | n/a | **fields: none** |  |
| `os_crash_dump_new` / `default` | n/a | **fields: none** |  |
| `os_dump_pagefile_too_small` / `default` | n/a | **fields: none** |  |
| `patch_scan_stale` / `held` | n/a | **fields: none** |  |
| `patch_scan_stale` / `onset` | n/a | **fields: none** |  |
| `patch_scan_stale` / `recovered` | n/a | **fields: none** |  |
| `patch_updates_paused` / `held` | n/a | **fields: none** |  |
| `patch_updates_paused` / `onset` | n/a | **fields: none** |  |
| `patch_updates_paused` / `recovered` | n/a | **fields: none** |  |
| `proc_cpu_runaway` / `held` | n/a | **fields: none** |  |
| `proc_cpu_runaway` / `onset` | n/a | **fields: none** |  |
| `proc_cpu_runaway` / `recovered` | n/a | **fields: none** |  |
| `proc_handle_count_high` / `held` | n/a | **fields: none** |  |
| `proc_handle_count_high` / `onset` | n/a | **fields: none** |  |
| `proc_handle_count_high` / `recovered` | n/a | **fields: none** |  |
| `ram_commit_high` / `default` | n/a | **fields: none** |  |
| `ram_growth_sustained` / `held` | n/a | **fields: none** | `ws_growth_monotonic_snapshots` `working_set_bytes` `working_set_pct_ram` |
| `ram_growth_sustained` / `onset` | n/a | **fields: none** | `ws_growth_monotonic_snapshots` `working_set_bytes` `working_set_pct_ram` |
| `ram_growth_sustained` / `recovered` | n/a | **fields: none** |  |
| `ram_hard_fault_storm` / `held` | n/a | **fields: none** |  |
| `ram_hard_fault_storm` / `onset` | n/a | **fields: none** |  |
| `ram_hard_fault_storm` / `recovered` | n/a | **fields: none** |  |
| `svc_auto_not_running` / `held` | n/a | **fields: none** |  |
| `svc_auto_not_running` / `onset` | n/a | **fields: none** |  |
| `svc_auto_not_running` / `recovered` | n/a | **fields: none** |  |
| `svc_flapping` / `held` | n/a | **fields: none** |  |
| `svc_flapping` / `onset` | n/a | **fields: none** |  |
| `svc_flapping` / `recovered` | n/a | **fields: none** |  |
| `svc_stuck_pending` / `held` | n/a | **fields: none** |  |
| `svc_stuck_pending` / `onset` | n/a | **fields: none** |  |
| `svc_stuck_pending` / `recovered` | n/a | **fields: none** |  |
| `vol_bitlocker_dropped` / `held` | n/a | **fields: none** |  |
| `vol_bitlocker_dropped` / `onset` | n/a | **fields: none** |  |
| `vol_bitlocker_dropped` / `recovered` | n/a | **fields: none** |  |
| `vol_data_space_exhausting` / `held` | n/a | **fields: none** |  |
| `vol_data_space_exhausting` / `onset` | n/a | **fields: none** |  |
| `vol_data_space_exhausting` / `recovered` | n/a | **fields: none** |  |
| `vol_data_space_low` / `held` | n/a | **fields: none** |  |
| `vol_data_space_low` / `onset` | n/a | **fields: none** |  |
| `vol_data_space_low` / `recovered` | n/a | **fields: none** |  |
| `vol_fill_rate_high` / `default` | n/a | **fields: none** |  |
| `vol_os_space_exhausting` / `held` | n/a | **fields: none** |  |
| `vol_os_space_exhausting` / `onset` | n/a | **fields: none** |  |
| `vol_os_space_exhausting` / `recovered` | n/a | **fields: none** |  |
| `vol_os_space_low` / `held` | n/a | **fields: none** |  |
| `vol_os_space_low` / `onset` | n/a | **fields: none** |  |
| `vol_os_space_low` / `recovered` | n/a | **fields: none** |  |
| `vol_unreadable` / `held` | n/a | **fields: none** |  |
| `vol_unreadable` / `onset` | n/a | **fields: none** |  |
| `vol_unreadable` / `recovered` | n/a | **fields: none** |  |
| `vss_shadowstorage_near_cap` / `held` | n/a | **fields: none** |  |
| `vss_shadowstorage_near_cap` / `onset` | n/a | **fields: none** |  |
| `vss_shadowstorage_near_cap` / `recovered` | n/a | **fields: none** |  |
| `vss_snapshots_failing_for_space` / `held` | n/a | **fields: none** |  |
| `vss_snapshots_failing_for_space` / `onset` | n/a | **fields: none** |  |
| `vss_snapshots_failing_for_space` / `recovered` | n/a | **fields: none** |  |
| `vss_writer_failed` / `held` | n/a | **fields: none** |  |
| `vss_writer_failed` / `onset` | n/a | **fields: none** |  |
| `vss_writer_failed` / `recovered` | n/a | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `agent_cpu_over_budget` / `held`
- `agent_cpu_over_budget` / `onset`
- `agent_cpu_over_budget` / `recovered`
- `agent_ram_over_budget` / `held`
- `agent_ram_over_budget` / `onset`
- `agent_ram_over_budget` / `recovered`
- `cpu_busy` / `default`
- `disk_latency_degraded` / `held`
- `disk_latency_degraded` / `onset`
- `disk_latency_degraded` / `recovered`
- `os_bsod_recurring` / `default`
- `os_clock_drift` / `held`
- `os_clock_drift` / `onset`
- `os_clock_drift` / `recovered`
- `os_crash_dump_new` / `default`
- `os_dump_pagefile_too_small` / `default`
- `patch_scan_stale` / `held`
- `patch_scan_stale` / `onset`
- `patch_scan_stale` / `recovered`
- `patch_updates_paused` / `held`
- `patch_updates_paused` / `onset`
- `patch_updates_paused` / `recovered`
- `proc_cpu_runaway` / `held`
- `proc_cpu_runaway` / `onset`
- `proc_cpu_runaway` / `recovered`
- `proc_handle_count_high` / `held`
- `proc_handle_count_high` / `onset`
- `proc_handle_count_high` / `recovered`
- `ram_commit_high` / `default`
- `ram_growth_sustained` / `held`
- `ram_growth_sustained` / `onset`
- `ram_growth_sustained` / `recovered`
- `ram_hard_fault_storm` / `held`
- `ram_hard_fault_storm` / `onset`
- `ram_hard_fault_storm` / `recovered`
- `svc_auto_not_running` / `held`
- `svc_auto_not_running` / `onset`
- `svc_auto_not_running` / `recovered`
- `svc_flapping` / `held`
- `svc_flapping` / `onset`
- `svc_flapping` / `recovered`
- `svc_stuck_pending` / `held`
- `svc_stuck_pending` / `onset`
- `svc_stuck_pending` / `recovered`
- `vol_bitlocker_dropped` / `held`
- `vol_bitlocker_dropped` / `onset`
- `vol_bitlocker_dropped` / `recovered`
- `vol_data_space_exhausting` / `held`
- `vol_data_space_exhausting` / `onset`
- `vol_data_space_exhausting` / `recovered`
- `vol_data_space_low` / `held`
- `vol_data_space_low` / `onset`
- `vol_data_space_low` / `recovered`
- `vol_fill_rate_high` / `default`
- `vol_os_space_exhausting` / `held`
- `vol_os_space_exhausting` / `onset`
- `vol_os_space_exhausting` / `recovered`
- `vol_os_space_low` / `held`
- `vol_os_space_low` / `onset`
- `vol_os_space_low` / `recovered`
- `vol_unreadable` / `held`
- `vol_unreadable` / `onset`
- `vol_unreadable` / `recovered`
- `vss_shadowstorage_near_cap` / `held`
- `vss_shadowstorage_near_cap` / `onset`
- `vss_shadowstorage_near_cap` / `recovered`
- `vss_snapshots_failing_for_space` / `held`
- `vss_snapshots_failing_for_space` / `onset`
- `vss_snapshots_failing_for_space` / `recovered`
- `vss_writer_failed` / `held`
- `vss_writer_failed` / `onset`
- `vss_writer_failed` / `recovered`
