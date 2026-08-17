---
index: Who changed what (Security)
---

# Windows security and audit

**Data feed:** `win.eventlog.security`. Open `feeds/win.eventlog.security/README.md`, then one artifact.

Defender is not this theme. Use `themes/endpoint-protection.md`.

## Change analysis: what changed, and who

Change-class events keep actor join keys: subject user, logon id, origin IP, process creation (4688), service install, scheduled-task change, GPO.

1. Set the window from symptom onset.
2. Sweep change-class reasons in that window (grouped `sparklogs.reason` / `category`). Include System `service_installed` (SCM 7045) as a cross-feed witness; Security 4697 is the Security-channel sibling.
3. Attribute: actor keys on the change event; join that logon session. Logon type 10 is RDP; origin IP is on the logon row.
4. Expand: everything the same `SubjectLogonId` / actor name touched in the window.

Worked Security pivots: `feeds/win.eventlog.security/recipes.md`. Field names: `fields.md`. Do not read the whole reasons file; search the `##` heading for the reason slug.

Never key on a Windows event id alone. Security 4625 is logon failure; Application/System can emit other 4625s. Provider + channel + id.
