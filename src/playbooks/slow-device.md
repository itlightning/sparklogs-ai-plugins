---
index: Slow or freezing PC
aliases:
  - label: Slow server
  - label: Slow boot or shutdown
  - label: High CPU, memory or disk use
---

# Slow or freezing device

**Trigger.** "The PC has been slow this week", "it freezes for a few seconds", "it takes ages to start", "shutting down takes forever", or a server responds slowly.

**Accuracy.** The agent measures CPU (busy time, the queue of threads waiting for a processor, the user, kernel and interrupt split, the clock against rated speed), memory (available memory, committed memory against its limit, how long programs waited on paging), each disk (busy time, queue, latency), the network path, and the processes that used the most of each in every five-minute window.
It does not measure how long an application took to respond, per-process disk latency, graphics load, temperatures, or what a hypervisor holds back from a virtual machine.
A device can feel slow with every measured lane quiet: the delay can sit inside the application, at its server, at the far end of a connection, or in the host under a virtual machine.
Say which lanes were measured and quiet, and name the unmeasured ones, instead of calling the device healthy.
A heat span says when a lane ran high, not why. Its contributors ran at the same time and are not proven causes.
Process figures are lower bounds over the processes the agent kept in each window. A row combines every instance of one executable, and process I/O includes file, pipe and network I/O that never reaches a disk.
A condition opens only on sustained load, minutes of it. No condition does not clear a device that froze for seconds, was asleep, or did not report.
Boot and shutdown times are Windows' own measurements, written after the boot or shutdown finished, not the agent's.

**Feeds.** Measurements and conditions are device-state rows on `sparklogs.device.state` (value): topics `performance` (value) (`fields/topic-performance.md`), `top_processes` (value) (`fields/topic-top-processes.md`) and `storage_device_io` (value) (`fields/topic-storage-device-io.md`). Condition meaning and thresholds: `feeds/sparklogs.device.state/reasons.md`.
Windows' records: `win.eventlog.platform` (value) (Diagnostics-Performance boot, shutdown and desktop graphics records; the resource exhaustion detector's low-memory notice), `win.eventlog.system` (value) (the low virtual memory diagnosis, page file popups, disk and controller errors), `win.eventlog.application` (value) (application hangs). Storage records: `playbooks/raid-or-storage-degraded.md`.

**Which lane is slow.** Settle this first. Each lane has its own causes.

| What the device shows | Read |
|---|---|
| `cpu_busy` (value), CPU heat driven by the processor queue | **CPU saturation** |
| `cpu_kernel_dominated` (value) | **Kernel time** |
| `cpu_interrupt_storm` (value), interrupt and DPC time high in the CPU split | **Interrupts and DPCs** |
| `cpu_throttled_under_load` (value) | **Throttling** |
| `ram_pressure` (value), memory heat driven by paging waits | **Paging** |
| `ram_commit_near_limit` (value), `ram_commit_exhausted` (value), `pagefile_extended` (value) | **Committed memory at its limit** |
| `disk_saturated` (value) | **Disk busy or disk slow** |
| `disk_latency_degraded` (value), `disk_unresponsive` (value), slow disk latency at moderate busy time | `playbooks/raid-or-storage-degraded.md` (**Slow or stalled disk**) |
| `os_boot_duration_high` (value), `os_shutdown_duration_high` (value) | **Slow boot and slow shutdown** |
| `app_hang` (value), a freeze with every lane quiet | **Freezes with nothing hot** |
| `process_handle_count_high` (value), one process growing for days | `playbooks/memory-or-handle-leak.md` |
| `gpu_resources_saturated` (value), screen stutter or brief black screens | `playbooks/hardware-faults.md` (**Graphics**) |
| Slow only on a share, in one application, or on the internet | **Slow over the network** |

**Device health first.** `query_device_health` (tool). How to read each part: `guides/device-state-fields.md` (**Read a device view**).

