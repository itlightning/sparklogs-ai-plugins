<!-- GENERATED reference. Do not hand-edit. -->
# VSS writers fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.vss_writers.writer` | string |  | The VSS writer's name, lowercased so it joins with the string a failure message names it by. |
| `sparklogs.data.vss_writers.display_name` | string |  | The writer name as `vssadmin` prints it, case preserved, for display. |
| `sparklogs.data.vss_writers.writer_state` | string |  | The writer's state as `vssadmin` reports it. |
| `sparklogs.data.vss_writers.writer_present` | bool |  | Always `true`: this row exists only for a writer `vssadmin` actually listed. |
| `sparklogs.data.vss_writers.writer_state_failed` | bool |  | Whether `writer_state` starts with `failed`. |
| `sparklogs.data.vss_writers.writer_class_code` | integer |  | Numeric writer classification: ignored, notice-only, or error on failure. |
| `sparklogs.data.vss_writers.writer_last_error` | string |  | What the writer itself reported as its last error, so a failure names its cause instead of only its state. |
| `sparklogs.data.vss_writers.writer_expected` | bool |  | Whether the enrichment store expects this writer to be present on this host (for example, a SQL Server host expecting `sqlserverwriter`). Absent when that inventory has not run. |
| `sparklogs.data.vss_writers.vss_writer_failed_age_basis` | string |  | `onset`: witnessed start. `observed`: already present when first seen, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.vss_writers.vss_writer_failed_age_h` | float | hours | How long this condition has been open, in hours. |
