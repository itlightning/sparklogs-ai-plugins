<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `win.eventlog.security`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## `win_status_codes`

314 row(s), 63 carrying a token.

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `0x8009000b` | `bad_key_state` | the key is not in a state that allows this operation | `NTE_BAD_KEY_STATE` |
| `0x80090010` | `permission_denied` | the cryptographic provider refused the operation | `NTE_PERM` |
| `0x80090016` | `keyset_absent` | the named keyset does not exist in that provider | `NTE_BAD_KEYSET` |
| `0x80090030` | `device_not_ready` | the cryptographic device or TPM is not ready | `NTE_DEVICE_NOT_READY` |
| `0x80090036` | `user_cancelled` | the user cancelled a cryptographic prompt | `NTE_USER_CANCELLED` |
| `0x80090302` | `function_unsupported` | the requested security function is not supported | `SEC_E_UNSUPPORTED_FUNCTION` |
| `0x80090303` | `unknown_target` | the target of the security context is unknown or unreachable | `SEC_E_TARGET_UNKNOWN` |
| `0x80090308` | `invalid_token` | the security token supplied to the package is invalid | `SEC_E_INVALID_TOKEN` |
| `0x8009030d` | `unknown_credentials` | the credentials supplied were not recognized by the package | `SEC_E_UNKNOWN_CREDENTIALS` |
| `0x8009030e` | `no_credentials_available` | the security package had no credentials to present | `SEC_E_NO_CREDENTIALS` |
| `0x80090311` | `no_authenticating_authority` | no authority could be reached to authenticate | `SEC_E_NO_AUTHENTICATING_AUTHORITY` |
| `0x80090325` | `untrusted_root` | the certificate chain ends in an untrusted root | `SEC_E_UNTRUSTED_ROOT` |
| `0x800f0805` | `servicing_package_invalid` | the update package was rejected as invalid, usually download or metadata corruption | `CBS_E_INVALID_PACKAGE` |
| `0x800f080d` | `component_manifest_invalid_item` | a component manifest in the store holds an entry the servicing stack cannot read | `CBS_E_MANIFEST_INVALID_ITEM` |
| `0x800f081f` | `component_store_source_missing` | the payload the operation needs is not in the store and no repair source supplied it | `CBS_E_SOURCE_MISSING` |
| `0x800f0821` | `servicing_transaction_aborted` | the servicing transaction was aborted, typically after the servicing watchdog timeout expired | `CBS_E_ABORT` |
| `0x800f0823` | `newer_servicing_stack_required` | the package requires a newer servicing stack than the one installed on this machine | `CBS_E_NEW_SERVICING_STACK_REQUIRED` |
| `0x800f0825` | `package_cannot_be_uninstalled` | the package cannot be uninstalled, usually because a component is stuck part installed | `CBS_E_CANNOT_UNINSTALL` |
| `0x800f0830` | `image_unserviceable` | the Windows image is too damaged to service and repair in place is not expected to work | `CBS_E_IMAGE_UNSERVICEABLE` |
| `0x800f0831` | `component_store_corrupt` | the component store is corrupt, which blocks the package from being applied | `CBS_E_STORE_CORRUPTION` |
| `0x800f0900` | `servicing_xml_parse_failed` | the servicing stack could not parse servicing XML | `CBS_E_XML_PARSER_FAILURE` |
| `0x800f0904` | `more_than_one_active_edition` | the edition metadata names more than one active edition, which is not a valid configuration | `CBS_E_MORE_THAN_ONE_ACTIVE_EDITION` |
| `0x800f0905` | `no_active_edition` | the edition metadata names no active edition | `CBS_E_NO_ACTIVE_EDITION` |
| `0x800f0906` | `servicing_content_download_failed` | content for a Feature on Demand or an inbox corruption repair failed to download | `CBS_E_DOWNLOAD_FAILURE` |
| `0x800f0911` | `package_source_modified` | the package sources were moved or changed since a previous session and have to be downloaded again | `CBS_E_SOURCE_MODIFIED` |
| `0x800f0920` | `servicing_hang_detected` | the servicing stack stopped responding while processing the operation | `CBS_E_HANG_DETECTED` |
| `0x800f0922` | `advanced_installers_failed` | the advanced installers and generic commands stage of the update failed | `CBS_E_INSTALLERS_FAILED` |
| `0x800f0982` | `hydration_component_not_found` | no matching component could be identified to hydrate the payload from | `PSFX_E_MATCHING_COMPONENT_NOT_FOUND` |
| `0x800f0984` | `hydration_binary_missing` | the matching component directory exists but the binary hydration needs is missing | `PSFX_E_MATCHING_BINARY_MISSING` |
| `0x800f0985` | `reverse_delta_apply_failed` | applying a reverse delta failed, usually a missing manifest or payload | `PSFX_E_APPLY_REVERSE_DELTA_FAILED` |
| `0x800f0986` | `forward_delta_apply_failed` | applying a forward delta failed | `PSFX_E_APPLY_FORWARD_DELTA_FAILED` |
| `0x800f0987` | `null_delta_hydration_failed` | hydrating a component from a null delta failed | `PSFX_E_NULL_DELTA_HYDRATION_FAILED` |
| `0x800f0988` | `invalid_delta_combination` | the deltas selected for the component cannot be combined | `PSFX_E_INVALID_DELTA_COMBINATION` |
| `0x800f0989` | `reverse_delta_missing` | the reverse delta the operation needs is absent from the store | `PSFX_E_REVERSE_DELTA_MISSING` |
| `0x800f0991` | `payload_file_missing` | a payload file the package depends on is missing | `PSFX_E_MISSING_PAYLOAD_FILE` |
| `0xc000000e` | `no_such_device` | no device is present at the address the request named | `STATUS_NO_SUCH_DEVICE` |
| `0xc0000017` | `no_memory` | not enough memory was available to complete the operation | `STATUS_NO_MEMORY` |
| `0xc0000034` | `object_name_not_found` | the named object does not exist | `STATUS_OBJECT_NAME_NOT_FOUND` |
| `0xc000005e` | `no_logon_servers` | no logon server was available for the request | `STATUS_NO_LOGON_SERVERS` |
| `0xc0000064` | `unknown_username` | no account exists with that name | `STATUS_NO_SUCH_USER` |
| `0xc000006a` | `bad_password` | account exists and the password was wrong | `STATUS_WRONG_PASSWORD` |
| `0xc000006d` | `bad_username_or_auth` | generic logon failure with the cause not disclosed | `STATUS_LOGON_FAILURE` |
| `0xc000006e` | `account_restriction` | an account restriction blocked the logon | `STATUS_ACCOUNT_RESTRICTION` |
| `0xc000006f` | `outside_logon_hours` | logon attempted outside the permitted hours | `STATUS_INVALID_LOGON_HOURS` |
| `0xc0000070` | `workstation_not_authorized` | account not permitted to log on from this workstation | `STATUS_INVALID_WORKSTATION` |
| `0xc0000071` | `password_expired` | the password has expired | `STATUS_PASSWORD_EXPIRED` |
| `0xc0000072` | `account_disabled` | the account is disabled | `STATUS_ACCOUNT_DISABLED` |
| `0xc0000073` | `name_translation_failed` | none of the supplied account names or identifiers could be translated to a security identifier | `STATUS_NONE_MAPPED` |
| `0xc000009a` | `insufficient_resources` | the operation ran out of a system resource and can be retried | `STATUS_INSUFFICIENT_RESOURCES` |
| `0xc000009c` | `device_data_error` | the device returned a data error instead of the data the read or write asked for | `STATUS_DEVICE_DATA_ERROR` |
| `0xc000012d` | `commit_limit_reached` | the system commit limit was reached, so no more memory could be committed | `STATUS_COMMITMENT_LIMIT` |
| `0xc0000133` | `clock_skew` | client and domain controller clocks differ too much | `STATUS_TIME_DIFFERENCE_AT_DC` |
| `0xc000014d` | `registry_io_failed` | an I/O operation on a registry hive file failed, so the registry could not read, write or flush that file | `STATUS_REGISTRY_IO_FAILED` |
| `0xc000015b` | `logon_right_not_granted` | account lacks the requested logon right | `STATUS_LOGON_TYPE_NOT_GRANTED` |
| `0xc0000192` | `netlogon_not_started` | the Netlogon service is not running | `STATUS_NETLOGON_NOT_STARTED` |
| `0xc0000193` | `account_expired` | the account has expired | `STATUS_ACCOUNT_EXPIRED` |
| `0xc0000224` | `password_must_change` | the password must change before logon succeeds | `STATUS_PASSWORD_MUST_CHANGE` |
| `0xc0000234` | `account_locked_out` | the account is locked out | `STATUS_ACCOUNT_LOCKED_OUT` |
| `0xc0000371` | `no_local_secret` | the local secret store holds no secret for the account | `STATUS_NO_SECRETS` |
| `0xc0000380` | `smartcard_wrong_pin` | the smart card PIN entered was wrong | `STATUS_SMARTCARD_WRONG_PIN` |
| `0xc0000413` | `auth_firewall_blocked` | an authentication firewall policy blocked the account | `STATUS_AUTHENTICATION_FIREWALL_FAILED` |
| `0xc0000428` | `image_hash_invalid` | the image hash is not valid, so the file carries no signature the loader will accept | `STATUS_INVALID_IMAGE_HASH` |
| `0xc0000603` | `image_certificate_revoked` | the certificate that signed the image has been revoked | `STATUS_IMAGE_CERT_REVOKED` |

