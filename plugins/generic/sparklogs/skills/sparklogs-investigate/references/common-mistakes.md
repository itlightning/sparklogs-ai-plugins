# Common Mistakes - anti-pattern catalog with recoveries

This catalog enumerates mistakes that are easy to make during investigation and the right alternatives. Read this when you suspect you might be heading toward one of these patterns.

The mistakes are grouped by the operating principle they violate.

---

## Mistakes against "Augment, don't replace"

### Producing cause analysis in this skill

**Symptom.** You catch yourself writing "the cause is...", "this suggests that...", "the likely root cause is...", "this is clearly...", "the obvious explanation is...", or any similar phrase in the OBSERVED CONDITIONS or EXECUTIVE SUMMARY sections.

**Why it's wrong.** This skill produces facts. Cause analysis happens in `/sparklogs-analyze-cause` (a separate skill) where it's clearly labeled and the engineer opted in. Mixing them collapses the trust boundary that protects the engineer from confidently-wrong conclusions.

**Recovery.** Before producing the summary:
1. Read every Finding's main statement. If it asserts a *cause*, restate it as an *observation*. ("The cause is high CPU" -> "Process X was at 92% CPU in Finding 4.")
2. Read the Executive Summary. Same check.
3. Cause-shaped speculation that survives the cleanup goes in the POSSIBLE NEXT DIRECTIONS section (1-4 sentences max), with the explore-or-analyze invitation.

### Capitulating to engineer pressure

**Symptom.** Engineer says "just tell me the root cause," "stop hedging," "what do YOU think it is," and you start producing more conclusive language to satisfy.

**Why it's wrong.** The trust posture is what makes SparkLogs durably valuable. Eroding it under pressure is short-term gain, long-term loss.

**Recovery.** Stick to the response: "My job is to produce a defensible summary you can act on. The summary is here. If you want hypothesis sketches with confirm/refute steps, run /sparklogs-analyze-cause." Do this once politely; if the engineer persists, repeat with the same content. Don't escalate the cause-shaped language in your output.

### Recommending consequential action

**Symptom.** Output includes "restart the service," "reboot the server," "deploy this patch," "modify this configuration," "close the ticket."

**Why it's wrong.** Consequential action is the engineer's decision, not yours. Recommending it pre-empts their judgment.

**Recovery.** Move recommendations out of this skill's output. If you have specific suggestions, they belong in `/sparklogs-analyze-cause` (under RECOMMENDED NEXT STEPS, framed as "suggested, not prescribed"). This skill is observation-only.

---

## Mistakes against "Cite everything"

### Claims without `query_url`

**Symptom.** A Finding's Evidence field says "based on snapshot data," "from the logs," "the agent observed," or any similar uncited phrasing.

**Why it's wrong.** Without a `query_url`, the engineer can't verify your claim. This is exactly how confabulation hides.

**Recovery.** For every Finding, the Evidence field is one or more `query_url` values (the URL field returned by the MCP tool you used to gather the evidence). If you didn't make the query that produced the evidence, you don't have the evidence - either make the query, or downgrade to "insufficient_evidence" and don't make the claim.

### Fabricated or modified `query_url`

**Symptom.** You construct a URL that "looks like" it points to the data, rather than copying the URL from the MCP tool response.

**Why it's wrong.** Fabricated URLs return errors when the engineer clicks them. Trust collapses immediately.

**Recovery.** Always copy the `query_url` field verbatim from the MCP tool response. Never construct, modify, or guess.

### Cited URL doesn't actually support the claim

**Symptom.** You cite a `query_url` for a Finding, but the cached query at that URL doesn't actually contain the evidence the Finding asserts.

**Why it's wrong.** Misrepresentation is worse than absent citation - engineer assumes you've supported the claim and won't double-check.

