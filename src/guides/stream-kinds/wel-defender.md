# Kind: WEL Defender

Scope **`subsource = "win.defender.eventlog"`**.
Group **`winlog.event_id` / `reason` / `pattern`**.
**`event_data.*` is expected** on this channel.

One publisher is typical, so `provider_name` is not the split.
`app` may be set (`windows_defender`). Still scope with `subsource` first so you do not depend on `app` fill rate.

## Explore

1. Scope this `subsource`.
2. Group `winlog.event_id` / `reason` / `pattern`.
3. Read **`event_data.*`**.
4. Theme: `themes/endpoint-protection.md`.

## Accuracy

Defender operational events are not installed-product inventory.
Named backup or AV products on the box: `query_device_health`, not this feed alone.
