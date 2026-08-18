<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.setup`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.setup.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.setup.package` | string | PackageIdentifier: KB number or component/package name. The join + recurrence key (a package failing repeatedly is a stuck-update loop; correlates with WU-layer copies by KB). |
| `win.eventlog.setup.error_code` | string | ErrorCode hex HRESULT as logged (0x0 success; 0x800F####/0x8007#### servicing failure on event 3; scan Status on 1014). Kept a string: codes are identifiers, not quantities. |
| `win.eventlog.setup.target_state` | string | IntendedPackageStateTextized: target state of the transition (Installed \| Staged \| Absent). |
| `win.eventlog.setup.initial_state` | string | InitialPackageStateTextized: prior state (event 1 only; Staged \| Absent \| Installed \| Superseded). |
| `win.eventlog.setup.client` | string | Servicing client that drove the operation (CbsTask, UpdateAgentLCU, DISM, TrustedInstaller, WindowsUpdate, ...). |
| `win.eventlog.setup.corruption_total` | int | TotalCorruption count from a component-store corruption scan (events 1014/1015). |
| `win.eventlog.setup.corruption_repaired` | int | Repaired count from a component-store corruption scan (events 1014/1015). |
| `win.eventlog.setup.detection_only` | bool | Scan ran in detection-only mode (no repair attempted); qualifies whether 0 repaired is expected (events 1013/1014). |
| `win.eventlog.setup.auto_triggered` | bool | Corruption scan was automatically triggered rather than operator-run (event 1013). |

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface and per event id, because promotion is a property of the branch, not of the module.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `patch_servicing_failed` / `default` | 3 | `win.eventlog.setup.auto_triggered` `win.eventlog.setup.client` `win.eventlog.setup.corruption_repaired` `win.eventlog.setup.corruption_total` `win.eventlog.setup.detection_only` `win.eventlog.setup.error_code` `win.eventlog.setup.initial_state` `win.eventlog.setup.package` `win.eventlog.setup.target_state` |
| `store_corruption` / `detection_only` | 1014, 1015 | `win.eventlog.setup.auto_triggered` `win.eventlog.setup.client` `win.eventlog.setup.corruption_repaired` `win.eventlog.setup.corruption_total` `win.eventlog.setup.detection_only` `win.eventlog.setup.error_code` `win.eventlog.setup.initial_state` `win.eventlog.setup.package` `win.eventlog.setup.target_state` |
| `store_corruption` / `unrepaired` | 1014, 1015 | `win.eventlog.setup.auto_triggered` `win.eventlog.setup.client` `win.eventlog.setup.corruption_repaired` `win.eventlog.setup.corruption_total` `win.eventlog.setup.detection_only` `win.eventlog.setup.error_code` `win.eventlog.setup.initial_state` `win.eventlog.setup.package` `win.eventlog.setup.target_state` |
