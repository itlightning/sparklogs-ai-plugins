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

**Recovery.** When you write a Finding, ask: "If the engineer clicks this URL and looks at the data, will they see what I'm asserting?" If unsure, refine the cached query (`refine_query_result` with `filter_lql` to narrow) so the URL points to the specific evidence subset.

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

**Recovery.** Phrase factually: "No evidence of <specific symptom> in the checked sources during the checked time window." Combine with WHAT WAS NOT CHECKED section listing where else to look.

---

## Mistakes against "Show what you can't see"

### Skipping the WHAT WAS NOT CHECKED section

**Symptom.** Your summary doesn't have the section, or the section is just "n/a."

**Why it's wrong.** The section is required, every time. Even when on-endpoint evidence is complete, the section says so explicitly: "The off-endpoint causes typically associated with this kind of investigation were considered but not relevant given the on-endpoint evidence."

**Recovery.** Add the section. Read `off-endpoint-causes.md` for the relevant symptom category. Customize to the actual investigation.

### Generic boilerplate instead of investigation-specific limits

**Symptom.** WHAT WAS NOT CHECKED section says "many off-endpoint causes are possible" or "we don't see everything" or "cloud services are out of scope."

**Why it's wrong.** Boilerplate is noise. The point of the section is to give the engineer concrete next-step pointers.

**Recovery.** Per item, name the specific off-endpoint source and the specific reason it matters for THIS investigation. "Recommend checking NAS-01 health logs directly to confirm or rule out a target-side cause" is right; "we can't see everything" is wrong.

### Concluding from on-endpoint evidence when off-endpoint cause is plausible

**Symptom.** You conclude the cause is on-endpoint (or speculate so in POSSIBLE NEXT DIRECTIONS) without noting that off-endpoint causes were not checked.

**Why it's wrong.** Confidently-wrong conclusion when actual cause is off-endpoint. The engineer wastes time on the wrong remediation.

**Recovery.** When you suspect the cause might be off-endpoint, name the suspected off-endpoint source explicitly in the WHAT WAS NOT CHECKED section AND in POSSIBLE NEXT DIRECTIONS. Don't leave it implicit.

---

## Mistakes against customization/tunability

### Assuming default thresholds are universal

**Symptom.** You apply the canonical context-reduction filter (`severity in (error, critical) OR (anomaly_max_score >= 60 AND anomaly_max_score_confidence >= 70)`) without considering whether this workspace's tuning differs.

**Why it's wrong.** Some environments are noisier and want tighter thresholds; some want looser. Default-blind investigation will miss signal at one and overload at the other.

**Recovery.** The canonical filter is a default, not a universal. If feedback during the investigation suggests the default isn't working, surface in the summary and use a different filter for the next refinement.

---

## Mistakes against auditability

### Forgetting `external_investigation_id` on calls

**Symptom.** You make MCP calls without including `external_investigation_id`.

**Why it's wrong.** It's a REQUIRED parameter - the tool rejects the call. The server-side per-call audit is keyed on `external_investigation_id`; omitting it isn't just an audit gap, it's a hard failure.

