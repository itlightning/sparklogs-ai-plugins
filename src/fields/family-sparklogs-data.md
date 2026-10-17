<!-- GENERATED reference. Do not hand-edit. -->
# State row fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.instance` | string |  | The subject ID of this inventory or change row. |
| `sparklogs.data.delta_kind` | string |  | What happened to this row: `added`, `changed` or `removed`. On delta rows; on an inventory row added or changed since the topic last reported its changes, which a delta would otherwise have carried (an inventory lists no removed row); on the row of a monitor whose transition came with a change to that row; and on monitor rows for a departed subject whose current row is unavailable. Absent on an unchanged inventory row. |
| `sparklogs.data.delta_fields` | string_array |  | On a `changed` delta, inventory or monitor row: the State fields whose comparison moved, sorted, by each field's compare key where it declares one. Empty when the row rides the delta for a crossing or a sweep, or a held window's net change is nothing. Absent on `added` and `removed` rows. |
| `sparklogs.data.delta_old` | object |  | The complete previous row, included on delta rows and monitor rows for a departed subject whose current row is unavailable. |
| `sparklogs.data.absent_since` | string | timestamp | When a removed row was first seen missing, stamped by the agent on the removal rather than read from the row. Only on the removal that ends a missing row's grace, on topics that grant grace; the row stayed listed until then. |
