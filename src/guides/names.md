# Identifier names in backticks

In authored `src/` prose, tag every identifier-shaped backtick (`[a-z][a-z0-9_.]*`):

| Tag | Meaning | Ships in the pack? | SoT |
|---|---|---|---|
| `(arg)` | MCP tool input | yes | identifier-sot.yaml args |
| `(col)` | Response column | yes | cols (not sparklogs.* wire paths) |
| `(LQL)` | Log filter / counts `group_by` (arg) | yes | library public fields + lql_resident; family globs need lql_families |
| `(tool)` | MCP tool name | stripped on render | tools (11 shipped names) |
| `(value)` | Closed vocabulary | stripped on render | feeds, kinds, apps, statuses, topics, reason slugs, enums |
| `(other)` | Syntax / pedagogy (`in` (other), `null` (other), `asc` (other)) | stripped on render | not in any product set; not dotted |

Fenced LQL and JSON tool-call blocks are not tagged.
Do not use a file-wide default.
A body in two sets (`subsource` (LQL) or `subsource` (col)) may wear either tag.
`(other)` cannot launder a real identifier.
Dual names: LQL is `sparklogs.reason` (LQL); device-health column is `reason` (col); filter argument is `reasons` (arg).
Future tools (`query_device_state` (other)) are not `(tool)` until they ship.
`yarn validate:rendered` fails if `(tool)` / `(value)` / `(other)` reach dist, or if a host pack has no `(arg)`, `(col)`, and `(LQL)`.
