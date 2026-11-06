<!-- GENERATED reference. Do not hand-edit. -->
# System info fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.system_info.manufacturer` | string |  | The machine's manufacturer, from the firmware (SMBIOS). |
| `sparklogs.data.system_info.model` | string |  | The machine's model name, from the firmware (SMBIOS). |
| `sparklogs.data.system_info.sku` | string |  | The manufacturer's SKU (product number) for the machine. |
| `sparklogs.data.system_info.serial_number` | string |  | The machine's hardware serial number, for asset tracking. |
| `sparklogs.data.system_info.host_class` | string |  | Whether the agent treats this machine as a `workstation` or a `server`; `unknown` when it could not tell. A change raises no change event. |
| `sparklogs.data.system_info.chassis_type` | string |  | The machine's enclosure type, such as `desktop`, `laptop` or `server`. |
| `sparklogs.data.system_info.bios_version` | string |  | The firmware (BIOS or UEFI) version, as the machine reports it. |
| `sparklogs.data.system_info.bios_date` | string | date | The firmware's release date: a calendar date, sent as UTC midnight; read it as a date, not an instant. A two-digit year is read as 20YY. Absent when the firmware reports something that is not a date. |
| `sparklogs.data.system_info.bios_date_raw` | string |  | The firmware's release date as the firmware writes it in its SMBIOS table (BIOS Information, Release Date), with surrounding spaces removed, such as `06/16/23`. Present whenever the firmware gives one, whether or not it reads as a date. Absent when the firmware gives none. |
| `sparklogs.data.system_info.boot_mode` | string |  | How the machine boots: `uefi`, or `legacy` for BIOS or compatibility-mode boot. |
| `sparklogs.data.system_info.secure_boot` | bool |  | Whether Secure Boot is turned on. |
| `sparklogs.data.system_info.tpm_present` | bool |  | Whether the machine has a TPM that Windows can use. |
| `sparklogs.data.system_info.tpm_version` | string |  | The TPM specification version the chip supports, such as 2.0. Stored as text, not a number. |
| `sparklogs.data.system_info.memory_integrity_enabled` | bool |  | Whether Windows memory integrity (hypervisor-protected code integrity) is enforcing on kernel code. False when it is off or only auditing. Absent when it could not be read. |
| `sparklogs.data.system_info.os_edition` | string |  | The installed Windows edition, such as Windows 11 Pro. |
| `sparklogs.data.system_info.os_display_version` | string |  | The Windows feature-update version, such as 23H2, as Settings shows it. |
| `sparklogs.data.system_info.os_build` | integer |  | The Windows build number, such as 19045. |
| `sparklogs.data.system_info.os_revision` | integer |  | The Windows update revision: the number after the dot in the full build, such as 4170 in 19045.4170. Absent when it could not be read. |
| `sparklogs.data.system_info.os_install_date` | string | timestamp | When this Windows installation was set up. |
| `sparklogs.data.system_info.domain_joined` | bool |  | Whether the machine is joined to a domain, not a workgroup. |
| `sparklogs.data.system_info.domain_or_workgroup` | string |  | The domain the machine is joined to, or its workgroup. |
| `sparklogs.data.system_info.domain_join_type` | string |  | Which directory the machine is joined to: `workgroup` (none; a personal device registered with a Microsoft Entra work account counts here), `entra` (Microsoft Entra joined only), `ad` (Active Directory domain joined only) or `hybrid` (both). Windows 8.1 and Windows Server 2012 R2 cannot join Microsoft Entra, so they report only `workgroup` or `ad`. Absent when the join state could not be read. |
| `sparklogs.data.system_info.host_roles` | string_array |  | The server roles the agent detected: `dns_server`, `domain_controller`, `exchange`, `fslogix`, `hyper_v`, `sql_server`. An empty list means none. Absent when detection has not run yet; the previous value then stands. |
| `sparklogs.data.system_info.timezone` | string |  | The machine's time zone. A change, such as a laptop on automatic time zone that travels, raises no change event. |
| `sparklogs.data.system_info.timezone_utc_offset_min` | integer | minutes | The time zone's current offset from UTC in minutes, positive east of UTC, including daylight saving time when in effect: Pacific Daylight Time is -420. Absent when the time zone could not be read. |
| `sparklogs.data.system_info.timezone_dst_active` | bool |  | Whether daylight saving time is in effect now. False in standard time and in zones without daylight saving time. Absent when the time zone could not be read. |
| `sparklogs.data.system_info.is_vm` | bool |  | Whether the machine is a virtual machine. |
| `sparklogs.data.system_info.hypervisor` | string |  | The platform a virtual machine runs on: `hyperv`, `vmware`, `virtualbox`, `kvm`, `xen`, `aws`, `gce`, `parallels` or `ahv`. |
| `sparklogs.data.system_info.ram_total_bytes` | integer | bytes | Physical memory Windows can use: installed RAM minus what firmware and hardware reserve. On a Hyper-V machine with dynamic memory it moves with the memory the host assigns. |
| `sparklogs.data.system_info.ram_installed_bytes` | integer | bytes | Physical memory installed, as the firmware reports it. It stays put under Hyper-V dynamic memory, so a change means the hardware or the virtual machine's memory setting changed. Absent when the firmware does not report it or it could not be read; an unread value is not a change. |
| `sparklogs.data.system_info.cpu_model` | string |  | The processor's model name. |
| `sparklogs.data.system_info.logical_cores` | integer | count | How many logical processors the machine has. |
| `sparklogs.data.system_info.page_file_config` | string |  | The page file settings as Windows stores them: each page file's path, initial size and maximum size. |
| `sparklogs.data.system_info.crash_dump_type` | string |  | What Windows is set to write when it crashes with a stop error: `none`, `mini` (small memory dump), `kernel`, `full` (complete memory dump) or `automatic`. Absent when the setting could not be read or holds another value, which does not mean `none`. |
| `sparklogs.data.system_info.last_boot_time` | string | timestamp | When the machine last started. Always present. |
| `sparklogs.data.system_info.uptime_s` | integer | seconds | How long the machine has been running since it last started. Always present. |
| `sparklogs.data.system_info.reboot_pending` | bool |  | Whether the machine needs a restart to finish applying a change. Always present. |
| `sparklogs.data.system_info.reboot_pending_since` | string | timestamp | When the agent first saw the pending restart. Present only while a restart is pending. |
| `sparklogs.data.system_info.reboot_pending_reasons` | string_array |  | What is waiting on the restart: `cbs` (Windows servicing), `wu` (Windows Update), `file_rename` (a file replacement queued for restart) or `rename` (a computer rename). Always present, and empty when nothing is pending. |
