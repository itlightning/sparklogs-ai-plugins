<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.dism`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign | use when |
|---|---|---|---|---|---|---|
| `win_dism_command_failed` | win dism command failed | event | Info | `patching` |  | a DISM command run by a technician, a script or an RMM tool ends in error, and a technician needs the error code and which command failed. |
| `win_dism_feature_change_failed` | win dism feature change failed | event | Info | `patching` |  | turning a Windows optional feature on or off with DISM or PowerShell, such as .NET Framework 3.5, SMB 1.0 or Hyper-V, fails and leaves it in its old state. |
| `win_dism_health_command_run` | win dism health command run | event | Info | `patching` |  | someone asks whether a person or script ran a DISM health check or repair on this machine, and when. |
| `win_dism_reboot_required` | win dism reboot required | event | Info | `patching` |  | a feature, package or repair made with DISM is not finished until the machine restarts, and someone asks whether the change has taken effect yet. |
| `win_servicing_source_files_missing` | win servicing source files missing | event | Notice | `patching` |  | DISM /RestoreHealth or a feature install such as .NET Framework 3.5 stops because the source files could not be found, often on a machine that takes updates from WSUS. |

## `win_dism_command_failed`: win dism command failed

A DISM command reported failure.

**Use when:** a DISM command run by a technician, a script or an RMM tool ends in error, and a technician needs the error code and which command failed.

**Keywords:** DISM failed, DISM error, DISM command failed, DISM error code, dism.log error, DISM HRESULT

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

**Use when:** turning a Windows optional feature on or off with DISM or PowerShell, such as .NET Framework 3.5, SMB 1.0 or Hyper-V, fails and leaves it in its old state.

**Keywords:** DISM feature enable failed, enable feature failed, disable feature failed, Enable-WindowsOptionalFeature, Disable-WindowsOptionalFeature, /Enable-Feature, features could not be enabled, optional feature install failed, SMB1 enable failed, Hyper-V enable failed

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

**Use when:** someone asks whether a person or script ran a DISM health check or repair on this machine, and when.

**Keywords:** when was DISM run, DISM was run, DISM repair run, DISM health check, DISM RestoreHealth ran, Cleanup-Image, component cleanup run, Windows image repair tool

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

**Use when:** a feature, package or repair made with DISM is not finished until the machine restarts, and someone asks whether the change has taken effect yet.

**Keywords:** DISM restart required, DISM reboot required, Do you want to restart the computer now, DISM exit code 3010, feature needs restart, restart to finish feature install, DISM change pending

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

**Use when:** DISM /RestoreHealth or a feature install such as .NET Framework 3.5 stops because the source files could not be found, often on a machine that takes updates from WSUS.

**Keywords:** DISM source files not found, DISM /Source, LimitAccess, install.wim source, install media as repair source, RestoreHealth source missing, .NET 3.5 DISM fails, WSUS repair source

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
