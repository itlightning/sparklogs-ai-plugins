---
index: Backup job failed
---

# Backup failure

**Trigger.** "Veeam, Datto, Axcient, Acronis, MSP360, Cove or Slide reports backup failed on
<source>."
Writers, snapshots, or shadow-copy rotation with a job that looks fine: `playbooks/windows-vss.md`.

**Evidence today.** Strong.
Vendor backup channels carry their own errors, and the System channel carries the VSS and storage side.
Cross-product conflicts show up in what is installed on the box.
VSS plumbing errors are not a job verdict; take outcome from the vendor events.

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
