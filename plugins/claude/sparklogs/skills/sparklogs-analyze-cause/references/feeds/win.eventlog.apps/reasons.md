<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.apps`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `appid_certificate_store_verification_failed` | appid certificate store verification failed | event | Debug | `security_audit` |  |
| `appid_certificate_store_verified` | appid certificate store verified | event | Info | `security_audit` |  |
| `appx_activation_failed` | appx activation failed | event | Info to Notice | `app_stability` | benign possible |
| `appx_cleanup_residue` | appx cleanup residue | event | Debug | `patching` | benign possible |
| `appx_deployment_failed` | appx deployment failed | event | Verbose to Notice | `patching` | benign possible |
| `appx_deployment_requeued` | appx deployment requeued | event | Verbose | `patching` |  |
| `appx_package_runtime_corrupt` | appx package runtime corrupt | event | Notice to Warning | `app_stability` |  |
| `appx_provisioning_failed` | appx provisioning failed | event | Info to Notice | `app_stability` | benign possible |
| `appx_service_start_failed` | appx service start failed | event | Info to Notice | `patching` | benign possible |
| `perf_counter_provider_failed` | perf counter provider failed | event | Debug | `app_stability` |  |
| `wcf_request_failed` | wcf request failed | event | Minor | `app_stability` |  |

## `appid_certificate_store_verification_failed`: appid certificate store verification failed

The Application Identity service could not verify the certificate store.

**Severity:** Debug

**Why it matters:** On its own, nothing the user notices. It matters when AppLocker publisher rules on the machine depend on that check.

**In practice:** The Application Identity service (AppIDSvc), which AppLocker uses to identify files, writes event 4005 to the Microsoft-Windows-AppID/Operational log when its certificate-store check fails. The line carries the status code with its Windows name, such as ERROR_FILE_NOT_FOUND. The event does not say that AppLocker is configured or that any application was blocked, so it shows as Debug. Event 4006 in the same log is the same check succeeding.

**When to ignore:** On a machine with no AppLocker policy, or with no AppLocker block records nearby.

**What to check:**

- Check whether AppLocker policy is in use (Get-AppLockerPolicy -Effective) before spending time on this.
- If it is, read the AppLocker logs in Event Viewer for blocked or would-block records near the same time.

**Related:**

- `appid_certificate_store_verified`: the same check succeeding
- `applocker_audit_would_block`: an AppLocker record that a rule would block a file, which is where enforcement shows

**Example:** The Application Identity service fails its certificate-store check with status 2, ERROR_FILE_NOT_FOUND.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appid_certificate_store_verification_failed, https://sparklogs.com/reference/reasons/appid_certificate_store_verification_failed.json

## `appid_certificate_store_verified`: appid certificate store verified

The Application Identity service verified the certificate store.

**Severity:** Info

**Why it matters:** No problem on its own. It marks a successful check beside any failures.

**In practice:** The Application Identity service (AppIDSvc) writes event 4006 to the Microsoft-Windows-AppID/Operational log when its certificate-store check succeeds. Event 4005 is the same check failing. A 4006 after a 4005 shows the check working again.

**When to ignore:** Routine. Pass over it unless you are following a 4005 failure on the same machine.

**What to check:**

- Use it to see whether earlier verification failures stopped.

**Related:**

- `appid_certificate_store_verification_failed`: the same check failing

**Example:** The Application Identity service completes its certificate-store check.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appid_certificate_store_verified, https://sparklogs.com/reference/reasons/appid_certificate_store_verified.json

## `appx_activation_failed`: appx activation failed

A Store or packaged application did not start.

**Also reported by:** `win.eventlog.application`

**Severity:** Notice or Info

**Why it matters:** The user clicks the app, or a Start menu or Settings page, and nothing opens or it closes at once.

**In practice:** Windows records failed launches of packaged (Store-style) apps in two logs. The shell writes events 2825, 5955, 5961, 5962 and 5990 to Microsoft-Windows-TWinUI/Operational, and the app runtime writes its own failures to Microsoft-Windows-AppModel-Runtime/Admin. The line carries the app ID and the error code. Error 0x8027025a or 0x8027025b means the app did not start in the time Windows allows. Events 5955 and 5962 come from launching a packaged app under the built-in Administrator account, which Windows refuses by design. They show as Info. Other failures show as Notice. One failed launch does not mean the next one fails.

**When to ignore:** Events 5955 and 5962 from the built-in Administrator account are expected. A single timeout that does not repeat can be passed over.

**What to check:**

- Read the app ID and error code, and check whether the same app fails again for this user.
- For repeat failures, open Settings, Apps, the app's Advanced options, then Repair or Reset.
- If many apps fail for one user, check that user's profile. If one app fails for every user, reinstall it.

**Related:**

- `appx_deployment_failed`: an app install or update that failed, which can leave it unable to start
- `appx_package_runtime_corrupt`: a damaged package record that keeps an app from launching

**Example:** The Photos app does not start in the time Windows allows and the shell reports 0x8027025b.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_activation_failed, https://sparklogs.com/reference/reasons/appx_activation_failed.json

## `appx_cleanup_residue`: appx cleanup residue

During app package cleanup, Windows could not delete every file or registry entry.

**Severity:** Debug

**Why it matters:** No effect on the user. Leftover folders can take disk space.

**In practice:** The AppX deployment service writes these events to the Microsoft-Windows-AppXDeploymentServer/Operational log while it cleans up after packages. Events 493, 494 and 516 count the items it could not remove, events 471, 472, 503, 5224 and 5230 name single items, and events 801, 802 and 808 name registry entries. A registry entry with error 0x80070002 was already gone. None of these says an install failed or the machine is affected, and all show as Debug.

**When to ignore:** Routine on any machine that updates Store apps. Pass over it unless disk space is a problem.

**What to check:**

- Check the item count when disk space is the concern.
- Look closer only if the count keeps rising, or a registry entry fails with an error other than 0x80070002.

**Related:**

- `appx_deployment_failed`: an install or removal that failed, which can leave the same residue

**Example:** After a Store app update, the deployment service reports two package folders it could not remove.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_cleanup_residue, https://sparklogs.com/reference/reasons/appx_cleanup_residue.json

## `appx_deployment_failed`: appx deployment failed

Installing, updating or removing a Store or packaged app failed for a user on this device.

**Severity:** Notice, Info or Verbose

**Why it matters:** The app is missing, stays at the old version, or is not removed for that user until a later attempt succeeds.

**In practice:** The AppX deployment service writes events 401, 413, 441 and 707 to the Microsoft-Windows-AppXDeploymentServer/Operational log when a package operation fails. Related failures arrive from its Restricted log (697, 698), from the undocked deployment handler (10004, 10005, 10010) and from Shell-Core (62164). The line carries the package name, the operation and the error code with its Windows name. Error 0x80073d02 (ERROR_PACKAGES_IN_USE) means the app was open at the time. It shows as Verbose. Error 0x800704ec, or event 413 or 441, means policy refused the operation, such as a setting that blocks Store apps. These show as Notice. Other failures show as Info.

**When to ignore:** Error 0x80073d02 (package in use) is routine. The operation can succeed once the app is closed.

**What to check:**

- Read the operation and error code, and look the code up in Microsoft's app deployment troubleshooting list.
- For a policy refusal, check the Group Policy or Intune settings that restrict Store apps or sideloading.
- Check the same package on other users and devices to tell a bad package from a bad machine.
- Get-AppxLog in PowerShell shows the recent deployment log for more detail.

**Related:**

- `appx_cleanup_residue`: files or registry entries left behind by a package operation
- `appx_deployment_requeued`: an attempt Windows put back on its queue, not yet a failure
- `appx_service_start_failed`: the deployment service not starting, which blocks every operation

**Example:** An app update fails with 0x80073d02 (ERROR_PACKAGES_IN_USE) because the user has the app open.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_deployment_failed, https://sparklogs.com/reference/reasons/appx_deployment_failed.json

## `appx_deployment_requeued`: appx deployment requeued

The AppX deployment service put a package install or update back on its queue.

**Severity:** Verbose

**Why it matters:** The install or update is delayed, not failed. A package that keeps coming back never finishes.

**In practice:** The AppX deployment service writes event 626 to the Microsoft-Windows-AppXDeploymentServer/Operational log when it puts an attempt back on its queue. The line carries the package full name, the operation, the requeue reason and the process that asked for it. The retry usually completes. A package stuck in a loop can write this event constantly, so SparkLogs keeps one per package family per device over a set period, and the next one it keeps carries the count of those it held back.

**When to ignore:** A single requeue that does not return the next day.

**What to check:**

- Read the requeue reason, the operation and the calling process.
- If the same package family returns day after day, check it on other devices and try removing and reinstalling it.

**Related:**

- `appx_deployment_failed`: an attempt that failed outright
- `appx_service_start_failed`: the deployment service not starting, which stalls the queue

**Example:** A Store app update is put back on the queue while another deployment for the same package is still running.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_deployment_requeued, https://sparklogs.com/reference/reasons/appx_deployment_requeued.json

These records are rate-bounded: one per package family per device per day, with the count of what a day suppressed carried on the next day's first record.

## `appx_package_runtime_corrupt`: appx package runtime corrupt

Windows found a damaged record for an installed app package.

**Severity:** Warning or Notice

**Why it matters:** Apps in that package can fail to start until the package is repaired or reinstalled.

**In practice:** The app runtime writes event 79 or 80 to the Microsoft-Windows-AppModel-Runtime/Admin log when it finds a damaged record for a package, and the line names the package family. Event 79 means Windows started its own repair. It does not say whether the repair worked, and it shows as Notice. Event 80 means Windows could not repair it, and it shows as Warning.

**When to ignore:** A single event 79 with no event 80 and no failed launches after it.

**What to check:**

- Check whether an event 80 follows the 79 for the same package family.
- For event 80, repair or reset the app in Settings, or remove and reinstall it for the user.

**Related:**

- `appx_activation_failed`: the failed app launch a damaged record causes

**Example:** Windows finds the record for an installed app package damaged and reports that it cannot repair it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_package_runtime_corrupt, https://sparklogs.com/reference/reasons/appx_package_runtime_corrupt.json

## `appx_provisioning_failed`: appx provisioning failed

App Readiness reported a failed app operation for a user.

**Severity:** Notice or Info

**Why it matters:** A built-in or provisioned app may be missing or not ready for the user until a later attempt succeeds.

**In practice:** App Readiness prepares packaged apps for each user, for example at a user's first sign-in. It writes events 10, 214, 215, 218 and 319 to the Microsoft-Windows-AppReadiness/Admin log and events 11 and 304 to its Operational log. The line carries the package, the operation and the result code. Event 218 means App Readiness scheduled another attempt, and result 0x80073d02 means the package was in use. Both show as Info. Other failures show as Notice.

**When to ignore:** Event 218 (retry scheduled) and result 0x80073d02 (package in use) are routine.

**What to check:**

- Read the operation and result code, and check whether the same package fails for other users or devices.
- Check whether the app is present for the user afterwards before acting.

**Related:**

- `appx_deployment_failed`: a deployment service failure for an install, update or removal
- `appx_service_start_failed`: the deployment service not starting, which blocks this too

**Example:** At a new user's first sign-in, App Readiness fails to register a built-in app.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_provisioning_failed, https://sparklogs.com/reference/reasons/appx_provisioning_failed.json

## `appx_service_start_failed`: appx service start failed

The app deployment client could not start or reach a service it needs.

**Severity:** Notice or Info

**Why it matters:** Store and packaged app installs and updates can fail for that sign-in session.

**In practice:** The AppX deployment client writes events 302, 303, 311 and 328 to the Microsoft-Windows-AppXDeployment/Operational log when it cannot start or connect to a service, and the line names the service. Error 0x8007045b (ERROR_SHUTDOWN_IN_PROGRESS) means Windows was shutting down at the time. It shows as Info. Other errors show as Notice.

**When to ignore:** Error 0x8007045b during shutdown or restart.

**What to check:**

- Read the service name and error code.
- If it repeats outside shutdown, check that the AppX Deployment Service (AppXSvc) and the services it depends on can start.

**Related:**

- `appx_deployment_failed`: install or update failures while the service is not reachable
- `appx_provisioning_failed`: per-user app setup failing for the same reason

**Example:** During a restart, the deployment client cannot reach its service and reports 0x8007045b.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#appx_service_start_failed, https://sparklogs.com/reference/reasons/appx_service_start_failed.json

## `perf_counter_provider_failed`: perf counter provider failed

A performance-counter provider could not register or create a counter.

**Severity:** Debug

**Why it matters:** A monitoring tool or Performance Monitor can miss readings from that provider.

**In practice:** Windows writes event 2 (provider registration failed) or event 3 (counter instance not created) to the Microsoft-Windows-Diagnosis-PCW/Operational log. The line names the counter set and provider by GUID, the counter number and the error with its Windows name, such as ERROR_ACCESS_DENIED. It explains a gap in counter data and does not say the host or the application is unhealthy, so it shows as Debug.

**When to ignore:** When no monitoring tool on the machine is missing data.

**What to check:**

- Read the counter set GUID and error code, and match them to the monitoring gap you are looking at.
- If counters are missing in Performance Monitor, run lodctr /R from an elevated prompt to rebuild the counter registry.

**Example:** A counter provider fails to register its counter set with ERROR_ACCESS_DENIED.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#perf_counter_provider_failed, https://sparklogs.com/reference/reasons/perf_counter_provider_failed.json

## `wcf_request_failed`: wcf request failed

A WCF service on this machine raised an exception while handling a request.

**Also reported by:** `win.eventlog.application`

**Severity:** Minor

**Why it matters:** The caller of that service got an error for that request. Other requests may still succeed.

**In practice:** Windows Communication Foundation (WCF) services write events 57397, 57405 and 57408 to the Microsoft-Windows-Application Server-Applications/Operational log when a request raises an exception. The line names the application domain and the exception type. It records one failed request, not a stopped process, and shows as Minor.

**What to check:**

- Read the exception type and application domain, and check the application's own log at the same time.
- Many failures of one type in a short time point at a dependency, such as a database or a downstream service.

**Related:**

- `aspnet_unhandled_exception`: the same kind of request failure in an ASP.NET application
- `dotnet_unhandled_exception`: a .NET exception that stopped a whole process

**Example:** A line-of-business web service throws a TimeoutException while calling its database.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-apps#wcf_request_failed, https://sparklogs.com/reference/reasons/wcf_request_failed.json
