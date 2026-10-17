<!-- GENERATED reference. Do not hand-edit. -->
# Epoch fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.epoch.id` | string |  | Globally unique inventory epoch ID. Parts and subsequent changes share this ID. |
| `sparklogs.epoch.prev_id` | string |  | Previous epoch ID for this agent and topic. Absent for the first epoch or after stored state was cleared. |
| `sparklogs.epoch.seq` | integer | count | Epoch sequence for this agent and topic, starting at 1. It can repeat after a crash or state reset; use the epoch ID for identity. |
| `sparklogs.epoch.t` | string | timestamp | When this epoch's inventory was observed: its `t`, repeated on every part and on every change row of the epoch. Inventory and change rows only. |
| `sparklogs.epoch.prev_t` | string | timestamp | When the previous epoch's inventory was observed, kept across an agent restart. Absent with `prev_id`. Inventory and change rows only. |
