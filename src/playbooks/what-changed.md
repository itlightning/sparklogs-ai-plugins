---
index: What changed on this device
aliases:
  - label: It worked yesterday
---

# What changed on this device

**Trigger.** "It worked yesterday", "what changed before this started", or another playbook's step asking what changed on the device before an onset.

**Accuracy.** A change before the onset is a candidate, not a cause.
On a working Windows device the days before any onset almost always hold changes: browsers, Office, OneDrive, Store apps, Defender and RMM agents update themselves and rewrite their services, scheduled tasks and firewall rules every day.
The question is not whether anything changed. It is which change touched the failing component, inside the window, and whether it also landed on devices that stayed healthy.

`sparklogs.config_change.basis` (LQL) says how a change is known:

- `recorded` (value): a Windows log recorded it, at its own time, often with the account and program that made it.
- `observed` (value): the agent saw the end state differ between two readings. Its time is the reading that saw it; the change happened somewhere since the reading before.

Observed changes from a reboot, a sleep or a stretch with the agent off all land at the first reading after it.
A cumulative update's new OS revision, and the drivers its restart refreshed, can carry a time after a crash that happened during that restart. Inside such a gap the order is unknown.
An empty list proves nothing changed only on topics the agent watches for changes on that device (`guides/device-state-fields.md`, **Episodes and changes**). A setting changed and changed back between two readings leaves nothing.

`sparklogs.config_change.category = maintenance` (LQL) marks upkeep SparkLogs positively recognized: product self-updates, driver refreshes, Windows servicing.
It is not proof the change was harmless. A cumulative update and the driver refresh at its reboot are maintenance, and a new driver fault often starts there.
Rank maintenance last and keep it in the list. Filter it out only to shorten a long list, and say in the finding that you did.
A change made off the device (Group Policy on a domain controller, Intune, an RMM policy, a router or firewall, a SaaS tenant) reaches the device only as its effects.

**Feeds.** Observed changes are device-state rows on `sparklogs.device.state` (value): drivers, kernel drivers, services, installed products, network adapters and shares, the operating system, BIOS, Secure Boot, TPM, audit policy, page file and disks. The change reasons are the `change` (value) rows of `feeds/sparklogs.device.state/reasons.md`.
Recorded changes come from Windows logs: service installs on `win.eventlog.system` (value) (event 7045) and `win.eventlog.security` (value) (4697); scheduled tasks, accounts, group membership, logon rights, audit policy, audited registry values and directory objects on Security; firewall rules on `win.eventlog.network` (value) and Security; Defender settings on `win.defender.eventlog` (value) (`av_config_changed` (value), `av_protection_disabled` (value)).
All of them carry `sparklogs.kind = config_change` (LQL). Fields: `fields/family-sparklogs-config-change.md`.

One change can have several witnesses: a service install arrives observed on device state, recorded on System and recorded again on Security.
Their `sparklogs.config_change.target` (LQL) spellings differ between witnesses, so match them by reason and time, not by target.

Change signals that carry no kind:

- MSI installs and removals on `win.eventlog.application` (value): `win_msi_product_install_succeeded` (value), `win_msi_product_removal_succeeded` (value), `win_msi_product_reconfigure_succeeded` (value).
- Windows Update: patching signals are `operating_system_changed` (value) (the OS build or revision moved), Windows Update client event 19 below, and `patch_install_failed` (value) / `patch_install_deferred` (value). Servicing detail: `playbooks/windows-update-failure.md`.
- Secure Boot certificate servicing on System (`secure_boot_cert_update_pending` (value), `secure_boot_certs_current` (value)): `playbooks/windows-update-failure.md` (**Recovery environment and Secure Boot**), and its effect on BitLocker in `playbooks/bitlocker-recovery.md`.

**Bound the window.**

1. Onset: the symptom's own first failing row, not the condition that escalates it. A recurring-crash condition opens after the crashes it counts: take the first crash of that signature.
2. Look further back than the onset (a week or more) for the same symptom. A failure that was already there before a change was not caused by it.
3. Last known good: the last healthy reading, or the last clean boot, before the onset.
4. The window runs from last known good to onset, and at least 48 hours before the onset. Widen it to the reading before for an observed change near its start.
5. A change after the onset is not a cause. Reinstalls and rollbacks right after it are someone's reaction; they say what people already suspected.

**Device health first.** The device overview over the window links each heat span to the changes observed in it or just before it, and lists the episodes and changes, including the 48 hours before the window.
On a busy device it keeps only the newest changes and says so; the changes before an onset can then be missing from it.
For the full list, read the device's change timeline, oldest first. For what is on the device now against an earlier day, read the latest state with the changes after it.
Which `query_device_health` (tool) reading answers each: `guides/device-state-fields.md` (**Choose the view**).

**Events: the sweep.** Every change on the device in the window except firewall rules:

