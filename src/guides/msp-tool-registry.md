# MSP Tool Registry

A compact registry of common MSP tools to recognize during investigations. Covers the most common tools per category; expands over time.

Per entry: tool name, category, OS, typical service name(s), typical install path, typical log location, typical SparkLogs `app` (LQL) field value when ingested, primary investigation contexts where it surfaces, vendor docs URL.

Read this file when investigating any symptom that involves a specific vendor product or where you need to
discover likely log file locations for analysis.

---

## RMM (Remote Monitoring and Management)

| Tool | OS | Service name(s) | Install path | Log location | SparkLogs `app` (LQL) | HM | Docs |
|---|---|---|---|---|---|---|---|
| ConnectWise Automate | Win | `LTService`, `LTSvcMon` | `<Prog>/LabTech/Service/` | `<Prog>/LabTech/Service/Logs/` | `connectwise-automate/...` | HM10, HM4 | https://docs.connectwise.com/ConnectWise_Automate_Documentation |
| ConnectWise RMM | Win | `Datto.RMM.Agent` | `<Prog>/CentraStage/` | `<Prog>/CentraStage/Logs/` | `connectwise-rmm/...` | HM10 | https://docs.connectwise.com/ConnectWise |
| NinjaOne | Win | `NinjaRMMAgent` | `<Prog>/NinjaRMMAgent/` | `<Prog>/NinjaRMMAgent/Logs/` | `ninjaone/...` | HM10 | https://www.ninjaone.com/docs/ |
| Datto RMM | Win | `CagService`, `Datto.RMM.Agent` | `<Prog>/CentraStage/` | `<Prog>/CentraStage/Logs/` | `datto-rmm/...` | HM10 | https://helpdesk.kaseya.com/hc/en-gb#/unified_backup |
| Kaseya VSA | Win | `KaseyaAgentService`, `KaseyaTools` | `<Prog>/Kaseya/Agent/` | `<Prog>/Kaseya/Agent/Logs/` | `kaseya-vsa/...` | HM10 | helpdesk.kaseya.com |
| Atera | Win/Mac | `AteraAgent` | `<Prog>/ATERA Networks/` | varies | `atera/...` | HM10 | support.atera.com |
| N-able N-central | Win | `N-Central Agent`, `Windows Agent Maintenance` | `<Prog>/N-able Technologies/Windows Agent/` | `<Prog>/N-able Technologies/Windows Agent/Logs/` | `nable-ncentral/...` | HM10 | documentation.n-able.com |
| Syncro | Win/Mac | `SyncroLive.Service`, `SyncroLive.Agent` | `<Prog>/RepairShop/` | varies | `syncro/...` | HM10 | help.syncromsp.com |
| Action1 | Win | `Action1Agent` | `<Prog>/Action1/Agent/` | `<Prog>/Action1/Agent/Logs/` | `action1/...` | HM10, HM4 | action1.com/docs |

## Backup / BCDR

| Tool | OS | Service name(s) | Install path | Log location | SparkLogs `app` (LQL) | HM |
|---|---|---|---|---|---|---|
| Veeam Backup & Replication | Win | `VeeamBackupSvc`, `VeeamCatalogSvc`, `VeeamCloudSvc`, `VeeamMountSvc`, `VeeamNFSSvc`, `VeeamTransportSvc` | `<Prog>/Veeam/Backup and Replication/` | `<Prog>/Veeam/Backup and Replication/Backup/` and `<ProgramData>/Veeam/Backup/` | `veeam/...` | HM1 |
| Veeam Agent | Win | `VeeamEndpointBackupSvc` | `<Prog>/Veeam/Endpoint Backup/` | `<ProgramData>/Veeam/Endpoint Backup/` | `veeam-agent/...` | HM1 |
| Datto BCDR (SIRIS/ALTO) | Win | `Datto Agent`, `Datto Windows Agent` | `<Prog>/Datto/` | `<Prog>/Datto/Logs/` | `datto-bcdr/...` | HM1 |
| Acronis Cyber Protect | Win | `AcronisAgent`, `AcronisVssProvider` | `<Prog>/Acronis/Agent/` | `<ProgramData>/Acronis/Agent/Logs/` | `acronis/...` | HM1 |
| Cove Data Protection (N-able) | Win | `BackupFP` | `<Prog>/Backup Manager/` | `<Prog>/Backup Manager/Logs/` | `cove/...` | HM1 |
| MSP360 (CloudBerry) | Win | `Online Backup Service` | `<Prog>/MSP360/` | `<Prog>/MSP360/Logs/` | `msp360/...` | HM1 |
| Axcient x360Recover | Win | `Axcient Agent` | `<Prog>/Axcient/` | `<Prog>/Axcient/Logs/` | `axcient/...` | HM1 |

## Endpoint Security (AV / EDR / XDR)

