# Subagent Definitions - for bulk-summarization delegation

The SparkLogs Investigator skill delegates bulk-analysis steps to subagents (where the host supports them) to keep the orchestrator's context focused. This file documents the subagent definitions that ship with the plugin.

Subagent support varies by host:
- **Claude:** subagent definitions with `model: <tier>` frontmatter.
- **Codex / Gemini CLI / Cursor / Copilot Studio:** varying support; skill degrades gracefully (single-tier delegation or none).

---

## Choosing the model tier for delegated work

For delegated bulk-summarization work, use **the fastest, most lightweight modern model tier available on the platform you're running on**. Specific lightweight tiers across major platforms:
- Claude -> Haiku (e.g., `model: haiku` or platform-equivalent)
- Gemini -> Flash (or platform-equivalent fast tier)
- GPT family -> GPT-mini / fast tier
- Cursor -> Composer 2 or equivalent modern fast tier
- Other -> whichever fast, lightweight tier the host exposes

**Why a faster tier for delegated work.** Bulk extractive summarization producing structured output is well-matched to smaller models - the task is well-defined and doesn't need the orchestrator's full reasoning depth. The orchestrator (you) stays on a more capable tier for cross-correlating inference, hypothesis evaluation, and output template assembly. Delegating to a faster tier also speeds up an investigation that delegates several times.

**If the host doesn't support per-subagent model selection,** delegation falls back to single-tier (orchestrator's tier). Correct, just slower than delegating to a lighter tier. If the host doesn't support subagents at all, the orchestrator does the work in-context. Uses more of the orchestrator's context but doesn't break the investigation.

---

## Subagent: `sparklogs-log-summarizer`

**Purpose.** Read a large set of raw log events (typically Level-1 or Level-2 events from a `query_logs` cache) and return a structured summary the orchestrator can use without reading the raw events itself.

**Model tier:** fast, lightweight tier per the platform you're running on.

**Inputs the orchestrator passes:**
- The `query_id` and `query_url` of a cached query.
- A focusing question: "what unusual events happened in this set?", "which patterns dominate?", "are there any errors I should know about?"
- An output schema: structured fields the subagent fills.

**Output schema:**
```yaml
findings:
  - timestamp_utc: <ISO>
    kind: <inventory | monitor | delta | agent_op | config_change | malformed>
    severity: <ok | warning | error | critical>
    pattern_hash: <if applicable>
    summary: <one-sentence factual statement>
    evidence_query_url: <the query_url passed in, optionally with a refinement param>
patterns_observed:
  - pattern_hash: <hash>
    pattern_text: <if known>
    count: <int>
notable_observations:
  - <text>
events_examined: <count>
events_summarized: <count>
```

**The `severity` field is a four-bucket summary, and it is lossy on purpose.** SparkLogs severity is
a twelve-rung ladder; this schema collapses it so an orchestrator can scan many findings at once. Map
it this way, and keep the exact returned value in `summary` whenever the rung matters:

| Bucket | Ladder rungs |
|---|---|
| `ok` | Trace, Debug, Verbose, Info, Display, Notice |
| `warning` | Warning, Minor |
| `error` | Error, Serious, Severe |
| `critical` | Critical, Fatal (severity >= 20) |

The lossy edge worth knowing: `Severe` and `Error` both land in `error`, and `Severe` is
availability-threatening while `Error` is bounded in scope. If a finding turns on that difference,
name the rung in `summary` rather than leaving the bucket to carry it. `critical` is the one bucket
with a contract attached: it means fetch-first, whatever the ticket was about.

**The orchestrator uses the structured output as evidence in Findings, citing the same query_urls.** The orchestrator never receives the raw events back - only the summary.

**Delegation heuristic:** if a step would require reading >500 raw events whose content the final summary won't need, delegate. If the step's likely output is a large volume of intermediate data the orchestrator doesn't need to see directly, delegate.

---

## Subagent: `sparklogs-pattern-enumerator`

**Purpose.** Given a `query_event_counts_by_severity` result with many groups, summarize the top N pattern_hashes with their meanings (looking up pattern text via a `query_logs` message projection filtered to the `pattern_hash` if needed) and produce a structured enumeration the orchestrator can use as Findings input.

**Model tier:** fast, lightweight tier.

**Inputs:**
- The `query_id` and `query_url` of the `query_event_counts_by_severity` result.
- Top N parameter (default 10).

**Output schema:**
```yaml
top_patterns:
  - pattern_hash: <hash>
    pattern_text: <from a query_logs message projection filtered to the pattern_hash>
    count: <int>
    likely_meaning: <if matches a catalog entry, the catalog meaning; else null>
    catalog_match: <pattern_catalog.md entry name or null>
```

**Delegation heuristic:** when `query_event_counts_by_severity` returns 50+ groups and you need the top N enumerated with meanings.

---

## Subagent: `sparklogs-cluster-interpreter`

**Not usable yet.** This subagent depends on `cluster_event_contexts`, which does not exist. Approximate clustering with a `query_logs` slice narrowed to the pattern plus `refine_query_result` group_by over the surrounding context fields.

**Purpose.** Given a `cluster_event_contexts` result with multiple distinct clusters, interpret each cluster's representative_surround and produce a structured human-readable description.

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
    catalog_matches: <pattern_catalog.md matches for the surround patterns>
```

**Delegation heuristic:** when cluster_event_contexts returns 4+ clusters with non-trivial pattern_hash sets in surrounds.

---

## Tasks NOT to delegate (stay on orchestrator)

- **Cross-correlating inference.** "Does Finding X explain Finding Y?" - orchestrator's job.
- **Anomaly judgment requiring domain knowledge.** "Is this anomaly meaningful in this investigation context?" - orchestrator's job.
- **Hypothesis evaluation.** "Does the evidence support hypothesis H?" - orchestrator's job (and `/sparklogs:analyze-cause`'s job for cause hypotheses).
- **Output template assembly.** Orchestrator assembles Findings, Executive Summary, What Was Not Checked.
- **Citation discipline.** Orchestrator owns ensuring every Finding cites a query_url; subagents pass through the URL but don't author the Findings.

---

## Host-specific notes

### Claude

Subagent definitions live in the plugin's `subagents/` directory. The orchestrator delegates by name: `Task(subagent_type="sparklogs-log-summarizer", prompt="...")`. Model tier is in the subagent definition's frontmatter.

### Codex / Gemini CLI / Cursor / Copilot Studio

Varying support. The skill expresses delegation *intent* - "this work is bulk extractive summarization, suitable for a faster tier where supported" - and the host fulfills with whatever it has. In hosts without per-subagent model selection, delegation falls back to single-tier (orchestrator's tier), which is correct but loses the speed benefit. In hosts without subagent support at all, the orchestrator does the work in-context.
