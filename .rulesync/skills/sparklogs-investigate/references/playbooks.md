# Investigation Playbooks

Per-category playbook outlines for common hard-mode investigation symptoms. Three categories (VSS backup failure, memory/handle leak, RMM connectivity) have full call-sequence walks; the other seven have lightweight sketches that expand to full walks as more investigations are observed.

**How to use this file:**
1. Identify which symptom category the engineer's request falls under.
2. Read the relevant section. The playbook is a *suggested* call sequence, not a script - adapt to the specific investigation.
3. Always produce a system condition summary per `output-template.md`.
4. Always populate WHAT WAS NOT CHECKED per `off-endpoint-causes.md`.

**Field-availability gating - read before running any recipe below.** Nearly every "canonical evidence" field cited in these playbooks - `state.*` (state.vss_writers, state.processes, state.services, state.memory, state.system_health, etc.), `event_kind` (SLASnapshot, SLADelta, SLAAgentOp, SLAHelper), and `anomaly_max_score` / `anomaly_categories` - is a deep RCA field the Managed Agent does not emit yet (zero production emission today). Every filter or projection on these fields returns EMPTY on every source right now. **An empty result from a deep-field query means "not emitted yet," never "no problem found."** Per SKILL.md Section 8: fall back to shallow-triage fields (`message`, `severity`, `source`, `app`, `subsource`, `pattern`/`pattern_hash`) and say so explicitly in the Finding or WHAT WAS NOT CHECKED. These playbooks describe the target end-state call shape for when emission lands; today, expect the deep-field portions to come back empty and plan the investigation's shallow-triage fallback accordingly.

**Fast-follow tools still not shipped.** `query_period_diff`, `compare_populations`, and `cluster_event_contexts` are FAST-FOLLOW. Substitute: two `query_grouped_aggregation` passes over adjacent windows for a period diff; one `query_grouped_aggregation` per population (via distinct `lql`) and compare for a population diff; `query_logs` narrowed to the pattern, then `refine_query_result` with `group_by` over context fields, for clustering. **`describe_pattern` is shipped** for pattern text/stats (use it before citing teaser patterns). See `mcp-tool-decision-tree.md` and `scope-resolution.md`. **Aggregation-first still holds:** `query_grouped_aggregation` before `query_logs`; refine the cached slice instead of re-scanning.

**The scope ladder is the lever most of these recipes actually run on today.** `service`/`app`/`subsource`/`category`/`pattern` (and their `_hash` companions) are available now, unlike the deep RCA fields above. Group by a coarse field to localize the noisy component, narrow rung by rung, and land on the `pattern_hash` that carries the recurring event. See `scope-ladder.md`.

---

## HM1 - VSS backup failure (FULL PLAYBOOK)

### Trigger
"Veeam or Datto, Axcient, Acronis, MSP360, Cove, or Slide reports backup failed on <source>."

### Canonical evidence
vss_writers state, recent volume snapshots, recent `Microsoft-Windows-Backup` and `VSS` event-log channels, disk free-space (system_health), scheduled-task state for the backup job, installed_products (to detect cross-product backup conflicts), system_health for ingest health and overall picture.

### Off-endpoint causes to flag in WHAT WAS NOT CHECKED
Per `off-endpoint-causes.md` HM1: backup target NAS/cloud, EDR cloud blocking VSS, bespoke vendor without autodetect, Veeam credential vault, Hyper-V/VMware guest writers, backup-job server-side state.

### Call sequence

**Step 0 - Investigation session.** Pick an `external_investigation_id` (friendly, 8-200 chars, e.g. `investigate-<ticket>-<X>-vss-backup`). Write local investigation-state document at `./investigations/<id>.md`.

**Step 1 - Scope resolution.**
```
resolve_scope(
  query="<source name from ticket>",
  external_investigation_id="<id>"
)
-> org_ids, agent rows
```

