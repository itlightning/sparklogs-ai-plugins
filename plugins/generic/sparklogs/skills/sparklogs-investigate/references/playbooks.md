# Investigation Playbooks

Per-category playbook outlines for common hard-mode investigation symptoms. Three categories (VSS backup failure, memory/handle leak, RMM connectivity) have full call-sequence walks; the other seven have lightweight sketches that expand to full walks as more investigations are observed.

**How to use this file:**
1. Identify which symptom category the engineer's request falls under.
2. Read the relevant section. The playbook is a *suggested* call sequence, not a script - adapt to the specific investigation.
3. Always produce a system condition summary per `output-template.md`.
4. Always populate OUTSIDE AGENT VISIBILITY per `off-endpoint-causes.md`.

---

## HM1 - VSS backup failure (FULL PLAYBOOK)

### Trigger
"Veeam or Datto, Axcient, Acronis, MSP360, Cove, or Slide reports backup failed on <source>."

### Canonical evidence
vss_writers state, recent volume snapshots, recent `Microsoft-Windows-Backup` and `VSS` event-log channels, disk free-space (system_health), scheduled-task state for the backup job, installed_products (to detect cross-product backup conflicts), system_health for ingest health and overall picture.

### Off-endpoint causes to flag in OUTSIDE AGENT VISIBILITY
Per `off-endpoint-causes.md` HM1: backup target NAS/cloud, EDR cloud blocking VSS, bespoke vendor without autodetect, Veeam credential vault, Hyper-V/VMware guest writers, backup-job server-side state.

### Call sequence

**Step 0 - Investigation session.** Generate `investigation_request_id`. Write local investigation-state document at `./investigations/<id>.md`.

**Step 1 - Scope resolution.**
```
resolve_scope("<source name from ticket>")
-> org_ids, sources_hint
```

**Step 2 - Source health discovery.**
```
list_sources(
  org_ids=[<from step 1>],
  time_range={start: "<investigation start>", end: "<investigation end>"},
  include_sub_orgs=true,
  app_filter='app: agent_op/*'
)
```
If the source has no data in the investigation's time window -> halt and ask the engineer (per `scope-resolution.md`): "I don't see Managed Agent telemetry from `<source>` during `<window>`. Did you mean a different source name, or is the source perhaps offline / not deployed during that window?"

**Step 3 - System health overview.**
```
query_logs(
  org_ids=[...],
  filter_lql='source = "<X>" AND subsource = system_health',
  time_range={relative: "last_24h"},
  return_field_list=['t', 'event_summary', 'state.system_health'],
  max_field_chars_override={'event_summary': 0, 'state.system_health': 4096},
  investigation_request_id="<id>",
  purpose="HM1: system_health overview for <X>"
)
```
Establishes overall_severity, disk space, network reachability, etc. - context for the rest of the investigation.

**Step 4 - Backing query: what changed.**
```
query_period_diff(
  org_ids=[...],
  period_a={start: "<24h before failure window>", end: "<failure window start>"},
  period_b={start: "<failure window start>", end: "now"},
  group_by='pattern_hash',
  filter_lql='source = "<X>"',
  investigation_request_id="<id>",
  purpose="HM1: what changed pre-failure vs failure window"
)
-> qid_diff, query_url
```
Identifies new VSS-related patterns, disappeared patterns (e.g., successful-backup pattern that stopped), accelerated patterns.

**Step 5 - Describe the new patterns.**
```
describe_pattern(
  org_ids=[...],
  pattern_hashes=[<top 3-5 new VSS-related hashes from step 4>],
  samples_per_pattern=5,
  investigation_request_id="<id>"
)
```
Returns pattern text + sample messages. Now you have the actual error wording (e.g., "Veeam VSS error 0x80042308").

**Step 6 - Backing query: surrounding context for primary error.**
```
cluster_event_contexts(
  org_ids=[...],
  filter_lql='pattern_hash = "<primary new error hash>"',
  time_range={relative: "last_24h"},
  sample_n_matches=100,
  window_pre_s=300,
  window_post_s=60,
  investigation_request_id="<id>",
  purpose="HM1: surround context for primary error"
)
-> qid_clusters, query_url
```
Returns distinct contextual situations. Often surfaces "SCM service activity precedes most occurrences" or "disk-pressure precedes a subset" or "isolated occurrences with no precursor."

