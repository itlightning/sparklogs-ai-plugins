# Off-Endpoint Causes - per-symptom-category visibility-limit reference

Every system condition summary enumerates the WHAT WAS NOT CHECKED section. This file lists the recurring off-endpoint causes per common symptom category so you can populate the section investigation-specifically.

The list is **not exhaustive** - it's a starting set covering common patterns. It expands over time as more symptom categories are observed.

**How to use this file:**

1. When you start an investigation, identify which symptom category the engineer's request falls under.
2. Read the relevant section(s) below.
3. In your WHAT WAS NOT CHECKED section, list the items from below that are *actually relevant* to the specific investigation scope. **Do not list every item generically - that becomes boilerplate noise.** List what wasn't checked for *this* investigation.
4. If on-endpoint evidence is sufficient and off-endpoint causes are not implicated, the section can be brief: "The off-endpoint causes typically associated with this kind of investigation were considered but the on-endpoint evidence is sufficient to characterize the observed conditions - see Findings."

---

## HM1 - VSS backup failure

**Off-endpoint causes the AI agent should flag when on-endpoint evidence is insufficient:**

- **Backup target health (NAS, cloud destination, SAN).** Veeam/Datto/Acronis often write to a NAS or cloud target. If the target is failing, slow, or out of space, the on-endpoint side sees "VSS error" but the cause is upstream. Backup target typically does not run a Managed Agent.
- **EDR cloud blocking VSS operations.** SentinelOne, Sophos, CrowdStrike, Defender for Endpoint may flag VSS operations as suspicious and block them. The block is recorded in the EDR cloud audit, NOT on-endpoint. EDR cloud is outside SparkLogs ingestion currently.
- **Bespoke / unsupported backup vendor.** SparkLogs autodetect rules cover Veeam, Datto, Acronis, MSP360, Cove, and a few others. If the MSP is using a less-common vendor (or a custom backup script), the vendor's log file may not be ingested.
- **Backup credential expiry.** Veeam/Datto runs as a service account whose credentials live in vault/AD. Credential expiry manifests as auth failure earlier in the backup pipeline; the VSS error is a downstream symptom. Credential vault is outside on-endpoint state.
- **Hyper-V / VMware guest writers.** When the source is a hypervisor host but the failed writer is in a guest, on-endpoint state shows host healthy but guest writers are not visible from host. Cross-host correlation is not currently in scope.
- **Backup-job server-side state.** If the backup product has a central scheduling server (Veeam B&R, Datto BCDR appliance), job-orchestration state lives there, not on the protected endpoint.

---

## HM2 - Slow logon

**Off-endpoint causes:**

- **Azure AD / Entra conditional-access policy.** Policy changes can silently block logon for a subset of users. On-prem AD shows healthy; the failure is in the cloud identity layer. Azure AD audit logs are outside SparkLogs ingestion currently.
- **MFA cloud (Duo, Microsoft Authenticator).** Rate-limits, outages, user-side MFA issues. From the endpoint, looks like generic auth failure. MFA cloud audit is outside SparkLogs ingestion currently.
- **Federation server (ADFS) cert expiry or outage.** Federation servers are sometimes on a separate machine that may or may not run a Managed Agent. If not, ADFS issues are invisible from on-endpoint state.
- **Time drift on the PDC emulator.** If the PDC's clock is drifting, Kerberos fails silently for clients. The PDC needs to be in scope for the investigation; if only the workstation is investigated, the PDC's time state is invisible.
- **Azure AD Connect sync break.** Users get silently dropped from on-prem replica. Sync state lives in Azure AD Connect logs (which the Managed Agent could ship if Connect is installed and the log location is known) but not in on-prem AD itself.
- **Network path between user and DC.** Packet loss, latency, intermittent DNS - visible from network monitoring, not from endpoint state alone.
- **Cellular / coffee-shop WiFi for laptops.** Some "slow logon" reports are devices with intermittent network paths to the DC. The system_health subsource (rev-8) captures network latency to cloud but not to DC specifically.

---

## HM3 - Memory or handle leak

**Off-endpoint causes (rare for HM3 but worth noting):**

- **Vendor app internals.** The leak is in a vendor library/DLL inside a process - visible only with Sysmon-equivalent module-load tracing (not currently in scope).
- **Container / VM nested processes.** Workload inside Docker, WSL2, or VM is invisible from the host's processes snapshot.
- **GPU memory.** Workstations with GPUs (CAD stations, ML workloads) may have GPU memory leaks invisible to system memory counters.
- **Vendor app server-side state.** If the leak's trigger is a remote API call from a SaaS backend, the trigger is outside on-endpoint visibility.

