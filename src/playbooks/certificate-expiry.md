---
index: Certificate, TLS and enrollment failures
aliases:
  - label: Certificate expired or expiring
  - label: TLS or Schannel errors
  - label: Certificate autoenrollment failing
  - label: HTTPS site or Remote Desktop certificate error
---

# Certificate, TLS and enrollment failures

**Trigger.** "The intranet site says the certificate expired", "Wi-Fi or VPN stopped authenticating", "the app cannot reach its server since Monday", "smart card or Windows Hello sign-in fails", "autoenrollment errors on the domain controllers", or a certificate reason on a device.

**Accuracy.** Each side of a certificate problem logs something different, and none of it names the whole story:

- A device whose program rejected a server's certificate logs the rejection (Schannel, on the client). The server that presented it usually logs nothing about it.
- A device that cannot use its own certificate logs that (Schannel and HTTP.sys, on the server). Every client of that endpoint fails.
- The certificate store logs expiry warnings, expiries, installs and deletions. A store warning says the certificate is near its date, not that anything uses it.
- The enrollment client logs a request or renewal that failed. The CA logs what it refused or could not publish, only where the agent runs on the CA.

What uses a certificate is not on any of these records. A Wi-Fi, VPN, web or sign-in failure that a user notices is usually logged by that product, with the certificate behind it.
Schannel covers programs that use the Windows TLS stack. Programs with their own TLS (Chrome and Firefox, Java, many agents) reject certificates without any Windows event.
So no certificate rows is not proof the certificates are fine. It says Windows logged no rejection, store warning or enrollment failure for this device in the window.
Include the date the certificate expired or was replaced in the window, and for a renewal question the days before it.

**Feeds.** Every certificate reason is `service = certificates` (LQL), spread over four feeds:

| Feed | What it holds |
|---|---|
| `win.eventlog.system` (value) | Schannel: certificates this device rejected, credentials it could not build, handshakes refused. HTTP.sys certificate bindings. The domain controller's smart card certificate (`kerberos_smartcard_cert_missing` (value), service `auth` (value)). Remote Desktop's self-signed certificate |
| `win.eventlog.identity_security` (value) | Certificate store lifecycle (`cert_expired` (value), `cert_expiring` (value)), key storage and DPAPI |
| `win.eventlog.application` (value) | Enrollment and autoenrollment (`cert_enroll_failed` (value), `cert_expiring` (value) from autoenrollment), CAPI2 root updates, the CA's own events |
| `win.eventlog.security` (value) | CA audit: requests denied, permissions changed, audit or database tampered (only with Certification Services auditing on) |

Reasons and their prose: `feeds/<feed>/reasons.md`. The store rows carry `win.eventlog.identity_security.cert_subject` (LQL), `win.eventlog.identity_security.cert_not_valid_after` (LQL) and `win.eventlog.identity_security.cert_store` (LQL) (machine or user): `feeds/win.eventlog.identity_security/fields.md`.
Most other certificate reasons promote no field; the detail is in the message and in the event's raw payload under `event_data` (LQL).
Payload names worth reading in the rows: the program that made the connection, CallerProcessImageName, on Schannel 36871, 36876, 36881 and 36882; the TLS alert number, AlertDesc, on 36887 and 36888; the internal error state, ErrorState, on 36871 and 36888; the thumbprint, ObjId, on autoenrollment 64; the template, TemplateName, and the CA, CA, on enrollment 13 and 82.
No device-state topic tracks certificates.

**Which failure it is.**

| What happened | Witness | Next |
|---|---|---|
| A program here rejected a server's certificate | `tls_cert_expired` (value) (36881), `tls_cert_name_mismatch` (value) (36884), `tls_cert_untrusted_ca` (value) (36882); uncurated 36876 with an error code | **Rejected a server's certificate** |
| This device cannot use its own server certificate | `tls_server_credential_failed` (value) (36870), `http_ssl_config_failed` (value) (15021) | **Cannot use its own certificate** |
| A program here could not build a TLS client credential | `tls_client_credential_failed` (value) (36871) | **Client credential and protocol** |
| A client offered nothing this server accepts | `tls_cipher_mismatch` (value) (36874) | **Client credential and protocol** |
| A certificate in the store is near or past its date | `cert_expiring` (value) (store 1003, autoenrollment 64), `cert_expired` (value) (1002) | **Expiring and expired in the store** |
| A request or renewal did not complete | `cert_enroll_failed` (value) (autoenrollment 1, 6; enrollment 13, 82, 86, 87) | **Enrollment and autoenrollment** |
| A domain controller has no certificate for smart card or Windows Hello sign-in | `kerberos_smartcard_cert_missing` (value) (19, 29) | **Domain controller certificates** |
| The CA itself is failing or was changed | `adcs_ca_chain_failed` (value), `adcs_crl_publish_failed` (value), `adcs_request_failed` (value), `adcs_config_changed` (value), `adcs_audit_evidence_tampered` (value) | **The certification authority** |
| A web or WinRM endpoint's certificate was swapped | `http_ssl_binding_deleted` (value), `http_ssl_binding_created` (value) | **Bindings and renewals** |

