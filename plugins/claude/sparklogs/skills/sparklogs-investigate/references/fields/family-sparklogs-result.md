<!-- GENERATED reference. Do not hand-edit. -->
# Result fields

**Use when:** an event carries an error or status code and the question is its published name or whether it means failure.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.result.code` | string |  | The normalized result code as logged. |
| `sparklogs.result.code_space` | string |  | The code system used to interpret the result. |
| `sparklogs.result.code_name` | string |  | The published constant name for a recognized code. |
| `sparklogs.result.failed` | bool |  | True when the code represents failure in its code system; omitted otherwise. |
