<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.management`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `bitlocker_policy_noncompliant` | `device_management` | Warning where the operating-system volume is the one out of compliance. Notice for a data volume or where the event cannot say which drive it is about. |  |
| `bits_transfer_failed` | `patching` | Warning |  |
| `dfsr_partner_communication_failed` | `directory_services` | Warning |  |
| `dfsr_replication_stopped` | `directory_services` | Serious or Warning |  |
| `dfsr_sysvol_initial_sync_pending` | `directory_services` | Warning |  |
| `hyperv_replication_failed` | `virtualization` | Warning or Notice |  |
| `hyperv_vm_backup_checkpoint_failed` | `virtualization` | Warning, Notice or Info | benign possible |
| `hyperv_vm_start_failed` | `virtualization` | Warning |  |
| `hyperv_vm_storage_request_slow` | `virtualization` | Warning for a slow request. Minor where the request took more than thirty seconds. |  |
| `hyperv_vm_vhd_chain_corrupted` | `virtualization` | Serious or Info | benign possible |
| `mdm_policy_apply_failed` | `device_management` | Warning, Notice or Info | benign possible |
| `patch_download_failed` | `patching` | Warning |  |
| `patch_scan_failed` | `patching` | Warning or Info | benign possible |
| `print_connection_reopen_failed` | `printing` | Warning or Info | benign possible |
| `printer_driver_install_failed` | `printing` | Warning where an add or an import failed. Notice where the spooler was only asking the driver store whether it already held the driver. |  |
| `scheduled_task_engine_failed` | `scheduled_tasks` | Warning or Info | benign possible |
| `scheduled_task_load_failed` | `scheduled_tasks` | Warning |  |
| `scheduled_task_sign_in_failed` | `scheduled_tasks` | Warning |  |
| `scheduled_task_start_failed` | `scheduled_tasks` | Warning where a named automation stopped running. Lower where the task ships with Windows and the program it points at was removed by Windows. |  |
| `win_locale_registry_read_failed` | `user_profiles` | Warning |  |

## `bitlocker_policy_noncompliant`

A device does not match the BitLocker encryption policy set for it: a drive is unencrypted, or encrypted with a method or scope the policy does not allow.

**Severity:** Warning where the operating-system volume is the one out of compliance. Notice for a data volume or where the event cannot say which drive it is about.

**Impact:** An unencrypted operating-system volume means every file on the machine is readable to anyone who takes it.

**Consider:**

- Read the drive role first, then the drive status bits.
- Two of these event ids cannot say which drive they are about. Pair them with the device's own encryption state.
- This repeats at the management sync cadence, so one device produces many records for one finding.

The management client is the authority on what the policy requires. The device's own state reading says what the volume is, without knowing the policy.

## `bits_transfer_failed`

A Background Intelligent Transfer Service job reported an error on one transfer attempt.

**Severity:** Warning

**Consider:**

- Pivot on the job name and the result code to find a destination or a code that keeps repeating.
- For an update download, read the outcome from the Windows Update records in the Setup channel.

BITS retries a failed transfer, so these records come in runs. The stream is rate-bounded: one record per job and result code per device per hour, with the count of what an hour suppressed carried on the next hour's first record. A job and code that reappear hour after hour, with no completed transfer between them, is the shape worth reading.

## `dfsr_partner_communication_failed`

DFS Replication could not reach a replication partner for a replication group.

**Severity:** Warning

**Impact:** Content does not converge with that partner while the link is down.

**Consider:**

- Read the rate against the service's own reconnection records on the same host.
- A link that flaps and recovers is ordinary on a wide-area connection.

The partner and the replication group are named in the message text rather than in fields, because these events carry no named payload.

## `dfsr_replication_stopped`

DFS Replication stopped replicating a folder or a volume, or stopped because it could not read its own configuration.

**Severity:** Serious or Warning

**Impact:** Every member of that replication group keeps serving its own copy, and the copies diverge with nothing visible to the people using them.

**Consider:**

- The offline-too-long case needs a deliberate resume. It will not restart by itself.
- A database recovery failure on a volume needs the replication database rebuilt.
- Check the folder's other members before resuming, so the copy that wins is the one you want.

The replicated folder, the partner and the directory server are named in the message text rather than in fields, because these events carry no named payload.

## `dfsr_sysvol_initial_sync_pending`

A server holds a SYSVOL copy that has never completed its first synchronisation with a partner.

**Severity:** Warning

**Impact:** Policy and logon scripts are not served from that copy, and a domain controller promotion that was in progress has not finished.

**Consider:**

- Check whether the named partner is reachable and replicating.
- This does not resolve on its own if the partner never answers.

The partner and the local path are named in the message text rather than in fields, because these events carry no named payload.

## `hyperv_replication_failed`

Hyper-V could not replicate a virtual machine to its replica server.

**Severity:** Warning or Notice

**Impact:** The recovery copy of that machine stops being updated and gets older, with nothing visible to anyone using the machine.

**Consider:**

- Check whether the replica server is reachable at all: the server and port are named in the message text.
- A stated retry means the host will try again on its own. Repeated unreachable records are the ones that matter.

The machine keeps running throughout, so nobody finds out the copy is stale until they need it.

## `hyperv_vm_backup_checkpoint_failed`

A backup of a virtual machine did not take a consistent snapshot.

**Severity:** Warning, Notice or Info

**Impact:** The backup either did not run or ran without being application-consistent, so the restore point it produced is weaker than it looks.

**Consider:**

- Read the result code: a snapshot set already in progress is two jobs overlapping and is fixed by scheduling.
- A file-already-exists result is a stale checkpoint file left behind by an earlier failure.
- The integration-service line is a per-machine setting rather than a failure of this run.

A failed guest writer still usually leaves a crash-consistent copy, which is not the same as no backup at all.

## `hyperv_vm_start_failed`

A virtual machine, or the worker process that runs one, did not start.

**Severity:** Warning

**Impact:** A workload that was supposed to be running is not, and on the memory ids the host did not have room for it.

**Consider:**

- Check the host's free memory when the worker ids are the ones reporting.
- The machine name is the pivot: one machine failing every start is a different ticket from a host that is full.

These templates carry no result code, so the machine name and the id are what the row offers.

## `hyperv_vm_storage_request_slow`

A storage request a virtualization host made for one of its guests took longer than expected to complete.

**Severity:** Warning for a slow request. Minor where the request took more than thirty seconds.

**Impact:** Every guest on that host shares the same storage path, so a steady rate of these degrades all of them.

**Consider:**

- Read the rate before the duration: one slow request is a flake.
- The virtual disk the request was against is named in the message text.

The duration measures one request rather than how long a condition has held.

## `hyperv_vm_vhd_chain_corrupted`

A differencing virtual disk and its parent disagree on the parent identity, so the disk chain cannot be merged or checkpointed.

**Severity:** Serious or Info

**Impact:** Checkpoints and backups of that machine are not usable, and the chain grows while the merge keeps failing.

**Consider:**

- Stop taking checkpoints of that machine and repair the chain before anything merges it.
- Watch the volume the chain lives on: a merge that keeps failing is how it fills.

The machine keeps running while this holds, so nothing else reports it until a restore is attempted.

## `mdm_policy_apply_failed`

A device management command did not take effect on the device.

**Severity:** Warning, Notice or Info

**Impact:** A setting the MSP believes is enforced is not enforced, and the management console will not say so.

**Consider:**

- Read the status word before the wording: two of the common outcomes here are not failures.
- On a refusal, the configuration node path and the policy name say which setting is missing.

This family repeats at the management sync cadence, so one unresolved setting produces many records.

## `patch_download_failed`

Windows Update could not download an update the device needed.

**Severity:** Warning

**Impact:** That update is not installed and will not be until a later attempt succeeds.

**Consider:**

- Read the code beside the update title: disk space and memory are the usual causes.
- A device failing every download is a different ticket from one that cannot reach the service.

The client retries on its own cycle, so a single record is not proof the update is stuck.

## `patch_scan_failed`

A Windows Update scan did not complete, so the device was offered no updates on that cycle.

**Severity:** Warning or Info

**Impact:** A device that keeps failing its scans stops being patched, with no symptom a user would notice.

**Consider:**

- Read the code and the update service identifier together: they separate an unreachable service from a caller defect.
- The rate matters more than one record: a host failing every cycle is the ticket.

The update client retries on its own cycle, so single records are expected on a healthy device.

## `print_connection_reopen_failed`

The print spooler could not read one profile's saved printer connections when it restarted.

**Severity:** Warning or Info

**Impact:** On a real user's profile, their mapped printers are gone until they reconnect or sign in again.

**Consider:**

- The same user on the same host at every spooler restart is the signal, rather than a single record.

Built-in service accounts produce this line as a matter of course, because they have no printer connections saved.

## `printer_driver_install_failed`

A printer driver did not install, and the stage and code say which part of the install failed.

**Severity:** Warning where an add or an import failed. Notice where the spooler was only asking the driver store whether it already held the driver.

**Impact:** The print queue that needed the driver does not work, and on a print server that affects everyone who prints to it.

**Consider:**

- Read the stage and the operation name first, then the code.
- An access-denied result is a permissions problem on the driver store. A rejected signature is a driver the machine will not accept at all.
- Pivot on the driver name to tell one broken driver from a broken deployment.

One install attempt can report from several of these ids, on both print channels.

## `scheduled_task_engine_failed`

Task Scheduler could not start the host process a scheduled task runs inside.

**Severity:** Warning or Info

**Impact:** Where the cause is not an absent session, nothing scheduled runs on that machine while it holds.

**Consider:**

- Read the result code before the wording: a not-logged-on code means a per-user engine had no session to start in.
- Any other cause is worth checking against whether the machine's other scheduled work is running.

A per-user task engine only starts when that user has a session, so this line is expected on a machine nobody is signed in to.

## `scheduled_task_load_failed`

A scheduled task definition could not be read at service start, so the task is not in the schedule at all.

**Severity:** Warning

**Impact:** The task is gone rather than failing, so nothing else reports that its work has stopped.

**Consider:**

- Re-register the task from source.
- Check the other tasks registered by the same tool, which often go together.

The two event ids report one load attempt twice, so they arrive as a pair for the same task.

## `scheduled_task_sign_in_failed`

Task Scheduler could not log on as the account a scheduled task stores, so the task did not run.

**Severity:** Warning

**Impact:** Every task registered to that account is in the same state, and none of them is running.

**Consider:**

- Re-register the task with a current credential.
- Pivot on the account rather than the task: one changed password stops every task that stores it.

A service-account password change is the usual cause, and the tasks stop silently.

## `scheduled_task_start_failed`

A scheduled task did not run, and the result code says whether the program was missing, the identity was refused, or the action itself failed.

**Severity:** Warning where a named automation stopped running. Lower where the task ships with Windows and the program it points at was removed by Windows.

**Impact:** Whatever that task does is not being done. On a backup pre-job or a patch orchestration task, that is a gap nothing else reports.

**Consider:**

- Read the result code first, then the task path.
- A missing program on a management, backup or patch task is a broken automation nobody will notice any other way.
- Pivot on the task path to see whether one task fails every time it is triggered.

The four event ids report one launch from four places, so a single failed run can produce more than one of them.

## `win_locale_registry_read_failed`

A process could not open the registry key holding the machine or user locale settings, and fell back to a default.

**Severity:** Warning

**Impact:** Nothing is unavailable while this fires. It points at profile or permission damage on that host.

**Consider:**

- Read the registry key path: it separates a machine-wide fault from one user's profile.
- The rate is the whole signal, since one process in a loop produces thousands of records.

The calling process continues with a default locale, so this is evidence of damage rather than an outage.