**Step 2 - Source health discovery.**
```
list_sources(
  org_ids=[<from step 1>],
  start="<investigation start, RFC3339 UTC>",
  end="<investigation end, RFC3339 UTC>",
  include_sub_orgs=true,
  external_investigation_id="<id>"
)
```
If the source has no data in the investigation's time window -> halt and ask the engineer (per `scope-resolution.md`): "I don't see Managed Agent telemetry from `<source>` during `<window>`. Did you mean a different source name, or is the source perhaps offline / not deployed during that window?"

**Step 3 - System health overview.**
```
query_logs(
  org_ids=[...],
  start="<24h before window>",
  end="<window end>",
  lql='source = "<X>" AND subsource = system_health',
  return_field_list=['t', 'event_summary', 'state.system_health'],
  external_investigation_id="<id>"
)
```
`state.system_health` is a deep field pending Managed Agent emission - expect this to return rows with `event_summary` populated but `state.system_health` empty until emission lands. Establishes overall_severity, disk space, network reachability, etc. where available; note the gap in WHAT WAS NOT CHECKED otherwise.

**Step 4 - Backing query: what changed (fast-follow tool - not yet shipped; v1 substitute below).**
```
# query_period_diff is fast-follow. v1 substitute: two query_grouped_aggregation calls.
query_grouped_aggregation(org_ids=[...], start="<24h before failure window>", end="<failure window start>",
  lql='source = "<X>"', group_field="pattern", external_investigation_id="<id>")   # period A (baseline)
query_grouped_aggregation(org_ids=[...], start="<failure window start>", end="<now>",
  lql='source = "<X>"', group_field="pattern", external_investigation_id="<id>")   # period B (failure window)
```
Compare the two grouped results locally: identifies new VSS-related patterns, disappeared patterns (e.g., successful-backup pattern that stopped), accelerated patterns. This is the scope ladder's cross-window correlation shape: a `pattern_hash` present in period B but absent from period A is new behavior worth chasing first.

**Step 5 - Read the new patterns' text (`describe_pattern`).**
Call `describe_pattern` with the `pattern_hash` values from the teaser or ladder before citing pattern text to the engineer.
```
query_logs(
  org_ids=[...],
  start="<failure window start>", end="<failure window end>",
  lql='pattern_hash in (<top 3-5 new VSS-related hashes from step 4>)',
  return_field_list=['t', 'pattern_hash', 'message'],
  limit=25,
  external_investigation_id="<id>"
)
```
Returns pattern text + sample messages. Now you have the actual error wording (e.g., "Veeam VSS error 0x80042308").

**Step 6 - Surrounding context for primary error (fast-follow `cluster_event_contexts` not shipped; v1 substitute below).**
```
query_logs(
  org_ids=[...],
  start="<24h before failure window>", end="<failure window end>",
  lql='source = "<X>"',
  return_field_list=['t', 'subsource', 'severity', 'pattern_hash', 'message'],
  external_investigation_id="<id>"
)
-> qid_context, query_url
refine_query_result(query_id=<qid_context>, filter_lql='t between <primary_error_t - 300s> and <primary_error_t>',
  select=['t', 'subsource', 'severity', 'pattern_hash', 'message'], order_by=[{col: 't', dir: 'asc'}])
```
Manually read the preceding-context rows. Often surfaces "SCM service activity precedes most occurrences" or "disk-pressure precedes a subset" or "isolated occurrences with no precursor."

**Step 7 - Backing query: vss_writers state at failure window (Level 3 ground truth - deep field, likely empty today).**
```
query_logs(
  org_ids=[...],
  start="<failure_window_start>", end="<failure_window_end>",
  lql='source = "<X>" AND subsource in (vss_writers, volumes, scheduled_tasks, installed_products)',
  return_field_list=['t', 'event_kind', 'snapshot_id', 'prev_delta_id', 'event_summary',
                     'state.vss_writers', 'state.volumes', 'state.scheduled_tasks', 'anomalies'],
  external_investigation_id="<id>"
)
-> qid_state, query_url
```
`event_kind`, `state.vss_writers`, `state.volumes`, `state.scheduled_tasks`, and `anomalies` are deep fields pending Managed Agent emission - expect them empty today (see the field-availability note at the top of this file). `event_summary` and the row-level fields (t, subsource) are shallow and populate normally. Note: broadened to multiple subsources so the same cache feeds Steps 7-9 without additional backing queries.

