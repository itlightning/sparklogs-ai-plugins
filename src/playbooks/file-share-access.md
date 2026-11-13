---
index: File share or mapped drive unreachable or slow
aliases:
  - label: Mapped drive disconnected
  - label: Access denied on a share
  - label: NAS or scanner share stopped working
---

# File share or mapped drive unreachable or slow

**Trigger.** "Users cannot open the S: drive", "the share says access denied", "the mapped drive shows a red X", "the NAS stopped working after the upgrade", "the scanner cannot save to the folder", or "opening files on the server is slow."

**Accuracy.** The SMB client on the user's device and the SMB server on the file server each log their own half of a connection.
The client records what it tried and how it failed: the name did not resolve, the connection timed out or was refused, authentication failed, signing failed, the session dropped.
The server records who it turned away and why, and which operations were slow.
Neither side sees the other's log, and a NAS, a copier or a cloud file service runs no agent: when only one end has the agent, the other end is a guess from this end's error.
Several SMB records are throttled per server and status, so a row count is not an attempt count.
Most SMB failure rows are routine: a laptop away from the office fails to reach its mapped drives every few minutes, management tools probe `C$` and `ADMIN$` and are refused, and a busy file server denies paths users cannot open all day.
A failure matters when it matches the complaint in time, server and user.
An empty result proves nothing for a channel the device does not log or a feed that is not current (`playbooks/sparklogs-collection.md`).

**Feeds.** SMB client and server events are on `subsource` (LQL) `win.eventlog.network` (value), service `file_sharing` (value): `feeds/win.eventlog.network/reasons.md` and `fields.md`.
`origin` (LQL) names the channel: `Microsoft-Windows-SmbClient/Connectivity`, `Microsoft-Windows-SmbClient/Security`, `Microsoft-Windows-SMBServer/Security`, `Microsoft-Windows-SMBServer/Operational`.
`sparklogs.reason_variant` (LQL) splits a reason by cause, for example `timeout` (value), `connection_failed` (value) and `access_denied` (value) on `smb_connect_failed` (value).
Fields that answer most questions:

