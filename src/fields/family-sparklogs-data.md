<!-- GENERATED reference. Do not hand-edit. -->
# State row fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.instance` | string |  | The row's subject id, echoed onto the row so a table entry identifies itself without reference to the key it was built from. |
| `sparklogs.data.delta_kind` | string |  | What happened to this row: `added`, `changed` or `removed`. Delta rows only. |
| `sparklogs.data.delta_old` | object |  | The full row as it was before the change, rather than a field-level diff: that is the question people ask, and the diff is derivable from it while the reverse is not. Delta rows only. |
