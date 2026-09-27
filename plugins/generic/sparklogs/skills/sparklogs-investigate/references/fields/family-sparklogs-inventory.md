<!-- GENERATED reference. Do not hand-edit. -->
# Inventory fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.inventory.part_number` | integer | count | Which part of a split table this event carries, counting from 1. |
| `sparklogs.inventory.total_parts` | integer | count | How many parts the table was split into. One when it was not split. |
| `sparklogs.inventory.row_count` | integer | count | Total inventory rows across all parts, repeated on each part. |
