# MCP Tool Decision Tree

Per-tool detailed usage with parameter notes, decision tree for which tool to use when, and worked-example call sequences.

The tool surface is these **eleven** tools: `resolve_scope`, `list_sources`, `query_scope_activity`, `query_device_health`, `describe_pattern`, `list_fields`, `query_event_counts_by_severity`, `query_logs`, `refine_query_result`, `get_query_metadata`, `server_info`. Three differential tools (`query_period_diff`, `compare_populations`, `cluster_event_contexts`) are fast-follow; see the bottom of this file for v1 equivalents.

**Every scoped or data tool takes `external_investigation_id`** (REQUIRED on all of them except
`server_info`, which takes NO parameters at all and REJECTS an id; a friendly, human-meaningful correlation handle you supply, 8-200 chars free text, e.g. `investigate-ticket-1234-disk-errors` - not a generated hash. Reusing the same value RESUMES that investigation; use a fresh, distinctive value to start a new one; tagged on every call).
**Time windows are flat `start` / `end` in RFC3339 UTC** (e.g. `2026-07-01T00:00:00Z`). There is no `time_range` object and no `relative:` shorthand - compute the absolute window yourself.

---

## Query tiers - funnel before raw

Spend from the top down:

- **Tier 1, lightweight scoping:** `resolve_scope`, `list_fields`. Fix `org_ids` and fleet directory (agents, ingest keys, verdicts). Do this before backing scans.
- **Tier 1b, billed discovery:** `list_sources`, `query_scope_activity`, `describe_pattern` (stats). Confirm data in window, enumerate structure, read pattern detail. See `scope-resolution.md` and `scope-ladder.md`.
- **Tier 2, counts by severity:** `query_event_counts_by_severity`. Counts matching events by severity, optionally bucketed over time and/or grouped by field values. The workhorse for "what's happening" and the only tool that answers "when" - it tells you where and when to point `query_logs`. Group by a scope-ladder field (`service`, `app`, `subsource`, `category`, `pattern`, or a `_hash`) to localize before drilling - see `scope-ladder.md`.
- **Tier 3, raw events (last resort):** `query_logs`, only after Tiers 1-2 narrowed the window and filter. Then `refine_query_result` (lightweight) over that cached slice - do NOT re-scan.

`refine_query_result` and the default `get_query_metadata` are lightweight - they run against the cache. Backing scans (`query_logs`, `query_event_counts_by_severity`, and the opt-in `get_query_metadata` deep discovery) touch the underlying source and take meaningfully longer.

---

## Reach for this when

One trigger per tool. If your question is not on this list, it is almost always a
`query_event_counts_by_severity` question.

| Tool | Reach for it when |
|---|---|
| `resolve_scope` | You have a name (client, host, ticket) and need an `org_id`. Always first. |
| `list_sources` | Before concluding anything from an absence: did this source send data in THIS window? |
| `query_device_health` | You need standing condition, what is installed or mounted, or which devices reported nothing. State, not sequence. |
| `query_event_counts_by_severity` | "What is going on here", at any altitude. The default tool. `group_by=["reason"]` or `["pattern"]`; pass two fields when the question has two nouns in it. |
| `query_logs` | The grouping pointed somewhere specific and you now need the actual events. Last resort, over a narrowed filter. |
| `refine_query_result` | You already pulled a slice and want a different view of it. Free; never re-scans the source. |
| `describe_pattern` | You are about to cite a pattern and need its text and spread. Pass `pattern_hashes` (a list). Required before citing any teaser pattern. |
| `query_scope_activity` | You do not know what this client HAS: which apps, services and subsources exist at all. Orientation on an unfamiliar estate. |
| `get_query_metadata` | A cached result behaved oddly and you need its schema, filter or cache status. |
| `list_fields` | Rarely. See below. |
| `server_info` | A call failed and you need to know whether region, transport or auth is the problem. |

