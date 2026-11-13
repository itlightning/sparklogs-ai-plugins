# Investigation playbooks

Symptom discovery lives in `skills/sparklogs-investigate/SKILL.md` (index table).
Ask may open one matching file for domain facts and starter LQL. Investigate may too.
Neither path is exhausted by the file: playbooks are incomplete recipes, not a catalog of relevant events and not a closed query set.
A playbook query that returns nothing (or too little) is a miss on that recipe, not proof the host is quiet and not permission to say the issue cannot be analyzed.
Widen: what subsources this host actually emits (`query_scope_activity` (tool) / counts grouped by `subsource` (LQL)), then the explore ladder for that stream kind (`guides/stream-kinds.md`), then raw `query_logs` (tool).
WEL classic: `provider_name` (LQL) before `pattern` (LQL). File logs: `origin` (LQL). Device state: `query_device_health` (tool) for latest-in-window; logs group `sparklogs.kind` (LQL) / `sparklogs.topic` (LQL) / `sparklogs.reason` (LQL).
Curated `service` (LQL) / `sparklogs.reason` (LQL) filters miss uncurated raw text and sibling providers; look there before you stop.
Playbooks assume MCP fluency: LQL, field meaning, and claim strength, not tool walkthroughs.
`<host>` in a playbook query is the `source` (LQL) name exactly as `resolve_scope` (tool) or `list_sources` (tool) returned it. `source = "<host>"` (LQL) is exact, case included; when the spelling is unknown, see `guides/mcp-tool-decision-tree.md` (paste-back rules).
A symptom that lives on a device starts from device health (a device view, a condition or the latest state) and narrows events to the device and interval that reading named.
One device or many: count the symptom's own signature across the client by `source` (LQL). The same signature on many devices after one shared update is that update; on one device alone it is what differs on that device; on many devices at the same minute with no shared change, the cause is shared and probably off the devices. Each leaf names the signature to count.

<!-- BEGIN GENERATED INDEX:playbooks -->
| Symptom | File |
|---|---|
| One application slow or stalling over the network | `playbooks/application-network-stall.md` |
| App slow over VPN | `playbooks/application-network-stall.md` |
| BitLocker recovery | `playbooks/bitlocker-recovery.md` |
| Certificate expiry | `playbooks/certificate-expiry.md` |
| Blue screens, app crashes, unexpected restarts | `playbooks/crashes-and-restarts.md` |
| Blue screen (BSOD) | `playbooks/crashes-and-restarts.md` |
| App keeps crashing | `playbooks/crashes-and-restarts.md` |
| Server restarted on its own | `playbooks/crashes-and-restarts.md` |
| Directory replication | `playbooks/directory-replication-failure.md` |
| Disk full or filling | `playbooks/disk-full-or-filling.md` |
| File share or mapped drive unreachable or slow | `playbooks/file-share-access.md` |
| Mapped drive disconnected | `playbooks/file-share-access.md` |
| Access denied on a share | `playbooks/file-share-access.md` |
| NAS or scanner share stopped working | `playbooks/file-share-access.md` |
| Group Policy not applying | `playbooks/group-policy.md` |
| Group Policy slow at startup or logon | `playbooks/group-policy.md` |
| Mapped drive, printer or shortcut from policy missing | `playbooks/group-policy.md` |
| Memory or handle leak | `playbooks/memory-or-handle-leak.md` |
| Internet down, slow or dropping | `playbooks/network-connectivity.md` |
| Wi-Fi drops | `playbooks/network-connectivity.md` |
| Suspicious PowerShell / script blocks | `playbooks/powershell-script-blocks.md` |
| Encoded PowerShell command | `playbooks/powershell-script-blocks.md` |
| RAID / array degraded | `playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `playbooks/rmm-connectivity.md` |
| Scheduled task did not run or failed | `playbooks/scheduled-task-failures.md` |
| Nightly script did not run | `playbooks/scheduled-task-failures.md` |
| Scheduled task disabled or missing | `playbooks/scheduled-task-failures.md` |
| Service will not start, keeps stopping or hangs | `playbooks/service-failures.md` |
| Service crashing and restarting | `playbooks/service-failures.md` |
| Automatic service stopped | `playbooks/service-failures.md` |
| Slow or freezing PC | `playbooks/slow-device.md` |
| Slow server | `playbooks/slow-device.md` |
| Slow logon | `playbooks/slow-logon.md` |
| Is SparkLogs collecting from this device | `playbooks/sparklogs-collection.md` |
| No data from a device | `playbooks/sparklogs-collection.md` |
| Skipped or missing events | `playbooks/sparklogs-collection.md` |
| SparkLogs agent not updating | `playbooks/sparklogs-collection.md` |
| TPM errors or attestation failure | `playbooks/tpm-health.md` |
| What changed on this device | `playbooks/what-changed.md` |
| It worked yesterday | `playbooks/what-changed.md` |
| Windows Update / patch failure | `playbooks/windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `playbooks/windows-vss.md` |
<!-- END GENERATED INDEX:playbooks -->

If nothing matches, use a theme in that same SKILL.md table, then one feed artifact.
