<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.cbs`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `assembly_missing` | `patching` | Error |
| `cannot_repair` | `patching` | Error |
| `corruption_generic` | `patching` | Error / Warning |
| `csi_fatal_marker` | `patching` | Error |
| `delta_apply_fail` | `patching` | Error |
| `failed_generic` | `patching` | Error / Warning |
| `file_repaired` | `patching` | Warning |
| `hash_mismatch` | `patching` | Error |
| `hresult_error` | `patching` | Error / Warning |
| `hydration_fail` | `patching` | Error |
| `manifest_format_error` | `patching` | Error |
| `offline_reg_unload` | `patching` | Info cap |
| `orphan_package_probe` | `patching` | Info cap |
| `package_open_failure` | `patching` | Error / Warning |
| `payload_corrupt` | `patching` | Error / Warning |
| `read_absence` | `patching` | Info cap |
| `reproject_fail` | `patching` | Error |
| `reserve_manager_probe` | `patching` | Info cap |
| `sfc_scan` | `patching` | Info |
| `source_missing` | `patching` | Error |
| `store_corrupt_sxs` | `patching` | Error |
| `store_corruption` | `patching` | Error |
| `store_repair_complete` | `patching` | Notice |
| `store_scan_clean` | `patching` | Info |
| `store_scan_corruption_found` | `patching` | Warning |
| `store_scan_corruption_repaired` | `patching` | Notice |
| `sxs_status_error` | `patching` | Error / Warning |
| `unable_to_repair_payload` | `patching` | Error / Warning |

## `assembly_missing`

CBS reported a missing side-by-side assembly.

**Severity:** Error

**Impact:** Package installation or repair may fail because a required assembly is absent.

**Consider:**

- Pivot on the assembly identity and package name when present.

## `cannot_repair`

Windows servicing could not repair a member file.

**Severity:** Error

**Impact:** The component may remain corrupt after the scan or repair operation.

**Consider:**

- Pivot on the member file and component identity.
- Compare with later DISM RestoreHealth or SFC reruns.

## `corruption_generic`

CBS mentioned corruption outside a narrower corruption rule.

**Severity:** Error / Warning

**Impact:** Some servicing corruption may be present, but nearby lines are needed to identify the object and outcome.

**Consider:**

- Use adjacent component, file, and HRESULT lines to narrow the cause.

## `csi_fatal_marker`

CSI emitted a fatal or error marker during servicing.

**Severity:** Error

**Impact:** The servicing operation hit an error path; nearby CBS lines are needed to identify the exact operation.

**Consider:**

- Read the nearest component, HRESULT, and package lines before assigning cause.

## `delta_apply_fail`

CBS failed to apply a servicing delta payload.

**Severity:** Error

**Impact:** The update or package operation may fail until the payload or component state is corrected.

**Consider:**

- Check the package identity and update history around the same timestamp.

## `failed_generic`

CBS logged a failure outside a narrower CBS reason.

**Severity:** Error / Warning

**Impact:** A servicing step failed, but the exact operation and consequence require the surrounding CBS context.

**Consider:**

- Read the surrounding component and package lines.
- Use the raw failed text as the first search key.

## `file_repaired`

Windows servicing repaired a corrupted file.

**Severity:** Warning

**Impact:** A corruption issue was corrected, but the root cause may still matter if repairs recur.

**Consider:**

- Treat as closure for the file when no later cannot_repair appears.
- Recurring repaired files can indicate disk, update, or image health problems.

## `hash_mismatch`

CBS detected a servicing file hash mismatch.

**Severity:** Error

**Impact:** A component payload may be altered, incomplete, or mismatched, which can block servicing or repair.

**Consider:**

- Inspect the corrupt_file or component name when present.
- Check whether a later repair or source_missing event explains the outcome.

## `hresult_error`

CBS emitted a non-zero servicing HRESULT or error family.

**Severity:** Error / Warning

**Impact:** The servicing operation may have failed or degraded; the exact code and nearby operation determine impact.

**Consider:**

- Search the exact HRESULT.
- Prefer a narrower reason when one appears in the same event window.

## `hydration_fail`

CBS failed to hydrate servicing content.

**Severity:** Error

**Impact:** Servicing may be unable to materialize required files for the operation.

**Consider:**

- Check package and source context near the failure.

## `manifest_format_error`

CBS found invalid component manifest format data.

**Severity:** Error

**Impact:** Package processing or repair may fail because component metadata is malformed.

**Consider:**

- Look for the component or manifest path in nearby CBS lines.

## `offline_reg_unload`

CBS could not unload an offline registry hive during servicing cleanup.

**Severity:** Info cap

**Consider:**

- Use as context only unless repeated with other registry or VSS failures.

## `orphan_package_probe`

CBS failed to open a legacy or orphaned package during package enumeration.

**Severity:** Info cap

**Consider:**

- Treat 0x800f0805 in this pattern as expected enumeration noise.
- Look for nearby package_open_failure or hresult_error records with different HRESULTs.

## `package_open_failure`

CBS failed to open or resolve a servicing package.

**Severity:** Error / Warning

**Impact:** The package operation may not proceed until package identity, manifests, or source data are corrected.

**Consider:**

- Separate 0x800f0805 orphan probes from other HRESULTs.
- Pivot on the package identity when present.

## `payload_corrupt`

CSI reported a corrupt servicing payload.

**Severity:** Error / Warning

**Impact:** The affected component may need repair from the component store, Windows Update, or a matching source image.

**Consider:**

- Use extracted corrupt_file or corrupt_component values when present.
- Look for later file_repaired or cannot_repair records.

## `read_absence`

CBS did not find optional servicing state or telemetry data.

**Severity:** Info cap

**Consider:**

- Do not treat this line alone as evidence of servicing failure.
- Check whether the same session also emits hresult_error or source_missing.

## `reproject_fail`

CBS could not reproject a corrupted file during repair.

**Severity:** Error

**Impact:** The affected component may remain inconsistent after repair.

**Consider:**

- Check adjacent payload and member-file lines for the affected component.

## `reserve_manager_probe`

CBS failed an update reserve-manager startup probe.

**Severity:** Info cap

**Consider:**

- Keep for session context only.

## `sfc_scan`

CBS recorded SFC scan activity.

**Severity:** Info

**Impact:** Provides timeline context for an SFC scan; impact depends on nearby repair or cannot-repair records.

**Consider:**

- Use this as a session marker, not a failure by itself.

## `source_missing`

CBS could not find required source files for servicing repair.

**Severity:** Error

**Impact:** RestoreHealth or package repair may fail until a valid matching source is supplied.

**Consider:**

- Verify the OS build and source image match.
- Check whether Windows Update access or /Source policy blocked repair.

## `store_corrupt_sxs`

CBS reported the SxS component store corrupt.

**Severity:** Error

**Impact:** Windows servicing and repair operations may fail until component-store corruption is repaired.

**Consider:**

- Run or review DISM RestoreHealth and SFC outcomes for the same window.

## `store_corruption`

CBS reported component-store corruption.

**Severity:** Error

**Impact:** Windows updates, feature installs, and repair operations may fail until the component store is repaired.

**Consider:**

- Pair with DISM RestoreHealth and later store_repair_complete records.
- Pivot on HRESULT 0x800f0831 when present.

## `store_repair_complete`

CBS reported component-store corruption was fixed.

**Severity:** Notice

**Impact:** Repair appears to have completed for the corruption CBS detected.

**Consider:**

- Use as a recovery marker after store_corruption or store_corrupt_sxs.

## `store_scan_clean`

A component-store scan completed and found no corruption.

**Severity:** Info

**Consider:**

- Use as the evidence that the component store was intact at that time.
- Pair with DISM session logs for the command that initiated the scan.

## `store_scan_corruption_found`

A component-store scan counted corrupt items.

**Severity:** Warning

**Impact:** The component store holds items that no longer match their servicing metadata. Updates and feature installs that touch those items can fail until the store is repaired.

**Consider:**

- Compare with the repair count from the same session before deciding the store is still corrupt.
- Run DISM RestoreHealth when the corruption was detected but never repaired.
- Pair with DISM session logs for the command that initiated the scan.

## `store_scan_corruption_repaired`

A component-store scan counted items it repaired.

**Severity:** Notice

**Impact:** Corruption existed and repairs were made for it. The line does not say whether anything corrupt was left behind.

**Consider:**

- Compare the repair count with the detected count from the same session.
- Treat a count that returns on later scans as damage recurring, not as a machine that was fixed.

## `sxs_status_error`

CBS emitted a side-by-side or status error code.

**Severity:** Error / Warning

**Impact:** Servicing may be blocked or degraded depending on the specific SxS or STATUS code.

**Consider:**

- Use the exact error literal as the search and vendor-doc pivot.

## `unable_to_repair_payload`

CSI could not repair a payload from the local backup.

**Severity:** Error / Warning

**Impact:** Repair may need Windows Update or a matching source image if the local backup cannot satisfy the payload.

**Consider:**

- Check the unrepairable_file value when present.
- Look for a later successful repair before opening an incident.
