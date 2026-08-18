<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.system`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `app_popup_error` | `app_stability` | Minor |
| `bugcheck` | `os_stability` | Serious (server or unknown) / Error (workstation) |
| `cluster_csv_unavailable` | `clustering` | Severe |
| `cluster_node_removed` | `clustering` | Serious |
| `cluster_quorum_loss` | `clustering` | Severe |
| `cluster_resource_failed` | `clustering` | Serious |
| `cluster_resource_hang` | `clustering` | Serious |
| `cluster_rhs_crash` | `clustering` | Serious |
| `cluster_service_down` | `clustering` | Severe |
| `dcom_activation_timeout` | `app_stability` | Minor |
| `dcom_register_timeout` | `app_stability` | Minor |
| `dcom_start_error` | `app_stability` | Minor |
| `dirty_shutdown` | `os_stability` | Error (server or unknown) / Warning (workstation) |
| `disk_controller_error` | `storage` | Error |
| `disk_corruption` | `storage` | Critical |
| `disk_io_retried` | `storage` | Warning |
| `disk_paging_error` | `storage` | Warning |
| `disk_surprise_removal` | `storage` | Warning |
| `driver_load_failed` | `hardware` | Warning |
| `ephemeral_port_alloc_failed` | `networking` | Notice |
| `gpu_driver_reset` | `hardware` | Notice |
| `hardware_error_corrected` | `hardware` | Notice |
| `hardware_error_uncorrected` | `hardware` | Error |
| `iis_apppool_disabled` | `web` | Serious (server or unknown) / Warning (workstation) |
| `iis_apppool_failure` | `web` | Error or Warning |
| `iis_worker_crash` | `web` | Warning |
| `kerberos_cert_domain_unresolved` | `auth` | Info (capped) |
| `ntfs_corruption` | `storage` | Critical (corruption discovered) / Error (repair activity) |
| `patch_install_failed` | `patching` | Notice |
| `secure_boot_cert_update_pending` | `hardware` | Warning |
| `service_crashed` | `app_stability` | Error |
| `service_exited_error` | `app_stability` | Error |
| `service_hang` | `app_stability` | Error |
| `service_installed` | `security_audit` | Notice |
| `service_start_failed` | `app_stability` | Error |
| `service_start_timeout` | `app_stability` | Error |
| `storage_controller_reset` | `storage` | Error |
| `time_sync_failed` | `time_sync` | Warning |
| `tls_cert_name_mismatch` | `certificates` | Error |
| `tpm_attestation_failed` | `security_audit` | Error |
| `unexpected_shutdown` | `os_stability` | Serious (server or unknown) / Warning (workstation) |
| `vss_shadow_aborted` | `backup` | Error |
| `vss_shadow_lost` | `backup` | Error |
| `vswitch_config_restore_failed` | `virtualization` | Error or Warning (server or unknown) / Info (workstation) |
| `winre_servicing_failed` | `patching` | Error |
| `wlan_limited_connectivity` | `networking` | Warning |

## `app_popup_error`

An application error popup was recorded.

**Severity:** Minor

**Impact:** A foreground or service application may have failed and required user or operator attention.

**Consider:**

- Read the popup text in the raw message.
- Look for nearby application crash records.

## `bugcheck`

Windows rebooted from a bugcheck.

**Severity:** Serious (server or unknown) / Error (workstation)

**Impact:** The host crashed and rebooted; the dump may be needed for driver, hardware, or kernel analysis.

**Consider:**

- Preserve the dump path and bugcheck code.
- Correlate with Kernel-Power 41 and EventLog 6008.

## `cluster_csv_unavailable`

A Cluster Shared Volume became unavailable or paused.

**Severity:** Severe

**Impact:** Clustered workloads using the CSV may lose storage access or degrade until the volume recovers.

**Consider:**

- Identify the CSV and owning node.
- Check storage, network, and redirected-access state.

## `cluster_node_removed`

A failover cluster node was removed from active membership.

**Severity:** Serious

**Impact:** Cluster capacity or availability may be reduced, and workloads may fail over or become degraded.

**Consider:**

- Identify the node and reason in the event body.
- Check network, heartbeat, and quorum events around the removal.

## `cluster_quorum_loss`

The failover cluster lost quorum or its quorum resource.

**Severity:** Severe

**Impact:** The cluster may stop services or be unable to make safe failover decisions.

**Consider:**

- Review quorum configuration, including the quorum resource.
- Check node and network reachability.

## `cluster_resource_failed`

A failover cluster resource failed.

**Severity:** Serious

**Impact:** A clustered workload or dependency may be offline, failed over, or degraded.

**Consider:**

- Identify the resource and group.
- Check whether the resource recovered or failed over.

## `cluster_resource_hang`

A clustered resource became unresponsive and was terminated.

**Severity:** Serious

**Impact:** The workload can become unavailable or fail over while the cluster recovers the resource.

**Consider:**

- Identify the resource and owning node.
- Check whether termination was followed by successful restart or failover.

## `cluster_rhs_crash`

The cluster Resource Hosting Subsystem crashed.

**Severity:** Serious

**Impact:** Cluster resource monitoring or hosting may be disrupted, causing dependent resources to fail or restart.

**Consider:**

- Check resource DLLs and the resource hosted by RHS.
- Look for paired resource failure events.

## `cluster_service_down`

The cluster service stopped or was forced down.

**Severity:** Severe

**Impact:** Cluster coordination may be unavailable, risking workload outage or preventing failover.

**Consider:**

- Check quorum state and node membership.
- Correlate with node removal and quorum-loss events.

## `dcom_activation_timeout`

DCOM activation timed out.

**Severity:** Minor

**Impact:** The requested COM application may be unavailable or stuck during activation.

**Consider:**

- Resolve the CLSID/AppID where present.
- Correlate with service control and application errors.

## `dcom_register_timeout`

A DCOM server did not register in time.

**Severity:** Minor

**Impact:** The COM server or application may be hung, unavailable, or too slow to start.

**Consider:**

- Use the CLSID to identify the application.
- Check adjacent service start or application error events.

## `dcom_start_error`

DCOM failed while starting an application or service.

**Severity:** Minor

**Impact:** The COM-backed application may fail to launch or serve dependent callers.

**Consider:**

- Identify the named service or server from the event body.
- Check SCM errors for the same service.

## `dirty_shutdown`

The host restarted after an unclean shutdown.

**Severity:** Error (server or unknown) / Warning (workstation)

**Impact:** Unclean shutdown can interrupt workloads, lose in-memory state, and leave storage or applications needing recovery.

**Consider:**

- Correlate with bugcheck and unexpected_shutdown in the same boot gap.
- Inspect BugcheckCode when present.

## `disk_controller_error`

A disk controller error was reported for a storage device.

**Severity:** Error

**Impact:** Repeated controller errors can precede disk, cabling, controller, or removable-media failure.

**Consider:**

- Check whether the device path maps to a fixed disk or removable media.
- Correlate with disk_io_retried, disk_paging_error, and NTFS corruption on the same device.

## `disk_corruption`

The disk provider reported file-system corruption.

**Severity:** Critical

**Impact:** Data integrity is at risk; repair may require chkdsk, restore, or storage replacement work.

**Consider:**

- Prioritize volume identification and recent backup state.
- Correlate with ntfs_corruption and unexpected shutdown records.

## `disk_io_retried`

A disk IO operation had to be retried.

**Severity:** Warning

**Impact:** Retries can add latency and may indicate a degrading disk, cable, controller, or transient removable-device issue.

**Consider:**

- Check recurrence per device.
- Correlate with paging errors or controller resets.

## `disk_paging_error`

Windows reported a disk error during a paging operation.

**Severity:** Warning

**Impact:** The affected device may be slow, unstable, or disconnecting under IO pressure.

**Consider:**

- Pivot on the device path in the raw event message.
- Look for adjacent controller reset or retry events.

## `disk_surprise_removal`

A disk disappeared without an orderly removal path.

**Severity:** Warning

**Impact:** Unexpected removal can interrupt IO and may corrupt open files or workloads using the device.

**Consider:**

- Identify whether the device is USB, virtual, or fixed storage.
- Check adjacent service or backup failures that used the disk.

## `driver_load_failed`

A device driver failed to load.

**Severity:** Warning

**Impact:** The device may be unavailable, degraded, or missing expected driver functionality.

**Consider:**

- Review driver_name, device_instance, and ntstatus.
- Check Device Manager or driver updates for the same device instance.

## `ephemeral_port_alloc_failed`

A local port could not be allocated from the ephemeral port range.

**Severity:** Notice

**Impact:** One outbound connection attempt failed at that moment. A sustained rate means the device runs out of local ports, which breaks new connections across every application on the host.

**Consider:**

- Check the rate over time rather than the single event.
- Look for an application leaking sockets, or a port range narrowed by configuration.

A single occurrence is common and self-correcting. The actionable form is a sustained rate on one device.

## `gpu_driver_reset`

The NVIDIA display driver reset.

**Severity:** Notice

**Impact:** GPU resets can interrupt interactive sessions, remote desktop, rendering, or GPU-backed workloads.

**Consider:**

- Check display driver version and recent GPU load.
- Correlate with application hangs or desktop session resets.
- Check for an adjacent driver install: an upgrade resets the display stack and is expected.
- Repetition WITHOUT a driver install is the real signal; a single reset usually is not.

## `hardware_error_corrected`

Windows Hardware Error Architecture reported a CORRECTED hardware error.

**Severity:** Notice

**Impact:** No consequence yet: the hardware caught the fault. Recurrence is early warning for marginal hardware (memory, PCIe links).

**Consider:**

- Track recurrence by error_source and device_instance.
- A burst after a driver or firmware change points at the change, not the silicon.

## `hardware_error_uncorrected`

Windows Hardware Error Architecture reported an UNCORRECTED hardware error.

**Severity:** Error

**Impact:** The fault was not contained: data loss, corruption, or a crash may follow. Treat as a hardware incident, not a log curiosity.

**Consider:**

- Track recurrence by error_source and device_instance.
- Correlate with subsequent bugchecks or disk errors on the same host.

## `iis_apppool_disabled`

An IIS application pool was disabled by rapid-fail protection.

**Severity:** Serious (server or unknown) / Warning (workstation)

**Impact:** The application pool can return 503 responses until an operator fixes and re-enables it.

**Consider:**

- Identify the application pool.
- Check preceding worker crashes or startup failures.

## `iis_apppool_failure`

IIS reported an application pool worker, configuration, or mapping failure.

**Severity:** Error or Warning

**Impact:** The affected web application may fail to start, serve requests, or map correctly.

**Consider:**

- Resolve the exact WAS event id and message.
- Correlate with IIS worker crashes and HTTP 503 reports.

## `iis_worker_crash`

An IIS worker process terminated unexpectedly.

**Severity:** Warning

**Impact:** Requests handled by that worker may fail or reset; repeated crashes can degrade the site or app pool.

**Consider:**

- Identify the application pool and worker process.
- Correlate with Application-channel crash events.

## `kerberos_cert_domain_unresolved`

Kerberos could not resolve the domain named in a certificate offered for sign-in.

**Severity:** Info (capped)

**Impact:** On a domain-joined device, certificate or smart-card sign-in for that domain does not complete. On a cloud-joined or standalone device the same message is routine and expected.

**Consider:**

- Confirm whether the device is joined to the domain named in the certificate.
- On domain-joined devices, check domain controller reachability and DNS from this host.

The same code path serves physical smart cards, virtual smart cards and Windows Hello for Business, so the message is not evidence that a physical card is in use.

## `ntfs_corruption`

NTFS reported volume corruption or corruption-family repair activity.

**Severity:** Critical (corruption discovered) / Error (repair activity)

**Impact:** Volume integrity is at risk; applications and files on that volume may be affected until repair is complete.

**Consider:**

- Identify the volume from structured fields or message text.
- Check whether chkdsk or storage diagnostics completed after the event.

## `patch_install_failed`

Windows Update failed to install an update on this device.

**Severity:** Notice

**Impact:** The device stays on the previous version of that update until a later attempt succeeds; repeated failures on the same update mean the device is falling behind on patching.

**Consider:**

- Check whether a later attempt at the same update succeeded.
- Group by the update title or result code across the fleet to separate a bad update from a device problem.

A single failure is common and usually self-correcting. Recurrence across cycles is the actionable pattern.

## `secure_boot_cert_update_pending`

A Secure Boot certificate update has not been applied on this device.

**Severity:** Warning

**Impact:** Boot trust material stays stale, which can block future firmware or OS updates and leave the device on superseded Secure Boot certificates.

**Consider:**

- Check pending firmware and servicing updates on the device.
- Confirm Secure Boot state after the next update cycle.

## `service_crashed`

A Windows service crashed or terminated unexpectedly.

**Severity:** Error

**Impact:** The service may be unavailable, degraded, or flapping until it restarts cleanly.

**Consider:**

- Group by service_name and crash_count.
- Look for vendor service names that point to backup, RMM, security, or line-of-business software.

## `service_exited_error`

A Windows service exited with an error.

**Severity:** Error

**Impact:** The affected service may not be delivering its role until the underlying service error is fixed.

**Consider:**

- Record the service-specific error code or message.
- Check whether a later start succeeded.

## `service_hang`

A Windows service stopped responding to a control transaction.

**Severity:** Error

**Impact:** A hung service can block dependent work or delay shutdown, startup, or control operations.

**Consider:**

- Identify the named service and transaction timeout.
- Check for adjacent service crashes or resource pressure.

## `service_installed`

A Windows service was installed.

**Severity:** Notice

**Impact:** Unexpected service creation can establish persistence or run code under a privileged account.

**Consider:**

- Review ServiceName, ImagePath, StartType, ServiceType, and AccountName.
- Compare with approved software install windows.

## `service_start_failed`

A Windows service failed to start.

**Severity:** Error

**Impact:** The service is unavailable until startup succeeds or its dependency error is fixed.

**Consider:**

- Review the service error and dependencies.
- Check for paired timeout or account logon failures.

## `service_start_timeout`

A Windows service did not connect before the startup timeout.

**Severity:** Error

**Impact:** The service may be unavailable or too slow to initialize under current load or dependency state.

**Consider:**

- Pair with SCM 7000 or 7011 for the same service.
- Check whether timeout policy, dependencies, or service account issues changed.

## `storage_controller_reset`

The AHCI storage controller reported a reset or timeout condition.

**Severity:** Error

**Impact:** A controller reset can stall storage IO and may indicate a failing device, cable, controller, or driver path.

**Consider:**

- Confirm the exact storahci event id and message on the affected host.
- Correlate with disk retry and paging errors.

## `time_sync_failed`

Windows Time could not reach or resolve its time source.

**Severity:** Warning

**Impact:** Clock skew can break Kerberos, TLS validation, scheduled jobs, and timeline analysis.

**Consider:**

- Check the configured peer and DNS result.
- Correlate with authentication or certificate errors.

## `tls_cert_name_mismatch`

A TLS certificate name did not match the expected server name.

**Severity:** Error

**Impact:** TLS connections may fail or users may be exposed to misconfiguration or impersonation risk.

**Consider:**

- Verify the requested hostname and certificate subject/SAN.
- Check whether the peer is expected for the application.

## `tpm_attestation_failed`

TPM attestation failed for a critical component.

**Severity:** Error

**Impact:** Device trust or security posture checks may fail until TPM or firmware state is corrected.

**Consider:**

- Check TPM health and Secure Boot posture.
- Correlate with firmware or dbx update events.

## `unexpected_shutdown`

Windows recorded that the previous shutdown was unexpected.

**Severity:** Serious (server or unknown) / Warning (workstation)

**Impact:** The host did not complete a clean shutdown, which can interrupt services and complicate incident timelines.

**Consider:**

- Use as the third leg of the 41, 1001, and 6008 crash triangle.
- Check the nearest clean shutdown and boot markers.

## `vss_shadow_aborted`

A volume shadow-copy operation was aborted by shadow storage limits.

**Severity:** Error

**Impact:** A backup or restore-point operation may have lost its usable snapshot.

**Consider:**

- Confirm whether the backup job retried or fell back successfully.
- Review shadow storage sizing and churn.

## `vss_shadow_lost`

Volume shadow copies were deleted because shadow storage could not grow.

**Severity:** Error

**Impact:** Restore points or backup recovery sources may be missing for the affected volume.

**Consider:**

- Check backup job outcomes near the event time.
- Review shadow storage limits for the affected volume.

## `vswitch_config_restore_failed`

Hyper-V virtual switch failed to restore port configuration.

**Severity:** Error or Warning (server or unknown) / Info (workstation)

**Impact:** Virtual networking may not restore correctly for a VM, vNIC, WSL switch, or host virtual adapter.

**Consider:**

- Check the virtual switch or port name in the raw event.
- On servers, correlate with VM connectivity complaints.

## `winre_servicing_failed`

Servicing of the Windows recovery environment failed on this device.

**Severity:** Error

**Impact:** The recovery environment stays at its previous state, and updates that depend on servicing it can keep failing; the most common cause is a recovery partition with too little free space.

**Consider:**

- Check free space on the recovery partition.
- Check whether later update attempts on this device fail the same way.

## `wlan_limited_connectivity`

Wireless networking entered limited connectivity.

**Severity:** Warning

**Impact:** The host may lose network reachability or degrade user sessions until wireless connectivity recovers.

**Consider:**

- Look for recurrence on the same adapter or SSID.
- Correlate with DNS timeouts and DHCP renewal failures.
