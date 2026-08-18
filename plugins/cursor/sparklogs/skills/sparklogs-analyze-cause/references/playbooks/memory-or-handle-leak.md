# Memory or handle leak

**Trigger.** "Machine slows over days, recovers on reboot", or an app repeatedly exhausts memory.

**Evidence today.** Thin, and this is the category to be most careful about. There is no per-process
working-set trajectory to query. What you can establish is the CONSEQUENCE trail: application
crashes and hangs, resource-exhaustion errors, and whether the box is carrying an open
resource-pressure condition right now. A leak trajectory is an inference from that, not a
measurement, and the summary must say so.

**Off-endpoint** (HM3): the application vendor's own telemetry, anything running off-endpoint that
the process talks to.

**Call sequence.**

1. Scope, then `list_sources` over a 7-day window; leaks need a longer window than a discrete fault.
2. Current resource conditions.

   ```
   query_device_health(org_ids=[...], start=..., end=..., fieldset="rca",
                      external_investigation_id="<id>")
   ```

   Read `reason` and `episode_age_basis` together. An `observed` basis means the condition was
   already true when the agent first looked, so "for at least N days" is the strongest claim
   available, and `unknown_ongoing` means you may not render a duration at all.

3. Crash and hang trail over the long window.

   ```
   query_event_counts_by_severity(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND app: winlog/Application AND severity >= 17',
     group_by=["pattern"], external_investigation_id="<id>")
   ```

4. If one application dominates, get its shape over time.

   ```
   query_logs(org_ids=[...], start=..., end=..., lql='pattern_hash = "<h>"',
              external_investigation_id="<id>")
   refine_query_result(query_id="<qid>",
                       group_by=[{"time_bucket": {"col": "t", "bucket_usec": 3600000000}, "as": "hour"}],
                       aggregate=[{"fn": "count", "col": "*", "as": "hits"}],
                       order_by=[{"col": "hour", "dir": "asc"}],
                       external_investigation_id="<id>")
   ```

   A rising hourly count across days is the closest thing to a trajectory this surface gives you.
   Call it a rising crash rate, which is what it is, not a leak.

5. Compare against a healthy baseline window with a second grouped run, and say which windows you
   compared. Do not straddle a source-pack release: pattern identity is recomputed at that boundary,
   so every hash reads as new.

**Findings shape.** Lead with the observed consequence ("Application X crashed N times in 7 days,
rising"), give the open condition as supporting context, and put "no per-process memory trajectory
is available from this surface" in WHAT WAS NOT CHECKED. Do not produce a confident leak-trajectory
Finding from crash counts.

---
