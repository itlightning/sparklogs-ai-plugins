# LQL Reference - for the SparkLogs Investigator skill

The complete, verified syntax of Lightning Query Language (LQL) - the filter language used by every LQL parameter on the SparkLogs MCP tools: `lql` (arg) (on `query_logs` (tool) / `query_event_counts_by_severity` (tool)), `having` (arg) (on `query_event_counts_by_severity` (tool)), and `filter_lql` (arg) / `having_lql` (arg) (on `refine_query_result` (tool)). Read this file when composing any non-trivial LQL.

An empty or omitted `lql` (arg) matches everything in the tool's `start` (arg)/`end` (arg) window and `query_scope` (arg) - useful as a starting point before narrowing.

Operator names, syntax forms, and edge cases are quoted from sparklogs.com docs.

Every other field name in the examples is a real field.
Custom paths under `x.*` (LQL), such as `x.foo` (LQL), and the placeholders `path` (LQL) and `field` (LQL) are illustrative only: no SparkLogs event carries them, so never send them in a query.

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
| `<field>!` | field is present in the event | Presence check; matches even when the value is an explicit JSON `null` (other) (absent field = no match). e.g., `sparklogs.reason!` |
| `<field> between <literal> and <literal>` | inclusive range | Works for numeric and timestamp fields. |
| `<field> in (a, b, c)` | match any in value list | Comma-separated, parenthesized. NOT `[a, b, c]`. |
| `<field> not in (a, b, c)` | match NONE in value list | Inverse of `in` (other). |

### No `IS NULL` operator
Use `NOT <field>!` for is-null. Use `<field>!` for is-not-null.

```lql
NOT sparklogs.reason!     <- is-null (uncurated events)
sparklogs.reason!         <- is-not-null (curated events)
```

### No `LIKE` (no SQL-style wildcards)
Use pattern operators `*` and `?` directly in unquoted terms.

```lql
subsource: win.eventlog.*     <- right (`:` plus `*`)
subsource LIKE "win.eventlog/%"  <- WRONG (no LIKE; no % or _)
```

### No `MATCHES` (no separate regex keyword)
Use `:`, `!:`, `=`, or `!=` followed by a slash-delimited regex.

```lql
message: /[0-9A-F]{8}-[0-9A-F]{4}/    <- right (re2 syntax)
message MATCHES "regex"               <- WRONG (no MATCHES)
```

### Negated operators (scalar vs array)

**Scalar fields** (including `subsource` (LQL) and other string paths):

- `!:` and `!=` match when the field is **absent or NULL** as well as when the value does not match.
- `subsource!:win.servicing.dism` (LQL) matches events with no `subsource` (LQL) value.

**Array fields** (unindexed `x.tags` (LQL), not `x.tags[0]`):

- `!:` and `!=` apply only when the field is present **and** is a JSON array.
- Absent or non-array values do **not** match.
- To include rows with no array: `x.tags !: noise OR NOT x.tags!` (LQL)

**Search indexes:** scalar `!:` / `!=` and unary `NOT` on indexed terms do not use the search index. Positive `:` / `=` terms in the same `AND` may still use the index.

### Empty string literals (scalar strings only)

These rules apply to string fields such as `source` (LQL), `app` (LQL), `subsource` (LQL), and custom paths like `x.foo` (LQL). The behavior is the same for every string field name in LQL.

| Form | Meaning |
|---|---|
| `field=""` | The field is missing, null, or the empty string |
| `field!=""` | The field is present and has a non-empty string value |
| `field in ("", a, …)` / `field=("", …)` with `""` in the list | The field is missing, null, empty, or matches any other listed value |
| `field not in (…)` or a negated list that includes `""` | The opposite of the matching rules in the row above |

`""` is what an absent value RENDERS as, in a TSV cell and in a group key; a JSONL row omits the field instead. Pasting `""` back as `field=""` returns the rows it came from.

**Numbers and other non-string types:** `x.count=0` (LQL) matches only when the stored value is exactly `0`. It does not match a missing field, and a missing field is not treated as zero. Use `NOT x.count!` (LQL) to test for absence on numeric fields.

