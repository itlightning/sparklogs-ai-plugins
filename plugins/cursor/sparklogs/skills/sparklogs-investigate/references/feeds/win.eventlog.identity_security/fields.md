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
| `win.eventlog.identity_security.code_integrity_requested_level` | int | Signing level Windows Code Integrity required of the file, as a number, from `RequestedPolicy` or `Requested Signing Level` (the spelling depends on the event) on CodeIntegrity load and policy events, or `RequestedSigningLevel` on events 3002 and 3004. |
| `win.eventlog.identity_security.code_integrity_requested_level_name` | string | Name of the signing level Windows required, such as unsigned, Authenticode, Microsoft Store, Microsoft or Windows, from the published list of Code Integrity signing levels. Absent when the number is not on that list. |
| `win.eventlog.identity_security.code_integrity_validated_level` | int | Signing level the file actually carried, as a number, from `ValidatedPolicy` or `Validated Signing Level` on CodeIntegrity load and policy events. When it is lower than the required level, the signature fell short. |
| `win.eventlog.identity_security.code_integrity_validated_level_name` | string | Name of the signing level the file actually carried, such as unsigned, Authenticode, Microsoft Store, Microsoft or Windows, from the published list of Code Integrity signing levels. Absent when the number is not on that list. |
| `win.eventlog.identity_security.code_integrity_policy_name` | string | Name of the application control policy that blocked or would have blocked a file, from `PolicyName` on CodeIntegrity events 3076 and 3077 and AppLocker event 8028. Says which policy is in force. |
| `win.eventlog.identity_security.code_integrity_policy_id` | string | ID of the application control policy, from `PolicyID` on CodeIntegrity events 3076 and 3077. Tells two versions of a policy with the same name apart. |
| `win.eventlog.identity_security.code_integrity_file_user_writable` | bool | Whether the blocked file is in a location an ordinary user can write to, from `UserWriteable` on CodeIntegrity events 3076 and 3077. A user-writable location is where an unwanted program would be dropped. |
| `win.eventlog.identity_security.code_integrity_file_sha256` | string | SHA-256 of the blocked file, from `SHA256 Hash` on CodeIntegrity events 3076 and 3077. Identifies the program by its content wherever it sits. |
| `win.eventlog.identity_security.code_integrity_secure_required` | string | Secure load requirement flag the loader recorded, from `SecureRequired` on CodeIntegrity events 3002, 3004 and 3023, as Windows wrote it. SparkLogs does not decode it. |
| `win.eventlog.identity_security.code_integrity_file` | string | File name (without folder) of the file Code Integrity refused, from `FileNameBuffer` on CodeIntegrity events 3002, 3004, 3023, 3033, 3066 and 3086. Group by it to find one file that keeps being refused. |
| `win.eventlog.identity_security.code_integrity_catalog` | string | File name of the signature catalog Code Integrity could not read, from `FileNameBuffer` on CodeIntegrity event 3010. The catalog arrives with the Windows update or package that installed it. |
| `win.eventlog.identity_security.mitigation_process` | string | File name (without folder) of the process an exploit protection mitigation acted on, from `ProcessPath` on Security-Mitigations events. A process name that appears for the first time often marks an application that just started breaking. |
| `win.eventlog.identity_security.shadow_stack_nonenforcement_reason` | int | Reason code Windows gave for letting a process keep running after a shadow stack (hardware-enforced stack protection) mismatch, from `NonenforcementReason` on Security-Mitigations event 25, as a number. SparkLogs does not decode it. |
| `win.eventlog.identity_security.shadow_stack_control_pc_image` | string | File name (without folder) of the module the mismatched return address points into, from `ControlPcImageName` on Security-Mitigations events 25 and 28. Usually names the module that caused the mismatch. |
| `win.eventlog.identity_security.entra_error_message` | string | Error text the Microsoft Entra sign-in library wrote for a failed token request, from `ErrorMessage` on AAD Operational events. Tells a network failure from a tenant configuration problem. |
| `win.eventlog.identity_security.correlation_id` | string | Correlation ID Microsoft Entra stamped on one sign-in or token attempt, from `CorrelationID` on AAD Operational events. Each attempt gets a new one. Use it to find the same attempt in the Entra sign-in logs. |
| `win.eventlog.identity_security.http_status` | int | HTTP status code the registration service returned, from `HttpStatus` on User Device Registration failure events. Tells a refusal by the service from a network failure. |
| `win.eventlog.identity_security.directory_error_code` | int | Detail error code under a device registration failure, from `ErrorCode` on User Device Registration failure events that also carry an exit code. Events 220 and 221 carry only this code, and SparkLogs reports it as the result code of those events instead. |
| `win.eventlog.identity_security.directory_error_subcode` | string | Sub-code the registration service gave with a failure, from `ErrorSubcode`, such as one for two devices claiming the same name. The only field that picks out the duplicate device case. |
| `win.eventlog.identity_security.registration_attribute` | string | Device object attribute a registration update was trying to write, from `Attribute` on User Device Registration failure events. |
| `win.eventlog.identity_security.whfb_policy_enabled` | string | Whether a policy turns on Windows Hello for Business for this device, from `NgcPolicyEnabled` on the Windows Hello provisioning checks (User Device Registration 359 and 360, HelloForBusiness events). No means Windows Hello is not configured here, as opposed to a failed rollout. |
| `win.eventlog.identity_security.whfb_user_remote` | string | Whether the user is connected through Remote Desktop, from `UserIsRemote` on the Windows Hello provisioning checks. Windows Hello does not set up over a remote session. |
| `win.eventlog.identity_security.whfb_device_joined` | string | Whether the device is joined to the directory, from `DeviceIsJoined` on the Windows Hello provisioning checks. |
| `win.eventlog.identity_security.whfb_hardware_met` | string | Whether the device meets the Windows Hello for Business hardware requirements, from `NgcHardwarePolicyMet` on the Windows Hello provisioning checks. |
| `win.eventlog.identity_security.whfb_primary_refresh_token` | string | Whether the user signed in with Microsoft Entra credentials and holds a sign-in token, from `AADPrt` on the Windows Hello provisioning checks. Says only whether the token exists. |
| `win.eventlog.identity_security.whfb_key_status` | string | Status of the Windows Hello key as Windows names it, from `KeyStatusSymbolicName` on Windows Hello key registration events, such as a TPM with no attestation support. |
| `win.eventlog.identity_security.dpapi_failure_reason` | int | Reason code Windows data protection (DPAPI) gave for failing to decrypt protected data, from `ReasonForFailure` on Crypto-DPAPI events, as a number. SparkLogs does not decode it. |
| `win.eventlog.identity_security.dpapi_master_key_guid` | string | GUID of the DPAPI master key the decryption tried to use, from `MasterKeyGUID` on Crypto-DPAPI events. Identifies the key only. |
| `win.eventlog.identity_security.crypto_provider` | string | Key storage provider the key operation used, from `ProviderName` on Crypto-NCrypt operational events, such as the software provider or the TPM (platform) provider. The same status code means different things on the two. |
| `win.eventlog.identity_security.crypto_operation_type` | int | Type of key storage operation, from `OperationType` on Crypto-NCrypt operational events, as a number. SparkLogs does not decode it. |
| `win.eventlog.identity_security.crypto_function` | string | Key isolation function that failed, from `Function` on Crypto-NCrypt events 13 and 26. |
| `win.eventlog.identity_security.vbs_can_be_enabled` | int | Whether the platform says virtualization-based key protection can be turned on at all, from `CanBeEnabled` on Crypto-NCrypt events 13 and 26. Zero means the hardware or firmware cannot support it, so retrying will not help. |
| `win.eventlog.identity_security.vbs_restart_attempts` | int | Number of times Windows has tried to restart virtualization-based key protection, from `TotalAttemptedRestarts` on Crypto-NCrypt events 13 and 26. A running total. |
| `win.eventlog.identity_security.vbs_restart_successes` | int | Number of restarts of virtualization-based key protection that succeeded, from `TotalSuccessfulRestarts` on Crypto-NCrypt events 13 and 26. A running total. |
| `win.eventlog.identity_security.gp_connectivity_failure` | bool | Whether Group Policy blamed the network for a failed policy refresh, from `IsConnectivityFailure` on GroupPolicy events 7000 and 7001. Tells a machine off the corporate network from one that cannot reach its own domain. |
| `win.eventlog.identity_security.gp_is_machine` | int | Whether the policy refresh was for the computer (1) or for a user at logon (0), from `IsMachine` on GroupPolicy events 7000 and 7001. |
| `win.eventlog.identity_security.gp_elapsed_seconds` | int | Seconds the failed policy refresh took, from `PolicyElaspedTimeInSeconds` (the field name is misspelled by Windows) on GroupPolicy events 7000 and 7001. |
| `win.eventlog.identity_security.gp_extension_name` | string | Group Policy client-side extension that reported a failure, from `CSEExtensionName` on GroupPolicy events 6016 and 7016, such as Security or Drive Maps. Each extension fails for its own reasons. |
| `win.eventlog.identity_security.gp_extension_id` | string | GUID of that client-side extension, from `CSEExtensionId` on GroupPolicy events 6016 and 7016. The same on every Windows language. |
| `win.eventlog.identity_security.gp_dc_discovery_ms` | int | Milliseconds Group Policy spent looking for a domain controller before it gave up, from `DCDiscoveryTimeInMilliSeconds` on GroupPolicy events 7017, 7320 and 7326. |
| `win.eventlog.identity_security.gp_mutual_auth_enforced` | bool | Whether the machine requires mutual authentication when it reads policy from a file share, from `MutualAuthenticationEnforced` on GroupPolicy event 9001. |
| `win.eventlog.identity_security.gp_integrity_enforced` | bool | Whether the machine requires integrity protection when it reads policy from a file share, from `IntegrityEnforced` on GroupPolicy event 9001. |
| `win.eventlog.identity_security.ntlm_version` | string | NTLM version used, from `NtlmVersion` on NTLM Operational events 4020 to 4023. NTLMv1 is the insecure version to find and remove. |
| `win.eventlog.identity_security.ntlm_usage_reason` | string | Why NTLM was used and not Kerberos, as Windows wrote it, from `NtlmUsageReason` on NTLM Operational events, such as a target name Kerberos could not resolve or a program that asked for NTLM directly. |
| `win.eventlog.identity_security.ntlm_channel_binding` | string | Channel binding status of the NTLM exchange, from `ChannelBindingStatus` on NTLM Operational events. |
| `win.eventlog.identity_security.ntlm_mic_status` | string | Message integrity check status of the NTLM exchange, from `Mic Status` on NTLM Operational events. |
| `win.eventlog.identity_security.bitlocker_backup_target` | string | Where a BitLocker recovery key backup was sent: a Microsoft account (events 829 and 898), Microsoft Entra ID (event 846), or a directory the event does not name (event 872). Set from the event ID. |
| `win.eventlog.identity_security.bitlocker_volume_mount_point` | string | Drive the BitLocker recovery key backup event is about, from `VolumeMountPoint`, as Windows wrote it. Absent when the event does not carry it. |
| `win.eventlog.identity_security.bitlocker_secure_boot_reason` | string | Why BitLocker could not use Secure Boot to protect the drive: Secure Boot is turned off (event 810), the boot measurement log is invalid, or the measurements could not be read. Set from the event ID. |
| `win.eventlog.identity_security.cert_subject` | string | Subject of the certificate that has expired or is about to, from `SubjectName` on CertificateServicesClient Lifecycle events 1002 and 1003. Tells a domain controller or server certificate from an application certificate. |
| `win.eventlog.identity_security.cert_not_valid_after` | string | Expiry time of the certificate, from `NotValidAfter` on CertificateServicesClient Lifecycle events 1002 and 1003, as Windows records it: a UTC date and time such as 2026-03-02T13:01:19Z. A renewed certificate has a new value, so it does not look like a repeat of the old one. |
| `win.eventlog.identity_security.cert_store` | string | Certificate store the certificate is in: machine (the computer store, usually server and infrastructure certificates) or user (the user store), from which Lifecycle channel logged it. |
| `win.eventlog.identity_security.applocker_policy_name` | string | AppLocker rule collection the audit finding came from, from `PolicyName` on AppLocker event 8003, such as the executable or the DLL collection. |
| `win.eventlog.identity_security.applocker_rule_name` | string | AppLocker rule that would have blocked the file, from `RuleName` on AppLocker event 8003. A placeholder name means no rule matched. |
| `win.eventlog.identity_security.applocker_rule_id` | string | ID of the AppLocker rule that would have blocked the file, from `RuleId` on AppLocker event 8003. An all-zero ID means no rule matched, the usual audit finding. |
| `win.eventlog.identity_security.applocker_file_path` | string | Full path of the file the AppLocker audit finding is about, with environment variables expanded, from `FullFilePath` on AppLocker event 8003. |
| `win.eventlog.identity_security.sensor_connection_error_code` | int | Error the Microsoft Defender for Endpoint sensor reported for a failed contact with its service, from `errorCode` or `Int1` on SENSE Operational events, as a number. Usually a WinHTTP error, such as 12007 (the server name did not resolve), not an HTTP status. |
| `win.eventlog.identity_security.sensor_request_type` | string | Request to the Defender for Endpoint token service that failed, from `requestType` on SENSE events 405 and 406. |
| `win.eventlog.identity_security.sensor_contact_failures` | int | Number of failed attempts by the Defender for Endpoint sensor to contact its service in the reported period, from SENSE Operational event 5 (every attempt failed) and event 67 (the failed count beside the total and the successes). |
| `win.eventlog.identity_security.sensor_contact_successes` | int | Number of sensor contacts with its service that succeeded in the reported period, from `UInt3` on SENSE event 67. Any success means the sensor is still reporting. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.destination.host` | Where it was going. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `extension` | not queryable as a field |
| `error_code` | not queryable as a field |

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
| `bitlocker_protection_resume_failed` / `default` | 822 | **fields: none** |  |
| `bitlocker_recovery_info_read_failed` / `fetch_failed` | 868, 875 | **fields: none** |  |
| `bitlocker_recovery_info_read_failed` / `service_refused` | 868, 875 | **fields: none** |  |
| `bitlocker_recovery_key_backup_failed` / `consumer_account` | 829, 846, 872, 898 | `win.eventlog.identity_security.bitlocker_backup_target` `win.eventlog.identity_security.bitlocker_volume_mount_point` |  |
| `bitlocker_recovery_key_backup_failed` / `directory_backup` | 829, 846, 872, 898 | `win.eventlog.identity_security.bitlocker_backup_target` `win.eventlog.identity_security.bitlocker_volume_mount_point` |  |
| `bitlocker_secure_boot_unavailable` / `measurement_invalid` | 810, 811, 812, 813, 815, 834, 835, 878, 881, 893 | `win.eventlog.identity_security.bitlocker_secure_boot_reason` |  |
| `bitlocker_secure_boot_unavailable` / `measurement_unreadable` | 810, 811, 812, 813, 815, 834, 835, 878, 881, 893 | `win.eventlog.identity_security.bitlocker_secure_boot_reason` |  |
| `bitlocker_secure_boot_unavailable` / `secure_boot_disabled` | 810, 811, 812, 813, 815, 834, 835, 878, 881, 893 | `win.eventlog.identity_security.bitlocker_secure_boot_reason` |  |
| `cert_expired` / `default` | 1002, 1003 | `win.eventlog.identity_security.cert_not_valid_after` `win.eventlog.identity_security.cert_store` `win.eventlog.identity_security.cert_subject` |  |
| `cert_expiring` / `default` | 1002, 1003 | `win.eventlog.identity_security.cert_not_valid_after` `win.eventlog.identity_security.cert_store` `win.eventlog.identity_security.cert_subject` |  |
| `code_integrity_catalog_load_failed` / `resource_pressure` | 3010, 3024 | `win.eventlog.identity_security.code_integrity_catalog` |  |
| `code_integrity_catalog_load_failed` / `unreadable` | 3010, 3024 | `win.eventlog.identity_security.code_integrity_catalog` |  |
| `code_integrity_driver_revoked` / `default` | 3023 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_secure_required` |  |
| `code_integrity_image_hash_missing` / `driver` | 3002, 3004 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_secure_required` |  |
| `code_integrity_image_hash_missing` / `user_mode` | 3002, 3004 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_secure_required` |  |
| `code_integrity_policy_audit_would_block` / `default` | 3076, 8028 | `win.eventlog.identity_security.code_integrity_file_sha256` `win.eventlog.identity_security.code_integrity_file_user_writable` `win.eventlog.identity_security.code_integrity_policy_id` `win.eventlog.identity_security.code_integrity_policy_name` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_requested_level_name` `win.eventlog.identity_security.code_integrity_validated_level` `win.eventlog.identity_security.code_integrity_validated_level_name` |  |
| `code_integrity_policy_blocked` / `default` | 3077 | `win.eventlog.identity_security.code_integrity_file_sha256` `win.eventlog.identity_security.code_integrity_file_user_writable` `win.eventlog.identity_security.code_integrity_policy_id` `win.eventlog.identity_security.code_integrity_policy_name` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_requested_level_name` `win.eventlog.identity_security.code_integrity_validated_level` `win.eventlog.identity_security.code_integrity_validated_level_name` |  |
| `code_integrity_signing_level_blocked` / `default` | 3033, 3066, 3086 | `win.eventlog.identity_security.code_integrity_file` `win.eventlog.identity_security.code_integrity_requested_level` `win.eventlog.identity_security.code_integrity_requested_level_name` `win.eventlog.identity_security.code_integrity_validated_level` `win.eventlog.identity_security.code_integrity_validated_level_name` |  |
| `crypto_key_operation_failed` / `key_absent_probe` | 1, 2, 3, 4, 5, 6, 8, 10, 12 | `win.eventlog.identity_security.crypto_operation_type` `win.eventlog.identity_security.crypto_provider` |  |
| `crypto_key_operation_failed` / `other_failure` | 1, 2, 3, 4, 5, 6, 8, 10, 12 | `win.eventlog.identity_security.crypto_operation_type` `win.eventlog.identity_security.crypto_provider` |  |
| `crypto_key_operation_failed` / `platform_provider_failure` | 1, 2, 3, 4, 5, 6, 8, 10, 12 | `win.eventlog.identity_security.crypto_operation_type` `win.eventlog.identity_security.crypto_provider` |  |
| `defender_sensor_connection_failed` / `contact_failed` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `defender_sensor_connection_failed` / `name_resolution` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `defender_sensor_connection_failed` / `ndr_component_not_started` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `defender_sensor_connection_failed` / `partial` | 5, 67, 101, 405, 406, 409 | `win.eventlog.identity_security.sensor_connection_error_code` `win.eventlog.identity_security.sensor_contact_failures` `win.eventlog.identity_security.sensor_contact_successes` `win.eventlog.identity_security.sensor_request_type` |  |
| `device_encryption_enable_failed` / `automatic` | 851, 853, 854, 4103 | **fields: none** |  |
| `device_encryption_enable_failed` / `automatic_no_account` | 851, 853, 854, 4103 | **fields: none** |  |
| `device_encryption_enable_failed` / `silent` | 851, 853, 854, 4103 | **fields: none** |  |
| `device_encryption_enable_failed` / `silent_no_tpm` | 851, 853, 854, 4103 | **fields: none** |  |
| `device_encryption_enable_failed` / `silent_no_winre` | 851, 853, 854, 4103 | **fields: none** |  |
| `device_registration_failed` / `attempt_failed` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_code` `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `directory_refused` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `directory_unreachable` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `duplicate_identity` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_code` `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `device_registration_failed` / `quota_exceeded` | 204, 220, 221, 233, 252, 258, 304, 307 | `win.eventlog.identity_security.directory_error_code` `win.eventlog.identity_security.directory_error_subcode` `win.eventlog.identity_security.http_status` `win.eventlog.identity_security.registration_attribute` |  |
| `dpapi_unprotect_failed` / `bad_key_state` | 8196, 8198, 8202, 8204, 8205 | `win.eventlog.identity_security.dpapi_failure_reason` `win.eventlog.identity_security.dpapi_master_key_guid` |  |
| `dpapi_unprotect_failed` / `credential_mismatch` | 8196, 8198, 8202, 8204, 8205 | `win.eventlog.identity_security.dpapi_failure_reason` `win.eventlog.identity_security.dpapi_master_key_guid` |  |
| `dpapi_unprotect_failed` / `unprotect_incomplete` | 8196, 8198, 8202, 8204, 8205 | `win.eventlog.identity_security.dpapi_failure_reason` `win.eventlog.identity_security.dpapi_master_key_guid` |  |
| `entra_device_certificate_update_failed` / `logon_or_network` | 1131, 1256 | `win.eventlog.identity_security.correlation_id` |  |
| `entra_device_certificate_update_failed` / `other_status` | 1131, 1256 | `win.eventlog.identity_security.correlation_id` |  |
| `entra_sign_in_failed` / `credential` | 1085, 1086, 1160, 1161, 1162 | **fields: none** |  |
| `entra_sign_in_failed` / `unexplained` | 1085, 1086, 1160, 1161, 1162 | **fields: none** |  |
| `entra_sign_in_failed` / `unreachable` | 1085, 1086, 1160, 1161, 1162 | **fields: none** |  |
| `entra_token_acquisition_failed` / `account_state` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `app_registration` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `configuration` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `device_key` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `fallback_step` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
| `entra_token_acquisition_failed` / `first_party_preauthorization` | 1084, 1094, 1097, 1098, 1112, 1155, 1202, 1215 | `win.eventlog.identity_security.correlation_id` `win.eventlog.identity_security.entra_error_message` |  |
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
| `group_policy_extension_apply_failed` / `no_changes` | 6016, 7016 | `win.eventlog.identity_security.gp_extension_id` `win.eventlog.identity_security.gp_extension_name` |  |
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
| `applocker_managed_installer_check_failed` | 8033 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `applocker_unsupported_windows_edition` / `default`
- `bitlocker_protection_resume_failed` / `default`
- `bitlocker_recovery_info_read_failed` / `fetch_failed`
- `bitlocker_recovery_info_read_failed` / `service_refused`
- `device_encryption_enable_failed` / `automatic`
- `device_encryption_enable_failed` / `automatic_no_account`
- `device_encryption_enable_failed` / `silent`
- `device_encryption_enable_failed` / `silent_no_tpm`
- `device_encryption_enable_failed` / `silent_no_winre`
- `entra_sign_in_failed` / `credential`
- `entra_sign_in_failed` / `unexplained`
- `entra_sign_in_failed` / `unreachable`
- `laps_password_backup_failed` / `authentication`
- `laps_password_backup_failed` / `backup_failed`
- `laps_password_backup_failed` / `tenant_not_enabled`
- `applocker_managed_installer_check_failed`
