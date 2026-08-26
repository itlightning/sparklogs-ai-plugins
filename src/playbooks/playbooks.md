# Investigation playbooks

Symptom discovery lives in `skills/sparklogs-investigate/SKILL.md` (index table).
Ask may open one matching file for domain facts and starter LQL. Investigate may too.
Neither path is exhausted by the file: playbooks are incomplete recipes, not a catalog of relevant events and not a closed query set.
A playbook query that returns nothing (or too little) is a miss on that recipe, not proof the host is quiet and not permission to say the issue cannot be analyzed.
Widen: what subsources this host actually emits (`query_scope_activity` / counts grouped by `subsource`), then the explore ladder for that stream kind (`guides/stream-kinds.md`), then raw `query_logs`.
WEL classic: `provider_name` before `pattern`. File logs: no `provider_name`. Device state: not WEL; `query_device_health` for now, logs group `sparklogs.kind` / `topic` / `reason`.
Curated `service` / `reason` filters miss uncurated native text and sibling providers; look there before you stop.
Playbooks assume MCP fluency: LQL, field meaning, and claim strength, not tool walkthroughs.

<!-- BEGIN GENERATED INDEX:playbooks -->
| Symptom | File |
|---|---|
| Backup job failed | `playbooks/backup-failure.md` |
| BitLocker recovery | `playbooks/bitlocker-recovery.md` |
| Certificate expiry | `playbooks/certificate-expiry.md` |
| Directory replication | `playbooks/directory-replication-failure.md` |
| Disk full or filling | `playbooks/disk-full-or-filling.md` |
| Memory or handle leak | `playbooks/memory-or-handle-leak.md` |
| RAID / array degraded | `playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `playbooks/rmm-connectivity.md` |
| Slow logon | `playbooks/slow-logon.md` |
| Windows Update / patch failure | `playbooks/windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `playbooks/windows-vss.md` |
<!-- END GENERATED INDEX:playbooks -->

If nothing matches, use a theme in that same SKILL.md table, then one feed artifact.
