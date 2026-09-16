<!-- GENERATED reference. Do not hand-edit. -->
# Event fields

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `t` | string | timestamp | When the thing being reported was observed. For an occurrence this is when the fact happened, not when the agent found it. |
| `message` | string |  | A one-line human summary of this event's row data. Not a hash and not the payload: the structured readings ride `sparklogs.data.<topic>`. |
| `severity` | string |  | The grade this event ships at. |
| `native_severity` | string |  | The grade the agent arrived at before its reason's ceiling reduced it. Present only when a ceiling actually clamped the event, which is rare; its presence is what says a clamp happened. |
| `__autoextract_disable_extract_fields` | bool |  | Tells the pipeline not to mine custom fields out of the message text. The readings are already structured, so extraction could only invent duplicates of them. |
