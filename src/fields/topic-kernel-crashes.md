<!-- GENERATED reference. Do not hand-edit. -->
# Kernel crashes fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.kernel_crashes.signature` | string |  | What the row counts, lowercase: `failure_code`, then `\|` and `blame_module` when an analyzed dump blamed one. A crash whose dump was not analyzed counts under the code alone. |
| `sparklogs.data.kernel_crashes.failure` | string |  | The crash's name. Windows: the bugcheck name, from the pack's bugcheck table. Linux: the kernel panic string. macOS: the panic string. Absent when no name is known. |
| `sparklogs.data.kernel_crashes.failure_code` | string |  | The raw stop code. Windows: the bugcheck code, `0x` and 8 hex digits. Linux and macOS: a kernel panic carries no numeric code. |
| `sparklogs.data.kernel_crashes.failure_params` | string_array |  | The newest crash's four bugcheck parameters, as hex. Windows only: no other system records stop parameters. |
| `sparklogs.data.kernel_crashes.blame_module` | string |  | The module the newest analyzed dump blamed: the first on the crashing stack that is not the operating system's own (Windows: outside the agent's list of in-box kernel modules, so a vendor driver is blamed; Linux and macOS: outside the kernel's own image and module tree). Part of the signature. |
| `sparklogs.data.kernel_crashes.blame_offset` | string |  | The blamed frame's offset in `blame_module` in the newest analyzed dump, as hex. |
| `sparklogs.data.kernel_crashes.count_1d` | integer | count | Crashes of this signature in the last day, counted from the crash history: distinct crashes, not dump files. |
| `sparklogs.data.kernel_crashes.count_5d` | integer | count | Crashes of this signature in the last five days. |
| `sparklogs.data.kernel_crashes.count_10d` | integer | count | Crashes of this signature in the last ten days. Rows are the 64 with the most. |
| `sparklogs.data.kernel_crashes.days_since_last` | float | days | How long since this signature's newest crash. |
| `sparklogs.data.kernel_crashes.coverage_days` | float | days | How long the log kernel crashes are recorded in (Windows: System) has been read without a gap. Absent until it has been read once. |
| `sparklogs.data.kernel_crashes.first_seen_ts` | string | timestamp | The oldest crash of this signature in the thirty-day history. |
| `sparklogs.data.kernel_crashes.last_crash_ts` | string | timestamp | The newest crash of this signature. |
| `sparklogs.data.kernel_crashes.last_analysis` | string |  | What the newest crash's dump analysis did, as the occurrence's `analysis` says it. Absent for a crash reported before the agent kept it. |
| `sparklogs.data.kernel_crashes.analyzed_count` | integer | count | Crashes of this signature in the history whose dump analysis completed. |
| `sparklogs.data.kernel_crashes.architecture` | string |  | The newest analyzed dump's architecture: `x64`, `x86`, `arm64` or `other`. |
| `sparklogs.data.kernel_crashes.os_build` | integer |  | The operating system build the newest analyzed dump was written on. |
| `sparklogs.data.kernel_crashes.dump_format` | string |  | The newest analyzed dump's format: `kernel_triage`, `kernel_full` or `kernel_bitmap`. |