**Step 7 - Backing query: vss_writers state at failure window (Level 3 ground truth).**
```
query_logs(
  org_ids=[...],
  filter_lql='source = "<X>" AND subsource in (vss_writers, volumes, scheduled_tasks, installed_products) AND t between <failure_window_start> and <failure_window_end>',
  return_field_list=['t', 'event_kind', 'snapshot_id', 'prev_delta_id', 'event_summary',
                     'state.vss_writers', 'state.volumes', 'state.scheduled_tasks', 'anomalies'],
  max_field_chars_override={'event_summary': 0, 'state.vss_writers': 4096, 'state.volumes': 2048,
                            'state.scheduled_tasks': 4096, 'anomalies': 0},
  investigation_request_id="<id>",
  purpose="HM1: vss_writers + volumes + scheduled_tasks + installed_products at failure window"
)
-> qid_state, query_url
```
Note: broadened to multiple subsources so the same cache feeds Steps 7-9 without additional backing queries.

**Step 8 - Refinements within Step 7's cache.**
```
refine_query_result(query_id=<qid_state>, cache_filter_lql='subsource = vss_writers',
                   return_field_list=['t', 'state.vss_writers', 'anomalies'])
refine_query_result(query_id=<qid_state>, cache_filter_lql='subsource = volumes',
                   return_field_list=['t', 'state.volumes'])
refine_query_result(query_id=<qid_state>, cache_filter_lql='subsource = scheduled_tasks',
                   return_field_list=['t', 'state.scheduled_tasks'])
refine_query_result(query_id=<qid_state>, cache_filter_lql='subsource = installed_products',
                   return_field_list=['t', 'event_summary'])
```
Per-subsource Level-3 reads. Cheap; cached.

**Step 9 - Cross-product check.**
From Step 8's installed_products refinement, check `event_summary.by_category` and `event_summary.multiple_in_category`. If multiple backup products detected (e.g., `multiple_in_category: ["backup"]`), note in summary as a likely cross-product conflict - two backup products competing for VSS snapshots is a recurring cause.

**Step 10 - Cross-source pivot if cause looks environmental.**
If Step 4's `query_period_diff` showed the new pattern across multiple sources (suggesting environment-wide), or if you want to confirm scope:
```
query_grouped_aggregation(
  org_ids=[<broader scope, e.g., all msp orgs>],
  filter_lql='subsource in (vss_writers, backup_jobs) AND (severity in (error, warning) OR anomaly_max_score >= 60)',
  time_range={relative: "last_24h"},
  group_by=['source'],
  aggregations=[{op:'count'}, {op:'min', field:'t'}, {op:'max', field:'t'}],
  investigation_request_id="<id>",
  purpose="HM1: fleet pivot for VSS-related anomalies"
)
```
1 source = isolated; few sources = local cluster; many sources = environment-wide.

**Step 11 - Ingest-health check.**
```
query_logs(
  org_ids=[...],
  filter_lql='source = "<X>" AND event_kind = SLAAgentOp AND subsource in (ingest_drop, spool_full, backpressure)',
  time_range={relative: "last_24h"},
  return_field_list=['t', 'subsource', 'event_summary', 'message'],
  investigation_request_id="<id>"
)
```
Confirms data completeness for the relevant window.

**Step 12 - Cost rollup.**
```
get_query_metadata(investigation_request_id="<id>")
-> investigation_summary
```

**Step 13 - System condition summary output per `output-template.md`.** Findings derive from Steps 3-11. OUTSIDE AGENT VISIBILITY enumerates per `off-endpoint-causes.md`. POSSIBLE NEXT DIRECTIONS section at the end with the explore-or-analyze invitation.

