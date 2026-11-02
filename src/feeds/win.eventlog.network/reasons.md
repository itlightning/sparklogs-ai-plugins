<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.network`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `dhcp_lease_denied` | dhcp lease denied | event | Warning | `networking` |  |
| `dhcp_lease_failed` | dhcp lease failed | event | Warning | `networking` |  |
| `dns_client_resolution_timed_out` | dns client resolution timed out | event | Display | `networking` |  |
| `firewall_rule_changed` | firewall rule changed | event | Verbose | `networking` |  |
| `firewall_rule_created` | firewall rule created | event | Debug to Verbose | `networking` |  |
| `firewall_rule_deleted` | firewall rule deleted | event | Debug to Notice | `networking` | benign possible |
| `ip_address_conflict_detected` | IP address conflict | event | Warning | `networking` |  |
| `ncsi_internet_lost` | ncsi internet lost | event | Notice to Warning | `networking` |  |
| `offline_files_slow_link_transition_blocked` | offline files slow link transition blocked | event | Warning | `file_sharing` |  |
| `offline_files_sync_failed` | offline files sync failed | event | Warning | `file_sharing` |  |
| `rds_redirected_printer_setup_failed` | rds redirected printer setup failed | event | Warning | `printing` |  |
| `smb_anonymous_access_denied` | smb anonymous access denied | event | Verbose to Warning | `file_sharing` |  |
| `smb_anonymous_access_enabled` | smb anonymous access enabled | event | Notice | `file_sharing` |  |
| `smb_client_auth_context_failed` | smb client auth context failed | event | Warning | `file_sharing` |  |
| `smb_client_mutual_auth_lost` | smb client mutual auth lost | event | Warning | `file_sharing` |  |
| `smb_client_security_call_slow` | smb client security call slow | event | Notice | `file_sharing` |  |
| `smb_connect_failed` | smb connect failed | event | Notice to Warning | `file_sharing` |  |
| `smb_insecure_guest_allowed` | smb insecure guest allowed | event | Warning | `file_sharing` |  |
| `smb_insecure_guest_rejected` | smb insecure guest rejected | event | Warning | `file_sharing` |  |
| `smb_legacy_dialect_rejected` | smb legacy dialect rejected | event | Notice | `file_sharing` |  |
| `smb_security_setting_nondefault` | smb security setting nondefault | event | Notice | `file_sharing` |  |
| `smb_server_name_unresolved` | smb server name unresolved | event | Display | `file_sharing` |  |
| `smb_server_operation_slow` | smb server operation slow | event | Notice | `file_sharing` |  |
| `smb_session_auth_failed` | smb session auth failed | event | Notice to Warning | `file_sharing` |  |
| `smb_session_lost` | smb session lost | event | Info to Display | `file_sharing` |  |
| `smb_session_reopen_failed` | smb session reopen failed | event | Warning | `file_sharing` |  |
| `smb_share_access_denied` | smb share access denied | event | Info | `file_sharing` |  |
| `smb_share_connection_lost` | smb share connection lost | event | Info to Display | `file_sharing` |  |
| `smb_signing_validation_failed` | smb signing validation failed | event | Warning | `file_sharing` |  |
| `wfp_transaction_watchdog_timeout` | wfp transaction watchdog timeout | event | Display | `networking` |  |
| `wlan_connect_failed` | wlan connect failed | event | Info to Warning | `networking` |  |
| `wlan_disconnected` | wlan disconnected | event | Notice | `networking` |  |
| `wlan_disconnected_by_request` | wlan disconnected by request | event | Display | `networking` |  |
| `wlan_security_handshake_failed` | wlan security handshake failed | event | Warning | `networking` |  |

## `dhcp_lease_denied`: dhcp lease denied

A DHCP server refused the address this device asked for.

**Severity:** Warning

**Why it matters:** Connections over the adapter drop while the client starts over and asks for a new address, and if no server offers one, the adapter has no working IPv4 address.

**In practice:** The DHCP client writes event 1002 to the Microsoft-Windows-Dhcp-Client/Admin log when a DHCP server answers its request with a negative acknowledgement (DHCPNAK). The event names the address and the server that refused it. A server refuses an address that is not valid on the subnet the device is now on, or that the scope no longer holds. A laptop that wakes on a different network and asks to keep its old address is the everyday case.

**When to ignore:** One refusal after a laptop moved to another network, followed by a working address.

**What to check:**

- Read the address and the refusing server on the event.
- A single refusal right after the device moved networks needs no action: the client asks for a new address on its own, and `ipconfig /renew` retries at once.
- Repeated refusals from one server: check that server's scope, exclusions and reservations, and look for a second DHCP server answering on the subnet.

**Related:**

- `dhcp_lease_failed`: no server answered at all, rather than one answering no

**Example:** A laptop that slept on the office network wakes at home and asks the home router to renew its office address.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#dhcp_lease_denied, https://sparklogs.com/reference/reasons/dhcp_lease_denied.json

## `dhcp_lease_failed`: dhcp lease failed

The DHCP client could not get or renew an address for an adapter.

**Severity:** Warning

**Why it matters:** A failed renewal keeps the current address until its lease runs out. A failed request leaves the adapter with no usable IPv4 address, so the device cannot reach anything past the local link.

**In practice:** The DHCP client writes event 1001 to the Microsoft-Windows-Dhcp-Client/Admin log when no DHCP server gave the adapter an address, and event 1003 when it could not renew the address it has. The event names the adapter's hardware address and the error, and the client keeps retrying on its own. Usual causes are a DHCP server or relay that is down or out of addresses, a switch port on the wrong VLAN, and 802.1X or port security holding the port closed.

**When to ignore:** A renewal failure on a laptop that left the network it got the lease on, when the next network gives it an address.

**What to check:**

- Run `ipconfig /all`, then `ipconfig /renew`, on the device.
- Check the DHCP scope for free addresses, and the relay (IP helper) for this subnet.
- Check the switch port's VLAN and any 802.1X or port security on it.

**Related:**

- `dhcp_lease_denied`: a server answered and refused the address
- `ip_address_conflict_detected`: an address was obtained, but another device already uses it

**Example:** A desktop moved to a new desk is plugged into a switch port on an unused VLAN, and no DHCP server answers.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#dhcp_lease_failed, https://sparklogs.com/reference/reasons/dhcp_lease_failed.json

## `dns_client_resolution_timed_out`: dns client resolution timed out

A DNS name lookup timed out because none of the configured DNS servers answered.

**Also reported by:** `win.eventlog.system`

**Severity:** Display

**Why it matters:** Whatever needed that name, such as a mapped drive, a web page or a sign-in, fails until a lookup succeeds.

**In practice:** The DNS client writes event 1013 to the Microsoft-Windows-DNS-Client/Operational log when a lookup for one name timed out after none of the DNS servers configured on the device answered. The System log records the same timeout as event 1014. The Operational log is off by default. A timeout means the servers did not answer: a missing record returns a negative answer straight away and does not write this event. A laptop waking before its network is up, or searching a VPN suffix while off the VPN, writes the occasional timeout.

**When to ignore:** An occasional timeout on a laptop that is waking, roaming or off its VPN, when lookups work again moments later.

**What to check:**

- Read the name on the event, then count how many different names time out in the same minutes.
- One name points at the DNS suffix or the forwarder for that zone. Many names point at the adapter's DNS servers or the path to them.
- Check the adapter's DNS servers with `ipconfig /all`, and test each with `Resolve-DnsName <name> -Server <address>`.

**Related:**

- `smb_server_name_unresolved`: a file-share server name that did not resolve, as the SMB client reports it

**Example:** A laptop wakes from sleep before Wi-Fi reconnects and the lookup for the company's mail server times out.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#dns_client_resolution_timed_out, https://sparklogs.com/reference/reasons/dns_client_resolution_timed_out.json

A host with the DNS client Operational log turned on can record one timeout twice, once from the System log and once from the Operational log; the subsource tells them apart.

## `firewall_rule_changed`: firewall rule changed

A Windows Firewall rule was changed.

**Also reported by:** `win.eventlog.security`

**Severity:** Verbose

**Why it matters:** A changed rule can open a port or program to the network, or block traffic that used to work. The record shows the rule's new settings, not whether traffic is now allowed.

**In practice:** Windows Firewall writes event 2005 or 2099, depending on the Windows version, to the Microsoft-Windows-Windows Firewall With Advanced Security/Firewall log when a rule is modified. The record names the rule and its new direction, action, profiles, protocol, ports and program, and the account and program that made the change. Windows services and application installers change their own rules all day, so these records ship at Verbose. A change by the firewall service, or by a SYSTEM service through a program other than netsh, PowerShell, cmd, WMI or the MMC console, is marked as maintenance.

**When to ignore:** Changes the firewall service or an installer makes to its own application's rules, when nobody is chasing a connection or exposure question.

**What to check:**

- Read the modifying user and application on the event: a person, or a script run through netsh or PowerShell, is the change to look at first.
- Compare the new direction, action, profiles, ports and program with what the rule should allow.
- Check the rule in force with `Get-NetFirewallRule -Name <rule ID>` or in `wf.msc`, then test the traffic that matters.

**Related:**

- `firewall_rule_created`: a new rule rather than a change to an existing one
- `firewall_rule_deleted`: a rule removed rather than changed
- `firewall_service_stopped`: the firewall service itself stopped, rather than one rule changing

**Example:** An administrator's netsh script widens a Remote Desktop rule from the Domain profile to all profiles.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#firewall_rule_changed, https://sparklogs.com/reference/reasons/firewall_rule_changed.json

## `firewall_rule_created`: firewall rule created

A Windows Firewall rule was added.

**Also reported by:** `win.eventlog.security`

**Severity:** Verbose for a rule added; Debug for an application sandbox's own short-lived Block rule, which the firewall service adds and removes on the sandbox's behalf. A rule the firewall service or a SYSTEM service added for itself is categorized as maintenance.

**Why it matters:** A new Allow rule can open a port or program to the network. A new Block rule can stop traffic that used to work.

**In practice:** Windows Firewall writes event 2004 or 2097, depending on the Windows version, to the Microsoft-Windows-Windows Firewall With Advanced Security/Firewall log when a rule is added. The record names the rule, its direction, action, profiles, protocol, ports and program, and the account and program that added it. Application installers and Windows services add rules for themselves every day. An application sandbox asks the firewall service for a pair of Block rules named Sandbox followed by a GUID, and removes them moments later.

**When to ignore:** Rules the firewall service or a known installer adds for its own application, and the short-lived Sandbox Block rules.

**What to check:**

- Read the modifying user and application on the event: a person, or a script run through netsh or PowerShell, is the addition to look at first.
- For an Allow rule, check its profiles, ports and remote addresses: an inbound rule on the Public profile is the one that exposes a laptop on other networks.
- Check the rule in force with `Get-NetFirewallRule -Name <rule ID>` or in `wf.msc`.

**Related:**

- `firewall_rule_changed`: an existing rule modified rather than a new one
- `firewall_rule_deleted`: a rule removed
- `firewall_service_stopped`: the firewall service itself stopped, rather than one rule added

**Example:** A remote-support tool's installer adds an inbound Allow rule for its agent on all profiles.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#firewall_rule_created, https://sparklogs.com/reference/reasons/firewall_rule_created.json

## `firewall_rule_deleted`: firewall rule deleted

A Windows Firewall rule was removed, or every rule in one rule store was removed at once.

**Also reported by:** `win.eventlog.security`

**Severity:** Verbose for one rule removed; Debug for an application sandbox's own short-lived Block rule, which the firewall service removes on the sandbox's behalf; Info for the whole-store reset (2033), which reads like every rule being lost and is the firewall service's own routine; Notice when a person, or SYSTEM through a scripting or administration tool, removes every rule in a store. A removal by the firewall service or a SYSTEM service for itself is categorized as maintenance.

**Why it matters:** Removing a Block rule can let in traffic it stopped. Removing an Allow rule can break an application that relied on it.

**In practice:** Windows Firewall writes event 2006 or 2052, depending on the Windows version, to the Microsoft-Windows-Windows Firewall With Advanced Security/Firewall log when one rule is deleted. It writes event 2033 when every rule in one rule store is deleted at once. The record names the account and program that made the change, and for one rule, the rule and its direction, action and profiles. The firewall service empties its own dynamic rule store routinely and rebuilds what it needs. A person or a script emptying a store usually comes before a firewall reset or a policy rebuild, and ships at Notice.

**When to ignore:** Removals by the firewall service or a SYSTEM service of its own rules, including its routine reset of the dynamic store.

**What to check:**

- Read the modifying user and application on the event: a person, or a script run through netsh or PowerShell, is the removal to look at first.
- For event 2033 from a person or a script, check what rebuilt the rules afterward, such as a Group Policy refresh, and whether the expected rules are back.
- Check the rules in force with `Get-NetFirewallRule` or in `wf.msc`, then test the traffic that matters.

**Related:**

- `firewall_rule_changed`: an existing rule modified rather than removed
- `firewall_rule_created`: a new rule added
- `firewall_service_stopped`: the firewall service itself stopped, rather than rules removed

**Example:** A technician runs `netsh advfirewall reset` on a workstation and every rule in its local store is removed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#firewall_rule_deleted, https://sparklogs.com/reference/reasons/firewall_rule_deleted.json

## `ip_address_conflict_detected`: IP address conflict

Another device on the network is using the same IP address as this machine.

**Also reported by:** `win.eventlog.system`

**Severity:** Warning

**Why it matters:** Connections from this machine can fail or drop on and off while two devices answer for one address, until one of them moves to another address.

**In practice:** Windows checks that an address is free on the network before it uses it, and logs a conflict in one of three places. For an IPv4 address, Tcpip logs event 4199 in the System log, naming the address and the hardware (MAC) address of the other device. The DHCP client logs event 1005 in Microsoft-Windows-Dhcp-Client/Admin when an address it was given is already in use, and then asks for a different one. The DHCPv6 client logs event 1005 in Microsoft-Windows-Dhcpv6-Client/Admin for an IPv6 address. A device with a static address inside the DHCP scope is the usual cause. Two DHCP servers handing out overlapping ranges, or a device holding on to an old lease after the scope changed, also cause it.

**When to ignore:** A single conflict that does not repeat, after which the machine has a working address.

**What to check:**

- Read the address on the event. On event 4199, the other device's hardware address is there too: its first half names the vendor, which often points at a printer, camera or phone.
- On repeats, find the other device: `arp -a` on a machine in the same subnet shows the hardware address answering for that address.
- Move static addresses out of the DHCP scope, or give those devices reservations, and check for a second DHCP server on the subnet.

**Related:**

- `dhcp_lease_failed`: no address obtained at all, rather than an address another device also uses

**Example:** A laptop joins the office network and finds a printer already using its address.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#ip_address_conflict_detected, https://sparklogs.com/reference/reasons/ip_address_conflict_detected.json

## `ncsi_internet_lost`: ncsi internet lost

Windows reported that a network interface lost internet access for one address family: its connectivity changed from Internet to local network only, or to none.

**Severity:** Notice (workstation) / Warning (server or unknown host class)

**Why it matters:** Windows now shows this interface as having no internet access, as the taskbar network icon does. Whether any application lost access needs other evidence, such as connection failures, DNS timeouts, or another interface or a VPN still carrying traffic.

**In practice:** The Network Connectivity Status Indicator (NCSI) writes event 4042 to the Microsoft-Windows-NCSI/Operational log whenever an interface's connectivity changes. This reason covers only a change from Internet to Local or to None. Other changes, gains included, ship without it. NCSI writes one record per interface and address family, so a device with IPv4 and IPv6 can record one loss twice. NCSI judges internet access with its own test requests, so a proxy, a captive portal or a blocked test address can make it report a loss while other traffic still flows.

**When to ignore:** On a workstation that slept, roamed or changed networks, when connectivity came back within minutes.

**What to check:**

- Read the address family on the event before counting losses.
- Look for link, Wi-Fi, DNS and connection-failure events in the same minutes, and for another interface or a VPN that kept the device online, before deciding where a fault lies.
- On a server, check the network path and the proxy settings NCSI uses to test internet access.

**Related:**

- `dns_client_resolution_timed_out`: name lookups failing, which shows whether applications lost the network too
- `wlan_disconnected`: the Wi-Fi driver dropping the connection, which often comes just before this change

**Example:** A laptop's Wi-Fi interface drops from Internet to Local when the user walks out of range of the office access point.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#ncsi_internet_lost, https://sparklogs.com/reference/reasons/ncsi_internet_lost.json

## `offline_files_slow_link_transition_blocked`: offline files slow link transition blocked

Offline Files could not switch a folder between slow-link (offline) and online mode.

**Severity:** Warning

**Why it matters:** The folder stays in its previous mode: users keep working from the local copy, or keep waiting on the server, until the switch is allowed.

**In practice:** Offline Files writes event 1008 to the Microsoft-Windows-OfflineFiles/Operational log when it could not change a folder's slow-link state. The event names the folder path. The Configure slow-link mode policy decides when a link counts as slow. A latency threshold of 1 ms in that policy is Always Offline mode, where the folder is meant to stay offline.

**When to ignore:** On devices where Always Offline mode is the intended policy.

**What to check:**

- Check the Configure slow-link mode policy first: in Always Offline mode no switch to online is expected.
- Where Always Offline is not intended, compare the link latency to the server with the threshold that policy sets.

**Related:**

- `offline_files_sync_failed`: a background sync that failed, which can follow a folder stuck in one mode

**Example:** A branch-office laptop with Always Offline mode set keeps a redirected Documents folder offline after the link to the file server recovers.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#offline_files_slow_link_transition_blocked, https://sparklogs.com/reference/reasons/offline_files_slow_link_transition_blocked.json

## `offline_files_sync_failed`: offline files sync failed

Offline Files background sync failed for a folder.

**Severity:** Warning

**Why it matters:** Changes made on the device do not reach the server, and server changes do not reach the device, until sync succeeds. Users can see out-of-date files or sync conflicts.

**In practice:** Offline Files writes event 1006 to the Microsoft-Windows-OfflineFiles/Operational log when a background sync fails. The event names the folder path and how many files failed. Common causes are the server or share being unreachable, files in use, permission changes on the server, and conflicting edits.

**When to ignore:** A single failure while the device was off the network, when the next sync succeeds.

**What to check:**

- Read the folder path and the failed file count on the event.
- Open Sync Center in Control Panel on the device to see the files that failed and any conflicts.
- Check that the user can open the server folder directly from the device.

**Related:**

- `offline_files_slow_link_transition_blocked`: a folder that could not switch between offline and online mode, which can leave sync waiting

**Example:** A laptop with a redirected Documents folder fails background sync for 12 files while its VPN connection keeps dropping.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#offline_files_sync_failed, https://sparklogs.com/reference/reasons/offline_files_sync_failed.json

## `rds_redirected_printer_setup_failed`: rds redirected printer setup failed

Remote Desktop Services could not finish setting up a printer redirected from the user's own computer.

**Severity:** Warning

**Why it matters:** In the remote session, users print to the wrong default printer or with the printer's default settings.

**In practice:** Remote Desktop Services writes these to the Microsoft-Windows-TerminalServices-Printers/Admin log when it sets up a printer redirected into a session. Event 1109 means it could not make the redirected printer the session's default. Event 1108 means it could not restore the printer's saved configuration, so the queue uses the default settings. The event names the printer.

**When to ignore:** Event 1108 when the user is happy with the printer's default settings.

**What to check:**

- Event 1108 needs no action unless the user misses a setting: Windows applies the default configuration when it creates the queue.
- Event 1109 is expected on sessions with more than one redirected printer after a reconnect, when the spooler did not list a disconnected queue. Have the user set the default printer in the session.
- Where the queue itself is missing, check whether Easy Print is disabled, which makes the host need a matching driver for the printer named on the event.

**Related:**

- `printer_driver_install_failed`: a printer driver that failed to install, which can leave no redirected queue at all

**Example:** A user reconnects to a Remote Desktop session with two redirected printers and the session's default printer is not set.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#rds_redirected_printer_setup_failed, https://sparklogs.com/reference/reasons/rds_redirected_printer_setup_failed.json

## `smb_anonymous_access_denied`: smb anonymous access denied

This server refused a client that tried to use it without credentials.

**Severity:** Warning (public client address) / Verbose (local network or no address)

**Why it matters:** From a local network address, the refusal is expected when anonymous access is off. From a public address it means the server's file-sharing port answers from the internet.

**In practice:** The SMB server writes event 1007 (a share refused) or 1009 (the server refused) to the Microsoft-Windows-SMBServer/Security log when a client connects without credentials and is turned away. The record names the client and its address. From a private, CGNAT or link-local address, it is the server working as configured, often one misconfigured device retrying, and ships at Verbose. From a public address it ships at Warning. A record with no readable address ships at Verbose.

**When to ignore:** Refusals from a local network address that match no user complaint.

**What to check:**

- Read the client address on the event.
- From a public address, block TCP 445 from the internet at the firewall or router, then find how the port was reachable.
- From a local device, such as a scanner or an old backup job, give it a real account rather than allowing anonymous access.

**Related:**

- `smb_anonymous_access_enabled`: named pipes or shares opened to anonymous access, rather than a client refused

**Example:** A copier on the office network tries to reach its scan folder without credentials and the file server refuses it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_anonymous_access_denied, https://sparklogs.com/reference/reasons/smb_anonymous_access_denied.json

## `smb_anonymous_access_enabled`: smb anonymous access enabled

The SMB server reported that one or more named pipes or shares allow anonymous access.

**Severity:** Notice

**Why it matters:** Any client that can reach those named pipes or shares can use them without signing in.

**In practice:** The SMB server writes event 1025 to the Microsoft-Windows-SMBServer/Operational log when named pipes or shares on this server are marked for anonymous access. The event names no resource and does not show whether a remote client can reach one.

**When to ignore:** When every entry on the anonymous-access lists is deliberate and documented.

**What to check:**

- Check the Network access: Named Pipes that can be accessed anonymously and Shares that can be accessed anonymously policies, and the NullSessionPipes and NullSessionShares values under the LanmanServer Parameters registry key.
- Record why each deliberate entry is there, and remove the rest.
- Check which networks can reach the server on TCP 445.

**Related:**

- `smb_anonymous_access_denied`: a client without credentials refused, which is what happens where anonymous access is off
- `smb_insecure_guest_allowed`: this device as a client accepting a guest session from another server

**Example:** A file server has a legacy backup application's named pipe on its anonymous-access list.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_anonymous_access_enabled, https://sparklogs.com/reference/reasons/smb_anonymous_access_enabled.json

## `smb_client_auth_context_failed`: smb client auth context failed

The SMB client could not authenticate to a server, so no session was set up.

**Severity:** Warning

**Why it matters:** The user cannot open shares on that server, and mapped drives to it show as disconnected, until authentication works.

**In practice:** The SMB client writes events 31000, 31001 and 31002 to the Microsoft-Windows-SmbClient/Security log, and event 30801 to the Microsoft-Windows-SmbClient/Connectivity log, when it cannot build the Kerberos or NTLM security context for a session. The event names the server and carries a security status. SEC_E_WRONG_PRINCIPAL (0x80090322) means the Kerberos ticket was for a different name than the server that answered, usually a DNS alias with no matching SPN. SEC_E_NO_AUTHENTICATING_AUTHORITY (0x80090311) means no domain controller could be reached. SEC_E_LOGON_DENIED (0x8009030C) and STATUS_LOGON_FAILURE (0xC000006D) are a refused credential.

**What to check:**

- Read the security status and the server name on the event.
- For a wrong principal, check whether the server name is a DNS alias (CNAME): the server needs an SPN for the alias, registered with `setspn -S`.
- Where the alias SPN is in place and the failure persists, check SMB server name hardening on the server (SmbServerNameHardeningLevel).
- When no authority could be reached, connect by the server's fully qualified name, not an IP address or a workgroup name, and confirm the client can reach a domain controller with `nltest /dsgetdc:<domain>`.

**Related:**

- `smb_session_auth_failed`: the same kind of failure as the SMB server records it

**Example:** A workstation maps a drive to a file server through a DNS alias that has no SPN, and Kerberos fails with SEC_E_WRONG_PRINCIPAL.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_client_auth_context_failed, https://sparklogs.com/reference/reasons/smb_client_auth_context_failed.json

## `smb_client_mutual_auth_lost`: smb client mutual auth lost

SMB mutual authentication was lost after the client re-authenticated.

**Severity:** Warning

**Why it matters:** The session keeps working, but the client no longer proves it is talking to the real server, so an impostor server could stand in.

**In practice:** The SMB client writes event 31019 to the Microsoft-Windows-SmbClient/Security log when a session re-authenticated and the new authentication no longer proves the server's identity. The event carries the old and new authentication protocol and whether mutual authentication was lost. Kerberos proves the server's identity and NTLM does not, so a fallback from Kerberos to NTLM is the usual cause.

**What to check:**

- Compare the old and new authentication protocol IDs on the event.
- Check how the server named on the event is reached: by IP address or by a DNS alias without an SPN, the client uses NTLM instead of Kerberos.
- Check that the client can reach a domain controller with `nltest /dsgetdc:<domain>`.

**Related:**

- `smb_client_auth_context_failed`: authentication that failed outright, rather than fell back to a weaker protocol

**Example:** A laptop's session to the file server falls back from Kerberos to NTLM when it re-authenticates over a VPN that cannot reach a domain controller.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_client_mutual_auth_lost, https://sparklogs.com/reference/reasons/smb_client_mutual_auth_lost.json

## `smb_client_security_call_slow`: smb client security call slow

An SMB client call into Windows security took longer than its slow-call threshold.

**Severity:** Notice

**Why it matters:** File access to the server pauses while the client waits, showing up as a slow drive mapping or a delay opening a share. Nothing failed.

**In practice:** The SMB client writes event 30955 to the Microsoft-Windows-SMBClient/Operational log when a security function it called, such as getting credentials or building an authentication context, ran past its threshold. The event names the function, the time it took and the threshold. Waiting on a domain controller, on a name lookup, or on a security product that inspects sign-ins can cause it.

**When to ignore:** An isolated slow call that matches no user complaint.

**What to check:**

- Read the function name and the duration on the event.
- Check how fast the client reaches a domain controller, with `nltest /dsgetdc:<domain>`.
- Check DNS response times for the server and domain names with `Resolve-DnsName`.

**Related:**

- `smb_server_operation_slow`: a slow operation timed on the file server rather than on this client

**Example:** A laptop on a slow VPN link waits several seconds for a Kerberos ticket while mapping a drive.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_client_security_call_slow, https://sparklogs.com/reference/reasons/smb_client_security_call_slow.json

## `smb_connect_failed`: smb connect failed

An SMB connection to a server, or to a share on it, failed after the server name resolved.

**Severity:** Notice (admin-share 31010) / Warning (other access denied) / Notice (connection failures)

**Why it matters:** The share or mapped drive on that server cannot be opened until the client connects.

**In practice:** The SMB client writes events 30803, 30809, 30816 and 30823 to the Microsoft-Windows-SmbClient/Connectivity log when a connection or session setup to a server fails. It writes event 31010 to the Microsoft-Windows-SmbClient/Security log when a share refuses the client. A timeout (STATUS_IO_TIMEOUT) usually means the server is offline or a firewall drops TCP 445. Access denied (STATUS_ACCESS_DENIED) is a permission or policy refusal. A laptop away from the office writes timeouts and other connection failures for its mapped drives every day, so those ship at Notice. A refused ADMIN$, C$ or IPC$ share is what inventory and management tools probe, and also ships at Notice.

**When to ignore:** Timeouts and connection failures from a laptop away from the office network, and refused ADMIN$, C$ or IPC$ probes from management tools.

**What to check:**

- Read the status, the server and the share on the event.
- For a timeout, check that the server listens on TCP 445 (`Test-NetConnection <server> -Port 445`) and that its File and Printer Sharing (SMB-In) rules are enabled.
- Where the firewall rules look clean, turn on auditing of Filtering Platform Packet Drop failures with `auditpol` and read Security event 5152 during a retry: it names the filter that dropped the traffic.
- For access denied, check the share and NTFS permissions, and whether the client now requires SMB signing (the default from Windows 11 24H2 and Windows Server 2025) or blocks NTLM for SMB, either of which can refuse a server that worked before an upgrade.

**Related:**

- `smb_client_auth_context_failed`: the connection was made but authentication failed
- `smb_server_name_unresolved`: the server name did not resolve, so no connection was tried

**Example:** A laptop at home retries its mapped drive to the office file server and the connection times out.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_connect_failed, https://sparklogs.com/reference/reasons/smb_connect_failed.json

## `smb_insecure_guest_allowed`: smb insecure guest allowed

The SMB client connected to a server as an unauthenticated guest.

**Severity:** Warning

**Why it matters:** Traffic to that server is neither signed nor encrypted, and the client cannot tell the real server from an impostor.

**In practice:** The SMB client writes event 31022 to the Microsoft-Windows-SmbClient/Security log when it accepts an insecure guest session from a server. It accepts one only where insecure guest logons are allowed on this client, by the Enable insecure guest logons policy or the AllowInsecureGuestAuth value. Guest sessions support neither SMB signing nor encryption. Older NAS devices and shares set up for guest access are the usual servers.

**What to check:**

- Find what allowed insecure guest logons on this client: `gpresult /h`, or the AllowInsecureGuestAuth value under the LanmanWorkstation Parameters registry key.
- Give the server named on the event real accounts, then turn insecure guest logons back off.

**Related:**

- `smb_anonymous_access_enabled`: anonymous access offered by this device as a server
- `smb_insecure_guest_rejected`: the client refusing a guest session, under the default policy

**Example:** A workstation with insecure guest logons enabled by policy opens a share on an old NAS that only offers guest access.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_insecure_guest_allowed, https://sparklogs.com/reference/reasons/smb_insecure_guest_allowed.json

## `smb_insecure_guest_rejected`: smb insecure guest rejected

The SMB client refused an unauthenticated guest session from a server.

**Severity:** Warning

**Why it matters:** The share on that server stays unreachable until the server accepts real credentials.

**In practice:** The SMB client writes event 31017 to the Microsoft-Windows-SmbClient/Security log when a server offers it a guest session with no authentication and the client refuses. Windows 10 and 11 Enterprise and Education, Windows Server 2019 and later, and Windows 11 Pro from 24H2 refuse these by default. A NAS or an old server that only offers guest access stops working after an upgrade to one of those versions.

**What to check:**

- Read the server name on the event.
- Create an account on that server and connect with it.
- Leave insecure guest logons off. Turning them back on exposes the client to impostor servers and interception.

**Related:**

- `smb_insecure_guest_allowed`: the client accepting a guest session where policy allows it

**Example:** After an upgrade to Windows 11 24H2, a workstation can no longer open a NAS share that only allows guest access.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_insecure_guest_rejected, https://sparklogs.com/reference/reasons/smb_insecure_guest_rejected.json

## `smb_legacy_dialect_rejected`: smb legacy dialect rejected

This server refused a client that tried to connect with SMB 1.0.

**Severity:** Notice

**Why it matters:** That client cannot use the server's shares. A copier's scan-to-folder or an old appliance's backup job fails.

**In practice:** The SMB server writes event 1001 to the Microsoft-Windows-SMBServer/Operational log when a client tries to connect with SMB 1.0 and the server refuses, because SMB 1.0 is turned off or removed. The event names the client. Scan-to-folder copiers, older NAS and media devices, and Windows XP or Server 2003 era systems are the usual clients.

**When to ignore:** When the client named on the event is a device already being retired.

**What to check:**

- Read the client name and address on the event: that device needs the fix, not the server.
- Update its firmware or settings to use SMB 2 or later, or replace it.
- Leave SMB 1.0 off. It lacks the protections of later versions and is the target of well-known attacks.

**Related:**

- `smb_connect_failed`: a connection failure as the client records it

**Example:** A copier's scan-to-folder job tries to reach a file server over SMB 1.0 after the server's SMB 1.0 support was removed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_legacy_dialect_rejected, https://sparklogs.com/reference/reasons/smb_legacy_dialect_rejected.json

## `smb_security_setting_nondefault`: smb security setting nondefault

An SMB security setting on this device differs from the Windows default.

**Severity:** Notice

**Why it matters:** The setting can make SMB stricter or weaker than Windows ships it. The event names the setting and value but does not say which.

**In practice:** The SMB client writes events 31003, 31016 and 31018 to the Microsoft-Windows-SmbClient/Security log, and the SMB server writes event 1021 to the Microsoft-Windows-SMBServer/Security log, when a security setting differs from the Windows default. Event 31018 is insecure guest logons, 31016 is SMB signing, and 31003 and 1021 are the LAN Manager authentication level (LmCompatibilityLevel). The events carry the setting's registry name and value, and 1021 also carries the default.

**When to ignore:** When the value is a stricter setting your baseline applies on purpose, such as required SMB signing.

**What to check:**

- Read the setting name and value on the event.
- An LmCompatibilityLevel below 3 lets the device send LM or NTLMv1 responses. Raise it to 3 or higher unless a named old system needs it.
- AllowInsecureGuestAuth set to 1 turns insecure guest logons back on: find what set it.
- Find the Group Policy or script that set the value with `gpresult /h`.

**Related:**

- `group_policy_file_share_unhardened`: Group Policy file-share hardening that is missing on this device
- `smb_signing_validation_failed`: a signing check that failed on a message, rather than a setting

**Example:** An old line-of-business application's installer set LmCompatibilityLevel to 1 on a workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_security_setting_nondefault, https://sparklogs.com/reference/reasons/smb_security_setting_nondefault.json

## `smb_server_name_unresolved`: smb server name unresolved

The SMB client could not resolve a server name.

**Severity:** Display

**Why it matters:** Shares and mapped drives on that server name stay unreachable from this device while the name does not resolve.

**In practice:** The SMB client writes event 30800 to the Microsoft-Windows-SmbClient/Connectivity log when it cannot resolve the server name in a UNC path or mapped drive. A laptop off the office network that still has drives mapped to an internal name writes it every day. Shortcuts and applications that point at servers that no longer exist write it too.

**When to ignore:** A device off the office network that cannot resolve internal server names.

**What to check:**

- Read the server name on the event.
- On the office network, test the name with `Resolve-DnsName <name>`, and check the adapter's DNS servers and suffixes with `ipconfig /all`.
- Remove or fix mapped drives and shortcuts that point at retired servers.

**Related:**

- `dns_client_resolution_timed_out`: a DNS lookup that timed out, which can be the cause here
- `smb_connect_failed`: the name resolved, but the connection then failed

**Example:** A laptop at a coffee shop tries to reconnect a drive mapped to the office file server.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_server_name_unresolved, https://sparklogs.com/reference/reasons/smb_server_name_unresolved.json

## `smb_server_operation_slow`: smb server operation slow

An SMB server operation took longer than its slow threshold.

**Severity:** Notice

**Why it matters:** Users of that share see Explorer pause or files open slowly. The operation did complete.

**In practice:** The SMB server writes these to the Microsoft-Windows-SMBServer/Operational log when an operation runs past its threshold. Event 1020 means the local file system was slow to answer, 1054 that the network side was slow, and 1047 that session setup was slow. The event names the share where it has one, the time taken and the threshold.

**When to ignore:** An isolated record during a backup window or a large copy.

**What to check:**

- For event 1020, look at storage on this server rather than SMB: file-system filter drivers such as antivirus, disk load, and backup or VSS snapshots.
- For event 1047, check how fast this server reaches a domain controller.
- For extreme delays, check for events 1031 and 1032 on the same host and collect the dump from %SystemRoot%\LiveKernelReports.

**Related:**

- `smb_client_security_call_slow`: a slow security call timed on a client rather than on this server

**Example:** A file server's antivirus filter holds a file long enough that SMB reports a slow file-system operation on the Users share.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_server_operation_slow, https://sparklogs.com/reference/reasons/smb_server_operation_slow.json

## `smb_session_auth_failed`: smb session auth failed

A client failed to authenticate an SMB session on this server.

**Severity:** Warning or Notice

**Why it matters:** The client cannot open a session, so its users or service cannot reach the server's shares until credentials or policy change.

**In practice:** The SMB server writes event 551 to the Microsoft-Windows-SMBServer/Security log when a session setup fails authentication. The event carries the status, a reason code and the server's SPN validation policy. A refusal with status 0xC0000022 (access denied) is read as an anonymous session the server turned away, and ships at Notice. Any other status, such as a wrong password, ships at Warning.

**When to ignore:** Anonymous refusals from a device known to probe without credentials.

**What to check:**

- Read the status and the SPN validation policy on the event.
- Where the policy requires the client to supply an SPN, check Security event 5168 on this server: a client still using NTLMv1 or LM sends none and fails.
- For an anonymous session, give the device an account rather than loosening the server.
- On Windows Server 2025 and Windows 11 24H2, a run of failures also meets the SMB authentication rate limiter, which slows each further attempt.

**Related:**

- `smb_client_auth_context_failed`: the same kind of failure as the SMB client records it

**Example:** A service on another server keeps connecting with an old password after its account's password was changed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_session_auth_failed, https://sparklogs.com/reference/reasons/smb_session_auth_failed.json

## `smb_session_lost`: smb session lost

The SMB client lost its session to a server, or got it back.

**Severity:** Display or Info

**Why it matters:** Open files and copies on that session stall or fail until the client reconnects, and an application saving a file can report a network error.

**In practice:** The SMB client writes event 30805 to the Microsoft-Windows-SmbClient/Connectivity log when it loses its session to a server, and event 30806 when it reconnects. A 30806 with a zero status is the recovery. With any other status the reconnect failed, and it counts as a loss. Sleep, resume and moving between networks cause most losses.

**When to ignore:** A loss followed by its recovery around sleep, resume or a network change.

**What to check:**

- Pair each loss with its recovery by session ID. A loss with no recovery soon after is the one to read.
- Repeated losses to one server while the device stays put point at the network path or the server: look for adapter, Wi-Fi and server restart events in the same minutes.

**Related:**

- `smb_session_reopen_failed`: the server failing to reopen a file the client held when it came back
- `smb_share_connection_lost`: one share on the server lost, rather than the whole session

**Example:** A laptop resumes from sleep, loses its session to the file server and reconnects a few seconds later.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_session_lost, https://sparklogs.com/reference/reasons/smb_session_lost.json

## `smb_session_reopen_failed`: smb session reopen failed

The server could not reopen an SMB file after the client returned.

**Severity:** Warning

**Why it matters:** The application holding the file can hang or report a lost document, and unsaved changes can be lost, until the user reopens the file.

**In practice:** The SMB server writes event 1016 to the Microsoft-Windows-SMBServer/Operational log when a client that lost its connection comes back and the server cannot reopen a file the client had open. The event names the share, the status and reason, and whether the file handle was durable, persistent or resilient. The server holds a handle for reopening only for a limited time. Another client opening the same file in the meantime also prevents the reopen.

**What to check:**

- Read the share, the status and the handle type on the event.
- On repeats for one share, find what drops clients' connections: Wi-Fi or VPN drops, or server restarts and failovers.

**Related:**

- `smb_session_lost`: the client's session loss, which comes before this reopen attempt

**Example:** A laptop reconnects after a Wi-Fi drop and the file server cannot reopen the spreadsheet the user had open.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_session_reopen_failed, https://sparklogs.com/reference/reasons/smb_session_reopen_failed.json

## `smb_share_access_denied`: smb share access denied

A share on this server denied a signed-in user the access they asked for.

**Severity:** Info

**Why it matters:** That user cannot open the share or file with that access until permissions change.

**In practice:** The SMB server writes event 1006 to the Microsoft-Windows-SMBServer/Security log when an authenticated client asks for access that the share or file permissions do not grant. The event names the share and carries the access that was asked for and the access it mapped to. A busy file server denies paths that users cannot open all day, so these ship at Info.

**When to ignore:** Denials nobody has reported: they are the permissions working.

**What to check:**

- Check both the share permissions and the NTFS permissions on the share named on the event: either one denying is enough.
- Compare the granted and mapped access on the event. Where they disagree on a NAS target, check for a missing Synchronize permission on the folder.

**Related:**

- `smb_anonymous_access_denied`: a client with no credentials refused, rather than a signed-in user

**Example:** A user in Sales tries to open the Finance share and the file server denies access.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_share_access_denied, https://sparklogs.com/reference/reasons/smb_share_access_denied.json

## `smb_share_connection_lost`: smb share connection lost

The SMB client lost its connection to a share on a server, or got it back.

**Severity:** Display or Info

**Why it matters:** Applications using files on that share get errors until the share reconnects.

**In practice:** The SMB client writes event 30807 to the Microsoft-Windows-SmbClient/Connectivity log when its connection to one share drops, and event 30808 when it reconnects. A 30808 with a zero status is the recovery, and shows whether the reconnected share uses signing and encryption. With any other status the reconnect failed, and it counts as a loss. The event gives the server and the share separately.

**When to ignore:** A loss followed by its recovery around sleep, resume or a network change.

**What to check:**

- Pair each loss with its recovery by session and tree ID. A loss with no recovery soon after is the one to read.
- Repeated losses on one share while the device stays put point at the server or the network path: look for adapter, Wi-Fi and server events in the same minutes.

**Related:**

- `smb_session_lost`: the whole session to the server lost, which takes its shares with it

**Example:** A desktop loses its connection to the Projects share while the file server restarts, then reconnects.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_share_connection_lost, https://sparklogs.com/reference/reasons/smb_share_connection_lost.json

## `smb_signing_validation_failed`: smb signing validation failed

A message from an SMB server failed its signature or encryption check on this client.

**Severity:** Warning

**Why it matters:** The client discards the message, so the file operation fails or the connection resets.

**In practice:** The SMB client writes event 31013 to the Microsoft-Windows-SmbClient/Security log when a message from the server fails signature validation, and event 31014 when one fails decryption. The event names the server and carries the session, share, message ID and SMB command. A server or NAS that signs some replies wrongly, a device in the path that alters traffic, or deliberate tampering all produce it.

**What to check:**

- Check what the server named on the event is: third-party servers and NAS appliances that do not sign error replies fail this check, and the fix is a firmware update from the vendor.
- Keep the signing requirement. Turning it off removes the protection the check gives.
- Where the server runs Windows, check whether clients reach it by IP address or by a DNS alias: both force NTLM instead of Kerberos.

**Related:**

- `smb_security_setting_nondefault`: a signing setting changed from the default, which can make this check apply

**Example:** A workstation that requires signing fails to validate replies from an older NAS whose firmware does not sign error responses.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#smb_signing_validation_failed, https://sparklogs.com/reference/reasons/smb_signing_validation_failed.json

## `wfp_transaction_watchdog_timeout`: wfp transaction watchdog timeout

A Windows Filtering Platform transaction stayed open past the watchdog time.

**Severity:** Display

**Why it matters:** Other changes to filtering wait while one process holds the transaction open. Filters already in force keep working, so this alone does not block traffic.

**In practice:** The Windows Filtering Platform writes event 5150 or 1030 to the Microsoft-Windows-WFP/Operational log when a transaction, one batch of filter changes, stays open past its watchdog time. Event 1030 names the process that held it. Security products, VPN clients and the firewall service write their filters this way. The transaction does complete.

**When to ignore:** A single timeout with no connection or firewall complaint at the same time.

**What to check:**

- Read the process on event 1030: repeats from one security or VPN product point at that product's driver or version.
- If firewall changes or VPN connections are slow on the device at the same times, update or reinstall that product.

**Example:** A security agent's update holds a filtering transaction open while it rewrites its filters.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#wfp_transaction_watchdog_timeout, https://sparklogs.com/reference/reasons/wfp_transaction_watchdog_timeout.json

## `wlan_connect_failed`: wlan connect failed

Windows failed to connect to a wireless network using a saved profile.

**Severity:** Warning or Info

**Why it matters:** The device stays off that Wi-Fi network until a connection succeeds.

**In practice:** WLAN AutoConfig writes event 8002 to the Microsoft-Windows-WLAN-AutoConfig/Operational log when it fails to connect to a wireless network. The event names the profile, the adapter and a failure reason. Reason code 229396 means the profile's network was not in range, and ships at Info. Any other reason means the join itself failed, and ships at Warning.

**When to ignore:** Failures for a saved network that is out of range.

**What to check:**

- When the network was not in range, there is no credential problem to chase.
- When the join failed, read the failure reason on the event first. On an 802.1X network, check NPS event 6273 on the RADIUS server for the rejection reason.
- On 802.1X, check the client and server certificates before the profile: invalid, expired or unverifiable certificates are the most common cause.

**Related:**

- `wlan_security_handshake_failed`: the security handshake with the access point failing, one cause of a failed join

**Example:** A laptop fails to join the office 802.1X network because its machine certificate has expired.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#wlan_connect_failed, https://sparklogs.com/reference/reasons/wlan_connect_failed.json

## `wlan_disconnected`: wlan disconnected

The wireless adapter's driver dropped the connection to a wireless network.

**Severity:** Notice

**Why it matters:** Network traffic over Wi-Fi stops until WLAN AutoConfig reconnects.

**In practice:** WLAN AutoConfig writes event 8003 to the Microsoft-Windows-WLAN-AutoConfig/Operational log whenever it disconnects from a wireless network. This reason covers reason code 0, The network is disconnected by the driver: the adapter's driver dropped the link with no user, policy or network switch asking for it. Weak signal, roaming between access points, access point faults, and adapter driver or power-saving problems cause it.

**When to ignore:** An occasional drop around sleep or roaming that users did not notice.

**What to check:**

- Count the drops per device and per profile: an occasional one is sleep or roaming, many on one device point at signal, the access point or the adapter driver.
- Compare the adapter model across devices with repeated drops. A shared model points at its driver version.
- Check the adapter's power-saving setting in Device Manager on a device that drops often.

**Related:**

- `ncsi_internet_lost`: Windows marking the interface as without internet, which often follows a drop
- `wlan_connect_failed`: the reconnect attempt failing after the drop
- `wlan_disconnected_by_request`: a disconnect a user, a policy or a switch to another network asked for

**Example:** A laptop's Wi-Fi drops during a video call as the user walks between floors.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#wlan_disconnected, https://sparklogs.com/reference/reasons/wlan_disconnected.json

## `wlan_disconnected_by_request`: wlan disconnected by request

A wireless network was disconnected by something other than the driver, usually a user, a policy or a switch to another network.

**Severity:** Display

**Why it matters:** Wi-Fi traffic on that profile stops, and normally another network or a wired connection takes over.

**In practice:** WLAN AutoConfig writes event 8003 to the Microsoft-Windows-WLAN-AutoConfig/Operational log whenever it disconnects from a wireless network. This reason covers every reason code other than 0. Common codes are 5 (a policy turned automatic connection off), 3 (the user started a connection to another network) and 2 (the user disconnected).

**When to ignore:** When a user or a policy asked for the disconnect and nobody reports a problem.

**What to check:**

- Read the reason code and its text on the event. A policy turning automatic connection off on many devices at once points at a pushed Wi-Fi profile or policy change, not at the network.

**Related:**

- `wlan_disconnected`: the driver dropping the link with nobody asking, which is the one that points at a fault

**Example:** A user switches a laptop from the guest Wi-Fi to the corporate network.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#wlan_disconnected_by_request, https://sparklogs.com/reference/reasons/wlan_disconnected_by_request.json

## `wlan_security_handshake_failed`: wlan security handshake failed

The wireless security handshake with an access point did not finish.

**Severity:** Warning

**Why it matters:** The device cannot use that Wi-Fi network until the handshake succeeds.

**In practice:** WLAN AutoConfig writes event 11006 to the Microsoft-Windows-WLAN-AutoConfig/Operational log when the security exchange with the access point fails. The event carries a reason code and text and names the adapter. A wrong pre-shared key, a RADIUS server rejecting the device, and certificate problems on 802.1X networks are the usual causes.

**What to check:**

- Read the reason text on the event, then on 802.1X check NPS event 6273 on the RADIUS server for the matching rejection.
- Where the reason points at a certificate, enable the CAPI2 operational log on the client and reproduce: it is off by default and shows the chain and revocation detail.
- On a pre-shared-key network, re-enter the key on the device.

**Related:**

- `wlan_connect_failed`: the overall connection failure that this handshake failure leads to

**Example:** A laptop with the old Wi-Fi password fails the key handshake after the office changed its pre-shared key.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-network#wlan_security_handshake_failed, https://sparklogs.com/reference/reasons/wlan_security_handshake_failed.json
