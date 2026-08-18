# Install SparkLogs In Codex

Codex plugin publishing is still evolving. For MVP, use repo/local marketplace installation from the generated `dist` branch.

The Codex package ships **skills and the MCP server**, and no commands. Codex documents skills, MCP servers, and lifecycle hooks as the components a plugin bundles; it does not document repo-shipped slash commands or subagents, and its custom-prompt mechanism is a per-user `~/.codex/prompts` directory that a repository cannot populate. So there is nothing to type as `/sparklogs-...` here. Name the workflow instead: "use sparklogs-investigate on SRV-FILE01 this week".

## Install the plugin

1. Add this repository as a plugin marketplace source from the default `dist` branch.
2. Codex reads `.agents/plugins/marketplace.json` at the repository root.
3. Install the `sparklogs` plugin, whose source path is `./plugins/codex/sparklogs`.

## Set your token

The plugin bundles the SparkLogs MCP server, so installing it configures the server too. The server reads your token from the `SPARKLOGS_API_TOKEN` environment variable. Export it in your shell profile and restart your shell:

```
export SPARKLOGS_API_TOKEN="your-token-here"
```

Codex reads the variable by **name** at connect time, so the token itself never enters a config file.

Get the token from the SparkLogs app at [sparklogs.app](https://sparklogs.app).

## Fallback: the MCP server without the plugin

To use the SparkLogs MCP server on its own, without installing the plugin, add it to `~/.codex/config.toml`:

```toml
[mcp_servers.sparklogs]
url = "https://mcp.sparklogs.app/mcp"
bearer_token_env_var = "SPARKLOGS_API_TOKEN"
```

Do not configure both. This entry and the plugin's bundled `.mcp.json` both define a server named `sparklogs`. Codex resolves the collision in favor of `config.toml`, so the plugin's entry would be silently shadowed rather than duplicated. If you installed the plugin, leave `[mcp_servers.sparklogs]` out of your `config.toml`.

You can still tune the bundled server without editing the plugin. Codex reads per-plugin policy from `config.toml` under `plugins.<plugin>.mcp_servers.sparklogs`, which is where an `enabled` or tool-approval override belongs.

If official self-serve Codex Plugin Directory publishing becomes generally available, this guide will be updated.
