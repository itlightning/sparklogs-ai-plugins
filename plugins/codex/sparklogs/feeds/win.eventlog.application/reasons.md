<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.application`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `app_crash` | `app_stability` | Error |
| `app_crash_report` | `app_stability` | Notice |
| `app_hang` | `app_stability` | Error |
| `ca_chain_fail` | `certificates` | Error |
| `ca_crl_fail` | `certificates` | Error |
| `cert_enroll_fail` | `certificates` | Warning, or Verbose for the retired-endpoint shape |
| `db_corruption` | `database` | Critical (824) / Error (823) / Warning (825) |
| `dotnet_unhandled` | `app_stability` | Error |
| `e2e_test_event` | `rmm` | Info cap |
| `esent_corruption` | `os_stability` | Error |
| `gpu_driver_error` | `hardware` | Notice at most; native level decides below |
| `install_error` | `patching` | Warning / Info cap for retry-later |
| `install_failed` | `patching` | Warning / Info cap for retry-later |
| `profile_load_fail` | `user_profiles` | Serious |
| `restart_blocked` | `patching` | Info cap |
| `vendor_svc_fail` | `app_stability` | Error |

## `app_crash`

A Windows application process crashed.

**Severity:** Error

**Impact:** The app exited unexpectedly; user work, background processing, or service functionality may have been interrupted.

**Consider:**

- Group by app name, faulting module, exception code, and report id.
- Check for recurrence after updates or driver changes.

## `app_crash_report`

Windows Error Reporting recorded a crash or hang report.

**Severity:** Notice

**Impact:** The report can join crash recurrence by bucket, app name, and report id even when the primary crash event is missing.

**Consider:**

- Use EventName to separate crash reports from unrelated WER report types.
- Group by fault bucket and report id for recurrence.

Event id 1001 also carries BlueScreen, PnP, Store install, and other report families. The reason
only applies to crash-shaped EventName values.

## `app_hang`

A Windows application stopped responding and was closed.

**Severity:** Error

**Impact:** The user-facing app or background process became unusable until Windows terminated it.

**Consider:**

- Group by app name, report id, and hang type.
- Check whether hangs cluster around updates, add-ins, or file paths.

## `ca_chain_fail`

Active Directory Certificate Services reported a CA chain or publication failure family event.

**Severity:** Error

**Impact:** Certificate trust or revocation publishing may be unhealthy until the CA issue is corrected.

**Consider:**

- Check CA chain, CRL, and distribution-point health together.
- Read adjacent CertificationAuthority events before assuming the exact sub-family.

## `ca_crl_fail`

Active Directory Certificate Services reported a CRL publication failure.

**Severity:** Error

**Impact:** Revocation checks may fail or use stale data once the published CRL expires.

**Consider:**

- Check the CA, CRL distribution point, and CRL freshness.
- Read adjacent CertificationAuthority events before assuming the exact sub-family.

## `cert_enroll_fail`

A Windows certificate enrollment failed or did not complete. Enrollment against a Microsoft attestation-identity endpoint that no longer serves requests is labeled separately as expected noise.

**Severity:** Warning, or Verbose for the retired-endpoint shape

**Impact:** Certificate-dependent authentication, attestation, or device trust workflows may fail later.

**Consider:**

- Review enrollment URL, status, and template or policy context in the event.
- Check whether the device later received the expected certificate.

The retired-endpoint shape needs no action: the endpoint no longer serves requests. It repeats on consumer TPM devices and is kept out of the attention bands.

## `db_corruption`

SQL Server reported database I/O failure, logical page corruption, or a read retry warning.

**Severity:** Critical (824) / Error (823) / Warning (825)

**Impact:** A SQL database may have corrupted pages or an unreliable storage path; affected data or application workloads can be at risk.

**Consider:**

- Identify the database, file, page, and storage path named in the event.
- Treat 824 as confirmed corruption and 825 as early storage warning.

## `dotnet_unhandled`

A .NET application terminated because of an unhandled managed exception.

**Severity:** Error

**Impact:** The affected .NET app stopped unexpectedly; repeated events can point to an application defect, dependency issue, or bad input path.

**Consider:**

- Inspect the exception type and application name in the event message.
- Correlate with deploy, update, and dependency changes.

## `e2e_test_event`

A SparkLogs end-to-end test marker was emitted.

**Severity:** Info cap

**Consider:**

- Treat as test or verification traffic unless unexpected in production data.

This reason exists so test emissions stay queryable without being mistaken for endpoint trouble.

## `esent_corruption`

ESENT reported embedded database corruption or a corruption-adjacent failure.

**Severity:** Error

**Impact:** Windows features backed by that embedded store may fail, rebuild state, or lose local cached state.

**Consider:**

- Identify which ESENT database path or component is named in the event.
- Correlate with Search, SRUM, token broker, profile, or OS feature symptoms.

## `gpu_driver_error`

The NVIDIA display stack reported a warning-or-worse driver error.

**Severity:** Notice at most; native level decides below

**Impact:** Users may see display resets, graphics hangs, application crashes, or GPU-accelerated workload interruption. A single event is commonly benign: driver upgrades reset the display stack.

**Consider:**

- Check whether a GPU driver was installed or updated around the same time.
- Look for REPETITION without an adjacent driver install: rate is the signal here, not any one event.
- Inspect GPU driver version, hardware health, and workload timing.

This reason names a provider-level driver-error family, not a specific mechanism.

## `install_error`

Windows Installer reported an install or configuration error. If the installer status says another install is already running, the same event is treated as retry-later context.

**Severity:** Warning / Info cap for retry-later

**Impact:** Software installation, update, or repair may not have completed successfully.

**Consider:**

- Check MSI status and nearby install outcome events.
- Separate retry-later status from product or privilege failures.

The id set spans multiple installer templates, so the promoted fields are the ones every template
carries; the rest stays in the raw payload.

## `install_failed`

A Windows Installer product install failed. If the installer status says another install is already running, the same event is treated as retry-later context.

**Severity:** Warning / Info cap for retry-later

**Impact:** The product may be absent or partially configured until the install is retried or repaired.

**Consider:**

- Check product name and MSI status when present.
- Look for nearby 11707 success or repeated 11708 failures.

Retry-later detection reads the installer status value rather than the message text, so it
behaves the same on a non-English system.

## `profile_load_fail`

Windows could not load a user profile, or loaded a temporary profile.

**Severity:** Serious

**Impact:** The user cannot work normally on that machine: they log on with missing settings, missing data paths, or a temporary profile until the profile issue is fixed.

**Consider:**

- Identify the affected user profile from the event message.
- Check profile service errors, disk space, permissions, and roaming or FSLogix state.

## `restart_blocked`

Restart Manager could not shut down or restart an app during an update session.

**Severity:** Info cap

**Impact:** The update may need a retry, reboot, or user action to close the blocking app.

**Consider:**

- Join by Restart Manager session id when present.
- Review blocked app name, path, and status.

## `vendor_svc_fail`

A vendor service launcher reported a failure.

**Severity:** Error

**Impact:** The related vendor application, device helper, or background service may not start or may lose functionality.

**Consider:**

- Identify the vendor service and any code-signing or launch error in the event message.
- Check whether the vendor app still starts and whether the failure recurs.
