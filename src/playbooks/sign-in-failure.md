---
index: Sign-in failure
aliases:
  - label: User cannot sign in
  - label: Account locked out
  - label: Password rejected or expired
  - label: Trust relationship between this workstation and the domain failed
  - label: Windows Hello PIN stopped working
  - label: Cannot sign in after a username or email change
  - label: Remote Desktop sign-in denied
---

# Sign-in failure

**Use when:** a user cannot sign in at the console, at the lock screen, over Remote Desktop or with a PIN, face or smart card, or Windows says the account is disabled, locked, expired or the trust relationship failed.

**Trigger.** "User can't sign in", "it says my account is disabled", "locked out again", "my password stopped working", "PIN not available", "trust relationship failed", "can't RDP in", "worked until Wednesday".

**Accuracy.** The cause of a sign-in failure is on the failing component's own row: the Security 4625 status and substatus, the domain controller's 4771 or 4776, or the Microsoft Entra AADSTS code. Read that, not the user's wording and not a neighbor.
A status code translated onto a different component's row is not the cause. The Entra plugin (CloudAP) turns the AADSTS code into an NTSTATUS for Windows, and the translation is lossy: AADSTS50034 (the user does not exist in the directory) arrives as 0xC0000072 (account disabled), so `sparklogs.result.code_name` (LQL) `STATUS_ACCOUNT_DISABLED` (other) on an `entra_sign_in_failed` (value) row can describe a user who was renamed or deleted. Trust the AADSTS code.
Read the whole attempt before concluding: every Entra row of one attempt shares one correlation ID, and a Security failure has its neighbors within about a minute.
A failure is one device's view. The directory (Entra sign-in logs, domain controller logs) holds the authoritative view when the device never reached it, and an attempt for an unresolvable user is not always in the Entra sign-in logs at all. When the logs disagree with the device, the device's record of what it sent is the evidence.
An empty result is not health: no 4625 means the sign-in was not attempted here, failed before Windows audited it (a PIN or key fault, a Hello sign-in that never reached the credential check), or the channel was not collected. Check the agent's feed health for `win.eventlog.security` (value) and `win.eventlog.identity_security` (value).
A single wrong password is a user event. A run of the same failure, or a different cause after a change, is the ticket.

## First split: how the device is joined, how the user signed in

Join state decides which authority answers, so it decides which rows exist.

| Join state | Who checks the credential | Where the failure shows |
|---|---|---|
| On-premises domain (`ad` (other)) | A domain controller (Kerberos, NTLM fallback) | Security 4625 on the device; 4771, 4776, 4740 on the domain controllers; NETLOGON in System |
| Hybrid (`hybrid` (other)) | A domain controller, or Entra for Hello and cloud trust | Both of the above; the AAD plugin rows in `win.eventlog.identity_security` (value) |
| Entra-only (`entra` (other)) | Entra ID, through the plugin | AAD Operational rows (`entra_sign_in_failed` (value), `entra_token_acquisition_failed` (value)) and 4625 with the translated status; no domain controller rows |
| Workgroup or local account (`workgroup` (other)) | The device's own account database | 4625 only, with the device name as the account domain |

Read the join type from the device's current state, `sparklogs.data.system_info.domain_join_type` (LQL), and the dated join changes from `domain_membership_changed` (value).
The Entra plugin is present on Entra-only and hybrid devices. A domain-only device with no AAD rows, or AAD 1241 "On-prem configuration is missing" on an Entra-only device, is normal.

How the sign-in happened shows on the 4624 and 4625 rows:

