# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`. Each skill carries the reference corpus it cites under its own references directory.
- `.codex-plugin/plugin.json`: the plugin manifest.

The package ships no MCP config. Configure the server yourself, once, per the section below; the skills are useless without it.

Codex documents skills, MCP servers, and hooks as the components a plugin bundles. It does not document repo-shipped commands or subagents, so this package ships neither. Ask for a workflow by name instead: "use sparklogs-investigate on ...".

## Install

Add this repository as a plugin marketplace source from the default `dist` branch. Codex reads `.agents/plugins/marketplace.json` at the repository root and installs `sparklogs` from `./plugins/codex/sparklogs`.

## Token

Configure the MCP server in `~/.codex/config.toml`. This is the supported path, and the only one this package relies on:

```toml
[mcp_servers.sparklogs]
url = "{{mcp_url}}"
bearer_token_env_var = "{{token_var}}"
```

`bearer_token_env_var` takes the **name** of an environment variable, not its value and not an interpolation. Export the token in your shell profile and restart your shell:

```
export {{token_var}}="your-token-here"
```

Get the token from the SparkLogs app at [sparklogs.app](https://sparklogs.app).

Product docs: {{docs_url}}
