# Scope Ladder - grouping fields and their hash companions

Six fields carry a normalized value plus an opaque `_hash` companion: `pattern`/`pattern_hash`, `source`/`source_hash`, `subsource`/`subsource_hash`, `category`/`category_hash`, `service`/`service_hash`, `app`/`app_hash`.
Together they form a ladder from coarse to fine that localizes a problem to the exact recurring event shape.
This is the primary shallow-triage RCA lever available today: lean on it hard.

---

## Availability

**`pattern_hash` is universal.** Computed for every event on every source. Always present.

**`source`, `service`, `app`, `subsource`, `category` (and their hashes) are conditional.** Present when the source's data carries the base field. The hash is computed only when the base field is detected. Not every source carries every field.

**Degrade gracefully.** If grouping on `service` (or another conditional field) returns a single empty or null group, that source simply does not carry `service`. Fall back to `pattern_hash`. Do not read "no groups" (or one empty group) as a Finding; it means the field is not populated for this source.

**The ladder is universal where curated fields are not.** `pattern_hash` is computed on every source; the other five are computed whenever the source's data carries that base field. Curated and module fields are per-source and per-surface (see the field-availability rule in SKILL.md Section 8), so an empty result there says less than it looks like it does.

---

## Treat every `_hash` as opaque

Never parse a `_hash`, never infer meaning from its characters, never length-validate it.
`pattern_hash` may carry a short readable prefix followed by an opaque tail; `source_hash`, `subsource_hash`, `category_hash`, `service_hash`, and `app_hash` are bare opaque tokens.
All six are drill-down handles only: values to pass back into a filter, not strings to interpret.

---

## The ladder: coarse to fine

```
service -> app -> subsource -> category -> pattern (finest: pattern_hash)
```

**`source`** sits beside this ladder as the origin-host dimension (who the event is about), not a finer grain of event shape.
Use `source` / `source_hash` for fleet or host pivots; climb the ladder to localize within a host.

Climb the ladder to localize a problem: group coarse to find the noisy component, narrow one rung at a time, land on the exact recurring `pattern_hash`.

---

## Discover structure vs measure within a filter

**`query_scope_activity`** (cheap discovery, not LQL-filtered):
- Runs a cheap discovery scan for app / service / subsource structure in org scope and time window.
- Per-row triage: `event_count`, `cnt_interesting`, one count per failure-side severity band (`cnt_warning` through `cnt_critical_plus`; the bands are defined in `category-classes.md`), `distinct_interesting`, `first_event_at`, `last_event_at`.
- Critical+ fetch-first: a non-zero `cnt_critical_plus` in any row in scope means fetch those events before proceeding, whatever the investigation topic (`category-classes.md`, Query notes).
- Narrow with `agent_ids` (collector UUIDs), `source` substring, or `field_match` over dimension names.
- Summary may include `top_interesting_patterns` teaser; call **`describe_pattern`** before citing any teaser pattern.

**`query_event_counts_by_severity`** (billed, LQL-filtered measure):
- Counts events matching an **`lql`** filter, by severity, optionally over the `group_by` fields and/or `bucket` time buckets.
- Use when you already have a hypothesis slice (severity, time sub-range, `pattern_hash`, `agent_id`, etc.) and need counts, ranking or a time series within that slice.

Rule of thumb: `query_scope_activity` = "what app/service/subsource combinations exist here?"; `query_event_counts_by_severity` = "within this filtered population, which values dominate, how bad are they, and when?"

---

## How to use the ladder for RCA

**DISCOVER - enumerate structure before heavy scans.**
```
query_scope_activity(
  org_ids: [...],
  start: "...",
  end: "...",
  agent_ids: ["<collector uuid>"],
  external_investigation_id: "..."
)
```

**GROUP - find dominant or anomalous groups (filtered measure).**
```
query_event_counts_by_severity(group_by=["<field or its _hash>"], lql='...', ...)
```
Group by `pattern_hash` for the most-repeated normalized events; by `service` or `subsource` to localize the noisy component.

**DEDUP / STABILITY - track one pattern over time.**
A `_hash` is a stable identity: the same hash means the same normalized value or pattern, across events and across time.

**DRILL - read the events behind a hash.**
```
query_logs(lql='pattern_hash = "<h>"', ...)
refine_query_result(query_id=<qid>, filter_lql='pattern_hash = "<h>"', ...)
```

**DESCRIBE - read pattern text and exemplars before citing.**
```
describe_pattern(pattern_hashes=["<h>"], start="...", end="...", ...)
```
Required after any `top_interesting_patterns` teaser row before the pattern appears in a Finding.

**CORRELATE ACROSS WINDOWS - first-occurrence detection.**
A `pattern_hash` present in the incident window but absent from a healthy baseline window signals new behavior. Run `query_event_counts_by_severity` twice, once per window, and compare hash populations (v1 substitute for the fast-follow `query_period_diff` tool; see `mcp-tool-decision-tree.md`).

**RESOLVE - read the value, not the hash.**
The response envelope header carries a hash-dictionary `lookups` table mapping frequent hashes to their values.
When a row's inline value is blank, resolve it from `lookups`. Never show a raw `_hash` to the engineer; use the hash verbatim only as a drill-down filter value.

---

## Worked shape: localize then land

1. `query_scope_activity` or `query_event_counts_by_severity(group_by=["service"], ...)` over the fleet or source: which component is noisiest.
2. `query_event_counts_by_severity(group_by=["pattern"], lql='service = "<noisy service>"', ...)`: which pattern within that component dominates.
3. Compare against a healthy baseline window: is the top pattern new, or normal volume?
4. `describe_pattern(pattern_hashes=["<h>"])` on the surviving hash, then `query_logs(lql='pattern_hash = "<h>"', ...)` for event-level evidence.

Skip rungs when the symptom already points at a specific field.
Fall back to `pattern_hash` alone whenever a conditional field is not populated for the source in scope.