**Two honest demotions.** Both tools below exist and work; neither is where you should start.

- **`list_fields` is usually the wrong way to learn a source's vocabulary.** It returns a field
  catalog, which is a list of names with no sense of what matters. `query_event_counts_by_severity` on
  `reason` or `pattern` tells you what the source is actually SAYING, ranked by volume, in one call
  that also advances the investigation. Reach for `list_fields` when you need a field that the data
  you have already seen did not surface, which is a real but narrow case.
- **`get_query_metadata`'s deep discovery (`top_n` / `field_match`) is a full catalog scan.** The
  inline response schema on every query already names the columns and their fill rates. Use the deep
  mode when that is genuinely not enough, not as a routine step.

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
  rmm_client_id: "...",          # optional EXACT match; the correct path for automated per-ticket scoping
  psa_client_id: "...",          # optional EXACT match; same
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
-> rows: agent_id, collector_kind, name, verdict, source, event_count, cnt_interesting, one cnt_<band> per failure-side severity band, distinct_interesting, bytes_ingested, first/last_event_at
-> summary may include top_interesting_patterns; call describe_pattern before citing
```

**Use the investigation's actual window.** Do NOT infer scope from recent heartbeat alone.

**Use cases:**
- **Scope discovery:** confirm expected collector/source pairs have events; cross-check `verdict` (stuck/offline halt rules in `scope-resolution.md`).
- **Fleet enumeration:** list collector/origin pairs in the window.
- **Triage:** `cnt_interesting` and the failure-side band counts (`cnt_warning` through `cnt_critical_plus`) before deep queries. The nine bands, and the four spellings a severity shows up under, are mapped in `category-classes.md`.
- **Critical+ fetch-first:** any non-zero `cnt_critical_plus` (severity >= 20) in scope means fetch
  those events before proceeding, whatever the investigation topic (`category-classes.md`, Query
  notes).

---

### `query_scope_activity`

Discover app / service / subsource structure via cheap discovery scan. **Not LQL-filtered** (cheap steering). For counts within an LQL slice, use `query_event_counts_by_severity`.

```
query_scope_activity(
  org_ids: ["..."],
  start: "...",
  end: "...",
  agent_ids: ["..."],              # optional collector UUIDs
  source: "hostname-substring",    # optional
  field_match: {mode, pattern},    # optional name grep over ladder dims
  include_sub_orgs: true,          # default true
  include_top_interesting_patterns: true,
  external_investigation_id: "..."
)
-> rows: agent_id, source, app, service, subsource, triage columns, first/last_event_at
```

See `scope-ladder.md` for when to reach for this instead of `query_event_counts_by_severity`.

---

### `query_device_health`

Latest curated device state: monitor rows for conditions, inventory rows for what is on the box.
**Supporting evidence, not the entry point.** Reach for it when you are about to conclude something
from an absence and need to know whether the agent was observing.

```
query_device_health(
  org_ids: ["..."],
  start: "...",                             # REQUIRED
  end: "...",                               # REQUIRED, exclusive
  include_sub_orgs: true,                   # default true
  agent_ids: ["..."],                       # optional collector UUIDs
  fieldset: "rca" | "fleet" | "minimal",    # rca is the default
  add_fields: ["..."],                      # optional; ADDS to the fieldset, never replaces it
  kinds: ["inventory", "monitor"],          # default; agent_op and delta are opt-in
  reasons: ["..."],                         # optional, filter to named conditions
  min_severity: 13,                         # optional integer floor on the ladder
  group_by_reason: false,                   # true returns the fleet shape of each reason
  external_investigation_id: "..."
)
-> data rows keyed by `kind`; silent devices as separate `row_kind=silent_device` rows
```

**Use cases:**
- **Honesty check:** was this device reporting during the window, and are its episode spans
  trustworthy? Read `episode_age_basis`, `episode_clear_time_basis`, `window_partial`.
- **What is on the box:** inventory rows. Keep `inventory` in `kinds`; those rows normally carry no
  class at all, and they are the ground truth an RCA needs. `CONTEXT` is the absence of a class, not
  a filterable value.
- **Fleet shape of a condition:** `group_by_reason: true`. **Grouped mode takes no `fieldset` and no
  `add_fields`:** it returns fixed per-reason columns, not device rows, so there is no projection to
  choose. Passing `add_fields` alongside it is an error; passing `fieldset` does nothing. Pick the
  fieldset only on the row-mode call.

**Read before using:** `device-state-fields.md` for the column names, the honesty fields, and what
you may and may not say about a duration or a clear time. Two traps live there: the silent-device
list can TRUNCATE while the response summary stays honest, and silence is not evidence of health.

---

### `describe_pattern`

Pattern detail for one or more patterns. The parameter is **`pattern_hashes`, a LIST**, even when you have one hash: `pattern_hash` (singular) is the FIELD name on an event row, not the parameter name. **Call before citing any `top_interesting_patterns` teaser row.**

```
describe_pattern(
  org_ids: ["..."],
  start: "...",
  end: "...",
  pattern_hashes: ["..."],           # REQUIRED; order = your priority, examples cover roughly the first 25
  include_sub_orgs: true,            # default true
  include_examples: true,            # default true; false for stats only. There is no per-pattern sample count to set
  external_investigation_id: "..."
)
-> pattern text; stats (`event_count`, `cnt_interesting`, one count per failure-side severity band, first/last seen, affected collectors and sources); diverse example messages with recurrence `count`/`seen_at`. The summary's `severity_bands` is an ORDERED array of `{band, count}` carrying only the bands that occurred, so a band missing from it is a band this pattern never reached. Example COUNTS are chosen server-side for diversity, and examples are returned for roughly your first 25 patterns by list order, so list the highest-interest hashes first. Examples need `mcp:query`; without it the response is stats-only, never an error.
```

**Examples are server-chosen, diverse, and truthful.** You do not pick counts: the server returns a text-diverse set of example messages per pattern (not just the most recent), sized to fit the response. List your highest-interest `pattern_hashes` FIRST: examples cover roughly the first 25 by list order; the rest get stats only (the scope line says so). Each example carries `count`, `[first, last]`, and (when it recurred 3+ times) `seen_at`: times this exact message recurred, identical except embedded timestamps.

**Access tiers:** stats work on `mcp:observe`; examples additionally need query authority. If the token lacks it (or the workspace trial has expired), the call succeeds with stats only (no error) and the scope line names the reason: do not retry; read the stats and, when relevant, tell the engineer why examples are missing (e.g. expired trial).

---

### `list_fields`

Field catalog over a source and window. **Rarely the right call.** A catalog of names does not tell you which fields carry the answer; a grouping on `reason` or `pattern` does, and it moves the investigation forward at the same time. Reach for this when you need a field the data you have already read did not surface. To inspect fields WITHIN a cached result, use `get_query_metadata`.

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

**Common mistake:** running this as the first MCP call and filling context with field names that do not matter for this investigation.

---

### `query_event_counts_by_severity`

Count of matching events by severity, optionally bucketed over time and/or grouped by field values.
The workhorse for "what's happening" questions, and the only tool that answers "when".

```
query_event_counts_by_severity(
  org_ids: ["..."],
  start: "...",
  end: "...",
  include_sub_orgs: true,
  group_by: ["pattern" | "source" | "service" | "app" | "subsource" | "category" | "<field>_hash" | "<custom.field>"],   # one field ranks its values; 2-3 cross-tab. Omit to count the whole population
  bucket: "30s" | "5m" | "1h" | "6h" | "1d",   # optional; a TIME SERIES instead of a flat ranking. At most one group_by field with it
  lql: "...",                      # optional LQL filter applied before grouping
  limit: 50,                       # max distinct groups returned, by event count (default 50, hard cap 10000)
  external_investigation_id: "..."
)
-> rows: {<group_by values and/or bucket>, event_count, one cnt_<band> per band present}   # dense TSV
```

**Severity is never separable from volume here.** Every row carries `event_count` plus the band counts,
in the flat ranking and in the series alike, so "how much" and "how bad" arrive together. A band is a
column only when it occurred somewhere in the result: a zero is an observed zero, and a missing column
is a band this result never saw. See `category-classes.md` for the nine bands.

**`bucket` answers WHEN, before you pull raw events.** Did this stream stop, when did the storm start,
is the rate rising. Add one `group_by` field for one series per value: `bucket="1h"` with
`group_by=["source"]` shows which host stopped reporting and at what hour, which a flat ranking cannot
show at all. Two things to read carefully. The series is DENSE, so an empty bucket comes back as an
explicit zero and a gap is a run of zeros rather than rows you have to notice are missing - until the
scan is sampled, where a count too small to tell from none renders as `<N`, zeros included, and
`summary.scope` says the series cannot be read for gaps below that bound. And it
always covers the whole window: when the window holds more buckets than one response carries, the
server widens the bucket and `summary.scope` states both widths, so read the width you got rather
than the width you asked for.

**Sampled counts:** a scan too large to read in full is sampled rather than refused, and `summary.scope` then states a DETECTION FLOOR once for the whole response. Below it a cell reads `<N`, meaning fewer than about N events rather than NONE. At or above it a cell is an integer rounded to the significant digits its sample supports: an estimate, never an exact figure. The cell tells you which one you are reading, so quote it as it came. Narrow the window or filter for exact counts. Same treatment on `query_logs` grounding totals.

**Use cases:**
- "What patterns appeared most?" -> `group_by=["pattern"]`.
- "Which sources show this?" -> filter on a `pattern_hash` in `lql`, `group_by=["source"]`.
- "Which component is noisiest?" -> `group_by=["service"]` or `["subsource"]`, then narrow with a second call - see the scope ladder (`scope-ladder.md`).
- "When did it start, and did it stop?" -> `bucket="1h"`, optionally with one `group_by` field.
- "Which reason, on which machines?" -> `group_by` with two fields (reason by instance, config-change type by target). One call answers what two single-field passes only hint at, because the pairing is what carries the shape.

**A cross-tab counts a smaller population than you asked for.** With one `group_by` field a catch-all
row holds everything past `limit`, so `total_count` is the whole matched population. With two or three
there is no catch-all, and any event where one of the grouped fields is ABSENT is excluded outright,
with no row to mark it: `sparklogs.instance` is null on a host-scoped reason, so those events vanish
from a reason-by-instance cross-tab. Read `summary.scope` for how many combinations came back, and
group on the field alone when you need the null side.

**Grouped output is not a refinable cache.** Calling `refine_query_result` on its `query_id` returns expired. Read grouped results directly. If a grouped result is truncated, follow its hint (narrow the `lql`/window and re-run). To then pull raw events for an interesting group, run `query_logs` with that group's value in `lql` (use the `*_hash` verbatim for the six hash fields).

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
  select: [...],                   # REPLACES the projection; response-only, cache keeps full width. Set explicitly.
  external_investigation_id: "..."
)
-> header (query_id, query_url, summary, schema, lookups, page) + one page of events (JSONL)

**There is no `limit`.** The response carries ONE PAGE, sized by the server, not the whole match.
`summary` reports the matched TOTAL, so read that rather than counting rows. Further pages come from
`refine_query_result` against the returned `query_id`, never from re-running this tool.
```