## `kerberos`

17 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `0x6` | `client_unknown` | the client principal is not in the directory | `KDC_ERR_C_PRINCIPAL_UNKNOWN` |
| `0x7` | `service_unknown` | the service principal is not in the directory | `KDC_ERR_S_PRINCIPAL_UNKNOWN` |
| `0x8` | `principal_not_unique` | more than one entry matches the principal name | `KDC_ERR_PRINCIPAL_NOT_UNIQUE` |
| `0x9` | `null_key` | the principal has no usable key | `KDC_ERR_NULL_KEY` |
| `0xc` | `policy_restriction` | KDC policy rejected the request | `KDC_ERR_POLICY` |
| `0xd` | `bad_option` | the request carried an option the KDC refused | `KDC_ERR_BADOPTION` |
| `0xe` | `etype_unsupported` | no encryption type in common with the KDC | `KDC_ERR_ETYPE_NOSUPP` |
| `0x10` | `preauth_type_unsupported` | the offered preauthentication type is not supported | `KDC_ERR_PADATA_TYPE_NOSUPP` |
| `0x12` | `client_revoked` | the client account is disabled expired or locked out | `KDC_ERR_CLIENT_REVOKED` |
| `0x17` | `key_expired` | the account password has expired | `KDC_ERR_KEY_EXPIRED` |
| `0x18` | `preauth_failed` | preauthentication failed usually a wrong password | `KDC_ERR_PREAUTH_FAILED` |
| `0x1f` | `integrity_check_failed` | message integrity check failed | `KRB_AP_ERR_BAD_INTEGRITY` |
| `0x20` | `ticket_expired` | the presented ticket has expired | `KRB_AP_ERR_TKT_EXPIRED` |
| `0x22` | `replay_detected` | the request repeats one the KDC already served | `KRB_AP_ERR_REPEAT` |
| `0x25` | `clock_skew` | client and KDC clocks differ too much | `KRB_AP_ERR_SKEW` |
| `0x29` | `message_modified` | the message was altered in transit | `KRB_AP_ERR_MODIFIED` |
| `0x3c` | `generic_error` | the KDC reported a generic failure | `KRB_ERR_GENERIC` |

