<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.system`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Reconstruction guarantee

9 curated surface(s) drop the vendor body text below the synthesized first line.
That is never data loss: the provider payload is retained at rest, so a dropped body can be reconstructed from it.
What the body said is derivable; what it cost to ship it repeatedly is not.

## Module fields

Stored flat under the `win.eventlog.system.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.system.service_name` | string | Service or driver service the event is about, from Service Control Manager events 7000, 7009, 7011, 7022, 7023, 7024, 7031, 7034 and 7045 and UserPnp event 20003. Group by it to find one service that keeps failing. A vendor service crash arrives as a Service Control Manager event under its service name. |
| `win.eventlog.system.image_path` | string | Path of the program the installed service runs, from `ImagePath` on Service Control Manager event 7045, without its command-line arguments. Absent when the path cannot be separated from the arguments with certainty. The full command line is in the command line field. |
| `win.eventlog.system.service_type` | string | Service type as Windows wrote it on Service Control Manager event 7045, such as kernel mode driver or user mode service. |
| `win.eventlog.system.start_type` | string | Start type as Windows wrote it on Service Control Manager event 7045, such as auto start or demand start. |
| `win.eventlog.system.account_name` | string | Account the installed service runs as, from Service Control Manager event 7045, such as LocalSystem. |
| `win.eventlog.system.crash_count` | int | Number of times the service has stopped unexpectedly, from Service Control Manager events 7031 and 7034. A rising count means a service that keeps crashing. |
| `win.eventlog.system.service_error` | string | Error the service stopped or failed with, from Service Control Manager events 7000, 7023 and 7024, as Windows logged it. It may be a %%nnnn message reference instead of text. |
| `win.eventlog.system.bugcheck_code` | string | Stop code from `BugcheckCode` on Kernel-Power event 41, in decimal as Windows logged it. Nonzero means a stop error (blue screen) ended the previous session. Zero means none was recorded, so the cause (power loss, a hang, a held power button) is unknown. |
| `win.eventlog.system.bugcheck_name` | string | Name of the stop error, such as DRIVER_IRQL_NOT_LESS_OR_EQUAL, from Kernel-Power event 41 and WER-SystemErrorReporting event 1001. Absent when the code is zero or not a documented bug check. |
| `win.eventlog.system.sleep_in_progress` | string | Sleep state the machine was in when the session ended, from `SleepInProgress` on Kernel-Power event 41, as Windows logged it. A number, not a yes or no: values other than 0 and 1 occur. |
| `win.eventlog.system.connected_standby_in_progress` | string | Whether Modern Standby was active when the session ended, from `ConnectedStandbyInProgress` on Kernel-Power event 41, as Windows logged it (true or false). |
| `win.eventlog.system.shutdown_reason` | string | Reason given for the restart or shutdown, as Windows states it on User32 event 1074, such as "Operating System: Upgrade (Planned)". |
| `win.eventlog.system.shutdown_reason_code` | string | Shutdown reason code on User32 event 1074, as Windows writes it (0x...). It encodes the major and minor reason and whether the shutdown was planned. |
| `win.eventlog.system.shutdown_type` | string | What was requested on User32 event 1074: restart, power off, shutdown, or other when Windows wrote a value not on that list, such as one in another display language. |
| `win.eventlog.system.shutdown_type_text` | string | Shutdown type as Windows wrote it on User32 event 1074, kept only when it is not restart, power off or shutdown, so a machine in another display language keeps the meaning. |
| `win.eventlog.system.shutdown_comment` | string | Comment the person or program gave for the shutdown on User32 event 1074, such as the text passed to `shutdown /c`. Absent when empty. |
| `win.eventlog.system.recorded_at` | string | When Windows wrote EventLog event 6008, at the boot after an unexpected shutdown, in UTC (RFC 3339). The event time of that row is the time of the unexpected shutdown where Windows recorded one. Otherwise the two are equal. |
| `win.eventlog.system.bugcheck_text` | string | Full stop error text from WER-SystemErrorReporting event 1001, such as "0x0000001e (0x..., ...)": the stop code and its four parameters together identify the crash. |
| `win.eventlog.system.dump_file` | string | Path of the memory dump file, from WER-SystemErrorReporting event 1001. |
| `win.eventlog.system.report_id` | string | Windows Error Reporting report ID, from WER-SystemErrorReporting event 1001. A GUID on current Windows versions, and the minidump file name on Windows Server 2012 R2. |
| `win.eventlog.system.driver_name` | string | Driver that failed to load, from `FailureName` on Kernel-PnP event 219, such as \Driver\WUDFRd. |
| `win.eventlog.system.device_instance` | string | Device instance path the event is about, as Device Manager shows it under Details, from Kernel-PnP event 219, WHEA-Logger events 17 to 20 (`PrimaryDeviceName`), UserPnp event 20003 and DriverFrameworks-UserMode driver install events. |
| `win.eventlog.system.error_source` | string | Kind of hardware error source, as the number on WHEA-Logger events 17 to 20 (`ErrorSource`). |
| `win.eventlog.system.cper_decode` | string | How much of the hardware error record on WHEA-Logger event 1 SparkLogs could read: complete, partial (the record is shorter than it says or has more sections than are read), or invalid (the record failed a format check, and no other hardware error record field is set). |
| `win.eventlog.system.cper_error_ts` | string | Time of the hardware error as the WHEA-Logger event 1 record states it, in UTC (RFC 3339), as firmware or Windows recorded it on the machine clock. Present only when the record marks the time as valid and precise. |
| `win.eventlog.system.cper_revision` | string | Format revision of the hardware error record on WHEA-Logger event 1, as major.minor, such as 2.10. |
| `win.eventlog.system.cper_severity` | string | Severity the hardware error record on WHEA-Logger event 1 states: recoverable (uncorrected but not fatal), fatal, corrected or informational. |
| `win.eventlog.system.cper_notification` | string | How the hardware error on WHEA-Logger event 1 was reported: for example boot (found when Windows started), mce (machine check), cmc (corrected machine check), pcie or nmi, or the raw type GUID when it is not a published type. |
| `win.eventlog.system.cper_flags` | string | Flags on the hardware error record of WHEA-Logger event 1, separated by commas: previous error (it happened in an earlier session), recovered, or simulated (deliberately injected). None when no flag is set. |
| `win.eventlog.system.cper_flags_raw` | string | Flags on the hardware error record of WHEA-Logger event 1 as a hex value, including reserved bits. |
| `win.eventlog.system.cper_creator` | string | Software that wrote the hardware error record on WHEA-Logger event 1: Windows, a device driver, or the raw creator GUID. |
| `win.eventlog.system.cper_section_count` | int | Number of sections the hardware error record on WHEA-Logger event 1 says it has. |
| `win.eventlog.system.cper_section_types` | string | Type of each section of the hardware error record on WHEA-Logger event 1, in order, separated by commas: for example processor, machine check (IA32/x64 MCA), memory, PCIe, generic, a firmware record reference, or the raw type GUID. The first 16 at most. |
| `win.eventlog.system.cper_section_severities` | string | Severity of each section of the hardware error record on WHEA-Logger event 1, in section order, separated by commas. |
| `win.eventlog.system.cper_firmware_record_types` | string | For each section of the WHEA-Logger event 1 record that points to a firmware error record, the kind of firmware record, or the raw number. The firmware record itself stays in firmware and is not in the event. |
| `win.eventlog.system.framework_version` | string | UMDF (user-mode driver framework) version, from DriverFrameworks-UserMode driver install events. |
| `win.eventlog.system.volume` | string | Volume the storage event is about, from `DriveName` or `VolumeName` on Ntfs events and `VolumeName` on Volsnap (shadow copy) events. |
| `win.eventlog.system.filesystem` | string | File system the event is about, set from the provider that logged it. Today only NTFS events set it, so the value is always ntfs. |
| `win.eventlog.system.clsid` | string | CLSID of the COM server that did not register with DCOM in time, from DistributedCOM event 10010. |
| `win.eventlog.system.time_peer` | string | Time server the Windows Time service is configured to use, from `DomainPeer` on Time-Service events 47, 129 and 134. |
| `win.eventlog.system.conflict_ip_address` | string | IPv4 address of this machine that another device on the network is also using, read from the message of Tcpip event 4199. |
| `win.eventlog.system.conflict_hardware_address` | string | MAC address of the other device using the same IP address, read from the message of Tcpip event 4199. |
| `win.eventlog.system.dns_query_name` | string | DNS name the client was looking up when the lookup timed out, from `QueryName` on DNS-Client event 1014. |
| `win.eventlog.system.update_title` | string | Title of the update the install result is about, from `updateTitle` on WindowsUpdateClient event 20. Group by it to tell a bad update from a bad machine. |
| `win.eventlog.system.mem_commit_bytes` | int | Committed memory in bytes when Windows found virtual memory running low, from `SystemCommitCharge` on Resource-Exhaustion-Detector event 2004. The Committed figure in Task Manager. |
| `win.eventlog.system.mem_commit_limit_bytes` | int | Commit limit in bytes when Windows found virtual memory running low, from `SystemCommitLimit` on Resource-Exhaustion-Detector event 2004. The limit beside Committed in Task Manager. |
| `win.eventlog.system.mem_physical_bytes` | int | Installed physical memory in bytes, from `PhysicalMemorySize` on Resource-Exhaustion-Detector event 2004. |
| `win.eventlog.system.mem_physical_used_bytes` | int | Physical memory in use in bytes, from `PhysicalMemoryUsage` on Resource-Exhaustion-Detector event 2004. |
| `win.eventlog.system.mem_top_consumer_image` | string | Program that held the most committed memory when Windows found virtual memory running low, read from the message of Resource-Exhaustion-Detector event 2004. Absent when the message does not name one or is not in English. |
| `win.eventlog.system.tpm_command_ordinal` | int | TPM 2.0 command code Windows sent, from `TpmCommandOrdinal` on TPM event 17, as the number Windows wrote. `tpm_command` gives its name. |
| `win.eventlog.system.tpm_command` | string | Name of the TPM 2.0 command on TPM event 17, such as TPM2_CC_TestParms or TPM2_CC_Unseal. Absent for a code that is not a TPM 2.0 command, as on a TPM 1.2 device. |
| `win.eventlog.system.tpm_response_code` | int | Response the TPM or its driver returned, from `TpmResponseCode` on TPM event 17, as the number Windows wrote. A value of 3221225472 (0xC0000000) or more is a Windows driver status, not a TPM response. |
| `win.eventlog.system.tpm_response` | string | Name of the TPM 2.0 response code on TPM event 17, such as TPM2_RC_VALUE or TPM2_RC_AUTH_FAIL, without the bits that say which parameter, handle or session it refers to. Absent for a driver status or an unrecognized code. |
| `win.eventlog.system.tpm_response_position` | string | Which part of the command the TPM response refers to on TPM event 17: a parameter, a handle or a session, with its number in the order the command lists them. Absent when the response names none. |
| `win.eventlog.system.boot_pcrs` | array | Boot-time final PCR values from BitLocker-Driver event 24709, one entry per PCR in PCR order: `pcr` (the index), `value` (the digest in lowercase hex) and, on a UEFI boot, `role` (what that PCR measures, such as the core firmware code for PCR 0, the boot manager for PCR 4, the Secure Boot state for PCR 7, BitLocker access control for PCR 11). Absent when the values do not match the PCR list and digest size the event states. |
| `win.eventlog.system.boot_pcr_indices` | array | PCR indices BitLocker-Driver event 24709 recorded values for, in ascending order, from `AllFinalPcrValuesPcrBitmap`. Typically 0, 2, 4, 5, 7 and 11. |
| `win.eventlog.system.boot_pcr_fingerprint` | string | SHA-256 over the PCR list and all boot-time PCR values on event 24709. Equal on two boots of one device means the measured boot did not change. Different means at least one PCR value changed. |
| `win.eventlog.system.boot_pcr_hash_algorithm` | string | Hash bank the PCR values on event 24709 come from: sha1, sha256, sha384, sha512 or sm3_256, from `TcgLogHashAlgorithm`. |
| `win.eventlog.system.bitlocker_mismatched_pcr` | int | PCR whose value at boot differed from the value a BitLocker TPM protector was sealed to, from `MismatchedPcr` on BitLocker-Driver event 24706. 7 is the Secure Boot state, 4 the boot manager, 0 and 2 the firmware code. |
| `win.eventlog.system.bitlocker_binding_pcr_bitmap` | string | PCRs the BitLocker TPM protector is bound to, as the hex bitmap Windows wrote in `PcrBitmap` on BitLocker-Driver event 24706, one bit per PCR (0x880 is PCRs 7 and 11). |
| `win.eventlog.system.tpm_error_data` | int | Value the TPM driver wrote in `Data` on TPM event 15 (non-recoverable TPM hardware error), as the number Windows wrote. A value from 3221225472 (0xC0000000) up to 4294967294 is a Windows status word and is also named in the result fields. |
| `win.eventlog.system.tpm_reset_count_before` | int | TPM reset counter the driver expected after hibernate or resume, from `resetCountBefore` on TPM event 30. |
| `win.eventlog.system.tpm_reset_count_after` | int | TPM reset counter the driver read after hibernate or resume, from `resetCountAfter` on TPM event 30. One more than the value before means the TPM was reset once across the sleep. |
| `win.eventlog.system.tpm_restart_count_before` | int | TPM restart counter the driver expected after hibernate or resume, from `restartCountBefore` on TPM event 30. |
| `win.eventlog.system.tpm_restart_count_after` | int | TPM restart counter the driver read after hibernate or resume, from `restartCountAfter` on TPM event 30. |
| `win.eventlog.system.tpm_attestation_health_status` | string | Overall pre-attestation result Windows wrote in `HealthStatus` on TPM-WMI event 1041, such as Attestable, Possibly attestable or Cannot be attested. |
| `win.eventlog.system.tpm_attestation_pcrs_match_tcg_log` | bool | Whether the PCR values in the TPM match the boot log Windows recorded, from the PcrsMatchTcgLog check on TPM-WMI event 1041. False means the boot log cannot prove what the TPM measured. |
| `win.eventlog.system.tpm_attestation_tpm_responsive` | bool | Whether the TPM answered the pre-attestation checks, from the TpmIsResponsive check on TPM-WMI event 1041. |
| `win.eventlog.system.tpm_attestation_required_failed` | array | Required pre-attestation checks on TPM-WMI event 1041 whose value missed the desired value, by the check names Windows writes, such as EkCertIsAvailable. Any entry means the device cannot pass attestation. Present only when a Required or Expected check failed. |
| `win.eventlog.system.tpm_attestation_expected_failed` | array | Expected pre-attestation checks on TPM-WMI event 1041 whose value missed the desired value, such as PcrsMatchTcgLog. Present only when a Required or Expected check failed. |
| `win.eventlog.system.secure_boot_update_type` | string | Which Secure Boot update the TPM-WMI event is about, from `UpdateType` on events 1795, 1796, 1802 and 1808, such as KEK 2023, Windows UEFI CA 2023 (DB), DBX or SBAT. Older Windows builds write a number here instead of a name. |
| `win.eventlog.system.secure_boot_skip_reason` | string | Known-issue identifier that blocked a Secure Boot update, from `SkipReason` on TPM-WMI event 1802, such as KI_7. Microsoft does not publish what each identifier means. |
| `win.eventlog.system.secure_boot_bucket_confidence` | string | Microsoft rating of the 2023 Secure Boot certificate rollout for this hardware model, from `BucketConfidenceLevel` on TPM-WMI events 1795, 1802, 1803 and 1808, as the label Windows wrote. On 1808 the update is already applied and the label asks nothing of the device, even when it reads No Data Observed - Action Required. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.config_change.type` | The kind of object that changed, from a closed set of object nouns. |
| `sparklogs.config_change.action` | What was done to that object, from a closed set of verbs. |
| `sparklogs.config_change.target` | Which object it was: its own identity within its kind, as a name, a path or an id. A different field from the principal a change acted on, and a change acting on a principal carries both. |
| `sparklogs.config_change.target_name` | The object's name for a reader at the time of the change. Display only: join and group on target, never on this. |
| `sparklogs.config_change.category` | Positive upkeep classification, maintenance when established, omitted otherwise. |
| `sparklogs.actor.name` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.type` | The initiator. Who wanted the thing done. |
| `sparklogs.actor.domain` | The initiator. Who wanted the thing done. |
| `sparklogs.process.path` | The process the event is about. |
| `sparklogs.process.name` | The process the event is about. |

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `volume` | not queryable as a field |
| `process_path` | not queryable as a field |
| `actor` | not queryable as a field |
| `actor_domain` | not queryable as a field |
| `reason` | not queryable as a field |
| `reason_code` | not queryable as a field |
| `shutdown_type` | not queryable as a field |
| `comment` | not queryable as a field |
| `bugcheck_code` | not queryable as a field |
| `bugcheck_name` | not queryable as a field |
| `power_button_timestamp` | not queryable as a field |
| `error_ts` | not queryable as a field |
| `cper_decode` | not queryable as a field |
| `update_title` | not queryable as a field |
| `command` | not queryable as a field |
| `response` | not queryable as a field |
| `position` | not queryable as a field |
| `response_code` | not queryable as a field |
| `pcrs` | not queryable as a field |
| `fingerprint` | not queryable as a field |
| `pcr0` | not queryable as a field |
| `pcr1` | not queryable as a field |
| `pcr2` | not queryable as a field |
| `pcr3` | not queryable as a field |
| `pcr4` | not queryable as a field |
| `pcr5` | not queryable as a field |
| `pcr6` | not queryable as a field |
| `pcr7` | not queryable as a field |
| `pcr8` | not queryable as a field |
| `pcr9` | not queryable as a field |
| `pcr10` | not queryable as a field |
| `pcr11` | not queryable as a field |
| `pcr12` | not queryable as a field |
| `pcr13` | not queryable as a field |
| `pcr14` | not queryable as a field |
| `pcr15` | not queryable as a field |
| `pcr16` | not queryable as a field |
| `pcr17` | not queryable as a field |
| `pcr18` | not queryable as a field |
| `pcr19` | not queryable as a field |
| `pcr20` | not queryable as a field |
| `pcr21` | not queryable as a field |
| `pcr22` | not queryable as a field |
| `pcr23` | not queryable as a field |
| `secure_boot` | not queryable as a field |
| `mismatched_pcr` | not queryable as a field |
| `pcr_bitmap` | not queryable as a field |
| `driver_data` | not queryable as a field |
| `reset_before` | not queryable as a field |
| `reset_after` | not queryable as a field |
| `restart_before` | not queryable as a field |
| `restart_after` | not queryable as a field |
| `health_status` | not queryable as a field |
| `failed_checks` | not queryable as a field |
| `update_type` | not queryable as a field |
| `skip_reason` | not queryable as a field |
| `error_code` | not queryable as a field |
| `error_code_name` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `av_unsigned_code_blocked` / `default` | 514 | **fields: none** |  |
| `bitlocker_key_retrieval_code_reported` / `default` | 24641 | **fields: none** |  |
| `bitlocker_recovery_password_used` / `default` | 24652 | **fields: none** |  |
| `bitlocker_tpm_binding_mismatch` / `default` | 24706 | `win.eventlog.system.bitlocker_binding_pcr_bitmap` `win.eventlog.system.bitlocker_mismatched_pcr` |  |
| `bitlocker_tpm_unlock_failed` / `enhanced_pin_refused` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `bitlocker_tpm_unlock_failed` / `pcrs_mismatched` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `bitlocker_tpm_unlock_failed` / `protector_unusable` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `bitlocker_tpm_unlock_failed` / `secure_boot_changed` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `bitlocker_tpm_unlock_failed` / `secure_boot_disabled` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `bitlocker_tpm_unlock_failed` / `tpm_pin_refused` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `bitlocker_tpm_unlock_failed` / `tpm_refused` | 24635, 24636, 24638, 24643, 24657, 24658, 24721 | **fields: none** |  |
| `dcom_activation_timeout` / `default` | 10029 | **fields: none** |  |
| `dcom_register_timeout` / `default` | 10010 | `win.eventlog.system.clsid` |  |
| `dcom_start_failed` / `default` | 10005 | **fields: none** |  |
| `device_health_cert_service_unreachable` / `name_not_resolved` | 1538 | **fields: none** |  |
| `device_health_cert_service_unreachable` / `other_error` | 1538 | **fields: none** |  |
| `disk_bad_block` / `default` | 7 | **fields: none** |  |
| `disk_controller_error` / `default` | 11 | **fields: none** |  |
| `disk_failure_predicted` / `default` | 52 | **fields: none** |  |
| `disk_io_failed` / `default` | 154 | **fields: none** |  |
| `disk_io_retried` / `default` | 153 | **fields: none** |  |
| `disk_paging_error` / `default` | 51 | **fields: none** |  |
| `disk_surprise_removal` / `default` | 157 | **fields: none** |  |
| `dns_client_resolution_timed_out` / `default` | 1014 | `win.eventlog.system.dns_query_name` |  |
| `dns_registration_failed` / `default` | 8015, 8016, 8017, 8018, 8019, 8020, 8021, 8022, 8023, 8024, 8025, 8026, 8033, 8034, 8035, 8036, 8037, 8038 | **fields: none** |  |
| `domain_secure_channel_failed` / `dc_unreachable` | 5719 | **fields: none** |  |
| `domain_secure_channel_failed` / `other_cause` | 5719 | **fields: none** |  |
| `domain_secure_channel_failed` / `trust_broken` | 5719 | **fields: none** |  |
| `driver_load_failed` / `failed` | 219 | `win.eventlog.system.device_instance` `win.eventlog.system.driver_name` |  |
| `driver_load_failed` / `wudf_reflector_entry` | 219 | `win.eventlog.system.device_instance` `win.eventlog.system.driver_name` |  |
| `ephemeral_port_alloc_failed` / `default` | 4231, 4266 | **fields: none** |  |
| `failover_cluster_csv_unavailable` / `default` | 5120, 5142 | **fields: none** |  |
| `failover_cluster_node_config_stale` / `default` | 1561 | **fields: none** |  |
| `failover_cluster_node_removed` / `default` | 1135 | **fields: none** |  |
| `failover_cluster_resource_failed` / `default` | 1069 | **fields: none** |  |
| `failover_cluster_resource_hang` / `default` | 1230 | **fields: none** |  |
| `failover_cluster_resource_host_crash` / `default` | 1146 | **fields: none** |  |
| `failover_cluster_service_down` / `default` | 1006, 1073, 1177 | **fields: none** |  |
| `filesystem_corruption` / `correction_required` | 7, 55, 98, 130, 131, 132, 133 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_corruption` / `corruption_discovered` | 7, 55, 98, 130, 131, 132, 133 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_corruption` / `disk` | 7, 55, 98, 130, 131, 132, 133 | **fields: none** |  |
| `filesystem_corruption` / `offline_repair_required` | 7, 55, 98, 130, 131, 132, 133 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_corruption` / `repair_activity` | 7, 55, 98, 130, 131, 132, 133 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_corruption` / `repair_posting_throttled` | 7, 55, 98, 130, 131, 132, 133 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_corruption` / `torn_write_detected` | 7, 55, 98, 130, 131, 132, 133 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_delayed_write_lost` / `default` | 50 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_transaction_log_operation_failed` / `flush_failed` | 134, 136, 137, 140 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_transaction_log_operation_failed` / `metadata_reset` | 134, 136, 137, 140 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_transaction_log_operation_failed` / `recovery_error` | 134, 136, 137, 140 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `filesystem_transaction_log_operation_failed` / `start_failed` | 134, 136, 137, 140 | `win.eventlog.system.filesystem` `win.eventlog.system.volume` |  |
| `gpu_driver_reset` / `default` | 153 | **fields: none** |  |
| `group_policy_processing_failed` / `default` | 1129 | **fields: none** |  |
| `group_policy_software_install_failed` / `deferred` | 101, 102, 103, 108, 1112 | **fields: none** |  |
| `group_policy_software_install_failed` / `install_failed` | 101, 102, 103, 108, 1112 | **fields: none** |  |
| `hardware_error_corrected` / `boot_corrected` | 1 | `win.eventlog.system.cper_creator` `win.eventlog.system.cper_decode` `win.eventlog.system.cper_error_ts` `win.eventlog.system.cper_firmware_record_types` `win.eventlog.system.cper_flags` `win.eventlog.system.cper_flags_raw` `win.eventlog.system.cper_notification` `win.eventlog.system.cper_revision` `win.eventlog.system.cper_section_count` `win.eventlog.system.cper_section_severities` `win.eventlog.system.cper_section_types` `win.eventlog.system.cper_severity` |  |
| `hardware_error_corrected` / `error_source_record` | 17, 19 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |  |
| `hardware_error_uncorrected` / `boot_recoverable` | 1 | `win.eventlog.system.cper_creator` `win.eventlog.system.cper_decode` `win.eventlog.system.cper_error_ts` `win.eventlog.system.cper_firmware_record_types` `win.eventlog.system.cper_flags` `win.eventlog.system.cper_flags_raw` `win.eventlog.system.cper_notification` `win.eventlog.system.cper_revision` `win.eventlog.system.cper_section_count` `win.eventlog.system.cper_section_severities` `win.eventlog.system.cper_section_types` `win.eventlog.system.cper_severity` |  |
| `hardware_error_uncorrected` / `boot_unrecoverable` | 1 | `win.eventlog.system.cper_creator` `win.eventlog.system.cper_decode` `win.eventlog.system.cper_error_ts` `win.eventlog.system.cper_firmware_record_types` `win.eventlog.system.cper_flags` `win.eventlog.system.cper_flags_raw` `win.eventlog.system.cper_notification` `win.eventlog.system.cper_revision` `win.eventlog.system.cper_section_count` `win.eventlog.system.cper_section_severities` `win.eventlog.system.cper_section_types` `win.eventlog.system.cper_severity` |  |
| `hardware_error_uncorrected` / `error_source_record` | 18, 20 | `win.eventlog.system.device_instance` `win.eventlog.system.error_source` |  |
| `http_ssl_binding_created` / `default` | 120, 15301 | **fields: none** |  |
| `http_ssl_binding_deleted` / `default` | 119, 15300 | **fields: none** |  |
| `http_ssl_config_failed` / `default` | 15021 | **fields: none** |  |
| `hyperv_vswitch_config_restore_failed` / `default` | 15 | **fields: none** |  |
| `iis_apppool_disabled` / `default` | 5002 | **fields: none** |  |
| `iis_apppool_identity_invalid` / `default` | 5021, 5057 | **fields: none** |  |
| `iis_apppool_worker_start_failed` / `default` | 5059 | **fields: none** |  |
| `iis_worker_crash` / `default` | 5009, 5011 | **fields: none** |  |
| `ip_address_conflict_detected` / `default` | 4199 | `win.eventlog.system.conflict_hardware_address` `win.eventlog.system.conflict_ip_address` |  |
| `kerberos_cert_domain_unresolved` / `default` | 11 | **fields: none** |  |
| `kerberos_etype_unsupported` / `default` | 16, 203 | **fields: none** |  |
| `kerberos_pac_verify_failed` / `default` | 18 | **fields: none** |  |
| `kerberos_smartcard_cert_missing` / `default` | 19, 29 | **fields: none** |  |
| `kerberos_weak_krbtgt_key` / `default` | 42 | **fields: none** |  |
| `nic_driver_fault_reported` / `default` | 5002, 5005 | **fields: none** |  |
| `nic_driver_load_failed` / `default` | 5000 | **fields: none** |  |
| `nic_link_down` / `down` | 1, 2, 27, 32, 33, 34 | **fields: none** |  |
| `nic_link_down` / `recovered` | 1, 2, 27, 32, 33, 34 | **fields: none** |  |
| `os_boot` / `default` | 12 | **fields: none** |  |
| `os_bsod` / `default` | 1001 | `win.eventlog.system.bugcheck_name` `win.eventlog.system.bugcheck_text` `win.eventlog.system.dump_file` `win.eventlog.system.report_id` |  |
| `os_restart_requested` / `default` | 1074 | `win.eventlog.system.shutdown_comment` `win.eventlog.system.shutdown_reason` `win.eventlog.system.shutdown_reason_code` `win.eventlog.system.shutdown_type` `win.eventlog.system.shutdown_type_text` |  |
| `os_shutdown` / `default` | 13 | **fields: none** |  |
| `os_sleep` / `default` | 42, 506 | **fields: none** |  |
| `os_wake` / `default` | 1, 507 | **fields: none** |  |
| `pagefile_extended` / `default` | 26 | **fields: none** |  |
| `patch_install_deferred` / `packages_in_use` | 20 | `win.eventlog.system.update_title` |  |
| `patch_install_deferred` / `retry_later` | 20 | `win.eventlog.system.update_title` |  |
| `patch_install_failed` / `failed` | 20 | `win.eventlog.system.update_title` |  |
| `patch_install_failed` / `interrupted` | 20 | `win.eventlog.system.update_title` |  |
| `platform_tamper_indicator_reported` / `detected` | 11, 12 | **fields: none** |  |
| `platform_tamper_indicator_reported` / `escalated` | 11, 12 | **fields: none** |  |
| `platform_tamper_indicator_reported` / `partial` | 11, 12 | **fields: none** |  |
| `platform_tamper_indicator_reported` / `reported` | 11, 12 | **fields: none** |  |
| `ram_commit_exhausted` / `diagnosed` | 26, 2004 | `win.eventlog.system.mem_commit_bytes` `win.eventlog.system.mem_commit_limit_bytes` `win.eventlog.system.mem_physical_bytes` `win.eventlog.system.mem_physical_used_bytes` `win.eventlog.system.mem_top_consumer_image` |  |
| `ram_commit_exhausted` / `dialog` | 26, 2004 | **fields: none** |  |
| `rds_license_server_unactivated` / `default` | 18 | **fields: none** |  |
| `rds_license_tracking_failed` / `default` | 4105 | **fields: none** |  |
| `rds_licensing_service_failed` / `database_error` | 37, 44, 4097 | **fields: none** |  |
| `rds_licensing_service_failed` / `start_failed` | 37, 44, 4097 | **fields: none** |  |
| `secure_boot_cert_update_pending` / `default` | 1801 | **fields: none** |  |
| `secure_boot_certs_current` / `default` | 1808 | `win.eventlog.system.secure_boot_bucket_confidence` `win.eventlog.system.secure_boot_update_type` |  |
| `secure_boot_update_failed` / `firmware_error` | 1795, 1796, 1797, 1802, 1803 | `win.eventlog.system.secure_boot_bucket_confidence` `win.eventlog.system.secure_boot_skip_reason` `win.eventlog.system.secure_boot_update_type` |  |
| `secure_boot_update_failed` / `kek_not_provisioned` | 1795, 1796, 1797, 1802, 1803 | `win.eventlog.system.secure_boot_bucket_confidence` `win.eventlog.system.secure_boot_skip_reason` `win.eventlog.system.secure_boot_update_type` |  |
| `secure_boot_update_failed` / `known_firmware_issue` | 1795, 1796, 1797, 1802, 1803 | `win.eventlog.system.secure_boot_bucket_confidence` `win.eventlog.system.secure_boot_skip_reason` `win.eventlog.system.secure_boot_update_type` |  |
| `secure_boot_update_failed` / `prerequisite_missing` | 1795, 1796, 1797, 1802, 1803 | `win.eventlog.system.secure_boot_bucket_confidence` `win.eventlog.system.secure_boot_skip_reason` `win.eventlog.system.secure_boot_update_type` |  |
| `secure_boot_update_failed` / `unexpected_error` | 1795, 1796, 1797, 1802, 1803 | `win.eventlog.system.secure_boot_bucket_confidence` `win.eventlog.system.secure_boot_skip_reason` `win.eventlog.system.secure_boot_update_type` |  |
| `security_agent_service_start_failed` / `default` | 6 | **fields: none** |  |
| `security_agent_service_terminated` / `default` | 5 | **fields: none** |  |
| `service_crashed` / `default` | 7031, 7034 | `win.eventlog.system.crash_count` `win.eventlog.system.service_name` |  |
| `service_exited_with_error` / `default` | 7023, 7024 | `win.eventlog.system.service_error` `win.eventlog.system.service_name` |  |
| `service_hang` / `default` | 7011 | `win.eventlog.system.service_name` |  |
| `service_hung_starting` / `default` | 7022 | `win.eventlog.system.service_name` |  |
| `service_installed` / `installed` | 7045 | `command_line` `win.eventlog.system.account_name` `win.eventlog.system.image_path` `win.eventlog.system.service_name` `win.eventlog.system.service_type` `win.eventlog.system.start_type` |  |
| `service_installed` / `kernel_driver` | 7045 | `command_line` `win.eventlog.system.image_path` `win.eventlog.system.service_name` `win.eventlog.system.service_type` `win.eventlog.system.start_type` |  |
| `service_installed` / `self_versioned_updater` | 7045 | `command_line` `win.eventlog.system.account_name` `win.eventlog.system.image_path` `win.eventlog.system.service_name` `win.eventlog.system.service_type` `win.eventlog.system.start_type` |  |
| `service_start_failed` / `default` | 7000 | `win.eventlog.system.service_error` `win.eventlog.system.service_name` |  |
| `service_start_timeout` / `default` | 7009 | `win.eventlog.system.service_name` |  |
| `smb_delayed_write_lost` / `default` | 50, 139 | **fields: none** |  |
| `smb_server_transport_bind_failed` / `default` | 2504 | **fields: none** |  |
| `smb_share_recreate_failed` / `default` | 2511 | **fields: none** |  |
| `sparklogs_agent_started` / `default` | 7036 | **fields: none** |  |
| `sparklogs_agent_stopped` / `stopped` | 7031, 7034, 7036 | **fields: none** |  |
| `sparklogs_agent_stopped` / `terminated` | 7031, 7034, 7036 | `win.eventlog.system.crash_count` |  |
| `storage_controller_reset` / `default` | 11, 129 | **fields: none** |  |
| `time_sync_failed` / `default` | 47, 129, 134 | `win.eventlog.system.time_peer` |  |
| `tls_cert_expired` / `default` | 36881 | **fields: none** |  |
| `tls_cert_name_mismatch` / `default` | 36884 | **fields: none** |  |
| `tls_cert_untrusted_ca` / `default` | 36882 | **fields: none** |  |
| `tls_cipher_mismatch` / `default` | 36874 | **fields: none** |  |
| `tls_client_credential_failed` / `default` | 36871 | **fields: none** |  |
| `tls_server_credential_failed` / `default` | 36870 | **fields: none** |  |
| `tpm_attestation_check_failed` / `expected_check_failed` | 1041 | `win.eventlog.system.tpm_attestation_expected_failed` `win.eventlog.system.tpm_attestation_health_status` `win.eventlog.system.tpm_attestation_pcrs_match_tcg_log` `win.eventlog.system.tpm_attestation_required_failed` `win.eventlog.system.tpm_attestation_tpm_responsive` |  |
| `tpm_attestation_check_failed` / `required_check_failed` | 1041 | `win.eventlog.system.tpm_attestation_expected_failed` `win.eventlog.system.tpm_attestation_health_status` `win.eventlog.system.tpm_attestation_pcrs_match_tcg_log` `win.eventlog.system.tpm_attestation_required_failed` `win.eventlog.system.tpm_attestation_tpm_responsive` |  |
| `tpm_attestation_failed` / `default` | 1040 | **fields: none** |  |
| `tpm_authorization_refused` / `default` | 17 | `win.eventlog.system.tpm_command` `win.eventlog.system.tpm_command_ordinal` `win.eventlog.system.tpm_response` `win.eventlog.system.tpm_response_code` `win.eventlog.system.tpm_response_position` |  |
| `tpm_boot_pcr_values_recorded` / `pcr_values_unreadable` | 24709 | `win.eventlog.system.boot_pcr_hash_algorithm` `win.eventlog.system.boot_pcr_indices` |  |
| `tpm_boot_pcr_values_recorded` / `values_split` | 24709 | `win.eventlog.system.boot_pcr_fingerprint` `win.eventlog.system.boot_pcr_hash_algorithm` `win.eventlog.system.boot_pcr_indices` `win.eventlog.system.boot_pcrs` |  |
| `tpm_capability_probe_declined` / `default` | 17 | `win.eventlog.system.tpm_command` `win.eventlog.system.tpm_command_ordinal` `win.eventlog.system.tpm_response` `win.eventlog.system.tpm_response_code` `win.eventlog.system.tpm_response_position` |  |
| `tpm_command_failed` / `below_tpm` | 17 | `win.eventlog.system.tpm_command` `win.eventlog.system.tpm_command_ordinal` `win.eventlog.system.tpm_response_code` |  |
| `tpm_command_failed` / `failure_mode` | 17 | `win.eventlog.system.tpm_command` `win.eventlog.system.tpm_command_ordinal` `win.eventlog.system.tpm_response` `win.eventlog.system.tpm_response_code` |  |
| `tpm_command_failed` / `unrecognized` | 17 | `win.eventlog.system.tpm_command` `win.eventlog.system.tpm_command_ordinal` `win.eventlog.system.tpm_response` `win.eventlog.system.tpm_response_code` `win.eventlog.system.tpm_response_position` |  |
| `tpm_command_retry_requested` / `default` | 17 | `win.eventlog.system.tpm_command` `win.eventlog.system.tpm_command_ordinal` `win.eventlog.system.tpm_response` `win.eventlog.system.tpm_response_code` |  |
| `tpm_counter_reset_on_resume` / `default` | 30 | `win.eventlog.system.tpm_reset_count_after` `win.eventlog.system.tpm_reset_count_before` `win.eventlog.system.tpm_restart_count_after` `win.eventlog.system.tpm_restart_count_before` |  |
| `tpm_hardware_failed` / `default` | 15 | `win.eventlog.system.tpm_error_data` |  |
| `unexpected_shutdown` / `event_log` | 41, 6008 | `win.eventlog.system.recorded_at` |  |
| `unexpected_shutdown` / `kernel_power` | 41 | `win.eventlog.system.bugcheck_code` `win.eventlog.system.bugcheck_name` `win.eventlog.system.connected_standby_in_progress` `win.eventlog.system.sleep_in_progress` |  |
| `vpn_connected` / `default` | 20267 | **fields: none** |  |
| `vss_shadow_aborted` / `abort_on_failure` | 1, 5, 13, 14, 15, 16, 20, 23, 24, 27, 28, 29, 32, 35, 36, 67 | `win.eventlog.system.volume` |  |
| `vss_shadow_aborted` / `storage_growth_failed` | 1, 5, 13, 14, 15, 16, 20, 23, 24, 27, 28, 29, 32, 35, 36, 67 | `win.eventlog.system.volume` |  |
| `vss_shadow_aborted` / `storage_limit_reached` | 1, 5, 13, 14, 15, 16, 20, 23, 24, 27, 28, 29, 32, 35, 36, 67 | `win.eventlog.system.volume` |  |
| `vss_snapshots_failing_for_space` / `default` | 25 | `win.eventlog.system.volume` |  |
| `win_app_error_dialog_shown` / `default` | 26 | **fields: none** |  |
| `winre_servicing_failed` / `default` | 4502 | **fields: none** |  |
| `wlan_limited_connectivity` / `default` | 4003 | **fields: none** |  |
| `bitlocker_key_retrieval_success_code` | 24641 | **fields: none** |  |
| `iscsi_path_repeat` | 1, 7, 9, 20, 39, 49, 129 | **fields: none** |  |
| `vss_shadow_copy_reclaimed` | 33, 58, 95 | `win.eventlog.system.volume` |  |
| `whea_boot_error_record` | 1 | `win.eventlog.system.cper_creator` `win.eventlog.system.cper_decode` `win.eventlog.system.cper_error_ts` `win.eventlog.system.cper_firmware_record_types` `win.eventlog.system.cper_flags` `win.eventlog.system.cper_flags_raw` `win.eventlog.system.cper_notification` `win.eventlog.system.cper_revision` `win.eventlog.system.cper_section_count` `win.eventlog.system.cper_section_severities` `win.eventlog.system.cper_section_types` `win.eventlog.system.cper_severity` |  |
| `wifi_direct_adapter_fault` | 10317 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `av_unsigned_code_blocked` / `default`
- `bitlocker_key_retrieval_code_reported` / `default`
- `bitlocker_recovery_password_used` / `default`
- `bitlocker_tpm_unlock_failed` / `enhanced_pin_refused`
- `bitlocker_tpm_unlock_failed` / `pcrs_mismatched`
- `bitlocker_tpm_unlock_failed` / `protector_unusable`
- `bitlocker_tpm_unlock_failed` / `secure_boot_changed`
- `bitlocker_tpm_unlock_failed` / `secure_boot_disabled`
- `bitlocker_tpm_unlock_failed` / `tpm_pin_refused`
- `bitlocker_tpm_unlock_failed` / `tpm_refused`
- `dcom_activation_timeout` / `default`
- `dcom_start_failed` / `default`
- `device_health_cert_service_unreachable` / `name_not_resolved`
- `device_health_cert_service_unreachable` / `other_error`
- `disk_bad_block` / `default`
- `disk_controller_error` / `default`
- `disk_failure_predicted` / `default`
- `disk_io_failed` / `default`
- `disk_io_retried` / `default`
- `disk_paging_error` / `default`
- `disk_surprise_removal` / `default`
- `dns_registration_failed` / `default`
- `domain_secure_channel_failed` / `dc_unreachable`
- `domain_secure_channel_failed` / `other_cause`
- `domain_secure_channel_failed` / `trust_broken`
- `ephemeral_port_alloc_failed` / `default`
- `failover_cluster_csv_unavailable` / `default`
- `failover_cluster_node_config_stale` / `default`
- `failover_cluster_node_removed` / `default`
- `failover_cluster_resource_failed` / `default`
- `failover_cluster_resource_hang` / `default`
- `failover_cluster_resource_host_crash` / `default`
- `failover_cluster_service_down` / `default`
- `filesystem_corruption` / `disk`
- `gpu_driver_reset` / `default`
- `group_policy_processing_failed` / `default`
- `group_policy_software_install_failed` / `deferred`
- `group_policy_software_install_failed` / `install_failed`
- `http_ssl_binding_created` / `default`
- `http_ssl_binding_deleted` / `default`
- `http_ssl_config_failed` / `default`
- `hyperv_vswitch_config_restore_failed` / `default`
- `iis_apppool_disabled` / `default`
- `iis_apppool_identity_invalid` / `default`
- `iis_apppool_worker_start_failed` / `default`
- `iis_worker_crash` / `default`
- `kerberos_cert_domain_unresolved` / `default`
- `kerberos_etype_unsupported` / `default`
- `kerberos_pac_verify_failed` / `default`
- `kerberos_smartcard_cert_missing` / `default`
- `kerberos_weak_krbtgt_key` / `default`
- `nic_driver_fault_reported` / `default`
- `nic_driver_load_failed` / `default`
- `nic_link_down` / `down`
- `nic_link_down` / `recovered`
- `os_boot` / `default`
- `os_shutdown` / `default`
- `os_sleep` / `default`
- `os_wake` / `default`
- `pagefile_extended` / `default`
- `platform_tamper_indicator_reported` / `detected`
- `platform_tamper_indicator_reported` / `escalated`
- `platform_tamper_indicator_reported` / `partial`
- `platform_tamper_indicator_reported` / `reported`
- `ram_commit_exhausted` / `dialog`
- `rds_license_server_unactivated` / `default`
- `rds_license_tracking_failed` / `default`
- `rds_licensing_service_failed` / `database_error`
- `rds_licensing_service_failed` / `start_failed`
- `secure_boot_cert_update_pending` / `default`
- `security_agent_service_start_failed` / `default`
- `security_agent_service_terminated` / `default`
- `smb_delayed_write_lost` / `default`
- `smb_server_transport_bind_failed` / `default`
- `smb_share_recreate_failed` / `default`
- `sparklogs_agent_started` / `default`
- `sparklogs_agent_stopped` / `stopped`
- `storage_controller_reset` / `default`
- `tls_cert_expired` / `default`
- `tls_cert_name_mismatch` / `default`
- `tls_cert_untrusted_ca` / `default`
- `tls_cipher_mismatch` / `default`
- `tls_client_credential_failed` / `default`
- `tls_server_credential_failed` / `default`
- `tpm_attestation_failed` / `default`
- `vpn_connected` / `default`
- `win_app_error_dialog_shown` / `default`
- `winre_servicing_failed` / `default`
- `wlan_limited_connectivity` / `default`
- `bitlocker_key_retrieval_success_code`
- `iscsi_path_repeat`
- `wifi_direct_adapter_fault`
