# Install SparkLogs (Generic Package)

Use this path when your agent host loads **Agent Skills** (and related assets) from a directory tree but does **not** use the Claude, Cursor, or Codex marketplace installers.

## What you get

On the repository **`dist`** branch, the neutral package lives at:

`plugins/generic/sparklogs/`

It includes:

- `skills/`: Agent Skills (`SKILL.md` files)
- `commands/`: slash-command definitions
- `agents/`: subagent definitions
- `rules/`: guidance rules (same rule set as the Cursor package)
- `assets/`: brand assets
- `mcp.json`: SparkLogs MCP server URL and `Authorization: Bearer ${SPARKLOGS_API_TOKEN}` header template

There is no separate marketplace manifest for generic; clone or browse **`dist`** and point your tooling at that folder (or copy it into your host’s expected layout).

## Steps

1. Open the **`dist`** branch of `itlightning/sparklogs-ai-plugins` (default branch on GitHub).
2. Use `plugins/generic/sparklogs/` as the plugin root, or copy that directory where your host expects skills/commands.
3. Register **SparkLogs MCP** using your host’s MCP configuration. The generated `mcp.json` expects a **`SPARKLOGS_API_TOKEN`** value when your environment or host substitutes variables into the config (some hosts use different names, so align with your product's docs).
4. Invoke `/sparklogs-investigate` and related commands according to your host’s command interface.

Exact wiring (paths, reload behavior, secret stores) depends on the agent product; treat this package as the portable **content** bundle plus MCP metadata.
