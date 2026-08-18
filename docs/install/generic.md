# Install SparkLogs (Generic Package)

Use this path when your agent host follows the **Agent Plugins v1** standard, or loads **Agent Skills** from a directory tree, and does not use the Claude, Cursor, or Codex marketplace installers.

## What you get

On the repository **`dist`** branch, the neutral package lives at:

`plugins/generic/sparklogs/`

It includes:

- `plugin.json`: the Agent Plugins v1 manifest (`$schema` plus plugin identity).
- `skills/`: Agent Skills (`SKILL.md` files). Each skill carries the reference corpus it cites under its own references directory, so a skill folder is self-contained.
- `assets/`: brand assets.
- `mcp.json`: the SparkLogs MCP server, transport `streamable-http`. Hosts find it at the plugin root by convention.

Commands, rules, and subagents are host-specific formats that Agent Plugins v1 does not define, so they are not in this package. They ship in the Claude and Cursor packages.

There is no separate marketplace manifest for generic; clone or browse **`dist`** and point your tooling at that folder (or copy it into your host's expected layout).

## Steps

1. Open the **`dist`** branch of `itlightning/sparklogs-ai-plugins` (default branch on GitHub).
2. Use `plugins/generic/sparklogs/` as the plugin root, or copy that directory where your host expects skills.
3. Supply the SparkLogs API token, per **Token** below.
4. Ask a question about a monitored host, or name a workflow: "use sparklogs-investigate on SRV-FILE01".

## Token

`mcp.json` ships this header:

```json
"headers": { "Authorization": "Bearer ${SPARKLOGS_API_TOKEN}" }
```

Agent Plugins v1 does **not** expand placeholders in remote URLs or HTTP headers, so `${SPARKLOGS_API_TOKEN}` is literal text, not a variable reference. Edit `mcp.json` and replace the whole value of the `Authorization` key under `mcpServers.sparklogs.headers` with `Bearer` followed by your token.

If your host has its own secret substitution for MCP configs, use that instead and follow its syntax.

The edited `mcp.json` holds a live token in plain text. Treat it as a secret: do not commit it.

Exact wiring (paths, reload behavior, secret stores) depends on the agent product; treat this package as the portable **content** bundle plus MCP metadata.
