<!-- GENERATED reference. Do not hand-edit. -->
# Kernel crashes fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.kernel_crashes.signature` | string |  | What the row counts, lowercase: the stop code, plus `\|` and the blamed driver when a dump analysis named one. A crash whose dump the agent could not read counts under the stop code alone. |
| `sparklogs.data.kernel_crashes.failure_name` | string |  | The stop error's name, such as `IRQL_NOT_LESS_OR_EQUAL`. Absent when the code has no known name. |
| `sparklogs.data.kernel_crashes.failure_space` | string |  | The code table the stop code belongs to: always `bugcheck`. |
| `sparklogs.data.kernel_crashes.failure_code` | string |  | The stop code, as `0x` and 8 hex digits. |
| `sparklogs.data.kernel_crashes.failure_params` | string_array |  | The newest crash's four stop error parameters, in hex. |
| `sparklogs.data.kernel_crashes.blame_module` | string |  | The driver the newest dump analysis blamed: the first module on the crashing stack that is not part of Windows itself, so a vendor driver is blamed. Part of the signature. |
| `sparklogs.data.kernel_crashes.blame_offset` | string |  | Where in the blamed driver the crashing frame was, in hex, from the newest dump that blamed it. |
| `sparklogs.data.kernel_crashes.count_1d` | integer | count | Crashes with this signature in the last day. Counts crashes, not dump files. |
| `sparklogs.data.kernel_crashes.count_5d` | integer | count | Crashes with this signature in the last five days. |
| `sparklogs.data.kernel_crashes.count_10d` | integer | count | Crashes with this signature in the last ten days. Only the 64 signatures with the most crashes get rows. |
| `sparklogs.data.kernel_crashes.days_since_last` | float | days | How long since this signature's newest crash. |
| `sparklogs.data.kernel_crashes.quiet_awake_days` | float | days | How many days the machine has been awake without this crash, counted from its newest crash or from when the agent last started reading the System log without a break, whichever is later. Sleep and low-power idle do not count. Absent when the agent cannot account for the machine's awake time. |
| `sparklogs.data.kernel_crashes.first_seen_ts` | string | timestamp | The oldest crash with this signature in the last thirty days. |
| `sparklogs.data.kernel_crashes.last_crash_ts` | string | timestamp | The newest crash with this signature. |
| `sparklogs.data.kernel_crashes.last_analysis` | string |  | How the newest crash's dump analysis went, with the same values as the crash event's `analysis`. Absent for a crash recorded by an agent that did not yet keep it. |
| `sparklogs.data.kernel_crashes.analyzed_count` | integer | count | Crashes with this signature in the last thirty days whose dump analysis completed. |
| `sparklogs.data.kernel_crashes.architecture` | string |  | The processor architecture of the newest analyzed dump: `x64`, `x86`, `arm64` or `other`. |
| `sparklogs.data.kernel_crashes.os_build` | integer |  | The Windows build the newest analyzed dump was written on. |
| `sparklogs.data.kernel_crashes.dump_format` | string |  | The newest analyzed dump's file format: `kernel_triage`, `kernel_full` or `kernel_bitmap`. |
