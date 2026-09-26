<!-- GENERATED reference. Do not hand-edit. -->
# Collector health fields

Full inventory every 2 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.collector_health.topic` | string |  | Which state topic this row reports on. |
| `sparklogs.data.collector_health.health` | string |  | The debounced health verdict: on `collector_health`, `fresh`, `stale` (also a topic that has not reported at all within three of its intervals), `stalled`, `frozen`, `waiting_prereq` or `unknown` (the topic has ticked this process but produced no valid generation yet); on `feed_health`, `onboarding`, `onboarding_stuck`, `current`, `behind`, `stuck`, `blocked` or `unknown`. Until the topic or module reports in this process the row carries the verdict it last reported; absent when it has never reported one. |
| `sparklogs.data.collector_health.reason` | string |  | Why health is not the healthy value, from a closed vocabulary specific to the topic (for example `capture_failed`, `not_declared`, or `missing_required_channel`). Absent when health needs no explanation. |
| `sparklogs.data.collector_health.since` | string | timestamp | When the current health verdict began. Carried from the last report until the topic or module reports in this process, then reset, because the debounce that tracks it is in-memory. |
| `sparklogs.data.collector_health.last_success_ts` | string | timestamp | The last time this topic's collector produced a valid generation. Survives an agent restart, unlike `since`. |
| `sparklogs.data.collector_health.capture` | string |  | Which capture loop this topic's collector reads from. |
| `sparklogs.data.collector_health.delta_rate_limited` | bool |  | `true` while this row's transitions are capped by the daily rate limit: its reported health is held at the last one reported until the window drains. `false` otherwise. Engaging and releasing the cap are each reported once. Absent only on a row with no verdict yet this process, which carries the last reported value. |
