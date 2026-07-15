# MCP Tool Decision Tree

Per-tool detailed usage with parameter notes, decision tree for which tool to use when, and worked-example call sequences.

The v1 tool surface is the **lean-9**: `resolve_scope`, `list_sources`, `list_scope_ladder`, `describe_pattern`, `list_fields`, `query_grouped_aggregation`, `query_logs`, `refine_query_result`, `get_query_metadata`. Three differential tools (`query_period_diff`, `compare_populations`, `cluster_event_contexts`) are fast-follow; see the bottom of this file for v1 equivalents.

**Every tool takes `external_investigation_id`** (REQUIRED; a friendly, human-meaningful correlation handle you supply, 8-200 chars free text, e.g. `investigate-ticket-1234-disk-errors` - not a generated hash. Reusing the same value RESUMES that investigation; use a fresh, distinctive value to start a new one; tagged on every call).
**Time windows are flat `start` / `end` in RFC3339 UTC** (e.g. `2026-07-01T00:00:00Z`). There is no `time_range` object and no `relative:` shorthand - compute the absolute window yourself.

---

## Query tiers - funnel before raw

Spend from the top down:

- **Tier 1, lightweight scoping:** `resolve_scope`, `list_fields`. Fix `org_ids` and fleet directory (agents, ingest keys, verdicts). Do this before backing scans.
- **Tier 1b, billed discovery:** `list_sources`, `list_scope_ladder`, `describe_pattern` (stats). Confirm data in window, enumerate structure, read pattern detail. See `scope-resolution.md` and `scope-ladder.md`.
- **Tier 2, grouped aggregation:** `query_grouped_aggregation`. Groups every matching event by one field, returns top values by hit count. The workhorse for "what's happening" - it tells you where to point `query_logs`. Group by a scope-ladder field (`service`, `app`, `subsource`, `category`, `pattern`, or a `_hash`) to localize before drilling - see `scope-ladder.md`.
- **Tier 3, raw events (last resort):** `query_logs`, only after Tiers 1-2 narrowed the window and filter. Then `refine_query_result` (lightweight) over that cached slice - do NOT re-scan.

`refine_query_result` and the default `get_query_metadata` are lightweight - they run against the cache. Backing scans (`query_logs`, `query_grouped_aggregation`, and the opt-in `get_query_metadata` deep discovery) touch the underlying source and take meaningfully longer.

---

## Quick decision tree

**"What scope am I working in?"** -> `resolve_scope` (always first)
**"Does this collector/source have data in the investigation window?"** -> `list_sources` with the investigation's `start`/`end` (see `scope-resolution.md` cross-check)
**"What app/service/subsource structure exists here?"** -> `list_scope_ladder` (structure discovery; not LQL-filtered)
**"What's happening on this source / fleet (within an LQL slice)?"** -> `query_grouped_aggregation` group_field `pattern` (or `source` for fleet)
**"What is this pattern_hash?"** -> `describe_pattern` (required before citing teaser patterns)
**"What changed in the last N hours?"** -> two `query_grouped_aggregation` runs over two windows, compared (see fast-follow note)
**"Show me the actual events (last resort)"** -> `query_logs`
**"Same data, different view"** -> `refine_query_result` against an existing `query_logs` `query_id`
**"What custom fields exist?" (rarely first)** -> `list_fields`, or `get_query_metadata` deep discovery over a cached query

---

## Per-tool detail

### `resolve_scope`

Always first. Turn natural-language scope into `org_ids`, and enumerate orgs, managed agents, and ingest keys in scope.

```
resolve_scope(
  query: "Acme Dental" | "srv-fileshare01",   # optional; ranked match on org names and agent name/reported_hostname (exact/prefix/word/substring). Omit to list everything in scope.
  org_ids: ["..."],              # optional; omit for all orgs the token can access
  include_agents: true,          # default true; includes managed agents AND ingest keys
  include_sub_orgs: true,        # default true; expand each org to its sub-org subtree
  external_investigation_id: "..."
)
-> rows: kind org | agent | ingest_key; match_kind when query set; agent rows include verdict, reported_hostname, last_seen_at, versions, OS, etc.
```

**Decision logic:**
- One row with `match_kind` **`exact`**: proceed.
- Multiple rows at the same best `match_kind`: ask the engineer; don't guess.
- Sole match at `prefix`/`word`/`substring`: confirm before proceeding.
- Zero matches: surface closest candidates.

**Common mistake:** skipping this and assuming scope from wording. Engineers use ambiguous short names; resolve.

---

### `list_sources`

Per **(collector `agent_id`, origin `source`)** activity in the investigation window. Billed backing scan.

```
list_sources(
  org_ids: ["..."],
  start: "2026-07-01T00:00:00Z",   # REQUIRED
  end: "2026-07-02T00:00:00Z",     # REQUIRED, exclusive
  include_sub_orgs: true,          # default true
  include_top_interesting_patterns: true,   # default true; summary teaser ~8 patterns
  external_investigation_id: "..."
)
-> rows: agent_id, collector_kind, name, verdict, source, event_count, cnt_interesting, cnt_severe, distinct_interesting, bytes_ingested, first/last_event_at
-> summary may include top_interesting_patterns; call describe_pattern before citing
```

**Use the investigation's actual window.** Do NOT infer scope from recent heartbeat alone.

**Use cases:**
- **Scope discovery:** confirm expected collector/source pairs have events; cross-check `verdict` (stuck/offline halt rules in `scope-resolution.md`).
- **Fleet enumeration:** list collector/origin pairs in the window.
- **Triage:** `cnt_interesting` / `cnt_severe` before deep queries.

---

### `list_scope_ladder`

Discover app / service / subsource structure via cheap discovery scan. **Not LQL-filtered** (cheap steering). For counts within an LQL slice, use `query_grouped_aggregation`.

```
list_scope_ladder(
  org_ids: ["..."],
  start: "...",
  end: "...",
  agent_ids: ["..."],              # optional collector UUIDs
  source: "hostname-substring",    # optional
  field_match: {mode, pattern},    # optional name grep over ladder dims
  include_top_interesting_patterns: true,
  external_investigation_id: "..."
)
-> rows: agent_id, source, app, service, subsource, triage columns, first/last_event_at
```

See `scope-ladder.md` for ladder vs grouped-aggregation guidance.

---

### `describe_pattern`

Pattern detail for one or more `pattern_hash` values. **Call before citing any `top_interesting_patterns` teaser row.**

```
describe_pattern(
  org_ids: ["..."],
  start: "...",
  end: "...",
  pattern_hashes: ["..."],
  max_samples_per_pattern: 5,        # default 5; set 0 for stats only (mcp:observe)
  external_investigation_id: "..."
)
-> pattern text, stats, fleet spread; optional sample messages when max_samples_per_pattern > 0 (requires mcp:query)
```

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

**Cache expiry:** the underlying rows live in the server-side cache (~24h). A refine much later, or a refine of a grouped (non-refinable) result, returns expired - re-issue the original backing query (the server regenerates a fresh `query_id` when it can).

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

## Fast-follow tools (NOT yet available)

These land after the lean-9; until then, use the v1 equivalent:

- **`query_period_diff`** ("what changed between two windows") -> run `query_grouped_aggregation` over each window (group_field `pattern`) and compare the two grouped results.
- **`compare_populations`** ("what's different about broken vs working") -> run `query_grouped_aggregation` over each population separately (via distinct `lql`) and compare.
- **`cluster_event_contexts`** ("distinct contexts around these events") -> `query_logs` narrowed to the pattern, then `refine_query_result` group_by to cluster.
