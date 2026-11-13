---
index: Hardware faults (WHEA, GPU, devices, heat)
aliases:
  - label: WHEA hardware errors
  - label: Display driver stopped responding
  - label: Device not working (Code 10, 43)
  - label: Overheating or thermal shutdown
---

# Hardware faults: WHEA errors, GPU resets, failing devices, heat and power

**Trigger.** "Event Viewer is full of WHEA errors", "the screen goes black and comes back", "the dock or this USB device keeps dropping", "Device Manager shows a yellow mark", or "the laptop shuts itself off when it gets hot".

**Accuracy.** Hardware records say what Windows and the firmware reported, not which part is bad. The part is named by repetition: the same error source, device or zone again and again.
Corrected hardware errors are counted per record, and one device can write hundreds of thousands a day from one PCI Express link. Count devices and device instances, never rows.
A fatal record written at startup is what the firmware handed Windows. Windows calls it "the previous boot", but it also appears after a clean, requested restart, when the error was raised during the restart or kept from an older session. Check whether a session actually ended in a crash before calling it the cause of one.
No hardware record does not clear the hardware. Desktop memory without error correction fails silently; a WHEA blue screen whose dump could not be written leaves only its stop code; a graphics driver can stop the machine with no display reset first; a server's management controller sees faults Windows never logs.
Temperatures, fan speeds, power supply readings and vendor diagnostics are not on the device.

**Feeds.** Windows Event Log, scoped with `subsource` (LQL); reasons and fields in each feed's `reasons.md` and `fields.md`. Non-storage hardware files under `service = hardware` (LQL) (`guides/service-taxonomy.md`).

- `win.eventlog.system` (value): WHEA-Logger (corrected and uncorrected errors, boot error records), Kernel-PnP driver load failures, the NVIDIA kernel driver, Kernel-Power and Kernel-Processor-Power, network adapter driver faults.
- `win.eventlog.platform` (value): devices that failed to start, dropped off after failing, or were held open; device setup and driver installs; thermal zones; USB controllers; live kernel dumps; desktop graphics contention; vendor firmware checks.
- `win.eventlog.application` (value): NVIDIA display and OpenGL driver errors (`gpu_driver_error` (value)).
- `sparklogs.device.state` (value): the `devices` (value) inventory (status and Device Manager problem per device, `fields/topic-devices.md`), conditions and hardware changes.

Blue screens, including 0x124 WHEA_UNCORRECTABLE_ERROR: `playbooks/crashes-and-restarts.md`. Disk, controller and SMART faults: `playbooks/raid-or-storage-degraded.md`. TPM: `playbooks/tpm-health.md`.

**Which fault is it.**

| What the device shows | Read |
|---|---|
| `hardware_error_corrected` (value), `hardware_error_uncorrected` (value) | **WHEA errors** |
| `gpu_driver_reset` (value), `gpu_driver_error` (value), `gpu_resources_saturated` (value), a blue screen blaming a display driver | **Graphics** |
| `device_start_failed` (value), `device_removed_after_failure` (value), `driver_load_failed` (value), `usb_controller_error` (value), a device in problem status | **Devices** |
| `thermal_cooling_engaged` (value), `cpu_throttled_under_load` (value), a critical thermal hibernate, battery at critical | **Heat and power** |
| `live_kernel_dump_requested` (value) | The machine froze long enough to trip a watchdog and recovered. The component it names is the lead (below). |
| `cpu_interrupt_storm` (value) | A driver is spending the CPU on interrupts: usually a network, storage, audio or USB device or a dock. **Devices**, and `playbooks/slow-device.md` for the load. |

**Device health first.** `query_device_health` (tool); views in `guides/device-state-fields.md` (**Choose the view**).

- The device overview over the complaint's window: its episodes carry `cpu_throttled_under_load` (value), `cpu_interrupt_storm` (value) and `power_wake_loop` (value); its changes carry `installed_memory_changed` (value), `cpu_configuration_changed` (value), `hardware_identity_changed` (value), `bios_version_changed` (value) and driver installs and updates.
  Installed memory that dropped on a physical machine is a module the firmware stopped using: a failed or loose module.
- The device's current `devices` (value) inventory: every device matching `sparklogs.data.devices[](status = "problem")` (LQL), with `sparklogs.data.devices[].problem` (LQL), `sparklogs.data.devices[].problem_code` (LQL) (Device Manager's "Code N") and `sparklogs.data.devices[].problem_status_name` (LQL). It is the standing state; the events below are when it broke.
  A device that is absent or not started is not a fault by itself: the problem status and code are the faults.
- The driver behind a device: `sparklogs.data.devices[].driver_package` (LQL) links to the `drivers` (value) row (version, date, provider). What changed before the first fault: `playbooks/what-changed.md`.

## WHEA errors

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (hardware_error_corrected, hardware_error_uncorrected)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), `win.eventlog.system.error_source` (LQL), `win.eventlog.system.device_instance` (LQL).

