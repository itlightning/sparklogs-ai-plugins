# Platform Support

## Current MVP Targets

- Claude: supported for Git-backed marketplace/plugin installation for Claude Code and Claude Cowork.
- Cursor: supported for Git-backed marketplace/plugin installation.
- Codex: supported for repo/local marketplace installation via `.agents/plugins/marketplace.json` while official public directory publishing matures. Skills only: Codex does not document repo-shipped slash commands or subagents.
- Copilot Studio: MCP setup guide only.
- VS Code/GitHub Copilot: Agent Plugins v1 output only; full plugin packaging deferred.

## Compatibility Verification

For MVP, compatibility is verified manually during release testing. This file will grow into a host-version matrix as Foundry testing produces concrete results.

## Unconfirmed On A Real Install

- Cursor: setting a plugin variable as an individual (non-team) user. The team-admin dashboard path is documented; the self-serve path is not. The manual `~/.cursor/mcp.json` route in the Cursor install guide is the fallback.
- Codex: whether a plugin-bundled `.mcp.json` is picked up. The `~/.codex/config.toml` entry in the Codex install guide is the supported path and the fallback.

## Known Deferred Areas

- Region selection for SparkLogs MCP endpoints is a launch-gate product decision.
- Host-specific subagent fallback behavior will be refined after cross-host testing.
- Official Codex public Plugin Directory publishing is not assumed for MVP.
