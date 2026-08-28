# Platform Support

The SparkLogs plugin installs from this repository's marketplace on Claude, Codex, and Cursor.
Default auth is SparkLogs OAuth (browser sign-in).

## What each host gets

- **Claude** (Code and Desktop): skills, slash commands, subagents, and the SparkLogs MCP server.
  Desktop can keep the plugin updated automatically; the CLI updates when you ask it to.
  [Install guide](install/claude.md).
- **Codex**: skills and the SparkLogs MCP server.
  Skills are invoked as `$sparklogs:sparklogs-ask`, `$sparklogs:sparklogs-investigate`, and `$sparklogs:sparklogs-analyze-cause`, or just ask in plain language.
  [Install guide](install/codex.md).
- **Cursor**: skills, commands, subagents, rules, and the SparkLogs MCP server.
  [Install guide](install/cursor.md).
- **Copilot Studio**: connects to the SparkLogs MCP server directly, no plugin needed.
  Refer to our official docs
  [Connect MCP](https://sparklogs.com/docs/it-fleet-intelligence/connect#mcp) and 
  [Agent Instruction Template](https://sparklogs.com/docs/it-fleet-intelligence/agent-instructions).
  Or the short [Setup guide](install/copilot-studio-mcp.md).
- **Anything else that speaks MCP or Agent Plugins v1**: use the generic package.
  [Guide](install/generic.md).

## Good to know

- Cursor may render the command names differently than documented; if a `/sparklogs-...` command does not appear in the picker, asking in chat works the same and is always available.
- For headless or automated environments: [API token auth](install/api-token.md) instead of OAuth.
