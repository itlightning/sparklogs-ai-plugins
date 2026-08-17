---
index: BitLocker recovery
---

# BitLocker recovery prompt

**Trigger.** "Machine booted to a BitLocker recovery key prompt."

**Evidence today.** Moderate. The System and Setup channels carry the boot-configuration and
firmware-change events that trigger a recovery prompt; the prompt itself happens before anything is
shipping, so you are always reconstructing from what came before and after.

**Off-endpoint** (HM6): key escrow in the directory or the RMM, firmware update pushed by the
vendor, hardware change by hand.

**Call sequence.**

1. Scope, `list_sources` across a window that includes the last successful boot.
2. What changed before the reboot.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND sparklogs.kind = config_change',
     group_by=["config_change_type", "config_change_target"],
     external_investigation_id="<id>")
   ```

3. Patching and firmware activity in the same window: as HM4 step 2.
4. Boot-integrity events, which are curated on the Security channel
   (`sparklogs.reason = insecure_boot_config` carries the specific weakness in
   `win.eventlog.security.insecure_boot_flags`).

---
