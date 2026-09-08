# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`, `sparklogs-feedback`. Each skill carries the reference corpus it cites under its own references directory, so a skill resolves its citations without reaching outside its folder (including Claude Desktop, which mounts only `skills/`).
- `commands/`: `/sparklogs:sparklogs-summary`, `/sparklogs:sparklogs-explain`. Ask, investigate, analyze-cause, and feedback are skills (plain language). Claude Code namespaces the filename, so these look doubled; Desktop's picker shows `sparklogs-summary` / `sparklogs-explain`.
- `agents/`: subagents for pattern enumeration, clustering, and log summarization.
- `.mcp.json`: the SparkLogs MCP server, transport `http`. Claude discovers it at the plugin root.

## Install

```
/plugin marketplace add itlightning/sparklogs-ai-plugins
/plugin install sparklogs@sparklogs-ai-plugins
```

Then run `/reload-plugins` or restart Claude Code.

When Claude prompts, sign in to SparkLogs in the browser (OAuth).

Product docs: {{docs_url}}
