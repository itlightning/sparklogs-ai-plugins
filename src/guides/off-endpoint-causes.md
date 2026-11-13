# Off-Endpoint Causes - per-symptom-category visibility-limit reference

Every system condition summary enumerates the WHAT WAS NOT CHECKED section. This file lists the recurring off-endpoint causes per common symptom category so you can populate the section investigation-specifically.

The list is **not exhaustive** - it's a starting set covering common patterns. It expands over time as more symptom categories are observed.

**How to use this file:**

1. When you start an investigation, identify which symptom category the engineer's request falls under.
2. Read the relevant section(s) below.
3. In your WHAT WAS NOT CHECKED section, list the items from below that are *actually relevant* to the specific investigation scope. **Do not list every item generically - that becomes boilerplate noise.** List what wasn't checked for *this* investigation.
4. Before naming a third-party source as not checked, look for it in `list_sources` (tool): firewalls, identity providers and EDR consoles can send to SparkLogs with an ingest key (`guides/scope-ladder.md`, Ingest-key data). Name it as not checked only when no sender for it is in scope.
5. If on-endpoint evidence is sufficient and off-endpoint causes are not implicated, the section can be brief: "The off-endpoint causes typically associated with this kind of investigation were considered but the on-endpoint evidence is sufficient to characterize the observed conditions - see Findings."

---

## HM1 - VSS backup failure

**Off-endpoint causes the AI agent should flag when on-endpoint evidence is insufficient:**

- **Backup target health (NAS, cloud destination, SAN).** Veeam/Datto/Acronis often write to a NAS or cloud target. If the target is failing, slow, or out of space, the on-endpoint side sees "VSS error" but the cause is upstream. Backup target typically does not run a SparkLogs Agent.
- **EDR cloud blocking VSS operations.** SentinelOne, Sophos, CrowdStrike, Defender for Endpoint may flag VSS operations as suspicious and block them. The block is recorded in the EDR cloud audit, NOT on-endpoint. The agent does not collect the EDR cloud audit.
- **Backup vendor's own logs.** Vendor events reach SparkLogs only through the Windows Event Log channels the pack collects; the vendor's own log files are not collected. A vendor (or custom backup script) that writes its job detail only to its own files is invisible here.
- **Backup credential expiry.** Veeam/Datto runs as a service account whose credentials live in vault/AD. Credential expiry manifests as auth failure earlier in the backup pipeline; the VSS error is a downstream symptom. Credential vault is outside on-endpoint state.
- **Hyper-V / VMware guest writers.** When the source is a hypervisor host but the failed writer is in a guest, on-endpoint state shows host healthy but guest writers are not visible from host. Cross-host correlation is not currently in scope.
- **Backup-job server-side state.** If the backup product has a central scheduling server (Veeam B&R, Datto BCDR appliance), job-orchestration state lives there, not on the protected endpoint.

---

## HM2 - Slow logon

**Off-endpoint causes:**

- **Entra conditional-access policy.** Policy changes can silently block logon for a subset of users. On-prem AD shows healthy; the failure is in the cloud identity layer. The agent does not collect Entra audit logs.
- **MFA cloud (Duo, Microsoft Authenticator).** Rate-limits, outages, user-side MFA issues. From the endpoint, looks like generic auth failure. The agent does not collect MFA cloud audit logs.
- **Federation server (ADFS) cert expiry or outage.** Federation servers are sometimes on a separate machine that may or may not run a SparkLogs Agent. If not, ADFS issues are invisible from on-endpoint state.
- **Time drift on the PDC emulator.** If the PDC's clock is drifting, Kerberos fails silently for clients. The PDC needs to be in scope for the investigation; if only the workstation is investigated, the PDC's time state is invisible.
- **Entra Connect sync break.** Entra Connect copies on-premises AD accounts and password hashes to Entra ID. When it stops, cloud accounts go stale: a new user or a changed password works on the domain but not in Entra, and a disabled account can still sign in to cloud services. Entra Connect writes sync-run and password-hash-sync failures to the Application log of the sync server; they are curated when that server runs the agent (`entra_sync_run_failed` (value), `entra_password_hash_sync_failed` (value)). Its detailed run history stays on the server.
- **Network path between user and DC.** Packet loss, latency, intermittent DNS - visible from network monitoring, not from endpoint state alone.
- **Cellular / coffee-shop WiFi for laptops.** Some "slow logon" reports are devices with intermittent network paths to the DC. The agent's probes cover the gateway, an internet target and DNS, not the path to a DC.
- **Profile servers and profile containers.** Roaming profiles, redirected folders and FSLogix-style containers live on a file server or storage the device reaches at sign-in. The device records the wait and the share path; the server's load, its disk and the container product's own logs are only visible where they run the agent or in the product's logs.
- **Print servers and policy targets.** A printer, drive map or software package that policy installs at sign-in waits on its server. The device records which extension waited and for how long, not why the server was slow.
- **The Entra sign-in logs.** A device-side Entra failure carries a correlation ID; the reason Entra refused it, and any conditional-access decision, is in the tenant's sign-in logs.

