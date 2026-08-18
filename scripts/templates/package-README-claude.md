# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`.
- `commands/`: `/sparklogs:ask`, `/sparklogs:investigate`, `/sparklogs:analyze-cause`, `/sparklogs:summary`, `/sparklogs:explain`.
- `agents/`: subagents for pattern enumeration, clustering, and log summarization.
- `guides/`, `playbooks/`, `themes/`, `feeds/`: the reference corpus the skills cite. Skill and command markdown cites it through `${CLAUDE_PLUGIN_ROOT}`, so the paths resolve wherever the plugin is installed.
- `.mcp.json`: the SparkLogs MCP server, transport `http`. Claude discovers it at the plugin root.

## Install

```
/plugin marketplace add itlightning/sparklogs-ai-plugins
/plugin install sparklogs@sparklogs-ai-plugins
```

Then run `/reload-plugins` or restart Claude Code.

## Token

`.mcp.json` sends `Authorization: Bearer {{token_ref}}`. Export the token in your shell profile and restart the shell before starting Claude Code:

```
export {{token_var}}="your-token-here"
```

Get the token from the SparkLogs app at [sparklogs.app](https://sparklogs.app).

Product docs: {{docs_url}}
