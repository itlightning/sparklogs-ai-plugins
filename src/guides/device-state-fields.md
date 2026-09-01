# Device state: fields, honesty, and where it fits an MSP investigation

## Where this fits

**Chat / device questions** (`sparklogs-ask`): this is the **headline**. CPU, RAM, disk, installed
software, open monitors, "what is on this box" start at `query_device_health` (tool). Collector feeds
(`sparklogs.agent.vector` (value), `sparklogs.agent.log` (value)) are not that answer.

**Full investigation** (`sparklogs-investigate`): for a log or ticket walk, device health is usually
**supporting honesty**: was the agent observing during the window? Do not open that walk with a
device-health sweep unless the ticket is about the box itself (disk filling, installed software, a
standing monitor).

Other ticket shapes (backup failed, who changed what) still run through scope, aggregation, and
events. Ask device health before writing "nothing was found" or "the problem started at".

## `query_device_health` (tool)

Returns the latest curated state per device: monitor rows for conditions, inventory rows for what is
on the box.

**`fieldset` (arg)** picks the projection.

- `rca` (value) (default): the full read. Identity, `kind` (col), `class` (col), `reason` (col), `instance` (col), the episode
  family, epoch, severity and timing, `message` (col), and the honesty fields. Use this when you are
  reasoning about one device or a handful.
- `fleet` (value): lean, monitor- and change-oriented. Use it when the question is "how many, and which".
- `minimal` (value): identity plus `kind` (col), `reason` (col), `instance` (col), severity and `message` (col).

Naming an explicit field ADDS it; it does not replace the fieldset.

**`kinds` (arg)** filters `kind` (col). The default is `inventory` (value) and `monitor` (value). Inventory is ON by default and
should stay on for RCA: inventory rows normally carry no class at all, and they are the ground truth
of what is installed, mounted and running. `agent_op` (value) and `delta` (value) are opt-in.

**A kind outside the known vocabulary survives the filter by design.** If a newer agent emits a kind
this surface does not know, an explicit `kinds` (arg) list does not silence it: the alternative is dropping
rows nobody has decided about yet, which loses evidence exactly when something new is happening. So a
`kinds` (arg) filter is a narrowing, not a guarantee, and a row with an unfamiliar `kind` (col) is a real row.

**`reasons` (arg)** filters to named conditions. **`group_by_reason` (arg)** returns the fleet shape of a reason
("17 hosts have this") instead of a row per device: one aggregate row per (kind, reason) carrying
`affected_agents` (col), `episode_count` (col), `event_count` (col), `max_severity` (col) and one count per failure-side
severity band, computed over every matching row rather than over the capped listing.

**Silent devices** come back as a separate envelope row, `row_kind=silent_device`. That list is
CAPPED so a fleet-wide outage cannot push condition rows out of the response, and it can truncate.
The count in `summary.scope` (col) is the EXACT total, counted before the cap, so read the count rather
than tallying rows. If the silent list looks suspiciously round, it was truncated.

That accounting is trustworthy. What the silence MEANS is a separate question, and a narrower one:
see "What silence does and does not tell you" below before any conclusion rests on it.

`row_kind` (col) is an envelope discriminator for that one case only. Every data row says what it is with
`kind` (col), not with `row_kind` (col).

## Column names

Device-health rows use these names, and they are the names of the stored columns, so they are the
grouping and filtering surface WHERE A TOOL EXPOSES ONE (`kinds` (arg), `reasons` (arg), `group_by_reason` (arg)).

**They are not LQL field names.** A column like `episode_replaced_id` (col) is derived from the wire path
`sparklogs.episode.replaced_id` (LQL), and an LQL filter on `query_logs` (tool) must use the dotted path. Reading
a name out of a device-health response and pasting it into `lql` (arg) returns nothing. Same concepts,
two surfaces.

