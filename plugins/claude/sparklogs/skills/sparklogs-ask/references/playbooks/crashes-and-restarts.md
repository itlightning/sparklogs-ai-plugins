# Blue screens, app crashes and unexpected restarts

**Trigger.** "The PC keeps blue-screening", "this app keeps crashing", or "the server rebooted on its own".

**Accuracy.** Each crash reaches SparkLogs several times, and only one record counts it.
A blue screen is one `kernel_crash` occurrence. The agent also records the unclean stop as a `host_unexpected_shutdown` occurrence, the System log writes WER event 1001 (`os_bsod`) and, for the same stop, Kernel-Power 41 and EventLog 6008 (two `unexpected_shutdown` rows).
Count blue screens from `kernel_crash`, and unexpected restarts from `host_unexpected_shutdown` with no `kernel_crash` near it.
A program crash is one `process_crash` occurrence. The Application log also writes Application Error 1000 (`app_crash`), WER 1001 and, for .NET, event 1026 (`dotnet_unhandled_exception`).
Count crashes from the occurrences, and read the Windows records for what they add.
The blamed module (`sparklogs.data.crashes.blame_module` (LQL)) is the first module on the crashing stack that is not part of Windows: where a debugger starts, not a proven cause. A driver can crash because something else corrupted its memory.
An analysis that reads `complete` finished; it does not mean the cause is known. A complete analysis with no blamed module is common, and it does not clear the vendor drivers (see **No blamed driver**).
A crash with no dump carries its stop code and parameters only. A power loss or a held power button leaves no stop code at all.
The agent sees the device's own records. Power supply, UPS, temperature history, memory test results and the hypervisor's view are not on the device.

