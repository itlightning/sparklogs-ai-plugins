# MCP Tool Decision Tree

Per-tool detailed usage with parameter notes, decision tree for which tool to use when, and worked-example call sequences.

The MCP server instructions define every term used here, in learning order. This file adds per-tool mechanics on top of them rather than restating them.

**Tool API surface:** parameter names, defaults, and response columns live in the live MCP tool description and JSON schema only. This guide does not duplicate them; an old plugin with a new server must follow what the server advertises.

The tool surface is these **twelve** tools: `resolve_scope` (tool), `list_sources` (tool), `query_scope_activity` (tool), `query_device_health` (tool), `describe_pattern` (tool), `list_fields` (tool), `query_event_counts_by_severity` (tool), `query_logs` (tool), `refine_query_result` (tool), `get_query_metadata` (tool), `send_sparklogs_feedback` (tool), `server_info` (tool). Three differential tools (`query_period_diff` (other), `compare_populations` (other), `cluster_event_contexts` (other)) are fast-follow; see the bottom of this file for v1 equivalents.

**Cross-cutting (full detail in MCP server instructions):**

- **Funnel:** coverage before claims (`resolve_scope` (tool) → `list_sources` (tool) → health/activity when needed → counts/patterns → `query_logs` (tool) last).
- **`external_investigation_id` (arg):** required on every scoped/data call except `server_info` (tool); reuse within one investigation, mint fresh for a new one.
- **Time windows:** flat `start` (arg) / `end` (arg) in RFC3339 UTC; no relative shorthand.
- **Scope ladder:** service → app → subsource → category → pattern; an empty rung is not a finding.
- **Prohibitions:** volume and first/last bounds never prove interior coverage; absence of a feed report is not evidence.

## Investigation discipline (tool order)

Three principles for scalable analysis at fleet scale. Shape picks the tool; these pick the sequence.

1. **Bounded discovery first:** `list_sources` (tool), `query_scope_activity` (tool), `describe_pattern` (tool) return capped, pre-aggregated rows; learn what is in scope without pulling event payloads.
2. **Aggregate before detail:** `query_event_counts_by_severity` (tool) ranks and time-series the matched population before `query_logs` (tool); count and rank before reading messages.
3. **Cache before re-query:** `refine_query_result` (tool) on an existing cached slice; issue a new `query_logs` (tool) only when the cache does not cover the question.

See **Server instructions** at the end of this file for the full vocabulary walkthrough.

---

## Reach for this when

One trigger per tool. After coverage, it is almost always a
`query_event_counts_by_severity` (tool) / `describe_pattern` (tool) question.

| Tool | Reach for it when |
|---|---|
| `resolve_scope` (tool) | You have a name (client, host, ticket) and need an `org_id` (col). Always first. Collection/completeness live here. |
| `list_sources` (tool) | Before concluding anything from an absence: did this source send data in THIS window? Any source type, including ingest keys. |
| `query_device_health` (tool) | SparkLogs Agents in scope, and you need standing condition, what is installed or mounted, or which devices reported nothing on that surface. State, not sequence. Not the first tool for ingest-key-only streams. |
| `query_scope_activity` (tool) | You do not know what this client HAS: which apps, services and subsources exist at all. Orientation on an unfamiliar estate. |
| `query_event_counts_by_severity` (tool) | "What is going on here", at any altitude. The default mid-tier tool. `group_by=["reason"]` or `["pattern_hash"]`; pass two fields when the question has two nouns in it. |
| `describe_pattern` (tool) | You are about to cite a pattern and need its text and spread. Pass `pattern_hashes` (arg) (a list). Required before citing any teaser pattern. Mid-tier with counts. |
| `query_logs` (tool) | The grouping pointed somewhere specific and you now need the actual events. Last resort, over a narrowed filter. |
| `refine_query_result` (tool) | You already pulled a slice and want a different view of it. Free; never re-scans the source. |
| `get_query_metadata` (tool) | A cached result behaved oddly and you need its filter or cache status (bookkeeping only). |
| `list_fields` (tool) | A field name you have not seen yet. Catalog, not a first-pass tool. |
| `send_sparklogs_feedback` (tool) | The engineer wants to send session feedback to SparkLogs, or accepted a one-time offer. Run `sparklogs-feedback` first; not part of the query funnel. |
| `server_info` (tool) | A call failed and you need to know whether region, transport or auth is the problem. |

**Two honest demotions.** Both tools below exist and work; neither is where you should start.

