# Kind: file log

Group **`origin`** when more than one file is in play, then `pattern` / `severity` / `reason`.
`origin` is the normalized path (`<os>/...`), which is the group-by field.
`filename` is the raw name; use it only when you already have it from a row.

This kind is any **file-backed** feed, not only Windows servicing.
CBS and DISM are the ones shipped today.

No `provider_name` and no `winlog.event_id`. Do not copy a WEL ladder onto these feeds.

## Known file feeds

| `subsource` | Purpose | Typical `origin` |
|---|---|---|
| `win.servicing.cbs` | CBS component-store and package operations | `<os>/logs/cbs/cbs.log`; also `<os>/logs/cbs/cbspersist_*.log` |
| `win.servicing.dism` | DISM operations and image health | `<os>/logs/dism/dism.log` |

Theme for those two: `themes/windows-updates-and-patching.md`.
WU Setup (WEL) and WU **agent state** are different surfaces (`guides/stream-kinds.md` table).

## Explore

1. Scope `subsource`.
2. Group **`origin`** when more than one file is in play, then `pattern` / `severity` / `reason`.
3. Read `message` for the line the pattern collapsed.
