# Install SparkLogs in Claude

The SparkLogs plugin installs from this repository's marketplace, in Claude Code (terminal) and in Claude Desktop.

## Claude Code

1. Add the SparkLogs marketplace:

```
   /plugin marketplace add itlightning/sparklogs-ai-plugins
```

2. Install the plugin:

```
   /plugin install sparklogs@sparklogs-ai-plugins
```

   Then run `/reload-plugins` (or restart Claude Code) to activate it.

3. When Claude prompts, sign in to SparkLogs in the browser (OAuth).

4. Try it. Ask a question about a monitored host, or:

```
   /sparklogs:ask <question>
```

   Use `/sparklogs:investigate <scope>` only when you want a full cited report.

   The other commands are `/sparklogs:analyze-cause`, `/sparklogs:summary`, and
   `/sparklogs:explain`.

## Claude Desktop

1. Open the **Directory** from the sidebar and pick **Plugins**.
2. Click the **+** button (Add marketplace) and choose **Add from a repository**.
3. Enter the repository and click **Sync**:

```
   itlightning/sparklogs-ai-plugins
```

   Leave **Sync automatically** on to pick up plugin updates whenever this repository publishes a new release.

4. Find **sparklogs** in the marketplace listing and click **Install**.
5. When Claude prompts, sign in to SparkLogs in the browser (OAuth).
6. Start a new conversation and ask a question about a monitored host, or try `/sparklogs:ask`.

> Looking for SparkLogs in **Customize → Plugins → Browse plugins**?
> 
> We're submitting the plugin to Anthropic's official directory; until then, install via the custom marketplace steps above.

# Repo layout

The plugin package lives at `plugins/claude/sparklogs/` on the
`dist` branch (the repo's default branch) and contains skills,
commands, subagents, the reference corpus (`guides/`, `playbooks/`,
`themes/`, `feeds/`), `.mcp.json`, and plugin metadata. The marketplace
manifest is at `.claude-plugin/marketplace.json` on the same branch.

`.mcp.json` declares `"type": "http"`. Claude drops an MCP server entry
that has a `url` and no `type`, so that field is not optional.
Skill, command, and subagent markdown cites the corpus through
`${CLAUDE_PLUGIN_ROOT}`, which Claude expands to the installed plugin
directory.

# Security

Don't paste API tokens into prompts or commit them to this repository.
OAuth is the default. Token overlay: [API token auth](api-token.md).