- The device overview over the complaint window, up to 30 days. Its header says which lanes were measured and which stretches were asleep, powered off or unreported (unreported is unknown, not quiet). Its heat spans name the lane, the reading that set the peak, where the peak sat against the device's own typical range, and the top contributors. A peak within the device's typical range is not new for this device: ask what changed in the user's work, not on the machine.
  Its CPU, memory and disk rows per bucket carry the user, kernel and interrupt split, available and committed memory, paging waits, and the busiest disk's busy time, queue and latency. Disk heat is busy time pushed up by queue depth; latency is not in it, so read the disk latency figures for a slow disk at moderate load.
  Its episodes and changes say which conditions opened and what changed around each span. Ranking those changes against the onset: `playbooks/what-changed.md`.
- When the complaint names times, read the overview again over those hours with a narrow bucket. A freeze shorter than the bucket leaves no span. It can still show in the evidence and events, which keep their own times.
- The process chart over the window, ranked by CPU, memory or I/O, tells a burst from a steady load and one instance from a restart cycle. A process on top of one span only is a burst. The same executable on top every working day is the workload.
- Several devices slow, or a client-wide complaint: the fleet performance reading ranks devices by one reading (CPU, paging waits, disk latency), and the fleet process reading ranks the executables using the most CPU, memory or I/O across them. Then read the overview on the outliers. Several devices slow on one network: compare devices with the same network key (`guides/device-state-fields.md`, **Network outages**).

The device's conditions over the window, as events:

```lql
source = "<host>" AND subsource = "sparklogs.device.state" AND sparklogs.reason in (cpu_busy, cpu_kernel_dominated, cpu_interrupt_storm, cpu_throttled_under_load, ram_pressure, ram_commit_near_limit, disk_saturated, disk_latency_degraded, disk_unresponsive, process_handle_count_high)
```

Group by `sparklogs.reason` (LQL), then `sparklogs.instance` (LQL) for the disk conditions (one per disk). The newest message of each episode states the reading against its threshold and how long it has been observed.
A condition that returns every weekday in working hours is the workload or a schedule. One that started on a date points at a change.

## CPU saturation

`cpu_busy` (value) means the CPU stayed near full for most of a five-minute stretch (thresholds in `feeds/sparklogs.device.state/reasons.md`). The processor queue per core is what makes it a problem: threads waiting several deep per core make every program wait its turn. A CPU at 100% with less than one waiting thread per core is a machine using its CPU, not one making programs wait.
On a virtual machine, threads also wait on the host (CPU ready time), which the guest cannot measure: a guest slow with a modest queue can still be starved by its host.

Read the processes during the span, then the process chart over days for the same executable:

