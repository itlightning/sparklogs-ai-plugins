<!-- GENERATED reference. Do not hand-edit. -->
# Network shares

Each share this machine offers, including administrative shares such as C$ and ADMIN$, with its type (disk, print, device or IPC), the local folder it exposes, its comment, its share permissions, and whether it is offered now or saved to return at startup.

**Use when:** a shared folder went missing or appeared, users lose access to a share, or an audit asks what this machine shares and with whom.

Permissions are the share's own access list, not the folder's NTFS permissions, and a change carries no user or exact time; Windows records who made it only when file share auditing is turned on.

Full inventory every day. Changes are reported between inventories.

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
