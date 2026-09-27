<!-- GENERATED reference. Do not hand-edit. -->
# Feed health fields

Full inventory every 2 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.feed_health.module` | string |  | Which data-feed module this row reports on (the pack module id). |
| `sparklogs.data.feed_health.health` | string |  | The debounced health verdict: on `collector_health`, `fresh`, `stale` (also a topic that has not reported at all within three of its intervals), `stalled`, `frozen`, `waiting_prereq` or `unknown` (the topic has ticked this process but produced no valid generation yet); on `feed_health`, `onboarding`, `onboarding_stuck`, `current`, `behind`, `stuck`, `blocked` or `unknown`. Until the topic or module reports in this process the row carries the verdict it last reported; absent when it has never reported one. |
| `sparklogs.data.feed_health.reason` | string |  | Why health is not the healthy value, from a closed vocabulary specific to the topic (for example `capture_failed`, `not_declared`, or `missing_required_channel`). Absent when health needs no explanation. |
| `sparklogs.data.feed_health.since` | string | timestamp | When the current health verdict began. Carried from the last report until the topic or module reports in this process, then reset, because the debounce that tracks it is in-memory. |
| `sparklogs.data.feed_health.lag_value` | integer |  | How far this module is behind the head, in whatever `lag_unit` names. |
| `sparklogs.data.feed_health.lag_unit` | string |  | What `lag_value` counts: `records` (an estimate that can undershoot) or `bytes` (an exact measure). |
| `sparklogs.data.feed_health.data_skips` | integer | count | How many spans of permanently lost events this module has recorded: a deliberate discard to escape a poisoned resume position, never an ordinary delay. |
| `sparklogs.data.feed_health.withholding` | object_array |  | The bound channels holding this module back, worst first, each with the channel `name`, `why` (`skipped`, `unavailable`, `never_drained` or `no_record`), `since`, and where known the `channel_type` and the last win32 `last_error`. Absent when the module is withholding on nothing. |
| `sparklogs.data.feed_health.withholding_omitted` | integer | count | How many withheld channels did not fit the list. Absent when the list is complete. |
| `sparklogs.data.feed_health.files_discovered` | integer | count | How many files this module's file source has discovered. Present for file sources only. |
| `sparklogs.data.feed_health.files_unreadable` | integer | count | How many of the discovered files could not be read. Present for file sources only. |
| `sparklogs.data.feed_health.delta_rate_limited` | bool |  | `true` while this row's transitions are capped by the daily rate limit: its reported health is held at the last one reported until the window drains. `false` otherwise. Engaging and releasing the cap are each reported once. Absent only on a row with no verdict yet this process, which carries the last reported value. |
