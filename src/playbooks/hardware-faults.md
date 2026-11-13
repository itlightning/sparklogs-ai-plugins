---
index: Hardware faults (WHEA, GPU, devices, heat)
aliases:
  - label: Display driver stopped responding
  - label: Device not working (Code 10, 43)
  - label: Overheating or thermal shutdown
---

# Hardware faults: WHEA errors, GPU resets, failing devices, heat and power

**Trigger.** "Event Viewer is full of WHEA errors", "the screen goes black and comes back", "the dock or this USB device keeps dropping", "Device Manager shows a yellow mark", or "the laptop shuts itself off when it gets hot".

**Accuracy.** Hardware records say what Windows and the firmware reported, not which part is bad. The part is named by repetition: the same error source, device or zone again and again.
One device can write hundreds of thousands of corrected hardware errors a day from one PCI Express link. SparkLogs keeps one corrected PCI Express row (event 17) per error source and link, and one corrected memory row (event 47) per memory location, every five minutes, and each kept row carries the count of repeats it held back. Count devices, links and five-minute periods, never rows, and read a growing rate from the repeat counts.
A fatal record written at startup is what the firmware handed Windows. Windows calls it "the previous boot", but it also appears after a clean, requested restart, when the error was raised during the restart or kept from an older session. Check whether a session actually ended in a crash before calling it the cause of one.
No hardware record does not clear the hardware. Desktop memory without error correction fails silently. A WHEA blue screen whose dump could not be written leaves only its stop code. A graphics driver can stop the machine with no display reset first. A server's management controller sees faults Windows never logs.
Temperatures, fan speeds, power supply readings and vendor diagnostics are not on the device.

**Feeds.** Windows Event Log, scoped with `subsource` (LQL). Reasons and fields are in each feed's `reasons.md` and `fields.md`. Non-storage hardware files under `service = hardware` (LQL) (`guides/service-taxonomy.md`).

- `win.eventlog.system` (value): WHEA-Logger (corrected and uncorrected errors, boot error records), Kernel-PnP driver load failures, the NVIDIA kernel driver, Kernel-Power and Kernel-Processor-Power, network adapter driver faults.
- `win.eventlog.platform` (value): devices that failed to start, dropped off after failing, or were held open; device setup and driver installs; thermal zones; USB controllers; live kernel dumps; desktop graphics contention; the graphics kernel; vendor firmware checks.
- `win.eventlog.application` (value): NVIDIA display and OpenGL driver errors (`gpu_driver_error` (value)).
- `sparklogs.device.state` (value): the `devices` (value) inventory (status and Device Manager problem per device, `fields/topic-devices.md`), conditions and hardware changes.

Blue screens, including 0x124 WHEA_UNCORRECTABLE_ERROR: `playbooks/crashes-and-restarts.md`. Disk, controller and SMART faults: `playbooks/raid-or-storage-degraded.md`. TPM: `playbooks/tpm-health.md`.

**Which fault is it.**

| What the device shows | Read |
|---|---|
| `hardware_error_corrected` (value), `hardware_error_uncorrected` (value), other WHEA-Logger records | **WHEA errors** |
| `gpu_driver_reset` (value), `gpu_driver_error` (value), `gpu_resources_saturated` (value), a blue screen blaming a display driver | **Graphics** |
| `device_start_failed` (value), `device_removed_after_failure` (value), `driver_load_failed` (value), `usb_controller_error` (value), a device in problem status | **Devices** |
| `thermal_cooling_engaged` (value), `cpu_throttled_under_load` (value), `os_thermal_hibernated` (value), `win_battery_critical_action_triggered` (value) | **Heat and power** |
| `live_kernel_dump_requested` (value) | The machine froze long enough to trip a watchdog and recovered. The component it names is the lead (below). |
| `cpu_interrupt_storm` (value) | A driver is spending the CPU on interrupts: usually a network, storage, audio or USB device or a dock. **Devices**, and `playbooks/slow-device.md` for the load. |

