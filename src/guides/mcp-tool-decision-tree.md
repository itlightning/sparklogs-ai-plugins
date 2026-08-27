# MCP Tool Decision Tree

Per-tool detailed usage with parameter notes, decision tree for which tool to use when, and worked-example call sequences.

The MCP server instructions define every term used here, in learning order. This file adds per-tool mechanics on top of them rather than restating them.

The tool surface is these **eleven** tools: `resolve_scope` (tool), `list_sources` (tool), `query_scope_activity` (tool), `query_device_health` (tool), `describe_pattern` (tool), `list_fields` (tool), `query_event_counts_by_severity` (tool), `query_logs` (tool), `refine_query_result` (tool), `get_query_metadata` (tool), `server_info` (tool). Three differential tools (`query_period_diff`, `compare_populations`, `cluster_event_contexts`) are fast-follow; see the bottom of this file for v1 equivalents.

**Every scoped or data tool takes `external_investigation_id` (arg)** (REQUIRED on all of them except
`server_info` (tool), which takes NO parameters at all and REJECTS an id; a friendly, human-meaningful correlation handle you supply, 8-200 chars free text, e.g. `investigate-ticket-1234-disk-errors` - not a generated hash. Reusing the same value RESUMES that investigation; use a fresh, distinctive value to start a new one; tagged on every call).
**Time windows are flat `start` (arg) / `end` (arg) in RFC3339 UTC** (e.g. `2026-07-01T00:00:00Z`). There is no `time_range` object and no `relative:` shorthand - compute the absolute window yourself.

---

## Query tiers - funnel before raw

Spend from the top down:

- **Tier 1, lightweight scoping:** `resolve_scope` (tool), `list_fields` (tool). Fix `org_ids` (arg) and the fleet directory (orgs, agents, ingest keys, and the agent state readings). Do this before backing scans.
- **Tier 1b, billed discovery:** `list_sources` (tool), `query_scope_activity` (tool), `describe_pattern` (tool) (stats). Confirm data in window, enumerate structure, read pattern detail. See `scope-resolution.md` and `scope-ladder.md`.
- **Tier 2, counts by severity:** `query_event_counts_by_severity` (tool). Counts matching events by severity, optionally bucketed over time and/or grouped by field values. The workhorse for "what's happening" and the only tool that answers "when" - it tells you where and when to point `query_logs` (tool). Group by a scope-ladder field (`service` (LQL), `app` (LQL), `subsource` (LQL), `category` (LQL), `pattern` (LQL), or a `_hash`) to localize before drilling - see `scope-ladder.md`.
- **Tier 3, raw events (last resort):** `query_logs` (tool), only after Tiers 1-2 narrowed the window and filter. Then `refine_query_result` (tool) (lightweight) over that cached slice - do NOT re-scan.

`refine_query_result` (tool) and the default `get_query_metadata` (tool) are lightweight - they run against the cache. Backing scans (`query_logs` (tool), `query_event_counts_by_severity` (tool), and the opt-in `get_query_metadata` (tool) deep discovery) touch the underlying source and take meaningfully longer.

---

## Reach for this when

One trigger per tool. If your question is not on this list, it is almost always a
`query_event_counts_by_severity` (tool) question.

| Tool | Reach for it when |
|---|---|
| `resolve_scope` (tool) | You have a name (client, host, ticket) and need an `org_id`. Always first. |
| `list_sources` (tool) | Before concluding anything from an absence: did this source send data in THIS window? |
| `query_device_health` (tool) | You need standing condition, what is installed or mounted, or which devices reported nothing. State, not sequence. |
| `query_event_counts_by_severity` (tool) | "What is going on here", at any altitude. The default tool. `group_by=["reason"]` or `["pattern"]`; pass two fields when the question has two nouns in it. |
| `query_logs` (tool) | The grouping pointed somewhere specific and you now need the actual events. Last resort, over a narrowed filter. |
| `refine_query_result` (tool) | You already pulled a slice and want a different view of it. Free; never re-scans the source. |
| `describe_pattern` (tool) | You are about to cite a pattern and need its text and spread. Pass `pattern_hashes` (arg) (a list). Required before citing any teaser pattern. |
| `query_scope_activity` (tool) | You do not know what this client HAS: which apps, services and subsources exist at all. Orientation on an unfamiliar estate. |
| `get_query_metadata` (tool) | A cached result behaved oddly and you need its schema, filter or cache status. |
| `list_fields` (tool) | A field name you have not seen yet. Catalog, not the first grouping call. |
| `server_info` (tool) | A call failed and you need to know whether region, transport or auth is the problem. |

