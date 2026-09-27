<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.cbs`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `win_component_store_assembly_missing` | `patching` | Notice |  |
| `win_component_store_corruption` | `patching` | Warning or Notice |  |
| `win_component_store_corruption_recurring` | `patching` | Notice |  |
| `win_component_store_file_flag_corruption_suspected` | `patching` | Notice |  |
| `win_component_store_file_repaired` | `patching` | Notice |  |
| `win_component_store_payload_corrupt` | `patching` | Notice |  |
| `win_component_store_payload_unrepairable` | `patching` | Warning |  |
| `win_component_store_repair_unavailable` | `patching` | Warning |  |
| `win_component_store_reprojection_failed` | `patching` | Notice |  |
| `win_component_store_scan_repaired_corruption` | `patching` | Notice |  |
| `win_servicing_commit_skipped_reboot_required` | `patching` | Notice |  |
| `win_servicing_component_manifest_unreadable` | `patching` | Notice |  |
| `win_servicing_delta_patch_failed` | `patching` | Notice |  |
| `win_servicing_duplicate_update_name` | `patching` | Notice |  |
| `win_servicing_package_manifest_unreadable` | `patching` | Debug |  |
| `win_servicing_package_stage_failed` | `patching` | Warning |  |
| `win_servicing_source_files_missing` | `patching` | Warning |  |
| `win_servicing_startup_package_failed` | `patching` | Notice |  |
| `win_servicing_update_package_create_failed` | `patching` | Warning |  |
| `win_sfc_repair_started` | `patching` | Notice |  |

## `win_component_store_assembly_missing`

A component assembly is missing from the store.

**Severity:** Notice

**Impact:** Windows will usually repair this automatically.

## `win_component_store_corruption`

The Windows component store is corrupt.

**Also reported by:** `win.eventlog.setup`

**Severity:** Warning or Notice

**Impact:** Servicing operations and updates may fail until the store is repaired. The scan_found arm alone does not mean anything is currently broken; package_blocked means a specific update did not apply.

## `win_component_store_corruption_recurring`

Windows reported how often component-store corruption has been detected.

**Severity:** Notice

**Impact:** None directly. A rising count suggests the underlying cause is not being fixed.

## `win_component_store_file_flag_corruption_suspected`

Windows suspects component-store file-flag corruption.

**Severity:** Notice

**Impact:** None established. The event records a suspicion, not a finding.

## `win_component_store_file_repaired`

Windows repaired a file from its component store or backup.

**Severity:** Notice

**Impact:** None. The file was restored.

## `win_component_store_payload_corrupt`

A payload file in the component store is corrupt.

**Severity:** Notice

**Impact:** Windows will usually repair this automatically.

## `win_component_store_payload_unrepairable`

Windows could not repair a damaged payload file.

**Severity:** Warning

**Impact:** Servicing operations needing this payload will fail until it is restored.

## `win_component_store_repair_unavailable`

Windows could not repair a damaged component.

**Severity:** Warning

**Impact:** Updates touching this component are likely to fail until it is repaired manually.

## `win_component_store_reprojection_failed`

Windows could not reproject a component.

**Severity:** Notice

**Impact:** Usually none: the operation is normally retried.

## `win_component_store_scan_repaired_corruption`

A component-store scan repaired corruption it found.

**Severity:** Notice

**Impact:** None. The damage was fixed.

## `win_servicing_commit_skipped_reboot_required`

A servicing change was deferred because a reboot is pending.

**Severity:** Notice

**Impact:** The change applies after the next reboot.

## `win_servicing_component_manifest_unreadable`

A component manifest is malformed.

**Severity:** Notice

**Impact:** Operations touching that component may fail.

## `win_servicing_delta_patch_failed`

A component delta patch could not be applied.

**Severity:** Notice

**Impact:** Usually none: Windows falls back to a full payload.

## `win_servicing_duplicate_update_name`

Windows found a duplicate update name in a package.

**Severity:** Notice

**Impact:** None established. It may indicate a store inconsistency.

## `win_servicing_package_manifest_unreadable`

Windows could not parse a package manifest.

**Severity:** Debug

**Impact:** That optional feature may not be installable.

## `win_servicing_package_stage_failed`

A Windows package could not be staged for installation.

**Severity:** Warning

**Impact:** That update will not install until the underlying cause is fixed.

## `win_servicing_source_files_missing`

A servicing operation could not find the source files it needed.

**Also reported by:** `win.servicing.dism`

**Severity:** Warning

**Impact:** Repair or install will keep failing until a valid source is supplied.

## `win_servicing_startup_package_failed`

A Windows package failed during startup processing.

**Severity:** Notice

**Impact:** That package is not installed. Patching status is better read from the update client.

## `win_servicing_update_package_create_failed`

Windows could not create an update package.

**Severity:** Warning

**Impact:** That update will not install until the underlying cause is fixed.

## `win_sfc_repair_started`

System File Checker started repairing components.

**Severity:** Notice

**Impact:** None on its own.
