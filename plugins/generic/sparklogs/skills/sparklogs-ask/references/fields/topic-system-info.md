<!-- GENERATED reference. Do not hand-edit. -->
# System info fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.system_info.manufacturer` | string |  | Who made the machine, from SMBIOS. |
| `sparklogs.data.system_info.model` | string |  | The machine's product name, from SMBIOS. |
| `sparklogs.data.system_info.sku` | string |  | The manufacturer's SKU for the machine. |
| `sparklogs.data.system_info.serial_number` | string |  | Hardware serial number for asset identification. |
| `sparklogs.data.system_info.host_class` | string |  | The agent's host class, `workstation` or `server`, from the same reading registration and heartbeat report; `unknown` when it could not be determined, where heartbeat leaves the key out instead. Display only: a change emits no change event. |
| `sparklogs.data.system_info.chassis_type` | string |  | What kind of enclosure the machine is in, such as `desktop`, `laptop` or `server`. |
| `sparklogs.data.system_info.bios_version` | string |  | The firmware version string, as the machine reports it. |
| `sparklogs.data.system_info.bios_date` | string | date | The firmware's release date. SMBIOS `MM/DD/YYYY` or `MM/DD/YY` (two-digit years are 19xx) is stored as `YYYY-MM-DD`; omitted when the firmware wrote anything else, so a reader of a date field always gets a date. |
| `sparklogs.data.system_info.boot_mode` | string |  | How the machine boots: `uefi`, or `legacy` for a BIOS or compatibility-mode boot. |
| `sparklogs.data.system_info.secure_boot` | bool |  | Whether Secure Boot is enabled. |
| `sparklogs.data.system_info.tpm_present` | bool |  | Whether the machine has a TPM available. |
| `sparklogs.data.system_info.tpm_version` | string |  | Which TPM specification the module implements. |
| `sparklogs.data.system_info.os_edition` | string |  | The installed Windows edition. |
| `sparklogs.data.system_info.os_display_version` | string |  | The feature-update version Windows shows to a user. |
| `sparklogs.data.system_info.os_build` | integer |  | The Windows `CurrentBuildNumber` as an integer. |
| `sparklogs.data.system_info.os_revision` | integer |  | The Windows Update Build Revision (`UBR`). Omitted when unreadable. |
| `sparklogs.data.system_info.os_install_date` | string | timestamp | When this Windows installation was first set up. |
| `sparklogs.data.system_info.domain_joined` | bool |  | Whether the machine is joined to a domain rather than in a workgroup. |
| `sparklogs.data.system_info.domain_or_workgroup` | string |  | The domain the machine is joined to, or the workgroup it is in. |
| `sparklogs.data.system_info.host_roles` | string_array |  | Detected roles: `dns_server`, `domain_controller`, `exchange`, `fslogix`, `hyper_v`, `sql_server`. An empty array clears previously detected roles. Absent when detection has not run, preserving the previous result. |
| `sparklogs.data.system_info.timezone` | string |  | The time zone the machine is set to. Display only: a zone change, such as a travelling laptop with automatic time zone, emits no change event. |
| `sparklogs.data.system_info.timezone_utc_offset_min` | integer | minutes | The time zone's offset from UTC now, in signed minutes EAST of UTC with any daylight saving in effect (Pacific daylight time is -420). Windows reports its bias in minutes west, so this is that bias negated. Absent when the time zone read failed. |
| `sparklogs.data.system_info.timezone_dst_active` | bool |  | Whether daylight saving time is in effect now; false in standard time and in zones without daylight saving. Absent when the time zone read failed. |
| `sparklogs.data.system_info.is_vm` | bool |  | Whether the machine is virtual. |
| `sparklogs.data.system_info.hypervisor` | string |  | Which hypervisor a virtual machine runs on: `hyperv`, `vmware`, `virtualbox`, `kvm`, `xen`, `aws`, `gce`, `parallels` or `ahv`. |
| `sparklogs.data.system_info.ram_total_bytes` | integer | bytes | Physical memory the OS can use: installed RAM less what firmware and drivers reserve. Compare `ram_installed_bytes`. |
| `sparklogs.data.system_info.ram_installed_bytes` | integer | bytes | Physical memory installed, as the firmware's SMBIOS tables report it: stable under Hyper-V dynamic memory, unlike `ram_total_bytes`, so a change is a hardware or VM memory configuration change. Absent when firmware does not report it, reports it malformed, or the read failed; an unread value is not a change. |
| `sparklogs.data.system_info.cpu_model` | string |  | The processor's model name. |
| `sparklogs.data.system_info.logical_cores` | integer | count | How many logical processors the machine has, which is what a per-core figure elsewhere is divided by. |
| `sparklogs.data.system_info.page_file_config` | string |  | How the page file is configured, in the spelling Windows stores: path, initial size and maximum size. |
| `sparklogs.data.system_info.crash_dump_type` | string |  | Configured bugcheck dump type, using the same values as `crash_dump_config`. Absent when the setting could not be read, which is not the same answer as `none`. |
| `sparklogs.data.system_info.last_boot_time` | string | timestamp | When the machine last started. Always present. |
| `sparklogs.data.system_info.uptime_s` | integer | seconds | How long the machine has been up, in whole seconds. Always present. |
| `sparklogs.data.system_info.reboot_pending` | bool |  | Whether the machine is waiting on a restart to finish applying something. Always present. |
| `sparklogs.data.system_info.reboot_pending_since` | string | timestamp | When the pending restart was first witnessed. Present only while one is outstanding. |
| `sparklogs.data.system_info.reboot_pending_reasons` | string_array |  | What is waiting on the restart, from a closed vocabulary: `cbs` for servicing, `wu` for Windows Update, `file_rename` for a queued file replacement, `rename` for a computer rename. Always present, and empty when nothing is pending. |
