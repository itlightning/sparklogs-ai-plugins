---
index: Is SparkLogs collecting from this device
aliases:
  - label: No data from a device
  - label: Skipped or missing events
  - label: SparkLogs agent not updating
---

# Is SparkLogs collecting from this device

**Trigger.** "There is no data from this PC since Tuesday", "is SparkLogs still collecting from the file server", "the events from last night are missing", or a device that shows offline or unhealthy in SparkLogs.

**Accuracy.** Offline means no signal reached SparkLogs. It says nothing about whether the machine is running: the customer's RMM is the authority on that.
The rules for writing about agent status, collection, completeness and skipped events are in `guides/scope-resolution.md` (**Step 8**, **Completeness**, **Missed events**, **State cross-check**). Read them before writing about a device's collection.

**Feeds.** The agent reports on itself on three feeds: its collector's notices on `sparklogs.agent.vector` (value) (`feeds/sparklogs.agent.vector/reasons.md`), the agent's own log on `sparklogs.agent.log` (value) (`feeds/sparklogs.agent.log/reasons.md`), and its device-state topics on `sparklogs.device.state` (value): feed health (`fields/topic-feed-health.md`), agent pipeline (`fields/topic-agent-pipeline.md`), agent overhead and lifecycle.
Its own service starts and stops are also on `win.eventlog.system` (value).
Agent notices carry `sparklogs.kind = agent_op` (LQL); an empty result is inconclusive (`guides/lql-reference.md`, **Ingest-health check**).

**1. The agent's own row.** `resolve_scope` (tool) returns the device with its agent status, its collection status with the reasons and the time they were observed, the instant its data is complete through, advisories, why an enrolled agent is not collecting, its agent version and, after a failed update, the update status and failure reason.
For a whole client, ask the same tool for the devices whose collection is unhealthy: it lists them worst first.
An offline device keeps its last reported collection state. Say when it was reported.
A device whose agent status says it was stopped, shut down or uninstalled told SparkLogs so on the way down; offline means no signal and an unknown cause.
Events that keep arriving while the device reads offline are valid evidence; record the disagreement and keep the data (`guides/scope-resolution.md`, **State cross-check**).

**2. The device's feed health line.** `resolve_scope` (tool) and `list_sources` (tool) carry one line per device: how many feeds are current, each feed that is not with its reason and last event time, and any skipped events.
Feed health is the agent's own report. Do not derive it from event volume.

- Behind: the feed has a backlog and is still reading, often after a burst on a busy channel. A behind feed reading at a high rate is catching up.
- Stuck: a backlog and no progress. Every event log feed stuck at once, with the reason that the collector stalled, is the collector process itself, not the channels.
- Blocked: the feed cannot read for a named cause. A channel that does not exist on this Windows version or role, or a channel whose access settings refuse the agent, are the common ones.
- Onboarding: a new feed still reading what was already in the log.
- Unknown: the agent cannot tell, or the feed has not reported. Never read it as healthy.

A feed that is not current can name the channels holding it back and why. For the full detail of one device's feeds, read the feed health rows in its current state with `query_device_health` (tool): each row carries the feed's health, reason, lag, the channels withholding it and their Windows error, and a count of skip ranges.
A feed count below SparkLogs' full set on a device whose collection is healthy is a feed that does not apply there, such as Defender on an older server. The feed missing from the device's feed health rows is the one.

**3. What the collector and the agent said.** The agent's notices over the window:

```lql
source = "<host>" AND sparklogs.kind = agent_op
```

Group by `sparklogs.reason` (LQL), then `sparklogs.agent.vector.channel` (LQL) inside the skip reasons.
Notices from older agents can carry earlier reason names: render an unfamiliar one as written and read its message.

