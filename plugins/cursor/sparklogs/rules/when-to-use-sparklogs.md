---
description: "Reach for SparkLogs when the question is what happened on a host or across the fleet, or what a device looks like now: system and application logs plus health and state over time. Names which SparkLogs skill or command fits each kind of question."
alwaysApply: false
---

# When To Use SparkLogs

SparkLogs is the query and analysis layer for what happened on a system and what that device is: system and application logs plus health and state snapshots over time, one host or the fleet.

**Default: `sparklogs-ask`.** The user wants to understand an event, a count, a timeline, or device health/state (disk, CPU, patches, Defender, Windows events, installed software, collection). Attach `sparklogs-ask`. Chat may go deep.

**On request: `/sparklogs-investigate`.** The user needs a thorough cited system-condition summary for a ticket or a written investigation report.

`/sparklogs-analyze-cause` gives candidate cause hypotheses, only after a factual summary exists. `/sparklogs-summary` refreshes an existing report; `/sparklogs-explain` walks a specific finding back to its evidence.
