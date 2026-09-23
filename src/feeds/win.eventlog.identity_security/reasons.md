<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.identity_security`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `applocker_audit_would_block` | `security_audit` | Notice |  |
| `applocker_unsupported_windows_edition` | `security_audit` | Notice |  |
| `bitlocker_recovery_key_backup_failed` | `encryption` | Error or Info | benign possible |
| `bitlocker_secure_boot_unavailable` | `encryption` | Notice |  |
| `cert_expired` | `certificates` | Warning |  |
| `cert_expiring` | `certificates` | Warning |  |
| `code_integrity_catalog_load_failed` | `security_audit` | Notice or Info | benign possible |
| `code_integrity_driver_revoked` | `security_audit` | Warning |  |
| `code_integrity_image_hash_missing` | `security_audit` | Warning or Notice |  |
| `code_integrity_policy_audit_would_block` | `security_audit` | Notice |  |
| `code_integrity_policy_blocked` | `security_audit` | Warning |  |
| `code_integrity_signing_level_blocked` | `security_audit` | Warning |  |
| `crypto_key_operation_failed` | `certificates` | Notice or Debug | benign possible |
| `defender_sensor_connection_failed` | `endpoint_protection` | Warning or Info | benign possible |
| `device_encryption_enable_failed` | `encryption` | Warning |  |
| `device_registration_failed` | `device_management` | Warning or Notice |  |
| `dpapi_unprotect_failed` | `certificates` | Notice |  |
| `entra_device_certificate_update_failed` | `device_management` | Warning |  |
| `entra_sign_in_failed` | `auth` | Notice for a wrong credential or an unreachable service, Warning for a refusal the event does not explain. |  |
| `entra_token_acquisition_failed` | `auth` | Info where the library is asking for a sign-in, Notice for a transport failure, Warning where a tenant setting refused the request. | benign possible |
| `exploit_mitigation_audit_would_block` | `security_audit` | Info | benign |
| `exploit_mitigation_blocked` | `security_audit` | Notice or Verbose | benign possible |
| `exploit_mitigation_shadow_stack_mismatch` | `security_audit` | Notice on the documented compatibility path, Warning where nothing on the event explains the mismatch. |  |
| `group_policy_domain_controller_unresolved` | `device_management` | Warning or Notice |  |
| `group_policy_extension_apply_failed` | `device_management` | Minor or Info | benign possible |
| `group_policy_file_share_unhardened` | `device_management` | Notice |  |
| `group_policy_processing_failed` | `device_management` | Notice on a device that moves and loses the corporate network, Warning otherwise. |  |
| `laps_password_backup_failed` | `auth` | Warning |  |
| `ntlm_authentication_used` | `auth` | Warning or Notice |  |
| `vbs_key_isolation_failed` | `certificates` | Notice or Info | benign possible |
| `windows_hello_key_registration_failed` | `auth` | Notice or Info | benign possible |
| `windows_hello_provisioning_blocked` | `auth` | Notice or Info | benign possible |

## `applocker_audit_would_block`

An application-control policy running in audit mode would have blocked this file under enforcement.

**Severity:** Notice

**Impact:** Nothing was blocked and the file ran. Someone must decide about every file like this before the policy can move to enforcement.

**Consider:**

- Collect every instance of this row.
- Together they form the work list for moving an application-control policy from audit to enforced.
- One instance alone tells an engineer nothing.

## `applocker_unsupported_windows_edition`

An application-control policy reached a device whose Windows edition cannot enforce it.

**Severity:** Notice

**Impact:** The policy is inert on that device and every application-control decision it would have made is not made. Someone believes this device is protected.

**Consider:**

- Give the device a Windows edition that can enforce the policy, or remove it from the policy's scope.

## `bitlocker_recovery_key_backup_failed`

BitLocker reported that a recovery-key backup or retrieval operation failed for a volume.

**Severity:** Error or Info

**Impact:** The event does not establish whether another protector or backup copy exists. Check the destination and the volume's recovery-key records.

**Consider:**

- Read the backup target and operation in the event message.
- Check whether the configured destination is reachable.
- Confirm the volume's recovery-key records before treating the failure as an escrow gap.

## `bitlocker_secure_boot_unavailable`

BitLocker reported that Secure Boot integrity data could not be used for a volume.

**Severity:** Notice

**Impact:** The event identifies an integrity-validation failure. It does not establish the resulting key-binding method or indicate that a boot-chain attack occurred.

**Consider:**

- Read the reason arm: Secure Boot disabled, a missing or unreadable UEFI variable, or an invalid TCG log.
- Check Secure Boot and firmware integrity state on the affected device.
- Use the device and firmware documentation for the reported condition.

## `cert_expired`

A certificate in the machine or the user store has expired.

**Severity:** Warning

**Impact:** Whatever that certificate authenticates has stopped working, and the event does not say what that is.

**Consider:**

- Read the certificate subject.
- A domain controller certificate expiring is a different problem from a vendor application signing certificate expiring.
- The subject line is the only way to tell them apart.

## `cert_expiring`

A certificate in the machine or the user store is about to expire.

**Also reported by:** `win.eventlog.application`

**Severity:** Warning

**Impact:** Whatever that certificate authenticates stops working on the expiry date.

**Consider:**

- Read the certificate subject.
- A domain controller certificate expiring is a different problem from a vendor application signing certificate expiring.
- The subject line is the only way to tell them apart.

## `code_integrity_catalog_load_failed`

Windows could not read a signature catalog, so the files that catalog vouches for have no signature until it is replaced.

**Severity:** Notice or Info

**Impact:** Files the catalog vouches for lose their signature. That is one path to a file failing its integrity check on the next load.

**Consider:**

- Read the status code.
- A resource-exhaustion code means the machine was under memory pressure at the time and it will likely pass next time.
- A name-not-found code means the catalog is missing, so check servicing.

## `code_integrity_driver_revoked`

A driver on this device is on the platform vendor's revoked-driver list, and the kernel refused to load it.

**Severity:** Warning

**Impact:** The driver did not load and the file is still on disk. Whatever installed it put a known-bad driver on the device.

**Consider:**

- Find what installed the driver and remove it.
- When a management or diagnostics agent shipped the revoked driver, update that agent.
- When nothing else explains the driver, investigate further.

## `code_integrity_image_hash_missing`

Windows found no signature on a file it was asked to load, so it could not verify the file's integrity.

**Severity:** Warning or Notice

**Impact:** A kernel driver with no verifiable hash does not load and the subsystem behind it stops working. A user-mode library leaves the calling process running.

**Consider:**

- Read the requested signing level and the file name.
- A kernel driver with an unverifiable hash is worth a ticket.
- A user-mode scanning library reflects the vendor's packaging and needs no action.

## `code_integrity_policy_audit_would_block`

A configured Code Integrity policy recorded that enforcement would have refused a file, under audit mode.

**Severity:** Notice

**Impact:** Nothing was denied; the file ran. An engineer moving this policy to enforcement needs this record to know what enforcement would then refuse.

**Consider:**

- Read the policy name first.
- This is a heads-up: nothing failed on this device.

## `code_integrity_policy_blocked`

A configured Code Integrity policy refused a file under enforcement.

**Severity:** Warning

**Impact:** The file did not load, so whatever needs it is broken now.

**Consider:**

- Read the policy name first.
- The driver failed to load, so whatever needs that driver is broken now.

## `code_integrity_signing_level_blocked`

An application-control policy or a code-signing requirement on this device blocked a file from loading.

**Severity:** Warning

**Impact:** The file did not run. Every load attempt fails the same way until the file is signed or the policy changes.

**Consider:**

- Check whether the blocked file belongs on the device.
- If it does, review the application-control policy or signing requirement that refused it.
- If it does not, treat the load attempt as unwanted software.

Not collected: Windows also logs this event when one of its own protected system processes refuses a third-party library (requested levels 7, 8, 12 and 14). Only Microsoft-signed code can pass that check, the vendor cannot obtain that signature, nothing is broken and no setting changes it, so those rows are dropped before collection.

## `crypto_key_operation_failed`

A key operation failed against one of the Windows key-storage providers.

**Severity:** Notice or Debug

**Impact:** Usually none: the caller falls back. Where the hardware key store is the one refusing, Windows Hello, device registration and BitLocker key protectors all sit on top of it.

**Consider:**

- Read the provider name and the process together.
- An application probing the software provider for a key it does not have is routine.
- A hardware provider reporting the device as not ready flags a hardware or provisioning problem.

## `defender_sensor_connection_failed`

The endpoint detection sensor cannot reach its cloud service, or cannot get a token to talk to it.

**Severity:** Warning or Info

**Impact:** The device stops reporting to the security console while it lasts, and the console still shows it as onboarded.

**Consider:**

- Read the error code.
- A name-resolution code reports a proxy or naming problem on this network.
- A rejection from the token service reports an onboarding or licensing problem.
- Either way, the sensor stays dark.

## `device_encryption_enable_failed`

The device qualifies for automatic device encryption, tried to turn it on and failed.

**Severity:** Warning

**Impact:** The system volume stays unencrypted. The customer likely believes that device is encrypted.

**Consider:**

- Compare against the ids that report success.
- A host producing this repeatedly has an unencrypted system volume.

## `device_registration_failed`

The device tried to register itself with the directory and failed.

**Severity:** Warning or Notice

**Impact:** The device has no directory identity, so every policy that keys on device state stops applying to it. The device still works for its user.

**Consider:**

- Work bottom up.
- If the name or controller lookup ids appear, the registration failure above them is only a symptom, and the arm says which half to work: nothing answered, or the directory answered and refused.
- A refusal points at the computer object, the rights on it, or the credentials presented, so a connectivity check will find nothing.
- If only the outcome pair fires, check the service connection point in the directory.

## `dpapi_unprotect_failed`

Windows could not decrypt a protected blob, such as a saved credential or a certificate private key.

**Severity:** Notice

**Impact:** The owning application usually re-creates the blob on its next use. Where it cannot, that saved credential or private key is gone.

**Consider:**

- Ask whether a user reports lost saved credentials or a failing certificate store.
- Without that report, treat this event as background noise.

## `entra_device_certificate_update_failed`

The device failed to refresh the certificate that proves its identity to the directory.

**Severity:** Warning

**Impact:** Left alone, the device eventually cannot prove it is registered, and every conditional-access policy that depends on device state stops seeing it.

**Consider:**

- Check whether the device can reach the registration service.
- Check whether its key still exists in the trusted platform module.
- This shape precedes a device silently dropping out of compliance.

## `entra_sign_in_failed`

The cloud authentication plugin refused a sign-in on this device.

**Severity:** Notice for a wrong credential or an unreachable service, Warning for a refusal the event does not explain.

**Impact:** The user is not signed in. A wrong credential is a user event; an unreachable service is a connectivity problem outside authentication.

**Consider:**

- Read the status before anything else.
- The wrong-password code reports a user event.
- The network-unreachable code reports a connectivity problem outside authentication.

## `entra_token_acquisition_failed`

The device failed to get a token for a cloud resource.

**Severity:** Info where the library is asking for a sign-in, Notice for a transport failure, Warning where a tenant setting refused the request.

**Impact:** The resource behind that token is unavailable to the user until the cause is fixed. A tenant configuration error affects every device in the tenant.

**Consider:**

- Group by the error message across a day on one host.
- A transport error points to a network or proxy problem.
- A grant or consent error points to a tenant configuration problem, and no work on the device fixes that.
- An interaction-required message reports normal sign-in flow.

## `exploit_mitigation_audit_would_block`

Exploit protection recorded that enforcement would have stopped a process, under audit mode.

**Severity:** Info

**Consider:**

- This is a heads-up: nothing was denied on this device.
- An engineer moving this mitigation to enforcement needs this record to know what it would hit.

## `exploit_mitigation_blocked`

Exploit protection stopped a process from an action its policy forbids, under enforcement.

**Severity:** Notice or Verbose

**Consider:**

- Pivot on the image path, because the event count carries no meaning by itself.
- A path producing these events for weeks is normal.
- A path appearing for the first time flags an application that just broke, and this mitigation caused the break.

The enforcing records on the kernel-mode id that arrives at volume are rate-bounded: three per image path per device per day, with the count of what a day suppressed carried on the next day's first record. Read the paths, not the counts.

## `exploit_mitigation_shadow_stack_mismatch`

A process returned to a different address from the one the hardware shadow stack recorded, and the platform either allowed it to continue or refused the operation.

**Severity:** Notice on the documented compatibility path, Warning where nothing on the event explains the mismatch.

**Impact:** Where the operation was refused, whatever the process was attempting did not happen. Where it continued, nothing changed.

**Consider:**

- Read the image name and the nonenforcement reason together.
- A recognized application with a known compatibility reason is the ordinary case.
- The same reason on a process with no business rewriting return addresses is worth investigating.

## `group_policy_domain_controller_unresolved`

The machine could not find or could not reach a domain controller.

**Severity:** Warning or Notice

**Impact:** Everything downstream of that step fails: no policy applies, and the device cannot register either.

**Consider:**

- A no-such-domain code means the domain itself failed to resolve, which is a name-resolution or connectivity problem.
- An access-denied code means the machine account is the problem.
- Read this alongside device registration: a device that cannot find a controller cannot register either.

## `group_policy_extension_apply_failed`

A Group Policy client-side extension could not apply the settings from a policy object.

**Also reported by:** `win.eventlog.application`

**Severity:** Minor or Info

**Impact:** None of that policy object's items were delivered to the affected user or machine on this refresh.

**Consider:**

- Read the extension name and the code together.
- A network path error on the drive-maps or folder-redirection extension means the machine could not reach the policy share.
- An access-denied error on the security extension means the policy object itself has a permissions problem.

## `group_policy_file_share_unhardened`

The machine reads Group Policy files from a file share without mutual authentication or integrity protection.

**Severity:** Notice

**Impact:** An attacker on the network path between the machine and the policy share could tamper with policy content in transit. Nothing has gone wrong yet.

**Consider:**

- Compare the hosts producing this event against the domain's hardened-paths policy.
- Deliver the mismatched devices as a list for a security review.

## `group_policy_processing_failed`

Group Policy failed to apply for that boot or that logon.

**Severity:** Notice on a device that moves and loses the corporate network, Warning otherwise.

**Impact:** That machine enforces none of the customer's expected settings for that session, and runs whatever policy it last cached.

**Consider:**

- Read the connectivity flag first.
- A portable device booting away from the corporate network produces exactly this event.
- The same event on a desktop is a real problem.

## `laps_password_backup_failed`

The device manages its local administrator password and the backup of that password is failing.

**Severity:** Warning

**Impact:** The password rotates on schedule and nobody can retrieve it, so a local sign-in that needs it will fail. The compliance claim that the password is escrowed is not true.

**Consider:**

- Read the response body on the id that carries it.
- A tenant-side not-enabled message means someone deployed the policy to devices before configuring the tenant.
- Every device carrying that policy rotates a password no one can retrieve.

## `ntlm_authentication_used`

This machine used the legacy NTLM authentication protocol, as a client or as a server.

**Severity:** Warning or Notice

**Impact:** Nothing failed. Where the first version of the protocol was used, the credential on that session carried a weakness the vendor has documented for a decade.

**Consider:**

- Use this as the audit trail for retiring the protocol.
- Focus on rows carrying the first version of the protocol and rows showing an anonymous principal.

## `vbs_key_isolation_failed`

The isolated key environment that virtualization-based security provides is failing on this device.

**Severity:** Notice or Info

**Impact:** Keys that should be held in hardware-isolated memory are not. Every caller keeps working, so nothing is unavailable.

**Consider:**

- Check whether virtualization-based security should be on for this device.
- Where the platform states the feature cannot be enabled, the hardware or firmware cannot support it and retrying will not change the outcome.

## `windows_hello_key_registration_failed`

A Windows Hello key or container operation failed after provisioning had already passed its prerequisites.

**Severity:** Notice or Info

**Impact:** That user's Windows Hello credential is not usable on this device until it is enrolled again. Signing in with a password is unaffected.

**Consider:**

- Read the key status.
- The attestation-capability status is a hardware fact only.
- A container error or a key error means the user's Windows Hello credential is gone, so re-enroll it.

## `windows_hello_provisioning_blocked`

Windows Hello for Business will not set up on this device for this user.

**Severity:** Notice or Info

**Impact:** The user signs in with a password instead. Where a policy does ask for the feature, a passwordless rollout is quietly not happening.

**Consider:**

- Read the checklist, where each No reports one configuration fact.
- If the policy is enabled, the device is joined, and the feature still will not launch, the remaining No is the ticket.
