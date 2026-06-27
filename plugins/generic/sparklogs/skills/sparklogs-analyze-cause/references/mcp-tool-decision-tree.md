# MCP Tool Decision Tree

Per-tool detailed usage with parameter notes, decision tree for which tool to use when, and worked-example call sequences.

---

## Quick decision tree

**"What scope am I working in?"** -> `resolve_scope` (always first)
**"Does this source have data in the investigation window?"** -> `list_sources` with the investigation's `time_range`, filtered to source
**"What's happening on this source / fleet?"** -> `query_grouped_aggregation` group_by `pattern_hash` (or `source` for fleet)
**"What changed in the last N hours?"** -> `query_period_diff` group_by `pattern_hash`
**"What's different about the broken population vs the working one?"** -> `compare_populations`
**"What context surrounds these specific events?"** -> `cluster_event_contexts`
**"Show me the actual events (last resort)"** -> `query_logs`
**"Same data, different view"** -> `refine_query_result` against existing `query_id`
**"What pattern_hash is this? Sample messages?"** -> `describe_pattern`
**"What does this cache hold? How much did it cost?"** -> `get_query_metadata`
**"What custom fields exist?" (rarely first)** -> `list_fields`

---

## Per-tool detail

### `resolve_scope`

Always first. Turn natural-language scope into `org_ids`.

```
resolve_scope(
  scope_text: "the dental office" | "Acme's file server" | "srv-fileshare01 in Acme",
  investigation_request_id: "..."
)
-> matches: [{org_ids, org_path, confidence, sources_hint}], elicit_user, elicit_message
```

**Decision logic:**
- One match with confidence >0.85: proceed with that scope.
- Multiple matches with no clear winner (top match <2x lead over second): use elicitation if host supports, or ask the engineer conversationally.
- Zero matches: surface to engineer with the candidate list.

**Common mistake:** skipping this step and assuming you know the scope from the engineer's wording. Engineers refer to clients by short names that may be ambiguous; resolve.

---

### `list_sources`

Source enumeration, scope discovery within the investigation's time window, fleet enumeration.

```
list_sources(
  org_ids: ["..."],
  include_sub_orgs: true,                      # default true; expand sub-orgs server-side
  time_range: {start: "...", end: "..."},     # REQUIRED - investigation's actual time window
  investigation_request_id: "...",
  app_filter: 'app: agent_op/*' | null         # optional - filter to sources emitting specific apps
)
-> sources: [{source, org_id, last_event_in_window, apps_seen}], sources_total, sources_truncated
```

**`time_range` is required.** Different investigations span different windows (live troubleshooting vs historical RCA over a past incident). Use the investigation's actual time window - do NOT default to "is this source reporting right now?" which would wrongly exclude sources whose data is in the historical window but who are now offline.

**Use cases:**
- **Scope discovery within an investigation window:** call with the investigation's `time_range`; check whether the suspected source has events in the window. If not, halt and ask the engineer (per `scope-resolution.md`).
- **Fleet enumeration:** for cross-source investigations, get the source list within the relevant window.
- **Coverage validation:** confirm the sources you're investigating actually have Managed Agent telemetry in the relevant window. Sparse-data sources should be flagged in OUTSIDE AGENT VISIBILITY.

---

### `list_fields`

Custom field discovery. **NOT a first-pass tool.** The agent should use standard fields, pattern analysis, and known Managed Agent fields (the three information levels) for first-pass investigations. Only reach for `list_fields` when those aren't surfacing what you need.

```
list_fields(
  org_ids: ["..."],
  time_range: {...},
  investigation_request_id: "...",
  top_n: 100,                                  # default 100, max 10000
  min_presence_pct: 0.05,                      # filter to fields present in >=N% of events
  name_filter: "x.veeam.*" | null              # LQL-pattern filter on field names
)
-> fields: [{name, type, event_count, presence_pct, distinct_value_count_estimate}], fields_total, fields_truncated
```

