# SparkLogs (Cursor)

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`. Each skill carries the reference corpus it cites under its own references directory, so a skill resolves its citations without reaching outside its folder.
- `commands/`: `/sparklogs-ask`, `/sparklogs-investigate`, `/sparklogs-analyze-cause`, `/sparklogs-summary`, `/sparklogs-explain`. Type the command, then the question or scope after it.
- `agents/`: subagents for pattern enumeration, clustering, and log summarization.
- `rules/`: a when-to-use rule, offered on relevance rather than always applied.
- `mcp.json`: the SparkLogs MCP server, transport `http`.

## Install

Add itlightning/sparklogs-ai-plugins as a plugin marketplace source (default `dist` branch, repository root), then install the `sparklogs` plugin.

## Token

`mcp.json` sends `Authorization: Bearer ${SPARKLOGS_API_TOKEN}`. In a Cursor plugin, that `${SPARKLOGS_API_TOKEN}` resolves **only** from the plugin variable of the same name, which this package declares in `.cursor-plugin/plugin.json` under `variables`. It is not read from your shell environment.

- **Team install:** an admin sets `SPARKLOGS_API_TOKEN` for the plugin in the Cursor team dashboard. This is the documented path.
- **Individual install:** Cursor's docs do not describe a self-serve way to set a plugin variable, so treat this as unconfirmed. If the plugin's Configure view does not offer the field, use the manual route below.
- **Manual route:** skip the plugin's MCP entry and register the server in your own `~/.cursor/mcp.json`. A user MCP config uses a different substitution syntax, `${env:VAR}`, which does read your shell environment:

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

Get the token from the SparkLogs app at [sparklogs.app](https://sparklogs.app).

Product docs: https://sparklogs.com/docs/it-fleet-intelligence
