# Memory or handle leak

**Trigger.** "Machine slows over days, recovers on reboot", or an app repeatedly exhausts memory.

**Accuracy.** There is no per-process working-set trajectory.
You can establish the consequence trail: crashes, hangs, resource-exhaustion errors, and whether an open resource-pressure condition exists *now*.
A leak trajectory is an inference from that, not a measurement.
Read `sparklogs.reason` (LQL) with `episode_age_basis` (col): `observed` means already true when the agent first looked ("for at least N days" is the strongest claim); `unknown_ongoing` means you may not render a duration.
Do not straddle a source-pack release when comparing pattern hashes; identity is recomputed at that boundary.

**Queries.**

Use a longer window than a discrete fault (days).

Crashes and hangs:

```
source = "<host>" AND subsource = "win.eventlog.application" AND severity >= 17
```

Group by `pattern` (LQL).
A rising hourly count of one `pattern_hash` (LQL) is a rising *crash rate*, not a leak.

**Findings.** Lead with the observed consequence.
Put "no per-process memory trajectory" in WHAT WAS NOT CHECKED.
Do not produce a confident leak-trajectory Finding from crash counts.

**Off-endpoint** (HM3): application vendor telemetry, anything off-endpoint the process talks to.