**Common mistake:** running this as the first MCP call and overwhelming context with thousands of field names that don't matter for the investigation.

---

### `describe_pattern`

After identifying interesting `pattern_hash` from grouped/diff results - get pattern text + samples.

```
describe_pattern(
  org_ids: ["..."],
  time_range: {...},
  investigation_request_id: "...",
  pattern_hashes: ["h7Vjf2Xk9a", ...],         # up to 100 in one call
  samples_per_pattern: 3                       # default 3, max 10
)
-> patterns: [{pattern_hash, pattern_text, event_count, first_seen, last_seen, sample_messages, pattern_url}]
```

**Use cases:**
- Right after `query_grouped_aggregation` group_by `pattern_hash` returns interesting hashes.
- Right after `query_period_diff` returns new/disappeared/accelerated patterns.
- When the engineer asks "what is this error" referring to a hash from prior context.

**Cheap.** Reads from materialized pattern view; very efficient. Use freely.

---

### `query_logs`

Retrieve raw events. **Last resort after aggregation.**

```
query_logs(
  org_ids: ["..."],
  time_range: {...},
  filter_lql: "...",
  investigation_request_id: "...",
  return_field_list: [...],                    # always set explicitly; never default
  random_sample_pct: 100,                      # backend sampling (only random; other shapes via refine)
  sort: {field: "t", direction: "asc"},
  max_tokens: 25000,
  max_field_chars: 512,
  max_field_chars_override: {...},
  next_page_cursor: null
)
-> query_id, query_url, cache_status, freshness_watermark, result_truncated, next_page_cursor,
  truncated_fields, unknown_field_paths, rows_total, rows_returned, rows
```

**Use cases:**
- Last-resort raw event retrieval after aggregation has narrowed to a specific small set.
- Level-3 ground-truth reads with explicit `return_field_list` and `max_field_chars_override`.
- "Show me events with this specific filter" when aggregation isn't useful (e.g., a single specific event_id you want to see in detail).

**Common mistakes:**
- Reaching for this first. Aggregation first.
- Omitting `return_field_list` (returns the standard set; usually too much).
- Reading Level 3 by default.
- Forgetting `investigation_request_id`.

**`random_sample_pct`** is the only backend sampling primitive. Use when the universe is too big for a full scan but a representative sample suffices. Other sampling shapes (first_n / last_n / stratified) happen at `refine_query_result` time.

---

### `query_grouped_aggregation`

The workhorse for "what's happening" questions. Group-by any field with optional time-bucketing.

```
query_grouped_aggregation(
  org_ids: ["..."],
  time_range: {...},
  filter_lql: "...",
  investigation_request_id: "...",
  group_by: ["pattern_hash"] | ["source"] | ["source", "severity"] | ...,
  time_bucket: "1h" | "1d" | null,
  aggregations: [{op: "count"}, {op: "min", field: "t"}, {op: "distinct_count", field: "..."}],
  top_n: 100,                                  # or bottom_n (mutually exclusive)
  return_field_list: [...],
  max_tokens: 25000
)
-> standard response + rows grouped by group_by fields, with column expansion when group_by is pattern_hash or subsource_id
```

**Use cases:**
- "What pattern_hashes appeared most this hour?" -> group_by pattern_hash + count + top_n.
- "Which sources show this pattern?" -> filter on pattern_hash + group_by source.
- "Distribution of severities per source" -> group_by source + severity + count.
- "Unique source IPs hitting 4625" -> filter on event_id + count_distinct on source_ip.
- Hourly histograms via `time_bucket: "1h"`.

**Column expansion:** when group_by is `pattern_hash`, response includes `pattern_text`. When it's `subsource_id`, response includes `subsource_name`. No follow-up `describe_pattern` needed for the names.

**Materialized-view routing:** `pattern_hash` group-by routes through the materialized view internally; cheap. Other group-bys read from raw cached scan or fresh backing query; more expensive.

---

### `query_period_diff`

The workhorse for "what changed" questions.

