# Investigation Playbooks

Ten symptom categories with worked call sequences. Each one is a suggested shape, not a script:
adapt it to what the engineer actually asked.

**How to use this file:**
1. Match the engineer's request to a category.
2. Read that section only.
3. Produce a system condition summary per `output-template.md`, with WHAT WAS NOT CHECKED populated
   from `off-endpoint-causes.md`.

**Two evidence surfaces, and picking the wrong one wastes the window.**

- **`query_device_health`** answers "what is the state of this box": open conditions, what is
  installed and mounted, and which devices reported nothing. It returns the LATEST row per
  condition, not a timeline.
- **`query_logs` / `query_event_counts_by_severity`** answer "what happened, and when": the event stream,
  including everything the curated packs shaped out of the Windows channels.

State gives you the standing condition; the log stream gives you the sequence. Most playbooks below
need both, in that order, because the state read tells you where to point the log query.

**Evidence depth varies by category, and saying so is part of the job.** Some categories run on
curated reasons with promoted fields; others still come down to reading a vendor channel's message
text. Each section says which, under Evidence today. Where it says the evidence is thin, that
belongs in WHAT WAS NOT CHECKED, not in a confident Finding.

**Three tools do not exist**, and reaching for them wastes a turn. For a period diff, run
`query_event_counts_by_severity` twice over adjacent windows and compare. For a population compare, run
it once per population with a different `lql`. For clustering, narrow `query_logs` to the pattern
then `refine_query_result` with `group_by` over the surrounding fields.

---

## HM1 - Backup failure

**Trigger.** "Veeam, Datto, Axcient, Acronis, MSP360, Cove or Slide reports backup failed on
<source>."

**Evidence today.** Strong. Vendor backup channels carry their own errors, and the System channel
carries the VSS and storage side. Cross-product conflicts show up in what is installed on the box.

**Off-endpoint** (per `off-endpoint-causes.md` HM1): backup target NAS or cloud, EDR cloud blocking
VSS, bespoke vendor with no autodetect, credential vault, Hyper-V or VMware guest writers,
server-side job state.

**Call sequence.**

1. Scope, then confirm the source has data in the window.

   ```
   resolve_scope(query="<host or client>", external_investigation_id="<id>")
   list_sources(org_ids=[...], start=..., end=..., external_investigation_id="<id>")
   ```

2. Standing conditions on the box, including what is installed.

   ```
   query_device_health(org_ids=[...], start=..., end=..., fieldset="rca",
                      external_investigation_id="<id>")
   ```

   `kinds` defaults to inventory plus monitor, which is what you want here: the monitor rows carry
   open storage and service conditions, the inventory rows are the ground truth for which backup
   products are on the machine. Two backup products competing for VSS snapshots is a recurring
   cause, and it is visible nowhere else.

