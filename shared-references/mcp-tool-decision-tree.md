# MCP Tool Decision Tree

Per-tool detailed usage with parameter notes, decision tree for which tool to use when, and worked-example call sequences.

The v1 tool surface is the **lean-7**: `resolve_scope`, `list_sources`, `list_fields`, `query_grouped_aggregation`, `query_logs`, `refine_query_result`, `get_query_metadata`. Four differential tools (`query_period_diff`, `compare_populations`, `cluster_event_contexts`, `describe_pattern`) are FAST-FOLLOW, not yet available; see the bottom of this file for the v1 equivalents.

**Every tool takes `external_investigation_id`** (REQUIRED; a friendly, human-meaningful correlation handle you supply, 8-200 chars free text, e.g. `investigate-ticket-1234-disk-errors` - not a generated hash. Reusing the same value RESUMES that investigation; use a fresh, distinctive value to start a new one; tagged on every call).
**Time windows are flat `start` / `end` in RFC3339 UTC** (e.g. `2026-07-01T00:00:00Z`). There is no `time_range` object and no `relative:` shorthand - compute the absolute window yourself.

---

## Query tiers - funnel before raw

Spend from the top down:

- **Tier 1, lightweight scoping:** `resolve_scope`, `list_sources`, `list_fields`. Fix `org_ids`, confirm the source has data, learn the field vocabulary. Do this before any backing scan.
- **Tier 2, grouped aggregation:** `query_grouped_aggregation`. Groups every matching event by one field, returns top values by hit count. The workhorse for "what's happening" - it tells you where to point `query_logs`. Group by a scope-ladder field (`service`, `app`, `subsource`, `category`, `pattern`, or a `_hash`) to localize before drilling - see `scope-ladder.md`.
- **Tier 3, raw events (last resort):** `query_logs`, only after Tiers 1-2 narrowed the window and filter. Then `refine_query_result` (lightweight) over that cached slice - do NOT re-scan.

`refine_query_result` and the default `get_query_metadata` are lightweight - they run against the cache. Backing scans (`query_logs`, `query_grouped_aggregation`, and the opt-in `get_query_metadata` deep discovery) touch the underlying source and take meaningfully longer.

---

## Quick decision tree

**"What scope am I working in?"** -> `resolve_scope` (always first)
**"Does this source have data in the investigation window?"** -> `list_sources` with the investigation's `start`/`end`, filtered to source
**"What's happening on this source / fleet?"** -> `query_grouped_aggregation` group_field `pattern` (or `source` for fleet)
**"What changed in the last N hours?"** -> two `query_grouped_aggregation` runs over two windows, compared (see fast-follow note)
**"Show me the actual events (last resort)"** -> `query_logs`
**"Same data, different view"** -> `refine_query_result` against an existing `query_logs` `query_id`
**"What custom fields exist?" (rarely first)** -> `list_fields`, or `get_query_metadata` deep discovery over a cached query

---

## Per-tool detail

### `resolve_scope`

Always first. Turn natural-language scope into `org_ids`, and enumerate agents (devices/hosts) in scope.

```
resolve_scope(
  query: "the dental office" | "Acme's file server" | "srv-fileshare01",   # optional case-insensitive substring over org + agent names; omit to list everything in scope
  org_ids: ["..."],              # optional; omit for all orgs the token can access
  include_agents: true,          # default true
  include_sub_orgs: true,        # default true; expand each org to its sub-org subtree
  external_investigation_id: "..."
)
-> rows: org rows {kind:"org", id, name, parent_id} and agent rows {kind:"agent", id, name, org_id, status}
```

**Decision logic:**
- One clear org match: proceed with that scope.
- Multiple ambiguous matches with no clear winner: ask the engineer conversationally; don't guess.
- Zero matches: surface to the engineer with the candidate list.

**Common mistake:** skipping this and assuming you know the scope from the engineer's wording. Engineers refer to clients by short names that may be ambiguous; resolve.

---

### `list_sources`

Source enumeration and scope discovery within the investigation window.

```
list_sources(
  org_ids: ["..."],
  start: "2026-07-01T00:00:00Z",   # REQUIRED
  end: "2026-07-02T00:00:00Z",     # REQUIRED, exclusive
  include_sub_orgs: true,          # default true
  external_investigation_id: "..."
)
-> rows: {source, event_count, bytes_ingested}
```

**Use the investigation's actual window.** Different investigations span different windows (live troubleshooting vs historical RCA over a past incident). Do NOT default to "is this source reporting right now?" - that wrongly excludes sources whose data is in the historical window but who are now offline.

