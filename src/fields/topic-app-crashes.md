<!-- GENERATED reference. Do not hand-edit. -->
# App crashes fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.app_crashes.app_name` | string |  | The crashed executable's file name, lowercase: what the row counts. |
| `sparklogs.data.app_crashes.app_path` | string |  | The newest crash's executable path. |
| `sparklogs.data.app_crashes.app_version` | string |  | The newest crash's executable file version. |
| `sparklogs.data.app_crashes.failure` | string |  | What ended the newest crash, by name. Windows: the .NET exception type when the runtime reported one, otherwise the exception code's NTSTATUS name from the pack's status-code table. Linux: the signal name. macOS: the Mach exception name. Absent when no name is known. |
| `sparklogs.data.app_crashes.failure_code` | string |  | The newest crash's raw code. Windows: the exception code, `0x` and 8 hex digits. Linux: the signal number. macOS: the Mach exception code. |
| `sparklogs.data.app_crashes.fault_module` | string |  | The module the newest crash record reports the fault in. Reported, not a cause. |
| `sparklogs.data.app_crashes.fault_module_version` | string |  | The fault module's file version. |
| `sparklogs.data.app_crashes.blame_module` | string |  | The module the newest analyzed dump blamed: the first on the crashing stack outside the operating system's own directories (Windows: not under the Windows directory; Linux and macOS: outside the system library directories). Where a debugger's first look points; not a proven cause. |
| `sparklogs.data.app_crashes.blame_offset` | string |  | The blamed frame's offset in `blame_module`, as hex. |
| `sparklogs.data.app_crashes.managed_frame` | string |  | The first line of the managed stack the runtime reported for the newest crash: on Windows the first `at` line of the `.NET Runtime` 1026 record; a Java or Python runtime's top frame where one reports it. Untrusted text. |
| `sparklogs.data.app_crashes.count_1d` | integer | count | Crashes of this application in the last day. Counts are kept per hour for the last day and per UTC day beyond it, so a crash in the hour the day began may be left out. |
| `sparklogs.data.app_crashes.count_5d` | integer | count | Crashes of this application in the last five days, counted per hour for the last day and per UTC day beyond it: a crash on the day the window began may be left out. |
| `sparklogs.data.app_crashes.count_10d` | integer | count | Crashes of this application in the last ten days, counted per hour for the last day and per UTC day beyond it, like `count_5d`. Rows are the 64 with the most. |
| `sparklogs.data.app_crashes.days_since_last` | float | days | How long since this application's newest crash. |
| `sparklogs.data.app_crashes.coverage_days` | float | days | How long the log application crashes are recorded in (Windows: Application) has been read without a gap. Absent until it has been read once. |
| `sparklogs.data.app_crashes.first_seen_ts` | string | timestamp | The oldest crash of this application in the thirty-day history. |
| `sparklogs.data.app_crashes.last_crash_ts` | string | timestamp | The newest crash of this application. |
| `sparklogs.data.app_crashes.last_analysis` | string |  | What the newest crash's dump analysis did, as the occurrence's `analysis` says it. Absent for a crash reported before the agent kept it. |
| `sparklogs.data.app_crashes.analyzed_count` | integer | count | Crashes of this application in the history whose dump analysis completed. |
