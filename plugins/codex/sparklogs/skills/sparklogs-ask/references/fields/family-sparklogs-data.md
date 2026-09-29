<!-- GENERATED reference. Do not hand-edit. -->
# State row fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.instance` | string |  | The subject ID of this inventory or change row. |
| `sparklogs.data.delta_kind` | string |  | What happened to this row: `added`, `changed` or `removed`. Delta rows only. |
| `sparklogs.data.delta_old` | object |  | The complete previous row, included on delta rows. |
| `sparklogs.data.absent_since` | string | timestamp | When a removed row was first seen missing, stamped by the agent on the removal rather than read from the row. Only on the removal that ends a missing row's grace, on topics that grant grace; the row stayed listed until then. |
