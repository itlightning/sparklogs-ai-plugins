# Investigation playbooks

Symptom discovery lives in `skills/sparklogs-investigate/SKILL.md` (index table).
Chat may open one matching file as a query recipe. The written report path walks it.

| Symptom | File |
|---|---|
| Backup job failed | `${CLAUDE_PLUGIN_ROOT}/playbooks/backup-failure.md` |
| BitLocker recovery | `${CLAUDE_PLUGIN_ROOT}/playbooks/bitlocker-recovery.md` |
| Certificate expiry | `${CLAUDE_PLUGIN_ROOT}/playbooks/certificate-expiry.md` |
| Directory replication | `${CLAUDE_PLUGIN_ROOT}/playbooks/directory-replication-failure.md` |
| Disk full or filling | `${CLAUDE_PLUGIN_ROOT}/playbooks/disk-full-or-filling.md` |
| Memory or handle leak | `${CLAUDE_PLUGIN_ROOT}/playbooks/memory-or-handle-leak.md` |
| RAID / array degraded | `${CLAUDE_PLUGIN_ROOT}/playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `${CLAUDE_PLUGIN_ROOT}/playbooks/rmm-connectivity.md` |
| Slow logon | `${CLAUDE_PLUGIN_ROOT}/playbooks/slow-logon.md` |
| Windows Update / patch failure | `${CLAUDE_PLUGIN_ROOT}/playbooks/windows-update-failure.md` |

If nothing matches, use a theme in that same SKILL.md table, then one feed artifact.
