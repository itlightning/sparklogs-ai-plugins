---
index: Slow logon
aliases:
  - label: Temporary profile or profile will not load
  - label: Sign-in stuck at Welcome or Please wait
---

# Slow logon

**Trigger.** "Logon takes `<duration>` since `<when>`", "stuck on Welcome" or "Please wait for the Group Policy Client", "I got a temporary profile", or "it asks for my password again and again".

**Accuracy.** Windows writes a record at each step of a sign-in, each with its own time, and SparkLogs collects those channels beyond the curated events: Winlogon's authentication start and result, the User Profile Service's profile load, the Group Policy user pass, the session manager's session logon and shell start, and Winlogon's notice when one component holds up the sign-in for more than a minute.
Most of these are Debug or Info. Do not filter by severity: the routine records are the timeline.
The timeline runs from the moment Windows accepted the credentials to the moment it started the shell. It does not include time the user spent at the lock screen or typing, and it ends before Explorer, startup apps, OneDrive and mapped drives finish. A desktop that appears quickly and then stays unusable is the machine's load or work started after the shell: `playbooks/slow-device.md`.
An authentication with no profile load after it is an unlock, a reconnect to an existing session or a credential prompt, not a new sign-in. Pair records by session number, not by the next record in time.
An empty result is not health. A device with no Winlogon or profile records in the window had no sign-in then, or its channels were not collected: check the agent's feed health for `win.eventlog.identity_security` (value) first.
The agent's DNS probe times its own lookups, not the lookups a sign-in makes.

**Feeds.** The sign-in timeline (`provider_name` (LQL), event ids):

| Step | Feed (`subsource` (LQL)) | Provider and ids |
|---|---|---|
| Credentials checked | `win.eventlog.identity_security` (value) | `Microsoft-Windows-Winlogon` (other) 1 (authentication started), 2 (stopped, with `event_data.Win32Status` (LQL)) |
| Sign-in recorded | `win.eventlog.security` (value) | `Microsoft-Windows-Security-Auditing` (other) 4624, with `win.eventlog.security.logon_type_name` (LQL), `win.eventlog.security.auth_package` (LQL) and `sparklogs.actor.name` (LQL); 4625 is `sign_in_failed` (value) |
| Profile loaded | `win.eventlog.identity_security` (value) | `Microsoft-Windows-User Profiles Service` (other) 1 (logon notification for `event_data.Session` (LQL)), 5 (registry hive loaded), 67 (`event_data.ProfileType` (LQL) and `event_data.LocalPath` (LQL)), 6 and 7 (roaming copy from `event_data.Source` (LQL)), 70, 71 and 74 (waiting for the network), 2 (finished) |
| User policy applied | `win.eventlog.identity_security` (value) | `Microsoft-Windows-GroupPolicy` (other) 4001 (start), 5340 (synchronous or asynchronous), 8001 (end, with `event_data.PolicyElaspedTimeInSeconds` (LQL)) |
| Session and shell | `win.eventlog.network` (value) | `Microsoft-Windows-TerminalServices-LocalSessionManager` (other) 21 (session logon succeeded), 22 (shell start), 25 (reconnected), 23 (logoff), each with `user_data.User` (LQL) and `user_data.SessionID` (LQL) |
| A component held it up | `win.eventlog.application` (value) | `Microsoft-Windows-Winlogon` (other) 6005 (still running after a minute), 6006 (took N seconds); the component and the notification (CreateSession, Logon, StartShell, Logoff) are in the message |
| Profile failures | `win.eventlog.application` (value) | `win_user_profile_load_failed` (value) (1511 temporary profile, 1542 classes hive), uncurated 1500, 1502, 1508, 1509, 1515, 1533 |
| First sign-in after a boot | `win.eventlog.platform` (value) | `Microsoft-Windows-Diagnostics-Performance` (other) 100, reason `os_boot_duration_high` (value): `event_data.BootUserProfileProcessingTime` (LQL), `event_data.BootExplorerInitTime` (LQL), `event_data.BootPostBootTime` (LQL), `event_data.BootNumStartupApps` (LQL), in milliseconds |

