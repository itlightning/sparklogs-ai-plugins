# Install SparkLogs In Codex

The Codex package ships **skills and the MCP server**. Codex exposes each installed skill as `$plugin:skill`, so the SparkLogs workflows are invoked as `$sparklogs:sparklogs-ask`, `$sparklogs:sparklogs-investigate`, and `$sparklogs:sparklogs-analyze-cause`. Asking in plain language works too: "use sparklogs-investigate on SRV-FILE01 this week".

## Install

1. Add the SparkLogs marketplace:

```
   codex plugin marketplace add itlightning/sparklogs-ai-plugins
```

   Codex fetches the repository's default `dist` branch and reads
   `.agents/plugins/marketplace.json` at the root. The same command also accepts
   an HTTPS or SSH Git URL.

2. Install the plugin:

```
   codex plugin add sparklogs@sparklogs-ai-plugins
```

3. When Codex prompts, sign in to SparkLogs in the browser (OAuth).

4. Try it. Ask a question about a monitored host, or invoke a workflow directly:
   `$sparklogs:sparklogs-investigate` (or in plain language: "use sparklogs-investigate on SRV-FILE01 this week").

Refresh the marketplace snapshot later with `codex plugin marketplace upgrade`.

## Install from a local checkout (development and testing)

`codex plugin marketplace add` also takes a local path, which is how you try an
unreleased build. Point it at a rendered tree instead of the repository:

```
codex plugin marketplace add ./build/dist
codex plugin add sparklogs@sparklogs-ai-plugins
```

## The MCP server without the plugin

To use the SparkLogs MCP server on its own, without installing the plugin, add it to `~/.codex/config.toml`:

```toml
[mcp_servers.sparklogs]
url = "https://mcp.sparklogs.app/mcp"
```

Do not configure both. This entry and the plugin's bundled `.mcp.json` both define a server named `sparklogs`. Codex resolves the collision in favor of `config.toml`, so the plugin's entry would be silently shadowed rather than duplicated. If you installed the plugin, leave `[mcp_servers.sparklogs]` out of your `config.toml`.

API token instead of OAuth: [API token auth](api-token.md).

You can still tune the bundled server without editing the plugin. Codex reads per-plugin policy from `config.toml` under `plugins.<plugin>.mcp_servers.sparklogs`, which is where an `enabled` or tool-approval override belongs.
