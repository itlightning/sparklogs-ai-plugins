# Kind: collector debug

SparkLogs collection internals: group **`pattern` / `severity` / `message`**.
Scope `sparklogs.agent.vector` or `sparklogs.agent.log`.
Use after device health and product feeds, not as the ticket headline.

These feeds explain the collector, not the customer's disk, CPU, or Windows fault.
`app` is `sparklogs_agent` (`guides/app-vocabulary.md`).

## Explore

Only when you are diagnosing a problem with the SparkLogs collector (agent) itself.
Group `pattern` / `severity` / `message`.

## Accuracy

Empty collector debug is not "the box is healthy".
Collection honesty lives on feed reports and `agent_complete_through` (`guides/device-state-fields.md`).
