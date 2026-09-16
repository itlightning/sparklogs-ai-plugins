<!-- GENERATED reference. Do not hand-edit. -->
# Collector health fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.collector_health.topic` | string |  | Which state topic this row reports on. |
| `sparklogs.data.collector_health.health` | string |  | The debounced health verdict: on `collector_health`, `fresh`, `stale`, `stalled`, `frozen`, `waiting_prereq` or `unknown`; on `feed_health`, `onboarding`, `onboarding_stuck`, `current`, `behind`, `stuck`, `blocked` or `unknown`. Absent only when nothing has evaluated this row yet. |
| `sparklogs.data.collector_health.reason` | string |  | Why health is not the healthy value, from a closed vocabulary specific to the topic (for example `capture_failed`, `not_declared`, or `missing_required_channel`). Absent when health needs no explanation. |
| `sparklogs.data.collector_health.since` | string | timestamp | When the current health verdict began. Resets on an agent restart, because the debounce that tracks it is in-memory. |
| `sparklogs.data.collector_health.last_success_ts` | string | timestamp | The last time this topic's collector produced a valid generation. Survives an agent restart, unlike `since`. |
| `sparklogs.data.collector_health.capture` | string |  | Which capture loop this topic's collector reads from. |
| `sparklogs.data.collector_health.delta_rate_limited` | bool |  | Present and `true` when this row's transition was debounced against a rate limit rather than reported the instant it happened. |
