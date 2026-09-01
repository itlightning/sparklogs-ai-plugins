# Kind: file log

Group **`origin` (LQL)** when more than one file is in play, then `pattern` (LQL) / `severity` (LQL) / `sparklogs.reason` (LQL).
`origin` (LQL) is the normalized path (`<os>/...`), which is the group-by field.
`filename` (LQL) is the raw name; use it only when you already have it from a row.

This kind is any **file-backed** feed, not only Windows servicing.
CBS and DISM are the ones shipped today.

No `provider_name` (LQL) and no `winlog.event_id` (LQL). Do not copy a WEL ladder onto these feeds.

## Known file feeds

| `subsource` (LQL) | Purpose | Typical `origin` (LQL) |
|---|---|---|
| `win.servicing.cbs` | CBS component-store and package operations | `<os>/logs/cbs/cbs.log`; also `<os>/logs/cbs/cbspersist_*.log` |
| `win.servicing.dism` | DISM operations and image health | `<os>/logs/dism/dism.log` |

Theme for those two: `${CLAUDE_PLUGIN_ROOT}/themes/windows-updates-and-patching.md`.
WU Setup (WEL) and WU **agent state** are different surfaces (`${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds.md` table).

## Explore

1. Scope `subsource` (LQL).
2. Group **`origin` (LQL)** when more than one file is in play, then `pattern` (LQL) / `severity` (LQL) / `sparklogs.reason` (LQL).
3. Read `message` (LQL) for the line the pattern collapsed.
