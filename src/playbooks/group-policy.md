---
index: Group Policy not applying
aliases:
  - label: Group Policy slow at startup or logon
  - label: Mapped drive, printer or shortcut from policy missing
---

# Group Policy not applying

**Trigger.** "The new policy is not reaching this PC", "the mapped drive or printer did not appear", "settings we pushed are missing", "startup sits on Applying computer settings", or a run of Group Policy reasons on a device.

**Accuracy.** Windows records every Group Policy pass in Microsoft-Windows-GroupPolicy/Operational, and SparkLogs collects that channel beyond the curated events: the start and end of each pass with its duration, the domain controller it found and how long that took, the link speed it measured, the policy objects that applied and those filtered out, and each extension's result and time.
Most of those records are Debug or Info. Do not filter by severity: the success records are what prove a pass worked.
A pass that ends with "Completed ... policy processing" (8000 to 8007) or a System success (1500 to 1503) applied what the domain served at that moment. It does not prove the policy object holds the setting the ticket expects, or that a setting outside Group Policy did not override it.
Group Policy says which object it applied and which extension failed. It does not say which setting inside an object is wrong; that is `gpresult /h` on the device and the Group Policy Management console.
An empty result is not health. A device with no Group Policy rows may be a workgroup or Entra-only device that has no domain policy, a device that never booted or signed in during the window, or a device whose channel was not collected: check the agent's feed health for `win.eventlog.identity_security` (value) first.

**Feeds.** Group Policy Operational, curated and raw, is `subsource` (LQL) `win.eventlog.identity_security` (value), `origin` (LQL) `Microsoft-Windows-GroupPolicy/Operational`: `feeds/win.eventlog.identity_security/reasons.md` and `fields.md`.
The pass and discovery failures on it carry `win.eventlog.identity_security.gp_connectivity_failure` (LQL), `win.eventlog.identity_security.gp_is_machine` (LQL), `win.eventlog.identity_security.gp_elapsed_seconds` (LQL), `win.eventlog.identity_security.gp_dc_discovery_ms` (LQL) and `win.eventlog.identity_security.gp_extension_name` (LQL).
The Windows error behind each failure is in the first line of the message (`error_code=` with its name) and raw as `event_data.ErrorCode` (LQL). It is the cause: read it before anything else.
The variant names the shape: `sparklogs.reason_variant` (LQL), such as `domain_unresolved` (other), `access_denied` (value), `share_unreachable` (other), `no_network` (other), `deferred` (other).
The System log carries the pass result Windows shows administrators (`win.eventlog.system` (value): `group_policy_processing_failed` (value) for 1129, `group_policy_software_install_failed` (value), `domain_secure_channel_failed` (value)) and uncurated Group Policy errors, each with `event_data.ErrorCode` (LQL) and often `event_data.DCName` (LQL) and `event_data.FilePath` (LQL).
Group Policy Preferences (drive maps, printers, shortcuts, files, local groups) write to `win.eventlog.application` (value), one provider per extension (`Group Policy Drive Maps`, `Group Policy Printers`, ...): `feeds/win.eventlog.application/reasons.md`. Drive maps carry `win.eventlog.application.drive` (LQL) and `win.eventlog.application.share` (LQL).
All of it is service `device_management` (value), together with MDM and Intune.

**Which layer failed.** A pass runs in order: find a domain controller, read the account and the list of policy objects from the directory, read each object's files from SYSVOL, then run each client-side extension. The first layer that failed is the one to fix.