**Two honest demotions.** Both tools below exist and work; neither is where you should start.

- **`list_fields` (tool) is a catalog, not the explore ladder.** It returns field names with fill counts.
  `query_event_counts_by_severity` (tool) on `sparklogs.reason` (LQL) or `pattern` (LQL) tells you what the source is SAYING.
  Reach for `list_fields` (tool) when you need a name the data you have already seen did not surface.
  Discovery omits unstable process-id map paths (`sparklogs.data.processes.<pid>...`); service and
  similar instance keys can remain. Device-state explore: `guides/stream-kinds/device-state.md`.
- **`get_query_metadata` (tool)'s deep discovery (`top_n` (arg) / `field_match` (arg)) is a full catalog scan.** The
  inline response schema on every query already names the columns and their fill rates. Use the deep
  mode when that is genuinely not enough, not as a routine step.

---

## Per-tool detail

### `resolve_scope` (tool)

Always first. Turn natural-language scope into `org_ids` (arg), and enumerate orgs, SparkLogs Agents, and ingest keys in scope.

```
resolve_scope(
  query: "Acme Dental" | "srv-fileshare01",   # optional; ranked match on org names and agent name/reported_hostname (exact/prefix/word/substring). Omit to list everything in scope.
  org_ids: ["..."],              # optional; omit for all orgs the token can access
  include_agents: true,          # default true; includes agents AND ingest keys
  include_sub_orgs: true,        # default true; expand each org to its sub-org subtree
  rmm_client_id: "...",          # optional EXACT match; the correct path for automated per-ticket scoping
  psa_client_id: "...",          # optional EXACT match; same
  device_classes: ["..."],       # optional; filter devices by reported class rather than guessing from hostnames
  device_roles: ["..."],         # optional; same, by reported role
  external_investigation_id: "..."
)
-> rows: kind org | agent | ingest_key; match_kind when query set; agent rows include agent_status,
   stuck_reason, the collection group (collection_status, collection_reasons, collection_feeds, collection_observed_at),
   advisories, agent_complete_through, last_data_at, last_heartbeat_at, reported_hostname, versions, OS
```

**Decision logic:**
- One row with `match_kind` (col) **`exact` (value)**: proceed.
- Multiple rows at the same best `match_kind` (col): ask the engineer; don't guess.
- Sole match at `prefix` (value)/`word` (value)/`substring` (value): confirm before proceeding.
- Zero matches: surface closest candidates.

**Read the state readings as SUPPORTING context, never as a work queue.** `agent_status` (col) (is the agent there) and `collection_status` (col) (is it collecting) are two separate readings and are never merged into one statement; `offline` (value) means no signal was received, cause unknown, not that the machine is down. The collection group is what the device last reported, kept and dated even when the device is offline. `agent_complete_through` (col) and `advisories` (col) say how far the data can be trusted. Field-by-field detail and the halt rules are in `scope-resolution.md`.

**`device_classes` (arg) / `device_roles` (arg) beat hostname guessing.** A workstation named `srv-laptop` is how a hostname guess puts the wrong device in a server answer. Both vocabularies are open; an unfamiliar value is the device's own word for itself, and a device with no reported class matches no `device_classes` (arg) filter.

**Common mistake:** skipping this and assuming scope from wording. Engineers use ambiguous short names; resolve.

---

### `list_sources` (tool)

Per **(sender `agent_id` (LQL), origin `source` (LQL))** activity in the investigation window. Billed backing scan.

