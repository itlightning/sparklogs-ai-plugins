<!-- GENERATED reference. Do not hand-edit. -->
# Config change fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.config_change.type` | string |  | The kind of configuration object that changed. |
| `sparklogs.config_change.target` | string |  | The object's identity within its type, such as a name, path, or id. |
| `sparklogs.config_change.basis` | string |  | How the change is known, recorded when an OS or app log recorded it, observed when the agent saw the end state move between two captures. |
| `sparklogs.config_change.changes` | object_array |  | One entry per moved field, with `field`, and `old` and `new` as the row carries them. A side the row did not carry is absent. |
| `sparklogs.config_change.action` | string |  | The action applied to the configuration object. |