| Tool | OS | Service name(s) | Install path | Log location | SparkLogs `app` (LQL) | HM |
|---|---|---|---|---|---|---|
| SentinelOne | Win/Mac | `SentinelAgent`, `LogProcessorService` | `<Prog>/SentinelOne/Sentinel Agent/` | varies (cloud-side) | `sentinelone/...` | HM10, HM1 |
| CrowdStrike Falcon | Win | `CSAgent`, `CSFalconService` | `<Prog>/CrowdStrike/` | varies (cloud-side) | `crowdstrike/...` | HM10 |
| Sophos Intercept X | Win/Mac | `Sophos Endpoint Defense Service`, `Sophos AutoUpdate Service`, `Sophos MCS Agent` | `<Prog>/Sophos/Sophos Endpoint Defense/` | `<ProgramData>/Sophos/Sophos Endpoint Defense/Logs/` | `sophos/...` | HM10, HM1 |
| Microsoft Defender for Endpoint | Win | `WinDefend`, `Sense` (MDE) | OS-bundled | winlog Microsoft-Windows-Windows Defender + winlog Microsoft-Windows-SENSE | `defender/...` | HM3 (CPU), HM10 |
| Huntress Managed EDR | Win | `HuntressAgent`, `HuntressUpdater`, `HuntressRio` | `<Prog>/Huntress/` | `<Prog>/Huntress/Logs/` | `huntress/...` | HM10 |
| ThreatLocker | Win | `ThreatLockerService` | `<Prog>/ThreatLocker/` | `<Prog>/ThreatLocker/Logs/` | `threatlocker/...` | HM10, cross-vendor scripting blocks |
| Bitdefender GravityZone | Win | `EPSecurityService`, `EPProtectedService` | `<Prog>/Bitdefender/Endpoint Security/` | `<ProgramData>/Bitdefender/Endpoint Security/Logs/` | `bitdefender/...` | HM10 |
| ESET Protect | Win | `ekrn` (other), `ESET Service` | `<Prog>/ESET/ESET Endpoint Antivirus/` | `<ProgramData>/ESET/ESET Endpoint Antivirus/Logs/` | `eset/...` | HM10 |
| Malwarebytes | Win | `MBAMService`, `MBEndpointAgent` | `<Prog>/Malwarebytes/` | varies | `malwarebytes/...` | HM10 |

## Firewalls / Network

| Tool | Type | Source format | SparkLogs `app` (LQL) | HM |
|---|---|---|---|---|
| FortiGate | Edge firewall | syslog (CEF, key-value) | `firewall/fortigate/...` | HM10, cross-vendor |
| SonicWall | Edge firewall | syslog | `firewall/sonicwall/...` | HM10 |
| Cisco Meraki MX | Edge firewall | syslog | `firewall/meraki/...` | HM10 |
| WatchGuard Firebox | Edge firewall | syslog | `firewall/watchguard/...` | HM10 |
| pfSense / Netgate | Edge firewall | syslog | `firewall/pfsense/...` | HM10 |
| Sophos XG | Edge firewall | syslog | `firewall/sophos-xg/...` | HM10 |
| Ubiquiti UDM | Edge firewall | syslog | `firewall/ubiquiti/...` | HM10 |

## Patch Management

| Tool | OS | Service name(s) | SparkLogs `app` (LQL) | HM |
|---|---|---|---|---|
| WSUS (server-side) | Win Server | `WsusService` | `wsus/...` | HM4 |
| Microsoft Endpoint Manager / Intune | Hybrid | OS-bundled (Intune Management Extension on managed device) | winlog Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider | HM4 |
| PDQ Deploy / PDQ Inventory | Win | `PDQDeployService`, `PDQInventoryService` | `pdq/...` | HM4 |
| ManageEngine Patch Manager Plus | Win | `Patch Manager Plus` | `manageengine-pmp/...` | HM4 |
| Automox | Win/Mac | `amagent` (other) | `automox/...` | HM4 |
| Adaptiva | Win | `Adaptiva Client` | `adaptiva/...` | HM4 |

## Common Windows Event Log channels for HM mapping

| Channel | What it carries | HM |
|---|---|---|
| `Application` | App-level events; vendor app errors | HM4, HM7, all app investigations |
| `System` | OS-level events; driver loads, kernel power | HM3, HM6, HM7 |
| `Security` | Auth events; 4624/4625/4634/4647 logon | HM2 |
| `Setup` | Servicing-stack and Setup events | HM4, HM6 |
| `Microsoft-Windows-WindowsUpdateClient/Operational` | Windows Update client events | HM4 |
| `Microsoft-Windows-Backup/Operational` | Windows Server Backup | HM1 |
| `Microsoft-Windows-VSS` | VSS service operational events | HM1 |
| `Microsoft-Windows-Windows Defender/Operational` | Defender events | HM10, HM3 (CPU spike from scan) |
| `Microsoft-Windows-BitLocker/BitLocker Management` | BitLocker events | HM6 |
| `Microsoft-Windows-StorageManagement/Operational` | Storage events | HM7 |
| `Microsoft-Windows-Kernel-Power` | Power state events; Event ID 41 (unexpected shutdown) | HM5 (offline endpoint scenarios) |
| `Microsoft-Windows-NetworkProfile/Operational` | Network state changes | HM10 |
| `Microsoft-Windows-CAPI2/Operational` | Cert install/delete events | HM9 |
| `Microsoft-Windows-DNS-Client/Operational` | DNS-client resolution events | HM2, HM10 |
| `Microsoft-Windows-Time-Service/Operational` | W32Time events | HM2, HM8 |
| `Directory Service` | AD service events | HM8 |
| `DFS Replication` | DFSR events | HM8 |
| `Microsoft-Windows-GroupPolicy/Operational` | GPO processing events | HM2 |
| `Microsoft-Windows-User Profile Service/Operational` | Profile load events | HM2 |
| `Microsoft-Windows-SMBServer/Operational` | SMB server events | HM2 (file share access), HM5 (slow share) |
| `Microsoft-Windows-WindowsBackup/ActionCenter` | Backup notifications | HM1 |
| `Microsoft-Windows-PowerShell/Operational` | PowerShell execution events | various; cross-vendor scripting issues |
| `Microsoft-Windows-TaskScheduler/Operational` | Scheduled task events | HM4 (update-related tasks), HM1 (backup tasks) |

---

## How to use this registry

When investigating:
1. If the symptom names a specific vendor product (e.g., "Veeam reports backup failed"), look up the vendor here for service names, log paths, and HM mapping.
2. If you see unexpected services in state.services, check the registry - recognize MSP-tool services so you can frame them correctly.

---
