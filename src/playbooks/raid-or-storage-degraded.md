---
index: RAID / array degraded
---

# RAID or storage array degraded

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