Start with every certificate reason on the device, then read the shape the table names:

```lql
source = "<host>" AND service = certificates AND sparklogs.reason!
```

Group by `sparklogs.reason` (LQL) and `subsource` (LQL).
Key-storage and DPAPI reasons (`crypto_key_operation_failed` (value), `dpapi_unprotect_failed` (value), `vbs_key_isolation_failed` (value)) share the service and are mostly routine probes and retries. Read them only beside a certificate whose private key is in question.

**Rejected a server's certificate.** The device that logs it is the client: a program on it connected out and refused what the server presented.
The message names the expected server name on 36884 ("The server name we were expecting is ..."), and the payload names the program on most of these records. The server's certificate itself is attached to the event in Event Viewer, not collected.

```lql
source = "<host>" AND sparklogs.reason in (tls_cert_expired, tls_cert_name_mismatch, tls_cert_untrusted_ca)
```

Group by `sparklogs.reason` (LQL) over time, then read the messages for the name and the payload for the program (CallerProcessImageName). One program rejecting one name is that connection. Many programs rejecting at once is the device (its clock, its trusted roots, an inspection proxy).

- **Expired or not yet valid** (36881). The server's certificate expired, or this device's clock is wrong. A clock off by days or years makes every current certificate fail at once, across many programs: check `os_clock_drift` (value), `host_clock_stepped` (value) and `time_sync_failed` (value) on the device first. A dead CMOS battery and a virtual machine restored from an old snapshot are the classic cases.
- **Name mismatch** (36884). The program connected by a name the certificate does not list: a short name or IP address where the certificate holds the full DNS name, a server renamed or moved behind a new alias, or a proxy or inspection device answering with its own certificate. A Microsoft or SaaS service name here usually means something in the path answered instead.
- **Untrusted issuer** (36882). The chain ends at a root this device does not trust: an internal CA whose root never reached the device (a workgroup or Entra-joined machine does not get the domain's roots), a self-signed appliance certificate, or a firewall that inspects HTTPS before its root was deployed. The same rejection on many devices at once is a deployment or inspection change, not one server.
- **Did not validate, other reason** (uncurated Schannel 36876). The error code in the message says why. 0x80090349 (SEC_E_CERT_WRONG_USAGE) is a certificate not issued for server authentication; the revocation codes 0x80092012 and 0x80092013 are a revocation server this device could not reach, usually a proxy or firewall blocking the CRL or OCSP address.

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Schannel" AND event_id in (36876, 36887, 36888, 36928)
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_id` (LQL). 36887 says the other end sent a fatal TLS alert, 36888 that this device sent one. The alert number is in the message.
Common alert numbers: 40 handshake failure (no shared protocol or cipher), 42 bad certificate, 44 certificate revoked, 45 certificate expired, 46 certificate unknown, 48 unknown CA, 70 protocol version, 80 internal error.
On a server, 36887 with 45, 46 or 48 is a client refusing this server's certificate: the only server-side trace of an expired or untrusted server certificate, and only for clients that send the alert.
36928 is a revocation response Windows could not fetch. Windows treats that as soft and it is capped low. It matters only next to a rejection.

**Cannot use its own certificate.** `tls_server_credential_failed` (value) (36870) says a service here has a certificate but cannot reach its private key.
With error 0x8009030D (SEC_E_UNKNOWN_CREDENTIALS) and an `http_ssl_config_failed` (value) for an endpoint such as 0.0.0.0:443 in the same second, the HTTPS binding points at a certificate whose key is unusable: the certificate was renewed and the binding still names the old thumbprint, the certificate was deleted, it was imported without its private key, or the service account lost read access to the key.
Each failed handshake writes a pair, so the rate is how often clients try. A pair every minute for days is a monitor or a client retrying, and every client of that endpoint fails.

```lql
source = "<host>" AND sparklogs.reason in (tls_server_credential_failed, http_ssl_config_failed, http_ssl_binding_deleted, http_ssl_binding_created, cert_expiring, cert_expired)
```

Group by `sparklogs.reason` (LQL) over time. The first 36870 after a binding change or a certificate's expiry date names the change; a run already going at the start of the window began before it, so widen.
On a domain controller the same 36870 breaks LDAPS, and on a Remote Desktop host, Remote Desktop's certificate.
The fix is on the device: `netsh http show sslcert` for the bound hash, the certificate and its key in certlm.msc, then rebind.

**Client credential and protocol.** `tls_client_credential_failed` (value) (36871) is a program that could not build its outbound TLS credential.
One program, repeating, that needs a client certificate (a VPN, a line-of-business integration) points at that certificate: check it is in the store, valid, and its key readable by the program's account.
Its arm on `sparklogs.reason_variant` (LQL) splits the two cases: `wsaeacces` (value) is internal error state 10013, at Notice, and `credential_failed` (value) is any other state. `win.eventlog.system.tls_caller_process` (LQL) is the calling program and `win.eventlog.system.tls_error_state` (LQL) the state.

```lql
source = "<host>" AND sparklogs.reason = tls_client_credential_failed
```

Group by `sparklogs.reason_variant` (LQL) and `win.eventlog.system.tls_caller_process` (LQL). The 10013 rows are kept at most one per program each hour, so count programs and hours, not rows.
Internal error state 10013 from most programs on a device at once (Office, browser helpers, OneDrive, updaters) is the device's TLS protocol or cipher settings refusing what those programs ask for: a hardening baseline, TLS 1.0 and 1.1 turned off, or a cipher-suite policy. Most of those programs then connect with an allowed protocol, so it fails nothing by itself. Act when a user reports a program that will not connect, and compare the device's protocol settings with what that program needs.
`tls_cipher_mismatch` (value) (36874) is on a server: a client offered no suite it accepts. The message gives the TLS version the client asked for, not the client.
An old device or program (a scanner, a printer, an old Java or .NET build) after the server's ciphers were tightened is the usual cause. A steady trickle on an internet-facing server is scanning.

```lql
source = "<host>" AND sparklogs.reason = tls_cipher_mismatch
```

Group by `event_data.Protocol` (LQL) over time. TLS 1.0 and 1.1 requests are old clients. The client's address is in the service's own log (IIS, firewall) at the same times.

**Expiring and expired in the store.** Two components report the same certificate:

- The certificate store's lifecycle client writes 1003 (expiring) and 1002 (expired) for the machine store and each user's store, with the expiry date and the store. Machine-store rows carry the subject; user-store rows name the user in `user_name` (LQL) and often carry no subject.
- The autoenrollment client writes 64 (expiring or expired, it does not say which) for a machine certificate, with only its thumbprint. It arrives in the same minute as a machine-store 1003 for the same certificate, at every autoenrollment cycle (at startup and about every eight hours), so read the 1003 for the subject and date.

```lql
source = "<host>" AND subsource = "win.eventlog.identity_security" AND sparklogs.reason in (cert_expiring, cert_expired)
```

Group by `win.eventlog.identity_security.cert_store` (LQL), `win.eventlog.identity_security.cert_subject` (LQL) and `win.eventlog.identity_security.cert_not_valid_after` (LQL).
Judge urgency by the date, not the reason. Windows starts warning when a set share of a certificate's lifetime is left (a Group Policy setting, 10 percent by default), so a ten-year self-signed certificate is reported about a year early, and a long-lived root years early.
Then sort the certificate by its subject:

- **A host name the business serves** (names starting remote, rdweb, mail or vpn, a public name). A public or manually installed certificate: nothing in Windows renews it. Whoever bought it, or the ACME client on the server, renews it, and then the service has to be bound to the new one (**Bindings and renewals**).
- **The machine's own name, or a template certificate from the domain CA.** Autoenrollment should have renewed it before it got here. A warning that repeats for days means renewal is failing: **Enrollment and autoenrollment**.
- **Two GUIDs** (`DC=<guid>, CN=<guid>`). A certificate Microsoft Entra ID issues to the device itself. On Entra-joined devices these expire and are replaced about daily, one expired row a day each: routine turnover, filed at Info under the `entra_daily_certificate` (value) arm on `sparklogs.reason_variant` (LQL). Every other store certificate is the `store_certificate` (value) arm, so `NOT sparklogs.reason_variant = entra_daily_certificate` (LQL) leaves the daily turnover out. Only `entra_device_certificate_update_failed` (value) with a status other than logon failure or network unreachable needs a look.
- **A vendor or application name** (a backup server, a remote-management card, a database's self-signed certificate). That product's own certificate; its console renews it.
- **A root or intermediate CA** (a public CA's root name). Windows root maintenance replaces or removes those; act only if a program still depends on the old one.

Expired certificates nobody removed keep reporting. Remove one only after confirming a newer copy is in place or nothing uses it.

Store changes Windows also writes, uncurated: 1006 a certificate was installed, 1004 deleted, 1009 a certificate could not be tied to its private key (often an imported device certificate with no key, repeating harmlessly).

```lql
source = "<host>" AND subsource = "win.eventlog.identity_security" AND provider_name = "Microsoft-Windows-CertificateServicesClient-Lifecycle-System" AND event_id in (1004, 1006, 1009)
```
<!-- confirmed with data on 2026-11-12 -->

Group by `event_id` (LQL) over time and read the subject in the message. A 1006 for the same subject after a 1002 is the renewal arriving. Not every installer writes one, so its absence does not prove the certificate was not replaced.

**Enrollment and autoenrollment.** `cert_enroll_failed` (value) has four variants on `sparklogs.reason_variant` (LQL):

- `autoenroll_cycle_failed` (value) (1, 6): autoenrollment could not run a cycle against the directory or the CA. `event_data.ErrorCode` (LQL) says why: 0x800706BA (RPC server unavailable) is the CA unreachable or gone, 0x8007054B the domain unreachable, 0x80070037 a network resource gone. Once on a laptop that was off the corporate network, routine.
- `failed` (value) (86, 87): an enrollment, such as a SCEP device request from Intune, failed; the message names the URL and status.
- `retired_aik` (value): attestation enrollment against an endpoint Microsoft retired. It can never succeed and needs no action.
- `enrollment_failed` (value) (13, 82): enrollment for a named template failed: 13 against the CA, naming the CA and the error; 82 against every enrollment server. `win.eventlog.application.cert_template` (LQL) is the template. On a CA-backed renewal these arrive in the same second as autoenrollment 6.

```lql
source = "<host>" AND sparklogs.reason = cert_enroll_failed
```

Group by `sparklogs.reason_variant` (LQL), `win.eventlog.application.cert_template` (LQL) and `event_data.ErrorCode` (LQL), and read the CA in the message.
The pattern to recognize: a template certificate is expiring (`cert_expiring` (value)), and at each cycle enrollment 13 names a CA host that does not answer. The CA was decommissioned or moved and the directory still lists it as the enrollment service for that template, so nothing on the device can renew. The fix is on the CA side: a working enterprise CA publishing that template, then `certutil -pulse` on the device.
Other well-known causes: the machine or user lacks Enroll and Autoenroll on the template; the template was superseded or removed from the CA; the device cannot reach a domain controller at the cycle (VPN not up yet); the CA's own certificate or revocation list expired (**The certification authority**); a workgroup or Entra-joined device has no domain autoenrollment at all.

**Domain controller certificates.** `kerberos_smartcard_cert_missing` (value) is a domain controller with no usable Kerberos Authentication or Domain Controller Authentication certificate. 29 alone says so; 19 says someone tried to sign in with a certificate against this controller and could not.
Certificate sign-in is not only physical smart cards: Windows Hello for Business in hybrid key trust or certificate trust, and virtual smart cards, use the same path, so 19 in working hours is users whose Windows Hello sign-in is failing or falling back.
Find the client's domain controllers with `resolve_scope` (tool) by their reported role, then over those devices:

```lql
sparklogs.reason in (kerberos_smartcard_cert_missing, cert_expiring, cert_enroll_failed)
```

Group by `source` (LQL) and `sparklogs.reason` (LQL).
A controller with an expiring certificate and failed enrollment beside its 29 is the renewal problem above. One controller alone, while the others are fine, is that controller's certificate; all of them at once is the CA or the template.
The client side, `kerberos_cert_domain_unresolved` (value), is routine on Entra-joined and workgroup devices.

**The certification authority.** Only on a CA server with the agent:

- `adcs_ca_chain_failed` (value) (58): a certificate in the CA's own chain expired. The CA stops issuing and what it issued stops validating: expect enrollment, Wi-Fi, VPN and smart card failures across the domain.
- `adcs_crl_publish_failed` (value) (65, 66, 74, 75): the CA could not publish its revocation list. Nothing breaks until the last published list expires; then everything that checks revocation rejects valid certificates. Find that list's next update before judging urgency.
- `adcs_request_failed` (value), `adcs_config_changed` (value), `adcs_audit_evidence_tampered` (value) on Security: denied requests, permission and certificate-manager changes, and audit settings or database rows removed. They appear only with Certification Services auditing on, so silence does not prove nothing changed. Control of a CA or a template is a path to signing in as other accounts: read a permission change with `themes/windows-security-and-audit.md`.

The CA service's own start, stop and directory records are uncurated on the Application feed:

```lql
source = "<host>" AND subsource = "win.eventlog.application" AND provider_name = "Microsoft-Windows-CertificationAuthority"
```

Group by `event_id` (LQL). A CA that cannot contact the directory issues nothing until it can.

**Bindings and renewals.** HTTP.sys logs every certificate binding change twice, once from each of its two providers, and a replacement is a deletion and a creation for the same endpoint in the same second: count changes, not rows. The program that made the change is in the message (netsh, a renewal client, an installer).
A renewal that worked shows the new certificate installed and the binding replaced before the old certificate's date. A renewal that ran late shows `cert_expired` (value) first and the binding change hours later, with clients failing in between.
The same port rebound by the same program many times a day is software that rewrites its own binding on a schedule, routine for that product.
Renewal automation (an ACME client, a vendor's renewal job) usually runs as a scheduled task. Whether it ran, failed, or was changed or disabled in the window: `playbooks/scheduled-task-failures.md`.
IIS sites, Exchange, RD Gateway and RD Web each keep their own binding or thumbprint: renewing the certificate does not move them to it.

**Remote Desktop.** A Remote Desktop host without an assigned certificate makes its own self-signed one and replaces it when it expires. Its records are on the System feed, uncurated: 1056 a new self-signed certificate made (routine), 1057 it could not make one, 1058 it could not replace an expired one. 1057 and 1058 usually mean permissions on the machine key folder, and leave the host serving an expired certificate or none.

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-TerminalServices-RemoteConnectionManager"
```

Group by `event_id` (LQL).
A host using a template or public certificate (set by Group Policy, or RD Gateway and RD Web under their own public name) does not fall back to self-signed: that certificate's store warnings above are the early sign, and users' certificate warnings the late one.
`tls_server_credential_failed` (value) on a Remote Desktop host is its certificate's key unreadable.

**What changed before it started.** A failure that began with no certificate change points elsewhere: a TLS or cipher hardening change, a root removed, a proxy or inspection device added, the clock moved. Settings and installs before the first failure: `playbooks/what-changed.md`.

**One device or many.** Count the reason over the organization grouped by `source` (LQL) and, for store rows, `win.eventlog.identity_security.cert_subject` (LQL).
The same server name rejected by many devices is that server's certificate. `tls_cert_untrusted_ca` (value) on many devices from one day is an inspection device or a root deployment. Enrollment failing on every device against one CA is the CA. One subject expiring on one server is that server's certificate.

**Not this playbook.**
Secure Boot certificate servicing (`secure_boot_cert_update_pending` (value), `secure_boot_certs_current` (value)): `playbooks/windows-update-failure.md` (**Recovery environment and Secure Boot**).
Device health attestation certificates (`device_health_cert_service_unreachable` (value)): `playbooks/tpm-health.md`.
A service that fails at start because its certificate expired: the service side is `playbooks/service-failures.md`.
Sign-in that is slow with no certificate failure in the path: `playbooks/slow-logon.md`.

**When to stop.** SparkLogs can name a certificate's subject, store and date, the program and expected server name on a rejection, the endpoint on a binding failure, and the template, CA and error on a failed renewal.
It cannot see the certificate a remote server presented beyond what the client's event says, a rejection by a program with its own TLS, or certificates on devices without the agent. Report what the device logged, then read the certificate on the device (certlm.msc, `netsh http show sslcert`) or at the endpoint.

**Off-endpoint** (HM9): public CA portals and ACME accounts, load balancers and reverse proxies holding their own copy, the CA server when it has no agent, federation and SaaS certificates, TLS-inspecting firewalls.