```
query_period_diff(
  org_ids: ["..."],
  period_a: {start: "...", end: "..."},        # absolute or relative
  period_b: {start: "...", end: "..."},
  filter_lql: "...",
  investigation_request_id: "...",
  group_by: "pattern_hash",                    # currently only pattern_hash supported
  top_n: 50,
  acceleration_threshold: 2.0,                 # rate ratio for "accelerated"
  deceleration_threshold: 0.5
)
-> standard response + new_in_b: [...], disappeared_from_a: [...], accelerated: [...], decelerated: [...]
```

**Use cases:**
- "What patterns are new today vs yesterday?" -> `query_period_diff` with last_24h vs prior_24h.
- "What stopped happening?" - disappeared_from_a is often the clue (e.g., successful-backup pattern stopped).
- "What's accelerating?" - accelerated patterns often flag emerging issues.

**Current limitation:** group_by is only `pattern_hash`. Other fields may be added later.

**Cheap when materialized view applies.** Use early in "something changed" investigations.

---

### `compare_populations`

The causal investigation primitive - BubbleUp-equivalent.

```
compare_populations(
  org_ids: ["..."],
  population_a: {label: "broken_endpoints", filter_lql: "..."},
  population_b: {label: "working_endpoints", filter_lql: "..."},
  time_range: {...},
  investigation_request_id: "...",
  field_name_filter: null,                     # filter which fields to compare (default: standard + Managed Agent)
  top_n_disproportionate_patterns: 20
)
-> population_a/b: {label, matched_events}, field_differences: [...], disproportionate_patterns: [...]
```

**Use cases:**
- "What's different about the endpoints where this is broken vs where it works?" - direct.
- "What's different about today's failed logons vs yesterday's successful ones?"
- HM1-style cross-product detection: "where backups failed AND where they succeeded - what installed_products differ?"

**Heavier than aggregation** (scans both populations). Use when the question is genuinely causal and aggregation alone won't answer.

---

### `cluster_event_contexts`

The intermediate primitive between aggregation and raw retrieval.

```
cluster_event_contexts(
  org_ids: ["..."],
  filter_lql: "pattern_hash = '...'",          # narrow to a specific pattern of interest
  time_range: {...},
  investigation_request_id: "...",
  sample_n_matches: 100,                       # default 100, max 500
  window_pre_s: 300,                           # context window pre-event
  window_post_s: 60,                           # context window post-event
  max_clusters: 8,                             # max distinct clusters to return
  min_cluster_size: 2,
  signature_similarity: "exact",               # currently "exact"; other algorithms may be added
  noise_handling: "frequency_threshold"
)
-> matched_events_total, sampled_events, clusters: [{cluster_id, occurrence_count, representative_surround, contributing_sources, earliest, latest}]
```

**Use case:** "I found a pattern that fires 412 times - but is it ONE thing happening or many different things sharing a symptom?" `cluster_event_contexts` answers that.

**Most expensive backing query in the surface.** One expensive call to avoid many cheap-but-lossy retrievals. Use when investigation has narrowed to a specific pattern of interest and you need to understand the *contexts* it appears in.

**Currently fixed parameters:** signature similarity algorithm (`exact`), noise handling defaults, parameter defaults. These may be tuned over time.

---

### `refine_query_result`

Re-project / re-filter / re-aggregate / re-sort / re-sample / paginate an existing cached scan.

```
refine_query_result(
  query_id: "qXY9a3...",                       # from a prior backing query
  investigation_request_id: "...",
  cache_filter_lql: "...",                     # additional LQL applied to cached rows
  cache_sample: {mode: "first_n" | "last_n" | "random" | "stratified", n: 50},
  cache_sort: {field: "...", direction: "asc"},
  group_by: [...],                             # treat cache as input to grouped aggregation
  time_bucket: ...,
  aggregations: [...],
  top_n: ...,
  return_field_list: [...],
  max_tokens: ...,
  max_field_chars: ...,
  max_field_chars_override: ...,
  next_page_cursor: ...
)
-> standard response (same shape as the original tool that created the cache)
```

