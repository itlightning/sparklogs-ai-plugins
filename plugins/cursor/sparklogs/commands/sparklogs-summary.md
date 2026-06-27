# /sparklogs-summary

Re-render the current SparkLogs investigation summary for `{{args}}`.

Use the `sparklogs-investigate` skill (if not already run). Recover the local investigation-state document for the provided `investigation_request_id` (or use the ID of the most recent run) and, if needed, call `get_query_metadata(investigation_request_id=...)` to recover query history. Produce a full system condition summary using the investigation template. Do not introduce new uncited claims. Do not perform cause analysis.
