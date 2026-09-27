<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.identity_security`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.identity_security.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.identity_security.code_integrity_requested_level` | int | Signing level Code Integrity required of the file, from the CodeIntegrity load and policy ids (`RequestedPolicy` or `Requested Signing Level` depending on the id). The raw number, which is what every rule keys on. |
| `win.eventlog.identity_security.code_integrity_requested_level_name` | string | Bounded meaning token for that level (signing_level_unchecked, signing_level_unsigned, signing_level_policy_trusted, signing_level_developer, signing_level_authenticode, signing_level_store_protected, signing_level_store, signing_level_antimalware, signing_level_microsoft, signing_level_ngen, signing_level_windows, signing_level_windows_tcb). Display beside the number; a level outside the published set leaves this unset. |
| `win.eventlog.identity_security.code_integrity_validated_level` | int | Signing level the file actually carried, from the same ids (`ValidatedPolicy` or `Validated Signing Level`). Read beside the requested level: the pair is what says how far short the signature fell. |
| `win.eventlog.identity_security.code_integrity_validated_level_name` | string | Bounded meaning token for the validated level, from the same set as the requested one. A level outside the published set leaves this unset. |
| `win.eventlog.identity_security.code_integrity_policy_name` | string | Name of the Code Integrity policy that refused a file, from CodeIntegrity 3076 and 3077 (`PolicyName`). The first thing to read on those ids: it says which policy is in force. |
| `win.eventlog.identity_security.code_integrity_policy_id` | string | Identifier of that policy, from the same ids (`PolicyID`). Separates two revisions of one policy name. |
| `win.eventlog.identity_security.code_integrity_file_user_writable` | bool | Whether the refused file sits somewhere an ordinary user can write, from CodeIntegrity 3076 and 3077 (`UserWriteable`). The single most decision-relevant field on those ids. |
| `win.eventlog.identity_security.code_integrity_file_sha256` | string | SHA-256 of the refused file, from CodeIntegrity 3076 and 3077 (`SHA256 Hash`). File content, not file location, so it identifies the binary without naming where it lives. |
| `win.eventlog.identity_security.code_integrity_secure_required` | string | Secure-load requirement flag the loader carried, from CodeIntegrity 3002, 3004 and 3023 (`SecureRequired`). Promoted as the provider wrote it: no published value map was read for it. |
| `win.eventlog.identity_security.code_integrity_file` | string | Bare file name of the image Code Integrity refused, from the CodeIntegrity load ids (`FileNameBuffer`, last path segment only). The recurrence pivot for one file that keeps being refused. |
| `win.eventlog.identity_security.code_integrity_catalog` | string | Signature catalog Code Integrity could not read, from CodeIntegrity 3010 (`FileNameBuffer`, which on that id is a bare catalog file name). Ties the failure back to the servicing package that delivers the catalog. |
| `win.eventlog.identity_security.mitigation_process` | string | Bare file name of the process an exploit mitigation fired on, from the Security-Mitigations ids (`ProcessPath`, last path segment only). The pivot the count is not: a path appearing for the first time is what flags an application that just broke. |
| `win.eventlog.identity_security.shadow_stack_nonenforcement_reason` | int | Why Windows let a process continue after a shadow stack return-address mismatch, from Security-Mitigations 25 (`NonenforcementReason`). Promoted as the number: no published value map was read for it. |
| `win.eventlog.identity_security.shadow_stack_control_pc_image` | string | Bare file name of the module a mismatched return address points into, from Security-Mitigations 25 (`ControlPcImageName`, last path segment only). The most diagnostic field on that id. |
| `win.eventlog.identity_security.entra_error_message` | string | The authentication library own sentence describing that error, from the same ids (`ErrorMessage`). Publisher text, and the only thing that tells a transport failure from a tenant configuration failure. |
| `win.eventlog.identity_security.correlation_id` | string | Correlation identifier the cloud authentication plugin stamped on one attempt (`CorrelationID`). New on every attempt, so it joins a device-side record to a tenant-side one and never groups. |
| `win.eventlog.identity_security.http_status` | int | HTTP status a service returned to a device-side operation, from User Device Registration 204 (`HttpStatus`). Separates a refusal the service made from one the network made. |
| `win.eventlog.identity_security.directory_error_code` | int | The SECOND code on a registration failure, from the User Device Registration ids that carry both (`ErrorCode` beside `ExitCode`). The exit code is the outcome a ticket is about and rides the result family; this one is the detail underneath it. The two lookup ids carry no exit code, so their `ErrorCode` is the acting code and rides the result family instead of appearing here. |
| `win.eventlog.identity_security.directory_error_subcode` | string | Sub-code the registration service named beside a failure (`ErrorSubcode`), e.g. two devices claiming one name. The only field that separates the duplicate-identity case from a generic failure. |
| `win.eventlog.identity_security.registration_attribute` | string | Device-object attribute a registration update was trying to write, from User Device Registration 252 (`Attribute`). |
| `win.eventlog.identity_security.whfb_policy_enabled` | string | Whether a policy asks for Windows Hello for Business on this device, from User Device Registration 360 (`NgcPolicyEnabled`). The field that separates a deliberate absence from a failed rollout. |
| `win.eventlog.identity_security.whfb_user_remote` | string | Whether the user is connected over a remote desktop session, from the same checklist (`UserIsRemote`). Windows Hello does not provision over one by design. |
| `win.eventlog.identity_security.whfb_device_joined` | string | Whether the device is joined to the directory, from the same checklist (`DeviceIsJoined`). |
| `win.eventlog.identity_security.whfb_hardware_met` | string | Whether the device meets the Windows Hello for Business hardware requirements, from the same checklist (`NgcHardwarePolicyMet`). |
| `win.eventlog.identity_security.whfb_primary_refresh_token` | string | Whether the user signed in with cloud credentials, from the same checklist (`AADPrt`). Presence of the token, never the token. |
| `win.eventlog.identity_security.whfb_key_status` | string | Key status the provider decoded itself, from User Device Registration 385 (`KeyStatusSymbolicName`), e.g. a platform module with no attestation capability. Better than any table because the provider ships the name. |
| `win.eventlog.identity_security.dpapi_failure_reason` | int | Reason code the data-protection subsystem gave for an unprotect that did not complete, from Crypto-DPAPI 8198 (`ReasonForFailure`). Promoted as the number: no published value map was read for it. |
| `win.eventlog.identity_security.dpapi_master_key_guid` | string | Identifier of the master key an unprotect was against, from Crypto-DPAPI 8202 and 8204 (`MasterKeyGUID`). A key identifier, never key material. |
| `win.eventlog.identity_security.crypto_provider` | string | Key-storage provider a key operation ran against, from the Crypto-NCrypt operational ids (`ProviderName`). The axis the band turns on: the same status word means opposite things on the software and the hardware provider. |
| `win.eventlog.identity_security.crypto_operation_type` | int | Operation type the key-storage call carried, from the same ids (`OperationType`). Promoted as the number: no published value map was read for it. |
| `win.eventlog.identity_security.crypto_function` | string | Key-isolation function that failed, from Crypto-NCrypt 13 (`Function`). Names the call rather than the caller. |
| `win.eventlog.identity_security.vbs_can_be_enabled` | int | Whether the platform states that virtualization-based key protection can be enabled at all, from Crypto-NCrypt 26 (`CanBeEnabled`). Zero means the hardware or firmware cannot support it and retrying will not change the outcome. |
| `win.eventlog.identity_security.vbs_restart_attempts` | int | Running count of virtualization-based key protection restart attempts, from Crypto-NCrypt 26 (`TotalAttemptedRestarts`). A counter, so it belongs on the row and never in a grouping key. |
| `win.eventlog.identity_security.vbs_restart_successes` | int | Running count of those attempts that succeeded, from the same id (`TotalSuccessfulRestarts`). Read beside the attempt count: the pair is the whole story. |
| `win.eventlog.identity_security.gp_connectivity_failure` | bool | Whether Group Policy attributes a failed pass to the network, from GroupPolicy 7000 and 7001 (`IsConnectivityFailure`). The field that separates a machine off the corporate network from one that cannot reach its own domain. |
| `win.eventlog.identity_security.gp_is_machine` | int | Whether a policy pass was the computer boot pass or a user logon pass, from the same ids (`IsMachine`). |
| `win.eventlog.identity_security.gp_elapsed_seconds` | int | Seconds the failed policy pass took, from the same ids. The provider misspells the field name and this is the corrected spelling. |
| `win.eventlog.identity_security.gp_extension_name` | string | Client-side extension that reported a failure code, from GroupPolicy 6016 and 7016 (`CSEExtensionName`). The diagnostic: a failure in the security extension is a different problem from one in the drive-maps extension. |
| `win.eventlog.identity_security.gp_extension_id` | string | Identifier of that extension, from the same ids (`CSEExtensionId`). The stable pivot when the display name is localized. |
| `win.eventlog.identity_security.gp_dc_discovery_ms` | int | Milliseconds Group Policy spent trying to discover a domain controller before giving up, from GroupPolicy 7326 (`DCDiscoveryTimeInMilliSeconds`). |
| `win.eventlog.identity_security.gp_mutual_auth_enforced` | bool | Whether the machine requires mutual authentication when it reads policy from a file share, from GroupPolicy 9001 (`MutualAuthenticationEnforced`). |
| `win.eventlog.identity_security.gp_integrity_enforced` | bool | Whether the machine requires integrity protection on that same read, from the same id (`IntegrityEnforced`). Read beside the mutual-authentication flag: the pair is the whole finding. |
| `win.eventlog.identity_security.ntlm_version` | string | Version of the legacy authentication protocol that was used, from the NTLM client ids (`NtlmVersion`). The first version is broken and this is the field that finds it. |
| `win.eventlog.identity_security.ntlm_usage_reason` | string | Why the legacy protocol was used rather than Kerberos, from the outbound ids (`NtlmUsageReason`). Publisher-decoded text, e.g. a target name Kerberos could not resolve or an application that called it directly. |
| `win.eventlog.identity_security.ntlm_channel_binding` | string | Channel-binding state of the exchange, from the same ids (`ChannelBindingStatus`). |
| `win.eventlog.identity_security.ntlm_mic_status` | string | Message-integrity-check state of the exchange, from the same ids. The provider spells this field name with a space, beside a version field that has none. |
| `win.eventlog.identity_security.bitlocker_backup_target` | string | Where a BitLocker recovery key backup was addressed, as a literal: a personal cloud account, the cloud directory where the provider names it, and the unqualified directory where it does not. The destination comes from the sentence the event id renders, not from BackendName. |
| `win.eventlog.identity_security.bitlocker_volume_mount_point` | string | Raw BitLocker volume mount point from event_data.VolumeMountPoint when present on a backup or success event. |
| `win.eventlog.identity_security.bitlocker_secure_boot_reason` | string | Why BitLocker could not use the measured boot state, as a literal per arm: the feature is off, the measurement log is invalid, or the measurement could not be read. A literal from the event id. |
| `win.eventlog.identity_security.cert_subject` | string | Subject of the certificate that expired or is about to, from the certificate lifecycle ids (`SubjectName`). The only field that separates a domain controller certificate from a vendor application signing certificate. |
| `win.eventlog.identity_security.cert_not_valid_after` | int | Instant the certificate stops being valid, from the same ids (`NotValidAfter`). In a grouping key it is what stops a renewed certificate from being suppressed as a duplicate of the old one. |
| `win.eventlog.identity_security.cert_store` | string | Which store the certificate is in, machine or user, as a literal from the channel. The machine-store rows are infrastructure certificates and the user-store rows usually are not. |
| `win.eventlog.identity_security.applocker_policy_name` | string | Application-control policy collection an audit finding came from, from AppLocker 8003 (`PolicyName`), e.g. the executable or the library collection. |
| `win.eventlog.identity_security.applocker_rule_name` | string | Rule that would have denied the file, from the same id (`RuleName`). A placeholder value means no rule matched at all. |
| `win.eventlog.identity_security.applocker_rule_id` | string | Identifier of that rule, from the same id (`RuleId`). An all-zero identifier is what says no rule matched, which is the ordinary audit finding. |
| `win.eventlog.identity_security.applocker_file_path` | string | Resolved path of the file the audit finding is about, from the same id (`FullFilePath`). Promoted deliberately: the whole value of the row is knowing which program it was, and the payload environment-variable form is not promoted beside it. |
| `win.eventlog.identity_security.sensor_connection_error_code` | int | Error the endpoint sensor reported for a failed contact, from `errorCode` or `Int1`. Usually a WinHTTP transport error (12007: the name did not resolve), not an HTTP status; the raw number, not decoded. |
| `win.eventlog.identity_security.sensor_request_type` | string | Which request to the token service failed, from SENSE 405 and 406 (`requestType`). |
| `win.eventlog.identity_security.sensor_contact_failures` | int | How many times the sensor contacted its service in the reported window, from SENSE 5 and 67 (`UInt1`). |
| `win.eventlog.identity_security.sensor_contact_successes` | int | How many of those contacts succeeded, from SENSE 67 (`UInt3`). Read beside the attempt count: some succeeding is what separates a sensor that is reporting from one that is dark. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.destination.host` | Where it was going. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `applocker_audit_would_block` / `no_matching_rule` | 8003 | `win.eventlog.identity_security.applocker_file_path` `win.eventlog.identity_security.applocker_policy_name` `win.eventlog.identity_security.applocker_rule_id` `win.eventlog.identity_security.applocker_rule_name` |  |
| `applocker_audit_would_block` / `rule_matched` | 8003 | `win.eventlog.identity_security.applocker_file_path` `win.eventlog.identity_security.applocker_policy_name` `win.eventlog.identity_security.applocker_rule_id` `win.eventlog.identity_security.applocker_rule_name` |  |
| `applocker_unsupported_windows_edition` / `default` | 8009 | **fields: none** |  |
| `bitlocker_recovery_key_backup_failed` / `consumer_account` | 829, 846, 868, 872, 875, 898 | `win.eventlog.identity_security.bitlocker_backup_target` `win.eventlog.identity_security.bitlocker_volume_mount_point` |  |
| `bitlocker_recovery_key_backup_failed` / `directory_backup` | 829, 846, 868, 872, 875, 898 | `win.eventlog.identity_security.bitlocker_backup_target` `win.eventlog.identity_security.bitlocker_volume_mount_point` |  |
| `bitlocker_secure_boot_unavailable` / `measurement_invalid` | 810, 811, 812, 813, 834, 835, 878, 881, 893 | `win.eventlog.identity_security.bitlocker_secure_boot_reason` |  |
| `bitlocker_secure_boot_unavailable` / `measurement_unreadable` | 810, 811, 812, 813, 834, 835, 878, 881, 893 | `win.eventlog.identity_security.bitlocker_secure_boot_reason` |  |
| `bitlocker_secure_boot_unavailable` / `secure_boot_disabled` | 810, 811, 812, 813, 834, 835, 878, 881, 893 | `win.eventlog.identity_security.bitlocker_secure_boot_reason` |  |
| `cert_expired` / `default` | 1002, 1003 | `win.eventlog.identity_security.cert_not_valid_after` `win.eventlog.identity_security.cert_store` `win.eventlog.identity_security.cert_subject` |  |
| `cert_expiring` / `default` | 1002, 1003 | `win.eventlog.identity_security.cert_not_valid_after` `win.eventlog.identity_security.cert_store` `win.eventlog.identity_security.cert_subject` |  |
| `code_integrity_catalog_load_failed` / `resource_pressure` | 3010, 3024 | `win.eventlog.identity_security.code_integrity_catalog` |  |
| `code_integrity_catalog_load_failed` / `unreadable` | 3010, 3024 | `win.eventlog.identity_security.code_integrity_catalog` |  |
| `code_integrity_driver_revoked` / `default` | 3023 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_secure_required` |  |
| `code_integrity_image_hash_missing` / `driver` | 3002, 3004 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_secure_required` |  |
| `code_integrity_image_hash_missing` / `user_mode` | 3002, 3004 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_secure_required` |  |
| `code_integrity_policy_audit_would_block` / `default` | 3076 | `win.eventlog.identity_security.code_integrity_file_sha256` `win.eventlog.identity_security.code_integrity_file_user_writable` `win.eventlog.identity_security.code_integrity_policy_id` `win.eventlog.identity_security.code_integrity_policy_name` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_requested_level_name` `win.eventlog.identity_security.code_integrity_validated_level` `win.eventlog.identity_security.code_integrity_validated_level_name` |  |
| `code_integrity_policy_blocked` / `default` | 3077 | `win.eventlog.identity_security.code_integrity_file_sha256` `win.eventlog.identity_security.code_integrity_file_user_writable` `win.eventlog.identity_security.code_integrity_policy_id` `win.eventlog.identity_security.code_integrity_policy_name` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_requested_level_name` `win.eventlog.identity_security.code_integrity_validated_level` `win.eventlog.identity_security.code_integrity_validated_level_name` |  |
| `code_integrity_signing_level_blocked` / `default` | 3033, 3066, 3086 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_requested_level_name` `win.eventlog.identity_security.code_integrity_validated_level` `win.eventlog.identity_security.code_integrity_validated_level_name` |  |
| `crypto_key_operation_failed` / `key_absent_probe` | 1, 2, 3, 4, 5, 6, 8, 10, 12 | `win.eventlog.identity_security.crypto_operation_type` `win.eventlog.identity_security.crypto_provider` |  |
| `crypto_key_operation_failed` / `other_failure` | 1, 2, 3, 4, 5, 6, 8, 10, 12 | `win.eventlog.identity_security.crypto_operation_type` `win.eventlog.identity_security.crypto_provider` |  |
| `crypto_key_operation_failed` / `platform_module_not_ready` | 1, 2, 3, 4, 5, 6, 8, 10, 12 | `win.eventlog.identity_security.crypto_operation_type` `win.eventlog.identity_security.crypto_provider` |  |
| `defender_sensor_connection_failed` / `contact_failed` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `defender_sensor_connection_failed` / `name_resolution` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `defender_sensor_connection_failed` / `partial` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `device_encryption_enable_failed` / `default` | 4103 | **fields: none** |  |
| `device_registration_failed` / `attempt_failed` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_code` `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `directory_refused` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `directory_unreachable` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `duplicate_identity` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_code` `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `quota_exceeded` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_code` `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `dpapi_unprotect_failed` / `bad_key_state` | 8196, 8198, 8202, 8204, 8205 | `win.eventlog.identity_security.dpapi_failure_reason` `win.eventlog.identity_security.dpapi_master_key_guid` |  |
| `dpapi_unprotect_failed` / `credential_mismatch` | 8196, 8198, 8202, 8204, 8205 | `win.eventlog.identity_security.dpapi_failure_reason` `win.eventlog.identity_security.dpapi_master_key_guid` |  |
| `dpapi_unprotect_failed` / `unprotect_incomplete` | 8196, 8198, 8202, 8204, 8205 | `win.eventlog.identity_security.dpapi_failure_reason` `win.eventlog.identity_security.dpapi_master_key_guid` |  |
| `entra_device_certificate_update_failed` / `default` | 1131, 1256 | `win.eventlog.identity_security.correlation_id` |  |
| `entra_sign_in_failed` / `credential` | 1085, 1086, 1160, 1161, 1162 | **fields: none** |  |
| `entra_sign_in_failed` / `unexplained` | 1085, 1086, 1160, 1161, 1162 | **fields: none** |  |
| `entra_sign_in_failed` / `unreachable` | 1085, 1086, 1160, 1161, 1162 | **fields: none** |  |
| `entra_token_acquisition_failed` / `configuration` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `interaction_required` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `transport` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `unclassified` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `exploit_mitigation_audit_would_block` / `default` | 1, 3, 11 | `win.eventlog.identity_security.mitigation_process` |  |
| `exploit_mitigation_blocked` / `designed_sandbox` | 2, 4, 6, 10, 12, 32, 34, 36 | `win.eventlog.identity_security.mitigation_process` |  |
| `exploit_mitigation_blocked` / `unexpected_caller` | 2, 4, 6, 10, 12, 32, 34, 36 | `win.eventlog.identity_security.mitigation_process` |  |
| `exploit_mitigation_shadow_stack_mismatch` / `blocked` | 28 | `win.eventlog.identity_security.mitigation_process` `win.eventlog.identity_security.shadow_stack_control_pc_image` |  |
| `exploit_mitigation_shadow_stack_mismatch` / `not_enforced` | 25 | `win.eventlog.identity_security.mitigation_process` `win.eventlog.identity_security.shadow_stack_control_pc_image` `win.eventlog.identity_security.shadow_stack_nonenforcement_reason` |  |
| `group_policy_domain_controller_unresolved` / `access_denied` | 7017, 7320, 7326 | `win.eventlog.identity_security.gp_dc_discovery_ms` |  |
| `group_policy_domain_controller_unresolved` / `discovery_failed` | 7017, 7320, 7326 | `win.eventlog.identity_security.gp_dc_discovery_ms` |  |
| `group_policy_domain_controller_unresolved` / `domain_unresolved` | 7017, 7320, 7326 | `win.eventlog.identity_security.gp_dc_discovery_ms` |  |
| `group_policy_extension_apply_failed` / `deferred` | 6016, 7016 | `win.eventlog.identity_security.gp_extension_id` `win.eventlog.identity_security.gp_extension_name` |  |
| `group_policy_extension_apply_failed` / `extension_failed` | 6016, 7016 | `win.eventlog.identity_security.gp_extension_id` `win.eventlog.identity_security.gp_extension_name` |  |
| `group_policy_extension_apply_failed` / `share_unreachable` | 6016, 7016 | `win.eventlog.identity_security.gp_extension_id` `win.eventlog.identity_security.gp_extension_name` |  |
| `group_policy_file_share_unhardened` / `default` | 9001 | `win.eventlog.identity_security.gp_integrity_enforced` `win.eventlog.identity_security.gp_mutual_auth_enforced` |  |
| `group_policy_processing_failed` / `no_network` | 7000, 7001 | `win.eventlog.identity_security.gp_connectivity_failure` `win.eventlog.identity_security.gp_elapsed_seconds` `win.eventlog.identity_security.gp_is_machine` |  |
| `group_policy_processing_failed` / `other_failure` | 7000, 7001 | `win.eventlog.identity_security.gp_connectivity_failure` `win.eventlog.identity_security.gp_elapsed_seconds` `win.eventlog.identity_security.gp_is_machine` |  |
| `laps_password_backup_failed` / `authentication` | 10005, 10026, 10028, 10032, 10059 | **fields: none** |  |
| `laps_password_backup_failed` / `backup_failed` | 10005, 10026, 10028, 10032, 10059 | **fields: none** |  |
| `laps_password_backup_failed` / `tenant_not_enabled` | 10005, 10026, 10028, 10032, 10059 | **fields: none** |  |
| `ntlm_authentication_used` / `inbound` | 4020, 4021, 4022, 4023 | `win.eventlog.identity_security.ntlm_channel_binding` `win.eventlog.identity_security.ntlm_mic_status` `win.eventlog.identity_security.ntlm_usage_reason` `win.eventlog.identity_security.ntlm_version` |  |
| `ntlm_authentication_used` / `legacy_version` | 4020, 4021, 4022, 4023 | `win.eventlog.identity_security.ntlm_channel_binding` `win.eventlog.identity_security.ntlm_mic_status` `win.eventlog.identity_security.ntlm_usage_reason` `win.eventlog.identity_security.ntlm_version` |  |
| `ntlm_authentication_used` / `outbound` | 4020, 4021, 4022, 4023 | `win.eventlog.identity_security.ntlm_channel_binding` `win.eventlog.identity_security.ntlm_mic_status` `win.eventlog.identity_security.ntlm_usage_reason` `win.eventlog.identity_security.ntlm_version` |  |
| `vbs_key_isolation_failed` / `isolation_failed` | 13, 26 | `win.eventlog.identity_security.crypto_function` `win.eventlog.identity_security.vbs_can_be_enabled` `win.eventlog.identity_security.vbs_restart_attempts` `win.eventlog.identity_security.vbs_restart_successes` |  |
| `vbs_key_isolation_failed` / `unavailable` | 13, 26 | `win.eventlog.identity_security.crypto_function` `win.eventlog.identity_security.vbs_can_be_enabled` `win.eventlog.identity_security.vbs_restart_attempts` `win.eventlog.identity_security.vbs_restart_successes` |  |
| `windows_hello_key_registration_failed` / `key_operation_failed` | 303, 310, 311, 317, 385, 6010, 7002, 7611 | `win.eventlog.identity_security.whfb_key_status` |  |
| `windows_hello_key_registration_failed` / `no_attestation_hardware` | 303, 310, 311, 317, 385, 6010, 7002, 7611 | `win.eventlog.identity_security.whfb_key_status` |  |
| `windows_hello_key_registration_failed` / `user_cancelled` | 303, 310, 311, 317, 385, 6010, 7002, 7611 | `win.eventlog.identity_security.whfb_key_status` |  |
| `windows_hello_provisioning_blocked` / `declined` | 359, 360, 6045, 6055, 7054, 7200, 7201, 7203 | `win.eventlog.identity_security.whfb_device_joined` `win.eventlog.identity_security.whfb_hardware_met` `win.eventlog.identity_security.whfb_policy_enabled` `win.eventlog.identity_security.whfb_primary_refresh_token` `win.eventlog.identity_security.whfb_user_remote` |  |
| `windows_hello_provisioning_blocked` / `not_configured` | 359, 360, 6045, 6055, 7054, 7200, 7201, 7203 | `win.eventlog.identity_security.whfb_device_joined` `win.eventlog.identity_security.whfb_hardware_met` `win.eventlog.identity_security.whfb_policy_enabled` `win.eventlog.identity_security.whfb_primary_refresh_token` `win.eventlog.identity_security.whfb_user_remote` |  |
| `windows_hello_provisioning_blocked` / `prerequisite_unmet` | 7054, 7200, 7201, 7203 | `win.eventlog.identity_security.whfb_device_joined` `win.eventlog.identity_security.whfb_hardware_met` `win.eventlog.identity_security.whfb_policy_enabled` `win.eventlog.identity_security.whfb_primary_refresh_token` `win.eventlog.identity_security.whfb_user_remote` |  |
| `windows_hello_provisioning_blocked` / `remote_session` | 359, 360, 6045, 6055, 7054, 7200, 7201, 7203 | `win.eventlog.identity_security.whfb_device_joined` `win.eventlog.identity_security.whfb_hardware_met` `win.eventlog.identity_security.whfb_policy_enabled` `win.eventlog.identity_security.whfb_primary_refresh_token` `win.eventlog.identity_security.whfb_user_remote` |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `applocker_unsupported_windows_edition` / `default`
- `device_encryption_enable_failed` / `default`
- `entra_sign_in_failed` / `credential`
- `entra_sign_in_failed` / `unexplained`
- `entra_sign_in_failed` / `unreachable`
- `laps_password_backup_failed` / `authentication`
- `laps_password_backup_failed` / `backup_failed`
- `laps_password_backup_failed` / `tenant_not_enabled`
