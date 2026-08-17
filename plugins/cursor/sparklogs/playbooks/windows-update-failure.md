# Windows Update failure

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
