# Kind: WEL classic (Application, System)

Group **`provider_name` (LQL)**, then `winlog.event_id` (LQL) / `pattern` (LQL) / `pattern_hash` (LQL), then `sparklogs.reason` (LQL) when curated.
Scope with **`subsource` (LQL)** (`win.eventlog.application` or `win.eventlog.system`).

`origin` (LQL) is set; one origin per channel is typical, so it is not the split.

## Explore

1. Confirm the host emits this `subsource` (LQL) (`query_scope_activity` / counts grouped by `subsource` (LQL)).
2. Group by **`provider_name` (LQL)**. Application and System have many publishers; this is the first useful split.
3. Inside a publisher: `winlog.event_id` (LQL), then `pattern` (LQL) / `pattern_hash` (LQL), then `sparklogs.reason` (LQL) when curated.
4. Narrow `query_logs` on the dominant groups. Raw `message` (LQL) last.

`service` (LQL) is ticket-class taxonomy when filled. Empty `service` (LQL) is still a real event. Do not require it.

## Payload

`event_data.*` is sparse unless a curated surface promoted it.
Module fields live in `${CLAUDE_PLUGIN_ROOT}/feeds/<id>/fields.md`. Envelope keys above often are not listed there.

## Accuracy

`sparklogs.reason` (LQL) / curated `service` (LQL) miss uncurated native text and sibling providers.
Widen by dropping those predicates before you say the channel is quiet.
