# Plugin information architecture

Unpublished authoring doc on the `source` branch.
Installed packages do not include this file.
Consumer paths below are package-root (`themes/`, `feeds/`, `playbooks/`, `guides/`).
In this checkout they live under `src/` with the same names.
Source markdown always cites the corpus in that package-root dialect; the renderer rewrites each citation per host (`scripts/host-transforms.mjs`).
Claude anchors on `${CLAUDE_PLUGIN_ROOT}`; every other host gets a copy of the corpus inside each skill's `references/` and a citation relative to the citing file.

Index tables in SKILL.md and `playbooks.md` are generated from leaf YAML (`index:`, optional `aliases:`) by `yarn stitch-indexes`.
Authoring frontmatter is stripped on dist. GENERATED markers do not ship.

## Elevations

Load what you need. Do not dump a folder.

| Elevation | File | When |
|---|---|---|
| 0-ask | `skills/sparklogs-ask/SKILL.md` | Default. Conversation with the data. May go deep. No report template. |
| 0-investigate | `skills/sparklogs-investigate/SKILL.md` | User asked for a full investigation or accepted the offer. Written cited summary. |
| 1a | `playbooks/<slug>.md` | Symptom recipe. Ask may open it as a recipe. Investigate walks it. |
| 1b | `themes/<slug>.md` | Domain (feeds that join) without a canned playbook, or the playbook pointed here. |
| 2 | `feeds/<id>/<artifact>.md` | After a `subsource` or theme pointer. README, then the artifact you need. |
| 3 | `guides/<name>.md` | Stuck on LQL, tools, class/severity, mistakes, honesty, stream kind. |

`skills/sparklogs-analyze-cause/SKILL.md` is the same pattern, thinner.
It carries theme and feed index tables.
It does not duplicate playbooks.

## SKILL.md index tables (generated)

1. Symptom to `playbooks/<slug>.md` (ask + investigate)
2. Topic to `themes/<slug>.md`
3. Feed id (`subsource`) to `feeds/<id>/`

Leaf `index:` is the table cell. Optional `aliases:` add extra rows with the same path. Table prose lives on the leaf.

The feed table's row order is curated investigation salience, not alphabetical: set by `MODULES` in `scripts/generated-references.config.mjs`. Its `What` cell comes from the `FEED_WHAT` map in the same file, keyed by feed id so it survives reordering.

## Themes to data feeds

| Theme file | Feeds | Notes |
|---|---|---|
| `themes/windows-updates-and-patching.md` | `win.eventlog.setup`, `win.servicing.cbs`, `win.servicing.dism` | Pointer to the WU slice of `sparklogs.agent.state`. |
| `themes/windows-security-and-audit.md` | `win.eventlog.security` | Change-analysis recipe lives here. Defender is a pointer. |
| `themes/endpoint-protection.md` | `win.defender.eventlog` | |
| `themes/windows-operational-events.md` | `win.eventlog.system`, `win.eventlog.application` | |
| `themes/device-health-and-state.md` | `sparklogs.agent.state`; `sparklogs.agent.vector` and `.log` only for collector debug | CPU/RAM/disk/installed software, monitors, episodes, deltas. |

Cross-cutting stays in `guides/`: class/severity, service taxonomy, app vocabulary, LQL, MCP tools, honesty, mistakes, voice, scope-resolution, off-endpoint, stream kinds (`guides/stream-kinds.md`), identifier tags (`guides/names.md`).
Playbook *authoring* (not runtime): `docs/playbook-authoring.md`.

`rules/` ships only in the cursor package (`HOST_LAYOUT` in `scripts/dist-layout.mjs`). Claude, Codex, and generic hosts route on skill descriptions alone.

## Floor vs full generated lookup

Every active data feed gets a floor under `feeds/<id>/`: `README.md`, `fields.md`, `enums.md`, and one `reasons.md` when the feed has reasons.
Omit an artifact when it would be empty.
Only `win.eventlog.security` is full: recipes, patterns, mappings, plus reasons.

One `reasons.md` per feed, not one file per reason.
Index table at the top, then `## \`slug\`` sections from `public.*` YAML only.

## Authored vs generated

- **Authored:** how to investigate, how feeds join, honesty, MCP/LQL, playbook and theme bodies, skill prose.
- **Generated tables:** SKILL.md / `playbooks.md` index blocks from leaf YAML (`yarn stitch-indexes`). `guides/app-vocabulary.md` from source-library `registry.yaml` (`yarn sync-generated`, same command as feeds).
- **Generated feeds:** what this feed writes (fields, enums, reason list; Security also recipes/patterns/mappings).

Synced verbatim from the source-library public tree into `src/feeds/`.
`scripts/generated-SYNC-MANIFEST.json` is maintainer provenance and does not ship.

## Dist

`dist` is `src/` plus host marketplace wrappers plus one README (what this is, sparklogs.com docs URL).
The dist root also carries the repository landing-page files (`LICENSE`, `NOTICE`, `CONTRIBUTING.md`, `AGENTS.md`, `SECURITY.md`, `docs/`), because `dist` is the default branch a visitor arrives on.
Each host package carries only the component kinds its host documents: `HOST_LAYOUT` in `scripts/dist-layout.mjs` is the table.
No `yarn.lock`, no `package.json`, no `scripts/`, no sync manifest, and no `docs/` inside a package.
No authoring frontmatter. No GENERATED markers.
