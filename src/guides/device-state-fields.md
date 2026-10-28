# Device state: inventories, trends and observation limits

Start device CPU, RAM, disk, network, software and condition questions with `query_device_health` (tool).
For one device or a few, start with a device view (next section) and drill down from what it points at.
For a ticket about another system or application, use device health where it helps interpret the evidence.
Agent-debug feeds describe collection problems, not the device's workload health.

## Choose the view

| Question | View |
|---|---|
| What happened on this device (or these few) over a window: CPU, memory, disk, processes, storage, episodes and changes | `device_overview` (value). See **Read a device view** below. |
| Network trouble on this device: link, Wi-Fi, gateway, internet and DNS probes, TCP by route, connections, network events | `device_network` (value). |
| Latest event of each episode or change occurrence in the window | Omit `view` (arg). Latest-event severity determines whether a row meets `min_severity` (arg). |
| Latest reported inventory or subject reading | `latest_state` (value). Selects within the requested window and retains every part of the selected inventory. |
| Process CPU, memory or I/O trends | `top_processes_over_time` (value). Choose `rank_by` (arg), process count, grouping and bucket width. |
| Raw topic samples | `series` (value), with `topics` (arg). Each inventory part is a result row. |
| Available topics and sampled fields | `topics` (value). |
| Episode history or repeating changes | `event_timeline` (value). Includes all in-window events of episodes whose in-window peak meets the severity floor. Events without an episode filter individually. |

For current conditions, use a window of days: an open episode with no event in a narrow window will be absent.
Latest state is an observation, not a live inspection of the endpoint.
Row and trend handles page a stored result when refined; `group_by_reason` (arg) handles read current data.

For condition rows, `fieldset` (arg) `rca` (value) carries investigation detail, `fleet` (value) carries lifecycle and observation limits, and `minimal` (value) is a compact listing.
The live parameter description lists their membership.
Fieldsets do not apply to raw series or process trends.
An unfamiliar kind can pass an explicit `kinds` (arg) filter so newly introduced evidence remains visible.

If a view, fieldset or aggregation needs more explanation, call `server_info` (tool) with `describe_tool: "query_device_health"`.
For field units and meanings, open `fields/INDEX.md`, then the relevant topic or family table.

## Read a device view

`device_overview` (value) and `device_network` (value) answer for the devices named in `agent_ids` (arg): 1 to 25 agent ids (the `id` (col) of the agent rows `resolve_scope` (tool) returned), over a window of at most 30 days and 1 hour.

```json
{
  "view": "device_network",
  "agent_ids": ["<agent id>"],
  "query_scope": {"org_ids": ["<org id>"]},
  "start": "2026-10-20T00:00:00Z",
  "end": "2026-10-27T00:00:00Z",
  "external_investigation_id": "ticket-4781-wifi-drops"
}
```

Two optional parameters.
`bucket` (arg) is one ladder width that fits the window (5m, 10m, 15m, 20m, 30m, 1h, 2h, 3h or 4h); omit it and the view picks one.
`fieldset` (arg) `detail` (value) gives every result set its wider column list.
The views refuse every other filter parameter; filter, order and page their result sets with `refine_query_result` (tool).
For a different bucket width, call the view again; refine does not regroup the stored rows into wider buckets.

Up to 5 devices get a full reading each.
With 6 to 25 devices, each device gets its `device_summary` (value) row and a few notable changes.
Use that light form to choose the devices and intervals worth a full reading, then call again with at most 5.

### The reading, part by part

1. `header` (col): window, `bucket_s` (col), coverage, `measured` (col) and `not_measured` (col).
   Coverage splits the window into observed, asleep, powered-off and unreported seconds.
   Unreported time is unknown, not quiet, and limits every claim about that stretch.
   `not_measured` (col) lists the lanes with no reading in this window, then what the agent does not measure: application response time, per-process disk latency, UDP, and what the far end of a connection saw.
   Carry the entries that matter for the ticket into WHAT WAS NOT CHECKED.