| What failed | Witness | Usual cause |
|---|---|---|
| No domain controller found | `group_policy_domain_controller_unresolved` (value) (7017, 7320, 7326), System 1054 or 1055 | Off the corporate network, DNS not pointing at the domain's DNS servers, VPN not up yet |
| A controller answered and refused the machine | `group_policy_domain_controller_unresolved` (value) `access_denied` (value), `domain_secure_channel_failed` (value) with a trust code, System 1006 or 1030 with 1326 | Broken machine account or secure channel, clock skew |
| The whole pass failed | `group_policy_processing_failed` (value) (System 1129, Operational 7000 and 7001), System 1030, 1079, 1125, 1127 | Lost network at boot or logon; on a fixed machine, DNS or a controller problem |
| A policy object's files could not be read | System 1058 with the GPT.INI path, 7017 naming a SYSVOL file | SYSVOL not reachable, or the object's folder missing from SYSVOL on that controller |
| One extension failed | `group_policy_extension_apply_failed` (value) (6016, 7016, Application 8194), System 1085 | That extension's own target: a share, a printer driver, an installer, MDM enrollment |
| One preference item failed | `group_policy_drive_map_failed` (value), `group_policy_preference_item_failed` (value) | The item's share, path, stored password or drive letter |
| Software did not install | `group_policy_software_install_failed` (value) | Deferred to the next restart (1274), package share unreadable (1612), the package itself (1603) |
| A script failed | System 1130 with the script and the error | Script missing (2), share not reachable (53, 67), permissions (5) |

7017 is Windows reporting that one call failed, and its message names the call: the account lookup, the LDAP bind to a named controller, or a read of a file on SYSVOL. Read it before trusting the variant: a SYSVOL file read that failed is the files layer, whatever the variant says.

**Not failures.** Code 1274 (put off to the next foreground pass) and code 1252 (nothing changed) on an extension, and the Software Installation deferral records that come with them, ship at Info.
7320 with access denied on a workgroup or Entra-only device is Windows' routine access check, written at every refresh, and ships unlabeled at Info.
Discovery and connectivity failures on a laptop away from the office, followed by a successful pass once it is back, are expected.
The MDM Policy extension failing with 2149056522 (0x8018000A, the device is already enrolled) on every refresh of a hybrid-joined device already in Intune is expected behaviour that Microsoft documents; it does not stop other extensions.

**Device health first.** `query_device_health` (tool); views and how to read them: `guides/device-state-fields.md` (**Choose the view**).

- The device's system identity in its current state: `sparklogs.data.system_info.domain_join_type` (LQL) (`ad` (other), `hybrid` (other), `entra` (other) or `workgroup` (other)), `sparklogs.data.system_info.domain_or_workgroup` (LQL) and the host class and chassis. A workgroup or Entra-only device gets no domain Group Policy at all: its policy comes from Intune or local policy, and domain-controller errors on it are not a policy problem. `domain_membership_changed` (value) says when the join changed.
- The device's network reading over the failure times: DNS and gateway outages, link drops, Wi-Fi drops, network changes, and TCP by route class (LAN, VPN, internet). A failed pass at a boot with the link down, Wi-Fi not yet joined or no VPN connection is the network's story: `playbooks/network-connectivity.md`.
- Its adapters in the current state: `sparklogs.data.network_adapters[].dns_servers` (LQL) and `sparklogs.data.network_adapters[].dns_suffix` (LQL). A domain device must resolve through the domain's DNS servers. A public resolver or a home router listed first means the domain name does not resolve, even on the office network. `network_adapter_static_dns_changed` (value) says when the servers changed.

**Events, for what health named.** The device's curated Group Policy and domain-reach failures:

```lql
source = "<host>" AND sparklogs.reason in (group_policy_domain_controller_unresolved, group_policy_processing_failed, group_policy_extension_apply_failed, group_policy_drive_map_failed, group_policy_preference_item_failed, group_policy_software_install_failed, group_policy_file_share_unhardened, domain_secure_channel_failed)
```

Group by `sparklogs.reason` (LQL) and `sparklogs.reason_variant` (LQL), then read the error code on a few rows of each group.

