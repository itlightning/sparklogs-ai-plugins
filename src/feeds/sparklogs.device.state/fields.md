<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `sparklogs.device.state`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

This source has no named provider payload, so there is no field-shaped raw fallback.
A value that is not promoted here lives in the retained message text and nowhere else.

## Module fields

Stored flat under the `sparklogs.device.state.` prefix.

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
| `app_crash_recurring` / `held` | n/a | **fields: none** |  |
| `app_crash_recurring` / `onset` | n/a | **fields: none** |  |
| `app_crash_recurring` / `recovered` | n/a | **fields: none** |  |
| `audit_policy_changed` / `default` | n/a | **fields: none** |  |
| `audit_policy_coverage_reduced` / `default` | n/a | **fields: none** |  |
| `bios_version_changed` / `default` | n/a | **fields: none** |  |
| `boot_mode_changed` / `default` | n/a | **fields: none** |  |
| `cpu_busy` / `held` | n/a | **fields: none** |  |
| `cpu_busy` / `onset` | n/a | **fields: none** |  |
| `cpu_busy` / `recovered` | n/a | **fields: none** |  |
| `cpu_configuration_changed` / `default` | n/a | **fields: none** |  |
| `cpu_interrupt_storm` / `held` | n/a | **fields: none** |  |
| `cpu_interrupt_storm` / `onset` | n/a | **fields: none** |  |
| `cpu_interrupt_storm` / `recovered` | n/a | **fields: none** |  |
| `cpu_kernel_dominated` / `held` | n/a | **fields: none** |  |
| `cpu_kernel_dominated` / `onset` | n/a | **fields: none** |  |
| `cpu_kernel_dominated` / `recovered` | n/a | **fields: none** |  |
| `cpu_throttled_under_load` / `held` | n/a | **fields: none** |  |
| `cpu_throttled_under_load` / `onset` | n/a | **fields: none** |  |
| `cpu_throttled_under_load` / `recovered` | n/a | **fields: none** |  |
| `crash_dump_page_file_too_small` / `held` | n/a | **fields: none** |  |
| `crash_dump_page_file_too_small` / `onset` | n/a | **fields: none** |  |
| `crash_dump_page_file_too_small` / `recovered` | n/a | **fields: none** |  |
| `crash_dump_type_changed` / `default` | n/a | **fields: none** |  |
| `data_volume_space_low` / `held` | n/a | **fields: none** |  |
| `data_volume_space_low` / `onset` | n/a | **fields: none** |  |
| `data_volume_space_low` / `recovered` | n/a | **fields: none** |  |
| `disk_brought_online` / `default` | n/a | **fields: none** |  |
| `disk_latency_degraded` / `held` | n/a | **fields: none** |  |
| `disk_latency_degraded` / `onset` | n/a | **fields: none** |  |
| `disk_latency_degraded` / `recovered` | n/a | **fields: none** |  |
| `disk_partition_layout_changed` / `default` | n/a | **fields: none** |  |
| `disk_read_only_changed` / `default` | n/a | **fields: none** |  |
| `disk_saturated` / `held` | n/a | **fields: none** |  |
| `disk_saturated` / `onset` | n/a | **fields: none** |  |
| `disk_saturated` / `recovered` | n/a | **fields: none** |  |
| `disk_taken_offline` / `default` | n/a | **fields: none** |  |
| `disk_unresponsive` / `held` | n/a | **fields: none** |  |
| `disk_unresponsive` / `onset` | n/a | **fields: none** |  |
| `disk_unresponsive` / `recovered` | n/a | **fields: none** |  |
| `domain_membership_changed` / `default` | n/a | **fields: none** |  |
| `driver_installed` / `default` | n/a | **fields: none** |  |
| `driver_removed` / `default` | n/a | **fields: none** |  |
| `driver_updated` / `default` | n/a | **fields: none** |  |
| `hardware_identity_changed` / `default` | n/a | **fields: none** |  |
| `host_booted` / `default` | n/a | **fields: none** |  |
| `host_clock_stepped` / `default` | n/a | **fields: none** |  |
| `host_resume_settled` / `default` | n/a | **fields: none** |  |
| `host_role_added` / `default` | n/a | **fields: none** |  |
| `host_role_removed` / `default` | n/a | **fields: none** |  |
| `host_shutdown` / `default` | n/a | **fields: none** |  |
| `host_sleep_entered` / `default` | n/a | **fields: none** |  |
| `host_sleep_exited` / `default` | n/a | **fields: none** |  |
| `host_unexpected_shutdown` / `default` | n/a | **fields: none** |  |
| `installed_memory_changed` / `default` | n/a | **fields: none** |  |
| `installed_product_changed` / `default` | n/a | **fields: none** |  |
| `installed_product_installed` / `default` | n/a | **fields: none** |  |
| `installed_product_removed` / `default` | n/a | **fields: none** |  |
| `kernel_crash` / `default` | n/a | **fields: none** |  |
| `kernel_crash_recurring` / `held` | n/a | **fields: none** |  |
| `kernel_crash_recurring` / `onset` | n/a | **fields: none** |  |
| `kernel_crash_recurring` / `recovered` | n/a | **fields: none** |  |
| `network_adapter_disabled` / `default` | n/a | **fields: none** |  |
| `network_adapter_enabled` / `default` | n/a | **fields: none** |  |
| `network_adapter_filters_changed` / `default` | n/a | **fields: none** |  |
| `network_adapter_ipv4_dhcp_changed` / `default` | n/a | **fields: none** |  |
| `network_adapter_metric_changed` / `default` | n/a | **fields: none** |  |
| `network_adapter_mtu_changed` / `default` | n/a | **fields: none** |  |
| `network_adapter_static_address_changed` / `default` | n/a | **fields: none** |  |
| `operating_system_changed` / `default` | n/a | **fields: none** |  |
| `os_clock_drift` / `held` | n/a | **fields: none** |  |
| `os_clock_drift` / `onset` | n/a | **fields: none** |  |
| `os_clock_drift` / `recovered` | n/a | **fields: none** |  |
| `os_volume_space_low` / `held` | n/a | **fields: none** |  |
| `os_volume_space_low` / `onset` | n/a | **fields: none** |  |
| `os_volume_space_low` / `recovered` | n/a | **fields: none** |  |
| `page_file_configuration_changed` / `default` | n/a | **fields: none** |  |
| `patch_scan_stale` / `held` | n/a | **fields: none** |  |
| `patch_scan_stale` / `onset` | n/a | **fields: none** |  |
| `patch_scan_stale` / `recovered` | n/a | **fields: none** |  |
| `patch_updates_paused` / `held` | n/a | **fields: none** |  |
| `patch_updates_paused` / `onset` | n/a | **fields: none** |  |
| `patch_updates_paused` / `recovered` | n/a | **fields: none** |  |
| `primary_dns_suffix_changed` / `default` | n/a | **fields: none** |  |
| `process_cpu_high` / `held` | n/a | **fields: none** |  |
| `process_cpu_high` / `onset` | n/a | **fields: none** |  |
| `process_cpu_high` / `recovered` | n/a | **fields: none** |  |
| `process_crash` / `default` | n/a | **fields: none** |  |
| `process_handle_count_high` / `held` | n/a | **fields: none** |  |
| `process_handle_count_high` / `onset` | n/a | **fields: none** |  |
| `process_handle_count_high` / `recovered` | n/a | **fields: none** |  |
| `ram_commit_near_limit` / `held` | n/a | **fields: none** |  |
| `ram_commit_near_limit` / `onset` | n/a | **fields: none** |  |
| `ram_commit_near_limit` / `recovered` | n/a | **fields: none** |  |
| `ram_pressure` / `held` | n/a | **fields: none** |  |
| `ram_pressure` / `onset` | n/a | **fields: none** |  |
| `ram_pressure` / `recovered` | n/a | **fields: none** |  |
| `secure_boot_disabled` / `default` | n/a | **fields: none** |  |
| `secure_boot_enabled` / `default` | n/a | **fields: none** |  |
| `service_auto_not_running` / `held` | n/a | **fields: none** |  |
| `service_auto_not_running` / `onset` | n/a | **fields: none** |  |
| `service_auto_not_running` / `recovered` | n/a | **fields: none** |  |
| `service_command_line_changed` / `default` | n/a | **fields: none** |  |
| `service_flapping` / `held` | n/a | **fields: none** |  |
| `service_flapping` / `onset` | n/a | **fields: none** |  |
| `service_flapping` / `recovered` | n/a | **fields: none** |  |
| `service_installed` / `default` | n/a | **fields: none** |  |
| `service_logon_account_changed` / `default` | n/a | **fields: none** |  |
| `service_removed` / `default` | n/a | **fields: none** |  |
| `service_start_type_changed` / `default` | n/a | **fields: none** |  |
| `service_stuck_pending` / `held` | n/a | **fields: none** |  |
| `service_stuck_pending` / `onset` | n/a | **fields: none** |  |
| `service_stuck_pending` / `recovered` | n/a | **fields: none** |  |
| `sparklogs_agent_cpu_over_budget` / `held` | n/a | **fields: none** |  |
| `sparklogs_agent_cpu_over_budget` / `onset` | n/a | **fields: none** |  |
| `sparklogs_agent_cpu_over_budget` / `recovered` | n/a | **fields: none** |  |
| `sparklogs_agent_handle_over_budget` / `held` | n/a | **fields: none** |  |
| `sparklogs_agent_handle_over_budget` / `onset` | n/a | **fields: none** |  |
| `sparklogs_agent_handle_over_budget` / `recovered` | n/a | **fields: none** |  |
| `sparklogs_agent_memory_over_budget` / `held` | n/a | **fields: none** |  |
| `sparklogs_agent_memory_over_budget` / `onset` | n/a | **fields: none** |  |
| `sparklogs_agent_memory_over_budget` / `recovered` | n/a | **fields: none** |  |
| `sparklogs_agent_started` / `default` | n/a | **fields: none** |  |
| `sparklogs_agent_stopped` / `default` | n/a | **fields: none** |  |
| `tpm_presence_changed` / `default` | n/a | **fields: none** |  |
| `tpm_version_changed` / `default` | n/a | **fields: none** |  |
| `virtualization_changed` / `default` | n/a | **fields: none** |  |
| `volume_bitlocker_protection_dropped` / `held` | n/a | **fields: none** |  |
| `volume_bitlocker_protection_dropped` / `onset` | n/a | **fields: none** |  |
| `volume_bitlocker_protection_dropped` / `recovered` | n/a | **fields: none** |  |
| `volume_fill_rate_high` / `default` | n/a | **fields: none** |  |
| `volume_unreadable` / `held` | n/a | **fields: none** |  |
| `volume_unreadable` / `onset` | n/a | **fields: none** |  |
| `volume_unreadable` / `recovered` | n/a | **fields: none** |  |
| `vss_snapshots_failing_for_space` / `held` | n/a | **fields: none** |  |
| `vss_snapshots_failing_for_space` / `onset` | n/a | **fields: none** |  |
| `vss_snapshots_failing_for_space` / `recovered` | n/a | **fields: none** |  |
| `vss_writer_failed` / `held` | n/a | **fields: none** |  |
| `vss_writer_failed` / `onset` | n/a | **fields: none** |  |
| `vss_writer_failed` / `recovered` | n/a | **fields: none** |  |
| `winhttp_proxy_changed` / `default` | n/a | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `app_crash_recurring` / `held`
- `app_crash_recurring` / `onset`
- `app_crash_recurring` / `recovered`
- `audit_policy_changed` / `default`
- `audit_policy_coverage_reduced` / `default`
- `bios_version_changed` / `default`
- `boot_mode_changed` / `default`
- `cpu_busy` / `held`
- `cpu_busy` / `onset`
- `cpu_busy` / `recovered`
- `cpu_configuration_changed` / `default`
- `cpu_interrupt_storm` / `held`
- `cpu_interrupt_storm` / `onset`
- `cpu_interrupt_storm` / `recovered`
- `cpu_kernel_dominated` / `held`
- `cpu_kernel_dominated` / `onset`
- `cpu_kernel_dominated` / `recovered`
- `cpu_throttled_under_load` / `held`
- `cpu_throttled_under_load` / `onset`
- `cpu_throttled_under_load` / `recovered`
- `crash_dump_page_file_too_small` / `held`
- `crash_dump_page_file_too_small` / `onset`
- `crash_dump_page_file_too_small` / `recovered`
- `crash_dump_type_changed` / `default`
- `data_volume_space_low` / `held`
- `data_volume_space_low` / `onset`
- `data_volume_space_low` / `recovered`
- `disk_brought_online` / `default`
- `disk_latency_degraded` / `held`
- `disk_latency_degraded` / `onset`
- `disk_latency_degraded` / `recovered`
- `disk_partition_layout_changed` / `default`
- `disk_read_only_changed` / `default`
- `disk_saturated` / `held`
- `disk_saturated` / `onset`
- `disk_saturated` / `recovered`
- `disk_taken_offline` / `default`
- `disk_unresponsive` / `held`
- `disk_unresponsive` / `onset`
- `disk_unresponsive` / `recovered`
- `domain_membership_changed` / `default`
- `driver_installed` / `default`
- `driver_removed` / `default`
- `driver_updated` / `default`
- `hardware_identity_changed` / `default`
- `host_booted` / `default`
- `host_clock_stepped` / `default`
- `host_resume_settled` / `default`
- `host_role_added` / `default`
- `host_role_removed` / `default`
- `host_shutdown` / `default`
- `host_sleep_entered` / `default`
- `host_sleep_exited` / `default`
- `host_unexpected_shutdown` / `default`
- `installed_memory_changed` / `default`
- `installed_product_changed` / `default`
- `installed_product_installed` / `default`
- `installed_product_removed` / `default`
- `kernel_crash` / `default`
- `kernel_crash_recurring` / `held`
- `kernel_crash_recurring` / `onset`
- `kernel_crash_recurring` / `recovered`
- `network_adapter_disabled` / `default`
- `network_adapter_enabled` / `default`
- `network_adapter_filters_changed` / `default`
- `network_adapter_ipv4_dhcp_changed` / `default`
- `network_adapter_metric_changed` / `default`
- `network_adapter_mtu_changed` / `default`
- `network_adapter_static_address_changed` / `default`
- `operating_system_changed` / `default`
- `os_clock_drift` / `held`
- `os_clock_drift` / `onset`
- `os_clock_drift` / `recovered`
- `os_volume_space_low` / `held`
- `os_volume_space_low` / `onset`
- `os_volume_space_low` / `recovered`
- `page_file_configuration_changed` / `default`
- `patch_scan_stale` / `held`
- `patch_scan_stale` / `onset`
- `patch_scan_stale` / `recovered`
- `patch_updates_paused` / `held`
- `patch_updates_paused` / `onset`
- `patch_updates_paused` / `recovered`
- `primary_dns_suffix_changed` / `default`
- `process_cpu_high` / `held`
- `process_cpu_high` / `onset`
- `process_cpu_high` / `recovered`
- `process_crash` / `default`
- `process_handle_count_high` / `held`
- `process_handle_count_high` / `onset`
- `process_handle_count_high` / `recovered`
- `ram_commit_near_limit` / `held`
- `ram_commit_near_limit` / `onset`
- `ram_commit_near_limit` / `recovered`
- `ram_pressure` / `held`
- `ram_pressure` / `onset`
- `ram_pressure` / `recovered`
- `secure_boot_disabled` / `default`
- `secure_boot_enabled` / `default`
- `service_auto_not_running` / `held`
- `service_auto_not_running` / `onset`
- `service_auto_not_running` / `recovered`
- `service_command_line_changed` / `default`
- `service_flapping` / `held`
- `service_flapping` / `onset`
- `service_flapping` / `recovered`
- `service_installed` / `default`
- `service_logon_account_changed` / `default`
- `service_removed` / `default`
- `service_start_type_changed` / `default`
- `service_stuck_pending` / `held`
- `service_stuck_pending` / `onset`
- `service_stuck_pending` / `recovered`
- `sparklogs_agent_cpu_over_budget` / `held`
- `sparklogs_agent_cpu_over_budget` / `onset`
- `sparklogs_agent_cpu_over_budget` / `recovered`
- `sparklogs_agent_handle_over_budget` / `held`
- `sparklogs_agent_handle_over_budget` / `onset`
- `sparklogs_agent_handle_over_budget` / `recovered`
- `sparklogs_agent_memory_over_budget` / `held`
- `sparklogs_agent_memory_over_budget` / `onset`
- `sparklogs_agent_memory_over_budget` / `recovered`
- `sparklogs_agent_started` / `default`
- `sparklogs_agent_stopped` / `default`
- `tpm_presence_changed` / `default`
- `tpm_version_changed` / `default`
- `virtualization_changed` / `default`
- `volume_bitlocker_protection_dropped` / `held`
- `volume_bitlocker_protection_dropped` / `onset`
- `volume_bitlocker_protection_dropped` / `recovered`
- `volume_fill_rate_high` / `default`
- `volume_unreadable` / `held`
- `volume_unreadable` / `onset`
- `volume_unreadable` / `recovered`
- `vss_snapshots_failing_for_space` / `held`
- `vss_snapshots_failing_for_space` / `onset`
- `vss_snapshots_failing_for_space` / `recovered`
- `vss_writer_failed` / `held`
- `vss_writer_failed` / `onset`
- `vss_writer_failed` / `recovered`
- `winhttp_proxy_changed` / `default`
