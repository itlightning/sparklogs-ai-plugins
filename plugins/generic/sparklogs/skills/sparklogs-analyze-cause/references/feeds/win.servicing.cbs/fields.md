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

Presence is per curated surface and per event id, because promotion is a property of the branch, not of the module.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `assembly_missing` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `cannot_repair` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `corruption_generic` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `csi_fatal_marker` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `delta_apply_fail` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `failed_generic` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `file_repaired` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `hash_mismatch` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `hresult_error` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `hydration_fail` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `manifest_format_error` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `offline_reg_unload` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `orphan_package_probe` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `package_open_failure` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `payload_corrupt` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `read_absence` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `reproject_fail` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `reserve_manager_probe` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `sfc_scan` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `source_missing` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `store_corrupt_sxs` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `store_corruption` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `store_repair_complete` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `store_scan_clean` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `store_scan_corruption_found` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `store_scan_corruption_repaired` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `sxs_status_error` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
| `unable_to_repair_payload` / `default` | n/a | `win.servicing.cbs.component` `win.servicing.cbs.corrupt_component` `win.servicing.cbs.corrupt_file` `win.servicing.cbs.detected_corruption` `win.servicing.cbs.repaired_corruption` `win.servicing.cbs.unrepairable_file` |