3. What the log stream says in the failure window.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND severity >= 17',
     group_by=["pattern"], external_investigation_id="<id>")
   ```

4. Read the dominant patterns before citing any of them.

   ```
   describe_pattern(org_ids=[...], start=..., end=..., pattern_hashes=["<h>", ...],
                    external_investigation_id="<id>")
   ```

5. Pull the narrow slice and refine it rather than re-scanning.

   ```
   query_logs(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND (app: winlog/* OR subsource: *)  AND severity >= 17',
     external_investigation_id="<id>")
   refine_query_result(query_id="<qid>", filter_lql='app: winlog/Microsoft-Windows-Backup/*',
                       order_by=[{"col": "t", "dir": "asc"}], external_investigation_id="<id>")
   ```

6. If the failure repeats across the client, group by host to size it.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='pattern_hash = "<h>"', group_by=["source"], external_investigation_id="<id>")
   ```

---

## HM2 - Slow logon

**Trigger.** "User reports logon takes <duration> since <when>."

**Evidence today.** Mixed, and better than it was. The Security channel is curated: sign-in events
carry `win.eventlog.security.logon_type_name`, the authenticating package, and the portable
`sparklogs.actor.*` families, so you can separate a cached interactive logon from a network one and
see which account and which origin. Group Policy processing time and DNS latency are NOT curated
sources; if the answer turns out to live there, say so.

**Off-endpoint** (HM2): conditional-access policy, MFA cloud, federation certificates, time drift on
the PDC, directory sync, the network path between user and domain controller.

**Call sequence.**

1. Scope both the workstation and, if the client has one, the domain controller.
2. Confirm both are reporting: `list_sources`.
3. Sign-in shape for the affected account.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND sparklogs.actor.name = "<account>"',
     group_by=["reason", "win.eventlog.security.logon_type_name"],
     external_investigation_id="<id>")
   ```

   The cross-tab is the point: a slow logon that is really a failing-then-retrying logon looks
   completely different from one that is slow on a single successful `logon_cached_interactive`.

4. Authentication failures in the window, with the decoded cause.

   ```
   query_logs(org_ids=[...], start=..., end=...,
     lql='sparklogs.reason in (logon_failed, kerberos_preauth_failed, kerberos_ticket_failed, ntlm_validation_failed)
          AND sparklogs.actor.name = "<account>"',
     external_investigation_id="<id>")
   ```

   `win.eventlog.security.status_meaning` carries the cause without opening a body.

5. Standing conditions on the workstation, as the honesty check: `query_device_health`. A device that
   went silent during the complaint window changes what you can conclude.
6. If several users on one site are slow and others are not, group by `source` over the same filter
   to establish whether it is site-wide.

---

## HM3 - Memory or handle leak

**Trigger.** "Machine slows over days, recovers on reboot", or an app repeatedly exhausts memory.

**Evidence today.** Thin, and this is the category to be most careful about. There is no per-process
working-set trajectory to query. What you can establish is the CONSEQUENCE trail: application
crashes and hangs, resource-exhaustion errors, and whether the box is carrying an open
resource-pressure condition right now. A leak trajectory is an inference from that, not a
measurement, and the summary must say so.

**Off-endpoint** (HM3): the application vendor's own telemetry, anything running off-endpoint that
the process talks to.

**Call sequence.**

1. Scope, then `list_sources` over a 7-day window; leaks need a longer window than a discrete fault.
2. Current resource conditions.

   ```
   query_device_health(org_ids=[...], start=..., end=..., fieldset="rca",
                      external_investigation_id="<id>")
   ```

   Read `reason` and `episode_age_basis` together. An `observed` basis means the condition was
   already true when the agent first looked, so "for at least N days" is the strongest claim
   available, and `unknown_ongoing` means you may not render a duration at all.

3. Crash and hang trail over the long window.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND app: winlog/Application AND severity >= 17',
     group_by=["pattern"], external_investigation_id="<id>")
   ```

4. If one application dominates, get its shape over time.

   ```
   query_logs(org_ids=[...], start=..., end=..., lql='pattern_hash = "<h>"',
              external_investigation_id="<id>")
   refine_query_result(query_id="<qid>",
                       group_by=[{"time_bucket": {"col": "t", "bucket_usec": 3600000000}, "as": "hour"}],
                       aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
                       order_by=[{"col": "hour", "dir": "asc"}],
                       external_investigation_id="<id>")
   ```

   A rising hourly count across days is the closest thing to a trajectory this surface gives you.
   Call it a rising crash rate, which is what it is, not a leak.

5. Compare against a healthy baseline window with a second grouped run, and say which windows you
   compared. Do not straddle a source-pack release: pattern identity is recomputed at that boundary,
   so every hash reads as new.

**Findings shape.** Lead with the observed consequence ("Application X crashed N times in 7 days,
rising"), give the open condition as supporting context, and put "no per-process memory trajectory
is available from this surface" in WHAT WAS NOT CHECKED. Do not produce a confident leak-trajectory
Finding from crash counts.

---

## HM4 - Windows Update failure

**Trigger.** "Patching reports <KB> failed", or a machine is behind on updates.

**Evidence today.** Strong. Servicing is curated across the CBS and DISM logs plus the Setup and
System channels, with reasons for the common failure shapes.

**Off-endpoint** (HM4): WSUS or update-service reachability, the RMM patch policy, vendor-side KB
withdrawal.

**Call sequence.**

1. Scope, `list_sources`.
2. Servicing reasons in the window, worst first.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND service = patching',
     group_by=["reason"], external_investigation_id="<id>")
   ```

3. The failing install itself, in sequence.

   ```
   query_logs(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND service = patching AND severity >= 17',
     external_investigation_id="<id>")
   ```

4. Fleet shape. "Is it just us" is one noun and takes `group_by=["source"]` over a pinned reason.
   "Which patching failures, on which machines" is two nouns and takes the cross-tab, which is the
   more useful read when a patch window went badly across a client.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='service = patching AND severity >= 17',
     group_by=["reason", "source"], external_investigation_id="<id>")
   ```

   One reason across every host is a bad KB; many reasons on one host is a broken machine. A pair of
   single-field runs shows you the busiest reason and the busiest host and cannot tell you which of
   those two stories you are in.

5. Whether a reboot is pending, and whether the component store is healthy, come from the same
   servicing reasons; read them off step 2 rather than issuing another scan.

---

## HM5 - Disk full or filling fast

**Trigger.** A volume crosses 90% or fills; users hit "no space" errors.

**Evidence today.** Strong on the state side. Volume conditions are monitor rows with reasons that
encode the CLAIM: `os_volume_space_exhausting` is a projection to empty and carries projection
fields, while a `near_cap` reason is a level claim only. Read the adjective.

**Off-endpoint** (HM5): mounted network shares, backup shadow locations, sync clients.

**Call sequence.**

1. Scope, then go straight to state; this is the category where state answers the question.

   ```
   query_device_health(org_ids=[...], start=..., end=..., fieldset="rca",
                      external_investigation_id="<id>")
   ```

   The `instance` column is load-bearing here: two volumes on one host share a reason and are told
   apart only by `instance`. Display with `coalesce(display_name, instance)`.

2. Fleet shape, if more than one machine is affected.

   ```
   query_device_health(org_ids=[...], start=..., end=..., group_by_reason=true,
                      external_investigation_id="<id>")
   ```

   Grouped mode takes no `fieldset` and no `add_fields`: it returns fixed per-reason columns over the
   whole matched set, which is also the only way to get an exact fleet-wide condition total.

3. Storage errors in the log stream, when the volume is filling because something is failing.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND service = storage', group_by=["reason"],
     external_investigation_id="<id>")
   ```

---

## HM6 - BitLocker recovery prompt

**Trigger.** "Machine booted to a BitLocker recovery key prompt."

**Evidence today.** Moderate. The System and Setup channels carry the boot-configuration and
firmware-change events that trigger a recovery prompt; the prompt itself happens before anything is
shipping, so you are always reconstructing from what came before and after.

**Off-endpoint** (HM6): key escrow in the directory or the RMM, firmware update pushed by the
vendor, hardware change by hand.

**Call sequence.**

1. Scope, `list_sources` across a window that includes the last successful boot.
2. What changed before the reboot.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND sparklogs.kind = config_change',
     group_by=["config_change_type", "config_change_target"],
     external_investigation_id="<id>")
   ```

3. Patching and firmware activity in the same window: as HM4 step 2.
4. Boot-integrity events, which are curated on the Security channel
   (`sparklogs.reason = insecure_boot_config` carries the specific weakness in
   `win.eventlog.security.insecure_boot_flags`).

---

## HM7 - RAID or storage array degraded

**Trigger.** "Array reports degraded", or a controller alert reached the RMM.

**Evidence today.** Moderate. Controller and disk-subsystem events are curated on the System
channel under `service = storage`. Vendor array management tools that never write to a Windows
channel are invisible here.

**Off-endpoint** (HM7): the array's own management plane, out-of-band controller firmware, SAN
fabric.

**Call sequence.**

1. Scope, `list_sources`.
2. Storage reasons and their severity, worst first.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND service = storage', group_by=["reason"],
     external_investigation_id="<id>")
   ```

3. Any critical+ row in scope is fetch-first, whatever the ticket said. Pull those events before
   continuing.
4. Standing storage conditions from `query_device_health`, and whether the device kept reporting
   through the degradation window.

---

## HM8 - Directory replication failure

**Trigger.** "Domain controllers are out of sync", or authentication behaves differently per site.

**Evidence today.** Thin on the replication mechanism itself, and this needs saying plainly: there
is no curated replication-health source. What is curated is the CONSEQUENCE on the authentication
path, which is often what the engineer actually cares about.

**Off-endpoint** (HM8): the directory service itself, site links and network paths between domain
controllers, anything running on a DC without the agent.

**Call sequence.**

1. Scope every domain controller the client has, not just the one named.
2. Confirm which are reporting at all: `list_sources`, then `query_device_health` for silence. A DC
   that reported nothing is the finding, and it is not a claim that the DC is down.
3. Authentication failures by cause and by DC.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='sparklogs.reason in (kerberos_ticket_failed, kerberos_preauth_failed, ntlm_validation_failed)',
     group_by=["source", "win.eventlog.security.status_meaning"],
     external_investigation_id="<id>")
   ```

   `clock_skew` concentrated on one DC is a different story from `client_unknown` spread evenly, and
   the cross-tab is what separates them.
4. Directory object changes, where the question is "what changed":
   `sparklogs.reason = directory_object_changed`.
5. State plainly in WHAT WAS NOT CHECKED that replication topology and latency were not examined,
   because no source carries them.

---

## HM9 - Certificate expiry

**Trigger.** "Service X broke and the certificate looks expired", or a renewal did not happen.

**Evidence today.** Moderate. Certificate services activity is curated on the Application and
Security channels (`service = certificates`, plus the AD CS reasons), and the failure a client
notices is usually the dependent service failing rather than the certificate itself.

**Off-endpoint** (HM9): public CA, ACME client running elsewhere, load balancer or reverse proxy
holding its own copy of the certificate, federation metadata.

**Call sequence.**

1. Scope, `list_sources`.
2. Certificate-related reasons in a window wide enough to include the renewal attempt.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND service = certificates', group_by=["reason"],
     external_investigation_id="<id>")
   ```

3. The dependent service's own failures, which is where the symptom lives: group by `reason` over
   `service = <the affected service>`.
4. Renewal automation usually runs as a scheduled task; `sparklogs.reason = scheduled_task_changed`
   and task-related failures in the same window are worth a look.

---

## HM10 - RMM connectivity

**Trigger.** "Endpoint shows offline in the RMM but the user says it is working."

**Evidence today.** Moderate, and the honesty framing matters more here than the evidence does. The
question is whether the endpoint is reporting to US, which is a different question from whether it
is reporting to the RMM.

**Off-endpoint** (HM10): the RMM cloud itself, the RMM agent's own health, EDR quarantine of the RMM
agent, the network path.

**Call sequence.**

1. Scope. Read `online_status` and `agent_status` on the agent row from `resolve_scope`, and treat
   them as two separate inputs, not the answer. `offline` means no signal reached SparkLogs, never
   that the machine is down; the customer's RMM is the authority on that.
2. Is the endpoint reporting to SparkLogs in the window?

   ```
   list_sources(org_ids=[...], start=..., end=..., external_investigation_id="<id>")
   ```

   Data flowing to us while the RMM shows offline localizes the problem to the RMM path. No data to
   us either means you cannot distinguish an agent problem from a machine problem from a network
   problem, and you say so.

3. Device-health silence, as the second half of that read.

   ```
   query_device_health(org_ids=[...], start=..., end=..., external_investigation_id="<id>")
   ```

   A device in the `row_kind=silent_device` list reported no state rows. That is an exact counted
   fact and you may report it. It is not "the device is healthy" and not "the agent is down".

4. Agent self-observability rows, which are stamped when an investigator must distrust other data on
   that host.

   ```
   query_logs(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND sparklogs.kind = agent_op', external_investigation_id="<id>")
   ```

   Empty here is inconclusive rather than reassuring.

5. The RMM vendor's own service and network events on the box: group by `reason` over
   `service = rmm`, and read the Application channel for the vendor's errors.

---

## When the symptom does not fit a category

1. Scope and confirm the source has data in the window.
2. `query_device_health` for standing conditions and silence: it is the cheapest read of "what is
   wrong with this box right now".
3. `query_event_counts_by_severity` on `reason`, then on `pattern`, over a light severity filter. Two
   groupings tell you what the box is complaining about before you read a single raw event.
4. Compare against a quiet baseline window with a second grouped run to find what is NEW.
5. Only then `query_logs`, narrowed to what the groupings pointed at.
6. Summary per `output-template.md`, with WHAT WAS NOT CHECKED built from what the symptom turned
   out to involve.
