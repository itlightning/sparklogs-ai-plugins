<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.servicing.cbs`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.

## Raw fallback

This source has no named provider payload, so there is no field-shaped raw fallback.
A value that is not promoted here lives in the retained message text and nowhere else.

## Module fields

Stored flat under the `win.servicing.cbs.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.servicing.cbs.component` | string | Component that wrote the CBS.log line, from its component column, such as CBS, CSI, DPX, SXS or WCP. Absent when the line names none. |
| `win.servicing.cbs.detected_corruption` | int | Number of corruptions a DISM component-store scan found, from its "Total Detected Corruption" summary line in CBS.log. |
| `win.servicing.cbs.repaired_corruption` | int | Number of corruptions a DISM component-store scan repaired, from its "Total Repaired Corruption" summary line in CBS.log. |
| `win.servicing.cbs.corrupt_component` | string | Component-store (WinSxS) component that holds a corrupt file, such as userexperience-oobe, read from the path on a "CSI Payload Corrupt" line or the component an "Unable to repair payload file" line names. Count by it to see which components keep turning up corrupt. Absent when the path names no component. |
| `win.servicing.cbs.corrupt_file` | string | Path of a corrupt file in the component store, as a "CSI Payload Corrupt" line in CBS.log names it. |
| `win.servicing.cbs.unrepairable_file` | string | File the servicing stack could not repair, from an "Unable to repair payload file" line in CBS.log. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
A key is listed with the module field of the same name; a key without one may still be queryable under another field in the table above.

| Tail key | Queryable as |
|---|---|
| `component` | `win.servicing.cbs.component` |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `win_component_store_assembly_missing` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_corruption` / `operation_failed` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_corruption` / `package_blocked` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_corruption` / `recovered` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_corruption` / `scan_found` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_corruption_recurring` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_file_flag_corruption_suspected` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_file_repaired` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_payload_corrupt` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_payload_unrepairable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_repair_unavailable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_reprojection_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_component_store_scan_repaired_corruption` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_commit_skipped_reboot_required` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_component_manifest_unreadable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_delta_patch_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_duplicate_update_name` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_package_manifest_unreadable` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_package_stage_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_source_files_missing` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_startup_package_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_update_package_create_failed` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_sfc_repair_started` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_package_change_reported` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
| `win_servicing_session_finalized` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |  |