```
list_sources(
  org_ids: ["..."],
  start: "2026-07-01T00:00:00Z",   # REQUIRED
  end: "2026-07-02T00:00:00Z",     # REQUIRED, exclusive
  include_sub_orgs: true,          # default true
  include_top_interesting_patterns: true,   # default true; summary teaser ~8 patterns
  external_investigation_id: "..."
)
-> rows: agent_id, sent_via, name, agent_status, source, event_count, cnt_interesting, one cnt_<band> per failure-side severity band, distinct_interesting, bytes_ingested, first/last_event_at
-> summary may include top_interesting_patterns; call describe_pattern before citing
```

**Use the investigation's actual window.** Do NOT infer scope from recent heartbeat alone.

**These columns count events; they never establish coverage.** `event_count` (col) with `first_event_at` (col) and `last_event_at` (col) is consistent with any amount of missing middle, so no row here supports "no gaps" or "continuous coverage". Completeness comes from `agent_complete_through` (col) on `resolve_scope` (tool) and the feed reports behind it, or it is not claimed. `sent_via: ingest_key` makes no completeness claim at all.

**Use cases:**
- **Scope discovery:** confirm expected sender/source pairs have events; cross-check the agent row's state readings (halt rules in `scope-resolution.md`).
- **Fleet enumeration:** list sender/origin pairs in the window.
- **Triage:** `cnt_interesting` (col) and the failure-side band counts (`cnt_warning` (col) through `cnt_critical_plus` (col)) before deep queries. The nine bands, and the four spellings a severity shows up under, are mapped in `category-classes.md`.
- **Critical+ fetch-first:** any non-zero `cnt_critical_plus` (col) (severity >= 20) in scope means fetch
  those events before proceeding, whatever the investigation topic (`category-classes.md`, Query
  notes).

---

### `query_scope_activity` (tool)

Discover app / service / subsource structure via cheap discovery scan. **Not LQL-filtered** (cheap steering). For counts within an LQL slice, use `query_event_counts_by_severity` (tool).

```
query_scope_activity(
  org_ids: ["..."],
  start: "...",
  end: "...",
  agent_ids: ["..."],              # optional sender UUIDs
  source: "hostname-substring",    # optional
  field_match: {mode, pattern},    # optional name grep over ladder dims
  include_sub_orgs: true,          # default true
  include_top_interesting_patterns: true,
  external_investigation_id: "..."
)
-> rows: agent_id, source, app, service, subsource, triage columns, first/last_event_at
```

See `scope-ladder.md` for when to reach for this instead of `query_event_counts_by_severity` (tool).

---

### `query_device_health` (tool)

Latest curated device state: monitor rows for conditions, inventory rows for what is on the box.
**Supporting evidence, not the entry point.** Reach for it when you are about to conclude something
from an absence and need to know whether the agent was observing.

```
query_device_health(
  org_ids: ["..."],
  start: "...",                             # REQUIRED
  end: "...",                               # REQUIRED, exclusive
  include_sub_orgs: true,                   # default true
  agent_ids: ["..."],                       # optional sender UUIDs
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
  trustworthy? Read `episode_age_basis` (col), `episode_clear_time_basis` (col), `window_partial` (col).
- **What is on the box:** inventory rows. Keep `inventory` (value) in `kinds` (arg); those rows normally carry no
  class at all, and they are the ground truth an RCA needs. `CONTEXT` is the absence of a class, not
  a filterable value.
- **Fleet shape of a condition:** `group_by_reason: true`. **Grouped mode takes no `fieldset` (arg) and no
  `add_fields` (arg):** it returns fixed per-reason columns, not device rows, so there is no projection to
  choose. Passing `add_fields` (arg) alongside it is an error; passing `fieldset` (arg) does nothing. Pick the
  fieldset only on the row-mode call.

**Read before using:** `device-state-fields.md` for the column names, the honesty fields, and what
you may and may not say about a duration or a clear time. Two traps live there: the silent-device
list can TRUNCATE while the response summary stays honest, and silence is not evidence of health.

**This tool does not answer completeness.** Device state says what conditions the device reported;
how far its data is complete is `agent_complete_through` (col) and the advisories beside it on
`resolve_scope` (tool).

---

### `describe_pattern` (tool)

Pattern detail for one or more patterns. The parameter is **`pattern_hashes` (arg), a LIST**, even when you have one hash: `pattern_hash` (LQL) (singular) is the FIELD name on an event row, not the parameter name. **Call before citing any `top_interesting_patterns` (col) teaser row.**

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
-> pattern text; stats (`event_count`, `cnt_interesting`, one count per failure-side severity band, first/last seen, affected senders and sources); diverse example messages with recurrence `count`/`seen_at`. The summary's `severity_bands` is an ORDERED array of `{band, count}` carrying only the bands that occurred, so a band missing from it is a band this pattern never reached. Example COUNTS are chosen server-side for diversity, and examples are returned for roughly your first 25 patterns by list order, so list the highest-interest hashes first. Examples need `mcp:query`; without it the response is stats-only, never an error.
```

