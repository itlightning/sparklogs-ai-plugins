---
index: Slow logon
---

# Slow logon

**Trigger.** "User reports logon takes `<duration>` since `<when>`."

**Accuracy.** Security sign-in events carry `win.eventlog.security.logon_type_name` (LQL), the authenticating package, and `sparklogs.actor.*`.
That separates cached interactive from network and names the account and origin.
Group Policy processing time is not curated; if the answer lives there, say so.
The agent's DNS probe times its own lookups, not the lookups a logon makes.

**Device health first.** `device_overview` (value) over a window that holds several slow logons, at a narrow `bucket` (arg).
CPU or disk heat spans that start at the logon times, and their contributors, show what the machine was busy with while the user waited.
Logon is short, so read `evidence` (col) and `events` (col) as well as heat: a pressure stretch shorter than `bucket_s` (col) leaves no span.
`device_network` (value) over the same window: DNS and gateway outages, link drops and network changes at logon time separate a path problem from a busy machine.

**Events, for what health named.** Sign-in shape for the account:

```
source = "<host>" AND sparklogs.actor.name = "<account>"
```

Group by `sparklogs.reason` (LQL), `win.eventlog.security.logon_type_name` (LQL).
Failing-then-retrying looks nothing like a slow single `logon_cached_interactive` (value).

Decoded auth failures (`win.eventlog.security.status_meaning` (LQL) is the cause without opening the body):

```
sparklogs.reason in (sign_in_failed, kerberos_preauth_failed, kerberos_ticket_failed, ntlm_validation_failed)
AND sparklogs.actor.name = "<account>"
```

Several users on one site slow, others not: same filter, group by `source` (LQL).
Standing conditions on the workstation: a device silent in the complaint window changes what you can conclude.

**Off-endpoint** (HM2): conditional-access, MFA cloud, federation certificates, PDC time drift, directory sync, path between user and DC.
