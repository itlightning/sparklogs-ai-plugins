<!-- GENERATED reference. Do not hand-edit. -->
# Inventory fields

**Use when:** an inventory arrived in several parts and the question is whether every part is there, or how many rows the full table holds.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.inventory.part_number` | integer | count | Which part of a split table this event carries, counting from 1. |
| `sparklogs.inventory.total_parts` | integer | count | How many parts the table was split into. One when it was not split. |
| `sparklogs.inventory.row_count` | integer | count | Total inventory rows across all parts, repeated on each part. |
