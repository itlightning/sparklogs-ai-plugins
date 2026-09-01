# Endpoint protection

**Data feed:** `win.defender.eventlog`. Open `${CLAUDE_PLUGIN_ROOT}/feeds/win.defender.eventlog/README.md`, then one artifact (`reasons.md` for threat / protection-disabled slugs).
Explore: `${CLAUDE_PLUGIN_ROOT}/guides/stream-kinds/wel-defender.md`.

Security-channel audit is `${CLAUDE_PLUGIN_ROOT}/themes/windows-security-and-audit.md`. Do not mix them.

**Pivots.** Protection disabled or threat detections: filter `subsource = "win.defender.eventlog"`, group by `sparklogs.reason` (LQL). Device health is supporting (was the agent observing), not the Defender verdict.
