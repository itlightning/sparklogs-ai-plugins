---
index: Scheduled task did not run or failed
aliases:
  - label: Nightly script did not run
  - label: Scheduled task disabled or missing
---

# Scheduled task did not run or failed

**Trigger.** "The nightly script did not run", "the backup pre-job task fails every night", "the cleanup task stopped working after the password change", or a scheduled-task reason on a device.

**Accuracy.** Task Scheduler's operational log says what the scheduler did: it launched a task, could not launch it, could not sign in as its account, skipped it, stopped it, or saw it registered, changed, disabled or deleted.
SparkLogs does not keep the scheduler's routine run records: a time trigger firing (107), task started (100), process created (129), action started (200), action completed with exit code 0 (201) and task completed (102). A task that ran on a time trigger and succeeded leaves no row here.
It keeps the other trigger records, each with the task path in `event_data.TaskName` (LQL): an event trigger (108), the task's registration (109), a run on demand from Task Scheduler, `schtasks /run` or another program (110), idle (117), boot (118) and logon (119), and a launch request the scheduler queued (325). A task started any of those ways leaves a row when it fired.
An action that completed with a non-zero exit code is kept as `scheduled_task_action_failed` (value), with the code in `sparklogs.result.code` (LQL). The code is whatever the program returned: a program that reports failure with exit code 0, or does not report it at all, looks the same here as a success. Its own log, the task's Last Run Result on the device (Task Scheduler History, `Get-ScheduledTaskInfo`), or the program's events on the Application channel say whether the work succeeded.
So no failure rows for a task does not prove it ran or that its job worked. It proves only that the scheduler logged no launch, logon or load failure and no non-zero exit for it.
Security log task changes (4698 to 4702) appear only when Audit Other Object Access Events is on; many devices have it off. Task Scheduler's own records of a task being registered, updated, deleted or disabled are kept either way.

**Feeds.** Task Scheduler is the channel `Microsoft-Windows-TaskScheduler/Operational` on `subsource` (LQL) `win.eventlog.management` (value), service `scheduled_tasks` (value): `feeds/win.eventlog.management/reasons.md` and `fields.md`.
Name `provider_name = "Microsoft-Windows-TaskScheduler"` (LQL) on every raw event id: the same feed carries other providers that reuse ids (Volume Snapshot Driver also writes 106).
The task path is `win.eventlog.management.task_name` (LQL) on the failure reasons and `event_data.TaskName` (LQL) on every Task Scheduler record; on logon failure 104 Windows writes the path in `event_data.UserName` (LQL), which SparkLogs also carries as `win.eventlog.management.task_name` (LQL), and the account is not on the record (see **Credential problems**).
The result code is `sparklogs.result.code` (LQL), with its name in `sparklogs.result.code_name` (LQL) when SparkLogs knows it. A code with no name is usually an HRESULT a component returned (0x80040154 is a COM class that is not registered).
The program a launch failure points at is `event_data.ActionName` (LQL) on 203.
Security task changes are on `win.eventlog.security` (value) with the task path in `sparklogs.config_change.target` (LQL) and the account that made the change in `sparklogs.actor.name` (LQL): `feeds/win.eventlog.security/reasons.md`.

**Which failure it is.** Each shape has its own witness and its own next step:

