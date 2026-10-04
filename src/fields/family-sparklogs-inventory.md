<!-- GENERATED reference. Do not hand-edit. -->
# Inventory fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.inventory.part_number` | integer | count | Which part of a split table this event carries, counting from 1. |
| `sparklogs.inventory.total_parts` | integer | count | How many parts the table was split into. One when it was not split. |
| `sparklogs.inventory.row_count` | integer | count | Total inventory rows across all parts, repeated on each part. |
| `sparklogs.inventory.removed_instances` | string_array |  | Instance IDs of the rows removed since the previous inventory or change row, on topics that declare routine fields. Part 1 only, at most 100. Absent when none were removed. |
| `sparklogs.inventory.removed_truncated` | bool |  | `removed_instances` was cut at 100 IDs. `sparklogs.change_counts.removed` has the full count. |
