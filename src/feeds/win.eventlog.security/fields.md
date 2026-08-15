<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.security`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

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

66 curated surface(s) drop the vendor body text below the synthesized first line.
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
| `win.eventlog.security.elevated` | bool | Whether the sign-in minted a full-privilege token on 4624, decoded from the message-catalog reference. False is stored as false, so a negative is distinguishable from an event that states nothing; an unrecognized reference leaves this unset. |
| `win.eventlog.security.privileges` | array | Sensitive privileges assigned to the new session on 4672, as the list of literal Se* constants the provider named. Locale-invariant, so unknown privileges pass through verbatim and no decode table applies. |
| `win.eventlog.security.workstation` | string | Source machine name of the attempt in the provider NetBIOS form (WorkstationName on 4624/4625, Workstation on 4776/4777/4794), on the succeeding rows as well as the failing ones. Kept verbatim on every row; the portable origin host is gated to values naming a machine other than the reporting host. |
| `win.eventlog.security.caller_computer` | string | Machine the bad attempts came from in the provider NetBIOS form (CallerComputerName on 4740): the lockout-source forensic pivot, the highest-ticket-value field in the channel. Kept verbatim on every row; the portable origin host is gated to values naming a machine other than the reporting host. |
| `win.eventlog.security.status` | string | Failure code as logged, downcased hex: NTSTATUS on 4625/4776/4777, Kerberos result code on 4768/4769/4770/4771. The raw code is the classify key and the provider fidelity; the portable error code carries the normalized value and its number space. |
| `win.eventlog.security.substatus` | string | Detailed NTSTATUS on 4625 (usually the real cause; 0x0 means the Status field carries it). |
| `win.eventlog.security.status_meaning` | string | Bounded meaning token decoded from the status code (NTSTATUS and SSPI causes on 4625/4776/4777, Kerberos result codes on 4768/4769/4770/4771). Also rendered as a bare inline token on those arms, so the cause forms part of the pattern instead of variabilizing away. An undecoded code leaves this unset; a meaning is never invented. |
| `win.eventlog.security.psdirect_handshake` | string | Hyper-V PowerShell Direct legacy handshake constant on 4625, read back as ASCII. The emitting integration service fuses byte pairs of the constant into single UTF-16 code units, so the provider records it as unreadable mojibake in the domain field; this is the same bytes in the encoding they were written in. Set only on the handshake arm, and only when every character reverses cleanly, so a value that does not fit the pattern leaves this unset rather than shipping a partial reading. |
| `win.eventlog.security.kerberos_target` | string | Service principal the Kerberos request named (ServiceName, casefolded) on 4768/4769/4770/4771: which service a ticket was asked for, and the kerberoast target join on 4769. |
| `win.eventlog.security.ticket_encryption_type` | string | Kerberos ticket encryption type (hex enum) on every ticket row of 4768/4769/4770 that states one; 0x17 RC4-HMAC and 0x18 RC4-HMAC-EXP are the downgrade pair the RC4 arm labels. |
| `win.eventlog.security.etype_meaning` | string | Decoded encryption-type token (rc4_hmac, rc4_hmac_exp): the meaning behind ticket_encryption_type. Only the RC4 pair decodes, so every other encryption type leaves this unset and the raw enum answers instead. |
| `win.eventlog.security.target_server` | string | Server the explicit credential was presented to (TargetServerName on 4648), kept verbatim on every row including the routine localhost form; the portable destination host carries the same value only when it names a machine other than the reporting host. |
| `win.eventlog.security.audit_subcategory_guid` | string | Audit subcategory GUID from 4719/4912 (SubcategoryGuid): the locale-invariant key of WHICH audit policy changed. |
| `win.eventlog.security.new_process_id` | string | Created process id from 4688 in the hex form the provider logged; equals the ProcessId of the matching 4689 exit, so this is the join key at rest. The portable process id carries the same number in decimal. |
| `win.eventlog.security.token_elevation` | string | Elevation state of the created process token on 4688, decoded from the message-catalog reference (no_uac_split, elevated, limited). An unrecognized reference leaves this unset. no_uac_split is the type the vendor constant calls Default: UAC produced no filtered pair for this token. |
| `win.eventlog.security.parent_process_name` | string | Creator process image path from 4688 (present on modern builds only; 2012R2-era 4688 lacks it). |
| `win.eventlog.security.service_name` | string | Installed service name from 4697. Same join semantics as the System-channel 7045 record of the same fact. |
| `win.eventlog.security.service_image_path` | string | Installed service IMAGE path from 4697, with the arguments of the ServiceFileName command line removed. Unset where the image cannot be split off unambiguously (an unterminated quote, or an unquoted path containing spaces), so the value is always a path and never a command line. |
| `win.eventlog.security.service_account` | string | Account the installed service runs as, from 4697 (blank in the event means LocalSystem; stored only when present). |
| `win.eventlog.security.task_name` | string | Scheduled task path from 4698/4699/4701/4702. The task XML blob is not promoted. |
| `win.eventlog.security.object_name` | string | Audited object path (ObjectName): the registry key the audited value lives under on 4657, and the object whose auditing settings changed on 4907. |
| `win.eventlog.security.object_type` | string | Kind of object whose auditing settings changed on 4907 (ObjectType: File, Key, and the other object-server types), verbatim from the provider. |
| `win.eventlog.security.object_value_name` | string | Registry value name that was created/modified/deleted (4657 ObjectValueName). Old/new DATA are not promoted (credential hazard). |
| `win.eventlog.security.operation_meaning` | string | Registry operation on 4657 decoded from the message-catalog reference (value_created, value_modified, value_deleted): distinguishes a new value from a rewritten or removed one. |
| `win.eventlog.security.previous_time` | string | System clock value before a 4616 time change, ISO-8601 UTC with microsecond precision, read from the PreviousTime payload value in either the ISO-8601 string form the provider writes or an epoch-microsecond integer (the rendered template strings carry bidi control characters; the named payload field is clean). A value in neither form leaves this unset. |
| `win.eventlog.security.new_time` | string | System clock value after a 4616 time change, ISO-8601 UTC with microsecond precision, read from the NewTime payload value in either the ISO-8601 string form the provider writes or an epoch-microsecond integer. A value in neither form leaves this unset. |
| `win.eventlog.security.insecure_boot_flags` | string | Comma-joined boot-chain weaknesses found true on 4826 (TestSigning, KernelDebug, DisableIntegrityChecks): which setting makes the boot chain accept unsigned or debugger-attached kernel code. |
| `win.eventlog.security.rule_name` | string | Firewall rule display name from the MPSSVC rule-change family. |
| `win.eventlog.security.rule_id` | string | Firewall rule id from the MPSSVC rule-change family (stable across renames). |
| `win.eventlog.security.share_name` | string | Network share name from 5142 (share added). |
| `win.eventlog.security.share_path` | string | Local filesystem path backing the added share (5142 ShareLocalPath); a system-root share is a higher-concern surface. |
| `win.eventlog.security.old_target_user` | string | Account name before a rename (4781). |
| `win.eventlog.security.new_target_user` | string | Account name after a rename (4781). |
| `win.eventlog.security.object_dn` | string | Directory object distinguished name from 5136-5141 (ObjectDN). Attribute VALUES are not promoted (sensitive directory data). |
| `win.eventlog.security.attribute_name` | string | LDAP display name of the changed directory attribute (5136 AttributeLDAPDisplayName). |
| `win.eventlog.security.nps_reason_code` | int | NPS/RADIUS reason code on 6273/6274/6279 (16 bad credentials, 36 lockout, 48/49 no matching policy, 4/5/6 upstream DC trouble). A policy DECISION code, not a failure code from any Windows number space, so it stays module-namespaced rather than claiming the portable error family. |
| `win.eventlog.security.nps_reason_meaning` | string | Decoded meaning of the NPS reason code on 6273/6274/6279: the same value the inline cause token renders, so the token maps one to one onto a queryable field. Unset when the code does not decode. |
| `win.eventlog.security.nps_policy` | string | Network policy that matched the NPS request (NetworkPolicyName on 6273/6274): the pivot a RADIUS ticket needs, since a denial reads differently depending on which policy decided it. |
| `win.eventlog.security.publisher_id` | string | Provider whose event the logging service failed to process (Eventlog 1108): which audit source is silently losing records. |
| `win.eventlog.security.pua_count` | int | Number of entries in the per-user audit policy table built at boot (4902 PuaCount). Zero means this host has no per-user audit policy at all; any other value means auditing is aimed at named principals. |
| `win.eventlog.security.dropped_count` | int | Number of audit records the event log transport discarded before they reached the log (Eventlog 1101). Zero means nothing was lost. Read from the message tail on the known template, and left unset on any other template. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.config_change.type` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.action` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.target` | What configuration changed, in what direction, on what. |
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
| `sparklogs.origin.ip` | The initiating network endpoint. Populated only when the value names a machine other than the reporting host, which is what makes the populated side the direction. |
| `sparklogs.origin.host` | The initiating network endpoint. Populated only when the value names a machine other than the reporting host, which is what makes the populated side the direction. |
| `sparklogs.origin.port` | The initiating network endpoint. Populated only when the value names a machine other than the reporting host, which is what makes the populated side the direction. |
| `sparklogs.destination.host` | The receiving network endpoint. |
| `sparklogs.error.code` | The failure code the source reported, plus the number space it belongs to. |
| `sparklogs.error.code_space` | The failure code the source reported, plus the number space it belongs to. |

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
| `error_code` | `sparklogs.error.code` |
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
| `token_elevation` | `win.eventlog.security.token_elevation` |
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

