# Platform Support

## Current MVP Targets

- Claude: supported for Git-backed marketplace/plugin installation for Claude Code and Claude Cowork.
- Cursor: supported for Git-backed marketplace/plugin installation.
- Codex: supported for repo/local marketplace installation via `.agents/plugins/marketplace.json` while official public directory publishing matures. Skills and a bundled MCP server: Codex does not document repo-shipped slash commands or subagents.
- Copilot Studio: MCP setup guide only.
- VS Code/GitHub Copilot: Agent Plugins v1 output only; full plugin packaging deferred.

## Compatibility Verification

For MVP, compatibility is verified manually during release testing. This file will grow into a host-version matrix as Foundry testing produces concrete results.

## Unconfirmed On A Real Install

- Cursor: setting a plugin variable as an individual (non-team) user. The team-admin dashboard path is documented; the self-serve path is not. The manual `~/.cursor/mcp.json` route in the Cursor install guide is the fallback.
- Cursor: the command invocation names. Cursor documents a `name` frontmatter field on command files but not the resulting invocation string, so `/sparklogs-ask` and its siblings are inferred from that field, not confirmed. Asking in chat works regardless; the skills carry the workflow.
- Cursor: whether command bodies receive the invocation's free text. Cursor documents no argument placeholder, so command bodies are written to read correctly either way.
- Codex: the bundled `.mcp.json` has not yet been exercised on a real install. Its shape is grounded in the Codex source rather than inferred: `codex-rs/codex-mcp/src/plugin_config.rs` deserializes each entry of a plugin's `.mcp.json` into the same `McpServerConfig` type that `~/.codex/config.toml` uses, so `url` and `bearer_token_env_var` are accepted, and `codex-rs/codex-mcp/src/catalog.rs` ranks a `config.toml` server above a plugin-provided one of the same name. OpenAI's own `openai/plugins` repository ships the same shape in `plugins/github/.mcp.json`. One real install should still confirm the server connects.

## Known Deferred Areas

- Region selection for SparkLogs MCP endpoints is a launch-gate product decision.
- Host-specific subagent fallback behavior will be refined after cross-host testing.
- Official Codex public Plugin Directory publishing is not assumed for MVP.
