---
index: Service will not start, keeps stopping or hangs
aliases:
  - label: Service crashing and restarting
  - label: Automatic service stopped
---

# Windows service will not start, keeps stopping or hangs

**Trigger.** "The backup service keeps stopping", "the print spooler will not start", "the database service is down after a reboot", or a SparkLogs condition for a service that is not running.

**Accuracy.** Service Control Manager records what Windows did to a service: a failed start and its error, a crash and the recovery action, a timeout, a stop with an error code.
It does not record why the program failed. That is in the program's own events, usually on the Application channel, or in a vendor log file SparkLogs does not collect.
The services inventory is a reading taken every few hours plus the agent's watched conditions, so it says what state the service was in when read, not every transition between readings.
Trigger-start services, which Windows starts only when something asks for them, and delayed-start services still inside their grace after boot are not judged as down.
Most Service Control Manager records are routine: a single timeout or hang at boot, shutdown or an update install, for a service that runs afterwards, is not a fault.
So is a kernel driver service that fails at every boot because its hardware is absent or its driver was removed (an old parallel-port or chipset driver left behind), or one Windows blocks by design, such as the UAC file virtualization driver luafv on a server.

**Feeds.** Service Control Manager and DCOM events are on `subsource` (LQL) `win.eventlog.system` (value): `feeds/win.eventlog.system/reasons.md` and `fields.md`.
The reasons identify a service failure, not the `service` (LQL) token: that follows what the failing service does, so a Print Spooler crash files under `printing` (value) and an update service under `patching` (value).
The service and its error are `win.eventlog.system.service_name` (LQL) and `win.eventlog.system.service_error` (LQL); the error is a Windows message reference such as `%%1068`, which is Windows error 1068 (`net helpmsg 1068`).
The name is as Windows wrote it: the short name on start failures, the display name on crashes. Crashes also carry `win.eventlog.system.crash_count` (LQL) and the subject `sparklogs.instance` (LQL), `service:` followed by the lowercased short name, the same subject the services inventory uses.
State and conditions are `sparklogs.device.state` (value), topic `services` (value): `fields/topic-services.md`.
Service crashes are occurrences, so a device's crash timeline lists them beside process crashes and boots.

**Which failure it is.** Each shape has its own witness and its own next step:

