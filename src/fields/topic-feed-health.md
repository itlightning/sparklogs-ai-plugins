<!-- GENERATED reference. Do not hand-edit. -->
# Feed health fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.feed_health.module` | string |  | Which data-feed module this row reports on (the pack module id). |
| `sparklogs.data.feed_health.health` | string |  | The debounced health verdict: on `collector_health`, `fresh`, `stale`, `stalled`, `frozen`, `waiting_prereq` or `unknown`; on `feed_health`, `onboarding`, `onboarding_stuck`, `current`, `behind`, `stuck`, `blocked` or `unknown`. Absent only when nothing has evaluated this row yet. |
| `sparklogs.data.feed_health.reason` | string |  | Why health is not the healthy value, from a closed vocabulary specific to the topic (for example `capture_failed`, `not_declared`, or `missing_required_channel`). Absent when health needs no explanation. |
| `sparklogs.data.feed_health.since` | string | timestamp | When the current health verdict began. Resets on an agent restart, because the debounce that tracks it is in-memory. |
| `sparklogs.data.feed_health.lag_value` | integer |  | How far this module is behind the head, in whatever `lag_unit` names. |
| `sparklogs.data.feed_health.lag_unit` | string |  | What `lag_value` counts: `records` (an estimate that can undershoot) or `bytes` (an exact measure). |
| `sparklogs.data.feed_health.data_skips` | integer | count | How many spans of permanently lost events this module has recorded: a deliberate discard to escape a poisoned resume position, never an ordinary delay. |
| `sparklogs.data.feed_health.files_discovered` | integer | count | How many files this module's file source has discovered. Present for file sources only. |
| `sparklogs.data.feed_health.files_unreadable` | integer | count | How many of the discovered files could not be read. Present for file sources only. |
| `sparklogs.data.feed_health.delta_rate_limited` | bool |  | Present and `true` when this row's transition was debounced against a rate limit rather than reported the instant it happened. |
