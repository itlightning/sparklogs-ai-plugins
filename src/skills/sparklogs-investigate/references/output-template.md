# Output Template - System Condition Summary

This is the canonical template every investigation produces. Use these field definitions and follow these rules. Right-vs-wrong examples below.

---

## Required structure

```
INVESTIGATION SUMMARY - <ticket / scope description>
external_investigation_id: <friendly handle, 8-200 chars>

EXECUTIVE SUMMARY
[1-3 paragraphs in plain language synthesizing the Findings, with citations to query_urls.
 Headline-first: the engineer reads this first.
 Every claim in the executive summary must derive from a Finding. Do not introduce new claims here.]

SCOPE CHECKED
- Source(s): [list]
- Org(s): [list]
- Time window: [start UTC] to [end UTC]
- Data sources queried: [list - subsources, channels, helpers]
- WHAT WAS NOT CHECKED: [list - investigation-specific; see guides/off-endpoint-causes.md]

OBSERVED CONDITIONS

  Finding 1: <one-sentence factual statement, observation-grounded>
    Evidence: <query_url(s) - clickable URLs from MCP responses>
    Confidence: high | medium | low | insufficient_evidence
    Sources contributing: [list]
    Time window of evidence: [start UTC] to [end UTC]
    [Optional Note: brief context, observation-grounded, no speculation]

  Finding 2: ...
  ... (typically 3-7 findings)

ANOMALY SIGNALS USED (if any; normally absent, see below)
[brief enumeration, with explicit framing: "These anomaly indicators helped focus the investigation
 on signal-rich events. They are internal investigation tools, not standalone problem alerts."]

  `anomaly_max_score` / `anomaly_max_score_confidence` are designed and not emitted anywhere in
  the product today, so this section is normally absent. Include it only when you actually read an
  anomaly field and it carried a value. Do not model a Finding on one: a citation for a signal no
  source emits is the exact confidently-wrong shape this template exists to prevent.

WHAT WAS EXAMINED
- Backing queries: <N>
- Cached refinements: <M>
- Sources covered: <list or count>
- Org(s) covered: <list or count>
- Matched population examined: <total rows/events, from query summaries>
- Wall-clock: <minutes>

AUDIT TRAIL
<the per-query query_id + query_url list from the local investigation-state document; inspect any one with get_query_metadata(query_id="<qid>"); every call is also tagged external_investigation_id="<id>" in the server-side audit>

POSSIBLE NEXT DIRECTIONS
[1-4 sentences max suggesting where investigation could go from here, ending with the invitation:]

"Would you like to:
 (1) explore additional facts in any of the areas mentioned above, or
 (2) run /sparklogs:analyze-cause <external_investigation_id> to derive candidate cause hypotheses
     from these findings?"
```

---

## Field definitions

### external_investigation_id
A friendly, human-meaningful correlation handle you supply - free text, 8-200 chars, e.g. `investigate-ticket-4781-veeam-backup`. REQUIRED on every MCP call. Pick one distinctive value at the start of an investigation and reuse it for every call within that investigation; reusing the same value RESUMES the investigation (the server appends to the same audit trail). A genuinely new investigation needs a fresh, distinctive value - embed a ticket/incident id or a nonce so it doesn't collide with unrelated investigations. Out-of-bounds values return a user-visible validation error from the tool. If you're resuming a paused investigation, recover the id from the local investigation-state document at `./investigations/<id>.md`.

### EXECUTIVE SUMMARY (placed first, after the header)
**One paragraph, at most six sentences.** Plain language; engineer audience. **Every claim derives from a Finding** - do not introduce new evidence here. Cite the Finding numbers rather than restating their evidence.

The cap is the point. An engineer reads this to decide whether to open the Findings; a summary that reproduces them has replaced the decision with a second read.

**Right (factual synthesis):**
"The investigation surfaced a VSS writer failure on srv-fileshare01 at 03:14 UTC concurrent with a Veeam error and a recent KB5034441 install (Findings 1, 2, 4). The same pattern appeared on 7 other fleet sources (Finding 6). The cluster analysis (Finding 5) shows the error happens in multiple contexts, with the most common involving SCM service activity preceding the failure. The agent reported its data complete through the end of the window with no advisories (Finding 7)."

**Wrong (speculation):**
"This is clearly caused by the KB5034441 update breaking VSS interaction with Veeam - the timing and fleet-wide pattern make this the obvious root cause."

