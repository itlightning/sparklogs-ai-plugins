---
index: Defender
---

# Endpoint protection

**Data feed:** `win.defender.eventlog` (value). Open `feeds/win.defender.eventlog/README.md`, then one artifact (`reasons.md` for threat / protection-disabled slugs).
Explore: `guides/stream-kinds/wel-defender.md`.

Security-channel audit is `themes/windows-security-and-audit.md`. Do not mix them.

**Pivots.** Protection disabled or threat detections: filter `subsource = "win.defender.eventlog"`, group by `sparklogs.reason` (LQL). Device health is supporting (was the agent observing), not the Defender verdict.