**Recovery.** When you write a Finding, ask: "If the engineer clicks this URL and looks at the data, will they see what I'm asserting?" If unsure, refine the cached query (`refine_query_result` with `cache_filter_lql` to narrow) so the URL points to the specific evidence subset.

### Executive Summary makes claims not in any Finding

**Symptom.** The Executive Summary asserts something that wasn't established in OBSERVED CONDITIONS.

**Why it's wrong.** The Summary is supposed to synthesize Findings, not introduce new claims. Un-Findings-backed claims in the Summary are uncited claims.

**Recovery.** Rewrite the Summary so every claim derives from a numbered Finding. Reference Finding numbers in the Summary text where helpful.

---

## Mistakes against "Calibrate confidence honestly"

### Claiming `high` confidence on weak evidence

**Symptom.** You marked a Finding `high` because the data fits a story you formed, even though the evidence is single-source / single-snapshot / inferred / sparse.

**Why it's wrong.** Confidence is supposed to reflect evidence strength, not narrative fluency. Models naturally express certainty in proportion to fluency; this is the failure mode you're defending against.

**Recovery.** For every `high` Finding, ask:
- Is the evidence direct (you observed the actual state) or inferred (you concluded from related evidence)?
- Is it corroborated across multiple sources / snapshots / time windows, or single-point?
- Is it recent (within the investigation window) or stale?
- Has the relevant detector completed warmup and avoided recent baseline reset?

If any answer is "no/single/stale/uncertain," downgrade to `medium` or `low`.

### Avoiding `insufficient_evidence` because it feels like failure

**Symptom.** You stretch to a `low` or `medium` Finding rather than admitting "I checked and didn't find what I needed."

**Why it's wrong.** "Insufficient_evidence" is often the most useful answer. It tells the engineer "I looked here and the answer isn't in the data I have access to" - which is actionable information that points them toward different evidence sources.

**Recovery.** If the Finding's existence depends on evidence you couldn't actually find, reframe it: "Finding N: No evidence of X in the checked sources. Confidence: insufficient_evidence." Add a Note explaining specifically what would raise the confidence (more time, additional source, different scope).

### Writing "no problem" instead of "no evidence in scope"

**Symptom.** Conclusion says "no issues found" or "everything looks healthy" or "the system is fine."

**Why it's wrong.** You can only conclude that from the data you actually checked. The user reported a problem; concluding "no problem" overrides their experience based on incomplete data.

**Recovery.** Phrase factually: "No evidence of <specific symptom> in the checked sources during the checked time window." Combine with OUTSIDE AGENT VISIBILITY section listing where else to look.

---

## Mistakes against "Show what you can't see"

### Skipping the OUTSIDE AGENT VISIBILITY section

**Symptom.** Your summary doesn't have the section, or the section is just "n/a."

**Why it's wrong.** The section is required, every time. Even when on-endpoint evidence is complete, the section says so explicitly: "The off-endpoint causes typically associated with this kind of investigation were considered but not relevant given the on-endpoint evidence."

**Recovery.** Add the section. Read `off-endpoint-causes.md` for the relevant symptom category. Customize to the actual investigation.

### Generic boilerplate instead of investigation-specific limits

**Symptom.** OUTSIDE AGENT VISIBILITY section says "many off-endpoint causes are possible" or "we don't see everything" or "cloud services are out of scope."

**Why it's wrong.** Boilerplate is noise. The point of the section is to give the engineer concrete next-step pointers.

**Recovery.** Per item, name the specific off-endpoint source and the specific reason it matters for THIS investigation. "Recommend checking NAS-01 health logs directly to confirm or rule out a target-side cause" is right; "we can't see everything" is wrong.

### Concluding from on-endpoint evidence when off-endpoint cause is plausible

**Symptom.** You conclude the cause is on-endpoint (or speculate so in POSSIBLE NEXT DIRECTIONS) without noting that off-endpoint causes were not checked.

**Why it's wrong.** Confidently-wrong conclusion when actual cause is off-endpoint. The engineer wastes time on the wrong remediation.

