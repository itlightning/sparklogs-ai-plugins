<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.apps`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `appid_certificate_store_verification_failed` | `security_audit` | Debug |  |
| `appid_certificate_store_verified` | `security_audit` | Info |  |
| `appx_activation_failed` | `app_stability` | Notice or Info | benign possible |
| `appx_cleanup_residue` | `patching` | Debug | benign possible |
| `appx_deployment_failed` | `patching` | Notice, Info or Verbose | benign possible |
| `appx_deployment_requeued` | `patching` | Verbose |  |
| `appx_package_runtime_corrupt` | `app_stability` | Warning or Notice |  |
| `appx_provisioning_failed` | `app_stability` | Notice or Info | benign possible |
| `appx_service_start_failed` | `patching` | Notice or Info | benign possible |
| `perf_counter_provider_failed` | `app_stability` | Debug |  |
| `wcf_request_failed` | `app_stability` | Minor |  |

## `appid_certificate_store_verification_failed`

The AppID service reported a certificate-store verification failure.

**Severity:** Debug

**Impact:** This is AppID context until AppLocker records establish an enforcement impact.

**Consider:**

- Compare the result with AppLocker records before treating it as a rule-evaluation failure.

## `appid_certificate_store_verified`

The AppID service reported a successful certificate-store verification.

**Severity:** Info

**Impact:** Retained as context for nearby failures; does not by itself establish enforcement.

**Consider:**

- Read this as the denominator beside nearby verification failures.

## `appx_activation_failed`

A packaged application did not start.

**Also reported by:** `win.eventlog.application`

**Severity:** Notice or Info

**Impact:** The event describes one application activation attempt.

**Consider:**

- Read the app identity and error code.
- A timeout is not proof that the package is damaged.

## `appx_cleanup_residue`

During package cleanup, Windows could not remove every file or registry entry.

**Severity:** Debug

**Impact:** A later cleanup pass may remove the residue.

**Consider:**

- Use the folder count when disk space is a concern.
- Investigate a rising count or other error codes.

## `appx_deployment_failed`

A packaged-app operation failed for a user on this device.

**Severity:** Notice, Info or Verbose

**Impact:** The event records one failed attempt and does not establish how long the package remains unavailable.

**Consider:**

- Read the operation and error code first.
- Pivot on the package across users and hosts.

## `appx_deployment_requeued`

The deployment service put a packaged-app attempt back on its queue, and the requeue reason says why.

**Severity:** Verbose

**Consider:**

- Read the requeue reason and the operation, then pivot on the package across devices.
- A package family that reappears day after day is a deployment that never completes.

These records are rate-bounded: one per package family per device per day, with the count of what a day suppressed carried on the next day's first record.

## `appx_package_runtime_corrupt`

A package runtime record is corrupted.

**Severity:** Warning or Notice

**Impact:** Apps in that package family can fail to launch until the package is repaired.

**Consider:**

- Check whether a repair-unavailable record follows the repair attempt.

## `appx_provisioning_failed`

App Readiness reported a failed packaged-app operation.

**Severity:** Notice or Info

**Impact:** The event records one operation and its result.

**Consider:**

- Read the operation and result code.
- Pivot on package and user context across hosts.

## `appx_service_start_failed`

The packaged-app deployment client could not start or reach a service.

**Severity:** Notice or Info

**Impact:** Packaged apps may not deploy for that logon.

**Consider:**

- Read the error code before treating a restart race as a service failure.

## `perf_counter_provider_failed`

A performance-counter provider could not register or create a counter object.

**Severity:** Debug

**Impact:** A monitoring tool can miss readings from that provider.

**Consider:**

- Read the counter identifier and error code in the preserved payload.

## `wcf_request_failed`

A hosted service reported an exception while processing a request.

**Also reported by:** `win.eventlog.application`

**Severity:** Minor

**Impact:** The record identifies an application request path that raised an exception.

**Consider:**

- Compare exception families with the application's request records.