- **`list_fields` (tool) is the workspace catalog, not the explore ladder.**
  `query_event_counts_by_severity` (tool) on `sparklogs.reason` (LQL) or `pattern_hash` (LQL) tells you what the source is SAYING.
  Reach for `list_fields` (tool) when you need a name the data you have already seen did not surface.
  Discovery omits unstable process-id map paths (`sparklogs.data.processes.<pid>...`); service and
  similar instance keys can remain. Device-state explore: `guides/stream-kinds/device-state.md`.
- **`get_query_metadata` (tool) is bookkeeping only.** It reads cache status and stored parameters for a `query_id` (arg).
  It does not list extra fields. Column names live in TSV `schema.columns` (col), JSONL row keys, or `list_fields` (tool).

---

## Per-tool detail

### `resolve_scope` (tool)

Always first. Turn natural-language scope into `org_ids` (arg), and enumerate orgs, SparkLogs Agents, and ingest keys in scope.

**Decision logic:**
- One org row with `match_kind` (col) **`exact` (value)** plus agent rows for that org: proceed. That is the client inventory, not a tie.
- One host/agent row with `match_kind` (col) **`exact` (value)**: proceed.
- Multiple org rows at the same best `match_kind` (col), or multiple host rows when the question named a device: ask the engineer; don't guess.
- Sole match at `prefix` (value)/`word` (value)/`substring` (value): confirm before proceeding.
- Zero matches: surface closest candidates.

**Agent row readings are supporting context, never a work queue.** `agent_status` (col) (is the agent there) and `collection_status` (col) (is it collecting) are two separate readings; never merge them into one statement. `offline` (value) means no signal was received, cause unknown, not that the machine is down. The collection group is what the device last reported, kept and dated even when the device is offline. `agent_complete_through` (col) and `advisories` (col) say how far the data can be trusted. Field-by-field semantics and halt rules: `scope-resolution.md` (Step 8 and state cross-check table).

**`device_classes` (arg) / `device_roles` (arg) beat hostname guessing.** A workstation named `srv-laptop` is how a hostname guess puts the wrong device in a server answer. Both vocabularies are open; an unfamiliar value is the device's own word for itself, and a device with no reported class matches no `device_classes` (arg) filter.

**Common mistake:** skipping this and assuming scope from wording. Engineers use ambiguous short names; resolve.

---

### `list_sources` (tool)

Per **(sender `agent_id` (LQL), origin `source` (LQL))** activity in the investigation window.

**Use the investigation's actual window.** Do NOT infer scope from recent heartbeat alone.

**These columns count events; they never establish coverage.** `event_count` (col) with `first_event_at` (col) and `last_event_at` (col) can have events at both ends and still miss the middle, so no row here supports "no gaps", "continuous coverage", or "the data is complete". Completeness comes from `agent_complete_through` (col) on the agent row and the feed reports behind it, or it is not claimed (`scope-resolution.md`). `sent_via: ingest_key` makes no completeness claim at all.

**Use cases:**
- **Scope discovery:** confirm expected sender/source pairs have events; cross-check the agent row's state readings (halt rules in `scope-resolution.md`).
- **Fleet enumeration:** list sender/origin pairs in the window.
- **Triage:** `cnt_interesting` (col) and the failure-side band counts (`cnt_warning` (col) through `cnt_critical_plus` (col)) before deep queries. The nine bands, and the four spellings a severity shows up under, are mapped in `category-classes.md`.
- **Critical+ fetch-first:** any non-zero `cnt_critical_plus` (col) (severity >= 20) in scope means fetch
  those events before proceeding, whatever the investigation topic (`category-classes.md`, Query
  notes).

---

### `query_scope_activity` (tool)

Discover app / service / subsource structure via **bounded discovery** (capped, pre-aggregated rows). **Not LQL-filtered** (orientation before you have a filter). For counts within an LQL slice, use `query_event_counts_by_severity` (tool).

See `scope-ladder.md` for when to reach for this instead of `query_event_counts_by_severity` (tool).

---

### `query_device_health` (tool)

Latest curated device state: monitor rows for conditions, inventory rows for what is on the box.
**After `resolve_scope` (tool) and `list_sources` (tool), when SparkLogs Agents are in scope** and the
question is standing state, inventory, or silence on this surface. Completeness stays on
`resolve_scope` (tool). Ingest-key-only streams have no device-health surface; `list_sources` (tool)
is the arrival check for those.

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

