# Identifier names in backticks

In authored `src/` prose, tag every identifier-shaped backtick (`[a-z][a-z0-9_.]*`):

| Tag | Meaning | Ships in the pack? | SoT |
|---|---|---|---|
| `(arg)` | MCP tool input | yes | identifier-sot.yaml args |
| `(col)` | Response column | yes | cols (some are dotted sparklogs.* paths on device-health) |
| `(LQL)` | Log filter / counts `group_by` (arg) | yes | library public fields + lql_resident; family globs need lql_families |
| `(tool)` | MCP tool name | stripped on render | tools (14 shipped names) |
| `(value)` | Closed vocabulary | stripped on render | feeds, kinds, apps, statuses, topics, reason values, enums |
| `(other)` | Syntax / pedagogy (`in` (other), `null` (other), `asc` (other)) | stripped on render | not in any product set; not dotted |

Names inside fenced LQL and JSON tool-call blocks are not tagged.
Give every LQL block the info string ```` ```lql ````; `<-` starts an end-of-line note inside one.
Tag an inline LQL expression with `(LQL)` too, e.g. `service = backup` (LQL).
Every field named in an LQL block or an `(LQL)` span must be vetted: in `scripts/fixtures/lql-live-fields.txt` (a `list_fields` (tool) snapshot), declared by the pack (`src/feeds/`, `src/fields/`), or on `lql_pedagogical` (other) in `scripts/identifier-sot.yaml` for made-up example names, which the guide marks as illustrative.
`lint-identifier-tags.mjs` fails on an unvetted field in authored `src/`, only warns for generated `src/feeds/`, and lists pack-declared fields the snapshot has not seen.
Do not use a file-wide default.
A body in two sets (`subsource` (LQL) or `subsource` (col)) may wear either tag.
`(other)` cannot launder a real identifier.
Dual names: LQL is `sparklogs.reason` (LQL); device-health column is the same spelling, `sparklogs.reason` (col); filter argument is `reasons` (arg).
`yarn validate:rendered` fails if `(tool)` / `(value)` / `(other)` reach dist, or if a host pack has no `(arg)`, `(col)`, and `(LQL)`.
