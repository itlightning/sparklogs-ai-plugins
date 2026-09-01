# Scope Resolution and Source Discovery

The first step of any investigation.
Resolve which org, senders, sources, and time window the investigation covers, then confirm those sources have trustworthy data in that window.
Done well, this prevents wrong scope, wrong source, wrong time window, and silence read as health when an agent was not collecting.

The MCP server instructions define every term used here, in learning order. This file adds the investigation discipline over them rather than restating them.

---

## Vocabulary: sender vs origin

Every log event carries two distinct identity fields:

- **`agent_id` (LQL)** (sender): the UUID of the SparkLogs Agent or ingest key that shipped the event. Filter with `agent_id = "<uuid>"` in LQL when you mean "everything this sender shipped," regardless of how the origin host is labeled.
- **`source` (LQL)** (origin): the hostname or device label the event is about. Under on-host agent collection, sender and origin usually match. Relay, syslog, and key-ingested data can diverge: one sender, many origins, or origin labels that do not match the sender name.

**"Collector" means one thing only:** the log-shipping process on the device that the agent supervises. It is not a synonym for the sender and not a synonym for the agent.

**Public row kinds from `resolve_scope`:** `org`, `agent` (a registered SparkLogs Agent), `ingest_key` (API ingest credential; never call it an agent in reports).
Ingest keys participate in name matching and appear when `include_agents` (arg) is true (default). That parameter means "include agents and ingest keys," not agents alone.

**Correlation ids.** Org and agent rows carry `rmm_client_id` (arg) and `psa_client_id` (arg), read live. In an automated workflow (per-ticket automation), pass one: it is an EXACT lookup that returns the single org holding that id, or nothing, and never falls back to name matching. An absent correlation id means the org holds no such id.

---

## Scope resolution sequence

Approach in order of preference; stop at the first step that gives an unambiguous result.

### Step 1: Parse the engineer's message for an explicit ID

If the message includes a customer ID, org ID, agent UUID, or workspace identifier (e.g. "ACME-DENT", "client_id=42", a full UUID), pass it as `org_ids` (arg) when it is already a UUID you recognize, or as the `query` (arg) substring otherwise:

```
resolve_scope(
  query: "<extracted ID or name>",
  external_investigation_id: "<id>"
)
```

If `resolve_scope` returns a single row with `match_kind` (col) **`exact`**, proceed with that scope.

### Step 2: Host-first path

When the engineer names a **host or device** ("srv-fileshare01", "WORKSTATION-42") rather than a customer org, pass that string as `query` (arg).
The server matches against SparkLogs Agent **`name` (col)** and **`reported_hostname` (col)** across all authorized orgs and can back into the org scope from the matching agent row.

If one agent row wins with `match_kind` (col) **`exact`**, proceed.
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

### Step 4: Ranked name matching (`match_kind` (col))

When `query` (arg) is non-empty, the server ranks matches deterministically. There are **no numeric confidence scores.**

| `match_kind` (col) | Meaning |
|---|---|
| `exact` | Case-insensitive full-string match |
| `prefix` | Field starts with the query |
| `word` | Query matches a whole word in the field |
| `substring` | Query appears anywhere in the field |

Ranking order: **`exact` > `prefix` > `word` > `substring`**, with org rows before agent and ingest-key rows at the same tier.
When `query` (arg) is omitted, the tool lists everything in scope (unranked).

### Step 5: If multiple ambiguous matches, ask the engineer

Ask when identity is fuzzy. Do not guess.

- One exact org plus many agent rows is the inventory of that client, not an ambiguous match. Keep them when the question is about that org or the fleet.
- Several **org** rows at the same best `match_kind` (col), or several **host** rows when the question named a device (no clear winner): **ask which org or which device**.

Example:
> "I found two organizations that could match 'Acme': Acme Dental (acme-dental) and Acme Manufacturing (acme-mfg). Which one are you investigating?"

If the host supports MCP elicitation, use it to pause for clarification.
Otherwise return the candidate list and wait for their pick.

### Step 6: If no matches, surface closest candidates

If `resolve_scope` returns zero rows for a non-empty `query` (arg), surface the closest names the engineer might have meant and ask:

> "I don't see an organization or host that exactly matches 'Acme Demtal'. Closest names: Acme Dental, Acme Demolition, Acme Construction. Did you mean one of these, or can you provide the customer ID directly?"

