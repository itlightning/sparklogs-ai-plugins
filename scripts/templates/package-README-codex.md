# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`. Each skill carries the reference corpus it cites under its own references directory.
- `.codex-plugin/plugin.json`: the plugin manifest.
- `.mcp.json`: the SparkLogs MCP server, named `sparklogs`.

Codex documents skills, MCP servers, and hooks as the components a plugin bundles. It does not document repo-shipped commands or subagents, so this package ships neither. Ask for a workflow by name instead: "use sparklogs-investigate on ...".

## Install

Add this repository as a plugin marketplace source from the default `dist` branch. Codex reads `.agents/plugins/marketplace.json` at the repository root and installs `sparklogs` from `./plugins/codex/sparklogs`.

Installing the plugin brings the MCP server with it. Nothing to add to `~/.codex/config.toml`.

## Token

The bundled server reads your token from the `{{token_var}}` environment variable. Export it in your shell profile and restart your shell:

```
export {{token_var}}="your-token-here"
```

Codex reads the variable by name at connect time, so the token itself never enters a config file.

Get the token from the SparkLogs app at [sparklogs.app](https://sparklogs.app).

## Without the plugin

To use the MCP server on its own, add it to `~/.codex/config.toml` instead:

```toml
[mcp_servers.sparklogs]
url = "{{mcp_url}}"
bearer_token_env_var = "{{token_var}}"
```

Do not do both. This entry and the plugin's both define a server named `sparklogs`, and the `config.toml` entry outranks the plugin's, so the plugin's would be silently shadowed. If you installed the plugin, leave `[mcp_servers.sparklogs]` out of your `config.toml`.

Product docs: {{docs_url}}
