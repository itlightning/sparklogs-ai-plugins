<!-- GENERATED reference. Do not hand-edit. -->
# Feed health fields

Full inventory every 2 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.feed_health.module` | string |  | The pack module this feed belongs to. |
| `sparklogs.data.feed_health.health` | string |  | How the feed is doing: `onboarding` (has not caught up yet since it was added, and is moving), `onboarding_stuck` (has never caught up and is not moving), `current` (caught up), `behind` (was caught up, now has a backlog and is still moving), `stuck` (was caught up, now has a backlog and is not moving), `blocked` (cannot read for a known cause, named in `reason`) or `unknown` (the agent cannot tell right now). A new value is reported only after it holds for two checks in a row. Until the feed reports after an agent start, the row carries the value it last reported; absent when it has never reported one. |
| `sparklogs.data.feed_health.reason` | string |  | Why the feed is not `current`, such as `access_denied` or `missing_required_channel`. Absent when no explanation is needed. |
| `sparklogs.data.feed_health.since` | string | timestamp | When the current health value began. After an agent start, the row carries the last reported time until the feed reports again, then the time starts over. |
| `sparklogs.data.feed_health.lag_value` | integer |  | How far behind its newest data the feed is, in the unit `lag_unit` names. |
| `sparklogs.data.feed_health.lag_unit` | string |  | What the lag counts: `records` (an estimate that can come out low) or `bytes` (exact). |
| `sparklogs.data.feed_health.lag_is_upper_bound` | bool |  | True when the lag counts events Windows filters out before the agent reads them, so the feed is less far behind than the lag says. Present only when true. |
| `sparklogs.data.feed_health.suppressing` | bool |  | Whether the agent asks Windows to filter out some event IDs of this event log feed before reading them, on at least one of its channels. Absent for other feeds, and when the collector does not report it. |
| `sparklogs.data.feed_health.data_skips` | integer | count | How many ranges of events this event log feed has had to skip because Windows could not provide them. Those events are not collected, though they may still be in the machine's own event log. 0 when there were none; absent for feed types that do not detect skips. |
| `sparklogs.data.feed_health.withholding` | object_array |  | The channels holding this feed back, worst first. Each entry has the channel `name`, `why` (`skipped`: the collector skipped it; `unavailable`: missing or unreadable longer than the feed allows; `never_drained`: never caught up; `no_record`: the collector has reported nothing about it), `since`, and where known the `channel_type` and the Windows error `last_error` with its name. Absent when nothing holds the feed back. |
| `sparklogs.data.feed_health.withholding[].name` | string |  | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding[].why` | string |  | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding[].since` | string | timestamp | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding[].channel_type` | string |  | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding[].last_error` | integer |  | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding[].last_error_name` | string |  | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding[].last_error_space` | string |  | In each `withholding` entry. |
| `sparklogs.data.feed_health.withholding_omitted` | integer | count | How many more channels hold the feed back than the list has room for. Absent when the list is complete. |
| `sparklogs.data.feed_health.files_discovered` | integer | count | How many log files this file feed has found. Present for file feeds only. |
| `sparklogs.data.feed_health.files_unreadable` | integer | count | How many of the found files could not be read. Present for file feeds only. |
| `sparklogs.data.feed_health.error_kind` | string |  | Why a `blocked` file feed cannot read its files: `permission_denied` (the agent's account may not read them), `sharing_violation` (another process has kept a file open without allowing reads, across at least two checks) or `other` (see `win32_error`). Present only while the feed is `blocked`. |
| `sparklogs.data.feed_health.win32_error` | integer |  | The Windows error code reading the file failed with, such as 5 for access denied. Present only while the feed is `blocked` and Windows gave a code. |
| `sparklogs.data.feed_health.win32_error_name` | string |  | The name of the Windows error code, such as `ERROR_ACCESS_DENIED`. Absent when the code is 0 or has no known name. |
| `sparklogs.data.feed_health.win32_error_space` | string |  | The code table the error code belongs to: always `win32`. Present whenever the error code is. |
| `sparklogs.data.feed_health.polls_at_head` | integer | count | How many times, since the agent's previous heartbeat, the collector read this event log feed's channels right up to the newest event. Read with `polls_on_budget`: a feed that keeps reaching the newest event is keeping up. Present once the collector has reported twice. |
| `sparklogs.data.feed_health.polls_on_budget` | integer | count | How many times, since the agent's previous heartbeat, the collector stopped reading this event log feed's channels at its per-read limit with events still waiting. Many of these mean the feed is falling behind. Present once the collector has reported twice. |
| `sparklogs.data.feed_health.records_read_per_min` | integer |  | How many events per minute the collector read from this event log feed's channels, between its last two reports. Events Windows filters out are not counted. A `behind` feed reading at a high rate is catching up; one reading near 0 is not. Present once the collector has reported twice; absent while the collector has stopped reporting. |
| `sparklogs.data.feed_health.delta_rate_limited` | bool |  | True while this row has changed health too often in the last day, so the agent holds its reported health at the last value until fewer changes fall in the day. Reported once when the limit starts and once when it ends. False otherwise. |