```lql
source = "<host>" AND sparklogs.kind = config_change AND sparklogs.config_change.type != firewall_rule
```

Group by `sparklogs.config_change.type` (LQL), `sparklogs.config_change.basis` (LQL) and `sparklogs.config_change.category` (LQL) first.
Then group by `sparklogs.config_change.type` (LQL) and `sparklogs.config_change.target` (LQL) inside the types that could reach the failing component, and read `sparklogs.config_change.target_name` (LQL) for the name.
Then group by `sparklogs.reason` (LQL) and `sparklogs.config_change.action` (LQL), and read what moved in `sparklogs.config_change.changes[].field` (LQL), with its old and new values.
Firewall rules are left out because applications and Store packages churn them by the hundred; bring them back for a connectivity symptom (below).

A product whose name carries its version arrives as `installed_product_removed` (value) and `installed_product_installed` (value) for the old and new name at the same reading: that is one update.
A driver package renumbered by its update carries `sparklogs.config_change.renamed_from` (LQL).

**Rank the candidates.** In this order:

1. **It touches the failing component.**
   A crash's blamed module (`sparklogs.data.crashes.blame_module` (LQL), `sparklogs.data.kernel_crashes[].blame_module` (LQL)) or faulting module (`sparklogs.data.crashes.fault_module` (LQL)) against `kernel_driver` (value) and `device_driver` (value) changes: the kernel driver's image path names the file. When the blamed driver itself did not change in the window, look for what attached to it or replaced a driver beside it.
   A failing service against its `windows_service` (value) target: start type, command line, logon account.
   A network adapter condition against the same adapter's `network_adapter` (value) changes and its driver, and against VPN, security and filter products that bind to adapters.
   A crashing application against its own `installed_product` (value) row and the runtimes it loads.
   A change with no path to the failing component ranks low however close in time: an audio driver pack before a Wi-Fi failure is a coincidence until something links them.
2. **It falls inside the window.** Closeness counts for recorded changes. An observed change is a range back to the reading before it.
3. **It is not routine churn.** Name these as routine unless they touch the component:
   - `service_command_line_changed` (value) where the old and new paths differ only in a version folder: a browser, OneDrive or Copilot elevation or updater service following its product update. Updater services that install a new service per version (`service_installed` (value)) are the same.
   - Scheduled tasks created, rewritten and deleted by Office, OneDrive, Windows and Group Policy.
   - `kernel_driver_loaded` (value) and `kernel_driver_unloaded` (value): a driver started or stopped, usually because a device was attached or removed (USB storage, audio, a dock) or an on-demand driver ran. Not an install. Before a crash in a USB, dock or display driver, they mark when that hardware attached.
   - `network_adapter_filters_changed` (value) on virtual adapters, and `network_adapter_disabled` (value) / `network_adapter_enabled` (value) on Wi-Fi Direct virtual adapters ("Local Area Connection* 2"): the Wi-Fi radio cycling with sleep and wake. Judge connectivity on physical adapters only (`guides/device-state-fields.md`, **Network adapters**).
   - An RMM agent resetting its own local account's password (`account_password_reset` (value), `account_changed` (value)) and machine-account changes to local Administrators by an MDM or password-rotation tool.
   - `win_registry_value_created` (value) / `win_registry_value_changed` (value) bursts on trace-session keys.
4. **It is absent on devices that stayed healthy** (below).

Patterns worth naming:

- Many `kernel_driver_updated` (value) and `driver_updated` (value) rows at one reading, with file versions sharing the new OS build and revision, are one cumulative update. Read them with `operating_system_changed` (value) and Windows Update event 19, as one change.
- `driver_removed` (value) and `driver_installed` (value) for the same device name with a new version is a driver replaced, not a device removed. A storage controller or network driver replaced shortly before a crash in that driver class is the first candidate.
- A burst of driver installs, the OS revision and the BIOS version all at one reading after a long gap is a reimage, a feature update or a device that was offline for the update. The order inside the gap is unknown.
- `service_start_type_changed` (value) from disabled to automatic on Windows Update or management services means a tool re-enabled them; the opposite means one turned them off.
- `av_config_changed` (value): a Defender setting changed (exclusions, protection levels, cloud reporting). `av_protection_disabled` (value): protection turned off. Both have a recorded actor on Defender.
- `audit_policy_coverage_reduced` (value): Security logging that other answers depend on was reduced.
- `bios_version_changed` (value), `secure_boot_disabled` (value), `secure_boot_enabled` (value), `tpm_presence_changed` (value), `tpm_version_changed` (value): firmware and boot changes (`playbooks/bitlocker-recovery.md`, `playbooks/tpm-health.md`).

