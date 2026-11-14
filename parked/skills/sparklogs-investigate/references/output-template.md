<!-- Moved from src/skills/sparklogs-investigate/references/output-template.md at 29a8d32. Needs a context-clustering tool and an investigation page; neither exists. -->

## Example 1 as it read with a cluster-analysis finding

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
- Data sources queried: query_device_health; sparklogs.device.state; win.eventlog.application; win.eventlog.system; sparklogs.kind=agent_op
- WHAT WAS NOT CHECKED:
  - Backup target NAS-01 (does not run a SparkLogs Agent). Recommend checking NAS-01 health directly
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
sparklogs-analyze-cause investigate-ticket-4781-veeam-backup to derive candidate cause hypotheses from these findings?
```

## Investigation-level URL

Audit Trail field text: "a direct investigation-level URL is preferred once SparkLogs UX surfaces it".
