<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Expected patterns: `win.eventlog.security`

A curated row renders `[<head>]<headline>[; <bare tokens>] | key=value ...`.
Pattern derivation strips `key=value` pairs by syntax and keeps bare words, so the head, the headline and the tokens ARE the pattern and the tail contributes nothing.

## What this catalog is

It is a DECISION PROCEDURE over pattern strings, not a list of them.
A pattern is expected when it decomposes into one headline below plus a legal value of that surface's slots, taken in the declared order.

Enumerating instead would be worse in both directions.
A slot renders nothing when its decode misses or the payload lacks the field, and the composer skips the slot without reordering, so ABSENT is a legal value of every slot and an enumeration has to multiply by it.
Crossing the vocabularies that way predicts thousands of combinations per surface, most of which cannot physically co-occur, and a catalog that predicts nearly everything makes the drift question vacuous: nothing is ever unexpected, so the alarm never fires.
Enumerating only what can co-occur has the opposite failure: which combinations are physically possible is fixed when the catalog is written, so every honest new combination reads as drift.
The grammar answers exactly the question the drift check asks, and its unexpected set stays meaningful: an unrecognized headline, a token from no declared vocabulary, or tokens out of slot order.

## How to decide

1. Drop a trailing ` |` if present, then split off the tail after it.
2. Match the longest surface head plus headline below that the pattern starts with. No match means the row is uncurated, not that it is unexpected.
3. The remainder is empty (every slot absent) or begins `; ` followed by space-separated tokens.
4. Walk the surface's slots in order, consuming each token with the first slot whose vocabulary contains it. A token no remaining slot accepts, or a slot order violation, is UNEXPECTED.

A surface marked **Pattern stability: none** below is excluded from step 2 entirely.
Its rendered text cannot survive pattern derivation, so a string that appears to carry it is not one of its rows and is filed uncurated.

An unexpected pattern is one of three things, in falling order of likelihood: a curated surface this catalog does not list, a vocabulary that gained a value, or a token rendered from something that is not a closed vocabulary at all. The third is the one that matters.

This module has 66 curated surface(s) and a legal-pattern language of 24391 strings.
That number is why this file is a procedure and not a list.

## Surfaces

`(absent)` is legal in every slot and is not listed per row.

### `account_changed` / `default`

**Renders:** `account_changed: NOTABLE: account attributes changed`

**Event ids:** 4738, 4742

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_created` / `default`

**Renders:** `account_created: NOTABLE: account created`

**Event ids:** 4720, 4741

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_deleted` / `default`

**Renders:** `account_deleted: NOTABLE: account deleted`

**Event ids:** 4726, 4743

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_disabled` / `default`

**Renders:** `account_disabled: NOTABLE: account disabled`

**Event ids:** 4725

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_enabled` / `default`

**Renders:** `account_enabled: NOTABLE: account enabled`

**Event ids:** 4722

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_locked_out` / `default`

**Renders:** `account_locked_out: NOTABLE: account locked out`

**Event ids:** 4740

**Slots:** none. This surface renders exactly one pattern.

### `account_password_change_failed` / `default`

**Renders:** `account_password_change_failed: NOTABLE: self-service password change failed`

**Event ids:** 4723

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_password_reset` / `default`

**Renders:** `account_password_reset: NOTABLE: account password reset by another principal`

**Event ids:** 4724

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `account_password_reset_failed` / `default`

**Renders:** `account_password_reset_failed: NOTABLE: account password reset attempt failed`

**Event ids:** 4724

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `anonymous_remote_logon` / `default`

**When:** The anonymous well-known SID signed in and the event names an endpoint other than the reporting host

**Renders:** `anonymous_remote_logon: NOTABLE: anonymous sign-in from a remote endpoint`

**Event ids:** 4624

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |
| 3 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |
| 4 | `elevated` | `elevated` |

Legal pattern count for this surface: 1170 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `audit_events_dropped` / `default`

**Renders:** `audit_events_dropped: NOTABLE: audit events dropped by the event log transport`

**Event ids:** 1101

**Slots:** none. This surface renders exactly one pattern.

### `domain_policy_changed` / `default`

**Renders:** `domain_policy_changed: NOTABLE: domain account policy changed`

**Event ids:** 4739

**Slots:** none. This surface renders exactly one pattern.

### `event_logging_stopped` / `default`

**Renders:** `event_logging_stopped: event logging service stopped`

**Event ids:** 1100

**Slots:** none. This surface renders exactly one pattern.

### `explicit_credential_use` / `default`

