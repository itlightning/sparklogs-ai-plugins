# Changelog

Notable changes to the published plugin packages.
Dates are release dates; the `Unreleased` section accumulates until a tag is cut.

## Unreleased

### Breaking

- **Command names lost their duplicated prefix.**
  In Claude the commands are now `/sparklogs:ask`, `/sparklogs:investigate`, `/sparklogs:analyze-cause`, `/sparklogs:summary`, and `/sparklogs:explain`.
  They were previously `/sparklogs:sparklogs-ask` and so on, because each command file repeated the plugin name that Claude already prefixes.
  Cursor invocation names (`/sparklogs-ask` and siblings) are unchanged.
  Update any saved prompt, macro, or runbook that types the old form.
- **Codex and the generic package no longer ship commands, rules, or subagents.**
  Codex documents skills, MCP servers, and hooks as the components a plugin bundles, and Agent Plugins v1 defines skills and `mcp.json`.
  Ask for a workflow by name (`sparklogs-investigate`) instead of typing a command.
  The Claude and Cursor packages are unaffected.
### Fixed

- **MCP server entries now declare a transport.**
  Claude silently drops an entry that has a `url` and no `type`, so the MCP server never connected.
  Claude, Cursor, and Codex use `http`; the generic package uses `streamable-http` per Agent Plugins v1.
- **The Codex MCP entry authenticates the way Codex actually reads a token.**
  It sets `bearer_token_env_var` to `SPARKLOGS_API_TOKEN`, the environment variable's name.
  Codex expands no `${...}` placeholder in a header, so the header form every other host uses would have shipped those literal characters to the server.
  Installing the Codex plugin now configures the server; `[mcp_servers.sparklogs]` in `~/.codex/config.toml` becomes the fallback for using the server without the plugin, and it outranks the plugin's entry, so configure one or the other.
- **Reference citations resolve at their destination.**
  Skill, subagent, and command markdown cited the guides, playbooks, themes, and feed references by package-root path, which resolved from nowhere once installed.
  The Claude package now anchors those citations on `${CLAUDE_PLUGIN_ROOT}`; every other package carries the corpus inside each skill and cites it relatively, so a skill folder is self-contained.
- **Command bodies use `$ARGUMENTS`.**
  They previously carried a mustache-style `args` placeholder that no host expands, so the literal text reached the model.
- **The Cursor package declares its API token as a plugin variable.**
  A bare `${SPARKLOGS_API_TOKEN}` in a plugin's `mcp.json` resolves only from a declared variable, so the header shipped empty.
- **The Cursor rule has frontmatter.**
  Cursor ignores a rules file without it.
- **Skill prose no longer promises commands the host does not have.**
  The workflow-routing sections are written per host: slash commands where the host has them, named workflows where it does not.

### Added

- `/sparklogs:analyze-cause` exists as a command.
  The cause-analysis skill was documented as a command everywhere but had no command file behind it.
- Packaging gates in CI.
  They check that every MCP entry declares a transport, that the Codex entry names its token variable and that the Codex manifest points at the file that carries it, that no unexpanded argument placeholder survives, that every reference resolves from its own directory, that host-specific prose is confined to the host it is true for, that no command file repeats the plugin name, that Cursor rules carry frontmatter, that README and landing-page links resolve, and that `claude plugin validate` passes when the CLI is available.
- The published branch root now carries `LICENSE`, `NOTICE`, `CONTRIBUTING.md`, `AGENTS.md`, `SECURITY.md`, this changelog, and the install docs, so the default branch reads as a repository landing page.
