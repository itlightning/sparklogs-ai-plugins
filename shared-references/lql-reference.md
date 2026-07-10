# LQL Reference - for the SparkLogs Investigator skill

The complete, verified syntax of Lightning Query Language (LQL) - the filter language used by every LQL parameter on the SparkLogs MCP tools: `lql` (on `query_logs` / `query_grouped_aggregation`), and `filter_lql` / `having_lql` (on `refine_query_result`). Read this file when composing any non-trivial LQL.

An empty or omitted `lql` matches everything in the tool's `start`/`end` window and `org_ids` scope - useful as a starting point before narrowing.

Operator names, syntax forms, and edge cases are quoted from sparklogs.com docs.

---

## Operator reference

### Value operators (`<field> <op> <value-or-pattern-or-regex-or-list>`)

| Operator | Meaning | Notes |
|---|---|---|
| `:` | field contains | For string fields, substring/pattern match. For non-string fields, equivalent to `=`. For array fields, true if any element matches. |
| `!:` | field does NOT contain | See **Negated operators (scalar vs array)** below. |
| `=` | exact match | Pattern or regex allowed on right side. |
| `!=` or `<>` | exact non-match | See **Negated operators (scalar vs array)** below. |
| `>=`, `>`, `<`, `<=` | numeric/ordinal comparison | Right side must be a literal, not a pattern or regex. |
| `<field>!` | field has any non-NULL value | Terse non-null check. e.g., `correlation_id!` |
| `<field> between <literal> and <literal>` | inclusive range | Works for numeric and timestamp fields. |
| `<field> in (a, b, c)` | match any in value list | Comma-separated, parenthesized. NOT `[a, b, c]`. |
| `<field> not in (a, b, c)` | match NONE in value list | Inverse of `in`. |

### No `IS NULL` operator
Use `NOT <field>!` for is-null. Use `<field>!` for is-not-null.

```
NOT correlation_id!     <- is-null
correlation_id!         <- is-not-null
```

### No `LIKE` (no SQL-style wildcards)
Use pattern operators `*` and `?` directly in unquoted terms.

```
app: winlog/*           <- right (matches any winlog channel)
app LIKE "winlog/%"     <- WRONG (no LIKE; no % or _)
```

### No `MATCHES` (no separate regex keyword)
Use `:`, `!:`, `=`, or `!=` followed by a slash-delimited regex.

```
message: /[0-9A-F]{8}-[0-9A-F]{4}/    <- right (re2 syntax)
message MATCHES "regex"               <- WRONG (no MATCHES)
```

### Negated operators (scalar vs array)

**Scalar fields** (including `subsource` and other string paths):

- `!:` and `!=` match when the field is **absent or NULL** as well as when the value does not match.
- `subsource!:win.servicing.dism` matches events with no `subsource` value.

**Array fields** (unindexed `x.tags`, not `x.tags[0]`):

- `!:` and `!=` apply only when the field is present **and** is a JSON array.
- Absent or non-array values do **not** match.
- To include rows with no array: `x.tags !: noise OR NOT x.tags!`

**Search indexes:** scalar `!:` / `!=` and unary `NOT` on indexed terms do not use the search index. Positive `:` / `=` terms in the same `AND` may still use the index.

### Empty string literals (scalar strings only)

These rules apply to string fields such as `source`, `app`, `subsource`, and custom paths like `x.foo`. The behavior is the same for every string field name in LQL.

| Form | Meaning |
|---|---|
| `field=""` | The field is missing, null, or the empty string |
| `field!=""` | The field is present and has a non-empty string value |
| `field in ("", a, …)` / `field=("", …)` with `""` in the list | The field is missing, null, empty, or matches any other listed value |
| `field not in (…)` or a negated list that includes `""` | The opposite of the matching rules in the row above |

**Numbers and other non-string types:** `x.count=0` matches only when the stored value is exactly `0`. It does not match a missing field, and a missing field is not treated as zero. Use `NOT x.count!` to test for absence on numeric fields.

