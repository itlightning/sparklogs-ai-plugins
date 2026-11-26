<!-- GENERATED reference. Do not hand-edit. -->
# Capture fields

**Use when:** checking whether rows from two topics came from the same collection pass, or whether a row was read with no stored state to compare it against.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.capture.id` | string |  | Collection group name identifying topics read together. |
| `sparklogs.capture.generation_id` | string |  | ID shared by topics read in one collection pass. Use it to correlate topics; matching timestamps alone are insufficient. |
| `sparklogs.capture.store` | string |  | `memory` when the agent could not open its state store and kept its state in memory for this run: the row is an observation only, never compared with what an earlier run saw. Absent otherwise. |