- **Scans and updates.** The antivirus engine (Defender's MsMpEng.exe or a third-party agent) in a full scan or signature update, Windows servicing (TiWorker.exe, TrustedInstaller.exe) after an update, the search indexer after a profile move, OneDrive's first sync. Each is time-bound: it should end.
- **A management query loop.** WmiPrvSE.exe high is the WMI service answering another program's queries. The caller is usually an RMM, inventory or monitoring agent polling too often.
- **A shared service host.** svchost.exe hosts several services. Its process rows list them, which names the service to look at.
- **A virtual machine's worker.** vmmem, vmmemWSL or vmwp.exe on a Hyper-V, WSL or Docker host is the guest's own work: look inside the guest.
- **The workload outgrew the machine.** A steady load across the working day with no single runaway process, on a device whose processors have not changed (`cpu_configuration_changed` (value) says when they did).

## Kernel time

`cpu_kernel_dominated` (value) means most of the busy time was kernel work, not counting interrupts and DPCs.
File system and network filter drivers are the usual cause: antivirus, endpoint detection, backup, encryption and data-loss-prevention agents inspecting every file or packet. Heavy paging, a virtual machine's worker and a vendor utility driving its own device show the same way.
Kernel work is charged to the process whose call caused it, so the top process names who asked, not which driver did the work.
Check security and storage products that changed before the onset (`playbooks/what-changed.md`), and whether excluding a busy application folder or database from scanning brings kernel time down.

## Interrupts and DPCs

`cpu_interrupt_storm` (value) means servicing hardware interrupts and deferred procedure calls took a large share of all CPU time (threshold in `feeds/sparklogs.device.state/reasons.md`). Windows charges that time to no process, so Task Manager and per-process alerts miss it, and the machine stutters (audio crackles, the pointer lags, transfers stall) while no process looks busy.
The process rows carry it as two system rows, hardware interrupts and deferred procedure calls. The windows where they ran high:

```lql
source = "<host>" AND sparklogs.topic = top_processes AND sparklogs.data.top_processes[](entry_kind = "system" AND cpu_busy_pct_avg >= 10)
```

Count by day. The condition opens only on sustained load. Short DPC spikes that crackle audio can stay below it, so its absence does not clear a driver.
A faulty or outdated driver for a network, storage, audio or USB device or a docking station is the usual cause, and a driver update just before the onset is the first lead (`playbooks/what-changed.md`). Undocking or unplugging devices one at a time, and a DPC latency tool on the device, name the driver. Devices failing or resetting beside it: `playbooks/hardware-faults.md` (**Devices that fail to start or drop off**).

## Throttling

`cpu_throttled_under_load` (value) applies to physical servers only: the CPU is busy but held well below its rated speed. Heat (blocked airflow, a failed fan, a hot room), power (a failing power supply, a power cap in the management controller) and a power-saving firmware profile or Windows power plan are the causes. Every job runs longer while CPU percentage looks normal.
On workstations and laptops a low clock under load is ordinary on battery or a power-saving plan, and virtual machines cannot see the real clock. The clock against rated speed is still in the CPU readings: read it beside the power plan before calling a laptop slow from heat. Thermal records and firmware speed limits: `playbooks/hardware-faults.md` (**Heat and power**).

## Paging

`ram_pressure` (value) means available memory fell below its threshold (`feeds/sparklogs.device.state/reasons.md`) and Windows is moving memory to and from the page file, so programs wait on the disk for memory they were using. It rates higher when that paging slows the page-file disk, and when it lasts hours or recurs on several days.
Memory heat in the overview is driven by the paging wait estimate: how long threads waited on paging reads. Committed memory and RAM in use alone do not make memory heat.
Hard page faults also read program and data files, so a high fault rate alone is not memory pressure. A file server whose memory is full of cached files is not under pressure: available memory counts the cache.

- **The workload outgrew the installed memory**: browsers, Teams and Office together on 8 GB, a terminal server with more sessions than it was sized for, a database beside an application on one server. The memory rows of the process list name who holds it.
- **One process growing for days**: `playbooks/memory-or-handle-leak.md`.
- **A virtual machine's memory**: a guest given too little, or a host whose guests hold it. Hyper-V and WSL workers show as one large process.
- **Just after waking.** A machine resuming from sleep or hibernation reads memory back from disk, and the first bucket after the wake can show seconds of paging wait per second and a saturated disk that are gone the next bucket. Count it only when it lasts beyond the resume.

Fast Startup turns Shut down into a hibernation of the Windows session, so a user who shuts down every night may not have restarted in weeks. A machine that recovers after Restart but not after Shut down points at something that grows with uptime.

## Committed memory at its limit

`ram_commit_near_limit` (value) is a different problem from paging. Windows refuses new memory once the total it has promised programs reaches what RAM plus the page files can back, and that can happen with physical memory to spare. Programs then fail to start, crash or refuse to open files, while the machine may feel fast.
How close commit is to the most the machine can ever commit, and why the page file cannot grow:

```lql
source = "<host>" AND sparklogs.topic = performance AND sparklogs.data.performance.commit_pct_of_reachable_max >= 90
```

Group by `sparklogs.data.performance.pagefile_growth_limit` (LQL): `no_pagefile` (value) (there is none), `at_max` (value) (each page file is at its maximum), `disk_space` (value) (its volume runs out of room first) or `none` (value) (it can still grow).
Windows' own records of the same condition:

```lql
source = "<host>" AND sparklogs.reason in (ram_commit_exhausted, pagefile_extended)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL). The low virtual memory diagnosis (`diagnosed` (value), event 2004) names the program holding the most committed memory in `win.eventlog.system.mem_top_consumer_image` (LQL), with `win.eventlog.system.mem_commit_bytes` (LQL) against `win.eventlog.system.mem_commit_limit_bytes` (LQL), and physical memory used against installed. Commit at its limit with physical memory free points at the page file size. The "Out of Virtual Memory" popup (`dialog` (value)) is the same condition as the user saw it; `pagefile_extended` (value) is Windows growing the page file before the limit.

Causes and their evidence:

- **No page file**, with a large program holding most of the RAM: commit reaches its limit and programs crash repeatedly.
- **A page file fixed at its maximum**, with one background service holding tens of gigabytes of commit while RAM is free: other services crash or fail to start, Windows Update fails with 0x8007000E, programs cannot create threads (error 1450), and sign-ins fail for lack of memory. The device's process memory rows and the low-memory diagnosis name the same service. That service is a leak: `playbooks/memory-or-handle-leak.md`.
- **A page file too small for the work**, on a small-memory machine at its commit limit every working day. A larger fixed size, or a system-managed page file, fixes it. One quiet day after the change is a lead, not proof.

The page file change itself is `page_file_configuration_changed` (value) (`playbooks/what-changed.md`). A tuning script, or someone saving disk space, often set the small or missing page file.
Out-of-memory failures show in other records too: 0x8007000E (E_OUTOFMEMORY), error 1450 (insufficient system resources) and error 1455 (paging file too small) in service and update failures, and program crashes with exception 0xC0000017 or 0xC000012D, which the agent counts as out-of-memory crashes in the performance readings. Reading those crashes: `playbooks/crashes-and-restarts.md`.

## Disk busy or disk slow

`disk_saturated` (value): the disk is working flat out with a long queue. That is load on a working disk: a backup, an antivirus scan, database maintenance, a large copy, Windows servicing, or a workload that outgrew the drive (a hard disk as the Windows disk is slow under any modern load). On a virtual machine, other guests on the same host storage cause it too. The process I/O rows during the span name who read and wrote, though they count non-disk I/O as well.

A disk that answers slowly at moderate load is a different problem. Check for disk and controller errors from the same hours:

```lql
source = "<host>" AND sparklogs.reason in (disk_io_retried, disk_io_failed, disk_paging_error, disk_bad_block, disk_controller_error, storage_controller_reset)
```

A `disk_latency_degraded` (value) or `disk_unresponsive` (value) condition, or any row from this query, continues in `playbooks/raid-or-storage-degraded.md` (**Slow or stalled disk**), which also reads Windows' slow-I/O records.

## Slow boot and slow shutdown

Windows times boots and shutdowns in Diagnostics-Performance and writes the record once the machine is idle again. SparkLogs keeps the records in the normal range at Info, so a slow boot can be compared with the device's usual ones.

```lql
source = "<host>" AND subsource = "win.eventlog.platform" AND sparklogs.reason in (os_boot_duration_high, os_shutdown_duration_high)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), then read the rows in time order.

