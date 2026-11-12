---
index: BitLocker recovery
---

# BitLocker recovery prompt

**Trigger.** "Machine booted to a BitLocker recovery key prompt."

**Accuracy.** Nothing logs while the recovery screen is up, and a boot that stops there never reaches Windows.
The next boot that reaches Windows logs what happened: the boot manager's refused unlock, the PCR that no longer matched, and the recovery password.
Each event's time is that later boot, not the moment the user saw the screen.
A device the user never got past the prompt has none of these yet.
Firmware runs before Windows: a firmware setting changed and changed back inside one gap leaves no event.
Include the last good boot before the prompt in the window.

**Feeds.** The recovery chain and the boot measurements are on `subsource` (LQL) `win.eventlog.system` (value), service `encryption` (value): `feeds/win.eventlog.system/reasons.md` and `fields.md`.
BitLocker's own management log is `win.eventlog.identity_security` (value). Firmware boot checks are `win.eventlog.platform` (value).
Observed changes between readings are `sparklogs.device.state` (value).

**Device health first.** `device_overview` (value) from before the last good boot through the prompt.
Its `events` (col), and the `events` (value) result set for the full list, carry the device's own observed changes between boots: `bios_version_changed` (value), `boot_mode_changed` (value), `secure_boot_disabled` (value), `secure_boot_enabled` (value), `tpm_presence_changed` (value), `tpm_version_changed` (value), `hardware_identity_changed` (value) and `volume_bitlocker_protection_dropped` (value).
The boot and shutdown marks around them are rows of the `events` (value) result set only.
An observed change says the setting moved between two readings, not who moved it or when inside that gap.
A TPM that disappeared, or a TPM failing on its own, is `playbooks/tpm-health.md`.

**The recovery chain.** One boot after the prompt usually carries three reasons:

- `bitlocker_tpm_unlock_failed` (value): the TPM would not release the key. Its arm, on `sparklogs.reason_variant` (LQL), says why: `tpm_refused` (value), `pcrs_mismatched` (value), `secure_boot_disabled` (value), `secure_boot_changed` (value), `protector_unusable` (value), or for a TPM and PIN protector `tpm_pin_refused` (value) and `enhanced_pin_refused` (value).
  The two PIN arms are also what a mistyped and retried PIN looks like: confirm a recovery password before calling them a recovery prompt.
- `bitlocker_tpm_binding_mismatch` (value): `win.eventlog.system.bitlocker_mismatched_pcr` (LQL) names the PCR that changed, and `win.eventlog.system.bitlocker_binding_pcr_bitmap` (LQL) the PCRs the protector is bound to (0x880 is PCRs 7 and 11).
- `bitlocker_recovery_password_used` (value): someone typed the recovery password and Windows started. Whoever typed it knows it now.

