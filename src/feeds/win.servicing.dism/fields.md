<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.servicing.dism`

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

Stored flat under the `win.servicing.dism.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.servicing.dism.component` | string | DISM log component column (usually DISM; CSI on shim lines). |

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `win_dism_command_failed` / `default` | n/a | `win.servicing.dism.component` |
| `win_dism_feature_change_failed` / `default` | n/a | `win.servicing.dism.component` |
| `win_dism_health_command` / `default` | n/a | `win.servicing.dism.component` |
| `win_dism_reboot_required` / `default` | n/a | `win.servicing.dism.component` |
| `win_dism_source_files_missing` / `default` | n/a | `win.servicing.dism.component` |
