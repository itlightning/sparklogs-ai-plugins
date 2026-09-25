<!-- GENERATED reference. Do not hand-edit. -->
# State row fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.instance` | string |  | The subject ID of this inventory or change row. |
| `sparklogs.data.delta_kind` | string |  | What happened to this row: `added`, `changed` or `removed`. Delta rows only. |
| `sparklogs.data.delta_old` | object |  | The complete previous row, included on delta rows. |
