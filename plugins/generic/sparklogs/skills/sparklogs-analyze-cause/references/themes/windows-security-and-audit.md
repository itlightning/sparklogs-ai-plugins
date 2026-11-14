# Windows security and audit

**Data feed:** `win.eventlog.security`. Open `../feeds/win.eventlog.security/README.md`, then one artifact.
Explore: `../guides/stream-kinds/wel-security.md`.

Defender is not this theme. Use `endpoint-protection.md`.
PowerShell script blocks (`win.powershell.eventlog`): `../playbooks/powershell-script-blocks.md`.
Certificate authority audit (`adcs_config_changed`, `adcs_audit_evidence_tampered`) and domain controller smart card certificates: `../playbooks/certificate-expiry.md`.

## Change analysis: what changed, and who

Change-class events keep actor join keys: subject user, logon id, origin IP, process creation (4688), service install, scheduled-task change, GPO.
A new or rewritten scheduled task as persistence: `../playbooks/scheduled-task-failures.md` (**A task you did not expect**). Which policy objects a device applied and when: `../playbooks/group-policy.md`.

1. Set the window from symptom onset (`../playbooks/what-changed.md` bounds it and ranks the device's changes).
2. Sweep change-class reasons in that window (grouped `sparklogs.reason` (LQL) / `category` (LQL)). Include System `service_installed` (SCM 7045) as a cross-feed witness; Security 4697 is the Security-channel sibling.
3. Attribute: actor keys on the change event; join that logon session. Logon type 10 is RDP; origin IP is on the logon row.
4. Expand: everything the same `SubjectLogonId` / actor name touched in the window.

Worked Security pivots: `../feeds/win.eventlog.security/recipes.md`. Field names: `fields.md`. Do not read the whole reasons file; search the `##` heading for the reason.

Never key on a Windows event id alone. Security 4625 is logon failure; Application/System can emit other 4625s. Provider + channel + id.

## Sign-in failures and lockouts

A locked account is `account_locked_out` (4740). The domain controllers write it for a domain account, so it reaches SparkLogs only from controllers that run the agent.
The locked account is `sparklogs.target.name` (LQL). The machine whose failed attempts crossed the threshold is `win.eventlog.security.caller_computer` (LQL), a NetBIOS-style name that can differ from that device's `source` (LQL).
The failures behind a lockout come from two places. The machine the user or service signed in to writes `sign_in_failed` (4625), naming the sending machine in `win.eventlog.security.workstation` (LQL) and `sparklogs.origin.ip` (LQL). The controllers write `kerberos_preauth_failed` (4771), with the client address in `sparklogs.origin.ip` (LQL).
On both, the failing account is `sparklogs.actor.name` (LQL), not the target.
Group the account's failures by `sparklogs.origin.ip` (LQL) to find the caller, and by `win.eventlog.security.status_meaning` (LQL) for the cause. The code tables are in `../feeds/win.eventlog.security/enums.md`: **win_status_codes** for the NTSTATUS codes on 4625, **kerberos** for the result codes on 4771.
From the lockout to the process still sending the old password: `../feeds/win.eventlog.security/recipes.md` (**Find the machine holding the stale credential**).
Many accounts failing or locking out from one address is password guessing.
Entra ID smart lockout and cloud sign-in failures are recorded in the Entra sign-in logs.
