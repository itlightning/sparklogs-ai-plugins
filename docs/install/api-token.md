# API token auth (optional)

Default MCP auth is SparkLogs OAuth (browser sign-in). Every shipped plugin `mcp.json` / `.mcp.json` is the server URL and transport only. No `Authorization` header, no `bearer_token_env_var`.

Use a personal or workspace API token only when you have a reason OAuth cannot cover (headless CI, a host with no browser flow). Setting a bearer header or `bearer_token_env_var` typically **disables** OAuth on that server entry. Mint the token in the SparkLogs app at [sparklogs.app](https://sparklogs.app). Never paste it into a prompt or commit it.

Do not edit the plugin's bundled MCP file. Overlay the server in the host's user config instead.

## Cursor

`~/.cursor/mcp.json` (this can outrank or replace the plugin entry):

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

Export `SPARKLOGS_API_TOKEN` in your shell profile and restart Cursor.

## Claude

Claude skips OAuth when `headers.Authorization` is set. Add the header only on a user MCP config you control, with a real token value or a substitution your Claude build actually expands. Unsubstituted `${SPARKLOGS_API_TOKEN}` is not a working token path in Claude.

## Codex

The plugin must stay URL-only. For a standalone server in `~/.codex/config.toml` (do not combine with the plugin; `config.toml` wins):

```toml
[mcp_servers.sparklogs]
url = "https://mcp.sparklogs.app/mcp"
bearer_token_env_var = "SPARKLOGS_API_TOKEN"
```

## Other hosts

Add a bearer header using that host's secret substitution.