**Step 8 - Refinements within Step 7's cache.**
```
refine_query_result(query_id=<qid_state>, filter_lql='subsource = vss_writers',
                   select=['t', 'state.vss_writers', 'anomalies'])
refine_query_result(query_id=<qid_state>, filter_lql='subsource = volumes',
                   select=['t', 'state.volumes'])
refine_query_result(query_id=<qid_state>, filter_lql='subsource = scheduled_tasks',
                   select=['t', 'state.scheduled_tasks'])
refine_query_result(query_id=<qid_state>, filter_lql='subsource = installed_products',
                   select=['t', 'event_summary'])
```
Per-subsource Level-3 reads against the cache, not fresh scans. (Field-availability caveat from Step 7 applies to the `state.*` / `anomalies` projections here too.)

**Step 9 - Cross-product check.**
From Step 8's installed_products refinement, check `event_summary.by_category` and `event_summary.multiple_in_category`. If multiple backup products detected (e.g., `multiple_in_category: ["backup"]`), note in summary as a likely cross-product conflict - two backup products competing for VSS snapshots is a recurring cause.

**Step 10 - Cross-source pivot if cause looks environmental.**
If Step 4's grouped-aggregation comparison showed the new pattern across multiple sources (suggesting environment-wide), or if you want to confirm scope:
```
query_grouped_aggregation(
  org_ids=[<broader scope, e.g., all msp orgs>],
  start="<failure window start>", end="<failure window end>",
  lql='subsource in (vss_writers, backup_jobs) AND severity in (error, warning)',
  group_field="source",
  external_investigation_id="<id>"
)
```
(The `anomaly_max_score` half of the usual context-reduction filter is dropped here - deep field, not emitted yet; `severity` alone is the shallow-triage fallback.) This result is terminal - not refinable. To drill into a specific source's hits, issue a new `query_logs` filtered to that source, not a refine. 1 source = isolated; few sources = local cluster; many sources = environment-wide.

**Step 11 - Ingest-health check (deep-field caveat).**
```
query_logs(
  org_ids=[...],
  start="<24h before failure window>", end="<failure window end>",
  lql='source = "<X>" AND event_kind = SLAAgentOp AND subsource in (ingest_drop, spool_full, backpressure)',
  return_field_list=['t', 'subsource', 'event_summary', 'message'],
  external_investigation_id="<id>"
)
```
`event_kind = SLAAgentOp` is not emitted yet - this returns empty regardless of true ingest health. Treat empty as inconclusive, not "no drops"; cross-check `list_sources` event-count trends from Step 2 instead, and note the gap in WHAT WAS NOT CHECKED.

**Step 12 - System condition summary output per `output-template.md`.** Findings derive from Steps 3-11. Tally backing queries and refinements from your local investigation-state document for WHAT WAS EXAMINED (`get_query_metadata(query_id="<qid>")` on any single cache if you need its status or schema). WHAT WAS NOT CHECKED enumerates per `off-endpoint-causes.md`. POSSIBLE NEXT DIRECTIONS section at the end with the explore-or-analyze invitation.

---

## HM2 - Slow logon (sketch)

### Trigger
"User reports logon takes <duration> since <when>."

### Canonical evidence
GPO processing times (Group Policy Operational channel), DNS resolution latency, SMB session counts, AD replication health, network adapter state, system_health.time_sync_detail, recent processes/services changes.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM2: Azure AD conditional-access policy, MFA cloud, federation server certs, time drift on PDC, Azure AD Connect sync, network path between user and DC.

### Call sequence (sketch)

