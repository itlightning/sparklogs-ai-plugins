# /sparklogs-explain

Explain the evidence behind this SparkLogs finding or claim: `{{args}}`.

Use the `sparklogs-investigate` skill (if not yet run). Walk through which cited `query_url`s support the claim, what each cited query actually showed, what evidence would refute the claim, and what was not checked. If the claim lacks evidence, say so and identify the query that would be needed. Do not turn this explanation into cause analysis unless the engineer explicitly invokes `/sparklogs-analyze-cause`.
