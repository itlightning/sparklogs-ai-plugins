# Install SparkLogs In Cursor

1. Open Cursor's plugin or marketplace flow.
2. Add the SparkLogs AI Plugins GitHub repository `itlightning/sparklogs-ai-plugins` as a marketplace source. Use the default `dist` branch and repository root.
3. Install the `sparklogs` plugin.
4. Configure the SparkLogs MCP token through Cursor's supported MCP/secret configuration. (if using an env var, we recommend naming it `SPARKLOGS_API_TOKEN`)
5. Ask a question about a SparkLogs-monitored host (chat). Use `/sparklogs-investigate` only when you want a full cited report.

The Cursor package lives at `plugins/cursor/sparklogs/` on `dist` and includes Cursor rules in addition to skills, commands, agents, and MCP config.