1. `resolve_scope` for affected workstation + user's site DC.
2. `list_sources` confirming both are reporting.
3. `query_period_diff` on workstation to find what changed in the past 24-72h.
4. `query_logs` Level-3 on `subsource in (system_health, time_sync, services, gpo_processing)` for the affected window - note system_health surfaces clock drift detail when relevant.
5. `query_logs` on the site DC scoped to `subsource = ad_replication` to confirm or rule out replication issues.
6. Optional `compare_populations` (this user's logon events vs. fleet baseline - if other users on same workstation logon fast, the issue is user-specific; if all users on the site are slow, the issue is site-wide).
7. Ingest-health check on both sources.
8. system condition summary output. Visibility section flags Azure AD / MFA cloud / federation if symptom looks identity-related.

---

## HM3 - Memory or handle leak (FULL PLAYBOOK)

### Trigger
"App-server <X> needs reboot every <N> days. Suspected leak in <process_name>."

### Canonical evidence
Processes snapshot+delta chain showing the leaking PID's memory and handle count growing monotonically; correlated with process start time and parent process; cross-validated with system memory pressure trajectory; recent windows_updates / installed_software / services to identify recent changes correlated with leak onset.

**Field-availability warning: HM3's core evidence is deep-tier.** `state.processes`, `state.memory`, and `event_kind`/`snapshot_id`/`anomalies` are all deep fields pending Managed Agent emission (see the note at the top of this file) - the working-set/handle-count trajectory this playbook is built around is NOT available today. Until emission lands, HM3 investigations must lean on shallow-triage fallback: `severity` trend on the source, `pattern_hash` frequency for any app-crash or OOM-related winlog patterns, and engineer-reported symptom timing. Say so explicitly in the summary rather than producing a confident leak-trajectory Finding from empty data.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM3: vendor app internals, container/VM nested processes, GPU memory, vendor app server-side state.

### Call sequence

**Step 0-2** - Investigation session, scope resolution, source health discovery (per HM1 steps 0-2).

**Step 3 - System health overview.**
```
query_logs(
  org_ids=[...],
  start="<7d before window>", end="<window end>",
  lql='source = "<X>" AND subsource = system_health',
  return_field_list=['t', 'event_summary', 'state.system_health'],
  external_investigation_id="<id>"
)
```
Note: HM3 needs a 7-day window to see leak trajectory (broader than HM1's 24h). `state.system_health` is deep-tier; expect it empty today.

**Step 4 - Backing query: 7d trajectory for processes / memory / services.**
```
query_logs(
  org_ids=[...],
  start="<7d before window>", end="<window end>",
  lql='source = "<X>" AND subsource in (processes, memory, services, system_health, installed_software, windows_updates)',
  return_field_list=['t', 'event_kind', 'subsource', 'event_summary',
                     'anomaly_max_score', 'anomaly_max_score_confidence', 'anomaly_categories',
                     'snapshot_id', 'prev_delta_id'],
  external_investigation_id="<id>"
)
-> qid_main, query_url
```
This 7-day cache is the primary working set for the rest of the investigation. `event_kind`, `anomaly_max_score*`, and `snapshot_id`/`prev_delta_id` are deep fields - expect them empty; `subsource` and `event_summary` are shallow and populate normally.

**Step 5 - Refine for the suspect process at Level 3 (deep field - likely empty today).**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='subsource = processes',
  select=['t', 'event_kind', 'snapshot_id', 'prev_delta_id', 'event_summary',
                     'state.processes', 'anomalies']
)
```
Returns time-series of processes state, once `state.processes` is emitted. Extract MyApp.exe trajectory locally:
- Working set (RSS) over time, across multiple PID lifetimes (process restarts may reset).
- Handle count over time.
- top_n_by_total_cpu_time - cumulative CPU time since process start.
- top_n_by_cpu (instantaneous %).

A monotonically-increasing working_set or handle_count across PID lifetimes is the leak signature. **Today `state.processes` is not emitted - this refine will return rows with an empty `state.processes` column. Don't read that as "no leak"; flag it as "process-level state unavailable" and fall back to `event_summary` / shallow signals.**

**Step 6 - Refine for memory pressure cross-validation.**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='subsource = memory',
  select=['t', 'event_summary', 'state.memory', 'anomalies']
)
```
Confirms whether system-level memory pressure trajectory matches the process-level trajectory, once `state.memory` is emitted (deep field, empty today).

**Step 7 - Refine for system_health context.**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='subsource = system_health',
  select=['t', 'event_summary']
)
```
Surfaces overall_severity trajectory. If overall_severity escalated to error/fatal at the time the user noticed slowness, that's a corroborating signal.

**Step 8 - Backing query: comparison source if available (fast-follow `compare_populations` not shipped; v1 substitute below).**
If the user has a sister server (e.g., srv-app04) running the same app, compare:
```
query_grouped_aggregation(org_ids=[...], start="<7d before window>", end="<window end>",
  lql='source = "<X>" AND subsource in (processes, memory)', group_field="severity",
  external_investigation_id="<id>")
