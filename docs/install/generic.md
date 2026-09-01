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
3. Connect the MCP server. Sign in with SparkLogs (OAuth) when the host prompts.
4. Ask a question about a monitored host, or name a workflow: "use sparklogs-investigate on SRV-FILE01".

`mcp.json` is the server URL and transport only. Token overlay: [API token auth](api-token.md).

Exact wiring (paths, reload behavior) depends on the agent product; treat this package as the portable **content** bundle plus MCP metadata.