**Use cases:**
- **Scope discovery:** check whether the suspected source has events in the window. If not, halt and ask the engineer (per `scope-resolution.md`).
- **Fleet enumeration:** for cross-source investigations, get the source list within the relevant window.
- **Coverage validation:** confirm the sources you're investigating actually have Managed Agent telemetry in the window. Sparse-data sources should be flagged in WHAT WAS NOT CHECKED.

---

### `list_fields`

Custom field discovery for building NEW queries. **NOT a first-pass tool.** Use standard fields, pattern analysis, and known Managed Agent fields (the three information levels) for first-pass investigations. Only reach for `list_fields` when those aren't surfacing what you need. To discover fields WITHIN an existing cached result, use `get_query_metadata` instead.

```
list_fields(
  org_ids: ["..."],
  start: "...",                    # REQUIRED
  end: "...",                      # REQUIRED, exclusive
  include_sub_orgs: true,
  external_investigation_id: "..."
)
-> rows: {field, type, event_count}
```

**Common mistake:** running this as the first MCP call and overwhelming context with field names that don't matter for the investigation.

---

### `query_grouped_aggregation`

The workhorse for "what's happening" questions. Groups every matching event by ONE field and returns the top values by hit count.

```
query_grouped_aggregation(
  org_ids: ["..."],
  start: "...",
  end: "...",
  include_sub_orgs: true,
  group_field: "pattern" | "source" | "severity" | "service" | "app" | "subsource" | "category" | "<field>_hash" | "<custom.field>",   # a single field
  lql: "...",                      # optional LQL filter applied before grouping
  limit: 50,                       # max distinct groups by hit count (default 50, hard cap 10000)
  external_investigation_id: "..."
)
-> rows: {<group_field>, hits, max_severity}   # dense TSV
```

**Use cases:**
- "What patterns appeared most?" -> group_field `pattern`.
- "Which sources show this?" -> filter on a `pattern_hash` in `lql`, group_field `source`.
- "Severity distribution" -> group_field `severity`.
- "Which component is noisiest?" -> group_field `service` or `subsource`, then narrow with a second call - see the scope ladder (`scope-ladder.md`).

**Not refinable (v1).** Grouped output is NOT a refinable cache - calling `refine_query_result` on its `query_id` returns expired. Read grouped results directly. If a grouped result is truncated, follow its hint (narrow the `lql`/window and re-run). To then pull raw events for an interesting group, run `query_logs` with that group's value in `lql` (use the `*_hash` verbatim for the six hash fields).

---

### `query_logs`

Retrieve raw chronological events. **Last resort after aggregation.** Its result is a refinable cache.

```
query_logs(
  org_ids: ["..."],
  start: "...",
  end: "...",
  include_sub_orgs: true,
  lql: "...",                      # optional LQL filter; omit to match all in scope
  limit: 1000,                     # max events to scan + cache (default 1000)
  return_field_list: [...],        # projection; response-only, cache keeps full width. Set explicitly.
  external_investigation_id: "..."
)
-> header (query_id, query_url, summary, schema, lookups, page) + one page of events (JSONL)
```

**Use cases:**
- Last-resort raw event retrieval AFTER aggregation narrowed to a specific small set.
- Level-3 ground-truth reads with an explicit `return_field_list`.
- "Show me events with this filter" when aggregation isn't useful (e.g. one specific event you want to see in detail).

**Then refine, don't re-query.** Pull ONE broad-enough slice; use `refine_query_result` for every other view of it. To page a partial result, follow the response's `page.next`.

**Common mistakes:**
- Reaching for this first. Aggregation first.
- Omitting `return_field_list` (returns the standard set; usually too much).
- Reading Level 3 by default.
- Forgetting `external_investigation_id`.

---

### `refine_query_result`

An in-cache relational engine over a `query_logs` (or prior refine) result. Meaningfully faster than a backing query; never re-touches the source.

```
refine_query_result(
  query_id: "...",                 # from a prior query_logs or refine
  filter_lql: "...",               # WHERE over the cached table's ROW columns
  group_by: [ {col} | {time bucket expr} ],   # present => aggregation; absent => filtered/projected row slice
  aggregate: [ {fn, col, as} ],    # fn in count/count_distinct/sum/avg/min/max/stddev/p50/p90/p95/p99
  having_lql: "...",               # HAVING over POST-GROUP columns (group + aggregate aliases)
  order_by: [ {col_or_alias, dir} ],
  select: [...],                   # row-mode projection
  limit: 500,
  offset: 0,                       # deterministic paging over the cached slice
  sample: {n: ..., method: ...},   # optional down-sampling
  external_investigation_id: "..."
)
-> same envelope shape as query_logs (dense TSV for grouped/projected output)
```

