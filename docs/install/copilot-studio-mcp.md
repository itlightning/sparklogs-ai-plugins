# Copilot Studio MCP Setup

SparkLogs does not ship a Copilot Studio prompt-skill package in the MVP. Use the SparkLogs remote MCP endpoint as the integration point.

High-level setup:

1. Create or open the relevant Copilot Studio agent.
2. Add SparkLogs as a remote MCP server: https://mcp.sparklogs.app/mcp
3. Configure the workspace-scoped SparkLogs API token using Copilot Studio's supported secret mechanism. (if using an env var, we recommend naming it `SPARKLOGS_API_TOKEN`)
4. Add instructions that preserve the SparkLogs trust posture: cite evidence, label speculation, and keep humans accountable for actions.
