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
| `aspnet_compilation_failed` | `web` | Error |
| `aspnet_unhandled_exception` | `web` | Minor |
| `ca_chain_fail` | `certificates` | Error |
| `ca_crl_fail` | `certificates` | Error |
| `cert_enroll_fail` | `certificates` | Warning, or Verbose for the retired-endpoint shape |
| `cert_expiring` | `certificates` | Warning |
| `db_corruption` | `database` | Critical (824) / Error (823) / Warning (825) |
| `dotnet_unhandled` | `app_stability` | Error |
| `e2e_test_event` | `rmm` | Info cap |
| `entra_password_hash_sync_failed` | `directory_services` | Error |
| `entra_sync_run_failed` | `directory_services` | Error |
| `entra_sync_scheduler_aborted` | `directory_services` | Error |
| `esent_corruption` | `os_stability` | Error |
| `gpu_driver_error` | `hardware` | Notice at most; native level decides below |
| `group_policy_cse_apply_failed` | `device_management` | Minor |
| `group_policy_drive_map_failed` | `device_management` | Warning |
| `group_policy_pref_item_failed` | `device_management` | Warning / Minor for a refused stored credential |
| `install_error` | `patching` | Warning / Info cap for retry-later |
| `install_failed` | `patching` | Minor / Notice when blocked / Info cap for retry-later |
| `mfa_login_succeeded` | `auth` | Info |
| `mfa_not_configured` | `auth` | Warning |
| `mfa_unavailable_access_granted` | `auth` | Error |
| `mfa_user_not_enrolled` | `auth` | Notice |
| `office_subscription_licensing_failed` | `licensing` | Warning |
| `profile_load_fail` | `user_profiles` | Serious |
| `remote_assist_session_started` | `remote_access` | Notice |
| `restart_blocked` | `patching` | Info cap |
| `security_agent_config_fetch_failed` | `endpoint_protection` | Error |
| `security_agent_host_isolated` | `endpoint_protection` | Serious (isolated) / Notice (released) |
| `shadowstorage_exhausted` | `backup` | Error |
| `vendor_svc_fail` | `app_stability` | Error |
| `vpn_dial_failed` | `vpn` | Minor |
| `vss_call_failed_during_shutdown` | `backup` | Info |
| `vss_data_integrity_writer_failed` | `backup` | Error |
| `vss_process_image_name_handle_invalid` | `backup` | Info |
| `vss_provider_class_not_registered` | `backup` | Error |
| `vss_snapshot_call_failed` | `backup` | Warning |
| `vss_snapshot_optimization_incomplete` | `backup` | Debug |
| `vss_system_writer_driver_unreadable` | `backup` | Info cap |
| `vss_writer_callback_access_denied` | `backup` | Info |
| `wcf_request_failed` | `web` | Minor |
| `win_msi_product_install_succeeded` | `patching` | Notice |
| `win_msi_product_reconfigure_succeeded` | `patching` | Notice |
| `win_msi_product_removal_succeeded` | `patching` | Notice |
| `wmi_provider_registered_as_localsystem` | `inventory` | Info cap |

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

## `aspnet_compilation_failed`

A web application on this host could not be compiled and is not serving requests.

**Severity:** Error

**Impact:** Every request to that application fails until the source or the deployment is corrected. Other applications on the host are unaffected.

**Consider:**

- Read the compiler error and the file it names from the message.
- A compilation error immediately after a deployment usually means the deployment was partial.
- Confirm whether the application answered at all in the window before the first occurrence.

## `aspnet_unhandled_exception`

A web application on this host raised an unhandled exception while serving a request.

**Severity:** Minor

**Impact:** That request failed for the user who made it. The application keeps serving other requests.

**Consider:**

- Read the exception type and stack from the message before treating this as an infrastructure question.
- A count that jumps after a deployment points at the deployment.
- A steady low rate is normal for most web applications.

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

## `cert_expiring`

A certificate held by this machine is about to expire or has already expired, and has not been replaced.

**Severity:** Warning

**Impact:** Nothing fails until something asks for the certificate. When something does, it fails with an error that usually names neither the certificate nor its age: a service refusing connections, a network sign-in rejected, or a trust check that stops passing.

**Consider:**

- Check whether the same thumbprint keeps being reported, which means the renewal is not happening.
- Read the enrollment failures on the same provider: they usually name why the renewal cannot run.
- Confirm the machine can reach a domain controller and the certification authority.
- Check the certificate template's autoenrollment permissions for the machine account.

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

## `entra_password_hash_sync_failed`

Password hash synchronization failed for an on-premises domain.

