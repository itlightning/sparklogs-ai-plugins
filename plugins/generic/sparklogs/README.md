# SparkLogs (generic Agent Plugins hosts)

Investigation skills for SparkLogs MCP, packaged to Agent Plugins v1.

## What is in this package

- `plugin.json`: the Agent Plugins manifest.
- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`, in the Agent Skills layout. Each skill carries the reference corpus it cites under its own references directory, so a skill directory is self-contained.
- `mcp.json`: the SparkLogs MCP server, transport `streamable-http`. Hosts find it at the plugin root by convention. URL and transport only; sign in with SparkLogs (OAuth) when the host prompts.

Commands, rules, and subagents are host-specific formats that Agent Plugins v1 does not define, so they are not in this package. They ship in the Claude and Cursor packages.

## Install

Point your host at `plugins/generic/sparklogs/` on the `dist` branch of https://github.com/itlightning/sparklogs-ai-plugins, or copy that directory into the layout your host expects.

Product docs: https://sparklogs.com/docs/it-fleet-intelligence
