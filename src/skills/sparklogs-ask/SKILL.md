---
name: sparklogs-ask
description: Answers a simple question about SparkLogs ops data with a few MCP calls. Use when an engineer asks a count, whether something is happening, status of a host, disk or CPU or patch state, or otherwise chats with telemetry. Do not run a full investigation unless they ask. Keep answers short and precise.
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. Stop when you can.

You are not writing an investigation report. No output template. No WHAT WAS NOT CHECKED catalog. No playbook walk.

## Brevity (non-negotiable)

- Answer first. One short block. Then stop.
- No recap of the session. No "three things to remember." No empathy padding. No historical commentary.
- Precise hedges only: "not in this window", "not checked", "insufficient evidence". Not "it could potentially".
- Active voice. No em dash.

## Call budget

1. `resolve_scope` if org/host/window is not already obvious from this turn.
2. Then **at most three** data-access calls (`query_device_health`, counts, `query_logs`, `list_sources`, or one describe). Prefer counts or device health over `query_logs`.
3. If you cannot answer inside that budget, stop. Say what you know. Offer `/sparklogs-investigate` in one sentence. Do not keep querying.

Every data-access call needs `external_investigation_id`. Reuse one id for this question.

## Honesty (keep)

- Empty is not healthy. A field this feed does not write is not "no problem".
- Do not treat VSS writer-failed as proof the backup product failed.
- Completeness claims need `agent_complete_through` / feed reports, never first/last event bounds.
- Cite a `query_url` on factual claims. One link is enough.

## Scope

Host vs org vs sender (`agent_id`) vs origin (`source`): `guides/scope-resolution.md` if the match is ambiguous. Do not load it for a single exact host name.

## Which tool

- "What is on the box / CPU / RAM / disk / installed / open condition" → `query_device_health` (`fieldset=rca` for one host).
- "What happened / how many / when" → `query_event_counts_by_severity` or `query_scope_activity` first; `query_logs` only for a narrow slice.
- Collector debug only → `sparklogs.agent.vector` / `sparklogs.agent.log`. Not the headline for device health.

Full tool notes: `guides/mcp-tool-decision-tree.md` only if the pick is unclear.

## Where to look (open one)

**Themes** (domain, feeds that join):

| Topic | File |
|---|---|
| Patches / CBS / DISM / Setup | `themes/windows-updates-and-patching.md` |
| Who changed what (Security) | `themes/windows-security-and-audit.md` |
| Defender | `themes/endpoint-protection.md` |
| App / System crashes and services | `themes/windows-operational-events.md` |
| CPU, RAM, disk, installed software, monitors | `themes/device-health-and-state.md` |

**Data feeds** (`subsource` = directory name). Open `feeds/<id>/README.md`, then **one** artifact (`fields.md`, `enums.md`, `reasons.md`). Search `reasons.md` for the `##` heading that matches the reason slug. Do not read the whole file.

| Feed | Path |
|---|---|
| `win.eventlog.security` | `feeds/win.eventlog.security/` |
| `win.eventlog.system` | `feeds/win.eventlog.system/` |
| `win.eventlog.application` | `feeds/win.eventlog.application/` |
| `win.eventlog.setup` | `feeds/win.eventlog.setup/` |
| `win.servicing.cbs` | `feeds/win.servicing.cbs/` |
| `win.servicing.dism` | `feeds/win.servicing.dism/` |
| `win.defender.eventlog` | `feeds/win.defender.eventlog/` |
| `sparklogs.agent.state` | `feeds/sparklogs.agent.state/` |
| `sparklogs.agent.vector` | `feeds/sparklogs.agent.vector/` |
| `sparklogs.agent.log` | `feeds/sparklogs.agent.log/` |

## When to offer a full investigation

One sentence, and only if:

- the user is describing a ticket / outage / "figure out why", or
- the call budget is exhausted.

`/sparklogs-investigate` produces a cited system condition summary. Do not start it unless they ask or accept.

Cause hypotheses: `/sparklogs-analyze-cause` only after an investigation summary exists.
