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

Three readings of the same tool.
Parameter names, defaults, fieldsets, and kinds live in the live tool description; follow that, not this file.

**Omit `view` (arg) (the default).**
One row per episode or occurrence: that row is the latest event in the window.
`min_severity` (arg) `warning` (value) means the latest event is still warning or worse.

**`view` (arg) `latest_state` (value).**
Newest event of each subject at or before `end` (arg).
`min_severity` (arg) applies to that newest event.

**`view` (arg) `timeline` (value).**
Series and RCA reading: every matching row, oldest first.
`min_severity` (arg) includes every in-window event of episodes whose peak in the window meets the floor.
Rows with no `sparklogs.episode.id` (col) still filter per event.

**Which reading to use:**

| Question | How |
|---|---|
| Latest event of each episode (warning+ means that latest event is still warning+) | omit `view` (arg), `min_severity` (arg) `warning` (value) |
| What is on the box / how it last read | `view` (arg) `latest_state` (value). Newest event of each subject, not of each episode |
| Series of those episodes | `view` (arg) `timeline` (value), same `min_severity` (arg). Fieldset `fleet` (value) when duration / `sparklogs.episode.cleared_ts` (col) / `sparklogs.class` (col) matter |
| Repeating change points | `view` (arg) `timeline` (value) plus opt-in kinds (`config_change` (value), and `delta` (value) when those are the points). Per-event floor. Omit `view` (arg) is one row per occurrence at its latest event; five change points are five timeline events. `sparklogs.episode.occurrence` (col) is a recurrence counter on one episode, not those points |

**Fieldset choice is a judgment call, not just a size choice.** Use `rca` (value) when reasoning about one
device or a handful, `fleet` (value) when the question is how many and which, `minimal` (value) for a flat listing
you will re-filter yourself.

**A kind outside the known vocabulary survives the filter by design.** If a newer agent emits a kind
this tool does not know, an explicit `kinds` (arg) list does not silence it: the alternative is dropping
rows nobody has decided about yet, which loses evidence exactly when something new is happening. So a
`kinds` (arg) filter is a narrowing, not a guarantee, and a row with an unfamiliar `sparklogs.kind` (col) is a real row.

**Silent-device accounting is trustworthy; what the silence MEANS is a separate, narrower question.**
See "What silence does and does not tell you" below before any conclusion rests on it.

## Reading device-health rows

For exact field types, units, and meanings, start with `fields/INDEX.md` and open the one family or
topic table it points to.

A few rows read wrong if you go by the column name alone:

- **`sparklogs.malformed_event` (col) is independent of `sparklogs.kind` (col).** A row can keep a valid `sparklogs.kind` (col) and still carry
  `sparklogs.malformed_event=true`, so filtering on `sparklogs.kind=malformed` alone misses those. Read them together;
  either one set means don't trust the row's other fields without looking.
- **`sparklogs.display_name` (col)** is a friendlier name when it differs from `sparklogs.instance` (col). Read `coalesce(sparklogs.display_name, sparklogs.instance)`,
  not `sparklogs.instance` (col) alone.
- **`sparklogs.open_monitors_count` (col)** is how many monitors are open, not a problem count.
- **Device-health column names ARE the LQL paths.** `sparklogs.episode.replaced_id` (col) on a device-health row
  and `sparklogs.episode.replaced_id` (LQL) on a `query_logs` (tool) filter are the same name; paste either into the other.

## The honesty fields, and what they forbid

These exist because a confident timeline built on an unobserved stretch is worse than no timeline.

**The `_gap_s` columns are observation blind spots, not missed events.** They say the agent was not
looking at this condition for a stretch inside an episode. Missed events are a different thing: a
feed reporting a skip window over events the collection engine could not provide. Do not describe
either one as the other, and do not carry the word "gap" out of these column names into report
prose.

**`sparklogs.episode.age_basis` (col) has three values, and two of them are not onsets.**

| Value | What you may say |
|---|---|
| `onset` (value) | the start was watched. The duration is real: "for 3 days" |
| `observed` (value) | it was already true when we first looked. A LOWER BOUND: "for at least 3 days" |
| `unknown_ongoing` (value) | ongoing with no witnessed start (a standing config, something true since boot). **Never render this as a duration at all** |

**`sparklogs.episode.clear_time_basis` (col)**: `observed` (value) means the clear was watched and the timestamp is real.
`unobserved_gap` (value) means the timestamp was CLAMPED backwards to the last confirmation before a blind
spot. Never date a cause to a clamped clear. Say "cleared at or before <ts>, exact time unknown".

**`sparklogs.episode.max_observation_gap_s` (col)** is the longest stretch the agent was blind during the episode. An
ABSENT value is not a claim that there was no gap.

**`sparklogs.window_partial` (col)** means the window was only partly observed. Do not change a conclusion on a
partial window. It is the one honesty field with no episode family prefix, because it describes one row's
measurement window rather than the episode's crossing lifecycle: do not look for it nested under episode,
and do not read a partial row as a partially observed episode.

**`sparklogs.episode.post_gap_s` (col)** on the first reading after an outage says this reading resumed after a blind
spot. A post-gap sample is trusted to say a condition is no longer holding, never to say WHEN it
stopped.

## Episodes, recurrence, and burst reading

An episode is one continuous occurrence of one condition on one subject. A reason can have many
episodes over time, and that is what recurrence means.

- **A burst of RECOVERED is not an incident.** A flapping condition emits an onset and a closure each
  cycle. Group by `sparklogs.reason` (col) and read `sparklogs.episode.recovery_attempts` (col); an episode oscillating without
  closing is chronically unstable, which is a different and often worse condition than steadily bad.
- **`sparklogs.episode.replaced_id` (col)** means this episode superseded another. Follow it before concluding a
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

Open `fields/INDEX.md` first, then the one `fields/family-*.md` table for the family in the query.
Those generated tables define the actor, execution principal, target, member, process, network
endpoint, configuration change, and result families without duplicating their field lists here.

**Actor semantics changed at pack 1.2.1.** On a failed sign-in the account that tried is the actor;
on a lockout the locked account is the target. Do not carry an older mental model, and do not trust a
saved query written before that release without re-reading which family it names.

**Pattern identities reset at the same boundary.** Every pattern hash was recomputed, so a
`pattern_hash` (col) captured before that deploy will not match the same event shape after it. A
baseline-versus-incident comparison that straddles the boundary compares nothing. Re-derive the
baseline inside the window you are actually reasoning about.

Per-source field detail is generated: see `generated-reference-router.md`.
How to explore this feed vs Windows Event Log (WEL): `guides/stream-kinds/device-state.md`.