**Examples are server-chosen, diverse, and truthful.** You do not pick counts: the server returns a text-diverse set of example messages per pattern (not just the most recent), sized to fit the response. List your highest-interest `pattern_hashes` (arg) FIRST: examples cover roughly the first 25 by list order; the rest get stats only (the scope line says so). Each example carries `count` (value), `[first, last]`, and (when it recurred 3+ times) `seen_at` (col): times this exact message recurred, identical except embedded timestamps.

**Access tiers:** stats work on `mcp:observe`; examples additionally need query authority. If the token lacks it (or the workspace trial has expired), the call succeeds with stats only (no error) and the scope line names the reason: do not retry; read the stats and, when relevant, tell the engineer why examples are missing (e.g. expired trial).

---

### `list_fields` (tool)

Field catalog over a source and window. Use when you need a **name** the rows you already read did not surface.
It does not rank what matters; grouping on `sparklogs.reason` (LQL) or `pattern_hash` (LQL) does. Discovery omits unstable process-id map paths (`guides/stream-kinds/device-state.md`).

**Common mistake:** grouping or filtering on every catalog path instead of the stream-kind ladder.

---

### `query_event_counts_by_severity` (tool)

Count of matching events by severity, optionally bucketed over time and/or grouped by field values.
The workhorse for "what's happening" questions, and the only tool that answers "when".

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
- "What patterns appeared most?" -> `group_by=["pattern_hash"]`.
- "Which sources show this?" -> filter on a `pattern_hash` (LQL) in `lql` (arg), `group_by=["source"]`.
- "Which component is noisiest?" -> `group_by=["service"]` or `["subsource"]`, then narrow with a second call - see the scope ladder (`scope-ladder.md`).
- "When did it start, and did it stop?" -> `bucket="1h"`, optionally with one `group_by` (arg) field.
- "Which reason, on which machines?" -> `group_by` (arg) with two fields (reason by instance, config-change type by target). One call answers what two single-field passes only hint at, because the pairing is what carries the shape.

**A cross-tab counts a smaller population than you asked for.** With one `group_by` (arg) field a catch-all
row holds everything past `limit` (arg), so `total_count` (col) is the whole matched population. With two or three
there is no catch-all, and any event where one of the grouped fields is ABSENT is excluded outright,
with no row to mark it: `sparklogs.instance` (LQL) is null on a host-scoped reason, so those events vanish
from a reason-by-instance cross-tab. Read `summary.scope` (col) for how many combinations came back, and
group on the field alone when you need the null side.

**Grouped output is not a refinable cache.** Calling `refine_query_result` (tool) on its `query_id` (arg) returns `cache_invalidated` (value) (success envelope; issue a new tool call). Read grouped results directly. If a grouped result is truncated, follow its hint (narrow the `lql` (arg)/window and re-run). To then pull raw events for an interesting group, run `query_logs` (tool) with that group's value in `lql` (arg) (use the `*_hash` verbatim for the six hash fields).

---

### `query_logs` (tool)

Retrieve raw chronological events. **Last resort after aggregation.** Its result is a refinable cache.

**There is no `limit` (arg).** The response carries ONE PAGE, sized by the server, not the whole match.
`summary` (other) reports the matched TOTAL, so read that rather than counting rows. Further pages come from
`refine_query_result` (tool) against the returned `query_id` (arg), never from re-running this tool.

**Use cases:**
- Last-resort raw event retrieval AFTER aggregation narrowed to a specific small set.
- Ground-truth reads with an explicit `select` (arg) when you already know the column names.
- "Show me events with this filter" when aggregation isn't useful (e.g. one specific event you want to see in detail).

**Exploring unknown or wide events: omit `select` (arg).** Full-width JSONL is the default; populate `select` (arg) only when you know the names.

**Then refine, don't re-query.** Pull ONE broad-enough slice; use `refine_query_result` (tool) for every other view of it. To page a partial result, follow the response's `page.next` (col), never `get_query_metadata` (tool).

**Common mistakes:**
- Reaching for this first. Aggregation first.
- Populating `select` (arg) before you know the shape (exploring should omit it).
- Forgetting `external_investigation_id` (arg).

---

### `refine_query_result` (tool)

An in-cache relational engine over a `query_logs` (tool) result. Much faster than issuing a new `query_logs` (tool); never re-touches the source.

**The central efficiency lever.** Queue one broad slice, then refine many times against the same `query_id` (arg). Multiple refines are encouraged; each is an independent view over that same cached slice.

**A refine response keeps the `query_id` (arg) you gave it.** Refined output is not a separate cache: run every further refine against the original `query_logs` (tool) `query_id` (arg). On refine responses, `page.rows_cached` (col) means rows in that underlying cache, not the size of your transformed output.

