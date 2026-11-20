<!-- Moved from src/guides/mcp-tool-decision-tree.md at 29a8d32. Names tools that are not shipped; the substitute recipes stay in src. -->

Tool-count paragraph as it named the planned differential tools:

There are **fourteen** tools: `find_org_or_device` (tool), `list_sources` (tool), `summarize_events_by_severity` (tool), `query_device_health` (tool), `describe_event_patterns` (tool), `list_fields` (tool), `count_events_matching_filter` (tool), `query_raw_events` (tool), `refine_query_result` (tool), `get_query_metadata` (tool), `send_sparklogs_feedback` (tool), `server_info` (tool), `describe_tables` (tool), `query_table` (tool). Three differential tools (`query_period_diff` (other), `compare_populations` (other), `cluster_event_contexts` (other)) are fast-follow; see the bottom of this file for v1 equivalents.

## Tools that do not exist

If you find yourself reaching for one of these, use the substitute:

- **`query_period_diff` (other)** ("what changed between two windows") -> run `count_events_matching_filter` (tool) over each window (`group_by=["pattern_hash"]`) and compare the two grouped results.
- **`compare_populations` (other)** ("what's different about broken vs working") -> run `count_events_matching_filter` (tool) over each population separately (via distinct `lql` (arg)) and compare.
- **`cluster_event_contexts` (other)** ("distinct contexts around these events") -> `query_raw_events` (tool) narrowed to the pattern, then `refine_query_result` (tool) group_by to cluster.
