<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.network`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `dhcp_address_conflict_detected` | `networking` | Warning |  |
| `dhcp_lease_denied` | `networking` | Warning |  |
| `dhcp_lease_failed` | `networking` | Warning |  |
| `dns_client_resolution_timed_out` | `networking` | Warning |  |
| `firewall_rule_changed` | `networking` | Notice |  |
| `offline_files_slow_link_transition_blocked` | `file_sharing` | Warning |  |
| `offline_files_sync_failed` | `file_sharing` | Warning |  |
| `rds_redirected_printer_setup_failed` | `printing` | Warning |  |
| `smb_anonymous_access_denied` | `file_sharing` | Notice |  |
| `smb_anonymous_access_enabled` | `file_sharing` | Notice |  |
| `smb_client_auth_context_failed` | `file_sharing` | Warning |  |
| `smb_client_mutual_auth_lost` | `file_sharing` | Warning |  |
| `smb_client_security_call_slow` | `file_sharing` | Notice |  |
| `smb_connect_failed` | `file_sharing` | Warning |  |
| `smb_insecure_guest_allowed` | `file_sharing` | Warning |  |
| `smb_insecure_guest_rejected` | `file_sharing` | Warning |  |
| `smb_legacy_dialect_rejected` | `file_sharing` | Notice |  |
| `smb_security_setting_nondefault` | `file_sharing` | Notice |  |
| `smb_server_name_unresolved` | `file_sharing` | Warning |  |
| `smb_server_operation_slow` | `file_sharing` | Notice |  |
| `smb_session_auth_failed` | `file_sharing` | Warning or Notice |  |
| `smb_session_lost` | `file_sharing` | Warning or Info |  |
| `smb_session_reopen_failed` | `file_sharing` | Warning |  |
| `smb_share_access_denied` | `file_sharing` | Warning |  |
| `smb_share_connection_lost` | `file_sharing` | Warning or Info |  |
| `smb_signing_validation_failed` | `file_sharing` | Warning |  |
| `wfp_transaction_watchdog_timeout` | `networking` | Warning |  |
| `wlan_connect_failed` | `networking` | Warning or Info |  |
| `wlan_security_handshake_failed` | `networking` | Warning |  |

## `dhcp_address_conflict_detected`

The DHCP client detected an address conflict.

**Severity:** Warning

**Impact:** Connectivity may flap until the conflict is resolved.

**Consider:**

- Take no action on a single conflict: the client requests a new address on its own.
- Repeated conflicts on one subnet point at the DHCP scope or the lease period, not at the client.

## `dhcp_lease_denied`

The DHCP server denied a lease request.

**Severity:** Warning

**Impact:** The host stays unaddressed until policy or server configuration changes.

**Consider:**

- Take no action on an isolated denial: the client asks for a new address on its own, and ipconfig /release then /renew retries immediately instead of waiting for that.
- A run of denials means the address is no longer valid in the scope; check the scope and lease period on the DHCP server.

## `dhcp_lease_failed`

The DHCP client could not obtain a lease.

**Severity:** Warning

**Impact:** The host may have no IPv4 address until DHCP succeeds.

## `dns_client_resolution_timed_out`

A DNS client query timed out.

**Severity:** Warning

**Impact:** Name-dependent services fail until resolution succeeds.

**Consider:**

- Read this as unreachable DNS servers, not a missing record: a negative answer stops the client without a timeout.
- The client works through the servers configured on the adapter on one short fixed budget, so how many are listed and in what order decides whether a reachable one is reached before it gives up; put a reachable server first. The reference below carries the current timings.

## `firewall_rule_changed`

The Windows Firewall service reported that a rule was added, modified, or deleted. The payload identifies the rule and selected properties.

**Also reported by:** `win.eventlog.security`

**Severity:** Notice

**Impact:** This record describes firewall configuration activity. It does not prove effective enforcement or network exposure.

**Consider:**

- Use the event to identify the rule change and its actor or source where available.
- Inspect the resulting firewall policy and test the relevant traffic path before deciding whether the change altered effective access.

## `offline_files_slow_link_transition_blocked`

Offline Files could not change sync mode for a slow link.

**Severity:** Warning

**Impact:** The folder stays in its prior mode until policy or connectivity allows the transition.

**Consider:**

- Check the Configure slow-link mode policy before treating this as a fault: a latency threshold of 1 ms is Always Offline mode, where no transition to online is expected.
- Where Always Offline is not intended, the folder in the promoted path is waiting on link latency against whatever threshold that policy sets.

## `offline_files_sync_failed`

Offline Files background synchronization failed.

**Severity:** Warning

**Impact:** Redirected folders may be stale until sync succeeds.

## `rds_redirected_printer_setup_failed`

RDS redirected printer setup failed.

**Severity:** Warning

**Impact:** Session printing may be unavailable until setup succeeds.

**Consider:**

- Take no action on the configuration-not-restored arm: Windows applies the default configuration when the queue is created.
- On the default-not-set arm, expect it on sessions with more than one redirected queue after a reconnect, where the spooler did not enumerate a disconnected queue.
- Where the queue itself is missing rather than misconfigured, check whether Easy Print is disabled, which makes the host require a matching driver for the promoted printer name.

## `smb_anonymous_access_denied`

This server refused anonymous access at the share or server scope.

**Severity:** Notice

**Impact:** The refusal is expected when anonymous access is disabled.

## `smb_anonymous_access_enabled`

The server reported that one or more named pipes or shares are marked for anonymous access. The event does not identify the resource or prove that a remote client can reach it.

**Severity:** Notice

**Impact:** This is a posture finding. Confirm the affected resources and the intended access path before treating it as an exposure.

**Consider:**

- List the server's named pipes and shares, then check which are marked for anonymous access.
- Test the intended access path separately.
- Where the setting is deliberate, record why; where it is not, remove it.

## `smb_client_auth_context_failed`

The SMB client could not build an authentication context for a server.

**Severity:** Warning

**Impact:** The user cannot open resources on that server until credentials or domain reachability recover.

**Consider:**

- On the wrong-principal arm, check whether the promoted server name is a CNAME alias: the server needs an SPN registered for the alias it is reached by.
- Where the alias SPN is correct and the failure persists, check SMB server name hardening on the server (SmbServerNameHardeningLevel).
- On the no-authority arm, connect by the server's Kerberos-capable FQDN rather than an IP address or workgroup name, and confirm the client can reach a domain controller.

## `smb_client_mutual_auth_lost`

SMB mutual authentication was lost after the client re-authenticated.

**Severity:** Warning

**Impact:** The client may continue but without the mutual authentication guarantee.

**Consider:**

- Compare the old and new auth protocol ids: a move off Kerberos is what removed the mutual-authentication guarantee.
- Check how the promoted server name is reached: connecting by IP address or by a CNAME alias makes the client use NTLM instead of Kerberos.

## `smb_client_security_call_slow`

An SMB client security call exceeded its slow threshold.

**Severity:** Notice

**Impact:** Operations may lag until the call completes; nothing failed.

## `smb_connect_failed`

An SMB connection attempt failed after the server name resolved.

**Severity:** Warning

**Impact:** Applications cannot reach the share or server until connectivity or permissions improve.

**Consider:**

- On the timeout arm, check for a listener on TCP 445 on the named server and that the File and Printer Sharing (SMB-In) rules are enabled; a blocking firewall is the usual cause.
- Where the firewall looks clean, run a netsh wfp trace during a retry to name the rule or program dropping the traffic.
- On the access-denied arm, check whether the client now requires SMB signing or blocks NTLM: both became defaults in Windows 11 24H2 and Windows Server 2025 and both deny connections that worked before an upgrade.

## `smb_insecure_guest_allowed`

The SMB client allowed an insecure guest connection.

**Severity:** Warning

**Impact:** Traffic to that server may proceed without proving user identity.

**Consider:**

- Treat the traffic to the promoted server as unsigned and unencrypted: guest logons support neither, which is what makes them interceptable.
- Find what set AllowInsecureGuestAuth on this client and give the target real credentials instead; the setting is a temporary workaround, not a configuration to leave in place.

## `smb_insecure_guest_rejected`

The SMB client rejected an insecure guest connection.

**Severity:** Warning

**Impact:** The share stays unreachable until guest access is allowed or proper credentials are supplied.

**Consider:**

- Give the promoted server real credentials: it accepted the client as an unauthenticated guest, and the client refused.
- Do not re-enable insecure guest logons to clear this; it exposes the client to rogue-server and interception attacks.

## `smb_legacy_dialect_rejected`

This server rejected a legacy SMB dialect.

**Severity:** Notice

**Impact:** Older clients cannot connect until they negotiate a supported dialect.

**Consider:**

- Read the rejected client name and address from the event: that device, not the server, is the thing to fix.
- Expect scan-to-share printers and other appliances here; they are the documented casualties of disabling SMB 1.0.
- Do not re-enable SMB 1.0 to clear this; secure dialect negotiation cannot stop a downgrade to SMB 1.0.

## `smb_security_setting_nondefault`

An SMB security setting on this device differs from the Windows default. The payload names the setting and configured value.

**Severity:** Notice

**Impact:** The value can strengthen or weaken protection depending on the setting and the direction of the change. The event alone does not classify the change as safer or weaker.

**Consider:**

- Read the setting name, configured value, and stated default.
- Identify the policy that set it, then interpret the value for that setting.
- Review guest authentication, compatibility, and signing settings separately.

## `smb_server_name_unresolved`

The SMB client could not resolve a server name.

**Severity:** Warning

**Impact:** File shares on that server name stay unreachable until name resolution works.

## `smb_server_operation_slow`

An SMB server operation exceeded its slow threshold.

**Severity:** Notice

**Impact:** The operation completed but took longer than the server expected.

**Consider:**

- On the filesystem arm, look at storage rather than SMB: the default threshold is 15 seconds and the server is waiting on the local file system.
- Check the usual delay sources on that host: file system filter drivers such as antivirus, disk load, and backup or VSS freezes.
- For extreme delays, check for events 1031 and 1032 on the same host and collect the dump from %SystemRoot%\LiveKernelReports.

## `smb_session_auth_failed`

An SMB session authentication attempt on this server failed.

**Severity:** Warning or Notice

**Impact:** Clients cannot open a session until credentials or policy change.

**Consider:**

- Where the promoted SPN validation policy requires the client to supply an SPN, pair this with Security 5168 on the same host: a client still using NTLMv1 or LM sends no SPN and always fails.
- On the anonymous arm, the client sent no credentials at all; give the device an account rather than loosening the server.
- On a run of failures, expect the authentication rate limiter on Windows Server 2022 and later to add about 2 seconds per attempt, which reads as slowness rather than denial.

## `smb_session_lost`

An SMB session to a server was lost or recovered.

**Severity:** Warning or Info

**Impact:** Open files on that session fail until the client reconnects.

## `smb_session_reopen_failed`

The server could not reopen an SMB file after the client returned.

**Severity:** Warning

**Impact:** The application may hang or report a lost document until the user reopens the file.

## `smb_share_access_denied`

A share on this server denied access to a client.

**Severity:** Warning

**Impact:** The user cannot open the share until permissions change.

**Consider:**

- Check both the share permissions and the NTFS permissions on the promoted share: either one denying is enough.
- Compare the granted and mapped access in the promoted fields; where the two disagree on a NAS target, check for a missing SYNCHRONIZE entry on the folder.

## `smb_share_connection_lost`

An SMB share tree connection was lost or recovered.

**Severity:** Warning or Info

**Impact:** Applications using that share see I/O errors until the tree reconnects.

## `smb_signing_validation_failed`

SMB signing or encryption validation failed for a session.

**Severity:** Warning

**Impact:** The client refuses or drops traffic that does not meet the configured security requirement.

**Consider:**

- Check what the promoted server is: third-party servers and NAS appliances that do not sign error responses fail this check, and the fix is a firmware update from the vendor.
- Do not disable secure negotiate or drop the signing requirement to clear it; that removes the protection the check exists for.
- Where the target is a Windows server, check whether clients reach it by IP address or CNAME: both force NTLM instead of Kerberos and weaken the session key.

## `wfp_transaction_watchdog_timeout`

A Windows Filtering Platform transaction hit a watchdog timeout.

**Severity:** Warning

**Impact:** Firewall or filter policy changes may be incomplete until the platform recovers.

## `wlan_connect_failed`

WLAN AutoConfig failed to connect using a saved profile.

**Severity:** Warning or Info

**Impact:** Wireless apps on that profile stay offline until the join succeeds.

**Consider:**

- On the not-visible arm, treat this as the profile's network being out of range, not as a credential problem.
- On the join arm, read the promoted failure reason first; on an 802.1X network, check NPS event 6273 on the RADIUS server for the rejection reason.
- Check the client and server certificates before the profile: invalid, expired or unrevocable certificates are the most common 802.1X cause.

## `wlan_security_handshake_failed`

A wireless security handshake did not finish.

**Severity:** Warning

**Impact:** The device cannot use the network until the key exchange succeeds.

**Consider:**

- Read the promoted reason text, then check NPS event 6273 on the RADIUS server for the matching rejection.
- Where the reason points at the certificate, enable the CAPI2 operational log on the client and reproduce: it is off by default and carries the chain and revocation detail.
