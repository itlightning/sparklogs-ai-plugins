<!-- GENERATED reference. Do not hand-edit. -->
# Crash dump config fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.crash_dump_config.dump_type` | string |  | What Windows is set to write when it crashes with a stop error: `none`, `mini` (small memory dump), `kernel`, `full` (complete memory dump) or `automatic`. Absent when the setting could not be read or holds another value, which does not mean `none`. |
| `sparklogs.data.crash_dump_config.pagefile_sizing` | string |  | How the page files are sized: `off`, `system_managed`, `fixed`, or `unknown` when some are system managed and others fixed or the setting could not be read. |
| `sparklogs.data.crash_dump_config.pagefile_max_bytes` | integer | bytes | The page files' configured maximum sizes added together: the room Windows has to write a crash dump when no dedicated dump file is set. 0 when the page file is off. Absent when the page file is system managed or its sizing is unknown. |
| `sparklogs.data.crash_dump_config.pagefile_required_bytes` | integer | bytes | The page-file room the configured dump type needs. Absent for no dump or a small memory dump, for a system-managed or unknown page file, when Windows chooses a dedicated dump file, and for a complete dump when the installed RAM could not be read. |
| `sparklogs.data.crash_dump_config.pagefile_shortfall_pct` | float | percent | How far the page file falls short of the room the dump needs, as a percentage of that room. 0 when the page file is big enough or no room is needed; agents before 1.14.5 reported spare room as a negative value. Absent when the dump type or page-file size could not be read. |
| `sparklogs.data.crash_dump_config.minidump_count_7d` | integer | count | Minidump files Windows wrote in the last seven days. |
| `sparklogs.data.crash_dump_config.minidump_count_30d` | integer | count | Minidump files Windows wrote in the last thirty days. |
| `sparklogs.data.crash_dump_config.newest_minidump_age_min` | float | minutes | How long ago Windows wrote the newest minidump file. |
| `sparklogs.data.crash_dump_config.crash_dump_page_file_too_small_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
