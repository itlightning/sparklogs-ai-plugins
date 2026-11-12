---
index: TPM errors or attestation failure
---

# TPM errors or attestation failure

**Trigger.** "The TPM keeps logging errors", "Windows Hello or BitLocker says the TPM is not working", or a device fails Intune device health attestation.

**Accuracy.** The TPM logs event 17 in the System log for every command it does not complete, and most of those are Windows asking what the TPM supports.
A large event 17 count is not a TPM fault. Count the failing populations only.
The TPM events say a command or check failed on the device. They do not say whether Intune or conditional access marked the device noncompliant: that verdict is off-endpoint.
Attestation checks run on a schedule and at boot, so one failed check is one reading, not a standing state.

**Feeds.** `subsource` (LQL) `win.eventlog.system` (value) carries TPM event 17, TPM hardware errors and TPM-WMI attestation: `feeds/win.eventlog.system/reasons.md` and `fields.md`.
`win.eventlog.platform` (value) carries the boot environment's TPM initialization.
Each reason's arm is on `sparklogs.reason_variant` (LQL).

**Device health first.** `latest_state` (value) on the `system_info` (value) topic: `sparklogs.data.system_info.tpm_present` (col) and `sparklogs.data.system_info.tpm_version` (col) say whether Windows sees a TPM now and which specification it reports.
`device_overview` (value) over the window: its `events` (col) carry `tpm_presence_changed` (value) (a TPM appeared or disappeared, usually a firmware setting, firmware update or board replacement), `tpm_version_changed` (value) and `bios_version_changed` (value).
A TPM that disappeared or changed version explains every TPM error after it. Look for that change before reading event 17.

**Event 17: routine or failing.**

- Routine, never counted on its own: `tpm_capability_probe_declined` (value) (the TPM answered "not supported" or "not there"), `tpm_command_retry_requested` (value) (busy or self-testing, Windows retries), `tpm_counter_reset_on_resume` (value) (TPM event 30, firmware reset the TPM during sleep). A healthy device can log hundreds of probe refusals.
- `tpm_command_failed` (value): arm `below_tpm` (value) is a Windows driver status in `win.eventlog.system.tpm_response_code` (LQL), so the command got no answer from the TPM. Arm `failure_mode` (value) is TPM2_RC_FAILURE: the TPM has stopped until restart. Arm `unrecognized` (value) is a response outside the routine groups.
- `tpm_authorization_refused` (value): a wrong authorization value, often a mistyped PIN, which counts toward the TPM's lockout, or a policy that no longer matches the boot measurements. Warning when the TPM is in lockout and refuses every authorization.
- `tpm_hardware_failed` (value): TPM event 15, the driver found a non-recoverable TPM error and stopped TPM services. `win.eventlog.system.tpm_error_data` (LQL) holds the status.

```
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (tpm_command_failed, tpm_authorization_refused, tpm_hardware_failed)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL).
Breadth across commands: group the same query by `win.eventlog.system.tpm_command` (LQL), `win.eventlog.system.tpm_response` (LQL).
Many `tpm_command_failed` (value) rows across many different commands, over and over, plus `tpm_hardware_failed` (value), is a TPM, firmware or driver problem.
A few refusals on one or two commands mean nothing on their own.
For `tpm_authorization_refused` (value), read `win.eventlog.system.tpm_response_position` (LQL) for which authorization the TPM refused, and check whether the user reports a PIN or BitLocker unlock problem at the same time.

**Attestation.**

- `tpm_attestation_check_failed` (value): TPM-WMI event 1041. Arm `required_check_failed` (value) means the device cannot pass attestation. The failed checks are in `win.eventlog.system.tpm_attestation_required_failed` (LQL), most often EkCertIsAvailable (no endorsement key certificate, common on virtual machines and some older TPMs).
  Arm `expected_check_failed` (value) lists its checks in `win.eventlog.system.tpm_attestation_expected_failed` (LQL), usually PcrsMatchTcgLog: attestation may fail for this boot only. A restart and a passing 1041 clear it.
  `win.eventlog.system.tpm_attestation_health_status` (LQL) is the overall result Windows wrote (Attestable, Possibly attestable, Cannot be attested). `win.eventlog.system.tpm_attestation_pcrs_match_tcg_log` (LQL) and `win.eventlog.system.tpm_attestation_tpm_responsive` (LQL) are the two checks that point at the TPM itself.
- `tpm_attestation_failed` (value): TPM-WMI event 1040, a critical component failed the pre-attestation checks. The event names a detail file on the device and carries no check results, so read the 1041 beside it.
- `device_health_cert_service_unreachable` (value): TPM-WMI event 1538, the health certificate request could not reach Microsoft's service. Arm `name_not_resolved` (value) is the request running before the network is up and is routine. Arm `other_error` (value) points at a firewall, proxy or filtering rule.

```
source = "<host>" AND subsource = "win.eventlog.system" AND sparklogs.reason in (tpm_attestation_check_failed, tpm_attestation_failed, device_health_cert_service_unreachable)
```

Group by `sparklogs.reason` (LQL), `win.eventlog.system.tpm_attestation_health_status` (LQL).

**No usable TPM at boot.** `tpm_initialization_failed` (value) on `win.eventlog.platform` (value) is Kernel-Boot event 235. Arm `no_usable_tpm` (value) means the boot environment found no TPM it could use: a virtual machine without a virtual TPM logs it at every boot.
Arm `init_failed` (value) is any other initialization failure, with the boot position in `win.eventlog.platform.tpm_init_position` (LQL). It says the boot could not initialize the TPM, not that the TPM is absent.

**One device or many.** Before calling a TPM event significant, run the same reason over the organization: one noun `group_by=["source"]` over `tpm_command_failed` (value) or `tpm_attestation_check_failed` (value).
The same reason and arm on many devices that work is a model or firmware trait. One device with a high count among peers that log none is that device.
A failed Required check on every virtual machine in the organization is the hypervisor's TPM, not a fault.

**Findings.** Lead with the failing population and its count on the device, then the peer comparison.
Name probe and retry counts only to say they were excluded.
A TPM fault and a BitLocker recovery prompt on the same device: `playbooks/bitlocker-recovery.md`.

**Off-endpoint** (HM14): the Intune compliance or conditional access verdict, Microsoft's attestation service, TPM firmware advisories from the device maker, a virtual machine host's virtual TPM.