Do not use `field:""` (matches every event) or `field!:""` (matches no events). Use `NOT field!` to test for a missing field. Use `field#s!` when you need to assert JSON type on a custom path.

`field!=val` (LQL) on a scalar also matches when the field is missing.
To require the field to be present and not equal to a value, write `field! AND field!=val` (LQL).

### Array of objects (`[]()`)

For an array of objects, `path[](expr)` (LQL) matches when at least one element satisfies `expr` (other).
Names inside the parentheses are fields on that element, not on the event.
`path[].leaf=val` (LQL) is the same as `path[](leaf=val)` (LQL).

`path[]!` (LQL) matches when `path` (LQL) is present and is an array, including an empty array.

| Query | Missing field | Empty array | Has a matching element | Other elements only |
|---|---|---|---|---|
| `path[](pid=1)` (LQL) | no | no | yes | no |
| `NOT path[](pid=1)` (LQL) | yes | yes | no | yes |
| `path[]!` (LQL) | no | yes | yes | yes |
| `path[]! AND NOT path[](pid=1)` (LQL) | no | yes | no | yes |

Do not use `processes!` (LQL) for array presence when the named parent is not itself an array field.
Use `path[]!` (LQL).

Bare terms and `any:` (LQL) are not allowed inside `[]()`.

One `[]` per path. A list of plain values inside an element needs no second `[]`: `sparklogs.data.processes[](services="NcbService")` (LQL) matches the process whose services list contains that name, and the same predicate in `select` (arg) with a leaf (`sparklogs.data.processes[](services="NcbService").image_name`) returns that leaf for the matching elements. `[]` is for lists of objects only.
Name a field on the element, for example `pid=1234` (LQL).

Two terms inside one `[]()` bind to the SAME element; the same two terms as separate `path[].leaf` (LQL) predicates can be satisfied by two different elements.

A bare term does not reach element values. `any:` (LQL) does, at the usual cost.

In `select` (arg), `path[](pred)` (LQL) returns the matching elements whole and `path[](pred).leaf` returns that leaf per matching element (`[]` when none match). Naming the array alone returns every element.

### No `CONTAINS` / `CONTAINS_ANY` / `CONTAINS_ALL` (array fields use scalar operators directly)

For an array field like `sparklogs.data.system_info.host_roles` (LQL):

```lql
sparklogs.data.system_info.host_roles: dns_server
    <- matches if any element equals "dns_server"
sparklogs.data.system_info.host_roles != (dns_server, sql_server)
    <- matches if NO element equals "dns_server" AND no element equals "sql_server"
sparklogs.data.system_info.host_roles: dns_server AND sparklogs.data.system_info.host_roles: domain_controller
    <- matches if "dns_server" AND "domain_controller" both present
```

```lql
sparklogs.data.system_info.host_roles CONTAINS "dns_server"          <- WRONG
sparklogs.data.system_info.host_roles CONTAINS_ANY ["dns_server"]    <- WRONG
```

### No wildcard JSON paths
LQL does NOT support `sparklogs.data.services.*.current_state = stopped`. Type resolution requires exact paths.

**Workarounds:**
- Filter on a promoted field instead. Curated sources promote the values worth querying to named paths (`sparklogs.*` and the module-prefixed fields); the generated per-source field schema lists them.
- For an array of objects, use the element grammar above. `list_fields` (tool) lists those leaves with their array mark, so the catalog spelling tells you which form a path needs (`guides/stream-kinds/device-state.md`).

```lql
sparklogs.data.services.*.current_state = stopped              <- WRONG (wildcard JSON paths not supported)
sparklogs.reason = service_auto_not_running                   <- right (promoted field)
sparklogs.data.services[](name=Spooler AND current_state=stopped)   <- right (array of objects)
```

---

## Patterns

Pattern operators in unquoted terms:
- `*` - matches any number of any character (zero or more).
- `?` - matches any single character.
- Pattern operators only work on STRING-typed fields; on a numeric field they fail to compile ("invalid numeric value"). Coerce with the `#s` type suffix: `event_id#s: 46??` (LQL).

```lql
subsource: win.eventlog.*                 <- any WEL channel subsource
sparklogs.process.name: msedge*           <- anything starting with msedge
source: srv-app0?                         <- srv-app0 plus any one character (srv-app01, srv-app0b)
```