---

## HM3 - Memory or handle leak

**Off-endpoint causes (rare for HM3 but worth noting):**

- **Vendor app internals.** The leak is in a vendor library/DLL inside a process - visible only with module-load tracing, which SparkLogs does not collect.
- **Container / VM nested processes.** Workload inside Docker, WSL2, or VM is invisible from the host's processes snapshot.
- **GPU memory.** Workstations with GPUs (CAD stations, ML workloads) may have GPU memory leaks invisible to system memory counters.
- **Vendor app server-side state.** If the leak's trigger is a remote API call from a SaaS backend, the trigger is outside on-endpoint visibility.

---

## HM4 - Windows Update failure

**Off-endpoint causes:**

- **WSUS or Configuration Manager server.** Its approvals, content sync, storage and database health are on the server. A device whose update is not approved logs no failure; it reports nothing to install.
- **The RMM's patch policy.** Approvals, deferrals, maintenance windows and forced-restart settings live in the RMM, and its patch report is built from its own scans.
- **Microsoft's side.** Release health, known issues and safeguard holds for a KB or feature update are published by Microsoft; an outage of the update service is visible only as scan and download failures.
- **The path to the update service.** Proxies, TLS inspection and firewalls between the device and Microsoft or WSUS are configured off the device.
- **The device's own servicing logs.** CBS.log is collected only for its curated lines; the full log, `Get-WindowsUpdateLog` output and a feature update's Setup logs (Panther folder, SetupDiag) stay on the device.
- **Device makers' update tools.** Drivers and firmware pushed by a device maker's own updater, outside Windows Update, can conflict with what Windows Update offers.

---

## HM5 - Disk full or filling fast

**Off-endpoint causes (uncommon - disk is usually a local concern):**

- **Mounted network shares.** If C: looks fine but a mapped drive Z: is filling, the cause is on the share's host, not the endpoint.
- **Backup software writing to a shadow location.** Some products store snapshots in unexpected locations.
- **Sync clients (OneDrive, Dropbox, Google Drive) syncing remote content.** Cloud-side cause.

---

## HM6 - BitLocker recovery key prompt

**Off-endpoint causes:**

- **BitLocker key escrow service.** Keys are escrowed to AD, MBAM, or Intune. Escrow service health and the key's actual presence are off-endpoint.
- **Hardware vendor's parallel firmware update.** OEM-pushed firmware updates can change PCR measurements; OEM logs are off-endpoint.
- **TPM-firmware security advisories.** Vendor-issued TPM firmware updates with known PCR-changing behavior are outside on-endpoint visibility unless the MSP tracks them.

---

## HM7 - Disk, RAID array or storage path failing

**Off-endpoint causes:**

- **RAID controller log and console.** Member drive state, rebuilds, patrol reads, the cache battery and the controller's own event log live in the controller. They reach SparkLogs only when the vendor's agent writes a Windows log; a controller with no agent installed is invisible.
- **Server management controller** (iDRAC, iLO, XClarity and similar). Its hardware log records drive, backplane, power supply and controller faults that Windows never sees.
- **SMART counters and the drive maker's tools.** SparkLogs does not read reallocated or pending sector counts or wear levels; a drive behind a RAID controller hides them from Windows entirely. Some makers' tools report a drive failing before its SMART threshold trips.
- **Storage Spaces pool state.** Pool, virtual disk and physical disk health (`Get-StoragePool`, `Get-VirtualDisk`, `Get-PhysicalDisk`) are not collected; only the driver's event records are.
- **SAN / NAS health.** When storage is networked (iSCSI, Fibre Channel, SMB), the array's own logs, its maintenance and the storage switches are off-endpoint. Storage arrays do not run a SparkLogs Agent.
- **Hypervisor host storage.** A virtual machine's disk errors are often the host's storage being slow or full; the host's logs and the hypervisor's monitoring hold the cause.
- **Firmware advisories.** Known drive, controller and backplane firmware bugs and their fixes are vendor-portal information.

