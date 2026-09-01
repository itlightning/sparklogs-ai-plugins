<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.system`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `app_popup_error` | `app_stability` | Minor |
| `av_unsigned_code_blocked` | `endpoint_protection` | Serious |
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
| `disk_bad_block` | `storage` | Serious pin |
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
| `http_ssl_binding_created` | `certificates` | Notice |
| `http_ssl_binding_deleted` | `certificates` | Notice |
| `http_ssl_config_failed` | `certificates` | Error |
| `iis_apppool_disabled` | `web` | Serious (server or unknown) / Warning (workstation) |
| `iis_apppool_failure` | `web` | Error or Warning |
| `iis_worker_crash` | `web` | Warning |
| `kerberos_cert_domain_unresolved` | `auth` | Info (capped) |
| `kerberos_etype_unsupported` | `auth` | Warning |
| `kerberos_pac_verify_failed` | `auth` | Warning |
| `kerberos_smartcard_cert_missing` | `auth` | Warning |
| `kerberos_weak_krbtgt_key` | `auth` | Warning |
| `nic_driver_fault` | `networking` | Error (driver could not load) / Warning (adapter or driver fault) |
| `nic_link_down` | `networking` | Warning |
| `nic_link_up` | `networking` | Info |
| `ntfs_corruption` | `storage` | Critical (corrupted MFT record, MFT torn write, volume cannot be corrected) / Serious (corruption in a directory index or another structure) / Error (torn write on a data file) / Warning (repair completed, repair posting throttled) |
| `ntfs_delayed_write_lost` | `storage` | Serious (path on the system volume) / Error (path anywhere else) |
| `ntfs_transaction_log_error` | `storage` | Warning (flush failed on a live volume, recovery error, metadata reset) / Notice (flush failed on a volume that no longer exists) / Error (resource manager could not start) |
| `patch_install_failed` | `patching` | Minor for a failed install; Info or Verbose when the install did not run |
| `platform_integrity_indicator` | `endpoint_protection` | Error (detection completed) / Warning (partial, still under observation) |
| `rds_license_server_unactivated` | `licensing` | Warning |
| `rds_license_tracking_failed` | `licensing` | Warning |
| `rds_licensing_service_failed` | `licensing` | Error |
| `secure_boot_cert_update_pending` | `hardware` | Warning |
| `security_agent_service_start_failed` | `endpoint_protection` | Warning |
| `security_agent_service_terminated` | `endpoint_protection` | Minor |
| `service_crashed` | `app_stability` | Error |
| `service_exited_error` | `app_stability` | Error |
| `service_hang` | `app_stability` | Error |
| `service_installed` | `security_audit` | Notice |
| `service_start_failed` | `app_stability` | Error |
| `service_start_timeout` | `app_stability` | Error |
| `smb_delayed_write_lost` | `storage` | Error pin |
| `smb_server_transport_bind_failed` | `networking` | Warning (server) / Info (workstation) |
| `smb_share_recreate_failed` | `storage` | Warning pin |
| `storage_controller_reset` | `storage` | Error |
| `time_sync_failed` | `time_sync` | Warning |
| `tls_cert_expired` | `certificates` | Error |
| `tls_cert_name_mismatch` | `certificates` | Error |
| `tls_cert_untrusted_ca` | `certificates` | Error |
| `tls_cipher_mismatch` | `certificates` | Warning |
| `tls_client_credential_failed` | `certificates` | Error (server) / Warning (workstation) |
| `tls_server_credential_failed` | `certificates` | Error |
| `tpm_attestation_failed` | `security_audit` | Error |
| `unexpected_shutdown` | `os_stability` | Serious (server or unknown) / Warning (workstation) |
| `vpn_connected` | `vpn` | Notice |
| `vss_shadow_aborted` | `backup` | Error (aborted or not created) / Warning (shadow storage could not grow) |
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

## `av_unsigned_code_blocked`

A security agent blocked a process whose image contained unsigned or corrupted code from performing a privileged operation.

**Severity:** Serious

**Impact:** The privileged operation did not happen, so nothing on the host changed. What the event establishes is that a binary running on this machine fails a code-integrity check.

**Consider:**

- Identify the named executable and confirm whether it is expected on this host.
- Check whether the same executable appears on other hosts in the fleet.
- A legitimate application with a stripped or broken signature produces this line too.

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

## `disk_bad_block`

A disk reported a bad block.

**Severity:** Serious pin

**Impact:** Data in the affected block may be unreadable, and the drive is consuming its spare-block reserve.

**Consider:**

- Read the device path from the message and check the drive's health counters.
- Plan replacement rather than repair: bad blocks do not heal.

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

## `http_ssl_binding_created`

An HTTPS certificate binding was created for a listener endpoint on this host.

**Severity:** Notice

**Impact:** The endpoint can serve HTTPS with the bound certificate. Routine after an installation or a certificate replacement.

**Consider:**

- Read the endpoint from the message: an address and port, or a host name and port.
- A creation shortly after a deletion for the same endpoint is a certificate replacement.
- The modern record also names the process and the account that made the change.

## `http_ssl_binding_deleted`

The HTTPS certificate binding for a listener endpoint was removed on this host.

**Severity:** Notice

**Impact:** Clients reaching that endpoint over HTTPS get no certificate until a binding is put back. This is routine during an uninstall or the first half of a certificate replacement.

**Consider:**

- Read the endpoint from the message: an address and port, or a host name and port.
- Check whether a creation record for the same endpoint follows, which is what a certificate replacement looks like.
- The modern record also names the process and the account that made the change.

## `http_ssl_config_failed`

An HTTPS listener endpoint on this host could not use its SSL configuration.

**Severity:** Error

**Impact:** Clients connecting to that endpoint over HTTPS fail the TLS handshake until the binding or the certificate behind it is fixed.

**Consider:**

- Read the endpoint from the message, then list the certificate bindings for it.
- Check whether the bound certificate is still in the store and still valid.
- Check that the service account can read the private key of the bound certificate.

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

## `kerberos_etype_unsupported`

A Kerberos exchange failed because the encryption types the client, the service account and the domain controller support do not overlap.

**Severity:** Warning

**Impact:** The affected client or service cannot obtain the ticket it asked for and falls back or fails. Accounts left in this state stop authenticating once the legacy encryption types are refused outright.

**Consider:**

- Read the account and the requested encryption types from the message.
- Set the supported encryption types on the service account, or reset its password so a modern key is generated.
- Identify legacy clients and appliances before the weak types are refused outright.

## `kerberos_pac_verify_failed`

A domain controller could not verify the signature on the privilege data inside a Kerberos ticket.

**Severity:** Warning

**Impact:** The request carrying that ticket did not proceed. A client presenting the same ticket repeatedly keeps failing to authenticate to the affected service.

**Consider:**

- Compare the update level of every domain controller in the domain before reading this as an attack.
- Note which account the message names and whether the pattern follows one client or many.

## `kerberos_smartcard_cert_missing`

A domain controller has no usable certificate for smart card logon.

**Severity:** Warning

**Impact:** Certificate-based logon does not work against this domain controller. Other authentication methods are unaffected.

**Consider:**

- Confirm whether smart card or certificate logon is in use in this domain before acting.
- Check the domain controller certificate template, its enrolment, and the chain to the issuing authority.

## `kerberos_weak_krbtgt_key`

The domain ticket-granting account has no strong encryption key, so Kerberos tickets are issued using legacy cryptography.

**Severity:** Warning

**Impact:** Domain authentication is protected by weaker cryptography than it should be, and the domain stops issuing usable tickets once the legacy encryption types are refused.

**Consider:**

- The remedy is a password update on the ticket-granting account, performed the documented way.
- Plan it before legacy encryption types are refused outright.

## `nic_driver_fault`

A wireless network adapter driver reported a fault in the adapter or in itself.

**Severity:** Error (driver could not load) / Warning (adapter or driver fault)

**Impact:** Wireless connectivity on that adapter is lost or unreliable. Where the adapter did not load at all, the adapter is absent from the network stack until it is fixed.

**Consider:**

- Check whether the driver wrote an initialization record afterwards, which means it recovered.
- Repeats on one host point at the adapter, its firmware or the driver version.
- A driver that could not load is normally a resource conflict, a disabled device or a bad install.

## `nic_link_down`

A network adapter reported that its link went down.

**Severity:** Warning

**Impact:** Traffic on that adapter stops until the link returns. A host with another working adapter stays reachable; a host with only this one is offline for the duration.

**Consider:**

- Look for the matching link-up record and read the gap between them.
- Repeated drop-and-return cycles on one adapter point at the cable, the port or the switch.

## `nic_link_up`

A network adapter reported that its link came up.

**Severity:** Info

**Consider:**

- Read it beside the matching link-down record to size the outage on that adapter.
- A negotiated rate below the port capability is worth a look at the cable and the switch port.

## `ntfs_corruption`

NTFS found damage in the structures on a volume, or reported repairing it.

**Severity:** Critical (corrupted MFT record, MFT torn write, volume cannot be corrected) / Serious (corruption in a directory index or another structure) / Error (torn write on a data file) / Warning (repair completed, repair posting throttled)

**Impact:** Volume integrity is at risk; applications and files on that volume may be affected until repair is complete. Damage to the Master File Table reaches every file on the volume, because it holds the record of where each of them lives.

**Consider:**

- Identify the volume from structured fields or message text, and read which structure the message names.
- For Master File Table damage or a volume that cannot be corrected, plan an offline chkdsk and check backup state first.
- Check whether chkdsk or storage diagnostics completed after the event.
- Read the rate as well as the instance: repeated repairs on one volume point at the device.

## `ntfs_delayed_write_lost`

Windows could not save cached file data to the volume and the data was lost.

**Severity:** Serious (path on the system volume) / Error (path anywhere else)

**Impact:** Data an application believed it had written was discarded. The application is not told. Repeated occurrences point at the connection to the storage device rather than at the file system.

**Consider:**

- Check the path to the device: cabling, controller, and for network or removable volumes the link.
- Read the rate rather than one instance: a steady stream means the storage path is still failing.

## `ntfs_transaction_log_error`

The NTFS transaction log on a volume could not be written, replayed, or brought up.

**Severity:** Warning (flush failed on a live volume, recovery error, metadata reset) / Notice (flush failed on a volume that no longer exists) / Error (resource manager could not start)

**Impact:** NTFS uses the transaction log to undo changes that did not finish. While it is unavailable, a change interrupted on that volume may be left half applied.

**Consider:**

- Identify the volume, and check whether it is still present on the host.
- For a live volume, check the path to the device and whether the host was under memory pressure.

## `patch_install_failed`

Windows Update reports the outcome of an update install attempt on this device.

**Severity:** Minor for a failed install; Info or Verbose when the install did not run

**Impact:** On a failure the device stays on the previous version of that update until a later attempt succeeds, and repeated failures on the same update mean the device is falling behind on patching. On the deferred and did-not-run outcomes nothing changed and the update is offered again.

**Consider:**

- Check whether a later attempt at the same update succeeded.
- Group by the update title across the fleet to separate a bad update from a device problem.
- Group by the result code to separate one failure cause from another.

A single failure is common and usually self-correcting. Recurrence across cycles on the same update is the actionable pattern. The update title and the result code ride the message tail, and the normalized code and its space ride the shared error fields.

## `platform_integrity_indicator`

A firmware-security agent reported an Indicator of Attack against this machine platform.

**Severity:** Error (detection completed) / Warning (partial, still under observation)

**Impact:** The platform is in the state the indicator names, which normally means a firmware protection is disabled or the chassis was opened. Where the indicator completed, the agent considers its pattern met.

**Consider:**

- Read the Category and the listed events from the message: they name what was matched.
- Check whether a deliberate BIOS change or a hardware service visit explains it.
- Where nothing explains it, treat the named firmware settings as the thing to put back.

## `rds_license_server_unactivated`

A Remote Desktop license server is not activated and is issuing only temporary licences.

**Severity:** Warning

**Impact:** Remote Desktop clients receive temporary licences that expire. Once they do, sessions are refused until the license server is activated.

**Consider:**

- Activate the license server named in the message through its own management console.
- Check which licence model and how many licences the server is configured for while there.

## `rds_license_tracking_failed`

A Remote Desktop license server could not record a per-user licence in the directory.

**Severity:** Warning

**Impact:** Per-user licence tracking is incomplete for the affected users. Sessions still work, so the gap is only visible when licence usage is audited.

**Consider:**

- Add the license server computer account to the licence-servers group the message names.
- Re-check licence usage reporting afterwards, since earlier issues were not recorded.

## `rds_licensing_service_failed`

A Remote Desktop license server could not run, or hit an error in its licensing database.

**Severity:** Error

**Impact:** New Remote Desktop client access licences are not being issued reliably by this server. Existing licences keep working until they expire.

**Consider:**

- Read the error the message names before restarting anything.
- Check whether the deployment has a second license server still answering.
- A database engine error normally means the licensing store needs repair or rebuild.

## `secure_boot_cert_update_pending`

A Secure Boot certificate update has not been applied on this device.

**Severity:** Warning

**Impact:** Boot trust material stays stale, which can block future firmware or OS updates and leave the device on superseded Secure Boot certificates.

**Consider:**

- Check pending firmware and servicing updates on the device.
- Confirm Secure Boot state after the next update cycle.

## `security_agent_service_start_failed`

A sub-service of an endpoint protection agent failed to start.

**Severity:** Warning

**Impact:** The named component of the security product is not running. Where the component belongs to this installation, the agent is operating without part of its function.

**Consider:**

- Read the reason the supervisor states; a missing file is usually a component this edition does not ship.
- Confirm from the product console whether the named component is expected on this host.

## `security_agent_service_terminated`

A sub-service of an endpoint protection agent terminated unexpectedly.

**Severity:** Minor

**Impact:** The named component of the security product stopped. The agent normally restarts it, so a single occurrence usually leaves protection intact; a host emitting these continuously is running a broken install.

**Consider:**

- Count occurrences per host: the rate is the signal, not one event.
- Name the sub-service from the message and check whether it is expected on this build.
- A host looping on this normally needs the agent reinstalled.

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

## `smb_delayed_write_lost`

Windows could not save cached file data to a network share and the data was lost.

**Severity:** Error pin

**Impact:** Data an application believed it had written to a share was discarded. The application is not told. Repeated occurrences point at the link to the file server.

**Consider:**

- Check the link to the file server, and whether the server restarted under open handles.
- Read the rate rather than one instance: a steady stream means the session keeps dropping.

## `smb_server_transport_bind_failed`

The Windows file-sharing service could not bind to a network transport.

**Severity:** Warning (server) / Info (workstation)

**Impact:** On a file server, clients may not reach shares over the affected transport. On a workstation this normally accompanies a network adapter appearing or disappearing.

**Consider:**

- Identify the transport device from the message; NetBT paths name the adapter GUID.
- On a server, confirm shares are reachable on every address clients use.

## `smb_share_recreate_failed`

A file share could not be recreated because the folder it points at no longer exists.

**Severity:** Warning pin

**Impact:** Clients and scripts using that share name fail to connect until the folder is restored or the share definition is removed.

**Consider:**

- Read the share name and path from the message; the event names both remedies.
- Check whether the folder was moved rather than deleted before removing the share.

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

## `tls_cert_expired`

A remote server presented a certificate that has expired or is not yet valid, and the TLS connection failed.

**Severity:** Error

**Impact:** The connection to that endpoint does not complete, and retrying does not help until the certificate is renewed or the local clock is corrected.

**Consider:**

- Identify the endpoint from the calling process and confirm its certificate validity dates.
- Check the local clock: a host with a wrong date rejects valid certificates this way.

## `tls_cert_name_mismatch`

A TLS certificate name did not match the expected server name.

**Severity:** Error

**Impact:** TLS connections may fail or users may be exposed to misconfiguration or impersonation risk.

**Consider:**

- Verify the requested hostname and certificate subject/SAN.
- Check whether the peer is expected for the application.

## `tls_cert_untrusted_ca`

A remote server presented a certificate issued by an authority this host does not trust, and the TLS connection failed.

**Severity:** Error

**Impact:** The connection to that endpoint does not complete. Nothing in the presented certificate can be relied on, so the identity of the peer is unestablished.

**Consider:**

- Check whether a TLS-inspecting appliance or proxy is in the path and whether its authority is deployed to this host.
- Confirm the endpoint is one this host is meant to reach.

## `tls_cipher_mismatch`

A remote client offered no cipher suite this host accepts, and the TLS handshake failed.

**Severity:** Warning

**Impact:** The client cannot connect to this host over TLS. The host itself is unaffected and continues serving clients that offer a supported suite.

**Consider:**

- Identify the clients still offering obsolete suites before the remaining legacy suites are withdrawn.
- Steady low-rate volume from unknown sources is usually scanning rather than a real client.

## `tls_client_credential_failed`

The host could not create a TLS client credential, so a connection that needed to present a client certificate could not build one.

**Severity:** Error (server) / Warning (workstation)

**Impact:** The application that asked for the credential cannot complete authenticated TLS connections that require one. Connections that present no client certificate are unaffected.

**Consider:**

- Read the requesting process from the message and identify which integration needs a client certificate.
- Check that the certificate exists in the expected store and that its private key is readable by the calling account.

## `tls_server_credential_failed`

The private key behind this host's TLS server certificate could not be accessed.

**Severity:** Error

**Impact:** Clients cannot negotiate TLS with the endpoint that uses that certificate until the key or its permissions are repaired.

**Consider:**

- Check the private key permissions for the certificate the affected service is bound to.
- Confirm the key container survived the last certificate renewal or import.

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

## `vpn_connected`

A remote-access connection was established.

**Severity:** Notice

**Consider:**

- Read the profile name and the user from the message.
- Read it beside the failures on the same host to tell a retry from a broken tunnel.

## `vss_shadow_aborted`

A volume shadow-copy operation was aborted by shadow storage limits.

**Severity:** Error (aborted or not created) / Warning (shadow storage could not grow)

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
