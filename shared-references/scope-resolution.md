# Scope Resolution and Source Discovery

The first step of any investigation. Resolve which org / sources / time window the investigation is about, then confirm the source(s) have data in that window. Done well, this prevents an entire class of investigation failures (wrong scope, wrong source, wrong time window).

---

## Scope resolution sequence

Approach in order of preference; stop at the first step that gives an unambiguous result.

### Step 1: Parse the engineer's message for an explicit ID

If the engineer's message includes a customer ID, org ID, or workspace identifier (e.g., "ACME-DENT", "client_id=42", "org_acme_dental"), try exact ID match first via `resolve_scope`:

```
resolve_scope(
  scope_text: "<extracted ID>",
  exact_id_match: true,
  investigation_request_id: "<id>"
)
```

If `resolve_scope` returns a single match with high confidence, proceed with that scope.

### Step 2: Try exact name match on org name

If no explicit ID, try the org name verbatim as the engineer used it:

```
resolve_scope(
  scope_text: "Acme Dental",
  investigation_request_id: "<id>"
)
```

`resolve_scope` will attempt exact name match first. If it returns a single high-confidence match, proceed.

### Step 3: Try fuzzy name match

If no exact name match, `resolve_scope` will fall back to fuzzy matching automatically (server-side). The response includes ranked candidates with confidence scores.

### Step 4: If multiple ambiguous matches - ASK the engineer

If `resolve_scope` returns multiple candidates with similar confidence (no clear winner), **ask the engineer to disambiguate. Don't guess.**

Example:
> "I found two organizations that could match 'Acme': Acme Dental (acme-dental, 24 sources) and Acme Manufacturing (acme-mfg, 117 sources). Which one are you investigating?"

If the host supports MCP elicitation, use the protocol's elicitation capability to pause and prompt for clarification directly. Otherwise return the candidate list to the user as conversational data and wait for their pick.

### Step 5: If no matches - surface the closest candidates

If `resolve_scope` returns zero matches with reasonable confidence, surface the closest candidates the server found, and ask:

> "I don't see an organization that exactly matches 'Acme Demtal'. The closest names I found are: Acme Dental, Acme Demolition, Acme Construction. Did you mean one of these, or could you provide the customer ID directly?"

### Step 6: If one match but its low confidence - ASK the engineer

If `resolve_scope` returns a single match but confidence is medium or lower, **ask the engineer to confirm before proceeding. Don't assume it's right.**

Example:
> "I found this organization that could match 'Acme': Acme Dental (acme-dental, 24 sources). Is this the right organization?"

### Step 7: Sub-org expansion

If a single org is identified and that org has sub-orgs (sites, locations, departments), by default include all sub-orgs underneath it. Pass `include_sub_orgs: true` to all org-scoped MCP calls so the server expands the tree:

```
list_sources(
  org_ids: [<the resolved parent org>],
  include_sub_orgs: true,
  start: "<investigation start, RFC3339 UTC>",
  end: "<investigation end, RFC3339 UTC>",
  investigation_request_id: "<id>"
)
```

This puts the burden of tree expansion on the server rather than on you. If the engineer specifically asks to investigate only a particular sub-org, scope `org_ids` directly to that sub-org and set `include_sub_orgs` to true (or false) as appropriate.

### Step 8: Scope can expand during the investigation

The investigation scope is not fixed at the start. As findings warrant - for example, a fleet pivot from a single source's pattern reveals 7 affected sources - pivot queries to the new scope but **keep the same `investigation_request_id`**. Don't restart the investigation.

If the engineer explicitly redirects ("forget that source, look at this one instead" or "actually, I want to investigate this whole site"), update scope and continue with the same investigation. Note the scope expansion in the EXECUTIVE SUMMARY.

---

## Source discovery - confirm sources have data in the investigation window

After resolving scope, confirm the source(s) of interest actually have data in the investigation's time window.

**The investigation may be about:**
- Something happening now (live troubleshooting).
- Something that happened a few hours / days / weeks ago (historical investigation).
- Something that happened over a multi-day window (trend investigation).

Use `list_sources` with the investigation's actual time range. Do **not** filter by recent heartbeat (which would wrongly exclude sources whose data is in the historical window but who are now offline).

```
list_sources(
  org_ids: [<from resolve_scope>],
  include_sub_orgs: true,
  start: "<investigation start, RFC3339 UTC>",
  end: "<investigation end, RFC3339 UTC>",
  investigation_request_id: "<id>"
)
```

The response includes each source's last-event timestamp within the window plus apps/subsources observed.

**Decision logic:**

- **The relevant source is in the response with events in the window** -> proceed.
- **The relevant source is in the response but with very few events / sparse coverage** -> proceed but flag in OUTSIDE AGENT VISIBILITY: "Source X had limited telemetry in the window (N events). Findings may be incomplete due to data sparsity."
- **The relevant source is NOT in the response (no events in the window)** -> halt and ask the engineer:
  > "I don't see Managed Agent telemetry from `<source>` during `<window>`. Did you mean a different source name, or is the source perhaps offline / not deployed during that window?"

  Surface candidate sources from the response that have similar names if any exist (the engineer may have a typo).

---

## Time window resolution

If the engineer's message specifies a time window ("last 24 hours", "yesterday afternoon", "since Tuesday"), use it. Convert relative descriptions to absolute UTC timestamps and bind the investigation to those absolute timestamps.

If the engineer's message implies a window without naming one ("the user reported the issue this morning"), make a reasonable inference and confirm:
> "I'm assuming you'd like me to focus on the past 12 hours. Would you like a different window?"

If the engineer's message gives no time context, default to the last 24 hours and note that in the SCOPE CHECKED section.

If the engineer's message includes references to time where the time zone is unclear, **do not guess or assume**,
ASK the engineer to clarify the time zone of the system(s) under investigation.

---

## Common scope-resolution mistakes

**Guessing instead of asking.** When `resolve_scope` returns multiple candidates with similar confidence, picking one and proceeding silently is worse than asking. The engineer would rather answer one clarifying question than discover later you investigated the wrong client.

**Filtering by recent heartbeat by default.** This makes historical investigations fail silently. Only filter by recent heartbeat when the engineer is asking about *current* state ("is this server reachable from RMM right now?").

**Forgetting to expand sub-orgs.** Most engineer requests at the org level implicitly include sub-orgs. Default to `include_sub_orgs: true` unless the engineer specifically scopes narrower.

**Starting a new investigation_request_id when the scope expands.** The investigation is the same; the scope is updating. Reuse the same ID throughout the conversation.

**Not flagging sparse-data sources.** A source with 3 events in the investigation window is technically "in scope" but realistically inadequate to support strong findings. Flag the sparsity in OUTSIDE AGENT VISIBILITY rather than producing high-confidence findings on thin data.