**Recovery.** When you suspect the cause might be off-endpoint, name the suspected off-endpoint source explicitly in the OUTSIDE AGENT VISIBILITY section AND in POSSIBLE NEXT DIRECTIONS. Don't leave it implicit.

---

## Mistakes against customization/tunability

### Assuming default thresholds are universal

**Symptom.** You apply the canonical context-reduction filter (`severity in (error, critical) OR (anomaly_max_score >= 60 AND anomaly_max_score_confidence >= 70)`) without considering whether this workspace's tuning differs.

**Why it's wrong.** Some environments are noisier and want tighter thresholds; some want looser. Default-blind investigation will miss signal at one and overload at the other.

**Recovery.** The canonical filter is a default, not a universal. If feedback during the investigation suggests the default isn't working, surface in the summary and use a different filter for the next refinement.

---

## Mistakes against auditability

### Forgetting `investigation_request_id` on calls

**Symptom.** You make MCP calls without including `investigation_request_id`.

**Why it's wrong.** The audit trail breaks. `get_query_metadata(investigation_request_id=...)` won't surface the orphan calls. The engineer can't reconstruct the full investigation.

**Recovery.** Generate one base-36 16-char ID at investigation start. Pass it on every data-access and refinement call. If you're resuming a paused investigation, recover from the local investigation-state document. If you forgot mid-investigation, generate a new ID and note in the summary that the audit trail is split.

### Not maintaining the local investigation-state document

**Symptom.** Long investigation, context compacts, you lose track of what was found, what was checked, what's still open.

**Why it's wrong.** Investigation continuity breaks. Re-investigation costs more than maintaining state.

**Recovery.** At minimum, write the document at investigation start (scope, time window, investigation_request_id) and update after each major Finding accumulates. Use the host's filesystem tool. Schema is in SKILL.md Section 15.

---

## Methodology mistakes (efficiency / correctness)

### Reaching for `query_logs` first

**Symptom.** First MCP call (after `resolve_scope` and `list_sources`) is `query_logs` for a broad raw retrieval.

**Why it's wrong.** Aggregation first. `query_logs` is the *last resort*, not the first. Aggregation cuts substantial token use AND improves correctness in published observability-MCP retrospectives.

**Recovery.** First substantive call should usually be `query_grouped_aggregation` or `query_period_diff` (depending on the question shape). Use `query_logs` only when aggregation has narrowed to a specific small set whose raw text matters.

### Reading Level 3 by default

**Symptom.** Your `return_field_list` includes `state.<category>` or `anomalies` on every call.

**Why it's wrong.** Level 3 is roughly 10-100x more expensive in tokens than Level 1 or 2. Default should be Level 1 (triage) -> Level 2 (assess) -> Level 3 only when ground truth is needed.

**Recovery.** Always set `return_field_list` explicitly. Use the level-recipes from `mcp-tool-decision-tree.md`. Override per-field with `max_field_chars_override` only when you specifically need uncapped data.

### Re-running queries instead of refining cached results

**Symptom.** You issue a fresh `query_logs` or `query_grouped_aggregation` when you already had a relevant cached query.

**Why it's wrong.** Backing queries are 10-100x more expensive than `refine_query_result`. The cache lasts a long time; reuse it.

**Recovery.** Before issuing a fresh backing query, check if an existing `query_id` (from earlier in this investigation) covers the universe you need. If yes, refine.

### Failing to check ingest health before "no evidence" conclusions

**Symptom.** You conclude "no evidence of X" without checking that the source actually had complete data ingestion during the relevant window.

**Why it's wrong.** Source might have been emitting `ingest_drop` / `spool_full` / `backpressure` events during the window, in which case "no evidence" might just mean "data was incomplete."

