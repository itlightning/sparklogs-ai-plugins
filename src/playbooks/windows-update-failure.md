---
index: Windows Update / patch failure
---

# Windows Update failure

**Trigger.** "Patching reports `<KB>` failed", or a machine is behind on updates.

**Accuracy.** Servicing is curated across CBS, DISM, Setup, System, and the Windows Update client and BITS channels on `win.eventlog.management` (value) (`patch_scan_failed` (value), `patch_download_failed` (value), `bits_transfer_failed` (value)).
Pending reboot and component-store health are servicing *reasons* on the same pass, not a second scan.

**Device health first.** Open conditions `patch_scan_stale` (value) and `patch_updates_paused` (value), then `latest_state` (value) on the `windows_update_agent_state` (value) and `system_info` (value) topics for the update agent's last scan and a pending reboot.
A machine "behind on updates" that has not scanned is a different ticket from one whose installs fail.
`device_overview` (value) over the install window shows whether the device was asleep or powered off then (header coverage) and whether the OS volume ran low on space (`events` (col)).

**Events, for what health named.**

```lql
source = "<host>" AND service = patching
```

Group by `sparklogs.reason` (LQL), then read the highest-severity reasons first.

Failing install in sequence (Setup `patch_install_failed` (value) is Error; the System copy runs Info to Minor, scan and download failures Info to Warning; `>= warning` drops `bits_transfer_failed` (value), which is Info, so query it by reason when downloads are the question):

```lql
source = "<host>" AND service = patching AND severity >= warning
```

Fleet: one noun `group_by=["source"]` over a pinned reason ("is it just us").
Two nouns `group_by=["sparklogs.reason", "source"]` over the failure side:

```lql
service = patching AND severity >= warning
```

One reason on every host is a bad KB.
Many reasons on one host is a broken machine.
A pair of single-field runs cannot tell those stories apart.

**Off-endpoint** (HM4): WSUS or update-service reachability, RMM patch policy, vendor-side KB withdrawal.