### Step 7: If one match but weak `match_kind` (col), confirm

If the only match is `prefix`, `word`, or `substring` (not `exact`), **confirm with the engineer before proceeding.**

Example:
> "The closest match for 'Acme' is Acme Dental (acme-dental). Is that the right organization?"

### Step 8: Read the state readings on agent rows

Agent rows carry two SEPARATE readings plus a collection group: is the agent there (`agent_status` (col)), and is it collecting (`collection_status` (col)). Never merge them into one statement: a powered-off machine can be offline with a healthy last-reported collection state.

- **`agent_status` (col)** is where the device stands, and each value is a whole answer: `online`, `offline`, `never_seen` (enrolled, nothing ever arrived), `stopped`, `system_shutdown`, `uninstalled`, `upgrading_overdue` (an update that has not come back), `deleted`. `offline` means NO SIGNAL RECEIVED and the cause is unknown; a device that announced it was stopping reads as what it announced instead.
- **The arrival stamps** behind that reading: **`last_data_at` (col)** (when log data last arrived, so legitimately old on a quiet, healthy machine) and **`last_heartbeat_at` (col)** (when the agent last checked in, about every five minutes).
- **`stuck_reason` (col)** says why an enrolled agent is not collecting (`pack_missing`, `pack_requires_newer_agent`, `collector_down`, `collector_flapping`, `config_apply_stuck`, `feeds_inactive`). Render an unfamiliar value as the raw string.
- **The collection group** is what the device last reported about its own log gathering, rolled up across its data feeds: `collection_status` (col) (`healthy`, `behind`, `onboarding`, `degraded`, `unknown`) with `collection_reasons` (col) (each glossed), `collection_feeds` (col) (counts) and `collection_observed_at` (col). `unknown` and absent stay unknown (do not imply healthy from absence). On an offline device the group is LAST REPORTED, from before contact ended: keep it, say when it is from, never blank it.
- **`agent_complete_through` (col)** is the instant up to which this agent's data is complete. See the completeness section below.
- **`advisories` (col)** are hints about what would improve data collection, not demands. Use them rather than inventing triage, so every SparkLogs surface tells the engineer the same thing. Empty means nothing to note.
- A device with no sign of life on any stamp for 14 days is annotated **inactive since a date**. Leave it out of today's triage unless the question is about it.

Ingest-key rows are slimmer. A key is a credential with no installed agent, so it has no heartbeat, no data feeds and no collection group; read `last_data_at` (col) for freshness and stop there. Absence of feed information on an ingest-key stream is a difference in KIND, not a defect: a key tells you what arrived, an agent also tells you what is supposed to arrive. Do not apply running/stuck/offline vocabulary to a key.

Filter devices with **`device_classes` (arg)** and **`device_roles` (arg)** rather than guessing from hostnames: a workstation named `srv-laptop` is how a hostname guess puts the wrong device in a server answer. Both vocabularies are open, so treat an unfamiliar value as the device's own word for itself, and a device with no reported class matches no `device_classes` (arg) filter.

Use these readings in the cross-check below; do not treat a silent source as healthy when the agent row says it was not collecting.

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

If the engineer scopes to one sub-org only, set `org_ids` (arg) to that sub-org.
Keep `include_sub_orgs` (arg) true unless they explicitly want a single node with no descendants.

### Step 10: Scope can expand during the investigation

Scope is not fixed at the start.
Fleet pivots, new hosts, or engineer redirects update scope but **keep the same `external_investigation_id` (arg)**.
Note scope changes in the EXECUTIVE SUMMARY.

---

## Source discovery with `list_sources`

After resolving scope, confirm the source(s) of interest have data in the investigation window.

Use the investigation's actual **`start` (arg)** / **`end` (arg)** (RFC3339 UTC).
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

Each row is one **(sender, source)** pair in the window:

