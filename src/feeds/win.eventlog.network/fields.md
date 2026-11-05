<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.network`

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

Stored flat under the `win.eventlog.network.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.network.conflict_ip_address` | string | IP address the DHCP or DHCPv6 client found already in use by another device on the network, read from the message of event 1005. |
| `win.eventlog.network.dns_query_name` | string | DNS name the client was looking up when the lookup timed out, from `QueryName` on DNS-Client event 1013. |
| `win.eventlog.network.firewall_rule_action` | int | Action of the firewall rule (allow or block), as the number the Windows Firewall event writes in `Action`, on rule added, changed and deleted events. |
| `win.eventlog.network.firewall_rule_active` | int | Whether the firewall rule is turned on: 1 on, 0 off, from `Active` on Windows Firewall rule events. |
| `win.eventlog.network.firewall_rule_application_path` | string | Program path the firewall rule applies to, from `ApplicationPath` on Windows Firewall rule events. |
| `win.eventlog.network.firewall_rule_direction` | int | Direction of the firewall rule (inbound or outbound), as the number the Windows Firewall event writes in `Direction`. |
| `win.eventlog.network.firewall_rule_local_ports` | string | Local ports the firewall rule matches, as the rule states them (a port, a list or a range), from `LocalPorts` on Windows Firewall rule events. |
| `win.eventlog.network.firewall_rule_origin` | int | Where the firewall rule came from (for example local settings or Group Policy), as the number the Windows Firewall event writes in `Origin`. |
| `win.eventlog.network.firewall_rule_profiles` | int | Network profiles the firewall rule applies to, as the number in `Profiles`: add 1 for Domain, 2 for Private and 4 for Public. |
| `win.eventlog.network.firewall_rule_protocol` | int | IP protocol number the firewall rule matches, from `Protocol`: 6 TCP, 17 UDP, 256 any. |
| `win.eventlog.network.firewall_rule_remote_ports` | string | Remote ports the firewall rule matches, as the rule states them, from `RemotePorts` on Windows Firewall rule events. |
| `win.eventlog.network.firewall_rule_service_name` | string | Windows service the firewall rule applies to, from `ServiceName` on Windows Firewall rule events. |
| `win.eventlog.network.ncsi_capability` | int | Connectivity Windows reports after losing internet access, from `Capability` on NCSI event 4042: 0 no connectivity, 1 local network only. Present only when the previous state was internet access. |
| `win.eventlog.network.ncsi_change_reason` | int | Reason code NCSI gives for the loss of internet access, from `CapabilityChangeReason` on event 4042, as a number. The message names the reason in words. |
| `win.eventlog.network.ncsi_family` | int | Address family that lost internet access, from `Family` on NCSI event 4042, as a number (0 is IPv4). The message names it in words. |
| `win.eventlog.network.offline_files_failed_count` | int | Number of files Offline Files failed to sync, from `FailedFileCount` on OfflineFiles event 1006. |
| `win.eventlog.network.offline_files_path` | string | Folder or share the Offline Files sync was for, from `Path` on OfflineFiles events 1006 and 1008. |
| `win.eventlog.network.printer_name` | string | Name of the printer Remote Desktop redirected into the session, from TerminalServices-Printers events 1108 and 1109. |
| `win.eventlog.network.rule_id` | string | ID of the firewall rule, from `RuleId` on Windows Firewall rule added, changed and deleted events. |
| `win.eventlog.network.rule_name` | string | Display name of the firewall rule, from `RuleName` on Windows Firewall rule added, changed and deleted events. |
| `win.eventlog.network.smb_auth_protocol_new` | int | Authentication protocol the SMB client used after it signed in to the server again, from `NewAuthProtocolId` on SMBClient event 31019, as a number. |
| `win.eventlog.network.smb_auth_protocol_old` | int | Authentication protocol the SMB client used before it signed in to the server again, from `OldAuthProtocolId` on SMBClient event 31019, as a number. |
| `win.eventlog.network.smb_call_duration_secs` | int | Seconds a security call by the SMB client took, from `CallDuration` on SMBClient event 30955. |
| `win.eventlog.network.smb_call_function` | string | Security function the SMB client called that took too long, from `FunctionName` on SMBClient event 30955. |
| `win.eventlog.network.smb_call_threshold_secs` | int | Seconds a security call may take before the SMB client logs it as slow, from `ThresholdDuration` on SMBClient event 30955. |
| `win.eventlog.network.smb_command` | int | SMB2 command number of the request that failed signing or encryption checks, from `Smb2Command` on SMBClient events 31013 and 31014. |
| `win.eventlog.network.smb_connection_type` | int | Type of SMB connection, as the number Windows writes in `ConnectionType`, from SMBClient connectivity events and SMBServer event 4000. |
| `win.eventlog.network.smb_durable_handle` | bool | Whether the file handle the SMB server could not reopen was durable, from `DurableHandle` on SMBServer event 1016. |
| `win.eventlog.network.smb_elapsed_ms` | int | Milliseconds the SMB client spent on the connection attempt, from `ElapsedTimeInMs` on SMBClient connectivity events. |
| `win.eventlog.network.smb_encryption_used` | bool | Whether the SMB connection or share was encrypted, from `EncryptionUsed` on SMBClient event 30808 or SMBServer event 4000. |
| `win.eventlog.network.smb_granted_access` | string | Access mask the SMB server granted on the share, from `GrantedAccess` on SMBServer event 1006, as Windows wrote it. |
| `win.eventlog.network.smb_logon_id` | string | Logon session ID of the user whose SMB sign-in failed, from `LogonId` on SMBClient security events. |
| `win.eventlog.network.smb_mapped_access` | string | Access mask the client asked for, as the SMB server mapped it, from `MappedAccess` on SMBServer event 1006, as Windows wrote it. |
| `win.eventlog.network.smb_message_id` | int | Message ID of the SMB request that failed signing or encryption checks, from `MessageId` on SMBClient events 31013 and 31014. |
| `win.eventlog.network.smb_mutual_auth_lost` | bool | True when the SMB client had mutual authentication with the server before signing in again and lost it after, from SMBClient event 31019. |
| `win.eventlog.network.smb_ntlm_blocked` | bool | Whether NTLM was blocked on the SMB connection, from `NTLMBlocked` on SMBServer event 4000. |
| `win.eventlog.network.smb_operation_duration` | int | Time an SMB server operation took, in milliseconds, from SMBServer events 1020 (file system), 1047 (session setup) and 1054 (network). Event 1047 states it in seconds; it is stored in milliseconds like the others. |
| `win.eventlog.network.smb_operation_threshold` | int | Time an SMB server operation may take before the server logs it as slow, in milliseconds, from SMBServer events 1020, 1047 and 1054. Event 1047 states it in seconds; it is stored in milliseconds like the others. |
| `win.eventlog.network.smb_persistent_handle` | bool | Whether the file handle the SMB server could not reopen was persistent (continuously available), from `PersistentHandle` on SMBServer event 1016. |
| `win.eventlog.network.smb_reason_code` | int | Reason code the SMB client or server gave for the failure, from `Reason` or `ReasonCode`, as a number. |
| `win.eventlog.network.smb_resilient_handle` | bool | Whether the file handle the SMB server could not reopen was resilient, from `ResilientHandle` on SMBServer event 1016. |
| `win.eventlog.network.smb_retry_count` | int | Number of times the SMB client retried the connection, from `RetryCount` on SMBClient connectivity events. |
| `win.eventlog.network.smb_session_id` | string | SMB session ID, from `SessionId` on SMBClient and SMBServer events. Filter on it to follow one session. |
| `win.eventlog.network.smb_setting_default` | int | Default value of the SMB security setting, from `DefaultLmCompatibilityLevel` on SMBServer event 1021. |
| `win.eventlog.network.smb_setting_name` | string | Name of the SMB or LAN Manager security setting the event reports, from `RegName` on SMBClient events 31003, 31016 and 31018, or LmCompatibilityLevel on SMBServer event 1021. |
| `win.eventlog.network.smb_setting_value` | int | Value the SMB or LAN Manager security setting is configured to, from `RegValue` on SMBClient events 31003, 31016 and 31018, or `ConfiguredLmCompatibilityLevel` on SMBServer event 1021. |
| `win.eventlog.network.smb_share_name` | string | SMB share the event is about: the share part of the UNC path in `ServerName`, or `ShareName` where the event carries one. |
| `win.eventlog.network.smb_signing_used` | bool | Whether the SMB connection or share used signing, from `SigningUsed` on SMBClient event 30808 or SMBServer event 4000. |
| `win.eventlog.network.smb_spn_validation_policy` | int | SPN validation policy the SMB server applied, from `SPNValidationPolicy` on SMBServer event 551, as a number. |
| `win.eventlog.network.smb_tree_id` | int | Tree connect ID (one connection to a share) on SMBClient events, from `TreeId`. |
| `win.eventlog.network.wlan_adapter` | string | Wireless adapter, as Windows describes it, from `Adapter` or `InterfaceDescription` on WLAN-AutoConfig events. |
| `win.eventlog.network.wlan_bss_type` | string | Wireless network type, such as infrastructure, from `BSSType` on WLAN-AutoConfig events. |
| `win.eventlog.network.wlan_connection_mode` | string | How the wireless connection was started, such as automatically with a profile, from `ConnectionMode` on WLAN-AutoConfig events 8002 and 8003. |
| `win.eventlog.network.wlan_failure_reason` | string | Reason Windows gives in words for the failed wireless connection, from `FailureReason` on WLAN-AutoConfig event 8002. |
| `win.eventlog.network.wlan_profile_name` | string | Wireless profile (usually the network name) the connection used, from `ProfileName` on WLAN-AutoConfig events 8002 and 8003. |
| `win.eventlog.network.wlan_reason_code` | int | Reason code for the wireless failure or disconnect, from `ReasonCode` on WLAN-AutoConfig events 8002, 8003 and 11006, stored as a number. Event Viewer shows it in decimal on 8002 and 8003 and in hex on 11006 (0x50005 is 327685). Absent when the event carries no readable code. |
| `win.eventlog.network.wlan_reason_text` | string | Reason Windows gives in words for the failed wireless security exchange, from `ReasonText` on WLAN-AutoConfig event 11006. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.throttle.window_s` |  |
| `sparklogs.config_change.type` | The kind of object that changed, from a closed set of object nouns. |
| `sparklogs.config_change.action` | What was done to that object, from a closed set of verbs. |
| `sparklogs.config_change.target` | Which object it was: its own identity within its kind, as a name, a path or an id. A different field from the principal a change acted on, and a change acting on a principal carries both. |
| `sparklogs.config_change.target_name` | The object's name for a reader at the time of the change. Display only: join and group on target, never on this. |
| `sparklogs.config_change.category` | Positive upkeep classification, maintenance when established, omitted otherwise. |
| `sparklogs.actor.id` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.type` | The initiator. Who wanted the thing done. |
| `sparklogs.process.path` | The process the event is about. |
| `sparklogs.process.name` | The process the event is about. |
| `sparklogs.destination.host` | Where it was going. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `component` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `dhcp_lease_denied` / `default` | 1002 | **fields: none** |  |
| `dhcp_lease_failed` / `default` | 1001, 1003 | **fields: none** |  |
| `dns_client_resolution_timed_out` / `default` | 1013 | `win.eventlog.network.dns_query_name` |  |
| `firewall_rule_changed` / `single_rule` | 2005, 2099 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_active` `win.eventlog.network.firewall_rule_application_path` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_local_ports` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.firewall_rule_protocol` `win.eventlog.network.firewall_rule_remote_ports` `win.eventlog.network.firewall_rule_service_name` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_changed` / `upkeep` | 2005, 2099 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_active` `win.eventlog.network.firewall_rule_application_path` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_local_ports` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.firewall_rule_protocol` `win.eventlog.network.firewall_rule_remote_ports` `win.eventlog.network.firewall_rule_service_name` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_created` / `single_rule` | 2004, 2097 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_active` `win.eventlog.network.firewall_rule_application_path` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_local_ports` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.firewall_rule_protocol` `win.eventlog.network.firewall_rule_remote_ports` `win.eventlog.network.firewall_rule_service_name` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_created` / `upkeep` | 2004, 2097 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_active` `win.eventlog.network.firewall_rule_application_path` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_local_ports` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.firewall_rule_protocol` `win.eventlog.network.firewall_rule_remote_ports` `win.eventlog.network.firewall_rule_service_name` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_deleted` / `all_rules` | 2033 | **fields: none** |  |
| `firewall_rule_deleted` / `all_rules_upkeep` | 2033 | **fields: none** |  |
| `firewall_rule_deleted` / `single_rule` | 2006, 2052 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_deleted` / `upkeep` | 2006, 2052 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `ip_address_conflict_detected` / `default` | 1005 | `win.eventlog.network.conflict_ip_address` |  |
| `ncsi_internet_lost` / `default` | 4042 | `win.eventlog.network.ncsi_capability` `win.eventlog.network.ncsi_change_reason` `win.eventlog.network.ncsi_family` |  |
| `offline_files_slow_link_transition_blocked` / `default` | 1008 | `win.eventlog.network.offline_files_path` |  |
| `offline_files_sync_failed` / `default` | 1006 | `win.eventlog.network.offline_files_failed_count` `win.eventlog.network.offline_files_path` |  |
| `rds_redirected_printer_setup_failed` / `config_not_restored` | 1108, 1109 | `win.eventlog.network.printer_name` |  |
| `rds_redirected_printer_setup_failed` / `default_not_set` | 1108, 1109 | `win.eventlog.network.printer_name` |  |
| `smb_anonymous_access_denied` / `server` | 1007, 1009 | `win.eventlog.network.smb_session_id` |  |
| `smb_anonymous_access_denied` / `share` | 1007, 1009 | `win.eventlog.network.smb_share_name` |  |
| `smb_anonymous_access_enabled` / `default` | 1025 | **fields: none** |  |
| `smb_client_auth_context_failed` / `logon_denied` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` |  |
| `smb_client_auth_context_failed` / `no_authority` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` |  |
| `smb_client_auth_context_failed` / `other` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` |  |
| `smb_client_auth_context_failed` / `wrong_principal` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` |  |
| `smb_client_mutual_auth_lost` / `default` | 31019 | `win.eventlog.network.smb_auth_protocol_new` `win.eventlog.network.smb_auth_protocol_old` `win.eventlog.network.smb_mutual_auth_lost` |  |
| `smb_client_security_call_slow` / `default` | 30955 | `win.eventlog.network.smb_call_duration_secs` `win.eventlog.network.smb_call_function` `win.eventlog.network.smb_call_threshold_secs` |  |
| `smb_connect_failed` / `access_denied` | 30803, 30809, 30816, 30823, 31010 | `win.eventlog.network.smb_connection_type` `win.eventlog.network.smb_elapsed_ms` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_retry_count` `win.eventlog.network.smb_share_name` |  |
| `smb_connect_failed` / `connection_failed` | 30803, 30809, 30816, 30823, 31010 | `win.eventlog.network.smb_connection_type` `win.eventlog.network.smb_elapsed_ms` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_retry_count` `win.eventlog.network.smb_share_name` |  |
| `smb_connect_failed` / `timeout` | 30803, 30809, 30816, 30823, 31010 | `win.eventlog.network.smb_connection_type` `win.eventlog.network.smb_elapsed_ms` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_retry_count` `win.eventlog.network.smb_share_name` |  |
| `smb_insecure_guest_allowed` / `default` | 31022 | **fields: none** |  |
| `smb_insecure_guest_rejected` / `default` | 31017 | **fields: none** |  |
| `smb_legacy_dialect_rejected` / `default` | 1001 | **fields: none** |  |
| `smb_security_setting_nondefault` / `guest_auth` | 1021, 31003, 31016, 31018 | `win.eventlog.network.smb_setting_name` `win.eventlog.network.smb_setting_value` |  |
| `smb_security_setting_nondefault` / `lm_compatibility` | 1021, 31003, 31016, 31018 | `win.eventlog.network.smb_setting_default` `win.eventlog.network.smb_setting_name` `win.eventlog.network.smb_setting_value` |  |
| `smb_security_setting_nondefault` / `signing` | 1021, 31003, 31016, 31018 | `win.eventlog.network.smb_setting_name` `win.eventlog.network.smb_setting_value` |  |
| `smb_server_name_unresolved` / `default` | 30800 | `win.eventlog.network.smb_reason_code` |  |
| `smb_server_operation_slow` / `filesystem` | 1020, 1047, 1054 | `win.eventlog.network.smb_operation_duration` `win.eventlog.network.smb_operation_threshold` `win.eventlog.network.smb_share_name` |  |
| `smb_server_operation_slow` / `network` | 1020, 1047, 1054 | `win.eventlog.network.smb_operation_duration` `win.eventlog.network.smb_operation_threshold` `win.eventlog.network.smb_share_name` |  |
| `smb_server_operation_slow` / `session_setup` | 1020, 1047, 1054 | `win.eventlog.network.smb_operation_duration` `win.eventlog.network.smb_operation_threshold` `win.eventlog.network.smb_share_name` |  |
| `smb_session_auth_failed` / `anonymous_refused` | 551 | `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_spn_validation_policy` |  |
| `smb_session_auth_failed` / `credential_refused` | 551 | `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_spn_validation_policy` |  |
| `smb_session_lost` / `lost` | 30805, 30806 | `win.eventlog.network.smb_session_id` |  |
| `smb_session_lost` / `recovered` | 30805, 30806 | `win.eventlog.network.smb_session_id` |  |
| `smb_session_reopen_failed` / `default` | 1016 | `win.eventlog.network.smb_durable_handle` `win.eventlog.network.smb_persistent_handle` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_resilient_handle` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_share_name` |  |
| `smb_share_access_denied` / `default` | 1006 | `win.eventlog.network.smb_granted_access` `win.eventlog.network.smb_mapped_access` `win.eventlog.network.smb_share_name` |  |
| `smb_share_connection_lost` / `lost` | 30807, 30808 | `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_share_name` `win.eventlog.network.smb_tree_id` |  |
| `smb_share_connection_lost` / `recovered` | 30807, 30808 | `win.eventlog.network.smb_encryption_used` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_share_name` `win.eventlog.network.smb_signing_used` `win.eventlog.network.smb_tree_id` |  |
| `smb_signing_validation_failed` / `encryption` | 31013, 31014 | `win.eventlog.network.smb_command` `win.eventlog.network.smb_message_id` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_tree_id` |  |
| `smb_signing_validation_failed` / `signing` | 31013, 31014 | `win.eventlog.network.smb_command` `win.eventlog.network.smb_message_id` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_tree_id` |  |
| `wfp_transaction_watchdog_timeout` / `default` | 1030, 5150 | **fields: none** |  |
| `wlan_connect_failed` / `join_failed` | 8002 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_connection_mode` `win.eventlog.network.wlan_failure_reason` `win.eventlog.network.wlan_profile_name` `win.eventlog.network.wlan_reason_code` |  |
| `wlan_connect_failed` / `not_visible` | 8002 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_connection_mode` `win.eventlog.network.wlan_failure_reason` `win.eventlog.network.wlan_profile_name` `win.eventlog.network.wlan_reason_code` |  |
| `wlan_disconnected` / `default` | 8003 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_connection_mode` `win.eventlog.network.wlan_profile_name` `win.eventlog.network.wlan_reason_code` |  |
| `wlan_disconnected_by_request` / `default` | 8003 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_connection_mode` `win.eventlog.network.wlan_profile_name` `win.eventlog.network.wlan_reason_code` |  |
| `wlan_security_handshake_failed` / `default` | 11006 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_reason_code` `win.eventlog.network.wlan_reason_text` |  |
| `firewall_setting_changed` | 2083 | **fields: none** |  |
| `rdp_client_component_error` | 1033 | **fields: none** |  |
| `rdp_connection_accepted` | 131 | **fields: none** |  |
| `rdp_connection_lifecycle` | 65, 72, 102, 141, 143, 145, 148, 226, 261 | **fields: none** |  |
| `rdp_sign_in_failed` | 140 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `dhcp_lease_denied` / `default`
- `dhcp_lease_failed` / `default`
- `firewall_rule_deleted` / `all_rules`
- `firewall_rule_deleted` / `all_rules_upkeep`
- `smb_anonymous_access_enabled` / `default`
- `smb_insecure_guest_allowed` / `default`
- `smb_insecure_guest_rejected` / `default`
- `smb_legacy_dialect_rejected` / `default`
- `wfp_transaction_watchdog_timeout` / `default`
- `firewall_setting_changed`
- `rdp_client_component_error`
- `rdp_connection_accepted`
- `rdp_connection_lifecycle`
- `rdp_sign_in_failed`
