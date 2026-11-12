---
index: Directory replication
---

# Directory replication failure

**Trigger.** "Domain controllers are out of sync", or authentication behaves differently per site.

**Accuracy.** SYSVOL replication (DFS Replication) and Entra Connect sync are curated.
AD DS object replication (the Directory Service channel) is not collected, so replication topology and latency stay unexamined: say so in WHAT WAS NOT CHECKED.
"DCs out of sync" is most often SYSVOL: Group Policy differs per DC.
Scope every DC the client has, not just the one named.
A DC that reported nothing is the finding; it is not a claim that the DC is down.

**Queries.**

Replication and sync failures by reason and by DC:

```lql
service = directory_services AND severity >= warning
```

Group by `sparklogs.reason` (LQL), `source` (LQL).
DFS Replication on `win.eventlog.management` (value): `dfsr_replication_stopped` (value), `dfsr_partner_communication_failed` (value), `dfsr_sysvol_initial_sync_pending` (value).
Entra Connect on the sync server's `win.eventlog.application` (value): `entra_sync_run_failed` (value), `entra_password_hash_sync_failed` (value), `entra_sync_scheduler_aborted` (value).

Authentication failures by cause and by DC:

```lql
sparklogs.reason in (kerberos_ticket_failed, kerberos_preauth_failed, ntlm_validation_failed)
```

Group by `source` (LQL), `win.eventlog.security.status_meaning` (LQL).
`clock_skew` (value) concentrated on one DC is a different story from `client_unknown` (value) spread evenly.

Directory object changes: `sparklogs.reason = directory_object_changed` (LQL).

**Off-endpoint** (HM8): the directory service itself, site links and paths between DCs, anything on a DC without the agent.
