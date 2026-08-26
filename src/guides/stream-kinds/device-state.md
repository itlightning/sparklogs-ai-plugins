# Kind: device state

**Now:** `query_device_health` (`fieldset=rca` for one host). Columns: `guides/device-state-fields.md`.
**History:** `query_logs` on `subsource = "sparklogs.agent.state"`. Group **`sparklogs.kind`**, **`sparklogs.topic`**, **`reason`**.

No `provider_name`. Do not explore this feed like WEL.
Generated `feeds/sparklogs.agent.state/fields.md` lists module promotions. The snapshot payload is wire `sparklogs.data.*`.

`list_fields` is a good catalog call. Discovery omits unstable process-id map paths (see Maps).
Service names and similar stable instance keys remain. The catalog is not the explore ladder: still group `kind` / `topic` / `reason` first.

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

Some topics store **one object per instance** under a map whose keys are instance identities.

- **Processes:** keys are numeric PIDs (then create-time). Those paths churn every process start. Field discovery omits `sparklogs.data.processes.<pid>` and everything under it. LQL still accepts a known path.
- **Services, volumes, writers, products:** instance keys are stable enough to appear in `list_fields`. Useful to discover a name; not a substitute for grouping `topic` / `reason` / MCP `instance`.

Host-scoped topics put fields directly under `sparklogs.data.<topic>` (no per-instance map).

MCP `instance` (and `display_name`) is how you name a subject on the health surface today.

## Accuracy

Inventory without a `reason` is still state, not a problem.
Open monitor ≠ incident (`guides/category-classes.md`).
Theme: `themes/device-health-and-state.md`.
