# Scope Resolution and Source Discovery

The first step of any investigation.
Resolve which org, senders, sources, and time window the investigation covers, then confirm those sources have trustworthy data in that window.
Done well, this prevents wrong scope, wrong source, wrong time window, and silence read as health when an agent was not collecting.

The MCP server instructions define every term used here, in learning order. This file adds the investigation discipline over them rather than restating them.

---

## Vocabulary: sender vs origin

Every log event carries two distinct identity fields:

- **`agent_id` (LQL)** (sender): the UUID of the SparkLogs Agent or ingest key that shipped the event. Filter with `agent_id = "<uuid>"` (LQL) in LQL when you mean "everything this sender shipped," regardless of how the origin host is labeled.
- **`source` (LQL)** (origin): the hostname or device label the event is about. Under agent collection, sender and origin match. Ingest-key data can diverge: one key, many origins, or origin labels that do not match the key name.

**"Collector" means one thing only:** the log-shipping process on the device that the agent supervises. It is not a synonym for the sender and not a synonym for the agent.

**Public row kinds from `resolve_scope` (tool):** `org` (other), `agent` (value) (a registered SparkLogs Agent), `ingest_key` (value) (API ingest credential; never call it an agent in reports).
Ingest keys participate in name matching and appear when `include_agents` (arg) is true (default). That parameter means "include agents and ingest keys," not agents alone.

**Correlation ids.** Org and agent rows carry `rmm_client_id` (arg) and `psa_client_id` (arg), read live. In an automated workflow (per-ticket automation), pass one: it is an EXACT lookup that returns the single org holding that id, or nothing, and never falls back to name matching. An absent correlation id means the org holds no such id.

---

## Scope resolution sequence

Approach in order of preference; stop at the first step that gives an unambiguous result.

### Step 1: Parse the engineer's message for an explicit ID

If the message includes an org ID, agent UUID, or customer name or code (e.g. "ACME-DENT", a full UUID), pass it as `org_ids` (arg) when it is already a UUID you recognize, or as `query` (arg) otherwise. An RMM or PSA client id goes in `rmm_client_id` (arg) or `psa_client_id` (arg) (Correlation ids, above). Call `resolve_scope` (tool) with that value and the session `external_investigation_id` (arg).

If `resolve_scope` (tool) returns a single row with `match_kind` (col) **`exact` (value)**, proceed with that scope.

### Step 2: Host-first path

When the engineer names a **host or device** ("srv-fileshare01", "WORKSTATION-42") rather than a customer org, pass that string as `query` (arg).
The server matches against SparkLogs Agent **`name` (col)** and **`reported_hostname` (col)** across all authorized orgs and can back into the org scope from the matching agent row.

If one agent row wins with `match_kind` (col) **`exact` (value)**, proceed.
If several agents share similar names across orgs, ask which org or site the engineer means.

### Step 3: Org name match

If no host match, try the org or customer name verbatim via `query` (arg) on `resolve_scope` (tool).

Org names use the same ranked matching as agents (see **match_kind** below).

### Step 4: Ranked name matching (`match_kind` (col))

When `query` (arg) is non-empty, the server ranks matches deterministically. There are **no numeric confidence scores.**

| `match_kind` (col) | Meaning |
|---|---|
| `exact` (value) | Case-insensitive full-string match |
| `prefix` (value) | Field starts with the query |
| `word` (value) | Query matches a whole word in the field |
| `substring` (value) | Query appears anywhere in the field |

Ranking order: **`exact` (value) > `prefix` (value) > `word` (value) > `substring` (value)**, with org rows before agent and ingest-key rows at the same tier.
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

If `resolve_scope` (tool) returns zero rows for a non-empty `query` (arg), surface the closest names the engineer might have meant and ask:

> "I don't see an organization or host that exactly matches 'Acme Demtal'. Closest names: Acme Dental, Acme Demolition, Acme Construction. Did you mean one of these, or can you provide the customer ID directly?"

### Step 7: If one match but weak `match_kind` (col), confirm

If the only match is `prefix` (value), `word` (value), or `substring` (value) (not `exact` (value)), **confirm with the engineer before proceeding.**

Example:
> "The closest match for 'Acme' is Acme Dental (acme-dental). Is that the right organization?"

### Step 8: Read the state readings on agent rows

Agent rows carry `agent_status` (col), `stuck_reason` (col), the collection group (`collection_status` (col), `collection_reasons` (col), `collection_feeds` (col), `collection_observed_at` (col)), `agent_complete_through` (col), `advisories` (col), and `update_status` (col) with `update_failure_reason` (col) when an update failed.
The server instructions (IS THE AGENT ONLINE AND COLLECTING?) define each one: read them before writing about a device's state.
Keep `agent_status` (col) and `collection_status` (col) as two statements, and keep an offline device's last-reported collection group with the time it was reported.

