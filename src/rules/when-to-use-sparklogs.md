# When To Use SparkLogs

SparkLogs is the query and analysis layer for what happened on a system and what that device is: system and application logs plus health and state snapshots over time, one host or the fleet. Read-only over MCP.

**Default: `sparklogs-ask`.** The user wants to understand an event, a count, a timeline, or device health/state (disk, CPU, patches, Defender, Windows events, installed software, collection). Attach `sparklogs-ask`.

**Full investigation (`sparklogs-investigate`).** The user needs a thorough cited system-condition summary for a ticket or a written investigation report. Then use `/sparklogs-investigate`.

Use `/sparklogs-analyze-cause` when they want candidate cause hypotheses after a factual summary exists. Use `/sparklogs-summary` to refresh an existing report and `/sparklogs-explain` to walk a specific finding back to evidence.

Do not use SparkLogs skills for remediation, configuration changes, ticket closure, or any action that mutates customer systems.