### Cost summary
- Backing queries: 4-5 (period_diff, cluster_contexts, query_logs Level-3, optional fleet pivot, ingest-health)
- Refinements: ~4-6 (subsource splits within Step 7's cache)
- Metadata: ~3 (resolve_scope, list_sources, get_query_metadata)
- Typically $0.50-2.00 per investigation.

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

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM3: vendor app internals, container/VM nested processes, GPU memory, vendor app server-side state.

### Call sequence

**Step 0-2** - Investigation session, scope resolution, source health discovery (per HM1 steps 0-2).

**Step 3 - System health overview.**
```
query_logs(
  org_ids=[...],
  filter_lql='source = "<X>" AND subsource = system_health',
  time_range={relative: "last_7d"},
  return_field_list=['t', 'event_summary', 'state.system_health'],
  ...
)
```
Note: HM3 needs a 7-day window to see leak trajectory (broader than HM1's 24h).

**Step 4 - Backing query: 7d trajectory for processes / memory / services.**
```
query_logs(
  org_ids=[...],
  time_range={relative: "last_7d"},
  filter_lql='source = "<X>" AND subsource in (processes, memory, services, system_health, installed_software, windows_updates)',
  return_field_list=['t', 'event_kind', 'subsource', 'event_summary',
                     'anomaly_max_score', 'anomaly_max_score_confidence', 'anomaly_categories',
                     'snapshot_id', 'prev_delta_id'],
  investigation_request_id="<id>",
  purpose="HM3: 7d trajectory for <X> across leak-relevant subsources"
)
-> qid_main, query_url
```
This 7-day cache is the primary working set for the rest of the investigation.

**Step 5 - Refine for the suspect process at Level 3.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='subsource = processes AND (event_kind = SLASnapshot OR event_kind = SLADelta)',
  return_field_list=['t', 'event_kind', 'snapshot_id', 'prev_delta_id', 'event_summary',
                     'state.processes', 'anomalies'],
  max_field_chars_override={'event_summary': 0, 'state.processes': 8192, 'anomalies': 0}
)
```
Returns time-series of processes state. Extract MyApp.exe trajectory locally:
- Working set (RSS) over time, across multiple PID lifetimes (process restarts may reset).
- Handle count over time.
- top_n_by_total_cpu_time - cumulative CPU time since process start.
- top_n_by_cpu (instantaneous %).

A monotonically-increasing working_set or handle_count across PID lifetimes is the leak signature.

**Step 6 - Refine for memory pressure cross-validation.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='subsource = memory AND event_kind = SLASnapshot',
  return_field_list=['t', 'event_summary', 'state.memory', 'anomalies'],
  max_field_chars_override={'state.memory': 4096}
)
```
Confirms whether system-level memory pressure trajectory matches the process-level trajectory.

**Step 7 - Refine for system_health context.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='subsource = system_health',
  return_field_list=['t', 'event_summary']
)
```
Surfaces overall_severity trajectory. If overall_severity escalated to error/fatal at the time the user noticed slowness, that's a corroborating signal.

**Step 8 - Backing query: comparison source if available.**
If the user has a sister server (e.g., srv-app04) running the same app, compare:
```
compare_populations(
  org_ids=[...],
  population_a={label: "<X>_processes_busy",
               filter_lql: 'source = "<X>" AND subsource = processes AND event_kind = SLASnapshot AND state.processes."<MyApp.exe key>".working_set_bytes >= 1000000000'},
  population_b={label: "<sister>_processes_normal",
               filter_lql: 'source = "<sister>" AND subsource = processes AND event_kind = SLASnapshot AND state.processes."<MyApp.exe key>".working_set_bytes >= 1000000000'},
  time_range={relative: "last_7d"},
  investigation_request_id="<id>",
  purpose="HM3: compare leak source vs sister"
)
```
Identifies whether leak is on both servers (suggests app-version issue or workload pattern) or just one (suggests box-specific config or workload).

**Step 9 - Recent change correlation.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='subsource in (windows_updates, installed_software, services, drivers)',
  return_field_list=['t', 'subsource', 'event_summary']
)
```
Identifies recent changes that might correlate with leak onset.

**Step 10 - Investigation-mode amplification.** Not currently available. Skip this step.

**Step 11 - Ingest-health check.**
```
query_logs(
  org_ids=[...],
  filter_lql='source = "<X>" AND event_kind = SLAAgentOp AND subsource in (ingest_drop, spool_full, backpressure)',
  time_range={relative: "last_7d"},
  ...
)
```

**Step 12 - Cost rollup and system condition summary output.**
HM3 is one of the more expensive investigations (7-day window). Typically $1.50-4.00.

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
7. Ingest-health check, cost rollup, system condition summary output.

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
4. `query_grouped_aggregation` group_by source for fleet pivot if applicable.
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
5. `query_grouped_aggregation` group_by source filtered on `subsource = ad_replication AND severity in (error, warning)` across all DCs in the workspace.
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

### Off-endpoint causes to flag
Per `off-endpoint-causes.md` HM10: RMM cloud service health, EDR cloud quarantine of RMM agent, network path between endpoint and RMM cloud, corporate proxy / TLS inspection.

### Call sequence

**Step 0-1** - Investigation session, scope resolution.

**Step 2 - Critical source health discovery (THE DISCRIMINATOR).**
```
list_sources(
  org_ids=[<from step 1>],
  time_range={relative: "last_6h"},
  include_sub_orgs=true,
  app_filter='app: agent_op/*'
)
```
Filtered for the source. **This is the discriminator for the entire investigation.**

**Branch A - Managed Agent silent.**
The endpoint may be powered off, network-isolated, or the Managed Agent itself has failed. system condition summary output:
- SCOPE CHECKED notes: "<source> has not emitted Managed Agent telemetry in the last 6 hours."
- OBSERVED CONDITIONS Finding 1: "Managed Agent telemetry absent from <source> in the past 6 hours; last observed telemetry at <timestamp> (from list_sources query)."
- OUTSIDE AGENT VISIBILITY: full HM10 list, especially "without Managed Agent telemetry, both endpoint state and RMM connectivity from the endpoint are off-endpoint for this investigation."
- EXECUTIVE SUMMARY: "The endpoint may be powered off, network-isolated, or the Managed Agent itself has failed. Recommend out-of-band check (physical, IPMI, vendor-specific tools)."
- Investigation ends with bounded conclusion. Cost: ~$0.05.

