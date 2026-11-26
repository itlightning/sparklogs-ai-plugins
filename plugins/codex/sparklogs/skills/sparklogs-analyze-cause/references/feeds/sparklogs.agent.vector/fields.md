<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `sparklogs.agent.vector`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.

## Raw fallback

This source has no named provider payload, so there is no field-shaped raw fallback.
A value that is not promoted here lives in the retained message text and nowhere else.

## Module fields

Stored flat under the `sparklogs.agent.vector.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `sparklogs.agent.vector.component_id` | string | Name of the agent collection component that reported the problem, as the agent configuration names it. Says which feed or delivery path is affected by a failure to start, read or send. |
| `sparklogs.agent.vector.channel` | string | Windows Event Log channel the row is about: the channel with missing records, or the channel that is not being collected. |
| `sparklogs.agent.vector.missing_records` | int | Number of event records in the channel that were not collected, for the gap this row reports. |
| `sparklogs.agent.vector.previous_record_id` | int | Event record ID (as Event Viewer shows it on the Details tab) of the last record collected before the gap. The records after it were not collected. |
| `sparklogs.agent.vector.record_id` | int | Event record ID (as Event Viewer shows it on the Details tab) of the first record collected after the gap. The records just before it were not collected. |
| `sparklogs.agent.vector.resume_rung` | string | How far the agent moved forward in the channel to start reading again when it could not continue from its saved place: not at all (the saved place worked), one record or one moment, a jump of a few seconds up to half an hour, or straight to new records, skipping everything already in the channel. |
| `sparklogs.agent.vector.skip_cause` | string | Why a channel configured for collection is not being collected: the channel does not exist on this machine, Windows does not allow a subscription to it, the custom event query configured for it is invalid, or access to it was denied. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
A key is listed with the module field of the same name; a key without one may still be queryable under another field in the table above.

| Tail key | Queryable as |
|---|---|
| `channel` | `sparklogs.agent.vector.channel` |
| `missing_records` | `sparklogs.agent.vector.missing_records` |
| `previous_record_id` | `sparklogs.agent.vector.previous_record_id` |
| `record_id` | `sparklogs.agent.vector.record_id` |
| `resume_rung` | `sparklogs.agent.vector.resume_rung` |
| `skip_cause` | `sparklogs.agent.vector.skip_cause` |
| `component_id` | `sparklogs.agent.vector.component_id` |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `log_collection_feed_not_collecting` / `default` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.skip_cause` |  |
| `log_collection_feed_unavailable` / `feed_scoped` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_feed_unavailable` / `onset` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_feed_unavailable` / `recovered` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_feed_unavailable` / `reminder` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_query_filter_not_applied` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_query_filter_rejected` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_read_failed` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_restarted_from_oldest` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_collection_skipped_records_overwritten` / `default` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.missing_records` `sparklogs.agent.vector.previous_record_id` `sparklogs.agent.vector.record_id` |  |
| `log_collection_skipped_to_recover` / `default` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.missing_records` `sparklogs.agent.vector.resume_rung` |  |
| `log_collection_stream_not_started` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `log_delivery_failed` / `default` | n/a | `sparklogs.agent.vector.component_id` |  |
| `wel_resume_ladder_bookmark_dead` | n/a | `sparklogs.agent.vector.channel` `sparklogs.agent.vector.component_id` `sparklogs.agent.vector.resume_rung` |  |
