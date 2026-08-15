# When To Use SparkLogs

SparkLogs is read-only ops telemetry over MCP. Two doors:

**Default: chat (`sparklogs-ask`).** The user asked a question about hosts, logs, backups, disk, CPU, patches, Defender, Windows events, or MSP client data, and wants an answer. A count, "is this happening", "what's on this box". Attach `sparklogs-ask`. Do not attach `sparklogs-investigate`.

**Full investigation (`sparklogs-investigate`).** The user asked to investigate, troubleshoot a ticket, produce a system condition summary, or accepted an offer to run a full investigation. Then use `/sparklogs-investigate`.

Use `/sparklogs-analyze-cause` only when the engineer deliberately asks for candidate cause hypotheses after a factual summary exists. Use `/sparklogs-summary` to refresh an existing investigation report and `/sparklogs-explain` to explain the evidence behind a specific finding.

Do not use SparkLogs skills for remediation, configuration changes, ticket closure, or any action that mutates customer systems.
