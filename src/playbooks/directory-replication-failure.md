---
index: Directory replication
---

# Directory replication failure

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