The right version is factual; the wrong version is cause analysis. Cause analysis lives in `/sparklogs:analyze-cause`.

### Source(s)
Specific sources investigated (e.g., `srv-fileshare01`, `ws022.acme`). Not generic ("a server in Acme Dental") - name them.

### Org(s)
The `org_id`(s) the investigation was scoped to (from `resolve_scope`).

### Time window
Absolute UTC timestamps for the investigation's data window. Not relative ("last 24 hours") - bind to absolute timestamps so the summary remains interpretable when re-read days later.

### Data sources queried
The subsources and helper outputs you actually queried. Be specific; e.g., `win.eventlog.application`, `win.eventlog.system`, `sparklogs.agent.state` (`query_device_health`), `win.defender.eventlog`.

### WHAT WAS NOT CHECKED
Investigation-specific list of off-endpoint sources and conditions you couldn't check. Per-investigation-type reference: `guides/off-endpoint-causes.md`. Examples:
- "Backup target NAS-01 was not checked (it does not run a Managed Agent). Recommend checking NAS-01 health logs directly."
- "Cloud identity audit logs (Azure AD / Entra) are outside SparkLogs ingestion. Sign-in failures from cloud-side conditional access policies would not appear in this investigation."
- "EDR cloud audit (SentinelOne) is outside SparkLogs ingestion. EDR-side blocks of VSS operations would not appear in on-endpoint state."

**One bullet per item, one sentence each. Never prose.** Each bullet names the thing not checked and why it matters; the engineer scans this list for the gap that changes their next move, and a paragraph hides it.

Where nothing material was unchecked, one bullet says so:
- "Off-endpoint backup causes (target health, EDR blocking VSS) considered; on-endpoint evidence is sufficient."

The section is required even when it is one line.

### Finding N
**One sentence for the statement, then the fields. No prose paragraph.** The fields below already carry the evidence, the sources and the window; repeating them in sentences is the single most common way these summaries get long without getting more useful.

Format: `<subject> was <state> at <time>`, or `<event class> occurred N times in <window>`, or similar.

**Right:**
- "VSS writer SqlServerWriter was in FAILED state at 2026-04-23 03:14:32 UTC."
- "Pattern_hash h7Vjf2Xk9a appeared 1247 times in last 24h on srv-fileshare01; absent in prior 24h."
- "system_health.os_volume_free_pct was 8% at 2026-04-23 14:00 UTC (severity: error per workspace bands)."
- "srv-fileshare01 reported agent_complete_through 2026-04-23 14:00 UTC with no advisories."

**Wrong (speculation in this skill - move to cause-analysis skill or POSSIBLE NEXT DIRECTIONS):**
- "The cause is likely the recent KB5034441 install."
- "This suggests a VSS service deadlock."

**Wrong (generic / un-cited):**
- "The system has issues."
- "Backups are failing."

### Evidence
One or more `query_url` values from the MCP tool responses that produced the evidence for this Finding. The engineer clicks these to verify in the SparkLogs cached-query explorer. **If you don't have a query_url, you don't have the evidence - don't make the claim.**

### Confidence
One of: `high`, `medium`, `low`, `insufficient_evidence`. See SKILL.md Section 6 for calibration guidance.

### Sources contributing
The specific source(s) whose data supports this finding. Important when the investigation spans multiple sources.

### Time window of evidence
The actual window the cited evidence covers. May be tighter than the overall investigation window.

### Optional Note
1-2 sentences of observation-grounded context. Not speculation. Not recommendation. Example:
- "Note: this is the first occurrence of this pattern_hash in the source's 90-day history."
- "Note: the VSS writer state transition was concurrent (within 2 seconds) with a SCM 7036 event for the SQL Server service."

NOT:
- "Note: this is likely caused by..."  <- speculation; move to POSSIBLE NEXT DIRECTIONS or cause-analysis skill
- "Note: recommend restarting the service" <- recommendation; not this skill's role

### Anomaly Signals Used
Optional section, and **normally absent**: `anomaly_max_score` / `anomaly_max_score_confidence` are designed and not emitted anywhere in the product today, so the canonical context-reduction filter reduces to its `severity` half on every source. Omitting the section is the usual correct outcome, and the missing anomaly half is never "no anomalies."