---

## HM4 - Windows Update failure

**Off-endpoint causes:**

- **WSUS server health.** If the MSP uses WSUS, server-side issues (storage, content sync, SUSDB) are at the WSUS server, not on the endpoint.
- **Microsoft Update service / CDN status.** When endpoints update directly from MS, MS-side issues are off-endpoint.
- **Update content-sync issues.** Endpoint reports "needs reboot" but the actual servicing-stack failure may need CBS log inspection (large; not shipped in full).
- **Driver vendor's parallel update channel.** If Intel/Realtek/NVIDIA pushed a driver update independently of WU, the conflict source is outside WU's view.

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

## HM7 - RAID array degraded

**Off-endpoint causes:**

- **SAN / NAS health.** When storage is networked (iSCSI, NFS, SMB), the storage device's own health logs are off-endpoint. Storage devices typically don't run a Managed Agent.
- **Vendor RAID controller firmware advisories.** Known firmware bugs and recommended updates are vendor-portal information.
- **Disk vendor SMART thresholds.** Some disk vendors define "failing" differently; vendor utilities may report problems before SMART thresholds trigger.

---

## HM8 - AD replication failure

**Off-endpoint causes:**

- **WAN between DCs.** Site-to-site connectivity, MPLS, SD-WAN, VPN concentrator - all off-endpoint.
- **DNS infrastructure not on a DC.** External DNS, conditional-forwarder targets - off-endpoint.
- **Azure AD Connect sync** (when hybrid). Connect server may or may not run Managed Agent.
- **Site link configuration in AD topology.** Visible on DCs (in scope) but interpreting requires understanding of intended topology - partly outside data, partly outside agent reasoning.

---

## HM9 - Certificate expiry

**Off-endpoint causes:**

- **Public CA cert lifecycle.** Public certs are managed via vendor portals (DigiCert, Let's Encrypt, Sectigo); renewal state is outside endpoint.
- **Federation server certs.** If ADFS is on a separate server without Managed Agent, federation certs are invisible.
- **Internal CA infrastructure.** If the internal CA is on a server without Managed Agent, CA-issued cert state and renewal cycles are off-endpoint.
- **Third-party SaaS app certs.** Cert expiry on a SaaS-hosted app is off-endpoint by definition.

---

## HM10 - RMM connectivity

**Off-endpoint causes:**

- **RMM cloud service health.** ConnectWise/NinjaOne/Datto/Kaseya cloud outages appear as endpoint-can't-reach-RMM from the endpoint perspective. RMM cloud audit is outside SparkLogs ingestion currently.
- **EDR cloud quarantine of RMM agent.** SentinelOne or Defender flags RMM agent as suspicious and quarantines it. The quarantine is in EDR cloud audit, not on endpoint.
- **Network path between endpoint and RMM cloud.** Firewall, proxy, ISP, WAN, DNS - all off-endpoint.
- **Corporate proxy / TLS inspection.** Some corporate networks MITM-inspect TLS; if the proxy doesn't understand the RMM protocol, it can break the connection.

---

## Cross-cutting off-endpoint patterns

Some off-endpoint causes apply across many symptom categories and are worth flagging when investigations span multiple potential causes:

### Network

- **Network monitoring tools** (Auvik, Domotz, PRTG, LogicMonitor) collect network-path data not visible from endpoints.
- **Switch / AP / firewall logs** (FortiGate, SonicWall, Meraki, etc.) - generally outside on-endpoint visibility.

### Identity

- **Azure AD audit + sign-in logs** - relevant for many identity-related investigations.
- **MFA providers** (Duo, Microsoft Authenticator) - partially covered by Azure AD.
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
- "Backup target NAS-01 was not checked (it does not run a Managed Agent). Recommend checking NAS-01 health logs directly to confirm or rule out a target-side cause."
- "Azure AD audit logs are outside SparkLogs ingestion currently. If on-endpoint evidence does not explain the logon failures (Findings 1-3 are inconclusive), check the Azure AD admin center for recent conditional-access policy changes."

**Wrong (generic boilerplate):**
- "Many off-endpoint causes are possible."
- "We can't see everything."
- "Cloud services are not in scope."

The right form gives the engineer a concrete next step. The wrong form is noise.

---

## Maintenance

This file updates when:
- A new symptom category warrants its own visibility-limit list.
- A recurring off-endpoint cause is observed and added to the catalog.
- A previously-off-endpoint source becomes on-endpoint (i.e., SparkLogs starts ingesting it) - remove from this list.
- A scheduled refresh comes round.
