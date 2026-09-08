# {{display_name}} ({{host_label}})

Investigation skills for SparkLogs MCP.

## What is in this package

- `skills/`: `sparklogs-ask`, `sparklogs-investigate`, `sparklogs-analyze-cause`, `sparklogs-feedback`. Each skill carries the reference corpus it cites under its own references directory.
- `.codex-plugin/plugin.json`: the plugin manifest.
- `.mcp.json`: the SparkLogs MCP server, named `sparklogs` (OAuth).

Codex exposes each skill as `$plugin:skill`: `$sparklogs:sparklogs-ask`, `$sparklogs:sparklogs-investigate`, `$sparklogs:sparklogs-analyze-cause`, `$sparklogs:sparklogs-feedback`. Asking in plain language works too: "use sparklogs-investigate on ...".

## Install

```
codex plugin marketplace add itlightning/sparklogs-ai-plugins
codex plugin add sparklogs@sparklogs-ai-plugins
```

Codex fetches the default `dist` branch, reads `.agents/plugins/marketplace.json` at the repository root, and installs `sparklogs` from `./plugins/codex/sparklogs`. A local path works in place of the repository when you are testing an unreleased build.

Installing the plugin brings the MCP server with it. Sign in to SparkLogs when Codex prompts.

## Without the plugin

To use the MCP server on its own, add it to `~/.codex/config.toml` instead:

```toml
[mcp_servers.sparklogs]
url = "{{mcp_url}}"
```

Do not set `bearer_token_env_var` on the plugin entry. Token overlay: [API token auth](../../../docs/install/api-token.md).

Do not do both. This entry and the plugin's both define a server named `sparklogs`, and the `config.toml` entry outranks the plugin's, so the plugin's would be silently shadowed. If you installed the plugin, leave `[mcp_servers.sparklogs]` out of your `config.toml`.

Product docs: {{docs_url}}