- `error_source_record` (value) is a live record (events 17 to 20). `win.eventlog.system.error_source` (LQL) is the number Windows wrote; the message names it (seen: 1 corrected machine check, 3 machine check exception, 4 PCI Express Advanced Error Reporting, 8 generic). The message also names the component: a PCI Express endpoint, a root port, or a processor core.
- `win.eventlog.system.device_instance` (LQL) on PCI Express errors is the device's hardware id: `VEN_` names the chip's vendor and `DEV_` the chip. Match it to the inventory with `sparklogs.data.devices[](vendor_id = "<ven>" AND product_id = "<dev>")` (LQL), lowercase, to get its name and driver.
- `boot_corrected` (value), `boot_recoverable` (value) and `boot_unrecoverable` (value) are WHEA-Logger event 1 at startup. Read `win.eventlog.system.cper_severity` (LQL), `win.eventlog.system.cper_section_types` (LQL), `win.eventlog.system.cper_flags` (LQL) and `win.eventlog.system.cper_error_ts` (LQL) when present. Sections that are all firmware record references mean only the firmware holds the details: the server's management controller or the maker's diagnostics.

**Corrected PCI Express errors from one device.** Thousands a day from one endpoint, often a Wi-Fi or network adapter, sometimes a graphics card or its root port, is the link between the card and the board retrying, usually under PCI Express power saving.
It is not an imminent failure, but it fills the log and can come with drops on that device. The fixes are the maker's BIOS and chipset updates and the device's driver; turning off PCI Express link power saving is the usual workaround. Reseat or replace the card when updates do not stop it.
A few corrected PCI Express errors a day on many devices of one model is a platform trait, not a fault.

**Corrected processor or memory errors** (event 19, a corrected machine check, or a memory component): the warning before an uncorrected one. A rate that grows, or one processor core or memory location repeating, is the part to test: the maker's diagnostics or Windows Memory Diagnostic.

**Uncorrected errors.** Event 18 or 20 is a fatal or uncorrected error. A processor machine check names its error type (such as a cache hierarchy error) and the processor (APIC ID) in the message: the same error type and processor each time is the same unit, a different one each time points at power, heat, overclocking or the board.
Read the record against the device's restarts (`playbooks/crashes-and-restarts.md`, **Unexpected restart with no blue screen**):

- After a blue screen or an unclean stop: the hardware error is the likely cause of that stop.
- After a clean shutdown or requested restart, at every boot: no session ended in that error, so it was most likely raised by the firmware during startup or kept from an older session. Read it with the other startup errors on the same boots (TPM initialization in `playbooks/tpm-health.md`, Secure Boot updates, firmware speed limits): a BIOS update is the first step, then the maker's diagnostics.

A 0x124 blue screen's first parameter names the error source (Microsoft's bug check reference): 0x0 machine check, 0x4 PCI Express, 0x10 a device driver reporting that its device failed. When the dump was not written (`dump_unavailable` (value)), the stop code and parameters are the only record. With 0x10 and no dump, read the device's disk faults first (`playbooks/raid-or-storage-degraded.md`): a failing drive can both raise the error and stop the dump being written.

## Graphics

```lql
source = "<host>" AND sparklogs.reason in (gpu_driver_reset, gpu_driver_error, gpu_resources_saturated, live_kernel_dump_requested)
```

