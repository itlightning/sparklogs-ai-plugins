# Scope Ladder - grouping fields and their hash companions

Six fields carry a normalized value plus an opaque `_hash` companion: `pattern` (LQL)/`pattern_hash` (LQL), `source` (LQL)/`source_hash` (LQL), `subsource` (LQL)/`subsource_hash` (LQL), `category` (LQL)/`category_hash` (LQL), `service` (LQL)/`service_hash` (LQL), `app` (LQL)/`app_hash` (LQL).
Together they form a ladder from coarse to fine that localizes a problem to the exact recurring event shape.
This is the primary shallow-triage RCA lever available today: lean on it hard.

---

## Availability

**`pattern_hash` (LQL) is universal.** Computed for every event on every source. Always present.

**`source` (LQL), `service` (LQL), `app` (LQL), `subsource` (LQL), `category` (LQL) (and their hashes) are conditional.** Present when the source's data carries the base field. The hash is computed only when the base field is detected. Not every source carries every field.

**Degrade gracefully.** If grouping on `service` (LQL) (or another conditional field) returns a single empty or null group, that source simply does not carry `service` (LQL). Fall back to `pattern_hash` (LQL). Do not read "no groups" (or one empty group) as a Finding; it means the field is not populated for this source.

**`app` (LQL)** is product identity when present (`guides/app-vocabulary.md`). Empty is normal.
Stream identity is `subsource` (LQL). Explore: `guides/stream-kinds.md`.

**The ladder is universal where curated fields are not.** `pattern_hash` (LQL) is computed on every source; the other five are computed whenever the source's data carries that base field. Curated and module fields are per-source and per-surface (see field-availability notes in `sparklogs-investigate` Section 8 and `guides/generated-reference-router.md`). An empty ladder field value is normal for many events.

---

## Treat every `_hash` as opaque

Never parse a `_hash`, never infer meaning from its characters, never length-validate it.
`pattern_hash` (LQL) may carry a short readable prefix followed by an opaque tail; `source_hash` (LQL), `subsource_hash` (LQL), `category_hash` (LQL), `service_hash` (LQL), and `app_hash` (LQL) are bare opaque tokens.
All six are drill-down handles only: values to pass back into a filter, not strings to interpret.

---

## The ladder: coarse to fine

```
service -> app -> subsource -> category -> pattern (finest: pattern_hash)
```

**`source` (LQL)** sits beside this ladder as the origin-host dimension (who the event is about), not a finer grain of event shape.
Use `source` (LQL) / `source_hash` (LQL) for fleet or host pivots; climb the ladder to localize within a host.

Climb the ladder to localize a problem: group coarse to find the noisy component, narrow one rung at a time, land on the exact recurring `pattern_hash` (LQL).

---

## Discover structure vs measure within a filter

See `mcp-tool-decision-tree.md` (Investigation discipline) for why order matters.

**`query_scope_activity` (tool)** (**bounded discovery**, not LQL-filtered):
- Capped, pre-aggregated structure for app / service / subsource in org scope and time window.
- Per-row triage: `event_count` (col), `cnt_interesting` (col), one count per failure-side severity band (`cnt_warning` (col) through `cnt_critical_plus` (col); the bands are defined in `category-classes.md`), `distinct_interesting` (col), `first_event_at` (col), `last_event_at` (col).
- Critical+ fetch-first: a non-zero `cnt_critical_plus` (col) in any row in scope means fetch those events before proceeding, whatever the investigation topic (`category-classes.md`, Query notes).
- Narrow with `agent_ids` (arg) (collector UUIDs), `source` (LQL) substring, or `field_match` (arg) over dimension names.
- Summary may include `top_interesting_patterns` (col) teaser; call **`describe_pattern` (tool)** before citing any teaser pattern.

**`query_event_counts_by_severity` (tool)** (**LQL-filtered measure**):
- Counts events matching an **`lql` (arg)** filter, by severity, optionally over the `group_by` (arg) fields and/or `bucket` (arg) time buckets.
- Use when you already have a hypothesis slice (severity, time sub-range, `pattern_hash` (LQL), `agent_id` (LQL), etc.) and need counts, ranking or a time series within that slice.

Rule of thumb: `query_scope_activity` (tool) = "what app/service/subsource combinations exist here?"; `query_event_counts_by_severity` (tool) = "within this filtered population, which values dominate, how bad are they, and when?"

---

## How to use the ladder for RCA

**DISCOVER - enumerate structure before heavy scans.** Call `query_scope_activity` (tool) with org scope, the investigation window, optional `agent_ids` (arg), and the session `external_investigation_id` (arg).

**GROUP - find dominant or anomalous groups (filtered measure).** Call `query_event_counts_by_severity` (tool) with `group_by` (arg) on a ladder field or its `_hash` companion and an `lql` (arg) slice as needed.
Group by `pattern_hash` (LQL) for the most-repeated normalized events; by `service` (LQL) or `subsource` (LQL) to localize the noisy component.

**DEDUP / STABILITY - track one pattern over time.**
A `_hash` is a stable identity: the same hash means the same normalized value or pattern, across events and across time.

**DRILL - read the events behind a hash.** Narrow with `query_logs` (tool) or `refine_query_result` (tool) using `pattern_hash` (LQL) in `lql` (arg) or `filter_lql` (arg).

**DESCRIBE - read pattern text and exemplars before citing.** Call `describe_pattern` (tool) with the hash list, window, and session id before the pattern appears in a Finding. Required after any `top_interesting_patterns` (col) teaser row.

**CORRELATE ACROSS WINDOWS - first-occurrence detection.**
A `pattern_hash` (LQL) present in the incident window but absent from a healthy baseline window signals new behavior. Run `query_event_counts_by_severity` (tool) twice, once per window, and compare hash populations (v1 substitute for the fast-follow `query_period_diff` (other) tool; see `mcp-tool-decision-tree.md`).

**RESOLVE - read the value; show the hash when it is a pivot.**
The response envelope header carries a hash-dictionary `lookups` (col) table mapping frequent hashes to their values.
When a row's inline value is blank, resolve it from `lookups` (col) before you speak.
Lead with the resolved text (and `describe_pattern` (tool) for a `pattern_hash` (LQL)).
Show the raw `*_hash` when it helps the engineer pivot (paste into LQL, compare windows, hand off a filter).
Do not dump hashes with no text, and do not parse or pretty-print the token.
Always use the hash verbatim as the drill-down filter value.

---

## Worked shape: localize then land

1. `query_scope_activity` (tool) or `query_event_counts_by_severity(group_by=["service"], ...)` over the fleet or source: which component is noisiest.
2. `query_event_counts_by_severity(group_by=["pattern"], lql='service = "<noisy service>"', ...)`: which pattern within that component dominates.
3. Compare against a healthy baseline window: is the top pattern new, or normal volume?
4. `describe_pattern(pattern_hashes=["<h>"])` on the surviving hash, then `query_logs(lql='pattern_hash = "<h>"', ...)` for event-level evidence.

Skip rungs when the symptom already points at a specific field.
Fall back to `pattern_hash` (LQL) alone whenever a conditional field is not populated for the source in scope.