**Recovery.** Pick one distinctive, human-meaningful value at investigation start (8-200 chars free text, e.g. `investigate-ticket-4781-veeam-backup`; embed a ticket/incident id or a nonce so it's unique per real investigation). Pass it on every data-access and refinement call. If you're resuming a paused investigation, recover the id from the local investigation-state document and reuse it - reusing an id RESUMES that investigation. Don't reuse a generic string like `diskcheck` across unrelated incidents; they'd merge into one investigation.

### `external_investigation_id` validation error

**Symptom.** A tool call fails with a validation error on `external_investigation_id`.

**Why it's wrong.** It didn't fit the 8-200 char bound. This isn't a generated hash - it's free text you choose.

**Recovery.** Read the error message, shorten or lengthen the id to fit, and retry. Don't loop on the same out-of-bounds value.

### Not maintaining the local investigation-state document

**Symptom.** Long investigation, context compacts, you lose track of what was found, what was checked, what's still open.

**Why it's wrong.** Investigation continuity breaks. Re-investigating from scratch duplicates work that maintaining state would have avoided.

**Recovery.** At minimum, write the document at investigation start (scope, time window, external_investigation_id) and update after each major Finding accumulates. Use the host's filesystem tool. Schema is in SKILL.md Section 16.

---

## Methodology mistakes (efficiency / correctness)

### Reading returned rows as the whole population

**Symptom.** A query comes back with N rows. You count them, or you read the earliest and latest row as the data's start and end, and report from that.

**Why it's wrong.** Responses are capped: a wide fieldset or a big match returns ONE PAGE, and the page looks exactly like a complete short answer. The envelope already tells you otherwise: the summary carries the matched TOTAL, and `last_event_at` carries when data actually stops.

**The failure this produces.** An investigation read the first page of a capped result, saw its oldest rows dated four days back, and reported that both monitored systems had been dead for four days. Both were healthy and reporting; the later pages were simply never fetched. The contradicting total was in the same response, unread.

**Recovery.** Before any claim about how much, how many, or how long: read the matched total, read `last_event_at`, and page with `refine_query_result` if you need rows the first page did not carry. If the total is larger than what you received, say which you are quoting.

### Reaching for `query_logs` first

**Symptom.** First MCP call (after `resolve_scope` and `list_sources`) is `query_logs` for a broad raw retrieval.

**Why it's wrong.** Aggregation first. `query_logs` is the *last resort*, not the first. Aggregation returns a dense, denominated answer instead of a pile of raw rows: you learn what the population looks like before you spend the window reading a slice of it.

**Recovery.** First substantive call should usually be `query_event_counts_by_severity` (group by the field the question is about). Use `query_logs` only when aggregation has narrowed to a specific small set whose raw text matters.

### Reading Level 3 by default

**Symptom.** Your `select` includes `state.<category>` or `anomalies` on every call.

**Why it's wrong.** Level 3 returns far more data than Level 1 or 2. Default should be Level 1 (triage) -> Level 2 (assess) -> Level 3 only when ground truth is needed.

**Recovery.** Always set `select` explicitly. Use the level-recipes from `mcp-tool-decision-tree.md`. Field-length caps are SERVER-ENFORCED - there is no client override. If a capped field is truncating data you need, narrow the query (tighter `lql`, fewer subsources) or project a smaller field set with `select`, then page or refine to reach the specific rows.

### Re-running queries instead of refining cached results

**Symptom.** You issue a fresh `query_logs` or `query_event_counts_by_severity` when you already had a relevant cached query.

**Why it's wrong.** Backing queries do meaningfully more work than `refine_query_result`, which runs against the cache. The cache lasts a long time; reuse it.

**Recovery.** Before issuing a fresh backing query, check if an existing `query_id` (from earlier in this investigation) covers the universe you need. If yes, refine.

### Claiming coverage from counts and endpoints

**Symptom.** You read `event_count`, `first_event_at` and `last_event_at` (or a dense bucket series) and write "no gaps", "continuous coverage", "the data is complete", or "the source was reporting throughout".

**Why it's wrong.** Those columns count what ARRIVED. They are consistent with any amount of missing middle, so they cannot establish interior coverage at all. Only a data feed's own report can, and it reaches you as `agent_complete_through` with the advisories beside it on the `resolve_scope` agent row.

**Recovery.** Read `agent_complete_through`. If it reaches the end of your window and advisories are empty, one sentence: "data is complete through <instant>". If it is `"unknown"`, say completeness could not be established, which is a statement about the claim, never a fault and never a claim that data is missing. Then stop; a healthy answer does not earn a section.

### Writing a completeness statement the question did not need

**Symptom.** An investigation into a recurring failure, or a live RCA on something happening now, carries a paragraph about data completeness, feed health, or agent state that no finding depends on.

**Why it's wrong.** The events in front of you carry an ongoing issue on their own. Completeness prose that changes no conclusion pushes the finding down the page and reads as padding.

**Recovery.** Ask whether any finding would change if completeness were worse than assumed. If not, one sentence saying completeness is not material to this question is the whole obligation. Say what you are NOT checking and why: an explicitly declined health call reads as rigor, an unexplained silence reads as an oversight.

### Reading the absence of a feed report as evidence

**Symptom.** No feed reported, no advisory appeared, or the stream came in on an ingest key, and you treat that quiet as reassurance: "no problems reported", "the feeds were healthy", "no missed events".

**Why it's wrong.** An ingest-key stream makes no completeness claim at all, so its silence carries nothing. A feed that has not reported is `unknown`, never healthy. An absent skips entry means the source type does not detect skips, not that none occurred. Absence of events is not evidence of absence.

**Recovery.** Name the absence as an absence: "the feed made no report for this window, so completeness is unknown". Put it in WHAT WAS NOT CHECKED rather than in a Finding, and never upgrade it to a health statement.

### Failing to check ingest health before "no evidence" conclusions

**Symptom.** You conclude "no evidence of X" without checking that the source actually had complete data ingestion during the relevant window.

**Why it's wrong.** Source might have been emitting `ingest_drop` / `spool_full` / `backpressure` events during the window, in which case "no evidence" might just mean "data was incomplete."

**Recovery.** Before any "no evidence found" conclusion, read `agent_complete_through` and `advisories` on the agent row, then run `query_logs(lql='source = "<X>" AND sparklogs.kind = agent_op', start=..., end=...)`. Those rows are stamped when an investigator must distrust other data on that host. If any fired, qualify the Finding's confidence and surface it in WHAT WAS NOT CHECKED. An EMPTY result is inconclusive rather than reassuring: a healthy agent, an agent that is not reporting, and a topic disabled for that agent's rollout ring all look identical from here. `list_sources` event-count trends are a prompt to look, never a coverage measurement. Say which case you could not rule out.

### Reading an empty deep-field query as a clean bill of health

**Symptom.** You filter on a curated field (`sparklogs.reason`, a module-prefixed field) or on a retired name (`event_kind`, `SLAAgentOp`, `event_summary`, `state.*`), get zero rows back, and conclude the system is healthy or the check passed.

**Why it's wrong.** These are DESIGNED fields in the schema, but the SparkLogs Managed Agent has zero production emission of them today. Every query filtering on them returns empty on every source, whether or not a problem exists. Empty means "not emitted yet," never "no problem found."

**Recovery.** Fall back to shallow-triage fields that ARE emitted today: `message`, `severity`, `source`, `app`, `subsource`, `pattern` / `pattern_hash`, timestamps. Use `query_event_counts_by_severity` on `severity` or `pattern` for volume/anomaly triage instead of the deep fields. State explicitly in the Finding or WHAT WAS NOT CHECKED that the deep-field check came back empty because the telemetry isn't emitted yet, not because nothing is wrong.

### Failing to check that the source has data in the investigation window

**Symptom.** You investigate a source that has no Managed Agent telemetry in the investigation's time window. You spend many tool calls finding nothing.

**Why it's wrong.** Wastes investigation budget. Also produces a confidently-wrong conclusion because absence of evidence is treated as evidence of absence.

**Recovery.** Always run `list_sources` with the investigation's `start`/`end` window as your first or second tool call (after `resolve_scope`). If the source has no data in the window, halt and ask the engineer for clarification per `scope-resolution.md`.

### Running 30 tool calls without converging

**Symptom.** Investigation has 20+ tool calls and you're still chasing leads without a coherent picture.

**Why it's wrong.** Backing-query ceiling violated; engineer's wall-clock budget violated; usually means the investigation is structurally stuck.

**Recovery.** Stop at ~15 tool calls if not converging. Produce an interim summary that says "Investigation has examined N findings without converging on a coherent picture; here's what was found and the next investigative directions worth taking." Honest and useful; better than 30 tool calls of confused thrashing.

---

## LQL syntax mistakes

These are common enough to repeat here even though `lql-reference.md` covers them:

### Using `LIKE`, `MATCHES`, `IS NULL`, `CONTAINS_*`

These don't exist in LQL. Use `:`/`*`/`?`, `:`/`/regex/`, `<field>!`/`NOT <field>!`, scalar operators on array fields.

### Wildcard JSON paths

`x.services.*.status = STOPPED` does NOT work: type resolution needs an exact path. Use a promoted field, the message, or a direct keyed lookup when the key is known.

### Square brackets for value lists

`severity in [error, critical]` is wrong. `severity in (error, critical)` with parentheses.

### Confusing `:` vs `=` with `/regex/`

`field: /regex/` matches if value *contains* the pattern; `field = /regex/` matches if regex matches the *entire* value. When the result count is surprising, double-check the operator-vs-regex pairing.

### After 2 retries on broken LQL, surface to user

Don't keep retrying with slightly different broken expressions. If the LQL parser returns errors twice in a row, the issue is fundamental - surface to the engineer rather than burning more tool calls.

---

## Output template mistakes

### Skipping required sections

Every summary MUST have: EXECUTIVE SUMMARY (at top), SCOPE CHECKED, OBSERVED CONDITIONS, WHAT WAS NOT CHECKED (which lives inside SCOPE CHECKED), WHAT WAS EXAMINED, AUDIT TRAIL, POSSIBLE NEXT DIRECTIONS (with the explore-or-analyze invitation). ANOMALY SIGNALS USED is required only if you used anomaly fields, which nothing emits today, so it is normally absent.

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
