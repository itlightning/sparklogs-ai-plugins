# Playbook authoring

Unpublished authoring doc on the `source` branch.
Installed packages do not include this file.
Read it before adding or rewriting `src/playbooks/*.md`.
Runtime investigation style is `src/guides/writing-voice.md`.
Tool mechanics stay in `src/guides/mcp-tool-decision-tree.md` and the MCP server instructions.
Do not recopy those into a playbook.

## Audience

The reader is a capable investigation agent that already knows SparkLogs MCP: scope, funnel, `external_investigation_id`, `start`/`end`, when to use counts vs logs vs device health.
Spend tokens on domain facts that agent cannot reconstruct from a tool list: field meaning, claim strength, phase timing, what the event cannot prove.

## What a playbook is

One symptom, one file.
It teaches *how to reason about this failure class* and *which predicates and fields to use*.
It is not a numbered MCP session.
It is not complete and not authoritative: example LQL is a start, not the event universe.
Do not put a copied disclaimer in every leaf. Completeness lives once in `playbooks/playbooks.md`, the skills, and `guides/common-mistakes.md`.
Leaf Accuracy covers *this symptom's* claim limits (job vs plumbing, state vs logs), not a second copy of the index rule.

## Structure

Keep this order. Drop a heading if it would be empty.

1. YAML `index:` (and optional `aliases:`) for the generated symptom table.
2. Trigger: the ticket sentence.
3. Accuracy / claim strength: what this evidence can and cannot prove.
4. Feeds and field schema: `subsource`, queryable dotted names, closed tokens. Point at `feeds/<id>/fields.md` and `reasons.md` instead of duplicating every reason. Scope Windows Event Log (WEL) with `subsource`. Product tokens: `guides/app-vocabulary.md`. Point at `guides/stream-kinds.md` instead of restating an explore ladder.
5. Domain reasoning: lifecycle, budgets, vocabularies that look alike but are not, axes that change the next action.
6. Queries: precise LQL (and device-health columns when state is the answer). No `query_*()` wrappers, no `org_ids=[...]`, no `external_investigation_id`.
7. Off-endpoint: what this surface never sees. Point at `guides/off-endpoint-causes.md` by honesty id when one exists.

## Queries

Write LQL the agent can paste into `query_event_counts_by_severity` or `query_logs`.
Group-by is part of the question: one noun, one field; two nouns, a cross-tab.
Name the field that carries the discriminator (`reason`, `vss_writer`, `instance`, `status_meaning`).
Do not teach `describe_pattern` or `refine_query_result` here; the skill already knows those.

Device-health playbooks name columns (`reason`, `instance`, `episode_age_basis`) and the claim each reason encodes.
Do not paste a full `query_device_health(...)` call.

## Do not

- Walk through `resolve_scope` / `list_sources` / "then confirm data in the window".
- Repeat MCP parameter grammar.
- Infer job or product outcome from plumbing that does not carry it.
- Dump a feed directory; one artifact per question (`guides/generated-reference-router.md`).
- Copy a stream-kind ladder into every playbook; point at `guides/stream-kinds.md`.
- Copy private design-doc maps, Layer labels, or unreleased pack internals. Field names and public Microsoft vocabulary are fine.

## Length

If a section is only restating the MCP funnel, delete it.
If a fact changes what an MSP does next, keep it even if it is a few sentences.
