## Live tool reference

If server instructions are missing or terminology is unclear, call `server_info` (tool) with `include_instructions: true`.
For detailed views, fieldsets, aggregation or paging, call it with `describe_tool` (arg) naming the tool.
Use these references when the visible description leaves a question, not on every call.
A question about one device or a few starts with `query_device_health` (tool) `view` (arg) `device_overview` (value) or `device_network` (value): read `guides/device-state-fields.md` (**Read a device view**).
Process charts use the same tool with `view` (arg) `top_processes_over_time` (value).

## Curated data (read this before opening reference files)

- **`subsource` (LQL) = feed id.** Group before `query_logs` (tool): the scope ladder plus `sparklogs.reason` (LQL), in `guides/scope-ladder.md`.
- **Curated events** carry `sparklogs.reason` (LQL), `sparklogs.class` (LQL), and module fields. Empty `sparklogs.*` on an event means **uncurated** (not a collection-health finding).
- **Reason** (`sparklogs.reason` (LQL)) = our curated vocabulary. **Vendor code** = NTSTATUS, HRESULT, MSI exit, Kerberos result, etc. **pattern_hash** (LQL) = stable shape id on every event.
- **Device row** (`query_device_health` (tool), feed health, `agent_complete_through` (col)) is authoritative for collection and completeness. Event volume is not coverage.
- **Playbooks** = symptom recipes. **Themes** = investigation topic bundles.
- **Tags in the guides:** a name tagged (arg) is a tool input (`agent_ids` (arg)), (col) a response column (`event_count` (col)), and (LQL) a field you can filter or group on (`subsource` (LQL)).

## What is in the pack

`playbooks/`, `themes/`, `feeds/<id>/` (`README.md`, `reasons.md`, `enums.md`, `fields.md`, `recipes.md`, `patterns.md` where present), `guides/`. Artifact choice detail: `guides/generated-reference-router.md`.

## After you pick a `subsource` (LQL)

1. Open `feeds/<id>/README.md` (short index).
2. **Stream kind** and exploration order: `guides/stream-kinds.md`. Classic WEL: `provider_name` (LQL) before `pattern` (LQL); device state: `query_device_health` (tool) with `kinds` (arg) / `topics` (arg) / `reasons` (arg).
3. Open **one** artifact (read-mode table below). Rich feeds (especially `win.eventlog.security` (value)) often need `recipes.md` or `reasons.md` first, not only `fields.md` or `enums.md`. Security also carries `patterns.md` and `mapping-ecs.md` / `mapping-ocsf.md` when shape or external taxonomy is the question.

**Reason meaning:** the `sparklogs.reason` (LQL) value and the event `message` (col) together; grep `reasons.md` for the matching `##` heading (summary table first, one section only).

**Vendor codes:** grep `feeds/<id>/enums.md` for the code or `##` heading, never the whole file (Security: NTSTATUS, Kerberos, logon types, NPS; Application: MSI; Storage: SCSI, SRB; identity_security: code-integrity levels). Setup's HRESULT is `win.eventlog.setup.error_code` (LQL); a curated result is `sparklogs.result.code` (LQL).

## How much to read

| Material | When | How |
|---|---|---|
| Playbook | Symptom matches index below | One file, whole |
| Theme | Investigation topic matches index | One file, whole |
| Feed `README.md` | You picked a `subsource` (LQL) | Whole (short index) |
| `reasons.md` | Need what a reason means | Skim summary table (~first 100 lines), then **one** `##` section |
| `enums.md` | Vendor/status code | **Search only** |
| `fields.md` | Filter/group on a field | Search for field name |
| `recipes.md` | Worked pivot for this feed | One section |
| `patterns.md` | Is this pattern string expected? | Search one heading (grammar/drift, not meaning) |
| Guides | Cross-cutting stuck point | One file from skill when→file table |

## Unfamiliar `pattern_hash` (LQL)

1. `describe_pattern` (tool) for text, examples, fleet spread.
2. Grep `feeds/<id>/reasons.md` or `recipes.md` if a reason or pivot is the question.
3. `patterns.md` only when the question is whether the pack meant to produce that string shape.
