<!-- GENERATED reference. Do not hand-edit. -->
# Windows services fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.services.name` | string |  | The service's name. |
| `sparklogs.data.services.current_state` | string |  | The service's current SCM state. |
| `sparklogs.data.services.current_state_code` | integer |  | Windows Service Control Manager numeric code for `current_state`. |
| `sparklogs.data.services.pid` | integer |  | ID of the process hosting this service. Absent when the service is not running. |
| `sparklogs.data.services.start_type` | string |  | Configured service startup type. Absent when the configuration could not be read. |
| `sparklogs.data.services.auto_start` | bool |  | Whether the service is configured to start automatically. |
| `sparklogs.data.services.has_triggers` | bool |  | Whether the service has startup triggers. A trigger-start service can legitimately be stopped. |
| `sparklogs.data.services.delayed_in_boot_grace` | bool |  | Whether this service is a delayed-auto-start service still inside its boot grace period. |
| `sparklogs.data.services.stopped_with_an_error` | bool |  | Whether the service's last stop carried a non-zero exit code. |
| `sparklogs.data.services.stopped_exit_code` | integer |  | The Win32 exit code the service last stopped with. Absent while the service is not stopped. |
| `sparklogs.data.services.is_critical_category` | bool |  | Whether the enrichment store's product-category inventory marks this service critical (for example an RMM agent). Absent when that inventory is stale or has not run. |
| `sparklogs.data.services.service_is_important` | bool |  | Whether the pack's service class table marks this service's tier `important`. `false` when the table does not classify the service or marks it ordinary or suppress. |
| `sparklogs.data.services.service_is_classified` | bool |  | Whether the Data Feed Pack classifies this service. False for an unclassified service. |
| `sparklogs.data.services.service_class` | string |  | The pack's service class for this service (`backup`, `edr_av`, `database`, `mail`, `directory`, `virtualization`, `profiles`, `rmm`, or `platform`). Omitted for a service the table does not mention. |
| `sparklogs.data.services.service_class_code` | integer |  | Numeric code for `service_class`. |
| `sparklogs.data.services.service_role_on_host` | bool |  | Whether this device has the role associated with the service class. False if the class has no role, the device lacks it, or role detection has not run. |
| `sparklogs.data.services.svc_stopped_age_min` | float | minutes | Minutes the service has been stopped. Absent while running or within its boot grace period. |
| `sparklogs.data.services.svc_crash_count_24h` | integer | count | How many times this service has crashed in the last 24 hours. Zero when the count ran and found none, never absent. |
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
