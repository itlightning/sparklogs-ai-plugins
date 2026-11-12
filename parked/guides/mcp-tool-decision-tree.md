<!-- Moved from src/guides/mcp-tool-decision-tree.md at 29a8d32. Names tools that are not shipped; the substitute recipes stay in src. -->

Tool-count paragraph as it named the planned differential tools:

There are **fourteen** tools: `resolve_scope` (tool), `list_sources` (tool), `query_scope_activity` (tool), `query_device_health` (tool), `describe_pattern` (tool), `list_fields` (tool), `query_event_counts_by_severity` (tool), `query_logs` (tool), `refine_query_result` (tool), `get_query_metadata` (tool), `send_sparklogs_feedback` (tool), `server_info` (tool), `describe_tables` (tool), `query_table` (tool). Three differential tools (`query_period_diff` (other), `compare_populations` (other), `cluster_event_contexts` (other)) are fast-follow; see the bottom of this file for v1 equivalents.

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff` (other)** ("what changed between two windows") -> run `query_event_counts_by_severity` (tool) over each window (`group_by=["pattern_hash"]`) and compare the two grouped results.
- **`compare_populations` (other)** ("what's different about broken vs working") -> run `query_event_counts_by_severity` (tool) over each population separately (via distinct `lql` (arg)) and compare.
- **`cluster_event_contexts` (other)** ("distinct contexts around these events") -> `query_logs` (tool) narrowed to the pattern, then `refine_query_result` (tool) group_by to cluster.