A bare term with no field name searches the standard string fields: `message` (LQL), `pattern` (LQL), `category` (LQL),
`subsource` (LQL), `source` (LQL), `app` (LQL), `service` (LQL), `trace_id` (LQL), `span_id` (LQL), and the companion hash fields
(`pattern_hash` (LQL), `category_hash` (LQL), `subsource_hash` (LQL), `source_hash` (LQL), `app_hash` (LQL), `service_hash` (LQL)).
It does NOT search custom fields; use the `any` (other) meta field for that.

```lql
failed                                    <- matches events with "failed" in any standard string field
"timed out"                               <- matches events with "timed out" in any standard string field
win.servicing.dism                        <- matches events with that subsource (or any standard string field)
```

A bare term reaches every standard field listed above. It does not reach payload leaves; `any` (other) does.

**Hash paste widening.** An equality on one of the six base fields whose literal has the hash token shape compiles to base OR twin, so a `*_hash` value pastes into either name:

```lql
pattern_hash = "divgfo_9v7cgvjijykp0zu5"       <- the twin
pattern = "divgfo_9v7cgvjijykp0zu5"            <- same rows; the equality widens
```

**Permanent aliases.** `t` (LQL) and `ingested_t` (LQL) are the timestamp and the ingest timestamp; `org_id` (LQL) is the organization. They are the same names in responses and the names LQL accepts, in every LQL parameter. Inside an element scope (`[]()`) the same three names are payload keys on the element.

---

## Regex

Slash-delimited, re2 syntax. Used with operators `:`, `!:`, `=`, `!=`. **The choice of operator matters** - see below.

```lql
message: /[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}/      <- contains a UUID anywhere in message
```

The full power of re2 is available; use sparingly because regex evaluation is slower than substring matching.

### Operator + regex semantics

The operator you pair with `/regex/` changes whether the match is "contains the pattern anywhere" or "the entire value matches the pattern."

| Operator | Semantics with `/regex/` |
|---|---|
| `field: /regex/` | Match if value **contains** the regex pattern anywhere in it. Like `re.search()` in Python. |
| `field !: /regex/` | Match if value does NOT contain the pattern anywhere. |
| `field = /regex/` | Match if regex matches the **entire value**. Like `re.fullmatch()` in Python - anchors at both ends. |
| `field != /regex/` | Match if regex does NOT match the entire value. |

**Examples showing the distinction:**

```lql
win.eventlog.setup.error_code: /0x8024[0-9a-f]+/   <- matches "0x80240022" and "code 0x80240022 at stage 2" (regex appears anywhere)
win.eventlog.setup.error_code = /0x8024[0-9a-f]+/   <- matches "0x80240022" only (regex must match entire value)
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

```lql
severity >= warning AND source = "srv-x"
(severity = error OR event_id = 7031) AND source = "srv-x"
NOT (subsource = win.eventlog.apps) AND severity >= error
```

**Implicit AND:** adjacent expressions are AND'ed. These are equivalent:

```lql
severity = error source = "srv-x"
severity = error AND source = "srv-x"
```

---

## Quoting

Use `"`, `'`, or backtick. Escape inner quote with `\`.

```lql
source = "srv-fileshare01"
message: "request timed out"
filename: 'Alice\'s file.txt'
```