2. `device_network` (value) only: `outages` (col), one row per probe outage (see **Network outages** below).
3. `evidence` (col): witnesses with interval, value, unit and a `filter_lql` (col) over the result set named in `result` (col).
   `support` (col) is the number of rows that filter returns.
   Both views carry `unreported` (value), `asleep` (value), `powered_off` (value), `physical_link_down` (value), `wifi_drops` (value), `ncsi_internet_lost` (value) and `dns_resolution_timeouts` (value).
   `device_overview` (value) adds `probe_down` (value) per probe role.
   `device_network` (value) adds `probe_blips` (value), `network_changed` (value), `occurrences` (value) (device-state networking occurrences, one row per reason) and `tcp_timeout_connections_total` (value) per route class.
   An outage that stopped traffic can leave no heat at all: read evidence even when no heat span exists.
4. `domains` (col): the window in coarse buckets with each domain's reading and band.
   `heat_spans` (col): stretches where a domain's heat was above `ok` (value), found at `bucket_s` (col).
   Bands are `ok` (value), `warm` (value), `hot` (value) and `very_hot` (value).
   Each span carries its peak band and time, the `driver` (col) reading that set the peak and its value, where the peak sat against the device's typical range from before the window (`below` (value), `within` (value), `above` (value)), up to 3 contributors with their share, and the episodes and changes that overlapped it.
   A span says when a measure ran high, not why. Contributors ran at the same time and are not proven causes.
   Disk heat is the busiest disk's busy time, pushed up by its queue depth. Latency is not an input, so slow I/O at moderate busy time can leave no disk span.
   Read `disk_latency_ms` (col) in `domains` (col) and `latency_ms_p90_10s` (col) in the `storage` (value) result set for latency. A span names no disk: `busiest_disk` (col) in the `buckets` (value) result set does.
   An incident shorter than `bucket_s` (col) shows in evidence, outages and events, which keep their own times.
5. `top_processes` (col) (`device_overview` (value)) or `top_connections` (col) (`device_network` (value)): window figures over the observations the agent retained.
   The agent reports its top processes and connections per window, so these figures are lower bounds and a short burst can be missing.
   `window_rank_by` (col) names the rankings a row led. It is empty for a row kept further down a ranking.
   A `top_processes` (col) row combines every instance of one executable. A `top_connections` (col) row is one connection, with its PID.
6. `events` (col): the most relevant episodes and changes, open episodes first.
   An episode appears only when it had an event inside the window. One open since before the start with no event in the window is absent, so use a window of days for what is open now.
   Changes also cover the 48 hours before the window.
   Occurrences are not in this part. They are rows of the `events` (value) result set, which also carries the boot, sleep and shutdown marks. On `device_network` (value) that set holds only networking rows and those marks.
7. `next_reads` (col): calls with their arguments ready to paste beside your `external_investigation_id` (arg).

A list that left rows out counts them in `omitted` (col).
Timestamps are RFC3339 UTC.

### Result sets

The reading itself is not refinable.
`summary.refinable_results` (col) lists the result sets behind it, each with its own `query_id` (col), row and column counts, and a `refine_example` (col).
An entry marked `unavailable` (col) failed to build and is not an empty set; say so instead of reading it as zero rows.
`truncated` (col) appears only when a set was cut, and names which rows are missing.
A result set read after its stored rows expired is rebuilt by re-running the original call on current data. Refine it as usual, but late-arriving data can change its rows.

| View | Result sets |
|---|---|
| `device_overview` (value) | `device_summary` (value), `buckets` (value), `processes` (value), `storage` (value), `events` (value) |
| `device_network` (value) | `device_summary` (value), `network_buckets` (value), `adapters` (value), `connections` (value), `events` (value) |

