# Service taxonomy: the `service` ticket-class vocabulary

`service` is the curated cross-source ticket-class taxonomy: the MSP ticket class an event or
snapshot is **evidence for**. It is cross-OS and cross-vendor on purpose (Veeam, Acronis, and
Windows Server Backup all emit `service = "backup"`), so fleet-wide analysis spans vendors.
`app` is the complementary axis (product identity as users know it); a vendor spans services and a
service spans vendors; neither nests in the other.

Values are snake_case and registry-gated: the authoritative additive-only registry is
`service_vocabulary` in the SparkLogs source library (`registry.yaml`). Values are never renamed or
removed. The table below covers every registry value; see the coverage contract at the end.

`service` is a conditional scope-ladder field: present when the source's shaping carries it, absent
otherwise (see `scope-ladder.md` for the degrade-gracefully rule). It is set per event; CONTEXT
(unlabeled) events can carry a service too (for example, Outlook context events on the Application
channel carry `service = "email"`).

## The vocabulary

| Service | Evidence that maps here |
|---|---|
| `storage` | Disk/NTFS/controller/StorPort/Storage Spaces events, SMART, chkdsk. Storage-related hardware lives here, not in `hardware`. |
| `patching` | OS and software updates AND installs (CBS/DISM/Windows Update/MSI/Setup channel/OEM and browser updaters). Install-vs-update rides `service_detail` where extractable. |
| `auth` | Identity and logon lifecycle: Kerberos/NTLM/lockout/LAPS/Winlogon/MFA brokers/NPS. |
| `security_audit` | Audit infrastructure, object/registry/file-share access auditing, audit policy and tamper, persistence signals (including the SCM 7045 service-install family). Deliberately evidence-flavored; the consumer is investigations, not a ticket queue. NOT the complete audit surface: see the demarcation list below. |
| `networking` | DHCP/DNS client, WLAN, NCSI, firewall. |
| `vpn` | RasClient, GlobalProtect/FortiClient/WARP, ZTNA clients. |
| `file_sharing` | SMB client/server, mapped drives, NAS/SharePoint access. |
| `file_sync` | OneDrive/Drive/Box sync clients. |
| `printing` | PrintService, PaperCut, Printix, print hardware. |
| `backup` | Veeam/Acronis/Windows Server Backup/VSS/VolSnap. |
| `os_stability` | BSOD/BugCheck, unexpected shutdown, boot failure, OS hang, OS-plane store corruption. |
| `app_stability` | Application Error/Hang/WER/.NET crashes; Windows service crash/hang/start-failure families. |
| `hardware` | Non-storage hardware catch-all: WHEA/ECC/PCIe, PnP and driver failures, thermal/battery, UPS, display/GPU, peripherals/docks. |
| `performance` | Slow boot/logon, resource pressure, performance-trend snapshots. |
| `user_profiles` | User Profile Service, FSLogix. |
| `remote_access` | RDP, TeamViewer/AnyDesk/ScreenConnect. |
| `rmm` | RMM agent health only (Automate/Kaseya/Ninja/Datto). An RMM-generated alert ticket routes by its underlying evidence class (a drive-space alert is `storage`). SparkLogs' own agent health files HERE too (owner-ruled, deliberate: it is a management agent); separate it with app=sparklogs_agent. |
| `endpoint_protection` | Defender/AV/EDR. |
| `device_management` | GPO/Intune/SCCM/MDM/Autopilot management plane (enrollment/sync/policy apply). The payload outcome of an install is `patching`. |
| `directory_services` | AD DS/DFSR/Netlogon, Entra Connect sync. |
| `certificates` | CAPI2/Schannel/AD CS. |
| `virtualization` | Hyper-V/VMware/Citrix. |
| `clustering` | Failover Clustering: quorum/CSV/witness, HA state. |
| `database` | SQL Server and LOB database engines. |
| `web` | IIS/HTTPERR, Apache/nginx. |
| `email` | Exchange transport / message tracking. Email-security and filtering products fold here, with `app` carrying the product. |
| `time_sync` | W32Time. Clock-skew tickets map to `time_sync` plus `auth`. |
| `licensing` | Windows/Office activation, KMS, RDS CAL grace. |
| `telephony` | PBX/VoIP (3CX and peers); a cross-source ticket class. |
| `scheduled_tasks` | TaskScheduler plus cron-type jobs with no payload-specific home. A backup job's task failure goes to `backup`. |
| `inventory` | Pure inventory/context (system info, installed products); serves every investigation type. |

## Audit-adjacent events homed elsewhere (demarcation list)

`service = "security_audit"` is **not** the complete audit surface. An event gets exactly one
`service`: the ticket class it is evidence for. Security-channel evidence whose consequence belongs
to a ticket class is homed under that class; the security/forensic angle is carried by `reason`,
channel, and `category`, never duplicated into a second event or a second service.

Maintained list (grows as Windows Event Log modules land):

- `network_share_added` (Security 5142) -> `file_sharing`.
- `firewall_rule_changed` (Security MPSSVC rule-change family) -> `networking`.
- The service-install 7045 family is `security_audit`, but its default-on witness lives on the
  **System** channel (SCM 7045); the Security-channel 4697 copy requires audit policy.
- The same homing rule applies to auth lifecycle (-> `auth`), CA events (-> `certificates`), and
  directory object changes (-> `directory_services`) as those rows ship.

**Rule for forensic/audit sweeps: pivot on reason slugs, channel (`subsource`), and `category`,
never on `service = "security_audit"` alone.**

## Coverage contract

This table covers every `service_vocabulary` value in the source-library registry (additive-only).
`yarn run validate` (`scripts/validate-skills.mjs`) fails when this table drifts from its pinned
registry snapshot. When the registry adds a value, add its row here and to the validator's pinned
list in the same change.