**Device health first.** `query_device_health` (tool). Views are in `guides/device-state-fields.md` (**Choose the view**).

- The device overview over the complaint's window: its episodes carry `cpu_throttled_under_load` (value), `cpu_interrupt_storm` (value) and `power_wake_loop` (value). Its changes carry `installed_memory_changed` (value), `cpu_configuration_changed` (value), `hardware_identity_changed` (value), `bios_version_changed` (value) and driver installs and updates.
  Installed memory that dropped on a physical machine is a module the firmware stopped using: a failed or loose module.
- The device's current `devices` (value) inventory: every device matching `sparklogs.data.devices[](status = "problem")` (LQL), with `sparklogs.data.devices[].problem` (LQL), `sparklogs.data.devices[].problem_code` (LQL) (Device Manager's "Code N") and `sparklogs.data.devices[].problem_status_name` (LQL). It is the standing state. The events below say when it broke.
  A device that is absent or not started is not a fault by itself: the problem status and code are the faults.
- The driver behind a device: `sparklogs.data.devices[].driver_package` (LQL) links to the `drivers` (value) row (version, date, provider). What changed before the first fault: `playbooks/what-changed.md`.

## WHEA errors

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (hardware_error_corrected, hardware_error_uncorrected)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `win.eventlog.system.error_source` (LQL), `win.eventlog.system.device_instance` (LQL).

- `error_source_record` (value) is a live record (events 17 to 20). The message names the error source in words, such as a corrected machine check, a machine check exception, PCI Express Advanced Error Reporting or a generic source. `win.eventlog.system.error_source` (LQL) is WHEA-Logger's number for it, and that numbering differs from the one in a 0x124 blue screen's first parameter: read the words. The message also names the component: a PCI Express endpoint, a root port, or a processor core.
- `win.eventlog.system.device_instance` (LQL) on PCI Express errors is the device instance path, as Device Manager shows it. Its `VEN_` and `DEV_` part is the hardware id: `VEN_` names the chip's vendor and `DEV_` the chip. The part after the last backslash is that one slot on that one machine. Match it to the inventory with `sparklogs.data.devices[](vendor_id = "<ven>" AND product_id = "<dev>")` (LQL), lowercase, to get its name and driver.
- `memory_corrected` (value) is event 47, a corrected memory error ("Component: Memory", "Error Source: Corrected Machine Check"): error-correcting memory on a server or workstation fixed a bad bit. The event details hold the memory node, card, module and bank; the slot label printed on the board comes from the maker's diagnostics.
- `boot_corrected` (value), `boot_recoverable` (value) and `boot_unrecoverable` (value) are WHEA-Logger event 1 at startup. Read `win.eventlog.system.cper_severity` (LQL), `win.eventlog.system.cper_section_types` (LQL), `win.eventlog.system.cper_flags` (LQL) and `win.eventlog.system.cper_error_ts` (LQL) when present. Sections that are all firmware record references mean only the firmware holds the details: the server's management controller or the maker's diagnostics.