**When:** Caller is not one of {lsass, svchost, winlogon, consent, taskhostw} running from the system directory

**Renders:** `explicit_credential_use: NOTABLE: explicit credentials presented`

**Event ids:** 4648

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `group_member_added` / `default`

**Renders:** `group_member_added: NOTABLE: member added to security group`

**Event ids:** 4728, 4732, 4756

**Slots:** none. This surface renders exactly one pattern.

### `group_member_removed` / `default`

**Renders:** `group_member_removed: NOTABLE: member removed from security group`

**Event ids:** 4729, 4733, 4757

**Slots:** none. This surface renders exactly one pattern.

### `group_membership_changed` / `default`

**Renders:** `group_membership_changed: NOTABLE: security group created, deleted, or changed`

**Event ids:** 4727, 4730, 4731, 4734, 4735, 4737, 4754, 4755, 4758, 4764

**Slots:** none. This surface renders exactly one pattern.

### `guest_account_sign_in` / `default`

**Renders:** `guest_account_sign_in: NOTABLE: guest account signed in`

**Event ids:** 4624

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |
| 3 | `elevated` | `elevated` |

Legal pattern count for this surface: 130 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `kerberos_preauth_failed` / `default`

**Renders:** `kerberos_preauth_failed: NOTABLE: Kerberos pre-authentication failed`

**Event ids:** 4771

| # | Slot | Legal values |
|---|---|---|
| 1 | `kerberos_cause` | `client_unknown` `service_unknown` `principal_not_unique` `null_key` `policy_restriction` `bad_option` `etype_unsupported` `preauth_type_unsupported` `client_revoked` `key_expired` `preauth_failed` `integrity_check_failed` `ticket_expired` `replay_detected` `clock_skew` `message_modified` `generic_error` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 162 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `kerberos_rc4_ticket` / `default`

**When:** 4769 Audit Success, etype RC4 (0x17/0x18), service not machine account or krbtgt

**Renders:** `kerberos_rc4_ticket: NOTABLE: Kerberos service ticket used weak encryption`

**Event ids:** 4769

**Pattern stability: none.** The rendered text carries `rc4`: a rendered word with a digit in it is variable data to pattern derivation, which replaces it with a placeholder.
The text above therefore never appears verbatim in a derived pattern: this surface is anonymous in pattern space, so match its rows by reason, never by pattern.

### `kerberos_ticket_failed` / `service_ticket`

**When:** Audit Failure on 4769: access to one named service principal was refused

**Renders:** `kerberos_ticket_failed: NOTABLE: Kerberos service ticket denied`

**Event ids:** 4768, 4769, 4770

| # | Slot | Legal values |
|---|---|---|
| 1 | `kerberos_cause` | `client_unknown` `service_unknown` `principal_not_unique` `null_key` `policy_restriction` `bad_option` `etype_unsupported` `preauth_type_unsupported` `client_revoked` `key_expired` `preauth_failed` `integrity_check_failed` `ticket_expired` `replay_detected` `clock_skew` `message_modified` `generic_error` |

Legal pattern count for this surface: 18 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `kerberos_ticket_failed` / `tgt_request`

**When:** Audit Failure on 4768: the request for a ticket-granting ticket was denied

**Renders:** `kerberos_ticket_failed: NOTABLE: Kerberos TGT request denied`

**Event ids:** 4768, 4769, 4770

| # | Slot | Legal values |
|---|---|---|
| 1 | `kerberos_cause` | `client_unknown` `service_unknown` `principal_not_unique` `null_key` `policy_restriction` `bad_option` `etype_unsupported` `preauth_type_unsupported` `client_revoked` `key_expired` `preauth_failed` `integrity_check_failed` `ticket_expired` `replay_detected` `clock_skew` `message_modified` `generic_error` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 162 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `kerberos_ticket_failed` / `ticket_renewal`

**When:** Audit Failure on 4770: a live session failed to extend an existing ticket

**Renders:** `kerberos_ticket_failed: NOTABLE: Kerberos ticket renewal denied`

**Event ids:** 4768, 4769, 4770

| # | Slot | Legal values |
|---|---|---|
| 1 | `kerberos_cause` | `client_unknown` `service_unknown` `principal_not_unique` `null_key` `policy_restriction` `bad_option` `etype_unsupported` `preauth_type_unsupported` `client_revoked` `key_expired` `preauth_failed` `integrity_check_failed` `ticket_expired` `replay_detected` `clock_skew` `message_modified` `generic_error` |

Legal pattern count for this surface: 18 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `logon_failed` / `account_attempt`

**When:** A named account was attempted (anything but the credential-less SSPI probe below)

