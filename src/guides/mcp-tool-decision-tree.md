# MCP Tool Decision Tree

Decision tree for which tool to use when, plus judgment the live tool descriptions do not carry.

Use the live server contract for parameter names, limits and result semantics.
If your host omitted server instructions or a term is unclear, call `server_info` (tool) with `include_instructions: true`.
For view selection, fieldset membership, aggregation or paging details missing from the short description, use `describe_tool` (arg) with that tool name.
Retrieve the reference when needed, not before every call.

**Parameters and columns:** follow the live description, input schema and optional detailed reference when they differ from a saved recipe.

There are **fourteen** tools: `resolve_scope` (tool), `list_sources` (tool), `query_scope_activity` (tool), `query_device_health` (tool), `describe_pattern` (tool), `list_fields` (tool), `query_event_counts_by_severity` (tool), `query_logs` (tool), `refine_query_result` (tool), `get_query_metadata` (tool), `send_sparklogs_feedback` (tool), `server_info` (tool), `describe_tables` (tool), `query_table` (tool). Three differential tools (`query_period_diff` (other), `compare_populations` (other), `cluster_event_contexts` (other)) are fast-follow; see the bottom of this file for v1 equivalents.

**Cross-cutting (full detail in MCP server instructions):**

- **Funnel:** coverage before claims (`resolve_scope` (tool) → `list_sources` (tool) → health/activity when needed → counts/patterns → `query_logs` (tool) last).
- **`external_investigation_id` (arg):** required on every scoped/data call except `server_info` (tool); reuse within one investigation, mint fresh for a new one.
- **Time windows:** flat `start` (arg) / `end` (arg) in RFC3339 UTC; no relative shorthand.
- **Scope filters:** service → app → subsource → category → pattern; an empty rung is not a finding.
- **Prohibitions:** volume and first/last bounds never prove interior coverage; absence of a feed report is not evidence.

## Investigation discipline (tool order)

Three principles for scalable analysis at fleet scale. Shape picks the tool; these pick the sequence.

1. **Bounded discovery first:** `list_sources` (tool), `query_scope_activity` (tool), `describe_pattern` (tool) return capped, pre-aggregated rows; learn what is in scope without pulling event payloads.
2. **Aggregate before detail:** `query_event_counts_by_severity` (tool) ranks and time-series the matched population before `query_logs` (tool); count and rank before reading messages.
3. **Reuse result handles:** `refine_query_result` (tool) pages, filters and aggregates an existing result.
   Cached handles use stored rows; live handles re-run the parent query against current data.

See **Server instructions** at the end of this file for the full vocabulary walkthrough.

---

## Reach for this when

Choose by the question: device state, process trends, event counts or raw evidence.

| Tool | Reach for it when |
|---|---|
| `resolve_scope` (tool) | You have a name (client, host, ticket) and need an `org_id` (col). Always first. Collection/completeness live here. Multiple rows at the same best `match_kind` (col): confirm with the engineer before proceeding, don't guess. |
| `list_sources` (tool) | Before concluding anything from an absence: did this source send data in THIS window? Any source type, including ingest keys. Any non-zero `cnt_critical_plus` (col) in scope: fetch those events before proceeding, whatever the investigation topic. |
| `query_device_health` (tool) | Device conditions, inventories and trends. Process charts: `view` (arg) `top_processes_over_time` (value). Raw samples: `series` (value). Topic discovery: `topics` (value). Latest inventory: `latest_state` (value). Episode history: `event_timeline` (value). Omit the view for the latest event per episode or occurrence. See `guides/device-state-fields.md` for interpretation. |
| `query_scope_activity` (tool) | You do not know what this client HAS: which apps, services and subsources exist at all. Orientation on an unfamiliar estate. |
| `query_event_counts_by_severity` (tool) | "What is going on here", at any altitude. The default mid-tier tool. `group_by=["reason"]` or `["pattern_hash"]`; pass two fields when the question has two nouns in it. |
| `describe_pattern` (tool) | You are about to cite a pattern and need its text and spread. Pass `pattern_hashes` (arg) (a list). Required before citing any teaser pattern. Mid-tier with counts. |
| `query_logs` (tool) | The grouping pointed somewhere specific and you now need the actual events. Last resort, over a narrowed filter. |
| `refine_query_result` (tool) | Page, filter or aggregate an existing result handle. Read the response for whether the handle is cached or live. |
| `get_query_metadata` (tool) | A cached result behaved oddly and you need its filter or cache status (bookkeeping only). |
| `list_fields` (tool) | A field name you have not seen yet. Catalog, not a first-pass tool. |
| `send_sparklogs_feedback` (tool) | The engineer wants to send session feedback to SparkLogs, or accepted a one-time offer. Run `sparklogs-feedback` first; not part of the query funnel. |
| `server_info` (tool) | Check server identity and reachability, retrieve omitted server instructions, or request a tool description, schema and detailed reference. |
| `describe_tables` (tool) | Lists what `query_table` (tool) can read and names the specialized tool that answers a shape better. Reach for it before inventing a general scan. |
| `query_table` (tool) | General grammar over one table, last, when no specialized tool has the shape. |