Windows' own Group Policy errors on the System log that SparkLogs does not curate. Several of these name the cause outright: 1054 (no controller name, often 1355), 1055 (the computer name did not resolve), 1058 (a policy object's GPT.INI could not be read, with its path), 1006 (LDAP bind refused, 49 is invalid credentials), 1030 (the pass could not get new settings), 1096 (registry policy could not be applied, often a damaged Registry.pol), 1110 (user and computer forest could not be compared), 1130 (a logon or startup script failed):

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-GroupPolicy" AND event_id in (1006, 1030, 1053, 1054, 1055, 1058, 1079, 1085, 1096, 1110, 1125, 1126, 1127, 1130)
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_id` (LQL) and `event_data.ErrorCode` (LQL). 1058 carries `event_data.FilePath` (LQL) and `event_data.DCName` (LQL).

Did any pass succeed, and how long did each take:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-GroupPolicy" AND event_id in (8000, 8001, 8002, 8003, 8004, 8005, 8006, 8007)
```
<!-- confirmed with data on 2026-11-12 -->

8000 is computer policy at boot, 8001 user policy at logon, 8002 and 8003 after a network change, 8004 and 8005 a manual `gpupdate` (other), 8006 and 8007 the background refresh. `event_data.PolicyElaspedTimeInSeconds` (LQL) is the pass duration and `event_data.PrincipalSamName` (LQL) the computer or user.
A device whose last failures are followed by completed passes has recovered: report the failure window, not a standing fault.

Which domain controller it found, how fast, and what link it measured:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-GroupPolicy" AND event_id in (5308, 5314, 5322, 5326, 6314)
```
<!-- confirmed with data on 2026-11-12 -->

5326 gives discovery time, 5308 the controller's name and address, 5314 the estimated bandwidth and whether it counted as a slow link, 6314 a failed estimate (Windows then assumes a fast link), 5322 how long the boot waited for the network.

**Policy not reaching a device.** When the pass succeeds but a setting is missing, check whether the object applied at all:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-GroupPolicy" AND event_id in (5312, 5313)
```
<!-- confirmed with data on 2026-11-12 -->

5312 lists the objects that applied, 5313 those filtered out and why: denied by security filtering, a WMI filter that evaluated false, an object that is empty or disabled.
An object missing from both lists is not linked to the device's or user's organizational unit, or the device is in another unit than expected: the account's distinguished name is in 5310 and 5017.
Loopback mode (5311) changes which user settings apply on terminal servers and kiosks.
A setting that applied but did not hold is something else writing the same key: Intune, a script, the RMM, or the user. Compare the change's time against `playbooks/what-changed.md`.