Hyphens and slashes inside an unquoted term work fine (just can't begin the term):
```lql
top/sub-folder/picture.png        <- unquoted, fine
/create                           <- needs quoting because starts with /
"/create"                         <- right
```

---

## JSON field paths

Dot-separated. Field name components with whitespace or period must be double-quoted:

```lql
sparklogs.data.system_info.reboot_pending!               <- simple path
x.foo.bar!                                               <- nested custom field (illustrative)
x."custom field"."some \"quoted\" field".final_value!   <- components with whitespace/quotes
```

---

## Type suffixes (rare in agent practice)

Append `#` followed by type letter:
- `#s` - string
- `#n` - numeric
- `#i` - 64-bit integer. Forces an exact integer reading of a payload number whose default double reading loses digits on 64-bit ids, hashes and nanosecond timestamps. A non-integral value reads as null instead of rounding.
- `#t` - timestamp
- `#b` - boolean
- `#severity` - ordered severity enum. Renders as a name (ERROR, WARNING, ...); compare by name (`severity >= error` (LQL)), never by number. No arithmetic aggregate (sum/avg/stddev/percentile) - use `min` (value) or `max` (value) instead, or `group_by` (arg).
- `#facility` - ordered facility enum (kern, user, ...). Same rules as `#severity`: compare by name, no arithmetic aggregate.

`[]` for array. e.g., `x.my_array#i[]` - array of integers.

Auto-resolves type when omitted. Only use type suffix when the field has multiple types and you need to disambiguate.

In a `refine_query_result` (tool) response, a `severity` (LQL) or `facility` (LQL) column reports its `schema.columns` (col) type as the enum name (severity, facility), not i or n - honest to the enum, not the integer storage.

---

## `any` (other) meta field

Searches all standard string + custom fields (same standard string fields as a bare term, plus every custom field). Only with `:` operator. Slow - use sparingly.

```lql
any: "credit card"                       <- search all fields for "credit card"
```

---

## Forbidden / not supported

- **No JOIN** across event rows. LQL is a row predicate.
- **No subqueries** in filter expressions.
- **No COUNT or other aggregations in filter expressions.** `query_event_counts_by_severity` (tool) always returns `event_count` (col) plus the per-band severity counts; there is no aggregation list to pass it.
- **No wildcard JSON paths** (per above).
- **No `LIKE`, `MATCHES`, `IS NULL`, `CONTAINS_ANY`, `CONTAINS_ALL`** keywords.

---

## Canonical recurring patterns

**Field-availability note.** `sparklogs.*` curated fields exist on events a source pack curated, and only on the streams that carry them; module-prefixed fields are narrower still. An empty result on a curated or module field may mean the source never writes that field, so check what the source carries before reading anything into it, and fall back to `severity` (LQL) / `message` (LQL) / `pattern` (LQL), which every source carries.

### Failure-side filter (the most common starting filter)

```lql
severity >= warning      <- curated sweeps: WARNING and above, the failure side every tool's band columns use
severity >= error        <- raw, high-volume streams where WARNING is noise
```

`>= error` drops Minor and Warning, where app crashes and hangs (Minor) and process crashes (Warning) sit.

Compare severity by name with `>=`.
`severity in (error, critical)` (LQL) is an exact list: it drops MINOR, SERIOUS, SEVERE and every WARNING level, which is where most curated failure signal sits.

### Single-source single-time-window scope

```lql
source = "srv-fileshare01"       <- exact, case included
```

`source` (LQL) equality is case-sensitive; payload leaves and `subsource` (LQL) are not. Copy the host name from `resolve_scope` (tool) or `list_sources` (tool). `source:` (LQL) is a contains match (it also matches `srv-fileshare01-old`): use it only to find the spelling, then group by `source` (LQL).

Combined with the `start` (arg) / `end` (arg) window parameters (which are separate from the LQL filter).

### Multi-source set

```lql
source in ("ws01.acme", "ws02.acme", "ws03.acme")
```

### Source-pattern set (e.g., all app servers)

```lql
source: srv-app*
```

### Specific subsource

`subsource` (LQL) is the feed id on agent data. Device-state topics and `service` (LQL) values are other fields.

```lql
subsource = "win.eventlog.system"
subsource in (win.eventlog.system, win.eventlog.application)   <- multi-subsource
sparklogs.topic = vss_writers                                   <- a device-state topic, not a subsource
```

### Specific kind

```lql
sparklogs.kind = inventory
sparklogs.kind in (inventory, delta)                   <- what is on the box, or what changed
sparklogs.kind = monitor                               <- a tracked condition
sparklogs.kind = occurrence                            <- device-state crashes, boot and shutdown marks, service crashes; not app_crash or app_hang
sparklogs.kind = agent_op                              <- agent self-observability
```

### Windows Event Log (WEL) channel and publisher

WEL identity is **`subsource` (LQL)**.
`app` (LQL) is a product token when present (`guides/app-vocabulary.md`).
Explore ladders: `guides/stream-kinds.md`.

```lql
subsource = "win.eventlog.application" AND event_id = 1000
provider_name: Microsoft-Windows-Backup*
```

### Snapshot payload element

```lql
sparklogs.data.services[](current_state=stopped AND start_type=auto_delayed)
sparklogs.data.disk_volumes[](volume_role=os AND free_pct<25)
sparklogs.data.vss_writers[](writer_present=true AND writer_state_failed=true)
```

Host-scoped topics carry no array: `sparklogs.data.performance.commit_pct>55` (LQL).

### Chain walk (one era of state)

```lql
sparklogs.epoch.id = "qX9k2mp4n7t1c8r5"
```

Order within the era on `sparklogs.epoch.seq` (LQL), which is monotonic, rather than on the timestamp.

### Ingest-health check

```lql
sparklogs.kind = agent_op
```

`agent_op` (value) rows are stamped when an investigator must distrust or re-interpret other data on that host. Treat an EMPTY result as inconclusive rather than reassuring: a healthy agent, an agent that is not reporting, and a topic disabled for that agent's rollout ring look identical from here.

### Time-range narrowing within an LQL filter

The `start` (arg) / `end` (arg) window is the primary time scope. To narrow further inside a cached scan via `refine_query_result` (tool)'s `filter_lql` (arg):

```lql
t between 2026-04-23T03:00:00Z and 2026-04-23T04:00:00Z
```

---

## Common LQL mistakes (most-bitten-by-this-list)

1. **`LIKE "win.eventlog/%"` instead of a pattern with `*`.** SparkLogs is not SQL.
2. **`MATCHES "regex"` instead of `: /regex/`.** Slash-delimited.
3. **`IS NULL` / `IS NOT NULL` instead of `NOT field!` / `field!`.** Different syntax.
4. **`CONTAINS "value"` for arrays instead of `field: value` or `field = value`.** Array fields use scalar operators directly.
5. **Wildcard JSON paths.** `sparklogs.data.services.*.current_state = stopped` does not work. Use the element grammar or a promoted field.
6. **Square brackets for value lists.** `subsource in [win.eventlog.system, win.eventlog.application]` is rejected. Use `subsource in (win.eventlog.system, win.eventlog.application)` (LQL) with parentheses.
7. **Quoting unquoted terms unnecessarily.** `severity = "error"` (LQL) works but `severity = error` (LQL) is fine and more readable.
8. **Forgetting parentheses around OR with implicit AND.** `severity = error OR event_id = 7031 source = "x"` (LQL) parses unexpectedly. Use parentheses: `(severity = error OR event_id = 7031) AND source = "x"` (LQL).
9. **Mixing `&&` / `||` with `AND` / `OR` in the same expression.** Both work but consistency reads better.
10. **Hallucinating field names.** A name nothing has emitted is not refused; it reads as empty, and the response lists it under `schema.empty_requested_columns` (col). A `group_by` (arg) on such a name is refused with an error naming it: drop that key and rerun. Elsewhere it is a normal outcome rather than an error, so treat it as a prompt to check the spelling, not as something to report. Take field names from `list_fields` (tool), `fields/INDEX.md` or the feed's `fields.md`. `list_fields` (tool) omits unstable process-id paths; it is the workspace catalog for names you have not seen (`guides/stream-kinds/device-state.md`).
11. **Bare terms inside `[]()`.** Name a field on the element (`pid=1234` (LQL)). `processes!` (LQL) is not array presence; use `path[]!` (LQL).

---

## Wrong syntax returns zero rows, not an error

Most malformed filters do not fail.
`LIKE`, `MATCHES`, `IS NULL` and `CONTAINS` are read as bare search terms, and a wildcard JSON path names a field nothing carries: the query returns zero rows, or rows that happen to contain those words.
Square brackets in a value list (`severity in [error, critical]`) are the exception: the parser rejects them with `unexpected token ","`.

So an unexpected zero, or an odd match count, on a filter you wrote by hand is a syntax and spelling check first.
Compare the filter against this file, read `schema.empty_requested_columns` (col), and confirm field names with `list_fields` (tool) before reporting the absence as a finding.
