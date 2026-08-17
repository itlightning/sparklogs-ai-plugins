<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.servicing.dism`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `bracket_hresult` | `patching` | Error / Warning |
| `cbs_session_options` | `patching` | Info |
| `cli_option_rejected` | `patching` | Warning |
| `dism_api_error` | `patching` | Error |
| `dism_package_manager_error` | `patching` | Error |
| `failed_generic` | `patching` | Error / Warning |
| `health_command` | `patching` | Notice |
| `hresult_error` | `patching` | Error / Warning |
| `lookup_dummy_path` | `patching` | Info cap |
| `provider_image_probe` | `patching` | Info cap |
| `reboot_required` | `patching` | Warning |
| `source_files_missing` | `patching` | Error |

## `bracket_hresult`

DISM emitted a bracketed HRESULT detail line.

**Severity:** Error / Warning

**Impact:** The HRESULT may explain why a DISM command or provider operation failed.

**Consider:**

- Search the exact HRESULT.
- Read the parent dated line when the bracket detail was joined.

## `cbs_session_options`

DISM recorded CBS session options for a servicing operation.

**Severity:** Info

**Impact:** Helps tie a DISM command to the corresponding CBS servicing window.

**Consider:**

- Use the timestamp to align DISM and CBS windows.

## `cli_option_rejected`

DISM rejected a command-line option in the current context.

**Severity:** Warning

**Impact:** The requested DISM command did not run as intended until the option or context is corrected.

**Consider:**

- Verify whether the option is supported for online vs offline images and this Windows build.

## `dism_api_error`

DISM API reported an error.

**Severity:** Error

**Impact:** A DISM API operation failed; the surrounding lines identify the operation and HRESULT.

**Consider:**

- Read nearby API operation and HRESULT lines.
- Ignore Time_InternalToPublic in this context; that noise is not this reason.

## `dism_package_manager_error`

DISM Package Manager failed during a servicing operation.

**Severity:** Error

**Impact:** The DISM operation did not complete successfully and may leave the image or component store unrepaired.

**Consider:**

- Check the operation name and HRESULT near the error.
- Pair with CBS.log for lower-level component details.

## `failed_generic`

DISM logged a failure outside a narrower DISM reason.

**Severity:** Error / Warning

**Impact:** A DISM step failed, but surrounding context is required to identify the exact operation and fix.

**Consider:**

- Read the surrounding command and component lines.
- Use the raw Failed text as the first search key.

## `health_command`

DISM ran a component-store health command.

**Severity:** Notice

**Impact:** Provides the command timeline for later health, source, or reboot outcomes.

**Consider:**

- Use as the start of a DISM health-operation timeline.
- Pair with CBS.log for corruption counts and per-file repair detail.

## `hresult_error`

DISM emitted a non-zero HRESULT or failed operation.

**Severity:** Error / Warning

**Impact:** A DISM step failed or degraded; the exact HRESULT and operation determine remediation.

**Consider:**

- Search the exact HRESULT.
- Prefer source_files_missing or package-manager-specific reasons when present.

## `lookup_dummy_path`

DISM missed a dummy path during session setup.

**Severity:** Info cap

**Consider:**

- Keep as context only.

## `provider_image_probe`

DISM rejected a path during routine imaging-provider discovery.

**Severity:** Info cap

**Consider:**

- Treat C: drive provider rejections as setup chatter unless a non-benign parent line also exists.

## `reboot_required`

DISM reported that a reboot is required.

**Severity:** Warning

**Impact:** Further updates or repairs may not complete until the host reboots.

**Consider:**

- Check whether later servicing failures occur before reboot.
- Use with pending-reboot state signals when available.

## `source_files_missing`

DISM could not find required repair source files.

**Severity:** Error

**Impact:** RestoreHealth or image repair cannot complete until a valid matching source is available.

**Consider:**

- Verify OS build and source-image match.
- Check /Source, /LimitAccess, policy, and Windows Update reachability.