**Slow startup or logon from Group Policy.** Long `event_data.PolicyElaspedTimeInSeconds` (LQL) on 8000 or 8001 is time the user waited.
Find the extension that took it:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-GroupPolicy" AND event_id in (5016, 7016) AND event_data.CSEElaspedTimeInMilliSeconds >= 10000
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_data.CSEExtensionName` (LQL).
Printers (driver downloads), Drive Maps and Files (a server that does not answer), Folder Redirection and Software Installation are the usual slow ones; an extension with network-path errors and long times is waiting on a share or server.
Long discovery (`win.eventlog.identity_security.gp_dc_discovery_ms` (LQL), 5326), a boot that waited the full time for the network (5322 near 120000 ms), or an LDAP bind in 7017 that took minutes, is the device reaching its controller badly: a slow or dropping Wi-Fi link, DHCP renewal failing at startup, or a VPN carrying the whole pass.
Synchronous foreground processing ("Always wait for the network at computer startup and logon") makes every boot and logon wait for that.
The rest of a slow sign-in, profile load, authentication and the machine's load: `playbooks/slow-logon.md`.

**Common causes and their evidence.**

- **Off the corporate network or VPN-only.** `domain_unresolved` (other) (1355), 1129 with 1222, 7000 or 7001 with the connectivity flag, on a laptop at boot or logon, often next to `nic_link_down` (value), `wlan_disconnected` (value) or Entra token failures that could not reach the server. A VPN that connects after sign-in means foreground policy never sees the domain; background refreshes over the VPN later in the day apply most settings, but folder redirection and software installation wait for a foreground pass, and logon scripts run only at logon. Look for 8006 or 8002 completing while the VPN is up.
- **DNS.** A fixed desktop or server with 1355 or 1054 while its network is fine. Read the adapter DNS servers above, then `dns_client_resolution_timed_out` (value) and the DNS probe on the network reading.
- **Subnet not in a site.** 7320 with 1919 (ERROR_NO_SITENAME, "Computer determined to be not in a site") while 5326 still finds a controller. Policy applies, but the device can pick a distant controller. A new office, VPN pool or Wi-Fi subnet was not added to Active Directory Sites and Services. The domain controllers log NETLOGON 5807 for clients in subnets that map to no site.
- **Machine account or secure channel broken.** `access_denied` (value) (5) on a domain-joined device, `domain_secure_channel_failed` (value) with a trust code (1789, 1787, 5), System 1006 with 49 or 1030 with 1326. A restored image, a reset computer account, or the same name joined twice. Check the clock too: Kerberos fails beyond five minutes of skew (`time_sync_failed` (value)). Repair is `Test-ComputerSecureChannel -Repair` or a rejoin.
- **SYSVOL.** System 1058 with the object's GPT.INI path. Error 3 (path not found) is an object that exists in the directory but whose folder is missing from SYSVOL on the controller that answered, a SYSVOL replication problem: `playbooks/directory-replication-failure.md`. 53 or 67 is the share not reachable from this device. Several devices failing on the same object name the object; several objects failing on one controller name the controller.
- **A failing extension.** Read `win.eventlog.identity_security.gp_extension_name` (LQL) with the code. Printers failing with access denied or a driver error usually meet the Point and Print restrictions Windows tightened for printer drivers: the driver must be preinstalled or the restriction policy set. Software Installation with 1612 cannot read the package share as the computer account. Security extension access denied is a permissions problem on the object itself.
- **A preference item.** `group_policy_drive_map_failed` (value) by `win.eventlog.application.share` (LQL): 67 or 55 is the server, 86 a stored password the server refuses (and a lockout risk), 85 a letter already in use. File share access and SMB problems behind a drive map are their own story, covered by `playbooks/file-share-access.md`.
- **Policy content.** 1096 or a damaged Registry.pol stops registry policy for every object; Windows logs the path.

**One device or many.** Run the reason or the System query over the organization grouped by `source` (LQL), then by `event_data.FilePath` (LQL) for 1058 or `win.eventlog.application.share` (LQL) for drive maps.
Many devices at one site failing at once points at what they share: the site's DNS, the link to the controllers, a controller, or one policy object.
Laptops failing only away from the office and recovering in it are working as designed.
The domain controllers' own view, when they run the agent: NETLOGON 5807 (clients outside any site), 5781 (the controller could not register its DNS records, so clients cannot find it), 5805 and 5723 (a machine failed to authenticate or has no account):

```lql
provider_name = "NETLOGON" AND event_id in (5781, 5783, 5805, 5807, 5722, 5723)
```
<!-- confirmed with data on 2026-11-12 -->

5783 is the client side: its session to a named controller stopped responding. SYSVOL replication between controllers: `playbooks/directory-replication-failure.md`.

**What changed before it started.** A new or edited policy object, a moved organizational unit, new DNS servers, a new VPN client or a domain controller retired just before the first failure: `playbooks/what-changed.md`. Edits made in the Group Policy Management console do not appear on the device; their effect does.

**Not this playbook.** Intune and MDM policy on Entra-joined devices: `mdm_policy_apply_failed` (value) on `win.eventlog.management` (value). Domain sign-in failing: `playbooks/slow-logon.md`. Scheduled tasks a preference item created and that then fail are covered by `playbooks/scheduled-task-failures.md`.

**When to stop.** The device's records name the layer and the code. When the cause is a policy object's content, its security filtering or linking, or a controller without the agent, report the object, the code and the time, and hand off to the Group Policy Management console and `gpresult /h` on the device.

**Off-endpoint** (HM19): the policy objects and their links, filters and permissions in the directory; domain controllers and SYSVOL replication without the agent; DNS servers; AD Sites and Services subnets; the VPN and the link between site and controllers; print servers and file servers that preferences point at.
