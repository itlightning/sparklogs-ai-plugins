# Endpoint protection

**Data feed:** `win.defender.eventlog`. Open `${CLAUDE_PLUGIN_ROOT}/feeds/win.defender.eventlog/README.md`, then one artifact (`reasons.md` for threat / protection-disabled slugs).

Security-channel audit is `${CLAUDE_PLUGIN_ROOT}/themes/windows-security-and-audit.md`. Do not mix them.

**Pivots.** Protection disabled or threat detections: filter `subsource = "win.defender.eventlog"`, group by `sparklogs.reason`. Device health is supporting (was the agent observing), not the Defender verdict.