| Column | Carries |
|---|---|
| `kind` (col) | `inventory` (value) / `monitor` (value) / `delta` (value) / `agent_op` (value) / `config_change` (value) / `malformed` (value) |
| `malformed_event` (col) | true when the row did not parse cleanly. **Read it beside `kind` (col), never instead of it:** a row can keep a valid `kind` (col) and still carry `malformed_event=true`, so filtering on `kind=malformed` alone misses those. Any row with either set is a row whose other fields you should not trust without looking |
| `topic` (col) | the fine discriminator inside a kind (`disk_volumes` (value), …) |
| `class` (col) | temporal shape (see `category-classes.md`) |
| `reason` (col) | the stable identity of the condition |
| `instance` (col) | the subject when the detector is multi-instance; null means host-scoped |
| `display_name` (col) | a friendlier name when it differs from `instance` (col); read `coalesce(display_name, instance)` |
| `open_monitors_count` (col) | how many monitors are open. Not a problem count |
| `window_partial` (col) | the measurement window was only partly observed. A ROW-level flag, deliberately NOT under the `episode_` (other) prefix like the honesty fields around it: it describes this row's own measurement window, not the episode's whole span. There is no episode_window_partial |
| `episode_id` (col) | identity of one continuous occurrence, never recycled |
| `episode_replaced_id` (col) | the episode this one SUPERSEDES, when an episode was replaced |
| `episode_occurrence` (col) | which occurrence of this reason on this subject |
| `episode_event_seq` (col) | monotonic per-episode counter; order on this, not on the timestamp |
| `episode_phase` (col) | `onset` (value) / `held` (value) / `recovering` (value) / `recovered` (value) / `ended` (value) |
| `episode_transition` (col) | what just moved: `opened` (value), `recovering` (value), `relapsed` (value), `closed` (value), `ended` (value), `severity_raised` (value), `severity_lowered` (value) |
| `episode_first_observed_ts` (col) / `episode_last_confirmed_ts` (col) / `episode_cleared_ts` (col) | the span |
| `episode_age_basis` (col) / `episode_clear_time_basis` (col) | how far the span can be trusted (below) |
| `episode_max_observation_gap_s` (col) / `episode_post_gap_s` (col) | blind spots inside the span |
| `episode_recovery_attempts` (col) / `episode_recovering_total_s` (col) | how unstable the episode has been |
| `episode_end_reason` (col) | why it terminated |
| `epoch_id` (col) / `epoch_prev_id` (col) / `epoch_seq` (col) | the era a row belongs to; order inventory on `epoch_seq` (col) |
| `inventory_part_number` (col) / `inventory_total_parts` (col) / `inventory_row_count` (col) | a split inventory |
| `config_change_type` (col) / `config_change_action` (col) / `config_change_target` (col) | what changed; null on pure state monitors |
| `actor_id` (col) / `actor_name` (col) / `actor_type` (col), `target_id` (col) / `target_name` (col) / `target_type` (col) | who did it and to what |

The envelope adds a few computed fields that are not store columns: `name` (col), `as_of` (col), `as_of_age_s` (col),
and severity as a `severity` (col) name plus a `severity_level` (col) integer.

## The honesty fields, and what they forbid

These exist because a confident timeline built on an unobserved stretch is worse than no timeline.

**The `_gap_s` columns are observation blind spots, not missed events.** They say the agent was not
looking at this condition for a stretch inside an episode. Missed events are a different thing: a
feed reporting a skip window over events the collection engine could not provide. Do not describe
either one as the other, and do not carry the word "gap" out of these column names into report
prose.

**`episode_age_basis` (col) has three values, and two of them are not onsets.**

| Value | What you may say |
|---|---|
| `onset` (value) | the start was watched. The duration is real: "for 3 days" |
| `observed` (value) | it was already true when we first looked. A LOWER BOUND: "for at least 3 days" |
| `unknown_ongoing` (value) | ongoing with no witnessed start (a standing config, something true since boot). **Never render this as a duration at all** |

**`episode_clear_time_basis` (col)**: `observed` (value) means the clear was watched and the timestamp is real.
`unobserved_gap` (value) means the timestamp was CLAMPED backwards to the last confirmation before a blind
spot. Never date a cause to a clamped clear. Say "cleared at or before <ts>, exact time unknown".

**`episode_max_observation_gap_s` (col)** is the longest stretch the agent was blind during the episode. An
ABSENT value is not a claim that there was no gap.

