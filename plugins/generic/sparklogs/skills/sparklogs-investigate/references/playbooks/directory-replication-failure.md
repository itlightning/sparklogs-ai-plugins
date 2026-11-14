# Directory replication failure

**Trigger.** "Domain controllers are out of sync", or authentication behaves differently per site.

**Accuracy.** SYSVOL replication (DFS Replication) and Entra Connect sync are curated.
AD DS object replication (the Directory Service channel) is not collected, so replication topology and latency stay unexamined: say so in WHAT WAS NOT CHECKED.
"DCs out of sync" is often SYSVOL: Group Policy differs per DC.
Scope every DC the client has, not just the one named.
A DC that reported nothing is the finding; it is not a claim that the DC is down.
No replication rows is not health: a DC without the agent, or whose DFS Replication log feed is not current, reports nothing (`sparklogs-collection.md`).

**Queries.**

Replication and sync failures by reason and by DC:

```lql
sparklogs.reason in (dfsr_replication_stopped, dfsr_partner_communication_failed, dfsr_sysvol_initial_sync_pending, dfsr_dirty_shutdown_detected, entra_sync_run_failed, entra_password_hash_sync_failed, entra_sync_scheduler_aborted)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `source` (LQL).
DFS Replication on `win.eventlog.management`:

- `dfsr_replication_stopped`: arm `offline_too_long` (event 4012) is a member disconnected longer than the allowed offline time, and it will not resume on its own. Arm `folder_stopped` is a folder or volume that stopped, often after database damage. Arm `config_unreachable` (1202) resumes once a domain controller answers. Arm `dirty_shutdown_stopped` (2213) waits for a manual resume after an unclean shutdown (below).
- `dfsr_partner_communication_failed`: one link failing while the service retries. Event 5004 for the same partner, uncurated, records the link restored.
- `dfsr_sysvol_initial_sync_pending`: a SYSVOL copy that has never synchronized, normal for a short time after a promotion.

The partner and the replicated folder are in the message text. Entra Connect on the sync server's `win.eventlog.application`: `entra_sync_run_failed`, `entra_password_hash_sync_failed`, `entra_sync_scheduler_aborted`.

An unclean shutdown leaves the replication database to be checked: `dfsr_dirty_shutdown_detected`, arm `recovery_started` (2212, unexpected shutdown detected) and `recovered` (2214, recovery finished). On a server with automatic recovery turned off, `dfsr_replication_stopped` arm `dirty_shutdown_stopped` (2213) is replication on the volume paused until someone runs the resume command its message gives:

```lql
source = "<host>" AND sparklogs.reason in (dfsr_dirty_shutdown_detected, dfsr_replication_stopped)
```

Group by `sparklogs.reason_variant` (LQL) over time.
A `recovery_started` with no `recovered` after it is a volume still recovering (hours on a large volume), or one waiting for an administrator. The pair at most restarts is a server that cannot stop its services in the time Windows allows.
Links coming back after the recovery are DFSR event 5004 (links restored), which has no reason. Read it among the DFS Replication rows without a reason, grouped by `event_id` (LQL):

```lql
source = "<host>" AND subsource = "win.eventlog.management" AND provider_name = "DFSR" AND NOT sparklogs.reason!
```

Authentication failures by cause and by DC:

```lql
sparklogs.reason in (kerberos_ticket_failed, kerberos_preauth_failed, ntlm_validation_failed)
```

Group by `source` (LQL), `win.eventlog.security.status_meaning` (LQL).
`clock_skew` concentrated on one DC is a different story from `client_unknown` spread evenly.

Directory object changes: `sparklogs.reason = directory_object_changed` (LQL).

**Well-known causes.**

- A DC or file server offline past the allowed offline time, or restored from an old backup: `offline_too_long`.
- An unclean shutdown that damaged the replication database: 2212 without a 2214, or `folder_stopped`.
- DNS on a DC pointing at a resolver outside the domain, or returning the wrong address for a partner, and firewalls blocking RPC between sites: `dfsr_partner_communication_failed` for one partner while others work.
- A DC restored from a virtual machine snapshot (USN rollback) stops replicating directory objects and says so only in the Directory Service log, which is not collected. Ask whether a DC was restored or reverted.
- SYSVOL still replicated by the older File Replication Service, whose log is not collected: no DFS Replication rows for SYSVOL on any DC is that case.
- Clock skew between DCs: `clock_skew` on the authentication query above.

Clients that do not get the policy a DC holds, or read SYSVOL from the wrong DC: `group-policy.md`.

**Off-endpoint** (HM8): the directory service itself, site links and paths between DCs, anything on a DC without the agent.