WHEA-Logger also writes records SparkLogs collects without a reason:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-WHEA-Logger" AND NOT sparklogs.reason!
```

Group by `event_id` (LQL). Event 3 is an informational hardware record whose details are only in its binary data.

**Corrected PCI Express errors from one device.** Thousands a day from one endpoint (a row in most five-minute periods, with large repeat counts), often a Wi-Fi or network adapter, sometimes a graphics card or its root port, is the link between the card and the board retrying, usually under PCI Express power saving.
It is not an imminent failure, but it fills the log and can come with drops on that device. The fixes are the maker's BIOS and chipset updates and the device's driver. Turning off PCI Express link power saving is the usual workaround. Reseat or replace the card when updates do not stop it.
A few corrected PCI Express errors a day on many devices of one model is a platform trait, not a fault.

**Corrected processor or memory errors** (event 19 for a processor core or cache, event 47 for memory): the warning before an uncorrected one. A rate that grows (more periods with a row, larger repeat counts on the memory rows), or one processor core repeating, is the part to test. For memory, the server's management controller log or the maker's diagnostics name the module, and Windows Memory Diagnostic tests a workstation.

**Uncorrected errors.** Event 18 or 20 is a fatal or uncorrected error. A processor machine check names its error type (such as a cache hierarchy error) and the processor (APIC ID) in the message. The same error type and processor each time is the same unit. A different one each time points at power, heat, overclocking or the board.
Read the record against the device's restarts (`playbooks/crashes-and-restarts.md`, **Unexpected restart with no blue screen**):

- After a blue screen or an unclean stop: the hardware error is the likely cause of that stop.
- After a clean shutdown or requested restart, at every boot: no session ended in that error, so it was most likely raised by the firmware during startup or kept from an older session. Read it with the other startup errors on the same boots (TPM initialization in `playbooks/tpm-health.md`, Secure Boot updates, firmware speed limits). A BIOS update is the first step, then the maker's diagnostics.

A 0x124 blue screen's first parameter names the error source (Microsoft's bug check reference): 0x0 machine check, 0x4 PCI Express, 0x10 a device driver reporting that its device failed. When the dump was not written (`dump_unavailable` (value)), the stop code and parameters are the only record. With 0x10 and no dump, read the device's disk faults first (`playbooks/raid-or-storage-degraded.md`): a failing drive can both raise the error and stop the dump being written.

## Graphics

```lql
source = "<host>" AND sparklogs.reason in (gpu_driver_reset, gpu_driver_error, gpu_resources_saturated, live_kernel_dump_requested)
```

Group by `sparklogs.reason` (LQL), `provider_name` (LQL).
- `gpu_driver_reset` (value) is the card stopping answering and being reset (Timeout Detection and Recovery): Display event 4101 for any maker's driver, and the NVIDIA driver's own event 153. The 4101 message names the driver (`nvlddmkm` (other) NVIDIA, `amdkmdag` (other) or `amdkmdap` (other) AMD, `igfx` (other) Intel); group by `provider_name` (LQL) to tell the two apart, since one reset can write both.
- `gpu_driver_error` (value) on the System log is NVIDIA driver event 14, an error with no description. Read it by its time against resets and blue screens.
- `device_start_failed` (value) arm `adapter_start_failed` (value) is DxgKrnl event 549 on `win.eventlog.platform` (value): the graphics kernel failing to start a display adapter. `win.eventlog.platform.graphics_vendor_id` (LQL) is the adapter's PCI vendor id (`10de` (other) NVIDIA, `1002` (other) AMD, `8086` (other) Intel), the same form as the inventory's vendor id. A card that never starts is in **Devices** too.
- Windows resets a graphics card that does not finish its work within two seconds, and the screen flickers or goes black briefly. By default, five resets inside a minute end in a blue screen (Microsoft's TDR documentation).
- A reset also writes a live kernel dump: `live_kernel_dump_requested` (value) with `win.eventlog.platform.live_dump_component` (LQL) WATCHDOG. Other components name their own area, such as WHEA for a hardware error or DripsWatchdog for a Modern Standby device that did not reach low power.
- Resets that repeat with no driver change point at the driver version, heat, power or the card. Resets that began with a driver update point at the update (`playbooks/what-changed.md`).
- A blue screen blaming the display driver (0x116, 0x117, or 0x133 and 0x9F with a graphics driver blamed) can come with no reset recorded before it. Read it in `playbooks/crashes-and-restarts.md` and treat it as the same graphics case.
- `gpu_resources_saturated` (value) is the desktop compositor out of graphics memory or bandwidth: displays, resolution or the workload, not a fault. NVIDIA's "high GPU memory usage" in `gpu_driver_error` (value) is the same kind of signal.
- A graphics device that failed to start is in **Devices** (`device_start_failed` (value) with a display driver service).

## Devices that fail to start or drop off

```lql
source = "<host>" AND sparklogs.reason in (device_start_failed, device_removed_after_failure, driver_load_failed, device_software_install_failed, device_install_reboot_pending, usb_controller_error)
```

Group by `sparklogs.reason` (LQL), then by `win.eventlog.platform.device_class` (LQL) for the device rows and `win.eventlog.system.driver_name` (LQL) for `driver_load_failed` (value), which carries no device class.

- **Software devices are not hardware.** `win.eventlog.platform.device_class` (LQL) ROOT, or a `driver_load_failed` (value) instance path starting `ROOT\`, is a device Windows or a program created in software. In the inventory these are `sparklogs.data.devices[](bus = "root")` (LQL), and `swd` (other) is a software device too. Its fault is the driver package or the feature that installed it, never a part to replace. Two are routine: the Windows Hello face software driver (helloface.inf on the WUDFRd service, code 37) failing on a PC with no infrared camera, and the Hyper-V virtual switch miniport (`ROOT\VMS_VSMP`, code 10). A vendor utility's software device failing points at that utility's install.
- `device_start_failed` (value) arm `driver_start_failed` (value) is Kernel-PnP event 411. Group by `win.eventlog.platform.pnp_problem_code` (LQL), `win.eventlog.platform.device_service` (LQL), `win.eventlog.platform.driver_inf` (LQL), `sparklogs.result.code` (LQL). The problem code is Device Manager's "Code N", with its name in `win.eventlog.platform.pnp_problem_code_name` (LQL) for the common codes: 10 did not start, 12 resource conflict, 37 driver failed to load, 43 Windows stopped the device after it reported problems. Code 43 on a physical device that persists after a driver and firmware update is hardware.
- `device_removed_after_failure` (value) is event 1011: the device dropped off its bus after its driver reported it failing. `win.eventlog.platform.device_class` (LQL) PCI or another internal bus is a hardware ticket. USB points at the cable, hub, dock or port first. `event_data.DeviceInstanceId` (LQL) names the device. `USB\VID_0000` is Windows' placeholder for a USB device that never answered (Device Manager's Unknown USB Device): the device, cable or port, not a driver.
  Count per device: one USB device dropping hundreds of times a day is that device or port. A few a week across many devices is ordinary.
- `driver_load_failed` (value) is Kernel-PnP event 219. The user-mode driver host (`win.eventlog.system.driver_name` (LQL) `\Driver\WUDFRd`) failing with 0xC0000365 is routine. Exclude it:

  ```lql
  source = "<host>" AND sparklogs.reason = driver_load_failed AND NOT (win.eventlog.system.driver_name = "\\Driver\\WUDFRd" AND sparklogs.result.code = "0xc0000365")
  ```

  Read `win.eventlog.system.driver_name` (LQL) and `sparklogs.result.code` (LQL) on the rest: 0xC0000034 the driver file is missing, 0xC000036B Windows blocked the driver (the vulnerable driver blocklist or memory integrity), 0xC0000428 the driver's signature failed.
- `usb_controller_error` (value) on the same host daily: chipset driver, platform and dock firmware. Try another port or dock to tell a controller from a dock.
- `nic_driver_fault_reported` (value): the network adapter's driver reported the card failing. `playbooks/network-connectivity.md` covers the drops it causes.
- **Dock or device.** In the inventory, `sparklogs.data.devices[].parent_device` (LQL) is the device's parent, linked to that parent's row by `sparklogs.data.devices[].instance` (LQL). For a failing USB device it names the hub or dock it hangs from. Several devices failing under one parent is the dock or hub. One device failing under a parent whose other devices work is that device or its cable.
- A device that changed into a problem state shows in the inventory changes, so the time it broke is a query:

```lql
source = "<host>" AND sparklogs.topic = devices AND sparklogs.kind = delta AND sparklogs.data.devices[](status = "problem")
```

`device_removal_vetoed` (value), `portable_device_unresponsive` (value) and the Dell firmware checks (`firmware_verification_scan_failed` (value), `firmware_event_store_unavailable` (value)) are not device faults: a held device, a phone or camera, and a check that did not finish.

## Heat and power

```lql
source = "<host>" AND subsource = "win.eventlog.platform" AND sparklogs.reason = thermal_cooling_engaged
```

Group by `sparklogs.reason_variant` (LQL), `win.eventlog.platform.thermal_zone` (LQL).
The variant `active` (value) is fans, `passive` (value) is Windows slowing the processor, and `disengaged` (value) is the zone back under its trip point. Temperatures are in kelvin (`win.eventlog.platform.thermal_temperature_k` (LQL), subtract 273.15). Passive cooling that lasts hours on one device is airflow, dust, a fan, or a laptop used on a soft surface.
The rows record a zone crossing its trip point, not the temperature over time: no rows does not mean the device ran cool.

Stronger signals on the System log:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (os_thermal_hibernated, win_battery_critical_action_triggered)
```

