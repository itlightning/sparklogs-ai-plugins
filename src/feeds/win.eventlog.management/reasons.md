<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.management`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `bitlocker_os_drive_encrypted_beyond_policy_scope` | bitlocker os drive encrypted beyond policy scope | event | Verbose | `device_management` | benign |
| `bitlocker_policy_noncompliant` | bitlocker policy noncompliant | event | Info to Warning | `device_management` |  |
| `bits_transfer_failed` | bits transfer failed | event | Info | `patching` |  |
| `dfsr_partner_communication_failed` | dfsr partner communication failed | event | Warning | `directory_services` |  |
| `dfsr_replication_stopped` | dfsr replication stopped | event | Warning to Serious | `directory_services` |  |
| `dfsr_sysvol_initial_sync_pending` | dfsr sysvol initial sync pending | event | Warning | `directory_services` |  |
| `hyperv_replication_failed` | hyperv replication failed | event | Notice to Warning | `virtualization` |  |
| `hyperv_vm_backup_checkpoint_failed` | hyperv vm backup checkpoint failed | event | Info to Warning | `virtualization` | benign possible |
| `hyperv_vm_start_failed` | hyperv vm start failed | event | Warning | `virtualization` |  |
| `hyperv_vm_storage_request_slow` | hyperv vm storage request slow | event | Warning to Minor | `virtualization` |  |
| `hyperv_vm_vhd_chain_corrupted` | hyperv vm vhd chain corrupted | event | Info to Serious | `virtualization` | benign possible |
| `mdm_policy_apply_failed` | mdm policy apply failed | event | Info to Warning | `device_management` | benign possible |
| `patch_download_failed` | patch download failed | event | Warning | `patching` |  |
| `patch_scan_failed` | patch scan failed | event | Info to Warning | `patching` | benign possible |
| `print_connection_reopen_failed` | print connection reopen failed | event | Info to Warning | `printing` | benign possible |
| `printer_driver_install_failed` | printer driver install failed | event | Notice to Warning | `printing` |  |
| `scheduled_task_engine_failed` | scheduled task engine failed | event | Info to Warning | `scheduled_tasks` | benign possible |
| `scheduled_task_load_failed` | scheduled task load failed | event | Notice to Warning | `scheduled_tasks` |  |
| `scheduled_task_sign_in_failed` | scheduled task sign in failed | event | Warning | `scheduled_tasks` |  |
| `scheduled_task_start_failed` | scheduled task start failed | event | Debug to Warning | `scheduled_tasks` |  |
| `win_locale_registry_read_failed` | win locale registry read failed | event | Warning | `user_profiles` |  |

## `bitlocker_os_drive_encrypted_beyond_policy_scope`: bitlocker os drive encrypted beyond policy scope

The operating-system drive is encrypted in full where the BitLocker policy asks for used space only.

**Severity:** Verbose

**Why it matters:** None for protection: every sector the policy wants encrypted is encrypted.

**In practice:** The Windows MDM client logs event 2903 in Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin with the text "Wrong encryption type for OS Drives used. MDM requires DataOnly." The drive was encrypted in full, often before the policy arrived, and the policy names used-space encryption, which is a smaller target. The client restates it at every sync, and the device's 2900 summary carries the issue os_scope_differs beside it.

**When to ignore:** Always safe to pass over: the drive is protected beyond what the policy asks.

**What to check:**

- Nothing to fix on the device. To stop the record, align the policy's encryption type with how the fleet is actually encrypted.

**Related:**

- `bitlocker_policy_noncompliant`: a drive that is not protected, or encrypted with a cipher or scope that leaves less protected than policy asks

**Example:** A laptop encrypted in full at imaging logs event 2903 after Intune applies a used-space-only policy.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#bitlocker_os_drive_encrypted_beyond_policy_scope, https://sparklogs.com/reference/reasons/bitlocker_os_drive_encrypted_beyond_policy_scope.json

## `bitlocker_policy_noncompliant`: bitlocker policy noncompliant

A device does not match the BitLocker encryption policy set for it: a drive is not protected, lacks a protector the policy requires, or is encrypted with a method or scope the policy does not allow.

**Severity:** Warning when the operating-system drive is not protected. Notice for a missing TPM protector, an unprotected data drive, used-space-only encryption where policy wants the full drive, and other unmet requirements. Display for a summary whose only issues are cipher strength or encryption scope, and Info for the cipher-strength event itself.

**Why it matters:** An unprotected operating-system drive means every file on the machine is readable to anyone who takes it.

**In practice:** The Windows MDM client checks the BitLocker policy from Intune or another MDM service at each sync and writes events 2900 to 2914 in Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin when the device does not match. Event 2900 is the summary: it names the drive (OSV for the operating-system drive, FDV for a fixed data drive) and a status word with one bit per issue, which SparkLogs lists as issues on the line, for example os_drive_unprotected or os_cipher_differs. Event 2914 says the operating-system drive is not protected. It covers a drive that was never encrypted, one whose encryption did not finish, and one whose protection is suspended. Event 2902 names the encryption method found and the one the policy wants, such as xts_aes_128 against xts_aes_256. Events 2905 and 2906 say the drive is not using the TPM protector type the policy requires, and 2910 that a fixed data drive is not protected. The client restates the same mismatch at every sync, so one device produces many records for one finding.

**When to ignore:** Display and Info rows (a cipher strength or encryption scope other than the policy names) need no action unless the MSP wants the stronger cipher. The drive is encrypted.

**What to check:**

- Read the issues list first: os_drive_unprotected is the one to act on today.
- Run `manage-bde -status` on the device to see each volume's protection status, encryption method and whether protection is suspended.
- For an unprotected OS drive, resume protection if it is suspended (`manage-bde -protectors -enable C:`), or check TPM readiness and the BitLocker-API log for why encryption did not start.
- For a missing TPM protector, compare `manage-bde -protectors -get C:` with the protector the policy requires.
- For 2904, decide whether full encryption is really required. If it is, decrypt and re-encrypt the OS drive with full encryption, since BitLocker cannot change an encrypted drive from used space only to full.

**Related:**

- `bitlocker_os_drive_encrypted_beyond_policy_scope`: an OS drive encrypted in full where policy asks for used space only, which is not a compliance failure
- `bitlocker_recovery_key_backup_failed`: encryption that ran but whose recovery key did not reach the directory
- `device_encryption_enable_failed`: the automatic-encryption failure that can leave a device in this noncompliant state

**Example:** A laptop's operating-system drive is still unencrypted, and the MDM client logs event 2900 with the issue os_drive_unprotected at its next sync.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#bitlocker_policy_noncompliant, https://sparklogs.com/reference/reasons/bitlocker_policy_noncompliant.json

The management client is the authority on what the policy requires. The device's own state reading says what the volume is, without knowing the policy.

## `bits_transfer_failed`: bits transfer failed

A Background Intelligent Transfer Service job reported an error on one transfer attempt.

**Severity:** Info

**Why it matters:** One attempt inside a transfer that BITS keeps retrying. The record names the job and the error code; whether the download finally failed is reported by the program that asked for it.

**In practice:** BITS writes event 61 in Microsoft-Windows-Bits-Client/Operational when it stops a transfer attempt on an error, with the job name and the result code. Office applications fetching configuration and address books, Windows Update and other software downloaders all use BITS, and BITS retries failed transfers on its own. A name that does not resolve, a proxy or server refusing the request, or a server that closes the connection is the usual cause. A Windows Update download that ends in failure is reported by Windows Update itself.

**When to ignore:** Occasional failures from Office or other applications that later complete are routine retries.

**What to check:**

- Pivot on the job name and the result code to find a destination or a code that keeps repeating.
- For an update download, read the outcome from the Windows Update records.
- A job and code that reappear hour after hour point at a proxy, firewall or DNS problem on that machine.

**Related:**

- `patch_download_failed`: a Windows Update download that failed for good, which BITS problems can cause

**Example:** An Office address book download on a laptop fails while the laptop is between networks, and BITS logs event 61 for the job.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#bits_transfer_failed, https://sparklogs.com/reference/reasons/bits_transfer_failed.json

BITS retries a failed transfer, so these records come in runs. The stream is rate-bounded: one record per job and result code per device per hour, with the count of what an hour suppressed carried on the next hour's first record. A job and code that reappear hour after hour, with no completed transfer between them, is the pattern worth reading.

## `dfsr_partner_communication_failed`: dfsr partner communication failed

DFS Replication could not reach a replication partner for a replication group.

**Severity:** Warning

**Why it matters:** Changes made on either server do not reach the other while the link is down, so users at the two sites can see different versions of the same files.

**In practice:** DFS Replication writes events 5002, 5008, 5012 and 5014 in the DFS Replication log when it cannot communicate with a partner, each a different wording of a failed link. The service keeps retrying and writes event 5004 when the connection is established again. A partner that is down or restarting, a wide-area link that drops, a firewall blocking RPC, or DNS returning the wrong address for the partner is the usual cause. The partner and the replication group are named in the message text.

**When to ignore:** A single failure followed by event 5004 for the same partner is a link flap that recovered.

**What to check:**

- Look for event 5004 for the same partner after it, which shows the link recovered.
- If none follows, check that the partner is up, resolves in DNS and is reachable over RPC.
- Run `dfsrdiag replicationstate` or `Get-DfsrBacklog` to see how far the two copies have drifted.

**Related:**

- `dfsr_replication_stopped`: replication on a folder stopped, the end state of a link that never comes back

**Example:** A branch office's internet link drops overnight, and the head-office file server logs event 5008 for its branch partner.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#dfsr_partner_communication_failed, https://sparklogs.com/reference/reasons/dfsr_partner_communication_failed.json

The partner and the replication group are named in the message text rather than in fields, because these events carry no named payload.

## `dfsr_replication_stopped`: dfsr replication stopped

DFS Replication stopped replicating a folder or a volume, or stopped because it could not read its own configuration.

**Severity:** Serious or Warning

**Why it matters:** Every member of that replication group keeps serving its own copy, and the copies drift apart with nothing visible to the people using them. On a domain controller this can stop Group Policy and logon scripts reaching other controllers.

**In practice:** DFS Replication writes these events in the DFS Replication log. Event 4012 means the member was disconnected from its partners for longer than the allowed offline time, so the service stopped replicating the folder and will not resume on its own. Events 4004 and 2004 mean it stopped replicating a folder or a whole volume, and 2104 that it could not recover from a database error on a volume. Event 6104 means it could not register its WMI providers, and replication is disabled until that is fixed. Event 1202 means it could not read its configuration from a domain controller; it resumes once a controller answers, and is recorded at Warning. A server offline for weeks, an unclean shutdown that damaged the replication database, or a domain controller it cannot reach is the usual cause.

**When to ignore:** A single 1202 that clears when the domain controller answers again needs no action.

**What to check:**

- For 4012 on a file share folder, follow the event's message: remove the member from the replication group and add it back.
- For 4012 on a domain controller's SYSVOL, run a non-authoritative SYSVOL sync on that controller. DFS Management cannot edit SYSVOL replication.
- For a database or volume failure (2004, 2104), the replication database on that volume needs to be rebuilt.
- For 6104, repair the WMI repository and restart the DFS Replication service.
- Check the folder's other members before resuming, so the copy that wins is the one you want.

**Related:**

- `dfsr_partner_communication_failed`: one link failing while replication keeps retrying
- `dfsr_sysvol_initial_sync_pending`: a SYSVOL copy that has never synchronized at all

**Example:** A branch file server comes back after two months offline, and DFS Replication logs event 4012 and refuses to resume.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#dfsr_replication_stopped, https://sparklogs.com/reference/reasons/dfsr_replication_stopped.json

The replicated folder, the partner and the directory server are named in the message text rather than in fields, because these events carry no named payload.

## `dfsr_sysvol_initial_sync_pending`: dfsr sysvol initial sync pending

A server holds a SYSVOL copy that has never completed its first synchronization with a partner.

**Severity:** Warning

**Why it matters:** That server does not serve Group Policy or logon scripts from its SYSVOL copy, and a domain controller promotion in progress has not finished.

**In practice:** DFS Replication writes event 4612 or 4614 in the DFS Replication log when it has set up SYSVOL on this server and is waiting to replicate it from a partner for the first time. The copy stays in that state until the partner named in the message answers. It is normal for a short time after a new domain controller is promoted or SYSVOL is restored. If it lasts, the partner is unreachable, its own replication is broken, or no partner is set as the authoritative source.

**When to ignore:** Right after a domain controller promotion, until event 4604 follows.

**What to check:**

- Check whether the named partner is reachable and its own replication is healthy.
- Look for event 4604, which records the initial synchronization finishing.
- If it never completes, check whether a non-authoritative or authoritative SYSVOL restore is needed.

**Related:**

- `dfsr_replication_stopped`: replication that was working and has stopped

**Example:** A newly promoted domain controller logs event 4614 while it waits for its first SYSVOL copy from an existing controller.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#dfsr_sysvol_initial_sync_pending, https://sparklogs.com/reference/reasons/dfsr_sysvol_initial_sync_pending.json

The partner and the local path are named in the message text rather than in fields, because these events carry no named payload.

## `hyperv_replication_failed`: hyperv replication failed

Hyper-V could not replicate a virtual machine to its replica server.

**Severity:** Warning or Notice

**Why it matters:** The recovery copy of that machine stops being updated and gets older, while the machine itself keeps running, so nobody notices until a failover needs the copy.

**In practice:** Hyper-V Replica writes these events in Microsoft-Windows-Hyper-V-VMMS-Admin. Event 32315 says replication failed and states when the host will try again; it retries on its own. Events 29292, 29312, 32022 and 32552 say the replica server did not answer, refused the connection, or is not ready to accept replication, and name the server and port in the message. Event 33676 says the operation was refused because the replication was not in a state to perform it, as when another operation is running, and is recorded at Notice. A replica server that is down, a firewall or certificate problem on the replication port, or a replica host short of storage is the usual cause.

**When to ignore:** A Notice row for an operation refused during another one, or a single retry that is followed by successful replication.

**What to check:**

- Check that the replica server named in the message is up and reachable on the replication port.
- Run `Measure-VMReplication` on the primary host to see each machine's replication health and last successful replication.
- A stated retry (32315) means the host will try again on its own; repeated unreachable records are the ones to act on.
- If replication is in a failed state, resume it with `Resume-VMReplication`, or resynchronize after a long outage.

**Related:**

- `hyperv_vm_backup_checkpoint_failed`: checkpoint failures on the same host, another sign the machine's protection is broken
- `hyperv_vm_vhd_chain_corrupted`: a broken checkpoint chain that can also stop replication

**Example:** The replica server at a second site is offline for maintenance, and the primary host logs event 29292 for a file server it replicates there.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#hyperv_replication_failed, https://sparklogs.com/reference/reasons/hyperv_replication_failed.json

The machine keeps running throughout, so nobody finds out the copy is stale until they need it.

## `hyperv_vm_backup_checkpoint_failed`: hyperv vm backup checkpoint failed

A backup of a virtual machine did not take a consistent snapshot.

**Severity:** Warning, Notice or Info

**Why it matters:** That backup run either produced no restore point or produced one that is only crash-consistent, so applications such as SQL Server or Exchange may need recovery after a restore from it.

**In practice:** Hyper-V writes events 10150 and 18012 in Microsoft-Windows-Hyper-V-VMMS-Admin, and 3280 in Microsoft-Windows-Hyper-V-Worker-Admin, when it cannot create the backup checkpoint for a machine. Event 10172 means the shadow-copy writers inside the guest did not finish, so the copy is crash-consistent, not application-consistent. Event 4093 from the integration services says the machine has its Volume Shadow Copy integration service turned off: a setting, recorded at Notice. A snapshot-set-in-progress result (0x80042316) is two backup jobs overlapping on the same machine, recorded at Info. A checkpoint file left behind by an earlier failed backup also blocks new ones and does not clear on its own.

**When to ignore:** Info rows for a snapshot set already in progress are overlapping schedules, not missed backups, as long as a later run succeeds.

**What to check:**

- Read the result code: a snapshot set already in progress is two jobs overlapping and is fixed by rescheduling.
- A file-already-exists result is a stale checkpoint left by an earlier failure; remove it through the backup tool or Hyper-V Manager.
- For 10172, run `vssadmin list writers` inside the guest and fix any writer that is not stable.
- For 4093, turn on the Backup (volume shadow copy) integration service for that machine.

**Related:**

- `hyperv_vm_vhd_chain_corrupted`: a broken disk chain, one reason a checkpoint cannot be created

**Example:** A nightly host-level backup of a SQL Server machine fails because the guest's shadow-copy writers did not complete, and Hyper-V logs event 10172.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#hyperv_vm_backup_checkpoint_failed, https://sparklogs.com/reference/reasons/hyperv_vm_backup_checkpoint_failed.json

A failed guest writer still usually leaves a crash-consistent copy, which is not the same as no backup at all.

## `hyperv_vm_start_failed`: hyperv vm start failed

A virtual machine, or the worker process that runs one, did not start.

**Severity:** Warning

**Why it matters:** A workload that was supposed to be running is not, and the services on it are down for its users.

**In practice:** Hyper-V writes events 15130 and 15500 in Microsoft-Windows-Hyper-V-VMMS-Admin, and 3050 and 3122 in Microsoft-Windows-Hyper-V-Worker-Admin, when a machine or its worker process fails to start. Events 3050 and 3122 say the host did not have enough memory for the machine. These events carry no result code, so the machine name and the message are what say which machine and why. The record shows one failed start; the machine may have been started successfully afterwards.

**What to check:**

- Check whether the machine is running now (`Get-VM`), and start it if not.
- For the memory events, compare the machine's startup memory with the host's free memory, and lower it or move a machine off the host.
- One machine failing every start is a different ticket from a host that is full: check the other machines on the host.

**Related:**

- `hyperv_vm_backup_checkpoint_failed`: a backup failing on a machine that is running

**Example:** After a host reboot, a virtual machine fails to start because the host has no memory left for it, and Hyper-V logs event 3050.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#hyperv_vm_start_failed, https://sparklogs.com/reference/reasons/hyperv_vm_start_failed.json

These templates carry no result code, so the machine name and the id are what the row offers.

## `hyperv_vm_storage_request_slow`: hyperv vm storage request slow

A storage request a virtualization host made for one of its guests took longer than expected to complete.

**Severity:** Warning for a slow request. Minor where the request took thirty seconds or longer.

**Why it matters:** The guest waited for that read or write. Every guest on the host shares the same storage path, so a steady rate of these slows all of them.

**In practice:** Hyper-V writes event 9 in Microsoft-Windows-Hyper-V-StorageVSP-Admin when an I/O request for a guest's virtual disk takes too long to complete, with the time it took in milliseconds, the operation code and the bytes moved. The virtual disk is named in the message text. Overloaded or failing storage under the host, a busy SAN or network storage link, and backups or other heavy I/O on the same storage at the same time are the usual causes.

**When to ignore:** An isolated slow request at Warning on an otherwise quiet host.

**What to check:**

- Read the rate before the duration: one slow request is a flake.
- Check whether the slow requests line up with backups or another heavy workload on the same storage.
- Check the host's own disk latency, and the SAN or storage array's health and load.

**Related:**

- `disk_latency_degraded`: the host's own storage latency condition, which this guest slowness may share

**Example:** During a nightly backup window, a write to a guest's virtual disk on a busy SAN takes 12 seconds to complete.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#hyperv_vm_storage_request_slow, https://sparklogs.com/reference/reasons/hyperv_vm_storage_request_slow.json

The duration measures one request rather than how long a condition has held.

## `hyperv_vm_vhd_chain_corrupted`: hyperv vm vhd chain corrupted

A differencing virtual disk and its parent disagree on the parent identity, so the disk chain cannot be merged or checkpointed.

**Severity:** Serious or Info

**Why it matters:** The machine keeps running, but its checkpoints and backups fail, its disk files keep growing because they cannot merge, and a restore from that chain can fail.

**In practice:** The virtual disk driver writes event 7 in Microsoft-Windows-VHDMP-Operational when a differencing disk names a parent identity that does not match the parent it is attached to, with both identities in the event. Hyper-V reports the same failure as event 16370 or 19100 in Microsoft-Windows-Hyper-V-VMMS-Admin. Copying, moving or editing a disk file by hand, restoring only part of a chain, or a merge that was interrupted is the usual cause. A sharing-violation result (0x80070020) on 16370 or 19100 means another process, such as a backup, had the file open; it says nothing about the chain and is recorded at Info.

**When to ignore:** Info rows with a sharing violation are a file in use at that moment; pass over them unless they repeat for the same machine.

**What to check:**

- Stop taking checkpoints of that machine and repair the chain before anything merges it.
- Inspect the chain with `Get-VHD` on each disk file; after taking a copy of the files, reconnect the child to the right parent (`Set-VHD -ParentPath`, with `-IgnoreIdMismatch` only when you are sure it is the right parent).
- Watch the volume the chain lives on: a merge that keeps failing is how it fills.

**Related:**

- `hyperv_vm_backup_checkpoint_failed`: the backup checkpoint that a broken chain stops from being taken

**Example:** A technician copies a machine's parent disk to new storage by hand, and its checkpoint chain no longer matches.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#hyperv_vm_vhd_chain_corrupted, https://sparklogs.com/reference/reasons/hyperv_vm_vhd_chain_corrupted.json

The machine keeps running while this holds, so nothing else reports it until a restore is attempted.

## `mdm_policy_apply_failed`: mdm policy apply failed

A device management command did not take effect on the device.

**Severity:** Warning, Notice or Info

**Why it matters:** On a refusal, a setting the MSP believes is enforced is not enforced, while the management console shows the policy as assigned.

**In practice:** The Windows MDM client writes events 201, 404, 454, 806 and 821 in Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin (201 also in /Sync, and 4022 in /Enrollment) when a command from Intune or another MDM service does not complete, with the status code and the configuration node it addressed. The status code decides what happened. Access denied (0x80070005) means the device refused the setting, and it refuses again at every sync; it is recorded at Warning. A not-found result (0x80070002) on 404 or 454 is the client checking a node it already knows is absent, and a too-many-requests result (0x801901AD) is the service asking the client to slow down; both are routine and recorded at Info. Other codes are recorded at Notice: one command did not complete, with no proof a setting is missing.

**When to ignore:** Info rows (a node known to be absent, or the service throttling the client) are routine.

**What to check:**

- Read the status code before the wording: two of the common outcomes here are not failures.
- On a refusal, the configuration node path and the policy area and name say which setting is missing.
- Check the device's status for that profile in the management console, and whether another policy or Group Policy sets the same thing.

**Related:**

- `bitlocker_policy_noncompliant`: the device reporting that it does not match an encryption policy

**Example:** A laptop refuses a device restriction policy with access denied at each Intune sync, and the MDM client logs the refusal with the policy area and setting.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#mdm_policy_apply_failed, https://sparklogs.com/reference/reasons/mdm_policy_apply_failed.json

This family repeats at the management sync cadence, so one unresolved setting produces many records.

## `patch_download_failed`: patch download failed

Windows Update could not download an update the device needed.

**Severity:** Warning

**Why it matters:** That update is not installed, and the device stays exposed to whatever it fixes until a later attempt succeeds.

**In practice:** Windows Update writes event 31 in Microsoft-Windows-WindowsUpdateClient/Operational when it found an update but could not download it, with the update's title and the error code. The codes on this event mostly mean the device ran out of disk space or memory. The client tries again on its own schedule.

**When to ignore:** A single failure followed by the update installing at a later attempt needs no action.

**What to check:**

- Read the error code beside the update title, and look it up in the Windows Update error reference.
- Check free space on the system drive and free memory on the device.
- A device failing every download is a different ticket from one that cannot reach the update service.

**Related:**

- `patch_scan_failed`: the device could not find out which updates it needed in the first place

**Example:** A laptop with almost no free space on C: fails to download a cumulative update, and Windows Update logs event 31 with the update's title.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#patch_download_failed, https://sparklogs.com/reference/reasons/patch_download_failed.json

The client retries on its own cycle, so a single record is not proof the update is stuck.

## `patch_scan_failed`: patch scan failed

A Windows Update scan did not complete, so the device was offered no updates on that cycle.

**Severity:** Warning or Info

**Why it matters:** A device that keeps failing its scans stops being patched, with no symptom a user would notice.

**In practice:** Windows Update writes event 25 in Microsoft-Windows-WindowsUpdateClient/Operational when a scan for updates fails, with the error code and the update service it asked. An unreachable-endpoint code (0x80240438) means the device could not reach the service it is set to use: a WSUS server that is down or moved, a proxy, or a firewall. An invalid-criteria code (0x80240032) means the program that asked for the scan sent a search Windows Update would not accept; it says nothing about the device and is recorded at Info. Any other code is a scan that did not complete for another reason.

**When to ignore:** Info rows with an invalid-criteria code, and single failures on a device that scans successfully on the next cycle.

**What to check:**

- Read the error code and the update service identifier together: they say which service was asked and why it failed.
- For an unreachable service, check the WSUS or update-source policy on the device and whether that server answers.
- The rate matters more than one record: a device failing every cycle is the ticket.

**Related:**

- `patch_download_failed`: the updates were found and the download failed

**Example:** A workstation still pointed at a decommissioned WSUS server fails its update scan with 0x80240438.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#patch_scan_failed, https://sparklogs.com/reference/reasons/patch_scan_failed.json

The update client retries on its own cycle, so single records are expected on a healthy device.

## `print_connection_reopen_failed`: print connection reopen failed

The print spooler could not read one profile's saved printer connections when it restarted.

**Severity:** Warning or Info

**Why it matters:** On a real user's profile, their mapped printers are gone until they reconnect or sign in again.

**In practice:** When the print spooler starts, it reopens the printer connections saved in each user profile, and writes event 603 in Microsoft-Windows-PrintService/Operational when it cannot read one profile's connections. The registry key in the event starts with the profile's security identifier. A real account (local, domain or Entra ID) is recorded at Warning. A built-in service account has no printer connections at all, so it is recorded at Info.

**When to ignore:** Info rows for built-in service accounts are routine.

**What to check:**

- Resolve the security identifier in the registry key to the user.
- Reconnect the user's printers, or have them sign out and in again.
- The same user on the same host at every spooler restart points at a damaged printer-connection key in that profile.

**Related:**

- `printer_driver_install_failed`: a driver failure that can also leave printer connections unusable

**Example:** After a workstation restart, a user's mapped printers are missing because the spooler could not read their saved connections.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#print_connection_reopen_failed, https://sparklogs.com/reference/reasons/print_connection_reopen_failed.json

Built-in service accounts produce this line as a matter of course, because they have no printer connections saved.

## `printer_driver_install_failed`: printer driver install failed

A printer driver did not install, and the stage and code say which part of the install failed.

**Severity:** Warning where an add or an import failed. Notice where the spooler was only asking the driver store whether it already held the driver.

**Why it matters:** The print queue that needed the driver does not work, and on a print server that affects everyone who prints to it.

**In practice:** The print spooler writes events 215, 225, 600, 601 and 869 in Microsoft-Windows-PrintService/Admin, and 213, 217 and 219 in Microsoft-Windows-PrintService/Operational, at the stages of a driver install: reading the inf, checking the signature, downloading the package, importing it into the driver store and adding the driver. The event names the driver, the stage and the result code. A lookup where the driver store answers that it does not hold the driver is not a failed install, and is recorded at Notice. Point and Print restrictions, a driver package that is not signed for this Windows version, or missing rights on the driver store are the usual causes of a real failure.

**When to ignore:** Notice rows where the driver store only answered not-found to a lookup.

**What to check:**

- Read the stage and the operation name first, then the code.
- An access-denied result is a permissions problem or a Point and Print restriction. A rejected signature is a driver this machine will not accept at all.
- Pivot on the driver name to tell one broken driver from a broken deployment, then install a current, signed package for that model.

**Related:**

- `print_connection_reopen_failed`: the reconnect failure users see after a driver problem
- `rds_redirected_printer_setup_failed`: the same driver dependency failing for a redirected session printer

**Example:** A user connects to a shared printer on a print server, and the driver add fails with access denied, logging event 215.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#printer_driver_install_failed, https://sparklogs.com/reference/reasons/printer_driver_install_failed.json

One install attempt can report from several of these ids, on both print channels.

## `scheduled_task_engine_failed`: scheduled task engine failed

Task Scheduler could not start the host process a scheduled task runs inside.

**Severity:** Warning or Info

**Why it matters:** Where the cause is not an absent session, scheduled tasks that need that engine do not run on the machine while it holds.

**In practice:** Task Scheduler writes event 311 in Microsoft-Windows-TaskScheduler/Operational when it cannot start a task engine process, with the result code, the internal call that failed and the process it tried to start. A not-logged-on result (0x800704DD) means a per-user engine had no signed-in session to start in; a workstation with nobody signed in produces it routinely, and it is recorded at Info. Any other result is the engine failing to start, recorded at Warning.

**When to ignore:** Info rows with a not-logged-on result are routine on a machine nobody is signed in to.

**What to check:**

- Read the result code before the wording: not-logged-on means a per-user engine had no session to start in.
- For any other code, check whether the machine's other scheduled tasks are running (Last Run Result in Task Scheduler, or `Get-ScheduledTaskInfo`).
- If none are, restart the machine and check again.

**Related:**

- `scheduled_task_start_failed`: one task did not start, rather than the engine that runs them

**Example:** On a shared workstation with nobody signed in, Task Scheduler logs event 311 with a not-logged-on result for a per-user task engine.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#scheduled_task_engine_failed, https://sparklogs.com/reference/reasons/scheduled_task_engine_failed.json

A per-user task engine only starts when that user has a session, so this line is expected on a machine nobody is signed in to.

## `scheduled_task_load_failed`: scheduled task load failed

A scheduled task definition could not be read at service start, so the task is not in the schedule at all.

**Severity:** Notice for a Microsoft task whose definition is not found, Warning for any other code or task.

**Why it matters:** The task is gone rather than failing, so nothing else reports that its work has stopped.

**In practice:** Task Scheduler writes events 146 and 151 in Microsoft-Windows-TaskScheduler/Operational, as a pair for the same task, when it cannot load a task definition as the service starts. The task then does not run and does not show failed runs later: it is absent until it is registered again. A not-found result on a task under \Microsoft\ is a Windows or Microsoft component task the current build no longer carries, restated at every service start, and is recorded at Notice. Any other task is a job that fell off the schedule, often one a product installed and then left behind or a definition damaged on disk.

**When to ignore:** Notice rows for Microsoft tasks whose definition is not found are leftovers of earlier Windows or Office builds.

**What to check:**

- Read the task path and the result code.
- Re-register the task from its source: the tool that created it, or an exported definition.
- Check the other tasks registered by the same tool, which often fail together.

**Related:**

- `scheduled_task_start_failed`: the task is in the schedule and its runs are failing

**Example:** After a backup agent upgrade, Task Scheduler cannot load the agent's nightly pre-job task at service start and logs events 146 and 151.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#scheduled_task_load_failed, https://sparklogs.com/reference/reasons/scheduled_task_load_failed.json

The two event ids report one load attempt twice, so they arrive as a pair for the same task.

## `scheduled_task_sign_in_failed`: scheduled task sign in failed

Task Scheduler could not log on as the account a scheduled task stores, so the task did not run.

**Severity:** Warning

**Why it matters:** Every task registered to that account is in the same state, and none of them is running.

**In practice:** Task Scheduler writes event 104 in Microsoft-Windows-TaskScheduler/Operational when it cannot log on as the run-as account a task stores, with the account name and the result code. A logon failure result (0x8007052E) usually means the account's password changed or expired after the task stored it, or the account was disabled or locked out. The task does not run again until someone enters a current password.

**What to check:**

- Pivot on the account rather than the task: one changed password stops every task that stores it.
- Check the account for an expired password, a lockout or a disabled state.
- Re-enter the credential in each task's properties, or with `Set-ScheduledTask -User -Password`.

**Related:**

- `scheduled_task_start_failed`: the task started and the launch failed, rather than the logon

**Example:** A service account's password is changed, and the nightly backup task registered with it fails to log on, logging event 104.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#scheduled_task_sign_in_failed, https://sparklogs.com/reference/reasons/scheduled_task_sign_in_failed.json

A service-account password change is the usual cause, and the tasks stop silently.

## `scheduled_task_start_failed`: scheduled task start failed

A scheduled task did not run, and the result code says whether the program was missing, the identity was refused, or the action itself failed.

**Severity:** Warning where a named automation stopped running. Notice where a task in the Microsoft task folder failed or was refused, and lower still where Windows removed the program it points at.

**Why it matters:** Whatever that task does is not being done. On a backup pre-job or a patch orchestration task, that is a gap nothing else reports.

**In practice:** Task Scheduler writes events 101, 103, 202 and 203 in Microsoft-Windows-TaskScheduler/Operational when a task fails to start or its action fails, at the provider's Error level, with the task path and the result code. A file-not-found or path-not-found result (0x80070002, 0x80070003) means the program the task points at is not there. Access denied (0x80070005) means the account the task runs as was refused. Tasks under \Microsoft\ are Windows and Microsoft component maintenance that retries on its own schedule, so they are recorded lower than anyone else's task. Not collected: the Windows Update orchestrator notification broker task (USO_UxBroker) reporting its own program missing, which Windows removed and nobody can fix.

**When to ignore:** Debug and Notice rows for tasks under \Microsoft\ are Windows maintenance retrying on its own schedule, unless the same task fails for weeks.

**What to check:**

- Read the result code first, then the task path.
- For a missing program, check the path in the task's action and reinstall or repoint it.
- For access denied, check the run-as account's rights to the program and its folder.
- Pivot on the task path to see whether one task fails every time it is triggered.

**Related:**

- `scheduled_task_load_failed`: the task never entered the scheduler at all, rather than failing to start
- `scheduled_task_sign_in_failed`: the stored run-as credential was refused

**Example:** A backup vendor's pre-job task points at a script that was deleted, and Task Scheduler logs event 203 with a file-not-found result every night.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#scheduled_task_start_failed, https://sparklogs.com/reference/reasons/scheduled_task_start_failed.json

The four event ids report one launch from four places, so a single failed run can produce more than one of them.

## `win_locale_registry_read_failed`: win locale registry read failed

A process could not open the registry key holding the machine or user locale settings, and fell back to a default.

**Severity:** Warning

**Why it matters:** Nothing is unavailable while this fires. It points at a damaged profile or permissions on that host.

**In practice:** Windows writes event 1001 in Microsoft-Windows-International/Operational each time a process cannot open the registry key that holds locale settings, with the key path and the error code. The key is usually the per-user Control Panel\International key, so the fault is in that user's profile or its permissions. The process carries on with a default, and the event repeats on every call, so one process in a loop produces thousands of records.

**What to check:**

- Read the registry key path and the error code: they separate a machine-wide fault from one user's profile.
- Check the permissions on that key for the account the process runs as.
- If the profile is damaged, rebuild it.

**Related:**

- `win_user_profile_load_failed`: the broader profile-load failure this registry damage can also cause

**Example:** A service running under an account with a damaged profile logs event 1001 for Control Panel\International on every call.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-management#win_locale_registry_read_failed, https://sparklogs.com/reference/reasons/win_locale_registry_read_failed.json

The calling process continues with a default locale, so this is evidence of damage rather than an outage.
