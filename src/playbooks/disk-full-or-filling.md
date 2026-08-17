---
index: Disk full or filling
---

# Disk full or filling fast

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
