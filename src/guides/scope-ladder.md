# Scope ladder: the fields to group by

Every investigation narrows by grouping before it reads messages.
This guide is the one home for the fields worth grouping by, in the order that localizes a problem fastest.
It extends the server instructions' SCOPE LADDER; where they differ, the server wins.

There are three sets:

- **Event shape** (the server's ladder): `service` (LQL) -> `app` (LQL) -> `subsource` (LQL) -> `category` (LQL) -> `pattern` (LQL), with `source` (LQL) beside it as the host.
- **Curated identity**: `sparklogs.reason` (LQL), then `sparklogs.reason_variant` (LQL), `sparklogs.class` (LQL), `sparklogs.kind` (LQL) and `sparklogs.instance` (LQL).
- **Device state**: `sparklogs.topic` (LQL) and the conditions `query_device_health` (tool) reports.

---

## Always present: start here

| Field | What it is | Present |
|---|---|---|
| `source` (LQL) | The host the event is about | Every event |
| `subsource` (LQL) | On agent data, the feed id (`win.eventlog.system` (value), `sparklogs.device.state` (value)): the join key to feed health | Every agent event. On ingest-key data, freeform and sometimes empty |
| `pattern_hash` (LQL) | Stable id of the normalized event shape | Every event |

On agent data, `source` (LQL) and `subsource` (LQL) are always stamped, so `group_by=["subsource"]` on one host is a reliable first cut: it says which feeds are talking.
When the ticket already names the feed, start there and climb the rest of the ladder inside it.

---

## Event shape: coarse to fine

```
service -> app -> subsource -> category -> pattern (finest: pattern_hash)
```

| Rung | What it is | Present |
|---|---|---|
| `service` (LQL) | Ticket class the event is evidence for (`backup` (value), `patching` (value)): `guides/service-taxonomy.md` | Most agent events carry it; ingest-key data may not |
| `app` (LQL) | Product that owns the stream: `guides/app-vocabulary.md` | Often empty, on purpose, on OS channels |
| `subsource` (LQL) | Feed id (above) | Always on agent data |
| `category` (LQL) | Projection of topic, reason and class (`disk_volumes.volume_fill_rate_high.ELEVATED`): `guides/category-classes.md` | Often empty. Never parse it: read the fields it was built from |
| `pattern` (LQL) / `pattern_hash` (LQL) | Normalized event shape | Always |

`source` (LQL) sits beside the ladder: use it for fleet pivots ("which hosts"), and climb the ladder to localize within a host.
Each rung but `pattern_hash` (LQL) can be empty. An empty group means the field is not set on those events: fall back to the next rung or to `pattern_hash` (LQL), and do not report it as a finding.

---

## Curated identity

Events a source pack curated carry the names below. Uncurated events have none of them: empty `sparklogs.*` fields mean uncurated, never healthy or unhealthy.

| Field | What it is |
|---|---|
| `sparklogs.reason` (LQL) | The curated name of what happened (`vss_writer_failed` (value), `os_volume_space_low` (value)). Meaning: `feeds/<id>/reasons.md` |
| `sparklogs.reason_variant` (LQL) | Which form of that reason this row is (for example `outbound` (other) or `sspi_probe` (other)), when the reason has more than one |
| `sparklogs.class` (LQL) | Temporal shape: `NOTABLE` (value), `ELEVATED` (value), `RECOVERED` (value), `ENDED` (value), `BENIGN` (value): `guides/category-classes.md` |
| `sparklogs.kind` (LQL) | Row morphology (`inventory` (value), `monitor` (value), `occurrence` (value) and the rest): most Windows Event Log reasons carry none; the list and where it is set: `guides/category-classes.md` (Kind) |
| `sparklogs.instance` (LQL) | The subject: which volume, writer, service or adapter. Show `sparklogs.display_name` (LQL) when present |

Rules that change counts:

- **Reason before subsource when counting incidents.** One reason can arrive on several feeds (`vss_writer_failed` (value) on Application and device state, `disk_failure_predicted` (value) on System and `win.eventlog.storage` (value)): that is one fact with several witnesses. Group `sparklogs.reason` (LQL) first.
- **Variant before messages.** Group `["sparklogs.reason", "sparklogs.reason_variant"]` before reading any message: variants of one reason often differ in severity and meaning.
- **Instance before hosts.** Two volumes on one host share a reason; `sparklogs.instance` (LQL) tells them apart.
- **Recovery.** The recovery of a fault is the same `sparklogs.reason` (LQL) with `sparklogs.class = RECOVERED` (LQL). Group by reason to collapse onset, hold and recovery into one finding.
- **Reasons have a start date.** A reason added in a newer source pack is absent from events logged before the device ran that pack; those events carry the raw text only. Before reading the absence of a reason as an answer, check `feed_pack_version` (col) on the `resolve_scope` (tool) agent row and compare the event dates with that pack's release.
- **Reason inventory of a scope.** `query_scope_activity` (tool) with `group_by` (arg) `["sparklogs.reason"]` lists every reason in scope with its failure-side severity counts in one call. The empty-reason row is the uncurated traffic.

---

## Device state: topics and conditions

`sparklogs.topic` (LQL) names the subject family on device-state rows (`disk_volumes` (value), `services` (value), `vss_writers` (value)).
Conditions (open problems on a device) are read with `query_device_health` (tool), not by grouping events.
Which call answers which question, including the fleet views: `guides/device-state-fields.md` (**Choose the view**).

---

## Ingest-key data

Data sent with an ingest key carries `source` (LQL), `pattern_hash` (LQL) and whatever fields the sender set.
`subsource` (LQL) is freeform, so a count of distinct subsources is not a feed count.
There is no feed health and no `agent_complete_through` (col), and curated `sparklogs.*` fields are usually absent.
Climb the event-shape ladder; skip the curated and device-state sets.

Third-party logs as evidence (a firewall, identity provider or EDR console sending syslog or an export):

1. `list_sources` (tool) over the window: rows with `sent_via` (col) `ingest_key` (value) are the key-sent senders; `source` (LQL) on those rows is whatever the sender named.
2. Scope by `agent_id` (LQL) (the key) and `source` (LQL), then group by `pattern_hash` (LQL) and read the top patterns with `describe_pattern` (tool).
3. Severity is the sender's own level, mapped onto the SparkLogs scale: weigh it as the sender's opinion.
4. No sender for the system in scope means it was not checked: say so in WHAT WAS NOT CHECKED.

---

## Treat every `_hash` as opaque

Never parse a `_hash`, never infer meaning from its characters, never length-validate it.
`pattern_hash` (LQL) may carry a short readable prefix followed by an opaque tail; `source_hash` (LQL), `subsource_hash` (LQL), `category_hash` (LQL), `service_hash` (LQL), and `app_hash` (LQL) are bare opaque tokens.
All six are drill-down handles only: values to pass back into a filter, not strings to interpret.

---

## Discover structure vs measure within a filter

See `mcp-tool-decision-tree.md` (Investigation discipline) for why order matters.

**`query_scope_activity` (tool)** (**bounded discovery**, not LQL-filtered):
- Capped, pre-aggregated structure for app / service / subsource, or reasons, in org scope and time window.
- Per-row triage: `event_count` (col), `cnt_interesting` (col), one count per failure-side severity band (`cnt_warning` (col) through `cnt_critical_plus` (col); the bands are defined in `category-classes.md`), `distinct_interesting` (col), `first_event_at` (col), `last_event_at` (col).
- Narrow with `agent_ids` (arg) (collector UUIDs), `source` (arg) substring, or `field_match` (arg), which matches the source, app, service and subsource values (not field names).
- Summary may include `top_interesting_patterns` (col) teaser; call **`describe_pattern` (tool)** before citing any teaser pattern.

**`query_event_counts_by_severity` (tool)** (**LQL-filtered measure**):
- Counts events matching an **`lql` (arg)** filter, by severity, optionally over the `group_by` (arg) fields and/or `bucket` (arg) time buckets.
- Use when you already have a hypothesis slice (severity, time sub-range, `pattern_hash` (LQL), `agent_id` (LQL), etc.) and need counts, ranking or a time series within that slice.

Rule of thumb: `query_scope_activity` (tool) = "what app/service/subsource combinations, or reasons, exist here?"; `query_event_counts_by_severity` (tool) = "within this filtered population, which values dominate, how bad are they, and when?"

---

## How to use the ladder for RCA

**DISCOVER - enumerate structure before heavy scans.** Call `query_scope_activity` (tool) with org scope, the investigation window, optional `agent_ids` (arg), and the session `external_investigation_id` (arg).

**GROUP - find dominant or anomalous groups (filtered measure).** Call `query_event_counts_by_severity` (tool) with `group_by` (arg) on a ladder field or its `_hash` companion and an `lql` (arg) slice as needed.
Group by `sparklogs.reason` (LQL) for curated signal, `pattern_hash` (LQL) for the most-repeated normalized events, `service` (LQL) or `subsource` (LQL) to localize the noisy component.

**DEDUP / STABILITY - track one pattern over time.**
A `_hash` is a stable identity: the same hash means the same normalized value or pattern, across events and across time.

**DRILL - read the events behind a hash.** Narrow with `query_logs` (tool) or `refine_query_result` (tool) using `pattern_hash` (LQL) in `lql` (arg) or `filter_lql` (arg).

**DESCRIBE - read pattern text and exemplars before citing.** Call `describe_pattern` (tool) with the hash list, window, and session id before the pattern appears in a Finding. Required after any `top_interesting_patterns` (col) teaser row.

**CORRELATE ACROSS WINDOWS - first-occurrence detection.**
A `pattern_hash` (LQL) or `sparklogs.reason` (LQL) present in the incident window but absent from a healthy baseline window signals new behavior. Run `query_event_counts_by_severity` (tool) twice, once per window, and compare the two grouped results.

**RESOLVE - read the value; show the hash when it is a pivot.**
The response carries a hash-dictionary `lookups` (col) table mapping frequent hashes to their values.
When a row's inline value is blank, resolve it from `lookups` (col) before you speak.
Lead with the resolved text (and `describe_pattern` (tool) for a `pattern_hash` (LQL)).
Show the raw `*_hash` when it helps the engineer pivot (paste into LQL, compare windows, hand off a filter).
Do not dump hashes with no text, and do not parse or pretty-print the token.
Always use the hash verbatim as the drill-down filter value.

---

## Worked shape: localize then land

1. `query_scope_activity` (tool) or `query_event_counts_by_severity(group_by=["subsource"], lql='source = "<host>" AND severity >= warning', ...)`: which feeds carry the failure side.
2. `query_event_counts_by_severity(group_by=["sparklogs.reason", "sparklogs.reason_variant"], lql='source = "<host>" AND subsource = "<feed>" AND severity >= warning', ...)`: which curated reasons dominate. The empty-reason group is uncurated: group it by `pattern_hash` (LQL).
3. Compare against a healthy baseline window: is the top reason or pattern new, or normal volume?
4. `describe_pattern(pattern_hashes=["<h>"])` on the surviving hash, then `query_logs(lql='pattern_hash = "<h>"', ...)` for event-level evidence.

Skip rungs when the symptom already points at a specific field.
