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
| `win.eventlog.network.dns_query_name` | string | DNS query name from a client resolution timeout. |
| `win.eventlog.network.firewall_rule_action` | int | Firewall rule action code from the dedicated channel. |
| `win.eventlog.network.firewall_rule_direction` | int | Firewall rule direction code. |
| `win.eventlog.network.firewall_rule_origin` | int | Firewall rule origin code. |
| `win.eventlog.network.firewall_rule_profiles` | int | Firewall rule profile bitmask. |
| `win.eventlog.network.offline_files_failed_count` | int | Offline-files sync failure count. |
| `win.eventlog.network.offline_files_path` | string | Offline-files scope path. |
| `win.eventlog.network.printer_name` | string | Redirected printer name from RDS setup. |
| `win.eventlog.network.rule_id` | string | Firewall rule identifier. |
| `win.eventlog.network.rule_name` | string | Firewall rule label. |
| `win.eventlog.network.smb_auth_protocol_new` | int | SMB authentication protocol after re-auth. |
| `win.eventlog.network.smb_auth_protocol_old` | int | SMB authentication protocol before re-auth. |
| `win.eventlog.network.smb_call_duration_secs` | int | SMB security call duration in seconds. |
| `win.eventlog.network.smb_call_function` | string | SMB security function that ran slow. |
| `win.eventlog.network.smb_call_threshold_secs` | int | SMB security call threshold in seconds. |
| `win.eventlog.network.smb_command` | int | SMB2 command number. |
| `win.eventlog.network.smb_connection_type` | int | SMB connection type code. |
| `win.eventlog.network.smb_durable_handle` | bool | Whether the SMB handle was durable. |
| `win.eventlog.network.smb_elapsed_ms` | int | SMB operation elapsed milliseconds. |
| `win.eventlog.network.smb_encryption_used` | bool | Whether SMB encryption was used. |
| `win.eventlog.network.smb_granted_access` | string | SMB granted access mask. |
| `win.eventlog.network.smb_logon_id` | string | SMB logon identifier. |
| `win.eventlog.network.smb_mapped_access` | string | SMB mapped access mask. |
| `win.eventlog.network.smb_message_id` | int | SMB message identifier. |
| `win.eventlog.network.smb_mutual_auth_lost` | bool | Whether mutual authentication was lost. |
| `win.eventlog.network.smb_ntlm_blocked` | bool | Whether NTLM was blocked on the connection. |
| `win.eventlog.network.smb_operation_duration` | int | SMB server operation duration. |
| `win.eventlog.network.smb_operation_threshold` | int | SMB server operation threshold. |
| `win.eventlog.network.smb_persistent_handle` | bool | Whether the SMB handle was persistent. |
| `win.eventlog.network.smb_reason_code` | int | SMB provider reason code. |
| `win.eventlog.network.smb_resilient_handle` | bool | Whether the SMB handle was resilient. |
| `win.eventlog.network.smb_retry_count` | int | SMB retry count. |
| `win.eventlog.network.smb_server_name` | string | Host name of the remote SMB server, with any UNC leader and share suffix removed, so the same host reads the same way on every id that names one. |
| `win.eventlog.network.smb_session_id` | string | SMB session identifier. |
| `win.eventlog.network.smb_setting_default` | int | Shipped default for an SMB security setting. |
| `win.eventlog.network.smb_setting_name` | string | SMB security setting name. |
| `win.eventlog.network.smb_setting_value` | int | Configured SMB security setting value. |
| `win.eventlog.network.smb_share_name` | string | SMB share the event is about: the share segment of a UNC the provider wrote under ServerName, or the ShareName field where the provider states one. |
| `win.eventlog.network.smb_signing_used` | bool | Whether SMB signing was used. |
| `win.eventlog.network.smb_spn_validation_policy` | int | SMB SPN validation policy code. |
| `win.eventlog.network.smb_tree_id` | int | SMB tree connection identifier. |
| `win.eventlog.network.wlan_adapter` | string | Wireless adapter description. |
| `win.eventlog.network.wlan_bss_type` | string | Wireless BSS type. |
| `win.eventlog.network.wlan_connection_mode` | string | Wireless connection mode. |
| `win.eventlog.network.wlan_failure_reason` | string | Wireless failure reason sentence. |
| `win.eventlog.network.wlan_profile_name` | string | Wireless profile name. |
| `win.eventlog.network.wlan_reason_code` | int | Wireless reason code. |
| `win.eventlog.network.wlan_reason_text` | string | Wireless security reason text. |