Group by `sparklogs.reason` (LQL), `provider_name` (LQL).
`gpu_driver_reset` (value) is the NVIDIA driver's event 153: the card stopped answering and was reset (Timeout Detection and Recovery). Windows' own record of a recovered display driver, Display event 4101, and other NVIDIA driver records are not curated:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND ((provider_name = "Display" AND event_id = 4101) OR (provider_name = "nvlddmkm" AND event_id in (0, 14, 153)))
```
<!-- confirmed with data on 2026-11-12 -->

- Windows resets a graphics card that does not finish its work within two seconds, and the screen flickers or goes black briefly. By default, five resets inside a minute end in a blue screen (Microsoft's TDR documentation).
- A reset also writes a live kernel dump: `live_kernel_dump_requested` (value) with `win.eventlog.platform.live_dump_component` (LQL) WATCHDOG. Other components name their own area, such as WHEA for a hardware error or DripsWatchdog for a Modern Standby device that did not reach low power.
- Resets that repeat with no driver change point at the driver version, heat, power or the card. Resets that began with a driver update point at the update (`playbooks/what-changed.md`).
- A blue screen blaming the display driver (0x116, 0x117, or 0x133 and 0x9F with a graphics driver blamed) can come with no reset recorded before it: read it in `playbooks/crashes-and-restarts.md` and treat it as the same graphics case.
- `gpu_resources_saturated` (value) is the desktop compositor out of graphics memory or bandwidth: displays, resolution or the workload, not a fault. NVIDIA's "high GPU memory usage" in `gpu_driver_error` (value) is the same kind of signal.
- A graphics device that failed to start is in **Devices** (`device_start_failed` (value) with a display driver service).

## Devices that fail to start or drop off

```lql
source = "<host>" AND sparklogs.reason in (device_start_failed, device_removed_after_failure, driver_load_failed, device_software_install_failed, device_install_reboot_pending, usb_controller_error)
```

Group by `sparklogs.reason` (LQL), `win.eventlog.platform.device_class` (LQL).

- `device_start_failed` (value) is Kernel-PnP event 411. Group by `event_data.Problem` (LQL), `win.eventlog.platform.device_service` (LQL), `win.eventlog.platform.driver_inf` (LQL), `sparklogs.result.code` (LQL). The problem is the Device Manager code in hex: 0xa is code 10 (did not start), 0xc code 12 (resource conflict), 0x25 code 37 (driver failed to load), 0x2b code 43 (Windows stopped the device after it reported problems). Code 43 that persists after a driver and firmware update is hardware.
- `device_removed_after_failure` (value) is event 1011: the device dropped off its bus after its driver reported it failing. `win.eventlog.platform.device_class` (LQL) PCI or another internal bus is a hardware ticket; USB points at the cable, hub, dock or port first. `event_data.DeviceInstanceId` (LQL) names the device; `USB\VID_0000` is Windows' placeholder for a USB device that never answered (Device Manager's Unknown USB Device): the device, cable or port, not a driver.
  Count per device: one USB device dropping hundreds of times a day is that device or port; a few a week across many devices is ordinary.
- `driver_load_failed` (value) is Kernel-PnP event 219. Arm `wudf_reflector_entry` (value) (WUDFRd with 0xC0000365) is routine and dominates the count; exclude it. Read `win.eventlog.system.driver_name` (LQL) and `sparklogs.result.code` (LQL) on the rest: 0xC0000034 the driver file is missing, 0xC000036B Windows blocked the driver (the vulnerable driver blocklist or memory integrity), 0xC0000428 the driver's signature failed.
- `usb_controller_error` (value) on the same host daily: chipset driver, platform and dock firmware. Try another port or dock to tell a controller from a dock.
- `nic_driver_fault_reported` (value): the network adapter's driver reported the card failing; `playbooks/network-connectivity.md` for the drops it causes.
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
Arm `active` (value) is fans, `passive` (value) is Windows slowing the processor, `disengaged` (value) is the zone back under its trip point. Temperatures are in kelvin (`win.eventlog.platform.thermal_temperature_k` (LQL); subtract 273.15). Passive cooling that lasts hours on one device is airflow, dust, a fan, or a laptop used on a soft surface.
The rows record a zone crossing its trip point, not the temperature over time: no rows does not mean the device ran cool.

Stronger signals Windows writes uncurated to the System log:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND ((provider_name = "Microsoft-Windows-Kernel-Power" AND event_id in (88, 524)) OR (provider_name = "Microsoft-Windows-Kernel-Processor-Power" AND event_id = 37))
```
<!-- confirmed with data on 2026-11-12 -->

- Kernel-Power 88: Windows hibernated the machine because a zone reached its critical temperature. `event_data.ThermalZoneDeviceInstance` (LQL) names the zone and `event_data._HOT` (LQL) the trip in kelvin. Repeats are a cooling or battery fault to send to the maker; a battery zone running hot is a safety issue.
- Kernel-Power 524: the battery reached its critical level and Windows ran its critical battery action. A machine that "dies" on battery with this record ran flat.
- Kernel-Processor-Power 37: the firmware held a processor below its top speed, one row per logical processor, so count devices, not rows. Common on laptops on battery or warm; on a server under load it is heat, a power supply fault or a power cap, which `cpu_throttled_under_load` (value) reads from the clock: `playbooks/slow-device.md`.

`power_wake_loop` (value) is a machine waking itself from sleep: a wake timer, a network adapter or a USB device; the condition's prose names the commands that list them.
Repeated unclean stops with no blue screen and no record before them are power: `playbooks/crashes-and-restarts.md`.

## One device or many

Run the reason or the hardware id over the client or fleet, grouped by `source` (LQL):

```lql
sparklogs.reason = hardware_error_corrected AND win.eventlog.system.device_instance = "<hardware id>"
```

The same reason on many devices of one model, with no symptom, is that model's platform or driver: the maker's updates. One device alone with a growing count is that device's part.
For device start failures and removals, group by `win.eventlog.platform.driver_inf` (LQL) or `event_data.DeviceInstanceId` (LQL) the same way: a driver package failing everywhere after one rollout is the rollout.

## Findings

Lead with the fault kind and the device or part it names, with the count of devices and the rate per day, not rows.
Say whether the record came with a crash, an unclean stop, or a clean restart, and what that changes.
Name a failing part only with repetition on one source, device or zone; otherwise say what the record shows and list the maker's diagnostics, the management controller and memory tests in WHAT WAS NOT CHECKED.

**Off-endpoint** (HM22): the server's management controller log, the maker's hardware diagnostics and memory tests, BIOS and firmware advisories, temperatures and fan readings over time, the dock's firmware, a UPS or power supply's own logs.