**Examples are server-chosen, diverse, and truthful.** You do not pick counts: the server returns a text-diverse set of example messages per pattern (not just the most recent), sized to fit the response. List your highest-interest `pattern_hashes` (arg) FIRST: examples cover roughly the first 25 by list order; the rest get stats only (the scope line says so). Each example carries `count`, `[first, last]`, and (when it recurred 3+ times) `seen_at`: times this exact message recurred, identical except embedded timestamps.

**Access tiers:** stats work on `mcp:observe`; examples additionally need query authority. If the token lacks it (or the workspace trial has expired), the call succeeds with stats only (no error) and the scope line names the reason: do not retry; read the stats and, when relevant, tell the engineer why examples are missing (e.g. expired trial).

---

### `list_fields` (tool)

Field catalog over a source and window. Use when you need a **name** the rows you already read did not surface.
It does not rank what matters; grouping on `sparklogs.reason` (LQL) or `pattern` (LQL) does. Discovery omits unstable process-id map paths (`guides/stream-kinds/device-state.md`). To inspect fields WITHIN a cached result, use `get_query_metadata` (tool).

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

**Common mistake:** grouping or filtering on every catalog path instead of the stream-kind ladder.

---

### `query_event_counts_by_severity` (tool)

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

**Severity is never separable from volume here.** Every row carries `event_count` (col) plus the band counts,
in the flat ranking and in the series alike, so "how much" and "how bad" arrive together. A band is a
column only when it occurred somewhere in the result: a zero is an observed zero, and a missing column
is a band this result never saw. See `category-classes.md` for the nine bands.

**`bucket` (arg) answers WHEN, before you pull raw events.** Did this stream stop, when did the storm start,
is the rate rising. Add one `group_by` (arg) field for one series per value: `bucket="1h"` with
`group_by=["source"]` shows which host stopped reporting and at what hour, which a flat ranking cannot
show at all. Two things to read carefully. The series is DENSE, so an empty bucket comes back as an
explicit zero and a quiet stretch is a run of zeros rather than rows you have to notice are missing -
until the scan is sampled, where a count too small to tell from none renders as `<N`, zeros included,
and `summary.scope` (col) says the series cannot be read for quiet stretches below that bound. A run of
zeros is a statement about what ARRIVED, never a completeness claim: it does not distinguish a quiet
machine from one that stopped collecting, and only the agent's own feed reports do. And it
always covers the whole window: when the window holds more buckets than one response carries, the
server widens the bucket and `summary.scope` (col) states both widths, so read the width you got rather
than the width you asked for.

**Sampled counts:** a scan too large to read in full is sampled rather than refused, and `summary.scope` (col) then states a DETECTION FLOOR once for the whole response. Below it a cell reads `<N`, meaning fewer than about N events rather than NONE. At or above it a cell is an integer rounded to the significant digits its sample supports: an estimate, never an exact figure. The cell tells you which one you are reading, so quote it as it came. Narrow the window or filter for exact counts. Same treatment on `query_logs` (tool) grounding totals.

**Use cases:**
- "What patterns appeared most?" -> `group_by=["pattern"]`.
- "Which sources show this?" -> filter on a `pattern_hash` (LQL) in `lql` (arg), `group_by=["source"]`.
- "Which component is noisiest?" -> `group_by=["service"]` or `["subsource"]`, then narrow with a second call - see the scope ladder (`scope-ladder.md`).
- "When did it start, and did it stop?" -> `bucket="1h"`, optionally with one `group_by` (arg) field.
- "Which reason, on which machines?" -> `group_by` (arg) with two fields (reason by instance, config-change type by target). One call answers what two single-field passes only hint at, because the pairing is what carries the shape.