**Renders:** `logon_failed: NOTABLE: sign-in failed`

**Event ids:** 4625

| # | Slot | Legal values |
|---|---|---|
| 1 | `cause` | `unknown_username` `bad_password` `bad_username_or_auth` `account_restriction` `outside_logon_hours` `workstation_not_authorized` `password_expired` `account_disabled` `clock_skew` `account_expired` `password_must_change` `account_locked_out` `logon_right_not_granted` `netlogon_not_started` `no_logon_servers` `auth_firewall_blocked` `no_local_secret` `no_credentials_available` `invalid_token` `unknown_target` `no_authenticating_authority` `untrusted_root` `function_unsupported` `unknown_credentials` `smartcard_wrong_pin` |
| 2 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 3 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |
| 4 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |

Legal pattern count for this surface: 15210 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `logon_failed` / `sspi_probe`

**When:** SSPI asked for credentials it was never given: that status, an empty target account, no address

**Renders:** `logon_failed: BENIGN: SSPI probe, no creds supplied`

**Event ids:** 4625

| # | Slot | Legal values |
|---|---|---|
| 1 | `cause` | `unknown_username` `bad_password` `bad_username_or_auth` `account_restriction` `outside_logon_hours` `workstation_not_authorized` `password_expired` `account_disabled` `clock_skew` `account_expired` `password_must_change` `account_locked_out` `logon_right_not_granted` `netlogon_not_started` `no_logon_servers` `auth_firewall_blocked` `no_local_secret` `no_credentials_available` `invalid_token` `unknown_target` `no_authenticating_authority` `untrusted_root` `function_unsupported` `unknown_credentials` `smartcard_wrong_pin` |
| 2 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 3 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 3042 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `logon_right_granted` / `default`

**Renders:** `logon_right_granted: NOTABLE: system logon right granted`

**Event ids:** 4717

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_right` | `interactive` `network` `batch` `service` `remote_interactive` `deny_interactive` `deny_network` `deny_batch` `deny_service` `deny_remote_interactive` |

Legal pattern count for this surface: 11 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `logon_right_removed` / `default`

**Renders:** `logon_right_removed: NOTABLE: system logon right removed`

**Event ids:** 4718

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_right` | `interactive` `network` `batch` `service` `remote_interactive` `deny_interactive` `deny_network` `deny_batch` `deny_service` `deny_remote_interactive` |

Legal pattern count for this surface: 11 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `nps_access_denied` / `default`

**Renders:** `nps_access_denied: NOTABLE: NPS denied network access`

**Event ids:** 6273

| # | Slot | Legal values |
|---|---|---|
| 1 | `nps_cause` | `account_not_found` `bad_credentials` `extension_rejected` `eap_error` `account_locked_out` `no_network_policy_match` `no_request_policy_match` `dialin_access_denied` `auth_method_not_permitted` `unverified_signature` |

Legal pattern count for this surface: 11 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `nps_lockout` / `default`

**Renders:** `nps_lockout: NOTABLE: NPS locked the account`

**Event ids:** 6279

| # | Slot | Legal values |
|---|---|---|
| 1 | `nps_cause` | `account_not_found` `bad_credentials` `extension_rejected` `eap_error` `account_locked_out` `no_network_policy_match` `no_request_policy_match` `dialin_access_denied` `auth_method_not_permitted` `unverified_signature` |

Legal pattern count for this surface: 11 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `nps_request_discarded` / `default`

**Renders:** `nps_request_discarded: NOTABLE: NPS discarded the request`

**Event ids:** 6274

| # | Slot | Legal values |
|---|---|---|
| 1 | `nps_cause` | `account_not_found` `bad_credentials` `extension_rejected` `eap_error` `account_locked_out` `no_network_policy_match` `no_request_policy_match` `dialin_access_denied` `auth_method_not_permitted` `unverified_signature` |

Legal pattern count for this surface: 11 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `ntlm_validation_failed` / `default`

**When:** 4776 Audit Failure or 4777

**Renders:** `ntlm_validation_failed: NOTABLE: NTLM credential validation failed`

**Event ids:** 4776, 4777

| # | Slot | Legal values |
|---|---|---|
| 1 | `cause` | `unknown_username` `bad_password` `bad_username_or_auth` `account_restriction` `outside_logon_hours` `workstation_not_authorized` `password_expired` `account_disabled` `clock_skew` `account_expired` `password_must_change` `account_locked_out` `logon_right_not_granted` `netlogon_not_started` `no_logon_servers` `auth_firewall_blocked` `no_local_secret` `no_credentials_available` `invalid_token` `unknown_target` `no_authenticating_authority` `untrusted_root` `function_unsupported` `unknown_credentials` `smartcard_wrong_pin` |