| What happened | Witness | Next |
|---|---|---|
| Launched and failed to start the program, or a built-in action returned a failure | `scheduled_task_start_failed` (value) (101, 103, 202, 203) with a result code | **Start failures** |
| Ran, and the program exited with a failure code | `scheduled_task_action_failed` (value) (201) with the exit code | The program's own log for that run |
| Could not sign in as the task's account | `scheduled_task_sign_in_failed` (value) (104), with a 101 for the same run | **Credential problems** |
| Not in the schedule at all | `scheduled_task_load_failed` (value) (146 and 151 at service start) | Re-register the task from its source |
| The process tasks run inside would not start | `scheduled_task_engine_failed` (value) (311) | Every task needing that engine is down |
| Missed its time | 153 (missed, not run) or 114 (run late, at the next chance) | **Device off or asleep** |
| Ran too long or was stopped | 329 (exceeded its time limit), 322 (skipped because the previous run is still going), 327 and 328 (stopped for battery or idle end) | **Ran too long** |
| Not launched by design | 332 (its user was not signed in), 326 (on battery) | Its settings, not a fault |
| Switched off or removed | 142 or `scheduled_task_disabled` (value) (4701); 141 or `scheduled_task_deleted` (value) (4699) | **Changed, disabled or deleted** |

101, 103 and 203 report one failed launch from three places, so a single failed run can give two or more rows: count runs, not rows.
202 is different: the action started and then returned a failure, usually a built-in COM-handler action under `\Microsoft\` (see **A number with no name**).
`scheduled_task_action_failed` (value) is kept as one row per task and exit code each hour, so a count of its rows is a count of failing hours, not of failed runs.

**Device health first.** No device-state topic tracks tasks; device health answers the questions around a task.
Was the device on and awake at the scheduled time? Read the device's overview and its timeline of boots, shutdowns, sleeps and wakes (`host_booted` (value), `host_shutdown` (value), `host_sleep_entered` (value), `host_sleep_exited` (value), `host_resume_settled` (value)) with `query_device_health` (tool); how to read them is in `guides/device-state-fields.md`.
Is the product the task belongs to still installed? Its `installed_products` (value) row names the product, version and install folder (`fields/topic-installed-products.md`).

**Events.** Every Task Scheduler failure on the device:

```lql
source = "<host>" AND subsource = "win.eventlog.management" AND service = scheduled_tasks AND sparklogs.reason!
```

Group by `sparklogs.reason` (LQL), `win.eventlog.management.task_name` (LQL) and `sparklogs.result.code_name` (LQL).
The Microsoft task folder (`\Microsoft\`) holds Windows and Office maintenance that retries on its own schedule; those rows are Notice or lower and rarely need work.
A few Windows and Microsoft tasks outside that folder (`\SoftLanding\`, the OneDrive and Edge updaters) are graded the same way. Other vendors' updaters and maintenance tasks are read at the same band as anyone else's automation: check the path before calling one a customer's job.

One task's whole history, failures and schedule records together:

```lql
source = "<host>" AND subsource = "win.eventlog.management" AND provider_name = "Microsoft-Windows-TaskScheduler" AND event_data.TaskName: "<task name>"
```

Group by `event_id` (LQL) over time. 108, 109, 110, 117, 118 and 119 are the task's trigger firing, and 325 a launch queued: the launch evidence for any task not started by a time trigger.
A task registered and deleted again and again (106, 141) is software recreating it. A run of 153 after each boot is a schedule the device keeps missing.

**Start failures.** Read the result code first, then the task path:

- **Program not there** (ERROR_FILE_NOT_FOUND, ERROR_PATH_NOT_FOUND). `event_data.ActionName` (LQL) on 203 is the path the task points at. Usual causes: the product was uninstalled and left its task behind (its `installed_products` (value) row is gone, often replaced by another product of the same kind); an update moved the program to a new versioned folder; the path has a space and no quotes, so Windows looks for the part before the space; or the script is on a mapped drive or share the task's account cannot reach. A task left behind by a removed product is deleted, not repaired.
- **Refused** (ERROR_ACCESS_DENIED). The task's account lacks rights to the program or its folder.
- **Needs elevation** (ERROR_ELEVATION_REQUIRED). The program asks for administrator rights and the task does not run with highest privileges. A vendor updater that fails this way on every trigger fills the log; the fix is the task's setting or the vendor's update.
- **No session** (ERROR_NOT_LOGGED_ON). The task runs only when its user is signed in, and they were not.
- **Shutting down** (ERROR_SHUTDOWN_IN_PROGRESS, arm `shutdown_in_progress` (value)). The trigger fired during a shutdown, and the task runs again at its next trigger. Not a fault.
- **Refused by a condition** (ERROR_REQUEST_REFUSED). A condition in the task (on battery, not idle, no network) or a policy stopped the start.
- **Account codes** (ERROR_LOGON_FAILURE, ERROR_ACCOUNT_DISABLED, ERROR_ACCOUNT_LOCKED_OUT, ERROR_LOGON_TYPE_NOT_GRANTED, ERROR_NO_LOGON_SERVERS): **Credential problems**.
- **A number with no name.** Convert a large decimal to hex before looking it up (2147942402 is 0x80070002, file not found).
  On 202 the code is whatever the COM handler returned, so a decoded Win32 name can mislead: 4 shown as ERROR_TOO_MANY_OPEN_FILES or 1067 as ERROR_PROCESS_ABORTED is the handler's own value. Those tasks under `\Microsoft\` are platform maintenance.

Several tasks from one vendor failing together point at that product's install, not at each task.

**Launched, then did nothing.** A program the task started that exits with an error leaves no Task Scheduler failure here. For scripts the usual causes are PowerShell's execution policy blocking the script, a missing "Start in" folder so relative paths fail, and a script waiting on a prompt nobody sees. Last Run Result shows the exit code. When the task runs PowerShell, the script's own records are in `playbooks/powershell-script-blocks.md`.

**Credential problems.** A task that stores a password keeps the password it was given. When the account's password changes, expires, or the account is disabled or locked, every task stored with that account stops, silently, until someone enters the new password.
Event 104 names the task and the step that failed (`win.eventlog.management.task_error_description` (LQL)), not the account. The sign-in attempt itself is a Security 4625 with logon type 4 (batch), written at the same second:

```lql
source = "<host>" AND subsource = "win.eventlog.security" AND sparklogs.reason = sign_in_failed AND win.eventlog.security.logon_type = 4
```

Group by `sparklogs.actor.name` (LQL) and `win.eventlog.security.status_meaning` (LQL): the account and why it was refused.
`bad_password` (value) is a password changed after the task stored it; `account_disabled` (value) and a lockout are the account's state; `unknown_username` (value) is an account renamed or deleted; `no_logon_servers` (value) is a domain account on a device that could not reach a domain controller at run time, typically a laptop off the network.
Error 1385 (ERROR_LOGON_TYPE_NOT_GRANTED) means the account lacks Log on as a batch job, usually through Group Policy (`logon_right_removed` (value) when audited).
Rows with no account and `no_credentials_available` (value) are credential-free probes, not the task.
Then pivot on the account, not the task: what else stores it (other tasks, services in `playbooks/service-failures.md`), and what changed on the account (`account_changed` (value), `account_password_reset` (value), `account_disabled` (value), `account_locked_out` (value)) on this device for a local account, or on the domain controllers for a domain account.
Repeated failures from a task with a stale password can themselves lock the account out. The lockout trail is in the domain controllers' Security logs.
A task set to run whether the user is signed in or not, with "Do not store password" ticked, runs without network credentials: it starts, and then shares and other servers refuse it. The task shows no sign-in failure, and the refusals are on the far server.
With the policy "Network access: Do not allow storage of passwords and credentials for network authentication" enabled, Windows refuses to save a task's password ("A specified logon session does not exist"), so such a task cannot be created or edited to store one.

**Device off or asleep.** A task due while the device was off or asleep does not run at that time.
114 says it ran as soon as the device was available because it is set to start when available; 153 says it was skipped for that time and runs only at its next trigger.
Both usually come within minutes of a `host_booted` (value) or `host_resume_settled` (value) on the device's timeline. A 153 far from any boot or wake points at the task's own triggers, or at a clock change (`host_clock_stepped` (value)).
A nightly job on a workstation that is shut down each evening never runs; the fix is the schedule, the task's start-when-available setting, or a wake timer with the power plan allowing it, not the task's program.

**Ran too long.** 329 is the scheduler ending the task at the execution time limit its definition sets (three days unless changed). The work stopped partway.
322 says a run was skipped because the previous one was still running, which is how a hung or slow job shows up: one long run, then a 322 at every later trigger.
Look for what the program waited on at that time: a share, a database, a network path, or a disk under load (device health for the device and window).
327 and 328 are the scheduler stopping a task because the device went onto battery or stopped being idle, as its conditions say.

```lql
source = "<host>" AND subsource = "win.eventlog.management" AND provider_name = "Microsoft-Windows-TaskScheduler" AND event_id in (114, 153, 322, 326, 327, 328, 329, 332)
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_id` (LQL) and `event_data.TaskName` (LQL). These records are routine for Windows and updater tasks; read them for the task in the ticket.

**Changed, disabled or deleted.** A task that simply stopped, with no failures, was often switched off, removed or rewritten.
Task Scheduler's own records, kept whether or not Security auditing is on:

```lql
source = "<host>" AND subsource = "win.eventlog.management" AND provider_name = "Microsoft-Windows-TaskScheduler" AND event_id in (106, 140, 141, 142)
```
<!-- confirmed with data on 2026-11-12 -->

106 registered, 140 updated, 141 deleted, 142 disabled, each with the account that did it in the message. Windows and updaters rewrite their own tasks constantly: narrow to the task in the ticket.
Where Security auditing is on, the same changes carry the task's definition (what it runs, when, as whom) in the message:

```lql
source = "<host>" AND sparklogs.reason in (scheduled_task_created, scheduled_task_updated, scheduled_task_disabled, scheduled_task_deleted)
```

Group by `sparklogs.config_change.target` (LQL) and `sparklogs.actor.name` (LQL). Compare an update's command, arguments, account and schedule with the previous definition of the same task.
An empty result here is not proof nothing changed: the audit setting may be off on this device.
Placing a task change among the device's other changes before the first failure: `playbooks/what-changed.md`.

**A task you did not expect.** A new or rewritten task is also a common way to keep a program running. Programs in a user's AppData folder are normal for per-user updaters (meeting, sync and chat clients); what needs a closer read is a task in the root folder with a random or misleading name, a script host (PowerShell, wscript, mshta) with encoded or downloaded content in its arguments, a run-as account changed to SYSTEM, or a browser or updater nobody installed.
When the task runs PowerShell, read the script blocks it ran at its trigger times: `playbooks/powershell-script-blocks.md`.
A suspected intrusion goes to the endpoint protection product and its console (`themes/endpoint-protection.md`).

**One device or many.** Run the same reason over the organization grouped by `source` (LQL) and `win.eventlog.management.task_name` (LQL).
The same task failing with the same code on many devices is one cause: a product removed or upgraded everywhere, a Group Policy or RMM-deployed task with a stale path or account, or one service account's password change.
Fix it at the source that deploys the task, then confirm the failures stop.

**Not this playbook.**
A Windows service that will not start: `playbooks/service-failures.md`.
A backup job's own result, when the task launched it: the backup product's console; VSS plumbing in `playbooks/windows-vss.md`.
Windows Update's own orchestrator tasks: `playbooks/windows-update-failure.md`.

**When to stop.** A task with no Task Scheduler failure, running a program that writes no events, ends what SparkLogs can say.
Report the launch evidence: for a task not started by a time trigger, its trigger row (108, 109, 110, 117, 118, 119 or 325) with its time. For a time trigger, report that the device was on and awake at the scheduled time. Then read Last Run Result and the program's own log on the device.

**Off-endpoint** (HM21): the directory where the account's password and state changed, the console that deployed the task, the program's own log, the share or server it needed.
