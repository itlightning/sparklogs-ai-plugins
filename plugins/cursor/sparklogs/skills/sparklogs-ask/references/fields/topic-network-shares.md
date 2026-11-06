<!-- GENERATED reference. Do not hand-edit. -->
# Network shares fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.network_shares.share_name` | string |  | The share name, as Windows spells it. |
| `sparklogs.data.network_shares.path` | string |  | The local folder the share exposes, exactly as Windows returns it. Empty for an IPC share, which has no folder. Absent when it could not be read or the share is only in the registry. |
| `sparklogs.data.network_shares.share_type` | string |  | The kind of share: `disk`, `print`, `device`, `ipc` or `unknown`. Absent when the share is only in the registry. |
| `sparklogs.data.network_shares.share_type_code` | integer |  | The numeric share type Windows reports (the base type, without the special and temporary flags). |
| `sparklogs.data.network_shares.special` | bool |  | Whether Windows marks this as a special share, such as an administrative share like `C$` or `ADMIN$`. |
| `sparklogs.data.network_shares.temporary` | bool |  | Whether Windows marks the share as temporary. |
| `sparklogs.data.network_shares.persistent` | bool |  | Whether the share is saved in the registry, so the Server service recreates it at startup. |
| `sparklogs.data.network_shares.live` | bool |  | Whether the Server service currently offers the share. |
| `sparklogs.data.network_shares.remark` | string |  | The share's comment. Absent when empty or not read. |
| `sparklogs.data.network_shares.permissions_sddl` | string |  | The share permissions, as an SDDL access list. Empty when the share has no permission list, which gives the default access. Absent when it could not be converted or the share is only in the registry. |
