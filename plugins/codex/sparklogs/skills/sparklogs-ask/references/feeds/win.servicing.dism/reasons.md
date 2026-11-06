<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.dism`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `win_dism_command_failed` | win dism command failed | event | Info | `patching` |  |
| `win_dism_feature_change_failed` | win dism feature change failed | event | Info | `patching` |  |
| `win_dism_health_command_run` | win dism health command run | event | Info | `patching` |  |
| `win_dism_reboot_required` | win dism reboot required | event | Info | `patching` |  |
| `win_servicing_source_files_missing` | win servicing source files missing | event | Notice | `patching` |  |

## `win_dism_command_failed`: win dism command failed

A DISM command reported failure.

**Severity:** Info

**Why it matters:** The command did not complete. What that costs depends on the command, which the command-line record from the same session names.

**In practice:** DISM writes "processed the command line but failed" to dism.log, with an HRESULT, when a command ends in error. 0x800f081f and 0x800f0954 on a repair or feature install mean DISM could not get the files it needed, often on a machine that takes updates from WSUS. Failures with 0x80010108 are not collected: that code means the calling program lost its connection to DISM, which is how some RMM inventory polls end, and it says nothing about servicing.

**When to ignore:** When the failed command is an inventory or status query your RMM runs and its next run succeeds.

**What to check:**

- Find the command line DISM ran just before it, in the same session.
- For 0x800f081f or 0x800f0954, give DISM a /Source or allow Windows Update in Group Policy, then run it again.

**Related:**

- `win_dism_health_command_run`: the health or repair command that was run
- `win_servicing_source_files_missing`: a repair or feature install that could not find its source files

**Example:** A RestoreHealth run on a WSUS-managed workstation ends with HRESULT 0x800F0954.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-dism#win_dism_command_failed, https://sparklogs.com/reference/reasons/win_dism_command_failed.json

## `win_dism_feature_change_failed`: win dism feature change failed

A Windows optional feature could not be enabled or disabled.

**Severity:** Info

**Why it matters:** The feature is not in the state that was asked for: an enable left it off, a disable left it on.

**In practice:** DISM logged to dism.log that it could not enable or disable a Windows optional feature, such as .NET Framework 3.5, SMB 1.0 or Hyper-V. Common causes are missing source files, a restart still pending from earlier servicing, and a damaged component store. The HRESULT in dism.log, and the CBS records from the same time, say which.

**What to check:**

- Check whether a restart is pending, and restart before retrying.
- For 0x800f081f or 0x800f0954, give DISM a /Source or allow Windows Update in Group Policy.
- Check the CBS records from the same time for store damage.

**Related:**

- `win_servicing_package_manifest_unreadable`: the CBS record of a feature package Windows could not read
- `win_servicing_source_files_missing`: the source files the feature needed could not be found

**Example:** Enabling .NET Framework 3.5 on a server fails because the feature files are not available.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-dism#win_dism_feature_change_failed, https://sparklogs.com/reference/reasons/win_dism_feature_change_failed.json

## `win_dism_health_command_run`: win dism health command run

A DISM health or repair command was run on this machine.

**Severity:** Info

**Why it matters:** None: it records an action. Someone, or a script, was working on this machine's servicing at that time.

**In practice:** DISM writes every command line it runs to C:\Windows\Logs\DISM\dism.log. SparkLogs keeps only the health and repair commands: /CheckHealth, /ScanHealth, /RestoreHealth, /AnalyzeComponentStore and /StartComponentCleanup. Inventory commands such as the /Get-Packages listings many RMM tools run are not collected. What the scan found and repaired is in CBS.log, which SparkLogs also collects.

**When to ignore:** A health check your RMM runs on a schedule, when the CBS records from that run show no damage.

**What to check:**

- Check who or what ran it: a technician, an RMM script or a scheduled task.
- Read the CBS records from the same time for what the scan found and repaired.

**Related:**

- `win_component_store_corruption`: what a scan found wrong with the store
- `win_component_store_scan_repaired_corruption`: what a repair fixed
- `win_dism_command_failed`: a DISM command that ended in error

**Example:** A technician runs DISM /Online /Cleanup-Image /RestoreHealth on a workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-dism#win_dism_health_command_run, https://sparklogs.com/reference/reasons/win_dism_health_command_run.json

## `win_dism_reboot_required`: win dism reboot required

A DISM change needs a reboot to take effect.

**Severity:** Info

**Why it matters:** The change DISM made is not complete until the machine restarts.

**In practice:** DISM writes "Reboot required=yes" to dism.log when it closes a session whose change, such as a feature enable, package install or repair, needs a restart to finish. Until the restart, the change is pending.

**When to ignore:** When a restart is already planned or follows soon after.

**What to check:**

- Schedule a restart, then confirm the change took effect.

**Related:**

- `win_servicing_commit_skipped_reboot_required`: the CBS record of an update waiting for a restart

**Example:** Enabling an optional feature on a workstation leaves a restart pending.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-dism#win_dism_reboot_required, https://sparklogs.com/reference/reasons/win_dism_reboot_required.json

## `win_servicing_source_files_missing`: win servicing source files missing

A DISM operation could not find the source files it needed.

**Also reported by:** `win.servicing.cbs`

**Severity:** Notice

**Why it matters:** The repair or feature install stops, and every retry stops the same way until DISM has a source with the right files.

**In practice:** DISM reports 0x800f081f (CBS_E_SOURCE_MISSING), "The source files could not be found", when RestoreHealth or a feature install such as .NET Framework 3.5 needs files that are neither on the machine nor reachable. By default DISM downloads them from Windows Update, which machines that use WSUS or have no internet access often cannot reach.

**What to check:**

- Retry with /Source pointing at install media (install.wim or install.esd) of the same Windows build and edition, plus /LimitAccess to skip Windows Update.
- Or set the Group Policy Specify settings for optional component installation and component repair to allow Windows Update or a network repair source.

**Related:**

- `win_dism_command_failed`: the failed command's own outcome line
- `win_dism_feature_change_failed`: a feature that could not be turned on or off

**Example:** RestoreHealth on a WSUS-managed server stops with 0x800f081f.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/servicing-dism#win_servicing_source_files_missing, https://sparklogs.com/reference/reasons/win_servicing_source_files_missing.json
