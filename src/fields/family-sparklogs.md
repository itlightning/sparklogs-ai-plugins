<!-- GENERATED reference. Do not hand-edit. -->
# SparkLogs event fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.kind` | string |  | What shape of row this is: `inventory` for a full table, `delta` for what changed, `monitor` for one condition on one subject, `occurrence` for a dated fact that cannot reverse. |
| `sparklogs.topic` | string |  | Which state topic the row belongs to, and the namespace its readings sit in under `sparklogs.data`. |
| `sparklogs.reason` | string |  | Which condition this monitor row is about. A closed, additive vocabulary, and globally unique: the name alone says what happened, with no topic needed to disambiguate it. |
| `sparklogs.instance` | string |  | The opaque id of the subject this row is about, led by its subject type. Omitted entirely for a condition about the whole host, never filled with a sentinel. |
| `sparklogs.open_monitors_count` | integer | count | How many conditions this topic currently holds open, stamped on the full table so a reader who has only the inventory knows whether to expect monitor rows. |
| `sparklogs.window_partial` | bool |  | The measurement window behind these readings was not fully populated, so a rate or a percentile over it rests on fewer samples than usual. Absent when the window was whole. |
| `sparklogs.data` | object |  | The readings, under `sparklogs.data.<topic>`. A table topic writes an array of row objects; a host-scoped topic writes one flat object. An inventory and a delta write the same path, so one predicate finds a value whichever way the evidence arrived. |
| `sparklogs.class` | string |  | The event's temporal role, such as a notable condition, recovery, ending, or context. |
