# Investigation playbooks

Symptom discovery lives in `skills/sparklogs-investigate/SKILL.md` (index table).
Ask may open one matching file for domain facts and starter LQL. Investigate may too.
Neither path is exhausted by the file: playbooks are incomplete recipes, not a catalog of relevant events and not a closed query set.
A playbook query that returns nothing (or too little) is a miss on that recipe, not proof the host is quiet and not permission to say the issue cannot be analyzed.
Widen: what subsources this host actually emits (`query_scope_activity` / counts grouped by `subsource` (LQL)), then the explore ladder for that stream kind (`../guides/stream-kinds.md`), then raw `query_logs`.
WEL classic: `provider_name` (LQL) before `pattern` (LQL). File logs: `origin` (LQL). Device state: `query_device_health` for latest-in-window; logs group `sparklogs.kind` (LQL) / `sparklogs.topic` (LQL) / `sparklogs.reason` (LQL).
Curated `service` (LQL) / `sparklogs.reason` (LQL) filters miss uncurated native text and sibling providers; look there before you stop.
Playbooks assume MCP fluency: LQL, field meaning, and claim strength, not tool walkthroughs.

| Symptom | File |
|---|---|
| Backup job failed | `backup-failure.md` |
| BitLocker recovery | `bitlocker-recovery.md` |
| Certificate expiry | `certificate-expiry.md` |
| Directory replication | `directory-replication-failure.md` |
| Disk full or filling | `disk-full-or-filling.md` |
| Memory or handle leak | `memory-or-handle-leak.md` |
| RAID / array degraded | `raid-or-storage-degraded.md` |
| RMM connectivity | `rmm-connectivity.md` |
| Slow logon | `slow-logon.md` |
| Windows Update / patch failure | `windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `windows-vss.md` |

If nothing matches, use a theme in that same SKILL.md table, then one feed artifact.
