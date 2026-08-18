# Slow logon

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