**`window_partial` (col)** means the window was only partly observed. Do not change a conclusion on a
partial window. It is the one honesty field with no `episode_` (other) prefix, because it describes one row's
measurement window rather than the episode's crossing lifecycle: do not look for
episode_window_partial, and do not read a partial row as a partially observed episode.

**`episode_post_gap_s` (col)** on the first reading after an outage says this reading resumed after a blind
spot. A post-gap sample is trusted to say a condition is no longer holding, never to say WHEN it
stopped.

## Episodes, recurrence, and burst reading

An episode is one continuous occurrence of one condition on one subject. A reason can have many
episodes over time, and that is what recurrence means.

- **A burst of RECOVERED is not an incident.** A flapping condition emits an onset and a closure each
  cycle. Group by `reason` (col) and read `episode_recovery_attempts` (col); an episode oscillating without
  closing is chronically unstable, which is a different and often worse condition than steadily bad.
- **`episode_replaced_id` (col)** means this episode superseded another. Follow it before concluding a
  condition is new.
- **Correlation is your job.** Nothing joins a monitor row to the raw events that explain it. Take
  the reason, the instance and the span, then query the events yourself.

## What silence does and does not tell you

Two different claims hide behind the word silence, and only one of them is available today.

**Device-level silence is real and usable.** A device appearing in the `row_kind=silent_device` list
reported no state rows in the window. That is an exact, counted fact about the fleet, disclosed with
its own cap, and you may report it: "this device reported nothing in the window." It is a genuine
finding, and it is often the finding that matters.

**Topic-level silence is not yet interpretable.** Reading the absence of a particular topic's rows as
meaning something about that topic, on a device that is otherwise reporting, is not supported yet: no
snapshot topic has reached the rollout ring where its absence would be evidence. Until it does, an
absent topic tells you nothing about the topic.

What neither one licenses is a CAUSE. A device returning no state rows may mean the agent is not
reporting, or may mean the topic is not enabled for that agent's rollout ring, or may mean the
collector never started. Those are indistinguishable from here today.

Report silence as "no state data in this window, cause not established", never as "the device is
healthy" and never as "the agent is down". If silence matters to the conclusion, say so in what was
not checked.

**None of this is a completeness answer.** Device state says what conditions a device reported. How
far its data is complete is `agent_complete_through` (col) on the `resolve_scope` (tool) agent row, with the
advisories beside it: the floor across the device's active data feeds, from the feeds' own reports.
Row counts, first and last timestamps, and the silent-device list never establish interior coverage,
and a device absent from every list is `unknown` (value) rather than healthy.

## Portable field families on events

Curated events carry cross-source identity families, so a query written against one source transfers
to another. These live on the events, not on device-health rows.

| Family | Means |
|---|---|
| `sparklogs.actor.*` | the INITIATOR. Who wanted the thing done |
| `sparklogs.running_as.*` | the execution context: the account the performing process runs as. Populated only when it differs from the actor, so its presence is itself the signal |
| `sparklogs.target.*` | the principal the action was done TO. A group acted upon is this family with `kind=group` |
| `sparklogs.member.*` | the principal whose membership in the target changed |
| `sparklogs.process.*` | the process the event is about |
| `sparklogs.origin.*` | the initiating network endpoint, populated only when it names a machine other than the reporting host |
| `sparklogs.destination.*` | the receiving network endpoint, same gating |
| `sparklogs.error.*` | the failure code the source reported, plus its number space |

**Actor semantics changed at pack 1.2.1.** On a failed sign-in the account that tried is the actor;
on a lockout the locked account is the target. Do not carry an older mental model, and do not trust a
saved query written before that release without re-reading which family it names.

**Pattern identities reset at the same boundary.** Every pattern hash was recomputed, so a
`pattern_hash` (col) captured before that deploy will not match the same event shape after it. A
baseline-versus-incident comparison that straddles the boundary compares nothing. Re-derive the
baseline inside the window you are actually reasoning about.

Per-source field detail is generated: see `generated-reference-router.md`.
How to explore this feed vs Windows Event Log (WEL): `guides/stream-kinds/device-state.md`.
