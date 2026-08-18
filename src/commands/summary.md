# /sparklogs-summary

Re-render the current SparkLogs investigation summary for `{{args}}`.

Use the `sparklogs-investigate` skill (if not already run). Recover the local investigation-state document for the provided `external_investigation_id` (or the most recent run) to reload the findings and the per-query `query_id`/`query_url` list; inspect any single cache with `get_query_metadata(query_id=...)` if needed. Produce a full system condition summary using the investigation template. No new uncited claims, no cause analysis.