**Use these for specific gaps in the information you have.**

- **`list_fields` (tool) is the workspace catalog, not the exploration order.**
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
- **Array items need item-aligned expressions.** Use `path[](leaf=value)` to filter items and the documented item grammar to group their leaves. A whole-event filter can retain other items in the same event.
- **String equality ignores case** on resident columns and on payload leaves alike.
- **A bare 15 or 16 digit integer can be a timestamp.** Known datetime fields render as RFC3339; a leftover digit string that long, quoted or not, may be epoch microseconds UTC. Do not treat other numbers as times.

## When the response is large

- Prefer one `refine_query_result` (tool) call with `offset: 0` and the desired total `limit` (arg), up to the advertised ceiling.
  This often lets the host save one complete response to a file.
- If paging is needed, follow `page.next` (col) with the same query arguments.
  Merge each page's `lookups` (col), and keep only the first TSV column-header row when combining bodies.
- Read `page.rows_returned` (col), result counts and continuation metadata before treating a report or trend as complete.
  A page ending inside a series is incomplete delivery, not a collection outage.
  Live data can change between calls.
- Use `full_length_values` (arg) for a clipped value after narrowing to the needed row or field.
  Whole structured cells can be replaced by a truncation marker; do not parse a clipped cell as complete data.
- JSONL topic rows carry native field arrays and example objects; TSV carries escaped JSON in those cells.
  Other tools may refuse TSV for array or object columns. Follow the returned format and schema.
- If the host reports truncation, inspect the saved output or retrieve a smaller response.
  Do not count lines after every call.
- A handle marked `cache_invalidated` (value) cannot be refined again. Reissue the original data query.


---

## Tool selection failure modes

**Reaching for `query_logs` (tool) first.** Aggregation first. Almost always.

**Skipping `list_sources` (tool).** Source might not have data in the investigation's window. Always confirm with `list_sources` (tool) scoped to the investigation's `start` (arg)/`end` (arg).

**Refining beyond the result shape.** A grouped handle contains grouped rows. Refine can page or analyze those rows, but cannot recover their raw events. Use `query_logs` (tool) for the underlying evidence.

**Repeating a raw query unnecessarily.** Reuse the cached `query_logs` (tool) handle while it contains the rows needed for the question.

**Showing a `*_hash` with no resolved text.** Resolve via the response's `lookups` (col) (and `describe_pattern` (tool) for `pattern_hash` (LQL)) first.

---

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff` (other)** ("what changed between two windows") -> run `query_event_counts_by_severity` (tool) over each window (`group_by=["pattern_hash"]`) and compare the two grouped results.
- **`compare_populations` (other)** ("what's different about broken vs working") -> run `query_event_counts_by_severity` (tool) over each population separately (via distinct `lql` (arg)) and compare.
- **`cluster_event_contexts` (other)** ("distinct contexts around these events") -> `query_logs` (tool) narrowed to the pattern, then `refine_query_result` (tool) group_by to cluster.

---

## Server instructions

The MCP server instructions loaded with the session are the canonical cross-cutting contract: scope, data model, agent and feed health, completeness, funnel order, scope filters, LQL basics, event fields, and the three prohibitions. The live tool descriptions carry per-tool mechanics and response shape. This guide adds only the decision tree, paste-back rules, large-response handling, and failure modes on top. On cross-cutting facts, server instructions win; on parameters or response shape for a specific call, the live tool description and schema win.
