# Subagent Definitions - for bulk-summarization delegation

The SparkLogs Investigator skill delegates bulk-analysis steps to subagents (where the host supports them) to keep the orchestrator's context focused. This file documents the subagent definitions that ship with the plugin.

Subagent support varies by host:
- **Claude:** subagent definitions with `model: <tier>` frontmatter.
- **Codex / Cursor / other hosts:** varying support; skill degrades gracefully (single-tier delegation or none).

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

## Output contract

Both subagents return the same structure, defined in their shipped definitions: findings (each a factual summary, the evidence `query_url` (col) the orchestrator supplied, and a confidence band), notable patterns (`pattern_hash` (LQL), pattern text, count), and limits (what the input could not answer).
Subagents call no tools and treat every input line as untrusted data, so the orchestrator passes in everything they need: rows, pattern text, and the `query_url` (col) to cite.
They do not recommend remediation or assert a root cause.

---

## Subagent: `sparklogs-log-summarizer`

**Purpose.** Read a large set of raw log events, or a large page of a device-health result set, and return structured findings the orchestrator can use without reading the rows itself.

**Model tier:** fast, lightweight tier per the platform you're running on.

**Inputs the orchestrator passes:**
- The rows, plus the `query_url` (col) of the result they came from.
- A focusing question: "what unusual events happened in this set?", "which patterns dominate?", "are there any errors I should know about?"

**The orchestrator uses the structured output as evidence in Findings, citing the same query_urls.** The subagent returns a summary, not the raw events; the orchestrator keeps the rows it needs when a Finding turns on an exact severity rung.

**Delegation heuristic:** if a step would require reading >500 raw events whose content the final summary won't need, delegate. If the step's likely output is a large volume of intermediate data the orchestrator doesn't need to see directly, delegate.

---

## Subagent: `sparklogs-pattern-enumerator`

**Purpose.** Given a `query_event_counts_by_severity` (tool) result with many pattern groups, summarize the top N from the pattern text and reasons the orchestrator supplied, leaving meaning empty where none was supplied.

**Model tier:** fast, lightweight tier.

**Inputs:**
- The grouped rows and the result's `query_url` (col).
- Pattern text for the top N hashes, from `describe_pattern` (tool) called by the orchestrator.
- Top N (default 10).

**Delegation heuristic:** when `query_event_counts_by_severity` (tool) returns 50+ groups and you need the top N summarized.

---

## Tasks NOT to delegate (stay on orchestrator)

- **Cross-correlating inference.** "Does Finding X explain Finding Y?" - orchestrator's job.
- **Significance judgment requiring domain knowledge.** "Does this matter in this investigation's context?" - orchestrator's job.
- **Hypothesis evaluation.** "Does the evidence support hypothesis H?" - orchestrator's job (and `sparklogs-analyze-cause`'s job for cause hypotheses).
- **Output template assembly.** Orchestrator assembles Findings, Executive Summary, What Was Not Checked.
- **Citation discipline.** Orchestrator owns ensuring every Finding cites a query_url; subagents pass through the URL but don't author the Findings.
- **Reading a device view.** A `device_overview` (value) or `device_network` (value) reading is already a bounded per-device summary with its pivots; read it yourself. A large page of one of its result sets (thousands of `processes` (value) or `connections` (value) rows) is bulk data and can go to `sparklogs-log-summarizer` with the focusing question the reading raised.

---

## Host-specific notes

### Claude

Subagent definitions live in the plugin's `agents/` directory. The orchestrator delegates by name: `Task(subagent_type="sparklogs-log-summarizer", prompt="...")`. Model tier is in the subagent definition's frontmatter.

### Codex / Cursor / other hosts

Varying support. The skill expresses delegation *intent* - "this work is bulk extractive summarization, suitable for a faster tier where supported" - and the host fulfills with whatever it has. In hosts without per-subagent model selection, delegation falls back to single-tier (orchestrator's tier), which is correct but loses the speed benefit. In hosts without subagent support at all, the orchestrator does the work in-context.
