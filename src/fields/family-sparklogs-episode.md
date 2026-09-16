<!-- GENERATED reference. Do not hand-edit. -->
# Episode fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.episode.id` | string |  | This episode's id. Never recycled, so it is safe to key on forever. |
| `sparklogs.episode.event_seq` | integer | count | Counts this episode's events from 1. Survives an agent restart, so a consumer can tell whether an event is newer than what it holds without trusting a clock. |
| `sparklogs.episode.occurrence` | integer | count | Which time this is that the condition has opened on this subject on this agent. Counted locally and kept across a reinstall; a wiped host resets it. |
| `sparklogs.episode.phase` | string |  | Where the episode stands: `onset`, `held`, `recovering`, `recovered` or `ended`. |
| `sparklogs.episode.transition` | string |  | What just changed: `opened`, `recovering`, `relapsed`, `closed`, `ended`, `severity_raised` or `severity_lowered`. Present if and only if something did. |
| `sparklogs.episode.first_observed_ts` | string | timestamp | When the episode opened. |
| `sparklogs.episode.age_basis` | string |  | What the episode's age may be trusted to mean: `onset` for a witnessed start, `observed` for one already true when first seen, which makes the age a lower bound, and `unknown_ongoing` for a posture with no meaningful start. |
| `sparklogs.episode.last_confirmed_ts` | string | timestamp | The last time the condition was seen still true. |
| `sparklogs.episode.max_observation_gap_s` | integer | seconds | The longest stretch during this episode where the agent was not watching. How much of a long episode is measurement rather than inference. |
| `sparklogs.episode.post_gap_s` | integer | seconds | How long the blind window was that this event immediately follows. Present only on the first event after one. |
| `sparklogs.episode.presence_seen_count` | integer | count | How many samples this subject's row was actually present in over its tracked life. Rides with its denominator or not at all: a numerator alone is not a ratio. |
| `sparklogs.episode.presence_observed_count` | integer | count | How many samples this subject could have been seen in, present or not. The denominator of the presence ratio. |
| `sparklogs.episode.recovery_attempts` | integer | count | How many times the episode has started recovering. The last one is the successful one, so more than one means the subject has been unstable rather than simply broken. |
| `sparklogs.episode.recovering_total_s` | integer | seconds | How long, in total observed time, the episode has spent recovering. |
| `sparklogs.episode.last_transition_ts` | string | timestamp | When this episode last emitted a transition, whatever it was. Answers how long it has been at this severity without scanning its other events. |
| `sparklogs.episode.peak_severity` | string |  | The highest severity this episode has carried, so one closing event can say it peaked here and lasted this long. |
| `sparklogs.episode.pending_transition` | string |  | The transition a debounce window is currently accumulating toward. Present only while one is running, and what explains readings sitting under the severity the episode still asserts. |
| `sparklogs.episode.pending_since_ts` | string | timestamp | When the running debounce window started holding. Rides with the transition it is accumulating toward or not at all. |
| `sparklogs.episode.replaced_id` | string |  | The episode this one superseded, linking a chain where one condition gave way to another on the same subject. |
| `sparklogs.episode.cleared_ts` | string | timestamp | When the condition stopped being true. Closure only. |
| `sparklogs.episode.clear_time_basis` | string |  | Whether the clearing time was witnessed (`observed`) or clamped back to the last confirmation because the agent was not watching when it cleared (`unobserved_gap`). |
| `sparklogs.episode.end_reason` | string |  | Why tracking stopped rather than why the condition cleared, for an episode that ended without recovering: the subject went away, or the condition was retired. |
