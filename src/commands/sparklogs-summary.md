# /sparklogs-summary

Re-render the current SparkLogs investigation summary for `{{args}}`.

Use the `sparklogs-investigate` skill (if not already run). Recover the local investigation-state document for the provided `investigation_request_id` (or use the ID of the most recent run) to reload the findings and the per-query `query_id`/`query_url` list; inspect any single cache with `get_query_metadata(query_id=...)` if needed. Produce a full system condition summary using the investigation template. Do not introduce new uncited claims. Do not perform cause analysis.
