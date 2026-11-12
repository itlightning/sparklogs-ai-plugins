<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.system`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `av_unsigned_code_blocked` | av unsigned code blocked | event | Serious | `endpoint_protection` |  |
| `bitlocker_key_retrieval_code_reported` | bitlocker key retrieval code reported | event | Verbose | `encryption` | benign |
| `bitlocker_recovery_password_used` | bitlocker recovery password used | event | Warning | `encryption` |  |
| `bitlocker_tpm_binding_mismatch` | bitlocker tpm binding mismatch | event | Warning | `encryption` |  |
| `bitlocker_tpm_unlock_failed` | bitlocker tpm unlock failed | event | Warning | `encryption` |  |
| `dcom_activation_timeout` | dcom activation timeout | event | Minor | `app_stability` |  |
| `dcom_register_timeout` | dcom register timeout | event | Notice | `app_stability` |  |
| `dcom_start_failed` | dcom start failed | event | Minor | `app_stability` |  |
| `device_health_cert_service_unreachable` | device health cert service unreachable | event | Verbose to Notice | `networking` | benign possible |
| `disk_bad_block` | disk bad block | event | Warning to Serious | `storage` |  |
| `disk_controller_error` | disk controller error | event | Notice to Error | `storage` |  |
| `disk_failure_predicted` | disk failure predicted | event | Error to Serious | `storage` |  |
| `disk_io_failed` | disk io failed | event | Notice to Error | `storage` |  |
| `disk_io_retried` | disk io retried | event | Notice to Warning | `storage` |  |
| `disk_paging_error` | disk paging error | event | Notice to Error | `storage` |  |
| `disk_surprise_removal` | disk surprise removal | event | Warning | `storage` |  |
| `dns_client_resolution_timed_out` | dns client resolution timed out | event | Display | `networking` |  |
| `dns_registration_failed` | dns registration failed | event | Info to Warning | `networking` |  |
| `domain_secure_channel_failed` | domain secure channel failed | event | Display to Warning | `auth` |  |
| `driver_load_failed` | driver load failed | event | Info to Warning | `hardware` | benign possible |
| `ephemeral_port_alloc_failed` | ephemeral port alloc failed | event | Notice | `networking` |  |
| `failover_cluster_csv_unavailable` | failover cluster csv unavailable | event | Severe | `clustering` |  |
| `failover_cluster_node_config_stale` | failover cluster node config stale | event | Error | `clustering` |  |
| `failover_cluster_node_removed` | failover cluster node removed | event | Serious | `clustering` |  |
| `failover_cluster_resource_failed` | failover cluster resource failed | event | Serious | `clustering` |  |
| `failover_cluster_resource_hang` | failover cluster resource hang | event | Serious | `clustering` |  |
| `failover_cluster_resource_host_crash` | failover cluster resource host crash | event | Serious | `clustering` |  |
| `failover_cluster_service_down` | failover cluster service down | event | Severe | `clustering` |  |
| `filesystem_corruption` | filesystem corruption | event | Warning to Critical | `storage` |  |
| `filesystem_delayed_write_lost` | filesystem delayed write lost | event | Error to Serious | `storage` |  |
| `filesystem_transaction_log_operation_failed` | filesystem transaction log operation failed | event | Notice to Error | `storage` |  |
| `gpu_driver_reset` | gpu driver reset | event | Notice | `hardware` |  |
| `group_policy_processing_failed` | group policy processing failed | event | Notice to Warning | `device_management` |  |
| `group_policy_software_install_failed` | group policy software install failed | event | Info to Warning | `device_management` | benign possible |
| `hardware_error_corrected` | hardware error corrected | event | Notice | `hardware` |  |
| `hardware_error_uncorrected` | hardware error uncorrected | event | Minor to Error | `hardware` |  |
| `http_ssl_binding_created` | http ssl binding created | event | Notice | `certificates` |  |
| `http_ssl_binding_deleted` | http ssl binding deleted | event | Notice | `certificates` |  |
| `http_ssl_config_failed` | http ssl config failed | event | Error | `certificates` |  |
| `hyperv_vswitch_config_restore_failed` | hyperv vswitch config restore failed | event | Info to Error | `virtualization` |  |
| `iis_apppool_disabled` | iis apppool disabled | event | Warning to Serious | `web` |  |
| `iis_apppool_identity_invalid` | iis apppool identity invalid | event | Warning to Error | `web` |  |
| `iis_apppool_worker_start_failed` | iis apppool worker start failed | event | Warning to Error | `web` |  |
| `iis_worker_crash` | iis worker crash | event | Warning | `web` |  |
| `ip_address_conflict_detected` | IP address conflict | event | Warning | `networking` |  |
| `kerberos_cert_domain_unresolved` | kerberos cert domain unresolved | event | Info | `auth` |  |
| `kerberos_etype_unsupported` | kerberos etype unsupported | event | Warning | `auth` |  |
| `kerberos_pac_verify_failed` | kerberos pac verify failed | event | Warning | `auth` |  |
| `kerberos_smartcard_cert_missing` | kerberos smartcard cert missing | event | Warning | `auth` |  |
| `kerberos_weak_krbtgt_key` | kerberos weak krbtgt key | event | Warning | `auth` |  |
| `nic_driver_fault_reported` | nic driver fault reported | event | Warning | `networking` |  |
| `nic_driver_load_failed` | nic driver load failed | event | Error | `networking` |  |
| `nic_link_down` | nic link down | event | Info to Warning | `networking` |  |
| `os_boot` | os boot | event | Info | `os_stability` |  |
| `os_bsod` | os bsod | event | Error to Serious | `os_stability` |  |
| `os_restart_requested` | os restart requested | event | Notice | `os_stability` |  |
| `os_shutdown` | os shutdown | event | Info | `os_stability` |  |
| `os_sleep` | os sleep | event | Info | `hardware` |  |
| `os_wake` | os wake | event | Info | `hardware` |  |
| `pagefile_extended` | pagefile extended | event | Notice | `performance` |  |
| `patch_install_deferred` | patch install deferred | event | Verbose to Info | `patching` | benign |
| `patch_install_failed` | patch install failed | event | Info to Minor | `patching` | benign possible |
| `platform_tamper_indicator_reported` | platform tamper indicator reported | event | Warning to Error | `endpoint_protection` |  |
| `ram_commit_exhausted` | ram commit exhausted | event | Error to Serious | `performance` |  |
| `rds_license_server_unactivated` | rds license server unactivated | event | Warning | `licensing` |  |
| `rds_license_tracking_failed` | rds license tracking failed | event | Warning | `licensing` |  |
| `rds_licensing_service_failed` | rds licensing service failed | event | Error | `licensing` |  |
| `secure_boot_cert_update_pending` | secure boot cert update pending | event | Warning | `hardware` |  |
| `secure_boot_certs_current` | secure boot certs current | event | Info | `hardware` | benign |
| `secure_boot_update_failed` | secure boot update failed | event | Notice | `hardware` |  |
| `security_agent_service_start_failed` | security agent service start failed | event | Warning | `endpoint_protection` |  |
| `security_agent_service_terminated` | security agent service terminated | event | Minor | `endpoint_protection` |  |
| `service_crashed` | service crashed | event | Error | `app_stability` |  |
| `service_exited_with_error` | service exited with error | event | Error | `app_stability` |  |
| `service_hang` | service hang | event | Notice | `app_stability` |  |
| `service_hung_starting` | service hung starting | event | Notice | `app_stability` |  |
| `service_installed` | service installed | event | Verbose to Notice | `security_audit` | benign possible |
| `service_start_failed` | service start failed | event | Error | `app_stability` |  |
| `service_start_timeout` | service start timeout | event | Notice | `app_stability` |  |
| `smb_delayed_write_lost` | smb delayed write lost | event | Error | `storage` |  |
| `smb_server_transport_bind_failed` | smb server transport bind failed | event | Info to Warning | `networking` |  |
| `smb_share_recreate_failed` | smb share recreate failed | event | Warning | `storage` |  |
| `sparklogs_agent_started` | sparklogs agent started | event | Display | `rmm` |  |
| `sparklogs_agent_stopped` | SparkLogs agent stopped | event | Display to Error | `rmm` |  |
| `storage_controller_reset` | storage controller reset | event | Notice to Warning | `storage` |  |
| `time_sync_failed` | time sync failed | event | Info to Warning | `time_sync` |  |
| `tls_cert_expired` | tls cert expired | event | Error | `certificates` |  |
| `tls_cert_name_mismatch` | tls cert name mismatch | event | Error | `certificates` |  |
| `tls_cert_untrusted_ca` | tls cert untrusted ca | event | Error | `certificates` |  |
| `tls_cipher_mismatch` | tls cipher mismatch | event | Warning | `certificates` |  |
| `tls_client_credential_failed` | tls client credential failed | event | Warning to Error | `certificates` |  |
| `tls_server_credential_failed` | tls server credential failed | event | Error | `certificates` |  |
| `tpm_attestation_check_failed` | tpm attestation check failed | event | Notice | `hardware` |  |
| `tpm_attestation_failed` | tpm attestation failed | event | Error | `hardware` |  |
| `tpm_authorization_refused` | tpm authorization refused | event | Notice to Warning | `hardware` |  |
| `tpm_boot_pcr_values_recorded` | tpm boot pcr values recorded | event | Info | `encryption` |  |
| `tpm_capability_probe_declined` | tpm capability probe declined | event | Debug | `hardware` | benign |
| `tpm_command_failed` | tpm command failed | event | Notice to Warning | `hardware` |  |
| `tpm_command_retry_requested` | tpm command retry requested | event | Verbose | `hardware` | benign |
| `tpm_counter_reset_on_resume` | tpm counter reset on resume | event | Verbose | `hardware` | benign |
| `tpm_hardware_failed` | tpm hardware failed | event | Error | `hardware` |  |
| `unexpected_shutdown` | unexpected shutdown | event | Warning to Serious | `os_stability` |  |
| `vpn_connected` | vpn connected | event | Notice | `vpn` |  |
| `vss_shadow_aborted` | vss shadow aborted | event | Warning to Error | `backup` |  |
| `vss_snapshots_failing_for_space` | vss snapshots failing for space | event | Error | `backup` |  |
| `win_app_error_dialog_shown` | win app error dialog shown | event | Minor | `app_stability` |  |
| `winre_servicing_failed` | winre servicing failed | event | Error | `patching` |  |
| `wlan_limited_connectivity` | wlan limited connectivity | event | Warning | `networking` |  |

## `av_unsigned_code_blocked`: av unsigned code blocked

A security agent blocked a process whose image contained unsigned or corrupted code from performing a privileged operation.

**Severity:** Serious

**Why it matters:** The blocked operation did not happen, so nothing on the machine changed. A program on this machine fails a code-integrity check, and it may not work if it needs the operation it was refused.

**In practice:** The McAfee (Trellix) kernel driver mfehidk logs event 514 in the System log when it refuses a privileged request from a process whose executable is unsigned or whose code does not match its signature. The message names the executable and its process ID. A legitimate program with a broken or stripped signature, such as an in-house build, a packed utility or a damaged install, produces the same line as unwanted software, and the event does not tell the two apart.

**What to check:**

- Find the named executable on the machine and check its signature on the Digital Signatures tab of its file properties.
- Confirm with the client whether the program is expected. An unknown executable under a user profile or temp folder needs a closer look.
- Check whether the same executable is blocked on other machines, which points at one product or build.
- For a program that should be trusted, reinstall it from the vendor or ask the vendor for a signed build.

**Related:**

- `av_threat_detected`: the antivirus named a threat, which is a malware verdict, not a signature check

**Example:** The security agent blocks an unsigned toolkit executable from a privileged operation against its driver.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#av_unsigned_code_blocked, https://sparklogs.com/reference/reasons/av_unsigned_code_blocked.json

## `bitlocker_key_retrieval_code_reported`: bitlocker key retrieval code reported

BitLocker reported an error code while retrieving the volume master key during restart.

**Severity:** Verbose

**Why it matters:** The record by itself does not show the volume failing to open at boot. It keeps the volume and the code for a later BitLocker question about this machine.

**In practice:** The BitLocker driver logs event 24641 in the System log at the Error level, with the sentence "An unexpected error was encountered attempting to retrieve the BitLocker volume master key during restart." The record carries the volume and an error code, and Microsoft publishes no meaning for the codes it logs here. When BitLocker really cannot open the volume, the user sees a recovery key prompt at boot, or Windows logs BitLocker-Driver event 24635 or BitLocker-API errors about protectors. The same event with error code 0x0 reports success and is kept under a lower severity, outside this reason.

**When to ignore:** When the machine booted normally and no recovery prompt or protector error is logged near the same restart.

**What to check:**

- Before treating this as a problem, look for a recovery prompt, event 24635 or a BitLocker-API protector error near the same restart.
- If the user reports a recovery prompt, check the volume with `manage-bde -status`.

**Related:**

- `bitlocker_protection_resume_failed`: BitLocker could not turn protection back on after a suspend
- `bitlocker_recovery_info_read_failed`: BitLocker could not read the volume's recovery information

**Example:** The C: volume logs BitLocker error code 0x2000880 while its key is retrieved at restart.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#bitlocker_key_retrieval_code_reported, https://sparklogs.com/reference/reasons/bitlocker_key_retrieval_code_reported.json

The code this event carries has no public decode, so it is shown as written.

## `bitlocker_recovery_password_used`: bitlocker recovery password used

Someone typed the BitLocker recovery password at the recovery screen to start Windows.

**Severity:** Warning

**Why it matters:** The user was stopped at the BitLocker recovery screen until the recovery password was found and typed. Whoever typed it now knows the password for that drive.

**In practice:** BitLocker-Driver writes event 24652 in the System log when Windows starts after someone typed the recovery password for the OS drive. The time of the event is the recovery boot. The cause is usually on the same boot as bitlocker_tpm_unlock_failed, and the PCR that changed as bitlocker_tpm_binding_mismatch.

**When to ignore:** When an administrator forced recovery on purpose, such as before handing the device to a new user.

**What to check:**

- Find the cause on the same boot: bitlocker_tpm_unlock_failed and bitlocker_tpm_binding_mismatch.
- Rotate the recovery password if users should not keep it (`manage-bde -protectors -add C: -RecoveryPassword`, then remove the old one and back up the new one).
- If the cause was a planned firmware or boot change, suspend BitLocker before the next one.

**Related:**

- `bitlocker_tpm_binding_mismatch`: which PCR no longer matched the sealed values
- `bitlocker_tpm_unlock_failed`: the TPM refusing the key at boot, which led to the recovery screen
- `tpm_boot_pcr_values_recorded`: the boot measurements after the recovery boot

**Example:** A user typed the recovery password for drive C: after a firmware update, and Windows started.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#bitlocker_recovery_password_used, https://sparklogs.com/reference/reasons/bitlocker_recovery_password_used.json

## `bitlocker_tpm_binding_mismatch`: bitlocker tpm binding mismatch

At boot, the measurements a BitLocker TPM protector was sealed to did not match the TPM, so the TPM would not release the drive key.

**Severity:** Warning

**Why it matters:** The device most likely stopped at the BitLocker recovery screen for this boot. The PCR number shows which part of the boot changed.

**In practice:** BitLocker-Driver writes event 24706 in the System log on the next boot that reaches Windows. The mismatched PCR names what changed: 7 is the Secure Boot state and certificates, 4 the boot manager, 0 and 2 the firmware code, 11 BitLocker access control. PCR 7 changes after a Secure Boot certificate or revocation update or a firmware Secure Boot setting change. PCR 0 and 2 change after a firmware update.

**When to ignore:** When the change was planned and the next boot started with the TPM alone again.

**What to check:**

- Read the mismatched PCR and look for the matching change: a firmware update (0, 2), a boot manager change (4), a Secure Boot update or setting (7).
- Compare event 24709 for this boot and the previous one.
- Suspend BitLocker before the next planned firmware or Secure Boot change.

**Related:**

- `bitlocker_recovery_password_used`: the recovery password that started Windows
- `bitlocker_tpm_unlock_failed`: the TPM refusing the key on the same boot
- `tpm_boot_pcr_values_recorded`: the PCR values to compare across boots

**Example:** After a Secure Boot certificate update, the protector bound to PCRs 7 and 11 no longer matched in PCR 7.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#bitlocker_tpm_binding_mismatch, https://sparklogs.com/reference/reasons/bitlocker_tpm_binding_mismatch.json

## `bitlocker_tpm_unlock_failed`: bitlocker tpm unlock failed

At boot, the TPM would not release the BitLocker key for the OS drive, so the drive had to be unlocked another way: often the recovery password, sometimes a retried PIN or another protector.

**Severity:** Warning

**Why it matters:** When no other protector unlocked the drive, the user saw the BitLocker recovery screen and needed the recovery password to start Windows. A refused TPM and PIN unlock (24638, 24643) can also be a mistyped PIN the user then retried. When a boot measurement changed, it happens again at every restart until the cause is fixed or BitLocker reseals the key.

**In practice:** The boot manager writes these events into the System log when Windows next starts, because nothing can log while the recovery screen is up. Event 24636 says the TPM refused, 24635 that the PCR values did not match, 24657 that Secure Boot was turned off, 24658 that the Secure Boot configuration changed, and 24721 that the TPM protector could not be used. Events 24638 and 24643 are the same refusal for a TPM and PIN protector, which a wrong PIN also causes. The usual causes are a firmware update, a firmware setting change, a Secure Boot certificate update, or a TPM clear, applied without suspending BitLocker first.

**When to ignore:** When the device was deliberately put into recovery, for example before handing it to a new user.

**What to check:**

- Look for bitlocker_recovery_password_used and bitlocker_tpm_binding_mismatch on the same device around the same time.
- Compare the PCR values in event 24709 for this boot and the boot before it to see which measurement changed.
- Check for a recent firmware update, firmware setting change or Secure Boot update, and suspend BitLocker (`Suspend-BitLocker -RebootCount 2`) before the next one.
- Run `manage-bde -protectors -get C:` and confirm the TPM protector is present.

**Related:**

- `bitlocker_recovery_password_used`: the recovery password that started Windows after this failure
- `bitlocker_tpm_binding_mismatch`: which PCR no longer matched the sealed values
- `secure_boot_cert_update_pending`: a Secure Boot certificate update that changes PCR 7 when it is applied
- `tpm_boot_pcr_values_recorded`: the boot measurements to compare with the previous boot

**Example:** After a firmware update, the boot manager could not get the key for drive C: from the TPM because the Secure Boot configuration had changed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#bitlocker_tpm_unlock_failed, https://sparklogs.com/reference/reasons/bitlocker_tpm_unlock_failed.json

## `dcom_activation_timeout`: dcom activation timeout

A DCOM activation timed out.

**Severity:** Minor

**Why it matters:** The program that asked for the COM component did not get it in time, so the feature it was starting can fail, hang or be retried.

**In practice:** The DistributedCOM provider logs event 10029 in the System log when activating a COM class, named by its CLSID, does not finish in time. The message says what the activation was waiting for, such as the service that hosts the class finishing a stop. One timeout is often a passing delay, while the same CLSID timing out again and again points at a stuck service behind it.

**When to ignore:** A single timeout with no user report and no repeat for the same CLSID.

**What to check:**

- Look up the CLSID under HKEY_CLASSES_ROOT\CLSID in the registry, or in Component Services (dcomcnfg), to find the application.
- Check the System log for Service Control Manager errors about the hosting service at the same time.
- Count how often the same CLSID repeats on this machine before acting.

**Related:**

- `dcom_register_timeout`: the COM server started but did not register with DCOM in time
- `dcom_start_failed`: DCOM got an error starting the service or server

**Example:** An activation of a COM class times out waiting for its hosting service to stop.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#dcom_activation_timeout, https://sparklogs.com/reference/reasons/dcom_activation_timeout.json

## `dcom_register_timeout`: dcom register timeout

A DCOM server did not register in time.

**Severity:** Notice

**Why it matters:** The program that started the COM server waits or retries, and usually the server registers moments later. Many of these for one CLSID mean a COM server that keeps hanging at start, and the feature behind it fails for the user.

**In practice:** The DistributedCOM provider logs event 10010 in the System log when a COM server, named by its CLSID, did not register with DCOM within the required timeout. On a healthy machine this is common churn from Windows shell and app components. The CLSID is kept as `clsid`.

**When to ignore:** An occasional event on a working machine, with no repeat for the same CLSID and no user report.

**What to check:**

- Look up the CLSID under HKEY_CLASSES_ROOT\CLSID in the registry, or in Component Services (dcomcnfg), to find the application.
- Count how often the same CLSID repeats on this machine. A steady rate for one CLSID is the case worth working.
- Check the Application log for errors or hangs from that application at the same time.

**Related:**

- `dcom_activation_timeout`: an activation of a COM class timed out
- `dcom_start_failed`: DCOM got an error starting the service or server

**Example:** A COM server does not register with DCOM within the required timeout.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#dcom_register_timeout, https://sparklogs.com/reference/reasons/dcom_register_timeout.json

## `dcom_start_failed`: dcom start failed

DCOM got an error while starting a service or server for a COM request.

**Severity:** Minor

**Why it matters:** The program that asked for the COM component cannot use it, so the feature that depends on it fails.

**In practice:** The DistributedCOM provider logs event 10005 in the System log when it tries to start a service or server to run a COM component and gets an error back, as in "DCOM got error 1053 attempting to start the service ExampleSvc." The error number is a Windows system error code: 1058 means the service is disabled, and 1053 means the service did not answer the start request in time. A disabled service, a wrong service account or permissions, or a broken install are the usual causes.

**What to check:**

- Read the error number and the service name from the message. `net helpmsg <number>` prints the error text.
- Check the named service in services.msc: its startup type, account and dependencies.
- Look for Service Control Manager start errors for the same service at the same time.

**Related:**

- `dcom_register_timeout`: the server started but did not register with DCOM in time
- `service_start_failed`: Service Control Manager's own record that the service failed to start

**Example:** DCOM gets error 1053 when it tries to start a service to serve a COM request.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#dcom_start_failed, https://sparklogs.com/reference/reasons/dcom_start_failed.json

## `device_health_cert_service_unreachable`: device health cert service unreachable

Windows could not reach Microsoft's health attestation service to get a device health certificate.

**Severity:** Notice or Verbose

**Why it matters:** Usually none: Windows asks again later. A device that never gets the certificate fails Intune compliance checks that require device health attestation.

**In practice:** TPM-WMI writes event 1538 in the System log, with the service name and the error code, when the certificate request cannot connect. 0x80072EE7 means the service name did not resolve, which happens when the request runs before the network or VPN is up. Other codes, such as 0x80072EE2 (timed out) or 0x80072EFD (could not connect), point at a firewall, proxy or filtering rule.

**When to ignore:** For 0x80072EE7 on a device whose network works once it has started.

**What to check:**

- For codes other than 0x80072EE7, check that the device can reach the health attestation service through the proxy and firewall.
- If Intune reports the device as not compliant for health attestation, compare with this record.

**Related:**

- `tpm_attestation_check_failed`: a TPM check failing before attestation

**Example:** At startup, before Wi-Fi connects, the request for has.spserv.microsoft.com fails with 0x80072EE7.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#device_health_cert_service_unreachable, https://sparklogs.com/reference/reasons/device_health_cert_service_unreachable.json

## `disk_bad_block`: disk bad block

A disk reported a bad block.

**Also reported by:** `win.eventlog.storage`

**Severity:** Fixed disks select Serious; removable disks Error; removable media Warning. Virtual, unknown and missing facts retain Serious.

**Why it matters:** Files that use the damaged block can be unreadable, and the drive is using up the spare blocks that stand between it and failure.

**In practice:** The disk driver logs event 7 in the System log, "The device, \Device\Harddisk1\DR1, has a bad block," when the drive reports that a block on its media cannot be read or written correctly. This is the drive's own report about its surface. A retried read or a controller error describes the path to the drive and can recover. A bad block does not heal: the drive remaps it to a spare if one is left. Bad blocks on an aging drive tend to grow in number. The `\Device\HarddiskN` number in the message is the disk number shown in Disk Management.

**What to check:**

- Match the disk number in the message to the drive in Disk Management or `Get-PhysicalDisk`.
- Read the drive's health counters, such as reallocated and pending sectors, with the vendor's tool or `Get-StorageReliabilityCounter`.
- Confirm a recent good backup of everything on that disk.
- Plan a replacement: bad blocks do not heal.

**Related:**

- `disk_failure_predicted`: the drive predicts its own failure before blocks are lost
- `disk_io_retried`: an IO that recovered after a retry
- `filesystem_corruption`: damage found in the file system on the volume, a different layer and a different fix

**Example:** An aging desktop hard drive reports a bad block on Harddisk1.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_bad_block, https://sparklogs.com/reference/reasons/disk_bad_block.json

## `disk_controller_error`: disk controller error

A disk controller error was reported for a storage device.

**Severity:** Fixed disks select Error; removable media Notice; removable disks, virtual, unknown and missing facts Warning.

**Why it matters:** A request to the disk did not complete, so the program reading or writing it can stall or fail. Repeated errors on an internal disk often come before a cable, controller or drive failure.

**In practice:** The disk driver logs event 11 in the System log, "The driver detected a controller error on \Device\Harddisk2\DR2," when a request fails on the path between Windows and the device: the controller, the cable or the device's own interface. On workstations, card readers and USB devices that drop off or are pulled out are a common source, and one empty reader can log it over and over. The same event on an internal disk or a server's data disk is a real hardware fault on that path.

**When to ignore:** A card reader or USB device that is empty, was unplugged, or works fine for the user.

**What to check:**

- Match the disk number in the message to a device in Disk Management or `Get-Disk`, and check whether it is internal or removable.
- For an internal disk, reseat or replace the cable, update the storage controller driver and firmware, and check the drive's health counters.
- Look for disk IO retries, paging errors or storage controller resets on the same disk at the same time.

**Related:**

- `disk_bad_block`: the drive reported damage on its own media
- `disk_io_retried`: a request on the disk had to be retried and then completed
- `storage_controller_reset`: the storage controller driver reset the device after a request timed out

**Example:** The disk driver reports a controller error on Harddisk2, a card reader with no card in it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_controller_error, https://sparklogs.com/reference/reasons/disk_controller_error.json

## `disk_failure_predicted`: disk failure predicted

A storage device predicted its own failure.

**Also reported by:** `win.eventlog.storage`

**Severity:** Serious on servers; Error on workstations or an unknown host class.

**Why it matters:** The drive still reads and writes, but it expects to fail, and everything on it is at risk until it is replaced.

**In practice:** The disk driver logs event 52 in the System log, "The driver has detected that device \Device\Harddisk1\DR1 has predicted that it will fail," when the drive's own failure prediction (SMART on SATA drives) crosses the maker's limit. This is the early warning that leaves time to copy the data and replace the drive on your schedule. The prediction comes from the drive, so it is not caused by the cable or controller.

**What to check:**

- Confirm a recent good backup of everything on the drive, and copy what is not backed up first.
- Match the disk number to the drive in Disk Management or `Get-PhysicalDisk`, and read its health counters with the vendor's tool.
- Replace the drive. On a server with RAID, replace it through the RAID controller's tools so the array rebuilds.

**Related:**

- `disk_bad_block`: the drive reports a block it could not read or write
- `disk_io_failed`: a read or write on the disk failed

**Example:** A server's data drive predicts its own failure.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_failure_predicted, https://sparklogs.com/reference/reasons/disk_failure_predicted.json

## `disk_io_failed`: disk io failed

A read or write on a disk failed.

**Also reported by:** `win.eventlog.storage`

**Severity:** Fixed disks select Error; removable media Notice; removable disks, virtual, unknown and missing facts Warning.

**Why it matters:** The program that made the request got an error, so a file may not have been read or saved. The event alone does not show damaged media or a lasting fault.

**In practice:** The disk driver logs event 154 in the System log, "The IO operation at logical block address 0x1234 for Disk 2 failed due to a hardware error," when a request to the device fails and is not retried to success. One failure can come from a device being pulled or a brief fault on the path to it. Repeats on the same disk point at the drive, its cable or its controller. The disk number in the message is the one Disk Management shows.

**When to ignore:** A single failure on a USB drive or card that was being removed at the time.

**What to check:**

- Match the disk number in the message to a device in Disk Management or `Get-Disk`, and check whether it is internal or removable.
- Look for bad blocks, controller errors and storage controller resets on the same disk to tell a media fault from a path fault.
- For an internal disk with repeats, read the drive's health counters and check the cable and controller.

**Related:**

- `disk_bad_block`: the drive reported damage on its own media
- `disk_io_retried`: a request the disk driver retried, and that then completed
- `storage_controller_reset`: the storage controller driver reset the device after a request timed out

**Example:** A read at one block address on Disk 2 fails with a hardware error.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_io_failed, https://sparklogs.com/reference/reasons/disk_io_failed.json

## `disk_io_retried`: disk io retried

A disk IO operation had to be retried.

**Severity:** Removable disks and media select Notice; fixed, virtual, unknown and missing facts retain Warning.

**Why it matters:** The request completed after the retry, but the wait slows programs using the disk, and a steady stream of retries is an early sign of a failing drive, cable or controller.

**In practice:** The disk driver logs event 153 in the System log, "The IO operation at logical block address 0x12345 for Disk 0 was retried," when a request to the device did not complete the first time and the driver sent it again. A timeout or reset on the path to the disk is the usual trigger, from the controller, the cable, a busy storage array or the drive itself. The request recovered. A request that fails is logged as event 154.

**When to ignore:** An isolated retry on a removable drive, or a single burst during a heavy backup with no repeat afterwards.

**What to check:**

- Count retries per disk over days. A single burst during heavy load differs from a steady rate.
- Match the disk number to a device in Disk Management or `Get-Disk`, and read its health counters.
- Look for storage controller resets at the same time, and check the controller driver and firmware versions.
- On a virtual machine, check the host's storage latency for the same minutes.

**Related:**

- `disk_io_failed`: the request failed and did not complete after a retry
- `disk_paging_error`: a failed read or write of memory that is backed by the disk
- `storage_controller_reset`: the controller driver reset the device, which often comes with retries

**Example:** A read at one block address on Disk 0 times out and the disk driver retries it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_io_retried, https://sparklogs.com/reference/reasons/disk_io_retried.json

## `disk_paging_error`: disk paging error

Windows reported a disk error during a paging operation.

**Also reported by:** `win.eventlog.storage`

**Severity:** Fixed disks select Error; removable media Notice; removable disks, virtual, unknown and missing facts Warning.

**Why it matters:** A program whose memory or file data was being read from the disk can crash or hang, and on the system disk Windows itself can stop with a blue screen.

**In practice:** The disk driver logs event 51 in the System log, "An error was detected on device \Device\Harddisk0\DR0 during a paging operation," when Windows fails to read or write memory that is backed by the disk, such as the page file or a running program's files. A failing drive, a loose cable or controller fault, and a removable drive pulled while a file on it was open are the usual causes.

**When to ignore:** A removable drive that was unplugged while a program had a file open on it.

**What to check:**

- Match the disk number in the message to a device in Disk Management or `Get-Disk`, and check whether it is the system disk.
- Look for disk IO retries, controller errors or storage controller resets on the same disk at the same time.
- Read the drive's health counters, and check the cable and controller for an internal disk.

**Related:**

- `disk_bad_block`: the drive reported damage on its own media
- `disk_controller_error`: a request failed on the path to the disk
- `disk_io_retried`: a request on the disk had to be retried and then completed

**Example:** The system drive returns an error while Windows reads part of a running program back from disk.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_paging_error, https://sparklogs.com/reference/reasons/disk_paging_error.json

## `disk_surprise_removal`: disk surprise removal

A disk disappeared without being safely removed.

**Also reported by:** `win.eventlog.storage`

**Severity:** Warning

**Why it matters:** Reads and writes in progress on the disk fail, and files open on it can be left damaged or incomplete.

**In practice:** The disk driver logs event 157 in the System log, "Disk 2 has been surprise removed," when a disk goes away without Windows being asked to remove it first. A USB drive unplugged without Safely Remove, a loose cable or failing enclosure, a virtual disk detached by backup or virtualization software, and a lost path to SAN or iSCSI storage are the usual causes.

**When to ignore:** A USB drive the user unplugged, or a virtual disk your backup software attaches and detaches on its schedule.

**What to check:**

- Match the disk number to a device in Disk Management or `Get-Disk`: removable, virtual or internal.
- For an internal or SAN disk, check the cable, enclosure, controller and storage paths.
- Check backups or services that used the disk at that time for failures.

**Related:**

- `disk_io_failed`: a read or write failed while the disk was still present

**Example:** Disk 2, a USB backup drive, is unplugged without being safely removed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#disk_surprise_removal, https://sparklogs.com/reference/reasons/disk_surprise_removal.json

## `dns_client_resolution_timed_out`: dns client resolution timed out

A DNS name lookup timed out because none of the configured DNS servers answered.

**Also reported by:** `win.eventlog.network`

**Severity:** Display

**Why it matters:** Whatever needed that name, such as a website, a file share or a sign-in to a domain controller, fails until a lookup succeeds.

**In practice:** The DNS client logs event 1014 in the System log, "Name resolution for the name example.com timed out after none of the configured DNS servers responded," after it tried every DNS server on the adapter and got no answer. No answer at all means the servers or the path to them did not respond. A name that does not exist gets a negative answer and no timeout. The name is kept as `dns_query_name`. A laptop waking on a network that is not up yet, or a VPN-only name looked up off the VPN, logs one now and then.

**When to ignore:** An occasional timeout on a laptop that was waking, roaming or changing networks, with no user report and no repeats.

**What to check:**

- Count the different names that time out in the same minutes: one name points at the suffix or forwarder for that zone, many names at the adapter's DNS servers or the path to them.
- Run `ipconfig /all` for the DNS servers on each adapter, then `Resolve-DnsName <name> -Server <server>` against each one.
- Put a reachable DNS server first on the adapter: the client tries the servers in order within a short fixed time, so an unreachable first server can use it up. The reference below gives the current timings.

**Related:**

- `dns_registration_failed`: the machine failed to register its own records with its DNS servers

**Example:** A lookup for a name times out after none of the configured DNS servers respond.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#dns_client_resolution_timed_out, https://sparklogs.com/reference/reasons/dns_client_resolution_timed_out.json

A host with the DNS client Operational log turned on can record one timeout twice, once from the System log and once from the Operational log; the subsource tells them apart.

## `dns_registration_failed`: dns registration failed

Windows could not register or update the name records of this computer in DNS.

**Severity:** Warning (server) / Info (workstation or unknown)

**Why it matters:** Other machines can resolve this computer's name to an old address, or not at all, until a later registration succeeds. On a server that breaks connections from its clients. On a workstation away from its network it is expected.

**In practice:** The DNS client logs these events in the System log when dynamic registration of the computer's host (A or AAAA) records fails: 8015 to 8020 for registering, 8021 to 8026 for removing a registration, and 8033 to 8038 for updating and removing. Each event ID stands for one failure type, and the message lists the adapter, its DNS servers and the error code. A workstation off the domain network cannot reach the server that holds its zone, and a public DNS server in the list does not accept dynamic updates, so a laptop at home logs these routinely. Failures for pointer (PTR) records are logged at a lower level and are not part of this reason.

**When to ignore:** A workstation working away from the office network, with no one needing to reach it by name.

**What to check:**

- Read the DNS server list in the message: a public resolver there will not accept the update.
- Read the error code. `net helpmsg <code>` gives its text for Windows codes.
- On a server, confirm the zone allows dynamic updates from it and that its DNS server is reachable, then run `ipconfig /registerdns` and check the record in DNS Manager.

**Related:**

- `dns_client_resolution_timed_out`: a lookup from this machine got no answer from any DNS server
- `domain_secure_channel_failed`: the machine could not reach or was refused by a domain controller

**Example:** A server fails to register its host records with error code 9002, a DNS server failure.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#dns_registration_failed, https://sparklogs.com/reference/reasons/dns_registration_failed.json

## `domain_secure_channel_failed`: domain secure channel failed

The machine could not set up its secure session with a domain controller.

**Severity:** Warning, Notice or Display

**Why it matters:** Domain sign-in, Group Policy and access to domain resources fall back to cached state or fail until the session is set up. A refused machine does not recover on its own.

**In practice:** NETLOGON logs event 5719 in the System log, "This computer was not able to set up a secure session with a domain controller in domain EXAMPLE due to the following," followed by the cause. The cause is a Windows error code, and it decides what the event means. No domain controller reachable (1311, 1722, 1726, 1355, 53) is everyday on a laptop off the network or a machine that has just booted, and clears when a controller answers. A controller that refused the machine (1789 trust relationship failed, 1787 or 1786 no trust account or secret, 5 access denied, 1396 wrong target name) means its computer account or trust no longer matches, and it stays broken until someone repairs it. An internal error (1359) names no cause and usually clears on the next attempt.

**When to ignore:** An unreachable or internal-error cause on a laptop away from the office, or once around a boot, with sign-in working.

**What to check:**

- Read the error code first: an unreachable controller clears when the network returns, a refused machine needs repair.
- Run `nltest /sc_query:<domain>` to see the current state of the secure channel.
- For a refused machine, run `Test-ComputerSecureChannel -Repair` as a domain admin, or rejoin it to the domain.
- A desktop that never moves and logs unreachable causes all day points at its network or DNS settings.

**Related:**

- `dns_client_resolution_timed_out`: DNS lookups timing out, which also stops the machine finding a controller
- `group_policy_processing_failed`: Group Policy failing a pass, often for the same lack of a controller

**Example:** A laptop off the office network cannot reach a domain controller and reports error 1311, no logon servers.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#domain_secure_channel_failed, https://sparklogs.com/reference/reasons/domain_secure_channel_failed.json

## `driver_load_failed`: driver load failed

A device driver failed to load.

**Severity:** Warning or Info

**Why it matters:** The device the driver serves is missing, or works without some of its features, until the driver is fixed or replaced.

**In practice:** Kernel-PnP logs event 219 in the System log, "The driver \Driver\ExampleDrv failed to load for the device PCI\VEN_0000&DEV_0001\1," with the driver, the device instance path and an NTSTATUS code. Windows does not try the driver again until the device starts again, such as at the next boot or replug. The status code says why, for example 0xC0000034 when the driver cannot be found. A missing or damaged driver install, or a driver that does not suit the hardware or Windows version, are common causes. One case is routine: the user-mode driver framework (\Driver\WUDFRd) declining a device with 0xC0000365 while that device loads through its own driver or stays unused. That case is kept at Info.

**When to ignore:** The \Driver\WUDFRd line with status 0xC0000365, or any device the user does not need and that works when used.

**What to check:**

- Read `driver_name`, `device_instance` and the status code.
- Find the device in Device Manager by its instance path (Details tab, Device instance path) and check its status and driver version.
- Install the current driver from the hardware vendor, or remove a leftover driver for hardware that is gone.

**Related:**

- `driver_installed`: a driver was added to the machine, often just before a load failure starts
- `nic_driver_load_failed`: the same kind of failure for a wireless network adapter's driver

**Example:** A PCI device's driver fails to load at startup.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#driver_load_failed, https://sparklogs.com/reference/reasons/driver_load_failed.json

## `ephemeral_port_alloc_failed`: ephemeral port alloc failed

A local port could not be allocated from the ephemeral port range.

**Severity:** Notice

**Why it matters:** One outbound connection attempt failed at that moment. A sustained run of these means the machine has run out of local ports, and new outbound connections fail for every program, including domain sign-in, Group Policy and file shares.

**In practice:** Tcpip logs event 4231 in the System log when a request for a port from the TCP dynamic port range fails because all of them are in use, and 4266 for the UDP range. A program that opens many connections and does not close them, or closes them faster than Windows releases them, uses up the range. A narrowed dynamic port range from an old tuning change makes it happen sooner. A reboot frees the ports, and the problem returns if the program keeps leaking them.

**When to ignore:** A single event with no repeats and no connection complaints from the user.

**What to check:**

- Check how often these repeat on the machine over time.
- Run `Get-NetTCPConnection | Group-Object OwningProcess | Sort-Object Count -Descending` or `netstat -anobq` to find the process holding the most ports.
- Check the range with `netsh int ipv4 show dynamicport tcp` (and `udp`) for a narrowed setting.
- Restart or update the program that holds the ports, and report the leak to its vendor.

**Related:**

- `dns_client_resolution_timed_out`: DNS lookups failing, which also breaks outbound connections

**Example:** A request for a TCP ephemeral port fails because all such ports are in use.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#ephemeral_port_alloc_failed, https://sparklogs.com/reference/reasons/ephemeral_port_alloc_failed.json

## `failover_cluster_csv_unavailable`: failover cluster csv unavailable

A Cluster Shared Volume became unavailable or paused.

**Severity:** Severe

**Why it matters:** Virtual machines and file shares on the volume stall or fail while it is paused or unreachable.

**In practice:** Failover Clustering logs event 5120 in the System log when a Cluster Shared Volume enters a paused state, naming the volume, its cluster disk and the error, such as STATUS_CONNECTION_DISCONNECTED or STATUS_IO_TIMEOUT. It logs event 5142 when the volume is no longer accessible from this node. A lost path to the SAN or iSCSI target, a storage network fault, or a node that lost contact with the node that owns the volume are the usual causes. A pause can be brief and recover on its own, so check whether the volume came back online.

**What to check:**

- Read the volume, its cluster disk and the error code from the message.
- Check the volume's state in Failover Cluster Manager, or with `Get-ClusterSharedVolumeState`, on every node.
- Check the storage paths of every node (multipath, iSCSI sessions, Fibre Channel) and the cluster network for the same minutes.
- Read the Microsoft-Windows-FailoverClustering/Operational log on the nodes for the cluster's own detail.

**Related:**

- `failover_cluster_node_config_stale`: the cluster service would not start because the node's configuration is out of date
- `failover_cluster_node_removed`: a whole node dropped out of the cluster
- `failover_cluster_resource_failed`: one clustered resource failed

**Example:** A Cluster Shared Volume enters a paused state because its connection was disconnected.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_csv_unavailable, https://sparklogs.com/reference/reasons/failover_cluster_csv_unavailable.json

## `failover_cluster_node_config_stale`: failover cluster node config stale

The cluster service would not start on this node because the node does not hold the latest cluster configuration.

**Severity:** Error

**Why it matters:** This node cannot join the cluster and runs none of its roles. If the nodes that hold the newer configuration are also down, the cluster cannot form at all.

**In practice:** Failover Clustering logs event 1561 in the System log when the cluster service finds that this node's copy of the cluster configuration is older than the cluster's, and stops itself from starting. The configuration changed while this node was out of the cluster, and no node holding the newer copy can be reached now. A cluster service that was running and shut down because quorum was lost logs event 1177 instead.

**What to check:**

- Bring up the node that stayed up longest, or restore network reachability to the other nodes, so this node can copy the configuration from them.
- Check this node's view of the other nodes in the Microsoft-Windows-FailoverClustering/Operational log.
- Force the cluster to start from this node (`Start-ClusterNode -FixQuorum`) only when the nodes with the newer configuration are lost for good: changes made since this node left are lost.

**Related:**

- `failover_cluster_node_removed`: a running node dropped out of membership, logged by the nodes that lost contact with it
- `failover_cluster_service_down`: the cluster service was running and then stopped, for example after losing quorum

**Example:** After a site power failure, the first node to restart holds an older cluster configuration and will not start its cluster service.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_node_config_stale, https://sparklogs.com/reference/reasons/failover_cluster_node_config_stale.json

## `failover_cluster_node_removed`: failover cluster node removed

A failover cluster node was removed from active membership.

**Severity:** Serious

**Why it matters:** The roles and virtual machines that ran on that node move to other nodes, often with a restart, and the cluster runs with less spare capacity until the node rejoins.

**In practice:** Failover Clustering logs event 1135 in the System log, "Cluster node 'NODE2' was removed from the active failover cluster membership," on each node that lost contact with the named node. Comparing which nodes each node reports shows whether one node or a link between sites failed. The node stopped answering the others: its Cluster service stopped, or it lost contact over the cluster networks. A network fault on the cluster links, a node frozen by storage or memory trouble, or heartbeat settings too tight for the network are the usual causes.

**What to check:**

- Check whether the named node restarted, crashed or lost its network at that time.
- Check the cluster network adapters, switches and NIC teaming on that node.
- Read the Microsoft-Windows-FailoverClustering/Operational log, and generate the cluster log with `Get-ClusterLog`, for the minutes before the removal.

**Related:**

- `failover_cluster_csv_unavailable`: a Cluster Shared Volume paused or became unreachable
- `failover_cluster_node_config_stale`: the cluster service would not start because the node's configuration is out of date
- `failover_cluster_service_down`: the Cluster service on a node stopped or failed

**Example:** A cluster node is removed from active membership after it stops answering the other nodes.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_node_removed, https://sparklogs.com/reference/reasons/failover_cluster_node_removed.json

## `failover_cluster_resource_failed`: failover cluster resource failed

A failover cluster resource failed.

**Severity:** Serious

**Why it matters:** The clustered role that owns the resource, such as a virtual machine, file server or SQL Server instance, is offline or moving to another node until the resource comes back.

**In practice:** Failover Clustering logs event 1069 in the System log with the resource's name, its type and the clustered role it belongs to. The cluster then applies the resource's failure policy: it restarts the resource on the same node, and after repeated failures moves the role to another node. A resource the failed one depends on, such as its disk, IP address or network name, often failed first; the earliest 1069 in the same minutes is usually the one to chase.

**When to ignore:** During planned storage or network maintenance, when the role came back online afterwards.

**What to check:**

- Open the role in Failover Cluster Manager, or run `Get-ClusterResource`, to see whether the resource and its role are online now and on which node.
- Check the resource's dependencies and the disk, network and DNS events from the same minutes.
- Run `Get-ClusterLog -TimeSpan 30` on the owning node for the detailed cluster log around the failure.

**Related:**

- `failover_cluster_csv_unavailable`: a Cluster Shared Volume paused, which fails the resources stored on it
- `failover_cluster_resource_hang`: the resource stopped answering and the cluster ended its host process

**Example:** The Physical Disk resource of a clustered role fails, and the cluster tries to restart it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_resource_failed, https://sparklogs.com/reference/reasons/failover_cluster_resource_failed.json

## `failover_cluster_resource_hang`: failover cluster resource hang

A clustered resource crashed or stopped responding, and the cluster ended its host process.

**Severity:** Serious

**Why it matters:** The resource and the others in the same host process restart, so the role they serve drops for a moment or moves to another node.

**In practice:** Failover Clustering logs event 1230 in the System log when a resource did not answer the Resource Hosting Subsystem (RHS) within its time-out. The message names the resource, its type and the resource DLL. The cluster terminates the RHS process hosting it, which usually logs event 1146 next, and runs that resource in its own monitor process from then on. A storage stall, a slow or faulty third-party resource DLL, or an overloaded node is the usual cause.

**What to check:**

- Note the DLL in the message: a vendor DLL points at that product, while clusres.dll with a disk resource points at storage.
- Check disk and storage path events, and storage latency, from the minutes before.
- Run `Get-ClusterLog -TimeSpan 30` on the node for the time-out details.

**Related:**

- `failover_cluster_resource_failed`: the resource failed and reported it, without hanging
- `failover_cluster_resource_host_crash`: the host process ending, which often follows this event

**Example:** A clustered Physical Disk resource stops responding, and the cluster terminates its host process to recover it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_resource_hang, https://sparklogs.com/reference/reasons/failover_cluster_resource_hang.json

## `failover_cluster_resource_host_crash`: failover cluster resource host crash

The cluster Resource Hosting Subsystem process ended and is being restarted.

**Severity:** Serious

**Why it matters:** Every resource hosted in that process restarts, so the roles they serve can drop or move to another node.

**In practice:** Failover Clustering logs event 1146 in the System log when an RHS process (rhs.exe), which loads the resource DLLs, terminates. Most often the cluster ended it on purpose to recover a resource that hung, and event 1230 just before names that resource. Without a 1230, a resource DLL crashed the process; Application Error event 1000 for rhs.exe in the Application log names the faulting module.

**What to check:**

- Look for event 1230 in the minutes before: it names the resource that triggered the restart.
- Check the Application log for Application Error 1000 on rhs.exe and its faulting module.
- Update or remove third-party resource DLLs, such as backup or storage vendor plugins, that the faulting module points at.

**Related:**

- `failover_cluster_resource_failed`: one resource failed, without taking its host process down
- `failover_cluster_resource_hang`: the hung resource that usually causes this restart

**Example:** The Resource Hosting Subsystem process is terminated and restarted after a disk resource stops responding.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_resource_host_crash, https://sparklogs.com/reference/reasons/failover_cluster_resource_host_crash.json

## `failover_cluster_service_down`: failover cluster service down

The cluster service on this node stopped or was forced down.

**Severity:** Severe

**Why it matters:** This node stops running clustered roles, and the other nodes must take them over. When every node logs it, the whole cluster and all its roles are down.

**In practice:** Failover Clustering logs these in the System log when the cluster service on this node halts. Event 1177 means it shut down because the cluster lost quorum. Event 1006 means it halted because this node lost connectivity with other nodes. Event 1073 means it halted to prevent an inconsistency within the cluster, with an error code. A network fault between nodes, a quorum disk or file share that cannot be reached, or several nodes down at once are the usual causes.

**What to check:**

- Read the event ID first: 1177 points at quorum, 1006 at the cluster networks, 1073 at the error code it carries.
- Run `Get-ClusterQuorum` and check that its quorum disk, file share or cloud resource is reachable.
- Check the network paths between nodes, and run `Get-ClusterLog -TimeSpan 30` for the detail.

**Related:**

- `failover_cluster_node_config_stale`: the cluster service would not start because the node's configuration is out of date
- `failover_cluster_node_removed`: the other nodes dropped a node, logged on the nodes that stayed

**Example:** During a switch outage, the cluster service on a node shuts down because quorum was lost.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#failover_cluster_service_down, https://sparklogs.com/reference/reasons/failover_cluster_service_down.json

## `filesystem_corruption`: filesystem corruption

NTFS found damage in the file system structures on a volume, could not correct it, or repaired it, or the disk layer reported corruption.

**Also reported by:** `win.eventlog.storage`

**Severity:** Critical (corrupted MFT record, MFT torn write, volume cannot be corrected, disk-provider corruption marker) / Serious (corruption in a directory index or another structure, offline Full Chkdsk required) / Error (torn write on a data file) / Warning (repair completed, repair posting throttled)

**Why it matters:** Files on the volume may be unreadable, missing or silently wrong until it is repaired, and the damage can spread as the volume keeps taking writes. Damage to the Master File Table reaches every file on the volume, because it holds the record of where each of them lives.

**In practice:** NTFS writes these to the System log under the Ntfs provider, with the volume named in the event. Event 55 is NTFS finding a corrupted structure, and the message names which one: a Master File Table (MFT) record, a directory index, or another structure. Event 98 says the volume needs to be taken offline for a Full Chkdsk, event 131 that NTFS could not correct the structure and chkdsk must run, and event 7 a torn write, a write that reached the disk only in part, on the MFT or on one file. Event 130 is a repair NTFS finished on its own, and 132 and 133 mean it paused and then resumed logging repairs because so many arrived at once. Event 55 from the disk provider reports corruption from the layer below the file system. Failing disks, controller or cable faults, and power loss during writes are the usual causes. A torn write on one data file after a power cut is often rolled back from the NTFS log; repeated damage on one volume points at the device.

**When to ignore:** A single completed repair (event 130) on a volume that logs no further damage.

**What to check:**

- Read the volume and the structure the message names, and check backups of that volume before any repair.
- For MFT damage, event 98 or event 131, schedule downtime and run `chkdsk <volume> /f` or `Repair-Volume -DriveLetter <letter> -OfflineScanAndFix`.
- Run `chkdsk <volume> /scan` or `Repair-Volume -DriveLetter <letter> -Scan` online first to see how much is damaged.
- Check the disk's health and the disk and controller events from the same period: repeated repairs on one volume point at the device.

**Related:**

- `disk_bad_block`: the disk itself reporting an unreadable sector, often the cause of this damage
- `filesystem_delayed_write_lost`: cached file data discarded before it reached the volume
- `filesystem_transaction_log_operation_failed`: the NTFS transaction log failing, with no structure reported damaged

**Example:** NTFS reports that data volume E: needs to be taken offline to perform a Full Chkdsk.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#filesystem_corruption, https://sparklogs.com/reference/reasons/filesystem_corruption.json

## `filesystem_delayed_write_lost`: filesystem delayed write lost

Windows could not save cached file data to the volume and the data was lost.

**Severity:** Serious (path on the system volume) / Error (path anywhere else)

**Why it matters:** Data an application believed it had written was discarded, and the application is not told. A file the user saved can turn out short or damaged later, and a loss on the system volume can leave a Windows or profile file damaged.

**In practice:** NTFS logs event 50 in the System log, "{Delayed Write Failed}", when it cannot write cached data for a file through to the volume: "Windows was unable to save all the data for the file. The data has been lost." The message names the file when Windows knows it. A disk or USB drive that disconnected, a failing cable or controller, or a device that did not come back from sleep in time is the usual cause. No file system structure is reported damaged, so chkdsk is not the fix; the path to the device is. A loss on a network share is logged by the SMB client instead.

**What to check:**

- Check the path to the device: cabling, controller, USB hub or dock, and the disk events from the same minutes.
- Ask the user to check and save again the file the message names, if it has one.
- A steady stream on one volume means the storage path is still failing; a single loss on a removable drive usually means it was pulled too early.

**Related:**

- `filesystem_corruption`: damage found in file system structures, answered with chkdsk
- `smb_delayed_write_lost`: the same loss reported by the SMB client for a file on a network share

**Example:** A USB drive is unplugged while Windows still holds cached writes for a file on it, and the data is lost.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#filesystem_delayed_write_lost, https://sparklogs.com/reference/reasons/filesystem_delayed_write_lost.json

## `filesystem_transaction_log_operation_failed`: filesystem transaction log operation failed

The NTFS transaction log on a volume could not be written, replayed, or brought up.

**Severity:** Warning (flush failed on a live volume, recovery error, metadata reset) / Notice (flush failed on a volume that no longer exists) / Error (resource manager could not start)

**Why it matters:** NTFS uses the transaction log to undo changes that did not finish. While it is unavailable, a change interrupted on that volume may be left half applied.

**In practice:** NTFS writes these to the System log with the volume named in the event. Event 140 means Windows failed to flush data to the transaction log, and the message warns that corruption may occur; the status that follows says why. When the status says the device does not exist, the volume was already gone, usually a removable drive or mapped volume that went away, and nothing is left to damage. Event 134 is an error while replaying the log, after which recovery carries on. Event 136 means the default transaction resource manager discarded its log metadata so it could start, and event 137 that it hit an error it cannot retry and did not start. None of these reports damage to a file system structure.

**When to ignore:** Event 140 for a drive letter that no longer exists, such as a removed USB drive.

**What to check:**

- Identify the volume, and check whether it is still present on the host.
- For a live volume, check the path to the device and the disk events from the same minutes.
- Check whether the host was low on memory at the time: resource exhaustion is a common status on event 140.

**Related:**

- `filesystem_corruption`: damage found in file system structures, answered with a volume repair
- `filesystem_delayed_write_lost`: cached file data discarded before it reached the volume

**Example:** NTFS fails to flush its transaction log for drive F:, a removable drive that is no longer attached.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#filesystem_transaction_log_operation_failed, https://sparklogs.com/reference/reasons/filesystem_transaction_log_operation_failed.json

## `gpu_driver_reset`: gpu driver reset

The NVIDIA display driver reset the graphics card.

**Severity:** Notice

**Why it matters:** The screen can go black or freeze for a few seconds, and games, video, 3D or GPU-accelerated applications running at the time can crash or lose work.

**In practice:** The NVIDIA kernel driver (nvlddmkm) logs event 153 in the System log when it resets the GPU, the kind of reset Windows Timeout Detection and Recovery (TDR) starts when the graphics card stops responding. The machine recovered: a reset Windows could not recover ends in a blue screen instead. Repeated resets point at the driver version, overheating, unstable overclocking or power, or a failing card.

**When to ignore:** A single reset now and then with no user complaint.

**What to check:**

- Check for a display driver install or update at the same time.
- Count resets per device over days: repeats are the case to work.
- Check the driver version against NVIDIA's current release, and try a clean install of a known-good version.
- Check GPU temperature, any overclocking tools, and the card's power connection.

**Related:**

- `os_bsod`: the machine crashed, which is what happens when Windows cannot recover the GPU

**Example:** An NVIDIA workstation logs a display driver reset while a 3D application is open, and the screen comes back after a few seconds.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#gpu_driver_reset, https://sparklogs.com/reference/reasons/gpu_driver_reset.json

## `group_policy_processing_failed`: group policy processing failed

Group Policy could not reach a domain controller and did not apply for that pass.

**Also reported by:** `win.eventlog.identity_security`

**Severity:** Notice on a workstation, Warning on a server or an unknown host class.

**Why it matters:** The machine runs whatever policy it last cached until a later refresh reaches a domain controller, so new or changed settings, including security settings, do not reach it.

**In practice:** The Group Policy client logs event 1129 in the System log when a processing pass fails for lack of network connectivity to a domain controller. Windows logs a success once the machine reaches a domain controller and policy applies. A laptop that starts up at home or on guest Wi-Fi without a VPN writes this at every boot. On a server or a desktop that never moves, the usual causes are DNS settings that do not point at the domain's DNS servers, a firewall between the machine and the domain controllers, or a network that is not up yet when policy starts.

**When to ignore:** On a laptop or other portable device that was off the corporate network, when later passes succeed.

**What to check:**

- Check whether the device was off the corporate network or VPN at the time.
- On a fixed machine, check its DNS servers and run `nltest /dsgetdc:<domain>` to confirm it can find a domain controller.
- Run `gpupdate /force`, then `gpresult /r`, to confirm policy applies once connectivity is back.

**Related:**

- `group_policy_domain_controller_unresolved`: no controller found at all during discovery
- `group_policy_extension_apply_failed`: one extension failing rather than the whole pass

**Example:** A laptop starts up on a home network without the VPN, and its Group Policy pass fails.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#group_policy_processing_failed, https://sparklogs.com/reference/reasons/group_policy_processing_failed.json

## `group_policy_software_install_failed`: group policy software install failed

Group Policy software installation did not complete an assignment, install or removal, or an extension deferred its change to the next startup or logon.

**Severity:** Warning or Info

**Why it matters:** A deferral applies at the next startup or logon. Any other code leaves the assigned software missing, or an old assignment in place, until a later pass succeeds.

**In practice:** Application Management Group Policy logs events 101 (assignment), 102 (install), 103 (removal of an assignment) and 108 (settings did not apply) in the System log, ending with "The error was" and a Windows error code. Group Policy also logs event 1112 when a client-side extension must wait for startup or logon. Code 1274 on 101, 108 or 1112 means Windows deferred the change to the next startup or logon, and a 103 with code 2 arrives alongside that deferral; these are kept at Info. Code 1612 means the installation source could not be reached, and 1603 that the package itself failed. Event 1112 with another code counts here only for the Software Installation extension.

**When to ignore:** Code 1274 deferrals, and the code 2 removal records that come with them, on a device that restarts regularly.

**What to check:**

- Read the error code first: 1274 waits for a restart or logon, and a device that never restarts never applies the change.
- For 1612, check that the computer account or user can read the package share from this machine.
- For 1603, install the package by hand with logging (`msiexec /i <package> /l*v <log>`) to find the failing step.

**Related:**

- `group_policy_processing_failed`: the whole Group Policy pass failing

**Example:** A new software assignment reaches a laptop during a background refresh and waits for the next restart.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#group_policy_software_install_failed, https://sparklogs.com/reference/reasons/group_policy_software_install_failed.json

## `hardware_error_corrected`: hardware error corrected

Windows Hardware Error Architecture (WHEA) reported a hardware error that the hardware corrected.

**Severity:** Notice

**Why it matters:** Nothing has failed yet: the hardware caught and fixed the fault. Repeated corrected errors on one device are the early warning for a memory module, processor or PCIe device that may later fail outright.

**In practice:** WHEA-Logger writes event 17 (a PCI Express error) or event 19 (a processor machine check) to the System log when the hardware corrects an error, with the error source and, for PCIe, the device. Event 1 at startup reports a corrected error kept by the firmware from the previous session; the line names where the details are, such as processor, memory or pcie, or details_in_firmware when only the firmware holds them.

**When to ignore:** An occasional corrected error with no growing rate and no uncorrected errors on the same device.

**What to check:**

- Track recurrence by `error_source` and `device_instance`: one device repeating is the case to work.
- A burst right after a driver or firmware change points at the change.
- Check the vendor's BIOS and chipset driver updates for the device or root port named.
- When corrected memory or processor errors keep coming, run the hardware vendor's diagnostics.

**Related:**

- `hardware_error_uncorrected`: the same error sources when correction fails

**Example:** A laptop logs a corrected PCI Express error on a chipset root port.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#hardware_error_corrected, https://sparklogs.com/reference/reasons/hardware_error_corrected.json

## `hardware_error_uncorrected`: hardware error uncorrected

Windows Hardware Error Architecture (WHEA) reported a hardware error that the hardware could not correct.

**Severity:** Error or Minor

**Why it matters:** The error was not contained: data in memory may be damaged, and a crash or restart often comes with it.

**In practice:** WHEA-Logger writes event 18 ("A fatal hardware error has occurred") or event 20 (an uncorrected error) to the System log, with the error source and the device when known. Event 1 at startup reports an uncorrected error the firmware kept from the previous session, fatal or recoverable; the line names where the details are, such as processor, memory or pcie, or details_in_firmware when only the firmware holds them, and the error time when the record states one. A failing memory module, processor or expansion card, overheating, unstable overclocking, or a power fault is the usual cause. A recoverable record means the platform contained the error.

**What to check:**

- Check for a blue screen or unexpected restart around the same time on this device.
- Track recurrence by `error_source` and `device_instance`: repeats name the failing part.
- When the line says details_in_firmware, read the vendor's hardware log (iDRAC, iLO, or the vendor's diagnostics) for the component.
- Run the hardware vendor's diagnostics, or Windows Memory Diagnostic (`mdsched.exe`) for memory, and replace the part they find.

**Related:**

- `hardware_error_corrected`: the same error sources when the hardware catches the fault
- `kernel_crash`: a kernel crash near the boot this record was reported in

**Example:** A server starts up and reports an unrecoverable hardware error from the previous boot, with the details held in the firmware.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#hardware_error_uncorrected, https://sparklogs.com/reference/reasons/hardware_error_uncorrected.json

## `http_ssl_binding_created`: http ssl binding created

An HTTPS certificate binding was created for a listener endpoint on this host.

**Severity:** Notice

**Why it matters:** The endpoint now serves HTTPS with the bound certificate, which changes the certificate clients see on it.

**In practice:** The Windows HTTP server (HTTP.sys) logs this in the System log when a certificate is bound to an address and port, or a host name and port, used by IIS, WinRM and other services that serve HTTPS through Windows. The record is event 120 from Microsoft-Windows-HttpService, which adds the status, the process and the account that made the change, or event 15301 from Microsoft-Windows-HttpEvent. Only creations that completed are recorded here. Installers, certificate renewals and `netsh http add sslcert` all create bindings.

**When to ignore:** During a software install or a planned certificate renewal on the host.

**What to check:**

- Read the endpoint from the message: an address and port, or a host name and port.
- A creation shortly after a deletion for the same endpoint is a certificate replacement.
- Run `netsh http show sslcert` to see the certificate hash now bound to the endpoint.

**Related:**

- `http_ssl_binding_deleted`: the same binding table losing an endpoint
- `http_ssl_config_failed`: a binding that exists but cannot be used

**Example:** netsh.exe, running as SYSTEM, creates the certificate binding for endpoint 0.0.0.0:8443.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#http_ssl_binding_created, https://sparklogs.com/reference/reasons/http_ssl_binding_created.json

## `http_ssl_binding_deleted`: http ssl binding deleted

The HTTPS certificate binding for a listener endpoint was removed on this host.

**Severity:** Notice

**Why it matters:** Clients reaching that endpoint over HTTPS get no certificate and fail to connect until a binding is put back.

**In practice:** The Windows HTTP server (HTTP.sys) logs this in the System log when the certificate binding for an address and port, or a host name and port, is deleted. The record is event 119 from Microsoft-Windows-HttpService, which adds the status, the process and the account that made the change, or event 15300 from Microsoft-Windows-HttpEvent. Only deletions that completed are recorded here: a failed attempt naming no endpoint is not. An uninstall and the first half of a certificate replacement both delete a binding.

**When to ignore:** When a creation for the same endpoint follows within minutes, or the software that used it was uninstalled.

**What to check:**

- Read the endpoint from the message: an address and port, or a host name and port.
- Check whether a creation for the same endpoint follows, which is what a certificate replacement looks like.
- If none follows and a site or service stopped answering on HTTPS, rebind its certificate in IIS Manager or with `netsh http add sslcert`.

**Related:**

- `http_ssl_binding_created`: the same binding table gaining an endpoint
- `http_ssl_config_failed`: a binding that exists but cannot be used

**Example:** netsh.exe, running as SYSTEM, deletes the certificate binding for endpoint 0.0.0.0:8443.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#http_ssl_binding_deleted, https://sparklogs.com/reference/reasons/http_ssl_binding_deleted.json

## `http_ssl_config_failed`: http ssl config failed

An HTTPS listener endpoint on this host could not use its SSL configuration.

**Severity:** Error

**Why it matters:** Clients connecting to that endpoint over HTTPS fail the TLS handshake until the binding or the certificate behind it is fixed.

**In practice:** The Windows HTTP server (HTTP.sys) logs event 15021 from Microsoft-Windows-HttpEvent in the System log when it cannot use the SSL configuration for the endpoint the message names. The specific status code is in the event's binary data, which is not part of the message. A certificate that was deleted, expired or renewed without updating the binding, or a private key the service cannot read, is the usual cause.

**What to check:**

- Read the endpoint from the message, then run `netsh http show sslcert` for the certificate hash bound to it.
- Check in certlm.msc that a certificate with that hash is still in the store and still valid.
- Check that the service account can read the certificate's private key (Manage Private Keys in certlm.msc).
- Rebind a current certificate in IIS Manager or with `netsh http update sslcert`.

**Related:**

- `http_ssl_binding_deleted`: the binding for an endpoint being removed outright
- `tls_cert_expired`: a certificate this host presented having passed its validity period

**Example:** After a certificate renewal, HTTP.sys reports an error using the SSL configuration for an intranet site on port 443.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#http_ssl_config_failed, https://sparklogs.com/reference/reasons/http_ssl_config_failed.json

## `hyperv_vswitch_config_restore_failed`: hyperv vswitch config restore failed

A Hyper-V virtual switch could not restore the configuration of one of its ports.

**Severity:** Windows' own level, up to Error (server or unknown) / Info (workstation)

**Why it matters:** The virtual machine, container or host adapter on that port can start without the network settings it had, such as its VLAN or bandwidth and security settings.

**In practice:** Hyper-V VmSwitch logs event 15 in the System log, "Failed to restore configuration for port ... on switch ...", with a status such as "Object Name not found". The port and switch are named by ID, and the friendly name is often empty. On a workstation it is routine at startup on the Default Switch and the switches WSL and Docker create and remove, so it is kept at Info there.

**When to ignore:** On a workstation with WSL or the Hyper-V Default Switch, when its virtual networks work.

**What to check:**

- On a server, check each virtual machine's network adapter and switch connection with `Get-VMNetworkAdapter -VMName *`.
- Run `Get-VMSwitch` to match the switch ID in the message to a switch name.
- Reconnect an affected adapter to its switch and check its VLAN setting.

**Example:** Hyper-V fails to restore the configuration for an unnamed port on a virtual switch, with status "Object Name not found".

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#hyperv_vswitch_config_restore_failed, https://sparklogs.com/reference/reasons/hyperv_vswitch_config_restore_failed.json

## `iis_apppool_disabled`: iis apppool disabled

IIS rapid-fail protection disabled an application pool after its worker process failed repeatedly.

**Severity:** Serious (server or unknown) / Warning (workstation)

**Why it matters:** Every site in the pool returns "503 Service Unavailable" until someone fixes the cause and starts the pool again.

**In practice:** The Windows Process Activation Service (WAS) logs event 5002 in the System log, "Application pool ... is being automatically disabled due to a series of failures in the process(es) serving that application pool." Rapid-fail protection stops the pool when its worker process (w3wp.exe) crashes or fails to start too many times in a short period, by default five failures in five minutes. A bad deployment, a missing dependency or configuration file, a wrong .NET version, or an application pool identity whose password changed is the usual cause. The pool stays stopped until someone starts it.

**What to check:**

- Look for the worker crashes or start failures just before (WAS events 5011, 5009, 5059, 5021 or 5057) and the Application log crash records for w3wp.exe.
- Check for a deployment or configuration change to the sites in the pool.
- Start the pool in IIS Manager or with `Start-WebAppPool -Name <pool>` once the cause is fixed, and watch whether it stays up.

**Related:**

- `iis_apppool_identity_invalid`: the pool's identity is invalid, so IIS cannot create a worker
- `iis_apppool_worker_start_failed`: the worker process could not start, which can lead to this
- `iis_worker_crash`: one worker process crash, which IIS recovers by starting a new one

**Example:** A deployment with a missing configuration file crashes an intranet site's worker process repeatedly, and IIS disables its application pool.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#iis_apppool_disabled, https://sparklogs.com/reference/reasons/iis_apppool_disabled.json

## `iis_apppool_identity_invalid`: iis apppool identity invalid

IIS reported that an application pool's configured identity is invalid or cannot be resolved.

**Severity:** Error or Warning

**Why it matters:** The sites in that application pool cannot get a worker process, so their visitors get HTTP 503 Service Unavailable until the identity is fixed.

**In practice:** Windows Process Activation Service (WAS) logs these in the System log, naming the application pool. Event 5021 says the pool's identity is invalid: the user name or password is wrong, the password expired or changed, or the account lacks the "Log on as a batch job" right. Event 5057 says WAS did not create a worker process because the identity is invalid, and the pool is disabled. A service account whose password was reset in Active Directory without updating IIS is the usual cause. A worker process that WAS could not start is logged as 5059.

**What to check:**

- In IIS Manager, open the application pool's Advanced Settings and re-enter the Identity, or switch it to ApplicationPoolIdentity if the site needs no domain account.
- Check the account in Active Directory: locked out, disabled, or password expired or recently changed.
- Check that the account holds "Log on as a batch job" in Local Security Policy or the Group Policy applied to the server.
- Start the application pool again after fixing the identity.

**Related:**

- `account_locked_out`: a lockout of the same service account, often caused by the stale password IIS keeps trying
- `iis_apppool_disabled`: the pool was stopped by rapid-fail protection after its worker crashed repeatedly
- `iis_apppool_worker_start_failed`: the worker process failed to start for a reason other than its identity

**Example:** After a service account's password is reset in Active Directory, IIS reports the application pool identity as invalid.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#iis_apppool_identity_invalid, https://sparklogs.com/reference/reasons/iis_apppool_identity_invalid.json

## `iis_apppool_worker_start_failed`: iis apppool worker start failed

IIS reported that an application pool's worker process failed to start.

**Severity:** Error or Warning

**Why it matters:** The sites in that application pool return HTTP 503 Service Unavailable until a worker process starts.

**In practice:** Windows Process Activation Service (WAS) logs event 5059 in the System log when it could not start a worker process (w3wp.exe) for the named application pool, and disables the pool. A broken module or handler entry in the configuration, a missing or damaged DLL the pool loads, a 32-bit setting that does not match the application, or an access denied error on the site's files are common causes. An invalid application pool identity is logged as 5021 or 5057.

**What to check:**

- Read the error code in the event, and look for an Application log error from IIS or the .NET runtime at the same time.
- Check recent changes to the application pool or site: configuration edits, new modules, an application deployment, or a change to Enable 32-Bit Applications.
- Start the application pool again in IIS Manager after the fix, and confirm it stays started.

**Related:**

- `iis_apppool_disabled`: the pool was stopped by rapid-fail protection after its worker crashed repeatedly
- `iis_apppool_identity_invalid`: the worker could not start because the pool's configured identity is invalid
- `iis_worker_crash`: a worker that was running ended unexpectedly

**Example:** After an application deployment adds a module that fails to load, IIS cannot start the pool's worker process.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#iis_apppool_worker_start_failed, https://sparklogs.com/reference/reasons/iis_apppool_worker_start_failed.json

## `iis_worker_crash`: iis worker crash

An IIS worker process terminated unexpectedly.

**Severity:** Warning

**Why it matters:** Requests the worker was handling fail or reset, and users of the site can lose their session. IIS starts a new worker on the next request, but repeated crashes can disable the pool.

**In practice:** Windows Process Activation Service (WAS) logs these in the System log, naming the application pool and the process ID. Event 5009 says a process serving the pool terminated unexpectedly and gives its exit code. Event 5011 says the process suffered a fatal communication error with WAS. A fault in the application code, a third-party module or a .NET runtime error is the usual cause.

**When to ignore:** A single crash on a test or rarely used site, with no repeat and no disabled pool after it.

**What to check:**

- Look in the Application log at the same time for Application Error event 1000 or a .NET Runtime error naming w3wp.exe: it names the faulting module.
- Group by application pool: one pool crashing again and again points at that application.
- Check for a recent application deployment or update to a module the pool loads.

**Related:**

- `iis_apppool_disabled`: repeated crashes made rapid-fail protection stop the pool, which keeps it down
- `iis_apppool_worker_start_failed`: the worker never started

**Example:** A worker process serving an internal web application crashes, and IIS starts a new one on the next request.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#iis_worker_crash, https://sparklogs.com/reference/reasons/iis_worker_crash.json

## `ip_address_conflict_detected`: IP address conflict

Another device on the network is using the same IP address as this machine.

**Also reported by:** `win.eventlog.network`

**Severity:** Warning

**Why it matters:** Connections from this machine can fail or drop on and off while two devices answer for one address, until one of them moves to another address.

**In practice:** Windows checks that an address is free on the network before it uses it, and logs a conflict in one of three places. For an IPv4 address, Tcpip logs event 4199 in the System log, naming the address and the hardware (MAC) address of the other device. The DHCP client logs event 1005 in Microsoft-Windows-Dhcp-Client/Admin when an address it was given is already in use, and then asks for a different one. The DHCPv6 client logs event 1005 in Microsoft-Windows-Dhcpv6-Client/Admin for an IPv6 address. A device with a static address inside the DHCP scope is the usual cause. Two DHCP servers handing out overlapping ranges, or a device holding on to an old lease after the scope changed, also cause it.

**When to ignore:** A single conflict that does not repeat, after which the machine has a working address.

**What to check:**

- Read the address on the event. On event 4199, the other device's hardware address is there too: its first half names the vendor, which often points at a printer, camera or phone.
- On repeats, find the other device: `arp -a` on a machine in the same subnet shows the hardware address answering for that address.
- Move static addresses out of the DHCP scope, or give those devices reservations, and check for a second DHCP server on the subnet.

**Related:**

- `dhcp_lease_failed`: no address obtained at all, rather than an address another device also uses

**Example:** A laptop joins the office network and finds a printer already using its address.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#ip_address_conflict_detected, https://sparklogs.com/reference/reasons/ip_address_conflict_detected.json

## `kerberos_cert_domain_unresolved`: kerberos cert domain unresolved

Kerberos could not resolve the domain named in a certificate offered for sign-in.

**Severity:** Info (capped)

**Why it matters:** On a domain-joined device, certificate or smart card sign-in for that domain does not complete. On a cloud-joined or standalone device the record has no effect.

**In practice:** Security-Kerberos logs event 11 in the System log when the domain in a sign-in certificate cannot be matched to a domain this device can reach. The same check runs for physical smart cards, virtual smart cards and Windows Hello for Business, so the record does not show that a physical card is in use. Its text says "non-domain joined computer" on every device, joined ones included. On a cloud-joined or workgroup device the certificate's domain can never resolve, and the record repeats at sign-in. On a domain-joined device it usually means no domain controller was reachable at sign-in, for example off the corporate network without VPN.

**When to ignore:** On a cloud-joined or workgroup device, where it repeats at sign-in and changes nothing. On a domain-joined laptop that was off the corporate network at the time, when sign-in works once it is back.

**What to check:**

- Check how the device is joined (`dsregcmd /status`) and whether that matches the domain in the certificate.
- On a domain-joined device, check that it can find a domain controller (`nltest /dsgetdc:<domain>`) and that its DNS points at the domain's servers.

**Related:**

- `kerberos_smartcard_cert_missing`: the domain controller side: the controller itself has no certificate for smart card logon

**Example:** A cloud-joined laptop records that the domain in its sign-in certificate could not be resolved.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#kerberos_cert_domain_unresolved, https://sparklogs.com/reference/reasons/kerberos_cert_domain_unresolved.json

## `kerberos_etype_unsupported`: kerberos etype unsupported

A Kerberos exchange failed because the encryption types the client, the service account and the domain controller support do not overlap.

**Severity:** Warning

**Why it matters:** The client cannot get the ticket it asked for, so access to that service falls back to another sign-in method or fails. Accounts left in this state stop authenticating once the domain refuses the legacy encryption types outright.

**In practice:** The Kerberos Key Distribution Center on a domain controller logs these in the System log. Event 16 names an account that holds no key for any encryption type the request asked for, and lists the requested types and the types the account has. An account whose password was last set before it had AES keys, or a client or appliance that asks only for RC4 or DES, is the usual cause. Event 203 means the domain controller refused a client that offered only insecure types for a service account with no supported encryption types set on it. These records name the accounts and clients that still depend on RC4 or DES as Microsoft retires them.

**What to check:**

- Read the account and the requested encryption types from the message.
- Set the supported encryption types (msDS-SupportedEncryptionTypes) on the service account, or reset its password so an AES key is generated.
- Find the clients and appliances that request only RC4 or DES, and update or reconfigure them before the legacy types are refused.

**Related:**

- `kerberos_ticket_failed`: the Security log record of a ticket request that was denied, with the reason the domain gave
- `kerberos_weak_krbtgt_key`: the same legacy-encryption problem on the domain's ticket-granting account itself

**Example:** A domain controller cannot issue a ticket for an old service account that holds no AES key.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#kerberos_etype_unsupported, https://sparklogs.com/reference/reasons/kerberos_etype_unsupported.json

## `kerberos_pac_verify_failed`: kerberos pac verify failed

A domain controller could not verify the signature on the privilege data inside a Kerberos ticket.

**Severity:** Warning

**Why it matters:** The request carrying that ticket did not proceed. A client presenting the same ticket repeatedly keeps failing to authenticate to the affected service.

**In practice:** The Kerberos Key Distribution Center logs event 18 in the System log when the signature on a ticket's privilege attribute certificate (PAC), the account's group membership data, does not verify. The message names the account the ticket belongs to. Its text reads like a forged ticket, and a forgery would produce it. Domain controllers at different update levels during Microsoft's PAC signature hardening produce the same record, and nothing in the event tells the two apart.

**What to check:**

- Compare the update level of every domain controller in the domain before reading this as an attack.
- Note which account the message names, and whether the records follow one client or many.
- If every domain controller is current and the records continue, review the named account's recent sign-ins for signs of compromise.

**Related:**

- `kerberos_etype_unsupported`: another Kerberos failure, where the parties share no encryption type

**Example:** A domain controller rejects a ticket for one account because another controller in the domain is behind on updates.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#kerberos_pac_verify_failed, https://sparklogs.com/reference/reasons/kerberos_pac_verify_failed.json

## `kerberos_smartcard_cert_missing`: kerberos smartcard cert missing

A domain controller has no usable certificate for smart card logon.

**Severity:** Warning

**Why it matters:** Smart card and other certificate-based sign-ins do not work against this domain controller. Passwords and other sign-in methods are unaffected.

**In practice:** The Kerberos Key Distribution Center logs these in the System log. Event 29 says the domain controller cannot find a suitable certificate for smart card logon, or could not verify the one it has. Event 19 is logged when a smart card logon attempt needed that certificate, so it shows someone was affected. A domain controller certificate that expired, was never enrolled, or chains to an authority the controller does not trust is the usual cause. Where no one signs in with certificates, only event 29 appears and nothing breaks.

**When to ignore:** Event 29 alone, in a domain where no one signs in with smart cards, virtual smart cards or certificate-based Windows Hello for Business.

**What to check:**

- Confirm whether smart card or certificate sign-in is in use in this domain before acting.
- On the domain controller, check the computer certificate store (certlm.msc) for a valid Kerberos Authentication or Domain Controller Authentication certificate.
- Check the certificate template, auto-enrollment, and the chain to the issuing authority.

**Related:**

- `cert_enroll_failed`: the enrollment failure that can leave a controller without its certificate
- `kerberos_cert_domain_unresolved`: the client side: a device could not resolve the domain in its sign-in certificate

**Example:** A domain controller's certificate has expired, and a user's smart card sign-in against it fails.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#kerberos_smartcard_cert_missing, https://sparklogs.com/reference/reasons/kerberos_smartcard_cert_missing.json

## `kerberos_weak_krbtgt_key`: kerberos weak krbtgt key

The domain ticket-granting account has no strong encryption key, so Kerberos tickets are issued using legacy cryptography.

**Severity:** Warning

**Why it matters:** Every ticket the domain issues is protected by weaker cryptography than it should be. The domain stops issuing usable tickets once the legacy encryption types are refused.

**In practice:** The Kerberos Key Distribution Center logs event 42 in the System log, naming the krbtgt account and stating that its password must be updated to prevent the use of insecure cryptography. The krbtgt account holds only legacy keys, which happens when its password has not been reset since before the domain stored AES keys for it. Nothing fails today and users notice nothing. The record repeats until the password is reset.

**What to check:**

- Reset the krbtgt password following Microsoft's documented procedure, and let it replicate to every domain controller before any second reset.
- Plan it before the legacy encryption types are refused outright.

**Related:**

- `kerberos_etype_unsupported`: the same legacy-encryption problem on ordinary service accounts

**Example:** A domain controller reports that the krbtgt account lacks strong keys and its password must be updated.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#kerberos_weak_krbtgt_key, https://sparklogs.com/reference/reasons/kerberos_weak_krbtgt_key.json

## `nic_driver_fault_reported`: nic driver fault reported

A loaded Intel wireless adapter driver reported a fault in the adapter or in itself.

**Severity:** Warning

**Why it matters:** Wi-Fi on that adapter drops or becomes unreliable while the fault lasts, and on most laptops it is the only way off the machine. The driver normally resets and reloads itself without anyone acting.

**In practice:** The Intel wireless driver (provider Netwtw or Netwaw followed by a generation number) logs these in the System log. Event 5002 says the driver has determined the network adapter is not functioning properly, and event 5005 that the driver hit an internal error and failed. Windows then resets the adapter, and the driver writes its usual initialization records, which SparkLogs keeps at Debug. A fault with no initialization after it is an adapter that stayed down. On a device without Intel's message files the text is a bare ID line, and the event ID carries the meaning. A driver that could not load at all is logged as 5000 instead.

**When to ignore:** A single fault followed within moments by the driver's initialization, with no repeat that day.

**What to check:**

- Check whether the driver wrote initialization records after the fault, which means it recovered.
- Repeats on one device point at the adapter, its firmware or the driver version: install the current Intel or device-maker driver.
- Check the adapter's power management (Device Manager, Power Management tab) when faults follow sleep or resume.

**Related:**

- `nic_driver_load_failed`: the driver failing to load at all, which no reset recovers
- `nic_link_down`: a working adapter reporting its link lost, which is a different fact
- `wlan_limited_connectivity`: Windows reporting the wireless connection degraded

**Example:** A laptop's Intel Wi-Fi driver reports that the adapter is not functioning properly, then resets it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#nic_driver_fault_reported, https://sparklogs.com/reference/reasons/nic_driver_fault_reported.json

## `nic_driver_load_failed`: nic driver load failed

An Intel wireless adapter driver could not load, normally because of a resource conflict.

**Severity:** Error

**Why it matters:** The Wi-Fi adapter is missing from the network stack, so the machine has no wireless connection until someone fixes it. Nothing on the machine retries the load.

**In practice:** The Intel wireless driver (provider Netwtw or Netwaw followed by a generation number) logs event 5000 in the System log when it met a conflict in resources and could not load. Other IDs from the same driver that say it could not load land here too. A resource conflict with another device, a damaged or mismatched driver install, or a device disabled in firmware are the usual causes. A driver that loaded and then reported a fault is logged as 5002 or 5005 instead.

**What to check:**

- Check the adapter in Device Manager for an error code, and reinstall the current Intel or device-maker driver.
- Check the firmware (BIOS or UEFI) settings for the wireless device, and any recent firmware or driver update.
- Check whether the device has another adapter, such as wired Ethernet, carrying its traffic.

**Related:**

- `driver_load_failed`: the same kind of failure for drivers outside this adapter family
- `nic_driver_fault_reported`: a loaded driver reporting a fault, which normally resets itself
- `nic_link_down`: a working adapter reporting its link lost

**Example:** A laptop's Intel Wi-Fi driver reports a conflict in resources and does not load.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#nic_driver_load_failed, https://sparklogs.com/reference/reasons/nic_driver_load_failed.json

## `nic_link_down`: nic link down

A network adapter reported that its link went down, or reported the link back.

**Severity:** Notice (workstation down) / Warning (server or unknown down) / Info (recovered)

**Why it matters:** Traffic on that adapter stops until the link returns. A machine with another working adapter stays reachable; one with only this adapter is offline for the duration.

**In practice:** The wired adapter's own driver logs these in the System log. Intel drivers (e1i68x64 and the other e1...x64 generations, e2fnexpress, and the e1dexpress, e1dnexpress and e1iexpress drivers) log event 27, network link is disconnected. Realtek drivers (rt640x64, rt68cx21) log event 1, the adapter is disconnected from the network. Broadcom NetXtreme (bnxtnd) logs event 2, link down, with a reminder to check the cable. The return of the link is recorded under the same reason code: Intel event 32 (and 33 or 34 on the express drivers) and Broadcom event 9 or 14, each naming the speed it came back at. Realtek's return is not collected here. A cable, a dock, a switch port or a switch restart is the usual cause.

**When to ignore:** On a laptop or desktop when the link returns soon after, as with docking, undocking or moving a cable.

**What to check:**

- Look for the matching link-up record and read the gap between them.
- Repeated drop-and-return cycles on one adapter point at the cable, the switch port, or power saving on the adapter.
- Check the speed the link came back at: a gigabit adapter returning at 100 Mbps points at the cable or the port.
- On a server, check the switch's log for the port at the same time.

**Related:**

- `nic_driver_fault_reported`: the wireless driver reporting a fault in itself, not the state of a link
- `nic_driver_load_failed`: the wireless driver could not load at all

**Example:** A desktop's Intel Ethernet link goes down and comes back seconds later at 1 Gbps.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#nic_link_down, https://sparklogs.com/reference/reasons/nic_link_down.json

## `os_boot`: os boot

The operating system started.

**Severity:** Info

**Why it matters:** Marks the start of a session, so it bounds when the machine was down and when a user or a service could next use it.

**In practice:** Kernel-General logs event 12 in the System log as Windows starts, with the system time the kernel recorded as the start. Windows also notes a start with EventLog events 6005 and 6009, and SparkLogs labels only Kernel-General 12, so each boot appears once. The record does not say why the machine started or whether the previous session ended cleanly.

**When to ignore:** A boot that follows a clean shutdown at an expected time, such as a patch window or a user powering on in the morning.

**What to check:**

- Read the gap from the previous os_shutdown or unexpected_shutdown to see how long the machine was down.
- Look for an os_restart_requested before it to see who or what asked for the restart.

**Related:**

- `os_restart_requested`: who asked for the restart and why
- `os_shutdown`: the clean stop that ended the previous session
- `unexpected_shutdown`: the previous session ended without a clean shutdown

**Example:** A desktop starts after its monthly patch restart.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#os_boot, https://sparklogs.com/reference/reasons/os_boot.json

## `os_bsod`: os bsod

Windows rebooted from a bugcheck.

**Severity:** Serious (server or unknown) / Error (workstation)

**Why it matters:** The machine crashed with a blue screen and restarted, so the user lost unsaved work and every service on it was down until it came back.

**In practice:** WER-SystemErrorReporting logs event 1001 in the System log at the first start after a bugcheck (stop error), with the stop code and its four parameters, the path of the dump file, and a report ID. SparkLogs adds the name Microsoft documents the stop code under, such as DRIVER_IRQL_NOT_LESS_OR_EQUAL, as `bugcheck_name`. A faulty or outdated driver is the usual cause; failing memory or storage, overheating and firmware are others. Kernel-Power event 41 and EventLog event 6008 record the same crash as an unclean stop, and event 1001 is the one that proves it was a bugcheck.

**What to check:**

- Search the `bugcheck_name`: it is the name Microsoft documents the stop code under.
- Keep the dump file the event names, and open it with WinDbg (`!analyze -v`) to see the driver or module involved.
- Check for recent driver, firmware or Windows updates before the crash, and update or roll back the driver the dump points at.
- If crashes repeat with different stop codes, test the memory (Windows Memory Diagnostic) and the system disk.

**Related:**

- `kernel_crash`: one row per kernel crash with the decoded code and any dump analysis; count crashes from it, not from this record
- `unexpected_shutdown`: the unclean stop the same crash also produces, which a power loss can cause too

**Example:** A workstation restarts after a blue screen, and Windows records the stop code and the dump file path at the next start.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#os_bsod, https://sparklogs.com/reference/reasons/os_bsod.json

## `os_restart_requested`: os restart requested

A process asked Windows to restart or shut down the machine.

**Severity:** Notice

**Why it matters:** Names who or what restarted the machine, which is the first thing to settle when a restart interrupted users or a service outside a maintenance window.

**In practice:** User32 logs event 1074 in the System log when a program asks Windows to restart or power off. It names the program, the user it ran for, the shutdown type (restart or power off), the reason and reason code, and any comment typed with `shutdown /c`. Windows Update and the servicing stack, an RMM or patching tool, an installer, and a person using the Start menu or `shutdown.exe` each look different here. The reason is what the requester stated, and a planned reason does not prove a planned restart.

**When to ignore:** A restart requested by the expected patching tool or an administrator during the agreed maintenance window.

**What to check:**

- Read the `process_path`, the actor and the `shutdown_reason` to tell an updater, an RMM tool and a person apart.
- For a restart outside the maintenance window, check the requesting program's own schedule or policy, such as Windows Update active hours or the RMM's patch policy.

**Related:**

- `os_boot`: the start after the restart
- `os_shutdown`: the clean stop that follows the request

**Example:** An updater running for a user asks for a planned restart with the comment "Monthly patch window".

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#os_restart_requested, https://sparklogs.com/reference/reasons/os_restart_requested.json

## `os_shutdown`: os shutdown

The operating system shut down cleanly.

**Severity:** Info

**Why it matters:** Marks the clean end of a session, so later gaps in data until the next start are the machine being off, not a fault.

**In practice:** Kernel-General logs event 13 in the System log as Windows completes a clean shutdown, with the system time it stopped. Windows writes it only on a clean stop, so a start with no event 13 before it means the previous session ended uncleanly. It covers restarts as well as power-offs, and does not say whether the stop was wanted.

**When to ignore:** A shutdown with an expected os_restart_requested before it, such as a patch restart or a user powering off.

**What to check:**

- Pair it with the nearest os_restart_requested to see which program and user asked for it.

**Related:**

- `os_boot`: the start of the next session
- `os_restart_requested`: who asked for the stop and why
- `unexpected_shutdown`: a session that ended without this clean stop

**Example:** A laptop shuts down cleanly at the end of the day.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#os_shutdown, https://sparklogs.com/reference/reasons/os_shutdown.json

## `os_sleep`: os sleep

The device went to sleep.

**Severity:** Info

**Why it matters:** Marks the start of a span when the device was asleep, so missing data and failed remote access during it are not faults.

**In practice:** Kernel-Power logs these in the System log. Event 42 is the start of classic sleep or hibernation, and event 506 is the start of Modern Standby; a device uses one model or the other. Each names the reason, such as an idle timeout, a closed lid, the power button or a program request.

**When to ignore:** Routine sleep on a laptop or desktop, such as an idle timeout or a closed lid.

**What to check:**

- Read the span to the next os_wake as time the device was asleep.
- If a device sleeps when it should stay awake, check its power plan (`powercfg /query`) and the sleep reason in the message.

**Related:**

- `os_wake`: the device woke again

**Example:** A laptop enters Modern Standby after its idle timeout.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#os_sleep, https://sparklogs.com/reference/reasons/os_sleep.json

## `os_wake`: os wake

The device woke from sleep.

**Severity:** Info

**Why it matters:** Marks the end of a span when the device was asleep, and the wake source explains a device that woke when nobody was using it.

**In practice:** Power-Troubleshooter logs event 1 in the System log after a return from classic sleep or hibernation, with the sleep time, the wake time and the wake source. Kernel-Power logs event 507 when a device leaves Modern Standby, with the reason it left. Common wake sources are the power button, the keyboard or mouse, a network adapter, and a timer set by Windows Update or another program.

**When to ignore:** Routine wake by a user, or a scheduled wake inside the maintenance window.

**What to check:**

- Read the wake source from the message when a device wakes and nobody expected it to.
- `powercfg /lastwake` shows the last wake source, `powercfg /waketimers` the active wake timers, and `powercfg /devicequery wake_armed` the devices allowed to wake it.

**Related:**

- `os_sleep`: the device went to sleep

**Example:** A laptop returns from sleep when its lid is opened.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#os_wake, https://sparklogs.com/reference/reasons/os_wake.json

## `pagefile_extended`: pagefile extended

Windows grew the page file because committed memory ran low.

**Severity:** Notice

**Why it matters:** Some programs can be refused memory while the page file grows, and the user may see a slow machine or an application error.

**In practice:** Windows shows a "Virtual Memory Minimum Too Low" message, logged as Application Popup event 26 in the System log. It says the system is low on virtual memory and Windows is increasing the size of the paging file. Task Manager's Committed figure neared its limit, and Windows raised the limit by growing the page file. One program using far more memory than usual, or a machine with too little memory for its work, is the usual cause. If the limit is reached and cannot grow, Windows shows "Out of Virtual Memory" instead.

**When to ignore:** A single occurrence during an unusually heavy task, with no "Out of Virtual Memory" after it.

**What to check:**

- In Task Manager, sort by Commit size (Details tab) to find the program holding the memory.
- When it repeats, size the page file or the installed memory for the workload.

**Related:**

- `ram_commit_exhausted`: committed memory reached its limit and Windows could not grow it

**Example:** A workstation running a large spreadsheet export runs low on committed memory, and Windows grows the page file.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#pagefile_extended, https://sparklogs.com/reference/reasons/pagefile_extended.json

## `patch_install_deferred`: patch install deferred

Windows Update deferred an install attempt on this device; nothing failed.

**Severity:** Info or Verbose

**Why it matters:** The update lands on a later cycle without anyone acting, and nothing on the device changed.

**In practice:** WindowsUpdateClient logs event 20 in the System log with the text "Installation Failure", even when the update was only put off. Result code 0x80073d02 means a package could not be replaced because an app using it was running; 0x80073d25 is the same on a shared machine where another signed-in user holds it. The next update cycle replaces the package once nothing holds it. Result code 0x80240016 means another install was in progress or a restart was pending, and Windows Update tries again later. The update title and the result code are on the SparkLogs line. Any other result code on event 20 is a real failure, and has its own reason code.

**When to ignore:** A single deferral, or a few for one update over a day or two: it installs on a later cycle without anyone acting.

**What to check:**

- Group by update title across the fleet if one update keeps deferring over several days.
- For 0x80240016 that repeats, check for a restart the device owes and let it happen.

**Related:**

- `patch_install_failed`: the same event ID when the install actually failed

**Example:** A Store app update is put off because the app is open, with result code 0x80073d02.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#patch_install_deferred, https://sparklogs.com/reference/reasons/patch_install_deferred.json

## `patch_install_failed`: patch install failed

Windows Update reports that an update install on this device failed or was interrupted.

**Also reported by:** `win.eventlog.setup`

**Severity:** Minor or Info

**Why it matters:** On a failure the device stays without that update until a later attempt succeeds. The same update failing cycle after cycle leaves the device behind on patching.

**In practice:** Windows Update logs event 20 from WindowsUpdateClient in the System log when an install attempt does not succeed ("Installation Failure: Windows failed to install the following update with error ..."). The record names the update title and the result code. Codes 0x8024001E and 0x80242008 mean a shutdown stopped the attempt or the update service cancelled it, so nothing was installed or changed. Every other code, or a record with no readable code, is a failed install. Low free disk space, a damaged component store, or a conflict with a driver or application are common causes, and the result code usually says which. Event 20 for a package in use or an update told to retry later is reported as patch_install_deferred instead.

**When to ignore:** An attempt that ended with 0x8024001E or 0x80242008, stopped by a shutdown or cancelled by the update service: nothing changed, and Windows offers the update again on its next cycle.

**What to check:**

- Check whether a later attempt at the same update succeeded (event 19 with the same title).
- Group by `update_title` across the fleet: one update failing on many devices is a problem with that update, while one device failing many updates is a problem with the device.
- Search the result code: Microsoft documents most Windows Update codes and what fixes them.
- For repeated failures on one device, check free space on the system drive, run `DISM /Online /Cleanup-Image /RestoreHealth`, then retry the update.
- The device's Microsoft-Windows-WindowsUpdateClient/Operational log and `Get-WindowsUpdateLog` hold more detail than this record.

**Related:**

- `patch_install_deferred`: the same event when the update was held back by a package in use or a pending retry, which is not a failure

**Example:** A security update fails to install with error 0x80070643.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#patch_install_failed, https://sparklogs.com/reference/reasons/patch_install_failed.json

## `platform_tamper_indicator_reported`: platform tamper indicator reported

A platform-security agent reported a tamper indicator against this machine.

**Also reported by:** `win.eventlog.platform`

**Severity:** Error or Warning

**Why it matters:** A BIOS setting that weakens firmware protection is enabled, or the machine's case was opened. Either can be routine IT work or the first sign that someone tampered with the firmware or the hardware.

**In practice:** Dell Trusted Device logs these in the System log under the provider "Dell Trusted Device | BIOS Events and IoA". Event 11 reports a partial indicator of attack: the agent matched part of a pattern and is still watching. Event 12 reports that a partial indicator escalated, or that an indicator of attack was detected outright. Each message names a Category and lists the BIOS or chassis events it was built from, such as BIOS downgrade being allowed. A message in none of those three forms is still kept, with its text, as a reported indicator. Ordinary work produces the same records: allowing BIOS downgrade for a planned firmware rollback, or opening the case to add memory or a disk.

**When to ignore:** When a planned BIOS change or a hardware service visit at that time explains every setting or chassis event the message lists.

**What to check:**

- Read the Category and the listed events in the message: they name the settings or chassis events the agent matched.
- Check whether a planned BIOS change, firmware rollback or hardware service visit on this machine explains it.
- Where nothing explains it, compare the named BIOS settings with the machine's standard and put them back, then find out who had physical or administrator access.

**Related:**

- `av_unsigned_code_blocked`: an endpoint agent blocking code it could not verify, with no firmware or chassis finding

**Example:** Dell Trusted Device reports a partial indicator of attack after BIOS downgrade is enabled.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#platform_tamper_indicator_reported, https://sparklogs.com/reference/reasons/platform_tamper_indicator_reported.json

## `ram_commit_exhausted`: ram commit exhausted

Committed memory on this host reached its limit.

**Also reported by:** `win.eventlog.platform`

**Severity:** Serious on a server, Error otherwise

**Why it matters:** Programs fail to start, crash, or fail to save work when Windows cannot give them memory, and users may see "Your system is low on virtual memory".

**In practice:** Resource-Exhaustion-Detector logs event 2004 in the System log when Windows diagnoses a low virtual memory condition. It names the programs that held the most virtual memory and records the committed memory, its limit, and the installed and used physical memory. Application Popup event 26 titled "Windows - Out of Virtual Memory" is the dialog Windows shows for the same condition. The limit is roughly physical memory plus the page file, so it can be reached with physical memory to spare when the page file is small, fixed in size, or cannot grow. A program that keeps growing its memory use is the usual cause. The "Virtual Memory Minimum Too Low" popup, where Windows grows the page file, is reported as pagefile_extended instead.

**What to check:**

- Start from the top consumer named in event 2004 (`mem_top_consumer_image`) and restart or update it; Task Manager's Details tab with the Commit size column shows who holds the most now.
- Compare `mem_commit_bytes` with `mem_commit_limit_bytes` and `mem_physical_used_bytes` with `mem_physical_bytes`: committed memory at the limit with physical memory free points at the page file size.
- Check the page file settings (System Properties, Advanced, Performance, Virtual memory): a small or fixed page file, or one on a nearly full drive, lowers the limit.
- Add memory when no single program explains it and the machine's normal workload needs more.

**Related:**

- `pagefile_extended`: Windows grew the page file as committed memory ran low, before or without reaching the limit
- `ram_commit_near_limit`: the agent's condition for committed memory staying close to its limit, before it is reached

**Example:** Windows diagnoses low virtual memory and names one program holding 6 GB of it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#ram_commit_exhausted, https://sparklogs.com/reference/reasons/ram_commit_exhausted.json

## `rds_license_server_unactivated`: rds license server unactivated

A Remote Desktop license server is not activated and is issuing only temporary licences.

**Severity:** Warning

**Why it matters:** Remote Desktop clients get temporary licences that expire. Once they do, users are refused sessions with a licensing error until the server is activated.

**In practice:** The Remote Desktop Licensing service logs event 18 from TerminalServices-Licensing in the System log when it starts and finds the license server has never been activated with Microsoft. The message names the server and says it will only issue temporary licenses. An unactivated server cannot issue the client access licences installed on it, so each device it serves under per-device licensing gets a temporary licence, valid for 90 days. A new license server that was set up and never finished, or one rebuilt from scratch, is the usual cause.

**What to check:**

- Activate the server named in the message in Remote Desktop Licensing Manager (`licmgr.exe`), then confirm its licences show as available.
- Check the licensing mode and licence counts on the server while it is open, and that the Session Hosts point at this server.

**Related:**

- `rds_license_tracking_failed`: an activated server that cannot record per-user licences in Active Directory
- `rds_licensing_service_failed`: the license server cannot run at all, or its database fails

**Example:** A new Remote Desktop license server reports at startup that it has not been activated.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#rds_license_server_unactivated, https://sparklogs.com/reference/reasons/rds_license_server_unactivated.json

## `rds_license_tracking_failed`: rds license tracking failed

A Remote Desktop license server could not record a per-user licence in the directory.

**Severity:** Warning

**Why it matters:** Per-user licence usage is not recorded for the affected users, so licence reports undercount. Sessions keep working.

**In practice:** The Remote Desktop Licensing service logs event 4105 from TerminalServices-Licensing in the System log when it cannot update the licence attributes on a user's Active Directory account. The message names the user and the domain. The usual cause is that the license server's computer account is not a member of the Terminal Server License Servers group in that domain, which the message also states. Windows does not enforce per-user licences, so nothing is refused; only the usage record is incomplete.

**What to check:**

- Add the license server's computer account to the Terminal Server License Servers group in the domain the message names.
- Re-run the per-user licence usage report afterwards: issues from before the fix were not recorded.

**Related:**

- `rds_license_server_unactivated`: the server is not activated and issues only temporary licences
- `rds_licensing_service_failed`: the license server cannot run at all, or its database fails

**Example:** A license server cannot update the licence attributes for a user in its Active Directory domain.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#rds_license_tracking_failed, https://sparklogs.com/reference/reasons/rds_license_tracking_failed.json

## `rds_licensing_service_failed`: rds licensing service failed

A Remote Desktop license server could not run, or hit an error in its licensing database.

**Severity:** Error

**Why it matters:** This server stops issuing Remote Desktop client access licences reliably. Licences already issued keep working until they expire, so users may be refused sessions only weeks later.

**In practice:** The Remote Desktop Licensing service logs these from TerminalServices-Licensing in the System log. Event 37 means the service cannot start and names the error, such as a failure to initialize its cryptography. Event 4097 means an error occurred while the license server was initializing, without naming one. Event 44 comes from a service that is running and reports an error from its licensing database, which holds the licences it has issued. A start failure is usually a permissions or profile problem on the server; a database error does not clear by itself and points at the store that needs repair or restore.

**What to check:**

- Read the error the message names before restarting anything.
- Check whether the Remote Desktop Licensing service is running now, and whether a later start succeeded.
- Check whether the deployment has a second license server still issuing licences.
- For a database error, restore the licensing database from backup or rebuild it, then re-activate and reinstall the licences.

**Related:**

- `rds_license_server_unactivated`: a license server that runs but issues only temporary licences
- `rds_license_tracking_failed`: a running server that cannot record per-user licences in Active Directory

**Example:** The Remote Desktop Licensing service cannot start because it fails to initialize its cryptography.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#rds_licensing_service_failed, https://sparklogs.com/reference/reasons/rds_licensing_service_failed.json

## `secure_boot_cert_update_pending`: secure boot cert update pending

A Secure Boot certificate update has not been applied on this device.

**Severity:** Warning

**Why it matters:** The device keeps its older Secure Boot certificates. Once those expire, it can no longer receive security updates to its boot components, and future Windows or firmware updates that need the new certificates can fail.

**In practice:** TPM-WMI logs event 1801 in the System log when Secure Boot certificates or keys in the device's firmware need an update that has not been applied yet. Microsoft is replacing the 2011 Secure Boot certificates, which begin to expire in 2026, with 2023 versions, and Windows applies them through a scheduled servicing task. It stays pending when the update has not reached the device yet, or when the firmware does not accept the write and needs an update from the device maker first. Windows retries often while it is pending, so repeats from one device are kept as one record with a count of the repeats. Event 1808 from the same provider records that the device has applied the update.

**What to check:**

- Install the latest Windows cumulative update, then check whether event 1808 follows.
- Check the device maker's support site for a BIOS or UEFI update, which some models need before they accept the new certificates.
- Confirm what the firmware holds now: `[System.Text.Encoding]::ASCII.GetString((Get-SecureBootUEFI db).bytes) -match 'Windows UEFI CA 2023'` returns True once the new certificate is in place.

**Related:**

- `tpm_attestation_failed`: the TPM could not attest a critical boot component, a failure rather than a pending update

**Example:** A device reports that a Secure Boot certificate update is available and has not been applied.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#secure_boot_cert_update_pending, https://sparklogs.com/reference/reasons/secure_boot_cert_update_pending.json

## `secure_boot_certs_current`: secure boot certs current

The device has the 2023 Secure Boot certificates and the boot manager signed with them.

**Severity:** Info

**Why it matters:** None. The device can keep taking boot security updates after the 2011 certificates expired.

**In practice:** TPM-WMI writes event 1808 in the System log when every needed 2023 certificate is in the firmware and the boot manager is signed by the Windows UEFI CA 2023. BucketConfidenceLevel is Microsoft's rating of the update for this hardware model during the rollout. Once 1808 is logged it needs no action, even when it reads "No Data Observed - Action Required".

**When to ignore:** Always. This is the finished state.

**What to check:**

- No action. Use it to confirm which devices are current on the 2023 Secure Boot certificates.

**Related:**

- `secure_boot_cert_update_pending`: certificates available but not yet applied
- `secure_boot_update_failed`: an update that did not apply

**Example:** A laptop reports the KEK 2023, DB certificates and the 2023 boot manager in place.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#secure_boot_certs_current, https://sparklogs.com/reference/reasons/secure_boot_certs_current.json

## `secure_boot_update_failed`: secure boot update failed

A Secure Boot certificate or revocation update from Windows did not apply to the firmware.

**Severity:** Notice

**Why it matters:** The device keeps its older Secure Boot certificates. The 2011 Microsoft certificates expired in 2026, so a device that never takes the 2023 certificates stops receiving boot security updates.

**In practice:** TPM-WMI writes these events in the System log when the Secure Boot servicing task cannot apply an update. Event 1795 means the firmware returned an error and 1796 an unexpected error. Windows tries again at the next restart. Event 1797 means the revocation of the 2011 Windows certificate waits until the Windows UEFI CA 2023 certificate is in the firmware DB. Event 1802 means Microsoft blocked the update for a known firmware issue (SkipReason names it), and 1803 that no Key Exchange Key signed by the device maker's platform key exists for this device.

**When to ignore:** 1797 on a device that has not yet taken the 2023 certificates: it clears once they apply.

**What to check:**

- For 1795, 1802 and 1803, check the device maker for a firmware update and apply it.
- For 1803 on a virtual machine, check the hypervisor vendor's guidance for updating the Secure Boot keys.
- For 1796, read the error code. Windows retries the update at the next restart.
- Suspend BitLocker before a firmware update so the Secure Boot change does not trigger recovery.

**Related:**

- `secure_boot_cert_update_pending`: certificates waiting to be applied to the firmware
- `secure_boot_certs_current`: the device has the 2023 certificates and boot manager
- `secure_boot_revocation_update_failed`: the SBAT update failure as the boot environment reports it

**Example:** On a laptop with a known firmware issue, the KEK 2023 update is blocked with SkipReason KI_7.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#secure_boot_update_failed, https://sparklogs.com/reference/reasons/secure_boot_update_failed.json

## `security_agent_service_start_failed`: security agent service start failed

A sub-service of an endpoint protection agent failed to start.

**Severity:** Warning

**Why it matters:** The named component of the security product is not running. Where the component belongs to this installation, the product is working without part of its protection.

**In practice:** McAfee Service Controller, the supervisor in McAfee and Trellix endpoint products, logs event 6 in the System log when a sub-service it runs fails to start. The message names the sub-service and the Windows error. The product logs it at Information, so the level does not show the failure. The common error is "The system cannot find the file specified", which usually means the supervisor asked for a component this edition of the product does not install. On a machine that should have that component, the same message means a damaged install.

**When to ignore:** When the error is "The system cannot find the file specified" and the product's console shows the named component is not part of this installation.

**What to check:**

- Read the error in the message: a missing file is usually a component this edition does not ship.
- Confirm in the product's management console whether the named component should be on this machine.
- If it should, repair or reinstall the agent and check that the component starts.

**Related:**

- `security_agent_service_terminated`: the same supervisor reporting a component that died while running
- `service_start_failed`: Service Control Manager reporting a Windows service that failed to start

**Example:** The supervisor reports that a sub-service failed to start because its file cannot be found.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#security_agent_service_start_failed, https://sparklogs.com/reference/reasons/security_agent_service_start_failed.json

## `security_agent_service_terminated`: security agent service terminated

A sub-service of an endpoint protection agent terminated unexpectedly.

**Severity:** Minor

**Why it matters:** The named component of the security product stopped, and the protection it gives is missing until it runs again. A machine that logs these over and over has a broken install that keeps losing part of its protection.

**In practice:** McAfee Service Controller, the supervisor in McAfee and Trellix endpoint products, logs event 5 in the System log when a sub-service it runs terminates unexpectedly, naming the sub-service. The product logs it at Information, so the level does not show the failure. The supervisor is built to restart its sub-services, and event 1 from the same provider records a sub-service entering the running state again. An occasional termination followed by event 1 is a component that crashed and came back; a steady stream on one machine is a restart loop.

**When to ignore:** A single termination followed by event 1 for the same sub-service, on a machine that does not repeat it.

**What to check:**

- Count these per machine and per sub-service: a steady rate on one machine is the problem to fix.
- Check for event 1 for the same sub-service shortly after, which shows it restarted.
- For a machine in a restart loop, check the product version against the vendor's known issues, then repair or reinstall the agent.

**Related:**

- `security_agent_service_start_failed`: the same supervisor reporting a component that never started
- `service_crashed`: Service Control Manager reporting a Windows service that terminated unexpectedly

**Example:** A McAfee module service terminates unexpectedly, and the supervisor reports it running again.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#security_agent_service_terminated, https://sparklogs.com/reference/reasons/security_agent_service_terminated.json

## `service_crashed`: service crashed

A Windows service crashed or terminated unexpectedly.

**Severity:** Error

**Why it matters:** Whatever the service provides, such as backup, remote access, security or a line-of-business application, stops until it restarts, and a service that keeps crashing keeps dropping it.

**In practice:** Service Control Manager logs event 7031 or 7034 in the System log when a service process ends without being asked to stop. Windows logs 7031 when the service has recovery actions set, and the message names the action it will take next; 7034 means no recovery action is set. The message counts the crashes ("It has done this 2 time(s)"), shown here as `crash_count`. A bug or bad update in the service, a dependency it lost, or security software ending the process are the usual causes. A service that stops and reports its own error code is logged as 7023 or 7024 instead.

**When to ignore:** A vendor helper service on a workstation, such as a graphics driver's container service, that crashes now and then, restarts on its own, and backs nothing the user relies on.

**What to check:**

- Group by `service_name`: one service crashing again and again is a fault in that product, while many services crashing in the same minutes points at something they share.
- Look in the Application log for Application Error event 1000 at the same time: it names the faulting module and its version.
- Check the service's Recovery tab in services.msc, or `sc qfailure <service>`, so a service that matters restarts on its own.
- Check for a recent update to the service's software and the vendor's known issues for that version.

**Related:**

- `service_exited_with_error`: the service stopped and reported an error code, which is a controlled exit
- `service_hang`: the service is still running but stopped answering Service Control Manager
- `sparklogs_agent_stopped`: the same events for the SparkLogs agent's own service

**Example:** A vendor's helper service terminates unexpectedly for the second time, and Windows schedules a restart.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_crashed, https://sparklogs.com/reference/reasons/service_crashed.json

## `service_exited_with_error`: service exited with error

A Windows service stopped and reported an error.

**Severity:** Error

**Why it matters:** Whatever the service provides stays unavailable until it starts again, and it fails the same way until the cause of the error is fixed.

**In practice:** Service Control Manager logs event 7023 or 7024 in the System log when a service stops and returns an error code. 7023 carries a Windows error, often written as a reference such as %%1064, which is Windows error 1064. 7024 carries a code the service's own vendor defines, which only that vendor's documentation explains. The code is shown here as `service_error`. A missing file, a bad configuration value, an expired or changed account password, or a dependency that stopped are common causes. A service that ends without returning any code is a crash, logged as 7031 or 7034 instead.

**What to check:**

- Read `service_error`: for a Windows error, `net helpmsg <number>` prints its text; for a service-specific code, look it up in the vendor's documentation.
- Check whether the service started again later (event 7036 for the same service entering the running state).
- Read the service's own log or the Application log at the same time, which often says what it could not do.

**Related:**

- `service_crashed`: the service ended without reporting an error code
- `service_start_failed`: the service never started, rather than stopping after it ran

**Example:** A vendor service terminates with Windows error 1064 while handling a control request.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_exited_with_error, https://sparklogs.com/reference/reasons/service_exited_with_error.json

## `service_hang`: service hang

A Windows service did not answer a control request from Service Control Manager in time.

**Severity:** Notice

**Why it matters:** A stop, pause or status request to the service did not complete in time, which can hold up a restart, a shutdown, or software that waits on the service.

**In practice:** Service Control Manager logs event 7011 in the System log when it waits too long for a service to answer a control request ("A timeout (30000 milliseconds) was reached while waiting for a transaction response from the ... service"). The message names the service and how long Service Control Manager waited. It is common during boot, shutdown and update installs, when a busy disk or processor slows services down, and one record does not mean the service stayed hung. The SparkLogs agent judges a service that stays stuck from its state over time.

**When to ignore:** A single record during boot, shutdown or an update install, for a service that is running normally afterwards.

**What to check:**

- Check whether the named service is running and answering now (`sc query <service>`).
- Look for the same service in other Service Control Manager events around it, such as crashes or failed starts.
- If one service logs this again and again outside boot and shutdown, check its vendor's known issues and the machine's disk and processor load at those times.

**Related:**

- `service_crashed`: the service process ended unexpectedly
- `service_hung_starting`: the service stalled while starting, without reporting progress
- `service_stuck_pending`: the agent condition for a service that stays stuck starting or stopping

**Example:** A vendor service does not answer a control request within the 30 seconds Service Control Manager waits.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_hang, https://sparklogs.com/reference/reasons/service_hang.json

## `service_hung_starting`: service hung starting

A Windows service hung while starting.

**Severity:** Notice

**Why it matters:** The service may not have started, and services or applications that depend on it can wait or fail.

**In practice:** Service Control Manager logs event 7022 in the System log ("The ... service hung on starting.") when a service stays in the starting state without reporting progress in the time it said it needed. The message names the service. A slow or busy disk at boot, a dependency such as a network share or database that is not ready, or a fault in the service are common causes. One record does not mean the service stayed down; it may finish starting a little later. The SparkLogs agent judges a service that stays stuck from its state over time.

**When to ignore:** A single record at boot for a service that is running normally afterwards.

**What to check:**

- Check whether the named service is running now.
- Look for event 7000, 7009 or 7011 for the same service at the same time.
- If it repeats at every boot, check what the service depends on (`sc qc <service>`) and whether those are ready in time.

**Related:**

- `service_start_failed`: Windows gave up on starting the service and logged the error
- `service_start_timeout`: the service program did not connect to Service Control Manager at all
- `service_stuck_pending`: the agent condition for a service that stays stuck starting or stopping

**Example:** A vendor service hangs on starting during boot.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_hung_starting, https://sparklogs.com/reference/reasons/service_hung_starting.json

## `service_installed`: service installed

A Windows service was installed.

**Also reported by:** `win.eventlog.security`, `services`

**Severity:** Notice, Info or Verbose

**Why it matters:** A new service runs a program each time it starts, often as LocalSystem, so an install nobody planned can be malware or remote-access software setting itself up to persist.

**In practice:** Service Control Manager logs event 7045 in the System log ("A service was installed in the system.") when a new service is registered. It records the service name, the program and its arguments (`image_path`, `command_line`), the service type, the start type and the account it runs as. Most installs are planned software: agents, updates and installers. A kernel or file-system driver logs the same event, with no account, and is kept at a low level, because SparkLogs reports the driver install itself as `kernel_driver_installed`. An updater that registers a new service named after each version it installs, in that version's own folder, is recorded as routine maintenance. The Security log records the same install as event 4697 when auditing for it is turned on.

**When to ignore:** An install that matches planned software on this machine, or an updater registering the service for its own new version.

**What to check:**

- Read the service name, program path, start type and account: a program in a user, temp or ProgramData folder, a script host such as cmd.exe or powershell.exe, or an encoded command line deserves a closer look.
- Match the install to planned software deployments or patching on this machine at that time.
- Check the program's signature and vendor, and what else ran on the machine just before.

**Related:**

- `kernel_driver_installed`: the agent reported a kernel or file-system driver install from this record
- `service_command_line_changed`: the agent saw an existing service's program or arguments change
- `service_removed`: the agent saw a service registration disappear

**Example:** A service named ExampleSvc is installed to start automatically as LocalSystem.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_installed, https://sparklogs.com/reference/reasons/service_installed.json

## `service_start_failed`: service start failed

A Windows service failed to start.

**Severity:** Error

**Why it matters:** Whatever the service provides is missing until it starts, often from boot onward.

**In practice:** Service Control Manager logs event 7000 in the System log ("The ... service failed to start due to the following error:") with the service name and a Windows error, shown here as `service_error`. The error is often written as a reference such as %%1053, which is Windows error 1053. 1053 means the service did not respond in time, 1069 means its account could not log on, and 2 or 3 means its program file or folder is missing. A changed or expired service account password, a partial uninstall, a disabled dependency, or security software blocking the program are common causes.

**What to check:**

- Read `service_error`: `net helpmsg <number>` prints the text of a Windows error.
- For a logon failure, check event 7038 for the account, then update the password on the service's Log On tab in services.msc.
- Check the program path and dependencies with `sc qc <service>`, and whether a dependency also failed to start.
- Check whether a later start succeeded.

**Related:**

- `service_auto_not_running`: the agent condition for an automatic service that is not running
- `service_exited_with_error`: the service started, ran, then stopped with an error
- `service_start_timeout`: the timeout that often comes just before error 1053

**Example:** A vendor service fails to start with error 1053 because it did not respond in time.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_start_failed, https://sparklogs.com/reference/reasons/service_start_failed.json

## `service_start_timeout`: service start timeout

A Windows service did not connect to Service Control Manager before the startup timeout.

**Severity:** Notice

**Why it matters:** The service may not have started, and anything that depends on it is missing until it does.

**In practice:** Service Control Manager logs event 7009 in the System log when it starts a service's program and the program does not report back in time ("A timeout was reached (30000 milliseconds) while waiting for the ... service to connect."). The message names the service and how long Service Control Manager waited. Event 7000 with error 1053 ("The service did not respond to the start or control request in a timely fashion") often follows for the same service. A slow disk or busy processor at boot, security software scanning the program as it starts, or a damaged or missing program file are common causes. The SparkLogs agent judges whether an automatic service stayed down from its state over time.

**When to ignore:** A single record at boot for a service that is running normally afterwards.

**What to check:**

- Check whether the named service is running now.
- Look for event 7000 for the same service right after, and the error it names.
- If it times out at every boot, check disk health and boot load, and whether security software is scanning the service's program.
- Microsoft documents raising the wait with the `ServicesPipeTimeout` value (milliseconds, restart required) under `HKLM\SYSTEM\CurrentControlSet\Control` for a slow service. Treat it as a last step.

**Related:**

- `service_auto_not_running`: the agent condition for an automatic service that is not running
- `service_hung_starting`: the program connected but stalled while starting
- `service_start_failed`: the start failed with a named error, often 1053 after this timeout

**Example:** A vendor service does not connect within the 30 seconds Service Control Manager waits at startup.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#service_start_timeout, https://sparklogs.com/reference/reasons/service_start_timeout.json

## `smb_delayed_write_lost`: smb delayed write lost

Windows could not save cached file data to a network share and the data was lost.

**Severity:** Error

**Why it matters:** A file the user saved to a share is missing the last changes, or is damaged. The application was told the save worked, so nobody is warned.

**In practice:** The SMB client logs "{Delayed Write Failed} Windows was unable to save all the data for the file ... The data has been lost." in the System log, as event 50 or 139 from mrxsmb or Mup. Windows held the data in its write cache, accepted the save, and then could not write it to the file server, so it discarded it. The message names the file on the share. A dropped VPN or Wi-Fi connection, a laptop changing networks, or a file server that restarted while the file was open are the usual causes. Large files kept open for a long time, such as Outlook data files or OneNote notebooks on a redirected Documents folder, are the ones most often hit.

**What to check:**

- Ask the user to check the file the message names, and restore it from a backup or previous version if it is damaged.
- Check the link to the file server at that time: VPN drops, Wi-Fi roaming, or a server restart.
- Count these per machine: a steady stream means the connection to that server keeps dropping.
- Keep Outlook data files and other large open files off network shares where you can.

**Related:**

- `filesystem_delayed_write_lost`: the same loss for a file on a local disk, where the device is the suspect

**Example:** A user saves a spreadsheet to a mapped drive just as the connection to the file server drops.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#smb_delayed_write_lost, https://sparklogs.com/reference/reasons/smb_delayed_write_lost.json

## `smb_server_transport_bind_failed`: smb server transport bind failed

The Windows file-sharing service could not bind to a network transport.

**Severity:** Warning, or Info on a workstation

**Why it matters:** On a file server, clients cannot reach its shares over the network adapter it failed to bind to. On a workstation it normally just marks an adapter appearing or disappearing.

**In practice:** The Server service (LanmanServer) logs event 2504 from the provider Server in the System log ("The server could not bind to the transport ..."). The message names the transport, such as \Device\NetBT_Tcpip_{GUID}, where the GUID identifies the network adapter. The service keeps running on every transport that did bind. On a workstation, the service tries to bind to each adapter as it comes and goes, so Wi-Fi, VPN and docking adapters produce many of these as part of normal running. On a server it is rare, and usually means an adapter that was disabled, removed, or not ready at boot, or file sharing turned off on it.

**When to ignore:** On a workstation that does not share files, these follow its adapters coming and going.

**What to check:**

- Match the GUID in the message to an adapter with `Get-NetAdapter | Select-Object Name, InterfaceGuid`.
- On a server, confirm the shares answer on every address clients use, and that File and Printer Sharing is bound to that adapter.
- If it happened at boot only, check whether a later bind succeeded and clients connect normally.

**Related:**

- `smb_share_recreate_failed`: the Server service could not bring back one share because its folder is gone

**Example:** The Server service cannot bind to a NetBT transport as an adapter goes away.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#smb_server_transport_bind_failed, https://sparklogs.com/reference/reasons/smb_server_transport_bind_failed.json

## `smb_share_recreate_failed`: smb share recreate failed

A file share could not be recreated because the folder it points at no longer exists.

**Severity:** Warning

**Why it matters:** Users, scanners and scripts that use that share name fail to connect until the folder is restored or the share is removed.

**In practice:** The Server service (LanmanServer) logs event 2511 from the provider Server in the System log when it starts and cannot recreate a configured share ("The server service was unable to recreate the share ... because the directory ... no longer exists."). The message names the share and the missing folder. Every other share on the machine still works. It is logged again each time the service starts, until the share or the folder is fixed. A folder deleted or moved without removing its share is the usual cause, such as a scanner drop folder, a departed user's redirected folder, or an uninstalled application's folder.

**What to check:**

- Check whether the folder was moved or renamed, and whether anything still uses the share.
- If it is still needed, recreate the folder and its permissions; if not, remove the share with `net share <share> /delete`.

**Related:**

- `smb_server_transport_bind_failed`: the Server service could not listen on one network adapter

**Example:** A scanner's drop folder was deleted, and the Server service cannot recreate its ScanDrop share at startup.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#smb_share_recreate_failed, https://sparklogs.com/reference/reasons/smb_share_recreate_failed.json

## `sparklogs_agent_started`: sparklogs agent started

The SparkLogs agent service started.

**Also reported by:** `lifecycle`

**Severity:** Display

**Why it matters:** The record marks when the agent resumed; the time since it last stopped has no device or performance readings from this machine. Logs written in that gap arrive after the start, unless Windows overwrote them first, which the agent reports as skipped events.

**In practice:** Service Control Manager logs event 7036 in the System log when the SparkLogs agent service enters the running state, at every boot, after every agent update and after a manual restart. This row is Windows' record of the start, with `reported_by` set to `os`; the agent also reports its own start, and the two describe one start. The Windows record matters most after a stop the agent could not report, such as a crash or a power loss. Only the service this agent runs as counts here; other services entering the running state are ordinary 7036 records.

**When to ignore:** A start that follows a boot, an agent update or a matching stop, which is routine.

**What to check:**

- Read the span since the previous sparklogs_agent_stopped as time without agent readings; logs from that span arrive after the start unless Windows overwrote them first (the agent reports those as skipped events).
- A start with no stop before it points at a crash, a killed process or a power loss: look for unexpected_shutdown or a terminated sparklogs_agent_stopped row before it.

**Related:**

- `sparklogs_agent_stopped`: the agent service stopped or terminated, which opens the gap this start closes

**Example:** The SparkLogs agent service enters the running state as the machine boots.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#sparklogs_agent_started, https://sparklogs.com/reference/reasons/sparklogs_agent_started.json

## `sparklogs_agent_stopped`: SparkLogs agent stopped

The SparkLogs agent stopped.

**Also reported by:** `lifecycle`

**Severity:** Error or Display

**Why it matters:** The agent takes no device or performance readings until it starts again. After a crash, logs keep arriving. After an update, a shutdown or someone stopping the service, logs written in the gap arrive once collection starts again. They are lost if the agent is uninstalled or never started again. Event log records can also be lost if Windows overwrites them before the agent starts again; the agent then reports them as skipped events.

**In practice:** Service Control Manager writes event 7036 in the System log when the agent service stops, and 7031 or 7034 when it terminates unexpectedly; these records name no cause. A machine whose last event is this one has no device or performance readings from the agent until the next start. When the agent dies without stopping, the Service Control Manager records it in the System log, and SparkLogs reports that record under this reason at Error.

**When to ignore:** A stop beside an agent update or a shutdown, followed by a start.

**What to check:**

- The cause in the event, and for a stop by someone, which administrator or RMM policy stopped it.
- The time to the next SparkLogs agent started: how long the machine had no readings.
- Repeated error stops: report them to SparkLogs support with the device name.

**Related:**

- `sparklogs_agent_started`: The agent started again, and whether its last stop was clean.

**Example:** Windows stops the agent as an office desktop shuts down to install its monthly updates.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#sparklogs_agent_stopped, https://sparklogs.com/reference/reasons/sparklogs_agent_stopped.json

## `storage_controller_reset`: storage controller reset

A storage controller driver reset the path to a disk, or reported a timeout or controller error.

**Also reported by:** `win.eventlog.storage`

**Severity:** Notice on uaspstor USB-path resets; Warning on other controller resets.

**Why it matters:** Disk reads and writes stall while the controller resets, so programs freeze for seconds, and requests in flight are retried or lost. Repeated resets on one path often come before a cable, backplane, controller or drive failure.

**In practice:** The storage miniport driver writes these in the System log. The common one is event 129, "Reset to device, \Device\RaidPortN, was issued": the driver gave up waiting for the device and reset the path to it. It covers Warning, Error and Critical records of event 129 and of event 11 ("The driver detected a controller error on \Device\RaidPortN") from storahci (SATA AHCI) and stornvme (NVMe), and event 129 from the Intel RST (iaStor), Hyper-V (storvsc) and USB attached SCSI (uaspstor) drivers. A reset through uaspstor is a USB drive or enclosure, and shows as Notice. The event does not say whether the device is the boot disk or something plugged in; the storage port driver's own record in the Microsoft-Windows-Storport/Operational log does. Informational records from these drivers are not counted here.

**When to ignore:** A single USB drive reset when the drive was being unplugged or was waking from sleep.

**What to check:**

- Note the RaidPort number in the message and match it to a controller and disk in Device Manager.
- Look for disk event 153 retries, disk event 11 errors or paging errors on the same disk around the resets.
- Reseat or replace the cable, update the controller driver and firmware, and check the drive's SMART health.
- On a virtual machine (storvsc), check the host's storage latency at the same time.
- SparkLogs keeps fewer rows for repeated resets on one port; the System log on the machine has every one.

**Related:**

- `disk_controller_error`: the disk driver reported a controller error on the path
- `disk_io_retried`: the disk driver retried a request, which often comes just before a reset
- `disk_surprise_removal`: the device disappeared instead of recovering

**Example:** The AHCI controller resets the path to a desktop's SATA disk, and the machine freezes for a few seconds.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#storage_controller_reset, https://sparklogs.com/reference/reasons/storage_controller_reset.json

## `time_sync_failed`: time sync failed

Windows Time could not reach or resolve its time source.

**Severity:** Warning (server or unknown) / Info (workstation)

**Why it matters:** While the clock runs without a source it drifts, and once it is off by enough, Kerberos sign-ins, certificate checks and scheduled jobs start to fail.

**In practice:** The Windows Time service (NtpClient) writes these in the System log under the Microsoft-Windows-Time-Service provider. Event 134 means it could not set up a time source, most often because the name did not resolve in DNS; event 47 means a manually set time server gave no valid answer, and event 129 means it could not find a domain controller to sync from. The peer it was trying is shown as `time_peer`, and the service retries on its own. A laptop off the corporate network that cannot reach its domain controller logs these routinely, so they show at Info on workstations. On a server, and above all on a domain controller, a missed sync matters more because other machines take their time from it.

**When to ignore:** A workstation off the corporate network that logs these until it reconnects, with no sign-in or certificate errors around them.

**What to check:**

- Run `w32tm /query /status` and `w32tm /query /peers` to see the source and when it last synced.
- Check that `time_peer` resolves in DNS and answers on UDP port 123 through any firewall.
- On a domain member, check it can reach a domain controller; on the PDC emulator, check its external time source.
- Run `w32tm /resync` after fixing the path, and compare the clock with a known-good source.

**Related:**

- `tls_cert_expired`: a certificate rejected as outside its validity dates, which a wrong clock also causes

**Example:** A server cannot resolve its manually set time server in DNS, and Windows Time retries in 15 minutes.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#time_sync_failed, https://sparklogs.com/reference/reasons/time_sync_failed.json

## `tls_cert_expired`: tls cert expired

A remote server presented a certificate that has expired or is not yet valid, and the TLS connection failed.

**Severity:** Error

**Why it matters:** The connection to that endpoint does not complete, and retrying does not help until the certificate is renewed or the local clock is corrected.

**In practice:** Schannel, the Windows TLS component, logs event 36881 in the System log when a program on this machine connects to a server whose certificate is outside its validity dates. The server's certificate is attached to the event in Event Viewer, but the message names neither the server nor the program. An expired certificate on the server is the usual cause. When the certificate's dates look current, this machine's clock is the suspect: a clock that is wrong by days or years makes valid certificates fail.

**What to check:**

- Open the event in Event Viewer and read the attached certificate to find the server and its validity dates.
- Check the local clock and time zone; if the clock is wrong, fix time sync first.
- If the server's certificate expired, the server's owner must renew it; for a vendor service, contact the vendor.

**Related:**

- `time_sync_failed`: Windows Time could not reach its source, which can leave the clock wrong
- `tls_cert_name_mismatch`: the certificate was rejected for a name that does not match the server
- `tls_cert_untrusted_ca`: the certificate was rejected for an issuer this machine does not trust

**Example:** A line-of-business application cannot reach its vendor's server after the vendor's certificate expires.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tls_cert_expired, https://sparklogs.com/reference/reasons/tls_cert_expired.json

## `tls_cert_name_mismatch`: tls cert name mismatch

A server presented a TLS certificate that does not contain the name this machine connected to.

**Severity:** Error

**Why it matters:** The program's connection to that server fails, or, if the program ignores the check, it talks to a server whose identity is not proven.

**In practice:** Schannel, the Windows TLS component, logs event 36884 in the System log, "The certificate received from the remote server does not contain the expected name", when a program on this machine connects to a server whose certificate lists other names. The message names neither the server nor the program. Connecting by IP address or short name to a server whose certificate lists only its full DNS name, a certificate missing one of the server's names, or a proxy or inspection device that presents its own certificate are the usual causes.

**What to check:**

- Find the program and the name it connects to, from its own logs or settings, and compare it with the certificate's subject and Subject Alternative Names.
- Point the program at a name the certificate lists, or reissue the certificate with the missing name.
- If a proxy or inspection device is in the path, check whether it is meant to intercept this connection.

**Related:**

- `tls_cert_expired`: the certificate was rejected for being outside its validity dates
- `tls_cert_untrusted_ca`: the certificate was rejected for an issuer this machine does not trust

**Example:** An internal application connects to a server by its short name, but the server's certificate lists only its full DNS name.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tls_cert_name_mismatch, https://sparklogs.com/reference/reasons/tls_cert_name_mismatch.json

## `tls_cert_untrusted_ca`: tls cert untrusted ca

A remote server presented a certificate issued by an authority this host does not trust, and the TLS connection failed.

**Severity:** Error

**Why it matters:** The connection to that endpoint does not complete, and the server's identity is unproven.

**In practice:** Schannel, the Windows TLS component, logs event 36882 in the System log when a program on this machine connects to a server whose certificate chain ends at an authority missing from this machine's trusted roots. The message names neither the server nor the program. A server using a self-signed or internal certificate authority that was never deployed here, or a firewall or proxy inspecting HTTPS whose root certificate was not pushed to this machine, are the usual causes. The same event on many machines at once usually points at an inspection device or a missing root certificate deployment, not at one server.

**What to check:**

- Check whether a TLS-inspecting appliance or proxy is in the path and whether its authority is deployed to this host.
- Check the machine's Trusted Root Certification Authorities store (certlm.msc) for the issuing authority.
- Confirm the endpoint is one this host is meant to reach.

**Related:**

- `tls_cert_expired`: the same rejection for a certificate outside its validity window
- `tls_cert_name_mismatch`: the same rejection for a name that does not match

**Example:** A new firewall starts inspecting HTTPS before its root certificate is pushed to the workstations.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tls_cert_untrusted_ca, https://sparklogs.com/reference/reasons/tls_cert_untrusted_ca.json

## `tls_cipher_mismatch`: tls cipher mismatch

A remote client offered no cipher suite this host accepts, and the TLS handshake failed.

**Severity:** Warning

**Why it matters:** The client cannot connect to this host over TLS. The host itself is unaffected and continues serving clients that offer a supported suite.

**In practice:** Schannel, the Windows TLS component, logs event 36874 in the System log when a client connects to a TLS service on this machine, such as IIS, Remote Desktop or LDAPS, and none of the cipher suites the client offers is turned on here. The message names the TLS version the client asked for, but not the client. An old device or application that only offers legacy suites, or a server whose cipher settings were tightened, is the usual cause, and internet scanners trying old suites produce a steady trickle of it.

**When to ignore:** A steady, low rate on a server reachable from the internet, with no user or device reporting a failed connection, is usually scanning.

**What to check:**

- Identify the clients still offering obsolete suites before the remaining legacy suites are withdrawn.
- Match the event times with the service's connection logs (IIS logs, firewall logs) to find the client address.
- Compare this machine's enabled suites (`Get-TlsCipherSuite`) with what the client supports, and update the client before turning legacy suites back on.

**Related:**

- `kerberos_etype_unsupported`: the same legacy-cryptography problem inside Kerberos

**Example:** An old barcode scanner offers only obsolete cipher suites to a server's TLS 1.2 endpoint, and the handshake fails.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tls_cipher_mismatch, https://sparklogs.com/reference/reasons/tls_cipher_mismatch.json

## `tls_client_credential_failed`: tls client credential failed

Windows could not create a TLS client credential for a program, so that program's outbound TLS connection could not start.

**Severity:** Error (server) / Warning (workstation)

**Why it matters:** The program that asked for the credential cannot make the TLS connections that need it, so whatever integration it serves stops working; other programs' connections are unaffected.

**In practice:** Schannel, the Windows TLS component, logs event 36871 in the System log, "A fatal error occurred while creating a TLS client credential", with an internal error state number. It is logged on the machine making the connection, and it repeats each time the program tries. On a server the program is usually a service other machines rely on, so it shows as Error; on a workstation, as Warning.

**What to check:**

- Find which program or service fails to connect at the same times, from its own logs.
- If it uses a client certificate, check that the certificate is in the expected store, is valid, and that its private key is readable by the calling account.
- Check for a recent change to this machine's TLS protocol or cipher settings.

**Related:**

- `cert_enroll_failed`: a certificate that never arrived, as opposed to one that cannot be used
- `tls_server_credential_failed`: the same class of failure on the credential this host serves with

**Example:** A service on a server fails to build its TLS client credential each time it tries to reach a partner system.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tls_client_credential_failed, https://sparklogs.com/reference/reasons/tls_client_credential_failed.json

## `tls_server_credential_failed`: tls server credential failed

The private key behind this host's TLS server certificate could not be accessed.

**Severity:** Error

**Why it matters:** Clients cannot negotiate TLS with the endpoint that uses that certificate until the key or its permissions are repaired.

**In practice:** Schannel, the Windows TLS component, logs event 36870 in the System log, "A fatal error occurred when attempting to access the TLS server credential private key", with the error code from the cryptographic module. A service on this machine, such as IIS, Remote Desktop or LDAPS on a domain controller, has a certificate but cannot use its private key. Permissions on the key that the service's account cannot read, a certificate imported without its private key, or a key container damaged during a renewal are the usual causes. Every client of that endpoint fails, not only one.

**What to check:**

- Find the certificate the affected service is bound to: IIS bindings, `netsh http show sslcert`, or the Remote Desktop certificate.
- In certlm.msc, check the certificate shows a private key, and use Manage Private Keys to confirm the service's account can read it.
- If the key is missing or damaged, re-import the certificate with its private key or reissue it.

**Related:**

- `http_ssl_config_failed`: the HTTP service could not apply a certificate binding
- `tls_client_credential_failed`: the same class of failure on an outbound client credential

**Example:** After a certificate renewal, a server's web service cannot read the new certificate's private key, and HTTPS clients fail to connect.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tls_server_credential_failed, https://sparklogs.com/reference/reasons/tls_server_credential_failed.json

## `tpm_attestation_check_failed`: tpm attestation check failed

A TPM health check Windows runs before device attestation failed.

**Severity:** Notice

**Why it matters:** Device health attestation, and the Intune compliance or conditional access that rely on it, can fail on this device.

**In practice:** TPM-WMI writes event 1041 in the System log with the results of its pre-attestation checks. A failed Required check, most often EkCertIsAvailable (the TPM has no endorsement key certificate), means the device cannot pass attestation. It is common on virtual machines and some older TPMs. A failed Expected check, usually PcrsMatchTcgLog, means the TPM values do not match the boot log, so attestation may fail for this boot. The other checks in the event, such as Secured-core and VSM, are often false on healthy devices and are not counted here.

**When to ignore:** On a virtual machine or device that is not enrolled in a service that uses device health attestation.

**What to check:**

- For EkCertIsAvailable, check that the TPM firmware is current. On a virtual machine, check whether the host provides an endorsement key certificate.
- For PcrsMatchTcgLog, restart the device and check whether the next 1041 passes.
- Run `Get-Tpm` to confirm the TPM is ready.

**Related:**

- `tpm_attestation_failed`: the error Windows logs beside a failed Required check
- `tpm_hardware_failed`: a TPM hardware failure, which also fails attestation

**Example:** A virtual machine's TPM has no endorsement key certificate, so its health status is Cannot be attested.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_attestation_check_failed, https://sparklogs.com/reference/reasons/tpm_attestation_check_failed.json

## `tpm_attestation_failed`: tpm attestation failed

The TPM could not attest to a critical component of this machine.

**Severity:** Error

**Why it matters:** Checks that rely on the TPM's measurement of the boot, such as device health attestation used by compliance and conditional access, can mark the machine as unhealthy until the TPM or firmware state is corrected.

**In practice:** Windows writes event 1040 in the System log under the Microsoft-Windows-TPM-WMI provider, "Pre-attestation health checks confirm a critical component has failed, and the device is not expected to pass attestation." The message names the file that lists each check and its result. The TPM records measurements of the firmware and boot components, and attestation proves those measurements to another party. Other TPM-WMI events, such as provisioning and Secure Boot update messages, are not counted here.

**What to check:**

- Open tpm.msc, or run `Get-Tpm`, to check the TPM is present, ready and owned.
- Check for a recent firmware, BIOS or TPM firmware update, and the vendor's notes for it.
- Check Secure Boot state (`Confirm-SecureBootUEFI`) and the device's compliance status in the management console.

**Related:**

- `secure_boot_cert_update_pending`: a Secure Boot certificate update waiting to be applied, from the same provider

**Example:** After a BIOS update, a laptop reports that TPM attestation of a critical component failed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_attestation_failed, https://sparklogs.com/reference/reasons/tpm_attestation_failed.json

## `tpm_authorization_refused`: tpm authorization refused

The TPM refused the authorization, policy or PCR check a command presented, or is in lockout.

**Severity:** Notice for a refused authorization or policy on one command. Warning when the TPM is in lockout and refuses every authorization.

**Why it matters:** The refused operation did not happen: a key did not unseal, or a PIN check failed. In lockout, Windows Hello PIN sign-in and TPM-protected unlocks fail until the lockout clears.

**In practice:** The TPM logs event 17 in the System log for every command it refuses. TPM2_RC_AUTH_FAIL and TPM2_RC_BAD_AUTH mean the authorization value was wrong, often a mistyped PIN, and each failure counts toward the TPM's dictionary-attack lockout. TPM2_RC_POLICY_FAIL and TPM2_RC_PCR_CHANGED mean a policy did not match, often because the boot measurements changed since the key was sealed. TPM2_RC_LOCKOUT means too many failures have locked the TPM. The session or parameter position says which authorization the TPM refused. The common row, TPM2_CC_Unseal refused with TPM2_RC_AUTH_FAIL at session 1, is a wrong value presented to unseal a key.

**When to ignore:** An occasional Notice row on a device with no sign-in or BitLocker complaint.

**What to check:**

- Check whether the user reports a Windows Hello PIN or BitLocker unlock problem at the same time.
- For TPM2_RC_LOCKOUT, run `Get-Tpm` and check LockedOut. Wait for the lockout to clear or reset it with `Unblock-Tpm` or the TPM management console (tpm.msc).
- For TPM2_RC_AUTH_FAIL or TPM2_RC_BAD_AUTH, check whether the user mistyped a PIN, and run `Get-Tpm` to compare LockoutCount with LockoutMax.
- For TPM2_RC_POLICY_FAIL or TPM2_RC_PCR_CHANGED, compare the device's boot measurements before and after (BitLocker-Driver event 24709).

**Related:**

- `tpm_capability_probe_declined`: routine refusals of an unsupported value or a missing handle, which need no action
- `tpm_command_failed`: a TPM command that failed in the driver, in TPM failure mode, or with a response that is not a known routine refusal

**Example:** Windows asks the TPM to unseal a key, and the TPM answers TPM2_RC_AUTH_FAIL for session 1.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_authorization_refused, https://sparklogs.com/reference/reasons/tpm_authorization_refused.json

## `tpm_boot_pcr_values_recorded`: tpm boot pcr values recorded

The TPM measurements of a boot that reached Windows: one value per PCR, and one fingerprint over all of them.

**Severity:** Info

**Why it matters:** None by itself. It is the record to compare when a device asks for its BitLocker recovery key: the PCR whose value changed between two boots points at what changed in the boot path.

**In practice:** The BitLocker driver logs event 24709 in the System log after every boot that reaches Windows, with the final values of the PCRs BitLocker can bind to. SparkLogs lists each PCR with its value and, on a UEFI device, what it measures: PCR 0 the firmware code, PCR 2 option ROM and other pluggable firmware code, PCR 4 the boot manager, PCR 5 the partition table, PCR 7 the Secure Boot state and keys, PCR 11 BitLocker access control. The fingerprint is the same on every boot of a device whose boot path did not change. A boot that stopped at the BitLocker recovery screen did not reach Windows and writes no event. It shows only through the next boot's values. A PCR 7 change points at Secure Boot policy or key updates, PCR 0 and 2 at firmware or option ROMs, PCR 4 at the boot manager.

**When to ignore:** Safe to pass over unless you are explaining a BitLocker recovery prompt or a TPM-related BitLocker failure on this device.

**What to check:**

- To explain a recovery prompt, compare the fingerprint of the last boot before the prompt with the first boot after it. If they differ, compare boot_pcrs to find which PCR changed.
- A PCR 7 change: check for Secure Boot certificate or DBX updates (Microsoft-Windows-TPM-WMI events in the System log, such as 1801) and firmware setting changes.
- A PCR 0 or 2 change: check for a firmware update or a docking station or graphics card with its own option ROM.

**Related:**

- `bitlocker_key_retrieval_code_reported`: the driver's own statement about the restart key retrieval
- `bitlocker_recovery_password_used`: the recovery password that started Windows after a refused unlock
- `bitlocker_tpm_binding_mismatch`: the boot where a PCR no longer matched what BitLocker sealed the key to
- `bitlocker_tpm_unlock_failed`: the TPM refusing the BitLocker key at boot
- `tpm_authorization_refused`: a TPM policy or PCR check refused after the boot measurements changed

**Example:** A laptop boots and logs its PCR 0, 2, 4, 5, 7 and 11 values with Secure Boot on.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_boot_pcr_values_recorded, https://sparklogs.com/reference/reasons/tpm_boot_pcr_values_recorded.json

## `tpm_capability_probe_declined`: tpm capability probe declined

Windows asked the TPM whether it supports a value, algorithm or handle, and the TPM said no.

**Severity:** Debug

**Why it matters:** None. These records are common on healthy devices and are not evidence of a TPM, BitLocker or Windows Hello fault.

**In practice:** The TPM logs event 17 in the System log, "The Trusted Platform Module (TPM) hardware failed to execute a TPM command.", for every command the TPM refuses. Windows and its components learn what a TPM supports by asking: TPM2_CC_TestParms checks a set of parameters, TPM2_CC_ECC_Parameters a curve, TPM2_CC_ReadPublic whether a key handle exists. A refusal with TPM2_RC_VALUE, TPM2_RC_CURVE, TPM2_RC_HASH or TPM2_RC_HANDLE is the answer "not supported" or "not there", and Windows moves on. A device can log hundreds of these without anything being wrong.

**When to ignore:** Always, on its own. Look elsewhere when the device also logs tpm_command_failed or tpm_authorization_refused, or BitLocker or Windows Hello errors.

**What to check:**

- No action. If a TPM problem is suspected, look for tpm_command_failed on the same device instead.

**Related:**

- `tpm_authorization_refused`: the TPM refusing an authorization or policy for a command
- `tpm_command_failed`: a TPM command that failed in the driver, in TPM failure mode, or with a response that is not a known routine refusal

**Example:** At boot, Windows asks the TPM whether it supports a parameter set and the TPM answers TPM2_RC_VALUE for parameter 1.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_capability_probe_declined, https://sparklogs.com/reference/reasons/tpm_capability_probe_declined.json

## `tpm_command_failed`: tpm command failed

A TPM command failed in the Windows TPM driver, the TPM is in failure mode, or the TPM refused it with a response that is not a known routine refusal.

**Severity:** Warning or Notice

**Why it matters:** When the driver or the TPM itself is failing, features that need the TPM fail too: BitLocker TPM unlock, Windows Hello, device attestation and Intune compliance checks.

**In practice:** The TPM logs event 17 in the System log for every command that does not succeed. When the response field holds a Windows status such as STATUS_DEVICE_PROTOCOL_ERROR (0xC0000186), the command got no answer from the TPM. A device that logs these for many different commands, over and over, has a TPM, firmware or driver that is not responding correctly. TPM2_RC_FAILURE means the TPM itself has stopped and answers only status commands until restart. The rest are responses outside the routine probe, retry and authorization groups. The command and response names on the line say what was refused.

**When to ignore:** A rare Notice row on a device whose BitLocker and Windows Hello work.

**What to check:**

- For a driver status, run `Get-Tpm` and check TpmReady. Update the TPM firmware and the chipset or platform driver from the device maker.
- For TPM2_RC_FAILURE, restart the device. If it returns, update the TPM firmware or replace the board.
- Check whether BitLocker, Windows Hello or Intune compliance report errors on the same device.

**Related:**

- `tpm_authorization_refused`: the TPM refusing an authorization or policy for a command
- `tpm_capability_probe_declined`: routine refusals of an unsupported value or a missing handle, which need no action
- `tpm_initialization_failed`: the TPM failing to initialize at boot

**Example:** The TPM driver reports STATUS_DEVICE_PROTOCOL_ERROR for TPM2_CC_StartAuthSession, many times an hour on one device.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_command_failed, https://sparklogs.com/reference/reasons/tpm_command_failed.json

## `tpm_command_retry_requested`: tpm command retry requested

The TPM was busy or short of working memory and asked Windows to retry the command.

**Severity:** Verbose

**Why it matters:** None on its own. Windows retries the command.

**In practice:** The TPM logs event 17 in the System log for every command it does not complete, including the ones it answers with a warning. TPM2_RC_RETRY, TPM2_RC_YIELDED, TPM2_RC_TESTING and TPM2_RC_CANCELED mean the TPM was busy or self-testing. TPM2_RC_NV_RATE means it is limiting writes to its own memory. The memory and handle warnings mean Windows has to free an object or session before trying again.

**When to ignore:** When it appears now and then. A device logging these continuously alongside TPM errors in BitLocker or Windows Hello is worth a look.

**What to check:**

- No action for occasional rows.

**Related:**

- `tpm_command_failed`: a TPM command that failed in the driver, in TPM failure mode, or with a response that is not a known routine refusal

**Example:** The TPM answers TPM2_RC_RETRY to a command while it finishes another one.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_command_retry_requested, https://sparklogs.com/reference/reasons/tpm_command_retry_requested.json

## `tpm_counter_reset_on_resume`: tpm counter reset on resume

The TPM was reset while the device was asleep or hibernating, so its reset counter moved.

**Severity:** Verbose

**Why it matters:** None on its own. TPM services keep working after the resume.

**In practice:** The TPM driver writes event 30 in the System log, "Reset and/or resume count do not match expected values after hibernate/resume.", with the counters before and after. A reset count one higher after the resume means the firmware reset the TPM during the sleep, which many devices do.

**When to ignore:** Always, unless the same device also logs tpm_hardware_failed or tpm_command_failed.

**What to check:**

- No action. Look at tpm_hardware_failed or tpm_command_failed on the same device if a TPM fault is suspected.

**Related:**

- `tpm_hardware_failed`: a TPM hardware failure, which this is not

**Example:** After the laptop resumes from hibernate, the TPM reset counter has gone from 535 to 536.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_counter_reset_on_resume, https://sparklogs.com/reference/reasons/tpm_counter_reset_on_resume.json

## `tpm_hardware_failed`: tpm hardware failed

The Windows TPM driver found a non-recoverable error in the TPM hardware and stopped TPM services.

**Severity:** Error

**Why it matters:** BitLocker cannot use the TPM, so the next restart may stop at the recovery screen. Windows Hello, device attestation and Intune compliance checks that need the TPM fail.

**In practice:** The TPM driver writes event 15 in the System log when the TPM stops answering correctly. A device that logs it usually also logs many tpm_command_failed records with a driver status such as STATUS_DEVICE_PROTOCOL_ERROR. The cause is the TPM chip, its firmware, or the platform driver that talks to it.

**When to ignore:** Not on its own. A single record that a restart and a firmware update cleared needs no further action.

**What to check:**

- Run `Get-Tpm` and check TpmPresent and TpmReady.
- Install the TPM firmware and chipset driver update from the device maker.
- Back up the BitLocker recovery password before clearing or replacing the TPM.
- If it returns after a firmware update, have the device maker replace the board.

**Related:**

- `bitlocker_tpm_unlock_failed`: the TPM refusing the BitLocker key at boot
- `tpm_attestation_failed`: device attestation failing because the TPM is not usable
- `tpm_command_failed`: the TPM commands that failed in the driver on the same device

**Example:** The TPM driver reports STATUS_DEVICE_PROTOCOL_ERROR and stops TPM services on a laptop.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#tpm_hardware_failed, https://sparklogs.com/reference/reasons/tpm_hardware_failed.json

## `unexpected_shutdown`: unexpected shutdown

The previous shutdown was not clean: the host stopped without shutting down and came back on the next start.

**Severity:** Serious or Error on a server or an unknown host class, depending on which record reports it and what level that record carried; Warning on a workstation.

**Why it matters:** Work that was open and not saved is lost, services stopped without warning, and disks or databases may need recovery.

**In practice:** Windows writes two records at the next boot after a stop that was not a clean shutdown, both in the System log. EventLog event 6008 reads "The previous system shutdown at <time> was unexpected"; SparkLogs dates the row at that loss time when the record carries it, and keeps the time the record was written as `recorded_at`. Kernel-Power event 41 reads "The system has rebooted without cleanly shutting down first" and is dated at the next boot. When event 41 carries a nonzero bugcheck code, a blue screen ended the session; a zero code leaves the cause open, such as a power loss, a hard reset, a hang or a held power button. A nonzero PowerButtonTimestamp in event 41's data means the power button was held down. On a workstation, a held power button or a dead battery is common, so it shows as Warning.

**When to ignore:** A workstation where the user held the power button or the battery ran flat, with no blue screen and no repeat.

**What to check:**

- Read bugcheck_code and bugcheck_name when present, and look for the os_bsod row from the same boot.
- With no bugcheck, check power: UPS and PDU logs, a loose power lead, a flat laptop battery, or overheating.
- Ask whether someone held the power button on a frozen machine, and look at what froze it.
- Count crashes from kernel_crash; one stop can show here as both a 6008 and a 41 row.

**Related:**

- `kernel_crash`: one row per kernel crash, whichever records report it; count crashes from it, not from these rows
- `os_boot`: the boot that ends the gap this stop opened
- `os_bsod`: the crash that caused some of these, which is a different fact

**Example:** A server comes back after a power cut and records that its previous shutdown was unexpected.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#unexpected_shutdown, https://sparklogs.com/reference/reasons/unexpected_shutdown.json

## `vpn_connected`: vpn connected

A remote-access connection was established.

**Severity:** Notice

**Why it matters:** The record shows who connected from outside, when, and through which VPN or dial-up profile.

**In practice:** The Remote Access Connection Manager (RasMan) logs event 20267 in the System log when a user connects a VPN or dial-up profile built into Windows: "The user <user> successfully established a connection to <profile> using the device <device>." It names the user who connected; the client-side copy of the same connection is written under the SYSTEM account. Third-party VPN clients that do not use the Windows connection manager do not write it.

**When to ignore:** Expected users connecting through the company's VPN profile during their working hours.

**What to check:**

- Read the profile name and the user from the message.
- Read it beside the failures on the same host to tell a retry from a broken tunnel.

**Related:**

- `vpn_dial_failed`: a dial attempt that did not connect, which this is the counterpart to

**Example:** A user connects to the office VPN profile from home.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#vpn_connected, https://sparklogs.com/reference/reasons/vpn_connected.json

## `vss_shadow_aborted`: vss shadow aborted

A volume shadow-copy operation failed or its shadow storage could not grow.

**Severity:** Error or Warning

**Why it matters:** The snapshot a backup or restore point was using is gone or was never made, so that run may have nothing to restore from; when storage could not grow, existing copies are at risk.

**In practice:** The Volume Shadow Copy driver (Volsnap) writes these in the System log, with the volume and the cause in the message. Event 36 means the shadow copies were aborted because shadow storage hit its configured size limit; the same limit is hit every cycle until it is raised. Events 1, 5, 14, 15, 16, 20, 23, 27, 28, 29, 32, 35 and 67 mean the copies were aborted or never created because an operation failed, such as an IO error, a storage volume that was dismounted or missing, paged heap exhausted, or too little free space. Events 13 and 24 mean shadow storage could not grow and existing copies are at risk, but nothing was deleted yet, so they show as Warning. Routine removal of the oldest copy to stay within the space or count limit is a separate, informational event.

**When to ignore:** A single abort the backup product retried successfully, with the next snapshot of the volume completing.

**What to check:**

- Confirm from the backup product whether the job retried or fell back, then review the shadow storage size against how much the volume changes between snapshots.
- Run `vssadmin list shadowstorage` to see the used, allocated and maximum size for the volume, and raise the maximum with `vssadmin resize shadowstorage` if it is too small.
- For IO or missing-volume causes, check the disk events on the same volume and whether shadow storage sits on a removable or failing disk.
- Check whether two backup products snapshot the same volume at the same time.

**Related:**

- `vss_snapshots_failing_for_space`: existing shadow copies were deleted, a completed loss of restore points
- `vss_writer_failed`: an application's VSS writer failed, which often happens beside a backup that still succeeds

**Example:** A file server's nightly backup snapshot is aborted because the volume's shadow storage reached its size limit.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#vss_shadow_aborted, https://sparklogs.com/reference/reasons/vss_shadow_aborted.json

## `vss_snapshots_failing_for_space`: vss snapshots failing for space

Volume shadow copies were deleted because shadow storage could not grow.

**Also reported by:** `win.eventlog.application`, `vss-shadowstorage`

**Severity:** Error

**Why it matters:** Restore points, Previous Versions and backup sources that relied on those copies are gone for the volume, and the loss shows up only when someone tries to restore.

**In practice:** The Volume Shadow Copy driver (Volsnap) logs event 25 in the System log when it deletes the shadow copies of a volume because shadow storage could not grow in time. The copies existed and are now gone. Heavy write activity on the volume while a snapshot exists, shadow storage that is too small for how much the volume changes, or a storage area on a slow or busy disk are the usual causes. Routine removal of the oldest copy to stay within the space or count limit is a separate, informational event.

**What to check:**

- Check the backup job outcomes around the event time, then raise the shadow storage limit for the volume or reduce what it has to hold.
- Run `vssadmin list shadowstorage` and `vssadmin list shadows` to see the limit and which copies remain.
- Look for heavy writes at the same time, such as defragmentation, a large copy or a database maintenance job, and move them away from snapshot windows.

**Related:**

- `vss_shadow_aborted`: a snapshot was aborted or never made, or storage could not grow without deleting copies yet

**Example:** A busy file server's shadow storage cannot grow in time during a large copy, and Windows deletes the volume's shadow copies.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#vss_snapshots_failing_for_space, https://sparklogs.com/reference/reasons/vss_snapshots_failing_for_space.json

## `win_app_error_dialog_shown`: win app error dialog shown

Windows recorded an error dialog that an application or Windows itself showed.

**Severity:** Minor

**Why it matters:** A user or service saw an error message, often meaning a program failed, could not find a file or disk, or is waiting for someone to click OK.

**In practice:** Windows logs event 26 in the System log under the Application Popup provider whenever a system message box is shown, with its title and text: "Application popup: <title> : <text>". Typical titles are a program's own error, "System Error" or "No Disk". The text names the program or file involved, and is the main clue. Out of Virtual Memory and Virtual Memory Minimum Too Low popups are counted as their own reasons.

**When to ignore:** A one-off popup from a program the user closed and reopened without further trouble.

**What to check:**

- Read the popup title and text in the message for the program and file it names.
- Look in the Application log for Application Error or Application Hang events from the same program at the same time.
- Group by the popup text: one popup repeating on many machines points at a shared program or update.

**Related:**

- `pagefile_extended`: the Virtual Memory Minimum Too Low popup, Windows growing the page file
- `ram_commit_exhausted`: the Out of Virtual Memory popup, counted with the other low-memory records

**Example:** An application shows a dialog saying it has timed out and should be restarted.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#win_app_error_dialog_shown, https://sparklogs.com/reference/reasons/win_app_error_dialog_shown.json

## `winre_servicing_failed`: winre servicing failed

Servicing of the Windows recovery environment failed on this device.

**Severity:** Error

**Why it matters:** The recovery environment stays at its previous state, so Startup Repair and reset tools on this device lack the update's fixes, and updates that service it can keep failing.

**In practice:** The WinRE agent logs event 4502 in the System log under the Microsoft-Windows-WinREAgent provider, "Failed to service the Windows Recovery Environment image", with an HRESULT error code. An update was trying to apply new files to the recovery image and could not. A recovery partition with too little free space for the new image is a common cause. Events 4500 and 4501 from the same provider are routine progress records.

**What to check:**

- Run `reagentc /info` to check the recovery environment is enabled and find its partition.
- Check free space on the recovery partition.
- Check whether later update attempts on this device fail the same way.

**Related:**

- `patch_install_failed`: Update installs can keep failing while recovery servicing is broken

**Example:** A Windows update fails to service the recovery environment image on a laptop with HRESULT 0x80070490.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#winre_servicing_failed, https://sparklogs.com/reference/reasons/winre_servicing_failed.json

## `wlan_limited_connectivity`: wlan limited connectivity

Wireless networking entered limited connectivity.

**Severity:** Warning

**Why it matters:** The user is connected to Wi-Fi but cannot reach the network or internet properly, so pages fail to load and calls or remote sessions drop until it recovers.

**In practice:** WLAN AutoConfig logs event 4003 in the System log, "WLAN AutoConfig detected limited connectivity, attempting automatic recovery." The wireless adapter is associated with an access point, but traffic is not getting through, and Windows tries to recover the link on its own. Weak signal or interference, a crowded access point, a DHCP or DNS problem behind the access point, or a wireless driver fault are the usual causes.

**When to ignore:** A single occurrence on a laptop moving between access points, with no later failures.

**What to check:**

- Look for recurrence on the same adapter or SSID.
- Correlate with DNS timeouts and DHCP renewal failures.
- Run `netsh wlan show interfaces` for signal strength and the access point, and check the WLAN-AutoConfig Operational log for disconnect reasons.
- Update the wireless driver if it repeats on one model of laptop.

**Related:**

- `dns_client_resolution_timed_out`: name lookups timed out, which often happens at the same time
- `nic_link_down`: a network adapter lost its link entirely

**Example:** A laptop on a busy office access point detects limited connectivity and Windows tries to recover the link.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-system#wlan_limited_connectivity, https://sparklogs.com/reference/reasons/wlan_limited_connectivity.json
