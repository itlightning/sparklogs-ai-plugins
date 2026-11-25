<!-- GENERATED reference. Do not hand-edit. -->
# Event fields

**Use when:** filtering, sorting or grouping any event by its time, severity, service, source or feed, or finding the original value a feed replaced.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `t` | string | timestamp | When the thing being reported was observed. For an occurrence this is when the fact happened, not when the agent found it. Stored as the event time, the time queries filter and sort on. |
| `message` | string |  | A one-line summary of the event. Read detailed measurements under `sparklogs.data.<topic>`. |
| `severity` | string |  | The event severity. |
| `service` | string |  | The ticket class the row routes to: its reason's service when it has a reason, otherwise its topic's. |

## Stream and system fields

Every event the Agent sends carries these, except where a row says when a field is present.

| Field | Type | Unit | Present | Meaning |
|---|---|---|---|---|
| `source` | string |  | Always | The device name, from the host name the Agent reads on the device. |
| `subsource` | string |  | Always | The data feed that handled the event, the same value as `sparklogs.feed.id`. On data no feed covers, the same value as `origin`. |
| `origin` | string |  | Always | Where the Agent read the event: the Windows event log channel exactly as Windows names it, the file path in lowercase with forward slashes and user and system folders replaced by placeholders such as `<userhome>`, or `sparklogs/agent/log`, `sparklogs/agent/events` or `sparklogs/agent/vector` for the Agent's own streams. |
| `filename` | string |  | Sometimes | The file path as it is on the device, on events read from a file. Absent on every other event. |
| `agent_version` | string |  | Always | Version of the Agent that collected the event. |
| `pack_version` | string |  | Always | Version of the Data Feed Pack rules that shaped the event. |
| `observed_timestamp` | string | timestamp | Sometimes | When the Agent read the event. Absent when it was the only time the event had, which then becomes the event time. |
| `severity_original` | string |  | Sometimes | The severity the source reported, exactly as it reported it. Present only when the event's severity differs from it. |
| `*_original` | any |  | Sometimes | A value the sender put in a field SparkLogs sets, kept under the field name plus `_original` when SparkLogs replaced or withheld it: `source_original`, `subsource_original`, `origin_original`, `origin_type_original`, `filename_original`, `service_original`, `service_detail_original` and `app_original`. |
| `service_detail` | string |  | Sometimes | A narrower ticket class within `service`, when the event's reason sets one. |
| `app` | string |  | Sometimes | The product the event is about, set by the data feed that handled it. Absent on data no feed covers. |
| `command_line` | string |  | Sometimes | The full command line of the process the event is about, when the event records one. Credentials in it are redacted. |
