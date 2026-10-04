<!-- GENERATED reference. Do not hand-edit. -->
# State row fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.instance` | string |  | The subject ID of this inventory or change row. |
| `sparklogs.data.delta_kind` | string |  | What happened to this row: `added`, `changed` or `removed`. On delta rows; on the inventory rows of a topic that declares routine fields when the row was added or a routine field moved since the previous inventory or change row; and on a monitor row that carries such a routine change. |
| `sparklogs.data.routine` | bool |  | On a topic that declares routine fields: the row was added, removed, or one of the topic's routine fields moved. On delta and inventory rows it counted toward `sparklogs.change_counts`. On a monitor row it is the change that rode with the condition, beside `delta_kind` and `delta_old`; it is counted in that monitor event's `change_counts`, never in a delta's. Absent otherwise. |
| `sparklogs.data.delta_old` | object |  | The complete previous row, included on delta rows, and on the monitor and inventory rows of a topic that declares routine fields when they carry a routine change. |
| `sparklogs.data.absent_since` | string | timestamp | When a removed row was first seen missing, stamped by the agent on the removal rather than read from the row. Only on the removal that ends a missing row's grace, on topics that grant grace; the row stayed listed until then. |