Sign-in failures and Entra: `feeds/win.eventlog.security/reasons.md` and `feeds/win.eventlog.identity_security/reasons.md`; status codes in `feeds/win.eventlog.security/enums.md`.
User Profile Service records are service `user_profiles` (value); Winlogon and the sign-in failures are `auth` (value).

**Where the time went.** A sign-in runs in order: check the credentials, wait for any computer policy or update work still running from the boot, load the profile, apply user policy, start the shell. Put the slow sign-in on the timeline below and read the gap between consecutive steps: the step before the long gap is the one that waited.

| Long gap | Witness | Usual cause |
|---|---|---|
| Winlogon 1 to 2 | `event_data.Win32Status` (LQL) 1311 (no logon servers) after a long wait; 4625 with `win.eventlog.security.status_meaning` (LQL) `no_logon_servers` (value); NETLOGON 5719 as `domain_secure_channel_failed` (value) | No domain controller reachable at sign-in: off the network, VPN not up, Wi-Fi not joined, DNS not pointing at the domain |
| Before the profile load, at boot | 6006 naming `GPClient` (other) for CreateSession; a long 8000 | Computer policy still running when the user signed in: `playbooks/group-policy.md` |
| Before the profile load, at boot | 6006 naming `TrustedInstaller` (other) for CreateSession | Updates finishing at boot ("Working on updates"): `playbooks/windows-update-failure.md` |
| Profile 1 to 2 | 6006 naming `Profiles` (other) for Logon; 6 and 7 (roaming copy); 70 then 71 (waited for a network that never came) | Roaming profile copied over a slow link, a large profile, the profile server unreachable, many profiles on a terminal server, a slow or busy disk |
| 4001 to 8001 | 6006 naming `GPClient` (other) for Logon; 5340 says synchronous | User policy run in the foreground, one extension waiting: `playbooks/group-policy.md` (**Slow startup or logon from Group Policy**) |
| After shell start | No witness on the timeline | Startup apps, logon scripts, OneDrive, security software, the machine's load: `playbooks/slow-device.md` |

When user policy is synchronous, the session manager writes 21 and 22 only after 8001, so a long gap from profile 2 to 21 with a matching 6006 is the wait the user saw.
6005 marks a component that has run for a minute, and 6006 its total. The same seconds on 6006 and 8001 tie the wait to policy; on 6006 and the profile pair, to the profile.

**Device health first.** `query_device_health` (tool); views and how to read them: `guides/device-state-fields.md` (**Choose the view**).

- The device's overview reading over a window that holds several slow sign-ins, at the narrowest bucket the window allows: CPU or disk heat that starts at the sign-in times, and its contributors, shows what the machine was busy with. A sign-in is short, so read the evidence and events as well as the heat spans; pressure shorter than a bucket leaves no span. Boots and resumes (`host_booted` (value), `host_resume_settled` (value)) say whether each slow sign-in was the first after a boot, when the machine is busiest.
- Its performance readings carry `sparklogs.data.performance.user_session_count` (LQL) and `sparklogs.data.performance.user_session_disconnected_count` (LQL): counts of signed-in sessions, no names. On a terminal server they show how many sessions were open at the slow time.
- Its network reading over the same window: DNS and gateway outages, link drops, Wi-Fi drops, network changes and TCP by route class (LAN, VPN, internet). A sign-in at a boot with the link down, Wi-Fi not joined or no VPN cannot reach a domain controller; `playbooks/network-connectivity.md` for the network itself.
- Its system identity in the current state: `sparklogs.data.system_info.domain_join_type` (LQL) (`ad` (other), `hybrid` (other), `entra` (other), `workgroup` (other)). An Entra-only or workgroup device has no domain policy and no domain controller wait; its sign-in waits are profile load, Entra and the machine.

**Events, for what health named.** First find every spelling of the account: on an Entra-joined or hybrid device one user signs in as the SAM name, the UPN and `AzureAD\<UPN>`, and the session manager writes `DOMAIN\user` or `AzureAD\<name>`.

