# Stream kinds

How to explore a stream once you know its `subsource`: which field to group first, then what to drill.
Open this index, then **one** kind file.

Several feeds share a kind (Application and System are the same ladder).
Kind is the explore shape, not a 1:1 map to `subsource`.

`feeds/<id>/fields.md` answers a different question: which promoted fields that module writes.
Envelope keys (`provider_name`, `winlog.event_id`, `filename`) often live only on the kind ladder.

## Feed → kind

| `subsource` | Kind | File |
|---|---|---|
| `win.eventlog.application` | WEL classic | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.system` | WEL classic | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.security` | WEL Security | `guides/stream-kinds/wel-security.md` |
| `win.eventlog.setup` | WEL Setup | `guides/stream-kinds/wel-setup.md` |
| `win.defender.eventlog` | WEL Defender | `guides/stream-kinds/wel-defender.md` |
| `win.servicing.cbs` | File log | `guides/stream-kinds/file-log.md` |
| `win.servicing.dism` | File log | `guides/stream-kinds/file-log.md` |
| `sparklogs.agent.state` | Device state | `guides/stream-kinds/device-state.md` |
| `sparklogs.agent.vector` | Collector debug | `guides/stream-kinds/collector-debug.md` |
| `sparklogs.agent.log` | Collector debug | `guides/stream-kinds/collector-debug.md` |

Unknown `subsource`: treat as uncurated text (`message` / `pattern` / `severity`). Do not invent an `app:` prefix.

## Portable `sparklogs.*`

Prefer these **when present**: `sparklogs.kind`, `sparklogs.topic`, `reason`, `class`, `sparklogs.episode.*`, Security `sparklogs.actor.*`.
Most Windows Event Log rows do not carry them.
Absence is a missing promotion, not a missing event.

## Device state vs events

"What is on the box / open condition **now**" is `query_device_health`, not a JSON key dump.
History of the same feed is `query_logs` scoped to `subsource = "sparklogs.agent.state"`.
MCP column names (`kind`, `instance`, `episode_replaced_id`) are not LQL paths. Wire LQL uses dotted `sparklogs.*`. Detail: `guides/device-state-fields.md`.