**Updates and installs.** Windows Update writes event 19 in the System log for each update it installed, naming it (cumulative updates, Defender intelligence, drivers and firmware delivered through Windows Update):

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND provider_name = "Microsoft-Windows-WindowsUpdateClient" AND event_id = 19
```
<!-- confirmed with data on 2026-11-12 -->

Keep the provider in the filter: other System providers also write event 19.
MSI installs, removals and repairs:

```lql
source = "<host>" AND sparklogs.reason in (win_msi_product_install_succeeded, win_msi_product_removal_succeeded, win_msi_product_reconfigure_succeeded)
```

Office, runtimes and agents repair themselves through MSI often: read the product name before ranking one.

**Firewall and network policy, for a connectivity symptom.** Firewall rules changed through the tools people and scripts use: netsh, PowerShell (its firewall commands run in the WMI provider host, `WmiPrvSE.exe`), the Windows Firewall console and cmd:

```lql
source = "<host>" AND sparklogs.config_change.type = firewall_rule AND sparklogs.process.name in ("netsh.exe", "powershell.exe", "pwsh.exe", "WmiPrvSE.exe", "mmc.exe", "cmd.exe")
```

Group by `sparklogs.reason` (LQL), `win.eventlog.network.rule_name` (LQL) and `win.eventlog.network.firewall_rule_action` (LQL). The action is the number Windows Firewall writes: 2 blocks, 3 allows. A deleted allow rule breaks a connection as surely as a new block rule, and a deletion carries no action.
Installers call netsh too: read the rule name and `win.eventlog.network.firewall_rule_application_path` (LQL) before ranking a rule.
Then widen to block rules not marked maintenance:

```lql
source = "<host>" AND sparklogs.config_change.type = firewall_rule AND sparklogs.config_change.category != maintenance AND win.eventlog.network.firewall_rule_action = 2
```

Store and AppX packages add their own block and allow rules by the thousand through svchost, many not marked maintenance, and they dominate that wider list (`feeds/win.eventlog.network/reasons.md`, `firewall_rule_changed` (value)).
Besides rules, read the adapter changes that move traffic: `network_adapter_static_dns_changed` (value), `network_adapter_ipv4_dhcp_changed` (value), `network_adapter_static_gateway_changed` (value), `network_adapter_metric_changed` (value), `network_adapter_mtu_changed` (value), `primary_dns_suffix_changed` (value) and `winhttp_proxy_changed` (value). VPN clients flip DNS and DHCP settings on their own adapters at every connect: compare the adapter with the one that failed.
Then `playbooks/network-connectivity.md`.

**Who made it.** Recorded changes carry `sparklogs.actor.name` (LQL) where the log names one. Joining that session and everything else it touched: `themes/windows-security-and-audit.md` (**Change analysis**).

**Not a change.** Some causes of "it worked yesterday" leave no change record. Check them before calling the onset unexplained:

- Something expired: a certificate (`playbooks/certificate-expiry.md`), a service account or user password (failed sign-ins; for a service, `playbooks/service-failures.md`), a licence or trial, or the computer account's trust with the domain.
- The disk filled: `playbooks/disk-full-or-filling.md`.
- Endpoint protection quarantined or blocked a file. That is a detection, not a Defender setting change: `themes/endpoint-protection.md`.
- An update installed and waits for its restart, so the device runs a mix of old and new files until it restarts: `playbooks/windows-update-failure.md`.
- The clock or time zone moved: Kerberos sign-ins fail once the clock is more than a few minutes off the domain, and certificates read as not yet valid or expired.

**One device or many.** Take the top candidate and count it across the organization, grouped by `source` (LQL):

```lql
sparklogs.kind = config_change AND sparklogs.config_change.type = kernel_driver AND sparklogs.config_change.target = "<target>"
```

Use the type and target exactly as the sweep returned them. Then count the symptom over the same devices and window.

- The change on many devices and the symptom only on this one: the change alone does not explain it. Look for what else differs on this device (hardware, a second product, a setting).
- The change and the symptom together on several devices, and the symptom absent where the change is not: the strongest case, often a rollout.
- The same symptom on several devices at the same time with no shared change: the application's server or licensing, DHCP or DNS on that network, a pushed policy. Note the devices and the minute it started.

**Findings.** Lead with the onset time and how it is known, then the window.
List candidates in rank order, each with its basis, its time or time range against the onset, what links it to the failing component, and the fleet contrast.
"No change on this device explains the onset" is a finding when only routine churn precedes it and expiry, disk space and security detections (**Not a change**, above) were checked; say which kinds of change were checked.
Never call a change the cause on timing alone. The discriminators are a device with the change and without the symptom, a device with the symptom and without the change, and a rollback (`skills/sparklogs-analyze-cause/references/hypothesis-generation.md`).

**Off-endpoint** (HM15): changes pushed from Group Policy, Intune or the RMM; network and firewall gear; the application's server or SaaS tenant; firmware or hardware changed with the device off.