Include it only if you actually read an anomaly field and it carried a value. Then list briefly, with the required framing: anomalies are internal investigation tools, not standalone problem alerts. Never build a Finding on one: a citation for a signal no source emits is the confidently-wrong shape this template exists to prevent.

### What Was Examined
Track the running counts (backing queries, refinements, sources/orgs covered, matched population) in your local investigation-state document as you go. All figures here come from server-returned query summaries, not self-reported estimates. This section shows the engineer how much evidence backs the summary: how many queries ran, how broad a scope they covered, how many events were in the matched population.

### Audit Trail
Provide the engineer with the means to inspect every query you ran: the `query_id` + `query_url` list from the local investigation-state document, with per-query detail via `get_query_metadata(query_id="<qid>")`. Every call is also tagged `external_investigation_id` in the server-side audit (a direct investigation-level URL is preferred once SparkLogs UX surfaces it).

### POSSIBLE NEXT DIRECTIONS
Bounded section at the end of the summary. 1-4 sentences max. Suggests where the investigation could go next - either more facts to dig into, or running `/sparklogs:analyze-cause` to derive candidate hypotheses. Always ends with the explicit invitation:

> "Would you like to (1) explore additional facts in any of the areas mentioned above, or (2) run /sparklogs:analyze-cause <external_investigation_id> to derive candidate cause hypotheses from these findings?"

**Right:**
"The temporal correlation between the Tuesday KB install and the new error pattern, combined with the fleet-wide consistency, is worth exploring further. The disk-pressure cluster (Finding 5b) is a separate area on a small subset of sources.

Would you like to (1) explore additional facts in any of the areas mentioned above, or (2) run /sparklogs:analyze-cause investigate-ticket-4781-veeam-backup to derive candidate cause hypotheses from these findings?"

**Wrong (presents as conclusion):**
"The root cause is KB5034441 affecting Veeam VSS interaction. Roll back the patch on affected endpoints."

**Wrong (cause analysis expanded beyond bounds):**
"There are several possible root causes. First, KB5034441 may have changed the tcpip.sys driver in a way that affects Veeam's network communication during VSS snapshots. Second, disk pressure on cluster B sources may be exhausting VSS shadow storage. Third..." - that's `/sparklogs:analyze-cause` territory.

---

## Examples - full worked outputs

### Example 1: Investigation finds clear evidence

