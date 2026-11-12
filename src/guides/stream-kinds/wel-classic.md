# Kind: WEL classic (Application, System) and multi-channel feeds

Group **`provider_name` (LQL)**, then `event_id` (LQL) / `pattern` (LQL) / `pattern_hash` (LQL), then `sparklogs.reason` (LQL) when curated.
Scope with **`subsource` (LQL)**.

Two shapes share this ladder:

- **Single channel:** `win.eventlog.application` (value) and `win.eventlog.system` (value). One `origin` (LQL) per feed, so `origin` (LQL) is not the split.
- **Multi-channel:** `win.eventlog.platform` (value), `win.eventlog.storage` (value), `win.eventlog.network` (value), `win.eventlog.identity_security` (value), `win.eventlog.management` (value) and `win.eventlog.apps` (value) each collect many Operational and Admin channels. `origin` (LQL) names the channel (for example `Microsoft-Windows-TaskScheduler/Operational`), and it is the first split. A few chatty channels carry most of the volume, most of it at Debug.

## Explore

1. Confirm the host emits this `subsource` (LQL) (`query_scope_activity` (tool) / counts grouped by `subsource` (LQL)).
2. Multi-channel feeds: group by **`origin` (LQL)** to see which channels are talking.
3. Group by **`provider_name` (LQL)**. Application and System have many publishers; this is the first useful split there.
4. Inside a publisher: `event_id` (LQL), then `pattern` (LQL) / `pattern_hash` (LQL), then `sparklogs.reason` (LQL) when curated.
5. Narrow `query_logs` (tool) on the dominant groups. Raw `message` (LQL) last.

`service` (LQL) is ticket-class taxonomy when filled. Empty `service` (LQL) is still a real event. Do not require it.
On the multi-channel feeds, start a failure sweep with `severity >= warning` (LQL) or `sparklogs.reason!` (LQL): the Debug bulk is retained chatter.

## Payload

`event_data.*` is sparse unless curation promoted it.
Module fields live in `feeds/<id>/fields.md`. `provider_name` (LQL), `event_id` (LQL) and `origin` (LQL) above often are not listed there.

## Accuracy

`sparklogs.reason` (LQL) / curated `service` (LQL) miss uncurated raw text and sibling providers.
Widen by dropping those predicates before you say the channel is quiet.
