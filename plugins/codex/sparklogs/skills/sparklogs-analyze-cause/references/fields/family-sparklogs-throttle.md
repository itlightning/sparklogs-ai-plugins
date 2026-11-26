<!-- GENERATED reference. Do not hand-edit. -->
# Rate limit fields

**Use when:** a repeating event shows up less often than it happens, or the question is how many of its kind were left out.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.throttle.key` | string |  | The group the limit counts events in. |
| `sparklogs.throttle.window_s` | integer | seconds | The length of the limit's window in seconds. |
| `sparklogs.throttle.suppressed_prev` | integer |  | How many events of the same group the limit left out in the previous window. Absent means none. |
