# Kind: device state

**Latest in a window:** `query_device_health` (tool) (`fieldset` (arg) = `rca` (value) for one host).
Columns: `guides/device-state-fields.md`.
A row is the latest event of each episode that emitted inside the requested window.
That is not a time series.

**Event stream:** `query_logs` (tool) on `subsource` (LQL) `=` `"sparklogs.agent.state"`.
Group `sparklogs.kind` (LQL), `sparklogs.topic` (LQL), `sparklogs.reason` (LQL).

No `provider_name` (LQL). Do not explore this feed like WEL.
Generated `feeds/sparklogs.agent.state/fields.md` lists module promotions. The snapshot payload is wire `sparklogs.data.*`.

`list_fields` (tool) is a good catalog call. Discovery omits unstable process-id map paths (see Maps).
Service names and similar stable instance keys remain. The catalog is not the explore ladder: still group `sparklogs.kind` (LQL) / `sparklogs.topic` (LQL) / `sparklogs.reason` (LQL) first on logs.

## Latest-in-window vs event stream

| Question | Surface |
|---|---|
| What is on the box / open condition in this window (episode-collapsed) | `query_device_health` (tool) (`fieldset` (arg) = `rca` (value) for one host). Columns: `guides/device-state-fields.md` |
| How it changed, every snapshot, hour by hour | `query_logs` (tool) on this `subsource` (LQL). Group `sparklogs.kind` (LQL), `sparklogs.topic` (LQL), `sparklogs.reason` (LQL) |

Do not paste MCP column names into LQL.
`kind` (col) in device-health is `sparklogs.kind` (LQL) in logs.
`subsource` (col) on health rows is the feed id `sparklogs.agent.state` (value), the same stamp as logs.
`topic` (col) is the subject family (`disk_volumes` (value), `processes` (value), `services` (value)).

## Event kinds (logs)

Typical mix: **inventory** (what is on the box), **delta** (change), **monitor** (open condition; this is where `sparklogs.reason` (LQL) is dense).
`sparklogs.topic` (LQL) is the subject family (`processes` (value), `services` (value), `disk_volumes` (value), host-scoped topics such as `performance` (value)).

Group those three. Then `instance` (col) on the MCP row, or a named `sparklogs.reason` (LQL).

LQL map wildcards over instance keys are **not shipped**. Do not invent `processes.*.cpu`.

## Maps vs host

Some topics store **one object per instance** under a map whose keys are instance identities.

- **Processes:** keys are numeric PIDs (then create-time). Those paths churn every process start. Field discovery omits `sparklogs.data.processes.<pid>` and everything under it. LQL still accepts a known path.
- **Services, volumes, writers, products:** instance keys are stable enough to appear in `list_fields` (tool). Useful to discover a name; not a substitute for grouping `sparklogs.topic` (LQL) / `sparklogs.reason` (LQL) / MCP `instance` (col).

Host-scoped topics put fields directly under `sparklogs.data.<topic>` (no per-instance map).

MCP `instance` (col) (and `display_name` (col)) is how you name a subject on the health surface today.

## Accuracy

Inventory without a `sparklogs.reason` (LQL) is still state, not a problem.
Open monitor ≠ incident (`guides/category-classes.md`).
Theme: `themes/device-health-and-state.md`.