**Pagination:** repeat the SAME refine arguments and change only `offset` (arg). A partial page's `page.next` (col) hands the full continuation back (your arguments + the next `offset` (arg)); follow it verbatim.

**Binding rule:** `filter_lql` (arg) resolves against the cached table's ROW columns (see the response schema descriptor for the vocabulary); `having_lql` (arg) resolves against the POST-GROUP columns (group + aggregate aliases).

**Sample restrictions:** `sample` (arg) is row mode only; combining it with `group_by` (arg)/`aggregate` (arg)/`having_lql` (arg) is rejected (a sampled aggregate would look exact without being exact). Sampled paging is approximate: each call may select a different subset.

**Cache expiry:** a cold cache (roughly a day old) regenerates automatically under the SAME `query_id` (arg) when you refine it (the header's cache status reflects it). Grouped results remain non-refinable. If `summary.cache_status` (col) is `cache_invalidated` (value), the handle is dead: issue a new data-tool call, do not retry refine on this id. If the server reports the cache cannot be restored (`expired` (value)), re-issue the original query.

**`group_by` (arg) takes bare column names; `order_by` (arg) items are OBJECTS.** A `group_by` (arg) term becomes an
object only when it carries a time bucket or an alias. Common shapes: group by `severity` (LQL) with a `count` (value) aggregate alias `hits` (other); group by `source` (LQL) with the same aggregate and `order_by` (arg) on `hits` (other) descending.

`order_by` (arg) accepts a group column or an aggregate alias; `dir` (other) is `asc` (other) or `desc` (other). Group on any
column the response's schema block lists: the standard ones (`severity` (LQL), `source` (LQL), `subsource` (LQL),
`app` (LQL), `service` (LQL), `pattern` (LQL), `t` (LQL)) and the dotted custom paths beside them (`sparklogs.reason` (LQL)).

**Time bucketing** groups a datetime column into fixed buckets, so one cached slice answers when
something happened from the cached slice without re-querying the source. Use a `group_by` (arg) time-bucket object on `t` (LQL) (for example one-hour buckets via `bucket_usec` (other) = 3600000000), count rows, and order by the bucket ascending for a series.

`bucket_usec` (other) is microseconds (1h = 3600000000, 5m = 300000000). `col` (other) defaults to the event
timestamp. Ascending order reads as a series; a run of low counts is where the stream thinned.

**Truncated values:** cut values end with `…[truncated:…]` and are listed in `page.truncated_fields` (col).
Whole values: refine with `full_length_values=true` (arg), narrowed with `filter_lql` (arg); the response may then reach 1 MB.

**Common patterns:**
- After a broad raw scan, filter per-subsource to drill into specific categories.
- Group the cached slice to get a distribution without re-querying the source.
- Page a large slice via `offset` (arg) following `page.next` (col).

---

### `get_query_metadata` (tool)

Bookkeeping over a cached `query_id` (arg): stored parameters, cache status, filter shape.

**Use cases:**
- Cache introspection after a query behaves oddly.
- Confirm whether a cache is complete, invalidated, or expired.

**Not for field discovery.** Column names: TSV `schema.columns` (col), JSONL row keys, or `list_fields` (tool).
Overflow on a refinable cache: follow `page.next` (col) via `refine_query_result` (tool), not this tool.

---

### `send_sparklogs_feedback` (tool)

**For:** sending the engineer's feedback about this SparkLogs session (quality, bugs, ideas) to the product team, linked to the investigation audit trail via `external_investigation_id` (arg).

**Shape:** not a query tool. Run the `sparklogs-feedback` skill first: agree kind and tier, draft fields, show exact text, wait for explicit yes, then call once. Reuse or mint `external_investigation_id` (arg). Relay the tool's result text (reference id, emailed vs stored, redaction) as relevant.

---

### `server_info` (tool)

Static server metadata (name, version, region, transport) plus the authenticated workspace id. Use it to confirm which region and workspace you are talking to before citing anything, or when a call fails and you need to know whether the transport and auth are the problem.

**It takes no parameters, and it REJECTS `external_investigation_id` (arg).** It is the one exception to
the pass-the-id-everywhere rule: there is no scope and no query to correlate.

---

## Common call sequences (recipes)

### Recipe: "Investigate <single source> for <symptom>"

```
1. resolve_scope(<source description>)
2. list_sources with the investigation's start/end, filtered to source - confirm data in window
3. query_device_health if SparkLogs Agents are in scope and the question needs state, inventory, or silence
4. query_scope_activity if the estate is unfamiliar
5. query_event_counts_by_severity group_by=["pattern_hash"] - pattern mining
6. describe_pattern on hashes you will cite
7. query_logs over the narrowed window/filter - primary cache
8. Multiple refine_query_result per subsource / field of interest
9. system condition summary output
```