**The central economic lever.** Cached refinements are 10-100x cheaper than backing queries. Use freely - multiple `refine_query_result` calls against the same `query_id` are encouraged.

**Cache miss handling:** within 120 days of original backing query, cache is regenerated transparently (see `cache_status` in response). Beyond 120 days, structured error with original parameters.

**Common patterns:**
- After a broad backing scan, refine per-subsource to drill into specific categories.
- After grouped aggregation, refine to inspect specific groups.
- After period_diff finds new patterns, refine to get raw events for a specific new pattern.

---

### `get_query_metadata`

Cache introspection. Cheap; use freely.

```
get_query_metadata(
  query_id: "qXY9a3..." | null,
  query_ids: ["..."] | null,
  investigation_request_id: "..." | null
  # Exactly one of the three required (or query_ids + investigation_request_id for intersection)
)
-> caches: [{query_id, query_url, tool, backing_query_params, purpose, investigation_request_id,
            cache_age_s, expires_at, freshness_watermark, rows, bytes, source_list,
            event_kind_histogram, subsource_top_n, bq_stats}],
  investigation_summary (when investigation_request_id was provided)
```

**Use cases:**
- After context compaction, recover full investigation history via `investigation_request_id`.
- Cost rollup at end of investigation for the INVESTIGATION COST section.
- Debugging: "what did this cache actually contain?"

---

## Common call sequences (recipes)

### Recipe: "Investigate <single source> for <symptom>"

```
1. resolve_scope(<source description>)
2. list_sources with the investigation's time_range, filtered to source - confirm source has data in window
3. query_logs Level-2 source-scoped over relevant window - primary cache
4. Multiple refine_query_result per subsource of interest
5. Optional: query_period_diff for "what changed" framing
6. Optional: cluster_event_contexts for surrounding context on specific patterns
7. query_logs ingest-health check
8. get_query_metadata for cost rollup
9. system condition summary output
```

### Recipe: "Is this just us? Fleet pivot from a specific event"

```
1. resolve_scope(<msp / org scope>)
2. query_grouped_aggregation filter on pattern_hash, group_by source
3. describe_pattern to confirm what the hash means
4. Optional: refine_query_result on the pivot result for first/last/sample seen per source
5. get_query_metadata
6. system condition summary output (concise - this is a quick-pivot pattern)
```

### Recipe: "What changed?"

```
1. resolve_scope
2. list_sources
3. query_period_diff group_by pattern_hash with two time windows
4. describe_pattern on top new / disappeared / accelerated patterns
5. cluster_event_contexts on top new pattern for surround context
6. query_logs Level-3 if you need to see actual events around the change
7. get_query_metadata
8. system condition summary output
```

### Recipe: "What's different about broken vs working?"

```
1. resolve_scope
2. compare_populations with population_a = "broken filter" and population_b = "working filter"
3. Optional: refine on either population for deeper context
4. Optional: query_logs Level-3 on specific differentiating fields
5. get_query_metadata
6. system condition summary output
```

---

## Tool selection failure modes

**Reaching for `query_logs` first.** Aggregation first. Almost always.

**Skipping `list_sources`.** Source might not have data in the investigation's time window. Always confirm with `list_sources` scoped to the investigation's `time_range`.

**Forgetting `describe_pattern` after group_by pattern_hash.** Column expansion includes `pattern_text` so you may not need it; but if you only have a hash and no text, `describe_pattern` is the cheap follow-up.

**Using `compare_populations` when `query_grouped_aggregation` would do.** Compare_populations is heavier; use when the question is causal (what's *different about* X vs Y), not when it's enumerative (count by X).

**Ignoring cache_status responses.** If a refine returned `cache_status: "regenerated"`, the cache had to re-execute - note in cost summary.

**Not setting `investigation_request_id`.** Audit trail breaks. Always set it.
