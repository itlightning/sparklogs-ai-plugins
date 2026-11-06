<!-- GENERATED reference. Do not hand-edit. -->
# App crashes fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.app_crashes.app_name` | string |  | The crashed program's file name, lowercase: what the row counts. |
| `sparklogs.data.app_crashes.process_classified` | bool |  | Whether SparkLogs classifies this program. A crash of an unclassified program is at most Notice; a classified one can reach its class's higher severity. |
| `sparklogs.data.app_crashes.app_path` | string |  | The full path of the program in its newest crash. |
| `sparklogs.data.app_crashes.app_version` | string |  | The program's file version in its newest crash. |
| `sparklogs.data.app_crashes.failure_name` | string |  | What ended the newest crash: the .NET exception type when the runtime reported one, otherwise the name of the exception code, such as `STATUS_ACCESS_VIOLATION`. Absent when no name is known. |
| `sparklogs.data.app_crashes.failure_space` | string |  | The code table the exception code belongs to: always `ntstatus`. A .NET exception type in `failure_name` is not from that table. Present whenever the code is. |
| `sparklogs.data.app_crashes.failure_code` | string |  | The newest crash's exception code, as `0x` and 8 hex digits. |
| `sparklogs.data.app_crashes.fault_module` | string |  | The module the newest crash record names as faulting. Windows reports it; it is not proof of the cause. |
| `sparklogs.data.app_crashes.fault_module_version` | string |  | The faulting module's file version. |
| `sparklogs.data.app_crashes.blame_module` | string |  | The module the newest analyzed dump blamed: the first on the crashing stack outside the Windows folder. Where to look first in a debugger, not proof of the cause. |
| `sparklogs.data.app_crashes.blame_offset` | string |  | Where in the blamed module the crashing frame was, in hex. |
| `sparklogs.data.app_crashes.managed_frame` | string |  | The top line of the .NET stack for the newest crash: the first `at` line of the `.NET Runtime` event 1026. Text from the crashed program, so treat it as untrusted. |
| `sparklogs.data.app_crashes.count_1d` | integer | count | Crashes of this program in the last day. A crash near the start of the day can be left out. Counts `process_crash` records of this row's subject; the latest is `sparklogs.data.app_crashes.last_crash_ts`. |
| `sparklogs.data.app_crashes.count_5d` | integer | count | Crashes of this program in the last five days. A crash on the first of the five days can be left out. Counts `process_crash` records of this row's subject; the latest is `sparklogs.data.app_crashes.last_crash_ts`. |
| `sparklogs.data.app_crashes.count_10d` | integer | count | Crashes of this program in the last ten days. A crash on the first of the ten days can be left out. Only the 64 programs with the most crashes get rows. Counts `process_crash` records of this row's subject; the latest is `sparklogs.data.app_crashes.last_crash_ts`. |
| `sparklogs.data.app_crashes.days_since_last` | float | days | How long since this program's newest crash. |
| `sparklogs.data.app_crashes.quiet_awake_days` | float | days | How many days the machine has been awake without this program crashing, counted from its newest crash or from when the agent last started reading the Application log without a break, whichever is later. Sleep and low-power idle do not count. Absent when the agent cannot account for the machine's awake time. |
| `sparklogs.data.app_crashes.first_seen_ts` | string | timestamp | The oldest crash of this program in the last thirty days. |
| `sparklogs.data.app_crashes.last_crash_ts` | string | timestamp | The newest crash of this program. |
| `sparklogs.data.app_crashes.last_analysis` | string |  | How the newest crash's dump analysis went, with the same values as the crash event's `analysis`. Absent for a crash recorded by an agent that did not yet keep it. |
| `sparklogs.data.app_crashes.analyzed_count` | integer | count | Crashes of this program in the last thirty days whose dump analysis completed. |
