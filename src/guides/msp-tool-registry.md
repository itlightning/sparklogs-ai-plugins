# MSP Tool Registry

Common MSP tools, their Windows service names, and the `app` (LQL) token SparkLogs stamps on events about those services (a vendor service that crashed, stopped or failed to start).

Use it two ways:

- A symptom names a product ("Veeam reports backup failed"): filter on its `app` (LQL) token for its service events, and check its services in device state. A product's own job or detection results are not curated; vendor text the product writes to Application or System arrives uncurated with an empty `app` (LQL).
- Device state lists a service you do not recognize: find the product here before treating it as unknown.

Service names are the vendors' install defaults and change between versions.
Before saying a product is absent or stopped, read the device's `latest_state` (value) on topics `services` (value) and `installed_products` (value), and match on what the device reported (`sparklogs.data.services[].name` (LQL)).
An empty token cell means the pack stamps no token for that product: its events, if any, arrive on the Windows Event Log feeds with an empty `app` (LQL).
The full token list is `guides/app-vocabulary.md`.

## RMM (Remote Monitoring and Management)

| Tool | Service name(s) | `app` (LQL) |
|---|---|---|
| ConnectWise Automate | `LTService`, `LTSvcMon` | `connectwise` (value) |
| NinjaOne | `NinjaRMMAgent` | `ninjaone` (value) |
| Datto RMM | `CagService` | `datto` (value) |
| Kaseya VSA | `KaseyaAgentService`, `KaseyaTools` | |
| Atera | `AteraAgent` | `atera` (value) |
| N-able N-central | `Windows Agent Service`, `Windows Agent Maintenance Service` | `nable` (value) |
| Syncro | `SyncroLive.Service`, `SyncroLive.Agent` | |
| Action1 | `Action1Agent` | |

## Backup / BCDR

| Tool | Service name(s) | `app` (LQL) |
|---|---|---|
| Veeam Backup & Replication | `VeeamBackupSvc`, `VeeamCatalogSvc`, `VeeamCloudSvc`, `VeeamMountSvc`, `VeeamNFSSvc`, `VeeamTransportSvc` | `veeam` (value) |
| Veeam Agent for Windows | `VeeamEndpointBackupSvc` | `veeam` (value) |
| Datto BCDR (SIRIS/ALTO) agent | `Datto Agent`, `Datto Windows Agent` | `datto` (value) |
| Acronis Cyber Protect | `AcronisAgent`, `AcronisVssProvider` | `acronis` (value) |
| Cove Data Protection (N-able) | `BackupFP` | `nable` (value) |
| MSP360 (CloudBerry) | `Online Backup Service` | |
| Axcient x360Recover | `Axcient Agent` | `axcient` (value) |
| Slide | | `slide` (value) |
| Macrium Reflect | | `macrium` (value) |

## Endpoint Security (AV / EDR / XDR)

| Tool | Service name(s) | `app` (LQL) |
|---|---|---|
| SentinelOne | `SentinelAgent`, `LogProcessorService` | `sentinelone` (value) |
| CrowdStrike Falcon | `CSAgent`, `CSFalconService` | `crowdstrike` (value) |
| Sophos Intercept X | `Sophos Endpoint Defense Service`, `Sophos AutoUpdate Service`, `Sophos MCS Agent` | |
| Microsoft Defender Antivirus | `WinDefend` | `windows_defender` (value) |
| Microsoft Defender for Endpoint | `Sense` | |
| Huntress | `HuntressAgent`, `HuntressUpdater`, `HuntressRio` | `huntress` (value) |
| ThreatLocker | `ThreatLockerService` | |
| Bitdefender GravityZone | `EPSecurityService`, `EPProtectedService` | `bitdefender` (value) |
| ESET Protect | `ekrn` (other) | `eset` (value) |
| Malwarebytes | `MBAMService`, `MBEndpointAgent` | `malwarebytes` (value) |
| Webroot SecureAnywhere | `WRSVC` | `webroot` (value) |

## Patch Management

| Tool | Service name(s) | `app` (LQL) |
|---|---|---|
| WSUS (server-side) | `WsusService` | |
| PDQ Deploy / PDQ Inventory | `PDQDeployService`, `PDQInventoryService` | |
| ManageEngine Patch Manager Plus | `Patch Manager Plus` | |
| Automox | `amagent` (other) | |
| Adaptiva | `Adaptiva Client` | |

Intune and other MDM management events arrive on the Windows Event Log feeds (`service = device_management` (LQL)), not under a product token.
