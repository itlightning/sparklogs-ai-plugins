# Service taxonomy: the `service` (LQL) ticket-class vocabulary

`service` (LQL) is the curated cross-source ticket-class taxonomy: the MSP ticket class an event or
snapshot is **evidence for**. It is cross-OS and cross-vendor on purpose (Veeam, Acronis, and
Windows Server Backup service events all carry `service = "backup"` (LQL)), so fleet-wide analysis spans vendors.
`app` (LQL) is the complementary axis (product identity): `app-vocabulary.md`. A vendor spans services and a
service spans vendors; neither nests in the other.

Values are snake_case and drawn from a closed vocabulary. The set is additive-only:
values are never renamed and never removed, so a query written against one keeps working. The table
below is the whole vocabulary.

`service` (LQL) is a conditional scope-ladder field: present when the source's shaping carries it, absent
otherwise (see `scope-ladder.md` for the degrade-gracefully rule). It is set per event; CONTEXT
(unlabeled) events can carry a service too (for example, Outlook context events on the Application
channel carry `service = "email"` (LQL)).

## The vocabulary

| Service | Evidence that maps here |
|---|---|
| `storage` | Disk/NTFS/controller/StorPort/Storage Spaces events, SMART, chkdsk. Storage-related hardware lives here, not in `hardware`. |
| `patching` | OS and software updates AND installs (CBS/DISM/Windows Update/MSI/Setup channel/OEM and browser updaters). Install-vs-update rides `service_detail` (LQL) where extractable. |
| `auth` | Identity and logon lifecycle: Kerberos/NTLM/lockout/LAPS/Winlogon/MFA brokers/NPS. |
| `security_audit` | Audit infrastructure, object/registry/file-share access auditing, audit policy and tamper, persistence signals (including the SCM 7045 service-install family). Deliberately evidence-flavored; the consumer is investigations, not a ticket queue. NOT the complete set of audit-related events: see the demarcation list below. |
| `networking` | DHCP/DNS client, WLAN, NCSI, firewall. |
| `vpn` | RasClient, GlobalProtect/FortiClient/WARP, ZTNA clients. |
| `file_sharing` | SMB client/server, mapped drives, NAS/SharePoint access. |
| `file_sync` | OneDrive/Drive/Box sync clients. |
| `printing` | PrintService, PaperCut, Printix, print hardware. |
| `backup` | Veeam/Acronis/Windows Server Backup/VSS/VolSnap. |
| `os_stability` | BSOD/BugCheck, unexpected shutdown, boot failure, OS hang, OS-plane store corruption. |
| `app_stability` | Application Error/Hang/WER/.NET crashes; Windows service crash/hang/start-failure families. |
| `hardware` | Non-storage hardware catch-all: WHEA/ECC/PCIe, PnP and driver failures, thermal/battery, UPS, display/GPU, peripherals/docks. |
| `platform` | Device state for installed driver packages and other host platform configuration (driver install, update and removal, boot mode, CPU and hardware identity, domain membership, host roles). |
| `encryption` | BitLocker and device encryption, recovery-key backup. |
| `performance` | Slow boot/logon, resource pressure, performance-trend snapshots. |
| `user_profiles` | User Profile Service, FSLogix. |
| `remote_access` | RDP, TeamViewer/AnyDesk/ScreenConnect. |
| `rmm` | RMM agent health only (Automate/Kaseya/Ninja/Datto). An RMM-generated alert ticket routes by its underlying evidence class (a drive-space alert is `storage`). SparkLogs' own agent health also files under `rmm`; separate it with `app = sparklogs_agent` (LQL) and the System-channel `sparklogs_agent_started` and `sparklogs_agent_stopped` reasons. |
| `endpoint_protection` | Defender/AV/EDR. |
| `device_management` | GPO/Intune/SCCM/MDM/Autopilot management plane (enrollment/sync/policy apply). The payload outcome of an install is `patching`. |
| `directory_services` | AD DS/DFSR/Netlogon, Entra Connect sync. |
| `certificates` | CAPI2/Schannel/AD CS. |
| `virtualization` | Hyper-V/VMware/Citrix. |
| `clustering` | Failover Clustering: quorum/CSV/witness, HA state. |
| `database` | SQL Server and LOB database engines. |
| `web` | IIS/HTTPERR, Apache/nginx. |
| `email` | Exchange transport / message tracking. Email-security and filtering products fold here, with `app` (LQL) carrying the product. |
| `time_sync` | W32Time. Clock-skew tickets map to `time_sync` plus `auth`. |
| `licensing` | Windows/Office activation, KMS, RDS CAL grace. |
| `telephony` | PBX/VoIP (3CX and peers); a cross-source ticket class. |
| `scheduled_tasks` | TaskScheduler plus cron-type jobs with no payload-specific home. A backup job's task failure goes to `backup`. Task failures: `../playbooks/scheduled-task-failures.md`. |
| `inventory` | Pure inventory/context (system info, installed products); serves every investigation type. |

## Audit-adjacent events homed elsewhere (demarcation list)

`service = "security_audit"` (LQL) is **not** the complete set of audit-related events. An event gets exactly one
`service` (LQL): the ticket class it is evidence for. Security-channel evidence whose consequence belongs
to a ticket class is homed under that class; the security/forensic angle is carried by `sparklogs.reason` (LQL),
channel, and `category` (LQL), never duplicated into a second event or a second service.

Maintained list (grows as Windows Event Log modules land):

- `network_share_added` (Security 5142) -> `file_sharing`.
- `firewall_rule_changed` (Security MPSSVC rule-change family) -> `networking`.
- The service-install 7045 family is `security_audit`, but its default-on witness lives on the
  **System** channel (SCM 7045); the Security-channel 4697 copy requires audit policy.
- The same homing rule applies to auth lifecycle (-> `auth`), CA events (-> `certificates`), and
  directory object changes (-> `directory_services`) as those rows ship.

**Rule for forensic/audit sweeps: pivot on `sparklogs.reason` (LQL), channel (`subsource` (LQL)), and `category` (LQL),
never on `service = "security_audit"` (LQL) alone.**

## Coverage

This table is the complete `service` (LQL) vocabulary as of this plugin release; a validation check holds it to the source pack's registry.
A value you see in data and cannot find here: report it with `send_sparklogs_feedback` if the engineer agrees.
