# Hypothesis Generation - deriving cause candidates from findings

This file gives detailed guidance on the analytic step: converting the prior investigation's factual findings into candidate cause hypotheses that the engineer can evaluate.

---

## The core analytic approach

1. **Re-read the prior summary's Findings.** Treat each Finding as a fact. Note temporal patterns (when did things start? did multiple events cluster in time?), source distribution (one source or fleet-wide?), anomaly signals used, and outside-visibility flags.

2. **For each Finding, ask: "what could explain this?"** Generate 2-5 candidate causes per Finding without filtering yet. Be generous in this brainstorming step - the filtering happens in step 4.

3. **Cluster related causes.** If multiple Findings point to the same underlying cause, merge into one hypothesis. e.g., several Findings about disk I/O all consistent with disk hardware degradation -> one hypothesis.

4. **Rank by evidence support.** A hypothesis backed by 4 corroborating Findings is stronger than one backed by 1. Account for off-endpoint causes - those are inherently lower-confidence because the on-endpoint evidence is necessarily indirect.

5. **For each surviving hypothesis, derive the discriminator:** what additional check would distinguish this hypothesis from the next-most-likely one? That's the "what would confirm" / "what would refute" content.

6. **Surface uncertainty explicitly.** Where evidence is weak or where multiple hypotheses fit equally well, name that - don't paper over it.

---

## Patterns for hypothesis generation

### Temporal correlation patterns

When the prior investigation surfaced "X happened concurrent with Y" Findings:

- **Recent change + new symptom** -> hypothesis "the recent change caused the symptom." Discriminator: rollback test, or finding sources without the change but with the symptom.
- **Cyclical timing (same time every day/week)** -> hypothesis "scheduled job or external recurrence is the cause." Discriminator: identify the schedule; correlate with scheduled_tasks subsource.
- **Sudden onset without obvious change** -> hypothesis "external trigger (network event, cloud service issue, time-of-day boundary)." Discriminator: cross-source pivot ("did it happen on other sources at the same time?").

### Fleet pattern patterns

When the prior investigation surfaced "this affects N sources" Findings:

- **N = 1 (single source)** -> hypothesis space includes source-specific configuration, hardware, software state.
- **N = small subset** -> hypothesis "shared factor among the subset." Discriminator: `compare_populations` between affected and unaffected.
- **N = fleet-wide** -> hypothesis "environment-wide cause" - recent fleet-wide change (patch, GPO push, DNS change), or upstream service issue.

### Off-endpoint visibility patterns

When the prior investigation flagged off-endpoint causes in OUTSIDE AGENT VISIBILITY:

- **Off-endpoint cause is plausible** -> include it as a hypothesis with `Off-endpoint check needed: yes` and explicit pointer to what to check.
- **Off-endpoint cause is implausible given on-endpoint evidence** -> either omit or include at `low` confidence with explicit reasoning.

### Anomaly-signal patterns

When the prior investigation cited anomaly signals (with detector + baseline information):

- **`rule_state_expectation` violation** -> hypothesis "the entity is in a state the rule says it shouldn't be." Strong signal even at low detector confidence.
- **`value_distribution` outlier** -> hypothesis "the entity's value is unusual relative to its history." Less strong; could be a legitimate workload spike.
- **`expected_change_missing`** -> hypothesis "something that should have happened didn't." e.g., "cert auto-renewal didn't fire at the expected time."
- **Multiple anomalies on same snapshot with shared category** -> hypothesis "system-level event affecting multiple components simultaneously."

---

## Confidence calibration for hypotheses

Hypothesis confidence should reflect evidence strength, not narrative fluency. Heuristics:

**`high` confidence requires:**
- Multiple prior Findings consistently support the hypothesis.
- Few alternative explanations fit the evidence equally well.
- No major unchecked off-endpoint factor that could be the actual cause.
- The discriminator (confirm/refute step) is clear and actionable.

**`medium` confidence is appropriate when:**
- Some prior Findings support, but corroboration is partial.
- One or two alternative explanations could also fit.
- Some uncertainty about whether the evidence is sufficient.

