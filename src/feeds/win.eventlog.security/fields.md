<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.security`

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

Message field extraction is disabled on this module.
The rendered `key=value` tail exists to be READ, not re-parsed: its values are not extracted into fields, so query the promoted field named for each tail key below, never the tail key itself.

## Reconstruction guarantee

70 curated surface(s) drop the vendor body text below the synthesized first line.
That is never data loss: the provider payload is retained at rest, so a dropped body can be reconstructed from it.
What the body said is derivable; what it cost to ship it repeatedly is not.

## Module fields

Stored flat under the `win.eventlog.security.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.security.logon_guid` | string | Cross-host auth correlation GUID from 4624, 4768 and 4769: joins a sign-in to the ticket requests made for the same authentication. |
| `win.eventlog.security.logon_type` | int | Logon mechanism code from 4624/4625 (2 interactive, 3 network, 5 service, 7 unlock, 10 RDP, 11 cached; locale-stable numeric). |
| `win.eventlog.security.logon_type_name` | string | Bounded meaning token decoded from the logon type (logon_system, logon_interactive, logon_network, logon_service, logon_batch, logon_unlock, logon_network_cleartext, logon_new_credentials, logon_remote_interactive, logon_cached_interactive, logon_cached_remote_interactive, logon_cached_unlock). An unlisted code leaves this unset. |
| `win.eventlog.security.auth_package` | string | Authentication package that answered the sign-in on 4624/4625, downcased as the provider names it (kerberos, ntlm, negotiate, negoextender, and any package outside the curated set). The provider dash sentinel leaves this unset. |
| `win.eventlog.security.lm_package` | string | LAN Manager package variant on 4624/4625 as the provider names it (for example NTLM V2): the NTLM downgrade inventory. Not a curated vocabulary, so it stays a raw value. |
| `win.eventlog.security.token_elevated` | bool | Whether the sign-in minted a full-privilege token on 4624, decoded from the message-catalog reference. False is stored as false, so a negative is distinguishable from an event that states nothing; an unrecognized reference leaves this unset. Same name as the pattern token that renders when this is true. |
| `win.eventlog.security.privileges` | array | Sensitive privileges assigned to the new session on 4672, as the list of literal Se* constants the provider named. Locale-invariant, so unknown privileges pass through verbatim and no decode table applies. |
| `win.eventlog.security.workstation` | string | Source machine name of the attempt in the provider NetBIOS form (WorkstationName on 4624/4625, Workstation on 4776/4777/4794), on the succeeding rows as well as the failing ones. Kept verbatim in the provider spelling; the portable origin host carries the same end as the cross-feed join key. |
| `win.eventlog.security.caller_computer` | string | Machine the bad attempts came from in the provider NetBIOS form (CallerComputerName on 4740): the lockout-source forensic pivot, the highest-ticket-value field in the channel. Kept verbatim in the provider spelling; the portable origin host carries the same end as the cross-feed join key. |
| `win.eventlog.security.status` | string | Failure code as logged, downcased hex: NTSTATUS on 4625/4776/4777, Kerberos result code on 4768/4769/4770/4771. The raw code is the classify key and the provider fidelity; the portable error code carries the normalized value and its number space. |
| `win.eventlog.security.substatus` | string | Detailed NTSTATUS on 4625 (usually the real cause; 0x0 means the Status field carries it). |
| `win.eventlog.security.status_meaning` | string | Bounded meaning token decoded from the status code (NTSTATUS and SSPI causes on 4625/4776/4777, Kerberos result codes on 4768/4769/4770/4771). Also rendered as a bare inline token on those arms, so the cause forms part of the pattern instead of variabilizing away. An undecoded code leaves this unset; a meaning is never invented. Not a synonym of the portable sparklogs.result.code_name, which carries the VENDOR constant name (STATUS_WRONG_PASSWORD) decoded from the same table row: two vocabularies with different owners and different jobs, so both exist. This one is ours and is chosen for the message head; that one is the published name an engineer searches for and transfers to every source speaking the space. |
| `win.eventlog.security.psdirect_handshake` | string | Hyper-V PowerShell Direct legacy handshake constant on 4625, read back as ASCII. The emitting integration service fuses byte pairs of the constant into single UTF-16 code units, so the provider records it as unreadable mojibake in the domain field; this is the same bytes in the encoding they were written in. Set only on the handshake arm, and only when every character reverses cleanly, so a value that does not fit the pattern leaves this unset rather than shipping a partial reading. |
| `win.eventlog.security.kerberos_target` | string | Service principal the Kerberos request named (ServiceName, casefolded) on 4768/4769/4770/4771: which service a ticket was asked for, and the kerberoast target join on 4769. |
| `win.eventlog.security.ticket_encryption_type` | string | Kerberos ticket encryption type (hex enum) on every ticket row of 4768/4769/4770 that states one; 0x17 RC4-HMAC and 0x18 RC4-HMAC-EXP are the downgrade pair the RC4 arm labels. |
| `win.eventlog.security.etype_meaning` | string | Decoded encryption-type token (rc4_hmac, rc4_hmac_exp): the meaning behind ticket_encryption_type. Only the RC4 pair decodes, so every other encryption type leaves this unset and the raw enum answers instead. |
| `win.eventlog.security.target_server` | string | Server the explicit credential was presented to (TargetServerName on 4648), kept verbatim in the provider spelling; the portable destination host carries the same end as the cross-feed join key, the routine localhost form included. |
| `win.eventlog.security.audit_subcategory_guid` | string | Audit subcategory GUID from 4719/4912 (SubcategoryGuid): the locale-invariant key of WHICH audit policy changed. |
| `win.eventlog.security.new_process_id` | string | Created process id from 4688 in the hex form the provider logged. Where a matching 4689 exit is stored it carries the same hex in ProcessId, so this is the join key at rest; exits are stored only when the process ended on a non-zero status, so most creations have no exit to join to. The portable process id carries the same number in decimal. |
| `win.eventlog.security.uac_token_type` | string | UAC split of the created process token on 4688, decoded from TokenElevationType (unsplit, full, limited). unsplit is TokenElevationTypeDefault: UAC produced no filtered pair. full is TokenElevationTypeFull (type 2), not Default. An unrecognized reference leaves this unset. |
| `win.eventlog.security.integrity_level` | string | MIC integrity level of the created process token on 4688, decoded from MandatoryLabel (untrusted, low, medium, high, system). An unrecognized SID leaves this unset and stamps the raw SID on integrity_level_sid. |
| `win.eventlog.security.integrity_level_sid` | string | Raw MandatoryLabel SID from 4688, kept beside the decoded token so an unrecognized integrity SID remains queryable. |
| `win.eventlog.security.parent_process_name` | string | Creator process image path from 4688 (present on modern builds only; 2012R2-era 4688 lacks it). |
| `win.eventlog.security.service_name` | string | Installed service name from 4697. Same join semantics as the System-channel 7045 record of the same fact. |
| `win.eventlog.security.service_image_path` | string | Installed service IMAGE path from 4697, with the arguments of the ServiceFileName command line removed. Unset where the image cannot be split off unambiguously (an unterminated quote, or an unquoted path containing spaces), so the value is always a path and never a command line. |
| `win.eventlog.security.service_account` | string | Account the installed service runs as, from 4697 (blank in the event means LocalSystem; stored only when present). |
| `win.eventlog.security.task_name` | string | Scheduled task path from 4698/4699/4701/4702. The task XML blob is not promoted. |
| `win.eventlog.security.exit_status` | string | Exit status a process returned on 4689, verbatim from the provider (Status), on the rows whose value is non-zero and is not one of the named crash statuses. A value only the program that returned it, or the kernel outcome it ended on, can interpret. |
| `win.eventlog.security.object_name` | string | Audited object path (ObjectName): the registry key the audited value lives under on 4657, and the object whose auditing settings changed on 4907. |
| `win.eventlog.security.object_type` | string | Kind of object whose auditing settings changed on 4907 (ObjectType: File, Key, and the other object-server types), verbatim from the provider. |
| `win.eventlog.security.object_value_name` | string | Registry value name that was created/modified/deleted (4657 ObjectValueName). Old/new DATA are not promoted (credential hazard). |
| `win.eventlog.security.operation_meaning` | string | Registry operation on 4657 decoded from the message-catalog reference (value_created, value_modified, value_deleted): distinguishes a new value from a rewritten or removed one. |
| `win.eventlog.security.previous_time` | string | System clock value before a 4616 time change, ISO-8601 UTC with microsecond precision, read from the PreviousTime payload value in either the ISO-8601 string form the provider writes or an epoch-microsecond integer (the rendered template strings carry bidi control characters; the named payload field is clean). A value in neither form leaves this unset. |
| `win.eventlog.security.new_time` | string | System clock value after a 4616 time change, ISO-8601 UTC with microsecond precision, read from the NewTime payload value in either the ISO-8601 string form the provider writes or an epoch-microsecond integer. A value in neither form leaves this unset. |
| `win.eventlog.security.insecure_boot_flags` | string | Comma-joined boot-chain weaknesses found true on 4826 (TestSigning, KernelDebug, DisableIntegrityChecks): which setting makes the boot chain accept unsigned or debugger-attached kernel code. |
| `win.eventlog.security.rule_name` | string | Firewall rule display name from the MPSSVC rule-change family. |
| `win.eventlog.security.rule_id` | string | Firewall rule id from the MPSSVC rule-change family (stable across renames). |
| `win.eventlog.security.share_name` | string | Network share name, from 5142 (share added) and from the write-class 5145 access checks. |
| `win.eventlog.security.share_path` | string | Local filesystem path backing the share (5142 and 5145 ShareLocalPath); a system-root share is a higher-concern surface. |
| `win.eventlog.security.share_relative_target` | string | Path of the object inside the share that a 5145 access check was made against (RelativeTargetName): what was written, renamed, deleted or re-permissioned. |
| `win.eventlog.security.share_access_mask` | string | Access requested on a 5145 check, as the hex string the provider logged. The keep rule reads the same value as bits and stores no reading of it, so this is what a query pivots on and what lets the keep decision be re-derived from the row. |
| `win.eventlog.security.old_target_user` | string | Account name before a rename (4781). |
| `win.eventlog.security.new_target_user` | string | Account name after a rename (4781). |
| `win.eventlog.security.object_dn` | string | Directory object distinguished name from 5136-5141 (ObjectDN). Attribute VALUES are not promoted (sensitive directory data). |
| `win.eventlog.security.attribute_name` | string | LDAP display name of the changed directory attribute (5136 AttributeLDAPDisplayName). |
| `win.eventlog.security.nps_reason_code` | int | NPS/RADIUS reason code on 6273/6274/6279 (16 bad credentials, 36 lockout, 48/49 no matching policy, 4/5/6 upstream DC trouble). A policy DECISION code, not a failure code from any Windows number space, so it stays module-namespaced rather than claiming the portable error family. |
| `win.eventlog.security.nps_reason_meaning` | string | Decoded meaning of the NPS reason code on 6273/6274/6279: the same value the inline cause token renders, so the token maps one to one onto a queryable field. Unset when the code does not decode. |
| `win.eventlog.security.nps_policy` | string | Network policy that matched the NPS request (NetworkPolicyName on 6273/6274): the pivot a RADIUS ticket needs, since a denial reads differently depending on which policy decided it. |
| `win.eventlog.security.publisher_id` | string | Provider whose event the logging service failed to process (Eventlog 1108): which audit source is silently losing records. |
| `win.eventlog.security.pua_count` | int | Number of entries in the per-user audit policy table built at boot (4902 PuaCount). Zero means this host has no per-user audit policy at all; any other value means auditing is aimed at named principals. |
| `win.eventlog.security.wfp_direction` | string | Which way the refused connection was going (5157 Direction): inbound or outbound. An unrecognized message-catalog reference leaves this unset. |
| `win.eventlog.security.wfp_dest_address` | string | Peer address the refused connection was aimed at (5157 DestAddress), verbatim, on every kept row including loopback and same-host refusals. `sparklogs.destination.*` carries the same endpoint when it names a machine other than the reporting host. |
| `win.eventlog.security.wfp_dest_port` | int | Peer port the refused connection was aimed at (5157 DestPort), on every kept row including loopback and same-host refusals. `sparklogs.destination.*` carries the same endpoint when it names a machine other than the reporting host. Unset when the provider value is not a number. |
| `win.eventlog.security.wfp_protocol` | int | IANA protocol number of the refused connection (5157 Protocol), 6 for TCP and 17 for UDP. Unset when the provider value is not a number. |
| `win.eventlog.security.dropped_count` | int | Number of audit records the event log transport discarded before they reached the log (Eventlog 1101). Zero means nothing was lost. Read from the message tail on the known template, and left unset on any other template. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.throttle.window_s` |  |
| `sparklogs.config_change.type` | The kind of object that changed, from a closed set of object nouns. |
| `sparklogs.config_change.action` | What was done to that object, from a closed set of verbs. |
| `sparklogs.config_change.target` | Which object it was: its own identity within its kind, as a name, a path or an id. A different field from the principal a change acted on, and a change acting on a principal carries both. |
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
| `audit_policy_changed` / `default` | 4715, 4719, 4912 | `win.eventlog.security.audit_subcategory_guid` |  |
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
| `firewall_rule_changed` / `disabled` | 4954 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_rule_changed` / `enabled` | 4956 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_rule_changed` / `updated` | 4947, 4950, 4957 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_rule_created` / `default` | 4946 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_rule_deleted` / `default` | 4948 | `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |  |
| `firewall_service_stopped` / `recovered` | 5024, 5025, 5033, 5034 | **fields: none** |  |
| `firewall_service_stopped` / `stopped` | 5024, 5025, 5033, 5034 | **fields: none** |  |
| `group_member_added` / `default` | 4728, 4732, 4756 | **fields: none** |  |
| `group_member_removed` / `default` | 4729, 4733, 4757 | **fields: none** |  |
| `guest_account_sign_in` / `default` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `kerberos_preauth_failed` / `default` | 4771 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `kerberos_rc4_ticket_issued` / `default` | 4769 | `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.ticket_encryption_type` |  |
| `kerberos_ticket_failed` / `service_ticket` | 4768, 4769, 4770 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `kerberos_ticket_failed` / `tgt_request` | 4768, 4769, 4770 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `kerberos_ticket_failed` / `ticket_renewal` | 4768, 4769, 4770 | `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |  |
| `logon_right_granted` / `default` | 4717 | **fields: none** |  |
| `logon_right_removed` / `default` | 4718 | **fields: none** |  |
| `network_share_added` / `default` | 5142 | `win.eventlog.security.share_name` `win.eventlog.security.share_path` |  |
| `nps_access_denied` / `default` | 6273 | `win.eventlog.security.nps_policy` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |  |
| `nps_lockout` / `default` | 6279 | `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |  |
| `nps_request_discarded` / `default` | 6274 | `win.eventlog.security.nps_policy` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |  |
| `ntlm_validation_failed` / `default` | 4776, 4777 | `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.workstation` |  |
| `principal_renamed` / `default` | 4781 | `win.eventlog.security.new_target_user` `win.eventlog.security.old_target_user` |  |
| `process_exited_abnormally` / `default` | 4689 | **fields: none** |  |
| `psdirect_handshake_probe` / `default` | 4625 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.psdirect_handshake` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |  |
| `replay_attack_detected` / `default` | 4649 | **fields: none** |  |
| `scheduled_task_created` / `default` | 4698 | `win.eventlog.security.task_name` |  |
| `scheduled_task_deleted` / `default` | 4699 | `win.eventlog.security.task_name` |  |
| `scheduled_task_disabled` / `default` | 4701 | `win.eventlog.security.task_name` |  |
| `scheduled_task_updated` / `default` | 4702 | `win.eventlog.security.task_name` |  |
| `security_group_changed` / `default` | 4735, 4737, 4755, 4764 | **fields: none** |  |
| `security_group_created` / `default` | 4727, 4731, 4754 | **fields: none** |  |
| `security_group_deleted` / `default` | 4730, 4734, 4758 | **fields: none** |  |
| `service_installed` / `default` | 4697 | `command_line` `win.eventlog.security.service_account` `win.eventlog.security.service_image_path` `win.eventlog.security.service_name` |  |
| `sid_history_add_failed` / `default` | 4766 | **fields: none** |  |
| `sid_history_added` / `default` | 4765 | **fields: none** |  |
| `sign_in_failed` / `account_attempt` | 4625 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |  |
| `sign_in_failed` / `sspi_probe` | 4625 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |  |
| `special_group_sign_in` / `default` | 4964 | **fields: none** |  |
| `system_time_changed` / `other_caller` | 4616 | `win.eventlog.security.new_time` `win.eventlog.security.previous_time` |  |
| `system_time_changed` / `routine_time_service` | 4616 | `win.eventlog.security.new_time` `win.eventlog.security.previous_time` |  |
| `win_insecure_boot_config` / `default` | 4826 | `win.eventlog.security.insecure_boot_flags` |  |
| `win_registry_value_changed` / `default` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `win_registry_value_created` / `default` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `win_registry_value_deleted` / `default` | 4657 | `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |  |
| `admin_session_started` | 4672 | `win.eventlog.security.privileges` |  |
| `anonymous_sign_in` | 4624 | `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.token_elevated` `win.eventlog.security.workstation` |  |
| `anonymous_sign_out` | 4647 | **fields: none** |  |
| `audit_subsystem_started` | 4608 | **fields: none** |  |
| `boot_configuration_loaded` | 4826 | **fields: none** |  |
| `credman_credentials_read` | 5379, 5381, 5382 | **fields: none** |  |
| `crypto_operation` | 5061 | **fields: none** |  |
| `crypto_operation_succeeded` | 5061 | **fields: none** |  |
| `fips_selftest_passed` | 6417 | **fields: none** |  |
| `firewall_packet_blocked` | 5152 | `win.eventlog.security.wfp_dest_address` `win.eventlog.security.wfp_dest_port` `win.eventlog.security.wfp_direction` `win.eventlog.security.wfp_protocol` |  |
| `group_membership_enumerated` | 4799 | **fields: none** |  |
| `inbound_connection_blocked` | 5157 | `win.eventlog.security.wfp_dest_address` `win.eventlog.security.wfp_dest_port` `win.eventlog.security.wfp_direction` `win.eventlog.security.wfp_protocol` |  |
| `key_file_operation` | 5058 | **fields: none** |  |
| `key_file_operation_succeeded` | 5058 | **fields: none** |  |
| `key_migration_operation` | 5059 | **fields: none** |  |
| `key_migration_operation_succeeded` | 5059 | **fields: none** |  |
| `non_account_sign_out` | 4647 | **fields: none** |  |
| `ntlm_credentials_validated` | 4776 | `win.eventlog.security.workstation` |  |
| `object_audit_settings_changed` | 4907 | `win.eventlog.security.object_name` `win.eventlog.security.object_type` |  |
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
- `crypto_selftest_failed` / `default`
- `directory_object_access_denied` / `default`
- `directory_replication_access_requested` / `default`
- `domain_policy_changed` / `default`
- `event_logging_stopped` / `default`
- `firewall_service_stopped` / `recovered`
- `firewall_service_stopped` / `stopped`
- `group_member_added` / `default`
- `group_member_removed` / `default`
- `logon_right_granted` / `default`
- `logon_right_removed` / `default`
- `process_exited_abnormally` / `default`
- `replay_attack_detected` / `default`
- `security_group_changed` / `default`
- `security_group_created` / `default`
- `security_group_deleted` / `default`
- `sid_history_add_failed` / `default`
- `sid_history_added` / `default`
- `special_group_sign_in` / `default`
- `anonymous_sign_out`
- `audit_subsystem_started`
- `boot_configuration_loaded`
- `credman_credentials_read`
- `crypto_operation`
- `crypto_operation_succeeded`
- `fips_selftest_passed`
- `group_membership_enumerated`
- `key_file_operation`
- `key_file_operation_succeeded`
- `key_migration_operation`
- `key_migration_operation_succeeded`
- `non_account_sign_out`
- `primary_token_assigned`
- `privilege_use_refused`
- `privileged_group_membership_enumerated`
- `sensitive_privilege_used`
- `user_group_membership_enumerated`
- `user_signed_out`