```lql
source = "<host>" AND (sparklogs.actor.name: "<user part>" OR user_data.User: "<user part>")
```

Group by `sparklogs.actor.name` (LQL) and `user_data.User` (LQL), then take the names that are this user.

The sign-in timeline on the device, over a window around the slow sign-ins:

```lql
source = "<host>" AND ((provider_name = "Microsoft-Windows-Winlogon" AND event_id in (1, 2, 6005, 6006)) OR (provider_name = "Microsoft-Windows-User Profiles Service" AND event_id in (1, 2, 6, 7, 67, 70, 71)) OR (provider_name = "Microsoft-Windows-GroupPolicy" AND event_id in (4001, 5340, 8000, 8001)) OR (provider_name = "Microsoft-Windows-TerminalServices-LocalSessionManager" AND event_id in (21, 22, 25)))
```
<!-- confirmed with data on 2026-11-12 -->

Read it oldest first. A new sign-in is Winlogon 2 with result 0, then profile 1 for a session, then 67 naming the profile, then 4001 and 8001, then 21 and 22 for the same session. Winlogon 2 followed by 25 is a reconnect; followed by nothing is an unlock.
Add Security 4624 for the same seconds to read the logon type: `logon_cached_interactive` (value) means no domain controller answered at sign-in, so Windows used the cached credential, and the policy and profile steps after it could not reach the domain either.

