<!-- GENERATED reference. Do not hand-edit. -->
# Event fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `t` | string | timestamp | When the thing being reported was observed. For an occurrence this is when the fact happened, not when the agent found it. |
| `message` | string |  | A one-line summary of the event. Read detailed measurements under `sparklogs.data.<topic>`. |
| `severity` | string |  | The event severity. |
| `native_severity` | string |  | Severity before the configured reason ceiling reduced it. Present only when that limit applied. |
| `__autoextract_disable_extract_fields` | bool |  | Disables field extraction from the message. Measurements are already provided as structured data. |
