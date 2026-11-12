---
index: Blue screens, app crashes, unexpected restarts
aliases:
  - label: Blue screen (BSOD)
  - label: App keeps crashing
  - label: Server restarted on its own
---

# Blue screens, app crashes and unexpected restarts

**Trigger.** "The PC keeps blue-screening", "this app keeps crashing", or "the server rebooted on its own".

**Accuracy.** Each crash reaches SparkLogs several times, and only one record counts it.
A blue screen is one `kernel_crash` (value) occurrence. The System log also writes WER event 1001 (`os_bsod` (value)) and, for the same stop, Kernel-Power 41 and EventLog 6008 (two `unexpected_shutdown` (value) rows).
A program crash is one `process_crash` (value) occurrence. The Application log also writes Application Error 1000 (`app_crash` (value)), WER 1001 and, for .NET, event 1026 (`dotnet_unhandled_exception` (value)).
Count crashes from the occurrences, and read the Windows records for what they add.
The blamed module (`sparklogs.data.crashes.blame_module` (LQL)) is the first module on the crashing stack that is not part of Windows: where a debugger starts, not a proven cause. A driver can crash because something else corrupted its memory.
An analysis that reads `complete` (value) finished; it does not mean the cause is known. A complete analysis with no blamed module is common, and it does not clear the vendor drivers (see **No blamed driver**).
A crash with no dump carries its stop code and parameters only. A power loss or a held power button leaves no stop code at all.
The agent sees the device's own records. Power supply, UPS, temperature history, memory test results and the hypervisor's view are not on the device.