- **The whole boot** (`whole_boot` (value), event 100): `win.eventlog.platform.boot_duration_ms` (LQL) is the total, split into `win.eventlog.platform.boot_main_path_ms` (LQL) (up to the desktop appearing) and `win.eventlog.platform.boot_post_boot_ms` (LQL) (from the desktop until the machine went idle). `win.eventlog.platform.boot_is_degradation` (LQL) true means Windows judged this boot slower than usual for this machine. `win.eventlog.platform.boot_startup_app_count` (LQL) counts startup apps.
  Slow boots often spend most of their time after the desktop appears: startup programs and agents still loading while the user tries to work. A long main path instead points at drivers, services, Group Policy at startup (`playbooks/group-policy.md`) or a slow disk.
- **What slowed it** (`component` (value), events 101, 103, 107 and 108): `win.eventlog.platform.startup_component` (LQL) names one program, driver or service, and `win.eventlog.platform.startup_component_degradation_ms` (LQL) how much longer it took than its own usual time. Group by the component over several boots: the one that recurs is the lead. Everything starts at once at boot, so a component can be slow because of the others; the times overlap and do not add up to the boot.
  Usual names: security and endpoint agents, Edge WebView2 hosts, Windows servicing (TiWorker.exe finishing a pending update), svchost.exe, OneDrive, Office, vendor support suites and RMM agents.
