---
name: sparklogs-analyze-cause
description: Turn a prior SparkLogs investigation summary into candidate cause hypotheses.
---

# SparkLogs analyze cause

Derive candidate cause hypotheses for: the request text provided with this command.

Use the `sparklogs-analyze-cause` skill. Requires a prior factual summary; if none exists, run `/sparklogs-investigate` first. Recover the local investigation-state document for the provided `external_investigation_id`, or the most recent run if none was given. Every hypothesis cites prior Finding numbers and carries confirm/refute steps and a confidence band. Candidate hypotheses only, never an asserted root cause.