### Recipe: "Is this just us? Fleet pivot from a specific pattern"

Use this when they asked, or after they accepted a suggested hunt. Do not open with a fleet-wide `query_logs` (tool).

```
1. resolve_scope(<msp / org scope>)
2. query_event_counts_by_severity with lql filtering to the pattern_hash, group_by=["source"]
3. Optional: query_logs + refine for first/last seen per source
4. system condition summary output (concise - this is a quick-pivot pattern)
```

### Recipe: "What changed?"

```
1. resolve_scope
2. list_sources
3. query_event_counts_by_severity group_by=["pattern_hash"] over window A (e.g. incident window)
4. query_event_counts_by_severity group_by=["pattern_hash"] over window B (e.g. prior baseline)
5. Compare the two grouped results - new / disappeared / accelerated patterns
6. describe_pattern on the hashes that differ
7. query_logs over the changed pattern if you need to see actual events
8. system condition summary output
```

---

## Response envelope

Every data-tool response is one text block (not JSON you parse as a whole): header JSON (`meta` (other), `summary` (other), `schema` (other), `lookups` (col), `page` (other)), delimiter line, rows (TSV or omit-empty JSONL), optional trailing hint.

- **Two modes, one namespace.** TSV (dense): `schema.columns` (col) lists `{name, type}` for every output column; header cells are bare names. JSONL (raw events and any array/object column): omit `schema.columns` (col) entirely; column names are the JSON keys on each row (never `"columns": null`).
- **Counts.** `summary.total_count` (col) = matched population. `page.rows_cached` (col) / `page.rows_returned` (col) = cache slice / this page. Ground claims in the matched population.
- **Sampled.** When `sampled` (other) is set, aggregates are estimates; quote cells as returned or narrow and re-run for exact figures.
- **Hashes.** Resolve `*_hash` via header `lookups` (col); use `describe_pattern` (tool) before citing `pattern_hash` (LQL). Treat hashes as opaque drill-down handles.
- **Empty requested columns.** `schema.empty_requested_columns` (col) is normal, not a Finding.
- **Overflow.** When `page.next` (col) is present on a refinable cache, follow it via `refine_query_result` (tool); never call `get_query_metadata` (tool) for more fields.
- **Truncation.** Cut values carry `…[truncated:…]` markers and appear in `page.truncated_fields` (col). Whole values: `refine_query_result` (tool) with `full_length_values=true` (arg), narrowed with `filter_lql` (arg).
- **Grouped results.** `query_event_counts_by_severity` (tool) output is not refinable; `refine_query_result` (tool) applies only to `query_logs` (tool) caches.

---

## Tool selection failure modes

**Reaching for `query_logs` (tool) first.** Aggregation first. Almost always.

**Skipping `list_sources` (tool).** Source might not have data in the investigation's window. Always confirm with `list_sources` (tool) scoped to the investigation's `start` (arg)/`end` (arg).

**Refining a grouped result.** `query_event_counts_by_severity` (tool) output is not refinable; it returns `cache_invalidated` (value). Read it directly or pull raw events with `query_logs` (tool).

**Re-scanning instead of refining.** After ONE broad `query_logs` (tool) slice, use `refine_query_result` (tool) for other views - it's a cache lookup, not a fresh scan.

**Showing a `*_hash` with no resolved text.** Resolve via header `lookups` (col) (and `describe_pattern` (tool) for `pattern_hash` (LQL)) first.

---

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff` (other)** ("what changed between two windows") -> run `query_event_counts_by_severity` (tool) over each window (`group_by=["pattern_hash"]`) and compare the two grouped results.
- **`compare_populations` (other)** ("what's different about broken vs working") -> run `query_event_counts_by_severity` (tool) over each population separately (via distinct `lql` (arg)) and compare.
- **`cluster_event_contexts` (other)** ("distinct contexts around these events") -> `query_logs` (tool) narrowed to the pattern, then `refine_query_result` (tool) group_by to cluster.

---

## Server instructions

The MCP server instructions loaded with the session are the canonical cross-cutting contract: scope, data model, agent and feed health, completeness, funnel order, scope ladder, LQL basics, event fields, and the three prohibitions. This guide adds per-tool mechanics, response-envelope shape, recipes, and failure modes on top. On cross-cutting facts, server instructions win; on parameters for a specific call, the live tool description and schema win.
