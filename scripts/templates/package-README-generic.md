# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP, packaged to Agent Plugins v1.

## What is in this package

- `plugin.json`: the Agent Plugins manifest.
- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`, in the Agent Skills layout. Each skill carries the reference corpus it cites under its own references directory, so a skill directory is self-contained.
- `mcp.json`: the SparkLogs MCP server, transport `streamable-http`. Hosts find it at the plugin root by convention.

Commands, rules, and subagents are host-specific formats that Agent Plugins v1 does not define, so they are not in this package. They ship in the Claude and Cursor packages.

## Install

Point your host at `plugins/generic/sparklogs/` on the `dist` branch of {{repo_url}}, or copy that directory into the layout your host expects.

## Token

`mcp.json` ships this header:

```json
"headers": { "Authorization": "Bearer {{token_ref}}" }
```

Agent Plugins v1 does **not** expand placeholders in remote URLs or HTTP headers. `{{token_ref}}` is therefore literal text, not a variable reference. Edit `mcp.json` and replace the whole value of the `Authorization` key under `mcpServers.sparklogs.headers` with `Bearer` followed by your token.

If your host has its own secret substitution for MCP configs, use that instead and follow its syntax.

Treat the edited `mcp.json` as a secret: it holds a live token in plain text.

Get the token from the SparkLogs app at [sparklogs.app](https://sparklogs.app).

Product docs: {{docs_url}}
