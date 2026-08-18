<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.security`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `account_changed` | `security_audit` | Notice |
| `account_created` | `security_audit` | Notice |
| `account_deleted` | `security_audit` | Notice |
| `account_disabled` | `security_audit` | Notice |
| `account_enabled` | `security_audit` | Notice |
| `account_locked_out` | `auth` | Error (privileged account) / Warning |
| `account_password_change_failed` | `security_audit` | Info |
| `account_password_reset` | `security_audit` | Warning |
| `account_password_reset_failed` | `security_audit` | Warning |
| `anonymous_remote_logon` | `auth` | Notice |
| `audit_events_dropped` | `security_audit` | Error when records were discarded; Debug when the count is zero |
| `audit_log_cleared` | `security_audit` | Critical (non-system clearer) / Error |
| `audit_log_full` | `security_audit` | Serious |
| `audit_pipeline_error` | `security_audit` | Warning |
| `audit_policy_changed` | `security_audit` | Warning |
| `ca_request_failed` | `certificates` | Warning |
| `ca_tamper` | `certificates` | Serious (audit filter changed or CA database rows deleted) / Error (permissions or certificate-manager settings) |
| `crypto_selftest_failed` | `security_audit` | Error |
| `directory_object_access_denied` | `directory_services` | Notice |
| `directory_object_changed` | `directory_services` | Warning |
| `directory_replication_access` | `directory_services` | Warning (any other account) / Info (a domain controller, a platform identity, or a directory-sync connector under its default name) |
| `domain_policy_changed` | `security_audit` | Warning; Debug for the platform writing a new machine's own setup policy |
| `dsrm_password_changed` | `security_audit` | Serious (completed change) / Error (failed attempt) |
| `event_logging_stopped` | `security_audit` | Info |
| `explicit_credential_use` | `auth` | Info |
| `firewall_rule_changed` | `networking` | Warning |
| `firewall_service_stopped` | `networking` | Warning |
| `group_member_added` | `security_audit` | Error (privileged group) / Notice (any other security group) |
| `group_member_removed` | `security_audit` | Warning (privileged group) / Notice (any other security group) |
| `group_membership_changed` | `security_audit` | Warning (privileged group) / Notice (any other security group) |
| `guest_account_sign_in` | `auth` | Notice |
| `insecure_boot_config` | `security_audit` | Warning |
| `kerberos_preauth_failed` | `auth` | Warning (account state or broken infrastructure) / Notice (wrong password, unknown client, undecoded) |
| `kerberos_rc4_ticket` | `auth` | Warning |
| `kerberos_ticket_failed` | `auth` | Warning (account state or broken infrastructure) / Notice (wrong password, unknown principal, expired, undecoded) |
| `logon_failed` | `auth` | Warning (account-state) / Notice (other) / Verbose (credential-less probe) |
| `logon_right_granted` | `security_audit` | Notice |
| `logon_right_removed` | `security_audit` | Notice |
| `network_share_added` | `file_sharing` | Warning |
| `nps_access_denied` | `auth` | Warning (policy or infrastructure defect) / Notice (credentials, account state, undecoded) |
| `nps_lockout` | `auth` | Error (privileged account) / Warning |
| `nps_request_discarded` | `auth` | Warning |
| `ntlm_validation_failed` | `auth` | Warning (account state) / Notice (wrong password, unknown username, undecoded) |
| `principal_renamed` | `security_audit` | Notice for a rename that changed the name; Debug when the old and new names are identical |
| `psdirect_handshake_probe` | `auth` | Debug |
| `registry_value_changed` | `security_audit` | Warning |
| `replay_attack_detected` | `auth` | Error |
| `scheduled_task_changed` | `scheduled_tasks` | Warning (create/delete/update) / Info (disable) |
| `service_installed` | `security_audit` | Notice |
| `sid_history_changed` | `security_audit` | Serious (added) / Error (failed attempt) |
| `special_group_logon` | `security_audit` | Warning |
| `system_time_changed` | `time_sync` | Warning (non-time-service) / Debug (routine time service) |

## `account_changed`

An attribute on an existing user or computer account was modified.

**Severity:** Notice

**Impact:** The principal still exists and still authenticates; what changed is one of its properties, so read the row as a timestamped record of an administrative edit rather than as a failure.

**Consider:**

- Join on the actor (who edited) and the target (which principal was edited)
- The id can fire without a visible attribute change; treat one occurrence as weak evidence

The target is the principal that was edited and the actor is the principal that edited it.
config_change.target stays unset on this reason: the object of the change is a principal, which
rides the target family instead.

## `account_created`

A user or computer account was created in the directory or local SAM.

**Severity:** Notice

**Impact:** A new principal can authenticate and may receive group rights. Unexpected creates on DCs or privileged naming patterns deserve follow-up.

**Consider:**

- Join on Subject (who created) and TargetUserName (what was created)
- Computer account creates (4741) are common on domain join; still notable-normal

## `account_deleted`

A user or computer account was deleted from the directory or local SAM.

**Severity:** Notice

**Impact:** That principal can no longer authenticate. Orphaned ACLs, service logons, and scheduled tasks that still reference the account may fail.

**Consider:**

- Confirm Subject expected for that delete
- Check dependent services and tasks after computer-account deletes

## `account_disabled`

A user or computer account was disabled and can no longer authenticate.

**Severity:** Notice

**Impact:** The named principal cannot sign in from this point on. Services, scheduled tasks and mapped resources still configured to use it will start failing, and those failures appear as their own events rather than here.

**Consider:**

- Join on the actor to see who disabled it, and on the target to see what was disabled
- Look for later failures naming the same principal as a service or task identity

## `account_enabled`

A user or computer account that was disabled has been enabled and can authenticate again.

**Severity:** Notice

**Impact:** The named principal can sign in from this point on. An enable nobody expected on a privileged or long-dormant account is worth confirming against the change that requested it.

**Consider:**

- Join on the actor to see who enabled it, and on the target to see what was enabled
- Compare against the sign-in history of the same principal after this time

## `account_locked_out`

An account was locked out after failed sign-ins. CallerComputerName names the machine that caused the lockout (often a stale cached credential).

**Severity:** Error (privileged account) / Warning

**Impact:** User cannot authenticate until unlock. Privileged lockout can block admin recovery paths.

**Consider:**

- Treat CallerComputerName as the device to remediate (password/cache), not only the locked user
- Privileged RID lockouts deserve faster response than routine user lockouts

Highest ticket-value auth pivot on many fleets: find the noisy device, fix the credential.

## `account_password_change_failed`

A principal tried to change its own password and the change was rejected.

**Severity:** Info

**Consider:**

- One occurrence is ordinary; a rate against one account is the readable signal
- The successful half of the same id is not labeled, so absence here does not mean absence of changes

## `account_password_reset`

One principal reset the password of another principal, and the reset completed.

**Severity:** Warning

**Impact:** The account holder can no longer sign in with the credential they were using, and whoever performed the reset chose the replacement. A reset nobody requested is one of the standard ways an identity is taken over.

**Consider:**

- Confirm a ticket or request exists for the reset, especially on privileged targets
- Compare the actor against the set of principals expected to perform resets

The value the credential was set to is never recorded by the event and never reaches any field.

## `account_password_reset_failed`

One principal attempted to reset the password of another principal and the reset did not complete.

**Severity:** Warning

**Impact:** The target credential is unchanged, so nobody lost access. What the row records is that an override of somebody else credential was attempted, which is worth attributing whether it succeeded or not.

**Consider:**

- Repeated failures from one actor against many targets is a different shape from one failure
- Confirm the actor is a principal expected to perform resets at all

An event that states neither success nor failure is reported here rather than as a completed
reset.

## `anonymous_remote_logon`

A sign-in succeeded with no identity, from a machine other than this one. Windows uses anonymous logons routinely for its own local plumbing, but those name no source machine; this one did.

**Severity:** Notice

**Impact:** Something on the network authenticated as nobody. That is normal for a deliberately public share and abnormal otherwise, where it is the shape null-session enumeration takes.

**Consider:**

- Check whether the named endpoint is expected to reach this machine at all
- Confirm whether a share or pipe on this host is deliberately open to anonymous access
- Pivot on the endpoint to see what else it did in the same window

## `audit_events_dropped`

The Windows event log transport discarded audit records before they reached the log. The number discarded rides the event.

**Severity:** Error when records were discarded; Debug when the count is zero

**Impact:** The audit record for that window on that host is permanently incomplete, and nothing replays it. Read the absence of expected security events around this time as loss rather than as quiet.

**Consider:**

- The count states how many records were lost; zero means nothing was
- Investigate what generated enough audit volume to overrun the transport

The count is read from the message text and only from the known template, so any row whose text
does not match that template ships with no count. A row with no count is reported at the failure
band rather than the healthy one.

## `audit_log_cleared`

The Security audit log was cleared. When a non-system account cleared it, treat as critical; system-account clears stay high but admit automated log management.

**Severity:** Critical (non-system clearer) / Error

**Impact:** Audit trail truncated; later investigation on this host is incomplete for the cleared window.

**Consider:**

- Identify the clearer SubjectUserSid / SubjectUserName
- Look for adjacent gaps, 1100 absence, and unexpected admin sessions

Provider is Microsoft-Windows-Eventlog, not Security-Auditing. Who cleared the log is what the
event itself proves, and it is what separates the two bands.

## `audit_log_full`

The Security log is full. This usually means retention is set to do-not-overwrite and new audit events may be lost.

**Severity:** Serious

**Impact:** New security events may stop recording until space is freed or retention policy changes. Investigation coverage on this host is at risk.

**Consider:**

- Check log size and retention (do-not-overwrite vs overwrite-as-needed)
- Expand capacity or archive before clearing if forensics matter

## `audit_pipeline_error`

The Windows logging service failed to process an incoming audit event. Some security events may not have been recorded.

**Severity:** Warning

**Impact:** Audit coverage has holes for the failed publisher/event window. Gaps can hide activity that would otherwise appear in the Security log.

**Consider:**

- Use PublisherID when present to see which source failed
- Correlate with Event Log service health and disk errors

## `audit_policy_changed`

Local audit policy changed (system, object security descriptor, or per-user). These events are dependable even when other audit subcategories are off.

**Severity:** Warning

**Impact:** What gets logged (or silenced) on this host can change. Unexpected policy edits can hide later activity or flood the log.

**Consider:**

- Use SubcategoryGuid to see which subcategory changed
- On DCs, correlate with GPO refresh before treating every hit as tamper

## `ca_request_failed`

A certification authority denied or failed a certificate request.

**Severity:** Warning

**Impact:** The requester did not receive a certificate. May be expected policy denial or a broken enrollment path for that template/host.

**Consider:**

- Confirm whether the denial matches intended enrollment policy
- Absence of these events does not prove quiet CA activity (auditing is double-gated)

## `ca_tamper`

Certification Authority control settings changed (security permissions, audit filter, certificate-manager settings) or rows were deleted from the CA database.

**Severity:** Serious (audit filter changed or CA database rows deleted) / Error (permissions or certificate-manager settings)

**Impact:** Future certificate issuance may be less auditable, or CA policy may have shifted. Unexpected changes deserve immediate review on any enterprise CA.

**Consider:**

- Confirm change window against approved CA maintenance
- Remember these events only appear when CA auditing is fully enabled

The audit-filter and database-deletion forms carry the higher band because they reduce what can
be audited later; permissions and certificate-manager changes have routine administrative forms.

## `crypto_selftest_failed`

A FIPS cryptographic self-test failed. The platform could not verify its crypto primitives.

**Severity:** Error

**Impact:** Cryptographic operations on the host may be untrustworthy until the failure is explained and fixed. Rare on healthy fleets.

**Consider:**

- Inspect ProcessName when present
- Correlate with recent firmware, driver, or policy changes

## `directory_object_access_denied`

Something asked for access to a directory service object and was refused. Windows records this only for objects an administrator chose to audit, so the object itself was considered worth watching.

**Severity:** Notice

**Impact:** Nothing was changed or read: the refusal is the outcome. Repeated refusals from one account usually mean a service is misconfigured, and refusals against sensitive objects are worth a closer look.

**Consider:**

- Check whether the requesting account is expected to touch this object at all
- Repeated identical refusals usually point at an application or service account, not at a person
- Remember these rows exist only for objects with auditing configured, so absence proves nothing

## `directory_object_changed`

A directory service object was created, modified, moved, or deleted. Typical on domain controllers when Directory Service Changes auditing is enabled for the object.

**Severity:** Warning

**Impact:** Directory state that apps and auth depend on may have changed. Unexpected object or attribute edits can alter access control or break dependent services.

**Consider:**

- Pivot on ObjectDN and AttributeLDAPDisplayName; do not expect AttributeValue in curated fields
- Confirm the change Subject against approved admin or sync tooling

config_change.action reads updated on the modification id and created or deleted on the ids that
name those directions, so pivot on the action rather than assuming one value.

## `directory_replication_access`

An account asked a domain controller for directory replication rights, the access that lets a caller read directory content in bulk. Domain controllers do this with each other constantly; almost nothing else has a reason to.

**Severity:** Warning (any other account) / Info (a domain controller, a platform identity, or a directory-sync connector under its default name)

**Impact:** Replication access can expose directory content wholesale, including password material, which is why it is the access an attacker seeks after gaining a foothold. It is also exactly what directory sync tooling uses, so the question is always which account asked.

**Consider:**

- Identify the requesting account: a machine account or your identity-sync service account is expected, anything else is not
- Confirm the account against the sync tooling your estate actually runs before treating it as hostile
- A connector-shaped account name is not proof of anything: the name is chosen by whoever created the account
- Pivot on the account across the same window: a credential dump is preceded by a sign-in from somewhere

The rights ride the Properties field as a GUID list whose brace wrapping and letter case vary
across builds, so a query against the raw payload should casefold and match inside the list rather
than compare a formatted value.
Every replication access carries this same reason whatever its band, so a query on the reason
returns all of it; the band records how routine the requester looked, never whether it was
authorized.

## `domain_policy_changed`

Password or lockout policy for a domain was changed.

**Severity:** Warning; Debug for the platform writing a new machine's own setup policy

**Impact:** Credential strength and lockout protection for every principal under that domain differ from this point on. A weakening shows up nowhere else, since no host reports being easier to attack.

**Consider:**

- Compare the settings in the retained payload against the intended policy baseline
- Confirm a change request exists, since the row states that policy moved and not why

The domain the policy belongs to rides the config-change target. The full before-and-after
setting list stays in the retained event payload rather than becoming fields.

## `dsrm_password_changed`

An attempt was made to set the Directory Services Restore Mode (DSRM) password on a domain controller. That password unlocks offline DC recovery.

**Severity:** Serious (completed change) / Error (failed attempt)

**Impact:** Whoever holds the DSRM password can recover or manipulate that DC offline. Unexpected changes are a high-priority integrity concern.

**Consider:**

- Confirm change window and Subject against approved DC maintenance
- Use Workstation when present to locate where the attempt ran

DC-only in practice. The event proves the attempt or the change, not that the password was used.

## `event_logging_stopped`

The Windows event logging service stopped, which is what a clean shutdown or restart of the host looks like in this channel.

**Severity:** Info

**Consider:**

- A gap in this channel that starts at one of these rows is explained by the host being down
- A gap with no such row before it is the shape worth looking at

This row describes the HOST event log service, not the SparkLogs collector.

## `explicit_credential_use`

A process used another account's credentials to sign on (explicit credential use), and the caller was not a routine OS component. Often runas, remote tools, or lateral movement.

**Severity:** Info

**Impact:** May be legitimate admin or automation activity. Unexpected processes warrant follow-up for credential misuse; do not treat a single event as proof of compromise.

**Consider:**

- Inspect ProcessName, Subject, and TargetUserName together
- Allowlist maturity varies by estate; tune before raising severity

Low severity by design: the reason token is the durable signal on this row, not the band. Pivot
on the reason and read the calling process, rather than filtering by severity.

## `firewall_rule_changed`

A Windows Firewall rule or related policy was created, changed, deleted, enabled, or disabled. This Security-channel copy fires when that audit subcategory is enabled.

**Severity:** Warning

**Impact:** What traffic is allowed or blocked can change. Unexpected opens can expose services; unexpected closes can break apps.

**Consider:**

- Pivot on RuleName / RuleId and Subject
- Prefer the Firewall operational channel when Security auditing is off

## `firewall_service_stopped`

The Windows Firewall service or driver stopped. Host network filtering may be down until it recovers.

**Severity:** Warning

**Impact:** Packet filtering and some connection protections are unavailable while stopped. Unexpected stops can expose the host or hide lateral movement.

**Consider:**

- Confirm whether stop was planned maintenance
- Check for paired start events and adjacent rule changes

## `group_member_added`

A member was added to a security-enabled group. Adds to privileged groups (Administrators, Domain Admins, and similar) carry the highest band, because they grant rights nothing takes back on its own.

**Severity:** Error (privileged group) / Notice (any other security group)

**Impact:** The member gains every right the group carries, immediately and until somebody reverses the membership. A privileged-group add can grant code-execution or broad data-access equivalence.

**Consider:**

- The group is the target (kind group): every change to it is one target.id query
- The added principal is the member family; group-in-group nesting reads member.kind
- Locale-safe: the privilege test uses SID/RID, not the group display name

## `group_member_removed`

A member was removed from a security-enabled group. Removals from privileged groups carry a higher band than ordinary group churn, because losing the last administrator or leaving Protected Users weakens the host in ways nothing else reports.

**Severity:** Warning (privileged group) / Notice (any other security group)

**Impact:** The member loses every right the group carried. A privileged removal can leave a machine with nobody able to administer it, or strip an account of the credential protections it relied on.

**Consider:**

- The group is the target (kind group): every change to it is one target.id query
- The removed principal is the member family; group-in-group nesting reads member.kind
- Scheduled deprovisioning produces this row too; the event cannot tell it from tampering

## `group_membership_changed`

A security group was created, deleted, or changed (scope, type, or attributes). Changes to privileged groups (Administrators, Domain Admins, and similar) carry a higher band. Member adds and removals are their own reasons: group_member_added and group_member_removed.

**Severity:** Warning (privileged group) / Notice (any other security group)

**Impact:** What the group grants changes everywhere it is referenced, for every member at once. A deleted operator group revokes rights across every account that held them through it.

**Consider:**

- The group is the target (kind group): every change to it is one target.id query
- config_change.action carries created/deleted/updated for the lifecycle direction
- Locale-safe: privilege test uses SID/RID, not group display name

## `guest_account_sign_in`

The built-in guest account signed in successfully. Windows disables that account by default, so a sign-in on it means somebody enabled it.

**Severity:** Notice

**Impact:** An account with no password and no owner can reach this machine. Whether that matters depends on what it can reach, which the sign-in type and the session on this row are the start of answering.

**Consider:**

- Check whether the account was enabled deliberately: kiosk and lab builds do this on purpose
- A network sign-in over the legacy file-sharing package is usually guest fallback from an older storage or sharing target rather than somebody sitting at the machine

Guest is a real account with a fixed allocation, and it is not the anonymous well-known identity
that the identity-less sign-in surfaces cover: those name the absence of a principal, this names
a principal that exists and is normally switched off.

## `insecure_boot_config`

The host booted with insecure Boot Configuration Data flags (test signing, kernel debug, or integrity checks disabled). The boot chain may accept unsigned or debugger-attached code.

**Severity:** Warning

**Impact:** Kernel integrity guarantees are weakened until the flags are cleared and the host reboots cleanly. Treat as a standing security-posture issue, not a one-shot exploit proof.

**Consider:**

- Confirm whether test-signing or kernel debugging is expected on that host class
- Remediate BCD flags, then verify on next boot

Flag names ride the message kv tail (InsecureBootFlags) when labeled.

## `kerberos_preauth_failed`

Kerberos pre-authentication failed at the domain controller. The decoded reason is on the line, so a wrong password reads differently from a disabled account or a clock that has drifted.

**Severity:** Warning (account state or broken infrastructure) / Notice (wrong password, unknown client, undecoded)

**Impact:** Authentication to the domain is failing for that principal from the reported client address. Can precede account lockout.

**Consider:**

- Join IpAddress to lockout CallerComputerName when both fire
- Group by the cause token before reading volume: one cause is usually most of it

## `kerberos_rc4_ticket`

A Kerberos service ticket used weak RC4 encryption for a user-backed service principal. Often a credential-theft / downgrade signal when unexpected.

**Severity:** Warning

**Impact:** Ticket material may be easier to crack offline (kerberoasting). Indicates weak crypto still accepted for that SPN.

**Consider:**

- Confirm ServiceName is unexpected for RC4 in your estate
- Prefer AES-only policy for service accounts where feasible

## `kerberos_ticket_failed`

A Kerberos ticket request, service-ticket request or renewal was denied. The reason the domain gave is on the line, and the variant says which of the three operations failed.

**Severity:** Warning (account state or broken infrastructure) / Notice (wrong password, unknown principal, expired, undecoded)

**Impact:** The principal cannot obtain or renew Kerberos tickets for the reported service, which blocks domain-authenticated access until the cause is fixed.

**Consider:**

- Group by the cause token first: one cause is usually most of the volume
- On the service-ticket variant, group by the service principal: a decommissioned service shows up as one name repeating
- Confirm the host is a domain controller or ticket-issuing authority before over-weighting volume

## `logon_failed`

A sign-in attempt failed. Account-state failures (disabled, locked, expired, denied by policy) are more actionable than a single bad password.

**Severity:** Warning (account-state) / Notice (other) / Verbose (credential-less probe)

**Impact:** User or service may be unable to authenticate. Repeated failures can precede lockout; source IP and workstation identify where attempts originate.

**Consider:**

- Decode Status/SubStatus for the failure cause
- Pivot on TargetUserName, IpAddress, and WorkstationName
- A lone mistyped password is common; look for bursts before treating as attack

Auth semantics: the interesting principal is the Target (who failed to authenticate),
not the Subject (often NULL/SYSTEM on network failures). The Target is therefore the
curated actor on this id; when the Subject names a real account it is the calling
context and rides running_as, so its presence says the attempt came from somewhere
other than the failing principal.

## `logon_right_granted`

A system logon right (interactive, network, batch, service, or remote desktop sign-in, or one of their deny counterparts) was granted to a principal in local security policy.

**Severity:** Notice

**Impact:** The set of principals allowed to sign in to this machine, and by which path, widened. A grant of remote or service sign-in rights to an unexpected principal is a persistence surface.

**Consider:**

- The modified principal is the target; built-in group SIDs are the common form
- The decoded right rides inline; an undecoded value means the raw constant is in event_data
- Boot-time runs by SYSTEM are routine policy application, not an administrator acting

## `logon_right_removed`

A system logon right (interactive, network, batch, service, or remote desktop sign-in, or one of their deny counterparts) was removed from a principal in local security policy.

**Severity:** Notice

**Impact:** The set of principals allowed to sign in to this machine narrowed. A service or scheduled job relying on the removed right will fail its next sign-in; a removed deny right silently widens access.

**Consider:**

- The modified principal is the target; built-in group SIDs are the common form
- The decoded right rides inline; an undecoded value means the raw constant is in event_data
- Removing a deny_* right WIDENS access even though the event reads as a removal

## `network_share_added`

A new network share was created on the host.

**Severity:** Warning

**Impact:** Remote clients may read or write the shared path. Unexpected shares are a common persistence and data-exposure path.

**Consider:**

- Inspect ShareName, ShareLocalPath, and Subject
- Confirm the share is expected inventory for that host role

## `nps_access_denied`

Network Policy Server denied a connection request. The decoded decision is on the line, so a wrong password reads differently from a request that matched no policy at all.

**Severity:** Warning (policy or infrastructure defect) / Notice (credentials, account state, undecoded)

**Impact:** The client did not gain network access through RADIUS. Repeated denials can lock users out of VPN or wireless access.

**Consider:**

- Group by the decision token before reading volume: one decision is usually most of it
- Grants (6272) can mask MFA-extension denials upstream; do not treat grant-only as proof of MFA success
- Rows with no decision token still carry the raw code in the tail and in the field, so they stay countable

## `nps_lockout`

Network Policy Server locked an account after repeated failed authentication attempts, so the account cannot authenticate through RADIUS until the lockout clears.

**Severity:** Error (privileged account) / Warning

**Impact:** The user cannot authenticate through the network policy plane until unlock or lockout expiry. Can block VPN or wireless access even when the directory account looks healthy.

**Consider:**

- Join to the directory lockout and to the denials on the same principal inside the window
- Identify the network access server generating the failures, not only the locked account

## `nps_request_discarded`

Network Policy Server discarded a connection request without processing it, which is different from denying one: the request never reached a policy decision.

**Severity:** Warning

**Impact:** The client did not authenticate. Discard storms usually mean a mismatched RADIUS shared secret, an unregistered network access server, or malformed requests.

**Consider:**

- Group by the origin host first: a discard storm from one client is a configuration fix, not a user problem
- Check the RADIUS client definitions and the shared secret before looking at policies

A decision code this module does not decode renders no token, and the raw value still reaches the
tail and the field, so those rows stay countable.

## `ntlm_validation_failed`

NTLM credential validation failed for an account. Can appear on workstations (local accounts) as well as domain controllers, and the decoded reason is on the line.

**Severity:** Warning (account state) / Notice (wrong password, unknown username, undecoded)

**Impact:** Sign-in using NTLM is failing for that account from the reported workstation, which blocks access until credentials or account state are fixed.

**Consider:**

- Use Workstation as the client to investigate
- Group by the cause token before reading volume: one cause is usually most of it

## `principal_renamed`

A security principal was renamed. The identifier is unchanged, so events before and after this row describe the same principal under two different names.

**Severity:** Notice for a rename that changed the name; Debug when the old and new names are identical

**Impact:** Reports, dashboards and saved queries keyed on the NAME stop matching the principal after this point, while anything keyed on the identifier is unaffected. Renaming a well-known account is also a recognized way to make a privileged identity harder to spot by name.

**Consider:**

- The old and new names ride the event; join on the identifier rather than the name across it
- A rename of a built-in or privileged principal is worth confirming against the request for it

The id covers any SAM principal, groups included, so read the principal class off the event
rather than assuming a user account.

## `psdirect_handshake_probe`

Hyper-V opened a PowerShell Direct channel to a guest virtual machine. The legacy handshake negotiates through the sign-in path, so Windows records it as a failed sign-in, but no account was involved and no action is needed.

**Severity:** Debug

**Impact:** None. The channel negotiation is how the host reaches a guest for management; the row exists so the negotiation is datable, not because anything is wrong. It appears on hypervisors with guests that use the legacy handshake and stops when those guests move to the modern one.

**Consider:**

- Read these rows as hypervisor-to-guest channel activity, not as sign-in failures
- Exclude them before counting failed sign-ins on a Hyper-V host

The account name on these rows is a fixed protocol constant, not a principal, and the domain
field carries handshake bytes rather than a domain name. Neither is a value to pivot on.

## `registry_value_changed`

An audited registry value was created, modified, or deleted. These events appear only where a SACL and the registry audit subcategory are aimed at that object.

**Severity:** Warning

**Impact:** Host configuration under that key changed. Persistence, policy, and credential material can live in registry values; unexpected edits deserve review of ObjectName and value name.

**Consider:**

- Use ObjectName, ObjectValueName, and ProcessName
- Do not expect Old/New value contents in curated fields

## `replay_attack_detected`

Windows reported a Kerberos authentication replay. Rare; treat as high-signal even as a single event.

**Severity:** Error

**Impact:** Credentials or tickets may be reused by an attacker. Investigate immediately; do not assume compromise is proven from this event alone.

**Consider:**

- Correlate time skew, duplicate authenticators, and the Subject fields
- Check for concurrent lateral movement or ticket anomalies on the same principals

One event is enough to act on. The event reports a detected replay; it does not show that any
access succeeded.

## `scheduled_task_changed`

A scheduled task was created, deleted, updated, or disabled. Content changes are louder than a lone disable; re-enable alone is not labeled here.

**Severity:** Warning (create/delete/update) / Info (disable)

**Impact:** Tasks can run code on a schedule or at logon. Unexpected creates or content edits are a common persistence path; disables can hide monitoring jobs.

**Consider:**

- Pivot on TaskName and Subject
- Task XML stays in the raw payload; do not expect it as a curated field

config_change.action reads updated on the modification id and created or deleted on the ids that
name those directions, so pivot on the action rather than assuming one value.

## `service_installed`

A Windows service was installed. This Security-channel event appears when service-install auditing is enabled; the System channel often carries the same fact by default.

**Severity:** Notice

**Impact:** A new service can run code at boot or on demand under a chosen account. Unexpected installs are a common persistence path.

**Consider:**

- Inspect the service name, the installed image path, and the account it runs as together
- Cross-check System SCM install events when Security auditing is off

## `sid_history_changed`

SID History was added to an account, or an attempt to add it failed. Rare outside migrations; often a privilege-inheritance or persistence tell.

**Severity:** Serious (added) / Error (failed attempt)

**Impact:** The account may inherit rights from another domain SID. Treat unexpected adds as high-signal until migration context is confirmed.

**Consider:**

- Confirm whether a domain migration or SID-history tooling is in progress
- Inspect Subject and TargetUserName together

One event is enough to act on. The event proves the SID History write or the failed attempt; it
does not show that the inherited rights were used.

## `special_group_logon`

A logon matched an administrator-configured special-groups watchlist. These events exist only where that watchlist is enabled.

**Severity:** Warning

**Impact:** A watched principal or group membership appeared in a logon. Investigate against the local special-groups policy to see why it tripped.

**Consider:**

- Confirm the special-groups list on the host before treating volume as attack
- Use TargetUserName and ParticularLogonId when present

## `system_time_changed`

The system clock was changed. Routine time-service adjustments are quiet; changes from other processes are treated as integrity events.

**Severity:** Warning (non-time-service) / Debug (routine time service)

**Impact:** Clock skew can break Kerberos and confuse timelines used in investigation. Unexpected non-service changes deserve immediate review.

**Consider:**

- Inspect the process path and the actor together
- previous_time and new_time carry the decoded before and after clock values in UTC
