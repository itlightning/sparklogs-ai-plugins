<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `sparklogs.agent.vector`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

This source has no named provider payload, so there is no field-shaped raw fallback.
A value that is not promoted here lives in the retained message text and nowhere else.

## Module fields

Stored flat under the `sparklogs.agent.vector.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `sparklogs.agent.vector.component_id` | string |  |
| `sparklogs.agent.vector.channel` | string |  |
| `sparklogs.agent.vector.missing_records` | int |  |
| `sparklogs.agent.vector.previous_record_id` | int |  |
| `sparklogs.agent.vector.record_id` | int |  |
| `sparklogs.agent.vector.resume_rung` | string |  |
| `sparklogs.agent.vector.skip_cause` | string |  |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `channel` | not queryable as a field |
| `missing_records` | not queryable as a field |
| `previous_record_id` | not queryable as a field |
| `record_id` | not queryable as a field |
| `resume_rung` | not queryable as a field |
| `skip_cause` | not queryable as a field |
| `component_id` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `sparklogs_collector_delivery_failed` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_feed_not_collecting` / `default` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.skip_cause` |  |
| `sparklogs_collector_feed_unavailable` / `feed_scoped` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_feed_unavailable` / `onset` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_feed_unavailable` / `recovered` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_feed_unavailable` / `reminder` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_read_failed` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_restarted_from_oldest` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `sparklogs_collector_skipped_records_overwritten` / `default` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.missing_records` `sparklogs.agent.vector.previous_record_id` `sparklogs.agent.vector.record_id` |  |
| `sparklogs_collector_skipped_to_recover` / `default` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.missing_records` `sparklogs.agent.vector.resume_rung` |  |
| `sparklogs_collector_stream_not_started` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