- **The whole shutdown** (event 200; `whole_shutdown` (value) when Windows judged it slower than usual, `measured` (value) otherwise): `win.eventlog.platform.shutdown_duration_ms` (LQL), with `win.eventlog.platform.shutdown_services_ms` (LQL) (services stopping) and `win.eventlog.platform.shutdown_user_session_ms` (LQL) (the user session closing: programs that will not close, logoff scripts, profile uploads). A services time near five seconds on many shutdowns is Windows' default wait for services that have not stopped. A total of many hours is not a shutdown anyone sat through: read it against the device's shutdown and boot marks.
- **What delayed it** (`component` (value), event 203): `win.eventlog.platform.shutdown_component` (LQL) names the service. Backup, database, VPN and security services slow to stop, and updates installing at shutdown, are the usual causes.

The same startup item slowing boots across a client:

```lql
sparklogs.reason = os_boot_duration_high AND sparklogs.reason_variant = component AND win.eventlog.platform.startup_component = "<program>"
```

Group by `source` (LQL). Match the program as the rows spell it. Many devices after one product update is that update.
A long wait at the sign-in screen, or after typing the password, is sign-in, not boot: `playbooks/slow-logon.md`.
A shutdown that never finishes and is ended at the power button leaves an unexpected shutdown: `playbooks/crashes-and-restarts.md`.

## Freezes with nothing hot

A freeze of a few seconds is shorter than a bucket and often below every condition.

```lql
source = "<host>" AND sparklogs.reason in (app_hang, service_hang, live_kernel_dump_requested, gpu_driver_reset)
```

Group by `sparklogs.reason` (LQL), then by `event_data.AppName` (LQL) for `app_hang` (value).
A hang of one program that lines up with a file share, an add-in, a scan or a busy disk points at what it waited on. Hangs of many programs at once point at the machine: the disk, paging or a driver. A live kernel dump or a display driver reset is the machine stalling and recovering: `playbooks/hardware-faults.md`.
Then read the overview over the complaint's minutes with the narrowest bucket. Nothing measured and nothing recorded leaves the application itself, its server, or the user's perception: say so.

## Slow over the network

When the slowness follows one kind of work, not the machine:

- File shares and mapped drives (Explorer and Office stalling on a share): `playbooks/file-share-access.md`.
- One line-of-business application, a VPN or a SaaS app: `playbooks/application-network-stall.md`.
- The whole connection (every site slow, Wi-Fi drops, the internet going away): `playbooks/network-connectivity.md`.

## Findings

Lead with the lane and its measured reading over the complaint window (for example, "the processor queue held 30 threads per core for three days"), then the process or disk that carried it, then the change or schedule that matches its onset.
Name a cause only with its evidence: a contributor during a span is a lead, a change before the onset is a candidate.
List the lanes measured and quiet, and the unmeasured ones that matter for this ticket (application response time, the hypervisor, the storage array, the far end), in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM12): application servers and SaaS backends, file servers without the agent, the virtualization host and its storage, a SAN or iSCSI array and its switches, the server's management controller.
