# Kind: WEL Defender

Scope **`subsource = "win.defender.eventlog"`**.
Group **`winlog.event_id` (LQL) / `sparklogs.reason` (LQL) / `pattern` (LQL)**.
**`event_data.*` is expected** on this channel.

One publisher is typical, so `provider_name` (LQL) is not the split.
`app` (LQL) is often `windows_defender` (value) (`guides/app-vocabulary.md`).

## Explore

1. Scope this `subsource` (LQL).
2. Group `winlog.event_id` (LQL) / `sparklogs.reason` (LQL) / `pattern` (LQL).
3. Read **`event_data.*`**.
4. Theme: `themes/endpoint-protection.md`.

## Accuracy

Defender operational events are not installed-product inventory.
Named backup or AV products on the box: `query_device_health` (tool), not this feed alone.
