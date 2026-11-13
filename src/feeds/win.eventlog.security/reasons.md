<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.security`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `account_changed` | account changed | event | Notice | `security_audit` |  |
| `account_created` | account created | event | Notice | `security_audit` |  |
| `account_deleted` | account deleted | event | Notice | `security_audit` |  |
| `account_disabled` | account disabled | event | Notice | `security_audit` |  |
| `account_enabled` | account enabled | event | Notice | `security_audit` |  |
| `account_locked_out` | account locked out | event | Warning to Error | `auth` |  |
| `account_password_change_failed` | account password change failed | event | Info | `security_audit` |  |
| `account_password_reset` | account password reset | event | Notice | `security_audit` |  |
| `account_password_reset_failed` | account password reset failed | event | Warning | `security_audit` |  |
| `adcs_audit_evidence_tampered` | adcs audit evidence tampered | event | Serious | `certificates` |  |
| `adcs_config_changed` | adcs config changed | event | Error | `certificates` |  |
| `adcs_request_failed` | adcs request failed | event | Warning | `certificates` |  |
| `anonymous_remote_sign_in` | anonymous remote sign in | event | Verbose to Warning | `auth` |  |
| `audit_event_processing_failed` | audit event processing failed | event | Warning | `security_audit` |  |
| `audit_events_dropped` | audit events dropped | event | Error | `security_audit` |  |
| `audit_log_cleared` | audit log cleared | event | Critical | `security_audit` |  |
| `audit_log_full` | audit log full | event | Serious | `security_audit` |  |
| `audit_policy_changed` | audit policy changed | event | Notice | `security_audit` |  |
| `audit_subcategory_changed` | audit subcategory changed | event | Verbose | `security_audit` |  |
| `crypto_selftest_failed` | crypto selftest failed | event | Error | `os_stability` |  |
| `directory_object_access_denied` | directory object access denied | event | Notice | `directory_services` |  |
| `directory_object_changed` | directory object changed | event | Warning | `directory_services` |  |
| `directory_object_created` | directory object created | event | Warning | `directory_services` |  |
| `directory_object_deleted` | directory object deleted | event | Warning | `directory_services` |  |
| `directory_replication_access_requested` | directory replication access requested | event | Warning | `directory_services` |  |
| `domain_policy_changed` | domain policy changed | event | Warning | `security_audit` |  |
| `dsrm_password_change_failed` | dsrm password change failed | event | Error | `security_audit` |  |
| `dsrm_password_changed` | dsrm password changed | event | Serious | `security_audit` |  |
| `event_logging_stopped` | event logging stopped | event | Info | `security_audit` |  |
| `explicit_credential_used` | explicit credential used | event | Info | `auth` |  |
| `firewall_rule_changed` | firewall rule changed | event | Verbose | `networking` |  |
| `firewall_rule_created` | firewall rule created | event | Verbose | `networking` |  |
| `firewall_rule_deleted` | firewall rule deleted | event | Verbose | `networking` |  |
| `firewall_service_stopped` | firewall service stopped | event | Info to Warning | `networking` |  |
| `firewall_setting_applied` | firewall setting applied | event | Info to Warning | `networking` |  |
| `group_member_added` | group member added | event | Error | `security_audit` |  |
| `group_member_removed` | group member removed | event | Warning | `security_audit` |  |
| `guest_account_sign_in` | guest account sign in | event | Notice | `auth` |  |
| `kerberos_duplicate_request_rejected` | kerberos duplicate request rejected | event | Warning | `auth` |  |
| `kerberos_preauth_failed` | kerberos preauth failed | event | Warning | `auth` |  |
| `kerberos_rc4_ticket_issued` | kerberos rc4 ticket issued | event | Warning | `auth` |  |
| `kerberos_ticket_failed` | kerberos ticket failed | event | Warning | `auth` |  |
| `logon_right_granted` | logon right granted | event | Notice | `security_audit` |  |
| `logon_right_removed` | logon right removed | event | Notice | `security_audit` |  |
| `network_share_added` | network share added | event | Info to Warning | `file_sharing` |  |
| `nps_access_denied` | nps access denied | event | Warning | `auth` |  |
| `nps_lockout` | nps lockout | event | Warning to Error | `auth` |  |
| `nps_request_discarded` | nps request discarded | event | Warning | `auth` |  |
| `ntlm_validation_failed` | ntlm validation failed | event | Warning | `auth` |  |
| `principal_renamed` | principal renamed | event | Notice | `security_audit` |  |
| `process_exited_abnormally` | process exited abnormally | event | Notice | `security_audit` |  |
| `psdirect_handshake_probe` | psdirect handshake probe | event | Debug | `auth` | benign |
| `scheduled_task_created` | scheduled task created | event | Display to Notice | `scheduled_tasks` |  |
| `scheduled_task_deleted` | scheduled task deleted | event | Display to Notice | `scheduled_tasks` |  |
| `scheduled_task_disabled` | scheduled task disabled | event | Info | `scheduled_tasks` |  |
| `scheduled_task_updated` | scheduled task updated | event | Display to Notice | `scheduled_tasks` |  |
| `security_group_changed` | security group changed | event | Warning | `security_audit` |  |
| `security_group_created` | security group created | event | Warning | `security_audit` |  |
| `security_group_deleted` | security group deleted | event | Warning | `security_audit` |  |
| `service_installed` | service installed | event | Debug to Notice | `security_audit` | benign possible |
| `sid_history_add_failed` | sid history add failed | event | Error | `security_audit` |  |
| `sid_history_added` | sid history added | event | Serious | `security_audit` |  |
| `sign_in_failed` | sign in failed | event | Verbose to Warning | `auth` | benign possible |
| `special_group_sign_in` | special group sign in | event | Warning | `security_audit` |  |
| `system_time_changed` | system time changed | event | Debug to Warning | `time_sync` |  |
| `user_audit_subcategory_changed` | user audit subcategory changed | event | Notice | `security_audit` |  |
| `win_insecure_boot_config` | win insecure boot config | event | Warning | `security_audit` |  |
| `win_registry_value_changed` | win registry value changed | event | Verbose to Warning | `security_audit` |  |
| `win_registry_value_created` | win registry value created | event | Verbose to Warning | `security_audit` |  |
| `win_registry_value_deleted` | win registry value deleted | event | Warning | `security_audit` |  |

## `account_changed`: account changed

An existing user or computer account was edited.

**Severity:** Notice

**Why it matters:** The account still exists and still signs in, but what it may do can have changed: an account flag such as password never expires, an expiry date, permitted sign-in hours, or a delegation setting.

**In practice:** Security log, event ID 4738 for a user account or 4742 for a computer account, naming the account that made the edit and the account edited. The event lists each attribute that changed and shows a dash for the rest. Enabling, disabling, renaming and password resets each have their own reason, so this one covers the remaining edits. Windows also writes it for an edit that changed none of the listed attributes, so a row with every value dashed is common. Computer accounts change routinely: domain joins, upgrades and the computer's own password change every 30 days by default all write 4742.

**When to ignore:** Computer account edits from domain joins and routine machine password changes, and edits by the tool the client uses to manage accounts.

**What to check:**

- Read which attributes the event lists as changed; a dash means unchanged.
- Confirm the account that made the edit is an administrator or tool expected to manage accounts.
- Look hardest at flags that weaken an account: password not required, password never expires, Kerberos pre-authentication not required, and delegation settings.

**Related:**

- `account_created`: the account coming into existence
- `account_disabled`: the account stopped from signing in
- `account_enabled`: the account allowed to sign in again
- `account_password_reset`: a password set by another account
- `principal_renamed`: a name change, with the old and new names

**Example:** An administrator sets an expiry date on a contractor's account.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_changed, https://sparklogs.com/reference/reasons/account_changed.json

The target is the principal that was edited and the actor is the principal that edited it.
config_change.target names the same account again, as the identity of what changed rather than
as a principal join key; the two answer different questions and both are populated.

## `account_created`: account created

A user or computer account was created, in the domain or in the machine's local accounts.

**Severity:** Notice

**Why it matters:** A new account can sign in from now on, and gets whatever rights its groups carry. An account nobody requested is a common way for an intruder to keep access.

**In practice:** Security log, event ID 4720 for a user account or 4741 for a computer account, naming the account that created it and the new account. On a domain controller it records a new domain account; on any other machine, a new local account. Every machine that joins the domain creates a computer account, so 4741 is routine during rollouts.

**When to ignore:** Computer accounts created as machines join the domain, and user accounts created by the client's onboarding process.

**What to check:**

- Confirm the creator is an administrator or provisioning tool expected to create accounts.
- A new local account on a workstation or server that is not in the client's standard build needs an owner and a reason.
- Look for a group add for the same account soon after (event 4728, 4732 or 4756).

**Related:**

- `account_changed`: later edits to the same account
- `account_deleted`: the account removed
- `account_enabled`: a new account allowed to sign in, sometimes in a separate step
- `group_member_added`: rights granted to the account through a group

**Example:** An administrator creates an account for a new employee.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_created, https://sparklogs.com/reference/reasons/account_created.json

## `account_deleted`: account deleted

A user or computer account was deleted, from the domain or from the machine's local accounts.

**Severity:** Notice

**Why it matters:** The account can no longer sign in. Services, scheduled tasks and permissions that still name it fail, or show an unresolved SID.

**In practice:** Security log, event ID 4726 for a user account or 4743 for a computer account, naming who deleted it and which account. A deleted domain account comes back only from the AD Recycle Bin or a backup. A new account with the same name gets a new SID, so the old account's permissions do not carry over to it.

**When to ignore:** Deletes that match offboarding or machine decommissioning.

**What to check:**

- Confirm the delete matches an offboarding or decommission request.
- For a computer account, confirm the machine was retired: a machine still in use loses its trust with the domain and its users cannot sign in.
- Check for services and scheduled tasks that ran as a deleted user account.

**Related:**

- `account_created`: the account coming into existence
- `account_disabled`: a disable, which keeps the account and often comes first
- `group_member_removed`: memberships removed, often in the same offboarding

**Example:** An administrator deletes a departed employee's account.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_deleted, https://sparklogs.com/reference/reasons/account_deleted.json

## `account_disabled`: account disabled

A user or computer account was disabled and can no longer sign in.

**Severity:** Notice

**Why it matters:** The account cannot sign in from now on. Services, scheduled tasks and mapped drives that use it start failing, and those failures show up as their own events.

**In practice:** Security log, event ID 4725, naming who disabled it and which account. Administrators disable accounts during offboarding and to contain a suspected compromise. An intruder can also disable an account to keep its owner out. A disable is reversible: the account, its groups and its permissions stay.

**When to ignore:** Disables that match offboarding.

**What to check:**

- Confirm the disable matches an offboarding, a security response or another request.
- If services or tasks run as the account, look for their failed sign-ins after this time.
- For an unexpected disable of an admin or service account, find who made the change and how they signed in.

**Related:**

- `account_deleted`: the account removed for good
- `account_enabled`: the account allowed to sign in again
- `account_locked_out`: an automatic lockout after failed sign-ins

**Example:** An administrator disables a user's account on their last day.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_disabled, https://sparklogs.com/reference/reasons/account_disabled.json

## `account_enabled`: account enabled

A disabled user or computer account was enabled and can sign in again.

**Severity:** Notice

**Why it matters:** The account can sign in from now on. An unexpected enable of an admin, service or long-unused account hands someone a working identity.

**In practice:** Security log, event ID 4722, naming who enabled it and which account. New accounts are often created disabled and enabled in a second step, so a 4720 just before it is normal. An enable of the built-in Administrator or Guest account, or of a departed user's account, is the case to read first.

**When to ignore:** An enable seconds after the same account was created.

**What to check:**

- Confirm a request exists for the enable.
- For an enable nobody expected, look for a password reset (event 4724) and a sign-in as that account right after.

**Related:**

- `account_created`: a new account, sometimes enabled in a second step
- `account_disabled`: the opposite change
- `account_password_reset`: a password set by another account, which together with an enable hands over a dormant account

**Example:** A help-desk technician re-enables a returning contractor's account.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_enabled, https://sparklogs.com/reference/reasons/account_enabled.json

## `account_locked_out`: account locked out

An account was locked out after too many failed sign-ins. The event names the machine the failed attempts came from.

**Severity:** Warning (built-in Administrator, any name) / Error (other accounts)

**Why it matters:** The user or service cannot sign in until the lockout clears, and a device still sending an old password locks it again as soon as it is unlocked.

**In practice:** Security log, event ID 4740, naming the locked account and Caller Computer Name, the machine whose failed attempts crossed the lockout threshold. For a domain account it is written on the domain controllers. The caller is usually a device or process still using an old password: a phone syncing mail, a mapped drive or scheduled task with saved credentials, or a disconnected remote session. When the caller is a mail or web server, the device behind it is one step further back, in that server's own logs. Many accounts locked from one caller looks like password guessing. The built-in Administrator (the account whose SID ends in -500) is reported at Warning under any name; every other account at Error.

**What to check:**

- Go to the machine Caller Computer Name names and find what keeps sending the old password: Credential Manager entries, mapped drives, scheduled tasks, services, a phone's mail profile.
- Fix that source first, then clear the lockout on the account.
- If many accounts lock out from one caller, or the caller is a machine you do not recognize, treat it as password guessing.
- If the built-in Administrator locks out again and again, its name is exposed to password spraying: rename or disable it, and put MFA in front of RD Gateway and other remote access.

**Related:**

- `kerberos_preauth_failed`: the domain controller's failures, whose client address points at the same device
- `sign_in_failed`: the failed sign-ins that add up to a lockout

**Example:** The renamed built-in Administrator account is locked out by failed attempts from one workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_locked_out, https://sparklogs.com/reference/reasons/account_locked_out.json

Highest ticket-value auth pivot on many fleets: find the noisy device, fix the credential.

## `account_password_change_failed`: account password change failed

An account tried to change its own password and Windows refused the change.

**Severity:** Info

**Why it matters:** Nothing changed: the user keeps their current password. Repeated failures for one user usually mean the new password keeps breaking the password rules.

**In practice:** Security log, event ID 4723 marked Audit Failure. The usual causes are a wrong current password, or a new password that fails the password policy: too short, not complex enough, reused from history, or changed again before the minimum password age. A successful change writes the same event ID as Audit Success and is not given this reason.

**When to ignore:** A single failure, or a few followed by a successful change.

**What to check:**

- For several failures from one user, check the password policy with them; minimum age and history are the usual surprises.
- Failures across many users at once usually follow a password policy change.

**Related:**

- `account_locked_out`: the lockout that repeated failed sign-ins cause
- `account_password_reset`: a password set by a different account, often the help desk after the user gives up

**Example:** A user's new password is rejected because it repeats one of their recent passwords.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_password_change_failed, https://sparklogs.com/reference/reasons/account_password_change_failed.json

## `account_password_reset`: account password reset

One account reset another account's password, and the reset completed.

**Severity:** Notice

**Why it matters:** The account's owner can no longer sign in with their old password, and whoever did the reset chose the new one. A reset nobody asked for is a standard way to take over an account.

**In practice:** Security log, event ID 4724 marked Audit Success, naming the account that did the reset and the account whose password was replaced. Help-desk resets, Windows LAPS rotating the local Administrator password, and management agents rotating the local account they own all write it, so most resets are routine. The event does not contain the new password.

**When to ignore:** LAPS or a management agent rotating its own local account, and resets that match a help-desk ticket.

**What to check:**

- Match the reset to a ticket, especially for admin and service accounts.
- Check who did the reset: SYSTEM rotating the local Administrator or an agent's own account is routine, an unexpected person or account is not.
- For a reset nobody requested, look for a sign-in as the target account right after.

**Related:**

- `account_enabled`: an enable, which together with a reset can hand someone a dormant account
- `account_password_change_failed`: an owner failing to change their own password
- `account_password_reset_failed`: the same reset when it did not complete

**Example:** SYSTEM rotates the password of the local account a remote management agent uses.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_password_reset, https://sparklogs.com/reference/reasons/account_password_reset.json

The value the credential was set to is never recorded by the event and never reaches any field.
Every completed reset is recorded at Notice: help-desk resets, LAPS rotating the built-in
Administrator and management agents rotating their own local account all produce this event.
Check the actor and target fields to tell a requested reset from an unexpected one.

## `account_password_reset_failed`: account password reset failed

One account tried to reset another account's password, and the reset did not complete.

**Severity:** Warning

**Why it matters:** The target's password is unchanged, so nobody lost access. The record shows one account reaching for another account's credentials.

**In practice:** Security log, event ID 4724 without the Audit Success keyword. A new password that fails policy, or a caller without the right to reset that account, are the usual causes. An event that states neither success nor failure is reported here too.

**When to ignore:** A failure followed shortly by a completed reset of the same account by the same caller.

**What to check:**

- Check whether the caller is expected to reset passwords at all.
- One caller failing against many accounts is a different pattern from one failed attempt.
- For a failed attempt on an admin account by an unexpected caller, find how that caller signed in.

**Related:**

- `account_password_change_failed`: an owner failing to change their own password
- `account_password_reset`: the same reset when it completed

**Example:** A help-desk technician's reset is refused because the new password is too short.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#account_password_reset_failed, https://sparklogs.com/reference/reasons/account_password_reset_failed.json

An event that states neither success nor failure is reported here rather than as a completed
reset.

## `adcs_audit_evidence_tampered`: adcs audit evidence tampered

A certification authority's audit filter changed, or rows were deleted from its database.

**Severity:** Serious

**Why it matters:** Less of what the CA did can be reconstructed afterwards. A narrowed audit filter stops recording issuance, and deleted rows remove the record of certificates that may still be trusted.

**In practice:** Security log on the CA server, event ID 4885 (the audit filter for Certificate Services changed) or 4896 (rows were deleted from the certificate database). Both appear only when Audit Certification Services is on and the CA's own auditing is enabled. A certificate that allows client authentication signs in as the account it names, so the record of what was issued matters: a deleted row can hide a certificate that is still valid. Planned database cleanup with certutil and audit changes during CA maintenance write the same events.

**When to ignore:** A planned cleanup of failed or expired requests from the CA database by its administrators.

**What to check:**

- Confirm the change against planned CA maintenance and the account that made it.
- For 4885, open the CA's Auditing tab (Certification Authority console, CA properties) and turn every event category back on.
- For 4896, find which rows were deleted and whether any certificates issued from them are still valid; revoke what nobody can account for.

**Related:**

- `adcs_config_changed`: who may manage the CA or approve certificates changed
- `audit_log_cleared`: the Windows Security log itself wiped
- `audit_subcategory_changed`: Windows audit policy changed, outside Certificate Services

**Example:** An administrator deletes old failed requests from the CA database with certutil.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#adcs_audit_evidence_tampered, https://sparklogs.com/reference/reasons/adcs_audit_evidence_tampered.json

These two ids carry the higher severity because they reduce what can be audited later. Permission
and certificate-manager changes are adcs_config_changed.

## `adcs_config_changed`: adcs config changed

A certification authority's security permissions changed, or who may act as a certificate manager changed.

**Severity:** Error

**Why it matters:** Who can administer the CA or approve certificates is different, and stays different until someone reverses it. Control of an enterprise CA lets an account issue certificates that sign in as other users.

**In practice:** Security log on the CA server, event ID 4882 (the security permissions for Certificate Services changed) or 4890 (the certificate manager settings changed). Both appear only when Audit Certification Services is on and the CA's own auditing is enabled. Granting Manage CA or Issue and Manage Certificates widely is a known route to domain-wide access, which is why these changes need a check even though CA maintenance writes them too.

**When to ignore:** Changes made by the CA's administrators during planned setup or maintenance.

**What to check:**

- Confirm the change with whoever owns the CA.
- Review the CA's Security tab and its certificate manager restrictions against what they should be.
- Look for certificates issued after the change to the newly granted accounts.

**Related:**

- `adcs_audit_evidence_tampered`: the CA's audit filter or database records changed, which removes evidence
- `adcs_request_failed`: a certificate request the CA refused, which can follow a permission change
- `audit_subcategory_changed`: Windows audit policy changed, outside Certificate Services

**Example:** A technician grants a help-desk group the right to approve pending certificate requests.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#adcs_config_changed, https://sparklogs.com/reference/reasons/adcs_config_changed.json

Permissions and certificate-manager changes have routine administrative forms, which is why they
carry a lower severity than the audit-filter and database-deletion pair.

## `adcs_request_failed`: adcs request failed

A certification authority denied a certificate request.

**Severity:** Warning

**Why it matters:** The requester did not get a certificate. Enrollment that keeps failing breaks whatever needs the certificate: Wi-Fi or VPN sign-in, smart cards, web server certificates.

**In practice:** Security log on the CA server, event ID 4888, "Certificate Services denied a certificate request". A requester without Enroll permission on the template, a request that does not meet the template's requirements, or a certificate manager denying a pending request are the usual causes. It appears only when Audit Certification Services and the CA's own auditing are on, so a quiet log does not prove enrollment works.

**When to ignore:** Denials of requests a certificate manager reviewed and rejected on purpose.

**What to check:**

- Read the status message in the CA console's Failed Requests folder.
- Check the template's Security tab for Enroll rights for the requester.
- For many denials on one template, compare against recent CA or template changes.

**Related:**

- `adcs_audit_evidence_tampered`: the CA's audit filter or records changed
- `adcs_config_changed`: a CA permission change, which can start a run of denials

**Example:** A workstation's automatic certificate request is denied because its group lacks Enroll permission on the template.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#adcs_request_failed, https://sparklogs.com/reference/reasons/adcs_request_failed.json

## `anonymous_remote_sign_in`: anonymous remote sign in

A sign-in with no identity (ANONYMOUS LOGON) succeeded from another machine.

**Severity:** Warning (public origin address) / Verbose (local network or no address)

**Why it matters:** Something on the network opened a session on this machine as no one. That is expected for a deliberately public share; otherwise it is how enumeration of users and shares starts.

**In practice:** Security log, event ID 4624 with the account ANONYMOUS LOGON and a source address or workstation that is not this machine. Windows uses anonymous logons for its own local work too, but those name no other machine. Older clients, printers and scanners browsing shares produce this from the local network, which is reported at Verbose. From a public internet address it means this machine answers anonymous requests from outside, and that is reported at Warning. The event cannot tell a public share from null-session enumeration.

**When to ignore:** Local-network sessions on a machine that offers an anonymous share or print service on purpose.

**What to check:**

- Check whether the source address should reach this machine at all, a public one above all.
- Check whether a share or named pipe here is meant to allow anonymous access (the Network access settings under Security Options in Local Security Policy).
- Look at what else the same address did in the same window.

**Related:**

- `sign_in_failed`: a sign-in this machine refused
- `special_group_sign_in`: a sign-in by an account an administrator chose to watch

**Example:** A machine at a public internet address opens an anonymous NTLM network session to this host.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#anonymous_remote_sign_in, https://sparklogs.com/reference/reasons/anonymous_remote_sign_in.json

## `audit_event_processing_failed`: audit event processing failed

The event logging service failed to process an incoming event, so some security events may be missing.

**Severity:** Warning

**Why it matters:** Security events from around this time may not have been written. A gap here can hide sign-ins or changes.

**In practice:** Security log, event ID 1108 from the Eventlog provider, naming the component (publisher) whose event the service could not write. That event is missing or incomplete in the log. It is rare: a component handing the service an event it cannot write, or a problem with the log file, are the usual causes.

**What to check:**

- Read the publisher the event names to see whose events were lost.
- If it repeats, check the System log for Eventlog errors and the disk that holds the logs.

**Related:**

- `audit_log_cleared`: history deleted on purpose
- `audit_log_full`: events lost because the log is full and will not overwrite

**Example:** The event logging service fails to write an event published by a third-party security provider.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#audit_event_processing_failed, https://sparklogs.com/reference/reasons/audit_event_processing_failed.json

## `audit_events_dropped`: audit events dropped

Windows discarded security audit events before they reached the Security log. The event states how many.

**Severity:** Error when records were discarded; Debug when the count is zero

**Why it matters:** The Security log for that window is permanently incomplete, and nothing replays the lost events. Missing sign-ins or file access around this time are lost, not absent.

**In practice:** Security log, event ID 1101 from the Eventlog provider, "Audit events have been dropped by the transport", followed by the number lost. It happens when audit volume outruns the event log service, for example broad file or registry auditing on a busy server. Many machines write one at startup with a count of zero, which means nothing was lost, although Windows still marks it as an error. The count is read from the English message text; on other display languages it is not read and the event is reported as a loss.

**When to ignore:** A count of zero, which many machines report at startup.

**What to check:**

- Read the count: zero means nothing was lost.
- For a non-zero count, find which audit settings produce the most events (file and object access are typical) and narrow them.

**Related:**

- `audit_event_processing_failed`: one event the service failed to write
- `audit_log_full`: events refused because the log is full
- `event_logging_stopped`: a gap from the service stopping cleanly, with nothing lost

**Example:** A file server with broad file-access auditing drops 4,211 audit events during a large copy.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#audit_events_dropped, https://sparklogs.com/reference/reasons/audit_events_dropped.json

The count is read from the message text and only from the known template, so any row whose text
does not match that template ships with no count. A row with no count is reported at the failure severity rather than the healthy one.

## `audit_log_cleared`: audit log cleared

The Security log was cleared.

**Severity:** Critical (non-system clearer) / Error

**Why it matters:** Every Security event on this machine up to the clear is gone from the machine, so sign-ins and changes before it cannot be checked there.

**In practice:** Security log, event ID 1102 from the Eventlog provider, "The audit log was cleared", naming the account that cleared it. Intruders clear the log to hide what they did; an administrator clearing a full log by hand loses the same history. Who cleared it matters: log management tools run as SYSTEM, while a person's account has no routine reason to.

**When to ignore:** A clear by SYSTEM that matches a log management tool the client runs.

**What to check:**

- Identify the account that cleared it and confirm with that person.
- Read the Security events SparkLogs collected from this machine before the clear; they are still there.
- Look for admin sessions and sign-ins right after the clear, and other machines the same account reached.
- If nobody can explain it, treat the machine as compromised.

**Related:**

- `audit_log_full`: a full log, which loses new events
- `audit_subcategory_changed`: audit policy changes, which stop events being written without deleting any
- `system_time_changed`: a clock change, which can also obscure a timeline

**Example:** An administrator's own account clears the Security log on a workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#audit_log_cleared, https://sparklogs.com/reference/reasons/audit_log_cleared.json

Provider is Microsoft-Windows-Eventlog, not Security-Auditing. Who cleared the log is what the
event itself proves, and it is what separates the two severities.

## `audit_log_full`: audit log full

The Security log is full and set not to overwrite, so new security events are not being written.

**Severity:** Serious

**Why it matters:** Sign-ins and changes on this machine leave no trace until someone fixes the log settings. With the policy "Audit: Shut down system immediately if unable to log security audits" on, the machine stops with a blue screen instead.

**In practice:** Security log, event ID 1104 from the Eventlog provider, "The security log is now full". The log reached its maximum size and its retention is set to Do not overwrite events, so Windows stops adding to it. A hardening policy that turned overwriting off without archiving, a maximum size set too small, or a burst of audit events are the usual causes.

**What to check:**

- Save the current log (Event Viewer, Save All Events As) before clearing it, if anything may need investigating.
- Raise the maximum size, or set Overwrite events as needed or Archive the log when full, to fit the client's retention rules.
- Find the Group Policy that sets the retention so the fix holds.

**Related:**

- `audit_event_processing_failed`: one event the service failed to write
- `audit_log_cleared`: the log emptied on purpose

**Example:** A server's Security log, set never to overwrite, fills during a burst of failed sign-ins.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#audit_log_full, https://sparklogs.com/reference/reasons/audit_log_full.json

## `audit_policy_changed`: audit policy changed

The audit settings (SACL) on an object changed.

**Also reported by:** `audit-policy`

**Severity:** Notice

**Why it matters:** Auditing may now record more or less than before; the event alone does not say which.

**In practice:** Security log, event ID 4715, "The audit policy (SACL) on an object was changed", with the old and new security descriptors (OldSd, NewSd) in SDDL text. The event does not name the object. The audit entries are the part after S: in each descriptor, so comparing that part shows what was added or removed.

**When to ignore:** A change that matches a planned audit configuration change.

**What to check:**

- Compare the S: part of OldSd and NewSd in the original event.
- Confirm the account that made the change is expected to manage audit settings.

**Related:**

- `audit_log_cleared`: the log emptied, which removes events
- `audit_log_full`: new events lost because the log is full

**Example:** An administrator changes audit settings during a planned hardening change.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#audit_policy_changed, https://sparklogs.com/reference/reasons/audit_policy_changed.json

## `audit_subcategory_changed`: audit subcategory changed

The system audit policy for one subcategory changed.

**Severity:** Verbose

**Why it matters:** If Success or Failure auditing was removed, events of that kind stop being written from now on, and nothing else reports it.

**In practice:** Security log, event ID 4719, "System audit policy was changed", naming the subcategory and what was added or removed. Group Policy rewrites audit settings on every refresh, often removing and re-adding the same setting within moments, so one event rarely means a real change. When the change was made on the machine itself, it names the account; Group Policy changes log SYSTEM. SparkLogs also reports the machine's effective audit policy as device state, which shows whether a setting really changed.

**When to ignore:** Rows written by SYSTEM during a Group Policy refresh, which reapply the same settings.

**What to check:**

- Check the effective policy on the machine with auditpol /get /category:*.
- A removal made by a person's account, not SYSTEM, is the case to follow up.

**Related:**

- `audit_policy_changed`: audit settings on one object changed

**Example:** A Group Policy refresh removes and re-adds Success auditing for one subcategory within the same second.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#audit_subcategory_changed, https://sparklogs.com/reference/reasons/audit_subcategory_changed.json

## `crypto_selftest_failed`: crypto selftest failed

A FIPS cryptographic self-test failed.

**Severity:** Error

**Why it matters:** Windows' cryptographic functions on this machine may not be trustworthy, and encryption, TLS connections and signature checks all rely on them.

**In practice:** Security log, event ID 6418, "The FIPS mode crypto selftests failed". Windows tests its cryptographic modules at startup and records a pass as event 6417; this one failed. It is rare: damaged system files and faulty hardware, memory above all, are the usual suspects.

**What to check:**

- Note the process the event names.
- Run sfc /scannow, then DISM /Online /Cleanup-Image /RestoreHealth.
- Run Windows Memory Diagnostic or the hardware vendor's tests.
- Check for a recent update, driver or security product that replaced cryptographic components.

**Related:**

- `win_insecure_boot_config`: boot settings that weaken driver signature checks, another startup integrity record

**Example:** A server with failing memory fails the cryptographic self-test at startup.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#crypto_selftest_failed, https://sparklogs.com/reference/reasons/crypto_selftest_failed.json

## `directory_object_access_denied`: directory object access denied

An account was refused access to an audited Active Directory object.

**Severity:** Notice

**Why it matters:** Nothing was read or changed: the refusal is the outcome. Repeated refusals from one account usually point to a misconfigured service; refusals against sensitive objects are worth a look.

**In practice:** Security log on a domain controller, event ID 4662 marked Audit Failure: an account asked for access to a directory object and its permissions did not allow it. Windows writes it only when Audit Directory Service Access is on and the object's auditing (SACL) covers that access, so someone chose to watch the object. Successful access on the same event ID is not collected, apart from requests for directory replication rights.

**When to ignore:** A service account repeating the same refused request, once you have confirmed it is a harmless misconfiguration.

**What to check:**

- Check whether the requesting account should touch this object at all.
- The same refusal repeating from one account usually means an application or service account is missing a permission.
- No rows does not mean no attempts: they exist only for audited objects.

**Related:**

- `directory_object_changed`: an object that was actually modified
- `directory_replication_access_requested`: a request for directory replication rights, refused or not

**Example:** A service account is refused read access to an audited organizational unit.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#directory_object_access_denied, https://sparklogs.com/reference/reasons/directory_object_access_denied.json

## `directory_object_changed`: directory object changed

An audited Active Directory object was modified or moved.

**Severity:** Warning

**Why it matters:** Directory data that sign-in, Group Policy and applications depend on changed. An unexpected edit can change permissions, policy links or account settings.

**In practice:** Security log on a domain controller, event ID 5136 (an attribute was modified) or 5139 (an object was moved), with the object, the attribute and the account that made the change. Windows writes these only when Audit Directory Service Changes is on and the object's auditing covers the change. Changing one value usually writes two 5136 events, one for the value removed and one for the value added.

**When to ignore:** Edits by the client's identity sync or provisioning tools on the objects they manage.

**What to check:**

- Read the object (ObjectDN) and the attribute (AttributeLDAPDisplayName) first.
- Confirm the account that made the change against the admins and sync tools expected to edit the directory.
- The new value is only in the original event; open it for the detail.

**Related:**

- `account_changed`: user and computer account edits, reported on their own
- `directory_object_created`: a new object
- `directory_object_deleted`: an object removed
- `group_member_added`: a member added to a security group
- `security_group_changed`: a security group's own scope, type or attributes changed
- `sid_history_added`: SID History written to an account

**Example:** An administrator moves a computer object to a different organizational unit.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#directory_object_changed, https://sparklogs.com/reference/reasons/directory_object_changed.json

config_change.action names the direction the event recorded, so pivot on the action rather
than assuming one value.

## `directory_object_created`: directory object created

An audited Active Directory object was created or restored.

**Severity:** Warning

**Why it matters:** A new directory object can change what policy applies or who has access: a new organizational unit, Group Policy object, computer or contact.

**In practice:** Security log on a domain controller, event ID 5137 (created) or 5138 (undeleted, restored from the AD Recycle Bin), with the object, its class and the account that made it. Windows writes these only when Audit Directory Service Changes is on and the container's auditing covers new objects.

**When to ignore:** Objects the client's provisioning or sync tools create in the containers they manage.

**What to check:**

- Read the object's class and location first.
- Confirm the creator against the admins and tools expected to create objects there.
- A restored object comes back with its group memberships; check what it can reach.

**Related:**

- `account_changed`: user and computer account edits, reported on their own
- `directory_object_changed`: an existing object modified or moved
- `directory_object_deleted`: an object removed
- `group_member_added`: a member added to a security group
- `security_group_changed`: a security group's own scope, type or attributes changed
- `sid_history_added`: SID History written to an account

**Example:** An administrator creates a new organizational unit for a branch office.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#directory_object_created, https://sparklogs.com/reference/reasons/directory_object_created.json

## `directory_object_deleted`: directory object deleted

An audited Active Directory object was deleted.

**Severity:** Warning

**Why it matters:** Grants, policy links and lookups that depended on the object now resolve to nothing, and nothing reports the failures as coming from this delete.

**In practice:** Security log on a domain controller, event ID 5141, with the object and the account that deleted it. Windows writes it only when Audit Directory Service Changes is on and the object's auditing covers deletion. With the AD Recycle Bin enabled the object can be restored until its deleted-object lifetime passes; otherwise only an authoritative restore from backup brings it back.

**When to ignore:** Cleanup by the client's provisioning or decommissioning process.

**What to check:**

- Confirm the delete against a change request.
- Restore an unwanted delete with Restore-ADObject or the Active Directory Administrative Center while the Recycle Bin still holds it.
- Check what referenced the object: Group Policy links, permissions, group memberships.

**Related:**

- `account_changed`: user and computer account edits, reported on their own
- `directory_object_changed`: an object that still exists, modified or moved
- `directory_object_created`: a new object
- `group_member_added`: a member added to a security group
- `security_group_changed`: a security group's own scope, type or attributes changed
- `sid_history_added`: SID History written to an account

**Example:** An administrator deletes an organizational unit that still holds a Group Policy link.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#directory_object_deleted, https://sparklogs.com/reference/reasons/directory_object_deleted.json

## `directory_replication_access_requested`: directory replication access requested

An account asked a domain controller for directory replication rights, the access that reads the whole directory, password data included.

**Severity:** Warning (any other account) / Info (a domain controller, a platform identity, or a directory-sync connector under its default name)

**Why it matters:** Replication rights hand over directory content wholesale, password hashes included, which is why intruders seek them after getting in. Directory sync tools use the same rights, so the question is which account asked.

**In practice:** Security log on a domain controller, event ID 4662 naming one of the replication rights: Replicating Directory Changes, Replicating Directory Changes All, or Replicating Directory Changes In Filtered Set. Domain controllers ask for these from each other all day, and Microsoft Entra Connect does too under its sync account. Credential-dumping tools (DCSync) ask for the same rights to pull password hashes. Requests from domain controllers, other machine and system identities, and accounts named like the default sync accounts (starting MSOL_ or AAD_) are reported at Info; any other account at Warning. Anyone who can create accounts can choose such a name, so the name proves nothing.

**When to ignore:** Requests by domain controllers and by the client's own directory sync account.

**What to check:**

- Identify the requesting account: a domain controller or the client's directory sync account is expected, anything else is not.
- Confirm a sync-style account name against the sync tools the client actually runs.
- Check how that account signed in shortly before, on the same domain controller.

**Related:**

- `directory_object_access_denied`: a refused request for other access to a directory object
- `directory_object_changed`: an object that was modified
- `sid_history_added`: another directory change that grants rights

**Example:** An ordinary user account asks a domain controller for Replicating Directory Changes All.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#directory_replication_access_requested, https://sparklogs.com/reference/reasons/directory_replication_access_requested.json

The rights ride the Properties field as a GUID list whose brace wrapping and letter case vary
across builds, so a query against the raw payload should casefold and match inside the list rather
than compare a formatted value.
Every replication access carries this same reason whatever its severity, so a query on the reason
returns all of it; the severity records how routine the requester looked, never whether it was
authorized.

## `domain_policy_changed`: domain policy changed

The password or lockout policy for a domain changed.

**Severity:** Warning; Debug for the platform writing a new machine's own setup policy

**Why it matters:** Password strength and lockout protection for every account under that domain are different from now on. A weakening shows up nowhere else.

**In practice:** Security log, event ID 4739, "Domain Policy was changed", naming the domain, which policy changed (password or lockout) and the full list of settings. On a domain controller it follows a change to the account policies in the Group Policy linked at the domain root, usually the Default Domain Policy. On a machine outside a domain it records a change to the local account policy. Windows also writes it while setting up a new machine's local accounts; those rows are reported at Debug.

**When to ignore:** The row Windows writes while setting up a new machine, reported at Debug.

**What to check:**

- Compare the settings listed in the event with the client's baseline: minimum length, history, lockout threshold and duration.
- Confirm a change request exists; the event says what changed, not why.

**Related:**

- `account_password_reset`: a password set under this policy
- `audit_subcategory_changed`: audit policy, another part of the machine's security settings

**Example:** An administrator lowers the account lockout threshold in the Default Domain Policy.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#domain_policy_changed, https://sparklogs.com/reference/reasons/domain_policy_changed.json

The domain the policy belongs to rides the config-change target. The full before-and-after
setting list stays in the retained event payload rather than becoming fields.

## `dsrm_password_change_failed`: dsrm password change failed

An attempt to set the Directory Services Restore Mode (DSRM) password on a domain controller failed.

**Severity:** Error

**Why it matters:** The recovery password is unchanged. The attempt still needs accounting for, since the same action succeeding gives its holder offline control of the controller.

**In practice:** Security log on a domain controller, event ID 4794 marked Audit Failure. The DSRM password belongs to the controller's local recovery administrator, used to start it in Directory Services Restore Mode, outside the directory. Administrators set it with ntdsutil. An administrator fumbling maintenance and someone probing the controller write the same event.

**When to ignore:** A failure during planned maintenance, followed by a successful change (event 4794 marked Audit Success).

**What to check:**

- Confirm the attempt against planned domain controller maintenance and the account that made it.
- Use the workstation field, when present, to find where the attempt ran.
- Repeated failures from one source read differently from a single attempt.

**Related:**

- `account_changed`: ordinary account edits, which do not touch the DSRM password
- `dsrm_password_changed`: the same attempt when it succeeded

**Example:** A technician's attempt to reset the DSRM password with ntdsutil fails during a recovery drill.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#dsrm_password_change_failed, https://sparklogs.com/reference/reasons/dsrm_password_change_failed.json

DC-only in practice. The event proves the attempt, not that any password was used.

## `dsrm_password_changed`: dsrm password changed

The Directory Services Restore Mode (DSRM) password was set on a domain controller.

**Severity:** Serious

**Why it matters:** Whoever holds the new password can start this controller in recovery mode and change its directory database offline. Intruders set it to keep a way back in.

**In practice:** Security log on a domain controller, event ID 4794 marked Audit Success. The DSRM password belongs to the controller's local recovery administrator, used to start it in Directory Services Restore Mode, outside the directory. It is set at promotion and rarely changed after, so a change nobody scheduled is serious.

**What to check:**

- Confirm the change against planned maintenance and the account that made it.
- Record the new password where the team keeps recovery credentials.
- Check the registry value DsrmAdminLogonBehavior under HKLM\System\CurrentControlSet\Control\Lsa: 2 lets the DSRM account sign in over the network while the controller runs normally.
- Use the workstation field, when present, to find where the change ran.

**Related:**

- `account_changed`: ordinary account edits, which do not touch the DSRM password
- `directory_object_changed`: other audited changes in the directory
- `dsrm_password_change_failed`: the same attempt when it failed

**Example:** A technician resets the DSRM password during a planned recovery drill.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#dsrm_password_changed, https://sparklogs.com/reference/reasons/dsrm_password_changed.json

DC-only in practice. The event proves the change, not that the password was used.

## `event_logging_stopped`: event logging stopped

The Windows event logging service stopped, which is what a clean shutdown or restart looks like in the Security log.

**Severity:** Info

**Why it matters:** Nothing is wrong. A gap in the Security log that starts with this event is the machine being down.

**In practice:** Security log, event ID 1100 from the Eventlog provider, "The event logging service has shut down". Windows writes it during every clean shutdown or restart. A gap with no such event before it (a crash, a power loss, or someone interfering with the service) is the one to look at. It describes the Windows event log service, not the SparkLogs agent.

**When to ignore:** On its own it is routine; read it only to explain a gap.

**What to check:**

- For a gap with no 1100 before it, check the System log for event 6008 (unexpected shutdown) and event 41 from Kernel-Power.

**Related:**

- `audit_events_dropped`: events lost while the service kept running
- `audit_log_cleared`: a gap from the log being cleared

**Example:** A workstation restarts overnight to finish installing updates.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#event_logging_stopped, https://sparklogs.com/reference/reasons/event_logging_stopped.json

This row describes the HOST event log service, not the SparkLogs collector.

## `explicit_credential_used`: explicit credential used

A process signed in with credentials supplied explicitly (as runas does), and the caller was not one of Windows' own sign-in components.

**Severity:** Info

**Why it matters:** Usually admin work or automation. An unexpected caller, or an ordinary user presenting an admin's credentials, can be credential misuse or movement between machines.

**In practice:** Security log, event ID 4648, "A logon was attempted using explicit credentials", naming the account running the process, the account whose credentials it presented, the target server and the process. runas, drives mapped with another user's credentials, PowerShell remoting with -Credential, and remote management and backup tools all write it. Calls from lsass.exe, svchost.exe, winlogon.exe, consent.exe and taskhostw.exe in System32 are not given this reason; the same file names anywhere else on disk are.

**When to ignore:** Callers that are the client's known admin, backup or remote management tools.

**What to check:**

- Read the process, the account it ran as and the credentials it presented together.
- A process outside Program Files and System32, such as one in a Temp folder, deserves a look first.
- Check the target server against what that user normally reaches.

**Related:**

- `sign_in_failed`: a sign-in that failed, which can sit near credential misuse

**Example:** A user runs PowerShell and connects to a file server with an admin account's credentials.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#explicit_credential_used, https://sparklogs.com/reference/reasons/explicit_credential_used.json

Low severity by design: the reason code is the durable signal on this row, not the severity. Pivot
on the reason and read the calling process, rather than filtering by severity.

## `firewall_rule_changed`: firewall rule changed

A Windows Firewall rule was modified.

**Also reported by:** `win.eventlog.network`

**Severity:** Verbose

**Why it matters:** What the firewall allows or blocks may have changed. A rule opened wider can expose a service; one closed can break an application.

**In practice:** Security log, event ID 4947, "A change has been made to Windows Firewall exception list. A rule was modified", with the rule's name and ID. It appears only when Audit MPSSVC Rule-Level Policy Change is on. Application installs and updates rewrite their own rules all the time, so most of these are routine. The Windows Firewall With Advanced Security log under Applications and Services Logs records the same change by default, with the application that made it.

**When to ignore:** Rule changes during application or Microsoft Store updates.

**What to check:**

- Look the rule up by name in Windows Defender Firewall with Advanced Security, or with Get-NetFirewallRule -DisplayName.
- Check whether it now allows inbound traffic from any address to a service that should not be reachable.

**Related:**

- `firewall_rule_created`: a new rule
- `firewall_rule_deleted`: a rule removed
- `firewall_service_stopped`: the firewall not running at all
- `firewall_setting_applied`: a firewall-wide setting, such as the default inbound action
- `network_share_added`: a new network share, which a firewall opening can expose

**Example:** An application update rewrites its own inbound firewall rule.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#firewall_rule_changed, https://sparklogs.com/reference/reasons/firewall_rule_changed.json

## `firewall_rule_created`: firewall rule created

A Windows Firewall rule was added.

**Also reported by:** `win.eventlog.network`

**Severity:** Verbose

**Why it matters:** The firewall may now allow traffic it blocked before. An unexpected inbound allow rule can expose a service.

**In practice:** Security log, event ID 4946, "A change has been made to Windows Firewall exception list. A rule was added", with the rule's name and ID. It appears only when Audit MPSSVC Rule-Level Policy Change is on. Application and Microsoft Store installs add their own rules all the time, so most of these are routine. The Windows Firewall With Advanced Security log under Applications and Services Logs records the same change by default, with the application that made it.

**When to ignore:** Rules added by application or Microsoft Store installs.

**What to check:**

- Look the rule up by name in Windows Defender Firewall with Advanced Security, or with Get-NetFirewallRule -DisplayName.
- An inbound allow rule for a program in a user or Temp folder, or for any address on a remote-access port, is the case to check.

**Related:**

- `firewall_rule_changed`: an existing rule modified
- `firewall_rule_deleted`: a rule removed
- `firewall_service_stopped`: the firewall not running at all
- `network_share_added`: a new network share, which a firewall opening can expose

**Example:** An installer adds an inbound rule for its own program.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#firewall_rule_created, https://sparklogs.com/reference/reasons/firewall_rule_created.json

## `firewall_rule_deleted`: firewall rule deleted

A Windows Firewall rule was deleted.

**Also reported by:** `win.eventlog.network`

**Severity:** Verbose

**Why it matters:** Whatever the rule allowed or blocked no longer applies, so an application can lose network access, or traffic the rule blocked can get through.

**In practice:** Security log, event ID 4948, "A change has been made to Windows Firewall exception list. A rule was deleted", with the rule's name and ID. It appears only when Audit MPSSVC Rule-Level Policy Change is on. Uninstalls and updates remove and re-add their own rules all the time, so most of these are routine.

**When to ignore:** Rules removed during uninstalls and updates.

**What to check:**

- Read the removal beside the install or uninstall around it.
- If an application lost network access at this time, check whether its rule was the one removed.

**Related:**

- `firewall_rule_changed`: an existing rule modified
- `firewall_rule_created`: a new rule
- `firewall_service_stopped`: the firewall not running at all

**Example:** An uninstaller removes the inbound rule for its program.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#firewall_rule_deleted, https://sparklogs.com/reference/reasons/firewall_rule_deleted.json

## `firewall_service_stopped`: firewall service stopped

The Windows Firewall service or driver stopped, or started again.

**Severity:** Warning or Info

**Why it matters:** While it is stopped, Windows Firewall does not filter traffic, so services on the machine are reachable from any network it is on.

**In practice:** Security log, event ID 5025 (the firewall service stopped) or 5034 (the firewall driver stopped); 5024 and 5033 record them starting again. No extra audit setting is needed to see them. A stop with a start soon after, around an update or a restart, is normal. A stop with no start after it, made by hand or by software, leaves the machine unfiltered.

**When to ignore:** A stop followed by a start minutes later during updates or a restart.

**What to check:**

- Check whether the service is running now with Get-Service mpssvc.
- Find what stopped it: the System log records service state changes (event 7036) and start type changes (event 7040).
- Start it again and confirm its start type is Automatic.

**Related:**

- `firewall_rule_changed`: a rule changed while the firewall kept running

**Example:** The firewall service is stopped by hand on a server and not started again.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#firewall_service_stopped, https://sparklogs.com/reference/reasons/firewall_service_stopped.json

## `firewall_setting_applied`: firewall setting applied

A Windows Firewall setting was written, with the value it now holds.

**Severity:** Info, and Warning when the setting switches the firewall off or allows inbound traffic by default.

**Why it matters:** Usually none, because each policy refresh writes every setting again. When the firewall is turned off, or inbound traffic is allowed by default, the machine no longer filters what it filtered before.

**In practice:** Security log, event ID 4950, "A Windows Firewall setting has changed", naming the profile, the setting and its value. It appears only when Audit MPSSVC Rule-Level Policy Change is on. Group Policy writes every firewall setting each time it applies, whether or not the value moved, so most rows record no change. Two values are reported at Warning: Enable Windows Defender Firewall set to No, and Default Inbound Action set to Allow. That check reads the English setting names, so on other display languages those values stay at Info.

**When to ignore:** Rows written during a Group Policy refresh with the client's normal values.

**What to check:**

- Read the profile, setting and value on the event.
- For a Warning row, check the profile with Get-NetFirewallProfile and find the policy or person that turned the firewall off or allowed inbound traffic.

**Related:**

- `firewall_rule_changed`: one rule changed
- `firewall_service_stopped`: the firewall not running at all

**Example:** A technician turns the firewall off on the domain profile while troubleshooting.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#firewall_setting_applied, https://sparklogs.com/reference/reasons/firewall_setting_applied.json

## `group_member_added`: group member added

A member was added to a security group. Adds to privileged groups (Administrators, Domain Admins and similar) are reported at Error.

**Severity:** Error (privileged group) / Notice (any other security group)

**Why it matters:** The member gets every right the group carries, and keeps it until someone removes the membership. An add to a privileged group can give control of the machine or the whole domain.

**In practice:** Security log, event ID 4732 (local or domain local group), 4728 (global group) or 4756 (universal group), naming the account that made the change, the group and the new member. The member holds the group's rights from its next sign-in. Adds to Administrators, Domain Admins, Enterprise Admins, Schema Admins, the Account, Server, Backup and Print Operators, Hyper-V Administrators and similar groups are reported at Error; any other group at Notice. The privileged check uses the group's SID, so it holds for renamed groups and other display languages.

**When to ignore:** Adds to ordinary groups that match normal access requests.

**What to check:**

- For a privileged group, confirm today who made the change and why.
- An add to a workstation's local Administrators to install something is often never undone: check it was removed.
- For any other group, no action; the record answers later questions about who had access when.

**Related:**

- `account_created`: a new account, often added to groups next
- `group_member_removed`: a member removed from a group
- `security_group_changed`: the group's own scope, type or attributes changed
- `special_group_sign_in`: a sign-in by a member of a group an administrator chose to watch

**Example:** An administrator adds an account to the local Administrators group.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#group_member_added, https://sparklogs.com/reference/reasons/group_member_added.json

## `group_member_removed`: group member removed

A member was removed from a security group. Removals from privileged groups are reported at Warning.

**Severity:** Warning (privileged group) / Notice (any other security group)

**Why it matters:** The member loses the group's rights. A privileged removal can leave a machine with nobody able to administer it, or take away an account's credential protections.

**In practice:** Security log, event ID 4733 (local or domain local group), 4729 (global group) or 4757 (universal group), naming who made the change, the group and the member removed. The member loses the group's rights at its next sign-in. A privileged removal is one step below an add because it grants nothing; it can still remove a machine's last working administrator, or take an account out of Protected Users. Removals from any other group are Notice.

**When to ignore:** Removals during offboarding or a planned access review.

**What to check:**

- For a privileged group, confirm the removal and check that the machine still has a working administrator.
- When a user reports lost access, look here for the group they left.
- Offboarding removes many memberships at once; a lone removal from Protected Users or Domain Admins is the one to read.

**Related:**

- `account_deleted`: the account deleted, often in the same offboarding
- `group_member_added`: a member added to a group
- `security_group_deleted`: the whole group deleted, removing every member at once

**Example:** An administrator removes a contractor from the Administrators group at the end of a project.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#group_member_removed, https://sparklogs.com/reference/reasons/group_member_removed.json

## `guest_account_sign_in`: guest account sign in

The built-in Guest account signed in. Windows ships it disabled, so someone enabled it.

**Severity:** Notice

**Why it matters:** An account with no owner, and often no password, can reach this machine. What it reaches depends on the sign-in type and on what is shared with Guest or Everyone.

**In practice:** Security log, event ID 4624 for the built-in Guest account (the account whose SID ends in -501). Kiosk and lab builds enable it on purpose. A network sign-in through NTLM usually comes from an older device, such as a NAS or copier, that connects to this machine's shares as guest.

**When to ignore:** Kiosk or lab machines built with Guest enabled on purpose.

**What to check:**

- Check whether Guest was enabled on purpose (net user guest shows Account active).
- If not, disable it and find who enabled it: event 4722 for the account whose SID ends in -501.
- For a network sign-in, find the source device named on the event and give it a real account.

**Related:**

- `anonymous_remote_sign_in`: a sign-in with no identity at all, from another machine

**Example:** An old NAS connects to this machine's shares and signs in as Guest over NTLM.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#guest_account_sign_in, https://sparklogs.com/reference/reasons/guest_account_sign_in.json

Guest is a real account with a fixed allocation, and it is not the anonymous well-known identity
that the identity-less sign-in surfaces cover: those name the absence of a principal, this names
a principal that exists and is normally switched off.

## `kerberos_duplicate_request_rejected`: kerberos duplicate request rejected

Windows rejected a Kerberos request that repeated one it had just received.

**Severity:** Warning

**Why it matters:** That one request failed and the client has to try again. Network gear or a retrying client usually causes it, but a replayed stolen ticket writes the same event.

**In practice:** Security log, event ID 4649, "A replay attack was detected": the request's authenticator matched one received moments before (KRB_AP_ERR_REPEAT). Microsoft names network devices that duplicate packets as the usual cause, and clients that retry too fast cause it too. The event cannot tell those from someone replaying a stolen ticket.

**What to check:**

- Check network devices between the client and this server for duplicated packets.
- Check the client for a tool or service retrying sign-ins too fast.
- Check time sync on the client and this server (w32tm /query /status).
- If the same account is active from an unexpected machine at the same time, treat it as a possible ticket replay.

**Related:**

- `kerberos_preauth_failed`: a failed first sign-in to the domain, such as a wrong password
- `kerberos_ticket_failed`: a Kerberos ticket request the domain refused for another cause

**Example:** A network device between a client and this server duplicates the client's Kerberos request.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#kerberos_duplicate_request_rejected, https://sparklogs.com/reference/reasons/kerberos_duplicate_request_rejected.json

One event is worth a look, because a repeated authenticator is rare on a healthy network. The
event does not say what produced the duplicate, and it does not show that any access succeeded.

## `kerberos_preauth_failed`: kerberos preauth failed

Kerberos pre-authentication failed at the domain controller. The cause is on the line, so a wrong password reads differently from a disabled account or a drifted clock.

**Severity:** Warning (account state or broken infrastructure) / Notice (wrong password, unknown client, undecoded)

**Why it matters:** That account cannot get domain tickets from the reported client address, so domain sign-in and access fail there. Repeated failures lead to lockout.

**In practice:** Security log on a domain controller, event ID 4771, with the account, the client address and port, and the failure code. Code 0x18 is a wrong password, the common case: often a phone, mapped drive or service still holding an old one. A disabled, expired or locked account, an expired password, clocks too far apart (0x25), no encryption type in common, and a request altered in transit are reported at Warning, since they keep failing until someone fixes them. A wrong password, an unknown account and codes without a known meaning are Notice.

**When to ignore:** An occasional wrong password that does not repeat.

**What to check:**

- Group by the cause first; one cause usually makes up most rows.
- For a lockout, match the client address here to the Caller Computer Name on event 4740.
- Find the device at the client address and update or remove its saved password.

**Related:**

- `account_locked_out`: the lockout these failures lead to
- `kerberos_ticket_failed`: a later ticket request or renewal refused
- `ntlm_validation_failed`: the same kind of failure for NTLM sign-ins
- `sign_in_failed`: a failed sign-in recorded on the machine the user was signing in to

**Example:** A phone with an old saved password keeps failing pre-authentication from the same address.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#kerberos_preauth_failed, https://sparklogs.com/reference/reasons/kerberos_preauth_failed.json

## `kerberos_rc4_ticket_issued`: kerberos rc4 ticket issued

A domain controller issued a Kerberos service ticket with weak RC4 encryption, for a service that runs under a user account.

**Severity:** Warning

**Why it matters:** Anyone holding the ticket can try to crack the service account's password offline (Kerberoasting), and RC4 is far easier to crack than AES. It also shows the service account still accepts RC4.

**In practice:** Security log on a domain controller, event ID 4769, with Ticket Encryption Type 0x17 or 0x18 (RC4). Tickets for computer accounts and krbtgt are not given this reason. A service account with no AES keys (its password not changed since AES was available, or its supported encryption types not set) and older clients cause it routinely. Many RC4 requests for different services from one account in a short time looks like Kerberoasting.

**When to ignore:** A known legacy service that still needs RC4, recorded and scheduled for change.

**What to check:**

- Set the service account's msDS-SupportedEncryptionTypes to AES, then reset its password so AES keys exist.
- Use a long random password or a group managed service account (gMSA) for service accounts.
- For many RC4 requests from one account in a short time, investigate that account as a Kerberoasting source.

**Related:**

- `kerberos_ticket_failed`: a ticket request the domain refused

**Example:** A workstation requests an RC4 ticket for a SQL Server service account.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#kerberos_rc4_ticket_issued, https://sparklogs.com/reference/reasons/kerberos_rc4_ticket_issued.json

## `kerberos_ticket_failed`: kerberos ticket failed

A Kerberos ticket request, service ticket request or renewal was refused. The cause the domain gave is on the line, and the line says which of the three failed.

**Severity:** Warning (account state or broken infrastructure) / Notice (wrong password, unknown principal, expired, undecoded)

**Why it matters:** The account cannot get or renew Kerberos tickets for the reported service, which blocks domain-authenticated access until the cause is fixed.

**In practice:** Security log on a domain controller, event ID 4768 (ticket-granting ticket), 4769 (service ticket) or 4770 (ticket renewal) marked Audit Failure, with the account, the service, the client address and the result code. Account problems (disabled, expired, revoked, locked), no encryption type in common, KDC policy refusals and clock skew are reported at Warning. An unknown account or service, an expired ticket, a wrong password and codes without a known meaning are Notice. On a service ticket, an unknown service name (0x7) usually means a client still asking for a service that was removed or whose name was never registered.

**When to ignore:** Renewals refused because the ticket reached the end of its lifetime.

**What to check:**

- Group by the cause first; one cause usually makes up most rows.
- For an unknown service name, find the client and the name it asks for, then fix the service principal name (setspn -Q) or the client's configuration.
- For clock skew, check time sync on the client and the domain controllers.

**Related:**

- `kerberos_preauth_failed`: a failed pre-authentication, usually a wrong password
- `kerberos_rc4_ticket_issued`: a service ticket that was issued, with weak encryption
- `sign_in_failed`: a failed sign-in recorded on the machine being signed in to

**Example:** A disabled user's laptop keeps requesting a ticket-granting ticket.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#kerberos_ticket_failed, https://sparklogs.com/reference/reasons/kerberos_ticket_failed.json

## `logon_right_granted`: logon right granted

A sign-in right (local, network, batch, service or Remote Desktop sign-in, or a deny counterpart) was granted to an account or group in local security policy.

**Severity:** Notice

**Why it matters:** Who may sign in to this machine, and how, changed. A grant of Remote Desktop or service sign-in to an unexpected account is a way to keep access; a granted deny right blocks that path instead.

**In practice:** Security log, event ID 4717, "System security access was granted to an account", naming the right and the account or group. Windows writes these at startup while applying local and Group Policy, granting rights to built-in groups as SYSTEM, and those restate existing policy. A grant to a named user, made by a person, is the one to check.

**When to ignore:** Startup policy application by SYSTEM onto built-in groups.

**What to check:**

- Check the right and the account against what the machine should allow (Local Security Policy, User Rights Assignment).
- Find the Group Policy or person behind a grant to an individual account.

**Related:**

- `audit_subcategory_changed`: audit policy changed, another part of local security policy
- `logon_right_removed`: a right taken away
- `special_group_sign_in`: sign-ins by accounts an administrator chose to watch

**Example:** At startup, Windows grants Remote Desktop sign-in to the Remote Desktop Users group while applying policy.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#logon_right_granted, https://sparklogs.com/reference/reasons/logon_right_granted.json

## `logon_right_removed`: logon right removed

A sign-in right (local, network, batch, service or Remote Desktop sign-in, or a deny counterpart) was removed from an account or group in local security policy.

**Severity:** Notice

**Why it matters:** Whatever relied on the right fails at its next sign-in, such as a service or scheduled task. Removing a deny right widens access instead.

**In practice:** Security log, event ID 4718, "System security access was removed from an account", naming the right and the account or group. Windows writes these at startup while applying local and Group Policy, as SYSTEM onto built-in groups, and those restate existing policy. A removal made by a person is the one to check.

**When to ignore:** Startup policy application by SYSTEM onto built-in groups.

**What to check:**

- When a service or task stops signing in, look here for the right it lost (Log on as a service, Log on as a batch job).
- A removed deny right opens that sign-in path; confirm it was meant to.

**Related:**

- `audit_subcategory_changed`: audit policy changed, another part of local security policy
- `logon_right_granted`: a right granted
- `sign_in_failed`: the failed sign-in a removed right causes later

**Example:** At startup, Windows removes the deny network sign-in right from a built-in group while applying policy.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#logon_right_removed, https://sparklogs.com/reference/reasons/logon_right_removed.json

## `network_share_added`: network share added

A network share was added on this machine.

**Also reported by:** `network-shares`

**Severity:** Warning or Info

**Why it matters:** Other machines may read or write the shared folder. An unexpected share is a common way data leaves or an intruder keeps a foothold.

**In practice:** Security log, event ID 5142, "A network share object was added", with the share name, its local path and the account that added it. It appears only when Audit File Share is on. Windows also writes it, as SYSTEM, each time the Server service or the print spooler starts, for shares that already exist: the administrative shares, printer shares and configured file shares. Those are reported at Info; a share added by any other account at Warning.

**When to ignore:** Rows written by SYSTEM at startup for shares that already exist.

**What to check:**

- Read the share name, path and the account that added it.
- Check the share's permissions with Get-SmbShareAccess and confirm it belongs on this machine.
- An unexpected share on a workstation, or one that exposes a whole drive, is the case to act on.

**Related:**

- `directory_object_changed`: an audited directory change, sometimes made with a new share on a server
- `firewall_rule_changed`: a firewall rule change, which can open the share to more networks

**Example:** A user shares a project folder from their workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#network_share_added, https://sparklogs.com/reference/reasons/network_share_added.json

The event cannot tell a share created now from one Windows publishes again at each boot, so it records who wrote the share and is not a configuration change record. Written by SYSTEM it is Info, which includes the rare share SYSTEM really creates; written by any other account it is Warning.

## `nps_access_denied`: nps access denied

Network Policy Server denied a connection request. The decision is on the line, so a wrong password reads differently from a request that matched no policy.

**Severity:** Warning (policy or infrastructure defect) / Notice (credentials, account state, undecoded)

**Why it matters:** The user did not get VPN, Wi-Fi or wired network access through RADIUS. Repeated denials can lock them out.

**In practice:** Security log on the NPS server, event ID 6273, "Network Policy Server denied access to a user", with the user, the RADIUS client (VPN server, wireless controller or switch), the policy that matched and a reason code. Configuration problems are reported at Warning: no network policy or connection request policy matched, an NPS extension refused the request, the authentication protocol failed, or the message could not be verified. Wrong passwords, unknown accounts, accounts whose dial-in setting denies access, and methods the policy does not allow are Notice.

**When to ignore:** An occasional wrong-password denial that does not repeat.

**What to check:**

- Group by reason code first; reason code 16 is a wrong password.
- For a request that matched no policy (reason code 48 or 49), compare its conditions (RADIUS client, group, authentication method) with the network and connection request policies.
- Find the device behind the RADIUS client named on the event when one user keeps failing.

**Related:**

- `account_locked_out`: the domain lockout the same old password can cause
- `nps_lockout`: the NPS lockout repeated denials trigger
- `nps_request_discarded`: a request NPS dropped without a decision
- `sign_in_failed`: a failed sign-in on a machine

**Example:** A user's VPN connection is denied with reason code 16 after a password change.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#nps_access_denied, https://sparklogs.com/reference/reasons/nps_access_denied.json

## `nps_lockout`: nps lockout

Network Policy Server locked an account after repeated failed attempts, so it cannot connect through RADIUS until the lockout clears.

**Severity:** Warning (built-in Administrator, any name) / Error (other accounts)

**Why it matters:** The user cannot connect to VPN or Wi-Fi through this server, even though their domain account can look healthy.

**In practice:** Security log on the NPS server, event ID 6279, "Network Policy Server locked the user account due to repeated failed authentication attempts". NPS keeps its own lockout, separate from the domain's, configured in the registry under HKLM\SYSTEM\CurrentControlSet\Services\RemoteAccess\Parameters\AccountLockout. A device still sending an old password is the usual cause. The lockout clears after the configured reset time, or when the account's entry under that key is deleted. The built-in Administrator (SID ending in -500) is reported at Warning under any name; every other account at Error, as on the domain lockout.

**What to check:**

- Find the RADIUS client and device sending the failures; the denials before the lockout (event 6273) name them.
- Fix the saved password on that device, then clear the NPS lockout.
- Check for a domain lockout of the same account (event 4740).
- If the built-in Administrator locks out again and again, its name is exposed to password spraying: rename or disable it, and put MFA in front of RD Gateway and other remote access.

**Related:**

- `account_locked_out`: the domain's own lockout, kept separately from this one
- `kerberos_preauth_failed`: domain controller failures the same old password causes
- `nps_access_denied`: the denials that lead to this lockout

**Example:** NPS locks a user out of Wi-Fi after their laptop keeps sending an old password.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#nps_lockout, https://sparklogs.com/reference/reasons/nps_lockout.json

## `nps_request_discarded`: nps request discarded

Network Policy Server discarded a connection request without making a policy decision.

**Severity:** Warning

**Why it matters:** The client did not connect. A discard keeps happening for every user of that RADIUS client until its configuration is fixed.

**In practice:** Security log on the NPS server, event ID 6274, "Network Policy Server discarded the request for a user", with the RADIUS client and a reason code. A shared secret that does not match between the RADIUS client and NPS, a RADIUS client not defined on the server, or a malformed request are the usual causes.

**What to check:**

- Group by RADIUS client first: a run from one client is a configuration fault, not a user problem.
- Check that client's entry on NPS (address and shared secret) against the VPN server, controller or switch.

**Related:**

- `nps_access_denied`: a request NPS processed and refused
- `nps_lockout`: an account NPS locked after repeated denials

**Example:** A wireless controller with a mistyped shared secret has its requests discarded.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#nps_request_discarded, https://sparklogs.com/reference/reasons/nps_request_discarded.json

A decision code this module does not decode renders no token, and the raw value still reaches the
tail and the field, so those rows stay countable.

## `ntlm_validation_failed`: ntlm validation failed

NTLM password validation failed for an account. The cause is on the line.

**Severity:** Warning (account state) / Notice (wrong password, unknown username, undecoded)

**Why it matters:** NTLM sign-in for that account fails from the reported workstation until the password or the account is fixed. Repeated failures lead to lockout.

**In practice:** Security log, event ID 4776 marked Audit Failure, or 4777, written by the machine that checked the password: a domain controller for a domain account, or the machine itself for a local account. It names the account, the workstation the attempt came from and an error code: 0xC000006A is a wrong password, 0xC0000064 an unknown user name. Disabled, locked, expired and restricted accounts are reported at Warning; wrong passwords, unknown names, expired passwords and codes without a known meaning at Notice.

**When to ignore:** An occasional wrong password that does not repeat.

**What to check:**

- Treat the workstation name as the machine to investigate.
- Group by the cause first; one cause usually makes up most rows.
- Many unknown user names from one workstation looks like password spraying.

**Related:**

- `account_locked_out`: the lockout repeated failures lead to
- `kerberos_preauth_failed`: the same kind of failure for Kerberos sign-ins
- `sign_in_failed`: the failed sign-in recorded on the machine being signed in to

**Example:** A workstation keeps trying an account name that does not exist.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#ntlm_validation_failed, https://sparklogs.com/reference/reasons/ntlm_validation_failed.json

## `principal_renamed`: principal renamed

An account or group was renamed. Its SID is unchanged, so events before and after describe the same account under two names.

**Severity:** Notice for a rename that changed the name; Debug when the old and new names are identical

**Why it matters:** Reports, scripts and saved searches keyed on the old name stop matching after this point. Renaming a privileged account to something ordinary hides it from checks that go by name.

**In practice:** Security log, event ID 4781, "The name of an account was changed", with the old and new names. It covers users, computers and groups. Renaming the built-in Administrator is common hardening. During Windows setup the event is written for built-in groups with identical old and new names; those rows rename nothing and are reported at Debug.

**When to ignore:** Rows where the old and new names are the same, written during Windows setup.

**What to check:**

- Match on the SID, not the name, across the rename.
- Confirm a rename of a built-in or privileged account against a request.
- Update scripts, reports and monitoring that use the old name.

**Related:**

- `account_changed`: other edits to the same account
- `account_created`: the account coming into existence

**Example:** An administrator renames a user account after a name change.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#principal_renamed, https://sparklogs.com/reference/reasons/principal_renamed.json

The id covers any SAM principal, groups included, so read the principal class off the event
rather than assuming a user account.

## `process_exited_abnormally`: process exited abnormally

A process ended with a crash status, such as a memory access violation or a corrupted heap. It did not exit on its own terms.

**Severity:** Notice

**Why it matters:** Whatever the process was doing did not finish. One crash says little about the machine: most are background helpers that start again unnoticed.

**In practice:** Security log, event ID 4689, "A process has exited", with the program path and an exit status that is one of the crash codes: access violation (0xC0000005), heap corruption, stack buffer overrun, stack overflow, illegal or privileged instruction, invalid handle, or a DLL that failed to initialize. It appears only when Audit Process Termination is on. Ordinary exits and a program's own error codes are not given this reason.

**When to ignore:** A single crash of a background helper that started again.

**What to check:**

- Look in the Application log for a crash record (event 1000, Application Error) from the same program and minute.
- One crash is ordinary; the same program crashing again and again, or on many machines, is the pattern to chase.
- Update or reinstall the program, and check for a recent update that matches the start of the crashes.

**Related:**

- `app_crash`: the Application log crash record for the same exit, when Windows Error Reporting wrote one

**Example:** A browser helper process ends with an access violation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#process_exited_abnormally, https://sparklogs.com/reference/reasons/process_exited_abnormally.json

## `psdirect_handshake_probe`: psdirect handshake probe

Hyper-V opened a PowerShell Direct channel to a guest virtual machine. Windows records the older handshake as a failed sign-in, but no account was involved.

**Severity:** Debug

**Why it matters:** Nothing is wrong and no action is needed. Counted as failed sign-ins, these rows inflate the failure count on Hyper-V hosts and guests.

**In practice:** Security log, event ID 4625 with the account name <PSDirectVMLegacy>. PowerShell Direct is how a Hyper-V host runs commands inside a guest without a network connection. The older handshake opens the channel through the sign-in path, so Windows writes a failed sign-in under that name, but no such account exists and nothing signed in.

**When to ignore:** Every one; they record a management channel opening, not a sign-in.

**What to check:**

- Leave these out when counting failed sign-ins.

**Related:**

- `sign_in_failed`: a real failed sign-in on the same event ID

**Example:** A Hyper-V administrator opens a PowerShell Direct session to a guest virtual machine.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#psdirect_handshake_probe, https://sparklogs.com/reference/reasons/psdirect_handshake_probe.json

The account name on these rows is a fixed protocol constant, not a principal, and the domain
field carries handshake bytes rather than a domain name. Neither is a value to pivot on.

## `scheduled_task_created`: scheduled task created

A scheduled task was created.

**Severity:** Notice or Display

**Why it matters:** The task can run a program on a schedule, at startup or at sign-in, as whatever account it was given. An unexpected task is a common way for an intruder to keep access.

**In practice:** Security log, event ID 4698, "A scheduled task was created", with the task name, the account that created it and the task's XML definition: what it runs, when and as whom. It appears only when Audit Other Object Access Events is on. Tasks Windows creates for itself, under the \Microsoft\ folder or as one of the few Microsoft tasks registered outside it such as the Edge and OneDrive updaters, are reported at Display. Any other task is Notice, including the ones management agents and other updaters create as SYSTEM.

**When to ignore:** Tasks Windows creates for itself, under \Microsoft\ or as the Edge and OneDrive updaters, and tasks from the client's known management, update and security software.

**What to check:**

- Read the command and run-as account in the XML in the original event, or with schtasks /query /tn <name> /xml.
- Tasks in the root folder or with random names, and tasks that run PowerShell, encoded commands or scripts from user or Temp folders, are the ones to check first.
- Compare against the software the client runs; agents and updaters create their own tasks.

**Related:**

- `scheduled_task_deleted`: a task removed
- `scheduled_task_disabled`: a task switched off but kept
- `scheduled_task_updated`: an existing task's definition changed
- `service_installed`: a new service, another way to run a program at startup
- `win_registry_value_created`: an audited registry value created, such as a Run key entry

**Example:** An administrator creates a sync task in the client's own task folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#scheduled_task_created, https://sparklogs.com/reference/reasons/scheduled_task_created.json

## `scheduled_task_deleted`: scheduled task deleted

A scheduled task was deleted.

**Severity:** Notice or Display

**Why it matters:** Whatever the task did will not happen again, and nothing restores it. A deleted backup or maintenance job fails silently.

**In practice:** Security log, event ID 4699, "A scheduled task was deleted", with the task name and the account that deleted it. It appears only when Audit Other Object Access Events is on. Uninstalls, updates and management agents delete tasks all the time. A task deleted soon after it was created and ran is what an intruder cleaning up leaves behind. Tasks Windows deletes for itself, under its own \Microsoft\ folder or as one of the few Microsoft tasks registered outside it such as the Edge and OneDrive updaters, are reported at Display; any other task at Notice.

**When to ignore:** Deletions by uninstalls, updates and the client's management tools.

**What to check:**

- Check whether the same task was created shortly before (event 4698).
- When a backup or maintenance job stops running, look here for its deletion.

**Related:**

- `scheduled_task_created`: a new task
- `scheduled_task_disabled`: a task switched off but kept
- `scheduled_task_updated`: an existing task's definition changed
- `service_installed`: a new service, another way to run a program at startup

**Example:** An uninstaller removes its updater task.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#scheduled_task_deleted, https://sparklogs.com/reference/reasons/scheduled_task_deleted.json

## `scheduled_task_disabled`: scheduled task disabled

A scheduled task was disabled. The task still exists and no longer runs.

**Severity:** Info

**Why it matters:** Whatever the task did stops until someone enables it again. Disabling a monitoring, backup or antivirus task is a quiet way to switch it off.

**In practice:** Security log, event ID 4701, "A scheduled task was disabled", with the task name and the account that disabled it. It appears only when Audit Other Object Access Events is on. Enabling a task again writes event 4700, which is not given a reason.

**When to ignore:** Disables during installs and planned maintenance.

**What to check:**

- If the task is for monitoring, backup, antivirus or updates, confirm the disable was intended.
- Check its current state with schtasks /query /tn <name>.

**Related:**

- `scheduled_task_created`: a new task
- `scheduled_task_deleted`: a task removed for good
- `scheduled_task_updated`: an existing task's definition changed

**Example:** A technician disables a vendor's updater task while troubleshooting.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#scheduled_task_disabled, https://sparklogs.com/reference/reasons/scheduled_task_disabled.json

## `scheduled_task_updated`: scheduled task updated

An existing scheduled task's definition was changed.

**Severity:** Notice or Display

**Why it matters:** The task keeps its name but can now run something else, on a different schedule or as a different account. Editing a trusted task is a quieter way to persist than creating a new one.

**In practice:** Security log, event ID 4702, "A scheduled task was updated", with the task name, the account and the new XML definition. It appears only when Audit Other Object Access Events is on. Software updates rewrite their own tasks often. Tasks Windows updates for itself, under its own \Microsoft\ folder or as one of the few Microsoft tasks registered outside it such as the Edge and OneDrive updaters, are reported at Display; any other task at Notice.

**When to ignore:** Updates by Windows and by the client's known software to their own tasks.

**What to check:**

- Compare the new definition with the last create or update of the same task.
- Look for a command changed to PowerShell or to a script in a user or Temp folder, or a run-as account changed to SYSTEM.

**Related:**

- `scheduled_task_created`: a new task
- `scheduled_task_deleted`: a task removed
- `scheduled_task_disabled`: a task switched off but kept
- `win_registry_value_created`: an audited registry value created, such as a Run key entry

**Example:** A software update changes when its maintenance task runs.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#scheduled_task_updated, https://sparklogs.com/reference/reasons/scheduled_task_updated.json

## `security_group_changed`: security group changed

A security group's scope, type or attributes changed. Changes to privileged groups (Administrators, Domain Admins and similar) are reported at Warning.

**Severity:** Warning for a privileged group, Notice for any other security group, Info when Windows configures its own builtin groups.

**Why it matters:** What the group grants changes everywhere it is used, for every member at once. A group converted from security to distribution stops granting access to anything.

**In practice:** Security log, event ID 4735 (local or domain local group), 4737 (global), 4755 (universal) or 4764 (group type changed, such as global to universal or security to distribution), naming the group and the account that changed it. These events change attributes only; membership changes have their own reasons. Windows setting up its own built-in groups as SYSTEM during setup is reported at Info.

**When to ignore:** Windows configuring its own built-in groups during setup.

**What to check:**

- Read which attributes the event lists as changed; a dash means unchanged.
- For a privileged group, confirm the change with whoever made it.

**Related:**

- `directory_object_changed`: an audited change to another kind of directory object
- `group_member_added`: a member added to a group
- `security_group_created`: a new group
- `security_group_deleted`: a group removed

**Example:** An administrator edits the description of the Domain Admins group.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#security_group_changed, https://sparklogs.com/reference/reasons/security_group_changed.json

## `security_group_created`: security group created

A security group was created. Creation of a privileged group is reported at Warning.

**Severity:** Warning for a privileged group, Notice for any other security group, Info when Windows provisions its own builtin groups.

**Why it matters:** The group grants nothing yet; whatever it is given later reaches every member added to it.

**In practice:** Security log, event ID 4731 (local or domain local group), 4727 (global) or 4754 (universal), naming the new group and the account that created it. Windows creates its built-in groups as SYSTEM while setting up a machine; those are reported at Info. Any other group is Notice, or Warning when its SID is one of the privileged groups.

**When to ignore:** Built-in groups Windows creates during setup, and groups created by the client's provisioning process.

**What to check:**

- Confirm the creator and the group's purpose against the client's naming and access model.
- Watch for members added to it next (event 4728, 4732 or 4756).

**Related:**

- `group_member_added`: a member added to a group
- `security_group_changed`: an existing group's scope, type or attributes changed
- `security_group_deleted`: a group removed

**Example:** Windows creates its built-in groups while setting up a new machine.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#security_group_created, https://sparklogs.com/reference/reasons/security_group_created.json

## `security_group_deleted`: security group deleted

A security group was deleted. Deletion of a privileged group is reported at Warning.

**Severity:** Warning for a privileged group, Notice for any other security group.

**Why it matters:** Every account that held rights through the group loses them at once, and permissions that named the group stop resolving.

**In practice:** Security log, event ID 4734 (local or domain local group), 4730 (global) or 4758 (universal), naming the group and the account that deleted it. Windows does not delete its own built-in groups, so a deletion of one, even by SYSTEM, is not part of setup. A recreated group with the same name gets a new SID, so old permissions do not return.

**When to ignore:** Groups retired by the client's decommissioning process.

**What to check:**

- Confirm the delete against a change request.
- When users report lost access to a share or application, check whether a group behind it was deleted.
- Restore an unwanted delete from the AD Recycle Bin while it still holds the group.

**Related:**

- `group_member_removed`: one member removed from a group
- `security_group_changed`: an existing group's scope, type or attributes changed
- `security_group_created`: a new group

**Example:** An administrator deletes a group left over from a finished project.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#security_group_deleted, https://sparklogs.com/reference/reasons/security_group_deleted.json

## `service_installed`: service installed

A Windows service was installed. The System log records the same install by default as event 7045.

**Also reported by:** `win.eventlog.system`, `services`

**Severity:** Notice, Info or Debug

**Why it matters:** A new service can run a program at startup or on demand, as whatever account it was given. An unexpected service is a common way for an intruder to keep access.

**In practice:** Security log, event ID 4697, "A service was installed in the system", with the service name, the program it runs, its start type and the account it runs as. It appears only when Audit Security System Extension is on. Updaters that install a service named after each new version, in that version's folder, are reported at Info. The per-user copies Windows makes of some of its own services for each user who signs in are reported at Debug.

**When to ignore:** Installs by the client's known software and its updaters.

**What to check:**

- Read the program path and run-as account together; a service running from a user, Temp or ProgramData folder, or a command line that starts PowerShell or cmd, is the one to check.
- Confirm it belongs to software the client installed.
- Check the program's signature with Get-AuthenticodeSignature.

**Related:**

- `scheduled_task_created`: a new scheduled task, another way to run a program
- `win_registry_value_created`: an audited registry value created, such as a Run key entry

**Example:** A remote support tool installs its service at the start of a session.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#service_installed, https://sparklogs.com/reference/reasons/service_installed.json

## `sid_history_add_failed`: sid history add failed

An attempt to add SID History to an account failed.

**Severity:** Error

**Why it matters:** The account's rights are unchanged. The attempt still needs accounting for, since success would have given the account another account's rights.

**In practice:** Security log on a domain controller, event ID 4766, "An attempt to add SID History to an account failed", naming the account that tried and the target account. SID History lets an account carry the identity, and the rights, of an account from another domain. Migration tools such as ADMT write it legitimately; outside a migration, trying it is an attack technique, even when it fails.

**When to ignore:** Failures during a planned migration that the migration team can explain.

**What to check:**

- Confirm whether a domain migration is under way and its tool's account made the attempt.
- Repeated failures against one account read differently from one tool error.

**Related:**

- `account_changed`: other edits to user and computer accounts
- `directory_object_changed`: other audited directory changes
- `sid_history_added`: the same attempt when it succeeded

**Example:** A migration tool fails to copy SID History for a user because its account lacks the permission.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#sid_history_add_failed, https://sparklogs.com/reference/reasons/sid_history_add_failed.json

The event proves the attempt, not that any rights were inherited.

## `sid_history_added`: sid history added

SID History was added to an account.

**Severity:** Serious

**Why it matters:** The account now has every right the added SID has, including rights in another domain, without appearing in any group.

**In practice:** Security log on a domain controller, event ID 4765, "SID History was added to an account", with the source account, the target account and the added SID. Migration tools such as ADMT write it legitimately. Outside a migration, it is a known way to give an account hidden administrator rights, for example with the SID of a Domain Admins group (a SID ending in -512).

**When to ignore:** Adds made by the migration tool during a planned migration.

**What to check:**

- Confirm a domain migration is under way.
- Look up the added SID; a privileged one outside a migration is a compromise until proven otherwise.
- Remove unwanted SID History with Set-ADUser -Remove @{sidHistory='<SID>'}, and find how the actor got the rights to add it.

**Related:**

- `account_changed`: other edits to user and computer accounts
- `directory_object_changed`: other audited directory changes
- `security_group_changed`: a group change, another way rights move
- `sid_history_add_failed`: the same attempt when it failed

**Example:** A migration tool copies a user's old-domain SID into SID History during a domain migration.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#sid_history_added, https://sparklogs.com/reference/reasons/sid_history_added.json

One event is enough to act on. The event proves the SID History write; it does not show that the
inherited rights were used.

## `sign_in_failed`: sign in failed

A sign-in attempt failed. A disabled, locked or expired account, or one denied by policy, needs action; a single wrong password usually does not.

**Severity:** Warning (account-state) / Notice (other) / Verbose (credential-less probe)

**Why it matters:** The user or service cannot sign in. Repeated failures lead to lockout, and the source address and workstation show where the attempts come from.

**In practice:** Security log, event ID 4625, "An account failed to log on", with the account, the logon type, the authentication package, the source workstation and address, and the failure code (Status and Sub Status). A wrong password (0xC000006A) or an unknown user name (0xC0000064) is one failed attempt that changed nothing, reported at Notice. A disabled, locked or expired account, a missing logon right, an hours or workstation restriction, or an authentication firewall refusal keeps failing until someone changes the account, and is reported at Warning. Backup and management tools often make a request with no credentials that Windows records as a failure with no account name; that is reported at Verbose.

**When to ignore:** A single mistyped password, and the credential-free requests from backup and management tools that name no account or source machine.

**What to check:**

- Read the cause first. For an account problem, fix the account; for wrong passwords, check whether it is one mistype or a run from one source.
- Find the source by the workstation name and address on the event.
- Many accounts failing from one address is password guessing; block or investigate that source.

**Related:**

- `account_locked_out`: the lockout repeated failures lead to
- `anonymous_remote_sign_in`: a sign-in with no identity that succeeded
- `kerberos_preauth_failed`: the domain controller's record of a failed Kerberos sign-in
- `ntlm_validation_failed`: the record from the machine that checked an NTLM password

**Example:** A management account tries to sign in over the network as a service account that is disabled.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#sign_in_failed, https://sparklogs.com/reference/reasons/sign_in_failed.json

Auth semantics: the interesting principal is the Target (who failed to authenticate),
not the Subject (often NULL/SYSTEM on network failures). The Target is therefore the
curated actor on this id; when the Subject names a real account it is the calling
context and rides running_as, so its presence says the attempt came from somewhere
other than the failing principal.

## `special_group_sign_in`: special group sign in

An account in a group an administrator chose to watch signed in.

**Severity:** Warning

**Why it matters:** A watched account signed in to this machine. Someone set up the watch list on purpose, so each of these is a sign-in they wanted to see.

**In practice:** Security log, event ID 4964, "Special groups have been assigned to a new logon", naming the account, its logon ID and the watched group SIDs it matched. Windows writes it only when Audit Special Logon is on and a list of group SIDs is set in the registry value SpecialGroups under HKLM\SYSTEM\CurrentControlSet\Control\Lsa\Audit.

**What to check:**

- Check the SpecialGroups list on the machine to see which group matched.
- Confirm the sign-in was expected: the account, the time and the machine.
- Use the logon ID to find what that session did next.

**Related:**

- `group_member_added`: a membership change that can put an account in a watched group
- `sign_in_failed`: a sign-in that failed

**Example:** A member of Domain Admins signs in to a workstation that watches that group.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#special_group_sign_in, https://sparklogs.com/reference/reasons/special_group_sign_in.json

## `system_time_changed`: system time changed

The system clock was changed. Corrections by the Windows Time service are routine; changes by any other process are not.

**Severity:** Warning (non-time-service) / Debug (routine time service)

**Why it matters:** A wrong clock breaks Kerberos sign-in once it is more than five minutes from the domain controllers, and makes event timelines misleading.

**In practice:** Security log, event ID 4616, "The system time was changed", with the old and new time, the account and the process. The Windows Time service (svchost.exe in System32, running as LOCAL SERVICE) corrects the clock routinely; those rows are reported at Debug. Any other process or account, such as a user changing the clock, a script, or a virtual machine's guest tools, is reported at Warning.

**When to ignore:** Corrections by the Windows Time service, reported at Debug.

**What to check:**

- Read the process and account that changed the clock.
- Compare the old and new times: a jump of hours or days is the case to explain.
- Check time sync with w32tm /query /status and w32tm /query /source.

**Related:**

- `audit_log_cleared`: the Security log wiped, which also hides a timeline
- `kerberos_ticket_failed`: Kerberos failures that a badly wrong clock causes

**Example:** An administrator sets the clock back an hour from a command prompt.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#system_time_changed, https://sparklogs.com/reference/reasons/system_time_changed.json

## `user_audit_subcategory_changed`: user audit subcategory changed

The per-user audit policy for one account changed.

**Severity:** Notice

**Why it matters:** Auditing for that account may now record more or less than system policy says; the event does not show the effect.

**In practice:** Security log, event ID 4912, "Per User Audit Policy was changed", naming the account (by SID), the subcategory and the change. Per-user policy, set with auditpol /set /user, can add auditing for one account or exclude it from system policy. An exclusion hides that account's activity from the Security log.

**When to ignore:** A planned per-user audit change.

**What to check:**

- Check the account's per-user policy with auditpol /get /user:<account> /category:*.
- An exclusion for an admin or service account is the case to explain.

**Related:**

- `audit_subcategory_changed`: audit policy changed for the whole system

**Example:** An administrator adds extra process auditing for one service account with auditpol.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#user_audit_subcategory_changed, https://sparklogs.com/reference/reasons/user_audit_subcategory_changed.json

## `win_insecure_boot_config`: win insecure boot config

The machine started with test signing, kernel debugging or integrity checks turned off in its boot configuration.

**Severity:** Warning

**Why it matters:** Windows may load unsigned drivers, or let a debugger control the kernel, until the settings are turned off and the machine restarts.

**In practice:** Security log, event ID 4826, "Boot Configuration Data loaded", written at each startup with the boot settings. It is given this reason only when test signing, kernel debugging or disabled integrity checks is on, and the line names which. Developers and some driver tools turn these on; malware turns them on to load an unsigned driver.

**When to ignore:** Developer or driver test machines set up this way on purpose.

**What to check:**

- Check the settings with bcdedit /enum {current}.
- Unless the machine is a test or development box, turn them off (bcdedit /set testsigning off, bcdedit /debug off, bcdedit /set nointegritychecks off) and restart.
- Find what turned them on: a driver installer, a tool or a person.

**Related:**

- `crypto_selftest_failed`: a failed cryptographic self-test, another startup integrity record

**Example:** A workstation starts with test signing left on after a driver test.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#win_insecure_boot_config, https://sparklogs.com/reference/reasons/win_insecure_boot_config.json

Flag names ride the message kv tail (InsecureBootFlags) when labeled.

## `win_registry_value_changed`: win registry value changed

An audited registry value was changed.

**Severity:** Warning or Verbose

**Why it matters:** The setting this value controls is different now. Startup entries, security settings and service configuration live in registry values, so an unexpected change can mean persistence or a weakened control.

**In practice:** Security log, event ID 4657, "A registry value was modified", with the key, the value name, the old and new data, and the process and account. Windows writes it only when Audit Registry is on and an administrator set auditing (a SACL) on the key, so someone chose to watch it. SYSTEM rewriting event tracing settings under HKLM\SYSTEM\CurrentControlSet\Control\WMI is reported at Verbose, unless the write sets an Enabled or Start value to zero, which turns tracing off.

**When to ignore:** Changes by known software to the keys it owns.

**What to check:**

- Read the key, value name and process first.
- The old and new data are only in the original event; open it to compare.
- Confirm the process and account belong to software or an administrator expected to change that key.

**Related:**

- `scheduled_task_created`: a new scheduled task, another way to persist
- `service_installed`: a new service, often registered next to startup entries
- `win_registry_value_created`: a new value
- `win_registry_value_deleted`: a value removed

**Example:** An administrator edits an audited value under the machine's Software key with Registry Editor.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#win_registry_value_changed, https://sparklogs.com/reference/reasons/win_registry_value_changed.json

## `win_registry_value_created`: win registry value created

An audited registry value was created.

**Severity:** Warning or Verbose

**Why it matters:** A new value can add a startup program, a policy or a service setting. An unexpected one under a Run key or a security setting can mean persistence or a weakened control.

**In practice:** Security log, event ID 4657 with the operation "New registry value created", with the key, the value name, the data, and the process and account. Windows writes it only when Audit Registry is on and an administrator set auditing (a SACL) on the key. SYSTEM writing event tracing settings under HKLM\SYSTEM\CurrentControlSet\Control\WMI is reported at Verbose, unless the write sets an Enabled or Start value to zero.

**When to ignore:** Values written by known software to the keys it owns.

**What to check:**

- Read the key, value name, data and process first.
- A new value under a Run key that points to a user or Temp folder is the case to check.
- Confirm the process and account belong to software or an administrator expected to write that key.

**Related:**

- `scheduled_task_created`: a new scheduled task, another way to persist
- `service_installed`: a new service, often registered next to startup entries
- `win_registry_value_changed`: an existing value changed
- `win_registry_value_deleted`: a value removed

**Example:** An installer adds a startup entry under an audited Run key.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#win_registry_value_created, https://sparklogs.com/reference/reasons/win_registry_value_created.json

## `win_registry_value_deleted`: win registry value deleted

An audited registry value was deleted.

**Severity:** Warning

**Why it matters:** Whatever the value configured falls back to the Windows default, which can undo a hardening setting or a policy.

**In practice:** Security log, event ID 4657 with the operation "Registry value deleted", with the key, the value name, the old data, and the process and account. Windows writes it only when Audit Registry is on and an administrator set auditing (a SACL) on the key.

**When to ignore:** Values removed by known software from the keys it owns, such as during an uninstall.

**What to check:**

- Read the key, value name and process first.
- If a security or policy setting was removed, check what default now applies and restore the value.

**Related:**

- `scheduled_task_created`: a new scheduled task, another way to persist
- `service_installed`: a new service, often registered next to startup entries
- `win_registry_value_changed`: an existing value changed
- `win_registry_value_created`: a new value

**Example:** An uninstaller removes its startup entry from an audited Run key.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-security#win_registry_value_deleted, https://sparklogs.com/reference/reasons/win_registry_value_deleted.json