| What happened | Service Control Manager witness | Device state |
|---|---|---|
| Never started | `service_start_failed` (value) (7000) with the error; `service_start_timeout` (value) (7009) before error 1053; a dependency that failed (7001) or is missing (7003); an account that could not sign in (7038) | `service_auto_not_running` (value) |
| Started, then stopped with an error | `service_exited_with_error` (value) (7023 Windows error, 7024 the service's own code) | `service_auto_not_running` (value) |
| Crashed | `service_crashed` (value) (7031 with a recovery action, 7034 without) | `service_flapping` (value) from 2 crashes in a day |
| Hung starting or stopping | `service_hung_starting` (value) (7022), `service_hang` (value) (7011) | `service_stuck_pending` (value) |
| Turned off | start type change (7040) | `service_start_type_changed` (value) |

**Device health first.** Ask `query_device_health` (tool) for the device's open service conditions over a window of days: conditions that opened before a narrow window may not appear in it.
Read the severity before anything else. It rises with how long the service has been down and how much it matters on this machine (`sparklogs.data.services[].service_tier` (LQL)): an important or critical service shows within minutes, an ordinary service on a workstation stays at Display.
Some ordinary services stop with an error by design; an ordinary service at Display with no user report rarely needs work.
The age basis says whether the onset was watched; `observed` (value) makes the age a lower bound (`guides/device-state-fields.md`, **Observation limits**).
No condition is not proof the service runs. A service in the suppress tier is not judged, a service that stopped cleanly with exit code 0 raises none, and neither does a trigger-start service.
For the service the ticket names, always read its row in the device's current state: its state, start type, account and command line, and for a stopped service its exit code and the code's name.

The exit code names the next step:

- ERROR_SERVICE_DEPENDENCY_FAIL (1068) or ERROR_SERVICE_DEPENDENCY_DELETED (1075): a service it depends on failed or is gone. Several services down on one device with 1068 point at one shared dependency: find it in 7001.
- ERROR_SERVICE_SPECIFIC_ERROR (1066): the service returned its own code, in `sparklogs.data.services[].stopped_service_specific_code` (LQL). Only the vendor defines it. Read the program's own events on the Application channel at the start attempt: a database engine, for example, logs the failure that stopped it under its instance name.
- ERROR_PROCESS_ABORTED (1067): the process ended without reporting a code, which is a crash: read the crash.
- ERROR_SERVICE_NEVER_STARTED (1077): no start was attempted since boot.
- A large number with no name is often an HRESULT written in decimal (2147500037 is 0x80004005); convert it to hex before looking it up. The same holds for a 7023 or 7024 error written as `%%` and a number above 2147483648: `%%2149884192` is 0x8024A120, a Windows Update code.

`sparklogs.data.services[].svc_crash_count_24h` (LQL) counts crashes in the last day from 7031 and 7034; when `sparklogs.data.services[].svc_crash_truncated` (LQL) is true it is a lower bound.
A service can be crashing and down at once: both conditions can be open on one service.
For a hung transition, `sparklogs.data.services[].svc_pending_stalled_age_min` (LQL) is how long its reported progress has not moved, counting only awake, watched time.

**Events, for what health named.** The device's service failures, by service:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (service_start_failed, service_start_timeout, service_exited_with_error, service_crashed, service_hang, service_hung_starting, dcom_start_failed)
```

Group by `sparklogs.reason` (LQL) and `win.eventlog.system.service_name` (LQL), then `win.eventlog.system.service_error` (LQL) inside the service that matters.
Windows writes the error as a message reference: `%%1275` is error 1275, "This driver has been blocked from loading".
Older agents can write earlier reason names. When the reasons return nothing on a device that has failures, filter on `provider_name = "Service Control Manager"` (LQL) instead.

Service Control Manager records that SparkLogs does not curate include a dependency that failed to start (7001) or is not installed (7003), an account that could not sign in (7038), a failed recovery action (7032), a boot-start driver that did not load (7026), a service whose process was replaced by another (7039), a stop sent with a reason (7042) and a service that did not stop properly at shutdown (7043):

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Service Control Manager" AND NOT sparklogs.reason! AND event_id not in (7036, 7040)
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_id` (LQL). Keep the provider in the filter: Winlogon also writes System event 7001, for an unrelated user logon notification.
A 7026 that names the same driver at every boot, on servers that do not use it, is routine; so is a 7030 for a service marked interactive on a system that does not allow interactive services.
7001 from Service Control Manager names both services: "The A service depends on the B service which failed to start because of the following error". Follow the chain to the service whose own failure has no dependency behind it.

Every state change (7036) and start type change (7040) for one service over time:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Service Control Manager" AND event_id in (7036, 7040) AND message: "<service display name>"
```
<!-- confirmed with data on 2026-11-12 -->

7036 uses the display name, and so does 7040. A service that logs "entered the running state" after each crash is restarting on its recovery action.

**Common causes and their evidence.**

- **The account cannot sign in.** Error 1069 on 7000, or 7038. The password changed or expired, the account was locked or disabled, or the account lost the Log on as a service right. Look for `logon_right_removed` (value) on `win.eventlog.security` (value) and failed sign-ins of logon type 5 (service) for that account:

  ```lql
  source = "<host>" AND ((sparklogs.reason = sign_in_failed AND win.eventlog.security.logon_type = 5) OR sparklogs.reason = logon_right_removed)
  ```

  An account moved by an installer or an administrator is `service_logon_account_changed` (value).
- **Disabled.** Error 1058, or DCOM error 1058 when a caller tried to start it (`dcom_start_failed` (value)). `service_start_type_changed` (value) says when it moved; Group Policy and hardening scripts set start types on purpose.
- **Program missing or damaged.** Error 2 or 3 on 7000: a partial uninstall or an update that moved the program. `service_command_line_changed` (value) shows the path before and after.
- **Too slow to start.** 7009 then 7000 with error 1053, often at boot on a busy disk or with security software scanning the program. Check disk load at that boot before raising the timeout.
- **Access denied.** Error 5 on 7000: the account cannot read the program file or its registry key, often after permissions were tightened by a script or Group Policy, or because a security product blocks the program.
- **Bad or unsigned program.** Error 193 (not a valid Win32 application: a damaged, truncated or wrong-architecture file) or error 577 (Windows could not verify the driver's or program's signature).
- **Account differs within a shared process.** Error 1079: services that share one svchost process must run as the same account; one changed by hand no longer can.
- **Starts by hand, fails at boot.** The network, a dependency or a disk it needs was not ready yet. Delayed start, or a declared dependency on what it waits for, is the fix; a longer timeout hides it.
- **Out of space or expired.** A database service stops when its disk or transaction log is full (`playbooks/disk-full-or-filling.md`), and a service whose certificate or licence expired fails at its next start (`playbooks/certificate-expiry.md`). Its own events on the Application channel usually say which.
- **Blocked driver.** A kernel driver service fails with error 1275, and Windows usually also shows an Application Popup 1060 naming the file. Windows refused to load it, for example under its vulnerable driver blocklist or memory integrity. The vendor needs a fixed driver. When something retries the start in a tight loop, such as the vendor's own agent, the System log fills with these records and overwrites itself: read the device's skipped-event notices in `playbooks/sparklogs-collection.md`.

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason = service_start_failed AND win.eventlog.system.service_error = "%%1275"
```

Code Integrity's own reasons on `win.eventlog.identity_security` (value) (`code_integrity_driver_revoked` (value), `code_integrity_policy_blocked` (value), `code_integrity_signing_level_blocked` (value)) say which rule blocked a driver when Windows logged one.

- **Crash loop.** `service_crashed` (value) again and again for one service. The faulting module and its version come from the process crash: `playbooks/crashes-and-restarts.md`. Many services crashing in the same minutes point at what they share: their host process, security software, or the machine itself.
- **Hung transition.** A service stuck starting or stopping holds its dependants. If it runs in a shared svchost process, ending the process stops the other services in it too. A service that does not stop before shutdown logs 7043; one that does so on every shutdown slows shutdown.
- **Stopped by security software.** The service ends with no error of its own while an endpoint protection product blocks or removes its program: `themes/endpoint-protection.md`.

**What changed before it started.** An update, a new driver, a moved program path or a changed account just before the first failure is the usual cause. Find it with `playbooks/what-changed.md`, ranked against the first failure.

**One device or many.** Run the same reason and service over the organization grouped by `source` (LQL), or ask device health how many devices hold the condition.
A security, RMM or backup agent crashing across a client is a vendor issue for the vendor's support, with the version and first failure time.

**Not this playbook.**
The SparkLogs agent's own service stopping is `sparklogs_agent_stopped` (value), not `service_crashed` (value): `playbooks/sparklogs-collection.md`.
An RMM agent's service and the RMM console: `playbooks/rmm-connectivity.md`.

**When to stop.** A service-specific code with no events from the program and no readable vendor log ends what SparkLogs can say: report the code, the time and the service account, and hand off to the vendor's documentation or support.

**Off-endpoint** (HM16): the vendor's log files, license servers and back ends, domain account policy, databases and file shares on other hosts.