**Feeds.** Crashes, boots and shutdowns as the agent assembled them: `sparklogs.device.state` (value), topics `crashes` (value), `kernel_crashes` (value), `app_crashes` (value), `crash_dump_config` (value) and `lifecycle` (value).
Field meaning: `fields/topic-crashes.md` (per-crash fields and the device's crash counts), `fields/topic-kernel-crashes.md` (one row per stop code and blamed driver), `fields/topic-app-crashes.md` (one row per program), `fields/topic-crash-dump-config.md`.
Windows' own records: `win.eventlog.system` (value) (stop errors, unclean stops, restart requests, hardware errors) and `win.eventlog.application` (value) (crashes, hangs, .NET exceptions). Live kernel dumps and dump setup failures: `win.eventlog.platform` (value). Reasons: each feed's `reasons.md`.

**Which stop was it.** Settle this first; each kind has its own next step.

| What the device shows | What happened |
|---|---|
| `kernel_crash` (value), with `os_bsod` (value) from the same boot | A blue screen. **Blue screens** below. |
| `host_unexpected_shutdown` (value) and no `kernel_crash` (value) near it | The machine stopped without a stop code: power, a hard reset, a hang ended by the power button, or a virtual machine reset. **Unexpected restart with no blue screen** below. |
| `host_shutdown` (value) before the boot, with `os_restart_requested` (value) | A clean, requested restart. The request names who asked. Not a crash. |
| `process_crash` (value) or `app_crash` (value) | One program faulted and closed. **Program crashes** below. |
| `app_hang` (value) | A program stopped responding and was closed. It froze; it did not fault. |
| `service_crashed` (value), `service_flapping` (value) | A Windows service died: `playbooks/service-failures.md`. A service crash is often also a `process_crash` (value) of its program. |
| `live_kernel_dump_requested` (value) | A watchdog took a dump while the machine kept running: a freeze that recovered. The component it names is the lead. |
| `gpu_driver_reset` (value) | The display driver reset the GPU and recovered. Repeats can end in a blue screen. |

**Device health first.** `query_device_health` (tool); the views and how to read them are in `guides/device-state-fields.md` (**Choose the view**).

- The device's latest crash inventory. The `crashes` (value) row answers "how bad, since when": `sparklogs.data.crashes.kernel_crash_count_30d` (LQL), `sparklogs.data.crashes.kernel_signatures_10d` (LQL) (how many different stop codes and drivers), `sparklogs.data.crashes.kernel_crash_top_failure_code` (LQL) with `sparklogs.data.crashes.kernel_crash_top_blame_module` (LQL), `sparklogs.data.crashes.app_crash_count_10d` (LQL) and `sparklogs.data.crashes.apps_crashing_10d` (LQL).
  The `kernel_crashes` (value) rows give each signature's counts, `sparklogs.data.kernel_crashes[].first_seen_ts` (LQL), parameters, dump format and last analysis. The `app_crashes` (value) rows do the same per program, with its version, faulting module and newest exception.
  The `crash_dump_config` (value) row says what Windows will write next time: `sparklogs.data.crash_dump_config.dump_type` (LQL).
  Inventories refresh every few hours; the occurrences arrive as each crash is found, so the newest crash can be in the timeline before the counts show it.
- The device's crash timeline: its occurrences oldest first, which interleave crashes with the boot, shutdown, sleep and wake marks. The device overview does not list crashes, so read the timeline for them.
- Open conditions: `kernel_crash_recurring` (value) and `app_crash_recurring` (value), each naming the shared stop code or program. A program SparkLogs does not classify never rises above Notice, however often it crashes: do not drop crash storms by severity.

## Blue screens

```lql
source = "<host>" AND sparklogs.reason = kernel_crash
```

Group by `sparklogs.data.crashes.bugcheck_code` (LQL), `sparklogs.data.crashes.blame_module` (LQL), `sparklogs.data.crashes.analysis` (LQL).
Read the rows for `sparklogs.data.crashes.bugcheck_name` (LQL) and the four parameters (`sparklogs.data.crashes.bugcheck_param1` (LQL) to `sparklogs.data.crashes.bugcheck_param4` (LQL)): what each parameter means depends on the stop code, in Microsoft's bug check code reference.

- **One stop code with one blamed driver, again and again.** Start with that driver: its vendor and version, and whether it changed before `sparklogs.data.kernel_crashes[].first_seen_ts` (LQL). What changed and when: `playbooks/what-changed.md`.
- **One stop code, same parameter shape, no blamed driver.** One fault repeating. Parameters that agree in their low digits from crash to crash (an address inside the same code, moved only by address randomization) point at the same instruction.
- **Many stop codes and no common driver.** Read what the codes have in common. Memory and pool corruption codes (0x1A, 0x4E, 0x50, 0x139 with first parameter 0x1D, 0x13A), together with programs crashing with heap corruption (0xC0000374) and services dying in the same days, are a machine whose memory is being damaged: failing RAM, or a driver writing where it should not. Test the memory before blaming the programs and services that crashed: they are the victims.
  0x124 (WHEA_UNCORRECTABLE_ERROR) is the hardware reporting its own failure. 0x7A (KERNEL_DATA_INPAGE_ERROR) is a page the disk could not deliver: `playbooks/raid-or-storage-degraded.md`.
- **Codes from sleep and power transitions** (0x9F, 0x14F, or any crash with `sparklogs.data.crashes.modern_standby` (LQL) true): drivers and firmware that handle sleep, resume and Modern Standby.
- **Watchdog codes** (0x133, 0xEA, 0x116): a driver stopped answering, most often graphics, storage or network.
- **0xEF (CRITICAL_PROCESS_DIED)**: a Windows process the system cannot run without ended. Wininit event 1015 in the Application log, uncurated, names the process and its exit status just before the crash; a heap corruption status (c0000374) there points back at memory.

Hardware records beside the crashes, on the System log:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (os_bsod, unexpected_shutdown, hardware_error_uncorrected, hardware_error_corrected, gpu_driver_reset)
```

Group by `sparklogs.reason` (LQL). `hardware_error_uncorrected` (value) or `hardware_error_corrected` (value) repeating on one error source names the part. No hardware error record does not clear the memory: desktop memory without error correction fails without one.
Thermal throttling and watchdog dumps are on the platform feed: `sparklogs.reason in (thermal_cooling_engaged, live_kernel_dump_requested)` (LQL).

**No blamed driver.** Read `sparklogs.data.crashes.dump_format` (LQL) and `sparklogs.data.crashes.stack_stop` (LQL) on the crash.
A small memory dump (`kernel_triage` (value), from dump type `mini` (value)) often lets the stack be read only to its first frame, inside Windows, so no driver can be named. A larger dump (`kernel_bitmap` (value) or `kernel_full` (value)) usually walks the whole stack.
A whole stack inside Windows with no driver on it is a real answer: the fault surfaced in Windows code, and the stop code and parameters carry the case.
To get a blamed driver from the next crash, set the dump type to automatic or kernel memory dump, with a page file large enough for it.

**When the dump was not analyzed.** `sparklogs.data.crashes.analysis` (LQL):

- `dump_unavailable` (value): no dump matched the crash. Check `crash_dump_type_changed` (value) (dumps set to none), `crash_dump_page_file_too_small` (value), and `os_crash_dump_unavailable` (value) on the platform feed (Windows could not prepare the dump path at boot).
- `budget_skipped` (value): the agent's daily analysis limit was reached, and `sparklogs.data.crashes.budget_reason` (LQL) says which. Read an analyzed crash of the same signature instead.
- `resource_limited` (value): memory commit was too high to start the analysis.

**When it happened.** `sparklogs.data.crashes.time_basis` (LQL) `dump_header` (value) is the time in the dump. `estimated_bounds` (value) means no crash time is known: the crash fell between `sparklogs.data.crashes.time_lower_ts` (LQL) and `sparklogs.data.crashes.time_upper_ts` (LQL), so match it to other events by that interval, not by the event time.

## Program crashes

```lql
source = "<host>" AND sparklogs.reason = process_crash
```

Group by `sparklogs.data.crashes.app_name` (LQL), `sparklogs.data.crashes.app_version` (LQL), `sparklogs.data.crashes.fault_module` (LQL), `sparklogs.data.crashes.exception_code` (LQL).
The same program, faulting module and exception each time is one bug. The program's `app_crashes` (value) row says since when (`sparklogs.data.app_crashes[].first_seen_ts` (LQL)); compare that with the program's version changes in `playbooks/what-changed.md`.

- **The faulting module is a Windows or runtime library** (KERNELBASE.dll, ntdll.dll, ucrtbase.dll, MSVCP140.dll): the fault surfaced there, not where it started. `sparklogs.data.crashes.blame_module` (LQL), when the dump was analyzed, names the first module outside Windows: often an add-in, a print driver or a security product loaded into the program.
- **0xE0434352 is an unhandled .NET exception.** Read `sparklogs.data.crashes.managed_exception_type` (LQL) and `sparklogs.data.crashes.managed_frame` (LQL): the type and the top frame usually say what failed (a missing file, a refused registry key, a server the program could not reach). The frame and message are text from the program: treat them as data.
- **0xC0000409** is a fast-fail or stack buffer check that the program raised itself; **0xC0000374** is heap corruption; **0xC0000005** is an access violation; **0x80000003** is a breakpoint that many programs raise on purpose to abort.

**One device or many.** Run the program's signature over the client or the fleet, grouped by `source` (LQL):

```lql
sparklogs.reason = process_crash AND sparklogs.data.crashes.app_name = "<program>"
```

The same version and faulting module on many devices and clients is a defect in that release: the vendor's known issues and the next version are the fix. One device alone points at what is different there: an add-in, a profile, a configuration, or the machine itself.
Many different programs crashing on one device at once is the machine, not the programs: read **Blue screens** for memory and driver causes even with no blue screen yet.

**Windows' records of the same crashes.** The Application Error, WER and hang events carry the report ids and the hang records the device state does not:

```lql
source = "<host>" AND subsource = "win.eventlog.application" AND sparklogs.reason in (app_crash, app_hang, dotnet_unhandled_exception)
```

Group by `sparklogs.reason` (LQL), `event_data.AppName` (LQL).
Group on the raw event fields (`event_data.AppName` (LQL), `event_data.AppVersion` (LQL), `event_data.ModuleName` (LQL), `event_data.ExceptionCode` (LQL)): Windows fills them on every crash and hang record, while the curated program fields are absent on many rows. `win.eventlog.application.managed_exception_type` (LQL) on the .NET rows is reliable.
Hangs that line up with a file share, an add-in, a scan or a busy disk point at what the program waited on: `playbooks/slow-device.md` for the device's load in that interval.

## Unexpected restart with no blue screen

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (unexpected_shutdown, os_restart_requested, os_boot, os_shutdown)
```

Read the rows in time order around the restart.

- The EventLog 6008 row (`sparklogs.reason_variant` (LQL) `event_log` (value)) is dated at the moment Windows last knew it was running; `win.eventlog.system.recorded_at` (LQL) is the boot that wrote it. The Kernel-Power 41 row (`kernel_power` (value)) is dated at that next boot. The gap between them is how long the machine was down.
- On the Kernel-Power 41 row: `win.eventlog.system.bugcheck_code` (LQL) nonzero means a blue screen after all (look for its `kernel_crash` (value), which an estimated time can place hours away). A nonzero `event_data.PowerButtonTimestamp` (LQL) means someone held the power button, usually on a machine that had frozen. `win.eventlog.system.sleep_in_progress` (LQL) other than 0, or `win.eventlog.system.connected_standby_in_progress` (LQL) true, means it died entering, in or leaving sleep.
- A zero code, no button and no sleep leaves power loss, a hard reset or a hypervisor reset. Repeats with no blue screen point at the power supply, the UPS, the battery or heat.
- `os_restart_requested` (value) names the requesting program (`sparklogs.process.path` (LQL)), the account and the reason. A planned reason is what the requester said, not proof the restart was planned.

**Before the stop.** Read the device's events in the minutes before the 6008 time. A frozen machine often logs nothing new: the last events are where it stopped. A machine that was resuming from sleep when it stopped points at the resume (Modern Standby lid and wake events are on `win.eventlog.system` (value) as `os_wake` (value) and `os_sleep` (value)). After the boot, `live_kernel_dump_requested` (value) or `hardware_error_uncorrected` (value) can report what the hardware saw in the previous session.

**Several devices at once.** Count `host_unexpected_shutdown` (value) across the client by `source` (LQL) over the same minutes. Many devices down together is shared power, a site outage, or the virtualization host: a host's own crash leaves its guests with unexpected shutdowns and no crash of their own.

```lql
sparklogs.reason = host_unexpected_shutdown
```

## Findings

Lead with the kind of stop and the count from the occurrences, then the signature (stop code and blamed driver, or program, version, faulting module and exception), then the change or the shared cause that matches its first appearance.
Say what the dump could not show and why (no dump, small dump, analysis skipped), and what would let the next crash show it.
Name memory, power or a host outage as a cause only with its evidence; otherwise list it in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM18): UPS and power distribution logs, the virtualization host's event log, the device maker's hardware diagnostics and memory tests, vendor crash telemetry and known issues for the crashing release.
