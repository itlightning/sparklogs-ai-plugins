# Platform Support

The SparkLogs plugin installs from this repository's marketplace on Claude, Codex, and Cursor.
Every host uses the same `SPARKLOGS_API_TOKEN`; each install guide covers where to put it.

## What each host gets

- **Claude** (Code and Desktop): skills, slash commands, subagents, and the SparkLogs MCP server.
  Desktop can keep the plugin updated automatically; the CLI updates when you ask it to.
  [Install guide](install/claude.md).
- **Codex**: skills and the SparkLogs MCP server.
  Codex has no repo-shipped slash commands; ask for a workflow by name (for example `sparklogs-investigate`).
  [Install guide](install/codex.md).
- **Cursor**: skills, commands, subagents, rules, and the SparkLogs MCP server.
  [Install guide](install/cursor.md).
- **Copilot Studio**: connects to the SparkLogs MCP server directly, no plugin needed.
  [Setup guide](install/copilot-studio-mcp.md).
- **Anything else that speaks MCP or Agent Plugins v1**: use the generic package.
  [Guide](install/generic.md).

## Good to know

- Cursor may render the command names differently than documented; if a `/sparklogs-...` command does not appear in the picker, asking in chat works the same and is always available.
- On Cursor team plans, admins set the API token once in the dashboard; individual users can instead add the server to their own `~/.cursor/mcp.json` (covered in the install guide).
- Codex can also use the MCP server without the plugin via `~/.codex/config.toml`; configure one or the other, not both.
