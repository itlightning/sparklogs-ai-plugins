# Stream kinds

How to explore a stream once you know its `subsource` (LQL): which field to group first, then what to drill.
Open this index, then **one** kind file.

**WEL** means Windows Event Log.

Several feeds share a kind (Application and System are the same ladder).
Kind is the explore shape, not a 1:1 map to `subsource` (LQL).

`../feeds/<id>/fields.md` answers a different question: which promoted fields that module writes.
`provider_name` (LQL), `event_id` (LQL) and `origin` (LQL) often live only on the kind ladder, not in `fields.md`.

Product tokens on `app` (LQL): `app-vocabulary.md`.

## Feed → kind

| `subsource` (LQL) | Kind | File |
|---|---|---|
| `win.eventlog.application` | WEL classic | `stream-kinds/wel-classic.md` |
| `win.eventlog.system` | WEL classic | `stream-kinds/wel-classic.md` |
| `win.eventlog.platform` | WEL multi-channel | `stream-kinds/wel-classic.md` |
| `win.eventlog.storage` | WEL multi-channel | `stream-kinds/wel-classic.md` |
| `win.eventlog.network` | WEL multi-channel | `stream-kinds/wel-classic.md` |
| `win.eventlog.identity_security` | WEL multi-channel | `stream-kinds/wel-classic.md` |
| `win.eventlog.management` | WEL multi-channel | `stream-kinds/wel-classic.md` |
| `win.eventlog.apps` | WEL multi-channel | `stream-kinds/wel-classic.md` |
| `win.powershell.eventlog` | WEL multi-channel (script blocks: `../playbooks/powershell-script-blocks.md`) | `stream-kinds/wel-classic.md` |
| `win.eventlog.security` | WEL Security | `stream-kinds/wel-security.md` |
| `win.eventlog.setup` | WEL Setup | `stream-kinds/wel-setup.md` |
| `win.defender.eventlog` | WEL Defender | `stream-kinds/wel-defender.md` |
| `win.servicing.cbs` | File log | `stream-kinds/file-log.md` |
| `win.servicing.dism` | File log | `stream-kinds/file-log.md` |
| `sparklogs.device.state` | Device state | `stream-kinds/device-state.md` |
| `sparklogs.agent.vector` | Collector debug | `stream-kinds/collector-debug.md` |
| `sparklogs.agent.log` | Collector debug | `stream-kinds/collector-debug.md` |

A `subsource` (LQL) not in this table is either ingest-key data or an agent feed whose reference is not in this plugin. Check `sent_via` (col) on `list_sources` before treating it as uncurated: an agent feed still has feed health and may carry `sparklogs.reason` (LQL); explore a Windows Event Log one with `stream-kinds/wel-classic.md`. Ingest-key data is freeform and uncurated text (`message` (LQL) / `pattern` (LQL) / `severity` (LQL)).

## Which channels are collected

To see which Windows Event Log channels a host sends, count its events grouped by `subsource` (LQL) and `origin` (LQL) over a few days (`query_event_counts_by_severity` with `group_by=["subsource", "origin"]` and `source = "<host>"` (LQL)).
On a host whose feeds report current, a channel absent from that list is not collected, or logged nothing in the window. Quiet channels exist, so widen the window before saying a channel is not collected.
The Windows Event Log feeds collect Microsoft channels plus a few vendor channels; a backup, EDR or RMM vendor's own channel is not among them.

## Portable fields

Curated fields (`sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `sparklogs.class` (LQL), `sparklogs.kind` (LQL) (set on few Windows Event Log reasons: `category-classes.md`, Kind), `sparklogs.instance` (LQL), `sparklogs.topic` (LQL), Security `sparklogs.actor.*`) mean the same on every feed: `scope-ladder.md`.
Most WEL rows do not carry them; absence is a missing promotion, not a missing event.

## Device state vs events

Device questions go to `query_device_health`: which view answers which question is `device-state-fields.md` (**Choose the view**).
The event stream of the same feed is `query_logs` scoped to `subsource` (LQL) `=` `"sparklogs.device.state"`.
MCP column names (`sparklogs.kind` (col), `sparklogs.instance` (col), `sparklogs.episode.replaced_id` (col)) are the same dotted `sparklogs.*` spelling as the LQL path. Detail: `device-state-fields.md`.
