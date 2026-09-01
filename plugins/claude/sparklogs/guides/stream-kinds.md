# Stream kinds

How to explore a stream once you know its `subsource` (LQL): which field to group first, then what to drill.
Open this index, then **one** kind file.

**WEL** means Windows Event Log.

Several feeds share a kind (Application and System are the same ladder).
Kind is the explore shape, not a 1:1 map to `subsource` (LQL).

`${CLAUDE_PLUGIN_ROOT}/feeds/<id>/fields.md` answers a different question: which promoted fields that module writes.
Envelope keys (`provider_name` (LQL), `winlog.event_id` (LQL), `origin` (LQL)) often live only on the kind ladder.

Product tokens on `app` (LQL): `${CLAUDE_PLUGIN_ROOT}/guides/app-vocabulary.md`.

## Feed → kind

| `subsource` (LQL) | Kind | File |
|---|---|---|
| `win.eventlog.application` | WEL classic | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-classic.md` |
| `win.eventlog.system` | WEL classic | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-classic.md` |
| `win.eventlog.security` | WEL Security | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-security.md` |
| `win.eventlog.setup` | WEL Setup | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-setup.md` |
| `win.defender.eventlog` | WEL Defender | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-defender.md` |
| `win.servicing.cbs` | File log | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/file-log.md` |
| `win.servicing.dism` | File log | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/file-log.md` |
| `sparklogs.agent.state` | Device state | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/device-state.md` |
| `sparklogs.agent.vector` | Collector debug | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/collector-debug.md` |
| `sparklogs.agent.log` | Collector debug | `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/collector-debug.md` |

Unknown `subsource` (LQL): treat as uncurated text (`message` (LQL) / `pattern` (LQL) / `severity` (LQL)).

## Portable fields

Prefer these **when present**:

- Under `sparklogs.*`: `sparklogs.kind` (LQL), `sparklogs.topic` (LQL), `sparklogs.episode.*`, Security `sparklogs.actor.*`
- Top-level (same facts, usual LQL/`group_by` (arg) names): `sparklogs.reason` (LQL), `sparklogs.class` (LQL)

Most WEL rows do not carry them.
Absence is a missing promotion, not a missing event.

## Device state vs events

"What is on the box / open condition in this window" is `query_device_health` (latest event per episode that emitted in the window, not a time series).
The event stream of the same feed is `query_logs` scoped to `subsource` (LQL) `=` `"sparklogs.agent.state"`.
MCP column names (`kind` (col), `instance` (col), `episode_replaced_id` (col)) are not LQL paths. Wire LQL uses dotted `sparklogs.*`. Detail: `${CLAUDE_PLUGIN_ROOT}/guides/device-state-fields.md`.