**Recovery.** Before any "no evidence found" conclusion, run a quick check: `query_logs(filter_lql='source = "<X>" AND event_kind = SLAAgentOp AND subsource in (ingest_drop, spool_full, backpressure)', time_range=<window>)`. If drops occurred, qualify the Finding's confidence and surface in OUTSIDE AGENT VISIBILITY.

### Failing to check that the source has data in the investigation window

**Symptom.** You investigate a source that has no Managed Agent telemetry in the investigation's time window. You spend many tool calls finding nothing.

**Why it's wrong.** Wastes investigation budget. Also produces a confidently-wrong conclusion because absence of evidence is treated as evidence of absence.

**Recovery.** Always run `list_sources` with the investigation's `time_range` as your first or second tool call (after `resolve_scope`). If the source has no data in the window, halt and ask the engineer for clarification per `scope-resolution.md`.

### Running 30 tool calls without converging

**Symptom.** Investigation has 20+ tool calls and you're still chasing leads without a coherent picture.

**Why it's wrong.** Cost ceiling violated; engineer's wall-clock budget violated; usually means the investigation is structurally stuck.

**Recovery.** Stop at ~15 tool calls if not converging. Produce an interim summary that says "Investigation has examined N findings without converging on a coherent picture; here's what was found and the next investigative directions worth taking." Honest and useful; better than 30 tool calls of confused thrashing.

---

## LQL syntax mistakes

These are common enough to repeat here even though `lql-reference.md` covers them:

### Using `LIKE`, `MATCHES`, `IS NULL`, `CONTAINS_*`

These don't exist in LQL. Use `:`/`*`/`?`, `:`/`/regex/`, `<field>!`/`NOT <field>!`, scalar operators on array fields.

### Wildcard JSON paths

`state.services.*.status = STOPPED` does NOT work. Use `event_summary.auto_start_not_running!` or top-level anomaly fields, or direct keyed lookup when key is known.

### Square brackets for value lists

`severity in [error, critical]` is wrong. `severity in (error, critical)` with parentheses.

### Confusing `:` vs `=` with `/regex/`

`field: /regex/` matches if value *contains* the pattern; `field = /regex/` matches if regex matches the *entire* value. When the result count is surprising, double-check the operator-vs-regex pairing.

### After 2 retries on broken LQL, surface to user

Don't keep retrying with slightly different broken expressions. If the LQL parser returns errors twice in a row, the issue is fundamental - surface to the engineer rather than burning more tool calls.

---

## Output template mistakes

### Skipping required sections

Every summary MUST have: EXECUTIVE SUMMARY (at top), SCOPE CHECKED, OBSERVED CONDITIONS, OUTSIDE AGENT VISIBILITY (which lives inside SCOPE CHECKED), INVESTIGATION COST, AUDIT TRAIL, POSSIBLE NEXT DIRECTIONS (with the explore-or-analyze invitation). ANOMALY SIGNALS USED is required only if you used anomaly fields.

### Making the POSSIBLE NEXT DIRECTIONS section longer than 3 sentences

The section is bounded. If it expands, it's becoming cause analysis. Trim and refer to `/sparklogs-analyze-cause`.

### Generic Findings

"The system has issues" is not a Finding. "Process MyApp.exe was at 92% CPU at 14:32 UTC" is a Finding. Findings are observation-grounded factual statements with specific entities, states, and times.

### Missing Confidence band

Every Finding has a Confidence band. None of "I'll figure that out later" or "varies by case." Pick one of high / medium / low / insufficient_evidence.

### Missing Time window of evidence

Every Finding has a Time window of evidence. May be tighter than the overall investigation window. NOT relative ("last 24h") - absolute UTC timestamps.

---

## When in doubt

If you find yourself uncertain whether something is OK, the heuristic is: **does it preserve the engineer's ability to verify everything you said by clicking through to source data?** If yes, it's OK. If no, fix it before delivering.

The engineer is the decision-maker. You're the assistant that gathered and structured the evidence. Stay in that role.
