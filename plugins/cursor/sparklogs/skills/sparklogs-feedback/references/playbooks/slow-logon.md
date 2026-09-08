# Slow logon

**Trigger.** "User reports logon takes `<duration>` since `<when>`."

**Accuracy.** Security sign-in events carry `win.eventlog.security.logon_type_name` (LQL), the authenticating package, and `sparklogs.actor.*`.
That separates cached interactive from network and names the account and origin.
Group Policy processing time and DNS latency are not curated; if the answer lives there, say so.

**Queries.**

Sign-in shape for the account:

```
source = "<host>" AND sparklogs.actor.name = "<account>"
```

Group by `sparklogs.reason` (LQL), `win.eventlog.security.logon_type_name` (LQL).
Failing-then-retrying looks nothing like a slow single `logon_cached_interactive`.

Decoded auth failures (`win.eventlog.security.status_meaning` (LQL) is the cause without opening the body):

```
sparklogs.reason in (logon_failed, kerberos_preauth_failed, kerberos_ticket_failed, ntlm_validation_failed)
AND sparklogs.actor.name = "<account>"
```

Several users on one site slow, others not: same filter, group by `source` (LQL).
Standing conditions on the workstation: a device silent in the complaint window changes what you can conclude.

**Off-endpoint** (HM2): conditional-access, MFA cloud, federation certificates, PDC time drift, directory sync, path between user and DC.
