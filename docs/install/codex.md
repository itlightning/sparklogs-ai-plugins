# Install SparkLogs In Codex

Codex plugin publishing is still evolving. For MVP, use repo/local marketplace installation from the generated `dist` branch.

The Codex package ships **skills only**. Codex documents skills, MCP servers, and lifecycle hooks as the components a plugin bundles; it does not document repo-shipped slash commands or subagents, and its custom-prompt mechanism is a per-user `~/.codex/prompts` directory that a repository cannot populate. So there is nothing to type as `/sparklogs-...` here. Name the workflow instead: "use sparklogs-investigate on SRV-FILE01 this week".

## Install the plugin

1. Add this repository as a plugin marketplace source from the default `dist` branch.
2. Codex reads `.agents/plugins/marketplace.json` at the repository root.
3. Install the `sparklogs` plugin, whose source path is `./plugins/codex/sparklogs`.

## Configure the MCP server

The package deliberately ships no MCP config: whether Codex reads a plugin-bundled `.mcp.json`, and how such an entry would interact with the one below, is unverified, and two configurations naming the same server can only disagree. Configure it once here. Add to `~/.codex/config.toml`:

```toml
[mcp_servers.sparklogs]
url = "https://mcp.sparklogs.app/mcp"
bearer_token_env_var = "SPARKLOGS_API_TOKEN"
```

`bearer_token_env_var` takes the **name** of an environment variable, not the token and not an interpolation. Export the token in your shell profile and restart your shell:

```
export SPARKLOGS_API_TOKEN="your-token-here"
```

If official self-serve Codex Plugin Directory publishing becomes generally available, this guide will be updated.
