<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.setup`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `win_component_store_scan_found_corruption` | `patching` | Warning or Notice |  |
| `win_servicing_package_state_change_failed` | `patching` | Error |  |

## `win_component_store_scan_found_corruption`

Windows servicing reported unrepaired component-store corruption.

**Severity:** Warning or Notice

**Impact:** Future Windows servicing operations may fail until the component store is repaired.

**Consider:**

- Compare TotalCorruption and Repaired.
- Check whether the scan was detection-only before treating zero repaired as a failed repair.

## `win_servicing_package_state_change_failed`

Windows servicing failed to change a package to the requested state.

**Severity:** Error

**Impact:** The install, uninstall, or update transaction did not complete for that package.

**Consider:**

- Pivot on PackageIdentifier and ErrorCode.
- Check nearby Setup and CBS records for the start event and component-store scan results.