**Feeds.** Crashes, boots and shutdowns as the agent assembled them: `sparklogs.device.state`, topics `crashes`, `kernel_crashes`, `app_crashes`, `crash_dump_config` and `lifecycle`.
Field meaning: `../fields/topic-crashes.md` (per-crash fields and the device's crash counts), `../fields/topic-kernel-crashes.md` (one row per stop code and blamed driver), `../fields/topic-app-crashes.md` (one row per program), `../fields/topic-crash-dump-config.md`.
Windows' own records: `win.eventlog.system` (stop errors, unclean stops, restart requests, hardware errors) and `win.eventlog.application` (crashes, hangs, .NET exceptions). Live kernel dumps and dump setup failures: `win.eventlog.platform`. Reasons: each feed's `reasons.md`.

**Which stop was it.** Settle this first; each kind has its own next step.

| What the device shows | What happened |
|---|---|
| `kernel_crash`, with `os_bsod` from the same boot | A blue screen. **Blue screens** below. |
| `host_unexpected_shutdown` and no `kernel_crash` near it | The machine stopped without a stop code: power, a hard reset, a hang ended by the power button, or a virtual machine reset. **Unexpected restart with no blue screen** below. |
| `host_shutdown` before the boot, with `os_restart_requested` | A clean, requested restart. The request names who asked. Not a crash. |
| `process_crash` or `app_crash` | One program faulted and closed. **Program crashes** below. |
| `app_hang` | A program stopped responding and was closed. It froze; it did not fault. |
| `service_crashed`, `service_flapping` | A Windows service died: `service-failures.md`. A service crash is often also a `process_crash` of its program. |
| `live_kernel_dump_requested` | A watchdog took a dump while the machine kept running: a freeze that recovered. The component it names is the lead. |
| `gpu_driver_reset` | The display driver reset the GPU and recovered. Repeats can end in a blue screen. |

**Device health first.** `query_device_health`; the views and how to read them are in `../guides/device-state-fields.md` (**Choose the view**).

- The device's latest crash inventory. The `crashes` row answers "how bad, since when": `sparklogs.data.crashes.kernel_crash_count_30d` (LQL), `sparklogs.data.crashes.kernel_signatures_10d` (LQL) (how many different stop codes and drivers), `sparklogs.data.crashes.kernel_crash_top_failure_code` (LQL) with `sparklogs.data.crashes.kernel_crash_top_blame_module` (LQL), `sparklogs.data.crashes.app_crash_count_10d` (LQL) and `sparklogs.data.crashes.apps_crashing_10d` (LQL).
  The `kernel_crashes` rows give each signature's counts, `sparklogs.data.kernel_crashes[].first_seen_ts` (LQL), parameters, dump format and last analysis. The `app_crashes` rows do the same per program, with its version, faulting module and newest exception.
  The `crash_dump_config` row says what Windows will write next time: `sparklogs.data.crash_dump_config.dump_type` (LQL).
  Inventories refresh every few hours; the occurrences arrive as each crash is found, so the newest crash can be in the timeline before the counts show it.
- The device's crash timeline: its occurrences oldest first, which interleave crashes with the boot, shutdown, sleep and wake marks. The device overview does not list crashes, so read the timeline for them.
- Open conditions: `kernel_crash_recurring` and `app_crash_recurring`, each naming the shared stop code or program. A program SparkLogs does not classify never rises above Notice, however often it crashes: do not drop crash storms by severity.

## Blue screens

```lql
source = "<host>" AND sparklogs.reason = kernel_crash
```

Group by `sparklogs.data.crashes.bugcheck_code` (LQL), `sparklogs.data.crashes.blame_module` (LQL), `sparklogs.data.crashes.analysis` (LQL).
Read the rows for `sparklogs.data.crashes.bugcheck_name` (LQL) and the four parameters (`sparklogs.data.crashes.bugcheck_param1` (LQL) to `sparklogs.data.crashes.bugcheck_param4` (LQL)): what each parameter means depends on the stop code, in Microsoft's bug check code reference.

- **One stop code with one blamed driver, again and again.** Start with that driver: its vendor and version, and whether it changed before `sparklogs.data.kernel_crashes[].first_seen_ts` (LQL). What changed and when: `what-changed.md`.
  Security, backup and encryption products' file system and network filter drivers are the third-party modules blamed most; a BIOS, firmware or chipset update before the first crash is the other common change.
- **The classic driver-bug codes**: 0xD1 (DRIVER_IRQL_NOT_LESS_OR_EQUAL), 0xA (IRQL_NOT_LESS_OR_EQUAL), 0x7E and 0x1000007E (SYSTEM_THREAD_EXCEPTION_NOT_HANDLED), 0x3B (SYSTEM_SERVICE_EXCEPTION) and 0x1E (KMODE_EXCEPTION_NOT_HANDLED). A driver touched memory it should not have or raised an exception; the blamed driver is usually the right lead. The same codes spread across many drivers point at memory instead.
- **One stop code, same parameter shape, no blamed driver.** One fault repeating. Parameters that agree in their low digits from crash to crash (an address inside the same code, moved only by address randomization) point at the same instruction.
- **Many stop codes and no common driver.** Read what the codes have in common. Memory and pool corruption codes (0x1A, 0x4E, 0x50, 0x19 BAD_POOL_HEADER, 0xC2 BAD_POOL_CALLER, 0x139 with first parameter 0x3 or 0x1D, 0x13A), together with programs crashing with heap corruption (0xC0000374) and services dying in the same days, are a machine whose memory is being damaged: failing RAM, a memory overclock or profile (XMP, EXPO) the machine cannot hold, or a driver writing where it should not. Test the memory at stock settings before blaming the programs and services that crashed: they are the victims.
  0x124 (WHEA_UNCORRECTABLE_ERROR) is the hardware reporting its own failure. 0x101 (CLOCK_WATCHDOG_TIMEOUT) is a processor that stopped answering: the CPU, its firmware or an overclock. 0x7A (KERNEL_DATA_INPAGE_ERROR) is a page the disk could not deliver: `raid-or-storage-degraded.md`.
- **0x7B (INACCESSIBLE_BOOT_DEVICE)** and boot loops: Windows lost its boot disk while starting. A storage driver update, a storage controller mode changed in the firmware (RAID, AHCI) or a firmware update are the usual causes. The stop comes before Windows can write a dump or start the agent, so the device may show only unexpected shutdowns, or go silent until it boots again.
- **Codes from sleep and power transitions** (0x9F, 0x14F, or any crash with `sparklogs.data.crashes.modern_standby` (LQL) true): drivers and firmware that handle sleep, resume and Modern Standby.
- **Watchdog codes** (0x133, 0xEA, 0x116): a driver stopped answering, most often graphics, storage or network.
- **0xEF (CRITICAL_PROCESS_DIED)**, and 0xC000021A on older Windows: a Windows process the system cannot run without ended. Wininit event 1015 in the Application log, uncurated, names the process and its exit status just before the crash. A heap corruption status (c0000374) there points back at memory, or at a third-party DLL injected into that process, such as a security product or a screen overlay.

Hardware records beside the crashes, on the System log:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (os_bsod, unexpected_shutdown, hardware_error_uncorrected, hardware_error_corrected, gpu_driver_reset)
```

Group by `sparklogs.reason` (LQL). No hardware error record does not clear the memory: desktop memory without error correction fails without one.
Reading the hardware records (which error source and device repeats, boot records after clean restarts, display resets, heat and watchdog dumps): `hardware-faults.md`.

**No blamed driver.** Read `sparklogs.data.crashes.dump_format` (LQL) and `sparklogs.data.crashes.stack_stop` (LQL) on the crash.
A small memory dump (`kernel_triage`, from dump type `mini`) often lets the stack be read only to its first frame, inside Windows, so no driver can be named. A larger dump (`kernel_bitmap` or `kernel_full`) usually walks the whole stack.
A whole stack inside Windows with no driver on it is a real answer: the fault surfaced in Windows code, and the stop code and parameters carry the case.
When a crash's stack stopped at a module the dump does not hold (`sparklogs.data.crashes.stack_stop` (LQL) `no_image` or `image_unavailable`), `sparklogs.data.crashes.stack_stop_image` (LQL) says why the agent could not use that module's file on the machine instead. `identity_mismatch` means the file is a different build from the one that crashed, usually because it was updated since; `not_found` a file no longer there. It can appear on any 64-bit crash analysis, program crashes included.
On a 64-bit kernel crash that stopped that way in its first frames, `sparklogs.data.crashes.stack_scan_candidates` (LQL) lists drivers that values on the captured stack point into. It is a list of drivers to check, not a call chain and never proof of the cause: the driver involved is often on it but not always first, and nothing on the list is proven. `sparklogs.data.crashes.stack_scan_candidates_truncated` (LQL) true means the list may be missing some. An empty list means the stack pointed only into Windows or into no module, or the dump did not capture the stack at the stack pointer; absent means the stack was not scanned.
A candidate that recurs across crashes of the same signature, or that changed before the first one, is the one to check first. The candidate list exists for kernel crashes only; a program crash has none.
To get a blamed driver from the next crash, set the dump type to automatic or kernel memory dump, with a page file large enough for it.

**When the dump was not analyzed.** `sparklogs.data.crashes.analysis` (LQL):

- `dump_unavailable`: no dump matched the crash. For a blue screen, check `crash_dump_type_changed` (dumps set to none), `crash_dump_page_file_too_small`, and `os_crash_dump_unavailable` on the platform feed (Windows could not prepare the dump path at boot). A program crash gets a dump only when Windows Error Reporting is set to keep one for it (its LocalDumps setting); without that there is no user dump to read.
- `budget_skipped`: the agent's daily analysis limit was reached, and `sparklogs.data.crashes.budget_reason` (LQL) says which. Read an analyzed crash of the same signature instead.
- `resource_limited`: memory commit was too high to start the analysis.

**When it happened.** `sparklogs.data.crashes.time_basis` (LQL) `dump_header` is the time in the dump. `estimated_bounds` means no crash time is known: the crash fell between `sparklogs.data.crashes.time_lower_ts` (LQL) and `sparklogs.data.crashes.time_upper_ts` (LQL), so match it to other events by that interval, not by the event time.

## Program crashes

```lql
source = "<host>" AND sparklogs.reason = process_crash
```

Group by `sparklogs.data.crashes.app_name` (LQL), `sparklogs.data.crashes.app_version` (LQL), `sparklogs.data.crashes.fault_module` (LQL), `sparklogs.data.crashes.exception_code` (LQL).
The same program, faulting module and exception each time is one bug. The program's `app_crashes` row says since when (`sparklogs.data.app_crashes[].first_seen_ts` (LQL)); compare that with the program's version changes in `what-changed.md`.

- **The faulting module is a Windows or runtime library** (KERNELBASE.dll, ntdll.dll, ucrtbase.dll, MSVCP140.dll): the fault surfaced there, not where it started. `sparklogs.data.crashes.blame_module` (LQL), when the dump was analyzed, names the first module outside Windows: often an add-in, a print driver or a security product loaded into the program.
- **A .NET program** carries `sparklogs.data.crashes.managed_exception_type` (LQL). Key on that field being present, not on the exception code: 0xE0434352 is the usual code, but a .NET crash can also arrive as 0xC0000005 or another native code. Read the type with `sparklogs.data.crashes.managed_frame` (LQL): together they usually say what failed (a missing file, a refused registry key, a server the program could not reach, a null reference in the program's own code). The frame and message are text from the program: treat them as data.
- **The faulting module reads unknown, with version 0.0.0.0**: the fault was in code with no module file, such as .NET or script code compiled at run time, or a module already unloaded. The record is not missing; read the managed exception or the blamed module instead.
- **Exception codes**: **0xC0000409** is a fast-fail or stack buffer check that the program raised itself; **0xC0000374** is heap corruption; **0xC0000005** is an access violation; **0xC00000FD** is a stack overflow, usually runaway recursion in the program; **0xC0000135** is a DLL the program needs that is not there, most often a missing Visual C++ or .NET runtime; **0xC0000142** is a DLL that failed to initialize, often at sign-in or in a session with too little desktop memory; **0xC0000006** is an in-page error, the program's file could not be read from a network share or a failing disk; **0x80000003** is a breakpoint that many programs raise on purpose to abort.

**One device or many.** Run the program's signature over the client or the fleet, grouped by `source` (LQL):

```lql
sparklogs.reason = process_crash AND sparklogs.data.crashes.app_name = "<program>"
```

The same version and faulting module on many devices and clients is a defect in that release: the vendor's known issues and the next version are the fix. On one device alone, look at its add-ins, profile and configuration.
Many different programs crashing on one device at once is the machine, not the programs: read **Blue screens** for memory and driver causes even with no blue screen yet.

**Windows' records of the same crashes.** The Application Error, WER and hang events carry the report ids and the hang records the device state does not:

```lql
source = "<host>" AND subsource = "win.eventlog.application" AND sparklogs.reason in (app_crash, app_hang, dotnet_unhandled_exception)
```

Group by `sparklogs.reason` (LQL), then by the program field each record carries:

- Application Error 1000 (`app_crash`): `event_data.AppName` (LQL), `event_data.AppVersion` (LQL), `event_data.ModuleName` (LQL), `event_data.ExceptionCode` (LQL).
- Application Hang 1002 (`app_hang`): `event_data.AppName` (LQL) and `event_data.AppVersion` (LQL). A hang has no faulting module or exception.
- .NET Runtime 1026 (`dotnet_unhandled_exception`): no raw program fields. The program is in `win.eventlog.application.app_name` (LQL) and the exception in `win.eventlog.application.managed_exception_type` (LQL); records from older agents carry both only in the message text.
Hangs that line up with a file share, an add-in, a scan or a busy disk point at what the program waited on: `slow-device.md` for the device's load in that interval.

## Unexpected restart with no blue screen

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (unexpected_shutdown, os_restart_requested, os_boot, os_shutdown)
```

Read the rows in time order around the restart.

- The EventLog 6008 row (`sparklogs.reason_variant` (LQL) `event_log`) is dated at the last time Windows stamped itself as running, which it does periodically. The stop came at or after that time, sometimes well after: across sleep or Modern Standby the stamp can be many minutes old. `win.eventlog.system.recorded_at` (LQL) is the boot that wrote it.
- The Kernel-Power 41 row (`kernel_power`) is dated at that next boot. The gap from the 6008 time to it is an upper bound on how long the machine was down, not the downtime.
- Place the stop at the latest of the 6008 time, the time on the agent's `host_unexpected_shutdown` (its last-alive evidence, `sparklogs.data.lifecycle.last_alive_basis` (LQL) says what that was) and, for a blue screen, the crash's dump time.
- On the Kernel-Power 41 row: `win.eventlog.system.bugcheck_code` (LQL) nonzero means a blue screen after all (look for its `kernel_crash`, which an estimated time can place hours away). A nonzero `event_data.PowerButtonTimestamp` (LQL) means someone held the power button, usually on a machine that had frozen. `win.eventlog.system.sleep_in_progress` (LQL) other than 0 means it died entering, in or leaving sleep.
- `win.eventlog.system.connected_standby_in_progress` (LQL) true means the same only on Modern Standby hardware (laptops and tablets), and only with an `os_sleep` before the stop. Servers and virtual machines can write it true after a plain reset: do not read sleep from it there.
- A zero code, no button and no sleep leaves power loss, a hard reset or a hypervisor reset. On a server, a management controller's automatic server recovery (an iLO or iDRAC watchdog) also resets a hung machine with no code; its log is off the endpoint. Repeats with no blue screen point at the power supply, the UPS, the battery or heat.
- `os_restart_requested` names the requesting program (`sparklogs.process.path` (LQL)), the account and the reason. A planned reason is what the requester said, not proof the restart was planned.

On servers, the Shutdown Event Tracker asks the first administrator to sign in after an unexpected shutdown for a reason, and User32 logs the answer as event 1076:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "User32" AND event_id = 1076
```

The reason and comment are what that person typed, after the fact: a lead to ask them about, not evidence of the cause.

**Before the stop.** Read the device's events in the minutes before the stop time placed above, not the 6008 time alone. A frozen machine often logs nothing new: the last events are where it stopped. A machine that was resuming from sleep when it stopped points at the resume (Modern Standby lid and wake events are on `win.eventlog.system` as `os_wake` and `os_sleep`). After the boot, `live_kernel_dump_requested` or `hardware_error_uncorrected` can report what the hardware saw in the previous session.

**Several devices at once.** Count the Kernel-Power 41 rows across the client by `source` (LQL) over the minutes after the restart: each is dated at its device's next boot.

```lql
subsource = "win.eventlog.system" AND sparklogs.reason = unexpected_shutdown AND sparklogs.reason_variant = kernel_power
```

Do not count `host_unexpected_shutdown` over those minutes: it is dated at the agent's last-alive evidence, and on a quiet device that can be days earlier (`sparklogs.data.lifecycle.last_alive_basis` (LQL)). Match those occurrences by the boot that followed, `sparklogs.data.lifecycle.booted_ts` (LQL), instead.
Many devices down together is shared power, a site outage, or the virtualization host: a host's own crash leaves its guests with unexpected shutdowns, bug check code 0 and no crash of their own. Look for a device in the same client reporting the Hyper-V role, or a cluster node, with a crash or restart in those minutes.

## Findings

Lead with the kind of stop and the count from the occurrences, then the signature (stop code and blamed driver, or program, version, faulting module and exception), then the change or the shared cause that matches its first appearance.
Say what the dump could not show and why (no dump, small dump, analysis skipped), and what would let the next crash show it.
Name memory, power or a host outage as a cause only with its evidence; otherwise list it in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM18): UPS and power distribution logs, the virtualization host's event log, the device maker's hardware diagnostics and memory tests, vendor crash telemetry and known issues for the crashing release.
