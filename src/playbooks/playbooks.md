# Investigation playbooks

The ask and investigate skills carry this table. Open one matching file for domain facts and starter LQL.
A playbook is an incomplete recipe and not the event catalog: when its LQL returns little or nothing, widen as `guides/common-mistakes.md` (**Treating a playbook as the event catalog**) describes before calling the host quiet.
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
| Certificate, TLS and enrollment failures | `playbooks/certificate-expiry.md` |
| Certificate expired or expiring | `playbooks/certificate-expiry.md` |
| TLS or Schannel errors | `playbooks/certificate-expiry.md` |
| Certificate autoenrollment failing | `playbooks/certificate-expiry.md` |
| HTTPS site or Remote Desktop certificate error | `playbooks/certificate-expiry.md` |
| Blue screens, app crashes, unexpected restarts | `playbooks/crashes-and-restarts.md` |
| Blue screen (BSOD) | `playbooks/crashes-and-restarts.md` |
| Server restarted on its own | `playbooks/crashes-and-restarts.md` |
| Directory replication | `playbooks/directory-replication-failure.md` |
| SYSVOL or DFSR replication | `playbooks/directory-replication-failure.md` |
| Domain controllers out of sync | `playbooks/directory-replication-failure.md` |
| Disk full or filling | `playbooks/disk-full-or-filling.md` |
| File share or mapped drive unreachable or slow | `playbooks/file-share-access.md` |
| Mapped drive disconnected | `playbooks/file-share-access.md` |
| Access denied on a share | `playbooks/file-share-access.md` |
| NAS or scanner share stopped working | `playbooks/file-share-access.md` |
| Group Policy not applying | `playbooks/group-policy.md` |
| Group Policy slow at startup or logon | `playbooks/group-policy.md` |
| Mapped drive, printer or shortcut from policy missing | `playbooks/group-policy.md` |
| Hardware faults (WHEA, GPU, devices, heat) | `playbooks/hardware-faults.md` |
| Display driver stopped responding | `playbooks/hardware-faults.md` |
| Device not working (Code 10, 43) | `playbooks/hardware-faults.md` |
| Overheating or thermal shutdown | `playbooks/hardware-faults.md` |
| Memory or handle leak | `playbooks/memory-or-handle-leak.md` |
| Slows over days, fine after a reboot | `playbooks/memory-or-handle-leak.md` |
| Internet down, slow or dropping | `playbooks/network-connectivity.md` |
| Wi-Fi drops | `playbooks/network-connectivity.md` |
| Suspicious PowerShell / script blocks | `playbooks/powershell-script-blocks.md` |
| Encoded PowerShell command | `playbooks/powershell-script-blocks.md` |
| Disk or RAID array failing | `playbooks/raid-or-storage-degraded.md` |
| Disk errors or bad blocks | `playbooks/raid-or-storage-degraded.md` |
| Chkdsk or file system corruption | `playbooks/raid-or-storage-degraded.md` |
| Volume missing, offline or RAW | `playbooks/raid-or-storage-degraded.md` |
| SAN or iSCSI disk lost | `playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `playbooks/rmm-connectivity.md` |
| Device offline in the RMM | `playbooks/rmm-connectivity.md` |
| Scheduled task did not run or failed | `playbooks/scheduled-task-failures.md` |
| Nightly script did not run | `playbooks/scheduled-task-failures.md` |
| Scheduled task disabled or missing | `playbooks/scheduled-task-failures.md` |
| Service will not start, keeps stopping or hangs | `playbooks/service-failures.md` |
| Service crashing and restarting | `playbooks/service-failures.md` |
| Automatic service stopped | `playbooks/service-failures.md` |
| Print spooler stopped or will not start | `playbooks/service-failures.md` |
| Slow or freezing PC | `playbooks/slow-device.md` |
| Slow server | `playbooks/slow-device.md` |
| Slow boot or shutdown | `playbooks/slow-device.md` |
| High CPU, memory or disk use | `playbooks/slow-device.md` |
| Slow logon | `playbooks/slow-logon.md` |
| Temporary profile or profile will not load | `playbooks/slow-logon.md` |
| Sign-in stuck at Welcome or Please wait | `playbooks/slow-logon.md` |
| Is SparkLogs collecting from this device | `playbooks/sparklogs-collection.md` |
| No data from a device | `playbooks/sparklogs-collection.md` |
| Skipped or missing events | `playbooks/sparklogs-collection.md` |
| SparkLogs agent not updating | `playbooks/sparklogs-collection.md` |
| TPM errors or attestation failure | `playbooks/tpm-health.md` |
| What changed on this device | `playbooks/what-changed.md` |
| It worked yesterday | `playbooks/what-changed.md` |
| Windows Update / patch failure | `playbooks/windows-update-failure.md` |
| Device behind on updates or not scanning | `playbooks/windows-update-failure.md` |
| Feature update (upgrade) failed | `playbooks/windows-update-failure.md` |
| Component store corruption (DISM, SFC) | `playbooks/windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `playbooks/windows-vss.md` |
| Backup fails with a VSS error | `playbooks/windows-vss.md` |
<!-- END GENERATED INDEX:playbooks -->

If nothing matches, use a theme in that same SKILL.md table, then one feed artifact.
