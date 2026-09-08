<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.cbs`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `win_component_store_assembly_missing` | `patching` | Notice |  |
| `win_component_store_corrupt_blocks_package` | `patching` | Warning |  |
| `win_component_store_corruption_recurrence` | `patching` | Notice |  |
| `win_component_store_file_repaired` | `patching` | Notice |  |
| `win_component_store_flag_corruption_suspected` | `patching` | Notice |  |
| `win_component_store_payload_corrupt` | `patching` | Notice |  |
| `win_component_store_payload_unrepairable` | `patching` | Warning |  |
| `win_component_store_repair_completed` | `patching` | Notice |  |
| `win_component_store_repair_unavailable` | `patching` | Warning |  |
| `win_component_store_reprojection_failed` | `patching` | Notice |  |
| `win_component_store_scan_found_corruption` | `patching` | Notice |  |
| `win_component_store_scan_repaired_corruption` | `patching` | Notice |  |
| `win_component_store_source_missing` | `patching` | Warning |  |
| `win_component_store_sxs_corrupt` | `patching` | Warning |  |
| `win_servicing_commit_skipped_reboot_required` | `patching` | Notice |  |
| `win_servicing_delta_patch_failed` | `patching` | Notice |  |
| `win_servicing_duplicate_update_name` | `patching` | Notice |  |
| `win_servicing_manifest_malformed` | `patching` | Notice |  |
| `win_servicing_manifest_unparseable` | `patching` | Debug |  |
| `win_servicing_package_change_reported` | `patching` | Debug |  |
| `win_servicing_package_stage_failed` | `patching` | Warning |  |
| `win_servicing_session_finalized` | `patching` | Debug |  |
| `win_servicing_startup_package_failed` | `patching` | Notice |  |
| `win_servicing_update_package_create_failed` | `patching` | Warning |  |
| `win_sfc_repairing_components` | `patching` | Notice |  |

## `win_component_store_assembly_missing`

A component assembly is missing from the store.

**Severity:** Notice

**Impact:** Windows will usually repair this automatically.

## `win_component_store_corrupt_blocks_package`

A Windows package failed to apply because the component store is corrupt.

**Severity:** Warning

**Impact:** Updates will keep failing on this machine until the component store is repaired.

## `win_component_store_corruption_recurrence`

Windows reported how often component-store corruption has been detected.

**Severity:** Notice

**Impact:** None directly. A rising count suggests the underlying cause is not being fixed.

## `win_component_store_file_repaired`

Windows repaired a file from its component store or backup.

**Severity:** Notice

**Impact:** None. The file was restored.

## `win_component_store_flag_corruption_suspected`

Windows suspects component-store file-flag corruption.

**Severity:** Notice

**Impact:** None established. The event records a suspicion, not a finding.

## `win_component_store_payload_corrupt`

A payload file in the component store is corrupt.

**Severity:** Notice

**Impact:** Windows will usually repair this automatically.

## `win_component_store_payload_unrepairable`

Windows could not repair a damaged payload file.

**Severity:** Warning

**Impact:** Servicing operations needing this payload will fail until it is restored.

## `win_component_store_repair_completed`

Windows repaired all recorded component-store corruption.

**Severity:** Notice

**Impact:** None. The store is consistent again.

## `win_component_store_repair_unavailable`

Windows could not repair a damaged component.

**Severity:** Warning

**Impact:** Updates touching this component are likely to fail until it is repaired manually.

## `win_component_store_reprojection_failed`

Windows could not reproject a component.

**Severity:** Notice

**Impact:** Usually none: the operation is normally retried.

## `win_component_store_scan_found_corruption`

A component-store scan detected corruption.

**Severity:** Notice

**Impact:** Windows updates may fail later if the damage is not repaired. Detection alone does not mean anything is currently broken.

## `win_component_store_scan_repaired_corruption`

A component-store scan repaired corruption it found.

**Severity:** Notice

**Impact:** None. The damage was fixed.

## `win_component_store_source_missing`

A servicing operation could not find the source files it needed.

**Severity:** Warning

**Impact:** Repair or install will keep failing until a valid source is supplied.

## `win_component_store_sxs_corrupt`

The side-by-side component store is corrupt.

**Severity:** Warning

**Impact:** Servicing operations may fail until the store is repaired.

## `win_servicing_commit_skipped_reboot_required`

A servicing change was deferred because a reboot is pending.

**Severity:** Notice

**Impact:** The change applies after the next reboot.

## `win_servicing_delta_patch_failed`

A component delta patch could not be applied.

**Severity:** Notice

**Impact:** Usually none: Windows falls back to a full payload.

## `win_servicing_duplicate_update_name`

Windows found a duplicate update name in a package.

**Severity:** Notice

**Impact:** None established. It may indicate a store inconsistency.

## `win_servicing_manifest_malformed`

A component manifest is malformed.

**Severity:** Notice

**Impact:** Operations touching that component may fail.

## `win_servicing_manifest_unparseable`

Windows could not parse a package manifest.

**Severity:** Debug

**Impact:** That optional feature may not be installable.

## `win_servicing_package_change_reported`

A Windows package was added, removed or updated.

**Severity:** Debug

**Impact:** None on its own.

## `win_servicing_package_stage_failed`

A Windows package could not be staged for installation.

**Severity:** Warning

**Impact:** That update will not install until the underlying cause is fixed.

## `win_servicing_session_finalized`

A Windows servicing session started and finished.

**Severity:** Debug

**Impact:** None. This is a liveness marker.

## `win_servicing_startup_package_failed`

A Windows package failed during startup processing.

**Severity:** Notice

**Impact:** That package is not installed. Patching status is better read from the update client.

## `win_servicing_update_package_create_failed`

Windows could not create an update package.

**Severity:** Warning

**Impact:** That update will not install until the underlying cause is fixed.

## `win_sfc_repairing_components`

System File Checker started repairing components.

**Severity:** Notice

**Impact:** None on its own.
