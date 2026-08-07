# Scope Resolution and Source Discovery

The first step of any investigation.
Resolve which org, collectors, sources, and time window the investigation covers, then confirm those sources have trustworthy data in that window.
Done well, this prevents wrong scope, wrong source, wrong time window, and silent gaps from stuck or offline collectors.

---

## Vocabulary: collector vs origin

Every log event carries two distinct identity fields:

- **`agent_id`** (collector): the UUID of the credential that shipped the event. Managed agents, legacy unmanaged agents, and ingest keys each have one. Filter with `agent_id = "<uuid>"` in LQL when you mean "everything this collector sent," regardless of how the origin host is labeled.
- **`source`** (origin): the hostname or device label the event is about. On-host managed collection, collector and origin usually match. Relay, syslog, and key-ingested data can diverge: one collector, many origins, or origin labels that do not match the collector name.

**Public row kinds from `resolve_scope`:** `org`, `agent` (managed agent only), `ingest_key` (API ingest credential; never call it an agent in reports).
Ingest keys participate in name matching and appear when `include_agents` is true (default). That parameter means "include agents and ingest keys," not managed agents alone.

---

## Scope resolution sequence

Approach in order of preference; stop at the first step that gives an unambiguous result.

### Step 1: Parse the engineer's message for an explicit ID

If the message includes a customer ID, org ID, agent UUID, or workspace identifier (e.g. "ACME-DENT", "client_id=42", a full UUID), pass it as `org_ids` when it is already a UUID you recognize, or as the `query` substring otherwise:

```
resolve_scope(
  query: "<extracted ID or name>",
  external_investigation_id: "<id>"
)
```

If `resolve_scope` returns a single row with `match_kind` **`exact`**, proceed with that scope.

### Step 2: Host-first path

When the engineer names a **host or device** ("srv-fileshare01", "WORKSTATION-42") rather than a customer org, pass that string as `query`.
The server matches against managed agent **`name`** and **`reported_hostname`** across all authorized orgs and can back into the org scope from the matching agent row.

If one agent row wins with `match_kind` **`exact`**, proceed.
If several agents share similar names across orgs, ask which org or site the engineer means.

### Step 3: Org name match

If no host match, try the org or customer name verbatim:

```
resolve_scope(
  query: "Acme Dental",
  external_investigation_id: "<id>"
)
```

Org names use the same ranked matching as agents (see **match_kind** below).

### Step 4: Ranked name matching (`match_kind`)

When `query` is non-empty, the server ranks matches deterministically. There are **no numeric confidence scores.**

| `match_kind` | Meaning |
|---|---|
| `exact` | Case-insensitive full-string match |
| `prefix` | Field starts with the query |
| `word` | Query matches a whole word in the field |
| `substring` | Query appears anywhere in the field |

Ranking order: **`exact` > `prefix` > `word` > `substring`**, with org rows before agent and ingest-key rows at the same tier.
When `query` is omitted, the tool lists everything in scope (unranked).

### Step 5: If multiple ambiguous matches, ask the engineer

If several rows share the best `match_kind` (no clear winner), **ask the engineer to disambiguate. Don't guess.**

Example:
> "I found two organizations that could match 'Acme': Acme Dental (acme-dental) and Acme Manufacturing (acme-mfg). Which one are you investigating?"

If the host supports MCP elicitation, use it to pause for clarification.
Otherwise return the candidate list and wait for their pick.

### Step 6: If no matches, surface closest candidates

If `resolve_scope` returns zero rows for a non-empty `query`, surface the closest names the engineer might have meant and ask:

> "I don't see an organization or host that exactly matches 'Acme Demtal'. Closest names: Acme Dental, Acme Demolition, Acme Construction. Did you mean one of these, or can you provide the customer ID directly?"

### Step 7: If one match but weak `match_kind`, confirm

If the only match is `prefix`, `word`, or `substring` (not `exact`), **confirm with the engineer before proceeding.**

