# Kind: WEL Setup

Scope **`subsource = "win.eventlog.setup"`**.
Group **`winlog.event_id` / `pattern` / `reason`**.
Payload is often **`user_data.*`**.

Few publishers. `provider_name` is optional confirmation, not the first split.
Do not use `app` to pick this channel.

## Explore

1. Scope this `subsource`.
2. Group `winlog.event_id` / `pattern` / `reason`.
3. Read **`user_data.*`** (not Application-style `event_data`).
4. Join with CBS/DISM via `themes/windows-updates-and-patching.md`, not by inventing a shared `app`.

## Accuracy

Setup is per-update results. It is not CBS component-store internals and not the WU agent **state** topic on `sparklogs.agent.state`.
