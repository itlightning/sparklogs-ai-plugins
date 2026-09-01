# SparkLogs AI Plugins

SparkLogs is the query and analysis layer for system and application logs plus device health and state over time, one host or the fleet. This repository packages the SparkLogs AI skills, commands, subagents, and MCP configuration for Claude, Codex, and Cursor.

The plugin gives your AI assistant a SparkLogs workflow:

- `sparklogs-ask`: answer what happened, or what the device/fleet looks like, from logs and health/state. Default door.
- `sparklogs-investigate` gathers evidence into a cited system-condition summary.
- `sparklogs-analyze-cause` is an explicit second step that turns prior findings into candidate hypotheses with confirm/refute steps.
- A `sparklogs-summary` command re-renders an existing investigation summary for ticket updates or customer communication.
- A `sparklogs-explain` command walks the evidence behind a specific claim or finding.

Ask, investigate, and analyze-cause are skills (plain language works). Command invocation for the two follow-ups differs by host: Claude Code namespaces them as `/sparklogs:sparklogs-explain` and `/sparklogs:sparklogs-summary` (Desktop's picker shows `sparklogs-explain` / `sparklogs-summary` because it has no marketplace namespace). Cursor invokes `/sparklogs-explain` and `/sparklogs-summary`. Codex and the generic Agent Plugins package ship no commands, so you name the workflow instead of typing one.

## Why MSPs Should Care

Expected outcomes:

- Faster yet much deeper first-pass summaries for tickets and escalations.
- More consistent investigation steps across technicians.
- Clear visibility into what was checked and what remains outside SparkLogs visibility.
- Better handoff notes for senior engineers and customer-facing updates.
- Cause analysis that does not overreach and avoids unchecked conclusions.

## Supported Hosts

SparkLogs plugins are available for Claude, Codex, and Cursor. All three install from this repository's marketplace. An Agent Plugins v1 package is generated under `plugins/generic/sparklogs/` on `dist` for hosts that follow that standard.

Each package carries only what its host documents:

| Package | Skills | Commands | Subagents | Rules | MCP config | Reference corpus |
|---|---|---|---|---|---|---|
| `plugins/claude/sparklogs` | yes | yes | yes | no | `.mcp.json` | at the package root, cited through `${CLAUDE_PLUGIN_ROOT}` |
| `plugins/cursor/sparklogs` | yes | yes | yes | yes | `mcp.json` | inside each skill's `references/` |
| `plugins/codex/sparklogs` | yes | no | no | no | `.mcp.json` | inside each skill's `references/` |
| `plugins/generic/sparklogs` | yes | no | no | no | `mcp.json` | inside each skill's `references/` |

## Install And Update

This repository uses a two-branch publishing model: `dist` is the generated default branch for marketplace-ready plugin packages, and `source` is the authoring branch for contributions.

Install from the GitHub repository marketplace root, not from a raw `marketplace.json` URL.

- [Claude](docs/install/claude.md) (Claude Teams and Enterprises: additional configuration required, [docs](https://sparklogs.com/docs/it-fleet-intelligence/connect#claude-team))
- [Cursor](docs/install/cursor.md)
- [Codex](docs/install/codex.md)
- [Copilot Studio MCP](https://sparklogs.com/docs/it-fleet-intelligence/connect#copilot-studio)
- [Generic (other Agent Skills hosts)](docs/install/generic.md)
- [API token auth (optional)](docs/install/api-token.md)

## Trust And Safety

SparkLogs AI assists investigation; the MSP technician remains accountable for operational decisions. Every factual claim should cite evidence. Cause analysis is opt-in and labeled as speculative. Read the [AI trust principles](docs/principles/ai-trust-principles.md).

## Contributing

The default branch `dist` is generated. Please open pull requests against `source`, not `dist`. See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md).

## License

This repository is licensed under the Apache 2.0 license (see [LICENSE](LICENSE)).

## Trademarks

"SparkLogs" and "IT Lightning" are trademarks of IT Lightning, LLC.