Example:
> "The closest match for 'Acme' is Acme Dental (acme-dental). Is that the right organization?"

### Step 8: Read health verdicts on agent rows

Managed agent rows include a server-computed **`verdict`**: `running`, `offline`, `stuck`, `stopped`, `unregistered`, `unmanaged`, plus raw fields (`status`, `last_seen_at`, `stuck_reason`, versions, OS, `reported_hostname`, RMM name, description) when present.

Ingest-key rows are slimmer: `verdict` is freshness only (`active`, `idle`, `never` from `last_seen_at`).
Ingest keys do not heartbeat; do not apply running/stuck/offline vocabulary to them.

Use verdicts in the cross-check below; do not treat a silent source as healthy when its collector is stuck or offline.

### Step 9: Sub-org expansion

When a single org is identified, by default include all sub-orgs underneath it.
Pass `include_sub_orgs: true` (default) on org-scoped MCP calls so the server expands the tree:

```
list_sources(
  org_ids: [<resolved org>],
  include_sub_orgs: true,
  start: "<investigation start, RFC3339 UTC>",
  end: "<investigation end, RFC3339 UTC>",
  external_investigation_id: "<id>"
)
```

If the engineer scopes to one sub-org only, set `org_ids` to that sub-org.
Keep `include_sub_orgs` true unless they explicitly want a single node with no descendants.

### Step 10: Scope can expand during the investigation

Scope is not fixed at the start.
Fleet pivots, new hosts, or engineer redirects update scope but **keep the same `external_investigation_id`**.
Note scope changes in the EXECUTIVE SUMMARY.

---

## Source discovery with `list_sources`

After resolving scope, confirm the source(s) of interest have data in the investigation window.

Use the investigation's actual **`start`** / **`end`** (RFC3339 UTC).
Do **not** infer scope from recent heartbeat alone; historical windows need historical event presence.

```
list_sources(
  org_ids: [<from resolve_scope>],
  include_sub_orgs: true,
  start: "<investigation start, RFC3339 UTC>",
  end: "<investigation end, RFC3339 UTC>",
  include_top_interesting_patterns: true,
  external_investigation_id: "<id>"
)
```

### Per-row fields (shipped)

Each row is one **(collector, origin)** pair in the window:

