<!-- GENERATED reference. Do not hand-edit. -->
# Occurrence fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.occurrence.type` | string |  | What the agent detected itself: `config_change` when a field the pack declares change-worthy moved between two captures of the same subject. Absent on a collected fact, whose reason identifies it. |
| `sparklogs.occurrence.lookback_d` | integer | days | Discovery lookback in days. Absence says nothing about occurrences before this period. Absent on a `config_change`. |
| `sparklogs.occurrence.changes` | object_array |  | On a `config_change`: one entry per moved field, with `field`, and `old` and `new` as the row carries them. A side the row did not carry is absent. |
