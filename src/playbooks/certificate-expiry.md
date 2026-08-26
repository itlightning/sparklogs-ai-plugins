---
index: Certificate expiry
---

# Certificate expiry

**Trigger.** "Service X broke and the certificate looks expired", or a renewal did not happen.

**Accuracy.** Certificate services activity is curated on Application and Security (`service = certificates`, plus AD CS reasons).
The failure a client notices is usually the dependent service, not the certificate event.
Window must include the renewal attempt.

**Queries.**

```
source = "<host>" AND service = certificates
```

Group by `reason`.

Dependent service symptom: group by `reason` over `service = <affected service>`.
Renewal automation is often a scheduled task: `sparklogs.reason = scheduled_task_changed` and task failures in the same window.

**Off-endpoint** (HM9): public CA, ACME client elsewhere, load balancer or reverse proxy holding its own copy, federation metadata.
