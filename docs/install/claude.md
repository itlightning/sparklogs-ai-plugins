# Install SparkLogs in Claude

The SparkLogs plugin installs from this repository's marketplace, in Claude Code (terminal) and in Claude Desktop.

For Claude Teams and Enterprises, additional configuration is required: [Connect SparkLogs](https://sparklogs.com/docs/it-fleet-intelligence/connect#claude-team).

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

4. Try it. Ask a question about a monitored host (the `sparklogs-ask` skill). Ask for a cited report when you want `sparklogs-investigate`. Cause hypotheses: `sparklogs-analyze-cause` after a summary exists.

   Follow-up commands (Claude Code namespaces the filename, so these look doubled):

```
   /sparklogs:sparklogs-explain <finding or claim>
   /sparklogs:sparklogs-summary <external_investigation_id>
```

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
6. Start a new conversation and ask a question about a monitored host. The picker lists `sparklogs-explain` and `sparklogs-summary` (Desktop has no marketplace namespace, so those filenames carry the `sparklogs-` prefix). Ask, investigate, and analyze-cause are skills: ask in plain language.

> Looking for SparkLogs in **Customize → Plugins → Browse plugins**?
> 
> We're submitting the plugin to Anthropic's official directory; until then, install via the custom marketplace steps above.

# Repo layout

The plugin package lives at `plugins/claude/sparklogs/` on the
`dist` branch (the repo's default branch) and contains skills,
commands, subagents, `.mcp.json`, and plugin metadata. Each skill
carries the reference corpus it cites under its own `references/`
tree (`guides/`, `playbooks/`, `themes/`, `feeds/`), so Claude Desktop
(which mounts only `skills/`) can still resolve those citations. The
marketplace manifest is at `.claude-plugin/marketplace.json` on the
same branch.

`.mcp.json` declares `"type": "http"`. Claude drops an MCP server entry
that has a `url` and no `type`, so that field is not optional.
Skill markdown cites the corpus with paths relative to that skill's
`references/` directory.

# Security

Don't paste API tokens into prompts or commit them to this repository.
OAuth is the default. Token overlay: [API token auth](api-token.md).
