<!-- GENERATED reference. Do not hand-edit. -->
# Crash dump configuration fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.crash_dump_config.dump_type` | string |  | What this host is configured to write on a bugcheck: `none`, `mini`, `kernel`, `full` or `automatic`. Absent when the setting could not be read, which is not the same answer as `none`. |
| `sparklogs.data.crash_dump_config.pagefile_sizing` | string |  | How the page file is sized: `off`, `system_managed`, `fixed`, or `unknown`. One system-managed line among fixed lines makes the whole set `unknown`. |
| `sparklogs.data.crash_dump_config.pagefile_max_bytes` | integer | bytes | The page file's configured maximum size, which is the room a dump has to be written into when no dedicated dump file is set. Present for `off` (zero) and `fixed`; absent for `system_managed` and `unknown`. |
| `sparklogs.data.crash_dump_config.pagefile_required_bytes` | integer | bytes | The dump-backing room the configured dump type needs. Absent for `none`, `mini`, `system_managed`, `unknown`, a Windows-chosen dedicated dump file, or a complete dump when physical RAM could not be read. |
| `sparklogs.data.crash_dump_config.pagefile_shortfall_pct` | float | percent | Page-file shortfall as a percentage of the required size. Zero when no backing space is required. Absent when the dump type or size limit could not be read. |
| `sparklogs.data.crash_dump_config.minidump_count_7d` | integer | count | Minidump files written in the last seven days. |
| `sparklogs.data.crash_dump_config.minidump_count_30d` | integer | count | Minidump files written in the last thirty days. |
| `sparklogs.data.crash_dump_config.bsod_count_1d` | integer | count | Bugchecks in the last day, counted from the dumps on disk. |
| `sparklogs.data.crash_dump_config.bsod_count_5d` | integer | count | Bugchecks in the last five days. |
| `sparklogs.data.crash_dump_config.bsod_count_10d` | integer | count | Bugchecks in the last ten days. |
| `sparklogs.data.crash_dump_config.bsod_days_since_last` | float | days | How long since the most recent bugcheck. Absent when no dump has ever been seen, because never crashed and crashed long ago are different facts and only the second can close an episode. |
| `sparklogs.data.crash_dump_config.newest_minidump_age_min` | float | minutes | How long since the newest minidump file was written. |
| `sparklogs.data.crash_dump_config.dump_path` | string |  | Where the dump was written. Occurrence only. |
| `sparklogs.data.crash_dump_config.dump_name` | string |  | The dump file's name. Occurrence only. |
| `sparklogs.data.crash_dump_config.dump_size_bytes` | integer | bytes | How large the dump file is. Occurrence only. |
| `sparklogs.data.crash_dump_config.dump_written_ts` | string | timestamp | When the dump was written, which is when the host bugchecked rather than when the agent found it. Occurrence only. |
| `sparklogs.data.crash_dump_config.os_dump_pagefile_too_small_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
