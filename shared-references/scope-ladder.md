# Scope Ladder - grouping fields and their hash companions

Five fields carry a normalized value plus an opaque `_hash` companion: `pattern`/`pattern_hash`, `subsource`/`subsource_hash`, `category`/`category_hash`, `service`/`service_hash`, `app`/`app_hash`. Together they form a ladder from coarse to fine that localizes a problem to the exact recurring event shape. This is the primary shallow-triage RCA lever available today - lean on it hard.

---

## Availability

**`pattern_hash` is universal.** Computed for every event on every source. Always present.

**`service`, `app`, `subsource`, `category` (and their hashes) are conditional.** Present when the source's data carries the base field - structured or vendor sources that emit it. The hash is computed only when the base field is detected. Not every source carries every field.

**Degrade gracefully.** If a `group_field` on `service` (or another conditional field) returns a single empty or null group, that source simply does not carry `service` - fall back to `pattern_hash`. Do not read "no groups" (or one empty group) as a Finding; it means the field isn't populated for this source, not that the field has no values worth reporting.

**This differs from the deep RCA fields.** `state.*`, `event_kind`, and `anomaly_*` are designed but not yet emitted by the Managed Agent - see the field-availability rule in SKILL.md Section 8. The scope ladder is not in that category: it is available today, on every source for `pattern_hash` and on any source whose data carries the other four fields. Treat it as the primary shallow-triage lever, not a pending capability.

---

## Treat every `_hash` as opaque

Never parse a `_hash`, never infer meaning from its characters, never length-validate it. `pattern_hash` may carry a short readable prefix followed by an opaque tail; `subsource_hash`, `category_hash`, `service_hash`, and `app_hash` are bare opaque tokens. All five are drill-down handles only - values to pass back into a filter, not strings to interpret.

---

## The ladder: coarse to fine

```
service -> app -> subsource -> category -> pattern (finest: pattern_hash)
```

Climb it to localize a problem: group coarse to find the noisy component, narrow one rung at a time, land on the exact recurring `pattern_hash`.

---

## How to use the ladder for RCA

**GROUP - find dominant or anomalous groups.**
```
query_grouped_aggregation(group_field=<field or its _hash>, ...)
```
Group by `pattern_hash` to surface the most-repeated normalized events, densest first. Group by `service` or `subsource` to localize which component is noisy before narrowing further.

**DEDUP / STABILITY - track one pattern over time.**
A `_hash` is a stable identity: the same hash means the same normalized value or pattern, across events and across time. Use it to deduplicate and to follow one pattern through an investigation.

**DRILL - read the events behind a hash.**
```
query_logs(lql='pattern_hash = "<h>"', ...)
refine_query_result(query_id=<qid>, filter_lql='pattern_hash = "<h>"', ...)
```

**CORRELATE ACROSS WINDOWS - first-occurrence detection.**
A `pattern_hash` present in the incident window but absent from a healthy baseline window signals new behavior - a primary RCA signal. Run `query_grouped_aggregation` twice, once per window, and compare the two hash populations. This is the v1 substitute for the fast-follow `query_period_diff` tool (see `mcp-tool-decision-tree.md`).

**RESOLVE - read the value, not the hash.**
The response envelope's header carries a hash-dictionary `lookups` table mapping frequent hashes to their values, so long strings aren't re-carried on every row. The `*_hash` column is always present as the handle; rare hashes stay inline. When a row's inline value is blank, resolve it from `lookups`. Never show a raw `_hash` to the engineer - resolve it to its value first. Use the hash itself only as a drill-down filter value, passed back verbatim.

---

## Worked shape: localize then land

1. `query_grouped_aggregation(group_field="service", ...)` over the fleet or source - which component is noisiest.
2. `query_grouped_aggregation(group_field="pattern", lql='service = "<noisy service>"', ...)` - which pattern within that component dominates.
3. Compare that grouped result against the same call over a healthy baseline window - is the top pattern new, or does it just recur at normal volume.
4. `query_logs(lql='pattern_hash = "<h>"', ...)` on the surviving `pattern_hash` to read the actual event text and cite it as evidence.

This is the shape, not a script - skip rungs when the symptom already points at a specific field, and fall back to `pattern_hash` alone whenever a conditional field isn't populated for the source in scope.
