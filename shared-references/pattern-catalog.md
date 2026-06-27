# Pattern Catalog - high-signal patterns with likely meanings

A short, curated catalog of `pattern_hash` patterns that recur across MSP environments and have well-understood meanings. Use this as a starting point when `describe_pattern` returns a pattern_text you don't recognize - search the catalog for a match.

The catalog covers ~25 commonly-seen patterns and is expanded over time as more patterns are observed.

**How to use:**
- This catalog is a starting reference, not a substitute for investigation. A pattern's "likely meaning" is a starting point, not a Finding-grade conclusion.
- Each entry has a "vendor docs URL" for authoritative reference. When investigating, point the engineer at the docs URL.
- Pattern text uses `<X>` placeholders for variable parts that AutoClassify normalizes.

---

## Backup / VSS

### `Veeam VSS error 0x80042308 on volume <X> for job <Y>`
- **Likely meaning:** VSS writer timeout. The shadow copy operation exceeded the writer's timeout window. Common causes: storage performance degradation, too many concurrent backup operations, anti-virus interference, large database transaction in progress.
- **HM:** HM1
- **Vendor docs:** veeam.com/kb (search "0x80042308")

### `VSS writer <X> is in state Failed`
- **Likely meaning:** A VSS writer reported failure during snapshot. Investigate the specific writer's owning service.
- **HM:** HM1
- **Vendor docs:** docs.microsoft.com (search "VSS writers")

### `Backup completed for job <X>`
- **Likely meaning:** Successful backup. Useful as a *disappeared* signal in `query_period_diff` - if this pattern stopped firing, backups stopped succeeding.
- **HM:** HM1 (as absence)

### `VSS writer Microsoft Hyper-V VSS Writer is in state <X>`
- **Likely meaning:** Hyper-V guest VSS writer state. State `Failed` often indicates a guest's writer failure that's invisible from the guest itself.
- **HM:** HM1, cross-host

## Windows Update

### `Installation Successful: Windows successfully installed the following update: <X>`
- **Likely meaning:** Successful KB install. Useful timing reference for "what changed" investigations.
- **HM:** HM4 (correlation), HM6 (BitLocker triggers), HM7 (RAID firmware)

### `Installation Failure: Windows failed to install the following update with error <X>: <Y>`
- **Likely meaning:** Update failed. The error code is the discriminator. Common: 0x80070643 (servicing stack issue), 0x80073712 (component store corruption), 0x800f0922 (network connectivity to WSUS / MS Update).
- **HM:** HM4
- **Vendor docs:** docs.microsoft.com (search "windows update error codes")

### `Service started: Windows Update`
- **Likely meaning:** Update service started. Often coincident with scheduled scans.
- **HM:** HM4 (timing)

## Authentication / Identity

### `An account failed to log on. Logon Type: <X>. Failure Reason: <Y>. Account Name: <Z>`
- **Likely meaning:** Security event 4625. Logon Type 3 = network (SMB, etc.), 10 = remote interactive (RDP), 7 = unlock. Failure Reason discriminates: Bad Password vs Account Disabled vs Account Locked vs Time Restriction.
- **HM:** HM2, HM8 (when DC-side), credential-stuffing investigations
- **Vendor docs:** docs.microsoft.com (search "Event ID 4625")
- **Discriminator pattern:** for credential stuffing, look at `count_distinct(source_ip)` and `count_distinct(target_user)`. High distinct IPs + few target users = stuffing. Few IPs + many users = config issue.

### `An account was successfully logged on. Logon Type: <X>. Account Name: <Z>`
- **Likely meaning:** Security event 4624. Useful for baseline comparison and for noticing unexpected source IPs.
- **HM:** HM2

### `Kerberos pre-authentication failed. Account: <X>`
- **Likely meaning:** Security event 4771. Often paired with 4625 events; can indicate password issue, time drift, or account lockout.
- **HM:** HM2, time-drift cascade detection

## Service / SCM

### `The <X> service entered the <Y> state.`
- **Likely meaning:** Service Control Manager event 7036. State transitions: stopped, running, paused. Frequent transitions on the same service = flapping.
- **HM:** HM10 (when RMM service), various

### `The <X> service terminated unexpectedly. It has done this <N> times.`
- **Likely meaning:** SCM event 7031. Service crash with auto-restart triggered.
- **HM:** HM10, HM3 (when paired with memory pressure)

