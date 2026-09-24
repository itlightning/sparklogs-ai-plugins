<!-- GENERATED reference. Do not hand-edit. -->
# System information fields

Full inventory every hour; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.system_info.manufacturer` | string |  | Who made the machine, from SMBIOS. |
| `sparklogs.data.system_info.model` | string |  | The machine's product name, from SMBIOS. |
| `sparklogs.data.system_info.sku` | string |  | The manufacturer's SKU for the machine. |
| `sparklogs.data.system_info.serial_number` | string |  | The machine's serial number: asset-audit data that identifies hardware, never a person. |
| `sparklogs.data.system_info.chassis_type` | string |  | What kind of enclosure the machine is in, such as `desktop`, `laptop` or `server`. |
| `sparklogs.data.system_info.bios_version` | string |  | The firmware version string, as the machine reports it. |
| `sparklogs.data.system_info.bios_date` | string |  | The firmware's release date, in the spelling SMBIOS gives it. |
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
| `sparklogs.data.system_info.host_roles` | string_array |  | What the machine is FOR, from a closed vocabulary: `dns_server`, `domain_controller`, `exchange`, `fslogix`, `hyper_v`, `sql_server`. Empty when detection ran and found none, which is how a demoted host retires a role; absent entirely when detection did not run, which leaves the last answer standing. |
| `sparklogs.data.system_info.timezone` | string |  | The time zone the machine is set to. |
| `sparklogs.data.system_info.is_vm` | bool |  | Whether the machine is virtual. |
| `sparklogs.data.system_info.hypervisor` | string |  | Which hypervisor a virtual machine runs on: `hyperv`, `vmware`, `virtualbox`, `kvm`, `xen`, `aws`, `gce`, `parallels` or `ahv`. |
| `sparklogs.data.system_info.ram_total_bytes` | integer | bytes | How much physical memory the machine has installed. |
| `sparklogs.data.system_info.cpu_model` | string |  | The processor's model name. |
| `sparklogs.data.system_info.logical_cores` | integer | count | How many logical processors the machine has, which is what a per-core figure elsewhere is divided by. |
| `sparklogs.data.system_info.page_file_config` | string |  | How the page file is configured, in the spelling Windows stores: path, initial size and maximum size. |
| `sparklogs.data.system_info.crash_dump_type` | string |  | What the machine is configured to write on a bugcheck, carried here as a posture fact beside the rest of the machine's identity. The same spelling `crash_dump_config` uses, so the two topics cannot disagree. |
| `sparklogs.data.system_info.last_boot_time` | string | timestamp | When the machine last started. Always present. |
| `sparklogs.data.system_info.uptime_s` | integer | seconds | How long the machine has been up, in whole seconds. Always present. |
| `sparklogs.data.system_info.reboot_pending` | bool |  | Whether the machine is waiting on a restart to finish applying something. Always present. |
| `sparklogs.data.system_info.reboot_pending_since` | string | timestamp | When the pending restart was first witnessed. Present only while one is outstanding. |
| `sparklogs.data.system_info.reboot_pending_reasons` | string_array |  | What is waiting on the restart, from a closed vocabulary: `cbs` for servicing, `wu` for Windows Update, `file_rename` for a queued file replacement, `rename` for a computer rename. Always present, and empty when nothing is pending. |