query_grouped_aggregation(org_ids=[...], start="<7d before window>", end="<window end>",
  lql='source = "<sister>" AND subsource in (processes, memory)', group_field="severity",
  external_investigation_id="<id>")
```
Compare the two grouped results (severity distribution today; once `state.processes` emits, compare working-set trajectories directly instead). Identifies whether the symptom is on both servers (suggests app-version issue or workload pattern) or just one (suggests box-specific config or workload).

**Step 9 - Recent change correlation.**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='subsource in (windows_updates, installed_software, services, drivers)',
  select=['t', 'subsource', 'event_summary']
)
```
Identifies recent changes that might correlate with leak onset.

**Step 10 - Investigation-mode amplification.** Not currently available. Skip this step.

**Step 11 - Ingest-health check (deep-field caveat).**
```
query_logs(
  org_ids=[...],
  start="<7d before window>", end="<window end>",
  lql='source = "<X>" AND event_kind = SLAAgentOp AND subsource in (ingest_drop, spool_full, backpressure)',
  external_investigation_id="<id>"
)
```
`event_kind = SLAAgentOp` isn't emitted yet - empty here is inconclusive, not "no drops." Cross-check `list_sources` event-count trends instead.

**Step 12 - System condition summary output.**
HM3 needs more backing queries than most playbooks here because the 7-day window (leak trajectory) is broader than the typical 24h investigation.

### Findings shape for HM3
- Finding N: "MyApp.exe working_set_bytes grew from <X>MB to <Y>MB over <N> days, across <K> PID lifetimes" - leak signature.
- Finding N+1: "System-level memory pressure (memory_committed_avg_pct_24h) escalated from <A>% to <B>% over the same window" - corroboration.
- Finding N+2: "<recent change> occurred on <date> coincident with the start of the trajectory" - correlation; note temporal proximity, not causation.
- Finding N+3: "Sister server <sister> shows <comparison>" - differential evidence.

---

## HM4 - Windows Update failure (sketch)

### Trigger
WSUS/WUfB shows "needs reboot" or "update failed" without clear cause.

### Canonical evidence
Windows Update event-log channels (Microsoft-Windows-WindowsUpdateClient/Operational), pending reboot state, disk free space, TrustedInstaller service state, recent CBS activity, network connectivity to WSUS or Microsoft Update endpoints, system_health.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM4: WSUS server health, MS Update CDN status, content-sync issues, parallel driver vendor channel.

### Call sequence (sketch)
1. Investigation session, scope resolution, source health discovery.
2. System health overview (note system_health.last_successful_patch_utc and days_since_last_patch).
3. `query_period_diff` over 7d for what changed.
4. `query_logs` Level-3 on `subsource in (windows_updates, services, system_health)` for the relevant window.
5. `cluster_event_contexts` on update-failure pattern if found.
6. Cross-source pivot if multiple sources affected by same KB.
7. Ingest-health check, system condition summary output.

---

## HM5 - Disk full or filling fast (sketch)

### Trigger
Volume crosses 90% or fills entirely; users hit "no space" errors.

