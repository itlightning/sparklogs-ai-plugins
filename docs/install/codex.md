# Install SparkLogs In Codex

Codex plugin publishing is still evolving. For MVP, use repo/local marketplace installation from the generated `dist` branch.

1. Add this repository as a plugin marketplace source from the default `dist` branch.
2. Codex reads `.agents/plugins/marketplace.json` at the repository root.
3. Install the `sparklogs` plugin, whose source path is `./plugins/codex/sparklogs`.
4. Configure the SparkLogs MCP token with Codex's supported secret/config mechanism (if using an env var, we recommend naming it `SPARKLOGS_API_TOKEN`).

If official self-serve Codex Plugin Directory publishing becomes generally available, this guide will be updated.
