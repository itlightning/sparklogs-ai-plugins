<!-- GENERATED reference. Do not hand-edit. -->
# Lifecycle fields

Full inventory on its own schedule. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.lifecycle.subject_kind` | string |  | Lifecycle subject: os or agent. |
| `sparklogs.data.lifecycle.transition` | string |  | Lifecycle transition. |
| `sparklogs.data.lifecycle.boot_elapsed_s` | integer |  | Physical uptime at the occurrence, omitted when unknown. |
| `sparklogs.data.lifecycle.awake_s` | integer |  | Awake time at the occurrence as the reporting agent process reads it, omitted when unknown. Comparable only between rows from one agent process: a restarted agent can read seconds, or a whole Fast Startup, more than its predecessor. |
| `sparklogs.data.lifecycle.sleep_kind` | string |  | Suspend, hibernate or low power idle. |
| `sparklogs.data.lifecycle.sleep_state_native` | string |  | Native power state the sleep reached: `S3` or `S4` when the kernel's sleep-entry record (Kernel-Power 42) gives that effective state, `S0ix` for a low power idle span (reported only when its awake clock stopped); omitted for a suspend or hibernate without that record. |
| `sparklogs.data.lifecycle.sleep_reason_native` | integer |  | Native reason the Modern Standby session began, from the kernel's standby-entry record (Kernel-Power 506 `Reason`: 1 power button, 11 sleep request, 12 display idle timeout, 15 lid, 55 battery budget); low power idle only, omitted without that record. |
| `sparklogs.data.lifecycle.stop_cause` | string |  | Update, OS shutdown, operator or error. |
| `sparklogs.data.lifecycle.asleep_s` | integer |  | Seconds the machine spent asleep in the span: boot time minus awake time, both read by one agent process; omitted when its awake clock gave no reading. |
| `sparklogs.data.lifecycle.stopped_ts` | string | timestamp | Previous last-alive evidence, not exact crash time; a pre-engine crash can leave older evidence with no fixed error bound. |
| `sparklogs.data.lifecycle.last_alive_basis` | string |  | What dated the occurrence, which is last-alive evidence and not the exact crash time. `event_log`: the power button time in the kernel's unclean-reboot record (Kernel-Power 41), after a long press. `agent_tick`: the agent's last recorded observation. `latest_record`: on a row rebuilt from the System log, the latest record written before the boot that followed. Guards and the cleared-as-clean cases: `docs/engineering/clocks-and-observation.md`. |
| `sparklogs.data.lifecycle.booted_ts` | string | timestamp | Estimated current boot instant. |
| `sparklogs.data.lifecycle.step_s` | integer |  | Signed seconds the wall clock moved against the boot clock, forward positive; the time a forward step skipped was not observed. |
| `sparklogs.data.lifecycle.old_ts` | string | timestamp | Wall time just before the clock step, on the old clock. |
| `sparklogs.data.lifecycle.new_ts` | string | timestamp | Wall time just after the clock step, on the new clock; the occurrence time. |
| `sparklogs.data.lifecycle.fast_startup` | bool |  | True on the `host_shutdown` and `host_booted` pair a Fast Startup raises: the kernel's sleep-entry record targeted shutdown and reached hibernate (Kernel-Power 42 `TargetState` 6, `EffectiveState` 5) and the resume booted as Fast Startup (Kernel-Boot 27 `BootType` 1). The agent process and its uptime survive it, so `boot_elapsed_s` and `awake_s` keep counting from the earlier boot; on a pair rebuilt from the System log they are omitted. Omitted otherwise. |
| `sparklogs.data.lifecycle.step_source` | string |  | What measured the step: `tick_pair`, two of the agent's own clock readings, 10 s apart while the agent samples performance and otherwise up to one capture interval apart (60 s by default), so `old_ts` and `new_ts` place the step at the later reading, up to that interval after it happened. |
