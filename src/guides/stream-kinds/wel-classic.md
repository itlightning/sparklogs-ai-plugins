# Kind: WEL classic (Application, System)

Group **`provider_name`**, then `winlog.event_id` / `pattern` / `pattern_hash`, then `reason` when curated.
Scope with **`subsource`** (`win.eventlog.application` or `win.eventlog.system`).

On managed-agent Windows Event Log, `app` is usually empty.
Do not use `app` to pick a channel. Channel identity is `subsource`.
`origin` is set; one origin per channel is typical, so it is not the split.

## Explore

1. Confirm the host emits this `subsource` (`query_scope_activity` / counts grouped by `subsource`).
2. Group by **`provider_name`**. Application and System have many publishers; this is the first useful split.
3. Inside a publisher: `winlog.event_id`, then `pattern` / `pattern_hash`, then `reason` when curated.
4. Narrow `query_logs` on the dominant groups. Raw `message` last.

`service` is ticket-class taxonomy when filled. Empty `service` is still a real event. Do not require it.

## Payload

`event_data.*` is sparse unless a curated surface promoted it.
Module fields live in `feeds/<id>/fields.md`. Envelope keys above often are not listed there.

## Accuracy

`reason` / curated `service` miss uncurated native text and sibling providers.
Widen by dropping those predicates before you say the channel is quiet.
