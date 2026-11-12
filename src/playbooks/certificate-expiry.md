---
index: Certificate expiry
---

# Certificate expiry

**Trigger.** "Service X broke and the certificate looks expired", or a renewal did not happen.

**Accuracy.** Certificate services activity is curated on System, Application, Security and `win.eventlog.identity_security` (value) (`service = certificates` (LQL), plus AD CS reasons).
The failure a client notices is usually the dependent service, not the certificate event.
Window must include the renewal attempt.

**Queries.**

```lql
source = "<host>" AND service = certificates
```

Group by `sparklogs.reason` (LQL).

Dependent service symptom: group by `sparklogs.reason` (LQL) over `service = <affected service>` (LQL).
Renewal automation is often a scheduled task: task changes on Security (`scheduled_task_created` (value), `scheduled_task_updated` (value), `scheduled_task_disabled` (value), `scheduled_task_deleted` (value)) and task failures on `win.eventlog.management` (value) (`scheduled_task_start_failed` (value)) in the same window.

**Off-endpoint** (HM9): public CA, ACME client elsewhere, load balancer or reverse proxy holding its own copy, federation metadata.
