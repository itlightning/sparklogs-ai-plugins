# Output Template - Root-Cause Analysis

This is the canonical template every cause-analysis output produces. Use these field definitions and follow these rules. Right-vs-wrong examples below.

---

## Required structure

```
ROOT-CAUSE ANALYSIS: <ticket / scope description>
external_investigation_id: <reused from prior investigation>

WORKING THEORIES
Below are <N> ranked explanations that fit the investigation evidence.
Verify with the confirm/refute steps and use judgment before acting.

INPUT
The prior investigation's system condition summary
(referenced by external_investigation_id <id>, accessible via sparklogs-summary <id>).

CANDIDATE HYPOTHESES (ranked by evidence support)

  HYPOTHESIS #1: <plain-language statement of the candidate cause>
    Evidence support: [Prior Findings #X, #Y, #Z]
    Confidence: high | medium | low
    What would confirm this: [specific additional check the engineer could run]
    What would refute this: [specific additional check that would rule it out]
    Off-endpoint check needed: [yes/no - if yes, what to check off-endpoint]
    [Optional Note: brief context]

  HYPOTHESIS #2: ...
  HYPOTHESIS #3: ...
  ... (typically 2-5 hypotheses; quality > quantity)

ALTERNATIVE FRAMINGS
[If the symptom could mean something different than the obvious interpretation, enumerate.]

WHAT IS UNCERTAIN
[Explicit enumeration of weak evidence and gaps in reasoning. Do not minimize.]

RECOMMENDED NEXT STEPS (suggested, not prescribed)
[Concrete things the engineer could do to confirm or refute the top hypothesis.
 Phrased as "you could ...", "consider checking ...", "running X would distinguish A from B".
 Never as "do X" or "you should Y".]

WHAT WAS EXAMINED (incremental over the prior investigation)
- Additional backing queries: <N>
- Additional cached refinements: <M>
- Additional matched population examined: <rows/events, from query summaries, if any additional queries ran>
- Wall-clock: <minutes>
```

---

## Field definitions

### external_investigation_id
Reused from the prior investigation. Do not generate a new one - this analysis extends the prior investigation.

### WORKING THEORIES intro
Required at the top of every analysis, right after the title. Plain, calm framing: these are ranked explanations that fit the evidence, not established conclusions. Verbatim wording suggested above. Every hypothesis still needs the confirm/refute steps below; the intro sets expectations once instead of repeating a warning per hypothesis.

### INPUT
Reference to the prior investigation summary. The engineer can re-display it via `sparklogs-summary <id>`.

### Hypothesis statement
A plain-language statement of the candidate cause. State it directly and specifically - the Confidence field and the WORKING THEORIES intro already carry the "candidate, not proven" framing, so the statement itself shouldn't hedge.

**Right (direct, specific):**
- "Hypothesis #1: KB5034441 (installed at 02:45 UTC per Finding 4) changed something in the storage stack that interacts negatively with Veeam VSS operations on this Windows version."
- "Hypothesis #2: VSS shadow storage exhaustion on a subset of sources (Finding 5b cluster) is a separate factor compounding with the patch-related issue."
- "Hypothesis #1: Disk signature collision on Harddisk2."

**Wrong (vague hedging - state it directly instead):**
- "Hypothesis #1: It's possible there may be some kind of disk issue." (say what the disk issue is: "Disk signature collision on Harddisk2")
- "Hypothesis #1: There may be a problem." (too generic to anchor confirm/refute steps)

### Evidence support
List which prior Finding numbers support this hypothesis. Without prior Findings backing it, you don't have evidence - the hypothesis isn't grounded. Drop the hypothesis or downgrade confidence.

### Confidence
- **`high`** - Multiple prior Findings consistently support; few alternative explanations fit; no major unchecked off-endpoint factor.
- **`medium`** - Some prior Findings support; one or two alternative explanations could also fit; some uncertainty.
- **`low`** - Limited prior evidence; multiple equally-plausible alternative explanations; significant uncertainty or off-endpoint factor.

Hypothesis confidence is *expected* to be lower on average than Finding confidence (which is factual). Don't overstate.

### What would confirm this
A specific, actionable check that would meaningfully strengthen this hypothesis. Examples:
- "Roll back KB5034441 on a single test source and observe whether the backup pattern recurs."
- "Check NAS-01 health logs directly for I/O errors during the 03:14 UTC window."
- "Verify that the 7 affected sources (Finding 6) all have the same Windows build version."

### What would refute this
A specific, actionable check that would meaningfully weaken or eliminate this hypothesis. Often the inverse of "what would confirm."
- "Find sources without KB5034441 that show the same Veeam pattern."
- "Show that NAS-01 had no I/O errors during the relevant windows."

### Off-endpoint check needed
- `no` - the confirm/refute step uses on-endpoint data accessible via SparkLogs.
- `yes` - the confirm/refute step requires checking something off-endpoint (cloud service, network device, third-party SaaS). Name what.

### Alternative framings
If the symptom could mean something different than the obvious interpretation, enumerate. Example:
- "The 'fleet-wide pattern' finding could mean these sources share a common factor that isn't the KB (e.g., shared backup target NAS, shared backup window timing)."
- "The 'concurrent KB install timing' is correlation, not necessarily causation."

