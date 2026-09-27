<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.setup`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `patch_install_failed` | `patching` | Error |  |
| `win_component_store_corruption` | `patching` | Warning or Notice |  |

## `patch_install_failed`

Windows servicing failed to change a package to the requested state.

**Also reported by:** `win.eventlog.system`

**Severity:** Error

**Impact:** The install, uninstall, or update transaction did not complete for that package.

**Consider:**

- Pivot on PackageIdentifier and ErrorCode.
- Check nearby Setup and CBS records for the start event and component-store scan results.

## `win_component_store_corruption`

Windows servicing reported unrepaired component-store corruption.

**Also reported by:** `win.servicing.cbs`

**Severity:** Warning or Notice

**Impact:** Future Windows servicing operations may fail until the component store is repaired.

**Consider:**

- Compare TotalCorruption and Repaired.
- Check whether the scan was detection-only before treating zero repaired as a failed repair.
