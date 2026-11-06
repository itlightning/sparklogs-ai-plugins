<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.setup`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

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
| `win.eventlog.setup.package` | string | Package the servicing operation was about, from `PackageIdentifier`: a KB number or a package name. The same package failing again and again is an update stuck in a retry loop, and the KB number matches the Windows Update records for it. |
| `win.eventlog.setup.error_code` | string | Result code the servicing operation logged, from `ErrorCode`, as a hex HRESULT such as 0x800f0831 (0x0 is success). On event 3 it says why the package failed, usually a 0x800F or 0x8007 code. On event 1014 it is the scan status. |
| `win.eventlog.setup.target_state` | string | State Windows was moving the package to, from `IntendedPackageStateTextized`: Installed, Staged or Absent (removed). |
| `win.eventlog.setup.initial_state` | string | State the package was in before the change, from `InitialPackageStateTextized`: Installed, Staged, Absent or Superseded. Event 1 carries it. |
| `win.eventlog.setup.client` | string | Servicing client that started the operation, from `Client`, as Windows writes it: for example CbsTask, UpdateAgentLCU, DISM, TrustedInstaller or WindowsUpdate. |
| `win.eventlog.setup.corruption_total` | int | Number of corruptions a component-store scan found, from `TotalCorruption` on events 1014 and 1015. |
| `win.eventlog.setup.corruption_repaired` | int | Number of corruptions a component-store scan repaired, from `Repaired` on events 1014 and 1015. |
| `win.eventlog.setup.detection_only` | bool | Whether the component-store scan only looked for corruption and made no repair attempt, from `DetectionOnly` on events 1013 and 1014. On a detection-only scan, zero repaired is the expected result. |
| `win.eventlog.setup.auto_triggered` | bool | Whether Windows started the corruption scan on its own, without an administrator running it, from `AutoTriggered` on event 1013. |

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `patch_install_failed` / `default` | 3 | `win.eventlog.setup.client` `win.eventlog.setup.error_code` `win.eventlog.setup.package` `win.eventlog.setup.target_state` |  |
| `win_component_store_corruption` / `detection_only` | 1014, 1015 | `win.eventlog.setup.corruption_repaired` `win.eventlog.setup.corruption_total` `win.eventlog.setup.detection_only` `win.eventlog.setup.error_code` |  |
| `win_component_store_corruption` / `unrepaired` | 1014, 1015 | `win.eventlog.setup.corruption_repaired` `win.eventlog.setup.corruption_total` `win.eventlog.setup.detection_only` `win.eventlog.setup.error_code` |  |
