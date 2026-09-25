<!-- GENERATED reference. Do not hand-edit. -->
# SparkLogs event fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.kind` | string |  | The event category that selects its row contract and downstream handling. Producers define additive values; consumers must not infer a closed vocabulary from this field. |
| `sparklogs.topic` | string |  | Which state topic the row belongs to, and the namespace its readings sit in under `sparklogs.data`. |
| `sparklogs.reason` | string |  | A globally unique reason code explaining why the event was emitted or how it was classified. |
| `sparklogs.instance` | string |  | The subject ID, prefixed by its type. Absent for conditions about the whole device. |
| `sparklogs.open_monitors_count` | integer | count | Number of open conditions for this topic. On a multipart inventory, carried on the first part. |
| `sparklogs.window_partial` | bool |  | The measurement window behind these readings was not fully populated, so a rate or a percentile over it rests on fewer samples than usual. Absent when the window was whole. |
| `sparklogs.data` | object |  | The readings, under `sparklogs.data.<topic>`. A table topic writes an array of row objects; a host-scoped topic writes one flat object. An inventory and a delta write the same path, so one predicate finds a value whichever way the evidence arrived. |
| `sparklogs.class` | string |  | The event's temporal role, such as a notable condition, recovery, ending, or context. |
