# Install SparkLogs in Claude

SparkLogs AI Agent runs in both Claude Code (terminal) and Claude Desktop.

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

3. Set your SparkLogs MCP token in your shell profile (`~/.zshrc`,
   `~/.bashrc`, etc.):

```
   export SPARKLOGS_API_TOKEN="your-token-here"
```

   Restart your shell and Claude Code.

4. Try it:

```
   /sparklogs-investigate <scope>
```

## Claude Desktop (future)

1. Open the **Customize** panel from the left sidebar.
2. To the right of `Personal plugins` click the **+** button.
3. Choose **Add custom marketplace** and enter:

```
   itlightning/sparklogs-ai-plugins
```

4. Find **sparklogs** in the marketplace listing and click **Install**.
5. Set `SPARKLOGS_API_TOKEN` environment variable and then re-launch
   Claude Desktop.
6. Start a new conversation and try `/sparklogs-investigate`.

> Looking for SparkLogs in **Customize → Plugins → Browse plugins**?
> 
> We're submitting the plugin to Anthropic's official directory; until then, install via the custom marketplace steps above.

# Repo layout

The plugin package lives at `plugins/claude/sparklogs/` on the
`dist` branch (the repo's default branch) and contains skills,
commands, subagents, `.mcp.json`, and plugin metadata. The marketplace
manifest is at `.claude-plugin/marketplace.json` on the same branch.

# Security

Don't paste API tokens into prompts or commit them to this repository.