---

## HM8 - AD replication failure

**Off-endpoint causes:**

- **WAN between DCs.** Site-to-site connectivity, MPLS, SD-WAN, VPN concentrator - all off-endpoint.
- **DNS infrastructure not on a DC.** External DNS, conditional-forwarder targets - off-endpoint.
- **Entra Connect sync** (when hybrid): see **Entra Connect sync break** in HM2.
- **Site link configuration in AD topology.** Visible on DCs (in scope) but interpreting requires understanding of intended topology - partly outside data, partly outside agent reasoning.

---

## HM9 - Certificate, TLS and enrollment failures

**Off-endpoint causes:**

- **Public CA and ACME accounts.** A purchased or ACME-issued certificate is ordered and renewed in the CA's portal or the ACME account; whether a renewal was issued is recorded there.
- **The certificate a remote server presents.** A client's rejection says why it refused, not the server's certificate in full; the server, or a test against its name and port, shows the chain and dates.
- **Load balancers, reverse proxies and firewalls.** They hold their own copy of a site's certificate, and a TLS-inspecting firewall presents its own; renewing the server's copy does not change theirs.
- **The internal CA without an agent.** Its issued, denied and failed requests, its templates and its revocation list publication are visible only on the CA server.
- **Directory configuration.** Certificate templates, their permissions and the enrollment services the directory lists are set in Active Directory; a decommissioned CA still listed there shows only as failed enrollment on the devices.
- **Federation and SaaS certificates.** Token-signing certificates on a federation server, and certificates of SaaS services, are managed in those systems.
- **Programs with their own TLS.** Browsers and runtimes with their own certificate checks log rejections only in their own logs.

---

## HM10 - RMM connectivity

**Off-endpoint causes:**

- **RMM cloud service health.** ConnectWise/NinjaOne/Datto/Kaseya cloud outages appear as endpoint-can't-reach-RMM from the endpoint perspective. The agent does not collect RMM cloud audit logs.
- **EDR cloud quarantine of RMM agent.** SentinelOne or Defender flags RMM agent as suspicious and quarantines it. The quarantine is in EDR cloud audit, not on endpoint.
- **Network path between endpoint and RMM cloud.** Firewall, proxy, ISP, WAN, DNS - all off-endpoint.
- **Corporate proxy / TLS inspection.** Some corporate networks MITM-inspect TLS; if the proxy doesn't understand the RMM protocol, it can break the connection.

---

## HM11 - Internet down, slow or dropping

**Off-endpoint causes:**

- **The router's internet connection and the ISP.** An outage placed beyond the gateway sits on either one; endpoint probes cannot tell them apart. The router's WAN log or the ISP's status page can.
- **Router, firewall and access points.** Their own logs and Wi-Fi controller data are off-endpoint; an access point dropping clients shows on the device only as drops and reconnects.
- **Other devices at the site without the agent.** The same-org comparison covers only devices that run the agent.
- **The far end.** A cloud service or website being slow reads like a slow path from the device.

---

## HM12 - Slow or freezing device

**Off-endpoint causes:**

- **Application servers and SaaS backends.** An application waiting on its server looks idle on the device; the agent does not measure application response time.
- **File servers and mapped drives.** A slow share stalls Explorer and Office on the device; the share's host needs its own reading.
- **Virtualization host contention.** A VM's CPU ready time, memory the host reclaims and the host's storage latency are measured on the host, not in the guest.
- **SAN and iSCSI storage.** The array, its switches and the multipath configuration keep their own logs; the device sees only slow or lost I/O on its disk.
- **Management controller.** A server's iDRAC, iLO or XClarity log holds the temperatures, fan and power supply faults and power caps behind a throttled CPU.

---

## HM13 - One application slow or stalling over the network

**Off-endpoint causes:**

