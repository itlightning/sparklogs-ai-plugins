<!-- GENERATED reference. Do not hand-edit. -->
# VSS writers fields

Full inventory every 6 hours; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.vss_writers.writer` | string |  | The VSS writer's name, lowercased so it joins with the string a failure message names it by. |
| `sparklogs.data.vss_writers.display_name` | string |  | The writer name as `vssadmin` prints it, case preserved, for display. |
| `sparklogs.data.vss_writers.writer_state` | string |  | The writer's state as `vssadmin` reports it. |
| `sparklogs.data.vss_writers.writer_present` | bool |  | Always `true`: this row exists only for a writer `vssadmin` actually listed. |
| `sparklogs.data.vss_writers.writer_state_failed` | bool |  | Whether `writer_state` starts with `failed`: the one bit a rung compares, beside the string itself. |
| `sparklogs.data.vss_writers.writer_class_code` | integer |  | Which class this writer belongs to, reduced to the number the rungs ask about: an ignored writer, a notice-only one, or one whose failure is an error. |
| `sparklogs.data.vss_writers.writer_last_error` | string |  | What the writer itself reported as its last error, so a failure names its cause instead of only its state. |
| `sparklogs.data.vss_writers.writer_expected` | bool |  | Whether the enrichment store expects this writer to be present on this host (for example, a SQL Server host expecting `sqlserverwriter`). Absent when that inventory has not run. |
| `sparklogs.data.vss_writers.vss_writer_failed_age_basis` | string |  | Whether the age beside it was measured from a witnessed onset (`onset`), from when the condition was first seen already true (`observed`), or is a posture with no meaningful onset (`unknown_ongoing`). An age without this is a duration a reader cannot weigh. |
| `sparklogs.data.vss_writers.vss_writer_failed_age_h` | float | hours | How long this condition has been open, in hours. |