**`low` confidence is appropriate when:**
- Limited prior evidence (one weak Finding, or indirect Finding).
- Multiple equally-plausible alternative explanations.
- Significant uncertainty or off-endpoint factor that's not checked.

**Hypothesis confidence is *expected* to be lower on average than Finding confidence.** Findings are observed facts; hypotheses are inferred causes. Don't overstate confidence to seem useful - overstated confidence is actively damaging.

---

## Common hypothesis-generation mistakes

### Generating too many low-quality hypotheses

**Symptom.** 7+ candidate hypotheses, none well-anchored.

**Why wrong.** Engineer can't evaluate 7 hypotheses; gets confused; hypothesis quality is more useful than quantity.

**Recovery.** Aim for 2-5 hypotheses. Drop hypotheses without strong Finding anchoring. If multiple hypotheses are trivial variations on the same theme, merge them.

### Missing the obvious hypothesis

**Symptom.** Engineer reads your output and says "what about X - that seems like the obvious cause."

**Why wrong.** Missed an obvious candidate, often because of fixation on a less-obvious one.

**Recovery.** Before producing the analysis, brainstorm broadly. Ask "if a senior engineer looked at this without the AI, what would they suspect first?" Include that hypothesis even if your evidence ranking puts it lower.

### Hypotheses that aren't actually causes

**Symptom.** "Hypothesis: backup is failing." But backup-failing is the symptom, not a cause.

**Why wrong.** Re-stating the symptom as a hypothesis adds nothing.

**Recovery.** Hypotheses should be candidate *causes* - what could be making the symptom happen. "VSS service deadlock" is a cause; "backup failed" is a symptom.

### Confidence inflation under engineer pressure

**Symptom.** Engineer pushes for a single answer; you collapse the hypothesis ranking and present one as much higher confidence than the evidence supports.

**Why wrong.** Same trust failure mode as the investigation skill - overstated confidence breaks trust.

**Recovery.** Stick to honest calibration. If three hypotheses are all medium confidence, present them as such. If one is genuinely higher, say so based on evidence. Don't manufacture confidence to satisfy.

### Recommending action prescriptively

**Symptom.** RECOMMENDED NEXT STEPS section says "do X" rather than "you could do X to confirm/refute Y."

**Why wrong.** Prescribes action; pre-empts engineer judgment.

**Recovery.** Reframe every recommendation as a discriminator the engineer could choose to run. The engineer decides whether to execute.

### Skipping ALTERNATIVE FRAMINGS

**Symptom.** Output goes straight from hypotheses to recommended next steps without considering "what if the symptom means something different than I'm interpreting?"

**Why wrong.** Locks engineer into the obvious interpretation; misses cases where the obvious framing is wrong.

**Recovery.** Always include ALTERNATIVE FRAMINGS, even if brief. "The 'fleet-wide' framing assumes X; an alternative is Y."

---

## When to make additional MCP calls during analysis

Sometimes the prior investigation's findings are sufficient for analysis without further data gathering. Other times, a quick additional check substantially strengthens or weakens a hypothesis.

**Make additional MCP calls when:**
- A fleet pivot would discriminate between "single-source hypothesis" and "fleet-wide hypothesis." `query_grouped_aggregation` group_by source on the relevant pattern.
- A `compare_populations` would discriminate between "affected sources have factor X" and "factor X is irrelevant." Use prior Findings to define the populations.
- A specific time-window check the prior investigation didn't cover would confirm/refute a hypothesis cheaply.

**Skip additional MCP calls when:**
- Prior findings already provide sufficient evidence.
- The check is off-endpoint (surface as "off-endpoint check needed" instead).
- The check would significantly expand investigation cost without proportional analytic benefit.

When you do make additional calls:
- Reuse the prior investigation's `investigation_request_id`.
- Prefer cached refinements (`refine_query_result`) over fresh backing queries - much cheaper.
- Cite the resulting `query_url`s in the hypothesis's Evidence support if they support a specific hypothesis.