| Field | Role |
|---|---|
| `agent_id` | Collector UUID (LQL filter handle) |
| `collector_kind` | `agent`, `ingest_key`, or `unresolved` (UUID in events but not visible in this token's fleet directory) |
| `name`, `verdict` | Present when the collector resolves; empty for `unresolved` |
| `source` | Origin host label |
| `event_count`, `bytes_ingested` | Volume in the window |
| `cnt_interesting`, `distinct_interesting` | Triage: how much is going on here |
| `cnt_warn_error` | Severity 13-19: warning, minor, error, serious, severe |
| `cnt_critical_plus` | Severity >= 20: critical, fatal and above. Rare, and fetch-first whatever the ticket was about |
| `first_event_at`, `last_event_at` | Exact window bounds for this pair |

The summary may include **`top_interesting_patterns`**: a short ranked teaser (~8 entries) of high-signal patterns in scope.
Teaser rows are previews only. **Before citing any pattern in a Finding, call `describe_pattern(pattern_hashes=[...])`** for full pattern text, stats, fleet spread, and optional sample messages.
The tool response includes a hint when the teaser is present.

### Decision logic

- **Relevant `(agent_id, source)` row with events in the window** -> proceed.
- **Row present but sparse** (`event_count` very low, or `cnt_interesting` near zero while you expected signal) -> proceed but flag in WHAT WAS NOT CHECKED: limited telemetry may make findings incomplete.
- **No row for the expected source in the window** -> cross-check verdict (next section) before concluding "no problem."
- **`collector_kind: unresolved`** -> the UUID appears in authorized event data but is not in the fleet directory for this token. Treat as out-of-scope or deleted collector; do not invent a name.

---

## Health verdict cross-check (halt rules)

Cross-reference **`resolve_scope` verdicts** with **`list_sources` presence** before deep queries.

| Situation | Action |
|---|---|
| Collector **`stuck`** or **`offline`**, and no (or negligible) events in the window for that `agent_id` | **HALT.** Absence of logs is a finding about the collector, not proof the endpoint is healthy. Tell the engineer the agent appears stuck/offline and telemetry may be missing for that reason. |
| Collector **`running`** (or ingest key **`active`**), but no events for the expected `source` in the window | HALT and ask: wrong source name, wrong window, or origin labeled differently? Surface similar `source` values from the response. |
| Events present despite **`offline`** / **`idle`** verdict | Data in the window is still valid evidence; note the collector state in WHAT WAS NOT CHECKED (telemetry may stop after `last_event_at`). |
| Relay / key ingest: one `agent_id`, many `source` values | Expected. Scope with `agent_id` for the collector and `source` for the origin host. |

Do not filter `list_sources` by "reporting now" when the engineer asked about a past incident.

---

## Collector-first LQL scoping

After scope resolution, prefer **`agent_id`** filters for collector-backed investigation:

```
query_grouped_aggregation(
  org_ids: [...],
  lql: 'agent_id = "<uuid from resolve_scope or list_sources>"',
  group_field: "pattern",
  ...
)
```

Use **`source = "hostname"`** when the question is about the origin host label, or combine both when you need on-host events from one managed collector:

```
lql: 'agent_id = "<uuid>" AND source = "<hostname>"'
```

Ingest-key-shipped events use the ingest key's UUID as `agent_id`; filter the same way.
For fleet-wide origin pivots, group by `source` or filter `source` directly.

---

## Structure discovery vs filtered measure

Two different tools answer "what exists" vs "how much in this slice":

- **`list_scope_ladder`** (cheap discovery scan): discover app / service / subsource structure in the org and window. Optional narrowing via `agent_ids`, `source` substring, or `field_match`. Not LQL-filtered. See `scope-ladder.md`.
- **`query_grouped_aggregation`** (billed backing scan): count and rank within an **LQL-filtered** population (severity, time sub-slice, `pattern_hash`, etc.).

Use the ladder tool to see what dimensions exist; use grouped aggregation to measure within a hypothesis-specific filter.

---

## Time window resolution

If the engineer specifies a window ("last 24 hours", "yesterday afternoon", "since Tuesday"), convert to absolute UTC and bind the investigation to those timestamps.

If the message implies a window without naming one ("the user reported this morning"), infer a reasonable default and confirm:
> "I'm assuming the past 12 hours. Want a different window?"

If there is no time context, default to the last 24 hours and note that in SCOPE CHECKED.

If timezone is unclear, **ask**; do not assume.

---

## Common scope-resolution mistakes

**Guessing instead of asking.** Multiple rows at the same `match_kind` -> disambiguate. Silent wrong-client investigation is worse than one clarifying question.

**Trusting fuzzy or confidence language.** The server emits ranked `match_kind` only. Do not invent scores or "high confidence" from match quality.

**Filtering by recent heartbeat for historical work.** Use `list_sources` with the investigation window, not "is it online now?"

**Conflating collector and origin.** Relay and ingest-key paths need both `agent_id` and `source` in vocabulary and LQL.

**Citing teaser patterns without `describe_pattern`.** Teaser previews are not evidence-grade pattern text.

**Forgetting sub-orgs.** Default `include_sub_orgs: true` unless the engineer scopes narrower.

**New `external_investigation_id` on scope expansion.** Same investigation, same id.

**Not flagging sparse data.** A source with a handful of events is in scope but may not support strong findings. Say so in WHAT WAS NOT CHECKED.

**Treating stuck/offline silence as a clean bill of health.** Cross-check verdict before "no evidence found."