## `win_logon_types`

12 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `2` | `logon_interactive` | signed in at the console keyboard |  |
| `3` | `logon_network` | reached the machine over the network |  |
| `4` | `logon_batch` | ran under the batch scheduler |  |
| `5` | `logon_service` | started as a Windows service |  |
| `7` | `logon_unlock` | unlocked an existing session |  |
| `8` | `logon_network_cleartext` | network logon with the password sent in cleartext |  |
| `9` | `logon_new_credentials` | ran with alternate credentials for network access |  |
| `10` | `logon_remote_interactive` | signed in over remote desktop |  |
| `11` | `logon_cached_interactive` | signed in with cached domain credentials |  |
| `0` | `logon_system` | used only by the operating system itself before anyone signs in |  |
| `12` | `logon_cached_remote_interactive` | signed in over remote desktop with cached credentials |  |
| `13` | `logon_cached_unlock` | unlocked an existing session with cached credentials |  |

## `win_nps_reason_codes`

10 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `8` | `account_not_found` | the account named in the RADIUS User-Name attribute does not exist |  |
| `16` | `bad_credentials` | a user credentials mismatch: the name maps to no account, or the password was wrong |  |
| `21` | `extension_rejected` | an extension library installed on the server rejected the connection request |  |
| `23` | `eap_error` | an error occurred during the server use of the Extensible Authentication Protocol |  |
| `36` | `account_locked_out` | the attempts exceeded the account lockout threshold in account lockout policy |  |
| `48` | `no_network_policy_match` | the request matched no configured network policy and was denied |  |
| `49` | `no_request_policy_match` | the request matched no configured connection request policy and was denied |  |
| `65` | `dialin_access_denied` | the network access permission in the account dial-in properties is set to deny |  |
| `66` | `auth_method_not_permitted` | the matching network policy does not enable the authentication method used, guest authentication included |  |
| `262` | `unverified_signature` | the message was discarded as incomplete with its signature unverified |  |

