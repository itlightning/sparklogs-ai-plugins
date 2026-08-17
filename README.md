# SparkLogs AI Plugins

SparkLogs is the query and analysis layer for system and application logs plus device health and state over time, one host or the fleet. This repository packages the SparkLogs AI skills, commands, subagents, and MCP configuration for Claude Code and Cowork, Cursor, and Codex.

The plugin gives your AI assistant a SparkLogs workflow:

- `sparklogs-ask`: answer what happened, or what the device/fleet looks like, from logs and health/state. Default door.
- `/sparklogs-investigate` gathers evidence into a cited system-condition summary.
- `/sparklogs-analyze-cause` is an explicit second step that turns prior findings into candidate hypotheses with confirm/refute steps.
- `/sparklogs-summary` re-renders an existing investigation summary for ticket updates or customer communication.
- `/sparklogs-explain` explains the evidence behind a specific claim or finding.

## Why MSPs Should Care

Expected outcomes:

- Faster yet much deeper first-pass summaries for tickets and escalations.
- More consistent investigation steps across technicians.
- Clear visibility into what was checked and what remains outside SparkLogs visibility.
- Better handoff notes for senior engineers and customer-facing updates.
- Cause analysis that does not overreach and avoids unchecked conclusions.

## Supported Hosts

Claude Code (and Cowork) and Cursor are the recommended Foundry hosts. Codex is supported via repo/local marketplace installation while public directory flows mature. A neutral Agent Skills package is generated under `plugins/generic/sparklogs/` on `dist` for hosts that can import skills from a folder.

## Install And Update

This repository uses a two-branch publishing model: `dist` is the generated default branch for marketplace-ready plugin packages, and `source` is the authoring branch for contributions.

Install from the GitHub repository marketplace root, not from a raw `marketplace.json` URL.

- [Claude](docs/install/claude.md)
- [Cursor](docs/install/cursor.md)
- [Codex](docs/install/codex.md)
- [Generic (other Agent Skills hosts)](docs/install/generic.md)
- [Copilot Studio MCP](docs/install/copilot-studio-mcp.md)

## Trust And Safety

SparkLogs AI assists investigation; the MSP technician remains accountable for operational decisions. Every factual claim should cite evidence. Cause analysis is opt-in and labeled as speculative. Read the [AI trust principles](docs/principles/ai-trust-principles.md).

## Contributing

The default branch `dist` is generated. Please open pull requests against `source`, not `dist`. See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md).

## License

This repository is licensed under the Apache 2.0 license (see [LICENSE](LICENSE)).

## Trademarks

"SparkLogs" and "IT Lightning" are trademarks of IT Lightning, LLC.
