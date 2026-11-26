<!-- GENERATED reference. Do not hand-edit. -->
# Delta fields

**Use when:** checking whether a change event is missing between two others for the same device and topic.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.delta.id` | string |  | This change event's own id. |
| `sparklogs.delta.prev_id` | string |  | Previous change ID in this epoch. Use it to detect gaps in the change chain. Absent on the first change after an inventory. |
