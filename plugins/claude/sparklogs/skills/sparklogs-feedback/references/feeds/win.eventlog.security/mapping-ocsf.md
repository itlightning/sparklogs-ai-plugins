<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# OCSF anchors: `win.eventlog.security`

Orientation for a reader carrying Open Cybersecurity Schema Framework priors.
An anchor names the neighbouring idea in that taxonomy; it is not a claim of identical semantics, and the governing definition is always the one in the field schema.
An empty cell means there is no honest neighbour, which is a stated answer rather than a gap.

This lives in its own file on purpose: an inline mapping column taxes every read of the field schema for the minority of readers who need it.

OCSF nests entities under the event actor. Anchors below name the object path, not a class- specific attribute id, because the same family appears under different classes. Read the `user` anchors with that in mind: OCSF `user` is the SUBJECT of the event, which is a different one of our families depending on the class. On an authentication class it is the account signing in, which is our `actor`; on an account- or group-management class it is the account being changed, which is our `target`; on group management the member is `user` and the group is the first-class `group` object, which is our `target` with kind=group. Our families do not move with the class, so which of ours a `user` anchor means is decided by which family is populated on the row, and that is the disambiguator rather than a per-class table.

## Portable families

| LQL path | OCSF |
|---|---|
| `sparklogs.actor.id` | `user.uid` |
| `sparklogs.actor.name` | `user.name` |
| `sparklogs.actor.type` |  |
| `sparklogs.actor.kind` | `user.type` |
| `sparklogs.actor.domain` | `user.domain` |
| `sparklogs.actor.session` | `actor.session.uid` |
| `sparklogs.running_as.id` | `actor.user.uid` |
| `sparklogs.running_as.name` | `actor.user.name` |
| `sparklogs.running_as.type` |  |
| `sparklogs.running_as.kind` | `actor.user.type` |
| `sparklogs.running_as.domain` | `actor.user.domain` |
| `sparklogs.target.id` | `user.uid` |
| `sparklogs.target.name` | `user.name` |
| `sparklogs.target.type` |  |
| `sparklogs.target.kind` | `user.type` |
| `sparklogs.target.domain` | `user.domain` |
| `sparklogs.process.id` | `actor.process.pid` |
| `sparklogs.process.path` | `actor.process.file.path` |
| `sparklogs.process.name` | `actor.process.file.name` |
| `sparklogs.member.id` | `user.uid` |
| `sparklogs.member.name` | `user.name` |
| `sparklogs.member.type` |  |
| `sparklogs.member.kind` | `user.type` |
| `sparklogs.origin.ip` | `src_endpoint.ip` |
| `sparklogs.origin.host` | `src_endpoint.hostname` |
| `sparklogs.origin.port` | `src_endpoint.port` |
| `sparklogs.destination.host` | `dst_endpoint.hostname` |
| `sparklogs.result.code` | `status_code` |
| `sparklogs.result.code_space` |  |
| `sparklogs.result.code_name` |  |
| `sparklogs.result.failed` |  |
| `sparklogs.config_change.type` |  |
| `sparklogs.config_change.action` | `activity_name` |
| `sparklogs.config_change.target` |  |

### What each family means here