- On client rows, the server is `sparklogs.destination.host` (LQL), spelled as the user typed it: a short name, a full name or an address are three spellings of one server. Match it with `sparklogs.destination.host: "<name>"` (LQL), which matches part of the name in any case. Where it is empty, read the server from the message.
- The share is `win.eventlog.network.smb_share_name` (LQL). On a refused share (31010) it is the whole path, server included.
- The status is `sparklogs.result.code` (LQL), a lowercase hex NTSTATUS or security code, with `sparklogs.result.code_name` (LQL) when the pack names it. Common codes often carry no name: filter on the hex.
- On server rows, the client and the account are raw payload fields: `user_data.ClientName` (LQL) (the client's address, written as a UNC name) and `user_data.UserName` (LQL). A failed session setup (551) often carries no user name.
- Sessions and share connections pair by `win.eventlog.network.smb_session_id` (LQL) and `win.eventlog.network.smb_tree_id` (LQL).

Rows on other feeds belong to this symptom too, filed under what they do: lost cached writes `smb_delayed_write_lost` (value) and the Server service's `smb_share_recreate_failed` (value) and `smb_server_transport_bind_failed` (value) on `win.eventlog.system` (value); Group Policy drive mappings `group_policy_drive_map_failed` (value) on `win.eventlog.application` (value); Offline Files and folder redirection `offline_files_sync_failed` (value) on the network feed.
A share the device itself offers is device state, topic `network_shares` (value) (`fields/topic-network-shares.md`), with `network_share_added` (value), `network_share_removed` (value), `network_share_path_changed` (value) and `network_share_permissions_changed` (value) as changes.

**Which failure it is.** The client's reason says how far the connection got:

| How far it got | Client witness | What it points at |
|---|---|---|
| The name did not resolve | `smb_server_name_unresolved` (value) (30800) | DNS, the DNS suffix, a retired server name, or a device off the office network |
| No connection | `smb_connect_failed` (value) `timeout` (value) or `connection_failed` (value) (30803, 30809, 30823) | The server is down, TCP 445 is blocked, or the device is on a network that cannot reach the server |
| Connected, sign-in refused | `smb_client_auth_context_failed` (value) (31001); server side `smb_session_auth_failed` (value) (551) | A wrong or stale credential, a disabled or locked account, Kerberos naming, no domain controller |
| Signed in, share refused | `smb_connect_failed` (value) `access_denied` (value) (31010); server side `smb_share_access_denied` (value) (1006) | Share or NTFS permissions, or hardening the client or server now requires |
| Refused by policy | `smb_insecure_guest_rejected` (value) (31017), `smb_signing_validation_failed` (value) (31013, 31014), `smb_legacy_dialect_rejected` (value) (1001, server side) | A guest-only NAS, a server that signs wrongly, an SMB 1.0 device |
| Worked, then dropped | `smb_session_lost` (value) (30805), `smb_share_connection_lost` (value) (30807), `smb_delayed_write_lost` (value); server side `smb_session_reopen_failed` (value) (1016) | Wi-Fi, VPN or the link to the server, or a server restart |
| Worked, slowly | `smb_client_security_call_slow` (value) (30955); server side `smb_server_operation_slow` (value) (1020, 1047, 1054) | The domain controller, the server's storage, or the network |

The client also logs routine connectivity records with no reason, such as disconnects (30804) and transport bindings; group by `provider_name` (LQL) and `event_id` (LQL) only when the curated reasons say nothing.

**Device health first.** Ask `query_device_health` (tool) for the user's device's network reading over the complaint window (`guides/device-state-fields.md`, **Choose the view**).
Confirmed outages, Wi-Fi drops, a move to another network or a VPN route that times out at the failure times explain SMB losses before anything SMB logs: `playbooks/network-connectivity.md`, or `playbooks/application-network-stall.md` when only the share's server stalls while everything else works.
The network key `sparklogs.data.performance.network_context_key` (LQL) tells the networks a device was on apart, and a `vpn_` (other) key is a device whose main connection runs over a VPN: compare it with devices that do reach the server (`guides/device-state-fields.md`, **Network outages**).
A laptop off the office network with no VPN cannot reach an internal file server, and its timeouts and unresolved names are expected.
On the file server, read the device overview over the same window: disk latency, CPU, memory and the changes before the onset.
The services rows for the Server service (LanmanServer) on the file server and the Workstation service (LanmanWorkstation) on the client say whether SMB was running at all: `playbooks/service-failures.md`.
The file server's current state lists the shares it offers, with their folders and share permissions; a share that is missing or whose permissions changed before the complaint is a direct answer.

**Events, for what health named.** The device's SMB failures, by reason and server:

```lql
source = "<host>" AND (service = file_sharing OR sparklogs.reason in (smb_delayed_write_lost, group_policy_drive_map_failed)) AND sparklogs.reason!
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL) and `sparklogs.destination.host` (LQL), then by `sparklogs.result.code` (LQL) inside the server the user named.
Read them in time order around the complaint: a run of failures that starts at a boot, a sign-in, a network change or a password change says when.

Whether other devices reach the same server, by device:

```lql
service = file_sharing AND sparklogs.destination.host: "<server short name>" AND sparklogs.reason!
```

Group by `source` (LQL) and `sparklogs.reason` (LQL). Recoveries (`recovered` (value) on the session and share reasons) on other devices in the same minutes mean the server was up.
Every device failing to one server at once is the server or the path to it; one device alone is that device, its network or its credential.

**Common causes and their evidence.**

- **The device is not on a network that reaches the server.** Timeouts (`0xc00000b5`), unreachable (`0xc000023d`) and refused (`0xc0000236`) connections, or unresolved names (30800), every few minutes all day to one internal server, while the device is otherwise online. A laptop at home or a branch without the VPN, or a device whose path to TCP 445 is blocked by a firewall or the ISP. Check whether other devices reached that server in the same hours, and the device's VPN and network context. QUIC errors on the same failures (`0xc0240005` idle, `0xc0240006` timed out) are the client's SMB over QUIC attempt after TCP did not answer; read the TCP status beside them.
- **Wi-Fi or VPN drops.** `smb_session_lost` (value) and `smb_share_connection_lost` (value) with status `0xc000020c` (disconnected), each followed by its recovery seconds later, in the same minutes as Wi-Fi reconnects or a VPN reconnect. `smb_delayed_write_lost` (value) in those minutes means a save was lost: tell the user which file. The fix is the network: `playbooks/network-connectivity.md`.
- **The server went away.** Many devices lose sessions to one server at the same minutes, with status `0xc0000203` (the server deleted the session) after a server restart or failover. On the server, a boot or a Server service restart in those minutes confirms it, and `smb_session_reopen_failed` (value) follows for files clients held open. When the file server is also the DNS server, DNS timeouts to its address in the same minutes point at the server or its network, not at SMB.
- **A stale password or wrong account.** On the file server, `smb_session_auth_failed` (value) `credential_refused` (value) from one client address again and again. The 551 row has the client but often no account; the server's own Security sign-in failure from the same address names it:

  ```lql
  source = "<server>" AND ((sparklogs.reason = sign_in_failed AND win.eventlog.security.logon_type = 3) OR sparklogs.reason = account_locked_out)
  ```

  Group by `sparklogs.origin.ip` (LQL), `sparklogs.actor.name` (LQL), `win.eventlog.security.workstation` (LQL) and `win.eventlog.security.status_meaning` (LQL).
  A wrong password from one machine every few seconds is a saved credential: a mapped drive with stored credentials (`cmdkey /list`), a scheduled task or service account, a backup or hypervisor host, a copier's scan-to-folder account. When the status moves to `STATUS_ACCOUNT_LOCKED_OUT` the same source locked the account (`account_locked_out` (value)); it locks again as soon as it is unlocked until the stored password changes. For a domain account the lockout is also written on the domain controllers, with the caller machine.
  On the client side the same failure is `smb_client_auth_context_failed` (value) `logon_denied` (value), or `other` (value) with a status such as `STATUS_ACCOUNT_DISABLED` or `STATUS_PASSWORD_EXPIRED`.
- **Kerberos reached the wrong machine.** `smb_client_auth_context_failed` (value) `wrong_principal` (value) (`SEC_E_WRONG_PRINCIPAL`): the client got a ticket for the name it asked for, and a different machine answered. A DNS alias or an address used without a matching SPN causes it, and so does a stale DNS record that still points the name at an address another computer now holds. The System log's Kerberos error names the machine that actually answered:

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-Security-Kerberos" AND event_id = 4
```
<!-- confirmed with data on 2026-11-12 -->

"The Kerberos client received a KRB_AP_ERR_MODIFIED error from the server X ... The target name used was cifs/Y": Y is the name asked for, X the computer that holds Y's address. Fix the DNS record (scavenging, a duplicate or a static record) or register the alias SPN (`setspn -S cifs/<alias> <server>`). A management server reaching many workstations by name shows this for each workstation whose address changed hands.
- **No domain controller, or the clock.** `no_authority` (value) (`SEC_E_NO_AUTHENTICATING_AUTHORITY`) or `STATUS_TIME_DIFFERENCE_AT_DC` on the client: Kerberos could not reach a domain controller, or the clock is more than five minutes off. `time_sync_failed` (value) and `os_clock_drift` (value) on the device, and the VPN state, come next. `smb_client_security_call_slow` (value) is the same wait as a delay rather than a failure.
- **Permissions.** `smb_share_access_denied` (value) on the server names the share and the user: either the share permissions or the NTFS permissions deny. Look for `network_share_permissions_changed` (value) on the server before the complaint, and for a group membership change of the user (`playbooks/what-changed.md`). A share that stopped existing is `smb_share_recreate_failed` (value) at the Server service's start.
- **A guest-only NAS or old device.** `smb_insecure_guest_rejected` (value): Windows 10 and 11 Enterprise and Education, Windows Server 2019 and later, and Windows 11 Pro from 24H2 refuse guest access by default, so a NAS, a printer's scan share or an old PC sharing without accounts stops working after an upgrade. Give the share an account; turning guest access back on (`smb_insecure_guest_allowed` (value), `smb_security_setting_nondefault` (value) `guest_auth` (value)) removes signing and encryption. On the server side, an SMB 1.0 client refused is `smb_legacy_dialect_rejected` (value), and the event names the device to update.
- **Signing and NTLM hardening.** Windows 11 24H2 and Windows Server 2025 require SMB signing by default, and can block NTLM for SMB. After an upgrade a third-party NAS that signs some replies wrongly fails `smb_signing_validation_failed` (value) or refuses the connection; connecting by IP address or by an alias forces NTLM. `smb_client_mutual_auth_lost` (value) is a session that fell back from Kerberos to NTLM. Update the NAS firmware rather than turn signing off.
- **A slow server.** `smb_server_operation_slow` (value) on the server: `filesystem` (value) (1020) is its own storage (antivirus filter drivers, disk load, backup snapshots), `network` (value) (1054) is clients slow to receive, `session_setup` (value) (1047) is the server waiting on a domain controller. Read `win.eventlog.network.smb_operation_duration` (LQL) against `win.eventlog.network.smb_operation_threshold` (LQL), and line a short burst up with the server's backup or snapshot window and its disk readings. Slowness the client sees with no server record is the network: `playbooks/application-network-stall.md`.
- **Too many connections to a PC used as a server.** `STATUS_REQUEST_NOT_ACCEPTED` (`0xc00000d0`) on the sharing device's session failures: a Windows client edition accepts about 20 inbound SMB sessions. Move the shared data to a server.
- **Mapped drives by policy.** `group_policy_drive_map_failed` (value) names the letter, the share and the error at each policy refresh; `playbooks/group-policy.md` covers drive maps and preference items.

The server's sessions and losses, by client and code:

```lql
source = "<server>" AND sparklogs.reason in (smb_session_auth_failed, smb_share_access_denied, smb_session_reopen_failed, smb_server_operation_slow)
```

Group by `sparklogs.reason` (LQL), `user_data.ClientName` (LQL) and `sparklogs.result.code` (LQL); add `win.eventlog.network.smb_share_name` (LQL) and `user_data.UserName` (LQL) for the share and the user.

**Signals that are not the problem.** `smb_anonymous_access_denied` (value) from private addresses, `smb_connect_failed` (value) `access_denied` (value) on `C$`, `ADMIN$` or `IPC$` (inventory and management tools), `smb_share_access_denied` (value) nobody reported, `smb_server_transport_bind_failed` (value) on a workstation as adapters come and go, and a session loss followed by its recovery around sleep or a network change.

**What changed before it started.** A Windows feature update (guest and signing defaults), a NAS firmware update, a password change, a server rename or move, new share permissions or a new firewall rule just before the first failure is the usual cause: `playbooks/what-changed.md`, ranked against the first failure.

**Not this playbook.**
The device's internet or network is down for everything: `playbooks/network-connectivity.md`.
Account lockouts with no file share involved, and password guessing: `themes/windows-security-and-audit.md`.
SYSVOL or NETLOGON failing to replicate between domain controllers: `playbooks/directory-replication-failure.md`.

**When to stop.** When the far end runs no agent (a NAS, a copier, a cloud file service), report the client's error, the server name, the status and the times, and hand off to that device's own logs or vendor.

**Off-endpoint** (HM20): the NAS or file server without the agent, DNS and DHCP servers, domain controllers, firewalls and VPN concentrators on the path, the copier's own configuration.
