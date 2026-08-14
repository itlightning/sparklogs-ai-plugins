# Windows Event Log classic-channel reason rows

The SparkLogs Managed Agent ships shaped source modules for the classic Windows Event Log channels.
Live today: `win.eventlog.setup`, `win.eventlog.system`, `win.eventlog.application`.
A labeled event carries `category = <module id>.<CLASS>.<reason>`; unlabeled events keep
`category = <module id>` and are CONTEXT (kept, severity may be shaped). Class semantics are in
`category-classes.md`; the per-event `service` values are in `service-taxonomy.md`.

Reason slugs are a frozen, additive-only query contract: pivot on them (`category` substring or
grouped aggregation). Severity column reading:

- **floor** - the module raises native severity at least this high.
- **cap / pinned** - the module holds a flood-prone or severity-lying family down.
- **native may raise** - floor applied, but an honest higher native severity is preserved.

Critical+ rows are rare by design and are a fetch-first contract: any non-zero critical+ count in
scope means fetch those events before proceeding, regardless of the investigation topic (see
`category-classes.md`, Query notes).

## `win.eventlog.setup` (Setup channel)

| Reason | Meaning | Service | Severity |
|---|---|---|---|
| `patch_servicing_failed` | Setup/3: a package failed to reach its target state; `ErrorCode` carries the servicing HRESULT. `service_detail` install/uninstall derived from the target state. | patching | Error |
| `store_corruption` | Setup/1015: component-store (WinSxS) corruption confirmed unrepaired; Setup/1014 when repaired < total corruption. Predicts future servicing failures. | patching | Warning (Notice on a detection-only scan) |

CONTEXT: the servicing bookends (initiating, success, reboot-needed, scan-started, clean scan) are
kept at Info. `store_corruption` deliberately shares its spelling with `win.servicing.cbs`: the same
fact witnessed from the event channel and from CBS.log, one fleet reason-pivot.

## `win.eventlog.system` (System channel)