| Field | Role |
|---|---|
| `agent_id` (LQL) | Sender UUID (LQL filter handle) |
| `sent_via` (col) | How the stream was authorized to ingest: `agent`, `ingest_key`, or `unresolved` (UUID in events but not visible in this token's fleet directory). A key is how a stream arrived, never what collected it |
| `name` (col), `agent_status` (col) | Present when the sender resolves; empty for `unresolved` |
| `source` (LQL) | Origin host label |
| `event_count` (col), `bytes_ingested` | Volume in the window |
| `cnt_interesting` (col), `distinct_interesting` (col) | Triage: how much is going on here |
| `cnt_warning` (col) .. `cnt_severe` (col) | One count per failure-side band, 13 through 19 (the ladder is in `category-classes.md`) |
| `cnt_critical_plus` (col) | Severity 20 and above. Rare, and fetch-first whatever the ticket was about |
| `first_event_at` (col), `last_event_at` (col) | Exact window bounds for this pair |

The summary may include **`top_interesting_patterns` (col)**: a short ranked teaser (~8 entries) of high-signal patterns in scope.
Teaser rows are previews only. **Before citing any pattern in a Finding, call `describe_pattern(pattern_hashes=[...])`** for full pattern text, stats, fleet spread, and diverse example messages with recurrence.
The tool response includes a hint when the teaser is present.

### Decision logic

- **Relevant `(agent_id, source)` row with events in the window** -> proceed.
- **Row present but sparse** (`event_count` (col) very low, or `cnt_interesting` (col) near zero while you expected signal) -> proceed but flag in WHAT WAS NOT CHECKED: limited telemetry may make findings incomplete.
- **No row for the expected source in the window** -> cross-check the agent row's readings (next section) before concluding "no problem."
- **`sent_via: unresolved`** -> the UUID appears in authorized event data but is not in the fleet directory for this token. Treat as out-of-scope or deleted; do not invent a name.

---

## Completeness: what `agent_complete_through` (col) says

`agent_complete_through` (col) is the instant up to which this agent's data is COMPLETE in SparkLogs. It is the floor (earliest) across the agent's active data feeds, so one lagging feed sets the whole value.

`"unknown"` means no claim is possible. It is NEVER a fault, and it never means there is no data. Ingest-key rows are always `"unknown"`, because a key makes no completeness claim at all.

When a feed is behind, stuck or blocked, an advisory explains the lag and carries the SCOPE: it names the blocking feed and counts the rest ("the other N active feeds are current and unaffected"). Read that scope before you qualify a finding.

**The green case is one sentence.** When `agent_complete_through` (col) reaches the end of your window and advisories are empty, say so once ("data is complete through <instant>") and move on.

**Three rules models get wrong. They are hard rules.**

1. **Event volume and first/last event bounds NEVER establish interior coverage.** Only a feed's own report does. A count and two endpoints are consistent with any amount of missing middle, so never write "no gaps", "continuous coverage" or "the data is complete" from `event_count` (col), `first_event_at` (col) and `last_event_at` (col).
2. **An ongoing-issue investigation needs NO completeness statement.** Recurring failures and live RCA are carried by the events in front of you. When completeness is not material to the question, one sentence saying so is the correct amount.
3. **Absence of a feed report is never evidence about the data.** An ingest-key stream makes no completeness claim, a feed that has not reported is `unknown` rather than healthy, and absence of events is not evidence of absence.

---

## Missed events

Collection sometimes has to skip over events because the underlying collection engine could not provide them; in v1 that engine is the Windows event log itself. Call this **missed events** or **skipped events**, bounded by a **skip window**. It is a limitation of collection, never a fault of the machine or the operator, and the tone is measured: a skip is a notice, not an incident.

- State what happened and its bounds, then stop. The events may still exist in the device's local Windows event log; SparkLogs does not re-collect them, so never offer or imply recovery.
- The cause slug decides whether a count is exact. `skip_record` is exactly one event. `+1s` through `+30m` are an unknown count inside a window whose width the slug names. `future_only` is everything from the last event sent up to the new subscription. Render an unfamiliar slug verbatim and state the window bounds.
- **An ABSENT skips entry means the source type does not detect skips at all**, never that none occurred. Today only Windows event log feeds detect them.
- **Skips are orthogonal to feed health.** A current, advancing feed can carry a skip window. Freshness never disproves a skip, and a skip never means the feed is unhealthy now.
- Never write "gap", "data loss" or "lost" for this. A delayed feed is `behind` or `stuck`, which is a different thing from skipped.

---

## State cross-check (halt rules)

Cross-reference the agent row's readings with **`list_sources` presence** before deep queries. They describe different things and can legitimately disagree; never resolve a disagreement by silently believing one side.

| Situation | Action |
|---|---|
| `stuck_reason` (col) present or `agent_status: offline`, and no (or negligible) events in the window for that sender | **HALT.** Absence of logs is a finding about collection, not proof the endpoint is healthy. Tell the engineer no telemetry arrived, and what the agent row says about why it might not have. |
| The agent is reporting normally (or an ingest key is fresh), but no events for the expected `source` (LQL) in the window | HALT and ask: wrong source name, wrong window, or origin labeled differently? Surface similar `source` (LQL) values from the response. |
| Events present while `agent_status` (col) is `offline` | **Normal, not a contradiction.** The data is valid evidence for what arrived. Record the disagreement in WHAT WAS NOT CHECKED as a disagreement ("no agent signal was received during the window while events continued to arrive; the agent-side state was not established"), and do not downgrade the data for it. |
| Relay / key ingest: one `agent_id` (LQL), many `source` (LQL) values | Expected. Scope with `agent_id` (LQL) for the sender and `source` (LQL) for the origin host. |

Do not filter `list_sources` by "reporting now" when the engineer asked about a past incident.

---

## Sender-first LQL scoping

After scope resolution, prefer **`agent_id` (LQL)** filters when the question is about everything one sender shipped:

```
query_event_counts_by_severity(
  org_ids: [...],
  lql: 'agent_id = "<uuid from resolve_scope or list_sources>"',
  group_by: ["pattern"],
  ...
)
```

Use **`source = "hostname"`** when the question is about the origin host label, or combine both when you need on-host events from one agent:

```
lql: 'agent_id = "<uuid>" AND source = "<hostname>"'
```

Ingest-key-shipped events use the ingest key's UUID as `agent_id` (LQL); filter the same way.
For fleet-wide origin pivots, group by `source` (LQL) or filter `source` (LQL) directly.

---

## Structure discovery vs filtered measure

Two different tools answer "what exists" vs "how much in this slice":

- **`query_scope_activity`** (cheap discovery scan): discover app / service / subsource structure in the org and window. Optional narrowing via `agent_ids` (arg), `source` (LQL) substring, or `field_match` (arg). Not LQL-filtered. See `scope-ladder.md`.
- **`query_event_counts_by_severity`** (billed backing scan): count and rank within an **LQL-filtered** population (severity, time sub-slice, `pattern_hash` (LQL), etc.).

Use `query_scope_activity` to see what dimensions exist; use `query_event_counts_by_severity` to measure within a hypothesis-specific filter.

---

## Time window resolution

If the engineer specifies a window ("last 24 hours", "yesterday afternoon", "since Tuesday"), convert to absolute UTC and bind the investigation to those timestamps.

If the message implies a window without naming one ("the user reported this morning"), infer a reasonable default and confirm:
> "I'm assuming the past 12 hours. Want a different window?"

If there is no time context, default to the last 24 hours and note that in SCOPE CHECKED.

If timezone is unclear, **ask**; do not assume.

---

## Common scope-resolution mistakes

**Guessing instead of asking.** Multiple rows at the same `match_kind` (col) -> disambiguate. Silent wrong-client investigation is worse than one clarifying question.

**Trusting fuzzy or confidence language.** The server emits ranked `match_kind` (col) only. Do not invent scores or "high confidence" from match quality.

**Filtering by recent heartbeat for historical work.** Use `list_sources` with the investigation window, not "is it online now?"

**Conflating sender and origin.** Relay and ingest-key paths need both `agent_id` (LQL) and `source` (LQL) in vocabulary and LQL.

**Citing teaser patterns without `describe_pattern`.** Teaser previews are not evidence-grade pattern text.

**Forgetting sub-orgs.** Default `include_sub_orgs: true` unless the engineer scopes narrower.

**New `external_investigation_id` (arg) on scope expansion.** Same investigation, same id.

**Not flagging sparse data.** A source with a handful of events is in scope but may not support strong findings. Say so in WHAT WAS NOT CHECKED.

**Treating silence from a stuck or offline agent as a clean bill of health.** Cross-check the agent row's readings before "no evidence found."

**Claiming coverage from counts.** `event_count` (col) with `first_event_at` (col) and `last_event_at` (col) says nothing about the middle of the window. Completeness comes from `agent_complete_through` (col) and the feed reports behind it, or it is not claimed.

**Writing a completeness paragraph nobody asked for.** On an ongoing-issue investigation, one sentence saying completeness is not material is the correct amount.
