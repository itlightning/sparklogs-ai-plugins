# Device state: fields, honesty, and where it fits an MSP investigation

## Where this fits

Your primary questions are a client's issue and a client's fleet: "this ticket says backups fail on
this machine", "which endpoints across this client are showing this", "did anything change here
before it broke". Those run through scope resolution, grouped aggregation, and a drill into raw
events.

Device and agent health is a SUPPORTING check, not the headline. Its job is one question, asked at
the point where you are about to conclude something from an absence:

> Was the agent observing this device during the window I am reasoning about?

Ask it before writing "nothing was found" or "the problem started at". Do not open an investigation
with a device-health sweep, and do not report device health as the finding unless the ticket was
about the agent.

## `list_device_health`

Returns the latest curated state per device: monitor rows for conditions, inventory rows for what is
on the box.

**`fieldset`** picks the projection.

- `rca` (default): the full read. Identity, `kind`, `class`, `reason`, `instance`, the episode
  family, epoch, severity and timing, `message`, and the honesty fields. Use this when you are
  reasoning about one device or a handful.
- `fleet`: lean, monitor- and change-oriented. Use it when the question is "how many, and which".
- `minimal`: identity plus `kind`, `reason`, `instance`, severity and `message`.

Naming an explicit field ADDS it; it does not replace the fieldset.

**`kinds`** filters `kind`. The default is `inventory` and `monitor`. Inventory is ON by default and
should stay on for RCA: inventory rows are normally `class=CONTEXT`, and they are the ground truth of
what is installed, mounted and running. `agent_op` and `delta` are opt-in.

**`reasons`** filters to named conditions. **`group_by_reason`** returns the fleet shape of a reason
("17 hosts have this") instead of a row per device.

**Silent devices** come back as a separate envelope row, `row_kind=silent_device`. That list is
CAPPED so a fleet-wide outage cannot push condition rows out of the response, and it can truncate
while the response summary's scope stays honest. If the silent list looks suspiciously round, it was
truncated.

`row_kind` is an envelope discriminator for that one case only. Every data row says what it is with
`kind`, not with `row_kind`.

## Column names

Device-health rows use these names, and they are the names of the stored columns, so they are the
grouping and filtering surface WHERE A TOOL EXPOSES ONE (`kinds`, `reasons`, `group_by_reason`).

**They are not LQL field names.** A column like `episode_replaced_id` is derived from the wire path
`sparklogs.episode.replaced_id`, and an LQL filter on `query_logs` must use the dotted path. Reading
a name out of a device-health response and pasting it into `lql` returns nothing. Same concepts,
two surfaces.

| Column | Carries |
|---|---|
| `kind` | `inventory` / `monitor` / `delta` / `agent_op` / `config_change` / `malformed` |
| `malformed_event` | true when the row did not parse cleanly. **Read it beside `kind`, never instead of it:** a row can keep a valid `kind` and still carry `malformed_event=true`, so filtering on `kind=malformed` alone misses those. Any row with either set is a row whose other fields you should not trust without looking |
| `topic` | the fine discriminator inside a kind (`disk_volumes`, …) |
| `class` | temporal shape (see `category-classes.md`) |
| `reason` | the stable identity of the condition |
| `instance` | the subject when the detector is multi-instance; null means host-scoped |
| `display_name` | a friendlier name when it differs from `instance`; read `coalesce(display_name, instance)` |
| `open_monitors_count` | how many monitors are open. Not a problem count |
| `window_partial` | the measurement window was only partly observed |
| `episode_id` | identity of one continuous occurrence, never recycled |
| `episode_replaced_id` | the episode this one SUPERSEDES, when an episode was replaced |
| `episode_occurrence` | which occurrence of this reason on this subject |
| `episode_event_seq` | monotonic per-episode counter; order on this, not on the timestamp |
| `episode_phase` | `onset` / `held` / `recovering` / `recovered` / `ended` |
| `episode_transition` | what just moved: `opened`, `recovering`, `relapsed`, `closed`, `ended`, `severity_raised`, `severity_lowered` |
| `episode_first_observed_ts` / `episode_last_confirmed_ts` / `episode_cleared_ts` | the span |
| `episode_age_basis` / `episode_clear_time_basis` | how far the span can be trusted (below) |
| `episode_max_observation_gap_s` / `episode_post_gap_s` | blind spots inside the span |
| `episode_recovery_attempts` / `episode_recovering_total_s` | how unstable the episode has been |
| `episode_end_reason` | why it terminated |
| `epoch_id` / `epoch_prev_id` / `epoch_seq` | the era a row belongs to; order inventory on `epoch_seq` |
| `inventory_part_number` / `inventory_total_parts` / `inventory_row_count` | a split inventory |
| `config_change_type` / `config_change_action` / `config_change_target` | what changed; null on pure state monitors |
| `actor_id` / `actor_name` / `actor_type`, `target_id` / `target_name` / `target_type` | who did it and to what |

The envelope adds a few computed fields that are not store columns: `name`, `as_of`, `as_of_age_s`,
and severity as a `severity` name plus a `severity_level` integer.

## The honesty fields, and what they forbid

These exist because a confident timeline built on an unobserved gap is worse than no timeline.

**`episode_age_basis` has three values, and two of them are not onsets.**

| Value | What you may say |
|---|---|
| `onset` | the start was watched. The duration is real: "for 3 days" |
| `observed` | it was already true when we first looked. A LOWER BOUND: "for at least 3 days" |
| `unknown_ongoing` | ongoing with no witnessed start (a standing config, something true since boot). **Never render this as a duration at all** |

**`episode_clear_time_basis`**: `observed` means the clear was watched and the timestamp is real.
`unobserved_gap` means the timestamp was CLAMPED backwards to the last confirmation before a blind
spot. Never date a cause to a clamped clear. Say "cleared at or before <ts>, exact time unknown".

**`episode_max_observation_gap_s`** is the longest stretch the agent was blind during the episode. An
ABSENT value is not a claim that there was no gap.

**`window_partial`** means the window was only partly observed. Do not change a verdict on a partial
window.

**`episode_post_gap_s`** on the first reading after an outage says this reading resumed after a blind
spot. A post-gap sample is trusted to say a condition is no longer holding, never to say WHEN it
stopped.

## Episodes, recurrence, and burst reading

An episode is one continuous occurrence of one condition on one subject. A reason can have many
episodes over time, and that is what recurrence means.

- **A burst of RECOVERED is not an incident.** A flapping condition emits an onset and a closure each
  cycle. Group by `reason` and read `episode_recovery_attempts`; an episode oscillating without
  closing is chronically unstable, which is a different and often worse condition than steadily bad.
- **`episode_replaced_id`** means this episode superseded another. Follow it before concluding a
  condition is new.
- **Correlation is your job.** Nothing joins a monitor row to the raw events that explain it. Take
  the reason, the instance and the span, then query the events yourself.

## Silence is not yet a trustworthy signal

A device returning no state rows may mean the agent is not reporting, or may mean the topic is not
enabled for that agent's rollout ring, or may mean the collector never started. Those are
indistinguishable from here today.

Report silence as "no state data in this window, cause not established", never as "the device is
healthy" and never as "the agent is down". If silence matters to the conclusion, say so in what was
not checked.

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
`pattern_hash` captured before that deploy will not match the same event shape after it. A
baseline-versus-incident comparison that straddles the boundary compares nothing. Re-derive the
baseline inside the window you are actually reasoning about.

Per-source field detail is generated: see `generated-reference-router.md`.