| Reason | Meaning | Service | Severity |
|---|---|---|---|
| `disk_controller_error` | disk/11: controller error. Repeating on a fixed disk = dying disk. | storage | Error |
| `disk_paging_error` | disk/51: error during a paging operation. | storage | Warning |
| `disk_corruption` | disk/55: confirmed file-system corruption record. | storage | Critical |
| `disk_io_retried` | disk/153: IO operation retried. | storage | Warning |
| `disk_surprise_removal` | disk/157: disk removed unexpectedly. | storage | Warning |
| `storage_controller_reset` | storahci AHCI port reset/timeout (level-gated within the provider). | storage | Error |
| `ntfs_corruption` | Ntfs/55: corruption discovered, chkdsk required (Critical); Ntfs/130 repair-activity arm shares the reason at Error. | storage | Critical (55) / Error (130) |
| `vss_shadow_lost` | Volsnap/25: shadow copies deleted (realized restore-point loss). | backup | Error |
| `vss_shadow_aborted` | Volsnap/36: shadow copies aborted on the storage limit. | backup | Error |
| `dirty_shutdown` | Kernel-Power/41: rebooted without clean shutdown. | os_stability | Error (server/unknown) / Warning (workstation) |
| `bugcheck` | WER-SystemErrorReporting/1001: rebooted from a bugcheck; code and dump path surfaced. | os_stability | Error |
| `unexpected_shutdown` | EventLog/6008: previous shutdown was unexpected. | os_stability | Error |
| `service_installed` | SCM/7045: a service was installed. Persistence indicator; ServiceName/ImagePath/account surfaced as change-analysis joins. | security_audit | Warning |
| `service_crashed` | SCM/7031, 7034: service terminated unexpectedly. Also the vendor hook for third-party service crashes. | app_stability | Error |
| `service_exited_error` | SCM/7024, 7023: service terminated with an error. | app_stability | Error |
| `service_start_failed` | SCM/7000: service failed to start. | app_stability | Error |
| `service_start_timeout` | SCM/7009: timeout waiting for the service to connect. | app_stability | Error |
| `service_hang` | SCM/7011: timeout waiting for a transaction response. | app_stability | Error |
| `driver_load_failed` | Kernel-PnP/219: driver failed to load. | hardware | Warning |
| `hardware_error` | WHEA-Logger machine-check/PCIe/memory records: 17/19 corrected (early-warning trail), 18/20 uncorrected. | hardware | Notice (corrected) / Error (uncorrected) |
| `wlan_limited_connectivity` | WLAN-AutoConfig/4003: limited connectivity, wifi degradation onset. | networking | Warning |
| `time_sync_failed` | Time-Service/134: cannot resolve the time source; sustained forms mean clock skew (auth/TLS blast radius). | time_sync | Warning |
| `tls_cert_name_mismatch` | Schannel/36884: server certificate name mismatch. | certificates | Error |
| `tpm_attestation_failed` | TPM-WMI/1040: TPM attestation critical-component failure. | security_audit | Error |
| `dcom_register_timeout` | DistributedCOM/10010: server did not register with DCOM in time. | app_stability | Error |
| `dcom_activation_timeout` | DistributedCOM/10029: CLSID activation timed out. | app_stability | Error |
| `dcom_start_error` | DistributedCOM/10005: DCOM error starting a service. | app_stability | Error |
| `app_popup_error` | Application Popup/26: a crash surfaced as an error dialog. | app_stability | Warning |
| `vswitch_offload_change` | Hyper-V-VmSwitch 291/292: RSC offload modified (BENIGN on workstations; same reason). | virtualization | Info (pinned) |
| `vswitch_topology_change` | Hyper-V-VmSwitch NIC/port connect/disconnect family (BENIGN on workstations). | virtualization | Info (pinned) |
| `vswitch_config_restore_failed` | Hyper-V-VmSwitch/15: failed to restore port configuration. | virtualization | Warning floor, native may raise (Info on workstation) |
| `iis_worker_crash` | WAS/5011: IIS worker terminated unexpectedly. The pool respawns; the durable outage is 5002. | web | Warning |
| `iis_apppool_disabled` | WAS/5002: app pool auto-disabled by rapid-fail protection (503s until fixed). | web | Error |
| `iis_apppool_failure` | WAS 5009/5021/5057/5059: worker/config/mapping failure family. | web | Warning floor (native may raise) |
| `cluster_node_removed` | FailoverClustering/1135: node removed from active membership. | clustering | Error |
| `cluster_resource_failed` | FailoverClustering/1069: clustered resource failed. | clustering | Error |
| `cluster_rhs_crash` | FailoverClustering/1146: Resource Hosting Subsystem terminated. | clustering | Error |
| `cluster_resource_hang` | FailoverClustering/1230: resource deadlocked and was terminated. | clustering | Error |
| `cluster_service_down` | FailoverClustering 1073/1177/1006: cluster service halted or forced down. | clustering | Error |
| `cluster_quorum_loss` | FailoverClustering/1561: quorum/witness loss. | clustering | Error |
| `cluster_csv_unavailable` | FailoverClustering 5120/5142: Cluster Shared Volume paused/unavailable. | clustering | Error |
| `gpu_driver_reset` | nvlddmkm/153: NVIDIA display driver reset (TDR family). | hardware | Error |

Module notes:

- `patch_install_failed` (WindowsUpdateClient/20) is frozen but INERT: no rule fires; Windows
  Update System-channel copies stay CONTEXT at native severity.
- Heavy CONTEXT severity shaping exists on this channel (chatter capped Debug, documented
  severity-lying ids capped Info). A quiet severity distribution is shaped, not empty; pivot on
  `category` classes to find the labeled signal.

## `win.eventlog.application` (Application channel)

