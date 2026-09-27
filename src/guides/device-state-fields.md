# Device state: inventories, trends and observation limits

Start device CPU, RAM, disk, software and condition questions with `query_device_health` (tool).
For a ticket about another system or application, use device health where it helps interpret the evidence.
Agent-debug feeds describe collection problems, not the device's workload health.

## Choose the view

| Question | View |
|---|---|
| Latest event of each episode or change occurrence in the window | Omit `view` (arg). Latest-event severity determines whether a row meets `min_severity` (arg). |
| Latest reported inventory or subject reading | `latest_state` (value). Selects within the requested window and retains every part of the selected inventory. |
| Process CPU, memory or I/O trends | `top_processes_over_time` (value). Choose `rank_by` (arg), process count, grouping and bucket width. |
| Raw topic samples | `series` (value), with `topics` (arg). Each inventory part is a result row. |
| Available topics and sampled fields | `topics` (value). |
| Episode history or repeating changes | `event_timeline` (value). Includes all in-window events of episodes whose in-window peak meets the severity floor. Events without an episode filter individually. |

For current conditions, use a window of days: an open episode with no event in a narrow window will be absent.
Latest state is an observation, not a live inspection of the endpoint.
Device-health handles re-run against current data when refined.

For condition rows, `fieldset` (arg) `rca` (value) carries investigation detail, `fleet` (value) carries lifecycle and observation limits, and `minimal` (value) is a compact listing.
The live parameter description lists their membership.
Fieldsets do not apply to raw series or process trends.
An unfamiliar kind can pass an explicit `kinds` (arg) filter so newly introduced evidence remains visible.

If a view, fieldset or aggregation needs more explanation, call `server_info` (tool) with `describe_tool: "query_device_health"`.
For field units and meanings, open `fields/INDEX.md`, then the relevant topic or family table.

## Report installed software

1. Request `latest_state` (value) for the installed-products topic and inventory kind, using a window that covers the expected inventory cadence.
2. Refine with item-aligned grouping: device, inventory epoch, observation time, product name, version and publisher.
   Keep version and publisher on the same product item. Independent maxima can combine values from different products.
3. Label results with the inventory observation time.
   Compare report devices with the scoped device list when answering fleet coverage or absence questions.
   Missing inventory means status unknown. Identify stale inventories against the freshness the task requires.

Inventories can span several parent rows.
Those parts share `sparklogs.epoch.id` (col) and `observed_at` (col).
`sparklogs.inventory.part_number` (col) and `sparklogs.inventory.total_parts` (col) identify the parts.
If completeness matters or parts appear missing, inspect that metadata across all returned pages before claiming an item is absent.
Item expansion can hide an empty part, so inspect parent rows for that check.
This is not a required extra call for every report.

`include_changes` (arg) adds a bounded list of later changes, at most 20 per device.
It does not apply those changes to reconstruct a current inventory.
Make absence claims only for devices whose inventories are sufficiently current and complete for the question.

## Interpret event identity and freshness

- `observed_at` (col) is the event observation time.
  `as_of` (col) and `as_of_age_s` (col) describe stream freshness, including events excluded by this call's filters.
- `sparklogs.malformed_event` (col) is independent of `sparklogs.kind` (col).
  Inspect a row marked malformed before relying on its other fields, even if it retains a known kind.
- Use `sparklogs.display_name` (col) when present, otherwise `sparklogs.instance` (col).
- `sparklogs.open_monitors_count` (col) counts open conditions. Severity determines which need attention.
- Device-health dotted column names are also LQL paths when filtering the underlying events.

## Observation limits

Observation gaps mean the agent was not watching a condition for part of an episode.
They differ from feed skip notices, which identify events the collection engine could not provide.
Explain the specific limit in a report.

| `sparklogs.episode.age_basis` (col) | Interpretation |
|---|---|
| `onset` (value) | Start was witnessed. Report the measured duration. |
| `observed` (value) | Already present when first observed. Report a lower bound, such as "at least three days." |
| `unknown_ongoing` (value) | No meaningful onset time. Do not render a duration. |

`sparklogs.episode.clear_time_basis` (col) qualifies the reported clear time.
`observed` (value) means the clear was witnessed.
`unobserved_gap` (value) means the timestamp was clamped to the last confirmation before an observation gap.
The condition may have persisted after that timestamp; do not use it as an exact recovery time or date a cause to it.

`sparklogs.episode.max_observation_gap_s` (col) is the longest observation gap during the episode.
An absent value does not establish zero gaps.
`sparklogs.episode.post_gap_s` (col) marks the first reading after a gap.
That reading can establish the current condition, but cannot establish when it changed during the gap.
`sparklogs.window_partial` (col) marks a partly observed measurement window, not the whole episode's observation history.
Keep conclusions within the observations available.

## Episodes and changes

An episode tracks one condition on one subject.
A reason can have several episodes over time.
`sparklogs.episode.recovery_attempts` (col) counts attempts within an episode, not completed recoveries.
A burst of recovery events alone does not establish a new incident.
Follow `sparklogs.episode.replaced_id` (col) before treating a replacement episode as a new condition.

For repeating configuration changes, use the timeline view and the relevant change kinds.
The episode occurrence counter is not a list of change events.
Correlate a condition with underlying logs using its subject, reason and time window.
A reported change alone does not establish causation.

## Devices without data

Compare returned devices with the scoped device list before describing which devices have no inventory.
Read the response scope and caps before describing the population.
Missing data does not establish that the device is healthy, offline or affected by a particular collector failure.
Topic absence can reflect availability, collection state or the selected window.
Check device and feed status when the distinction matters.

`agent_complete_through` (col) on the `resolve_scope` (tool) agent row bounds the device's reported data completeness.
Read its advisories for the affected feeds.
Event counts and first/last timestamps cannot establish continuous coverage inside the window.
A device missing from a report remains unknown until its scope and data coverage are established.

## Other event families

For actor, execution identity, target, process, network and result fields, use the generated family tables under `fields/INDEX.md`.
These describe what each event reported; do not infer an absent actor from a state monitor.
For exploration and chart recipes, see `guides/stream-kinds/device-state.md`.
