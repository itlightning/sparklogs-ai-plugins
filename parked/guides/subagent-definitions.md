<!-- Moved from src/guides/subagent-definitions.md at 29a8d32. The cluster interpreter needs a context-clustering tool; Gemini CLI and Copilot Studio have no package. -->

## Subagent: `sparklogs-cluster-interpreter`

**Not usable yet.** This subagent depends on `cluster_event_contexts` (other), which does not exist. Approximate clustering with a `query_logs` (tool) slice narrowed to the pattern plus `refine_query_result` (tool) group_by over the surrounding context fields.

**Purpose.** Given a `cluster_event_contexts` (other) result with multiple distinct clusters, interpret each cluster's representative_surround and produce a structured human-readable description.

**Model tier:** fast, lightweight tier.

**Inputs:**
- The cluster_event_contexts result (clusters list).
- Per-cluster, the representative_surround pattern_hashes and counts.

**Output schema:**
```yaml
cluster_interpretations:
  - cluster_id: <int>
    occurrence_count: <int>
    pattern_summary: <plain-language description of what the surround patterns suggest>
    representative_event_t: <ISO>
    contributing_sources: <list>
    related_reasons: <sparklogs.reason values suggested by surround patterns; else empty>
```

**Delegation heuristic:** when cluster_event_contexts returns 4+ clusters with non-trivial pattern_hash sets in surrounds.

---

## Host notes for hosts with no package

- **Codex / Gemini CLI / Cursor / Copilot Studio:** varying support; skill degrades gracefully (single-tier delegation or none).

### Codex / Gemini CLI / Cursor / Copilot Studio

Varying support. The skill expresses delegation *intent* - "this work is bulk extractive summarization, suitable for a faster tier where supported" - and the host fulfills with whatever it has. In hosts without per-subagent model selection, delegation falls back to single-tier (orchestrator's tier), which is correct but loses the speed benefit. In hosts without subagent support at all, the orchestrator does the work in-context.
