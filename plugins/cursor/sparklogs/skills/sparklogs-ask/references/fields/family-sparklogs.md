<!-- GENERATED reference. Do not hand-edit. -->
# SparkLogs fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.kind` | string |  | The event category that selects its row contract and downstream handling. Producers define additive values; consumers must not infer a closed vocabulary from this field. |
| `sparklogs.class` | string |  | The event's temporal role, such as a notable condition, recovery, ending, or context. |
| `sparklogs.topic` | string |  | Which state topic the row belongs to, and the namespace its readings sit in under `sparklogs.data`. |
| `sparklogs.reason` | string |  | A globally unique reason code explaining why the event was emitted or how it was classified. |
| `sparklogs.instance` | string |  | The subject ID, prefixed by its type. Absent for conditions about the whole device. |
| `sparklogs.open_monitors_count` | integer | count | Number of open conditions for this topic. On a multipart inventory, carried on the first part. |
| `sparklogs.delta_removed` | string_array |  | On a change or inventory row of a table topic: the `instance` of each subject removed since the topic last reported its changes, exactly as that subject's rows spell it. A change row also lists each removed row in full. On a multipart inventory, on the first part only, for the whole inventory. Absent when nothing was removed, and on topics about the whole device. |
| `sparklogs.delta_count` | integer | count | How many distinct subjects this row reports as added, changed or removed, each counted once. A monitor whose row carries `delta_kind` counts 1. On a multipart inventory, on the first part only, for the whole inventory. Absent when zero. |
| `sparklogs.delta_field_names` | string_array |  | The distinct State field names across the `delta_fields` of this row's changed subjects, sorted. On a multipart inventory, on the first part only, for the whole inventory. Absent when no changed subject moved a field. |
| `sparklogs.window_partial` | bool |  | The measurement window behind these readings was not fully populated, so a rate or a percentile over it rests on fewer samples than usual. Absent when the window was whole. |
| `sparklogs.display_name` | string |  | On a monitor row: the subject's name for a reader, when it differs from `instance`. Absent when `instance` already reads well, and on topics about the whole device. |
| `sparklogs.window_coverage_pct` | float | percent | On a windowed topic's inventory: how much of the window that just closed the agent observed, 0 to 100. Under 100 when the agent started or resumed inside it; readings are what was measured, never scaled up. Absent on every other event. |
| `sparklogs.window_measured_s` | float | seconds | On a `top_processes` inventory: the seconds the collector used as the rate denominator for the window that just closed, counting accepted sampling intervals only. Not the wall-clock share (`window_coverage_pct`). Absent when no interval was accepted. |
| `sparklogs.reported_by` | string |  | On an occurrence both the operating system and the agent report, which of the two this row is: `os` or `agent`. Count one occurrence per reason and instance within a short tolerance across the two. |
| `sparklogs.cadence_s` | integer | seconds | On an inventory or a change row: the inventory interval the topic was scheduled on when its previous inventory went out, the wait `epoch.prev_t` to `epoch.t` is judged against. Absent when there is no previous inventory time. |
| `sparklogs.elapsed_s` | integer | seconds | On an inventory: seconds since the previous inventory, measured on a clock that counts sleep and ignores wall-clock changes. Absent when a restart of the device came between them; then use `t` minus `epoch.prev_t`. |
| `sparklogs.data` | object |  | The readings, under `sparklogs.data.<topic>`. A table topic writes an array of row objects; a host-scoped topic writes one flat object. An inventory and a delta write the same path, so one predicate finds a value whichever way the evidence arrived. |
