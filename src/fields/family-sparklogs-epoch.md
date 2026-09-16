<!-- GENERATED reference. Do not hand-edit. -->
# Epoch fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.epoch.id` | string |  | This era's opaque id. Globally unique, so an equality query on it is meaningful across a whole fleet. |
| `sparklogs.epoch.prev_id` | string |  | The previous era of this agent and topic, so any row hands a consumer the one before it with no round trip. Absent for the genuinely first era, and after the agent's stored state was wiped. |
| `sparklogs.epoch.seq` | integer | count | A counter per agent and topic, starting at 1, so the last few eras are one range query rather than a walk. It can repeat across a crash, so it orders eras and never identifies one: that is what the id is for. |
