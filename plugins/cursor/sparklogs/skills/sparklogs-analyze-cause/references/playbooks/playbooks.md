# Investigation playbooks

The ask and investigate skills carry this table. Open one matching file for domain facts and starter LQL.
A playbook is an incomplete recipe and not the event catalog: when its LQL returns little or nothing, widen as `../guides/common-mistakes.md` (**Treating a playbook as the event catalog**) describes before calling the host quiet.
Playbooks assume MCP fluency: LQL, field meaning, and claim strength, not tool walkthroughs.
`<host>` in a playbook query is the `source` (LQL) name exactly as `resolve_scope` or `list_sources` returned it. `source = "<host>"` (LQL) is exact, case included; when the spelling is unknown, see `../guides/mcp-tool-decision-tree.md` (paste-back rules).
A symptom that lives on a device starts from device health (a device view, a condition or the latest state) and narrows events to the device and interval that reading named.
One device or many: count the symptom's own signature across the client by `source` (LQL). The same signature on many devices after one shared update is that update; on one device alone it is what differs on that device; on many devices at the same minute with no shared change, the cause is shared and probably off the devices. Each leaf names the signature to count.

| Symptom | File |
|---|---|
| One application slow or stalling over the network | `application-network-stall.md` |
| App slow over VPN | `application-network-stall.md` |
| BitLocker recovery | `bitlocker-recovery.md` |
| Certificate, TLS and enrollment failures | `certificate-expiry.md` |
| Certificate expired or expiring | `certificate-expiry.md` |
| TLS or Schannel errors | `certificate-expiry.md` |
| Certificate autoenrollment failing | `certificate-expiry.md` |
| HTTPS site or Remote Desktop certificate error | `certificate-expiry.md` |
| Blue screens, app crashes, unexpected restarts | `crashes-and-restarts.md` |
| Blue screen (BSOD) | `crashes-and-restarts.md` |
| Server restarted on its own | `crashes-and-restarts.md` |
| Directory replication | `directory-replication-failure.md` |
| SYSVOL or DFSR replication | `directory-replication-failure.md` |
| Domain controllers out of sync | `directory-replication-failure.md` |
| Disk full or filling | `disk-full-or-filling.md` |
| File share or mapped drive unreachable or slow | `file-share-access.md` |
| Mapped drive disconnected | `file-share-access.md` |
| Access denied on a share | `file-share-access.md` |
| NAS or scanner share stopped working | `file-share-access.md` |
| Group Policy not applying | `group-policy.md` |
| Group Policy slow at startup or logon | `group-policy.md` |
| Mapped drive, printer or shortcut from policy missing | `group-policy.md` |
| Hardware faults (WHEA, GPU, devices, heat) | `hardware-faults.md` |
| Display driver stopped responding | `hardware-faults.md` |
| Device not working (Code 10, 43) | `hardware-faults.md` |
| Overheating or thermal shutdown | `hardware-faults.md` |
| Memory or handle leak | `memory-or-handle-leak.md` |
| Slows over days, fine after a reboot | `memory-or-handle-leak.md` |
| Internet down, slow or dropping | `network-connectivity.md` |
| Wi-Fi drops | `network-connectivity.md` |
| Suspicious PowerShell / script blocks | `powershell-script-blocks.md` |
| Encoded PowerShell command | `powershell-script-blocks.md` |
| Disk or RAID array failing | `raid-or-storage-degraded.md` |
| Disk errors or bad blocks | `raid-or-storage-degraded.md` |
| Chkdsk or file system corruption | `raid-or-storage-degraded.md` |
| Volume missing, offline or RAW | `raid-or-storage-degraded.md` |
| SAN or iSCSI disk lost | `raid-or-storage-degraded.md` |
| RMM connectivity | `rmm-connectivity.md` |
| Device offline in the RMM | `rmm-connectivity.md` |
| Scheduled task did not run or failed | `scheduled-task-failures.md` |
| Nightly script did not run | `scheduled-task-failures.md` |
| Scheduled task disabled or missing | `scheduled-task-failures.md` |
| Service will not start, keeps stopping or hangs | `service-failures.md` |
| Service crashing and restarting | `service-failures.md` |
| Automatic service stopped | `service-failures.md` |
| Print spooler stopped or will not start | `service-failures.md` |
| Slow or freezing PC | `slow-device.md` |
| Slow server | `slow-device.md` |
| Slow boot or shutdown | `slow-device.md` |
| High CPU, memory or disk use | `slow-device.md` |
| Slow logon | `slow-logon.md` |
| Temporary profile or profile will not load | `slow-logon.md` |
| Sign-in stuck at Welcome or Please wait | `slow-logon.md` |
| Is SparkLogs collecting from this device | `sparklogs-collection.md` |
| No data from a device | `sparklogs-collection.md` |
| Skipped or missing events | `sparklogs-collection.md` |
| SparkLogs agent not updating | `sparklogs-collection.md` |
| TPM errors or attestation failure | `tpm-health.md` |
| What changed on this device | `what-changed.md` |
| It worked yesterday | `what-changed.md` |
| Windows Update / patch failure | `windows-update-failure.md` |
| Device behind on updates or not scanning | `windows-update-failure.md` |
| Feature update (upgrade) failed | `windows-update-failure.md` |
| Component store corruption (DISM, SFC) | `windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `windows-vss.md` |
| Backup fails with a VSS error | `windows-vss.md` |

If nothing matches, use a theme in that same SKILL.md table, then one feed artifact.