**Use cases:**
- Last-resort raw event retrieval AFTER aggregation narrowed to a specific small set.
- Level-3 ground-truth reads with an explicit `select`.
- "Show me events with this filter" when aggregation isn't useful (e.g. one specific event you want to see in detail).

**Then refine, don't re-query.** Pull ONE broad-enough slice; use `refine_query_result` for every other view of it. To page a partial result, follow the response's `page.next`.

**Common mistakes:**
- Reaching for this first. Aggregation first.
- Omitting `select` (returns the standard set; usually too much).
- Reading Level 3 by default.
- Forgetting `external_investigation_id`.

---

### `refine_query_result`

An in-cache relational engine over a `query_logs` result. Meaningfully faster than a backing query; never re-touches the source.

```
refine_query_result(
  query_id: "...",                 # from a prior query_logs result
  filter_lql: "...",               # WHERE over the cached table's ROW columns
  group_by: [ {"col": "severity"} ],          # LIST OF OBJECTS; present => aggregation, absent => row slice
  aggregate: [ {"fn": "count", "col": "*", "as": "hits"} ],   # fn in count/count_distinct/sum/avg/min/max/stddev/p50/p90/p95/p99
  having_lql: "...",               # HAVING over POST-GROUP columns (group + aggregate aliases)
  order_by: [ {"col": "hits", "dir": "desc"} ],   # LIST OF OBJECTS; col may be a group column or an aggregate alias
  select: [...],                   # row-mode projection
  limit: 500,
  offset: 0,                       # deterministic paging of the transformed output
  sample: {n: ..., method: ...},   # optional row-mode down-sampling (see restrictions below)
  external_investigation_id: "..."
)
-> same envelope shape as query_logs (dense TSV for grouped/projected output)
```