| Sign-in | Witness |
|---|---|
| Console | `win.eventlog.security.logon_type_name` (LQL) `logon_interactive` (value), type 2 |
| Unlock | `logon_unlock` (value), type 7; Winlogon 2 with no profile load after it |
| Cached credential (no domain controller or Entra reachable) | `logon_cached_interactive` (value), type 11; `logon_cached_unlock` (value), type 13 |
| Remote Desktop | `logon_remote_interactive` (value), type 10; with NLA, a failed credential is written as type 3 (network), because NLA checks it before the session exists |
| Password, PIN, face, fingerprint | The 4624/4625 does not say which. A PIN or Hello failure usually leaves no 4625 and no AADSTS: look for Hello and key rows, and ask whether the password works |
| Smart card | `kerberos_smartcard_cert_missing` (value) on the controller, status `smartcard_wrong_pin` (value) |
| Local or Microsoft account | `sparklogs.actor.domain` (LQL) is the device name for a local account; the authentication package (`win.eventlog.security.auth_package` (LQL)) is `negotiate` (other) or `ntlm` (other) rather than `kerberos` (value) |

## Feeds

| Evidence | Feed (`subsource` (LQL)) | Reason and fields |
|---|---|---|
| Failed sign-in on the device | `win.eventlog.security` (value) | `sign_in_failed` (value) (4625): `win.eventlog.security.status` (LQL), `win.eventlog.security.substatus` (LQL), `win.eventlog.security.status_meaning` (LQL), `win.eventlog.security.logon_type_name` (LQL), `win.eventlog.security.auth_package` (LQL), `win.eventlog.security.workstation` (LQL), `sparklogs.origin.ip` (LQL); the failing account is `sparklogs.actor.name` (LQL), except on an Entra unlock or cached sign-in, where the 4625 names the machine account and no target user: the user is then on the Entra rows of the same attempt |
| Lockout, on the domain controller | `win.eventlog.security` (value) | `account_locked_out` (value) (4740): `sparklogs.target.name` (LQL), `win.eventlog.security.caller_computer` (LQL) |
| Kerberos and NTLM checks on the controller | `win.eventlog.security` (value) | `kerberos_preauth_failed` (value) (4771), `kerberos_ticket_failed` (value) (4768, 4769), `ntlm_validation_failed` (value) (4776), each with `win.eventlog.security.status_meaning` (LQL) |
| Entra sign-in and token failures | `win.eventlog.identity_security` (value) | `entra_sign_in_failed` (value) with variants credential, account_not_found, account_state, unreachable, unexplained; the code in `win.eventlog.identity_security.aadsts_code` (LQL), the UPN the device sent in `sparklogs.actor.name` (LQL) (`sparklogs.actor.type` (LQL) `upn` (value), the same actor fields the Security rows use), `win.eventlog.identity_security.credential_type` (LQL), a number Windows writes that SparkLogs does not decode; `entra_sign_in_failed` (value) comes from the sign-in's own token diagnostic (1250 with a nonzero result) and the translated 1085 and 1160; `entra_token_acquisition_failed` (value) covers the OAuth reply to any token request, silent refreshes included (1081), with variants such as user_identity_changed, account_not_found, account_state, device_key, interaction_required, and carries the same code as `win.eventlog.identity_security.aadsts_code` (LQL); the whole attempt by `win.eventlog.identity_security.correlation_id` (LQL) |
| Hello and key faults | `win.eventlog.identity_security` (value) | `windows_hello_key_registration_failed` (value), `windows_hello_provisioning_blocked` (value), `crypto_key_operation_failed` (value) with `win.eventlog.identity_security.crypto_provider` (LQL) |
| Device registration | `win.eventlog.identity_security` (value) | `device_registration_failed` (value) |
| Secure channel, trust and clock | `win.eventlog.system` (value) | `domain_secure_channel_failed` (value) (5719; variants dc_unreachable, trust_broken), `kerberos_cert_domain_unresolved` (value), `time_sync_failed` (value) |
| Clock on the device | `sparklogs.device.state` (value), `win.eventlog.security` (value) | `os_clock_drift` (value), `system_time_changed` (value) with `win.eventlog.security.previous_time` (LQL) and `win.eventlog.security.new_time` (LQL) |
| Local administrator password escrow | `win.eventlog.identity_security` (value) | `laps_password_backup_failed` (value) |

