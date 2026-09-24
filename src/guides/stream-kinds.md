# Stream kinds

How to explore a stream once you know its `subsource` (LQL): which field to group first, then what to drill.
Open this index, then **one** kind file.

**WEL** means Windows Event Log.

Several feeds share a kind (Application and System are the same ladder).
Kind is the explore shape, not a 1:1 map to `subsource` (LQL).

`feeds/<id>/fields.md` answers a different question: which promoted fields that module writes.
`provider_name` (LQL), `winlog.event_id` (LQL) and `origin` (LQL) often live only on the kind ladder, not in `fields.md`.

Product tokens on `app` (LQL): `guides/app-vocabulary.md`.

## Feed → kind

| `subsource` (LQL) | Kind | File |
|---|---|---|
| `win.eventlog.application` (value) | WEL classic | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.system` (value) | WEL classic | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.security` (value) | WEL Security | `guides/stream-kinds/wel-security.md` |
| `win.eventlog.setup` (value) | WEL Setup | `guides/stream-kinds/wel-setup.md` |
| `win.defender.eventlog` (value) | WEL Defender | `guides/stream-kinds/wel-defender.md` |
| `win.servicing.cbs` (value) | File log | `guides/stream-kinds/file-log.md` |
| `win.servicing.dism` (value) | File log | `guides/stream-kinds/file-log.md` |
| `sparklogs.device.state` (value) | Device state | `guides/stream-kinds/device-state.md` |
| `sparklogs.agent.vector` (value) | Collector debug | `guides/stream-kinds/collector-debug.md` |
| `sparklogs.agent.log` (value) | Collector debug | `guides/stream-kinds/collector-debug.md` |

Unknown `subsource` (LQL): treat as uncurated text (`message` (LQL) / `pattern` (LQL) / `severity` (LQL)).

## Portable fields

Prefer these **when present**:

- Under `sparklogs.*`: `sparklogs.kind` (LQL), `sparklogs.topic` (LQL), `sparklogs.episode.*`, Security `sparklogs.actor.*`
- Top-level (same facts, usual LQL/`group_by` (arg) names): `sparklogs.reason` (LQL), `sparklogs.class` (LQL)

Most WEL rows do not carry them.
Absence is a missing promotion, not a missing event.

## Device state vs events

"Latest event of each episode in this window" is `query_device_health` (tool) with `view` (arg) omitted.
"What is on the box / how it last read" is the same tool with `view` (arg) `latest_state` (value).
Episode series, or repeating change points, is the same tool with `view` (arg) `event_timeline` (value). A device-state value over time is `view` (arg) `series` (value) with `topics` (arg).
The event stream of the same feed is `query_logs` (tool) scoped to `subsource` (LQL) `=` `"sparklogs.device.state"`.
MCP column names (`sparklogs.kind` (col), `sparklogs.instance` (col), `sparklogs.episode.replaced_id` (col)) are the same dotted `sparklogs.*` spelling as the LQL path. Detail: `guides/device-state-fields.md`.
