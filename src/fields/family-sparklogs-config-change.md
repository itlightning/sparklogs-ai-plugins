<!-- GENERATED reference. Do not hand-edit. -->
# Config change fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.config_change.type` | string |  | The kind of configuration object that changed. |
| `sparklogs.config_change.target` | string |  | The object's identity within its type, such as a name, path, or id. |
| `sparklogs.config_change.action` | string |  | The action applied to the configuration object. |
| `sparklogs.config_change.basis` | string |  | How the change is known, recorded when an OS or app log recorded it, observed when the agent saw the end state move between two captures. |
| `sparklogs.config_change.category` | string |  | Positive upkeep classification, maintenance when established, omitted otherwise. |
| `sparklogs.config_change.changes` | object_array |  | One entry per moved field, with `field`, and `old` and `new` as the row carries them. A side the row did not carry is absent. |
| `sparklogs.config_change.renamed_from` | string |  | On an update of a subject that changed identity (a driver package renumbered by its update), the instance of the subject it replaced. Absent otherwise. |
| `sparklogs.config_change.recorded_evidence` | object_array |  | Exact selectors for independently recorded events associated with an observed service installation. Each entry has original UTC RFC3339 `t`, `match_fields` (`subsource`, `origin`, `event_id`, positive signed `record_id`) and `association: inferred_same_change`. A referenced original may be unavailable in stored events. |
| `sparklogs.config_change.recorded_evidence_truncated` | bool |  | True when valid recorded-event selectors exceeded the four-object or 16 KiB attachment limit. Absent otherwise. |