**The central efficiency lever.** Queue one broad slice, then refine many times against the same `query_id`. Multiple refines are encouraged.

**Binding rule:** `filter_lql` resolves against the cached table's ROW columns (see the response schema descriptor for the vocabulary); `having_lql` resolves against the POST-GROUP columns (group + aggregate aliases).

**Cache expiry:** the underlying rows live in BQ's ~24h native cache. A refine much later, or a refine of a grouped (non-refinable) result, returns expired - re-issue the original backing query (the server regenerates a fresh `query_id` when it can).

**Common patterns:**
- After a broad raw scan, filter per-subsource to drill into specific categories.
- Group the cached slice (`group_by` + `aggregate`) to get a distribution without a new backing scan.
- Page a large slice via `offset` following `page.next`.

---

### `get_query_metadata`

Cache and field introspection over a cached `query_id`.

```
get_query_metadata(
  query_id: "...",
  top_n: 500,                      # OPT-IN deep discovery: expand ranked custom-field list (hard cap 5000). Full catalog scan of the source.
  field_match: {mode: "equals"|"contains"|"regex", pattern: "..."},   # OPT-IN deep discovery: grep custom field NAMES. Full catalog scan.
  external_investigation_id: "..."
)
-> bookkeeping (schema, custom_source, stats, cache status, tie-breaker/sort); or, with top_n/field_match, a ranked/matched custom-field list
```

**Default call is lightweight** (bookkeeping row only, sub-ms, no backing scan). **`top_n` / `field_match` deep discovery is a full catalog scan of the source** scoped to the cached query's window + orgs - use deliberately, only when the inline response schema isn't enough.

**Use cases:**
- Cache introspection after a query.
- Deep custom-field discovery within a specific cached result (distinct from `list_fields`, which builds NEW queries over a source).

---

## Common call sequences (recipes)

### Recipe: "Investigate <single source> for <symptom>"

```
1. resolve_scope(<source description>)
2. list_sources with the investigation's start/end, filtered to source - confirm data in window
3. query_grouped_aggregation group_field pattern (or severity) - what's happening
4. query_logs over the narrowed window/filter - primary cache
5. Multiple refine_query_result per subsource / field of interest
6. query_logs ingest-health check (subsource in ingest_drop/spool_full/backpressure)
7. get_query_metadata on any cache whose schema or status needs a check
8. system condition summary output
```

### Recipe: "Is this just us? Fleet pivot from a specific pattern"

```
1. resolve_scope(<msp / org scope>)
2. query_grouped_aggregation with lql filtering to the pattern_hash, group_field source
3. Optional: query_logs + refine for first/last seen per source
4. get_query_metadata
5. system condition summary output (concise - this is a quick-pivot pattern)
```

### Recipe: "What changed?"

```
1. resolve_scope
2. list_sources
3. query_grouped_aggregation group_field pattern over window A (e.g. incident window)
4. query_grouped_aggregation group_field pattern over window B (e.g. prior baseline)
5. Compare the two grouped results - new / disappeared / accelerated patterns
6. query_logs over the changed pattern if you need to see actual events
7. get_query_metadata
8. system condition summary output
```

---

## Tool selection failure modes

**Reaching for `query_logs` first.** Aggregation first. Almost always.

**Skipping `list_sources`.** Source might not have data in the investigation's window. Always confirm with `list_sources` scoped to the investigation's `start`/`end`.

**Refining a grouped result.** `query_grouped_aggregation` output is not refinable (v1); it returns expired. Read it directly or pull raw events with `query_logs`.

**Re-scanning instead of refining.** After ONE broad `query_logs` slice, use `refine_query_result` for other views - it's a cache lookup, not a fresh scan.

**Showing a `*_hash` id to a human.** Resolve it via the header `lookups` first. Use the hash verbatim only as a drill-down filter value.

**Not setting `external_investigation_id`.** Audit trail breaks. Always set it.

---

## Fast-follow tools (NOT in v1)

These land shortly after the lean-7; until then, use the v1 equivalent:

- **`query_period_diff`** ("what changed between two windows") -> run `query_grouped_aggregation` over each window (group_field `pattern`) and compare the two grouped results.
- **`compare_populations`** ("what's different about broken vs working") -> run `query_grouped_aggregation` over each population separately (via distinct `lql`) and compare.
- **`cluster_event_contexts`** ("distinct contexts around these events") -> `query_logs` narrowed to the pattern, then `refine_query_result` group_by to cluster.
- **`describe_pattern`** ("what is this pattern_hash, sample messages") -> `query_logs` with `lql` filtering to the `pattern_hash`, projecting `message`.
