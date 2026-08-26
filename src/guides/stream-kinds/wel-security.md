# Kind: WEL Security

Scope **`subsource = "win.eventlog.security"`**.
Then **`sparklogs.actor.*`**, **`reason`**, **`winlog.event_id`**, then `pattern`.

`provider_name` exists but this channel has few publishers. Grouping by it is a weak split.
Do not use `app` to pick this channel.

## Explore

1. Scope the host to this `subsource`.
2. Prefer **`sparklogs.actor.*`**, **`reason`**, **`winlog.event_id`**, then `pattern`.
3. Worked pivots: `feeds/win.eventlog.security/recipes.md` (one recipe, then confirm `fields.md`).
4. Theme: `themes/windows-security-and-audit.md`.

## Payload

Actor and reason are the portable `sparklogs.*` surface on this kind.
Raw Security payload remains under provider paths in `fields.md`.

## Accuracy

Empty curated `reason` is not "no audit activity". Drop `reason` and group `winlog.event_id` / `pattern` before you stop.