- `os_thermal_hibernated` (value) is Kernel-Power 88: Windows hibernated the machine because a zone reached its hibernate temperature. `win.eventlog.system.thermal_zone` (LQL) names the zone and `win.eventlog.system.thermal_hot_k` (LQL) the trip in kelvin. Repeats are a cooling or battery fault to send to the maker. A battery zone running hot is a safety issue.
- `win_battery_critical_action_triggered` (value) is Kernel-Power 524 ("Battery Trigger Met"): the battery reached a trigger level in the power plan and Windows ran the plan's action (`win.eventlog.system.power_policy_action` (LQL): 0 none, 2 sleep, 3 hibernate, 4 shut down). `win.eventlog.system.battery_remaining_pct` (LQL) is the charge left and `win.eventlog.system.ac_online` (LQL) whether it was on mains power. A machine that "dies" on battery with a shut-down or hibernate action here reached the plan's trigger level; read the charge left before blaming the battery.

Windows also writes Kernel-Processor-Power 37, without a reason: the firmware held a processor below its top speed, with the seconds in `win.eventlog.system.reduced_state_s` (LQL).

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-Kernel-Processor-Power" AND win.eventlog.system.reduced_state_s!
```

- Count devices, not rows. It is common on laptops on battery or warm. On a server under load it is heat, a power supply fault or a power cap, which `cpu_throttled_under_load` (value) reads from the clock: `playbooks/slow-device.md`.

`power_wake_loop` (value) is a machine waking itself from sleep: a wake timer, a network adapter or a USB device. The condition's prose names the commands that list them.
Repeated unclean stops with no blue screen and no record before them point at power or a hang ended at the power button. Tell them apart in `playbooks/crashes-and-restarts.md` (**Unexpected restart with no blue screen**).

## One device or many

Run the reason and the hardware id over the client or fleet, grouped by `source` (LQL). The match on part of the instance path finds the same chip in any slot on any machine:

```lql
sparklogs.reason = hardware_error_corrected AND win.eventlog.system.device_instance: "VEN_<ven>&DEV_<dev>"
```

The same reason on many devices of one model, with no symptom, is that model's platform or driver: the maker's updates. One device alone with a growing count is that device's part.
For device start failures and removals, group by `win.eventlog.platform.driver_inf` (LQL) or `event_data.DeviceInstanceId` (LQL) the same way: a driver package failing everywhere after one rollout is the rollout.

## Findings

Lead with the fault kind and the device or part it names, with the count of devices and the rate per day, not rows.
Say whether the record came with a crash, an unclean stop, or a clean restart, and what that changes.
Name a failing part only with repetition on one source, device or zone. Otherwise say what the record shows and list the maker's diagnostics, the management controller and memory tests in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM22): the server's management controller log, the maker's hardware diagnostics and memory tests, BIOS and firmware advisories, temperatures and fan readings over time, the dock's firmware, a UPS or power supply's own logs.
