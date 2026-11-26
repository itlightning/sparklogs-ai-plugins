<!-- GENERATED reference. Do not hand-edit. -->
# Feed fields

**Use when:** finding which data feed collected an event, or telling feed data apart from data no feed covers.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.feed.id` | string |  | The data feed's ID, the same value as `subsource`. Present on every event a data feed handled and absent on data no feed covers, where `subsource` equals `origin`. |
