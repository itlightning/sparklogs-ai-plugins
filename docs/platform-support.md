# Platform Support

## Supported Hosts

- Claude: Git-backed marketplace/plugin installation, from `.claude-plugin/marketplace.json` at the repository root. Skills, commands, subagents, and an MCP server.
- Codex: Git-backed marketplace/plugin installation, from `.agents/plugins/marketplace.json` at the repository root. Skills and a bundled MCP server: Codex does not document repo-shipped slash commands or subagents.
- Cursor: Git-backed marketplace/plugin installation, from `.cursor-plugin/marketplace.json` at the repository root. Skills, commands, subagents, rules, and an MCP server.
- Copilot Studio: MCP setup guide only.
- VS Code/GitHub Copilot: Agent Plugins v1 output only; full plugin packaging deferred.

## Compatibility Verification

Compatibility is verified manually during release testing. This file will grow into a host-version matrix as cross-host testing produces concrete results.

## Unconfirmed On A Real Install

- Codex: listing in the official Codex Plugin Directory. The marketplace install flow above does not depend on it.
- Cursor: setting a plugin variable as an individual (non-team) user. The team-admin dashboard path is documented; the self-serve path is not. The manual `~/.cursor/mcp.json` route in the Cursor install guide is the fallback.
- Cursor: the command invocation names. Cursor documents a `name` frontmatter field on command files but not the resulting invocation string, so `/sparklogs-ask` and its siblings are inferred from that field, not confirmed. Asking in chat works regardless; the skills carry the workflow.
- Cursor: whether command bodies receive the invocation's free text. Cursor documents no argument placeholder, so command bodies are written to read correctly either way.

## Confirmed On A Real Install

- Claude Desktop: the marketplace install flow, confirmed 2026-08-18 on a real install (Directory, Plugins, Add marketplace, Add from a repository, `itlightning/sparklogs-ai-plugins`, Sync; a Sync automatically toggle keeps installed plugins current when the repository changes).
- Codex: the install commands, confirmed 2026-08-18 against `codex-cli` 0.147.0. `codex plugin marketplace add <SOURCE>` accepts a local path, `owner/repo[@ref]`, or an HTTPS or SSH Git URL, and `codex plugin add <PLUGIN>@<MARKETPLACE>` installs from the resulting snapshot. Running both against the rendered tree registered the marketplace as `sparklogs-ai-plugins` and listed `sparklogs@sparklogs-ai-plugins` as installed and enabled. The Git form reaches `.agents/plugins/marketplace.json` at the repository root, which is the same file the local form reads.
- Codex: the bundled `.mcp.json` works as shipped, confirmed 2026-08-18 on a real Codex install (plugin installed from a local marketplace, `SPARKLOGS_API_TOKEN` exported, the `sparklogs` server connected and answered tool calls with no modification).
  The shape is also grounded in the Codex source: `codex-rs/codex-mcp/src/plugin_config.rs` deserializes each entry of a plugin's `.mcp.json` into the same `McpServerConfig` type that `~/.codex/config.toml` uses, so `url` and `bearer_token_env_var` are accepted, and `codex-rs/codex-mcp/src/catalog.rs` ranks a `config.toml` server above a plugin-provided one of the same name.
  OpenAI's own `openai/plugins` repository ships the same shape in `plugins/github/.mcp.json`.

## Known Deferred Areas

- Region selection for SparkLogs MCP endpoints is a launch-gate product decision.
- Host-specific subagent behavior on hosts that do not read repo-shipped subagents will be refined after cross-host testing.