## Module-minted token slots

Rendered as bare words in the curated first line, so they are part of the derived pattern.

### `subject_kind`

What sort of principal acted. Wider than the portable `kind` vocabulary, which collapses the three platform service identities into one service value: they are different operational shapes and scanning them apart is the point of the token. by_account states an ordinary directory account and never a person: no identifier proves a person without a directory lookup, so the token under-claims. by_anonymous states that the source said there was NO identity, which is a positive fact rather than an absent one, so the portable kind anonymous is written beside the token wherever a branch renders it. by_group reaches the sign-in id and the two ticket ids because the kind ladder reads group SID shapes on every principal pair, and every surface it can reach claims nothing about the principal in prose: a group cannot authenticate, so no headline naming a principal class could be true of one. It is the one rung with no portable kind beside it on the actor family.

- `by_account`
- `by_machine`
- `by_system`
- `by_service`
- `by_local_service`
- `by_network_service`
- `by_anonymous`
- `by_group`

### `target_kind`

What sort of principal was ACTED UPON, on the account-administration lines. Same value space as subject_kind and a separate slot on purpose: subject_kind states who acted, and one name meaning the acting principal on some lines and the object of the action on others would make every reading of it depend on which line it came from. The headline on these lines names the ACTION, so this token is where the principal is described: a group renamed, a computer account created and an ordinary account disabled are three patterns rather than one. A principal the ladder cannot read renders no token, so a gap in the reading shows as an absent token rather than as a wrong one.

- `by_account`
- `by_machine`
- `by_system`
- `by_service`
- `by_local_service`
- `by_network_service`
- `by_anonymous`
- `by_group`

### `auth_package`

Which authentication package answered. Only the curated packages render; any other package leaves the slot absent and stays queryable through the module auth_package field. auth_negoextender is the Entra negotiate-extension package (NegoExtender), the one cloud-joined endpoints authenticate through.

- `auth_kerberos`
- `auth_ntlm`
- `auth_negotiate`
- `auth_negoextender`