For collection problems across a client, call `resolve_scope` (tool) with `unhealthy_collection_only` (arg) set: it lists only devices whose collection is neither healthy nor onboarding, worst first.
`summary.feed_health` (col) on `resolve_scope` (tool) and `list_sources` (tool) gives one line per device: how many feeds are current, and each feed that is not, with its reason and last event time.

Ingest-key rows have no heartbeat, no feeds and no collection group: read `last_data_at` (col) for freshness and stop there.

Filter devices with **`host_classes` (arg)** (today `workstation` (value) or `server` (value)) and **`host_roles` (arg)** (for example `domain_controller` (value)) rather than guessing from hostnames: a workstation named `srv-laptop` is how a hostname guess puts the wrong device in a server answer. A device that reported no class matches no `host_classes` (arg) filter.

Use these readings in the cross-check below; do not treat a silent source as healthy when the agent row says it was not collecting.

### Step 9: Sub-org expansion

A name matching one org returns that org's tree in `summary.query_scope` (col), every org listed by id. Pass it to the data tools, with the investigation `start` (arg)/`end` (arg) (RFC3339 UTC) and the session `external_investigation_id` (arg).

If the engineer scopes to one sub-org only, set `org_ids` (arg) to that sub-org.
Pass the `summary.query_scope` (col) that `resolve_scope` (tool) returned, unchanged: it already lists every org to query. Set `include_sub_orgs` (arg) yourself only when the engineer named a parent org and wants its descendants.

### Step 10: Scope can expand during the investigation

Scope is not fixed at the start.
Fleet pivots, new hosts, or engineer redirects update scope but **keep the same `external_investigation_id` (arg)**.
Note scope changes in the EXECUTIVE SUMMARY.

---

## Source discovery with `list_sources` (tool)

Before concluding anything from an absence, confirm the source(s) of interest sent data in the investigation window. For one device, the `resolve_scope` (tool) agent row (`last_data_at` (col), feed health) and the device view's coverage often answer this already.

Use the investigation's actual **`start` (arg)** / **`end` (arg)** (RFC3339 UTC).
Do **not** infer scope from recent heartbeat alone; historical windows need historical event presence.

Call `list_sources` (tool) with the `query_scope` (arg) from `resolve_scope` (tool), the investigation window, `include_top_interesting_patterns: true` (arg) when you want the teaser, and the session `external_investigation_id` (arg).

### Per-row fields (shipped)

Each row is one **(sender, source, `collector_source_kind` (col))** combination in the window:

