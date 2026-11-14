<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.application`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `adcs_ca_chain_failed` | adcs ca chain failed | event | Error | `certificates` |  |
| `adcs_crl_publish_failed` | adcs crl publish failed | event | Error | `certificates` |  |
| `app_crash` | app crash | event | Minor | `app_stability` |  |
| `app_hang` | app hang | event | Minor | `app_stability` |  |
| `appx_activation_failed` | appx activation failed | event | Info to Notice | `app_stability` | benign possible |
| `aspnet_compilation_failed` | aspnet compilation failed | event | Error | `web` |  |
| `aspnet_unhandled_exception` | aspnet unhandled exception | event | Minor | `web` |  |
| `cert_enroll_failed` | cert enroll failed | event | Verbose to Warning | `certificates` | benign possible |
| `cert_expiring` | cert expiring | event | Warning | `certificates` |  |
| `dotnet_unhandled_exception` | dotnet unhandled exception | event | Minor | `app_stability` |  |
| `entra_password_hash_sync_failed` | entra password hash sync failed | event | Error | `directory_services` |  |
| `entra_sync_run_failed` | entra sync run failed | event | Error | `directory_services` |  |
| `entra_sync_scheduler_aborted` | entra sync scheduler aborted | event | Error | `directory_services` |  |
| `esent_db_corruption` | esent db corruption | event | Warning to Serious | `database` |  |
| `gpu_driver_error` | gpu driver error | event | Notice | `hardware` |  |
| `group_policy_drive_map_failed` | group policy drive map failed | event | Notice to Minor | `device_management` |  |
| `group_policy_extension_apply_failed` | group policy extension apply failed | event | Minor | `device_management` |  |
| `group_policy_preference_item_failed` | group policy preference item failed | event | Warning to Minor | `device_management` |  |
| `mfa_not_configured` | mfa not configured | event | Warning | `auth` |  |
| `mfa_sign_in_succeeded` | mfa sign in succeeded | event | Info | `auth` |  |
| `mfa_unavailable_access_granted` | mfa unavailable access granted | event | Error | `auth` |  |
| `mfa_user_not_enrolled` | mfa user not enrolled | event | Notice | `auth` |  |
| `mssql_agent_job_failed` | mssql agent job failed | event | Error | `database` |  |
| `mssql_db_io_failed` | mssql db io failed | event | Error | `database` |  |
| `mssql_db_page_corruption` | mssql db page corruption | event | Critical | `database` |  |
| `mssql_db_read_retried` | mssql db read retried | event | Warning | `database` |  |
| `mssql_login_failed` | mssql login failed | event | Notice | `database` |  |
| `office_subscription_licensing_failed` | office subscription licensing failed | event | Warning | `licensing` |  |
| `quickbooks_verify_database_advised` | quickbooks verify database advised | event | Error | `app_stability` |  |
| `remote_assist_session_started` | remote assist session started | event | Notice | `remote_access` |  |
| `restart_manager_app_pending` | restart manager app pending | event | Info | `patching` | benign |
| `security_agent_config_fetch_failed` | security agent config fetch failed | event | Error | `endpoint_protection` |  |
| `security_agent_host_isolated` | security agent host isolated | event | Notice to Serious | `endpoint_protection` |  |
| `vpn_dial_failed` | vpn dial failed | event | Minor | `vpn` |  |
| `vss_optimization_time_budget_reached` | vss optimization time budget reached | event | Debug | `backup` | benign |
| `vss_provider_class_not_registered` | vss provider class not registered | event | Error | `backup` |  |
| `vss_snapshot_call_failed` | vss snapshot call failed | event | Warning | `backup` |  |
| `vss_snapshots_failing_for_space` | vss snapshots failing for space | event | Error | `backup` |  |
| `vss_writer_callback_query` | vss writer callback query | event | Info | `backup` | benign |
| `vss_writer_failed` | vss writer failed | event | Error | `backup` |  |
| `wcf_request_failed` | wcf request failed | event | Minor | `web` |  |
| `win_msi_operation_failed` | win msi operation failed | event | Info to Minor | `patching` | benign possible |
| `win_msi_product_install_succeeded` | win msi product install succeeded | event | Notice | `patching` |  |
| `win_msi_product_reconfigure_succeeded` | win msi product reconfigure succeeded | event | Notice | `patching` |  |
| `win_msi_product_removal_succeeded` | win msi product removal succeeded | event | Notice | `patching` |  |
| `win_user_profile_file_access_failed` | User profile file access failed | event | Notice | `user_profiles` |  |
| `win_user_profile_load_failed` | win user profile load failed | event | Warning to Serious | `user_profiles` |  |
| `winlogon_notification_subscriber_slow` | Winlogon subscriber slow | event | Info to Notice | `os_stability` |  |
| `wmi_provider_registered_as_localsystem` | wmi provider registered as localsystem | event | Info | `inventory` | benign |

## `adcs_ca_chain_failed`: adcs ca chain failed

Active Directory Certificate Services reported a problem with the certification authority's certificate chain.

**Severity:** Error

**Why it matters:** A CA whose own certificate has expired stops issuing, and certificates it issued can stop validating: 802.1X Wi-Fi, VPN, smart card sign-in and internal websites can fail together.

**In practice:** The certification authority writes event 58 to the Application log (source CertificationAuthority) when a certificate in the chain of its own CA certificate has expired, with the status code, such as 0x800b0101 (CERT_E_EXPIRED). It shows as Error. A revocation list the CA could not publish to a distribution point is events 65, 66, 74 and 75, recorded under their own reason.

**What to check:**

- Check the CA certificate and its validity dates in the Certification Authority console (CA properties, View Certificate).
- Renew the CA certificate before it expires, then publish the new certificate where clients and the directory pick it up.
- After an expiry, check clients for enrollment, Wi-Fi, VPN and sign-in failures.

**Related:**

- `adcs_crl_publish_failed`: a revocation list the CA could not publish to a distribution point
- `cert_enroll_failed`: clients failing to enroll, which follows when the CA cannot issue

**Example:** The certification authority reports that a certificate on its chain has expired, status 0x800b0101 (CERT_E_EXPIRED).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#adcs_ca_chain_failed, https://sparklogs.com/reference/reasons/adcs_ca_chain_failed.json

## `adcs_crl_publish_failed`: adcs crl publish failed

The certification authority could not publish a certificate revocation list (CRL).

**Severity:** Error

**Why it matters:** Nothing fails until the last published CRL expires. Then anything that checks revocation, such as VPN, 802.1X Wi-Fi, smart card sign-in and some web servers, rejects otherwise valid certificates.

**In practice:** The certification authority writes events to the Application log (source CertificationAuthority) when it cannot write a CRL to one of its distribution points: event 65 for a base CRL and 66 for a delta CRL, and 74 (base) and 75 (delta) when the location names a server. The message names the CRL, the location (an LDAP path, file share or web folder) and the error, such as 0x80072098 (insufficient access rights). A moved share, changed permissions on the location, or a server that is not reachable are common causes. It shows as Error.

**What to check:**

- Read the location and error in the message, and check that the CA can write to that location.
- After fixing access, publish again with certutil -crl and confirm the new CRL is at every distribution point (pkiview.msc).
- Check when the current CRL expires to know how long clients keep working.

**Related:**

- `adcs_ca_chain_failed`: a problem with the CA's own certificate chain
- `cert_enroll_failed`: clients failing to enroll or renew certificates

**Example:** The CA cannot publish its base CRL to Active Directory because it lacks access rights (0x80072098).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#adcs_crl_publish_failed, https://sparklogs.com/reference/reasons/adcs_crl_publish_failed.json

## `app_crash`: app crash

A Windows application process crashed.

**Severity:** Minor

**Why it matters:** The program closed without warning. Unsaved work is lost, and a background process or service stops doing its work until it is restarted.

**In practice:** Windows writes event 1000 to the Application log (source Application Error) when a process ends on a fault it did not handle. The line names the application and version, the faulting module and version, the exception code with its name, such as 0xc0000005 (STATUS_ACCESS_VIOLATION), and the fault offset. The faulting module is where the fault surfaced, which is not always the cause: a crash in KERNELBASE.dll or ntdll.dll is often the application's own error. Code 0xe0434352 (EXCEPTION_COMPLUS) is an unhandled .NET exception, and the .NET Runtime event 1026 beside it names the type. QuickBooks also lands here when it reports (event 4) that it must shut down. Each crash shows as Minor. The pattern across crashes is what matters.

**What to check:**

- Group crashes by application and version, faulting module and exception code to find the common cause.
- Check whether crashes started after an application, Windows or driver update.
- For 0xe0434352, read the .NET Runtime event 1026 at the same time for the exception type.
- Reliability Monitor (perfmon /rel) shows the crash history on the machine.

**Related:**

- `app_hang`: a program that stopped responding and was closed, not one that faulted
- `dotnet_unhandled_exception`: the .NET record of the exception behind a 0xe0434352 crash
- `process_crash`: one record per crashed process with any dump analysis. Count crashes from it, not from this event

**Example:** A line-of-business app crashes in KERNELBASE.dll with exception 0xe0434352 (EXCEPTION_COMPLUS), an unhandled .NET exception.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#app_crash, https://sparklogs.com/reference/reasons/app_crash.json

## `app_hang`: app hang

A Windows application stopped responding and was closed.

**Severity:** Minor

**Why it matters:** The program froze and was closed, usually by the user, and unsaved work was lost.

**In practice:** Windows writes event 1002 to the Application log (source Application Hang) when a program stops responding to Windows and is closed. The line names the program, its path, the report ID and the hang type. A hang means the program stopped answering. A crash (event 1000) means it faulted. Hangs that line up with a network share, an add-in, an antivirus scan or a busy disk point at what the program was waiting on. Each hang shows as Minor.

**What to check:**

- Group hangs by program and version.
- Check whether they line up with network share access, add-ins, antivirus scans or disk load.
- Reliability Monitor (perfmon /rel) lists hangs and crashes for the machine.

**Related:**

- `app_crash`: a program that faulted and closed, not one that stopped responding

**Example:** WordPad stops responding while it opens a file from a network drive, and the user closes it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#app_hang, https://sparklogs.com/reference/reasons/app_hang.json

## `appx_activation_failed`: appx activation failed

A Store or packaged application did not start.

**Also reported by:** `win.eventlog.apps`

**Severity:** Info when Windows declines to run the application under the built-in Administrator account, Notice otherwise

**Why it matters:** The user clicks the app and it does not open. When the code is the built-in Administrator refusal, nothing is broken.

**In practice:** The Windows shell writes event 5973 to the Application log (source Microsoft-Windows-Immersive-Shell) when it cannot start a packaged app. The line carries the app ID and the error code. Code 0x80270253 means Windows declined to run the app under the built-in Administrator account, which it does by design. It shows as Info. Any other code shows as Notice. The shell's own log, Microsoft-Windows-TWinUI/Operational, records more launch failures.

**When to ignore:** Code 0x80270253 from the built-in Administrator account.

**What to check:**

- Read the app ID and the error code.
- For 0x80270253, check whether an automated task or a person is launching the app as the built-in Administrator.
- For repeat failures under a normal account, repair or reset the app in Settings, Apps.

**Related:**

- `appx_package_runtime_corrupt`: a damaged package record that keeps an app from launching

**Example:** A task running as the built-in Administrator tries to open a Store app, and the shell refuses with 0x80270253.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#appx_activation_failed, https://sparklogs.com/reference/reasons/appx_activation_failed.json

## `aspnet_compilation_failed`: aspnet compilation failed

A web application on this host could not be compiled and is not serving requests.

**Severity:** Error

**Why it matters:** Every request to that application fails until the source or the deployment is corrected. Other applications on the host are unaffected.

**In practice:** ASP.NET health monitoring writes event 1310 with event code 3007 to the Application log (source ASP.NET followed by the runtime version) when it cannot compile an application. The message names the application path, the compiler error and the file it points at. Only code 3007 lands here. It repeats on every request until the code or the deployment is fixed, so the volume shows one broken site, not a spreading fault. A deployment that copied only some files, or mixed old and new files, is a common cause. It shows as Error.

**What to check:**

- Read the compiler error and the file it names in the message.
- If it started right after a deployment, redeploy the whole application.
- Check whether the site answered at all before the first occurrence.

**Related:**

- `aspnet_unhandled_exception`: one request failing inside an application that otherwise works
- `iis_apppool_worker_start_failed`: the application pool worker not starting, a problem below the application code

**Example:** After a deployment copies new pages but not the updated library they use, the intranet site fails to compile on every request.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#aspnet_compilation_failed, https://sparklogs.com/reference/reasons/aspnet_compilation_failed.json

## `aspnet_unhandled_exception`: aspnet unhandled exception

A web application on this host raised an unhandled exception while serving a request.

**Severity:** Minor

**Why it matters:** That request failed for the user who made it. The application keeps serving other requests.

**In practice:** ASP.NET health monitoring writes event 1309 with event code 3005 to the Application log (source ASP.NET followed by the runtime version) when a request raises an exception the application does not handle. The message carries the exception type and message, the request URL and the stack trace. Only code 3005 lands here. The user saw an error page for that request, and the application keeps serving others. Each one shows as Minor.

**When to ignore:** A steady low rate on a busy web application is normal.

**What to check:**

- Read the exception type and stack in the message before treating this as an infrastructure question.
- A count that jumps right after a deployment points at the deployment.

**Related:**

- `aspnet_compilation_failed`: the application failing to build at all, so every request fails
- `iis_worker_crash`: the worker process hosting the application ending

**Example:** A NullReferenceException on the order page returns an error to one user while the rest of the site keeps working.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#aspnet_unhandled_exception, https://sparklogs.com/reference/reasons/aspnet_unhandled_exception.json

## `cert_enroll_failed`: cert enroll failed

A certificate enrollment or an autoenrollment cycle on this machine did not complete.

**Severity:** Warning or Verbose

**Why it matters:** The machine may not get or renew a certificate it needs, so Wi-Fi, VPN or other sign-ins that rely on it can fail later.

**In practice:** The enrollment client writes events 86 and 87 to the Application log (source CertificateServicesClient-CertEnroll) when an enrollment such as a SCEP device request fails. The same source writes events 13 and 82 when enrollment for a named certificate template fails against the CA or against every enrollment server URL, with the template and the error. The autoenrollment client writes events 1 and 6 (source CertificateServicesClient-AutoEnrollment) when it cannot finish a cycle against the directory or the CA, often because it could not reach them. Both show as Warning. A laptop that was off the corporate network when autoenrollment ran is a routine cause, and the next cycle tries again. Enrollment against Microsoft's retired attestation endpoint (a URL containing microsoftaik) can never succeed and needs no action. It shows as Verbose.

**When to ignore:** Enrollment against the retired microsoftaik endpoint, and a single autoenrollment failure on a laptop that was off the corporate network.

**What to check:**

- Read the URL, status and error in the message.
- For 13 and 82, check the template name and that the machine can reach the CA over RPC (`certutil -ping`).
- Check whether the machine later received the certificate (certlm.msc, Personal store).
- For autoenrollment cycles, confirm the machine can reach a domain controller and the CA, then run certutil -pulse to retry.

**Related:**

- `adcs_ca_chain_failed`: a problem with the CA's own chain, which can stop it issuing
- `adcs_crl_publish_failed`: a revocation list the CA could not publish
- `cert_expiring`: a certificate reaching its expiry because renewal keeps failing

**Example:** A device's SCEP certificate enrollment fails to initialize with PkiStatus 3.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#cert_enroll_failed, https://sparklogs.com/reference/reasons/cert_enroll_failed.json

Enrollment against the retired endpoint needs no action: the endpoint no longer serves requests. It repeats on consumer TPM devices and is kept at a low severity.

## `cert_expiring`: cert expiring

A certificate held by this machine is about to expire or has already expired, and has not been replaced.

**Also reported by:** `win.eventlog.identity_security`

**Severity:** Warning

**Why it matters:** Nothing fails until something asks for the certificate. When something does, it fails with an error that usually names neither the certificate nor its age: a service refusing connections, a network sign-in rejected, or a trust check that stops passing.

**In practice:** The autoenrollment client writes event 64 to the Application log (source CertificateServicesClient-AutoEnrollment) naming a machine certificate by thumbprint that is about to expire or has expired. The message does not say which. On a healthy machine it appears in the renewal window and stops once the next cycle renews the certificate. The same thumbprint reported day after day means renewal is not happening. It shows as Warning.

**When to ignore:** A single report for a thumbprint that stops once a new certificate arrives.

**What to check:**

- Check whether the same thumbprint keeps being reported, and find it in certlm.msc to read its expiry date.
- Read the autoenrollment failures on the same machine: they usually say why renewal cannot run.
- Confirm the machine can reach a domain controller and the certification authority.
- Check the certificate template's enroll and autoenroll permissions for the machine account.

**Related:**

- `cert_enroll_failed`: the enrollment or autoenrollment attempt that would have replaced it failing

**Example:** The same machine certificate is reported as expiring every day for a week because autoenrollment cannot reach the CA.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#cert_expiring, https://sparklogs.com/reference/reasons/cert_expiring.json

## `dotnet_unhandled_exception`: dotnet unhandled exception

A .NET application terminated because of an unhandled managed exception.

**Severity:** Minor

**Why it matters:** The .NET program closed without warning. Unsaved work or background processing stopped.

**In practice:** The .NET Runtime writes event 1026 to the Application log when a managed process ends on an exception it did not catch. The line carries the application, the framework version and the exception type, such as System.IO.FileNotFoundException, with a stack trace. An Application Error event 1000 with code 0xe0434352 usually appears beside it for the same process. The exception type and the top of the stack usually say what failed: a missing file or dependency, a bad configuration value or unexpected input. Each one shows as Minor.

**What to check:**

- Group by exception type and application.
- Check whether it started after an application update, a .NET update or a configuration change.
- Read the top frames of the stack that belong to the application for the failing call.

**Related:**

- `app_crash`: the Application Error crash record for the same process
- `process_crash`: one record per crashed process, carrying this exception type when the two could be matched

**Example:** A line-of-business app closes at start-up with System.IO.FileNotFoundException after an update leaves out a DLL.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#dotnet_unhandled_exception, https://sparklogs.com/reference/reasons/dotnet_unhandled_exception.json

## `entra_password_hash_sync_failed`: entra password hash sync failed

Password hash synchronization failed for an on-premises domain.

**Severity:** Error

**Why it matters:** Password changes made in that domain do not reach the cloud directory, so affected users sign in to cloud services with an outdated password.

**In practice:** Entra Connect (formerly Azure AD Connect) writes event 611 to the Application log (source Directory Synchronization) when password hash synchronization fails for a domain. The message names the domain, the domain controller it was using and the underlying error. Until it works again, a user who changes a password on the domain keeps the old one in Microsoft 365 and other Entra ID services. An unreachable or restarting domain controller, or a change to the sync account's password or permissions, are common causes. It shows as Error.

**When to ignore:** A single failure during a domain controller restart that does not repeat on the next cycle.

**What to check:**

- Read the domain and the domain controller in the message and confirm the controller is reachable from the sync server.
- If it repeats, run Invoke-ADSyncDiagnostics -PasswordSync on the sync server, Microsoft's troubleshooter for this feature.
- Check the sync account's password and its replication permissions on the domain.

**Related:**

- `entra_sync_run_failed`: a synchronization step that did not complete
- `entra_sync_scheduler_aborted`: the scheduler stopping, which stops every cycle

**Example:** A domain controller restarts during a sync cycle, and password hash synchronization fails for that domain once.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#entra_password_hash_sync_failed, https://sparklogs.com/reference/reasons/entra_password_hash_sync_failed.json

## `entra_sync_run_failed`: entra sync run failed

A directory synchronization run profile failed to complete.

**Severity:** Error

**Why it matters:** The changes that run profile carries did not move on this cycle. Repeated failures leave the cloud directory progressively out of date.

**In practice:** Entra Connect writes event 6056 to the Application log (source ADSync) when a connector fails on a run profile, such as a delta import from Active Directory or an export to Entra ID. The message names the connector and the run profile. Whatever that step carries, such as new users, group changes or disabled accounts, did not move on this cycle, and the next scheduled cycle retries. A run that completed with errors on some objects is a different event and does not land here. It shows as Error.

**What to check:**

- Read the connector and run profile, then open Synchronization Service Manager, Operations, for the step's error.
- Check the connector account's credentials and permissions.
- If it repeats, check with Get-ADSyncScheduler that cycles are still scheduled.

**Related:**

- `entra_password_hash_sync_failed`: password changes failing to reach Entra ID
- `entra_sync_scheduler_aborted`: the scheduler stopping, which prevents every run

**Example:** The Active Directory connector's delta import fails after its account password changes, and new users do not reach Entra ID.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#entra_sync_run_failed, https://sparklogs.com/reference/reasons/entra_sync_run_failed.json

## `entra_sync_scheduler_aborted`: entra sync scheduler aborted

The directory synchronization scheduler stopped, so no further synchronization cycles run on this server.

**Severity:** Error

**Why it matters:** Directory changes stop reaching the cloud directory from this server until the synchronization service is restarted.

**In practice:** Entra Connect writes event 906 to the Application log (source Directory Synchronization) for scheduler problems. Only the message saying the scheduler thread aborted lands here. The same event saying a new run cannot start while one is still running is routine and is not part of this reason. Once the thread aborts, no cycle runs on this server until the service restarts: no password hashes, new accounts, disabled accounts or group changes reach Entra ID. The message carries the exception, such as memory exhaustion in the sync service. It shows as Error.

**What to check:**

- Restart the ADSync service and confirm cycles resume (Get-ADSyncScheduler shows the next cycle).
- Read the exception in the message: memory exhaustion points at the server rather than the product.
- Confirm whether this server is the active one or is in staging mode.

**Related:**

- `entra_password_hash_sync_failed`: password hashes failing for one domain while cycles still run
- `entra_sync_run_failed`: one synchronization step that did not complete

**Example:** The sync service runs out of memory overnight and its scheduler thread aborts.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#entra_sync_scheduler_aborted, https://sparklogs.com/reference/reasons/entra_sync_scheduler_aborted.json

## `esent_db_corruption`: esent db corruption

The Windows database engine (ESENT) found corruption in a database file.

**Severity:** Serious, Error or Warning

**Why it matters:** The consequence depends on the database. A Windows cache such as the Search index, the usage history or a browser cache rebuilds once reset. A server role database such as Active Directory, DHCP or a certification authority is the store the role serves from and needs a repair or a restore.

**In practice:** ESENT, the database engine many Windows features and server roles use, writes events 447, 448 and 474 to the Application log (source ESENT) when it finds a damaged page or link. Event 448 lands here only at Error level. The line names the database file, and the severity follows it. The System Resource Usage Monitor history (SRUDB.dat), the Windows Search index and the browser WebCache rebuild from nothing and show as Warning. Active Directory (ntds.dit), DHCP, WINS, a certification authority database and the DFS Replication database are what a server role serves from, and show as Serious. Any other database, or one whose path could not be read, shows as Error. Corruption that keeps returning on any database points at the disk under it.

**What to check:**

- Read the database path to see which store is damaged.
- For the Search index, rebuild it from Indexing Options. For other caches, reset the store so the feature recreates it.
- For a server role database, check the role's health and plan an offline repair (esentutl) or a restore from backup.
- If corruption returns, check the disk: chkdsk and the storage errors in the System log.

**Related:**

- `mssql_db_page_corruption`: corruption in a SQL Server database, a different engine

**Example:** The usage history database System32\sru\SRUDB.dat reports a page that failed its checksum.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#esent_db_corruption, https://sparklogs.com/reference/reasons/esent_db_corruption.json

## `gpu_driver_error`: gpu driver error

The NVIDIA display driver reported a warning or error.

**Also reported by:** `win.eventlog.system`

**Severity:** Notice at most; native level decides below

**Why it matters:** Users may see display resets, graphics hangs, application crashes, or GPU-accelerated workload interruption. A single event is commonly benign: driver upgrades reset the display stack.

**In practice:** The NVIDIA display driver (source nvlddmkm) and its OpenGL driver (source NVIDIA OpenGL Driver) write to the Application log, and their Warning, Error and Critical records land here. These cover driver faults, and also lost OpenGL contexts and video memory exhaustion that an application usually causes. A driver install or upgrade, a display waking, or leaving a full-screen application resets the display stack and can write the same records. They show as Notice at most. A pattern that repeats without a driver change is what matters.

**When to ignore:** Around a driver install or upgrade, or a single record that does not repeat.

**What to check:**

- Check whether a GPU driver was installed or updated around the same time.
- Look for repeats with no driver change nearby. The rate is the signal, not one event.
- Check the System log for display driver timeouts (source Display, event 4101) at the same time.
- Check the driver version against the vendor's current one, and the application's video memory use.

**Example:** A CAD application stops with "The NVIDIA OpenGL driver detected a problem with the display driver and is unable to continue."

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#gpu_driver_error, https://sparklogs.com/reference/reasons/gpu_driver_error.json

This reason names a provider-level driver-error family, not a specific mechanism.

## `group_policy_drive_map_failed`: group policy drive map failed

A Group Policy drive mapping did not complete on this host.

**Severity:** Warning; Minor when the share refused the stored password; Notice when a local device already holds the letter.

**Why it matters:** The affected user does not have the mapped drive for that session. Nothing else on the machine is affected, and the mapping is attempted again at every policy refresh.

**In practice:** The Group Policy Drive Maps extension writes event 4117 to the Application log after each mapping it attempts. Only records with a non-zero Windows error land here. The line names the drive letter, the share and the error with its name. Error 55 (the share or server did not answer) and error 67 (the network name did not resolve) usually clear at a later refresh once the server is reachable. Error 86 (the share refused the stored password) shows as Minor, because every refresh presents the same wrong password and can lock the account out. Error 85 (a local device already uses the letter) shows as Notice. Other errors show as Warning.

**When to ignore:** A single error 55 or 67 that clears at the next refresh, such as on a laptop away from the office.

**What to check:**

- Read the error name at the end of the line: reachability of the server, resolution of the name, or the stored password.
- For error 86, update or remove the stored password in the Drive Maps preference item before it locks the account.
- Search the share field across hosts to see whether one server is failing for everyone.

**Related:**

- `group_policy_extension_apply_failed`: a whole preference extension failing for a policy object
- `group_policy_preference_item_failed`: the same kind of failure for one preference item of any type

**Example:** A user's H: drive does not map at sign-in because the file server does not answer (error 55).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#group_policy_drive_map_failed, https://sparklogs.com/reference/reasons/group_policy_drive_map_failed.json

## `group_policy_extension_apply_failed`: group policy extension apply failed

A Group Policy preference extension could not apply the settings from a policy object.

**Also reported by:** `win.eventlog.identity_security`, `win.eventlog.system`

**Severity:** Minor

**Why it matters:** None of that policy object's preference items were delivered to the affected user or machine on this refresh.

**In practice:** Each Group Policy Preferences extension (Drive Maps, Shortcuts, Files and the rest, each with its own event source) writes event 8194 to the Application log when it cannot apply the settings from a policy object at all. The message names the policy object and the Windows error. None of that object's items for that extension were delivered on this refresh, and the next refresh tries again. A network path error usually means the machine could not reach the policy share at that moment. It shows as Minor.

**When to ignore:** A single network path error on a machine that was off the corporate network.

**What to check:**

- Read the policy object and error in the message.
- For a network path error, check that the machine can reach SYSVOL on a domain controller.
- If it repeats on a machine on the corporate network, run gpresult /h to see which policy objects applied.

**Related:**

- `group_policy_drive_map_failed`: the Drive Maps extension's record of one mapping that failed
- `group_policy_preference_item_failed`: one item failing while the rest of the policy object applied

**Example:** A laptop on hotel Wi-Fi cannot reach the policy share, and the Shortcuts extension fails to apply its policy object.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#group_policy_extension_apply_failed, https://sparklogs.com/reference/reasons/group_policy_extension_apply_failed.json

## `group_policy_preference_item_failed`: group policy preference item failed

A Group Policy preference item did not apply on this host.

**Severity:** Minor or Warning

**Why it matters:** The configured item is missing for the affected user or machine. The rest of the policy object applied normally.

**In practice:** Each Group Policy Preferences extension writes event 4098 to the Application log when one item, such as a shortcut, a file copy or a mapped drive, does not apply. The message names the item, the policy object and the Windows error. The rest of the policy object applied. Access denied or file not found usually means the item's source path or its permissions changed, and that item fails again at every refresh until someone fixes it. Error 86 (a stored password the target refused) shows as Minor, because each refresh replays the same wrong password and can lock the account out. Other failures show as Warning.

**What to check:**

- Read the item name, the policy object and the error in the message.
- For access denied or file not found, check the item's source path and its permissions.
- For error 86, update or remove the stored password in the preference item.

**Related:**

- `group_policy_drive_map_failed`: the Drive Maps extension's own record of a failed mapping
- `group_policy_extension_apply_failed`: the whole extension failing for a policy object

**Example:** A shortcut preference item fails at every refresh because the file it points to was moved.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#group_policy_preference_item_failed, https://sparklogs.com/reference/reasons/group_policy_preference_item_failed.json

## `mfa_not_configured`: mfa not configured

A multi-factor logon agent is installed on this host but holds no configuration, so it enforces no second factor.

**Severity:** Warning

**Why it matters:** Sign-ins on this host complete with a single factor while the product is present and appears deployed.

**In practice:** Duo Windows Logon writes every outcome as event 0 in the Application log (source Duo Security). This line says the agent is installed but not configured, so sign-ins on this host take a password alone while the product looks deployed. A staged rollout writes the same line, so the gap may be intended and temporary. It shows as Warning.

**When to ignore:** During a staged rollout, on hosts not yet scheduled for Duo.

**What to check:**

- Confirm whether this host is inside the intended rollout scope.
- Compare with hosts in the same group that do enforce, to see whether the gap is deliberate.
- If it should be protected, configure or reinstall Duo with the integration settings for this host.

**Related:**

- `mfa_unavailable_access_granted`: a configured agent that let a sign-in through because it could not reach the service

**Example:** A server imaged with Duo installed but never given its integration settings reports that Duo is not configured at each sign-in.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mfa_not_configured, https://sparklogs.com/reference/reasons/mfa_not_configured.json

## `mfa_sign_in_succeeded`: mfa sign in succeeded

A sign-in completed with its second factor verified.

**Severity:** Info

**Why it matters:** None. It records a sign-in that its second factor protected.

**In practice:** Duo Windows Logon writes every outcome as event 0 in the Application log (source Duo Security), at Error level even for a success. This line is a sign-in whose second factor completed, at the console, over Remote Desktop or locally. It shows as Info. It is the baseline for reading the fail-open and not-enrolled lines on the same host.

**When to ignore:** Routine. Pass over it unless you are measuring a fail-open gap or checking that a host enforces Duo at all.

**What to check:**

- Read these beside the fail-open lines on the same host to see how long a gap lasted.
- A host with Duo installed and none of these is itself worth checking.

**Related:**

- `mfa_unavailable_access_granted`: a sign-in let through without the second factor
- `mfa_user_not_enrolled`: a sign-in refused for an account with no second factor registered

**Example:** A user signs in over Remote Desktop and approves the Duo push.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mfa_sign_in_succeeded, https://sparklogs.com/reference/reasons/mfa_sign_in_succeeded.json

## `mfa_unavailable_access_granted`: mfa unavailable access granted

A sign-in was allowed without its second factor because the multi-factor service could not be reached.

**Severity:** Error

**Why it matters:** Multi-factor authentication was not applied to that sign-in. While the service stays unreachable, sign-ins on this host continue to complete with a single factor.

**In practice:** Duo Windows Logon writes every outcome as event 0 in the Application log (source Duo Security). This line, which reads fail open or failsafe, says the agent could not reach the Duo service and let the sign-in through without a second factor, because its failure mode is set to allow that. The person signing in may be legitimate. What failed is the control. While the service stays unreachable, every sign-in on the host works with a password alone. It shows as Error.

**What to check:**

- Check network access from this host to the Duo service (outbound HTTPS, proxy, firewall, DNS).
- Count these against successful sign-ins on the same host to see how long the gap lasted.
- Review the configured failure mode: letting sign-ins through is a deliberate setting.

**Related:**

- `mfa_not_configured`: an agent that enforces nothing because it holds no configuration
- `mfa_sign_in_succeeded`: the sign-ins where the second factor did complete

**Example:** A firewall change blocks a terminal server from the Duo service, and staff sign in with passwords only all morning.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mfa_unavailable_access_granted, https://sparklogs.com/reference/reasons/mfa_unavailable_access_granted.json

## `mfa_user_not_enrolled`: mfa user not enrolled

A sign-in was refused because the account is not enrolled with the multi-factor service.

**Severity:** Notice

**Why it matters:** The user cannot sign in on this host until the account is enrolled or excluded from the policy.

**In practice:** Duo Windows Logon writes every outcome as event 0 in the Application log (source Duo Security). This line says an account reached a protected sign-in with no second factor registered, and Duo refused it. The control worked. What is left is an account an administrator has to enroll or exclude. It shows as Notice.

**What to check:**

- Enroll the account, or place it in the exclusion the policy intends.
- Service accounts here usually need a policy exclusion, not an enrollment.

**Related:**

- `mfa_sign_in_succeeded`: sign-ins where the second factor completed
- `mfa_unavailable_access_granted`: a sign-in let through without a second factor

**Example:** A new hire's first sign-in to a terminal server is refused because their Duo enrollment was never completed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mfa_user_not_enrolled, https://sparklogs.com/reference/reasons/mfa_user_not_enrolled.json

## `mssql_agent_job_failed`: mssql agent job failed

A scheduled SQL Server Agent job failed.

**Severity:** Error

**Why it matters:** The work that job does, such as a backup, an import or a maintenance task, did not happen on this run.

**In practice:** SQL Server Agent writes event 208 to the Application log (source SQLSERVERAGENT, or SQLAgent$ followed by the instance name) with a scheduled job's result. Only the failure, which Agent writes at Warning level, lands here. It shows as Error. The message names the job and when it ran. The job's work, such as a backup, an import, an index rebuild or an integrity check, did not happen, and Agent does not retry it before the next schedule. A failed backup job matters most, because the gap stays hidden until a restore is needed.

**What to check:**

- Read the job history in SQL Server Agent for the failing step and its error.
- Check that the job owner and the Agent service account still have access to the instance and any share the job writes to.
- For a backup job, check the age of the newest good backup and that the next run succeeds.

**Related:**

- `mssql_db_io_failed`: an I/O error under the database engine, a common cause of a failed job

**Example:** The nightly full backup job fails because the backup share is full.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mssql_agent_job_failed, https://sparklogs.com/reference/reasons/mssql_agent_job_failed.json

## `mssql_db_io_failed`: mssql db io failed

SQL Server reported an I/O error on a database file.

**Severity:** Error

**Why it matters:** Queries that touch the file fail, and the storage under the database is suspect.

**In practice:** SQL Server writes event 823 to the Application log (source MSSQLSERVER, or MSSQL$ followed by the instance name) when Windows returns an error to a read or write on a database file. The message names the operating system error, the file and the offset, such as error 21 (the device is not ready). The failure is below SQL Server: a disk, controller, SAN path or driver, or a volume that went offline. It shows as Error.

**What to check:**

- Read the database, file and error in the message.
- Check the System log at the same time for disk, controller or storage path errors.
- Run DBCC CHECKDB on the affected database, and confirm the latest backups are good.

**Related:**

- `esent_db_corruption`: corruption in a Windows ESENT database, not SQL Server
- `mssql_db_page_corruption`: a page SQL Server read and found damaged, confirmed corruption
- `mssql_db_read_retried`: a read that failed and then succeeded, an early warning for this

**Example:** The volume holding a SQL Server data file goes offline, and reads fail with operating system error 21.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mssql_db_io_failed, https://sparklogs.com/reference/reasons/mssql_db_io_failed.json

## `mssql_db_page_corruption`: mssql db page corruption

SQL Server confirmed logical page corruption in a database.

**Severity:** Critical

**Why it matters:** Queries that touch the damaged pages fail, and the corruption does not repair itself.

**In practice:** SQL Server writes event 824 to the Application log (source MSSQLSERVER, or MSSQL$ followed by the instance name) when a page it read fails its checksum or torn-page check. The message names the database, the file, the page and the check that failed. This is confirmed corruption, and it shows as Critical. The cause is usually the storage under SQL Server: a disk, controller, write cache or driver.

**What to check:**

- Run DBCC CHECKDB on the database to see how far the damage goes, and check msdb.dbo.suspect_pages.
- Restore from a good backup, or restore the damaged pages, before considering a repair that can lose data.
- Check the storage: disk errors in the System log, controller health and firmware.

**Related:**

- `esent_db_corruption`: corruption in a Windows ESENT database, not SQL Server
- `mssql_db_io_failed`: Windows returning an I/O error to SQL Server, which does not by itself confirm damage
- `mssql_db_read_retried`: a read that failed and then succeeded, an early warning

**Example:** After a power loss on a server with a failed write-cache battery, SQL Server reports an incorrect checksum on a database page.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mssql_db_page_corruption, https://sparklogs.com/reference/reasons/mssql_db_page_corruption.json

## `mssql_db_read_retried`: mssql db read retried

SQL Server retried a database read after it failed, and the retry succeeded.

**Severity:** Warning

**Why it matters:** Not confirmed corruption, but an early-warning signal for the storage path a database sits on.

**In practice:** SQL Server writes event 825 to the Application log (source MSSQLSERVER, or MSSQL$ followed by the instance name) when a read of a database file failed and then succeeded on a retry. SQL Server logs it at Information level, so it is easy to miss. It shows as Warning. It is the early warning for I/O errors (event 823) and confirmed page damage (event 824) on the same storage.

**What to check:**

- Read the database and file in the message.
- Check the storage under that file: disk errors in the System log, controller and SAN health.
- Run DBCC CHECKDB on the database if retries keep appearing.

**Related:**

- `esent_db_corruption`: corruption in a Windows ESENT database, not SQL Server
- `mssql_db_io_failed`: a read or write that failed outright
- `mssql_db_page_corruption`: a page confirmed damaged

**Example:** SQL Server reports that a read of a data file succeeded after failing twice.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mssql_db_read_retried, https://sparklogs.com/reference/reasons/mssql_db_read_retried.json

## `mssql_login_failed`: mssql login failed

A login to a SQL Server instance failed.

**Severity:** Notice

**Why it matters:** The client could not connect as that login. An application that keeps failing cannot reach its database until the credential or the database name is fixed.

**In practice:** SQL Server writes event 18456 to the Application log (source MSSQLSERVER, or MSSQL$ followed by the instance name) when a login fails. The message names the login, a reason such as a wrong password or a database that could not be opened, and the client address. An application with a stale password or a missing database retries constantly, so SparkLogs keeps one line per login, database and client over a short window, with a count of the repeats. It shows as Notice.

**What to check:**

- Read the failure reason, the login and the client in the message.
- A steady repeat from one client is usually an application with a stale credential or a missing database.
- Many logins from one client in a short time can be a password guess.

**Related:**

- `mssql_db_io_failed`: the instance failing to read or write a database file, a storage fault

**Example:** An application with an old password retries its SQL Server login every few seconds from the same server.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#mssql_login_failed, https://sparklogs.com/reference/reasons/mssql_login_failed.json

Repeats of the same login, database and client are kept once a minute with a count of the repeats.

## `office_subscription_licensing_failed`: office subscription licensing failed

The subscription licensing check for the installed office suite failed.

**Severity:** Warning

**Why it matters:** The suite keeps working on the licence it already holds. If the check keeps failing, the applications eventually drop to reduced functionality and documents become read-only.

**In practice:** The Office subscription licensing service writes event 0 to the Application log (source Office 2016 Licensing Service, whatever Office version is installed) when its licensing check fails, with the code it returned. Office retries the check on its own, and a machine that was asleep, offline or behind a proxy usually passes the next time. Office writes no matching success record, so the question is whether one host keeps reporting it. It shows as Warning.

**When to ignore:** Occasional failures around sleep, travel or being offline that stop once the machine is back on the network.

**What to check:**

- Check whether the same host reports it repeatedly, or only around periods offline.
- Confirm the signed-in account still holds an Office licence in the tenant.
- Check outbound access to the Office licensing endpoints, including any proxy.

**Example:** A laptop that was offline over a weekend reports a failed licensing check on Monday morning, then stops.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#office_subscription_licensing_failed, https://sparklogs.com/reference/reasons/office_subscription_licensing_failed.json

## `quickbooks_verify_database_advised`: quickbooks verify database advised

QuickBooks advised verifying the company database.

**Severity:** Error

**Why it matters:** QuickBooks reported a company-file error and requested verification. This advice alone does not confirm damage or require rebuilding the file.

**In practice:** QuickBooks writes many unrelated diagnostics as event 4 in the Application log (source QuickBooks). This line is the one where QuickBooks tells the user to run Verify/Rebuild on the company file, including after an error in a memorized report. The advice alone does not prove the file is damaged. SparkLogs keeps one of these per device over a short window, so repeats do not read as separate failures.

**What to check:**

- Back up the company file before any repair work.
- Run Verify Data, and rebuild only if Verify reports a problem.

**Example:** QuickBooks reports an error in a memorized report and advises running Verify/Rebuild on the company file.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#quickbooks_verify_database_advised, https://sparklogs.com/reference/reasons/quickbooks_verify_database_advised.json

## `remote_assist_session_started`: remote assist session started

A remote assistance session started on this host and a remote party could see the desktop.

**Severity:** Notice

**Why it matters:** Someone remote had a view of this desktop from this moment. Whether that was expected depends on whether a support session was arranged.

**In practice:** Quick Assist, the remote help tool built into Windows, writes its internal transcript to the Application log (source Quick Assist). This line is the confirmation that screen sharing began, so the helper at the other end could see the desktop from this moment. Quick Assist is also a tool scammers use when posing as a support desk, and an RMM does not report its sessions. It shows as Notice.

**When to ignore:** When the time matches a support session your helpdesk arranged with the user.

**What to check:**

- Compare the time against the helpdesk record for that user.
- If no session was arranged, ask the user who called them and check the machine for new software or remote tools.

**Related:**

- `security_agent_host_isolated`: the endpoint agent cutting a host off the network

**Example:** The helpdesk starts a Quick Assist session to help a user with a printer.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#remote_assist_session_started, https://sparklogs.com/reference/reasons/remote_assist_session_started.json

## `restart_manager_app_pending`: restart manager app pending

Restart Manager could not shut down or restart an app during an update session.

**Severity:** Info cap

**Why it matters:** The update may need a retry, reboot, or user action to close the blocking app.

**In practice:** Restart Manager writes event 10006 (an application could not be shut down) or 10007 (it could not be restarted) to the Application log (source Microsoft-Windows-RestartManager) when an installer or updater asks it to close an application that is still running. The line names the application, its path and the status. The update itself may have finished. The shutdown or restart it asked for is still owed, usually until the user closes the application or the machine restarts. It shows as Info at most.

**When to ignore:** Routine on any machine where users leave applications open during updates.

**What to check:**

- Read the application name, path and status.
- If the same update keeps failing, close the named application or restart the machine, then retry.

**Related:**

- `win_msi_operation_failed`: an install that failed, which can happen in the same update session

**Example:** An update cannot shut down a helper application the user has open.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#restart_manager_app_pending, https://sparklogs.com/reference/reasons/restart_manager_app_pending.json

## `security_agent_config_fetch_failed`: security agent config fetch failed

A security agent could not retrieve its configuration because its credentials were refused.

**Severity:** Error

**Why it matters:** The agent takes no new configuration or detection content and drifts from the policy it is meant to enforce, while continuing to appear installed.

**In practice:** The Huntress agent writes event 4 to the Application log (source HuntressAgent). This line, "unable to retrieve agent config", means the vendor service refused the keys the agent holds. The agent keeps running and looks installed in every inventory, but takes no new configuration or detection content. The same event id also carries the ordinary registration success, which does not land here. It shows as Error.

**What to check:**

- Re-register the agent with the current account and organization keys.
- Check the vendor console for whether this host is reporting at all.

**Related:**

- `security_agent_host_isolated`: an action the same agent takes when it is working

**Example:** A workstation's Huntress agent reports that it is unable to retrieve its agent config after the account key was changed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#security_agent_config_fetch_failed, https://sparklogs.com/reference/reasons/security_agent_config_fetch_failed.json

## `security_agent_host_isolated`: security agent host isolated

An endpoint detection agent isolated this host from the network, or later released it.

**Severity:** Serious or Notice

**Why it matters:** While isolated the host cannot reach the network, so the user cannot work and the machine's other telemetry may stop arriving.

**In practice:** The Huntress agent writes event 1 to the Application log (source HuntressAgent) when it isolates the host from the network, and event 2 when it releases it. Isolation shows as Serious and release as Notice. The event names no threat: the detection behind it, and whether an analyst or an automatic rule acted, are in the vendor console. While the host is isolated the user cannot work, and the machine's other data, SparkLogs included, may stop arriving.

**What to check:**

- Read the detection in the vendor console and whether the isolation was automatic or an analyst's action.
- Pair the isolation with its release to see how long the host was off the network.
- Before releasing it yourself, confirm with whoever owns the detection that the host is clean.

**Related:**

- `security_agent_config_fetch_failed`: the same agent unable to get its configuration

**Example:** Huntress isolates a workstation after detecting ransomware-like behavior, and releases it two hours later.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#security_agent_host_isolated, https://sparklogs.com/reference/reasons/security_agent_host_isolated.json

## `vpn_dial_failed`: vpn dial failed

A remote-access dial attempt failed.

**Severity:** Minor

**Why it matters:** The user did not reach the network through that profile on that attempt. One failure is usually retried successfully. Repeated failures on one profile point at the VPN server or its configuration.

**In practice:** The Windows remote access client writes event 20227 to the Application log (source RasClient) when a VPN or dial-up connection attempt fails. The message names the connection profile and the error code, a Windows remote access error number: an authentication error points at the credential. One failure is usually a mistyped password, a certificate not yet chosen or a hotel captive portal. The same profile failing on many hosts points at the VPN server. It shows as Minor.

**When to ignore:** A single failure followed by a successful connection on the same profile.

**What to check:**

- Read the error code in the message: an authentication code points at the credential or certificate.
- Check whether the same profile connected soon afterwards.
- If the same profile fails across many hosts, check the VPN server and its certificate.

**Related:**

- `vpn_connected`: a connection that succeeded, which shows whether a failure was followed by a good attempt

**Example:** A remote user mistypes their password, the VPN profile fails with an authentication error, and the next attempt connects.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vpn_dial_failed, https://sparklogs.com/reference/reasons/vpn_dial_failed.json

## `vss_optimization_time_budget_reached`: vss optimization time budget reached

Shadow copy optimization did not finish excluding temporary files within its time budget.

**Severity:** Debug

**Why it matters:** The shadow copy is larger than it would otherwise be. Backup correctness is unaffected.

**In practice:** The Shadow Copy Optimization Writer leaves temporary and update-cache files out of a shadow copy, working against a time limit. VSS writes events 8219, 8220 and 8226 to the Application log (source VSS) when it runs out of that time, often on the Windows Update download cache (SoftwareDistribution). The line names the file specification it was working on. The shadow copy still completes and is slightly larger. These show as Debug.

**When to ignore:** Routine. Pass over it unless the volume is short of free space.

**What to check:**

- On a host short of free space, check shadow storage use (vssadmin list shadowstorage). This is not a backup fault.

**Related:**

- `vss_writer_callback_query`: another harmless VSS record about a permissions check

**Example:** During a nightly snapshot, the optimization writer runs out of time pruning the Windows Update download cache.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vss_optimization_time_budget_reached, https://sparklogs.com/reference/reasons/vss_optimization_time_budget_reached.json

## `vss_provider_class_not_registered`: vss provider class not registered

A component the Volume Shadow Copy Service needs is not registered, so shadow copies cannot be created on this machine.

**Severity:** Error

**Why it matters:** Snapshot-based backups, System Restore and anything else that needs a shadow copy fail on this host until the registration is repaired. A backup product may still complete a job by other means, so a green backup report does not clear this.

**In practice:** VSS writes events 22, 12292 and 8193 to the Application log (source VSS) with code 0x80040154 (class not registered) when it cannot create the software shadow copy provider. The three events are one fault logged from three places. Every shadow copy operation on the machine fails at its first call, so the host keeps writing these at high volume until the registration is repaired. A damaged Windows installation, or a tool that removed a registration on uninstall, can cause it. It shows as Error.

**What to check:**

- Run vssadmin list providers and vssadmin list writers. A missing Microsoft Software Shadow Copy provider confirms it.
- Confirm the Volume Shadow Copy and COM+ Event System services are installed and start.
- Repair Windows (sfc /scannow, DISM /Online /Cleanup-Image /RestoreHealth) or re-register the VSS components, then run a test backup.

**Related:**

- `vss_snapshot_call_failed`: one call refused for another reason, with the provider present
- `vss_snapshots_failing_for_space`: shadow copies failing because storage ran out

**Example:** After an old backup product is uninstalled, every snapshot attempt fails with 0x80040154.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vss_provider_class_not_registered, https://sparklogs.com/reference/reasons/vss_provider_class_not_registered.json

## `vss_snapshot_call_failed`: vss snapshot call failed

A call the Volume Shadow Copy Service makes while working with shadow copies was refused or rejected.

**Severity:** Warning

**Why it matters:** Shadow copy handling on that volume is limited: the storage area cannot be resized, or a snapshot phase did not complete. Backups may still succeed, so treat this as context for a backup problem, not proof of one.

**In practice:** VSS writes event 12289 to the Application log (source VSS) when a control call into the volume stack fails, naming the call and the operation it was made for. Two cases land here. Access denied (0x80070005) while changing the shadow storage maximum size leaves the storage area on that volume the size it is. An invalid parameter (0x80070057) during a snapshot preparation or commit phase points at the storage driver or a third-party shadow copy provider. Both show as Warning. Neither says the backup failed: the event sees one call, not the job.

**When to ignore:** When the backup product reports the job succeeded. Calls abandoned during shutdown, or made against a process that already exited, are not part of this reason.

**What to check:**

- For a refused resize, check the permissions on the volume and its shadow storage association (vssadmin list shadowstorage).
- For a rejected phase call, check the storage driver and any third-party shadow copy provider.
- Confirm the backup job's outcome in the backup product. This event does not report it.

**Related:**

- `vss_provider_class_not_registered`: the provider missing entirely, so every call fails
- `vss_snapshots_failing_for_space`: shadow copy storage running out, not a refused resize
- `vss_writer_failed`: a writer for a database or mail store failing during a snapshot

**Example:** A backup agent tries to raise the shadow storage limit on D: and VSS is refused with access denied (0x80070005).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vss_snapshot_call_failed, https://sparklogs.com/reference/reasons/vss_snapshot_call_failed.json

## `vss_snapshots_failing_for_space`: vss snapshots failing for space

Shadow copy storage is full, so restore points are being deleted or no longer created.

**Also reported by:** `win.eventlog.system`, `vss-shadowstorage`

**Severity:** Error

**Why it matters:** Snapshot-based backups and System Restore lose history or stop working on the affected volume. A backup job may still report success while protecting less than it appears to.

**In practice:** VSS writes event 8193 to the Application log (source VSS) saying there are no remaining diff area candidates, that shadow copies were deleted because shadow copy storage could not grow, or that there is insufficient storage to create a copy. Shadow copy storage on that volume is at its limit: Windows is deleting older restore points to stay under it, or has stopped taking new ones, and the history is already lost. It shows as Error.

**What to check:**

- Check the shadow storage association and maximum size for the volume (vssadmin list shadowstorage).
- Compare the oldest remaining restore point with the retention the customer expects.
- Free space or raise the limit (vssadmin resize shadowstorage). It recurs until the allocation changes.

**Related:**

- `vss_shadow_aborted`: the System log record of a shadow copy that failed or could not grow
- `vss_snapshot_call_failed`: a refused change to the storage maximum, a permissions question
- `vss_writer_failed`: a specific writer failing, not storage running out

**Example:** The shadow storage limit on a busy file server's data drive fills, and the oldest restore points are deleted.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vss_snapshots_failing_for_space, https://sparklogs.com/reference/reasons/vss_snapshots_failing_for_space.json

## `vss_writer_callback_query`: vss writer callback query

The Volume Shadow Copy Service could not read a writer's callback interface because of process permissions, and continued.

**Severity:** Info

**Why it matters:** None on its own. Shadow copy creation is not blocked by this check.

**In practice:** VSS writes event 8194 to the Application log (source VSS) when it asks a writer process for its IVssWriterCallback interface and the process's permissions refuse it with 0x80070005 (access denied). VSS carries on and the snapshot is not affected. It is common on machines whose backups work. Only this IVssWriterCallback access-denied form lands here. Other 8194 failures do not. It shows as Info at most.

**When to ignore:** Routine. Pass over it unless a backup on the same host failed at the same time.

**What to check:**

- Treat it as a finding only beside a failed backup on the same host and time.

**Related:**

- `vss_snapshot_call_failed`: another VSS call that did not complete
- `vss_writer_failed`: a writer for a database or mail store actually failing

**Example:** During a backup, VSS is denied a writer's IVssWriterCallback interface, and the snapshot completes.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vss_writer_callback_query, https://sparklogs.com/reference/reasons/vss_writer_callback_query.json

## `vss_writer_failed`: vss writer failed

A backup writer for a database, mail store, virtual machine host, or directory service reported a failure during shadow copy creation.

**Also reported by:** `vss-writers`

**Severity:** Error

**Why it matters:** The backup of that data store may be incomplete or inconsistent, even if the backup job itself reported success.

**In practice:** VSS (source VSS, at Warning or Error) or the SQL Server VSS writer service (source SQLWRITER, events 8193, 24581, 24582 and 24583) writes to the Application log that a writer failed. The writer is one that fronts a data store, such as SQL Server, Exchange, Hyper-V, Active Directory, a failover cluster or a certification authority, and the line names it and the snapshot phase. That writer could not do its part, so the backup of its store may not restore cleanly even when the job reported success. VSS writes no recovery record for a writer, so the risk shows at restore time. It shows as Error. A SQLWRITER registry probe that prints an error beside hr = 0x00000000 is a success and is not part of this reason.

**What to check:**

- Identify the named writer and check the most recent restore point for the store it protects.
- Read the application's own log at the same time. The writer's cause is usually recorded there.
- Run vssadmin list writers to see the writer's current state and last error.
- Repeated failures for the same writer mean that data has no verified recent backup.

**Related:**

- `vss_optimization_time_budget_reached`: best-effort snapshot pruning running out of time
- `vss_snapshot_call_failed`: one VSS call that did not complete, which may not affect the backup
- `vss_snapshots_failing_for_space`: shadow copy storage running out
- `vss_writer_callback_query`: a harmless VSS permissions check

**Example:** The SQL Server writer times out during the freeze phase of a nightly backup on a busy database server.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#vss_writer_failed, https://sparklogs.com/reference/reasons/vss_writer_failed.json

## `wcf_request_failed`: wcf request failed

A WCF service on this machine could not process a request.

**Also reported by:** `win.eventlog.apps`

**Severity:** Minor

**Why it matters:** The caller did not get an answer for that request. Other requests and other applications on the host are unaffected.

**In practice:** The WCF service host (source System.ServiceModel followed by the framework version) writes event 3 to the Application log when it cannot process a request. The message names the component, the exception type and code, and the endpoint path that was asked for. The usual case is a request for an endpoint the host does not have: a caller pointed at the wrong address, or a deployment that did not land. It shows as Minor.

**What to check:**

- Read the endpoint path in the message, and check whether that service is deployed on this host.
- Compare the count with the web server's own request log for the same time.
- The same endpoint failing on several hosts points at the deployment, not a client.

**Related:**

- `aspnet_unhandled_exception`: a request failing inside an ASP.NET application

**Example:** A client calls an endpoint a partial deployment did not publish, and the host reports that the requested service does not exist.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#wcf_request_failed, https://sparklogs.com/reference/reasons/wcf_request_failed.json

## `win_msi_operation_failed`: win msi operation failed

A Windows Installer (MSI) install, update or removal did not complete.

**Severity:** Minor for a failed operation; Warning for installer events 1013, 10005 and 1032; Notice when the operation lacked administrator rights or a file was open; Info when another install was running.

**Why it matters:** The product may be absent or partially configured until the install is retried or repaired.

**In practice:** Windows Installer writes its results to the Application log (source MsiInstaller). Installer error events (the error number plus 10000, such as 11708 for a failed install), event 1033 with a non-zero status, and events 1013, 10005 and 1032 land here. The line names the product and the installer code with its meaning. Some of these did not fail. Code 1618 or 1500 means another installation was running, and the caller retries later. Codes 1730 and 1321 mean the operation ran without the administrator rights it needs, and 1306 means a file it replaces was open in another program.

**When to ignore:** Code 1618 or 1500 (another install running) when a later attempt completes.

**What to check:**

- Read the installer code and its meaning on the line.
- For codes 1730 or 1321, run the operation elevated, or find the per-user updater that keeps trying it without rights.
- Check for a later completed install of the same product before acting.
- For detail, rerun the install with a verbose log (msiexec /i <package>.msi /l*v install.log) and search the log for "return value 3".

**Related:**

- `restart_manager_app_pending`: an open application that an update could not close
- `win_msi_product_install_succeeded`: a later install of the same product that completed

**Example:** A software deployment fails on one workstation with installer code 1708 (installation operation failed).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#win_msi_operation_failed, https://sparklogs.com/reference/reasons/win_msi_operation_failed.json

Retry-later detection reads the installer status value rather than the message text, so it behaves the same on a non-English system.

## `win_msi_product_install_succeeded`: win msi product install succeeded

A Windows Installer product install completed successfully.

**Severity:** Notice

**Why it matters:** The product is installed. The record is the change-history anchor for what arrived on the machine and when.

**In practice:** Windows Installer writes event 11707 (installation completed successfully), or event 1033 with status 0, to the Application log (source MsiInstaller) when a product installs. The line names the product. It shows as Notice to stand out in a change history: what arrived on the machine and when.

**When to ignore:** Expected installs from your own deployments. Read it when looking for what changed before a problem started.

**What to check:**

- Match on the product name to find failed attempts before it.
- Check it against the software inventory when a product is expected and missing.

**Related:**

- `restart_manager_app_pending`: an open application an install session could not close
- `win_msi_operation_failed`: an install, update or removal that did not complete

**Example:** An RMM deployment installs a PDF reader, and Windows Installer reports that the installation completed successfully.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#win_msi_product_install_succeeded, https://sparklogs.com/reference/reasons/win_msi_product_install_succeeded.json

The outcome is read from the installer result field rather than from the message text, so it behaves the same on a non-English system.

## `win_msi_product_reconfigure_succeeded`: win msi product reconfigure succeeded

A Windows Installer product configuration operation completed successfully.

**Severity:** Notice

**Why it matters:** The product's installed configuration changed. The record is the change-history anchor for what was reconfigured and when.

**In practice:** Windows Installer writes event 11728 (configuration completed successfully) to the Application log (source MsiInstaller) when a repair, a feature change or a reconfiguration of an installed product finishes. The line names the product. It shows as Notice for the change history.

**When to ignore:** When it matches a repair or deployment you ran, or a management agent's schedule.

**What to check:**

- Match on the product name to see what was reconfigured and how often.
- A product reconfiguring on a timer is usually a management agent driving it, not a person.

**Related:**

- `win_msi_operation_failed`: an installer operation that did not complete
- `win_msi_product_install_succeeded`: the product arriving, not changing

**Example:** A repair of an installed runtime, started from Apps and Features, completes successfully.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#win_msi_product_reconfigure_succeeded, https://sparklogs.com/reference/reasons/win_msi_product_reconfigure_succeeded.json

The outcome is read from the installer error code the event id carries rather than from the message text, so it behaves the same on a non-English system.

## `win_msi_product_removal_succeeded`: win msi product removal succeeded

A Windows Installer product removal completed successfully.

**Severity:** Notice

**Why it matters:** The product is no longer installed. The record is the change-history anchor for what left the machine and when.

**In practice:** Windows Installer writes event 11724 (removal completed successfully) to the Application log (source MsiInstaller) when a product is uninstalled. The line names the product. It shows as Notice for the change history: what left the machine and when.

**When to ignore:** Expected removals from your own deployments or cleanup.

**What to check:**

- Match on the product name to see whether the product returned afterwards.
- Check it against the software inventory when a product is expected and missing.

**Related:**

- `win_msi_operation_failed`: an installer operation that did not complete
- `win_msi_product_install_succeeded`: the same product arriving

**Example:** An administrator uninstalls an old runtime, and Windows Installer reports that the removal completed successfully.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#win_msi_product_removal_succeeded, https://sparklogs.com/reference/reasons/win_msi_product_removal_succeeded.json

The outcome is read from the installer error code the event id carries rather than from the message text, so it behaves the same on a non-English system.

## `win_user_profile_file_access_failed`: User profile file access failed

Windows could not load a registry file of a user profile, or could not delete a profile folder.

**Severity:** Notice

**Why it matters:** Part of the user's settings may be missing for that logon, or old profile folders stay on disk.

**In practice:** The User Profile Service writes these to the Application log. Event 1508 says Windows was unable to load the registry for a profile file, such as UsrClass.dat, with the Windows error text, often that another process is using the file. Event 1509 says Windows was unable to load that file and carries only a numeric status, in the event's `Status` field. Event 1533 says Windows cannot delete a profile folder, such as a TEMP profile left after a failed logon, because files in it are in use or access is denied, with the Windows error text. Each event names the file or folder.

**When to ignore:** An occasional 1508 and 1509 pair that does not repeat for the same user.

**What to check:**

- Read the file or folder and the error text, or on 1509 the status.
- For a file in use, look for software that holds user registry files at logoff, such as backup, antivirus or profile tools.
- For a folder that cannot be deleted, remove it after the user signs out and check the ProfileList registry key has no entry left for it.

**Related:**

- `win_user_profile_load_failed`: the whole profile could not be loaded

**Example:** At every logon on a shared desktop, Windows cannot load UsrClass.dat because another process still holds it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#win_user_profile_file_access_failed, https://sparklogs.com/reference/reasons/win_user_profile_file_access_failed.json

## `win_user_profile_load_failed`: win user profile load failed

Windows could not load a user profile, loaded a temporary profile, or fell back to a backup copy.

**Severity:** Serious or Warning

**Why it matters:** The user cannot work normally on that machine: they cannot log on, or they log on with missing settings, missing data paths, or a temporary profile until the profile issue is fixed.

**In practice:** The User Profile Service writes these to the Application log (source Microsoft-Windows-User Profiles Service). Event 1500 says the user cannot log on because the profile cannot be loaded, and 1502 that the locally stored profile cannot be loaded; both end with the Windows error, such as Access is denied. Event 1511 says Windows cannot find the local profile and signed the user in with a temporary profile. Event 1542 says Windows cannot load the user's classes registry file. With a temporary profile, the user sees an empty desktop or "You've been signed in with a temporary profile", and changes made in that session are lost at sign-out. Event 1515 says Windows backed up the profile and will use the backup at the next logon, which is recorded at Warning. A damaged profile or registry hive, a full disk, wrong permissions on the profile folder, or a roaming or FSLogix profile that did not attach are common causes.

**What to check:**

- Identify the affected user in the message, and read the error text.
- Check HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList for that user's SID, including a duplicate key ending in .bak.
- Check free disk space, permissions on the profile folder, and the FSLogix or roaming profile logs.
- Have the user sign out before repairing. Changes made in a temporary profile are lost.

**Related:**

- `win_user_profile_file_access_failed`: one profile file or folder the service could not load or delete

**Example:** An FSLogix profile disk fails to attach, and a terminal server user signs in to a temporary profile.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#win_user_profile_load_failed, https://sparklogs.com/reference/reasons/win_user_profile_load_failed.json

## `winlogon_notification_subscriber_slow`: Winlogon subscriber slow

A component that Winlogon waits on, from Windows or another vendor, was slow to handle sign-in, sign-out or session start.

**Severity:** Notice when a subscriber took a minute or more, Info otherwise.

**Why it matters:** The user waited at the welcome screen, "Please wait" or sign-out screen while the subscriber finished; event 6006 gives the seconds.

**In practice:** Winlogon logs event 6005 in the Application log when a notification subscriber is taking long to handle a session event, and event 6006 when it finishes, with the seconds it took. The subscriber names the component: TrustedInstaller is Windows servicing finishing an update, GPClient is Group Policy, Profiles is the User Profile Service, and frxsvc is FSLogix. The session event says when: CreateSession, Logon, Logoff or EndShell. A pending update, slow Group Policy processing, a large or remote profile, or an unreachable network share at sign-in is the usual cause.

**When to ignore:** TrustedInstaller once right after an update installs.

**What to check:**

- Read the subscriber and the seconds on event 6006.
- For GPClient, check Group Policy processing time with `gpresult` and the GroupPolicy Operational log.
- For Profiles or frxsvc, check the profile size and the profile or FSLogix storage.
- For TrustedInstaller, check for an update that was installing at the time.

**Related:**

- `group_policy_processing_failed`: a Group Policy pass that failed rather than ran slowly

**Example:** After a cumulative update, TrustedInstaller takes 70 seconds to handle session creation on the next start.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#winlogon_notification_subscriber_slow, https://sparklogs.com/reference/reasons/winlogon_notification_subscriber_slow.json

## `wmi_provider_registered_as_localsystem`: wmi provider registered as localsystem

A WMI provider registered to run under the LocalSystem account.

**Severity:** Info cap

**Why it matters:** None. This states what the provider is permitted to do, not that anything happened.

**In practice:** WMI writes event 63 to the Application log (source Microsoft-Windows-WMI) when a provider registers in a namespace under the LocalSystem account. The text warns that the provider may cause a security violation if it does not impersonate users correctly: it describes what the provider could do, not something that happened. Built-in providers, such as DMWmiBridgeProv in root\cimv2\mdm\dmmap, do this at every boot. It shows as Info at most.

**When to ignore:** Built-in providers such as DMWmiBridgeProv, and providers from software you know is installed.

**What to check:**

- Not a security finding on its own. Check an unfamiliar provider name against the software installed on the machine.

**Example:** At boot, DMWmiBridgeProv registers in root\cimv2\mdm\dmmap under the LocalSystem account.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-application#wmi_provider_registered_as_localsystem, https://sparklogs.com/reference/reasons/wmi_provider_registered_as_localsystem.json
