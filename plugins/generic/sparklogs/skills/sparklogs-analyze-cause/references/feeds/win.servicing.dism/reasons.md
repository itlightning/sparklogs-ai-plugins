<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.dism`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `win_dism_command_failed` | `patching` | Info |  |
| `win_dism_feature_change_failed` | `patching` | Info |  |
| `win_dism_health_command_run` | `patching` | Info |  |
| `win_dism_reboot_required` | `patching` | Info |  |
| `win_dism_source_files_missing` | `patching` | Notice |  |

## `win_dism_command_failed`

A DISM command reported failure.

**Severity:** Info

**Impact:** Depends on the command. Read the servicing outcome from CBS rather than from the tool exit.

## `win_dism_feature_change_failed`

A Windows optional feature could not be enabled or disabled.

**Severity:** Info

**Impact:** That feature is not in the requested state.

## `win_dism_health_command_run`

A DISM health or repair command was run on this machine.

**Severity:** Info

**Impact:** None. This records an action, not a fault.

## `win_dism_reboot_required`

A DISM change needs a reboot to take effect.

**Severity:** Info

**Impact:** The change applies after the next reboot.

## `win_dism_source_files_missing`

A DISM operation could not find the source files it needed.

**Severity:** Notice

**Impact:** Repair or install will keep failing until a valid source is supplied.
