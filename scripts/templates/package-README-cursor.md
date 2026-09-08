# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`, `sparklogs-feedback`. Each skill carries the reference corpus it cites under its own references directory, so a skill resolves its citations without reaching outside its folder.
- `commands/`: `/sparklogs-summary`, `/sparklogs-explain`. Ask, investigate, analyze-cause, and feedback are skills (plain language). Type the command, then the finding or investigation id after it.
- `agents/`: subagents for pattern enumeration, clustering, and log summarization.
- `rules/`: a when-to-use rule, offered on relevance rather than always applied.
- `mcp.json`: the SparkLogs MCP server over https; sign in with SparkLogs (OAuth) when Cursor prompts.

## Install

Add itlightning/sparklogs-ai-plugins as a plugin marketplace source (default `dist` branch, repository root), then install the `sparklogs` plugin.

Product docs: {{docs_url}}
