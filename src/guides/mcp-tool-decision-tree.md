# MCP Tool Decision Tree

Decision tree for which tool to use when, plus judgment the live tool descriptions do not carry.

The MCP server instructions define every term used here, in learning order. This file adds per-tool mechanics on top of them rather than restating them.

**Parameters and columns:** names, defaults, and response columns live in the live MCP tool description and JSON schema only. This guide does not duplicate them; an old plugin with a new server must follow what the server advertises.

There are **fourteen** tools: `resolve_scope` (tool), `list_sources` (tool), `query_scope_activity` (tool), `query_device_health` (tool), `describe_pattern` (tool), `list_fields` (tool), `query_event_counts_by_severity` (tool), `query_logs` (tool), `refine_query_result` (tool), `get_query_metadata` (tool), `send_sparklogs_feedback` (tool), `server_info` (tool), `describe_tables` (tool), `query_table` (tool). Three differential tools (`query_period_diff` (other), `compare_populations` (other), `cluster_event_contexts` (other)) are fast-follow; see the bottom of this file for v1 equivalents.

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
| `resolve_scope` (tool) | You have a name (client, host, ticket) and need an `org_id` (col). Always first. Collection/completeness live here. Multiple rows at the same best `match_kind` (col): confirm with the engineer before proceeding, don't guess. |
| `list_sources` (tool) | Before concluding anything from an absence: did this source send data in THIS window? Any source type, including ingest keys. Any non-zero `cnt_critical_plus` (col) in scope: fetch those events before proceeding, whatever the investigation topic. |
| `query_device_health` (tool) | SparkLogs Agents in scope, and you need standing condition, what is installed or mounted, or which devices reported no device-health data. Omit `view` (arg) for the latest event of each episode, not a sequence. `view` (arg) `latest_state` (value) is what is on the box and how it last read (newest event of each subject). `view` (arg) `event_timeline` (value) is the RCA reading of the same tool (every in-window event of episodes whose peak meets `min_severity` (arg); repeating change points). `view` (arg) `series` (value) with `topics` (arg) charts a device-state value over time; `view` (arg) `topics` (value) lists the topics. Not the first tool for ingest-key-only streams. `group_by_reason: true` takes no `fieldset` (arg) or `add_fields` (arg): passing either alongside it is an error. Rows are JSONL by default with absent fields omitted; `format: tsv` gives a fixed column layout. `group_by_reason: true` always renders TSV. |
| `query_scope_activity` (tool) | You do not know what this client HAS: which apps, services and subsources exist at all. Orientation on an unfamiliar estate. |
| `query_event_counts_by_severity` (tool) | "What is going on here", at any altitude. The default mid-tier tool. `group_by=["reason"]` or `["pattern_hash"]`; pass two fields when the question has two nouns in it. |
| `describe_pattern` (tool) | You are about to cite a pattern and need its text and spread. Pass `pattern_hashes` (arg) (a list). Required before citing any teaser pattern. Mid-tier with counts. |
| `query_logs` (tool) | The grouping pointed somewhere specific and you now need the actual events. Last resort, over a narrowed filter. |
| `refine_query_result` (tool) | You already pulled a slice and want a different view of it. Free; never re-scans the source. |
| `get_query_metadata` (tool) | A cached result behaved oddly and you need its filter or cache status (bookkeeping only). |
| `list_fields` (tool) | A field name you have not seen yet. Catalog, not a first-pass tool. |
| `send_sparklogs_feedback` (tool) | The engineer wants to send session feedback to SparkLogs, or accepted a one-time offer. Run `sparklogs-feedback` first; not part of the query funnel. |
| `server_info` (tool) | A call failed and you need to know whether region, transport or auth is the problem. |
| `describe_tables` (tool) | Lists what `query_table` (tool) can read and names the specialized tool that answers a shape better. Reach for it before inventing a general scan. |
| `query_table` (tool) | General grammar over one table, last, when no specialized tool has the shape. |

**Two honest demotions.** Both tools below exist and work; neither is where you should start.

- **`list_fields` (tool) is the workspace catalog, not the explore ladder.**
  `query_event_counts_by_severity` (tool) on `sparklogs.reason` (LQL) or `pattern_hash` (LQL) tells you what the source is SAYING.
  Reach for `list_fields` (tool) when you need a name the data you have already seen did not surface.
  Snapshot payload leaves are listed with their array mark (`sparklogs.data.processes[].image_name`);
  narrow with `path_prefix` (arg) and `path_match` (arg). Device-state explore: `guides/stream-kinds/device-state.md`.
- **`get_query_metadata` (tool) is bookkeeping only.** It reads cache status and stored parameters for a `query_id` (arg).
  It does not list extra fields. Column names live in TSV `schema.columns` (col), JSONL row keys, or `list_fields` (tool).

---

## Common call sequences (recipes)

### Recipe: "Is this just us? Fleet pivot from a specific pattern"

Use this when they asked, or after they accepted a suggested hunt. Do not open with a fleet-wide `query_logs` (tool): a pivot starts from the grouped count, not from raw events.

