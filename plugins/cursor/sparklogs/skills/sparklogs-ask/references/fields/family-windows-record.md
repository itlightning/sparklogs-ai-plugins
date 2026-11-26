<!-- GENERATED reference. Do not hand-edit. -->
# Windows event record fields

**Use when:** a question needs a Windows event log record's own fields, such as the event ID, provider, record number, level or the raw event data.

Each Windows event log event keeps the record Windows wrote, under these names. The channel is in `origin`.

| Field | Type | Unit | Present | Meaning |
|---|---|---|---|---|
| `event_id` | integer |  | Always | The Windows event ID. |
| `provider_name` | string |  | Always | The provider that wrote the event, as Event Viewer shows it under Source. |
| `provider_guid` | string |  | Sometimes | The provider's GUID, when the event names one. |
| `record_id` | integer |  | Always | The event's record number in its channel on this device. |
| `computer` | string |  | Always | The computer name the event records. |
| `level` | string |  | Sometimes | The level name as Windows shows it, such as Error or Information. On an event no data feed covers that carries no severity of its own, it becomes the event's severity and is not kept as a field. |
| `level_value` | integer |  | Always | The level number, such as 2 for Error or 4 for Information. |
| `message_source` | string |  | Always | How the message text was produced: `publisher` when the provider's message template rendered it, `inserts` when the template was unavailable and the text joins the event's values, `none` when neither was available. |
| `user_id` | string |  | Sometimes | The security identifier (SID) of the account the event records, when it records one. |
| `user_name` | string |  | Sometimes | The account name for `user_id`, when the device could resolve it. |
| `process_id` | integer |  | Always | The ID of the process that wrote the event. |
| `thread_id` | integer |  | Always | The ID of the thread that wrote the event. |
| `task` | integer |  | Sometimes | The task category number, when it is not zero. |
| `task_name` | string |  | Sometimes | The task category name as Event Viewer shows it, when the provider names it. |
| `opcode` | integer |  | Sometimes | The opcode number, when it is not zero. |
| `opcode_name` | string |  | Sometimes | The opcode name, when the provider names it. |
| `keywords` | string |  | Sometimes | The keyword mask in hexadecimal (`0x` and 16 digits), when it is not zero. |
| `keyword_names` | string_array |  | Sometimes | The keyword names the mask stands for, such as Audit Success, when the provider names them. |
| `activity_id` | string |  | Sometimes | The activity GUID that groups related events, when the event carries one. |
| `related_activity_id` | string |  | Sometimes | The GUID of the activity that started this one, when the event carries one. |
| `version` | integer |  | Sometimes | The version of the event's definition, when the event carries one. |
| `qualifiers` | integer |  | Sometimes | The qualifiers number older providers record beside the event ID, when present. |
| `string_inserts` | string_array |  | Sometimes | The event's values in order, when it carries unnamed values. |
| `event_data.*` | any |  | Sometimes | The event's named values, each under the name the provider gives it, such as `event_data.SubjectUserName`. Names are case-sensitive. A data feed may leave them off routine events whose message already carries the same values. |
| `user_data.*` | any |  | Sometimes | The values of an event that records them as user data rather than event data, each under the name the provider gives it. |
