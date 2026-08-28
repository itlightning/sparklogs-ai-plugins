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

When Claude prompts, sign in to SparkLogs in the browser (OAuth).

Product docs: {{docs_url}}
