<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.identity_security`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `applocker_audit_would_block` | applocker audit would block | event | Info to Notice | `security_audit` |  |
| `applocker_unsupported_windows_edition` | applocker unsupported windows edition | event | Notice | `security_audit` |  |
| `bitlocker_protection_resume_failed` | bitlocker protection resume failed | event | Warning | `encryption` |  |
| `bitlocker_recovery_info_read_failed` | bitlocker recovery info read failed | event | Info to Notice | `encryption` |  |
| `bitlocker_recovery_key_backup_failed` | bitlocker recovery key backup failed | event | Info to Error | `encryption` | benign possible |
| `bitlocker_secure_boot_unavailable` | bitlocker secure boot unavailable | event | Notice | `encryption` |  |
| `cert_expired` | cert expired | event | Warning | `certificates` |  |
| `cert_expiring` | cert expiring | event | Warning | `certificates` |  |
| `code_integrity_catalog_load_failed` | code integrity catalog load failed | event | Info to Notice | `security_audit` | benign possible |
| `code_integrity_driver_revoked` | code integrity driver revoked | event | Warning | `security_audit` |  |
| `code_integrity_image_hash_missing` | code integrity image hash missing | event | Notice to Warning | `security_audit` |  |
| `code_integrity_policy_audit_would_block` | code integrity policy audit would block | event | Notice | `security_audit` |  |
| `code_integrity_policy_blocked` | code integrity policy blocked | event | Warning | `security_audit` |  |
| `code_integrity_signing_level_blocked` | code integrity signing level blocked | event | Warning | `security_audit` |  |
| `crypto_key_operation_failed` | crypto key operation failed | event | Debug to Notice | `certificates` | benign possible |
| `defender_sensor_connection_failed` | defender sensor connection failed | event | Info to Warning | `endpoint_protection` | benign possible |
| `device_encryption_enable_failed` | device encryption enable failed | event | Notice to Warning | `encryption` |  |
| `device_registration_failed` | device registration failed | event | Notice to Warning | `device_management` |  |
| `dpapi_unprotect_failed` | dpapi unprotect failed | event | Notice | `certificates` |  |
| `entra_device_certificate_update_failed` | entra device certificate update failed | event | Notice to Warning | `device_management` |  |
| `entra_sign_in_failed` | entra sign in failed | event | Notice to Warning | `auth` |  |
| `entra_token_acquisition_failed` | entra token acquisition failed | event | Verbose to Warning | `auth` | benign possible |
| `exploit_mitigation_audit_would_block` | exploit mitigation audit would block | event | Info | `security_audit` | benign |
| `exploit_mitigation_blocked` | exploit mitigation blocked | event | Verbose to Notice | `security_audit` | benign possible |
| `exploit_mitigation_shadow_stack_mismatch` | exploit mitigation shadow stack mismatch | event | Notice to Warning | `security_audit` |  |
| `group_policy_domain_controller_unresolved` | group policy domain controller unresolved | event | Notice to Warning | `device_management` |  |
| `group_policy_extension_apply_failed` | group policy extension apply failed | event | Info to Minor | `device_management` | benign possible |
| `group_policy_file_share_unhardened` | group policy file share unhardened | event | Notice | `device_management` |  |
| `group_policy_processing_failed` | group policy processing failed | event | Notice to Warning | `device_management` |  |
| `laps_password_backup_failed` | laps password backup failed | event | Warning | `auth` |  |
| `ntlm_authentication_used` | ntlm authentication used | event | Verbose to Warning | `auth` |  |
| `vbs_key_isolation_failed` | vbs key isolation failed | event | Info to Notice | `certificates` | benign possible |
| `windows_hello_key_registration_failed` | windows hello key registration failed | event | Info to Notice | `auth` | benign possible |
| `windows_hello_provisioning_blocked` | windows hello provisioning blocked | event | Info to Notice | `auth` | benign possible |

## `applocker_audit_would_block`: applocker audit would block

An application-control policy running in audit mode would have blocked this file under enforcement.

**Severity:** Notice for a file under the executable or script rules. Info under the DLL and managed-installer rules, where one record per file a day is kept.

**Why it matters:** Nothing was blocked and the file ran. Once the policy is enforced, this file stops running unless a rule allows it.

**In practice:** AppLocker writes event 8003 to the Microsoft-Windows-AppLocker/EXE and DLL log when a policy in Audit only mode would have denied an executable or a library. The record names the file's full path, its hash, the rule collection (EXE, DLL or the managed-installer collection) and the rule involved. An all-zero rule ID means no allow rule covered the file. Any other rule ID names a rule that matched and would have denied it.

**When to ignore:** Findings under the DLL and managed-installer collections are routine until someone plans to enforce those rules.

**What to check:**

- Group these records by file path and hash. The distinct list is the work to finish before the policy is enforced.
- Give each file that belongs a publisher, path or hash allow rule.
- Look harder at a file under a user profile or a temp folder that nobody recognizes before allowing it.

**Related:**

- `applocker_unsupported_windows_edition`: a device whose Windows edition cannot enforce the policy at all
- `code_integrity_policy_audit_would_block`: the same audit finding from an App Control for Business policy

**Example:** A device with DLL rules in audit mode loads a library from a Program Files folder that no allow rule covers.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#applocker_audit_would_block, https://sparklogs.com/reference/reasons/applocker_audit_would_block.json

## `applocker_unsupported_windows_edition`: applocker unsupported windows edition

An application-control policy reached a device whose Windows edition cannot enforce it.

**Severity:** Notice

**Why it matters:** The policy enforces nothing on this device, while reports of where the policy is deployed still count the device as covered.

**In practice:** AppLocker writes event 8009 to the Microsoft-Windows-AppLocker/MSI and Script log, "AppLocker component not available on this SKU", on a Windows edition that does not support AppLocker. The file the event names is the Windows library that reported the condition, not a file that was blocked or allowed. The condition lasts until the device's edition changes.

**What to check:**

- Check the device's Windows edition in Settings > System > About.
- Move the device to an edition that enforces the policy, or remove it from the policy's scope so coverage reports are accurate.

**Related:**

- `applocker_audit_would_block`: a policy that is running, in audit mode

**Example:** A device on an edition without application-control support receives a domain-wide AppLocker policy.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#applocker_unsupported_windows_edition, https://sparklogs.com/reference/reasons/applocker_unsupported_windows_edition.json

## `bitlocker_protection_resume_failed`: bitlocker protection resume failed

BitLocker could not turn protection back on for the OS volume after it was suspended.

**Severity:** Warning

**Why it matters:** Until protection resumes, the key to the OS volume is stored in the clear on the disk, so the encryption does not protect a lost or stolen device.

**In practice:** BitLocker writes event 822 to the Microsoft-Windows-BitLocker/BitLocker Management log when it cannot turn protection back on for the OS volume after a suspend. Servicing and firmware updates suspend protection before a restart that would otherwise ask for the recovery key. While protection is suspended the volume stays encrypted, but its key sits unprotected on the disk. The event names the volume and the error code, and the service tries again later.

**When to ignore:** When `manage-bde -status` later shows protection on, the gap has closed.

**What to check:**

- Run `manage-bde -status C:` and check whether Protection Status shows Protection On.
- If it is still off, resume it with `manage-bde -protectors -enable C:` or `Resume-BitLocker -MountPoint C:`.
- Read the error code in the event. An unreachable domain or credential is the usual cause.

**Related:**

- `device_encryption_enable_failed`: encryption that never started, rather than protection that did not resume

**Example:** After a servicing restart, a laptop away from the office cannot resume protection on C: because the domain cannot be found (0x8007054B).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#bitlocker_protection_resume_failed, https://sparklogs.com/reference/reasons/bitlocker_protection_resume_failed.json

## `bitlocker_recovery_info_read_failed`: bitlocker recovery info read failed

BitLocker could not read the recovery information escrowed for this device in Entra.

**Severity:** Notice or Info

**Why it matters:** None on the drive: it stays protected and the escrowed copy is untouched. A refusal that keeps repeating may point at the device object or its recovery record in Entra ID.

**In practice:** BitLocker writes event 868 to the Microsoft-Windows-BitLocker/BitLocker Management log when the device could not fetch the recovery information it escrowed in Entra ID. It writes event 875 when the service answered that request with a failure. Both are reads of the escrowed copy, not backups, and say nothing about whether a key is escrowed. On 868 the error code is often a network error, such as 0x80072EE7 for a name that did not resolve.

**When to ignore:** Event 868 with a network error on a device that was offline at the time.

**What to check:**

- Check whether the device had network access at the time.
- If the service keeps refusing, look at the device object and its BitLocker keys in the Entra admin center.

**Related:**

- `bitlocker_recovery_key_backup_failed`: a backup of the recovery key that failed, a different operation

**Example:** A laptop with no network at sign-in fails to fetch its recovery information from Entra ID (0x80072EE7).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#bitlocker_recovery_info_read_failed, https://sparklogs.com/reference/reasons/bitlocker_recovery_info_read_failed.json

## `bitlocker_recovery_key_backup_failed`: bitlocker recovery key backup failed

BitLocker reported that a recovery-key backup operation failed for a volume.

**Severity:** Error or Info

**Why it matters:** If the device later asks for its recovery key and no other copy exists, the data on that volume cannot be recovered. The event alone does not show whether another copy exists.

**In practice:** BitLocker writes events 829, 846, 872 and 898 to the Microsoft-Windows-BitLocker/BitLocker Management log when a recovery-key backup did not complete. Event 846 is a backup to Entra ID, and event 872 is a backup whose text names no destination. Events 829 and 898 are a backup to a personal Microsoft account, which a managed device is not signed in to, and they ship at Info. The event carries an error code and, on some IDs, the volume. It does not show whether another protector or an earlier backup already holds the key.

**When to ignore:** Events 829 and 898, a backup to a personal Microsoft account, on a managed device.

**What to check:**

- Read the error code and the volume in the event.
- Run `manage-bde -protectors -get C:` and compare the recovery password ID with the keys stored in Active Directory or the Entra admin center.
- Back the key up again with `manage-bde -protectors -adbackup C: -id <ID>` for Active Directory, or `BackupToAAD-BitLockerKeyProtector` for Entra ID.

**Related:**

- `bitlocker_recovery_info_read_failed`: a read of the escrowed copy that failed, not a backup
- `bitlocker_secure_boot_unavailable`: the integrity binding rather than the key escrow
- `device_encryption_enable_failed`: encryption that never started, rather than a key that was not escrowed

**Example:** A laptop encrypts while its user works from home, and the backup of its recovery key to Entra ID fails.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#bitlocker_recovery_key_backup_failed, https://sparklogs.com/reference/reasons/bitlocker_recovery_key_backup_failed.json

## `bitlocker_secure_boot_unavailable`: bitlocker secure boot unavailable

BitLocker reported that Secure Boot integrity data could not be used for a volume.

**Severity:** Notice

**Why it matters:** The volume is still encrypted. BitLocker could not tie its key to Secure Boot on this boot, so the key is less well protected against a tampered boot chain than intended.

**In practice:** BitLocker writes these events to the Microsoft-Windows-BitLocker/BitLocker Management log when it cannot use Secure Boot to validate a volume's boot integrity. Event 810 says Secure Boot is off. Events 813, 815, 834, 835, 881 and 893 say the firmware's boot measurement log (the TCG log) is invalid or missing an entry. Events 811, 812 and 878 say a firmware variable or measurement could not be read. Windows checks again at every boot. The event does not show that the boot chain was attacked.

**What to check:**

- Check Secure Boot State in `msinfo32`, or run `Confirm-SecureBootUEFI` in an elevated PowerShell.
- If Secure Boot is off, suspend BitLocker, turn Secure Boot on in the firmware setup, then resume BitLocker.
- For an invalid or unreadable measurement, check the vendor's firmware updates for the model.

**Related:**

- `bitlocker_recovery_key_backup_failed`: the recovery key escrow rather than the integrity measurement

**Example:** A desktop whose firmware settings were reset with Secure Boot off logs event 810 at boot.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#bitlocker_secure_boot_unavailable, https://sparklogs.com/reference/reasons/bitlocker_secure_boot_unavailable.json

## `cert_expired`: cert expired

A certificate in the machine or the user store has expired.

**Severity:** Warning

**Why it matters:** Anything that uses that certificate, such as VPN or Wi-Fi sign-in or code signing, fails from now on. The event does not say what uses it.

**In practice:** Windows writes event 1002 when a certificate has expired: to the Microsoft-Windows-CertificateServicesClient-Lifecycle-System/Operational log for the machine store, and to the Lifecycle-User log for the user store. The record names the certificate subject and its expiry date. The subject is what tells a domain or Wi-Fi authentication certificate from a vendor application's certificate.

**When to ignore:** When a renewed copy of the same certificate is already in the store, or nothing on the device uses it.

**What to check:**

- Read the subject and the store (machine or user) to identify the certificate.
- Open `certlm.msc` for the machine store or `certmgr.msc` for the user store, and check whether a renewed copy is already there.
- If auto-enrollment issues it, run `certutil -pulse` on the device and check that it can reach the certificate authority.
- Otherwise renew it with whoever issued it, or remove it if nothing uses it.

**Related:**

- `cert_expiring`: a certificate about to expire rather than one that already has

**Example:** A laptop's machine certificate for Wi-Fi authentication expires after months away from the network where auto-enrollment renews it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#cert_expired, https://sparklogs.com/reference/reasons/cert_expired.json

## `cert_expiring`: cert expiring

A certificate in the machine or the user store is about to expire.

**Also reported by:** `win.eventlog.application`

**Severity:** Warning

**Why it matters:** Anything that uses that certificate fails on the expiry date unless it is renewed first.

**In practice:** Windows writes event 1003 when a certificate is close to its expiry date: to the Microsoft-Windows-CertificateServicesClient-Lifecycle-System/Operational log for the machine store, and to the Lifecycle-User log for the user store. The record names the certificate subject and its expiry date. Auto-enrollment renews certificates from an enterprise template before they expire, so a warning for one of those points at enrollment not working.

**When to ignore:** When a renewed copy is already in the store, or nothing on the device uses the certificate.

**What to check:**

- Read the subject, the store and the expiry date.
- If auto-enrollment issues it, run `certutil -pulse` and check that the device can reach the certificate authority.
- Otherwise renew it before the date with the vendor or authority that issued it.

**Related:**

- `cert_expired`: a certificate that has already expired rather than one about to

**Example:** A user's client-authentication certificate comes within weeks of expiring.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#cert_expiring, https://sparklogs.com/reference/reasons/cert_expiring.json

## `code_integrity_catalog_load_failed`: code integrity catalog load failed

Windows could not read a signature catalog.

**Severity:** Notice or Info

**Why it matters:** Files the catalog vouches for have no valid signature until it is replaced, so a later load of one of them can fail its integrity check.

**In practice:** Code Integrity writes event 3010 (with the catalog file name) or 3024 (without one) to the Microsoft-Windows-CodeIntegrity/Operational log when it cannot load a signature catalog. Catalogs arrive with Windows updates and driver packages and list the hashes of the files they sign. The status code says why. STATUS_INSUFFICIENT_RESOURCES (0xC000009A) and STATUS_NO_MEMORY (0xC0000017) mean the machine was short of memory at that moment, and those records ship at Info. Any other code means the catalog is missing or unreadable.

**When to ignore:** A resource-exhaustion status on a machine that was short of memory at the time.

**What to check:**

- Read the status code and the catalog name.
- For a missing or damaged catalog, run `DISM /Online /Cleanup-Image /RestoreHealth` and then `sfc /scannow`.
- If the catalog belongs to a driver package, reinstall that driver.

**Related:**

- `code_integrity_image_hash_missing`: a file whose signature could not be found, which this can cause

**Example:** A server under memory pressure fails to load a catalog with STATUS_INSUFFICIENT_RESOURCES.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#code_integrity_catalog_load_failed, https://sparklogs.com/reference/reasons/code_integrity_catalog_load_failed.json

## `code_integrity_driver_revoked`: code integrity driver revoked

A driver on this device is on Microsoft's revoked-driver list, and the kernel refused to load it.

**Severity:** Warning

**Why it matters:** The driver did not load, so the device or feature that needs it does not work. The file is still on disk, and whatever installed it put a known-vulnerable driver on the device.

**In practice:** Code Integrity writes event 3023 to the Microsoft-Windows-CodeIntegrity/Operational log when the kernel refuses a driver that Microsoft has revoked. Revoked drivers have known flaws that attackers load to get kernel access, a technique called bring your own vulnerable driver. A hardware vendor's support or update agent is a common source. The kernel refuses the driver at every load until the file is removed.

**What to check:**

- Find what installed the driver from the file name in the event, using Apps > Installed apps or `pnputil /enum-drivers`, and remove it.
- When a vendor's support or update agent shipped it, update or remove that agent.
- When nothing explains the driver, treat the device as possibly compromised and investigate.

**Related:**

- `code_integrity_policy_blocked`: a configured policy refusing a file, rather than a published revocation

**Example:** An old hardware vendor utility tries to load its revoked kernel driver at boot.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#code_integrity_driver_revoked, https://sparklogs.com/reference/reasons/code_integrity_driver_revoked.json

## `code_integrity_image_hash_missing`: code integrity image hash missing

Windows found no signature on a file it was asked to load, so it could not verify the file's integrity.

**Severity:** Warning or Notice

**Why it matters:** A kernel driver with no verifiable hash does not load and the subsystem behind it stops working. A user-mode library leaves the calling process running.

**In practice:** Code Integrity writes event 3002 or 3004 to the Microsoft-Windows-CodeIntegrity/Operational log when it cannot find a hash for a file in any signature or catalog on the system. A requested signing level of 1 is a kernel-mode driver load. Any other level is a user-mode library, whose calling process carries on. Windows names a damaged file, an incorrectly signed file or malicious software as possible causes, and the event cannot tell them apart.

**When to ignore:** A user-mode load of a known vendor's library that repeats on one file.

**What to check:**

- Read the requested signing level and the file name.
- For a driver, reinstall or update it from the vendor and scan the file for malware.
- For a user-mode library, check whether a vendor update replaced it. A security or scanning product's library is a common case and needs no action.

**Related:**

- `code_integrity_catalog_load_failed`: the catalog that would have carried the signature failing to load
- `code_integrity_signing_level_blocked`: a signature that was found and did not qualify

**Example:** A security product's scanning library, replaced by an update, fails its hash check each time a program loads it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#code_integrity_image_hash_missing, https://sparklogs.com/reference/reasons/code_integrity_image_hash_missing.json

## `code_integrity_policy_audit_would_block`: code integrity policy audit would block

A configured Code Integrity policy recorded that enforcement would have refused a file, under audit mode.

**Severity:** Notice

**Why it matters:** Nothing was denied and the file ran. Once the policy is enforced, this file is refused unless the policy allows it.

**In practice:** Code Integrity writes event 3076 to the Microsoft-Windows-CodeIntegrity/Operational log when an App Control for Business (Windows Defender Application Control) policy in audit mode would have refused a binary. AppLocker writes event 8028 to the Microsoft-Windows-AppLocker/MSI and Script log for the same finding on a script or installer. The record names the policy and the file. Event 3076 also carries the file hash, the signing levels and whether users can write to the file's location.

**When to ignore:** While the policy stays in audit mode with no plan to enforce it.

**What to check:**

- Read the policy name and the file.
- Group the records by file and hash. The distinct list is what the policy has to allow before it is enforced.
- A file in a location users can write to deserves a closer look before it gets an allow rule.

**Related:**

- `code_integrity_driver_revoked`: a driver refused because the vendor revoked it
- `code_integrity_policy_blocked`: the same policy in enforcement, actually refusing the file
- `code_integrity_signing_level_blocked`: a signing level requirement refusing a file, rather than a named policy

**Example:** An RMM agent's temporary PowerShell script runs under an App Control policy in audit mode that would have blocked it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#code_integrity_policy_audit_would_block, https://sparklogs.com/reference/reasons/code_integrity_policy_audit_would_block.json

## `code_integrity_policy_blocked`: code integrity policy blocked

A configured Code Integrity policy refused a file under enforcement.

**Severity:** Warning

**Why it matters:** The file did not load, so whatever needs it is broken now, and it fails the same way on every attempt.

**In practice:** Code Integrity writes event 3077 to the Microsoft-Windows-CodeIntegrity/Operational log when an enforced App Control for Business policy refuses a file. The record names the policy, the file, its hash, the signing levels and whether users can write to the file's location. The refusal is the policy working as written, so the question is whether the file should be allowed. Third-party kernel drivers are a common case.

**What to check:**

- Read the policy name and the file.
- If the file belongs on the device, add an allow rule for its publisher or hash to the policy and redeploy it.
- If it does not belong, find what tried to load it.

**Related:**

- `code_integrity_driver_revoked`: a driver refused because the vendor revoked it
- `code_integrity_policy_audit_would_block`: the same policy in audit mode, only recording what it would do
- `code_integrity_signing_level_blocked`: a signing level requirement refusing a file, rather than a named policy

**Example:** An enforced App Control policy refuses a third-party kernel driver that a new hardware utility installed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#code_integrity_policy_blocked, https://sparklogs.com/reference/reasons/code_integrity_policy_blocked.json

## `code_integrity_signing_level_blocked`: code integrity signing level blocked

An application-control policy or a code-signing requirement on this device blocked a file from loading.

**Severity:** Warning

**Why it matters:** The file did not run. Every load attempt fails the same way until the file is signed or the policy changes.

**In practice:** Code Integrity writes event 3033, 3066 or 3086 to the Microsoft-Windows-CodeIntegrity/Operational log when a file's signature does not meet the signing level the loading process requires. The requested level says which requirement applied and the validated level says what signature the file carried. Both ship as numbers, with a name where the level is published.

**What to check:**

- Check whether the blocked file belongs on the device.
- If it does, review the application-control policy or signing requirement that refused it.
- If it does not, treat the load attempt as unwanted software.

**Related:**

- `code_integrity_image_hash_missing`: the file carrying no signature at all, rather than one that did not qualify
- `code_integrity_policy_blocked`: a named Code Integrity policy refusing a file, rather than a level requirement

**Example:** A program that requires signed libraries refuses an unsigned plug-in from a third-party vendor.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#code_integrity_signing_level_blocked, https://sparklogs.com/reference/reasons/code_integrity_signing_level_blocked.json

Not collected: Windows also logs this event when one of its own protected system processes refuses a third-party library (requested levels 7, 8, 12 and 14). Only Microsoft-signed code can pass that check, the vendor cannot obtain that signature, nothing is broken and no setting changes it, so those rows are dropped before collection.

## `crypto_key_operation_failed`: crypto key operation failed

A key operation failed against one of the Windows key-storage providers.

**Severity:** Notice or Debug

**Why it matters:** Usually none, because the caller falls back. When the TPM-backed provider refuses, Windows Hello and device registration can fail on top of it.

**In practice:** Windows writes event IDs 1 to 6, 8, 10 and 12 to the Microsoft-Windows-Crypto-NCrypt/Operational log when a key operation fails. The provider name says which key store answered: the Microsoft Software Key Storage Provider, or the TPM-backed Microsoft Platform Crypto Provider and Microsoft Pluton Cryptographic Provider. NTE_NOT_SUPPORTED (0x80090029) and NTE_NOT_FOUND (0x80090011) from any provider, and NTE_BAD_KEYSET (0x80090016) from the software provider, are a program asking whether a key or a capability exists, and they ship at Debug.

**When to ignore:** A program probing for a key it does not have, and failures on a device where Windows Hello and device registration work.

**What to check:**

- Read the provider, the status and the process together.
- When the TPM-backed provider fails on a device where Windows Hello or device registration also fails, check the TPM in `tpm.msc` or with `Get-Tpm`.

**Related:**

- `dpapi_unprotect_failed`: a protected blob rather than a key-storage operation
- `vbs_key_isolation_failed`: the isolated key environment itself rather than one key operation

**Example:** An authentication service on a laptop gets NTE_DEVICE_NOT_READY (0x80090030) from the Microsoft Platform Crypto Provider.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#crypto_key_operation_failed, https://sparklogs.com/reference/reasons/crypto_key_operation_failed.json

## `defender_sensor_connection_failed`: defender sensor connection failed

The Microsoft Defender for Endpoint sensor cannot reach its cloud service, or cannot get a token to talk to it.

**Severity:** Warning or Info

**Why it matters:** While it lasts, the device sends nothing to the Defender portal, which still lists it as onboarded. Local protection keeps running.

**In practice:** The Defender for Endpoint sensor (the SENSE service) writes events 5, 67, 101, 405, 406 and 409 to the Microsoft-Windows-SENSE/Operational log when it cannot reach its cloud service or its token service. Error code 12007 means a name did not resolve, which points at DNS or a proxy. Event 67 counts failed contacts beside successful ones, so the sensor is still reporting, and it ships at Info. Event 101 with HRESULT 0x80004002 or 0x80070001 says the optional network detection and response component did not start while the sensor kept reporting, and it also ships at Info.

**When to ignore:** Event 67 with some successful contacts, and event 101 for the network detection and response component, while the device still reports to the portal.

**What to check:**

- Read the error code.
- A name-resolution code (12007) points at DNS or the proxy on this network. Check that the device can reach the Defender for Endpoint service URLs.
- A rejection from the token service points at onboarding or licensing. Check the device's onboarding state in the Defender portal.

**Example:** A laptop behind a hotel captive portal cannot resolve the sensor's cloud address (12007) and stops reporting until it reconnects.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#defender_sensor_connection_failed, https://sparklogs.com/reference/reasons/defender_sensor_connection_failed.json

## `device_encryption_enable_failed`: device encryption enable failed

Device encryption, automatic or required by policy, did not start.

**Severity:** Warning or Notice

**Why it matters:** The system volume stays unencrypted, while the customer likely believes the device is encrypted.

**In practice:** BitLocker writes these events to the Microsoft-Windows-BitLocker/BitLocker Management log. Event 4103 means automatic device encryption failed, and Windows tries again at each boot. Events 851, 853 and 854 mean silent encryption that a policy asked for did not start: 853 because the TPM is not available, 854 because the Windows Recovery Environment is not configured, and 851 with no cause named. A 4103 saying the specified account does not exist is a device with no Microsoft or Entra account to hold the recovery key, and it ships at Notice.

**What to check:**

- Run `manage-bde -status` to see the volume's encryption state.
- For 853, check the TPM in `tpm.msc` or with `Get-Tpm`. It may be turned off in the firmware.
- For 854, run `reagentc /info`, and `reagentc /enable` if the recovery environment is disabled.
- For a 4103 with no account, have the user sign in with a work or Microsoft account, or turn on BitLocker by policy.

**Related:**

- `bitlocker_protection_resume_failed`: an encrypted volume whose protection did not come back after a suspend
- `bitlocker_recovery_key_backup_failed`: a recovery-key backup that failed for a named destination

**Example:** A new laptop with the recovery environment disabled cannot start the silent encryption its policy requires.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#device_encryption_enable_failed, https://sparklogs.com/reference/reasons/device_encryption_enable_failed.json

## `device_registration_failed`: device registration failed

The device tried to register itself with the directory and failed.

**Severity:** Warning or Notice

**Why it matters:** The device has no directory identity, so Conditional Access and other policies that depend on device state do not apply to it. The user can still work on it.

**In practice:** Windows writes these events to the Microsoft-Windows-User Device Registration/Admin log when the device's attempt to register itself, such as a Microsoft Entra hybrid join, fails. The outcome events carry the same exit code on every failure, so the cause comes from the events beside them. Event 220 means the device could not resolve its own fully qualified name. Event 221 means it could not connect to a domain controller over LDAP, or connected and was refused. A server response naming the directory object quota, or an error_hostname_duplicate subcode, means the directory refused the device itself. The task tries again on its own schedule.

**When to ignore:** Event 220 or 221 that could not reach the directory, on a laptop off the corporate network that registers once it is back.

**What to check:**

- Run `dsregcmd /status` on the device to see the join state and the last error.
- Work bottom up: when event 220 or 221 appears, the registration failure is a symptom of name resolution or domain controller reach.
- A refusal (an LDAP result from the server, or access denied on the lookup) points at the computer object, the rights on it or the credentials presented, so a connectivity check finds nothing.
- If only the outcome events appear, check the service connection point in Active Directory.
- A quota or duplicate-name response needs directory cleanup: remove stale device objects, or rename one of the two devices.

**Related:**

- `entra_device_certificate_update_failed`: a registered device failing to refresh its identity certificate
- `group_policy_domain_controller_unresolved`: the same directory being unreachable, reported from policy processing

**Example:** A laptop away from the office cannot reach a domain controller during its hybrid join attempt.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#device_registration_failed, https://sparklogs.com/reference/reasons/device_registration_failed.json

## `dpapi_unprotect_failed`: dpapi unprotect failed

Windows could not decrypt a protected blob, such as a saved credential or a certificate private key.

**Severity:** Notice

**Why it matters:** The owning application usually re-creates the blob on its next use. Where it cannot, that saved credential or private key is gone.

**In practice:** Windows writes events 8196, 8198, 8202, 8204 and 8205 to the Microsoft-Windows-Crypto-DPAPI/Operational log when the Data Protection API cannot decrypt a protected item, such as a saved credential or a certificate private key. Event 8204 says the item was protected under a different credential from the one now trying to open it. A password change or a profile moved to another device usually leaves such items behind, and the owning application then creates a new one.

**When to ignore:** When no user reports a lost credential or certificate.

**What to check:**

- Ask whether a user reports lost saved passwords or a certificate that stopped working.
- If one does, check for a recent password reset or profile move on that account. The affected secrets usually have to be entered again.

**Related:**

- `crypto_key_operation_failed`: a key-storage operation failing rather than a protected blob

**Example:** After a user's password is reset, a mail client cannot decrypt the credential it saved earlier.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#dpapi_unprotect_failed, https://sparklogs.com/reference/reasons/dpapi_unprotect_failed.json

## `entra_device_certificate_update_failed`: entra device certificate update failed

The device failed to refresh the certificate that proves its identity to the directory.

**Severity:** Warning or Notice

**Why it matters:** Left alone, the device eventually cannot prove it is registered, and every conditional-access policy that depends on device state stops seeing it.

**In practice:** The Microsoft Entra plugin writes event 1131 or 1256 to the Microsoft-Windows-AAD/Operational log when the device fails to renew the certificate it presents to Entra ID to prove it is registered. STATUS_LOGON_FAILURE (0xC000006D) or STATUS_NETWORK_UNREACHABLE (0xC000023C) means the renewal ran with no signed-in user or no network, and those records ship at Notice. The next attempt in a connected, signed-in session usually renews it. Any other status ships at Warning.

**When to ignore:** A logon-failure or network-unreachable status on a device that renews once it is back online with a user signed in.

**What to check:**

- Run `dsregcmd /status` and check the join state and the device certificate's validity.
- Check whether the device can reach the Entra registration service.
- Check whether its key is still in the TPM: `Get-Tpm`, and TpmProtected in `dsregcmd /status`.

**Related:**

- `device_registration_failed`: the device failing to register in the first place
- `entra_token_acquisition_failed`: a user token rather than the device's own identity certificate

**Example:** A laptop that wakes with no network fails its device certificate renewal with STATUS_NETWORK_UNREACHABLE.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#entra_device_certificate_update_failed, https://sparklogs.com/reference/reasons/entra_device_certificate_update_failed.json

## `entra_sign_in_failed`: entra sign in failed

The Microsoft Entra sign-in plugin on this device refused a sign-in.

**Severity:** Notice for a wrong credential or an unreachable service, Warning for a refusal the event does not explain.

**Why it matters:** The user is not signed in. A wrong credential is a user event; an unreachable service is a connectivity problem outside authentication.

**In practice:** The Microsoft Entra plugin writes events 1085, 1086, 1160, 1161 and 1162 to the Microsoft-Windows-AAD/Operational log when a sign-in to Entra ID fails. The status code is the cause. STATUS_WRONG_PASSWORD (0xC000006A) means the credential was refused. STATUS_NETWORK_UNREACHABLE (0xC000023C) means the service was never reached, so the credential was not tested. Other codes ship as the raw number, and some belong to the plugin's own range with no public name.

**When to ignore:** A single wrong-password record, or network-unreachable records from a device that was offline.

**What to check:**

- Read the status before anything else.
- A wrong-password code is a user event. A burst across several accounts on one device is worth a look.
- A network-unreachable code points at connectivity or a proxy, not the account.
- For any other code, find the attempt in the Entra sign-in logs using the correlation ID on the event.

**Related:**

- `entra_token_acquisition_failed`: a token that was not obtained, rather than a credential refused

**Example:** A user types their old password at the lock screen after a change, and the plugin reports STATUS_WRONG_PASSWORD.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#entra_sign_in_failed, https://sparklogs.com/reference/reasons/entra_sign_in_failed.json

## `entra_token_acquisition_failed`: entra token acquisition failed

The device failed to get a token for a cloud resource.

**Severity:** Warning, Notice, Info or Verbose

**Why it matters:** Depends on the cause. A disabled or locked account or device, or a device key fault, keeps the resource behind that token unavailable to the user until it is fixed (a lockout clears itself after its period), and a tenant configuration error affects every device in the tenant. A fallback step or a sign-in prompt is normal flow, and an application registration error affects only that application.

**In practice:** The Microsoft Entra plugin writes events 1084, 1094, 1097, 1098, 1112, 1155, 1202 and 1215 to the Microsoft-Windows-AAD/Operational log when a token for a cloud resource was not obtained. The error message on the event, written by the authentication library, says why. The numeric code alone does not separate the cases. Most records are normal flow: one step of the fallback chain (refresh token, then primary refresh token, then Windows integrated authentication), or a request for the user to sign in again. A disabled or locked user or device (AADSTS50057, AADSTS50053, AADSTS135011, AADSTS130007), or a device key the TPM could not use, is a real fault and ships at Warning.

**When to ignore:** Fallback steps, sign-in prompts, transport errors on a device off the network, and the Microsoft first-party preauthorization record, which ship at Info or Verbose.

**What to check:**

- Read the error message, and group by it across a day on one device.
- A disabled account or device needs an administrator. A locked account clears after the lockout period or when an administrator unlocks it.
- A key or TPM fault (0x80090016, 0x80090030, 0x80280909, 0x8009002C) needs the device repaired. Start with `dsregcmd /status` and the TPM.
- A grant or parameter error that repeats on every device for one resource is a tenant setting, and no work on the device fixes it.
- An application registration error names one application whose reply URL or scope Entra rejects. The owner of that app registration fixes it.
- A transport error points at the network or the proxy.

**Related:**

- `entra_device_certificate_update_failed`: the device's own identity certificate rather than a user token
- `entra_sign_in_failed`: a credential refused, rather than a token not obtained

**Example:** An administrator disables a user's account, and every token request from that user's still signed-in laptop fails with AADSTS50057.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#entra_token_acquisition_failed, https://sparklogs.com/reference/reasons/entra_token_acquisition_failed.json

## `exploit_mitigation_audit_would_block`: exploit mitigation audit would block

Exploit protection recorded that enforcement would have stopped a process, under audit mode.

**Severity:** Info

**Why it matters:** None today. An application listed here would break once the mitigation is enforced.

**In practice:** Exploit protection writes events 1, 3 and 11 to the Microsoft-Windows-Security-Mitigations/KernelMode log when a mitigation in audit mode sees a process do something it forbids. The message reads as a block, but audit mode took no action and the process carried on. Each ID belongs to a different mitigation, and the record names the process. Not collected: event 1 at Information level or below, which Windows writes as it applies mitigations at every process start.

**When to ignore:** Routine while nobody plans to move the mitigation to enforcement.

**What to check:**

- Read the process name and the mitigation the event ID stands for.
- Before enforcing the mitigation, add an exception for each process listed here that needs the forbidden action.

**Related:**

- `exploit_mitigation_blocked`: the same mitigation under enforcement, actually stopping the process
- `exploit_mitigation_shadow_stack_mismatch`: a memory-integrity anomaly rather than a policy block

**Example:** A line-of-business application starts a child process under a mitigation in audit mode that would forbid it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#exploit_mitigation_audit_would_block, https://sparklogs.com/reference/reasons/exploit_mitigation_audit_would_block.json

## `exploit_mitigation_blocked`: exploit mitigation blocked

Exploit protection stopped a process from an action its policy forbids, under enforcement.

**Severity:** Notice or Verbose

**Why it matters:** The process could not perform the forbidden action. If the application needed it, the application fails or stops working.

**In practice:** Exploit protection writes events 2, 4, 6, 10, 12, 32, 34 and 36 to the Microsoft-Windows-Security-Mitigations/KernelMode log when an enforced mitigation stops a process. Each ID belongs to a different mitigation, and the record names the process. Browsers, collaboration clients and document viewers turn these mitigations on for their own sandboxed child processes, so a refusal for a program under the Windows or Program Files folders is usually the design working, and it ships at Verbose. A program running from anywhere else, such as a user profile or a temp folder, ships at Notice. Not collected: event 2 at Information level or below, which Windows writes as it applies mitigations at every process start.

**When to ignore:** Verbose records for programs under the Windows or Program Files folders, which are vendor sandboxes working as designed.

**What to check:**

- Read the process path. The count of events means little by itself.
- A path that has produced these for weeks is normal.
- A path that appears for the first time, just as an application broke, points at this mitigation. Add an exception for that program in Exploit protection settings.
- A program running from a user profile or a temp folder that hits a mitigation is worth investigating.

**Related:**

- `exploit_mitigation_audit_would_block`: the same mitigation in audit mode, only recording what it would do
- `exploit_mitigation_shadow_stack_mismatch`: a memory-integrity anomaly rather than a policy block

**Example:** A tool run from a user's Downloads folder is stopped by an exploit-protection mitigation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#exploit_mitigation_blocked, https://sparklogs.com/reference/reasons/exploit_mitigation_blocked.json

The enforcing records on the kernel-mode id that arrives at volume are rate-bounded: three per image path per device per day, with the count of what a day suppressed carried on the next day's first record. Read the paths, not the counts.

## `exploit_mitigation_shadow_stack_mismatch`: exploit mitigation shadow stack mismatch

A process returned to a different address from the one the hardware shadow stack recorded.

**Severity:** Notice on the documented compatibility path, Warning where nothing on the event explains the mismatch.

**Why it matters:** Where the operation was refused, whatever the process was attempting did not happen. Where it continued, nothing changed.

**In practice:** With Hardware-enforced Stack Protection on, the processor keeps a shadow copy of each return address. Windows writes event 25 to the Microsoft-Windows-Security-Mitigations/KernelMode log when a process returned somewhere else and was allowed to continue, with a reason for not enforcing. It writes event 28 when it refused the change. A stack-corruption exploit produces this mismatch, and so does an ordinary program that rewrites its own return addresses. Nonenforcement reason 1 is the documented compatibility path.

**When to ignore:** Event 25 with nonenforcement reason 1 for a known application.

**What to check:**

- Read the process name, the module the return came from and the nonenforcement reason together.
- A known application on the compatibility path is the ordinary case.
- A mismatch with no reason, or a refusal (event 28), in a process with no business rewriting return addresses is worth investigating as a possible exploit.

**Related:**

- `exploit_mitigation_blocked`: a policy block rather than a memory-integrity anomaly

**Example:** An older line-of-business application trips the shadow stack check, and Windows lets it continue on the compatibility path.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#exploit_mitigation_shadow_stack_mismatch, https://sparklogs.com/reference/reasons/exploit_mitigation_shadow_stack_mismatch.json

## `group_policy_domain_controller_unresolved`: group policy domain controller unresolved

The machine could not find or could not reach a domain controller.

**Severity:** Warning or Notice

**Why it matters:** No Group Policy refresh happens, so the machine keeps the settings it last applied and gets no new ones.

**In practice:** Group Policy writes events 7017, 7320 and 7326 to the Microsoft-Windows-GroupPolicy/Operational log when it cannot find or reach a domain controller, so no policy pass starts. The error code is the cause. ERROR_NO_SUCH_DOMAIN (1355) means the domain name did not resolve, the normal state of a laptop off the corporate network. Access denied (5) means a controller answered and refused, which usually points at a broken machine account. Not part of this reason: event 7320 with access denied on a workgroup or Entra-only device, which Windows writes on every refresh as a routine access check and which ships unlabeled at Info.

**When to ignore:** No-such-domain or other discovery codes on a laptop off the corporate network, when policy refreshes once it is back.

**What to check:**

- Read the error code.
- No-such-domain points at DNS or connectivity. Check that the device uses the domain's DNS servers and can find a controller with `nltest /dsgetdc:<domain>`.
- Access denied points at the machine account. Test it with `Test-ComputerSecureChannel`, then repair it with `-Repair` or rejoin the domain.

**Related:**

- `device_registration_failed`: the same directory being unreachable, reported by device registration
- `group_policy_processing_failed`: a pass that started and failed

**Example:** A laptop at home with no VPN cannot resolve its domain name (1355) at sign-in.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#group_policy_domain_controller_unresolved, https://sparklogs.com/reference/reasons/group_policy_domain_controller_unresolved.json

## `group_policy_extension_apply_failed`: group policy extension apply failed

A Group Policy client-side extension could not apply the settings from a policy object.

**Also reported by:** `win.eventlog.application`

**Severity:** Minor or Info

**Why it matters:** None of that policy object's items were delivered to the affected user or machine on this refresh.

**In practice:** Group Policy writes event 6016 or 7016 to the Microsoft-Windows-GroupPolicy/Operational log when a client-side extension, such as Drive Maps, Folder Redirection, Security or Software Installation, finishes with an error code. Windows' own text begins "Completed ... Extension Processing", which reads as success, so SparkLogs puts a first line in front naming the failure, the extension and the code. Network-path codes (53, 58 and 1222) mean the extension could not reach the share it reads from. Code 1274 means the extension was put off to the next foreground refresh, and 1252 means nothing changed since its last run. Both are routine and ship at Info.

**When to ignore:** Code 1274 (put off to the next foreground refresh) and code 1252 (nothing changed), which ship at Info.

**What to check:**

- Read the extension name and the code together.
- A network-path code means the machine could not reach the policy or target share at that refresh.
- An access-denied code on the Security extension means the policy object itself has a permissions problem.
- Run `gpresult /h report.html` to see which policy objects applied and which extension reported errors.

**Related:**

- `group_policy_processing_failed`: the whole policy pass failing rather than one extension

**Example:** On a laptop away from the office, the Security extension cannot reach the policy share and returns code 53.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#group_policy_extension_apply_failed, https://sparklogs.com/reference/reasons/group_policy_extension_apply_failed.json

## `group_policy_file_share_unhardened`: group policy file share unhardened

The machine reads Group Policy files from a file share without mutual authentication or integrity protection.

**Severity:** Notice

**Why it matters:** An attacker on the network path between the machine and the policy share could tamper with policy content in transit. Nothing has gone wrong yet.

**In practice:** Group Policy writes event 9001 to the Microsoft-Windows-GroupPolicy/Operational log when it reads policy files from a share without requiring mutual authentication and integrity. Windows requires both by default for the domain's SYSVOL and NETLOGON shares, through the Hardened UNC Paths setting. The two flags on the event say which protection was not required.

**What to check:**

- Check the Hardened UNC Paths setting (Computer Configuration > Administrative Templates > Network > Network Provider) for entries that turn off RequireMutualAuthentication or RequireIntegrity.
- Compare the devices that log this against the domain's policy, and hand the list to a security review.

**Related:**

- `smb_security_setting_nondefault`: a related SMB hardening setting worth checking on the same device

**Example:** A device whose Hardened UNC Paths setting was relaxed for a legacy file server reads SYSVOL without integrity protection.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#group_policy_file_share_unhardened, https://sparklogs.com/reference/reasons/group_policy_file_share_unhardened.json

## `group_policy_processing_failed`: group policy processing failed

Group Policy failed to apply for that boot or that logon.

**Also reported by:** `win.eventlog.system`

**Severity:** Notice for a connectivity failure on a workstation. Warning on a server, on a host of unknown class, or for any other cause.

**Why it matters:** No policy change reaches the machine for that session. It keeps the settings it last applied, so new or changed policy, security settings included, is missing.

**In practice:** Group Policy writes event 7000 (computer policy at boot) or 7001 (user policy at sign-in) to the Microsoft-Windows-GroupPolicy/Operational log when the whole policy pass fails. The event carries the error code and a flag saying whether Windows put the failure down to connectivity. A connectivity failure on a laptop that started away from the corporate network is expected. On a server, or for any other cause, it points at domain controller reach, the machine account or the policy objects themselves.

**When to ignore:** Connectivity failures on a workstation that started away from the corporate network, when the next refresh on the network succeeds.

**What to check:**

- Read the connectivity flag and the error code.
- Once the device is on the network, run `gpupdate /force`, then `gpresult /r` to confirm policy applied.
- On a server, or with a cause other than connectivity, check domain controller reach, the machine account and the permissions on the policy objects.

**Related:**

- `group_policy_domain_controller_unresolved`: no controller found at all, so no pass started
- `group_policy_extension_apply_failed`: one extension failing rather than the whole pass

**Example:** A laptop starting up at home fails computer policy processing with the connectivity flag set.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#group_policy_processing_failed, https://sparklogs.com/reference/reasons/group_policy_processing_failed.json

## `laps_password_backup_failed`: laps password backup failed

The device manages its local administrator password and the backup of that password is failing.

**Severity:** Warning

**Why it matters:** The directory may hold no current copy of the local administrator password, so nobody can retrieve it when a local sign-in is needed. The device looks compliant while its password escrow is not working.

**In practice:** Windows LAPS writes events 10005, 10026, 10028, 10032 and 10059 to the Microsoft-Windows-LAPS/Operational log when backing up the local administrator password to its directory fails. Event 10059 carries the service's response. A response saying the local admin password solution is not enabled for the tenant means the policy reached devices before the feature was turned on in Entra ID. Events 10026 and 10032 mean the device could not authenticate to the service.

**What to check:**

- Read the response on event 10059.
- For a tenant not-enabled response, turn on Microsoft Entra LAPS in the Entra admin center under Devices > Device settings. No change on the device fixes it.
- For an authentication failure, check the device's join state with `dsregcmd /status`.
- After the fix, run `Invoke-LapsPolicyProcessing` and confirm the password appears in the directory.

**Related:**

- `bitlocker_recovery_key_backup_failed`: the same escrow-failure pattern for BitLocker recovery keys

**Example:** Every device in a tenant fails its first LAPS backup because nobody turned on Microsoft Entra LAPS in device settings.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#laps_password_backup_failed, https://sparklogs.com/reference/reasons/laps_password_backup_failed.json

## `ntlm_authentication_used`: ntlm authentication used

This machine used the legacy NTLM authentication protocol, as a client or as a server.

**Severity:** Warning or Verbose

**Why it matters:** Nothing failed. Each record marks something that still depends on NTLM. NTLMv1 with a named user means that user's credential crossed the network over a protocol with known weaknesses.

**In practice:** Windows writes events 4020 and 4021 (this machine authenticating to another) and 4022 and 4023 (something authenticating to this machine) to the Microsoft-Windows-NTLM/Operational log when NTLM is used. Outbound records name the target server. Both directions carry the NTLM version and the reason NTLM was used instead of Kerberos. An application reaching a server by IP address is a common reason. NTLMv1 with a named user ships at Warning. An anonymous session reports version 1 because it sends no credential, so it stays at Verbose with the routine records.

**When to ignore:** Verbose records for routine NTLM use, unless a project to retire NTLM is under way.

**What to check:**

- Use these records as the work list for retiring NTLM: group outbound records by target server and inbound records by device.
- Where the reason is a server reached by IP address, point the application at the server's DNS name so Kerberos can be used.
- Fix anything using NTLMv1 with a named user first, then set Network security: LAN Manager authentication level to refuse NTLMv1.

**Related:**

- `ntlm_validation_failed`: an NTLM authentication that was refused rather than one that succeeded

**Example:** A scanning application on a workstation reaches a file server by IP address, so Windows uses NTLM instead of Kerberos.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#ntlm_authentication_used, https://sparklogs.com/reference/reasons/ntlm_authentication_used.json

## `vbs_key_isolation_failed`: vbs key isolation failed

The isolated key environment that virtualization-based security provides is failing on this device.

**Severity:** Notice or Info

**Why it matters:** Keys that should be held in hardware-isolated memory are not. Every caller keeps working, so nothing is unavailable.

**In practice:** Windows writes event 13 or 26 to the Microsoft-Windows-Crypto-NCrypt/Operational log when the isolated environment that virtualization-based security uses to hold keys fails. Event 26 carries counts of restart attempts and successes, and whether the feature can be enabled at all. When the platform says it cannot be enabled, the hardware or firmware lacks support, Windows keeps retrying, and those records ship at Info.

**When to ignore:** When the platform states the feature cannot be enabled on this hardware.

**What to check:**

- Check whether virtualization-based security should be on for this device. `msinfo32` shows its state.
- Where the platform states the feature cannot be enabled, the hardware or firmware cannot support it and retrying does not change the outcome.

**Related:**

- `crypto_key_operation_failed`: one key operation failing rather than the environment behind it

**Example:** A desktop with virtualization turned off in its firmware keeps retrying its key isolation environment.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#vbs_key_isolation_failed, https://sparklogs.com/reference/reasons/vbs_key_isolation_failed.json

## `windows_hello_key_registration_failed`: windows hello key registration failed

A Windows Hello key or container operation failed after provisioning had already passed its prerequisites.

**Severity:** Notice or Info

**Why it matters:** That user's Windows Hello credential is not usable on this device until it is enrolled again. Signing in with a password is unaffected.

**In practice:** Windows writes events 303, 310, 311, 317 and 385 to the Microsoft-Windows-User Device Registration/Admin log, and 6010, 7002 and 7611 to the Microsoft-Windows-HelloForBusiness/Operational log, when Windows Hello for Business passed its prerequisites and then a key step failed. The key container would not create, the key was not found, or the TPM would not attest it. The key status on the event names the state in Windows' own words. A TPM without attestation capability is a hardware fact, and a user closing the prompt (0x80090036) is a choice. Both ship at Info.

**When to ignore:** Key status TpmKeyOnMachineWithoutAttestationCapability, or a user who cancelled the prompt.

**What to check:**

- Read the key status and the error code.
- For a container or key error, have the user remove the PIN in Settings > Accounts > Sign-in options and set it up again.

**Related:**

- `windows_hello_provisioning_blocked`: provisioning that never started because a prerequisite was not met

**Example:** A user's Windows Hello key container fails to create during PIN setup.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#windows_hello_key_registration_failed, https://sparklogs.com/reference/reasons/windows_hello_key_registration_failed.json

## `windows_hello_provisioning_blocked`: windows hello provisioning blocked

Windows Hello for Business will not set up on this device for this user.

**Severity:** Notice or Info

**Why it matters:** The user signs in with a password instead. Where a policy does ask for the feature, a passwordless rollout is quietly not happening.

**In practice:** Windows writes event 359 or 360 to the Microsoft-Windows-User Device Registration/Admin log at sign-in when Windows Hello for Business provisioning will not launch. Event 360 carries a checklist of the prerequisites it tested, each Yes or No, such as policy enabled, device joined, hardware policy met and a primary refresh token present. The Microsoft-Windows-HelloForBusiness/Operational log adds events 6045, 6055, 7054, 7200, 7201 and 7203, and the last four name one failed prerequisite in words. When no policy asks for Windows Hello for Business the record ships at Info, and so does a remote desktop session, where Windows does not provision by design.

**When to ignore:** Records where the checklist says no policy enables the feature, or the session is remote.

**What to check:**

- Read the checklist. Each No is one unmet prerequisite.
- If the policy is enabled, the device is joined and provisioning still will not launch, the remaining No is the ticket.
- Run `dsregcmd /status` to check the join state and whether the user has a primary refresh token (AzureAdPrt).

**Related:**

- `windows_hello_key_registration_failed`: provisioning that was attempted and whose key operation then failed

**Example:** A hybrid-joined laptop with the Windows Hello policy on has no primary refresh token at sign-in, so provisioning does not launch.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-identity-security#windows_hello_provisioning_blocked, https://sparklogs.com/reference/reasons/windows_hello_provisioning_blocked.json
