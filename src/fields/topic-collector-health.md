<!-- GENERATED reference. Do not hand-edit. -->
# Collector health fields

Full inventory every 2 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.collector_health.topic` | string |  | The state topic this row reports on, such as `disk_volumes`. |
| `sparklogs.data.collector_health.health` | string |  | How the topic's collection is doing: `fresh` (reporting on time), `stale` (no good reading within three of its intervals), `stalled` (a reading is stuck past its timeout), `frozen` (the readings are unusable, so its conditions are held), `waiting_prereq` (not running because something it needs is missing) or `unknown` (running, with no good reading yet since the agent started). A new value is reported only after it holds for two checks in a row. Until the topic reports after an agent start, the row carries the value it last reported; absent when it has never reported one. |
| `sparklogs.data.collector_health.reason` | string |  | Why the topic is not `fresh`, such as `capture_failed` or `not_declared`. Absent when no explanation is needed. |
| `sparklogs.data.collector_health.since` | string | timestamp | When the current health value began. After an agent start, the row carries the last reported time until the topic reports again, then the time starts over. |
| `sparklogs.data.collector_health.last_success_ts` | string | timestamp | The last time this topic produced a good reading. Kept across agent restarts. |
| `sparklogs.data.collector_health.capture` | string |  | Which of the agent's readings this topic's data comes from. |
| `sparklogs.data.collector_health.delta_rate_limited` | bool |  | True while this row has changed health too often in the last day, so the agent holds its reported health at the last value until fewer changes fall in the day. Reported once when the limit starts and once when it ends. False otherwise. |