**A cross-tab counts a smaller population than you asked for.** With one `group_by` (arg) field a catch-all
row holds everything past `limit` (arg), so `total_count` is the whole matched population. With two or three
there is no catch-all, and any event where one of the grouped fields is ABSENT is excluded outright,
with no row to mark it: `sparklogs.instance` (LQL) is null on a host-scoped reason, so those events vanish
from a reason-by-instance cross-tab. Read `summary.scope` (col) for how many combinations came back, and
group on the field alone when you need the null side.

**Grouped output is not a refinable cache.** Calling `refine_query_result` (tool) on its `query_id` (arg) returns expired. Read grouped results directly. If a grouped result is truncated, follow its hint (narrow the `lql` (arg)/window and re-run). To then pull raw events for an interesting group, run `query_logs` (tool) with that group's value in `lql` (arg) (use the `*_hash` verbatim for the six hash fields).

---

### `query_logs` (tool)

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
- Level-3 ground-truth reads with an explicit `select` (arg).
- "Show me events with this filter" when aggregation isn't useful (e.g. one specific event you want to see in detail).

**Then refine, don't re-query.** Pull ONE broad-enough slice; use `refine_query_result` (tool) for every other view of it. To page a partial result, follow the response's `page.next` (col).

**Common mistakes:**
- Reaching for this first. Aggregation first.
- Omitting `select` (arg) (returns the standard set; usually too much).
- Reading Level 3 by default.
- Forgetting `external_investigation_id` (arg).

---

### `refine_query_result` (tool)

An in-cache relational engine over a `query_logs` (tool) result. Meaningfully faster than a backing query; never re-touches the source.

```
refine_query_result(
  query_id: "...",                 # from a prior query_logs result
  filter_lql: "...",               # WHERE over the cached table's ROW columns
  group_by: [ "severity" ],                   # bare column names, or objects for a bucket/alias; present => aggregation, absent => row slice
  aggregate: [ {"fn": "count", "col": "*", "as": "hits"} ],   # fn in count/count_distinct/sum/avg/min/max/stddev/p50/p90/p95/p99; `col: "*"` works with count only, every other fn needs a real column
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

**The central efficiency lever.** Queue one broad slice, then refine many times against the same `query_id` (arg). Multiple refines are encouraged; each is an independent view over that same cached slice.

**A refine response keeps the `query_id` (arg) you gave it.** Refined output is not a separate cache: run every further refine against the original `query_logs` (tool) `query_id` (arg). On refine responses, `page.rows_cached` means rows in that underlying cache, not the size of your transformed output.

**Pagination:** repeat the SAME refine arguments and change only `offset` (arg). A partial page's `page.next` (col) hands the full continuation back (your arguments + the next `offset` (arg)); follow it verbatim.

**Binding rule:** `filter_lql` (arg) resolves against the cached table's ROW columns (see the response schema descriptor for the vocabulary); `having_lql` (arg) resolves against the POST-GROUP columns (group + aggregate aliases).

**Sample restrictions:** `sample` (arg) is row mode only; combining it with `group_by` (arg)/`aggregate`/`having_lql` (arg) is rejected (a sampled aggregate would look exact without being exact). Sampled paging is approximate: each call may select a different subset.

**Cache expiry:** a cold cache (roughly a day old) regenerates automatically under the SAME `query_id` (arg) when you refine it (the header's cache status reflects it). Grouped results remain non-refinable (re-run the grouped call). If the server reports the cache cannot be restored, re-issue the original backing query.

**`group_by` (arg) takes bare column names; `order_by` (arg) items are OBJECTS.** A `group_by` (arg) term becomes an
object only when it carries a time bucket or an alias. Two worked shapes:

```
# distribution over a cached slice
refine_query_result(query_id="<qid>",
  group_by=["severity"],
  aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
  external_investigation_id="<id>")

# same, densest first
refine_query_result(query_id="<qid>",
  group_by=["source"],
  aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
  order_by=[{"col": "hits", "dir": "desc"}],
  external_investigation_id="<id>")
