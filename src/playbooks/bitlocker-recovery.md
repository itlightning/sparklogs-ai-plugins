---
index: BitLocker recovery
---

# BitLocker recovery prompt

**Trigger.** "Machine booted to a BitLocker recovery key prompt."

**Accuracy.** System and Setup carry boot-configuration and firmware-change events that *trigger* a prompt.
The prompt itself happens before anything is shipping; reconstruct from before and after.
Include the last successful boot in the window.

**Device health first.** `device_overview` (value) from before the last successful boot through the prompt.
Its `events` (col), and the `events` (value) result set for the full list, carry the device's own observed changes between boots: `bios_version_changed` (value), `boot_mode_changed` (value), `secure_boot_disabled` (value), `secure_boot_enabled` (value), `tpm_presence_changed` (value), `tpm_version_changed` (value), `hardware_identity_changed` (value) and `volume_bitlocker_protection_dropped` (value).
The boot and shutdown marks around them are rows of the `events` (value) result set only.
An observed change says the setting moved between two readings, not who moved it or when inside that gap.

**Events, for what health named.** What changed before reboot:

```
source = "<host>" AND sparklogs.kind = config_change
```

Group by `sparklogs.config_change.type` (col), `sparklogs.config_change.target` (col).

Patching and firmware in the same window: servicing as in `playbooks/windows-update-failure.md`.
Boot integrity on Security: `sparklogs.reason = win_insecure_boot_config`; flags in `win.eventlog.security.insecure_boot_flags` (LQL).

**Off-endpoint** (HM6): key escrow in the directory or RMM, vendor firmware update, hardware change by hand.