Field and reason meaning: `feeds/win.eventlog.security/reasons.md`, `feeds/win.eventlog.identity_security/reasons.md`, `feeds/win.eventlog.system/reasons.md`. Status tables: `feeds/win.eventlog.security/enums.md` (**win_status_codes**, **kerberos**).
The AAD plugin's own rows that are not curated (1025 the HTTP exchange, 1081 the OAuth error text, 1250 the token diagnostic) carry `event_data.CorrelationID` (LQL), `event_data.ErrorDescription` (LQL), and on 1250 `event_data.UserIdentity` (LQL), `event_data.CredentialType` (LQL) and `event_data.Result` (LQL). A 1081 is the token-side witness of an attempt, and the sign-in itself is the nonzero 1250 (and 1085, 1160 for the translated status): join them by the correlation ID, and do not read a 1081 alone as a failed sign-in, because a silent refresh writes it too.

## Read the attempt first

Find the failures on the device, with the cause beside each:

```lql
source = "<host>" AND sparklogs.reason in (sign_in_failed, entra_sign_in_failed, account_locked_out, kerberos_preauth_failed, ntlm_validation_failed)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `win.eventlog.security.status_meaning` (LQL) and `win.eventlog.identity_security.aadsts_code` (LQL). Take the cause that is on the failing component's own row.

Then read the whole Entra attempt by its correlation ID (take the ID from any row of the failure):

```lql
source = "<host>" AND win.eventlog.identity_security.correlation_id = "<id>"
```

Read it oldest first: the HTTP 400 to the token endpoint (1025), the OAuth error with the AADSTS text (1081, the token side), the plugin's translated status (1155, 1085, 1160), and on 1250 the sign-in's own diagnostic: the UPN the device sent and the result. Read the 1250's fields, not its message text: Windows swaps the HTTP status and method labels in the message. The 1081 text hides the UPN (`{EUII Hidden}`); only 1250 carries it.
Rows collected before pack 1.12.14 carry none of the curated Entra fields above: the sign-in rows read variant unexplained, with no AADSTS code, no actor and no correlation ID on 1025, 1081 or 1250. On those rows the raw fields are the only route:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-AAD" AND event_id in (1025, 1081, 1250) AND event_data.CorrelationID = "<id>"
```
<!-- confirmed with data on 2026-11-27 -->

Everything on the device within about a minute of the failure, for the neighbors (a Netlogon fault, a time step, a TPM or key error, a Winlogon result):

```lql
source = "<host>" AND subsource in (win.eventlog.security, win.eventlog.system, win.eventlog.identity_security) AND severity >= notice
```

Set the window to a minute either side of the failed attempt.

## On-premises domain

The Security 4625 on the device names the cause in `win.eventlog.security.status_meaning` (LQL); `win.eventlog.security.substatus` (LQL) is the real cause when it is not 0x0.