**Severity:** Error

**Impact:** Password changes made in that domain do not reach the cloud directory, so affected users sign in to cloud services with an outdated password.

**Consider:**

- Read the domain and the domain controller from the message and confirm the controller is reachable.
- One occurrence around a controller restart is expected; a repeating pattern is not.

## `entra_sync_run_failed`

A directory synchronization run profile failed to complete.

**Severity:** Error

**Impact:** The changes that run profile carries did not move on this cycle. Repeated failures leave the cloud directory progressively out of date.

**Consider:**

- Read the connector and run profile names from the message.
- Check the connector's own run history in the synchronization console for the underlying error.

## `entra_sync_scheduler_aborted`

The directory synchronization scheduler stopped, so no further synchronization cycles run on this server.

**Severity:** Error

**Impact:** Directory changes stop reaching the cloud directory from this server until the synchronization service is restarted.

**Consider:**

- Restart the synchronization service and confirm cycles resume.
- Read the exception in the message: memory exhaustion points at the host rather than at the product.
- Confirm whether this server is the active one or is in staging mode.

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

## `group_policy_cse_apply_failed`

A Group Policy preference extension could not apply the settings from a policy object.

**Severity:** Minor

**Impact:** None of that policy object's preference items were delivered to the affected user or machine on this refresh.

**Consider:**

- A network path error normally means the host could not reach the policy share at that moment.
- Repeated failures on the same host are the shape worth investigating, not one occurrence.

## `group_policy_drive_map_failed`

A Group Policy drive mapping did not complete on this host.

**Severity:** Warning

**Impact:** The affected user does not have the mapped drive for that session. Nothing else on the machine is affected, and the mapping is attempted again at every policy refresh.

**Consider:**

- The error name in the tail says which question to ask: reachability of the server, resolution of the name, or the stored password.
- A rejected stored credential repeats against the share at every refresh and can lock the account out.
- The drive letter and the share ride the event as fields, so the same share failing across many hosts is one query.

## `group_policy_pref_item_failed`

A Group Policy preference item did not apply on this host. A refused stored credential is held one rung higher, because no later refresh can improve on it.

**Severity:** Warning / Minor for a refused stored credential

**Impact:** The configured item is missing for the affected user or machine. The rest of the policy object applied normally.

**Consider:**

- Read the item name, the policy object and the error code from the message.
- Access denied and file-not-found on a preference item usually mean the source path or its permissions changed.
- An item failing at every refresh will not clear itself.
- A refused stored credential repeats against the target on every refresh and can lock the account out.

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

A Windows Installer operation did not complete. If the installer status says another install is already running, the same event is treated as retry-later context, and an operation refused for want of administrator rights or blocked by an open file is recorded as blocked rather than failed.

**Severity:** Minor / Notice when blocked / Info cap for retry-later

**Impact:** The product may be absent or partially configured until the install is retried or repaired.

**Consider:**

- The decoded installer error in the tail says which condition it was, and it reads the same on a machine whose text is not English.
- A blocked record means the operation never ran: elevate it, or find what keeps attempting it unelevated.
- Check product name and MSI status when present.
- Look for nearby 11707 success or repeated 11708 failures.
- Compare against the completed installs of the same product to see whether it landed later.

Retry-later detection reads the installer status value rather than the message text, so it
behaves the same on a non-English system.

## `mfa_login_succeeded`

A sign-in completed with its second factor verified.

**Severity:** Info

**Consider:**

- Read these beside the fail-open rows on the same host: the ratio is what says how long a gap lasted.
- The absence of these on a host that has the product installed is itself the finding.

## `mfa_not_configured`

A multi-factor logon agent is installed on this host but holds no configuration, so it enforces no second factor.

**Severity:** Warning

**Impact:** Sign-ins on this host complete with a single factor while the product is present and appears deployed.

**Consider:**

- Confirm whether this host is inside the intended rollout scope.
- Compare against hosts of the same group that do enforce, to see whether the gap is deliberate.

## `mfa_unavailable_access_granted`

A sign-in was allowed without its second factor because the multi-factor service could not be reached.

**Severity:** Error

**Impact:** Multi-factor authentication was not applied to that sign-in. While the service stays unreachable, sign-ins on this host continue to complete with a single factor.

**Consider:**

- Check network reachability from this host to the verification service.
- Count these against successful sign-ins on the same host to see how long the gap lasted.
- Review the configured failure mode: allowing the sign-in through is a deliberate setting.

## `mfa_user_not_enrolled`

A sign-in was refused because the account is not enrolled with the multi-factor service.

**Severity:** Notice