### Canonical evidence
volumes state showing free-space trajectory, system_health (free_disk_space_pct_per_volume severity bands; disk_failure_event_count; OS-volume-specific severity), large-file helper output (when available), recent file-system snapshot deltas, scheduled tasks that may have left artifacts.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM5: mounted network shares, backup software shadow locations, sync clients (OneDrive/Dropbox/Google Drive).

### Call sequence (sketch)
1. Investigation session, scope, source health.
2. System health overview - likely the fastest path to the issue (system_health.os_volume_free_pct + worst_indicators surfaces disk-space severity prominently).
3. `query_logs` over 7d on `subsource in (volumes, scheduled_tasks, system_health)`.
4. `query_grouped_aggregation` group_field `source` for fleet pivot if applicable.
5. System condition summary output. Disk-space severity (especially OS-volume) gets prominent treatment in EXECUTIVE SUMMARY - disk-full causes are common, fast-cascading, and high-impact.

---

## HM6 - BitLocker recovery key prompt (sketch)

### Trigger
User boots and sees "enter recovery key" - either at boot or after a system change.

### Canonical evidence
TPM state changes, secure boot config changes, BIOS firmware updates, BCD changes, recent Windows Update or driver installs that touched boot components.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM6: BitLocker key escrow service (AD/MBAM/Intune), hardware vendor parallel firmware update, TPM-firmware security advisories.

### Call sequence (sketch)
1. Investigation session, scope, source health.
2. `query_period_diff` over 30d (BitLocker triggers can be older than 24h) for what changed.
3. `query_logs` Level-3 on `subsource in (bitlocker_status, tpm_status, drivers, windows_updates)`.
4. Correlate with installed_updates and drivers (driver `source` field helps distinguish WU-pushed vs OEM).
5. system condition summary output. Note BitLocker key escrow status (which is mostly off-endpoint).

---

## HM7 - RAID array degraded (sketch)

### Trigger
Storage layer reports degraded array; user sometimes notices through performance loss.

### Canonical evidence
Storage-controller helper output (vendor-specific: storcli/hpacucli/omreport/racadm), `storage_array` subsource state, SMART data per disk (smart_disk_health subsource), recent `Microsoft-Windows-StorageManagement/Operational` events, system_health.disk_failure_event_count.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM7: SAN/NAS health when storage networked, vendor RAID controller firmware advisories, disk vendor SMART thresholds.

### Call sequence (sketch)
1. Investigation session, scope, source health.
2. System health overview (system_health.disk_failure_event_count is the quick triage).
3. `query_logs` Level-3 on `subsource in (storage_array, smart_disk_health, raid_status, system_health)` over 7d.
4. `query_period_diff` for storage-related patterns.
5. Helper-result reads via subsource filtering.
6. system condition summary output.

---

## HM8 - AD replication failure (sketch)

### Trigger
Two domain controllers stop replicating; downstream symptoms (missing GPOs, stale group memberships, intermittent auth failures) appear hours later.

### Canonical evidence
`ad_replication` subsource state, `Directory Service` event log channel, network connectivity helpers between DCs, DNS health, time_sync state (now in system_health.time_sync_detail when drift is concerning).

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM8: WAN between DCs, DNS infrastructure not on a DC, Azure AD Connect, site link configuration.

### Call sequence (sketch)
1. Investigation session, scope (the affected DC + likely the partner DC).
2. Source health on both DCs.
3. System health on both - pay attention to `network_reachability_to_dc` and `time_sync_detail`.
4. `query_logs` Level-3 on `subsource in (ad_replication, system_health)` for both DCs.
5. `query_grouped_aggregation` group_field `source` filtered on `subsource = ad_replication AND severity in (error, warning)` across all DCs in the workspace.
6. `compare_populations` (failing DC vs working DCs) if appropriate.
7. system condition summary output.

---

## HM9 - Certificate expiry (sketch)

### Trigger
Internal cert expires; an LOB app stops working with TLS errors that don't say "expired."

