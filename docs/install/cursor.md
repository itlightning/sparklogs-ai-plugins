# Install SparkLogs In Cursor

1. Open Cursor's plugin or marketplace flow.
2. Add the SparkLogs AI Plugins GitHub repository `itlightning/sparklogs-ai-plugins` as a marketplace source. Use the default `dist` branch and repository root.
3. Install the `sparklogs` plugin.
4. When Cursor prompts, sign in to SparkLogs in the browser (OAuth).
5. Ask a question about a SparkLogs-monitored host (chat). Ask for a full cited report (`sparklogs-investigate`) only when you want the written artifact.

The Cursor package lives at `plugins/cursor/sparklogs/` on `dist` and includes Cursor rules and subagents in addition to skills, commands, and MCP config.

Each remaining command file declares a `name` in its frontmatter (`sparklogs-summary`, `sparklogs-explain`), which should surface them as `/sparklogs-summary` and `/sparklogs-explain`. Cursor documents the `name` field but not the invocation string it produces, so treat the exact typing as unconfirmed until you see it in the command picker. Type the command and then the question or scope after it; Cursor documents no argument placeholder, so the bodies are written to work whether or not your text is substituted into them. Asking in chat works regardless, since the skills carry the workflow.

API token instead of OAuth: [API token auth](api-token.md).
