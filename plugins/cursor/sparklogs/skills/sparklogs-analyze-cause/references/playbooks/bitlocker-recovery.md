# BitLocker recovery prompt

**Trigger.** "Machine booted to a BitLocker recovery key prompt."

**Accuracy.** Nothing logs while the recovery screen is up, and a boot that stops there never reaches Windows.
The next boot that reaches Windows logs what happened: the boot manager's refused unlock, the PCR that no longer matched, and the recovery password.
Each event's time is that later boot, not the moment the user saw the screen.
A device the user never got past the prompt has none of these yet.
Firmware runs before Windows: a firmware setting changed and changed back inside one gap leaves no event.
Include the last good boot before the prompt in the window.

**Feeds.** The recovery chain, the unlock and the boot measurements are on `subsource` (LQL) `win.eventlog.system`: `../feeds/win.eventlog.system/reasons.md` and `fields.md`.
BitLocker's own management log, with the seals and reseals, is `win.eventlog.identity_security`. Firmware boot checks are `win.eventlog.platform`.
Observed changes between readings are `sparklogs.device.state`.

**Device health first.** `device_overview` from before the last good boot through the prompt.
Its `events` (col), and the `events` result set for the full list, carry the device's own observed changes between boots: `bios_version_changed`, `boot_mode_changed`, `secure_boot_disabled`, `secure_boot_enabled`, `tpm_presence_changed`, `tpm_version_changed`, `tpm_chip_changed`, `tpm_firmware_changed`, `hardware_identity_changed` and `volume_bitlocker_protection_dropped`.
The boot and shutdown marks around them are rows of the `events` result set only.
An observed change says the setting moved between two readings, not who moved it or when inside that gap.
`latest_state` on the `disk_volumes` topic gives each volume's `sparklogs.data.disk_volumes[].bitlocker_protection` (LQL) and `sparklogs.data.disk_volumes[].bitlocker_encryption_method` (LQL). The method says how the volume is encrypted (`hardware` is the drive's own encryption). Absent means BitLocker status could not be read or the volume is not encryptable, not that the volume is unprotected.
A TPM that disappeared, or a TPM failing on its own, is `tpm-health.md`.

**The recovery chain.** One boot after the prompt usually carries three reasons:

- `bitlocker_tpm_unlock_failed`: the TPM would not release the key. Its arm, on `sparklogs.reason_variant` (LQL), says why: `tpm_refused`, `pcrs_mismatched`, `secure_boot_disabled`, `secure_boot_changed`, `protector_unusable`, or for a TPM and PIN protector `tpm_pin_refused` and `enhanced_pin_refused`.
  The two PIN arms are also what a mistyped and retried PIN looks like: confirm a recovery password before calling them a recovery prompt.
  On `protector_unusable`, `win.eventlog.system.bitlocker_binding_id` (LQL) names the TPM protector that could not be used.
- `bitlocker_tpm_binding_mismatch`: `win.eventlog.system.bitlocker_mismatched_pcr` (LQL) names the PCR that changed, and `win.eventlog.system.bitlocker_binding_pcr_bitmap` (LQL) the PCRs the protector is bound to (0x880 is PCRs 7 and 11).
- `bitlocker_recovery_password_used`: someone typed the recovery password and Windows started. Whoever typed it knows it now.