### Canonical evidence
Certificate-store snapshot, system_health.certs_expiring_within_30_days_count and certs_expiring_within_7_days_count, scheduled-task state for any cert-renewal jobs, recent winlog entries from the affected app or Windows certificate services.

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM9: public CA cert lifecycle (DigiCert/Let's Encrypt/Sectigo), federation server certs (ADFS), internal CA infrastructure, third-party SaaS app certs.

### Call sequence (sketch)
1. Investigation session, scope, source health.
2. System health overview (system_health.certs_expiring_within_30_days_count is the quick triage).
3. `query_logs` Level-3 on `subsource = certificates` filtered to expiring/expired certs (`state.certificates.<thumbprint>.not_after` queries). Note: no wildcard JSON paths, but `event_summary` for certificates carries rolled-up expiry counts.
4. Cross-reference with `subsource = scheduled_tasks` for cert-renewal jobs.
5. system condition summary output. Visibility section flags federation/internal-CA if affected app uses cert chain that crosses those.

---

## HM10 - RMM connectivity (FULL PLAYBOOK)

### Trigger
"<workstation> has been offline in our RMM dashboard for <duration>."

### Canonical evidence
Managed Agent's own ingest_health and system_health (especially network_reachability_to_rmm), RMM service state in `state.services`, DNS resolution to RMM cloud endpoints, network adapter state, proxy configuration, system uptime.

**Field-availability warning:** `state.services`, `state.system_health`, and the DNS/network helper output (behind `event_kind = SLAHelper`) are deep fields pending Managed Agent emission - empty today regardless of true RMM connectivity. Step 7's winlog evidence (shallow-tier) is the reliable signal until emission lands; say so explicitly rather than treating empty `state.*` as "connectivity fine."

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM10: RMM cloud service health, EDR cloud quarantine of RMM agent, network path between endpoint and RMM cloud, corporate proxy / TLS inspection.

### Call sequence

**Step 0-1** - Investigation session, scope resolution.

**Step 2 - Critical source health discovery (THE DISCRIMINATOR).**
```
list_sources(
  org_ids=[<from step 1>],
  start="<6h before now>", end="<now>",
  include_sub_orgs=true,
  external_investigation_id="<id>"
)
```
Filtered for the source. **This is the discriminator for the entire investigation.**

**Branch A - Managed Agent silent.**
The endpoint may be powered off, network-isolated, or the Managed Agent itself has failed. system condition summary output:
- SCOPE CHECKED notes: "<source> has not emitted Managed Agent telemetry in the last 6 hours."
- OBSERVED CONDITIONS Finding 1: "Managed Agent telemetry absent from <source> in the past 6 hours; last observed telemetry at <timestamp> (from list_sources query)."
- WHAT WAS NOT CHECKED: full HM10 list, especially "without Managed Agent telemetry, both endpoint state and RMM connectivity from the endpoint are off-endpoint for this investigation."
- EXECUTIVE SUMMARY: "The endpoint may be powered off, network-isolated, or the Managed Agent itself has failed. Recommend out-of-band check (physical, IPMI, vendor-specific tools)."
- Investigation ends with a bounded conclusion after a single `list_sources` call - no backing query needed.

**Branch B - Managed Agent reporting. Continue.**

**Step 3 - Backing query: opening scan covering the relevant window.**
```
query_logs(
  org_ids=[...],
  start="<6h before now>", end="<now>",
  lql='source = "<X>"',
  return_field_list=['t', 'event_kind', 'app', 'subsource', 'severity', 'message', 'event_summary',
                     'anomaly_max_score', 'anomaly_max_score_confidence', 'anomaly_categories'],
  external_investigation_id="<id>"
)
-> qid_main, query_url
```
`event_kind` and `anomaly_max_score*` are deep fields pending Managed Agent emission - expect them empty today. `app`, `subsource`, `severity`, `message`, `event_summary` are shallow and populate normally.

**Step 4 - Refine to system_health (deep field - likely empty today).**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='subsource = system_health',
  select=['t', 'event_summary', 'state.system_health']
)
```
Quick triage, once emitted - `state.system_health.network_reachability_to_rmm`, `network_reachability_to_cloud`, `network_link_type`, `agent_ingest_health_status` all surface here. If `network_reachability_to_rmm = error`, the endpoint can't reach RMM cloud - strong signal. **`state.system_health` is not emitted today; this refine returns rows with that column empty. Fall back to `event_summary` and winlog/service evidence (Steps 5-7) and say so in the Finding.**

**Step 5 - Refine to RMM service state (deep field - likely empty today).**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='subsource = services',
  select=['t', 'event_summary', 'state.services', 'anomalies']
)
```
RMM-vendor service-name patterns to look for, once `state.services` is emitted (from `msp-tool-registry.md`):
- ConnectWise Automate: `LTService`, `LTSvcMon`
- ConnectWise RMM (newer): `Datto.RMM.Agent`
- NinjaOne: `NinjaRMMAgent`
- Datto RMM: `CagService`, `Datto.RMM.Agent`
- Kaseya VSA: `KaseyaAgentService`, `KaseyaTools`
- Atera: `AteraAgent`
- N-able N-central: `Windows Agent Maintenance`, `N-Central Agent`