```
source = "<host>" AND subsource = "win.eventlog.system" AND service = encryption
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL).

**Which PCR changed.** `tpm_boot_pcr_values_recorded` (value) is logged on every boot that reaches Windows.
`win.eventlog.system.boot_pcr_fingerprint` (LQL) is one hash over all the boot's PCR values: equal on two boots means the measured boot path did not change.
`win.eventlog.system.boot_pcrs` (LQL) lists each PCR with its index, its value and, on a UEFI boot, its role: PCR 0 firmware code, 2 option ROMs, 4 boot manager, 5 partition table, 7 Secure Boot state and keys, 11 BitLocker access control.
`win.eventlog.system.boot_pcr_indices` (LQL) lists which PCRs were recorded. The `pcr_values_unreadable` (value) arm carries the indices but no values or fingerprint.

```
source = "<host>" AND sparklogs.reason = tpm_boot_pcr_values_recorded
```

Read the rows in time order and compare the fingerprint of the last boot before the prompt with the first boot after it.
If they differ, compare `win.eventlog.system.boot_pcrs` (LQL) entry by entry and name the PCR whose value changed.

**Which PCRs the key depends on.** The fingerprint covers every recorded PCR, but the TPM releases the key against only the PCRs it was sealed to.
BitLocker-API event 892 in the BitLocker management log, uncurated, names them: "BitLocker successfully sealed a key to the TPM. PCRs measured include [7,11]."
Take the newest 892 before the prompt:

```
source = "<host>" AND subsource = "win.eventlog.identity_security" AND event_id = 892
```

A changed PCR outside that list did not cause the prompt.
A boot manager update changes PCR 4 on every boot after it, and a key sealed to PCRs 7 and 11 still unlocks.
Name a PCR as the cause only when it changed and it is in the sealed list, or when `win.eventlog.system.bitlocker_mismatched_pcr` (LQL) names it.
Many devices also log BitLocker-Driver event 24711, uncurated, when a TPM protector started Windows. Some never log it, so read it against the device's own history:

```
source = "<host>" AND subsource = "win.eventlog.system" AND event_id in (24709, 24711, 24652)
```

Group by `event_id` (LQL). On a device whose boots usually carry 24711, a boot with 24709 and 24652 but no 24711 is the recovery boot.

**From the PCR to the change.** Look on the same device around the boot before the prompt:

- PCR 7 (Secure Boot state and keys): `secure_boot_disabled` (value) or `secure_boot_enabled` (value) on device state, the `secure_boot_disabled` (value) or `secure_boot_changed` (value) unlock arm, and Secure Boot certificate servicing in the System log: `secure_boot_cert_update_pending` (value) changes PCR 7 when it applies, `secure_boot_certs_current` (value) says it has applied, `secure_boot_update_failed` (value) says an attempt did not.
- PCR 0 and 2 (firmware code, option ROMs): `bios_version_changed` (value) on device state, a new dock or graphics card with its own option ROM.
  `fasr_pcr_validation_mismatch` (value) arm `pcr_mismatch` (value) on the platform feed names a PCR that differed from the firmware's certified manifest at boot. Its `no_mismatch` (value) arm is routine.
- PCR 4 (boot manager): a boot manager update, such as the boot manager signed with the 2023 certificates that `secure_boot_certs_current` (value) reports.

BitLocker-API event 793 in the BitLocker management log, uncurated, reads "BitLocker resealed boot settings to the TPM". BitLocker bound the drive key to the boot measurements of that moment. A 793 after a firmware or Secure Boot update means the key already follows the new measurements, so that update did not cause the prompt:

```
source = "<host>" AND subsource = "win.eventlog.identity_security" AND event_id = 793
```


**Events, for what health named.** What changed before the reboot:

```
source = "<host>" AND sparklogs.kind = config_change
```

Group by `sparklogs.config_change.type` (col), `sparklogs.config_change.target` (col).

Patching and firmware in the same window: servicing as in `playbooks/windows-update-failure.md`.
BitLocker that could not tie its key to Secure Boot on a boot: `bitlocker_secure_boot_unavailable` (value). Protection left suspended after a planned change: `bitlocker_protection_resume_failed` (value). Both are on `win.eventlog.identity_security` (value).
Boot integrity on Security: `sparklogs.reason = win_insecure_boot_config`, with its flags in `win.eventlog.security.insecure_boot_flags` (LQL).

**One device or many.** Before calling a cause, run the same reason over the organization: one noun `group_by=["source"]` over `bitlocker_tpm_unlock_failed` (value) or `bitlocker_tpm_binding_mismatch` (value).
The same mismatched PCR on many devices after one firmware or Secure Boot rollout is the rollout. One device alone points at that device's own change.

**Findings.** Lead with the recovery boot's time, the unlock arm and the mismatched PCR, then the change that matches it.
Say a change caused the prompt only when its time falls between the last good boot and the recovery boot.

**Off-endpoint** (HM6): recovery key escrow in the directory, Intune or the RMM, vendor firmware updates, hardware changed by hand.
