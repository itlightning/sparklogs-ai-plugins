# Hypothesis Generation - deriving cause candidates from findings

This file gives detailed guidance on the analytic step: converting the prior investigation's factual findings into candidate cause hypotheses that the engineer can evaluate.

---

## The core analytic approach

1. **Re-read the prior summary's Findings.** Treat each Finding as a fact. Note temporal patterns (when did things start? did multiple events cluster in time?), source distribution (one source or fleet-wide?), and not-checked flags.

2. **For each Finding, ask: "what could explain this?"** Generate 2-5 candidate causes per Finding without filtering yet. Be generous in this brainstorming step - the filtering happens in step 4.

3. **Cluster related causes.** If multiple Findings point to the same underlying cause, merge into one hypothesis. e.g., several Findings about disk I/O all consistent with disk hardware degradation -> one hypothesis.

4. **Rank by evidence support.** A hypothesis backed by 4 corroborating Findings is stronger than one backed by 1. Account for off-endpoint causes - those are inherently lower-confidence because the on-endpoint evidence is necessarily indirect.

5. **For each surviving hypothesis, derive the discriminator:** what additional check would distinguish this hypothesis from the next-most-likely one? That's the "what would confirm" / "what would refute" content.

6. **Surface uncertainty explicitly.** Where evidence is weak or where multiple hypotheses fit equally well, name that - don't paper over it.

---

## Patterns for hypothesis generation

### Temporal correlation patterns

When the prior investigation surfaced "X happened concurrent with Y" Findings:

- **Recent change + new symptom** -> hypothesis "the recent change caused the symptom." Discriminator: rollback test, or finding sources without the change but with the symptom. Bounding the window and ranking the device's changes: `playbooks/what-changed.md`.
- **Cyclical timing (same time every day/week)** -> hypothesis "scheduled job or external recurrence is the cause." Discriminator: identify the schedule; correlate with Task Scheduler events (`subsource = "win.eventlog.management"` (LQL), `service = scheduled_tasks` (LQL)) at the same times. A task that failed or did not run: `playbooks/scheduled-task-failures.md`.
- **Sudden onset without obvious change** -> hypothesis "external trigger (network event, cloud service issue, time-of-day boundary)." Discriminator: cross-source pivot ("did it happen on other sources at the same time?").

### Fleet pattern patterns

When the prior investigation surfaced "this affects N sources" Findings:

- **N = 1 (single source)** -> hypothesis space includes source-specific configuration, hardware, software state.
- **N = small subset** -> hypothesis "shared factor among the subset." Discriminator: contrast `query_event_counts_by_severity` runs over the affected and unaffected populations. Group by a field from `guides/scope-ladder.md` (`sparklogs.reason` (LQL), `service` (LQL), `app` (LQL), `subsource` (LQL)) to test whether the subset shares a component.
- **N = fleet-wide** -> hypothesis "environment-wide cause" - recent fleet-wide change (patch, GPO push, DNS change), or upstream service issue.

### Device health patterns

When the prior investigation cited a device view:

- **Heat span with contributors** -> hypothesis "a contributor's load caused the pressure." Discriminator: does the span recur without that executable, and does the executable's own trajectory (the `processes` result set) rise with the span?
- **Confirmed outage beyond the gateway** -> hypotheses "the site's internet connection" and "something on this device's path past the router." Discriminator: the org comparison over the outage's `compare_start` (col) to `compare_end` (col), kept to devices with the same network key (an org can span sites; `guides/device-state-fields.md`, **Network outages**). Other devices down in the same buckets points at the shared connection or the probe target. This device alone points at its own path. Placement limits: `guides/device-state-fields.md` (**Network outages**).
- **Recent change overlapping a span or outage** -> hypothesis "the change caused it." Discriminator: did the span or outage start after the change, and does it appear on devices without the change?

### Off-endpoint visibility patterns

When the prior investigation flagged off-endpoint causes in WHAT WAS NOT CHECKED:

- **Off-endpoint cause is plausible** -> include it as a hypothesis with `Off-endpoint check needed: yes` and explicit pointer to what to check.
- **Off-endpoint cause is implausible given on-endpoint evidence** -> either omit or include at `low` confidence with explicit reasoning.

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

## State each hypothesis directly

Write the hypothesis statement as a direct, specific claim, not a hedge. "Disk signature collision on Harddisk2" beats "it is possible there may be a disk issue." The Confidence field and the WORKING THEORIES intro already tell the engineer these are candidates, not proven conclusions - the hypothesis statement itself doesn't need to hedge on top of that. Vague hedging also makes a hypothesis harder to confirm or refute: "there could be a disk issue" has no discriminator, while "disk signature collision on Harddisk2" points straight at the check that would confirm or rule it out.

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

When and when not to: `SKILL.md` Section 5. A population contrast runs `query_event_counts_by_severity` over each population separately, defined from the prior Findings, and compares the two.

