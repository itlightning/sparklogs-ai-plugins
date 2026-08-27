---
index: Directory replication
---

# Directory replication failure

**Trigger.** "Domain controllers are out of sync", or authentication behaves differently per site.

**Accuracy.** There is no curated replication-health source.
What is curated is the consequence on the authentication path.
Scope every DC the client has, not just the one named.
A DC that reported nothing is the finding; it is not a claim that the DC is down.
State in WHAT WAS NOT CHECKED that replication topology and latency were not examined.

**Queries.**

Authentication failures by cause and by DC:

```
sparklogs.reason in (kerberos_ticket_failed, kerberos_preauth_failed, ntlm_validation_failed)
```

Group by `source` (LQL), `win.eventlog.security.status_meaning` (LQL).
`clock_skew` concentrated on one DC is a different story from `client_unknown` spread evenly.

Directory object changes: `sparklogs.reason = directory_object_changed`.

**Off-endpoint** (HM8): the directory service itself, site links and paths between DCs, anything on a DC without the agent.
