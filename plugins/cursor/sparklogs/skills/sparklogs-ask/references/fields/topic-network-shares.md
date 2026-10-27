<!-- GENERATED reference. Do not hand-edit. -->
# Network shares fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.network_shares.share_name` | string |  | Native display spelling of the share name. |
| `sparklogs.data.network_shares.path` | string |  | Local path exposed by the share, exactly as Windows returns it: native case and separators, never tokenized. Empty string for authoritative IPC with no path; omitted when unread or registry-only. |
| `sparklogs.data.network_shares.share_type` | string |  | Native base share type: disk, print, device, ipc or unknown. Unread for registry-only rows. |
| `sparklogs.data.network_shares.share_type_code` | integer |  | Native STYPE_MASK base share type. |
| `sparklogs.data.network_shares.special` | bool |  | Native STYPE_SPECIAL flag. |
| `sparklogs.data.network_shares.temporary` | bool |  | Native STYPE_TEMPORARY flag. |
| `sparklogs.data.network_shares.persistent` | bool |  | Listed in the persistent LanmanServer Shares registry key. |
| `sparklogs.data.network_shares.live` | bool |  | Listed by the local server share enumeration. |
| `sparklogs.data.network_shares.remark` | string |  | Native share comment, absent when empty or unread. |
| `sparklogs.data.network_shares.permissions_sddl` | string |  | DACL-only SDDL. Empty string means the native descriptor is absent (default access); omitted on conversion failure or registry-only rows. |