Legal pattern count for this surface: 26 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `principal_renamed` / `default`

**Renders:** `principal_renamed: NOTABLE: security principal renamed`

**Event ids:** 4781

| # | Slot | Legal values |
|---|---|---|
| 1 | `target_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `psdirect_handshake_probe` / `default`

**Renders:** `psdirect_handshake_probe: BENIGN: Hyper-V PowerShell Direct handshake, not a sign-in`

**Event ids:** 4625

**Slots:** none. This surface renders exactly one pattern.

### `system_time_changed` / `other_caller`

**When:** Any other process/subject changing the clock

**Renders:** `system_time_changed: NOTABLE: system time changed`

**Event ids:** 4616

**Slots:** none. This surface renders exactly one pattern.

### `system_time_changed` / `routine_time_service`

**When:** svchost.exe running from the system directory AND SubjectUserSid is LOCAL SERVICE (S-1-5-19)

**Renders:** `system_time_changed: NOTABLE: system time changed`

**Event ids:** 4616

**Slots:** none. This surface renders exactly one pattern.

### `admin_session_started`

**When:** 4672 whose privileged principal is an ordinary account

**Renders:** `admin session started`

**Event ids:** 4672

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `anonymous_sign_in`

**When:** 4624 whose authenticated principal is the anonymous well-known SID, naming no endpoint

**Renders:** `anonymous sign-in`

**Event ids:** 4624

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |
| 3 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |
| 4 | `elevated` | `elevated` |

Legal pattern count for this surface: 1170 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `anonymous_sign_out`

**When:** 4647 whose principal is the anonymous well-known SID

**Renders:** `anonymous sign-out`

**Event ids:** 4647

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `audit_subsystem_started`

**When:** 4608 Windows is starting up (LSASS audit initialization)

**Renders:** `audit subsystem started at Windows startup`

**Event ids:** 4608

**Slots:** none. This surface renders exactly one pattern.

### `boot_configuration_loaded`

**When:** 4826 boot configuration data loaded with no boot-chain weakness decoded true

**Renders:** `boot configuration data loaded`

**Event ids:** 4826

**Slots:** none. This surface renders exactly one pattern.

### `credman_credentials_read`

**When:** 5379, 5381 and 5382 Credential Manager read and enumeration operations

**Renders:** `Credential Manager credentials read`

**Event ids:** 5379, 5381, 5382

**Slots:** none. This surface renders exactly one pattern.

### `crypto_operation`

**When:** 5061 cryptographic operation, success and failure keywords alike

**Renders:** `cryptographic operation`

**Event ids:** 5061

**Slots:** none. This surface renders exactly one pattern.

### `fips_selftest_passed`

**When:** 6417, the FIPS mode cryptographic selftests succeeded

**Renders:** `FIPS mode crypto selftests passed`

**Event ids:** 6417

**Slots:** none. This surface renders exactly one pattern.

### `firewall_driver_started`

**When:** 5033 the Windows Firewall driver started

**Renders:** `Windows Firewall driver started`

**Event ids:** 5033

**Slots:** none. This surface renders exactly one pattern.

### `firewall_service_started`

**When:** 5024 the Windows Firewall service started

**Renders:** `Windows Firewall service started`

**Event ids:** 5024

**Slots:** none. This surface renders exactly one pattern.

### `group_membership_enumerated`

**When:** 4799 a security-enabled local group membership was enumerated

**Renders:** `security group membership enumerated`

**Event ids:** 4799

**Slots:** none. This surface renders exactly one pattern.

### `key_file_operation`

**When:** 5058 key file operation, success and failure keywords alike

**Renders:** `cryptographic key file operation`

**Event ids:** 5058

**Slots:** none. This surface renders exactly one pattern.

### `key_migration_operation`

**When:** 5059 key migration operation, success and failure keywords alike

**Renders:** `cryptographic key migration operation`

**Event ids:** 5059

**Slots:** none. This surface renders exactly one pattern.

### `non_account_sign_out`

**When:** 4647 whose principal is not an ordinary account

**Renders:** `sign-out`

**Event ids:** 4647

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `ntlm_credentials_validated`

**When:** 4776 audit success, the account authority validated an NTLM credential

**Renders:** `NTLM credentials validated`

**Event ids:** 4776

**Slots:** none. This surface renders exactly one pattern.

### `object_audit_settings_changed`

**When:** 4907 auditing settings on an object changed

**Renders:** `auditing settings on an object changed`

**Event ids:** 4907

**Slots:** none. This surface renders exactly one pattern.

### `per_user_audit_policy_table_created`

**When:** 4902, the per-user audit policy table the system builds at boot

**Renders:** `per-user audit policy table created`

**Event ids:** 4902

**Slots:** none. This surface renders exactly one pattern.

### `platform_privileges_assigned`

**When:** 4672 whose privileged principal is a platform, service or machine identity

**Renders:** `platform privileges assigned`

**Event ids:** 4672

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `primary_token_assigned`

**When:** 4696, a primary token assigned to a process

**Renders:** `primary token assigned to a process`

**Event ids:** 4696

**Slots:** none. This surface renders exactly one pattern.

### `privileges_assigned_unclaimed_principal`

**When:** 4672 whose privileged principal the kind ladder cannot classify, or classifies as a group

**Renders:** `privileges assigned`

**Event ids:** 4672

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `process_created`

**When:** 4688 a new process was created (enablement-gated subcategory, default off)

**Renders:** `process created`

**Event ids:** 4688

| # | Slot | Legal values |
|---|---|---|
| 1 | `token_elevation` | `no_uac_split` `elevated` `limited` |

Legal pattern count for this surface: 4 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `routine_token_refresh`

**When:** 4648 from a routine platform caller

**Renders:** `token refresh, recognized caller`

**Event ids:** 4648

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `service_or_machine_sign_in`

**When:** 4624 whose authenticated principal is a recognized service, system or machine identity, whatever the logon type

**Renders:** `service or machine sign-in`

**Event ids:** 4624

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |
| 3 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |
| 4 | `elevated` | `elevated` |

Legal pattern count for this surface: 1170 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `service_ticket_issued`

**When:** 4769 audit success, a service ticket issued for a service principal

**Renders:** `Kerberos service ticket issued`

**Event ids:** 4769

**Slots:** none. This surface renders exactly one pattern.

### `session_ended`

**When:** 4634 logoff

**Renders:** `session ended`

**Event ids:** 4634

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 117 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `sign_in_unclaimed_principal`

**When:** 4624 whose authenticated principal the kind ladder cannot classify, or classifies as one that cannot sign in

**Renders:** `sign-in`

**Event ids:** 4624

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |
| 3 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |

Legal pattern count for this surface: 585 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `tgt_issued`

**When:** 4768 audit success, a ticket-granting ticket issued to a principal

**Renders:** `Kerberos TGT issued`

**Event ids:** 4768

**Slots:** none. This surface renders exactly one pattern.

### `ticket_renewed`

**When:** 4770 audit success, an existing ticket renewed

**Renders:** `Kerberos ticket renewed`

**Event ids:** 4770

**Slots:** none. This surface renders exactly one pattern.

### `user_group_membership_enumerated`

**When:** 4798 a user account group membership was enumerated

**Renders:** `user group membership enumerated`

**Event ids:** 4798

**Slots:** none. This surface renders exactly one pattern.

### `user_sign_in`

**When:** 4624 whose authenticated principal is an ordinary account, whatever the logon type

**Renders:** `account signed in`

**Event ids:** 4624

| # | Slot | Legal values |
|---|---|---|
| 1 | `logon_type` | `logon_interactive` `logon_network` `logon_batch` `logon_service` `logon_unlock` `logon_network_cleartext` `logon_new_credentials` `logon_remote_interactive` `logon_cached_interactive` `logon_system` `logon_cached_remote_interactive` `logon_cached_unlock` |
| 2 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |
| 3 | `auth_package` | `auth_kerberos` `auth_ntlm` `auth_negotiate` `auth_negoextender` |
| 4 | `elevated` | `elevated` |

Legal pattern count for this surface: 1170 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

### `user_signed_out`

**When:** 4647 whose principal is an ordinary account

**Renders:** `account signed out`

**Event ids:** 4647

| # | Slot | Legal values |
|---|---|---|
| 1 | `subject_kind` | `by_account` `by_machine` `by_system` `by_service` `by_local_service` `by_network_service` `by_anonymous` `by_group` |

Legal pattern count for this surface: 9 (every slot independently present or absent).
Most of those cannot physically occur; the count is a bound on the language, not a prediction.

## Ambiguous renders

These surfaces share a head and headline, so a pattern matching one is attributed to whichever of them accepts its tokens.

| Renders | Surfaces |
|---|---|
| `system_time_changed: NOTABLE: system time changed` | `system_time_changed` / `other_caller`, `system_time_changed` / `routine_time_service` |