If the relevant RMM service is STOPPED with start_type AUTOMATIC - clear local cause. **Today, fall back to Step 7's winlog evidence and the shallow `severity`/`message` fields from Step 3 while `state.services` is unavailable.**

**Step 6 - Refine to network helper output (deep field via `event_kind` - likely empty today).**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='event_kind = SLAHelper AND subsource in (dns_lookup, tcpconnect_probe, network_adapters, proxy_config)',
  select=['t', 'subsource', 'event_summary', 'message']
)
```
Helper output reveals, once `event_kind` is emitted: DNS resolves the RMM cloud endpoint? TCP connect succeeds? Network adapter has valid IP? System proxy configured? Today this filter returns empty because `event_kind` isn't emitted - don't read that as "no helper issues." If you need this evidence now, drop the `event_kind = SLAHelper` predicate and filter on `subsource` alone.

**Step 7 - Refine to RMM-related winlog.**
```
refine_query_result(
  query_id=<qid_main>,
  filter_lql='app: winlog/* AND (message: <rmm_vendor_name> OR app: winlog/Application)',
  select=['t', 'app', 'severity', 'message']
)
```
Vendor-specific channels and Application channel for RMM-vendor errors. This is shallow-tier (message/severity/app) and works today - the most reliable evidence source in this playbook until `state.*` emission lands.

**Step 8 - Investigation-mode amplification.** Live amplification of source collection is not currently available. Skip this step.

**Step 9 - Ingest-health check.** As HM1 (same deep-field caveat on the ingest-health check).

**Step 10 - system condition summary output.** Findings cite step 4-7 query_urls. EXECUTIVE SUMMARY synthesizes which layer (service, network adapter, DNS, TCP-to-cloud, proxy, RMM agent itself) shows the issue - today, primarily from Step 7's winlog evidence since Steps 4-6's `state.*` fields aren't emitted yet. WHAT WAS NOT CHECKED flags RMM cloud health and EDR quarantine if symptom is consistent, AND notes that `state.services` / `state.system_health` are not yet available from the Managed Agent (once emitted, "service is missing entirely from state.services" becomes a possible EDR-quarantine signal worth checking against the EDR admin console).

Branch A resolves from `list_sources` alone; Branch B runs one backing query plus several refinements against its cache.

---

## When the symptom doesn't fit a category

If the engineer's request doesn't map cleanly to HM1-HM10:
1. Run scope resolution + source health discovery (universally needed).
2. Run system health overview (universally informative - the system_health subsource is designed for exactly this case).
3. Run `query_period_diff` over 24h (or vs 7d prior) to spot what changed.
4. Use the Findings to guide whether you need deeper investigation in any specific subsource.
5. system condition summary output with appropriate WHAT WAS NOT CHECKED enumeration based on what the symptom turned out to involve.

---

## Maintenance

This file updates when:
- A new symptom category warrants its own playbook.
- A sketch graduates to a full playbook (after enough investigations of that type demonstrate the canonical call sequence).
- A full playbook needs revision based on real investigation outcomes.
- Quarterly review.
