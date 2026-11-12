---
index: Certificate expiry
---

# Certificate expiry

**Trigger.** "Service X broke and the certificate looks expired", or a renewal did not happen.

**Accuracy.** Certificate services activity is curated on Application and Security (`service = certificates` (LQL), plus AD CS reasons).
The failure a client notices is usually the dependent service, not the certificate event.
Window must include the renewal attempt.

**Queries.**

```lql
source = "<host>" AND service = certificates
```

Group by `sparklogs.reason` (LQL).

Dependent service symptom: group by `sparklogs.reason` (LQL) over `service = <affected service>` (LQL).
Renewal automation is often a scheduled task: `sparklogs.reason = scheduled_task_changed` (LQL) and task failures in the same window.

**Off-endpoint** (HM9): public CA, ACME client elsewhere, load balancer or reverse proxy holding its own copy, federation metadata.
