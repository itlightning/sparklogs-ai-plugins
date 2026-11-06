<!-- GENERATED reference. Do not hand-edit. -->
# Audit policy fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.audit_policy.audit_framework` | string |  | Which audit system the policy comes from. Always `windows_advanced_audit` (the Windows Advanced Audit Policy) on Windows. |
| `sparklogs.data.audit_policy.audit_events` | string_array |  | What the audit policy records, sorted. Each entry is a family, an optional detail and an outcome (`success` or `failure`), such as `logon_logon_success`. A family entry such as `logon_success` is also listed when any of its subcategories records that outcome. Families: `logon`, `authentication`, `process_creation`, `process_termination`, `detailed_tracking`, `file_access`, `object_access`, `network`, `account_management`, `policy_change`, `privilege_use`, `system`, `directory_service`. An empty list means the policy was read and records nothing. Absent when the policy could not be read; the previous value then stands. |
| `sparklogs.data.audit_policy.audit_subcategories` | object_array |  | Every audit subcategory Windows defines, in `auditpol` order, with whether the policy records its successes and failures. `native_id` is the subcategory GUID. A subcategory SparkLogs recognizes also has its `audit_event` and `family` and the English names `auditpol` prints; any other has the names Windows gives in the machine's display language, marked `native_name_source` `os`. A change to this list alone raises no change event; `audit_events` decides that. Absent when the policy could not be read; the previous value then stands. |
| `sparklogs.data.audit_policy.audit_subcategories[].native_id` | string |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].success` | bool |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].failure` | bool |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].audit_event` | string |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].family` | string |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].native_name` | string |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].native_category` | string |  | In each `audit_subcategories` entry. |
| `sparklogs.data.audit_policy.audit_subcategories[].native_name_source` | string |  | In each `audit_subcategories` entry. |