Sign-ins that failed before one worked. Winlogon's own result, for every sign-in on the device:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-Winlogon" AND event_id = 2 AND event_data.Win32Status != 0
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_data.Win32Status` (LQL): 1326 wrong password or unknown user, 1327 an account restriction, 1311 no logon servers, 1385 logon type not granted, 1907 the password must change, 1909 locked out.
The decoded Security records for the account (`win.eventlog.security.status_meaning` (LQL) is the cause without opening the body):

```lql
sparklogs.reason in (sign_in_failed, kerberos_preauth_failed, kerberos_ticket_failed, ntlm_validation_failed, account_locked_out)
AND sparklogs.actor.name in ("<sam>", "<upn>", "AzureAD\\<upn>")
```

Group by `sparklogs.reason` (LQL) and `win.eventlog.security.status_meaning` (LQL).
Failing then retrying looks nothing like one slow sign-in: a run of failures followed by success is the user waiting on the network or a password, not a slow machine.
A lockout is written on the domain controllers and names the machine that sent the bad attempts (`win.eventlog.security.caller_computer` (LQL)); a separate playbook on account lockouts follows that trail.

Profile failures on the device:

```lql
source = "<host>" AND provider_name = "Microsoft-Windows-User Profiles Service" AND event_id in (1500, 1502, 1508, 1509, 1511, 1515, 1533, 1542)
```
<!-- confirmed with data on 2026-11-12 -->

1511 is a temporary profile: the user's changes are lost at sign-out. 1515 means Windows backed up the profile and will try the backup next time. 1500 and 1502 are a profile that would not load at all, 1508 and 1509 a registry hive that would not load, 1542 the classes hive, often held by another process. 1533 is a leftover TEMP folder from an earlier temporary profile.
At sign-out, 1512 and 1517 say a process still held the user's registry hive. A hive that is not unloaded at sign-out is a common cause of a temporary profile or a slow profile load at the next sign-in on shared and terminal servers. 1530 alone is routine.

**Entra and Windows Hello at sign-in.** On an Entra-joined or hybrid device the Entra plugin takes part in every sign-in:

```lql
source = "<host>" AND sparklogs.reason in (entra_sign_in_failed, entra_token_acquisition_failed, windows_hello_provisioning_blocked, windows_hello_key_registration_failed)
```

Group by `sparklogs.reason` (LQL) and `sparklogs.reason_variant` (LQL).
`entra_sign_in_failed` (value) with a wrong-password code is the user; with a network-unreachable code it is a device that could not reach Entra at sign-in, so it signed in with the cached credential, if it had one.
Token failures that are fallback steps or sign-in prompts are normal flow and appear around every sign-in; a disabled or locked account, or a device key the TPM could not use, is a real fault. `dsregcmd /status` on the device says whether the user has a primary refresh token (AzureAdPrt).
A Windows Hello PIN or face sign-in on a hybrid device needs a domain controller, or cloud Kerberos trust, to get a Kerberos ticket. Without one the sign-in completes and network resources then prompt or fail.

**Common causes and their evidence.**

- **Synchronous user policy waiting on one extension.** 5340 synchronous, a long 8001, 6006 `GPClient` (other) for Logon with the same seconds, and one extension with most of the time. Real cases: the printer preference taking minutes on every device of one client (a print server or driver download), and folder redirection running more than three minutes after a cached sign-in before failing. Windows can switch to synchronous processing for the next sign-in when folder redirection, a roaming profile, software installation or a synchronous logon script is configured, and "Always wait for the network at computer startup and logon" makes it permanent. Extension detail: `playbooks/group-policy.md`.
- **No domain controller at sign-in.** Winlogon result 1311, 4625 with `no_logon_servers` (value), Group Policy 5322 saying the boot waited the full time for the network, NETLOGON 5719, often on a laptop whose VPN connects only after sign-in. The first attempt fails or takes minutes; a later one succeeds or uses the cached credential.
- **Cached sign-in.** `logon_cached_interactive` (value) on 4624. Fast for the user, but policy, drive maps and folder redirection that need the domain then wait or fail, and a password changed elsewhere is not yet known to the device.
- **Roaming or redirected profile.** 67 with a roaming profile type, 6 and 7 copying from a server path, 70 and 71 waiting for the network. A large profile or a slow link to the profile server is the wait; an unreachable server gives a temporary or local profile.
- **Profile containers.** FSLogix and similar container products attach the profile disk during the profile step. Their own logs are not collected. A slow or failed attach shows as a long profile step or `win_user_profile_load_failed` (value) on a terminal server; the product's logs on the server (for FSLogix, under ProgramData) say why.
- **Updates at boot.** 6006 `TrustedInstaller` (other) for CreateSession: the user signed in while Windows finished installing updates.
- **Logon scripts.** Group Policy Operational 4018 and 5018 start and finish each script, with the script type in the message, and System 1130 is a script that failed. Since Windows 8.1 a logon script set by Group Policy starts five minutes after sign-in unless the logon script delay policy says otherwise; a script set to run synchronously holds the shell until it ends.
- **The machine itself.** A short timeline with a desktop that stays unusable: CPU, disk or memory heat at sign-in, many startup apps (`event_data.BootNumStartupApps` (LQL) and the 101 records naming slow startup apps after a boot), security software scanning the profile. `playbooks/slow-device.md`.
- **Clock skew.** Kerberos fails beyond five minutes of skew; `time_sync_failed` (value) and `os_clock_drift` (value) on the device, and the domain controllers' time.

**One device, one user or many.** Run the 6006 query over the organization and group by `source` (LQL):

```lql
provider_name = "Microsoft-Windows-Winlogon" AND event_id = 6006
```
<!-- confirmed with data on 2026-11-12 -->

Read the component and the seconds in the message. Many devices of one client held up by the same component at the same time point at what they share: one policy object, a print or file server, the profile server, the link to the domain controllers. One user slow on every device is that user's profile or policy; every user slow on one device is the device.

**What changed before it started.** A new or edited policy object, a new printer or drive map, a profile server move, a new VPN client, an update or new security software just before the first slow sign-in: `playbooks/what-changed.md`.

**Not this playbook.** Policy that does not apply at all: `playbooks/group-policy.md`. A machine that is slow all day, not only at sign-in: `playbooks/slow-device.md`. Account lockouts get their own playbook.

**When to stop.** The timeline names the step and the component, and the Windows records name the code. When the cause is a policy object, a profile server, a print server, Entra or a domain controller without the agent, report the step, the component, its seconds and the time, and hand off to `gpresult /h` on the device, the profile or print server's own logs, or the Entra sign-in logs.

**Off-endpoint** (HM2): conditional access, MFA services, federation servers, Entra Connect sync, the domain controllers' time, the profile and print servers, and the path between the user and the domain controllers.