**Branch B - Managed Agent reporting. Continue.**

**Step 3 - Backing query: opening scan covering the relevant window.**
```
query_logs(
  org_ids=[...],
  time_range={relative: "last_6h"},
  filter_lql='source = "<X>"',
  return_field_list=['t', 'event_kind', 'app', 'subsource', 'severity', 'message', 'event_summary',
                     'anomaly_max_score', 'anomaly_max_score_confidence', 'anomaly_categories'],
  investigation_request_id="<id>",
  purpose="HM10: <X> RMM connectivity opening scan"
)
-> qid_main, query_url
```

**Step 4 - Refine to system_health.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='subsource = system_health',
  return_field_list=['t', 'event_summary', 'state.system_health'],
  max_field_chars_override={'state.system_health': 4096}
)
```
Quick triage - `state.system_health.network_reachability_to_rmm`, `network_reachability_to_cloud`, `network_link_type`, `agent_ingest_health_status` all surface here. If `network_reachability_to_rmm = error`, the endpoint can't reach RMM cloud - strong signal.

**Step 5 - Refine to RMM service state.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='subsource = services',
  return_field_list=['t', 'event_summary', 'state.services', 'anomalies'],
  max_field_chars_override={'state.services': 8192}
)
```
RMM-vendor service-name patterns to look for (from `msp-tool-registry.md`):
- ConnectWise Automate: `LTService`, `LTSvcMon`
- ConnectWise RMM (newer): `Datto.RMM.Agent`
- NinjaOne: `NinjaRMMAgent`
- Datto RMM: `CagService`, `Datto.RMM.Agent`
- Kaseya VSA: `KaseyaAgentService`, `KaseyaTools`
- Atera: `AteraAgent`
- N-able N-central: `Windows Agent Maintenance`, `N-Central Agent`

If the relevant RMM service is STOPPED with start_type AUTOMATIC - clear local cause.

**Step 6 - Refine to network helper output.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='event_kind = SLAHelper AND subsource in (dns_lookup, tcpconnect_probe, network_adapters, proxy_config)',
  return_field_list=['t', 'subsource', 'event_summary', 'message']
)
```
Helper output reveals: DNS resolves the RMM cloud endpoint? TCP connect succeeds? Network adapter has valid IP? System proxy configured?

**Step 7 - Refine to RMM-related winlog.**
```
refine_query_result(
  query_id=<qid_main>,
  cache_filter_lql='app: winlog/* AND (message: <rmm_vendor_name> OR app: winlog/Application)',
  return_field_list=['t', 'app', 'severity', 'message']
)
```
Vendor-specific channels and Application channel for RMM-vendor errors.

**Step 8 - Investigation-mode amplification.** Live amplification of source collection is not currently available. Skip this step.

**Step 9 - Ingest-health and cost rollup.** As HM1.

**Step 10 - system condition summary output.** Findings cite step 4-7 query_urls. EXECUTIVE SUMMARY synthesizes which layer (service, network adapter, DNS, TCP-to-cloud, proxy, RMM agent itself) shows the issue. OUTSIDE AGENT VISIBILITY flags RMM cloud health and EDR quarantine if symptom is consistent (e.g., "service is missing entirely from state.services - possible EDR quarantine; recommend checking SentinelOne admin console for quarantine events on this source").

### Cost summary
- Branch A: ~$0.05 (just list_sources).
- Branch B: 1 backing query + 4-5 refinements + 1-2 metadata calls. Typical $0.30-1.50.

---

## When the symptom doesn't fit a category

If the engineer's request doesn't map cleanly to HM1-HM10:
1. Run scope resolution + source health discovery (universally needed).
2. Run system health overview (universally informative - the system_health subsource is designed for exactly this case).
3. Run `query_period_diff` over 24h (or vs 7d prior) to spot what changed.
4. Use the Findings to guide whether you need deeper investigation in any specific subsource.
5. system condition summary output with appropriate OUTSIDE AGENT VISIBILITY enumeration based on what the symptom turned out to involve.

---

## Maintenance

This file updates when:
- A new symptom category warrants its own playbook.
- A sketch graduates to a full playbook (after enough investigations of that type demonstrate the canonical call sequence).
- A full playbook needs revision based on real investigation outcomes.
- Quarterly review.
