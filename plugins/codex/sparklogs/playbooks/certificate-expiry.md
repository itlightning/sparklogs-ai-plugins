# Certificate expiry

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