```
INVESTIGATION SUMMARY - Veeam backup failure on srv-fileshare01 (ticket #4781)
external_investigation_id: investigate-ticket-4781-veeam-backup

EXECUTIVE SUMMARY
The investigation surfaced a VSS writer failure on srv-fileshare01 at 03:14 UTC concurrent with a
Veeam error 0x80042308 (Findings 1, 2). A new error pattern appeared in the last 24 hours that
wasn't present in the prior 24 hours (Finding 3), and the same pattern affected 7 other sources
in the fleet during the same window (Finding 6). KB5034441 was installed approximately 30 minutes
before the failure (Finding 4); temporal proximity is observed but causality is not asserted.
Cluster analysis (Finding 5) shows the error happens in multiple distinct contexts, with the most
common involving SCM service activity preceding the failure. The agent reported its data complete
through the end of the window (Finding 7).

SCOPE CHECKED
- Source(s): srv-fileshare01
- Org(s): org_acme_dental
- Time window: 2026-04-22 00:00 UTC to 2026-04-23 14:00 UTC
- Data sources queried: query_device_health; sparklogs.agent.state; win.eventlog.application; win.eventlog.system; sparklogs.kind=agent_op
- WHAT WAS NOT CHECKED:
  - Backup target NAS-01 (does not run Managed Agent). Recommend checking NAS-01 health directly
    if the on-endpoint evidence below is insufficient.
  - EDR cloud audit (SentinelOne SaaS): EDR-side blocks of VSS operations would not appear in
    on-endpoint state.
  - Veeam service-account credential store (vault/AD): credential expiry would manifest as a
    different failure mode than the one observed.

OBSERVED CONDITIONS

Finding 1: VSS writer SqlServerWriter was in FAILED state at 2026-04-23 03:14:32 UTC
  Evidence: <query_url as returned> (query_id: qXY9a3m2k7n1p4t8)
  Confidence: high
  Sources contributing: srv-fileshare01
  Time window of evidence: 2026-04-23 03:14:00 to 03:14:45 UTC

Finding 2: Veeam Application channel logged error 0x80042308 at 2026-04-23 03:14:30 UTC, in same window as Finding 1
  Evidence: <query_url as returned> (query_id: qP4n8k2r9c6m3y1z)
  Confidence: high
  Sources contributing: srv-fileshare01
  Time window of evidence: 2026-04-23 03:14:30 UTC

Finding 3: New pattern_hash "h7Vjf2Xk9a" appeared in last 24h that wasn't present in prior 24h
  Evidence: <query_url as returned> (query_id: qK7m2p1n8r4t9c2v)
  Confidence: high
  Pattern text: "Veeam VSS error 0x80042308 on volume <X> for job <Y>"
  Sources contributing: srv-fileshare01 (and 7 fleet sources per Finding 6)
  Time window of evidence: 2026-04-22 00:00 to 2026-04-23 14:00 UTC

Finding 4: KB5034441 was installed on srv-fileshare01 at 2026-04-23 02:45 UTC
  Evidence: <query_url as returned> (query_id: qB8t4r2y9c1m6p3n)
  Confidence: high
  Sources contributing: srv-fileshare01
  Time window of evidence: 2026-04-23 02:45 UTC
  Note: Temporal proximity to Finding 1 is observation only - causality is not asserted in this summary.

Finding 5: Cluster analysis of the new error pattern shows 3 distinct contextual situations
  Evidence: <query_url as returned> (query_id: qC5g7n3p2k8m1y4r)
  Confidence: medium (cluster analysis is sample-based; sample_n_matches=100 of 412 total occurrences)
  Sources contributing: srv-fileshare01 (47), srv-fileshare02 (38), srv-app01 (12), other fleet (5)
  Time window of evidence: 2026-04-22 00:00 to 2026-04-23 14:00 UTC
  Note: Cluster A (47 occurrences) precedes the error with SCM service activity. Cluster B (4
        occurrences) precedes with disk-pressure indicators (volumes free <10%). Cluster C (49
        occurrences) has no obvious common precursor pattern.

Finding 6: Same Veeam error pattern fired on 7 other sources in this MSP fleet during same window
  Evidence: <query_url as returned> (query_id: qF2h9k4n7m3p1c8y)
  Confidence: high
  Sources contributing: srv-fileshare01, srv-fileshare02, srv-app01, srv-app02, srv-mail01, srv-db01,
                        srv-web01, srv-print01
  Time window of evidence: 2026-04-22 00:00 to 2026-04-23 14:00 UTC

Finding 7: srv-fileshare01 reported agent_complete_through 2026-04-23 14:00 UTC, advisories empty
  Evidence: <query_url as returned> (query_id: qH6l1p5n2k7t3m8r)
  Confidence: high
  Sources contributing: srv-fileshare01
  Time window of evidence: 2026-04-22 00:00 to 2026-04-23 14:00 UTC
  Note: The agent's own feed reports carry this. Event counts and first/last bounds do not.

WHAT WAS EXAMINED
- Backing queries: 4
- Cached refinements: 6
- Sources covered: srv-fileshare01 (primary); 8 fleet sources for the cross-source pivot (Finding 6)
- Org(s) covered: org_acme_dental
- Matched population examined: 8,614 events across the 4 backing queries
- Wall-clock: 4 minutes

AUDIT TRAIL
Backing queries (from the investigation-state document; every call tagged external_investigation_id="investigate-ticket-4781-veeam-backup"):
  q_ab12 https://sparklogs.app/explore?... | q_cd34 https://sparklogs.app/explore?...
Per-query detail (parameters, cache status, schema): get_query_metadata(query_id="<qid>").
Or browse interactively at: https://sparklogs.app/investigations/investigate-ticket-4781-veeam-backup

POSSIBLE NEXT DIRECTIONS
The temporal correlation between the Tuesday KB install and the new error pattern, combined with
the fleet-wide consistency across 7 other sources, is worth exploring further. The disk-pressure
cluster (Finding 5b) is a separate factor on a small subset of sources that could be examined
independently.

Would you like to (1) explore additional facts in any of the areas mentioned above, or (2) run
/sparklogs:analyze-cause investigate-ticket-4781-veeam-backup to derive candidate cause hypotheses from these findings?
```

### Example 2: Investigation finds insufficient evidence (still useful)

