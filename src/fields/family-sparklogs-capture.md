<!-- GENERATED reference. Do not hand-edit. -->
# Capture fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.capture.id` | string |  | The capture generation's name, a readable constant telling a consumer which topics ship together. |
| `sparklogs.capture.generation_id` | string |  | One sampling pass's opaque id, stamped identically on every topic read in that pass. The sound way to join sibling topics: the state loop reads the clock once per wake, so equal timestamps do not prove a shared generation. |
