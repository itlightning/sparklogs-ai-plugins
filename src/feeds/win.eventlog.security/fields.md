<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.security`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

Message field extraction is disabled on this module.
The rendered `key=value` tail exists to be READ, not re-parsed: its values are not extracted into fields, so query the promoted field named for each tail key below, never the tail key itself.

## Reconstruction guarantee

71 curated surface(s) drop the vendor body text below the synthesized first line.
That is never data loss: the provider payload is retained at rest, so a dropped body can be reconstructed from it.
What the body said is derivable; what it cost to ship it repeatedly is not.

## Module fields

Stored flat under the `win.eventlog.security.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.security.logon_guid` | string | Logon GUID from `LogonGuid` on 4624, 4768 and 4769. The same GUID ties a sign-in to the Kerberos ticket requests made for it, also across machines. |
| `win.eventlog.security.logon_type` | int | Logon type number on 4624, 4625, 4634 and 4647: 2 interactive, 3 network, 4 batch, 5 service, 7 unlock, 8 network cleartext, 9 new credentials, 10 Remote Desktop, 11 cached interactive. The same number on every Windows language. |
| `win.eventlog.security.logon_type_name` | string | Logon type in words: system, interactive, network, batch, service, unlock, network cleartext, new credentials, remote interactive (Remote Desktop), cached interactive, cached remote interactive, or cached unlock. Absent for a type number not on that list. |
| `win.eventlog.security.auth_package` | string | Authentication package that handled the sign-in on 4624 and 4625, in lowercase, such as kerberos, ntlm or negotiate. Absent when Windows writes a dash. |
| `win.eventlog.security.lm_package` | string | LAN Manager package used on 4624 and 4625, as Windows names it, such as NTLM V2. Use it to find NTLMv1 sign-ins. |
| `win.eventlog.security.token_elevated` | bool | Whether the sign-in on 4624 received a full administrator token (an elevated token). Absent when the event does not say. |
| `win.eventlog.security.privileges` | array | Sensitive privileges given to the new session on 4672, as the Se* privilege names Windows lists, such as SeDebugPrivilege. The names are the same on every Windows language. |
| `win.eventlog.security.workstation` | string | Name of the machine the sign-in came from, as Windows wrote it (usually the NetBIOS name), from `WorkstationName` on 4624 and 4625 or `Workstation` on 4776, 4777 and 4794. |
| `win.eventlog.security.caller_computer` | string | Name of the machine the failed sign-ins came from, as Windows wrote it, from `TargetDomainName` on account lockout event 4740, which Windows shows as Caller Computer Name. The first place to look for what locked the account. |
| `win.eventlog.security.status` | string | Failure code as Windows logged it, in lowercase hex: an NTSTATUS code on 4625, 4776 and 4777, or a Kerberos result code on 4768, 4769, 4770 and 4771. |
| `win.eventlog.security.substatus` | string | Detailed NTSTATUS code on 4625, usually the real cause of the failed sign-in. 0x0 means the status code carries the cause. |
| `win.eventlog.security.status_meaning` | string | Meaning of the failure code in a few words, such as wrong password or account locked, for NTSTATUS codes on 4625, 4776 and 4777 and Kerberos result codes on 4768 to 4771. Absent when SparkLogs has no meaning for the code. |
| `win.eventlog.security.psdirect_handshake` | string | On a failed sign-in 4625 caused by the older Hyper-V PowerShell Direct handshake, the handshake text that Windows logs garbled in the domain field, decoded back to readable text. Absent when it does not decode cleanly. |
| `win.eventlog.security.kerberos_target` | string | Service the Kerberos ticket was requested for, in lowercase, from `ServiceName` on 4768, 4769, 4770 and 4771. On 4769 it shows which service account a Kerberoasting attempt targeted. |
| `win.eventlog.security.ticket_encryption_type` | string | Kerberos ticket encryption type as Windows logged it, in hex, on 4768, 4769 and 4770. 0x17 and 0x18 are the weak RC4 types. |
| `win.eventlog.security.etype_meaning` | string | RC4 encryption type in words (RC4-HMAC or RC4-HMAC-EXP) when the Kerberos ticket used one. Absent for every other encryption type. |
| `win.eventlog.security.target_server` | string | Server the explicit credentials were used for, as Windows wrote it, from `TargetServerName` on 4648. Often localhost. |
| `win.eventlog.security.audit_subcategory_guid` | string | GUID of the audit policy subcategory that changed, from `SubcategoryGuid` on 4719 and 4912, in lowercase with braces. |
| `win.eventlog.security.new_process_id` | string | Process ID of the new process on 4688, in the hex form Windows logged. The matching 4689 exit event carries the same hex value, but exits are collected only when the process ended with a non-zero status. |
| `win.eventlog.security.uac_token_type` | string | UAC token type of the new process on 4688, from `TokenElevationType`: unsplit (UAC made no limited copy, as for a built-in account or with UAC off), full (elevated, run as administrator) or limited (standard user rights). Absent when Windows writes another value. |
| `win.eventlog.security.integrity_level` | string | Integrity level of the new process on 4688, from `MandatoryLabel`: untrusted, low, medium, high or system. Absent for any other label. |
| `win.eventlog.security.integrity_level_sid` | string | Integrity level SID of the new process on 4688, as Windows logged it in `MandatoryLabel`, such as S-1-16-12288 for high. |
| `win.eventlog.security.parent_process_name` | string | Path of the program that started the new process, from 4688. Windows Server 2012 R2 and older do not log it. |
| `win.eventlog.security.service_name` | string | Name of the service that was installed, from 4697. System event 7045 records the same install. |
| `win.eventlog.security.service_image_path` | string | Path of the program the installed service runs, from `ServiceFileName` on 4697, without its command-line arguments. Absent when the path cannot be separated from the arguments with certainty. |
| `win.eventlog.security.service_account` | string | Account the installed service runs as, from 4697. Absent when the event leaves it blank, which means LocalSystem. |
| `win.eventlog.security.task_name` | string | Path of the scheduled task, from 4698, 4699, 4700, 4701 and 4702. The task XML is not collected in this field. |
| `win.eventlog.security.exit_status` | string | Non-zero exit status a process ended with on 4689, as Windows logged it in `Status`, for exits that are not crashes. Only the program that returned it can say what it means. |
| `win.eventlog.security.object_name` | string | Object path from `ObjectName`: the registry key on 4657, or the object whose audit settings changed on 4907. |
| `win.eventlog.security.object_type` | string | Kind of object whose audit settings changed on 4907, from `ObjectType`, such as File or Key. |
| `win.eventlog.security.object_value_name` | string | Registry value that was created, changed or deleted, from `ObjectValueName` on 4657. The old and new data are not collected, since they can hold credentials. |
| `win.eventlog.security.operation_meaning` | string | Registry operation on 4657: value created, value modified or value deleted. |
| `win.eventlog.security.previous_time` | string | System clock time before the change on 4616, in UTC as ISO 8601 with microseconds. Absent when Windows writes a value SparkLogs cannot read. |
| `win.eventlog.security.new_time` | string | System clock time after the change on 4616, in UTC as ISO 8601 with microseconds. Absent when Windows writes a value SparkLogs cannot read. |
| `win.eventlog.security.insecure_boot_flags` | string | Boot settings found turned on at 4826 that let the boot load unsigned or debugger-attached kernel code: TestSigning, KernelDebug or DisableIntegrityChecks, separated by commas. |
| `win.eventlog.security.rule_name` | string | Display name of the firewall rule, from Windows Firewall audit events 4946, 4947, 4948 and 4957. |
| `win.eventlog.security.rule_id` | string | ID of the firewall rule, from Windows Firewall audit events 4946, 4947, 4948 and 4957. It stays the same when the rule is renamed. |
| `win.eventlog.security.firewall_rule_condition` | string | Rule condition Windows Firewall could not apply on 4957, from `RuleAttr`, such as Remote Addresses or Local Port. It is why the rule was not applied. |
| `win.eventlog.security.firewall_setting_type` | string | Firewall setting that changed on 4950, from `SettingType`, such as Default Inbound Action. |
| `win.eventlog.security.firewall_setting_value` | string | New value of the firewall setting on 4950, from `SettingValue`, such as Block or No. |
| `win.eventlog.security.share_name` | string | Name of the network share, from 5142 (share added) and from 5145 access checks for writes, renames, deletes and permission changes. |
| `win.eventlog.security.share_path` | string | Local folder behind the share, from `ShareLocalPath` on 5142 and 5145. A share of the system drive root needs more scrutiny. |
| `win.eventlog.security.share_relative_target` | string | Path inside the share of the file or folder the 5145 access check was for, from `RelativeTargetName`: what was written, renamed, deleted or had its permissions changed. |
| `win.eventlog.security.share_access_mask` | string | Access requested on the 5145 check, as the hex value Windows logged. |
| `win.eventlog.security.old_target_user` | string | Account name before the rename on 4781. |
| `win.eventlog.security.new_target_user` | string | Account name after the rename on 4781. |
| `win.eventlog.security.object_dn` | string | Distinguished name of the directory object, from `ObjectDN` on 5136 to 5139 and 5141. Attribute values are not collected. |
| `win.eventlog.security.attribute_name` | string | LDAP name of the directory attribute that changed, from `AttributeLDAPDisplayName` on 5136. |
| `win.eventlog.security.nps_reason_code` | int | NPS (RADIUS) reason code on 6273, 6274 and 6279, such as 16 for bad credentials, 36 for a locked account, 48 or 49 for no matching network policy, and 4, 5 or 6 for trouble reaching a domain controller. |
| `win.eventlog.security.nps_reason_meaning` | string | Meaning of the NPS reason code in a few words, on 6273, 6274 and 6279. Absent when SparkLogs has no meaning for the code. |
| `win.eventlog.security.nps_policy` | string | Network policy that handled the NPS request, from `NetworkPolicyName` on 6273 and 6274. A denial reads differently depending on which policy made it. |
| `win.eventlog.security.publisher_id` | string | Event provider whose events the Event Log service failed to process, from event 1108. Says which audit source is losing records. |
| `win.eventlog.security.pua_count` | int | Number of per-user audit policy entries Windows loaded at boot, from `PuaCount` on 4902. Zero means no per-user audit policy. Any other value means auditing is aimed at named accounts. |
| `win.eventlog.security.wfp_direction` | string | Direction of the blocked connection on 5157: inbound or outbound. |
| `win.eventlog.security.wfp_dest_address` | string | Address the blocked connection was going to, from `DestAddress` on 5157, as Windows wrote it, including loopback and same-machine addresses. |
| `win.eventlog.security.wfp_dest_port` | int | Port the blocked connection was going to, from `DestPort` on 5157, including loopback and same-machine connections. |
| `win.eventlog.security.wfp_protocol` | int | IP protocol number of the blocked connection, from `Protocol` on 5157: 6 for TCP, 17 for UDP. |
| `win.eventlog.security.dropped_count` | int | Number of audit events the event log transport dropped before they reached the log, from event 1101. Absent when the message is not in the expected English form. |

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
| `sparklogs.actor.name` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.type` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.kind` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.domain` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.session` | The initiator. Who wanted the thing done. |
| `sparklogs.running_as.id` | The execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal. |
| `sparklogs.running_as.name` | The execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal. |
| `sparklogs.running_as.type` | The execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal. |
| `sparklogs.running_as.kind` | The execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal. |
| `sparklogs.running_as.domain` | The execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal. |
| `sparklogs.target.id` | The principal the action was done TO. A group acted upon is this family with kind=group, because a group is a principal here rather than a separate object. |
| `sparklogs.target.name` | The principal the action was done TO. A group acted upon is this family with kind=group, because a group is a principal here rather than a separate object. |
| `sparklogs.target.type` | The principal the action was done TO. A group acted upon is this family with kind=group, because a group is a principal here rather than a separate object. |
| `sparklogs.target.kind` | The principal the action was done TO. A group acted upon is this family with kind=group, because a group is a principal here rather than a separate object. |
| `sparklogs.target.domain` | The principal the action was done TO. A group acted upon is this family with kind=group, because a group is a principal here rather than a separate object. |
| `sparklogs.member.id` | The principal whose membership in the target changed. A member is only ever a member, so no role collision is possible; group-in-group nesting reads member kind=group. |
| `sparklogs.member.name` | The principal whose membership in the target changed. A member is only ever a member, so no role collision is possible; group-in-group nesting reads member kind=group. |
| `sparklogs.member.type` | The principal whose membership in the target changed. A member is only ever a member, so no role collision is possible; group-in-group nesting reads member kind=group. |
| `sparklogs.member.kind` | The principal whose membership in the target changed. A member is only ever a member, so no role collision is possible; group-in-group nesting reads member kind=group. |
| `sparklogs.process.id` | The process the event is about. |
| `sparklogs.process.path` | The process the event is about. |
| `sparklogs.process.name` | The process the event is about. |
| `sparklogs.origin.ip` | Where the connection or request came from. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |
| `sparklogs.origin.host` | Where the connection or request came from. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |
| `sparklogs.origin.port` | Where the connection or request came from. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |
| `sparklogs.destination.ip` | Where it was going. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |
| `sparklogs.destination.host` | Where it was going. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |
| `sparklogs.destination.port` | Where it was going. Both are present when the event names both ends. On sign-in events only the other machine is named, because the reporting machine is the near end. |
| `sparklogs.result.code` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.code_space` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.code_name` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |
| `sparklogs.result.failed` | The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `actor` | `sparklogs.actor.name` |
| `actor_domain` | `sparklogs.actor.domain` |
| `running_as` | `sparklogs.running_as.name` |
| `running_as_domain` | `sparklogs.running_as.domain` |
| `target` | `sparklogs.target.name` |
| `target_domain` | `sparklogs.target.domain` |
| `old_name` | `win.eventlog.security.old_target_user` |
| `new_name` | `win.eventlog.security.new_target_user` |
| `member` | `sparklogs.member.name` |
| `session` | `sparklogs.actor.session` |
| `error_code` | `sparklogs.result.code` |
| `etype_meaning` | `win.eventlog.security.etype_meaning` |
| `kerberos_target` | `win.eventlog.security.kerberos_target` |
| `nps_reason_code` | `win.eventlog.security.nps_reason_code` |
| `nps_policy` | `win.eventlog.security.nps_policy` |
| `insecure_boot_flags` | `win.eventlog.security.insecure_boot_flags` |
| `operation_meaning` | `win.eventlog.security.operation_meaning` |
| `pua_count` | `win.eventlog.security.pua_count` |
| `dropped_count` | `win.eventlog.security.dropped_count` |
| `object_name` | `win.eventlog.security.object_name` |
| `rule_condition` | `win.eventlog.security.firewall_rule_condition` |
| `previous_time` | `win.eventlog.security.previous_time` |
| `new_time` | `win.eventlog.security.new_time` |
| `uac_token_type` | `win.eventlog.security.uac_token_type` |
| `process_path` | `sparklogs.process.path` |
| `process_id` | `sparklogs.process.id` |
| `lm_package` | `win.eventlog.security.lm_package` |
| `origin_host` | `sparklogs.origin.host` |
| `origin_ip` | `sparklogs.origin.ip` |
| `origin_port` | `sparklogs.origin.port` |
| `destination` | `sparklogs.destination.host` |
| `workstation` | `win.eventlog.security.workstation` |
| `caller_computer` | `win.eventlog.security.caller_computer` |
| `privileges` | `win.eventlog.security.privileges` |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `account_changed` / `default` | 4738, 4742 | **fields: none** |  |
| `account_created` / `default` | 4720, 4741 | **fields: none** |  |
| `account_deleted` / `default` | 4726, 4743 | **fields: none** |  |
| `account_disabled` / `default` | 4725 | **fields: none** |  |
| `account_enabled` / `default` | 4722 | **fields: none** |  |
| `account_locked_out` / `default` | 4740 | `win.eventlog.security.caller_computer` |  |
| `account_password_change_failed` / `default` | 4723 | **fields: none** |  |
| `account_password_reset` / `default` | 4724 | **fields: none** |  |
| `account_password_reset_failed` / `default` | 4724 | **fields: none** |  |
| `adcs_audit_evidence_tampered` / `default` | 4885, 4896 | **fields: none** |  |
| `adcs_config_changed` / `default` | 4882, 4890 | **fields: none** |  |
| `adcs_request_failed` / `default` | 4888 | **fields: none** |  |
| `anonymous_remote_sign_in` / `default` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `audit_event_processing_failed` / `default` | 1108 | `win.eventlog.security.publisher_id` |  |
| `audit_events_dropped` / `default` | 1101 | `win.eventlog.security.dropped_count` |  |
| `audit_log_cleared` / `default` | 1102 | **fields: none** |  |
| `audit_log_full` / `default` | 1104 | **fields: none** |  |
| `audit_policy_changed` / `default` | 4715 | **fields: none** |  |
| `audit_subcategory_changed` / `coverage_reduced` | 4719 | `win.eventlog.security.audit_subcategory_guid` |  |
| `audit_subcategory_changed` / `neutral` | 4719 | `win.eventlog.security.audit_subcategory_guid` |  |
| `audit_subcategory_changed` / `system_subject` | 4719 | `win.eventlog.security.audit_subcategory_guid` |  |
| `crypto_selftest_failed` / `default` | 6418 | **fields: none** |  |
| `directory_object_access_denied` / `default` | 4662 | **fields: none** |  |
| `directory_object_changed` / `default` | 5136, 5139 | `win.eventlog.security.attribute_name` `win.eventlog.security.object_dn` |  |
| `directory_object_created` / `default` | 5137, 5138 | `win.eventlog.security.attribute_name` `win.eventlog.security.object_dn` |  |
| `directory_object_deleted` / `default` | 5141 | `win.eventlog.security.attribute_name` `win.eventlog.security.object_dn` |  |
| `directory_replication_access_requested` / `default` | 4662 | **fields: none** |  |
| `domain_policy_changed` / `default` | 4739 | **fields: none** |  |
| `dsrm_password_change_failed` / `default` | 4794 | `win.eventlog.security.workstation` |  |
| `dsrm_password_changed` / `default` | 4794 | `win.eventlog.security.workstation` |  |
| `event_logging_stopped` / `default` | 1100 | **fields: none** |  |
| `explicit_credential_used` / `default` | 4648 | `win.eventlog.security.target_server` |  |
| `firewall_rule_changed` / `default` | 4947 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_rule_created` / `default` | 4946 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_rule_deleted` / `default` | 4948 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_service_stopped` / `recovered` | 5024, 5025, 5033, 5034 | **fields: none** |  |
| `firewall_service_stopped` / `stopped` | 5024, 5025, 5033, 5034 | **fields: none** |  |
| `firewall_setting_applied` / `default` | 4950 | `win.eventlog.security.firewall_setting_type` `win.eventlog.security.firewall_setting_value` |  |
| `group_member_added` / `default` | 4728, 4732, 4756 | **fields: none** |  |
| `group_member_removed` / `default` | 4729, 4733, 4757 | **fields: none** |  |
| `guest_account_sign_in` / `default` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `kerberos_duplicate_request_rejected` / `default` | 4649 | **fields: none** |  |
| `kerberos_preauth_failed` / `default` | 4771 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `kerberos_rc4_ticket_issued` / `default` | 4769 | `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.ticket_encryption_type` |  |
| `kerberos_ticket_failed` / `service_ticket` | 4768, 4769, 4770 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `kerberos_ticket_failed` / `tgt_request` | 4768, 4769, 4770 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `kerberos_ticket_failed` / `ticket_renewal` | 4768, 4769, 4770 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `logon_right_granted` / `default` | 4717 | **fields: none** |  |
| `logon_right_removed` / `default` | 4718 | **fields: none** |  |
| `network_share_added` / `added` | 5142 | `win.eventlog.security.share_name` `win.eventlog.security.share_path` |  |
| `network_share_added` / `system_republish` | 5142 | `win.eventlog.security.share_name` `win.eventlog.security.share_path` |  |
| `nps_access_denied` / `default` | 6273 | `win.eventlog.security.nps_policy` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |  |
| `nps_lockout` / `default` | 6279 | `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |  |
| `nps_request_discarded` / `default` | 6274 | `win.eventlog.security.nps_policy` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |  |
| `ntlm_validation_failed` / `default` | 4776, 4777 | `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.workstation` |  |
| `principal_renamed` / `default` | 4781 | `win.eventlog.security.new_target_user` `win.eventlog.security.old_target_user` |  |
| `process_exited_abnormally` / `default` | 4689 | **fields: none** |  |
| `psdirect_handshake_probe` / `default` | 4625 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.psdirect_handshake` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |  |
| `scheduled_task_created` / `other_task` | 4698 | `win.eventlog.security.task_name` |  |
| `scheduled_task_created` / `platform_os_task` | 4698 | `win.eventlog.security.task_name` |  |
| `scheduled_task_created` / `platform_other_task` | 4698 | `win.eventlog.security.task_name` |  |
| `scheduled_task_deleted` / `other_task` | 4699 | `win.eventlog.security.task_name` |  |
| `scheduled_task_deleted` / `platform_os_task` | 4699 | `win.eventlog.security.task_name` |  |
| `scheduled_task_deleted` / `platform_other_task` | 4699 | `win.eventlog.security.task_name` |  |
| `scheduled_task_disabled` / `default` | 4701 | `win.eventlog.security.task_name` |  |
| `scheduled_task_updated` / `other_task` | 4702 | `win.eventlog.security.task_name` |  |
| `scheduled_task_updated` / `platform_os_task` | 4702 | `win.eventlog.security.task_name` |  |
| `scheduled_task_updated` / `platform_other_task` | 4702 | `win.eventlog.security.task_name` |  |
| `security_group_changed` / `default` | 4735, 4737, 4755, 4764 | **fields: none** |  |
| `security_group_created` / `default` | 4727, 4731, 4754 | **fields: none** |  |
| `security_group_deleted` / `default` | 4730, 4734, 4758 | **fields: none** |  |
| `service_installed` / `installed` | 4697 | `command_line` `win.eventlog.security.service_account` `win.eventlog.security.service_image_path` `win.eventlog.security.service_name` |  |
| `service_installed` / `per_user_instance` | 4697 | `command_line` `win.eventlog.security.service_account` `win.eventlog.security.service_image_path` `win.eventlog.security.service_name` |  |
| `service_installed` / `self_versioned_updater` | 4697 | `command_line` `win.eventlog.security.service_account` `win.eventlog.security.service_image_path` `win.eventlog.security.service_name` |  |
| `sid_history_add_failed` / `default` | 4766 | **fields: none** |  |
| `sid_history_added` / `default` | 4765 | **fields: none** |  |
| `sign_in_failed` / `account_attempt` | 4625 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |  |
| `sign_in_failed` / `sspi_probe` | 4625 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |  |
| `special_group_sign_in` / `default` | 4964 | **fields: none** |  |
| `system_time_changed` / `other_caller` | 4616 | `win.eventlog.security.new_time` `win.eventlog.security.previous_time` |  |
| `system_time_changed` / `routine_time_service` | 4616 | `win.eventlog.security.new_time` `win.eventlog.security.previous_time` |  |
| `user_audit_subcategory_changed` / `default` | 4912 | `win.eventlog.security.audit_subcategory_guid` |  |
| `win_insecure_boot_config` / `default` | 4826 | `win.eventlog.security.insecure_boot_flags` |  |
| `win_registry_value_changed` / `audited` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `win_registry_value_changed` / `wmi_system_upkeep` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `win_registry_value_created` / `audited` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `win_registry_value_created` / `wmi_system_upkeep` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `win_registry_value_deleted` / `default` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `admin_session_started` | 4672 | `win.eventlog.security.privileges` |  |
| `anonymous_sign_in` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `anonymous_sign_out` | 4647 | **fields: none** |  |
| `audit_subsystem_started` | 4608 | **fields: none** |  |
| `boot_configuration_loaded` | 4826 | **fields: none** |  |
| `code_integrity_image_hash_invalid` | 5038 | **fields: none** |  |
| `credman_credentials_read` | 5379, 5381, 5382 | **fields: none** |  |
| `crypto_operation` | 5061 | **fields: none** |  |
| `crypto_operation_succeeded` | 5061 | **fields: none** |  |
| `fips_selftest_passed` | 6417 | **fields: none** |  |
| `firewall_active_profile_changed` | 4956 | **fields: none** |  |
| `firewall_packet_blocked` | 5152 | `win.eventlog.security.wfp_dest_address` `win.eventlog.security.wfp_dest_port` `win.eventlog.security.wfp_direction` `win.eventlog.security.wfp_protocol` |  |
| `firewall_policy_applied` | 4954 | **fields: none** |  |
| `firewall_rule_not_applied` | 4957 | `win.eventlog.security.firewall_rule_condition` `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `group_membership_enumerated` | 4799 | **fields: none** |  |
| `inbound_connection_blocked` | 5157 | `win.eventlog.security.wfp_dest_address` `win.eventlog.security.wfp_dest_port` `win.eventlog.security.wfp_direction` `win.eventlog.security.wfp_protocol` |  |
| `key_file_operation` | 5058 | **fields: none** |  |
| `key_file_operation_succeeded` | 5058 | **fields: none** |  |
| `key_migration_operation` | 5059 | **fields: none** |  |
| `key_migration_operation_succeeded` | 5059 | **fields: none** |  |
| `non_account_sign_out` | 4647 | **fields: none** |  |
| `ntlm_credentials_validated` | 4776 | `win.eventlog.security.workstation` |  |
| `object_audit_settings_changed` | 4907 | `win.eventlog.security.object_name` `win.eventlog.security.object_type` |  |
| `object_deleted` | 4660 | **fields: none** |  |
| `outbound_connection_blocked` | 5157 | `win.eventlog.security.wfp_dest_address` `win.eventlog.security.wfp_dest_port` `win.eventlog.security.wfp_direction` `win.eventlog.security.wfp_protocol` |  |
| `per_user_audit_policy_table_created` | 4902 | `win.eventlog.security.pua_count` |  |
| `platform_privileges_assigned` | 4672 | `win.eventlog.security.privileges` |  |
| `primary_token_assigned` | 4696 | **fields: none** |  |
| `privilege_use_refused` | 4673, 4674 | **fields: none** |  |
| `privileged_group_membership_enumerated` | 4799 | **fields: none** |  |
| `privileges_assigned_unclaimed_principal` | 4672 | `win.eventlog.security.privileges` |  |
| `process_created` | 4688 | `command_line` `win.eventlog.security.integrity_level` `win.eventlog.security.integrity_level_sid` `win.eventlog.security.new_process_id` `win.eventlog.security.parent_process_name` `win.eventlog.security.uac_token_type` |  |
| `process_exited_with_error` | 4689 | `win.eventlog.security.exit_status` |  |
| `routine_token_refresh` | 4648 | `win.eventlog.security.target_server` |  |
| `sensitive_privilege_used` | 4673, 4674 | **fields: none** |  |
| `service_or_machine_sign_in` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `service_ticket_issued` | 4769 | `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.logon_guid` `win.eventlog.security.ticket_encryption_type` |  |
| `session_ended` | 4634 | `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` |  |
| `share_object_written` | 5145 | `win.eventlog.security.share_access_mask` `win.eventlog.security.share_name` `win.eventlog.security.share_path` `win.eventlog.security.share_relative_target` |  |
| `sign_in_unclaimed_principal` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `tgt_issued` | 4768 | `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.logon_guid` `win.eventlog.security.ticket_encryption_type` |  |
| `ticket_renewed` | 4770 | `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.ticket_encryption_type` |  |
| `user_group_membership_enumerated` | 4798 | **fields: none** |  |
| `user_sign_in` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `user_signed_out` | 4647 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `account_changed` / `default`
- `account_created` / `default`
- `account_deleted` / `default`
- `account_disabled` / `default`
- `account_enabled` / `default`
- `account_password_change_failed` / `default`
- `account_password_reset` / `default`
- `account_password_reset_failed` / `default`
- `adcs_audit_evidence_tampered` / `default`
- `adcs_config_changed` / `default`
- `adcs_request_failed` / `default`
- `audit_log_cleared` / `default`
- `audit_log_full` / `default`
- `audit_policy_changed` / `default`
- `crypto_selftest_failed` / `default`
- `directory_object_access_denied` / `default`
- `directory_replication_access_requested` / `default`
- `domain_policy_changed` / `default`
- `event_logging_stopped` / `default`
- `firewall_service_stopped` / `recovered`
- `firewall_service_stopped` / `stopped`
- `group_member_added` / `default`
- `group_member_removed` / `default`
- `kerberos_duplicate_request_rejected` / `default`
- `logon_right_granted` / `default`
- `logon_right_removed` / `default`
- `process_exited_abnormally` / `default`
- `security_group_changed` / `default`
- `security_group_created` / `default`
- `security_group_deleted` / `default`
- `sid_history_add_failed` / `default`
- `sid_history_added` / `default`
- `special_group_sign_in` / `default`
- `anonymous_sign_out`
- `audit_subsystem_started`
- `boot_configuration_loaded`
- `code_integrity_image_hash_invalid`
- `credman_credentials_read`
- `crypto_operation`
- `crypto_operation_succeeded`
- `fips_selftest_passed`
- `firewall_active_profile_changed`
- `firewall_policy_applied`
- `group_membership_enumerated`
- `key_file_operation`
- `key_file_operation_succeeded`
- `key_migration_operation`
- `key_migration_operation_succeeded`
- `non_account_sign_out`
- `object_deleted`
- `primary_token_assigned`
- `privilege_use_refused`
- `privileged_group_membership_enumerated`
- `sensitive_privilege_used`
- `user_group_membership_enumerated`
- `user_signed_out`