```
INVESTIGATION SUMMARY - slow file share complaint on srv-fileshare02
external_investigation_id: investigate-srv-fileshare02-slow-share

EXECUTIVE SUMMARY
The on-endpoint perf and event data for srv-fileshare02 in the user-reported window shows no signs
of resource saturation, SMB-server-side errors, or AV-induced spikes (Findings 1-3). The source's
agent reported its data complete through the window (Finding 4). However, the user reported
slowness - the absence of server-side evidence does not mean the user is wrong; it suggests the
slowness may have a cause outside this server's visibility. Common causes outside scope (see WHAT WAS NOT CHECKED) include client-side
issues, network path issues, and per-workstation AV scanning each opened file.

SCOPE CHECKED
- Source(s): srv-fileshare02
- Org(s): org_acme_dental
- Time window: 2026-04-23 06:00 UTC to 2026-04-23 14:30 UTC
- Data sources queried: query_device_health; sparklogs.agent.state; win.eventlog.system; win.defender.eventlog; sparklogs.kind=agent_op
- WHAT WAS NOT CHECKED:
  - User workstations making SMB requests (only the file server is in scope).
  - Network path between user workstations and srv-fileshare02 (switches, APs, firewall).
  - Any client-side issue (per-workstation AV scanning each opened file).
  - Backup/indexing software running on srv-fileshare02 if not detected via installed_products.

OBSERVED CONDITIONS

Finding 1: srv-fileshare02 perf counters within normal range during the user-reported window
  Evidence: <query_url as returned> (query_id: qN3k7m1p2r8t4c9y)
  Confidence: high
  Sources contributing: srv-fileshare02
  Time window of evidence: 2026-04-23 13:00 to 14:30 UTC
  Note: cpu_max_60s peaked at 42% (within nominal); disk_queue_max_60s peaked at 1.8 (nominal);
        no perf-counter anomalies fired.

Finding 2: No SMB Server channel error or warning events in the window
  Evidence: <query_url as returned> (query_id: qP5g9n2k7m1t3r8c)
  Confidence: high
  Sources contributing: srv-fileshare02
  Time window of evidence: 2026-04-23 06:00 to 14:30 UTC

Finding 3: Defender real-time scanning was active but with no scan-related events in the window
  Evidence: <query_url as returned> (query_id: qR8m2p4n7k1t9c5y)
  Confidence: high
  Sources contributing: srv-fileshare02
  Time window of evidence: 2026-04-23 06:00 to 14:30 UTC

Finding 4: srv-fileshare02 reported agent_complete_through 2026-04-23 14:30 UTC, advisories empty
  Evidence: <query_url as returned> (query_id: qY1k9p2m7n4t3r6c)
  Confidence: high

Finding 5: No evidence of slowness, congestion, or unusual activity on srv-fileshare02 in the
           investigation window from on-endpoint data
  Evidence: synthesis of Findings 1-4
  Confidence: insufficient_evidence (the question is "why is it slow"; the on-endpoint data does
              not show slowness - but the user reported slowness, which suggests the cause may be
              outside this server's visibility)

WHAT WAS EXAMINED
- Backing queries: 1
- Cached refinements: 4
- Sources covered: srv-fileshare02
- Org(s) covered: org_acme_dental
- Matched population examined: 142 events
- Wall-clock: 2 minutes

AUDIT TRAIL
Backing-query query_id + query_url list in the investigation-state document (calls tagged external_investigation_id="investigate-srv-fileshare02-slow-share"); per-query detail via get_query_metadata(query_id="<qid>").

POSSIBLE NEXT DIRECTIONS
The pattern of "user reports slow, server looks fine" frequently traces to client-side or
network-path causes rather than the server itself. Investigating the user's workstation directly,
or checking switch/AP/firewall logs between the user and the server, may reveal the cause.

Would you like to (1) explore the user's workstation (give me the workstation name), check
network-path data, or extend the investigation in some other direction, or (2) run
/sparklogs:analyze-cause investigate-srv-fileshare02-slow-share to derive candidate cause hypotheses from what was
observed (and not observed) so far?
```

This second example is the critical case. The investigation found "no problem on the server" - and that's a useful, defensible answer. The output:
- Doesn't claim "no problem exists" (that would be wrong).
- Does claim "no evidence of problem on the source I checked" (honest).
- Lists what's outside scope so the engineer knows where to look next.
- POSSIBLE NEXT DIRECTIONS bounded but actionable, with the open invitation.

A bad investigation would have either (a) confidently concluded "no problem" (silent failure), or (b) speculated about client-side causes in this skill (overreach). The right output above does neither.
