# BitLocker recovery prompt

**Trigger.** "Machine booted to a BitLocker recovery key prompt."

**Accuracy.** System and Setup carry boot-configuration and firmware-change events that *trigger* a prompt.
The prompt itself happens before anything is shipping; reconstruct from before and after.
Include the last successful boot in the window.

**Queries.**

What changed before reboot:

```
source = "<host>" AND sparklogs.kind = config_change
```

Group by `config_change_type` (col), `config_change_target` (col).

Patching and firmware in the same window: servicing as in `windows-update-failure.md`.
Boot integrity on Security: `sparklogs.reason = insecure_boot_config`; flags in `win.eventlog.security.insecure_boot_flags` (LQL).

**Off-endpoint** (HM6): key escrow in the directory or RMM, vendor firmware update, hardware change by hand.