```lql
source = "<host>" AND sparklogs.reason in (bitlocker_tpm_unlock_failed, bitlocker_tpm_binding_mismatch, bitlocker_recovery_password_used)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL).

**Which boots the TPM unlocked.** `bitlocker_tpm_unlock_succeeded` is a TPM protector releasing the key and Windows starting. Not every device logs it, so read it against the device's own history.
`tpm_boot_pcr_values_recorded` is logged on every boot that reaches Windows, so it marks the boots:

```lql
source = "<host>" AND sparklogs.reason in (tpm_boot_pcr_values_recorded, bitlocker_tpm_unlock_succeeded, bitlocker_recovery_password_used)
```

Read the rows in time order. On a device whose boots usually carry `bitlocker_tpm_unlock_succeeded`, a boot without it is a boot to check, not yet a recovery boot: confirm it with `bitlocker_recovery_password_used` or `bitlocker_tpm_unlock_failed` on the same boot.
Its `win.eventlog.system.bitlocker_binding_id` (LQL) is the protector that usually starts Windows; a `protector_unusable` failure with the same ID is that protector refusing, and a different ID is another protector on the drive.

**Which PCR changed.** `win.eventlog.system.boot_pcr_fingerprint` (LQL) on `tpm_boot_pcr_values_recorded` is one hash over all the boot's PCR values: equal on two boots means the measured boot path did not change.
`win.eventlog.system.boot_pcrs` (LQL) lists each PCR with its index, its value and, on a UEFI boot, its role: PCR 0 firmware code, 2 option ROMs, 4 boot manager, 5 partition table, 7 Secure Boot state and keys, 11 BitLocker access control.
`win.eventlog.system.boot_pcr_indices` (LQL) lists which PCRs were recorded. The `pcr_values_unreadable` arm carries the indices but no values or fingerprint.
Compare the fingerprint of the last boot before the prompt with the first boot after it. If they differ, compare `win.eventlog.system.boot_pcrs` (LQL) entry by entry and name the PCR whose value changed.

**Which PCRs the key depends on.** The fingerprint covers every recorded PCR, but the TPM releases the key against only the PCRs it was sealed to.
`bitlocker_key_sealed_to_tpm` is BitLocker sealing the drive key, logged again after each change to the boot path. `win.eventlog.identity_security.bitlocker_sealed_pcrs` (LQL) is the PCR list the key depends on (typically 7 and 11 on a UEFI device with Secure Boot), `win.eventlog.identity_security.bitlocker_seal_pcr_bitmap` (LQL) the same list as a hex bitmap, and `win.eventlog.identity_security.bitlocker_seal_pcr_source_name` (LQL) where the list came from (`secure_boot`; absent when Windows does not name the source, with the number in `win.eventlog.identity_security.bitlocker_seal_pcr_source` (LQL)).
`win.eventlog.identity_security.bitlocker_sealed_pcr_values` (LQL) holds the value each sealed PCR must have, in the same form as `win.eventlog.system.boot_pcrs` (LQL): one entry per PCR, with `pcr` and `value`.
`bitlocker_boot_settings_resealed` is the reseal of a volume's boot settings, logged around the same time as a seal, with the drive in `win.eventlog.identity_security.bitlocker_volume_mount_point` (LQL):

```lql
source = "<host>" AND subsource = "win.eventlog.identity_security" AND sparklogs.reason in (bitlocker_key_sealed_to_tpm, bitlocker_boot_settings_resealed)
```

The recovery boot is the boot that carries `bitlocker_recovery_password_used` or `bitlocker_tpm_unlock_failed`. Take the newest `bitlocker_key_sealed_to_tpm` written before that boot started: Windows usually reseals during the recovery boot itself, so a seal written on or after the recovery boot is the new seal, not the one the TPM refused, and does not count. Take the recovery boot's own `tpm_boot_pcr_values_recorded`.
Compare `win.eventlog.identity_security.bitlocker_sealed_pcr_values` (LQL) with `win.eventlog.system.boot_pcrs` (LQL) entry by entry, matching on `pcr`: a sealed PCR whose value differs is the one that made the TPM refuse.
A changed PCR outside the sealed list did not cause the prompt.
A boot manager update changes PCR 4 on every boot after it, and a key sealed to PCRs 7 and 11 still unlocks.
Name a PCR as the cause only when it is in the sealed list and its value differs, or when `win.eventlog.system.bitlocker_mismatched_pcr` (LQL) names it.
No seal in the window means the comparison cannot be made, not that the key is sealed to nothing: read further back, or fall back to `win.eventlog.system.bitlocker_mismatched_pcr` (LQL).
`bitlocker_key_retrieval_code_reported` is BitLocker-Driver reporting a code while it reads the key at restart. When the code carries a PCR bitmap, `win.eventlog.system.bitlocker_reported_pcrs` (LQL) lists those PCRs; it is not a failure by itself and appears on boots that opened normally.

**From the PCR to the change.** Look on the same device around the boot before the prompt:

- PCR 7 (Secure Boot state and keys): `secure_boot_disabled` or `secure_boot_enabled` on device state, the `secure_boot_disabled` or `secure_boot_changed` unlock arm, and Secure Boot servicing in the System log.
  `secure_boot_database_update_applied` is Windows writing a Secure Boot database update to the firmware, each of which changes PCR 7: arm `dbx` a revocation list update, `db` new trusted certificates, `pca_2011_revoked` the update that revokes the Windows Production PCA 2011.
  `secure_boot_cert_update_pending` changes PCR 7 when it applies, `secure_boot_certs_current` says it has applied, `secure_boot_update_failed` says an attempt did not. A pending or failed update itself: `windows-update-failure.md` (**Recovery environment and Secure Boot**).
- PCR 0 and 2 (firmware code, option ROMs): `bios_version_changed` on device state, a new dock or graphics card with its own option ROM.
  `fasr_pcr_validation_mismatch` arm `pcr_mismatch` on the platform feed names a PCR that differed from the firmware's certified manifest at boot. Its `no_mismatch` arm is routine.
- PCR 4 (boot manager): a boot manager update, such as the boot manager signed with the 2023 certificates that `secure_boot_certs_current` reports. On a key sealed to PCR 4, starting from another device first (a USB stick, a network boot, a dock that offers one) changes it too.

A `bitlocker_key_sealed_to_tpm` after a firmware or Secure Boot update usually means the key already follows the new measurements, so that update did not cause the prompt. When the seal values and the recovery boot's values disagree on a sealed PCR, that comparison wins over the order of events.

```lql
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (secure_boot_database_update_applied, secure_boot_cert_update_pending, secure_boot_certs_current, secure_boot_update_failed)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL), and place each row against the seals and the boots above.

