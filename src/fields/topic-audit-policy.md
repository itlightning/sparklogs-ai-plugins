<!-- GENERATED reference. Do not hand-edit. -->
# Audit policy fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.audit_policy.audit_framework` | string |  | Which audit system the policy belongs to. `windows_advanced_audit` is the Windows Advanced Audit Policy subcategories, the only one reported today. Reserved for other platforms: `auditd` (Linux audit daemon rules), `openbsm` (macOS BSM audit classes) and `none` (no audit system). Always present. |
| `sparklogs.data.audit_policy.audit_events` | string_array |  | Which events the audit policy records, sorted. Each tag is `<family>[_<detail>]_<outcome>`, outcome `success` or `failure`. A family tag (`logon_success`) is present whenever any of its subcategories records that outcome, beside each such subcategory's own tag (`logon_logon_success`). Families: `logon`, `authentication`, `process_creation`, `process_termination`, `detailed_tracking`, `file_access`, `object_access`, `network`, `account_management`, `policy_change`, `privilege_use`, `system`, `directory_service`. An empty array is a policy that was read and records nothing. Absent when the policy could not be read, preserving the previous result. Under `auditd` the tags will be the rule keys, with no outcome suffix; under `openbsm` the classes map to families: `lo` logon, `aa` authentication, `ex` process_creation, `pc` process_termination, `fr`/`fw`/`fa`/`fm`/`fc`/`fd` file_access_read/write/attribute_read/attribute_modify/create/delete, `ad` account_management, policy_change, privilege_use and system, `nt` network, `ot` object_access. |