```
1. resolve_scope(<msp / org scope>)
2. query_event_counts_by_severity with lql filtering to the pattern_hash, group_by=["source"]
3. Optional: query_logs + refine for first/last seen per source
4. system condition summary output (concise - this is a quick-pivot pattern)
```

---

## Paste-back rules

Every rendered cell is meant to go back into a filter unchanged.

- **`""` means no value.** In a TSV cell and in a group key it covers missing, SQL null and the empty string alike; a JSONL row omits an absent field and carries `""` for a stored empty one. Paste `""` back as `col=""` and you get exactly the rows that cell came from. TSV carries no null marker, and a pasted null matches the four-character string.
- **Hash twins paste into either name.** A `*_hash` value works as `pattern_hash` (LQL) `= "<hash>"` and as `pattern` (LQL) `= "<hash>"`; an equality on the base field whose literal has the hash token shape widens to cover both. The twins are listed by `list_fields` (tool) because they are meant to be pasted.
- **`t` (LQL), `ingested_t` (LQL) and `org_id` (LQL) are filter names.** They are the names in every response and the names LQL accepts, in `lql` (arg) and in `filter_lql` (arg). Inside an element scope they are payload keys, not the standard fields.
- **A rendered severity name is a filter literal.** `severity >= warning` is the readable form; prefer the name over the number.
- **An element leaf is not a row column.** A value read out of an array of objects pastes back inside `path[](leaf=value)`, and `group_by` (arg) on that leaf is refused.
- **String equality ignores case** on resident columns and on payload leaves alike.
- **A bare 15 or 16 digit integer can be a timestamp.** Known datetime fields render as RFC3339; a leftover digit string that long, quoted or not, may be epoch microseconds UTC. Do not treat other numbers as times.

## When the response is large

- **The first `query_logs` (tool) page is small on purpose.** It carries the minted `query_id` (arg), so it is budgeted well under the other tools to keep the handle out of a client-side spill. Read `summary.total_count` (col) for the population and `page.rows_cached` (col) for what the cache holds.
- **Page the cache, do not re-scan.** `refine_query_result` (tool) with the SAME arguments and a new `offset` (arg); `page.next` (col) hands back the literal next call. Refine pages carry `rows_matched` (col) (how many cached rows match this refine) and no `total_count` (col), because a derived page has no matched population of its own.
- **`full_length_values` (arg) recovers one cut value.** Cut values end with `…[truncated:N]` and are named in `page.truncated_fields` (col). Narrow with `filter_lql` (arg) to the one row first; the response may then reach 1 MB.
- **Project the array, not the row.** On a wide inventory event, `select` (arg) the one array you need. When the filtered element projection ships, project the matching elements instead and the page shrinks by the ratio of matches to elements.
- **`format` (arg) when a fixed parser is on the other end.** TSV refuses whenever a column is array- or object-typed. Raw event rows from `query_logs` (tool) are always JSONL and refuse TSV even with a scalar-only `select` (arg); refine the cache when you want those same rows as TSV.
- **A cache regenerates once, then dies.** A cold `query_id` (arg) (roughly a day old) regenerates automatically the next time you refine it. `summary.cache_status` (col) `cache_invalidated` (value) means the handle is dead: issue a new data-tool call, don't retry refine. `expired` (value) means re-issue the original query instead.

---

## Tool selection failure modes

**Reaching for `query_logs` (tool) first.** Aggregation first. Almost always.

**Skipping `list_sources` (tool).** Source might not have data in the investigation's window. Always confirm with `list_sources` (tool) scoped to the investigation's `start` (arg)/`end` (arg).

**Refining a grouped result.** `query_event_counts_by_severity` (tool) output is not refinable; it returns `cache_invalidated` (value). Read it directly or pull raw events with `query_logs` (tool).

**Re-scanning instead of refining.** After ONE broad `query_logs` (tool) slice, use `refine_query_result` (tool) for other views - it's a cache lookup, not a fresh scan.

**Showing a `*_hash` with no resolved text.** Resolve via the response's `lookups` (col) (and `describe_pattern` (tool) for `pattern_hash` (LQL)) first.

---

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff` (other)** ("what changed between two windows") -> run `query_event_counts_by_severity` (tool) over each window (`group_by=["pattern_hash"]`) and compare the two grouped results.
- **`compare_populations` (other)** ("what's different about broken vs working") -> run `query_event_counts_by_severity` (tool) over each population separately (via distinct `lql` (arg)) and compare.
- **`cluster_event_contexts` (other)** ("distinct contexts around these events") -> `query_logs` (tool) narrowed to the pattern, then `refine_query_result` (tool) group_by to cluster.

---

## Server instructions

The MCP server instructions loaded with the session are the canonical cross-cutting contract: scope, data model, agent and feed health, completeness, funnel order, scope ladder, LQL basics, event fields, and the three prohibitions. The live tool descriptions carry per-tool mechanics and response shape. This guide adds only the decision tree, paste-back rules, large-response handling, and failure modes on top. On cross-cutting facts, server instructions win; on parameters or response shape for a specific call, the live tool description and schema win.
