# Stream kinds

How to explore a stream once you know its `subsource` (LQL): which field to group first, then what to drill.
Open this index, then **one** kind file.

**WEL** means Windows Event Log.

Several feeds share a kind (Application and System are the same ladder).
Kind is the explore shape, not a 1:1 map to `subsource` (LQL).

`feeds/<id>/fields.md` answers a different question: which promoted fields that module writes.
`provider_name` (LQL), `event_id` (LQL) and `origin` (LQL) often live only on the kind ladder, not in `fields.md`.

Product tokens on `app` (LQL): `guides/app-vocabulary.md`.

## Feed → kind

| `subsource` (LQL) | Kind | File |
|---|---|---|
| `win.eventlog.application` (value) | WEL classic | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.system` (value) | WEL classic | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.platform` (value) | WEL multi-channel | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.storage` (value) | WEL multi-channel | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.network` (value) | WEL multi-channel | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.identity_security` (value) | WEL multi-channel | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.management` (value) | WEL multi-channel | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.apps` (value) | WEL multi-channel | `guides/stream-kinds/wel-classic.md` |
| `win.eventlog.security` (value) | WEL Security | `guides/stream-kinds/wel-security.md` |
| `win.eventlog.setup` (value) | WEL Setup | `guides/stream-kinds/wel-setup.md` |
| `win.defender.eventlog` (value) | WEL Defender | `guides/stream-kinds/wel-defender.md` |
| `win.servicing.cbs` (value) | File log | `guides/stream-kinds/file-log.md` |
| `win.servicing.dism` (value) | File log | `guides/stream-kinds/file-log.md` |
| `sparklogs.device.state` (value) | Device state | `guides/stream-kinds/device-state.md` |
| `sparklogs.agent.vector` (value) | Collector debug | `guides/stream-kinds/collector-debug.md` |
| `sparklogs.agent.log` (value) | Collector debug | `guides/stream-kinds/collector-debug.md` |

A `subsource` (LQL) not in this table comes from an ingest key or another non-agent sender: it is freeform, carries no feed health, and is uncurated text (`message` (LQL) / `pattern` (LQL) / `severity` (LQL)).

## Portable fields

Curated fields (`sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `sparklogs.class` (LQL), `sparklogs.kind` (LQL), `sparklogs.instance` (LQL), `sparklogs.topic` (LQL), Security `sparklogs.actor.*`) mean the same on every feed: `guides/scope-ladder.md`.
Most WEL rows do not carry them; absence is a missing promotion, not a missing event.

## Device state vs events

Device questions go to `query_device_health` (tool): which view answers which question is `guides/device-state-fields.md` (**Choose the view**).
The event stream of the same feed is `query_logs` (tool) scoped to `subsource` (LQL) `=` `"sparklogs.device.state"`.
MCP column names (`sparklogs.kind` (col), `sparklogs.instance` (col), `sparklogs.episode.replaced_id` (col)) are the same dotted `sparklogs.*` spelling as the LQL path. Detail: `guides/device-state-fields.md`.