| Field | Role |
|---|---|
| `agent_id` (LQL) | Sender UUID (LQL filter handle) |
| `sent_via` (col) | How the stream was authorized to ingest: `agent` (value), `ingest_key` (value), or `unresolved` (value) (UUID in events but not visible in this token's fleet directory). A key is how a stream arrived, never what collected it |
| `name` (col), `agent_status` (col) | Present when the sender resolves; empty for `unresolved` (value) |
| `source` (LQL) | Origin host label |
| `event_count` (col), `bytes_ingested` (col) | Volume in the window |
| `cnt_interesting` (col), `distinct_interesting` (col) | Triage: how much is going on here |
| `cnt_warning` (col) .. `cnt_severe` (col) | One count per failure-side band, 13 through 19 (the ladder is in `category-classes.md`) |
| `cnt_critical_plus` (col) | Severity 20 and above; fetch-first on curated data (`category-classes.md`) |
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

`agent_complete_through` (col) is absent when no claim is possible. That is never a fault, and it never means there is no data. Ingest-key rows never carry it, because a key makes no completeness claim at all.

When a feed is behind, stuck or blocked, an advisory explains the lag and carries the SCOPE: it names the blocking feed and counts the rest ("the other N active feeds are current and unaffected"). Read that scope before you qualify a finding.

**The green case is one sentence.** When `agent_complete_through` (col) reaches the end of your window and advisories are empty, say so once ("data is complete through <instant>") and move on.

**Three rules models get wrong. They are hard rules.**

1. **Event volume and first/last event bounds NEVER establish interior coverage.** Only a feed's own report does. A count and two endpoints are consistent with any amount of missing middle, so never write "no gaps", "continuous coverage" or "the data is complete" from `event_count` (col), `first_event_at` (col) and `last_event_at` (col).
2. **An ongoing-issue investigation needs NO completeness statement.** Recurring failures and live RCA are carried by the events in front of you. When completeness is not material to the question, one sentence saying so is the correct amount.
3. **Absence of a feed report is never evidence about the data.** An ingest-key stream makes no completeness claim, a feed that has not reported is `unknown` (value) rather than healthy, and absence of events is not evidence of absence.

---

## Missed events

Collection sometimes has to skip over events because the underlying collection engine could not provide them; today that engine is the Windows event log itself. Call this **missed events** or **skipped events**, bounded by a **skip window**. It is a limitation of collection, never a fault of the machine or the operator, and the tone is measured: a skip is a notice, not an incident.

- State what happened and its bounds, then stop. SparkLogs does not re-collect skipped events, so never offer or imply recovery.
- The skip rows are `sparklogs.kind = agent_op` (LQL) on `sparklogs.agent.vector` (value). `log_collection_skipped_to_recover` (value): the collector could not read from its saved position and stepped forward; the events may still be in the device's own log. `log_collection_skipped_records_overwritten` (value): Windows overwrote the records before they were read, so they are gone from the device too.
- `resume_rung` (other) says how far collection jumped: `skip_record` (value), `isolate_one` (value) and `boundary_tick` (value) are one record or moment; `+1s` (other) through `+30m` (other) a jump of that width; `future_only` (value) everything up to the new subscription. `missing_records` (other) carries the count when the collector reports it. Render an unfamiliar value verbatim and state the window bounds. Meaning of each: `feeds/sparklogs.agent.vector/reasons.md`.
- **An ABSENT skips entry means the source type does not detect skips at all**, never that none occurred. Today only Windows event log feeds detect them.
- **Skips are orthogonal to feed health.** A current, advancing feed can carry a skip window. Freshness never disproves a skip, and a skip never means the feed is unhealthy now.
- Never write "gap", "data loss" or "lost" for this. A delayed feed is `behind` (value) or `stuck` (value), which is a different thing from skipped.

---

## State cross-check (halt rules)

Cross-reference the agent row's readings with **`list_sources` (tool) presence** before deep queries. They describe different things and can legitimately disagree; never resolve a disagreement by silently believing one side.

| Situation | Action |
|---|---|
| `stuck_reason` (col) present or `agent_status: offline`, and no (or negligible) events in the window for that sender | **HALT.** Absence of logs is a finding about collection, not proof the endpoint is healthy. Tell the engineer no telemetry arrived, and what the agent row says about why it might not have. |
| The agent is reporting normally (or an ingest key is fresh), but no events for the expected `source` (LQL) in the window | HALT and ask: wrong source name, wrong window, or origin labeled differently? Surface similar `source` (LQL) values from the response. |
| Events present while `agent_status` (col) is `offline` (value) | **Normal, not a contradiction.** The data is valid evidence for what arrived. Record the disagreement in WHAT WAS NOT CHECKED as a disagreement ("no agent signal was received during the window while events continued to arrive; the agent-side state was not established"), and do not downgrade the data for it. |
| Ingest key: one `agent_id` (LQL), many `source` (LQL) values | Expected. Scope with `agent_id` (LQL) for the sender and `source` (LQL) for the origin host. |

Do not filter `list_sources` (tool) by "reporting now" when the engineer asked about a past incident.

---

## Sender-first LQL scoping

After scope resolution, prefer **`agent_id` (LQL)** filters when the question is about everything one sender shipped. Call `query_event_counts_by_severity` (tool) with an `lql` (arg) filter such as `agent_id = "<uuid from resolve_scope or list_sources>"` (LQL) and a `group_by` (arg) such as `pattern` (LQL).

Use **`source: "hostname"` (LQL)**, with the name as the tools returned it, when the question is about the origin host label, or combine both when you need on-host events from one agent:

```
lql: 'agent_id = "<uuid>" AND source: "<hostname>"'
```

Ingest-key-shipped events use the ingest key's UUID as `agent_id` (LQL); filter the same way.
For fleet-wide origin pivots, group by `source` (LQL) or filter `source` (LQL) directly.

---

## Structure discovery vs filtered measure

`query_scope_activity` (tool) shows what app, service, subsource or reason values exist; `query_event_counts_by_severity` (tool) measures within an LQL-filtered slice. Detail: `guides/scope-ladder.md`.

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

**Filtering by recent heartbeat for historical work.** Use `list_sources` (tool) with the investigation window, not "is it online now?"

**Conflating sender and origin.** Ingest-key data needs both `agent_id` (LQL) and `source` (LQL) in vocabulary and LQL.

**Citing teaser patterns without `describe_pattern` (tool).** Teaser previews are not evidence-grade pattern text.

**Rewriting the returned scope.** Pass `summary.query_scope` (col) as returned; add sub-orgs only for a named parent org.

**New `external_investigation_id` (arg) on scope expansion.** Same investigation, same id.

**Not flagging sparse data.** A source with a handful of events is in scope but may not support strong findings. Say so in WHAT WAS NOT CHECKED.

**Treating silence from a stuck or offline agent as a clean bill of health.** Cross-check the agent row's readings before "no evidence found."

**Claiming coverage from counts.** `event_count` (col) with `first_event_at` (col) and `last_event_at` (col) says nothing about the middle of the window. Completeness comes from `agent_complete_through` (col) and the feed reports behind it, or it is not claimed.

**Writing a completeness paragraph nobody asked for.** On an ongoing-issue investigation, one sentence saying completeness is not material is the correct amount.
