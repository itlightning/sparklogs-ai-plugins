# Identifier names in backticks

In authored `src/` prose, tag every identifier-shaped backtick (`[a-z][a-z0-9_.]*`):

| Tag | Meaning | Ships in the pack? |
|---|---|---|
| `(arg)` | MCP tool input | yes |
| `(col)` | Response column | yes |
| `(LQL)` | Log filter / counts `group_by` (arg) | yes |
| `(tool)` | MCP tool name | stripped on render |
| `(value)` | Closed vocabulary (subsource id, kind, app token) | stripped on render |

Fenced LQL and JSON tool-call blocks are not tagged.
Do not use a file-wide default. Dual names: LQL is `sparklogs.reason` (LQL); device-health column is `reason` (col); filter argument is `reasons` (arg).
