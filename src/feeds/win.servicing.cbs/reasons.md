<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.cbs`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign | use when |
|---|---|---|---|---|---|---|
| `win_component_store_assembly_missing` | win component store assembly missing | event | Notice | `patching` |  | CBS.log reports that a component assembly is missing from WinSxS, usually found while working out why an update or optional feature will not install. |
| `win_component_store_corruption` | win component store corruption | event | Notice to Warning | `patching` |  | an update, optional feature or repair stops because the WinSxS component store is damaged, or a scan recorded in CBS.log counted damage in it. |
| `win_component_store_corruption_recurring` | win component store corruption recurring | event | Notice | `patching` |  | a technician needs to know how many times Windows has found damage in this machine's component store, for example whether the damage keeps coming back after repairs. |
| `win_component_store_file_flag_corruption_suspected` | win component store file flag corruption suspected | event | Notice | `patching` |  | a technician reading a component-store scan in CBS.log finds a suspected file flag corruption line and needs to know whether it means the store is damaged. |
| `win_component_store_file_repaired` | win component store file repaired | event | Notice | `patching` |  | SFC or a store repair reports that it found and repaired damaged system files, and someone wants to know which file it was and whether follow-up is needed. |
| `win_component_store_payload_corrupt` | win component store payload corrupt | event | Notice | `patching` |  | a component-store scan in CBS.log lists damaged files inside WinSxS, and a technician needs to know which files before repairing the store. |
| `win_component_store_payload_unrepairable` | win component store payload unrepairable | event | Warning | `patching` |  | a store repair such as DISM /RestoreHealth could not fix a damaged file inside the component store and needs a good copy from Windows Update or install media. |
| `win_component_store_repair_unavailable` | win component store repair unavailable | event | Warning | `patching` |  | sfc /scannow says Windows Resource Protection found corrupt files but was unable to fix some of them. |
| `win_component_store_reprojection_failed` | win component store reprojection failed | event | Notice | `patching` |  | a technician finds a reprojection failure in CBS.log and needs to know whether a file in the running system may not match the copy in the component store. |
| `win_component_store_scan_repaired_corruption` | win component store scan repaired corruption | event | Notice | `patching` |  | DISM /RestoreHealth reports that it repaired the component store, and someone wants to know how much damage it fixed and whether any is left. |
| `win_servicing_commit_skipped_reboot_required` | win servicing commit skipped reboot required | event | Notice | `patching` |  | a Windows update seems to have done nothing, or shows as pending in patch reports, because the machine has not restarted since the change was staged. |
| `win_servicing_component_manifest_unreadable` | win servicing component manifest unreadable | event | Notice | `patching` |  | an update or repair fails on a component whose manifest in the store cannot be read, logged in CBS.log as a manifest format error. |
| `win_servicing_delta_patch_failed` | win servicing delta patch failed | event | Notice | `patching` |  | a cumulative update fails to install because Windows could not apply a delta to one component, usually because the base file in the store is damaged or missing. |
| `win_servicing_duplicate_update_name` | win servicing duplicate update name | event | Notice | `patching` |  | a technician finds a duplicate update name in a package in CBS.log and needs to know whether it stopped an install. |
| `win_servicing_package_manifest_unreadable` | win servicing package manifest unreadable | event | Debug | `patching` |  | an update or optional feature may not install or change state because Windows cannot read its package manifest, the .mum file for that package. |
| `win_servicing_package_stage_failed` | win servicing package stage failed | event | Warning | `patching` |  | an update fails before it can install because Windows could not stage it, the step that copies and prepares its files. |
| `win_servicing_source_files_missing` | win servicing source files missing | event | Warning | `patching` |  | a store repair or an optional feature install such as .NET Framework 3.5 fails, as logged in CBS.log, because Windows cannot get the files it needs, often on a machine that takes updates from WSUS. |
| `win_servicing_startup_package_failed` | win servicing startup package failed | event | Notice | `patching` |  | an update fails during the restart that was meant to finish installing it, and a technician needs the KB number of the package that failed. |
| `win_servicing_update_package_create_failed` | win servicing update package create failed | event | Warning | `patching` |  | an update refuses to install because the machine needs a newer servicing stack update (SSU) first, typical of a machine months behind on patches. |
| `win_sfc_repair_started` | win sfc repair started | event | Notice | `patching` |  | System File Checker found damaged system files and started repairing them, and a technician wants to know when and how the repair ended. |

## `win_component_store_assembly_missing`: win component store assembly missing

A component assembly is missing from the store.

**Use when:** CBS.log reports that a component assembly is missing from WinSxS, usually found while working out why an update or optional feature will not install.

**Keywords:** component assembly missing, missing component in WinSxS, WinSxS missing files, component store missing assembly, CBS.log assembly missing, update fails missing Windows component

**Severity:** Notice

**Why it matters:** Nothing has failed yet. An update or feature that needs the missing assembly can fail until the store is repaired.

**In practice:** An assembly is one versioned component in C:\Windows\WinSxS. CBS logged that an assembly it expected is not in the store. A store repair (DISM /RestoreHealth) restores missing assemblies from Windows Update or a source you give it.

**What to check:**

- Run DISM /Online /Cleanup-Image /RestoreHealth and look for a later record that the store was repaired.

**Related:**

- `win_component_store_corruption`: the store-wide record of damage

**Example:** CBS logs that an assembly it expected is missing from the store.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_assembly_missing, https://sparklogs.com/reference/reasons/win_component_store_assembly_missing.json

## `win_component_store_corruption`: win component store corruption

Windows found its component store (WinSxS) damaged, or a servicing operation stopped because of that damage.

**Use when:** an update, optional feature or repair stops because the WinSxS component store is damaged, or a scan recorded in CBS.log counted damage in it.

**Keywords:** component store corrupted, component store damaged, WinSxS corrupted, WinSxS corruption, The component store is repairable, updates fail store corruption, CBS.log corruption, Windows image corrupted, store corruptions were fixed

**Also reported by:** `win.eventlog.setup`

**Severity:** Warning or Notice

**Why it matters:** Updates, optional features and repairs that need the damaged components can fail until the store is repaired. When the record names a package that could not be resolved, that update did not install.

**In practice:** Windows keeps the files every update and feature is built from in the component store, C:\Windows\WinSxS, and logs its servicing work to C:\Windows\Logs\CBS\CBS.log. Three CBS.log lines mean the store is damaged: a scan summary with a Total Detected Corruption count above zero, an operation that failed with 0x80073712 (ERROR_SXS_COMPONENT_STORE_CORRUPT), and a package that could not be resolved with 0x800f0831 (CBS_E_STORE_CORRUPTION). The two error codes mean an operation has already stopped; a scan count alone has stopped nothing yet. The line "All WCP store corruptions were fixed" is filed under this reason code and marks the damage repaired. An update interrupted by a power loss or forced restart, and disk errors, are common causes.

**When to ignore:** The record that all store corruption was fixed is the good outcome and needs no action.

**What to check:**

- Run DISM /Online /Cleanup-Image /RestoreHealth, then sfc /scannow, then retry the update that failed.
- If RestoreHealth stops with 0x800f081f, give it a repair source: /Source pointing at install media of the same Windows build, with /LimitAccess.
- When the damage keeps coming back, check the disk with chkdsk and the System log for disk and NTFS errors.

**Related:**

- `win_component_store_corruption_recurring`: how many times Windows has found damage on this machine
- `win_component_store_repair_unavailable`: a damaged system file SFC could not repair
- `win_component_store_scan_repaired_corruption`: the repaired count from the same scan, which says whether the damage was fixed
- `win_servicing_source_files_missing`: a repair that stopped because it had no source of good files

**Example:** A DISM scan run by a technician reports two corrupt components in the store.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_corruption, https://sparklogs.com/reference/reasons/win_component_store_corruption.json

## `win_component_store_corruption_recurring`: win component store corruption recurring

Windows reported how often component-store corruption has been detected.

**Use when:** a technician needs to know how many times Windows has found damage in this machine's component store, for example whether the damage keeps coming back after repairs.

**Keywords:** corruption keeps coming back, repeated component store corruption, recurring WinSxS corruption, Count of times corruption detected, corruption detection count, store damage returns after repair, how often corruption found

**Severity:** Notice

**Why it matters:** Nothing on its own. A count above one means damage was found again after an earlier detection.

**In practice:** CBS keeps a running count of how many times it has found damage in this machine's component store and writes it to CBS.log with each detection. A count of one is a first finding. A count that grows over weeks points at something that keeps damaging the store, and failing storage is the first thing to rule out.

**When to ignore:** A count of one followed by a successful repair needs no further action.

**What to check:**

- Compare the count with earlier records from the same machine to see whether it is rising.
- Check the disk's health and the System log for disk and NTFS errors.
- If repairs keep being needed, an in-place repair upgrade of Windows replaces the whole store.

**Related:**

- `win_component_store_corruption`: the detection the count refers to

**Example:** CBS records that corruption has been detected once on a desktop whose scan just found damage.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_corruption_recurring, https://sparklogs.com/reference/reasons/win_component_store_corruption_recurring.json

## `win_component_store_file_flag_corruption_suspected`: win component store file flag corruption suspected

Windows suspects damaged file flags in the component store and keeps checking.

**Use when:** a technician reading a component-store scan in CBS.log finds a suspected file flag corruption line and needs to know whether it means the store is damaged.

**Keywords:** Suspected file flag corruption detected, file flag corruption, suspected corruption CBS.log, component store file flags, WinSxS file flags wrong

**Severity:** Notice

**Why it matters:** None established. Windows records a suspicion and carries on.

**In practice:** During a store scan or repair, CBS found every payload file present but suspects the flags it keeps on those files are wrong, and continues to gather more information. The line makes no finding by itself. A corruption record from the same run means the store was damaged; no such record means the scan found nothing to fix.

**When to ignore:** When no corruption record follows from the same run.

**What to check:**

- Read the records from the rest of the same run before acting.

**Related:**

- `win_component_store_corruption`: a scan that did find damage

**Example:** A RestoreHealth run notes suspected file flag damage and carries on scanning.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_file_flag_corruption_suspected, https://sparklogs.com/reference/reasons/win_component_store_file_flag_corruption_suspected.json

## `win_component_store_file_repaired`: win component store file repaired

Windows repaired a file from its component store or backup.

**Use when:** SFC or a store repair reports that it found and repaired damaged system files, and someone wants to know which file it was and whether follow-up is needed.

**Keywords:** found corrupt files and successfully repaired them, sfc repaired files, SFC fixed corrupt files, system file restored, Repairing corrupted file, by copying from backup, by copying from store, same file repaired every scan

**Severity:** Notice

**Why it matters:** None now: the file was replaced with a good copy.

**In practice:** SFC or a store repair found a damaged system file and replaced it with a good copy, from the component store or from a backup copy Windows keeps. The file name is on the line. One repair after an interrupted update or a crash is routine; the same file repaired run after run points at something that keeps changing it.

**When to ignore:** A single repair with no cannot-repair record from the same run.

**What to check:**

- If the same file is repaired on every run, look for software or a disk fault that keeps changing it.

**Related:**

- `win_component_store_repair_unavailable`: a file that could not be repaired
- `win_sfc_repair_started`: the start of the SFC repair

**Example:** SFC replaces one damaged library with a good copy from backup.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_file_repaired, https://sparklogs.com/reference/reasons/win_component_store_file_repaired.json

## `win_component_store_payload_corrupt`: win component store payload corrupt

A payload file in the component store is corrupt.

**Use when:** a component-store scan in CBS.log lists damaged files inside WinSxS, and a technician needs to know which files before repairing the store.

**Keywords:** corrupt payload file, WinSxS file corrupt, damaged file in component store, component store file damaged, DISM ScanHealth corrupt files, many corrupt files in CBS.log

**Severity:** Notice

**Why it matters:** Nothing has failed yet. Updates or repairs that need this file can fail if it is not repaired.

**In practice:** During a store scan, Windows checks each file in the component store and lists every damaged one in CBS.log as "CSI Payload Corrupt" with its path. The corrupt_file field carries the path and corrupt_component the component name. A damaged store often produces many of these lines in one run, one per file; the scan summary and the repair records say whether they were fixed.

**When to ignore:** When a repair from the same run reports the damage fixed.

**What to check:**

- Group the records by corrupt_component to see how many components are affected.
- Run DISM /Online /Cleanup-Image /RestoreHealth if no repair followed.

**Related:**

- `win_component_store_corruption`: the scan summary for the whole store
- `win_component_store_payload_unrepairable`: a damaged payload file the repair could not fix

**Example:** A ScanHealth run lists one damaged library in the store.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_payload_corrupt, https://sparklogs.com/reference/reasons/win_component_store_payload_corrupt.json

## `win_component_store_payload_unrepairable`: win component store payload unrepairable

Windows could not repair a damaged payload file.

**Use when:** a store repair such as DISM /RestoreHealth could not fix a damaged file inside the component store and needs a good copy from Windows Update or install media.

**Keywords:** RestoreHealth could not repair file, DISM repair failed for file, component store cannot be repaired, store file left damaged, unrepairable file

**Severity:** Warning

**Why it matters:** The damaged file stays in the component store. Updates and features that need it can fail until the store is repaired from another source.

**In practice:** A payload file is a file stored inside the component store, the copy Windows builds the running system from. During a store repair, Windows found one damaged and had no good copy to replace it with, so it logged "Unable to repair payload file" with the file name, which also rides the unrepairable_file field. The repair needs a good copy from outside the machine: Windows Update, or install media of the same build.

**What to check:**

- Run DISM /Online /Cleanup-Image /RestoreHealth with Windows Update reachable, or with /Source and /LimitAccess pointing at install media of the same Windows build and edition.
- On a WSUS-managed machine, allow repair content from Windows Update with the Group Policy setting Specify settings for optional component installation and component repair.

**Related:**

- `win_component_store_payload_corrupt`: the detection of a damaged payload file, before any repair
- `win_component_store_repair_unavailable`: SFC failing to repair a file in the running system

**Example:** A RestoreHealth run cannot repair one damaged library in the store.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_payload_unrepairable, https://sparklogs.com/reference/reasons/win_component_store_payload_unrepairable.json

## `win_component_store_repair_unavailable`: win component store repair unavailable

Windows could not repair a damaged system file.

**Use when:** sfc /scannow says Windows Resource Protection found corrupt files but was unable to fix some of them.

**Keywords:** sfc could not fix files, sfc unable to fix, SFC cannot repair, sfc /scannow failed to repair, corrupt system file not fixed, same file corrupt every sfc run, System File Checker could not repair

**Severity:** Warning

**Why it matters:** The damaged file stays in place. Programs or updates that use it can fail, and SFC reports the same file on every run until the store copy it repairs from is fixed.

**In practice:** SFC replaces damaged protected files with good copies from the component store. When the store's copy is damaged or missing too, it writes "Cannot repair member file" with the file name to CBS.log. This is the line behind the sfc /scannow message that Windows Resource Protection found corrupt files but was unable to fix some of them.

**What to check:**

- Run DISM /Online /Cleanup-Image /RestoreHealth to repair the store, then run sfc /scannow again.
- If RestoreHealth cannot find source files, give it /Source with install media of the same Windows build.

**Related:**

- `win_component_store_file_repaired`: a file that was repaired
- `win_component_store_payload_unrepairable`: a damaged file inside the store itself that the store repair could not fix
- `win_servicing_source_files_missing`: a store repair that stopped for want of a source

**Example:** SFC reports that it cannot repair one damaged library on a workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_repair_unavailable, https://sparklogs.com/reference/reasons/win_component_store_repair_unavailable.json

## `win_component_store_reprojection_failed`: win component store reprojection failed

Windows could not reproject a component from the store into the running system.

**Use when:** a technician finds a reprojection failure in CBS.log and needs to know whether a file in the running system may not match the copy in the component store.

**Keywords:** reproject failed, reprojection failure, component projection failed, system file does not match WinSxS, System32 file out of sync with store

**Severity:** Notice

**Why it matters:** None established by this line alone. The component's files in the running system may not match the store until a later update or repair succeeds.

**In practice:** Windows installs system files by projecting them from the component store into their working locations, such as C:\Windows\System32. CBS logged a failure reprojecting one component. The line does not say whether a later step succeeded, so read the servicing session around it.

**What to check:**

- Check the same session for a failed update or a corruption record before acting.
- If updates fail on this machine, run DISM /Online /Cleanup-Image /RestoreHealth and then sfc /scannow.

**Related:**

- `win_component_store_corruption`: damage in the store itself

**Example:** CBS logs a failed reprojection of one component during an update.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_reprojection_failed, https://sparklogs.com/reference/reasons/win_component_store_reprojection_failed.json

## `win_component_store_scan_repaired_corruption`: win component store scan repaired corruption

A component store repair fixed damage it found.

**Use when:** DISM /RestoreHealth reports that it repaired the component store, and someone wants to know how much damage it fixed and whether any is left.

**Keywords:** component store repaired, RestoreHealth repaired corruption, DISM fixed corruption, WinSxS repaired, store repair succeeded, corruption fixed by DISM, repaired count lower than detected

**Severity:** Notice

**Why it matters:** Nothing is broken now. The machine needed its system files repaired, which matters if the damage comes back or other faults follow.

**In practice:** When DISM /RestoreHealth finishes, CBS.log ends the run with a summary whose Total Repaired Corruption count is above zero; the count rides the repaired_corruption field. The Total Detected Corruption line written just before it says how much was found. When the two counts match, the store is clean again; when fewer were repaired than found, the rest is still damaged.

**When to ignore:** A single repair whose repaired count matches the detected count needs no further action.

**What to check:**

- Compare the repaired count with the detected count from the same run; any shortfall is still damaged.
- Run sfc /scannow afterwards so the running system files match the repaired store.
- If the machine needs another repair within weeks, check the disk and the System log for storage errors.

**Related:**

- `win_component_store_corruption`: the detected count and the other records of a damaged store
- `win_sfc_repair_started`: System File Checker repairing running system files, a separate tool from the DISM store repair

**Example:** A RestoreHealth run repairs the two corrupt components its scan found.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_component_store_scan_repaired_corruption, https://sparklogs.com/reference/reasons/win_component_store_scan_repaired_corruption.json

## `win_servicing_commit_skipped_reboot_required`: win servicing commit skipped reboot required

A servicing change was deferred because a reboot is pending.

**Use when:** a Windows update seems to have done nothing, or shows as pending in patch reports, because the machine has not restarted since the change was staged.

**Keywords:** update pending restart, servicing change pending reboot, restart required to finish update, update installed but not applied, patch not installed until reboot, transaction commit was skipped, RebootPending, update waiting for restart

**Severity:** Notice

**Why it matters:** The update or feature change is not in effect until the machine restarts, so patch reports can show it pending or not installed.

**In practice:** CBS logs this when a package needs a restart before its change can be committed, usually because files it replaces are in use. The change is staged and Windows finishes it during the next restart. It is the usual reason a patch run seemed to do nothing on a machine that has not restarted since.

**When to ignore:** On a machine that restarts soon after, or already has a restart scheduled.

**What to check:**

- Check when the machine last restarted, and schedule a restart if updates are pending.
- If the change is still pending after a restart, look for a failed update record from that restart.

**Related:**

- `win_dism_reboot_required`: a DISM change waiting for a restart
- `win_servicing_startup_package_failed`: a package that failed when the restart tried to finish it

**Example:** A cumulative update stages on a server overnight and waits for the next restart to finish.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_commit_skipped_reboot_required, https://sparklogs.com/reference/reasons/win_servicing_commit_skipped_reboot_required.json

## `win_servicing_component_manifest_unreadable`: win servicing component manifest unreadable

A component manifest is malformed.

**Use when:** an update or repair fails on a component whose manifest in the store cannot be read, logged in CBS.log as a manifest format error.

**Keywords:** manifest format error, corrupt component manifest, WinSxS manifest corrupt, component manifest XML error, component manifest damaged

**Severity:** Notice

**Why it matters:** An update or repair that touches that component can fail.

**In practice:** Every component in the store has a manifest, an XML file that describes it. CBS logged that one could not be read because its format is wrong, with ERROR_SXS_MANIFEST_FORMAT_ERROR or HRESULT 0x80073715. A damaged manifest is store damage, and DISM /RestoreHealth repairs manifests as well as files.

**What to check:**

- Run DISM /Online /Cleanup-Image /RestoreHealth, then retry the operation that failed.

**Related:**

- `win_component_store_corruption`: the store-wide record of damage
- `win_servicing_package_manifest_unreadable`: the manifest of a whole update or feature package, not of one component

**Example:** An update stops because CBS cannot read one component's manifest.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_component_manifest_unreadable, https://sparklogs.com/reference/reasons/win_servicing_component_manifest_unreadable.json

## `win_servicing_delta_patch_failed`: win servicing delta patch failed

Windows could not apply a delta update to a component.

**Use when:** a cumulative update fails to install because Windows could not apply a delta to one component, usually because the base file in the store is damaged or missing.

**Keywords:** delta update failed, forward delta failed, delta patch failed, base file missing for update, matching binary missing, cumulative update delta failed

**Severity:** Notice

**Why it matters:** The update that carried the delta can fail to install. A repeat on the same update points at damaged files in the store.

**In practice:** Cumulative updates ship most files as deltas, the differences from a base version already in the component store. 0x800f0986 (PSFX_E_APPLY_FORWARD_DELTA_FAILED) means applying a delta failed. 0x800f0984 (PSFX_E_MATCHING_BINARY_MISSING) means the component's folder exists but the base file the delta needs is missing. Both point at a store copy that is damaged or missing.

**What to check:**

- Check whether the update that was installing at the time later failed.
- Run DISM /Online /Cleanup-Image /RestoreHealth, then retry the update.

**Related:**

- `win_component_store_corruption`: the store-wide record of damage

**Example:** A monthly cumulative update cannot apply a delta to one component.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_delta_patch_failed, https://sparklogs.com/reference/reasons/win_servicing_delta_patch_failed.json

## `win_servicing_duplicate_update_name`: win servicing duplicate update name

Windows found a duplicate update name in a package.

**Use when:** a technician finds a duplicate update name in a package in CBS.log and needs to know whether it stopped an install.

**Keywords:** duplicate update name, duplicate updatename, duplicate update in package, mum file duplicate update

**Severity:** Notice

**Why it matters:** None established. CBS logs it and continues.

**In practice:** While reading a package, CBS found two updates with the same name, logged 0x800f0819 (CBS_E_DUPLICATE_UPDATENAME), and carried on. It points at an inconsistency in how a package was registered on this machine.

**When to ignore:** When updates on the machine install normally.

**What to check:**

- Act only if updates are also failing on the machine; then run DISM /Online /Cleanup-Image /RestoreHealth and retry them.

**Example:** CBS finds a duplicate update name while reading an installed package, and continues.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_duplicate_update_name, https://sparklogs.com/reference/reasons/win_servicing_duplicate_update_name.json

## `win_servicing_package_manifest_unreadable`: win servicing package manifest unreadable

Windows could not parse a package manifest.

**Use when:** an update or optional feature may not install or change state because Windows cannot read its package manifest, the .mum file for that package.

**Keywords:** Failed to parse package manifest, mum file corrupt, package manifest corrupt, .mum file, servicing Packages folder, feature package unreadable

**Severity:** Debug

**Why it matters:** That update or optional feature may not install or change state.

**In practice:** A package manifest, a .mum file under C:\Windows\servicing\Packages, describes one update or optional feature. CBS could not parse one and names the file on the line.

**When to ignore:** When no update or feature change is failing on the machine.

**What to check:**

- If a feature will not install or remove, check whether its package is the one named.

**Related:**

- `win_dism_feature_change_failed`: a feature that could not be turned on or off
- `win_servicing_component_manifest_unreadable`: the manifest of one component inside the store

**Example:** CBS cannot parse the manifest of one optional-feature package while listing packages.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_package_manifest_unreadable, https://sparklogs.com/reference/reasons/win_servicing_package_manifest_unreadable.json

## `win_servicing_package_stage_failed`: win servicing package stage failed

Windows could not stage an update package for installation.

**Use when:** an update fails before it can install because Windows could not stage it, the step that copies and prepares its files.

**Keywords:** update staging failed, failed to stage package, package staging error, update not staged, could not prepare update files

**Severity:** Warning

**Why it matters:** That update did not reach the point where it can install.

**In practice:** Windows stages a package, copying and preparing its files, before it installs it. CBS logged that it could not move a package to the Staged state, with HRESULT 0x800f0816. The Setup log in Event Viewer (Windows Logs > Setup) records a package that failed to change state as Servicing event 3, which names the package and the error.

**What to check:**

- Find the Servicing event 3 in the Setup log from the same time for the package name.
- Retry the update; if it fails again with the same code, run DISM /Online /Cleanup-Image /RestoreHealth and retry.

**Related:**

- `patch_install_failed`: the Setup log record of a package that failed to change state, which names the package

**Example:** A cumulative update fails to stage on a laptop during an overnight install.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_package_stage_failed, https://sparklogs.com/reference/reasons/win_servicing_package_stage_failed.json

## `win_servicing_source_files_missing`: win servicing source files missing

A servicing operation could not find the source files it needed.

**Use when:** a store repair or an optional feature install such as .NET Framework 3.5 fails, as logged in CBS.log, because Windows cannot get the files it needs, often on a machine that takes updates from WSUS.

**Keywords:** .NET Framework 3.5 won't install, .NET 3.5 install fails, source files missing, repair source files missing, WSUS feature install fails, optional component installation and component repair, feature on demand source files missing, CBS.log source missing

**Also reported by:** `win.servicing.dism`

**Severity:** Warning

**Why it matters:** The repair or feature install fails, and fails the same way on every retry, until a source with the right files is available.

**In practice:** A store repair or an optional-feature install, such as .NET Framework 3.5, needed files that are not on the machine and could not get them, so CBS logged 0x800f081f (CBS_E_SOURCE_MISSING). Windows fetches these files from Windows Update by default. A machine that takes updates from WSUS, or has no internet route, often cannot reach that source unless Group Policy allows it.

**What to check:**

- Run the command again with /Source pointing at install media of the same Windows build and edition, and /LimitAccess.
- Or allow Windows Update as the repair source: Computer Configuration > Administrative Templates > System > Specify settings for optional component installation and component repair.

**Related:**

- `win_component_store_payload_unrepairable`: a damaged store file left unrepaired
- `win_dism_feature_change_failed`: the DISM record of a feature that could not be turned on or off

**Example:** A RestoreHealth run on a WSUS-managed server stops because it cannot reach a repair source.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_source_files_missing, https://sparklogs.com/reference/reasons/win_servicing_source_files_missing.json

## `win_servicing_startup_package_failed`: win servicing startup package failed

A Windows update package failed while Windows processed it during startup.

**Use when:** an update fails during the restart that was meant to finish installing it, and a technician needs the KB number of the package that failed.

**Keywords:** update package failed during startup processing, update failed during reboot, update failed at startup, KB failed after reboot, update install failed on boot

**Severity:** Notice

**Why it matters:** That update did not install. Windows Update history and the RMM patch report show its status.

**In practice:** Some updates finish installing while Windows starts after a restart. CBS logged that a package, named on the line with its KB number, failed at that stage with HRESULT 0x800f0826. The line names the package but not why it failed.

**What to check:**

- Look up the KB named on the line in Windows Update history and the RMM patch report.
- Find the Servicing event 3 in the Setup log from the same restart for the error.

**Related:**

- `patch_install_failed`: the Setup log record of a package that failed to change state
- `win_servicing_commit_skipped_reboot_required`: a change deferred to the next restart

**Example:** After a restart, a cumulative update fails during startup processing on a desktop.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_startup_package_failed, https://sparklogs.com/reference/reasons/win_servicing_startup_package_failed.json

## `win_servicing_update_package_create_failed`: win servicing update package create failed

An update could not be processed because it needs a newer servicing stack than the one installed.

**Use when:** an update refuses to install because the machine needs a newer servicing stack update (SSU) first, typical of a machine months behind on patches.

**Keywords:** servicing stack update required first, update needs newer SSU, install SSU first, servicing stack too old, newer servicing stack required, update needs newer update first

**Severity:** Warning

**Why it matters:** That update will not install until a newer servicing stack is on the machine.

**In practice:** CBS logged "Failed to create windows update package" with HRESULT 0x800f0823, which Microsoft names CBS_E_NEW_SERVICING_STACK_REQUIRED. The servicing stack is the part of Windows that installs updates, and this update needs a newer one. It happens on machines that missed a servicing stack update, often ones that are months behind on patches.

**What to check:**

- Install the latest servicing stack update for this Windows version, then retry the update.
- On WSUS, check that servicing stack updates are approved for this machine's group.

**Related:**

- `patch_install_failed`: the Setup log record of a package that failed to change state

**Example:** A server months behind on patches cannot process a new cumulative update until its servicing stack is updated.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_servicing_update_package_create_failed, https://sparklogs.com/reference/reasons/win_servicing_update_package_create_failed.json

## `win_sfc_repair_started`: win sfc repair started

System File Checker started repairing components.

**Use when:** System File Checker found damaged system files and started repairing them, and a technician wants to know when and how the repair ended.

**Keywords:** SFC repair started, sfc started repairing files, System File Checker repairing, sfc found damage and started repair, Repairing components, protected system files damaged

**Severity:** Notice

**Why it matters:** None by itself. It shows that protected system files on this machine were damaged and SFC is replacing them.

**In practice:** System File Checker (sfc /scannow) logs its work in CBS.log with an [SR] prefix. This line says it is repairing a number of components with damaged files. The form with a zero count is SFC's routine verification and is not collected. The records that follow say how it went: files repaired from backup or from the store, or files it cannot repair.

**When to ignore:** When repaired-file records follow and no cannot-repair record does, the repair is done.

**What to check:**

- Look for records from the same run that SFC repaired files, or could not repair them.
- If SFC could not repair some files, run DISM /Online /Cleanup-Image /RestoreHealth and then sfc /scannow again.

**Related:**

- `win_component_store_file_repaired`: a file SFC restored
- `win_component_store_repair_unavailable`: a file SFC could not restore

**Example:** SFC starts repairing three components with damaged files.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-cbs#win_sfc_repair_started, https://sparklogs.com/reference/reasons/win_sfc_repair_started.json
