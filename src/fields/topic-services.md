<!-- GENERATED reference. Do not hand-edit. -->
# Windows services fields

Full inventory every 6 hours; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.services.name` | string |  | The service's name. |
| `sparklogs.data.services.current_state` | string |  | The service's current SCM state. |
| `sparklogs.data.services.current_state_code` | integer |  | `current_state` as the raw SCM number a ladder compares against a set of states. |
| `sparklogs.data.services.pid` | integer |  | The process hosting this service, so a service and the process table join on a number rather than a guess about which `svchost` is which. Absent while the service is not running. |
| `sparklogs.data.services.start_type` | string |  | How the service is configured to start. Omitted when the configuration could not be read: unreadable is not the same as disabled. |
| `sparklogs.data.services.auto_start` | bool |  | Whether this service is configured to start automatically: one of the excuses a stopped service might have. |
| `sparklogs.data.services.has_triggers` | bool |  | Whether this service starts on a trigger rather than unconditionally at boot: another excuse a stopped auto-start service might have. |
| `sparklogs.data.services.delayed_in_boot_grace` | bool |  | Whether this service is a delayed-auto-start service still inside its boot grace period. |
| `sparklogs.data.services.stopped_with_an_error` | bool |  | Whether the service's last stop carried a non-zero exit code. |
| `sparklogs.data.services.stopped_exit_code` | integer |  | The Win32 exit code the service last stopped with. Absent while the service is not stopped. |
| `sparklogs.data.services.is_critical_category` | bool |  | Whether the enrichment store's product-category inventory marks this service critical (for example an RMM agent). Absent when that inventory is stale or has not run. |
| `sparklogs.data.services.service_is_important` | bool |  | Whether the pack's service class table marks this service's tier `important`. `false` for a service the table does not classify, which keeps a host running no table on the ordinary bars instead of dark. |
| `sparklogs.data.services.service_class` | string |  | The pack's service class for this service (`backup`, `edr_av`, `database`, `mail`, `directory`, `virtualization`, `profiles`, `rmm`, or `platform`). Omitted for a service the table does not mention. |
| `sparklogs.data.services.service_class_code` | integer |  | `service_class` as the number a ladder compares against a set of classes. |
| `sparklogs.data.services.service_role_on_host` | bool |  | Whether this host IS the thing the service provides: `false` when the class names no role, when the host does not hold it, and when role detection never ran. |
| `sparklogs.data.services.svc_stopped_age_min` | float | minutes | How long this service has been off, the reading every rung of the stalled ladder is chosen by. Absent while the service is running or still inside its boot grace. |
| `sparklogs.data.services.svc_crash_count_24h` | integer | count | How many times this service has crashed in the last 24 hours. Zero when the count ran and found none, never absent. |
| `sparklogs.data.services.svc_crash_count_24h_by_id` | object |  | The same 24-hour crash count broken out by the Windows Event Log id that recorded each crash. |
| `sparklogs.data.services.svc_crash_first_seen_ts` | string | timestamp | When the oldest crash counted in the current window was recorded. |
| `sparklogs.data.services.svc_crash_last_seen_ts` | string | timestamp | When the newest crash counted in the current window was recorded. |
| `sparklogs.data.services.svc_crash_truncated` | bool |  | Whether the crash count hit its cap: more crashes happened than the counter kept individually. |
| `sparklogs.data.services.svc_crash_unresolved_count` | integer | count | How many crash records could not be attributed to a specific service. |
| `sparklogs.data.services.svc_crash_measured_at` | string | timestamp | When this row's crash counts were measured. |
| `sparklogs.data.services.service_auto_not_running_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.services.service_auto_not_running_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.services.service_flapping_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.services.service_flapping_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.services.service_stuck_pending_age_min` | float | minutes | How long this condition has been open, in minutes. |