## Disk / Storage

### `An error was detected on device \Device\Harddisk<N>\DR<M> during a paging operation.`
- **Likely meaning:** System event 51. Disk read/write error during paging. Often early signal of failing disk; pair with SMART data.
- **HM:** HM7

### `The driver detected a controller error on \Device\Harddisk<N>.`
- **Likely meaning:** System event 11 (disk-related). Controller-level error; often hardware.
- **HM:** HM7

### `The system has rebooted without cleanly shutting down first.`
- **Likely meaning:** Kernel-Power event 41. Unexpected shutdown - power loss, hardware fault, or BSOD.
- **HM:** HM5 (offline endpoint), HM7

### `Volume <X> has reached <Y>% used.`
- **Likely meaning:** Defender / disk-monitor warning at high usage. Pair with system_health.os_volume_free_pct severity.
- **HM:** HM5

## BitLocker / TPM

### `BitLocker Drive Encryption recovery has been initiated for volume <X>.`
- **Likely meaning:** BitLocker channel event. Recovery key prompt was triggered. Identify what changed in TPM PCR / boot config / firmware.
- **HM:** HM6

### `TPM measurement has changed. Previous PCR <X> hash: <Y>. Current: <Z>.`
- **Likely meaning:** TPM PCR change. Often correlated with firmware updates, secure boot config changes, or driver loads.
- **HM:** HM6

## AD Replication

### `The replication operation for the directory partition <X> failed because the destination server <Y> is not reachable.`
- **Likely meaning:** Directory Service event indicating network-level replication failure between DCs.
- **HM:** HM8

### `Active Directory replication intersite messaging service <action>.`
- **Likely meaning:** ISM service events; often relate to inter-site replication health.
- **HM:** HM8

## Network

### `The network adapter <X> has linked at <Y> Mbps full duplex.`
- **Likely meaning:** NIC link-up event. Useful as `disappeared` signal when the link goes down between snapshots.
- **HM:** HM10, HM2 (slow logon over network)

### `Name resolution for the name <X> timed out after none of the configured DNS servers responded.`
- **Likely meaning:** DNS-Client event 1014. DNS timeout; can cascade to many issues including HM2, HM8, HM10.
- **HM:** HM2, HM8, HM10

### `The system time has changed to <X> from <Y>.`
- **Likely meaning:** Time-Service event 1. Time was adjusted. If from external NTP source, expected; if drift was already happening, may explain Kerberos issues.
- **HM:** HM2, HM8

## Defender / EDR

### `Microsoft Defender Antivirus has detected malware or other potentially unwanted software.`
- **Likely meaning:** Defender event. Threat detected; check the file path and threat name. Can indicate either a real threat or a false positive blocking legitimate software (cross-vendor pattern).
- **HM:** cross-vendor (EDR blocking RMM/backup), HM10

### `Microsoft Defender Antivirus has scanned <N> items.`
- **Likely meaning:** Defender scheduled scan event. Useful for HM3 (CPU spike correlation - scan in progress = MsMpEng.exe high CPU).
- **HM:** HM3 (correlation)

## Certificate

### `Successful auto enrollment for certificate template <X>.`
- **Likely meaning:** CAPI2 event. Cert was renewed successfully.
- **HM:** HM9 (as absence - if expected and not happening, cert may expire)

### `Auto enrollment failed for certificate template <X>.`
- **Likely meaning:** CAPI2 event. Cert renewal failed; the cert it was renewing may expire.
- **HM:** HM9

---

## How patterns relate to anomaly indicators

When the local detector flags an event with `anomaly_categories`:
- `unexpected_state` often correlates with patterns like "service entered Stopped state" when the rule expects Running.
- `unexpected_state_change` often correlates with patterns like "VSS writer is in state Failed."
- `expected_change_missing` correlates with absence of patterns like "Successful auto enrollment" within the expected window.
- `spike` correlates with sudden increase in a known pattern's frequency.

The catalog entries above include `HM` tags so you can cross-reference: when investigating HM<N>, the catalog's HM-tagged patterns are the most relevant.

---

## Maintenance

This catalog updates when:
- A recurring pattern is observed and added to the catalog.
- A pattern's likely meaning is corrected based on real investigation outcomes.
- New vendor products produce patterns we haven't catalogued.
- Quarterly review.
