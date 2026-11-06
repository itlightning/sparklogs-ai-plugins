<!-- GENERATED reference. Do not hand-edit. -->
# Devices fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.devices.device` | string |  | The OS's name for this device node, opaque and meaningful only on this host: never parse it. Stable across reboots where the OS gives a stable name. Windows: the device instance id, lowercased. |
| `sparklogs.data.devices.display_name` | string |  | The name the OS shows for this device. Windows: the friendly name, else the device description, in the system language. Absent when the OS has neither. |
| `sparklogs.data.devices.device_type` | string |  | A normalized kind for grouping and icons: `processor`, `storage`, `network`, `display`, `audio`, `camera`, `input`, `usb`, `bluetooth`, `printer`, `portable`, `power`, `sensor`, `security`, `firmware`, `port`, `system`, `software` or `other`. More values may be added. Windows: from the setup class. Absent when the device has no class. |
| `sparklogs.data.devices.class` | string |  | The Windows setup class. Absent when the device has none, and on other OSes. |
| `sparklogs.data.devices.manufacturer` | string |  | The manufacturer the OS records. Windows: the text in the driver's INF, which can name the driver's author and not the hardware's maker. Absent when there is none. |
| `sparklogs.data.devices.bus` | string |  | Who enumerated this node, a bus or a software enumerator, lowercased (Windows `DEVPKEY_Device_EnumeratorName`: `pci`, `usb`, `acpi`, `root`, `swd`, ...). Not the physical link: a storage device's link is `storage_devices.transport`. |
| `sparklogs.data.devices.vendor_id` | string |  | The vendor id in this node's own name, lowercased, on `pci`, `usb` and `hid` nodes. Read it with `bus`: PCI and USB ids are separate registries. Absent on other buses, and when the name holds none. |
| `sparklogs.data.devices.product_id` | string |  | The product or device id in this node's own name, lowercased, on `pci`, `usb` and `hid` nodes. Read it with `vendor_id` and `bus`. Absent on other buses, and when the name holds none. |
| `sparklogs.data.devices.hardware_class` | string |  | The bus's own standard class code, lowercased. Read it with `bus`. `pci`: the class code, such as `020000`. `usb`: class, subclass and protocol, such as `03-01-02`. `hid`: usage page and usage, such as `0001-0002`. Absent on other buses, and when the device reports none. |
| `sparklogs.data.devices.hidden` | bool |  | Whether this device is left out of the default device view. Windows: hidden in Device Manager's default view. A hidden device is a row only while it reports a fault, so it arrives with the fault and leaves when the fault clears. |
| `sparklogs.data.devices.parent_device` | string |  | The nearest ancestor that is itself a row. Absent at the top of a tree. Links to the `devices` row with this `instance`. |
| `sparklogs.data.devices.install_ts` | string | timestamp | When the OS first installed this device, in UTC. Windows only. Absent when not recorded. |
| `sparklogs.data.devices.kernel_driver` | string |  | Link to the `kernel_drivers` row of the driver running this device. Absent when there is no such row to link: no driver, or a driver that is part of the OS kernel or runs outside it. Absent is not proof of no driver. A value with no matching row means that driver is not listed now. Windows: the function driver's service. |
| `sparklogs.data.devices.driver_package` | string |  | Link to the `drivers` row of the package bound to this device. Windows only. Absent when no package is bound. |
| `sparklogs.data.devices.status` | string |  | The device's run state as far as this OS can say: `started`, `not_started`, `disabled` (turned off by an administrator or policy; Windows problem 22), `problem`. More values may be added. `not_started` is normal for a device that needs no running driver, and its share differs by OS, so use `problem` to find faults. |
| `sparklogs.data.devices.problem` | string |  | The OS's name for what is wrong (Windows: the CM_PROB name in snake case; `unknown` for one this build does not name). Absent is not proof of health on an OS that keeps no record of a failure. |
| `sparklogs.data.devices.problem_code` | integer |  | Device Manager's "Code N". Windows only. Absent when the device node reports no problem, which does not mean the device started: read `status` for that. |
| `sparklogs.data.devices.problem_status_code` | integer |  | The NTSTATUS behind the problem, when Windows records one. Absent otherwise. |
| `sparklogs.data.devices.problem_status_name` | string |  | The name of `problem_status_code`, such as `STATUS_UNSUCCESSFUL`. Absent when the code has no known name. |
| `sparklogs.data.devices.problem_status_space` | string |  | The code table `problem_status_code` belongs to: `ntstatus`. Absent with the code. |