- **`actor`**: The initiator. Who wanted the thing done. Ratified against the OCSF inversion: OCSF `actor` is the MECHANISM identity, so our actor anchors at OCSF `user`, the principal the event is about, and never at `actor.user`. CIM neighbour: our actor is CIM `user`.
- **`running_as`**: The execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal. This is the concept OCSF calls `actor.user`, the mechanism identity. CIM calls it `src_user`.
- **`target`**: The principal the action was done TO. A group acted upon is this family with kind=group, because a group is a principal here rather than a separate object. OCSF group-management carries the group as its first-class `group` object, so target(kind=group) is the anchor for OCSF `group`, while an account target anchors the per-class affected user.
- **`process`**: The process the event is about.
- **`member`**: The principal whose membership in the target changed. A member is only ever a member, so no role collision is possible; group-in-group nesting reads member kind=group. OCSF group-management carries the group as `group` and the member as `user`. Our shape inverts nothing: target holds the group with kind=group, member holds the principal, and the anchor names where OCSF puts the same fact.
- **`origin`**: The initiating network endpoint. Populated only when the value names a machine other than the reporting host, which is what makes the populated side the direction. Anchors `src_endpoint`, whichever class the event belongs to.
- **`destination`**: The receiving network endpoint.
- **`result`**: The main result code the source reported, the number space it belongs to, the constant name that space gives it, and whether that code is a failure. The name is a DECODE of the first two, present only where the source pack holds a decode table for that space. `failed` is a marker: presence means failure, absence of the field means success, and it is never false.
- **`config_change`**: What configuration changed, in what direction, on what.

## Module fields

| LQL path | OCSF |
|---|---|
| `win.eventlog.security.logon_guid` | `session.uuid` |
| `win.eventlog.security.logon_type` | `logon_type_id` |
| `win.eventlog.security.logon_type_name` | `logon_type` |
| `win.eventlog.security.auth_package` | `auth_protocol` |
| `win.eventlog.security.lm_package` | `auth_protocol` |
| `win.eventlog.security.token_elevated` | `session.is_privileged` |
| `win.eventlog.security.privileges` |  |
| `win.eventlog.security.workstation` | `src_endpoint.hostname` |
| `win.eventlog.security.caller_computer` | `src_endpoint.hostname` |
| `win.eventlog.security.status` | `status_code` |
| `win.eventlog.security.substatus` | `status_detail` |
| `win.eventlog.security.status_meaning` | `status_detail` |
| `win.eventlog.security.psdirect_handshake` |  |
| `win.eventlog.security.kerberos_target` | `service.name` |
| `win.eventlog.security.ticket_encryption_type` |  |
| `win.eventlog.security.etype_meaning` |  |
| `win.eventlog.security.target_server` | `dst_endpoint.hostname` |
| `win.eventlog.security.audit_subcategory_guid` |  |
| `win.eventlog.security.new_process_id` | `process.pid` |
| `win.eventlog.security.uac_token_type` |  |
| `win.eventlog.security.integrity_level` |  |
| `win.eventlog.security.integrity_level_sid` |  |
| `win.eventlog.security.parent_process_name` | `actor.process.file.path` |
| `win.eventlog.security.service_name` | `service.name` |
| `win.eventlog.security.service_image_path` | `file.path` |
| `win.eventlog.security.service_account` | `user.name` |
| `win.eventlog.security.task_name` | `job.name` |
| `win.eventlog.security.object_name` |  |
| `win.eventlog.security.object_type` |  |
| `win.eventlog.security.object_value_name` | `reg_value.name` |
| `win.eventlog.security.operation_meaning` | `activity_name` |
| `win.eventlog.security.previous_time` |  |
| `win.eventlog.security.new_time` |  |
| `win.eventlog.security.insecure_boot_flags` |  |
| `win.eventlog.security.rule_name` | `firewall_rule.name` |
| `win.eventlog.security.rule_id` | `firewall_rule.uid` |
| `win.eventlog.security.share_name` | `share.name` |
| `win.eventlog.security.share_path` | `share.path` |
| `win.eventlog.security.old_target_user` | `user.name` |
| `win.eventlog.security.new_target_user` | `user.name` |
| `win.eventlog.security.object_dn` |  |
| `win.eventlog.security.attribute_name` |  |
| `win.eventlog.security.nps_reason_code` | `status_code` |
| `win.eventlog.security.nps_reason_meaning` | `status_detail` |
| `win.eventlog.security.nps_policy` | `policy.name` |
| `win.eventlog.security.publisher_id` | `metadata.product.name` |
| `win.eventlog.security.pua_count` |  |
| `win.eventlog.security.dropped_count` |  |
