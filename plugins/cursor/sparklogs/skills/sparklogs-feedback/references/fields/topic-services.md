<!-- GENERATED reference. Do not hand-edit. -->
# Windows services fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.services.name` | string |  | The service's name. |
| `sparklogs.data.services.display_name` | string |  | The service's display name reported by the Service Control Manager. |
| `sparklogs.data.services.user_instance` | bool |  | Whether this is an actual per-user service instance, identified by the SCM service-type instance bit. These rows are retained only in inventories. |
| `sparklogs.data.services.current_state` | string |  | The service's current SCM state. |
| `sparklogs.data.services.current_state_code` | integer |  | Windows Service Control Manager numeric code for `current_state`. |
| `sparklogs.data.services.pid` | integer |  | ID of the process hosting this service. Absent when the service is not running. |
| `sparklogs.data.services.svc_pending_checkpoint` | integer |  | The progress count the service reports during its current start, stop, pause or continue (`dwCheckPoint`). Present only while the service is pending. |
| `sparklogs.data.services.svc_pending_wait_hint_ms` | integer | milliseconds | How long the service says its next pending step should take, in milliseconds (`dwWaitHint`). Present only while the service is pending. |
| `sparklogs.data.services.svc_pending_first_seen_ts` | string | timestamp | When the agent first saw the service in its current pending transition: the same state and process since. Present only while the service is pending. |
| `sparklogs.data.services.svc_pending_stalled` | bool |  | Whether the service is stuck in one pending transition: the same state and process as the previous capture, at most two capture intervals of awake time earlier, with a progress count that did not rise. `false` for a transition that progressed or just began, and for a trigger-start service idling in start pending. Absent while not pending, and when the agent cannot tell (a start-pending service whose trigger configuration is unreadable, or the first capture after a gap the agent did not watch, unless the progress count rose across it). |
| `sparklogs.data.services.svc_pending_stalled_age_min` | float | minutes | Observed minutes the service has sat stalled in its current pending transition: awake time credited as for `svc_stopped_age_min`, so sleep and unwatched gaps add nothing and a hang that spans a sleep keeps its age. Starts over on a new process, a new state or a rising progress count. Absent while not pending, and for a trigger-start service idling in start pending. |
| `sparklogs.data.services.start_type` | string |  | Configured service startup type. Absent when the configuration could not be read. |
| `sparklogs.data.services.command_line` | string |  | The command the Service Control Manager runs to start the service, taken from its registry `ImagePath`: unexpanded, arguments included, cut at 4096 characters. Absent when the configuration could not be read. |
| `sparklogs.data.services.account` | string |  | The account the service runs as, such as `LocalSystem` or a domain account, as the service's registry configuration names it. Absent when the configuration could not be read or names no account. |
| `sparklogs.data.services.auto_start` | bool |  | Whether the service is configured to start automatically. Absent when the configuration could not be read. |
| `sparklogs.data.services.has_triggers` | bool |  | Whether the service has startup triggers. A trigger-start service can legitimately be stopped. |
| `sparklogs.data.services.delayed_in_boot_grace` | bool |  | Whether this service is a delayed-auto-start service still inside its boot grace period. |
| `sparklogs.data.services.stopped_with_an_error` | bool |  | Whether the service's last stop carried a non-zero exit code. |
| `sparklogs.data.services.stopped_exit_code` | integer |  | The Win32 exit code the service last stopped with. Absent while the service is not stopped. |
| `sparklogs.data.services.stopped_exit_name` | string |  | The symbolic name of `stopped_exit_code`, from the pack's Win32 error table. Absent when the code is zero or the table has no row for it. |
| `sparklogs.data.services.stopped_exit_space` | string |  | The code table `stopped_exit_code` belongs to: `win32`. Present whenever the code is, named or not. |
| `sparklogs.data.services.stopped_service_specific_code` | integer |  | The service's own exit code, whose meaning only that service defines, so nothing names it. Present only while the service is stopped with `stopped_exit_code` 1066 (`ERROR_SERVICE_SPECIFIC_ERROR`), the one case Windows says the value means anything. |
| `sparklogs.data.services.stopped_service_specific_space` | string |  | The code table `stopped_service_specific_code` belongs to: `service_specific`, the service's own. Present exactly when the code is. |
| `sparklogs.data.services.is_critical_category` | bool |  | Whether the enrichment store's product-category inventory marks this service critical (for example an RMM agent). Absent when that inventory is stale or has not run. |
| `sparklogs.data.services.service_class` | string |  | The pack's service class for this service (`backup`, `edr_av`, `database`, `mail`, `directory`, `virtualization`, `profiles`, `rmm`, `platform`, `web_server`, `vpn`, `remote_access`, `printing`, `siem`, or `licensing`). Descriptive only. Omitted for a service the table does not mention or gives no class. |
| `sparklogs.data.services.service_class_code` | integer |  | Numeric code for `service_class`. |
| `sparklogs.data.services.service_tier` | string |  | The tier the services conditions grade this service on, resolved on this host from the pack's service class table: `ordinary`, `important`, `critical`, `critical_shared` or `suppress`. A row's role-host tier applies when the host holds its role, else its server tier on a server, else its base tier; a service the table does not mention is `ordinary`. |
| `sparklogs.data.services.service_tier_code` | integer |  | Numeric code for `service_tier`: 0 suppress, 1 ordinary, 2 important, 3 critical, 4 critical_shared. |
| `sparklogs.data.services.svc_stopped_age_min` | float | minutes | Observed minutes the service has been not running: the awake time the agent credits between consecutive captures, so sleep, a stall longer than two capture intervals and the time the agent was not running add nothing. It holds still, neither growing nor resetting, while the service is starting, stopping or continuing and while a delayed-start service is inside its boot grace. Absent while running or stopped with exit code 0, and for a service that has been pending or in its boot grace since then. |
| `sparklogs.data.services.svc_crash_count_24h` | integer | count | How many times this service has crashed in the last 24 hours. Absent until the event-log crash scan has first run after a start, or while its reading is stale; zero when the scan ran and found none. |
| `sparklogs.data.services.svc_crash_count_24h_by_id` | object |  | The same 24-hour crash count broken out by the Windows Event Log id that recorded each crash. |
| `sparklogs.data.services.svc_crash_first_seen_ts` | string | timestamp | When the oldest crash counted in the current window was recorded. |
| `sparklogs.data.services.svc_crash_last_seen_ts` | string | timestamp | When the newest crash counted in the current window was recorded. |
| `sparklogs.data.services.svc_crash_truncated` | bool |  | Whether the crash count hit its cap: more crashes happened than the counter kept individually. |
| `sparklogs.data.services.svc_crash_unresolved_count` | integer | count | How many crash records could not be attributed to a specific service. |
| `sparklogs.data.services.svc_crash_measured_at` | string | timestamp | When this row's crash counts were measured. |
| `sparklogs.data.services.service_auto_not_running_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.services.service_auto_not_running_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.services.service_flapping_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.services.service_flapping_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.services.service_stuck_pending_age_min` | float | minutes | How long this condition has been open, in minutes. |