**Causes that name no PCR.** The unlock arm is usually `tpm_refused` or `protector_unusable`, with no PCR mismatch logged:

- The TPM was cleared, reset by a firmware update, or turned off in firmware: `tpm_presence_changed` or `tpm_version_changed` on device state when Windows saw it go. The key sealed to the old TPM is gone, so only the recovery password opens the drive.
- A different TPM answered: `tpm_chip_changed`, raised when the TPM's maker ID changes, usually a firmware setting switching between the processor's firmware TPM and a discrete chip. Keys do not move between TPMs.
- TPM firmware updated: `tpm_firmware_changed` around the same restart. An update can clear the TPM.
- The drive moved to another computer, or the system board was replaced: `hardware_identity_changed` on device state.
- Repeated wrong PINs put the TPM into lockout, and it refuses every authorization until the lockout clears: `tpm_authorization_refused` in `tpm-health.md`.
- Boot debugging or test signing turned on: `win_insecure_boot_config` on Security, with the settings in `win.eventlog.security.insecure_boot_flags` (LQL), where Security auditing records it. Other boot entry edits leave no record here: ask who ran `bcdedit` or a repair tool before the prompt.

**Events, for what health named.** What changed between the last good boot and the recovery boot: the sweep, ranking and timing limits are in `what-changed.md`.
For a recovery prompt the types that matter are `bios`, `operating_system`, `kernel_driver` and `device_driver`:

```lql
source = "<host>" AND sparklogs.kind = config_change AND sparklogs.config_change.type in (bios, operating_system, kernel_driver, device_driver)
```

Group by `sparklogs.config_change.type` (LQL), then `sparklogs.config_change.target` (LQL).

Patching and firmware in the same window: servicing as in `windows-update-failure.md`.
BitLocker that could not tie its key to Secure Boot on a boot: `bitlocker_secure_boot_unavailable`. Protection left suspended after a planned change: `bitlocker_protection_resume_failed`. Both are on `win.eventlog.identity_security`.

**One device or many.** Before calling a cause, count `bitlocker_tpm_unlock_failed` or `bitlocker_tpm_binding_mismatch` across the organization by `source` (LQL), with the mismatched PCR beside it.
The same mismatched PCR on many devices after one firmware or Secure Boot rollout is the rollout. One device alone points at that device's own change.
A sealed PCR list other than the organization's usual one (`win.eventlog.identity_security.bitlocker_sealed_pcrs` (LQL) grouped by `source` (LQL)) marks devices whose key depends on more of the boot path, such as PCRs 0, 2, 4 and 11 when BitLocker does not use Secure Boot for integrity (`bitlocker_secure_boot_unavailable`), and that prompt after more kinds of change.

**Findings.** Lead with the recovery boot's time, the unlock arm and the PCR whose value differed from the seal, then the change that matches it.
Say a change caused the prompt only when its time falls between the last good boot and the recovery boot, and no seal came between the change and the recovery boot. A change first observed at the recovery boot's first reading (such as `bios_version_changed`) counts as inside that window: it happened before that boot.

**Off-endpoint** (HM6): recovery key escrow in the directory, Intune or the RMM, vendor firmware updates, hardware changed by hand.
