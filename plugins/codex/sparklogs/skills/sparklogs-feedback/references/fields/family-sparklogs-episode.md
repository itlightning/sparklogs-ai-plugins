<!-- GENERATED reference. Do not hand-edit. -->
# Episode fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.episode.id` | string |  | Unique episode ID, retained throughout the condition's lifecycle. |
| `sparklogs.episode.event_seq` | integer | count | Counts this episode's events from 1. Survives an agent restart, so a consumer can tell whether an event is newer than what it holds without trusting a clock. |
| `sparklogs.episode.occurrence` | integer | count | Which time this is that the condition has opened on this subject on this agent. Counted locally and kept across a reinstall; a wiped host resets it. |
| `sparklogs.episode.phase` | string |  | Where the episode stands: `onset`, `held`, `recovering`, `recovered` or `ended`. |
| `sparklogs.episode.transition` | string |  | Lifecycle change: `opened`, `recovering`, `relapsed`, `closed`, `ended`, `severity_raised` or `severity_lowered`. Absent without a transition. |
| `sparklogs.episode.first_observed_ts` | string | timestamp | When the episode opened. |
| `sparklogs.episode.age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.episode.last_confirmed_ts` | string | timestamp | The last time the condition was seen still true. |
| `sparklogs.episode.max_observation_gap_s` | integer | seconds | Longest observation gap during the episode, in seconds. |
| `sparklogs.episode.post_gap_s` | integer | seconds | Duration of the observation gap preceding this event, in seconds. Present only on the first event after a gap. |
| `sparklogs.episode.presence_seen_count` | integer | count | Samples containing this subject during its tracked lifetime. Present only with `presence_observed_count`, the denominator. |
| `sparklogs.episode.presence_observed_count` | integer | count | Samples in which this subject could have been observed. Denominator for `presence_seen_count`. |
| `sparklogs.episode.recovery_attempts` | integer | count | Number of recovery attempts during this episode. An attempt does not establish that recovery completed. |
| `sparklogs.episode.recovering_total_s` | integer | seconds | How long, in total observed time, the episode has spent recovering. |
| `sparklogs.episode.last_transition_ts` | string | timestamp | When this episode last emitted a transition, whatever it was. Answers how long it has been at this severity without scanning its other events. |
| `sparklogs.episode.peak_severity` | string |  | The highest severity this episode has carried, so one closing event can say it peaked here and lasted this long. |
| `sparklogs.episode.pending_transition` | string |  | The transition a debounce window is currently accumulating toward. Present only while one is running, and what explains readings sitting under the severity the episode still asserts. |
| `sparklogs.episode.pending_since_ts` | string | timestamp | When the running debounce window started holding. Rides with the transition it is accumulating toward or not at all. |
| `sparklogs.episode.replaced_id` | string |  | The episode this one superseded, linking a chain where one condition gave way to another on the same subject. |
| `sparklogs.episode.cleared_ts` | string | timestamp | When the condition stopped being true. Closure only. |
| `sparklogs.episode.clear_time_basis` | string |  | Whether the clearing time was witnessed (`observed`) or clamped back to the last confirmation because the agent was not watching when it cleared (`unobserved_gap`). |
| `sparklogs.episode.end_reason` | string |  | Why tracking stopped rather than why the condition cleared, for an episode that ended without recovering: the subject went away, or the condition was retired. |
