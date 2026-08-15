<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.setup`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `patch_servicing_failed` | `patching` | Error |
| `store_corruption` | `patching` | Warning / Notice |

## `patch_servicing_failed`

Windows servicing failed to change a package to the requested state.

**Severity:** Error

**Impact:** The install, uninstall, or update transaction did not complete for that package.

**Consider:**

- Pivot on PackageIdentifier and ErrorCode.
- Check nearby Setup and CBS records for the start event and component-store scan results.

## `store_corruption`

Windows servicing reported unrepaired component-store corruption.

**Severity:** Warning / Notice

**Impact:** Future Windows servicing operations may fail until the component store is repaired.

**Consider:**

- Compare TotalCorruption and Repaired.
- Check whether the scan was detection-only before treating zero repaired as a failed repair.