Every set leads with `agent_id` (col) and `org_id` (col), and bucketed sets with `bucket_start` (col).
Paste a reading's `filter_lql` (col) into `refine_query_result` (tool) with that set's `query_id` (arg).
A ratio or percent column sits beside its numerator and denominator: to combine buckets, sum both and divide.
An average of a ratio column weights a near-idle bucket the same as a busy one.

Upload resend share over a span, from `network_buckets` (value):

```json
{
  "query_id": "<network_buckets query_id>",
  "filter_lql": "agent_id=\"<agent id>\" AND bucket_start>=\"2026-10-22T13:00:00Z\" AND bucket_start<\"2026-10-22T15:00:00Z\"",
  "aggregate": [
    {"fn": "sum", "col": "tcp_internet_bytes_out_retrans", "as": "resent"},
    {"fn": "sum", "col": "tcp_internet_bytes_out", "as": "sent"}
  ],
  "external_investigation_id": "ticket-4781-wifi-drops"
}
```

Then report `resent` (other) over `sent` (other) as the share.

### Network outages

On `device_network` (value), each `outages` (col) row is one probe role (gateway, internet or DNS) failing over an interval.
`state` (col) `confirmed` (value) means the agent counted confirmed down seconds (`down_s` (col), and per bucket in `down_by_bucket` (col)).
`pending` (value) is a run of failed probes that ended with no answer and no confirmed down seconds. A run ends at the window's end, and also at a change of network, sleep, power-off or a link-down. Report failed probes, not an outage.
Failures that a later probe answered before any down time was confirmed are `probe_blips` (value) evidence, not outage rows.
On `device_overview` (value), a probe role listed in `not_measured` (col) had no reading in the window. That path was not measured, which says nothing about whether it was up.
On `device_network` (value), a gateway that ignores ping still lists its attempts, so its role counts as measured. The signs are an outage whose `ownership` (col) reads not placed, and `gateway_probe_attempts` (col) of 0 in `network_buckets` (value).
`ownership` (col) says where an outage sits, from the device's own evidence: its own link, between it and its gateway, beyond the gateway, or at the DNS resolver. It reads not placed when no gateway probe was counted during the outage.
Beyond the gateway covers both the router's internet connection and the ISP. Endpoint data cannot tell those apart, so do not name the ISP as the cause.
`compare_start` (col) and `compare_end` (col) bound a comparison: the matching `next_reads` (col) entry reads every device in the org over those buckets.
The org can span several sites: compare only the devices at the same site. Several devices down together can also mean the probe target itself was down.

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

An `ended` (value) episode closed without a witnessed recovery; `sparklogs.episode.end_reason` (col) says why tracking stopped.
`no_longer_applicable` (value) means the condition stopped applying to its subject, such as a network adapter that disconnected while its condition was open.
Never report an ended episode as fixed; check the subject's later readings.

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

Name a changed item with `sparklogs.config_change.target_name` (col) when present; group and join on `sparklogs.config_change.type` (col) with `sparklogs.config_change.target` (col), since a target is unique only within its type and the name is display only.
On an inventory, `sparklogs.observes_config_changes` (col) false means the agent cannot report observed changes on that topic.
No change rows then says nothing about whether anything changed.

## Network adapters

`sparklogs.data.network_adapters.adapter_class` (col) separates `physical` (value) adapters from virtual switches, other virtual adapters (VPN, TAP, Wi-Fi Direct), tunnels, WAN miniports, loopback and `not_present` (value) ones.
Filter to physical adapters before judging a device's wired or wireless connectivity.
`network_adapter_dhcp_failed` (value) is open while an adapter holds only a self-assigned 169.254 address; it rates higher on a server and when no other default route keeps the device online.
`network_adapter_link_downshifted` (value) is open while a wired link runs at half or less of its seven-day peak speed; cables, ports, docks and power policy are the usual causes.
Both end as `no_longer_applicable` (value) when the adapter disconnects, which is not a recovery.

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
