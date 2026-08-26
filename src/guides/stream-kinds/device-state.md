# Kind: device state

**Now:** `query_device_health` (`fieldset=rca` for one host). Columns: `guides/device-state-fields.md`.
**History:** `query_logs` on `subsource = "sparklogs.agent.state"`. Group **`sparklogs.kind`**, **`sparklogs.topic`**, **`reason`**.

No `provider_name`. Do not explore this feed like Windows Event Log.
Generated `feeds/sparklogs.agent.state/fields.md` lists module promotions. The snapshot payload is wire `sparklogs.data.*` and will not enumerate every instance leaf.

## Now vs history

| Question | Surface |
|---|---|
| What is on the box / open condition **now** | `query_device_health` (`fieldset=rca` for one host). Columns: `guides/device-state-fields.md` |
| How it changed over a window | `query_logs` on this `subsource`. Group `sparklogs.kind`, `sparklogs.topic`, `reason` |

Do not paste MCP column names into LQL.
`kind` in device-health is `sparklogs.kind` in logs.

## Event kinds (logs)

Typical mix: **inventory** (what is on the box), **delta** (change), **monitor** (open condition; this is where `reason` is dense).
`sparklogs.topic` is the subject family (`processes`, `services`, `disk_volumes`, host-scoped topics such as `performance`).

Group those three. Then `instance` on the MCP row, or a named `reason`.

LQL map wildcards over instance keys are **not shipped**. Do not invent `processes.*.cpu`.

## Maps vs host

Some topics store **one object per instance** under a map whose keys are instance identities (process, service, volume, writer, product).
Those keys address a row in the snapshot. They are not a practical field list.

Host-scoped topics put fields directly under `sparklogs.data.<topic>` (no per-instance map).

MCP `instance` (and `display_name`) is how you name a subject on the health surface today.

## Accuracy

Inventory without a `reason` is still state, not a problem.
Open monitor ≠ incident (`guides/category-classes.md`).
Theme: `themes/device-health-and-state.md`.