### `token_elevated`

A flag, not a vocabulary: rendered only when the sign-in minted a full-privilege token. Absence means not-elevated or not-stated, and the presence of the token is what splits the admin-session pattern from the ordinary one. Same name as the module bool field.

- `token_elevated`

### `uac_token_type`

What UAC did to the created process token, decoded from TokenElevationType: the same three values the promoted module field carries, so the token maps one to one onto a queryable field. Inline so a full token separates from ambient creation in the pattern. unsplit is TokenElevationTypeDefault (no filtered pair). full is TokenElevationTypeFull (type 2), not Default. An unrecognized reference renders no token and leaves the field unset.

- `unsplit`
- `full`
- `limited`

### `logon_right`

Which system logon right a policy change granted or removed, decoded from the Se*Right literal constant the provider writes into AccessGranted or AccessRemoved. A closed set of ten: the five ways Windows lets a principal sign in, and the five deny counterparts that block each of them. No token carries a digit, so every value is tokenizer-safe. A value the map does not carry renders no token and the raw value stays in the retained payload, so a decode gap reads as a token-less pattern rather than an invented meaning.

- `interactive`
- `network`
- `batch`
- `service`
- `remote_interactive`
- `deny_interactive`
- `deny_network`
- `deny_batch`
- `deny_service`
- `deny_remote_interactive`

## Portable vocabularies this module uses

Library-wide closed sets, so the same token means the same thing on every data feed.

### `sparklogs.actor.kind`

- `account`: an ordinary directory account and never any other kind, not resolved any further
- `anonymous`: a session opened under no identity, where the source states that no principal was named
- `machine`: a computer account acting as itself (Windows names these with a trailing dollar sign; a group Managed Service Account name ends in one too, so a source reading the name alone reports a gMSA here when it is a service identity)
- `service`: a service or daemon account, including the platform service identities
- `system`: the operating system itself acting with no delegating principal

### `sparklogs.actor.type`

- `samaccountname`: bare logon name with no domain suffix (the ordinary Windows account name)
- `sid`: Windows security identifier (S-1-5-...)
- `upn`: user principal name (user@domain email-shaped identity)

### `sparklogs.result.code_space`

- `kerberos`: Kerberos protocol result code (KDC_ERR_*), a protocol space of its own, not an NTSTATUS
- `ntstatus`: Windows NTSTATUS code (kernel and security subsystem)
- `sspi`: Windows SSPI security result (SEC_E_*/SEC_I_*), the security-package half of HRESULT facility 9

### `sparklogs.running_as.kind`

- `account`: an ordinary directory account and never any other kind, not resolved any further
- `anonymous`: a session opened under no identity, where the source states that no principal was named
- `machine`: a computer account acting as itself (Windows names these with a trailing dollar sign; a group Managed Service Account name ends in one too, so a source reading the name alone reports a gMSA here when it is a service identity)
- `service`: a service or daemon account, including the platform service identities
- `system`: the operating system itself acting with no delegating principal

### `sparklogs.running_as.type`

- `samaccountname`: bare logon name with no domain suffix (the ordinary Windows account name)
- `sid`: Windows security identifier (S-1-5-...)
- `upn`: user principal name (user@domain email-shaped identity)

### `sparklogs.target.kind`

- `account`: an ordinary directory account and never any other kind, not resolved any further
- `group`: a security group as the subject, acted upon or nested as a member of another group
- `machine`: a computer account acting as itself (Windows names these with a trailing dollar sign; a group Managed Service Account name ends in one too, so a source reading the name alone reports a gMSA here when it is a service identity)
- `service`: a service or daemon account, including the platform service identities
- `system`: the operating system itself acting with no delegating principal

### `sparklogs.target.type`

- `samaccountname`: bare logon name with no domain suffix (the ordinary Windows account name)
- `sid`: Windows security identifier (S-1-5-...)
- `upn`: user principal name (user@domain email-shaped identity)
