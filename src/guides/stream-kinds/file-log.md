# Kind: file log (e.g., CBS, DISM)

Group **`filename`** when more than one file is in play, then `pattern` / `severity` / `reason`.
Scope `subsource` (`win.servicing.cbs` or `win.servicing.dism`).
Read `message` for the line the pattern collapsed.

No `provider_name` and no `winlog.event_id`. Do not copy a WEL ladder onto these feeds.

## Explore

1. Scope `subsource` (`win.servicing.cbs` or `win.servicing.dism`).
2. Group **`filename`** when more than one file is in play, then `pattern` / `severity` / `reason`.
3. Read `message` for the line the pattern collapsed.

## Accuracy

CBS/DISM are servicing internals.
WU Setup channel and WU **agent state** are different surfaces (`guides/stream-kinds.md` table).
Theme: `themes/windows-updates-and-patching.md`.
