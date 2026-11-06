<!-- GENERATED reference. Do not hand-edit. -->
# Windows services fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.services.name` | string |  | The service's name (its short name, as `sc query` shows it). |
| `sparklogs.data.services.display_name` | string |  | The service's display name, as the Services console shows it. |
| `sparklogs.data.services.user_instance` | bool |  | Whether this is a per-user service instance (a copy Windows starts for each signed-in user, named with a suffix). These rows appear only in full inventories. |
| `sparklogs.data.services.current_state` | string |  | The service's current state: `running`, `stopped`, `start_pending`, `stop_pending`, `paused`, `pause_pending`, `continue_pending`, or `unknown` for a state this agent does not name. |
| `sparklogs.data.services.current_state_code` | integer |  | The numeric service state Windows reports. |
| `sparklogs.data.services.pid` | integer |  | The ID of the process hosting the service. Absent when the service is not running. |
| `sparklogs.data.services.svc_pending_checkpoint` | integer |  | The progress count the service reports while it is starting, stopping, pausing or continuing. A service making progress raises it. Present only during such a transition. |
| `sparklogs.data.services.svc_pending_wait_hint_ms` | integer | milliseconds | How long the service says its next step should take while it is starting, stopping, pausing or continuing. Present only during such a transition. |
| `sparklogs.data.services.svc_pending_first_seen_ts` | string | timestamp | When the agent first saw the service in its current transition, in the same state and process. Present only during a transition. |
| `sparklogs.data.services.svc_pending_stalled` | bool |  | Whether the service is stuck in a transition: in the same state and process as at the previous capture, with a progress count that did not rise. False for a transition that is progressing or just began, and for a trigger-start service waiting in start pending. Absent outside a transition, and when the agent cannot tell, such as on the first capture after the agent was not running. |
| `sparklogs.data.services.svc_pending_stalled_age_min` | float | minutes | How long the service has been stuck in its current transition, counting only time the machine was awake and the agent was watching. Starts over with a new process, a new state or a rising progress count. Absent outside a transition, and for a trigger-start service waiting in start pending. |
| `sparklogs.data.services.start_type` | string |  | The service's configured startup type: `boot`, `system`, `auto`, `auto_delayed`, `manual` or `disabled`. Windows changes BITS, IsolationSession and TrustedInstaller on its own, so a change to those three raises no change event. Absent when the configuration could not be read. |
| `sparklogs.data.services.command_line` | string |  | The command Windows runs to start the service (its registry `ImagePath`), with arguments and with environment variables not expanded, cut at 4,096 characters. Absent when the configuration could not be read. |
| `sparklogs.data.services.account` | string |  | The account the service runs as, such as `LocalSystem` or a domain account. Absent when the configuration could not be read or names no account. |
| `sparklogs.data.services.auto_start` | bool |  | Whether the service is set to start automatically. Absent when the configuration could not be read. |
| `sparklogs.data.services.has_triggers` | bool |  | Whether the service has start triggers. A trigger-start service is often stopped by design. |
| `sparklogs.data.services.delayed_in_boot_grace` | bool |  | Whether this is a delayed-start service and the machine started so recently that Windows may not have started it yet. |
| `sparklogs.data.services.stopped_with_an_error` | bool |  | Whether the service last stopped with a nonzero exit code. |
| `sparklogs.data.services.stopped_exit_code` | integer |  | The Windows error code the service last stopped with. Absent while the service is not stopped. |
| `sparklogs.data.services.stopped_exit_name` | string |  | The name of the exit code, such as `ERROR_ACCESS_DENIED`. Absent when the code is 0 or has no known name. |
| `sparklogs.data.services.stopped_exit_space` | string |  | The code table the exit code belongs to: always `win32`. Present whenever the exit code is. |
| `sparklogs.data.services.stopped_service_specific_code` | integer |  | The service's own exit code, whose meaning only that service's vendor defines. Present only while the service is stopped with exit code 1066 (`ERROR_SERVICE_SPECIFIC_ERROR`), the one case where Windows says this value means anything. |
| `sparklogs.data.services.stopped_service_specific_space` | string |  | The code table the service's own exit code belongs to: always `service_specific`. Present whenever that code is. |
| `sparklogs.data.services.is_critical_category` | bool |  | Whether the service belongs to an installed backup, endpoint detection or remote-management product SparkLogs recognizes, such as an RMM agent. Context only: it sets no severity, and how much a stopped service matters comes from its tier. Absent when the installed-products list is out of date or has not been read yet. |
| `sparklogs.data.services.service_class` | string |  | What kind of service this is: `backup`, `edr_av`, `database`, `mail`, `directory`, `virtualization`, `profiles`, `rmm`, `platform`, `web_server`, `vpn`, `remote_access`, `printing`, `siem` or `licensing`. Absent for a service SparkLogs does not classify. |
| `sparklogs.data.services.service_class_code` | integer |  | A numeric code for the service's class. |
| `sparklogs.data.services.service_tier` | string |  | How much a stopped or failing service matters on this machine: `ordinary`, `important`, `critical`, `critical_shared` or `suppress` (not judged). A service can rank differently on a server, or on a machine holding the role it supports; a service SparkLogs does not list is `ordinary`. |
| `sparklogs.data.services.service_tier_code` | integer |  | A numeric code for the service's tier: 0 suppress, 1 ordinary, 2 important, 3 critical, 4 critical_shared. |
| `sparklogs.data.services.svc_stopped_age_min` | float | minutes | How long the service has been not running, counting only time the machine was awake and the agent was watching. It pauses while the service is starting, stopping or continuing, and while a delayed-start service waits after boot. Absent while the service runs or after it stopped with exit code 0, and for a service that has only been in a transition or waiting after boot since. |
| `sparklogs.data.services.svc_crash_count_24h` | integer | count | How many times this service stopped unexpectedly in the last 24 hours, from System log events 7031 and 7034. Absent until the agent has first scanned the log after it starts, or while the scan is out of date; 0 when it scanned and found none. Counts `service_crashed` records; the latest is `sparklogs.data.services.svc_crash_last_seen_ts`. |
| `sparklogs.data.services.svc_crash_count_24h_by_id` | object |  | The service's crash count over the last 24 hours, split by the event ID that recorded each crash. |
| `sparklogs.data.services.svc_crash_first_seen_ts` | string | timestamp | When the oldest crash in the last 24 hours was recorded. |
| `sparklogs.data.services.svc_crash_last_seen_ts` | string | timestamp | When the newest crash in the last 24 hours was recorded. |
| `sparklogs.data.services.svc_crash_truncated` | bool |  | Whether the crash scan stopped at its read limit. When true, the crash counts on this machine are lower bounds. |
| `sparklogs.data.services.svc_crash_unresolved_count` | integer | count | Crash events in the last 24 hours on this machine that name no service installed now, so no service row carries them. |
| `sparklogs.data.services.svc_crash_measured_at` | string | timestamp | When the agent last scanned the event log for crashes. |
| `sparklogs.data.services.service_auto_not_running_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.services.service_auto_not_running_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.services.service_flapping_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.services.service_flapping_age_h` | float | hours | How long this condition has been open, in hours. |
| `sparklogs.data.services.service_stuck_pending_age_min` | float | minutes | How long this condition has been open, in minutes. |