Do not use `field:""` (matches every event) or `field!:""` (matches no events). Use `NOT field!` to test for a missing field. Use `field#s!` when you need to assert JSON type on a custom path.

### No `CONTAINS` / `CONTAINS_ANY` / `CONTAINS_ALL` (array fields use scalar operators directly)

For an array field like `anomaly_categories`:

```
anomaly_categories: spike              <- matches if any element equals "spike"
anomaly_categories != (spike, drop)    <- matches if NO element equals "spike" AND no element equals "drop"
anomaly_categories: spike AND anomaly_categories: drop   <- matches if "spike" AND "drop" both present
```

```
anomaly_categories CONTAINS "spike"          <- WRONG
anomaly_categories CONTAINS_ANY ["spike"]    <- WRONG
```

### No wildcard JSON paths
LQL does NOT support `state.services.*.status = STOPPED`. Type resolution requires exact paths.

**Workarounds:**
- Use `event_summary` rolled-up fields (each state category declares per-category fields in event_summary) which carry per-category cross-key answers like `auto_start_not_running: ["spooler"]`. e.g., `event_summary.auto_start_not_running!` finds events where any service is in unexpected stopped state.
- Use top-level anomaly fields (`anomaly_max_score`, `anomaly_categories`) which the local detectors populate when keys are unusual.
- Use direct keyed lookups when the key is known: `state.services.spooler.status = STOPPED` works fine.

```
state.services.*.status = STOPPED     <- WRONG (wildcard JSON paths not supported)
event_summary.auto_start_not_running! <- right (use rolled-up field)
state.services.spooler.status = STOPPED  <- right (direct key)
```

---

## Patterns

Pattern operators in unquoted terms:
- `*` - matches any number of any character (zero or more).
- `?` - matches any single character.

```
app: winlog/Microsoft-Windows-*           <- any Microsoft-Windows winlog channel
process_name: msedge*                     <- anything starting with msedge
http_status_code: ?00                     <- matches 100, 200, 300, ..., 900
```

A bare term with no field name searches the `message` field:

```
failed                                    <- matches events with "failed" in message
"timed out"                               <- matches events with "timed out" in message
```

---

## Regex

Slash-delimited, re2 syntax. Used with operators `:`, `!:`, `=`, `!=`. **The choice of operator matters** - see below.

```
message: /[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}/      <- contains a UUID anywhere in message
```

The full power of re2 is available; use sparingly because regex is more expensive than substring matching.

### Operator + regex semantics

The operator you pair with `/regex/` changes whether the match is "contains the pattern anywhere" or "the entire value matches the pattern."

| Operator | Semantics with `/regex/` |
|---|---|
| `field: /regex/` | Match if value **contains** the regex pattern anywhere in it. Like `re.search()` in Python. |
| `field !: /regex/` | Match if value does NOT contain the pattern anywhere. |
| `field = /regex/` | Match if regex matches the **entire value**. Like `re.fullmatch()` in Python - anchors at both ends. |
| `field != /regex/` | Match if regex does NOT match the entire value. |

**Examples showing the distinction:**

```
x.error_code: /E[0-9]+/        <- matches "E1234", "PRE-E5678", "EXX99-extra" (regex appears anywhere)
x.error_code = /E[0-9]+/       <- matches "E1234" only (regex must match entire value)
```

**Pick the operator that matches your intent.** Use `:` when you want the pattern to appear *somewhere* in the value (typical for messages and free-text fields). Use `=` when the regex describes the whole value exactly (typical for IDs, codes, structured fields where partial matches would be misleading).

**Common mistake:** using `:` when you meant `=` (or vice versa) and getting a much broader or narrower match set than intended. When the result count is surprising, double-check the operator-vs-regex pairing.

---

## Boolean operators and grouping

