<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.servicing.cbs`

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

Stored flat under the `win.servicing.cbs.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.servicing.cbs.component` | string | CBS log component column (CBS, CSI, DPX, SXS, WCP, SQM, DEPLOY, DMI, PnP). |
| `win.servicing.cbs.detected_corruption` | int | Total Detected Corruption count from a DISM scan-summary line. |
| `win.servicing.cbs.repaired_corruption` | int | Total Repaired Corruption count from a DISM scan-summary line. |
| `win.servicing.cbs.corrupt_component` | string | WinSxS component family of a corrupt payload (e.g. userexperience-oobe). Aggregate query-side. |
| `win.servicing.cbs.corrupt_file` | string | Corrupt payload file path from a CSI Payload Corrupt line. |
| `win.servicing.cbs.unrepairable_file` | string | A file CSI could not repair, from an Unable to repair payload file line. |

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `win_component_store_assembly_missing` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_corrupt_blocks_package` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_corruption_recurrence` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_file_repaired` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_flag_corruption_suspected` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_payload_corrupt` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_payload_unrepairable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_repair_completed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_repair_unavailable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_reprojection_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_scan_found_corruption` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_scan_repaired_corruption` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_source_missing` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_component_store_sxs_corrupt` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_commit_skipped_reboot_required` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_delta_patch_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_duplicate_update_name` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_manifest_malformed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_manifest_unparseable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_package_change_reported` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_package_stage_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_session_finalized` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_startup_package_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_servicing_update_package_create_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `win_sfc_repairing_components` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