- **The application server.** Server-side load, database locks and timeouts appear on the device only as slow or stalled connections.
- **VPN concentrator and tunnel.** Tunnel renegotiation, MTU problems and concentrator load are logged on the VPN gateway.
- **Remote site network.** Links and firewalls between the VPN gateway and the application server are off-endpoint.
- **UDP traffic.** The agent measures TCP connections only; voice, video and UDP-based VPNs carry no per-connection readings.

---

## HM14 - TPM errors or attestation failure

**Off-endpoint causes:**

- **Compliance verdict.** Whether Intune or conditional access marked the device noncompliant is decided in the management service. The device logs only its own checks and requests.
- **Attestation service.** Microsoft's health attestation service and the network path to it are off-endpoint. The device logs only that its request failed.
- **TPM firmware advisories.** Device-maker TPM firmware updates and known TPM defects are published by the vendor, not logged on the device.
- **Virtual TPM provisioning.** A virtual machine's TPM and endorsement key certificate come from the host, which needs its own reading.

---

## HM15 - What changed on this device

**Off-endpoint causes:**

- **Pushed policy and management.** Group Policy objects edited on a domain controller, Intune profiles and RMM policies are changed in their consoles. The device shows the effects (rules, services, settings), and often not who changed the policy or when.
- **Network and security gear.** Router, firewall, DHCP and DNS server, Wi-Fi controller and VPN concentrator changes leave nothing on the endpoint until traffic fails.
- **The application's server or tenant.** A SaaS tenant setting, a server-side update or a license change can break a client that did not change.
- **Hardware and firmware changed with the device off.** A dock, monitor or card swapped, or a firmware setting changed and changed back between two readings.

---

## HM16 - Service will not start, keeps stopping or hangs

**Off-endpoint causes:**

- **The vendor's own logs and back end.** Many services write why they failed only to their own log files, which SparkLogs does not collect, or depend on a vendor cloud, license server or update service.
- **Directory account policy.** A service account's password change, expiry, lockout or lost Log on as a service right is set in the directory or Group Policy; a domain controller without the agent shows none of it.
- **Resources on other hosts.** A database, file share or application server the service waits for at start is a separate machine that needs its own reading.
- **Vendor driver and product fixes.** A blocked driver or a crash in the vendor's code is fixed by the vendor; known issues and fixed versions are in the vendor's documentation.

---

## HM17 - Is SparkLogs collecting from this device

**Off-endpoint causes:**

- **The network path to SparkLogs.** Firewalls, proxies and TLS inspection between the device and SparkLogs block delivery and updates; the device shows only that sending failed.
- **Endpoint protection.** A security product that blocks or quarantines the agent or its collector records that in its own console.
- **RMM and Group Policy actions.** A policy that stops, removes or reinstalls the agent, or changes event log sizes and access, is configured in the RMM or the directory.
- **Machine state while silent.** Whether a device with no signal was powered off, asleep or off the network is the RMM's and the user's to say.

---

## HM18 - Blue screens, app crashes, unexpected restarts

**Off-endpoint causes:**

- **Power.** UPS, power distribution and building power events are logged on those devices. A power loss leaves the endpoint only an unclean-stop record at the next boot.
- **Virtualization host.** A host crash, reset or maintenance restarts its guests; each guest logs an unexpected shutdown and no crash. The host needs its own reading.
- **Hardware diagnostics.** Memory tests, the device maker's diagnostics and a server's management controller log (iDRAC, iLO) hold results the operating system never saw, including the controller's own watchdog resets of a hung server.
- **Vendor crash telemetry.** A software vendor's crash reports and known issues for a release are published by the vendor; the device logs only its own crashes.

---

## HM19 - Group Policy not applying

**Off-endpoint causes:**

- **The policy objects in the directory.** Their settings, links, security filtering, WMI filters and edit history live in Active Directory and the Group Policy Management console. The device shows which objects applied or were filtered, not why an object was built that way or who changed it.
- **Domain controllers and SYSVOL.** A controller without the agent, its DNS records and SYSVOL replication between controllers are visible only on the controllers. A device that cannot read an object's files sees the failure, not which controller holds a stale copy.
- **DNS servers and AD Sites and Services.** Wrong records, a missing subnet-to-site mapping or a retired controller still in DNS are set on the servers; the device shows the lookup or discovery that failed.
- **The network between the device and its controllers.** The VPN concentrator, the site link and firewalls between sites decide whether a controller answers. The device sees its own link and probes, not the path beyond them.
- **Servers that preferences point at.** File servers behind drive maps and file copies, print servers and their drivers, and package shares for software installation each need their own reading.

