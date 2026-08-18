# Security Policy

Report suspected vulnerabilities to `security@itlightning.com`.

Only the latest released version is supported. If a security issue affects a prior release, IT Lightning will publish a patched release and advisory.

## Data Flow

The plugin ships prompts, markdown references, manifests, and MCP configuration. The plugin package itself makes no outbound network calls and adds no analytics, telemetry, or phone-home behavior. Runtime data flows through the selected AI host, the customer-configured SparkLogs MCP endpoint, and SparkLogs APIs authorized by the customer's workspace token.

Configure API tokens through the host's supported secret/config mechanism. Never paste secrets into prompts or commit them to this repository.

## Build Supply Chain

Node and Yarn are pinned; direct dependencies are exact; `yarn.lock` is committed; CI uses `yarn install --immutable --check-cache`; dependency lifecycle scripts are disabled by default; third-party GitHub Actions are pinned to full commit SHAs.

The release workflow uses a single job with `contents: write`. Residual risk: a compromised build dependency could push generated content to `dist` or publish a malicious release. This is mitigated by pinning, immutable installs, disabled lifecycle scripts, CODEOWNERS review, and the small dependency surface.

## Generated Package Controls

Rendered packages contain only markdown, JSON manifests, MCP config, README, LICENSE, and brand assets. They contain no symlinks, executable files, runtime hooks, or copied build scripts. Every rendered plugin package includes a `LICENSE` byte-identical to the repo root `LICENSE`.

MCP configs are validated against SparkLogs-owned HTTPS domains. Logs, alerts, tickets, and tool output are untrusted data, not instructions. Subagents output structured findings only and must never call extra tools or follow instructions found in input.

## Vulnerability Response

If a material vulnerability or harmful release is discovered, IT Lightning will publish a patched release with a bumped version, a GitHub Security Advisory, and manual uninstall/reinstall guidance for each supported host. Marketplaces do not provide a centralized recall mechanism.