| Reason | Meaning | Service | Severity |
|---|---|---|---|
| `app_crash` | Application Error/1000: process crashed (faulting app, module, exception code surfaced). | app_stability | Error |
| `app_hang` | Application Hang/1002: app stopped interacting and was closed. | app_stability | Error |
| `app_crash_report` | WER/1001 where `EventName` is APPCRASH/AppHangB1/BEX: the report RECORD; the Error-band witness is the 1000/1002 event it describes. | app_stability (patching on StoreAgentInstall*) | Notice |
| `dotnet_unhandled` | .NET Runtime/1026: unhandled managed exception terminated the process. | app_stability | Error |
| `install_failed` | MsiInstaller/11708: product install failed. One failure is user-retryable; recurrence is the escalation datum. | patching | Warning |
| `install_error` | MsiInstaller 1013/10005/11722/11923/11729/1032: install/configuration errors. | patching | Warning floor (native may raise) |
| `profile_load_fail` | User Profiles Service 1511/1542: profile cannot load, temp profile in use. Logon-impacting. | user_profiles | Error |
| `cert_enroll_fail` | CertificateServicesClient-CertEnroll/87: device enrollment pending/failed; nothing else reports a cert that never arrived. | certificates | Error |
| `esent_corruption` | ESENT 447/474/448: OS-plane embedded-store corruption (search index, SRUM); rebuildable app state, not user data. | os_stability | Error |
| `db_corruption` | MSSQLSERVER (and named instances) 823 I/O failure (Error), 824 confirmed page corruption (Critical), 825 read-retry precursor (Warning). | database | Error (823) / Critical (824) / Warning (825) |
| `ca_crl_fail` | CertificationAuthority/74: CRL publish failure (org-wide revocation-check risk). | certificates | Error |
| `ca_chain_fail` | CertificationAuthority 65/66 (+58): CA chain-validation/publish failure family. | certificates | Error |
| `gpu_tdr` | nvlddmkm / NVIDIA OpenGL Driver in Application at native Warning-or-worse: GPU TDR. | hardware | Error |
| `vendor_svc_fail` | OVRServiceLauncher at native Error: vendor service launch/session failure. | app_stability | Error |

BENIGN rows (defused false positives; kept, capped Info):

| Reason | Meaning | Service |
|---|---|---|
| `restart_blocked` | RestartManager 10006/10007: an open app blocked an install restart. Native Error, reclassified BENIGN: the install retries once the app closes, so the line is not actionable on its own. | patching |
| `install_failed` / `install_error` (retry arms) | The same MsiInstaller ids reclass BENIGN when the result code is MSI 1618 / 0x80070652: another install in progress, try again later. | patching |
| `e2e_test_event` | SparkLogsE2E/777: SparkLogs' own end-to-end test marker. | rmm |

Module notes:

- **Bare-id collision:** Microsoft-Windows-EventSystem emits event id 4625 (a benign COM+ notice) on
  every machine, colliding with Security 4625 (logon failure). Never key on an event id alone;
  provider + channel + id together identify an event family.
- Cross-witness reason pairs are intentional: `service_installed` (System SCM 7045 / Security 4697),
  `iis_worker_crash` (System WAS / Application IIS), `store_corruption` (Setup / CBS.log).
  Same reason = same fact from two witnesses; one fleet pivot.
- `gpu_driver_reset` (System) and `gpu_tdr` (Application) are the same subsystem witnessed on
  different channels; the distinct spellings are frozen.

## Change-analysis lens: "what changed on this box, and who changed it?"

Change-class events preserve actor/change join keys so change analysis is a query pattern, not a
guess: `SubjectUserName`, `SubjectLogonId`, `LogonGuid`, `IpAddress`, the 4688 parent/process ids,
service installs (7045 family), scheduled-task changes (TaskScheduler family), and GPO events.

The recipe (query family + actor-in-window):

1. Establish the change window from the symptom onset.
2. Sweep change-class evidence in the window: `service_installed` (System SCM 7045), MSI install
   outcomes (Application MsiInstaller), and, as the Security module ships, the scheduled-task,
   account/group, policy-change, and 4688 process-creation families. Use grouped aggregation over
   `category` / reason-bearing slices.
3. Attribute: read the actor keys off the change event; join the actor's logon session. A 4624
   LogonType 10 logon is an RDP session, and `IpAddress` names the origin.
4. Expand actor-in-window: fetch everything the same `SubjectLogonId` / `SubjectUserName` touched
   inside the window.

System 7045 and Application MSI evidence is live, and so are the Security-channel families
(4688, 4624, task, account and policy changes): those ship in `win.eventlog.security`.

## Security channel: `win.eventlog.security`

This module is shipped and curated, and it has its own generated reference set rather than reason
rows here: 50 curated surfaces with a field schema, closed vocabularies, an expected-pattern
decision procedure and worked query recipes.

Scope a query to this channel with `subsource = "win.eventlog.security"`.

Route to it through `generated-reference-router.md`, which sends you to one artifact under
`generated/win.eventlog.security/` by the shape of the question you are holding. Start at that
module's `README.md` if you are not sure which one you want.

Two things this table cannot tell you that the generated set can: which curated surface writes a
given field (promotion is per surface, not per module), and whether a rendered pattern string is one
the pack meant to produce.
