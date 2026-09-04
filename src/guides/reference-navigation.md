## Curated data (read this before opening reference files)

- **`subsource` (LQL) = feed id.** Scope ladder before `query_logs` (tool): `service` (LQL) → `app` (LQL) → `subsource` (LQL) → `category` (LQL) → `pattern_hash` (LQL).
- **Curated events** carry `sparklogs.reason` (LQL), `sparklogs.class` (LQL), and module fields. Empty `sparklogs.*` on an event means **uncurated** (not a collection-health finding).
- **Reason slug** = our vocabulary (`sparklogs.reason` (LQL)). **Vendor code** = NTSTATUS, HRESULT, MSI exit, Kerberos result, etc. **pattern_hash** (LQL) = stable shape id on every event.
- **Device row** (`query_device_health` (tool), feed health, `agent_complete_through` (col)) is authoritative for collection and completeness. Event volume is not coverage.
- **Playbooks** = symptom recipes. **Themes** = investigation topic bundles (not customer marketing themes).

## What is in the pack

`playbooks/`, `themes/`, `feeds/<id>/` (`README.md`, `reasons.md`, `enums.md`, `fields.md`, `recipes.md`, `patterns.md` where present), `guides/`. Artifact choice detail: `guides/generated-reference-router.md`.

## Decode tables (`enums.md`)

Per-feed closed vocabularies. **Grep** the code, constant, or `##` heading; never load a whole file.

| Kind | Typical feed | Use when |
|---|---|---|
| NTSTATUS / security status | `win.eventlog.security` (value) | Logon/auth failure codes |
| Win32 / HRESULT | application, system, setup | Servicing, app, VSS errors |
| MSI exit codes | `win.eventlog.application` (value) | Installer failures |
| Logon types, WU result codes | security, application | Discriminate 4625/4624, update errors |

## How much to read

| Material | When | How |
|---|---|---|
| Playbook | Symptom matches index below | One file, whole |
| Theme | Investigation topic matches index | One file, whole |
| Feed `README.md` | You picked a `subsource` (LQL) | Whole (short index) |
| `reasons.md` | Need reason slug meaning | Skim summary table (~first 100 lines), then **one** `##` section |
| `enums.md` | Vendor/status code | **Search only** |
| `fields.md` | Filter/group on a field | Search for field name |
| `recipes.md` | Worked pivot for this feed | One section |
| `patterns.md` | Is this pattern string expected? | Search one surface heading (grammar/drift, not meaning) |
| Guides | Cross-cutting stuck point | One file from skill when→file table |

## Unfamiliar `pattern_hash` (LQL)

1. `describe_pattern` (tool) for text, examples, fleet spread.
2. Grep `feeds/<id>/reasons.md` or `recipes.md` if a slug or pivot is the question.
3. `patterns.md` only when the question is whether the pack meant to produce that string shape.