## Portable families

This module populates no portable family.

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `dhcp_address_conflict_detected` / `default` | 1004 | **fields: none** |  |
| `dhcp_lease_denied` / `default` | 1002 | **fields: none** |  |
| `dhcp_lease_failed` / `default` | 1001, 1003 | **fields: none** |  |
| `dns_client_resolution_timed_out` / `default` | 1013, 1015 | `win.eventlog.network.dns_query_name` |  |
| `firewall_rule_changed` / `added` | 2004, 2005, 2006, 2052, 2097, 2099 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_changed` / `deleted` | 2004, 2005, 2006, 2052, 2097, 2099 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `firewall_rule_changed` / `modified` | 2004, 2005, 2006, 2052, 2097, 2099 | `win.eventlog.network.firewall_rule_action` `win.eventlog.network.firewall_rule_direction` `win.eventlog.network.firewall_rule_origin` `win.eventlog.network.firewall_rule_profiles` `win.eventlog.network.rule_id` `win.eventlog.network.rule_name` |  |
| `offline_files_slow_link_transition_blocked` / `default` | 1008 | `win.eventlog.network.offline_files_path` |  |
| `offline_files_sync_failed` / `default` | 1006 | `win.eventlog.network.offline_files_failed_count` `win.eventlog.network.offline_files_path` |  |
| `rds_redirected_printer_setup_failed` / `config_not_restored` | 1108, 1109 | `win.eventlog.network.printer_name` |  |
| `rds_redirected_printer_setup_failed` / `default_not_set` | 1108, 1109 | `win.eventlog.network.printer_name` |  |
| `smb_anonymous_access_denied` / `server` | 1007, 1009 | `win.eventlog.network.smb_session_id` |  |
| `smb_anonymous_access_denied` / `share` | 1007, 1009 | `win.eventlog.network.smb_share_name` |  |
| `smb_anonymous_access_enabled` / `default` | 1025 | **fields: none** |  |
| `smb_client_auth_context_failed` / `logon_denied` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_server_name` |  |
| `smb_client_auth_context_failed` / `no_authority` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_server_name` |  |
| `smb_client_auth_context_failed` / `other` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_server_name` |  |
| `smb_client_auth_context_failed` / `wrong_principal` | 30801, 31000, 31001, 31002 | `win.eventlog.network.smb_logon_id` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_server_name` |  |
| `smb_client_mutual_auth_lost` / `default` | 31019 | `win.eventlog.network.smb_auth_protocol_new` `win.eventlog.network.smb_auth_protocol_old` `win.eventlog.network.smb_mutual_auth_lost` `win.eventlog.network.smb_server_name` |  |
| `smb_client_security_call_slow` / `default` | 30955 | `win.eventlog.network.smb_call_duration_secs` `win.eventlog.network.smb_call_function` `win.eventlog.network.smb_call_threshold_secs` |  |
| `smb_connect_failed` / `access_denied` | 30803, 30809, 30816, 30823, 31010 | `win.eventlog.network.smb_connection_type` `win.eventlog.network.smb_elapsed_ms` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_retry_count` `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_share_name` |  |
| `smb_connect_failed` / `connection_failed` | 30803, 30809, 30816, 30823, 31010 | `win.eventlog.network.smb_connection_type` `win.eventlog.network.smb_elapsed_ms` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_retry_count` `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_share_name` |  |
| `smb_connect_failed` / `timeout` | 30803, 30809, 30816, 30823, 31010 | `win.eventlog.network.smb_connection_type` `win.eventlog.network.smb_elapsed_ms` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_retry_count` `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_share_name` |  |
| `smb_insecure_guest_allowed` / `default` | 31022 | `win.eventlog.network.smb_server_name` |  |
| `smb_insecure_guest_rejected` / `default` | 31017 | `win.eventlog.network.smb_server_name` |  |
| `smb_legacy_dialect_rejected` / `default` | 1001 | **fields: none** |  |
| `smb_security_setting_nondefault` / `guest_auth` | 1021, 31003, 31016, 31018 | `win.eventlog.network.smb_setting_name` `win.eventlog.network.smb_setting_value` |  |
| `smb_security_setting_nondefault` / `lm_compatibility` | 1021, 31003, 31016, 31018 | `win.eventlog.network.smb_setting_default` `win.eventlog.network.smb_setting_name` `win.eventlog.network.smb_setting_value` |  |
| `smb_security_setting_nondefault` / `signing` | 1021, 31003, 31016, 31018 | `win.eventlog.network.smb_setting_name` `win.eventlog.network.smb_setting_value` |  |
| `smb_server_name_unresolved` / `default` | 30800 | `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_server_name` |  |
| `smb_server_operation_slow` / `filesystem` | 1020, 1047, 1054 | `win.eventlog.network.smb_operation_duration` `win.eventlog.network.smb_operation_threshold` `win.eventlog.network.smb_share_name` |  |
| `smb_server_operation_slow` / `network` | 1020, 1047, 1054 | `win.eventlog.network.smb_operation_duration` `win.eventlog.network.smb_operation_threshold` `win.eventlog.network.smb_share_name` |  |
| `smb_server_operation_slow` / `session_setup` | 1020, 1047, 1054 | `win.eventlog.network.smb_operation_duration` `win.eventlog.network.smb_operation_threshold` `win.eventlog.network.smb_share_name` |  |
| `smb_session_auth_failed` / `anonymous_refused` | 551 | `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_spn_validation_policy` |  |
| `smb_session_auth_failed` / `credential_refused` | 551 | `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_spn_validation_policy` |  |
| `smb_session_lost` / `lost` | 30805, 30806 | `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_session_id` |  |
| `smb_session_lost` / `recovered` | 30805, 30806 | `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_session_id` |  |
| `smb_session_reopen_failed` / `default` | 1016 | `win.eventlog.network.smb_durable_handle` `win.eventlog.network.smb_persistent_handle` `win.eventlog.network.smb_reason_code` `win.eventlog.network.smb_resilient_handle` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_share_name` |  |
| `smb_share_access_denied` / `default` | 1006 | `win.eventlog.network.smb_granted_access` `win.eventlog.network.smb_mapped_access` `win.eventlog.network.smb_share_name` |  |
| `smb_share_connection_lost` / `lost` | 30807, 30808 | `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_share_name` `win.eventlog.network.smb_tree_id` |  |
| `smb_share_connection_lost` / `recovered` | 30807, 30808 | `win.eventlog.network.smb_encryption_used` `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_share_name` `win.eventlog.network.smb_signing_used` `win.eventlog.network.smb_tree_id` |  |
| `smb_signing_validation_failed` / `encryption` | 31013, 31014 | `win.eventlog.network.smb_command` `win.eventlog.network.smb_message_id` `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_tree_id` |  |
| `smb_signing_validation_failed` / `signing` | 31013, 31014 | `win.eventlog.network.smb_command` `win.eventlog.network.smb_message_id` `win.eventlog.network.smb_server_name` `win.eventlog.network.smb_session_id` `win.eventlog.network.smb_tree_id` |  |
| `wfp_transaction_watchdog_timeout` / `default` | 5150 | **fields: none** |  |
| `wlan_connect_failed` / `join_failed` | 8002 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_connection_mode` `win.eventlog.network.wlan_failure_reason` `win.eventlog.network.wlan_profile_name` `win.eventlog.network.wlan_reason_code` |  |
| `wlan_connect_failed` / `not_visible` | 8002 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_connection_mode` `win.eventlog.network.wlan_failure_reason` `win.eventlog.network.wlan_profile_name` `win.eventlog.network.wlan_reason_code` |  |
| `wlan_security_handshake_failed` / `default` | 11006 | `win.eventlog.network.wlan_adapter` `win.eventlog.network.wlan_bss_type` `win.eventlog.network.wlan_reason_code` `win.eventlog.network.wlan_reason_text` |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `dhcp_address_conflict_detected` / `default`
- `dhcp_lease_denied` / `default`
- `dhcp_lease_failed` / `default`
- `smb_anonymous_access_enabled` / `default`
- `smb_legacy_dialect_rejected` / `default`
- `wfp_transaction_watchdog_timeout` / `default`