| Operator | Meaning |
|---|---|
| `AND` or `&&` | Both expressions match |
| `OR` or `\|\|` | Either expression matches |
| `NOT` or `-` | Expression does NOT match |

Precedence: `NOT` > `AND` > `OR`. Use parentheses for clarity.

```
severity in (error, critical) AND source = "srv-x"
(severity = error OR anomaly_max_score >= 60) AND source = "srv-x"
NOT (subsource = noisy_subsource) AND severity in (error, critical)
```

**Implicit AND:** adjacent expressions are AND'ed. These are equivalent:

```
severity = error source = "srv-x"
severity = error AND source = "srv-x"
```

---

## Quoting

Use `"`, `'`, or backtick. Escape inner quote with `\`.

```
source = "srv-fileshare01"
message: "request timed out"
filename: 'Alice\'s file.txt'
```

Hyphens and slashes inside an unquoted term work fine (just can't begin the term):
```
top/sub-folder/picture.png        <- unquoted, fine
/create                           <- needs quoting because starts with /
"/create"                         <- right
```

---

## JSON field paths

Dot-separated. Field name components with whitespace or period must be double-quoted:

```
state.services.spooler.status                          <- simple path
x.http.response.status                                 <- nested custom field
x."custom field"."some \"quoted\" field".final_value   <- components with whitespace/quotes
```

---

## Type suffixes (rare in agent practice)

Append `#` followed by type letter:
- `#s` - string
- `#n` - numeric
- `#i` - 64-bit integer
- `#t` - timestamp
- `#b` - boolean

`[]` for array. e.g., `x.my_array#i[]` - array of integers.

Auto-resolves type when omitted. Only use type suffix when the field has multiple types and you need to disambiguate.

---

## `any` meta field

Searches all standard string + custom fields. Only with `:` operator. Expensive - use sparingly.

```
any: "credit card"                       <- search all fields for "credit card"
```

---

## Forbidden / not supported

- **No JOIN** across event rows. LQL is a row predicate.
- **No subqueries** in filter expressions.
- **No COUNT or other aggregations in filter expressions.** Aggregations live in the `aggregations` parameter on `query_grouped_aggregation`.
- **No wildcard JSON paths** (per above).
- **No `LIKE`, `MATCHES`, `IS NULL`, `CONTAINS_ANY`, `CONTAINS_ALL`** keywords.

---

## Canonical recurring patterns

**Field-availability note.** Several patterns below filter on `event_kind`, `anomaly_max_score`/`anomaly_categories`, or `state.*` - deep RCA fields the Managed Agent doesn't emit yet (zero production emission today; see SKILL.md Section 8). These queries are syntactically valid and will be the right shape once emission lands, but they return EMPTY right now on every source. An empty result from one of these is "not emitted yet," never "no problem." Fall back to `severity`/`message`/`pattern` shallow-triage fields, which ARE emitted today.

### Context-reduction filter (the most common starting filter)

```
severity in (error, critical) OR (anomaly_max_score >= 60 AND anomaly_max_score_confidence >= 70)
```

Use this whenever you want to focus on signal-rich events without specifying a more targeted filter. The OR is deliberate - severity catches what the source flagged as bad; anomaly score catches what the local detector judged unusual. (Today the anomaly half is a no-op per the field-availability note above; the filter degrades gracefully to `severity in (error, critical)`.)

### Single-source single-time-window scope

```
source = "srv-fileshare01"
```

Combined with the `start` / `end` window parameters (which are separate from the LQL filter).

### Multi-source set

```
source in ("ws01.acme", "ws02.acme", "ws03.acme")
```

### Source-pattern set (e.g., all app servers)

```
source: srv-app*
```

### Specific subsource

```
subsource = vss_writers
subsource in (vss_writers, volumes, scheduled_tasks)   <- multi-subsource
```

### Specific event_kind

