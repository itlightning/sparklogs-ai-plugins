# Platform Support

## Current MVP Targets

- Claude: supported for Git-backed marketplace/plugin installation for Claude Code and Claude Cowork.
- Cursor: supported for Git-backed marketplace/plugin installation.
- Codex: supported for repo/local marketplace installation via `.agents/plugins/marketplace.json` while official public directory publishing matures.
- Copilot Studio: MCP setup guide only.
- VS Code/GitHub Copilot: neutral Agent Skills output only; full plugin packaging deferred.

## Compatibility Verification

For MVP, compatibility is verified manually during release testing. This file will grow into a host-version matrix as Foundry testing produces concrete results.

## Known Deferred Areas

- Region selection for SparkLogs MCP endpoints is a launch-gate product decision.
- Host-specific subagent fallback behavior will be refined after cross-host testing.
- Official Codex public Plugin Directory publishing is not assumed for MVP.
