# Kind: WEL Setup

Scope **`subsource = "win.eventlog.setup"`**.
Group **`winlog.event_id` (LQL) / `pattern` (LQL) / `sparklogs.reason` (LQL)**.
Payload is often **`user_data.*`**.

Few publishers. `provider_name` (LQL) is optional confirmation, not the first split.

## Explore

1. Scope this `subsource` (LQL).
2. Group `winlog.event_id` (LQL) / `pattern` (LQL) / `sparklogs.reason` (LQL).
3. Read **`user_data.*`** (not Application-style `event_data` (LQL)).
4. Join with CBS/DISM via `${CLAUDE_PLUGIN_ROOT}/themes/windows-updates-and-patching.md`.

## Accuracy

Setup is per-update results. It is not CBS component-store internals and not the WU agent **state** topic on `sparklogs.agent.state`.