### What is uncertain
Explicit enumeration of weak evidence and gaps. **Do not minimize.** Examples:
- "Whether the disk-pressure cluster (Finding 5b) is independent or related to the primary pattern."
- "Whether NAS-01 issues are contributing - backup target was not checked (no Managed Agent)."
- "Whether there is a non-KB factor common to the 7 affected sources."

### Recommended next steps
Concrete things the engineer could do. Framed as suggestions, not prescriptions.

**Right:**
- "If Hypothesis #1 is the working theory, consider testing rollback on one staging source."
- "Pulling the installed-products list for the 7 affected sources via SparkLogs would help confirm whether they share KB5034441 specifically or some other factor."
- "Running a network probe to NAS-01 during a future scheduled backup window could confirm or rule out target-side latency."

**Wrong:**
- "Roll back KB5034441 on all affected sources."  (prescribes action)
- "Open a vendor case with Veeam." (prescribes action; also presupposes a hypothesis is correct)

---

## Worked example

```
ROOT-CAUSE ANALYSIS: Veeam backup failure on srv-fileshare01 (ticket #4781)
external_investigation_id: investigate-ticket-4781-veeam-backup

WORKING THEORIES
Below are 3 ranked explanations that fit the investigation evidence.
Verify with the confirm/refute steps and use judgment before acting.

INPUT
The prior investigation's system condition summary
(referenced by external_investigation_id investigate-ticket-4781-veeam-backup, accessible via
 sparklogs-summary investigate-ticket-4781-veeam-backup).

CANDIDATE HYPOTHESES

HYPOTHESIS #1: KB5034441 (installed ~30 minutes before the failure per Finding 4) introduced
 a change that affects Veeam VSS interaction on this Windows version.
  Evidence support: Findings 3 (new pattern not present pre-install), 4 (install timing),
                    6 (fleet-wide consistency across 7 sources)
  Confidence: medium-high
  What would confirm this: roll back KB5034441 on a single test source and observe whether
                           the new error pattern recurs in the next backup window.
  What would refute this: identify any of the 7 affected sources that does NOT have KB5034441
                          installed; or identify sources with KB5034441 that show no Veeam pattern.
  Off-endpoint check needed: no (all evidence is on-endpoint)

HYPOTHESIS #2: Disk pressure on the small subset of sources in cluster B (Finding 5b)
 is a separate compounding factor.
  Evidence support: Finding 5 cluster B (4 occurrences with disk-pressure precursor)
  Confidence: medium (small sample; only 4 occurrences out of 412)
  What would confirm this: check free space on cluster B sources at the error timestamps;
                           compare to sources where the error occurred without disk pressure.
  What would refute this: cluster B sources have adequate free space at error times.
  Off-endpoint check needed: no

HYPOTHESIS #3: Backup target NAS-01 issues compound with VSS issues.
  Evidence support: indirect - backup target was not checked, per the prior
                    investigation's WHAT WAS NOT CHECKED section.
  Confidence: low
  What would confirm this: check NAS-01 health logs directly during the error windows.
  What would refute this: NAS-01 health is normal during the windows.
  Off-endpoint check needed: yes (NAS-01 does not run a Managed Agent)

ALTERNATIVE FRAMINGS
- The "fleet-wide pattern" (Finding 6) could mean these 7 sources share a common factor that
  isn't the KB - e.g., shared backup-target NAS, shared backup window timing, shared service
  account.
- The temporal correlation between the KB install and the error (Finding 4) is observational;
  causation requires the rollback or population-comparison test.

WHAT IS UNCERTAIN
- Whether the disk-pressure cluster (Hypothesis #2) is independent or related to the
  KB-related hypothesis (Hypothesis #1).
- Whether NAS-01 issues (Hypothesis #3) are contributing - not checked.
- Whether there is a non-KB factor common to the 7 affected sources that we haven't checked.
- Whether the error pattern would also appear on sources NOT in the 7 affected - we have not
  tested for absence on the broader fleet.

RECOMMENDED NEXT STEPS (suggested, not prescribed)
1. Consider checking NAS-01 directly for backup-time errors during the failure windows. This
   is the off-endpoint check that would discriminate between Hypothesis #1 (KB-related) and
   Hypothesis #3 (target-related).
2. If Hypothesis #1 is the working theory: testing rollback on one staging source would
   provide a strong signal.
3. Running `query_event_counts_by_severity` to compare installed_products across the 7 affected
   sources vs unaffected fleet sources could surface non-KB factors.

WHAT WAS EXAMINED
- Additional backing queries: 0
- Additional cached refinements: 2 (reused the prior investigation's cached queries)
- Additional matched population examined: none (refinements only, no new backing query)
- Wall-clock: 1.5 minutes
```

This worked example shows:
- WORKING THEORIES intro sets calm, verifiable expectations up front.
- Each hypothesis cited prior Finding numbers.
- Each hypothesis has confirm/refute steps.
- Off-endpoint checks explicitly named.
- Uncertainty enumerated, not minimized.
- Next steps framed as suggestions.
- The analyzer didn't burn fresh backing queries - leveraged the prior investigation's caches via cached refinements.