```
event_kind = SLASnapshot
event_kind in (SLASnapshot, SLADelta)                  <- snapshot or delta
event_kind = SLAAgentOp                                <- agent self-observability
```

### Winlog channel pattern

```
app: winlog/Microsoft-Windows-Backup/*                 <- any Backup channel
app: winlog/VSS                                        <- exact channel
app: winlog/Application AND winlog.event_id = 1000     <- Application channel event ID 1000
```

### Direct keyed lookup

```
state.services.spooler.status = STOPPED
state.vss_writers."Microsoft Exchange Writer".state = "Failed"   <- writer name needs quotes
```

### Chain walk (snapshot + all deltas)

```
snapshot_id = "qX9k2mp4n7t1c8r5"
```

### Correlation ID

```
correlation_id = "abc123def456"
```

### Ingest-health check

```
event_kind = SLAAgentOp AND subsource in (ingest_drop, spool_full, backpressure)
```

`event_kind` / `SLAAgentOp` aren't emitted yet (see the field-availability note above) - this returns empty today regardless of true ingest health. Treat empty as inconclusive, not "no drops."

### Detector lifecycle awareness

```
event_kind = SLAAgentOp AND subsource: anomaly_detector_*
```

Same caveat: empty today because `event_kind` isn't emitted, not because detectors are absent.

Identifies warmup-complete and baseline-reset events.

### Time-range narrowing within an LQL filter

The `start` / `end` window is the primary time scope. To narrow further inside a cached scan via `refine_query_result`'s `filter_lql`:

```
t between 2026-04-23T03:00:00Z and 2026-04-23T04:00:00Z
```

---

## Common LQL mistakes (most-bitten-by-this-list)

1. **`LIKE "winlog/%"` instead of `: winlog/*`.** SparkLogs is not SQL.
2. **`MATCHES "regex"` instead of `: /regex/`.** Slash-delimited.
3. **`IS NULL` / `IS NOT NULL` instead of `NOT field!` / `field!`.** Different syntax.
4. **`CONTAINS "value"` for arrays instead of `field: value` or `field = value`.** Array fields use scalar operators directly.
5. **Wildcard JSON paths.** `state.services.*.status = STOPPED` does not work. Use rolled-up event_summary fields.
6. **Square brackets for value lists.** `severity in [error, critical]` is wrong. Use `severity in (error, critical)` with parentheses.
7. **Quoting unquoted terms unnecessarily.** `severity = "error"` works but `severity = error` is fine and more readable.
8. **Forgetting parentheses around OR with implicit AND.** `severity = error OR anomaly_max_score >= 60 source = "x"` parses unexpectedly. Use parentheses: `(severity = error OR anomaly_max_score >= 60) AND source = "x"`.
9. **Mixing `&&` / `||` with `AND` / `OR` in the same expression.** Both work but consistency reads better.
10. **Hallucinating field names.** When uncertain about a field name, check the response schema descriptor - a field you requested that doesn't resolve won't appear there. Use canonical field names from `mcp-tool-decision-tree.md`, `list_fields` discovery, or `get_query_metadata` field discovery over a cached query.

---

## When LQL parser returns a structured error

The cloud's LQL parser returns errors that name the rule violated. Read the message and fix the specific issue rather than retrying with a slightly different broken expression. After 2 failed retries on the same query shape, surface to the engineer rather than continuing to retry - it likely means a fundamental misunderstanding of the schema.

Common error messages and what they mean:

- `unknown operator 'LIKE' at position N` -> use `:` with patterns instead.
- `unknown operator 'MATCHES' at position N` -> use `:` with `/regex/`.
- `'IS' is not a recognized operator` -> use `field!` or `NOT field!`.
- `expected '(' at position N` -> value list needs parens, not brackets.
- `unknown field 'state.services.*.status'` -> wildcard paths not supported; see workarounds above.
- `field 'state.foo.bar' has no observed type` -> field doesn't exist in any cached row; it also won't appear in the response schema descriptor.
