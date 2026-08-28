# Copilot Studio MCP Setup

SparkLogs does not ship a Copilot Studio prompt-skill package. Use the SparkLogs remote MCP endpoint.

Studio does not load this plugin's skills. Give the agent short instructions (cite `query_url`, `resolve_scope` first, technician decides) in addition to connecting MCP.

## Default: OAuth (Dynamic discovery)

1. Create or open an agent. Turn on generative orchestration.
2. Tools → Add a tool → Model Context Protocol.
3. Server URL: `https://mcp.sparklogs.app/mcp`.
4. Authentication: OAuth 2.0 → Dynamic discovery.
5. Create a connection and sign in to SparkLogs when prompted.
6. Preview a question that must resolve a client or host, then publish to Teams or Microsoft 365 Copilot.

Do not set an API key / bearer header on this connector unless you intend to skip OAuth. Token-style overlay: [API token auth](api-token.md).

## Optional: SparkLogs app registration (Manual OAuth)

Use this when an admin needs a confidential client, a known redirect URL, or an organization cap that is not just "whoever signed in."

1. In SparkLogs, create an app registration and copy the client id and secret.
2. In Copilot Studio, same MCP URL, OAuth 2.0 → Manual. Fill SparkLogs authorize and token URLs, client id, secret, and scopes.
3. Copy Studio's callback URL onto the SparkLogs registration.
4. Create the connection and sign in.

Microsoft's MCP article is canonical for button labels: [Connect an existing MCP server](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent).