Presence is per curated surface and per event id, because promotion is a property of the branch, not of the module.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `account_changed` / `default` | 4738, 4742 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_created` / `default` | 4720, 4741 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_deleted` / `default` | 4726, 4743 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_disabled` / `default` | 4725 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_enabled` / `default` | 4722 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_locked_out` / `default` | 4740 | `sparklogs.origin.host` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.name` `sparklogs.target.type` `win.eventlog.security.caller_computer` |
| `account_password_change_failed` / `default` | 4723 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_password_reset` / `default` | 4724 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `account_password_reset_failed` / `default` | 4724 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `anonymous_remote_logon` / `default` | 4624 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.elevated` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.workstation` |
| `audit_events_dropped` / `default` | 1101 | `win.eventlog.security.dropped_count` |
| `audit_log_cleared` / `default` | 1102 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` |
| `audit_log_full` / `default` | 1104 | **fields: none** |
| `audit_pipeline_error` / `default` | 1108 | `win.eventlog.security.publisher_id` |
| `audit_policy_changed` / `default` | 4715, 4719, 4912 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `win.eventlog.security.audit_subcategory_guid` |
| `ca_request_failed` / `default` | 4888 | **fields: none** |
| `ca_tamper` / `admin_config` | 4882, 4885, 4890, 4896 | **fields: none** |
| `ca_tamper` / `evidence_tamper` | 4882, 4885, 4890, 4896 | **fields: none** |
| `crypto_selftest_failed` / `default` | 6418 | `sparklogs.process.name` `sparklogs.process.path` |
| `directory_object_changed` / `default` | 5136, 5137, 5138, 5139, 5141 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `win.eventlog.security.attribute_name` `win.eventlog.security.object_dn` |
| `domain_policy_changed` / `default` | 4739 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` |
| `dsrm_password_changed` / `failed` | 4794 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.origin.host` `win.eventlog.security.workstation` |
| `dsrm_password_changed` / `success` | 4794 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.origin.host` `win.eventlog.security.workstation` |
| `event_logging_stopped` / `default` | 1100 | **fields: none** |
| `explicit_credential_use` / `default` | 4648 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.destination.host` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `sparklogs.target.domain` `sparklogs.target.name` `sparklogs.target.type` `win.eventlog.security.target_server` |
| `firewall_rule_changed` / `default` | 4946, 4947, 4948, 4950, 4954, 4956, 4957 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `win.eventlog.security.rule_id` `win.eventlog.security.rule_name` |
| `firewall_service_stopped` / `default` | 5025, 5034 | **fields: none** |
| `group_member_added` / `default` | 4728, 4732, 4756 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.member.id` `sparklogs.member.kind` `sparklogs.member.name` `sparklogs.member.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `group_member_removed` / `default` | 4729, 4733, 4757 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.member.id` `sparklogs.member.kind` `sparklogs.member.name` `sparklogs.member.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `group_membership_changed` / `default` | 4727, 4730, 4731, 4734, 4735, 4737, 4754, 4755, 4758, 4764 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `guest_account_sign_in` / `default` | 4624 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.elevated` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.workstation` |
| `insecure_boot_config` / `default` | 4826 | `win.eventlog.security.insecure_boot_flags` |
| `kerberos_preauth_failed` / `default` | 4771 | `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |
| `kerberos_rc4_ticket` / `default` | 4769 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.ticket_encryption_type` |
| `kerberos_ticket_failed` / `service_ticket` | 4768, 4769, 4770 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |
| `kerberos_ticket_failed` / `tgt_request` | 4768, 4769, 4770 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |
| `kerberos_ticket_failed` / `ticket_renewal` | 4768, 4769, 4770 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.kerberos_target` `win.eventlog.security.status` `win.eventlog.security.status_meaning` |
| `logon_failed` / `account_attempt` | 4625 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |
| `logon_failed` / `sspi_probe` | 4625 | `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |
| `logon_right_granted` / `default` | 4717 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `logon_right_removed` / `default` | 4718 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `network_share_added` / `default` | 5142 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `win.eventlog.security.share_name` `win.eventlog.security.share_path` |
| `nps_access_denied` / `default` | 6273 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `win.eventlog.security.nps_policy` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |
| `nps_lockout` / `default` | 6279 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |
| `nps_request_discarded` / `default` | 6274 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `win.eventlog.security.nps_policy` `win.eventlog.security.nps_reason_code` `win.eventlog.security.nps_reason_meaning` |
| `ntlm_validation_failed` / `default` | 4776, 4777 | `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.host` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.workstation` |
| `principal_renamed` / `default` | 4781 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` `win.eventlog.security.new_target_user` `win.eventlog.security.old_target_user` |
| `psdirect_handshake_probe` / `default` | 4625 | `sparklogs.error.code` `sparklogs.error.code_space` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.lm_package` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.psdirect_handshake` `win.eventlog.security.status` `win.eventlog.security.status_meaning` `win.eventlog.security.substatus` `win.eventlog.security.workstation` |
| `registry_value_changed` / `default` | 4657 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `sparklogs.process.name` `sparklogs.process.path` `win.eventlog.security.object_name` `win.eventlog.security.object_value_name` `win.eventlog.security.operation_meaning` |
| `replay_attack_detected` / `default` | 4649 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` |
| `scheduled_task_changed` / `content_mutate` | 4698, 4699, 4701, 4702 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `win.eventlog.security.task_name` |
| `scheduled_task_changed` / `disabled` | 4698, 4699, 4701, 4702 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `win.eventlog.security.task_name` |
| `service_installed` / `default` | 4697 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.target` `sparklogs.config_change.type` `win.eventlog.security.service_account` `win.eventlog.security.service_image_path` `win.eventlog.security.service_name` |
| `sid_history_changed` / `add_failed` | 4765, 4766 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.name` `sparklogs.target.type` |
| `sid_history_changed` / `added` | 4765, 4766 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.name` `sparklogs.target.type` |
| `special_group_logon` / `default` | 4964 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` |
| `system_time_changed` / `other_caller` | 4616 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `win.eventlog.security.new_time` `win.eventlog.security.previous_time` |
| `system_time_changed` / `routine_time_service` | 4616 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.config_change.action` `sparklogs.config_change.type` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `win.eventlog.security.new_time` `win.eventlog.security.previous_time` |
| `admin_session_started` | 4672 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `win.eventlog.security.privileges` |
| `anonymous_sign_in` | 4624 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.elevated` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.workstation` |
| `anonymous_sign_out` | 4647 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` |
| `audit_subsystem_started` | 4608 | **fields: none** |
| `boot_configuration_loaded` | 4826 | **fields: none** |
| `credman_credentials_read` | 5379, 5381, 5382 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` |
| `crypto_operation` | 5061 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` |
| `fips_selftest_passed` | 6417 | `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` |
| `firewall_driver_started` | 5033 | **fields: none** |
| `firewall_service_started` | 5024 | **fields: none** |
| `group_membership_enumerated` | 4799 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `key_file_operation` | 5058 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` |
| `key_migration_operation` | 5059 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` |
| `non_account_sign_out` | 4647 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` |
| `ntlm_credentials_validated` | 4776 | `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.host` `win.eventlog.security.workstation` |
| `object_audit_settings_changed` | 4907 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `win.eventlog.security.object_name` `win.eventlog.security.object_type` |
| `per_user_audit_policy_table_created` | 4902 | `win.eventlog.security.pua_count` |
| `platform_privileges_assigned` | 4672 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `win.eventlog.security.privileges` |
| `primary_token_assigned` | 4696 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.process.id` |
| `privileges_assigned_unclaimed_principal` | 4672 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `win.eventlog.security.privileges` |
| `process_created` | 4688 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `win.eventlog.security.new_process_id` `win.eventlog.security.parent_process_name` `win.eventlog.security.token_elevation` |
| `routine_token_refresh` | 4648 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.destination.host` `sparklogs.target.domain` `sparklogs.target.name` `sparklogs.target.type` `win.eventlog.security.target_server` |
| `service_or_machine_sign_in` | 4624 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.elevated` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.workstation` |
| `service_ticket_issued` | 4769 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.logon_guid` `win.eventlog.security.ticket_encryption_type` |
| `session_ended` | 4634 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` |
| `sign_in_unclaimed_principal` | 4624 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.elevated` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.workstation` |
| `tgt_issued` | 4768 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.logon_guid` `win.eventlog.security.ticket_encryption_type` |
| `ticket_renewed` | 4770 | `sparklogs.actor.domain` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.origin.ip` `sparklogs.origin.port` `win.eventlog.security.etype_meaning` `win.eventlog.security.kerberos_target` `win.eventlog.security.ticket_encryption_type` |
| `user_group_membership_enumerated` | 4798 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.name` `sparklogs.actor.type` `sparklogs.process.id` `sparklogs.process.name` `sparklogs.process.path` `sparklogs.target.domain` `sparklogs.target.id` `sparklogs.target.kind` `sparklogs.target.name` `sparklogs.target.type` |
| `user_sign_in` | 4624 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` `sparklogs.origin.host` `sparklogs.origin.ip` `sparklogs.origin.port` `sparklogs.running_as.domain` `sparklogs.running_as.id` `sparklogs.running_as.kind` `sparklogs.running_as.name` `sparklogs.running_as.type` `win.eventlog.security.auth_package` `win.eventlog.security.elevated` `win.eventlog.security.lm_package` `win.eventlog.security.logon_guid` `win.eventlog.security.logon_type` `win.eventlog.security.logon_type_name` `win.eventlog.security.workstation` |
| `user_signed_out` | 4647 | `sparklogs.actor.domain` `sparklogs.actor.id` `sparklogs.actor.kind` `sparklogs.actor.name` `sparklogs.actor.session` `sparklogs.actor.type` |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `audit_log_full` / `default`
- `ca_request_failed` / `default`
- `ca_tamper` / `admin_config`
- `ca_tamper` / `evidence_tamper`
- `event_logging_stopped` / `default`
- `firewall_service_stopped` / `default`
- `audit_subsystem_started`
- `boot_configuration_loaded`
- `firewall_driver_started`
- `firewall_service_started`

### Surfaces with no `win.eventlog.security.` field

These populate portable families only.
Looking for a feed-namespaced field on one of them finds nothing, and that is the design rather than a gap: the value has a cross-feed home instead.

- `account_changed` / `default`
- `account_created` / `default`
- `account_deleted` / `default`
- `account_disabled` / `default`
- `account_enabled` / `default`
- `account_password_change_failed` / `default`
- `account_password_reset` / `default`
- `account_password_reset_failed` / `default`
- `audit_log_cleared` / `default`
- `crypto_selftest_failed` / `default`
- `domain_policy_changed` / `default`
- `group_member_added` / `default`
- `group_member_removed` / `default`
- `group_membership_changed` / `default`
- `logon_right_granted` / `default`
- `logon_right_removed` / `default`
- `replay_attack_detected` / `default`
- `sid_history_changed` / `add_failed`
- `sid_history_changed` / `added`
- `special_group_logon` / `default`
- `anonymous_sign_out`
- `credman_credentials_read`
- `crypto_operation`
- `fips_selftest_passed`
- `group_membership_enumerated`
- `key_file_operation`
- `key_migration_operation`
- `non_account_sign_out`
- `primary_token_assigned`
- `user_group_membership_enumerated`
- `user_signed_out`