**Impact:** The user cannot sign in on this host until the account is enrolled or excluded from the policy.

**Consider:**

- Enrol the account, or place it in the exclusion the policy intends.
- Service accounts appearing here usually need a policy exclusion rather than an enrolment.

## `office_subscription_licensing_failed`

The subscription licensing check for the installed office suite failed.

**Severity:** Warning

**Impact:** The suite keeps working on the licence it already holds. If the check keeps failing, the applications eventually drop to reduced functionality and documents become read-only.

**Consider:**

- Check whether the same host reports it repeatedly, or only around periods of being offline.
- Confirm the signed-in account still holds a licence in the tenant.
- Check outbound access to the licensing endpoints from that machine.

## `profile_load_fail`

Windows could not load a user profile, or loaded a temporary profile.

**Severity:** Serious

**Impact:** The user cannot work normally on that machine: they log on with missing settings, missing data paths, or a temporary profile until the profile issue is fixed.

**Consider:**

- Identify the affected user profile from the event message.
- Check profile service errors, disk space, permissions, and roaming or FSLogix state.

## `remote_assist_session_started`

A remote assistance session started on this host and a remote party could see the desktop.

**Severity:** Notice

**Impact:** Someone remote had a view of this desktop from this moment. Whether that was expected depends on whether a support session was arranged.

**Consider:**

- Confirm the session was arranged with the user before treating it as routine.
- Compare the time against the helpdesk record for that user.
- Unexpected sessions on a workstation are the shape support-desk impersonation leaves.

## `restart_blocked`

Restart Manager could not shut down or restart an app during an update session.

**Severity:** Info cap

**Impact:** The update may need a retry, reboot, or user action to close the blocking app.

**Consider:**

- Join by Restart Manager session id when present.
- Review blocked app name, path, and status.

## `security_agent_config_fetch_failed`

A security agent could not retrieve its configuration because its credentials were refused.

**Severity:** Error

**Impact:** The agent takes no new configuration or detection content and drifts from the policy it is meant to enforce, while continuing to appear installed.

**Consider:**

- Re-register the agent with a valid identifier and key.
- Check the vendor console for whether this host is reporting at all.

## `security_agent_host_isolated`

An endpoint detection agent isolated this host from the network, or later released it.

**Severity:** Serious (isolated) / Notice (released)

**Impact:** While isolated the host cannot reach the network, so the user cannot work and the machine's other telemetry may stop arriving.

**Consider:**

- Confirm from the vendor console whether the isolation was automatic or triggered by an analyst.
- Pair the isolation with its release before judging how long the host was off the network.
- The event names no threat: read the detection that preceded it in the vendor console.

## `shadowstorage_exhausted`

Shadow copy storage is full, so restore points are being deleted or no longer created.

**Severity:** Error

**Impact:** Snapshot-based backups and System Restore lose history or stop working on the affected volume. A backup job may still report success while protecting less than it appears to.

**Consider:**

- Check the shadow storage association and maximum size for the affected volume.
- Verify the oldest surviving restore point against the retention the customer expects.
- Free space or raise the cap; the condition recurs until the allocation changes.

## `vendor_svc_fail`

A vendor service launcher reported a failure.

**Severity:** Error

**Impact:** The related vendor application, device helper, or background service may not start or may lose functionality.

**Consider:**

- Identify the vendor service and any code-signing or launch error in the event message.
- Check whether the vendor app still starts and whether the failure recurs.

## `vpn_dial_failed`

A remote-access dial attempt failed.

**Severity:** Minor

**Impact:** The user did not reach the network through that profile on that attempt. A single failure is normally retried successfully; repeated failures on one profile are the tunnel rather than the user.

**Consider:**

- Read the error code from the message: an authentication code points at the credential.
- Check whether the same profile connected successfully soon afterwards.
- The same profile failing across many hosts points at the concentrator, not the users.

## `vss_call_failed_during_shutdown`

A shadow copy operation was abandoned because the computer was shutting down.

**Severity:** Info

**Impact:** None. The operation is retried on the next run; nothing on the machine is broken by it.

**Consider:**

- Treat as a finding only if it appears without a matching restart on the same host and window.

## `vss_data_integrity_writer_failed`

A backup writer for a database, mail store, virtual machine host, or directory service reported a failure during shadow copy creation.

**Severity:** Error

**Impact:** The backup of that data store may be incomplete or inconsistent, even if the backup job itself reported success.

**Consider:**

- Identify the named writer and verify the most recent restore point for that store.
- Check the application's own logs in the same window; the writer failure usually has a cause recorded there.
- Recurring failures for the same writer mean the protected data has no verified recent backup.