```

`order_by` (arg) accepts a group column or an aggregate alias; `dir` is `asc` or `desc`. Group on any
column the response's schema block lists: the standard ones (`severity` (LQL), `source` (LQL), `subsource` (LQL),
`app` (LQL), `service` (LQL), `pattern` (LQL), `t` (LQL)) and the dotted custom paths beside them (`sparklogs.reason` (LQL)).

**Time bucketing** groups a datetime column into fixed buckets, so one cached slice answers when
something happened without a second backing scan:

```
refine_query_result(query_id="<qid>",
  group_by=[{"time_bucket": {"col": "t", "bucket_usec": 3600000000}, "as": "hour"}],
  aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
  order_by=[{"col": "hour", "dir": "asc"}],
  external_investigation_id="<id>")
```

`bucket_usec` is microseconds (1h = 3600000000, 5m = 300000000). `col` defaults to the event
timestamp. Ascending order reads as a series; a run of low counts is where the stream thinned.

**Common patterns:**
- After a broad raw scan, filter per-subsource to drill into specific categories.
- Group the cached slice to get a distribution without a new backing scan.
- Page a large slice via `offset` (arg) following `page.next` (col).

---

### `get_query_metadata` (tool)

Cache and field introspection over a cached `query_id` (arg).

```
get_query_metadata(
  query_id: "...",
  top_n: 500,                      # OPT-IN deep discovery: ranked custom-field list. Full catalog scan of the source.
  field_match: {mode: "equals"|"contains"|"regex", pattern: "..."},   # OPT-IN deep discovery: grep custom field NAMES. Full catalog scan.
  external_investigation_id: "..."
)
-> bookkeeping (schema, custom_source, stats, cache status, tie-breaker/sort); or, with top_n/field_match, a ranked/matched custom-field list
```

**The default call is cheap** (bookkeeping only, no backing scan). **`top_n` (arg) / `field_match` (arg) deep discovery is a full catalog scan of the source** scoped to the cached query's window + orgs - use deliberately, only when the inline response schema isn't enough.

**Use cases:**
- Cache introspection after a query.
- Deep custom-field discovery within a specific cached result (distinct from `list_fields` (tool), which builds NEW queries over a source).

---

### `server_info` (tool)

```
server_info()
```

Static server metadata (name, version, region, transport) plus the authenticated workspace id. No
query, no billing. Use it to confirm which region and workspace you are talking to before citing
anything, or when a call fails and you need to know whether the transport and auth are the problem.

**It takes no parameters, and it REJECTS `external_investigation_id` (arg).** It is the one exception to
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

**Reaching for `query_logs` (tool) first.** Aggregation first. Almost always.

**Skipping `list_sources` (tool).** Source might not have data in the investigation's window. Always confirm with `list_sources` (tool) scoped to the investigation's `start` (arg)/`end` (arg).

**Refining a grouped result.** `query_event_counts_by_severity` (tool) output is not refinable; it returns expired. Read it directly or pull raw events with `query_logs` (tool).

**Re-scanning instead of refining.** After ONE broad `query_logs` (tool) slice, use `refine_query_result` (tool) for other views - it's a cache lookup, not a fresh scan.

**Reading coverage out of counts.** No count, bucket series, or first/last event bound establishes what happened in the middle of a window. `agent_complete_through` (col) and the feed reports behind it are the only completeness answer; without them the honest statement is that completeness was not established.

**Showing a `*_hash` id to a human.** Resolve it via the header `lookups` (col) first. Use the hash verbatim only as a drill-down filter value.

**Not setting `external_investigation_id` (arg).** Audit trail breaks. Always set it.

---

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff`** ("what changed between two windows") -> run `query_event_counts_by_severity` (tool) over each window (`group_by=["pattern"]`) and compare the two grouped results.
- **`compare_populations`** ("what's different about broken vs working") -> run `query_event_counts_by_severity` (tool) over each population separately (via distinct `lql` (arg)) and compare.
- **`cluster_event_contexts`** ("distinct contexts around these events") -> `query_logs` (tool) narrowed to the pattern, then `refine_query_result` (tool) group_by to cluster.
