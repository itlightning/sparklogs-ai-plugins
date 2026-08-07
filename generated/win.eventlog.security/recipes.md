<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Query recipes: `win.eventlog.security`

Worked pivots over this channel.
All example values are synthetic.

## Separate sign-in failure noise from real attempts

Most failed-sign-in volume on an endpoint is a process probing for credentials it never held, not an attack. Split that off before triaging anything, or the real failures drown.

1. The credential-less probe is its own curated shape and is already banded down, so the reason plus the class separates it in one predicate.

   ```
   sparklogs.reason = "logon_failed" AND sparklogs.class = "NOTABLE"
   ```

2. Group the survivors by cause. The decoded cause is what separates a mistype from enumeration from an account-state problem, and it reads without opening a body.

   ```
   sparklogs.reason = "logon_failed"
     AND win.eventlog.security.status_meaning != "no_credentials_available"
   ```

3. Attribute what is left to the calling process. One dominant path (a backup or management agent) confirms noise; a spread of paths does not. Presence of the path field is the filter, and presence is its own predicate form.

   ```
   sparklogs.reason = "logon_failed" AND sparklogs.process.path!
   ```

A failure whose code is not in the decode table leaves the cause unset and renders no cause token. Those rows keep the raw code in the tail and in the field, so they stay countable.

## Tell a password spray from a brute force

Both look like a pile of failures. The difference is the fan-out, and one grouping each way answers it.

1. Restrict to ordinary accounts first, so machine-account churn does not dominate the counts.

   ```
   sparklogs.reason = "logon_failed" AND sparklogs.actor.kind = "account"
     AND win.eventlog.security.status_meaning IN ("bad_password", "unknown_username")
   ```

2. Group by sparklogs.origin.ip, then re-run grouped by sparklogs.actor.name. Few sources against many accounts reads as spray; many sources against one account reads as credential stuffing.

3. The cause token separates the two intentions: unknown_username spread across names is enumeration, bad_password against one name is guessing.

4. Check whether it landed: a successful account sign-in from the same address inside the window. Successful sign-ins are curated without a reason and every failure carries one, so an absent reason field IS the success restriction.

   ```
   sparklogs.actor.kind = "account" AND sparklogs.origin.ip = "203.0.113.24"
     AND win.eventlog.security.logon_type_name = "logon_network"
     AND NOT sparklogs.reason!
   ```

## Find the machine holding the stale credential

The single highest-value pivot in this channel. A locked account is a ticket; the machine still presenting the old password is the fix.

1. Start from the lockout itself.

   ```
   sparklogs.reason = "account_locked_out" AND sparklogs.target.name = "j.doe"
   ```

2. Read win.eventlog.security.caller_computer off the result. That names the machine in the provider name space, a NetBIOS-style machine name (synthetic example: WKSTN-042). The source field is the reporting agent's display name, a DIFFERENT name space: the two need not match verbatim, so map the provider name to the display name that machine reports before pivoting on it.

3. Pull that machine's failures for the same account, filtering on its display name as mapped above.

   ```
   source = "WKSTN-042" AND sparklogs.reason = "logon_failed"
     AND sparklogs.actor.name = "j.doe"
   ```

4. Group by sparklogs.process.path to name the process holding the credential. A service, a mapped drive and a scheduled task are three different fixes.

## Audit the admin sessions an account actually started

Privilege assignment is dominated by platform identities. One predicate collapses it to the sessions an ordinary account opened, which is the report an MSP is asked for.

1. The account and platform arms of privilege assignment are separate curated shapes, so the principal kind selects between them.

   ```
   winlog.event_id = 4672 AND sparklogs.actor.kind = "account"
   ```

2. Group by sparklogs.actor.name for who ran elevated and how often; win.eventlog.security.privileges lists what was actually held.

3. Join back to the sign-in that minted the session for how they got in: console, remote desktop or network, and from where.

   ```
   sparklogs.actor.session = "0x51c2a9"
   ```

4. At sign-in time the same question is one field: win.eventlog.security.elevated is true when the sign-in minted a full-privilege token.

## Reconstruct one sign-in session end to end

Who signed in, from where, with what privileges, doing what, and for how long: one group-by, because the session key is the same field on every event in the family.

1. Take the session off any row of interest and fetch the whole session. The portable session key is populated on the sign-in, the privilege assignment, the explicit-credential use and both flavours of sign-out.

   ```
   sparklogs.actor.session = "0x3e7a91"
   ```

2. Order by timestamp and read it as a story. Duration is the sign-out timestamp minus the sign-in timestamp.

3. There is one key, not two. Windows names the same session differently per event id, so a query written against the provider names needs an OR across them; the portable session field carries the same value under one name on every event in the family. The provider form survives verbatim in the retained payload for anyone who needs the original spelling.

## Audit changes to a privileged group

Who touched the group, what direction, and who joined or left: three identity families on one row, so the whole story is field reads with no provider lore.

1. The group is the target with kind group, so every change to it is one predicate on the rename-stable SID, membership and lifecycle alike.

   ```
   sparklogs.target.kind = "group" AND sparklogs.target.id = "S-1-5-32-544"
   ```

2. Direction rides the reason, never the config-change action: group_member_added and group_member_removed are the membership directions, and group_membership_changed is the create/delete/change lifecycle (whose config_change.action carries created/deleted/updated).

   ```
   sparklogs.reason = "group_member_removed"
   ```

3. The principal that joined or left is the member family; the acting admin is the actor. Group-in-group nesting reads sparklogs.member.kind = "group".

   ```
   sparklogs.member.id = "S-1-5-21-1111111111-2222222222-3333333333-1001"
   ```

4. Generic "recent configuration changes" views read TWO paths: a configured PRINCIPAL rides sparklogs.target.name and a configured RESOURCE rides sparklogs.config_change.target, never both on one event, so coalesce the two for a single what-changed column.

## Chase lateral movement through explicit credential use

A process presenting credentials that are not its own is how lateral movement looks from the endpoint. The routine platform half is a separate reasonless shape and drops out for free.

1. Only the non-routine arm carries a reason, so the reason alone is the filter.

   ```
   sparklogs.reason = "explicit_credential_use"
   ```

2. Group by sparklogs.target.name and sparklogs.process.path. One account presented from many paths, or one unusual path across many endpoints, is the shape.

3. The machine the credential was presented TO is sparklogs.destination.host, populated only when it names a machine other than the reporting host, so a non-empty destination IS the off-box claim; the provider form (localhost included) stays on win.eventlog.security.target_server.

4. Drop self-refresh, where the presented account is the caller's own. A predicate compares a field to a literal, never to another field, so pin the caller under scrutiny by name (synthetic example: j.doe) and exclude that same name as the presented account.

   ```
   sparklogs.reason = "explicit_credential_use"
     AND sparklogs.actor.name = "j.doe"
     AND sparklogs.target.name != "j.doe"
   ```

5. Chain forward: look for the presented account signing in on OTHER endpoints inside the window, then repeat from its session.