**The central efficiency lever.** Queue one broad slice, then refine many times against the same `query_id`. Multiple refines are encouraged; each is an independent view over that same cached slice.

**A refine response keeps the `query_id` you gave it.** Refined output is not a separate cache: run every further refine against the original `query_logs` `query_id`. On refine responses, `page.rows_cached` means rows in that underlying cache, not the size of your transformed output.

**Pagination:** repeat the SAME refine arguments and change only `offset`. A partial page's `page.next` hands the full continuation back (your arguments + the next `offset`); follow it verbatim.

**Binding rule:** `filter_lql` resolves against the cached table's ROW columns (see the response schema descriptor for the vocabulary); `having_lql` resolves against the POST-GROUP columns (group + aggregate aliases).

**Sample restrictions:** `sample` is row mode only; combining it with `group_by`/`aggregate`/`having_lql` is rejected (a sampled aggregate would look exact without being exact). Sampled paging is approximate: each call may select a different subset.

**Cache expiry:** a cold cache (roughly a day old) regenerates automatically under the SAME `query_id` when you refine it (the header's cache status reflects it). Grouped results remain non-refinable (re-run the grouped call). If the server reports the cache cannot be restored, re-issue the original backing query.

**`group_by` and `order_by` items are OBJECTS, not bare column names.** Passing a string is the most
common way to lose a turn here. Two worked shapes:

```
# distribution over a cached slice
refine_query_result(query_id="<qid>",
  group_by=[{"col": "severity"}],
  aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
  external_investigation_id="<id>")

# same, densest first
refine_query_result(query_id="<qid>",
  group_by=[{"col": "source"}],
  aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
  order_by=[{"col": "hits", "dir": "desc"}],
  external_investigation_id="<id>")
```

`order_by` accepts a group column or an aggregate alias; `dir` is `asc` or `desc`. Group on the
STANDARD columns (`severity`, `source`, `subsource`, `app`, `service`, `pattern`, `t`); grouping on
a custom field is not reliable today. Time bucketing is not currently usable: state a time question
as a narrower window plus a count instead.

**Common patterns:**
- After a broad raw scan, filter per-subsource to drill into specific categories.
- Group the cached slice to get a distribution without a new backing scan.
- Page a large slice via `offset` following `page.next`.

---

### `get_query_metadata`

Cache and field introspection over a cached `query_id`.

```
get_query_metadata(
  query_id: "...",
  top_n: 500,                      # OPT-IN deep discovery: ranked custom-field list. Full catalog scan of the source.
  field_match: {mode: "equals"|"contains"|"regex", pattern: "..."},   # OPT-IN deep discovery: grep custom field NAMES. Full catalog scan.
  external_investigation_id: "..."
)
-> bookkeeping (schema, custom_source, stats, cache status, tie-breaker/sort); or, with top_n/field_match, a ranked/matched custom-field list
```

**The default call is cheap** (bookkeeping only, no backing scan). **`top_n` / `field_match` deep discovery is a full catalog scan of the source** scoped to the cached query's window + orgs - use deliberately, only when the inline response schema isn't enough.

**Use cases:**
- Cache introspection after a query.
- Deep custom-field discovery within a specific cached result (distinct from `list_fields`, which builds NEW queries over a source).

---

### `server_info`

```
server_info()
```

Static server metadata (name, version, region, transport) plus the authenticated workspace id. No
query, no billing. Use it to confirm which region and workspace you are talking to before citing
anything, or when a call fails and you need to know whether the transport and auth are the problem.

**It takes no parameters, and it REJECTS `external_investigation_id`.** It is the one exception to
the pass-the-id-everywhere rule: there is no scope and no query to correlate.

---

## Common call sequences (recipes)

### Recipe: "Investigate <single source> for <symptom>"

```
1. resolve_scope(<source description>)
2. list_sources with the investigation's start/end, filtered to source - confirm data in window
3. query_event_counts_by_severity group_by=["pattern"] - what's happening, by severity
4. query_logs over the narrowed window/filter - primary cache
5. Multiple refine_query_result per subsource / field of interest
6. query_logs ingest-health check (subsource in ingest_drop/spool_full/backpressure)
7. get_query_metadata on any cache whose schema or status needs a check
8. system condition summary output
```

### Recipe: "Is this just us? Fleet pivot from a specific pattern"

```
1. resolve_scope(<msp / org scope>)
2. query_event_counts_by_severity with lql filtering to the pattern_hash, group_by=["source"]
3. Optional: query_logs + refine for first/last seen per source
4. get_query_metadata
5. system condition summary output (concise - this is a quick-pivot pattern)
```

### Recipe: "What changed?"

```
1. resolve_scope
2. list_sources
3. query_event_counts_by_severity group_by=["pattern"] over window A (e.g. incident window)
4. query_event_counts_by_severity group_by=["pattern"] over window B (e.g. prior baseline)
5. Compare the two grouped results - new / disappeared / accelerated patterns
6. query_logs over the changed pattern if you need to see actual events
7. get_query_metadata
8. system condition summary output
```

---

## Tool selection failure modes

**Reaching for `query_logs` first.** Aggregation first. Almost always.

**Skipping `list_sources`.** Source might not have data in the investigation's window. Always confirm with `list_sources` scoped to the investigation's `start`/`end`.

**Refining a grouped result.** `query_event_counts_by_severity` output is not refinable; it returns expired. Read it directly or pull raw events with `query_logs`.

**Re-scanning instead of refining.** After ONE broad `query_logs` slice, use `refine_query_result` for other views - it's a cache lookup, not a fresh scan.

**Showing a `*_hash` id to a human.** Resolve it via the header `lookups` first. Use the hash verbatim only as a drill-down filter value.

**Not setting `external_investigation_id`.** Audit trail breaks. Always set it.

---

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff`** ("what changed between two windows") -> run `query_event_counts_by_severity` over each window (`group_by=["pattern"]`) and compare the two grouped results.
- **`compare_populations`** ("what's different about broken vs working") -> run `query_event_counts_by_severity` over each population separately (via distinct `lql`) and compare.
- **`cluster_event_contexts`** ("distinct contexts around these events") -> `query_logs` narrowed to the pattern, then `refine_query_result` group_by to cluster.