## `vss_process_image_name_handle_invalid`

The Volume Shadow Copy Service looked up a process that had already exited during a snapshot.

**Severity:** Info

**Impact:** None. The shadow copy proceeds.

**Consider:**

- Other event 8193 messages are not this condition; read the routine named in the message.

## `vss_provider_class_not_registered`

A component the Volume Shadow Copy Service needs is not registered, so shadow copies cannot be created on this machine.

**Severity:** Error

**Impact:** Snapshot-based backups, System Restore and anything else that needs a shadow copy fail on this host until the registration is repaired. A backup product may still complete a job by other means, so a green backup report does not clear this.

**Consider:**

- Confirm the Volume Shadow Copy and COM+ Event System services are installed and start.
- Re-register the shadow copy provider and the VSS component libraries on the host.
- Expect the host to keep producing this at high volume until it is repaired; it does not self-heal.

## `vss_snapshot_call_failed`

The Volume Shadow Copy Service was refused a control call it makes while working with shadow copies on a volume.

**Severity:** Warning

**Impact:** Shadow copy handling on the affected volume is constrained: the storage area cannot be resized, or a snapshot phase did not complete as asked. Backups may still succeed, so this is context for a backup problem rather than proof of one.

**Consider:**

- Check the permissions on the volume and its shadow storage association for the resize refusal.
- Check the storage driver and any third-party shadow copy provider for the parameter rejections.
- Confirm the backup job outcome separately; this line does not report it.

## `vss_snapshot_optimization_incomplete`

Shadow copy optimization did not finish excluding temporary files within its time budget.

**Severity:** Debug

**Impact:** The shadow copy is larger than it would otherwise be. Backup correctness is unaffected.

**Consider:**

- Persistent occurrences on a host with tight free space are worth a disk-space check, not a backup investigation.

## `vss_system_writer_driver_unreadable`

The VSS System Writer could not read a driver binary while enumerating for a snapshot.

**Severity:** Info cap

**Impact:** None on its own. Snapshot enumeration continues and this event does not indicate a failed backup.

**Consider:**

- Do not treat this line as evidence that a backup or snapshot failed.
- Confirm backup outcomes from the backup product's own job result, never from writer state.

## `vss_writer_callback_access_denied`

The Volume Shadow Copy Service could not read a writer's callback interface because of process permissions, and continued.

**Severity:** Info

**Impact:** None on its own. Shadow copy creation is not blocked by this check.

**Consider:**

- Treat as a real finding only alongside a failed backup on the same host and window.

## `wcf_request_failed`

A hosted service on this machine could not process a request.

**Severity:** Minor

**Impact:** The caller did not get an answer for that request. Other requests and other applications on the host are unaffected.

**Consider:**

- Read the endpoint path from the message: an endpoint that does not exist usually means a caller pointed at the wrong address or a deployment that did not land.
- Compare the count against the web server's own request log for the same window.
- The same endpoint failing across several hosts points at the deployment rather than at a client.

## `win_msi_product_install_succeeded`

A Windows Installer product install completed successfully.

**Severity:** Notice

**Impact:** The product is installed. The record is the change-history anchor for what arrived on the machine and when.

**Consider:**

- Join on the product name to find the failed attempts that preceded it.
- Compare against the software inventory when a product is expected and absent.

The outcome is read from the installer result field rather than from the message text, so it
behaves the same on a non-English system.

## `win_msi_product_reconfigure_succeeded`

A Windows Installer product configuration operation completed successfully.

**Severity:** Notice

**Impact:** The product's installed configuration changed. The record is the change-history anchor for what was reconfigured and when.

**Consider:**

- Join on the product name to see what was reconfigured and how often.
- A product reconfiguring on a timer is normally a management agent driving it, not a person.

The outcome is read from the installer error code the event id carries rather than from the
message text, so it behaves the same on a non-English system.

## `win_msi_product_removal_succeeded`

A Windows Installer product removal completed successfully.

**Severity:** Notice

**Impact:** The product is no longer installed. The record is the change-history anchor for what left the machine and when.

**Consider:**

- Join on the product name to see whether the product returned afterwards.
- Compare against the software inventory when a product is expected and absent.

The outcome is read from the installer error code the event id carries rather than from the
message text, so it behaves the same on a non-English system.

## `wmi_provider_registered_as_localsystem`

A WMI provider registered to run under the LocalSystem account.

**Severity:** Info cap

**Impact:** None. This states what the provider is permitted to do, not that anything happened.

**Consider:**

- Do not treat this line as a security finding: it reports a registration, never an action.
