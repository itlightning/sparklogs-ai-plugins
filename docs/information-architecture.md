# Plugin information architecture

Unpublished authoring doc on the `source` branch.
Installed packages do not include this file.
Consumer paths below are package-root (`themes/`, `feeds/`, `playbooks/`, `guides/`).
In this checkout they live under `src/` with the same names.

## Elevations

Load one file at a time.
Do not open a second file at the same elevation unless the first file says to.

| Elevation | File | When |
|---|---|---|
| 0-ask | `skills/sparklogs-ask/SKILL.md` | Default. Simple question about the data. Scope, call budget, brevity. No template. |
| 0-investigate | `skills/sparklogs-investigate/SKILL.md` | User asked for a full investigation or accepted the offer. Job, trust, output template, three index tables. |
| 1a | `playbooks/<slug>.md` | Ticket matches a canned symptom (investigate path). |
| 1b | `themes/<slug>.md` | Domain (feeds that join) without a canned playbook, or the playbook pointed here. |
| 2 | `feeds/<id>/<artifact>.md` | After a `subsource` or theme pointer. README, then **one** artifact. |
| 3 | `guides/<name>.md` | Stuck on LQL, tools, class/severity, mistakes, honesty. |

`skills/sparklogs-analyze-cause/SKILL.md` is the same pattern, thinner.
It points at themes, feeds, and guides.
It does not duplicate playbooks.

Ask SKILL.md may open one theme or one feed artifact. It does not walk playbooks.

## SKILL.md index tables (always-on on investigate; ask carries theme + feed)

1. Symptom to `playbooks/<slug>.md` (investigate only)
2. Topic to `themes/<slug>.md`
3. Feed id (`subsource`) to `feeds/<id>/`

## Themes to data feeds

| Theme file | Feeds | Notes |
|---|---|---|
| `themes/windows-updates-and-patching.md` | `win.eventlog.setup`, `win.servicing.cbs`, `win.servicing.dism` | Pointer to the WU slice of `sparklogs.agent.state`. |
| `themes/windows-security-and-audit.md` | `win.eventlog.security` | Change-analysis recipe lives here. Defender is a pointer. |
| `themes/endpoint-protection.md` | `win.defender.eventlog` | |
| `themes/windows-operational-events.md` | `win.eventlog.system`, `win.eventlog.application` | |
| `themes/device-health-and-state.md` | `sparklogs.agent.state`; `sparklogs.agent.vector` and `.log` only for collector debug | CPU/RAM/disk/installed software, monitors, episodes, deltas. |

Cross-cutting stays in `guides/`: class/severity, service taxonomy, LQL, MCP tools, honesty, mistakes, voice, scope-resolution, off-endpoint.

## Floor vs full generated lookup

Every active data feed gets a floor under `feeds/<id>/`: `README.md`, `fields.md`, `enums.md`, and one `reasons.md` when the feed has reasons.
Omit an artifact when it would be empty.
Only `win.eventlog.security` is full: recipes, patterns, mappings, plus reasons.

One `reasons.md` per feed, not one file per reason.
Index table at the top, then `## \`slug\`` sections from `public.*` YAML only.

## Authored vs generated

- **Authored:** how to investigate, how feeds join, honesty, MCP/LQL, playbooks, themes.
- **Generated:** what this feed writes (fields, enums, reason list; Security also recipes/patterns/mappings).

Synced verbatim from the source-library public tree into `src/feeds/`.
`scripts/generated-SYNC-MANIFEST.json` is maintainer provenance and does not ship.

## Dist

`dist` is `src/` plus host marketplace wrappers plus one README (what this is, sparklogs.com docs URL).
No `yarn.lock`, no `package.json`, no `scripts/`, no maintainer docs, no sync manifest.
