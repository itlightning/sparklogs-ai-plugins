# Install SparkLogs In Cursor

1. Open Cursor's plugin or marketplace flow.
2. Add the SparkLogs AI Plugins GitHub repository `itlightning/sparklogs-ai-plugins` as a marketplace source. Use the default `dist` branch and repository root.
3. Install the `sparklogs` plugin.
4. Set the SparkLogs API token. See **Token** below; a Cursor plugin does not read your shell environment.
5. Ask a question about a SparkLogs-monitored host (chat). Use `/sparklogs-investigate` only when you want a full cited report.

The Cursor package lives at `plugins/cursor/sparklogs/` on `dist` and includes Cursor rules and subagents in addition to skills, commands, and MCP config. Commands are `/sparklogs-ask`, `/sparklogs-investigate`, `/sparklogs-analyze-cause`, `/sparklogs-summary`, and `/sparklogs-explain`; type the command and then the question or scope after it.

## Token

The package's `mcp.json` sends `Authorization: Bearer ${SPARKLOGS_API_TOKEN}`. In a plugin's own `mcp.json`, a bare `${VAR}` resolves only from a plugin variable declared in `.cursor-plugin/plugin.json` under `variables`, which this package declares. It is not read from your shell environment, and no shell export will fill it.

- **Team install.** A team admin sets `SPARKLOGS_API_TOKEN` for the plugin in the Cursor team dashboard. This is the path Cursor documents.
- **Individual install.** Cursor's documentation does not describe a self-serve way to set a plugin variable, so treat this as unconfirmed until verified on a real install. If the plugin's Configure view offers the field, use it.
- **Manual fallback.** Register the server yourself in `~/.cursor/mcp.json` instead. A user MCP config uses a different substitution syntax, `${env:VAR}`, which does read your shell environment:

  ```json
  {
    "mcpServers": {
      "sparklogs": {
        "type": "http",
        "url": "https://mcp.sparklogs.app/mcp",
        "headers": { "Authorization": "Bearer ${env:SPARKLOGS_API_TOKEN}" }
      }
    }
  }
  ```

  Then export `SPARKLOGS_API_TOKEN` in your shell profile and restart Cursor.

Don't paste API tokens into prompts or commit them to a repository.
