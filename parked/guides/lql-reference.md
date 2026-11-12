<!-- Moved from src/guides/lql-reference.md at 29a8d32. Fits ingest-key web, APM or trace data, not today's agent data. -->

Examples that assume web or tracing data, which no Windows endpoint feed carries today.

```
| `<field>!` | field is present in the event | Presence check; matches even when the value is an explicit JSON `null` (other) (absent field = no match). e.g., `trace_id!` |
NOT trace_id!     <- is-null
trace_id!         <- is-not-null
- Pattern operators only work on STRING-typed fields; on a numeric field they fail to compile ("invalid numeric value"). Coerce with the `#s` type suffix: `x.http.response.status#s not in (2??, 3??)`.
x.error_code: /E[0-9]+/        <- matches "E1234", "PRE-E5678", "EXX99-extra" (regex appears anywhere)
x.error_code = /E[0-9]+/       <- matches "E1234" only (regex must match entire value)
x.http.response.status!                                  <- nested custom field
```

### Trace ID

```lql
trace_id = "abc123def456"
```