| Reason | What it means for the data |
|---|---|
| `log_collection_skipped_records_overwritten` (value) | Windows overwrote records before the collector read them. They are gone from the device too. `sparklogs.agent.vector.missing_records` (LQL) counts them |
| `log_collection_skipped_to_recover` (value) | The collector stepped past records to resume. They may still be in the device's own log. `sparklogs.agent.vector.resume_rung` (LQL) says how far it stepped |
| `log_collection_feed_unavailable` (value) | A channel stopped answering, usually after its product was updated or removed; collection resumes from its saved position when it returns |
| `log_collection_feed_not_collecting` (value) | A listed channel is not read, for the cause in `sparklogs.agent.vector.skip_cause` (LQL). A channel that exists only with a server role is normal on other machines |
| `log_collection_read_failed` (value), `log_collection_stream_not_started` (value) | A source could not be read or never started; that stream has a gap |
| `log_delivery_failed` (value) | Data was read and could not be sent: the network path from the device to SparkLogs |
| `log_collection_restarted_from_oldest` (value) | The collector could not resume a channel and read it again from its oldest record. Nothing is lost; the channel's records arrive twice, so counts on it spike until the read catches up |
| `log_collection_query_filter_rejected` (value) | Windows refused the filtered query for a channel, so the collector reads it unfiltered. Nothing is lost; that channel can fall behind on a busy machine |
| `sparklogs_agent_spool_dropped` (value), `sparklogs_agent_emission_capped` (value), `sparklogs_agent_event_too_large_dropped` (value) | Device-state data the agent did not send: the oldest queued file, routine changes over the period's limit, one oversized event |
| `sparklogs_agent_spool_expired` (value) | An older agent deleted queued device-state data that stayed unsent too long, after the device could not send for over a day. That data is lost |

Overwritten records on one channel point at the channel being too small for what writes to it, or at a burst. Find the burst on that channel and device over the skip window, with the channel exactly as the notice names it:

```lql
source = "<host>" AND origin = "<channel>"
```

Group by `pattern_hash` (LQL). One pattern by the hundred thousand, such as a driver service whose start fails in a loop, is the cause to fix (`playbooks/service-failures.md`). The skips stop when the flood does.

**4. Gaps from agent stops and machine shutdowns.**

```lql
source = "<host>" AND sparklogs.reason in (sparklogs_agent_stopped, sparklogs_agent_started, host_shutdown, host_booted, host_unexpected_shutdown)
```

Group by `sparklogs.reason` (LQL) and `sparklogs.data.lifecycle.stop_cause` (LQL), and read them in time order.
The stop cause says whether the agent stopped for its own update, for Windows shutting down, because someone or an RMM stopped it, or on an error. The System-channel copy covers a crash or power loss the agent could not report itself.
Log records written while the agent was stopped arrive after it starts, unless Windows overwrote them first, which step 3 reports. Device and performance readings for that time do not exist.
Repeated stops on an error with no machine failure behind them go to SparkLogs support with the device name and times.

**5. The agent's own load and queue.** `sparklogs_agent_cpu_over_budget` (value), `sparklogs_agent_memory_over_budget` (value) and `sparklogs_agent_handle_over_budget` (value) are device conditions: ask `query_device_health` (tool) for them like any other condition.
The agent pipeline topic carries the queue on disk: `sparklogs.data.agent_pipeline.spool_pct_of_cap` (LQL), `sparklogs.data.agent_pipeline.spool_growth_mb_per_h` (LQL) and `sparklogs.data.agent_pipeline.spool_last_drained_at` (LQL).
A queue that grows while `log_delivery_failed` (value) repeats is a device that cannot reach SparkLogs: a firewall or proxy rule, TLS inspection, or no internet.

**6. Updates.** The agent's row carries its reported update status and failure reason only after the updater reported a failure. Render the reason as written.
An agent status of upgrading overdue is an update that started and did not come back; read it with the last contact time, since a machine that went dark mid-update reads the same.
An agent that stays on an old version without reporting any failure is not flagged there. Compare its version with the rest of the client in the same `resolve_scope` (tool) listing, and with devices in other clients: every device in the client on the same older version is an update that has not reached them yet, not a fault on this device. For one device behind its neighbors, read the agent's own update lines:

```lql
source = "<host>" AND subsource = "sparklogs.agent.log" AND message: update
```

Group by `pattern_hash` (LQL) and read the patterns in time order: an update check that keeps failing to fetch its manifest is the network path to the update service; a check that never comes due can be an agent that does not run long enough between shutdowns; a download that is verified and staged with no applied line after it is an install that did not finish.
The agent's own log also says when the cloud no longer recognizes the agent, for example after the device was deleted in SparkLogs: collection stops and the device needs to be enrolled again.
For a device the agent cannot update, the RMM can push the current installer.

**7. The RMM shows the device offline.** Whether the device's network was up then is in `playbooks/rmm-connectivity.md`.

**When to stop.** Reasons whose text says to report them to SparkLogs support (a rejected configuration, a collector component that would not start, repeated error stops) end the investigation on the endpoint: give support the device name, the reason and the times.
Skipped events are reported with their channel, window and count. Do not offer to recover them.

**Off-endpoint** (HM17): the network path from the device to SparkLogs, proxies and TLS inspection, endpoint protection blocking the agent, and RMM or Group Policy that stops, removes or reinstalls it.
