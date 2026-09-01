# Kind: collector debug

SparkLogs collection internals: group **`pattern` (LQL) / `severity` (LQL) / `message` (LQL)**.
Scope `sparklogs.agent.vector` or `sparklogs.agent.log`.
Use after device health and product feeds, not as the ticket headline.

These feeds explain the collector, not the customer's disk, CPU, or Windows fault.
`app` (LQL) is `sparklogs_agent` (`${CLAUDE_PLUGIN_ROOT}/guides/app-vocabulary.md`).

## Explore

Only when you are diagnosing a problem with the SparkLogs collector (agent) itself.
Group `pattern` (LQL) / `severity` (LQL) / `message` (LQL).

## Accuracy

Empty collector debug is not "the box is healthy".
Collection honesty lives on feed reports and `agent_complete_through` (col) (`${CLAUDE_PLUGIN_ROOT}/guides/device-state-fields.md`).