---

## HM20 - File share and SMB access

**Off-endpoint causes:**

- **The far end without the agent.** A NAS, a copier's scan-to-folder target, an old server or a cloud file service keeps its own logs; the device sees only the error the far end returned.
- **Name and address services.** DNS records, scavenging and DHCP reservations that point a server name at the wrong machine are configured on the DNS and DHCP servers.
- **Domain controllers.** Account lockouts, password changes and Kerberos service names (SPNs) are decided in the directory; a lockout's full record is on the domain controllers.
- **The path to TCP 445.** Firewalls, VPN concentrators and ISPs that drop or block SMB traffic are configured off the device.

---

## HM21 - Scheduled task failures

**Off-endpoint causes:**

- **The directory.** A password change, expiry, lockout, disabled account or a lost Log on as a batch job right for the account a task stores is set in the directory or Group Policy. A domain controller without the agent shows none of it.
- **The console that deployed the task.** Tasks pushed by Group Policy preferences, an RMM or a software deployment tool are defined there; a stale path or account is fixed at that source.
- **The program's own result.** Whether the job did its work is in the program's log or its back end (a backup console, a sync service), and in the task's Last Run Result on the device.
- **Resources on other hosts.** A share, database or server the job reads or writes is a separate machine that needs its own reading.
- **Whether the device was meant to be on.** Shutdown habits, power plans and wake settings are the user's and the RMM's to say.

---

## HM22 - Hardware faults

**Off-endpoint causes:**

- **Management controller.** A server's iDRAC, iLO or XClarity log holds hardware errors the firmware handled itself and the details a WHEA record only points to.
- **Maker diagnostics.** Memory tests, processor and graphics stress tests and the maker's diagnostics run outside Windows; their results are not logged.
- **Firmware advisories.** BIOS, chipset, dock and device firmware releases and known issues are published by the maker.
- **Temperatures and power over time.** Windows logs a zone crossing a trip point, not its temperature history, fan speed or power supply readings; a UPS keeps its own log.

---

## Cross-cutting off-endpoint patterns

Some off-endpoint causes apply across many symptom categories and are worth flagging when investigations span multiple potential causes:

### Network

- **Network monitoring tools** (Auvik, Domotz, PRTG, LogicMonitor) collect network-path data not visible from endpoints.
- **Switch / AP / firewall logs** (FortiGate, SonicWall, Meraki, etc.) - not collected by the agent; present only when the client sends them with an ingest key.

### Identity

- **Entra ID audit and sign-in logs** - relevant for many identity-related investigations.
- **MFA providers** (Duo, Microsoft Authenticator) - partially covered by the Entra ID sign-in logs.
- **Non-Microsoft identity** (Okta, JumpCloud, Auth0) - off-endpoint; lower priority.

### Cloud SaaS

- **Microsoft 365 admin / unified audit** - High value for M365-related investigations.
- **Vendor SaaS apps** (Salesforce, ServiceNow, etc.) - vertical-specific; lower priority.

### Vendor cloud APIs

- **Backup vendor clouds** (Veeam Cloud Connect, Datto cloud) - for backup target-side visibility.
- **EDR clouds** (SentinelOne, CrowdStrike, Defender for Endpoint) - for EDR-side context.
- **RMM clouds** - for RMM-side reachability and agent status.

---

## Honest framing in the WHAT WAS NOT CHECKED section

The point of enumeration is to support the engineer's decision about where to investigate next, not to pad the summary with caveats. Prefer specific, actionable wording.

**Right (specific, actionable):**
- "Backup target NAS-01 was not checked (it does not run a SparkLogs Agent). Recommend checking NAS-01 health logs directly to confirm or rule out a target-side cause."
- "Entra audit logs are not in this scope (no sender for them in list_sources). If on-endpoint evidence does not explain the logon failures (Findings 1-3 are inconclusive), check the Entra admin center for recent conditional-access policy changes."

**Wrong (generic boilerplate):**
- "Many off-endpoint causes are possible."
- "We can't see everything."
- "Cloud services are not in scope."

The right form gives the engineer a concrete next step. The wrong form is noise.

---