| Cause | Witness | Proves / does not | Usual fix, and what to tell the ticket |
|---|---|---|---|
| Wrong password | `bad_password` (value), 0xC000006A; 4771 `preauth_failed` (value), 0x18 on the controller | The user typed a wrong or stale password. Not a locked account, and not proof the account's real password changed | Retype or reset. If it recurs without the user typing: stale credentials (below) |
| Unknown user | `unknown_username` (value), 0xC0000064; 4768 `client_unknown` (value), 0x6 | The name does not exist in that domain. Check a renamed account, the wrong domain prefix or a typed UPN | Correct the name; for a rename, sign in with the new name |
| Locked out | `account_locked_out` (value), 0xC0000234; 4740 on the controller; 4771 `client_revoked` (value), 0x12 | The account is locked. The 4740 names the machine that sent the bad attempts | Unlock, then find the source. A lockout that returns in minutes is a stale credential |
| Password expired or must change | `password_expired` (value), 0xC0000071; `password_must_change` (value), 0xC0000224; 4771 `key_expired` (value), 0x17 | The password is past its age or flagged to change at next sign-in | Change it on a domain-reachable connection (below for VPN) |
| Disabled | `account_disabled` (value), 0xC0000072; 4771 0x12 | The account is disabled in the directory. On an Entra sign-in this status can be a translation: check the AADSTS first | Re-enable if intended; confirm a leaver was not the cause |
| Expired account | `account_expired` (value), 0xC0000193 | The account's end date passed | Extend the account |
| Logon hours or workstation restriction | `outside_logon_hours` (value), 0xC000006F; `workstation_not_authorized` (value), 0xC0000070 | Policy on the account, not the password | Change the restriction if wrong |
| Logon type not granted | `logon_right_not_granted` (value), 0xC000015B | The account lacks the right for this sign-in type (for Remote Desktop, not in Remote Desktop Users, or the right denied by policy) | Grant the right or the group; check Group Policy `playbooks/group-policy.md` |
| Authentication firewall | `auth_firewall_blocked` (value), 0xC0000413 | A cross-forest policy refused the account | Directory owner |
| No domain controller | `no_logon_servers` (value), 0xC000005E; `domain_secure_channel_failed` (value) variant dc_unreachable | The device could not reach a controller: off the network, VPN not up, DNS not pointed at the domain. The credential was not tested | Fix the network (`playbooks/network-connectivity.md`); until then a cached sign-in works if the user had one |
| Trust relationship broken | `domain_secure_channel_failed` (value) variant trust_broken (5719 with 1789, 1787, 1786, 5 or 1396); on the domain controller, NETLOGON 5723 (no trust account for the computer) or 5805 (the computer's session setup was refused), read by `provider_name` (LQL) and `event_id` (LQL); a 4625 with 0xC000018D, a status the decode table lacks (`win.eventlog.security.status_meaning` (LQL) is absent, read `win.eventlog.security.status` (LQL)); "The trust relationship between this workstation and the primary domain failed" | The machine account password no longer matches the directory's. Common after a snapshot restore or image rollback, a long-powered-off device, or a duplicate computer name. No account is at fault | Test-ComputerSecureChannel -Repair, or rejoin the domain, as a domain admin. Tell the ticket the device, not the user, lost its trust |
| Clock skew | `clock_skew` (value) on 4625 (0xC0000133), 4771 or 4769 (0x25); `time_sync_failed` (value); `os_clock_drift` (value); `system_time_changed` (value) with a large gap between `win.eventlog.security.previous_time` (LQL) and `win.eventlog.security.new_time` (LQL) | The device and the controller differ by more than five minutes. Kerberos refuses; a device that lost its time (a dead CMOS battery, a restored VM) is the usual source | Fix the time source and sync (w32tm /resync); replace the battery if the clock resets at every boot |
| A service or scheduled task with a dead account | 4625 with `win.eventlog.security.logon_type_name` (LQL) `logon_service` (value) or `logon_batch` (value), and `account_disabled` (value), `name_translation_failed` (value) (0xC0000073, the account no longer exists), `bad_password` (value) or `account_restriction` (value) | A service or task is configured to run as an account that was disabled, deleted or had its password changed. It retries on its own, often hundreds of times an hour, and can lock the account. Nobody is typing | Find the service or task by `sparklogs.process.path` (LQL) and the account name; set it to a working account or remove it |
| Account restriction | `account_restriction` (value), 0xC000006E, with the substatus naming which | A restriction on the account other than hours or workstation, for example a blank password used over the network | Read the substatus; change the account or the policy |
| Kerberos fell back to NTLM | `ntlm_validation_failed` (value) (4776), `ntlm_authentication_used` (value) | NTLM was used, often because Kerberos could not find a service name or controller. Not itself a failure | Look for the Kerberos failure beside it |

Lockout source. The 4740 names `win.eventlog.security.caller_computer` (LQL), a machine name that can differ from that device's `source` (LQL). Pull that machine's failures for the account and group by `sparklogs.process.path` (LQL): a service, a mapped drive and a scheduled task are three different fixes. Other places holding an old password: phones and tablets on mail, mapped drives and saved Credential Manager entries, services, scheduled tasks, RDP sessions left open. `feeds/win.eventlog.security/recipes.md` (**Find the machine holding the stale credential**); `themes/windows-security-and-audit.md` (**Sign-in failures and lockouts**).

```lql
sparklogs.reason in (account_locked_out, kerberos_preauth_failed) AND (sparklogs.target.name = "<sam>" OR sparklogs.actor.name = "<sam>")
```

Group by `sparklogs.reason` (LQL), `win.eventlog.security.caller_computer` (LQL), `sparklogs.origin.ip` (LQL) and `win.eventlog.security.status_meaning` (LQL). Run it on the organization and over the window of the lockouts; the controllers are the only source of 4740 and 4771.

Expired password over VPN. The user signs in with the cached credential (`logon_cached_interactive` (value)) while off the network, and Windows only learns of the expiry when a controller is reachable. A cached sign-in never surfaces the expiry on the device: the symptom is network resources prompting, beside `domain_secure_channel_failed` (value) variant dc_unreachable. The change must happen with the VPN up: from the lock screen on a VPN-before-logon client, or Ctrl+Alt+Del then Change a password once connected. A cached sign-in succeeds with an expired password until the cache is refreshed, and fails with `password_expired` (value) when a controller does answer.

## Hybrid

Everything in the previous section applies to the domain half. The cloud half adds:

| Cause | Witness | Proves / does not | Fix |
|---|---|---|---|
| No primary refresh token | `windows_hello_provisioning_blocked` (value) with `win.eventlog.identity_security.whfb_primary_refresh_token` (LQL) No; `entra_token_acquisition_failed` (value) | The user has no cloud token, so cloud-dependent sign-in and Hello do not complete. dsregcmd /status shows AzureAdPrt NO | Fix the underlying token failure; sign in again with line of sight to Entra |
| Hello key trust or cloud Kerberos trust cannot get a ticket | `kerberos_cert_domain_unresolved` (value) (System, Security-Kerberos event 11); a PIN sign-in that completes and then network resources prompt | The sign-in worked locally but there was no controller or trust to issue a Kerberos ticket. On a cloud-only device this record is routine | Bring the device onto the corporate network or VPN; check cloud Kerberos trust configuration; a KDC without a certificate is `kerberos_smartcard_cert_missing` (value) on the controller |
| Password changed on-premises, not yet synced | `entra_sign_in_failed` (value) with `win.eventlog.identity_security.aadsts_code` (LQL) 50126 (variant credential) or 50173 | The cloud still holds the old password or token. The domain half works with the new one, the cloud half with the old | Wait for the directory sync, or sign in once on the network; Entra Connect is off the device |
| Device not hybrid-joined, or registration failing | `device_registration_failed` (value); dsregcmd /status AzureAdJoined NO | The device has no directory identity, so device-based Conditional Access and PRT do not apply | Hybrid join prerequisites: a domain controller, name resolution, the service connection point |

## Entra-only

The plugin turns the AADSTS code into an NTSTATUS for Windows, so a Security 4625 here carries a translated status. Read `win.eventlog.identity_security.aadsts_code` (LQL) and the variant:

| AADSTS | Variant | Meaning | What to tell the ticket |
|---|---|---|---|
| 50034 | account_not_found | The UPN the device sent does not exist in the directory: a renamed or deleted user, a UPN change, a typo. Read the account the device sent in `sparklogs.actor.name` (LQL) and compare it with the user's current UPN (from the ticket, or the account on the last 4624 that succeeded) | Sign in with the new UPN ("Other user"); see the rename case below |
| 50057 | account_state | Account disabled | Administrator re-enables or confirms an intended disable |
| 50053 | account_state | Locked by smart lockout. It clears after the lockout period; repeated bad passwords from anywhere reset the timer | Wait, or an administrator unblocks; find who keeps guessing |
| 135011, 130007 | account_state | The device object is disabled in Entra | Re-enable or re-register the device |
| 50155 | unexplained | Device authentication failed: the device object was deleted or disabled in Entra, or the device certificate no longer matches it | Check the device in Entra and dsregcmd /status; re-register the device if its object is gone |
| 50126 | credential | Wrong password for a known user | Reset or retype |
| 50173, 50132 | unexplained | The password or session was changed or revoked elsewhere | Sign in again with the new password |
| 50076, 50079, 50074 | unexplained | Multi-factor authentication required or not satisfied | The user enrolls or completes MFA; not a device fault |
| 53003 | unexplained | Blocked by Conditional Access (location, device compliance, risk). Common on an unmanaged or non-compliant device | The tenant's Conditional Access sign-in log names the policy; the device cannot |
| 70043, 700082 | unexplained | Sign-in frequency or an expired refresh token: a refresh failure, not a hard sign-in failure | The user signs in again |
| none, network code | unreachable | The device could not reach Entra; with a cached credential it signs in anyway | `playbooks/network-connectivity.md` |
| any other | unexplained | Not decoded | Look up the code in Microsoft's AADSTS list; use the correlation ID in the Entra sign-in logs |

Which row carries the variant depends on the record. A nonzero sign-in diagnostic (1250) is entra_sign_in_failed (value): account_not_found, account_state, credential (50126 and the wrong-password status), unreachable, or unexplained for any other code (53003, 50076, 50079, 50074, 50132). The OAuth reply (1081) answers any token request, silent refreshes included, so it is entra_token_acquisition_failed (value): account_not_found (50034), account_state (50057, 50053, 135011, 130007), the refresh and configuration codes (70043, 50173, 700082, 65002, 500014, 500011, 50011, 70011) under their existing variants, and the existing remainder variant for the rest. A 70043 or 50173 alone is a token refresh, not a failed sign-in.

**Renamed or deleted UPN (AADSTS50034).** The Entra object can be the same while its UPN changed; the device still sends the old name.
The precursor on the device is `entra_token_acquisition_failed` (value) variant user_identity_changed, 0x8AA50159 "Key parameter of the user changed, we are resetting the complete context", then a long run of 0xCAA100D8 "login hint doesn't match any WebAccount" (interaction_required, benign by itself). Sign-in often keeps working for days on the cached state.
When the cache goes, every unlock fails: AAD 1025 HTTP 400, the OAuth `invalid_grant` (other) with AADSTS50034 (1081), `sparklogs.actor.name` (LQL) holding the old UPN (from 1250), and the translated 0xC0000072 on 1155, 1085 and 1160 as `STATUS_ACCOUNT_DISABLED` (other). The account is not disabled: AADSTS50057 would be, and it would say so.
Fix: at the sign-in screen choose Other user and enter the new UPN with the password; the profile is the same. Until then reverting the UPN temporarily also works. The tenant's sign-in logs may hold no entry for the attempt: the device's record is the evidence.

**Windows Hello PIN or key broken.** No AADSTS, and the password still works.

| Witness | Meaning | Fix |
|---|---|---|
| `crypto_key_operation_failed` (value) from the TPM-backed provider (`win.eventlog.identity_security.crypto_provider` (LQL)), status 0x80090016 (NTE_BAD_KEYSET), 0x80090030 | The key the PIN protects is gone or the TPM is not ready: a TPM clear, a motherboard or firmware change, a TPM fault. The same status from the software provider is a probe and routine | Remove the PIN in Settings and set it up again (signing in with the password first); `playbooks/tpm-health.md` |
| `windows_hello_key_registration_failed` (value) with `win.eventlog.identity_security.whfb_key_status` (LQL) | Re-enrollment failed after a prerequisite check passed | Same; a no-attestation TPM is a hardware fact, a cancel is a choice |
| `entra_token_acquisition_failed` (value) variant device_key | The device's own key cannot be used | `playbooks/tpm-health.md`; a TPM clear usually also triggers BitLocker recovery: `playbooks/bitlocker-recovery.md` |
| `windows_hello_provisioning_blocked` (value) | Hello never started: a policy, join state, hardware or no PRT; routine over Remote Desktop | Read the prerequisite list on the row |

**Cached sign-in when offline.** `logon_cached_interactive` (value) on 4624 with `entra_sign_in_failed` (value) variant unreachable around it. The credential was not checked, so a password changed elsewhere, a disabled account or a deleted user still signs in until the device reaches Entra. A failure that begins when the device comes online is the cloud's verdict arriving.

**Token prompts and unmanaged devices.** An app that keeps asking for sign-in (Outlook, Teams, OneDrive) is not a Windows sign-in: the same AADSTS codes arrive on `entra_token_acquisition_failed` (value) rows, in `win.eventlog.identity_security.entra_error_message` (LQL), with no 4625. A Conditional Access block (53003) on a device with no Entra registration or no agent-visible AAD rows leaves nothing on the device: the tenant's sign-in log is the only witness, and that gap is the answer, not a quiet device.

## Local accounts

| Cause | Witness | Fix |
|---|---|---|
| Wrong password | 4625 `bad_password` (value), `sparklogs.actor.domain` (LQL) the device name, no domain controller or AAD rows | Reset locally or from another administrator |
| Disabled | `account_disabled` (value) | Enable the account; the built-in Administrator is disabled by default |
| LAPS rotated the password | 4625 `bad_password` (value) for the local administrator, with a LAPS policy on the device. The device does not prove a rotation (the LAPS Operational records are not curated: search the provider Microsoft-Windows-LAPS by text), and `laps_password_backup_failed` (value) says the stored copy may be stale | Read the current password from the directory (Entra or Active Directory); backup failures mean the stored copy may be stale: `feeds/win.eventlog.identity_security/reasons.md` (**laps_password_backup_failed**) |
| Microsoft account instead of local | An account name of the form the user signs in with on a personal device; authentication package not `kerberos` (value) | The Microsoft account's own password, reset online |

## Remote Desktop

| Cause | Witness | Fix |
|---|---|---|
| Not allowed to log on through Remote Desktop | 4625 `logon_right_not_granted` (value), 0xC000015B, `logon_remote_interactive` (value) or `logon_network` (value) with NLA | Add the user to Remote Desktop Users or fix the user right in policy |
| NLA or CredSSP refused | 4625 type 3 from the client's `sparklogs.origin.ip` (LQL) with a credential status; a CredSSP or encryption oracle message on the client | Patch levels differ; fix the client or the policy rather than disabling NLA |
| Wrong password or locked | As on-premises; the origin address is the connecting machine, not the user's | Reset; find the source |
| Many accounts from one address | `sign_in_failed` (value) spread over names from one `sparklogs.origin.ip` (LQL) | Password guessing: block the source, do not unlock accounts |

## Common causes, ranked by how often they turn out to be it

- A password the user changed and a device or service still holding the old one.
- A renamed UPN or email on an Entra user.
- A cached sign-in masking a cloud or domain state until the device is online.
- A broken secure channel on a long-off or restored device.
- A clock that lost time.
- A TPM event that invalidated the Hello key.

## One device, one user, or many

Count the signature over the organization: the same `win.eventlog.identity_security.aadsts_code` (LQL) or the same `win.eventlog.security.status_meaning` (LQL) on many devices at once is a shared cause: a policy, a Conditional Access change, a controller or a time source; on one device it is that device or that user.

```lql
sparklogs.reason in (sign_in_failed, entra_sign_in_failed)
```

Group by `source` (LQL), `win.eventlog.security.status_meaning` (LQL) and `win.eventlog.identity_security.aadsts_code` (LQL).

## What changed before it started

A password reset, a UPN or email change, a new Conditional Access policy, a VM restored from a snapshot, a TPM clear or firmware update, a new VPN client or a Group Policy change just before the first failure: `playbooks/what-changed.md`.

**Not this playbook.** A sign-in that works but is slow, a temporary profile: `playbooks/slow-logon.md`. Group Policy not applying after sign-in: `playbooks/group-policy.md`. Domain controllers disagreeing: `playbooks/directory-replication-failure.md`. Mapped drives or shares that deny access after sign-in: `playbooks/file-share-access.md`.

**When to stop.** The failing row names the code. When the answer lives in the directory (a disabled or deleted user, a Conditional Access policy, MFA, smart lockout, a lockout source on a controller that does not run the agent), report the code, the account the device sent, the time and the correlation ID, and hand off to the Entra sign-in logs, the domain controller's Security log, or dsregcmd /status on the device.

**Off-endpoint** (HM2): Conditional Access and MFA policy, Entra smart lockout, Entra Connect sync, the domain controllers' state and time, and any controller without the agent. The device records what it was told, not why the directory said it.
