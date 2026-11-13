---
index: Who changed what (Security)
---

# Windows security and audit

**Data feed:** `win.eventlog.security` (value). Open `feeds/win.eventlog.security/README.md`, then one artifact.
Explore: `guides/stream-kinds/wel-security.md`.

Defender is not this theme. Use `themes/endpoint-protection.md`.
PowerShell script blocks (`win.powershell.eventlog` (value)): `playbooks/powershell-script-blocks.md`.
Certificate authority audit (`adcs_config_changed` (value), `adcs_audit_evidence_tampered` (value)) and domain controller smart card certificates: `playbooks/certificate-expiry.md`.

## Change analysis: what changed, and who

Change-class events keep actor join keys: subject user, logon id, origin IP, process creation (4688), service install, scheduled-task change, GPO.
A new or rewritten scheduled task as persistence: `playbooks/scheduled-task-failures.md` (**A task you did not expect**). Which policy objects a device applied and when: `playbooks/group-policy.md`.

1. Set the window from symptom onset (`playbooks/what-changed.md` bounds it and ranks the device's changes).
2. Sweep change-class reasons in that window (grouped `sparklogs.reason` (LQL) / `category` (LQL)). Include System `service_installed` (value) (SCM 7045) as a cross-feed witness; Security 4697 is the Security-channel sibling.
3. Attribute: actor keys on the change event; join that logon session. Logon type 10 is RDP; origin IP is on the logon row.
4. Expand: everything the same `SubjectLogonId` / actor name touched in the window.

Worked Security pivots: `feeds/win.eventlog.security/recipes.md`. Field names: `fields.md`. Do not read the whole reasons file; search the `##` heading for the reason.

Never key on a Windows event id alone. Security 4625 is logon failure; Application/System can emit other 4625s. Provider + channel + id.
