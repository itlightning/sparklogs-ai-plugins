<!-- GENERATED reference. Do not hand-edit. -->
# VSS writers fields

Full inventory every 6 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.vss_writers.writer` | string |  | The VSS writer's name, lowercased, such as `sqlserverwriter`. |
| `sparklogs.data.vss_writers.display_name` | string |  | The writer's name as `vssadmin list writers` prints it, lowercased. |
| `sparklogs.data.vss_writers.writer_state` | string |  | The writer's state as `vssadmin list writers` reports it, such as `stable` or `failed`. |
| `sparklogs.data.vss_writers.writer_present` | bool |  | Whether `vssadmin list writers` lists the writer. False on a writer that left the list, for example because its service stopped, while a failure is still open on it; the other readings are then absent. |
| `sparklogs.data.vss_writers.writer_state_failed` | bool |  | Whether the writer is in a failed state. Absent when the listing printed no readable state for the writer. |
| `sparklogs.data.vss_writers.writer_class_code` | integer |  | What kind of writer this is: 1 a writer whose failure loses nothing a restore needs (ignored), 2 a Windows system writer, 3 a writer SparkLogs does not classify, 4 an application writer (SQL Server, Exchange, Hyper-V, Active Directory, DHCP, certificate authority, cluster shared volumes, DFS Replication). |
| `sparklogs.data.vss_writers.writer_last_error` | string |  | The last error the writer reported, which names the cause of a failure. |
| `sparklogs.data.vss_writers.writer_expected` | bool |  | Whether a backup relies on this writer: true for the System, Registry, WMI, COM+ REGDB, SQL Server, Exchange and NTDS writers when the machine has a backup product SparkLogs recognizes installed, false otherwise. Context only: it sets no severity. Absent when the installed-products list is out of date or has not been read yet. |
| `sparklogs.data.vss_writers.vss_writer_failed_age_basis` | string |  | `onset`: start watched live. `observed`: already present when first noticed, making age a lower bound. `unknown_ongoing`: no meaningful onset time. |
| `sparklogs.data.vss_writers.vss_writer_failed_age_h` | float | hours | How long this condition has been open, in hours. |
