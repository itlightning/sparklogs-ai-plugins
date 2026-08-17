# SparkLogs AI Plugin

Give your AI assistant or AI agent real evidence from your fleet: logs, device health, and system state, one host or all of them.

## What is SparkLogs

SparkLogs is [IT fleet intelligence](https://sparklogs.com/docs/it-fleet-intelligence) for MSPs and IT teams: it collects and understands the logs and health signals from across your IT fleet, so problems can be investigated with evidence instead of guesswork. This plugin connects your AI assistant to that intelligence.

Data comes from Windows systems across your fleet through the [SparkLogs Agent](https://sparklogs.com/docs/agents). You can also send it with any [popular open source log shippers](https://sparklogs.com/docs/ingest) such as [OpenTelemetry](https://sparklogs.com/docs/ingest/tools/opentelemetry-collector), [Vector](https://sparklogs.com/docs/ingest/tools/vector), or [Fluent Bit](https://sparklogs.com/docs/ingest/tools/fluentbit), which forward [syslog](https://sparklogs.com/docs/ingest/data-sources/syslog) and other sources.

## What your AI assistant can do with it

- Investigate one device end to end: what changed, what failed, and what it means, with every claim tied to the events behind it. See [skills/sparklogs-investigate](plugins/claude/sparklogs/skills/sparklogs-investigate/SKILL.md).
- Triage the whole fleet: what needs attention today, what is new this week, and who else is affected.
- Follow guided steps for common MSP situations such as backup failures, patch failures, slow logon, and degraded storage. See [playbooks](plugins/claude/sparklogs/playbooks/playbooks.md).
- Read per-feed reference knowledge for Windows Event Log, servicing, and Defender data, so answers cite what an event actually means instead of guessing from an event ID. See [feeds](plugins/claude/sparklogs/feeds).
- Write ticket-ready summaries, and explain any single finding back to the evidence it came from. See [commands](plugins/claude/sparklogs/commands).

## Try asking

```
What needs attention in my fleet today?
Investigate why <server> has been unhealthy this week.
Backups failed on <server> three nights running. Why?
What new failures are happening this week that we have not seen before?
```

## Quick start

1. Get a SparkLogs workspace at [sparklogs.app](https://sparklogs.app). The free plan is enough to try this.
2. In Claude Code, add this marketplace:

   ```
   /plugin marketplace add itlightning/sparklogs-ai-plugins
   ```

3. Install the plugin, then run `/reload-plugins` or restart Claude Code:

   ```
   /plugin install sparklogs@sparklogs-ai-plugins
   ```

4. Set your SparkLogs MCP token in your shell profile and restart your shell:

   ```
   export SPARKLOGS_API_TOKEN="your-token-here"
   ```

5. Ask one of the prompts above.

Claude Desktop, Cursor, Codex, and other Agent Skills hosts have their own steps: see the [install guides](https://github.com/itlightning/sparklogs-ai-plugins/tree/source/docs/install).

Full product documentation: [https://sparklogs.com/docs/it-fleet-intelligence](https://sparklogs.com/docs/it-fleet-intelligence).

## Contents

The plugin is mostly readable markdown. Browse it here before you install:

- [Playbooks](plugins/claude/sparklogs/playbooks/playbooks.md): symptom-by-symptom investigation steps.
- [Skills](plugins/claude/sparklogs/skills): ask, investigate, and cause-analysis workflows.
- [Guides](plugins/claude/sparklogs/guides): query language, tool selection, scope resolution, pattern catalog.
- [Feed references](plugins/claude/sparklogs/feeds): fields, enums, and reason codes per data feed.
- [Themes](plugins/claude/sparklogs/themes): patching, security and audit, endpoint protection, operational events, device health.
- [Subagents](plugins/claude/sparklogs/agents): pattern enumeration, clustering, and log summarization helpers.

Those links point at the Claude package. The same content ships in every host package under `plugins/<host>/sparklogs/`.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](https://github.com/itlightning/sparklogs-ai-plugins/blob/source/CONTRIBUTING.md) to get started.

This branch is generated from the `source` branch, so pull requests land on `source`.

---

Version: 1.4.1

License: Apache-2.0, see [LICENSE](https://github.com/itlightning/sparklogs-ai-plugins/blob/source/LICENSE).

Security: report suspected vulnerabilities per [SECURITY.md](https://github.com/itlightning/sparklogs-ai-plugins/blob/source/SECURITY.md).

Support: reach us on [Discord](https://discord.gg/Yu8F8w8tDw), or use the Help Center in the SparkLogs app to request help.
