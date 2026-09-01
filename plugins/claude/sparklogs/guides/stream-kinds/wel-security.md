# Kind: WEL Security

Scope **`subsource = "win.eventlog.security"`**.
Then **`sparklogs.actor.*`**, **`sparklogs.reason` (LQL)**, **`winlog.event_id` (LQL)**, then `pattern` (LQL).

`provider_name` (LQL) exists but this channel has few publishers. Grouping by it is a weak split.

## Explore

1. Scope the host to this `subsource` (LQL).
2. Prefer **`sparklogs.actor.*`**, **`sparklogs.reason` (LQL)**, **`winlog.event_id` (LQL)**, then `pattern` (LQL).
3. Worked pivots: `${CLAUDE_PLUGIN_ROOT}/feeds/win.eventlog.security/recipes.md` (one recipe, then confirm `fields.md`).
4. Theme: `${CLAUDE_PLUGIN_ROOT}/themes/windows-security-and-audit.md`.

## Payload

Actor and reason are the portable `sparklogs.*` / top-level `sparklogs.reason` (LQL) surface on this kind.
Raw Security payload remains under provider paths in `fields.md`.

## Accuracy

Empty curated `sparklogs.reason` (LQL) is not "no audit activity". Drop `sparklogs.reason` (LQL) and group `winlog.event_id` (LQL) / `pattern` (LQL) before you stop.
