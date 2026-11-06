<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.agent.vector`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `log_collection_feed_not_collecting` | log collection feed not collecting | event | Warning | `rmm` |  |
| `log_collection_feed_unavailable` | log collection feed unavailable | event | Debug to Warning | `rmm` |  |
| `log_collection_query_filter_not_applied` | log collection query filter not applied | event | Notice | `rmm` |  |
| `log_collection_query_filter_rejected` | log collection query filter rejected | event | Warning | `rmm` |  |
| `log_collection_read_failed` | log collection read failed | event | Warning to Error | `rmm` |  |
| `log_collection_restarted_from_oldest` | log collection restarted from oldest | event | Notice | `rmm` |  |
| `log_collection_skipped_records_overwritten` | log collection skipped records overwritten | event | Error | `rmm` |  |
| `log_collection_skipped_to_recover` | log collection skipped to recover | event | Error | `rmm` |  |
| `log_collection_stream_not_started` | log collection stream not started | event | Error | `rmm` |  |
| `log_delivery_failed` | log delivery failed | event | Warning to Error | `rmm` |  |

## `log_collection_feed_not_collecting`: log collection feed not collecting

A Windows Event Log channel on this device's collection list is not being collected, and the cause says why.

**Severity:** Warning when the channel exists and something stops us reading it; everyday when the channel is simply absent on this host; Debug when the platform does not permit subscription

**Why it matters:** Nothing from the named channel is collected while this holds, so silence in that log is a gap, not a quiet machine.

**In practice:** The collector was told to read this Windows Event Log channel and is not reading it. The skip_cause field says why. invalid_channel_path: the channel does not exist on this machine, which is normal for a role-specific log, such as the DNS Server audit log on a machine that is not a DNS server. direct_channel: Windows does not allow subscriptions to this kind of channel, so it cannot be collected. access_denied: the channel exists but its access settings refuse the collector, which runs as LocalSystem. operator_query_invalid: the event query configured for the channel was rejected.

**When to ignore:** invalid_channel_path on a machine without the role that creates the channel, and every direct_channel record.

**What to check:**

- For access_denied, read the channel's access settings with wevtutil gl <channel> (the channelAccess line) and look for a Group Policy Configure log access setting that changed them.
- For operator_query_invalid, report it to SparkLogs support with the device name and the channel.
- For invalid_channel_path, act only if the machine should have the role that creates the channel.

**Related:**

- `log_collection_feed_unavailable`: a channel that was collecting and stopped answering

**Example:** A workstation skips the DNS Server audit channel because it is not a DNS server.

This row is about subscription, not about records: nothing that reached the collector is missing
because of it.

## `log_collection_feed_unavailable`: log collection feed unavailable

The collector lost access to a Windows Event Log channel it collects from, and keeps retrying.

**Severity:** Warning, Notice or Debug

**Why it matters:** Events from the named channel are not collected while this holds. When the channel comes back the collector picks up where it left off, so those events usually arrive late, not lost.

**In practice:** The collector's query to the Windows Event Log service failed for a channel it was reading, and the error field gives Windows' reason. "The specified channel could not be found" (0x80073A9F) usually means a product update, reinstall or uninstall removed or re-registered its channel. "The RPC server is unavailable" (0x800706BA) means the event log service itself did not answer; that record names the whole source, not one channel, and every channel it reads can be affected. While the failure lasts, a reminder repeats about once an hour with suppressed_count and first_failure. A recovered record closes it, and its resumed_from field says whether the collector went back to its saved position or restarted from a point in time.

**When to ignore:** The hourly reminders, and a recovered record soon after the onset on a channel whose product was just updated.

**What to check:**

- Check whether the product that owns the channel was just updated, reinstalled or removed.
- If the record names the whole source, check that the Windows Event Log service is running.
- After a recovery with resumed_from=time_fallback, expect a few repeated or missing records on that channel around first_failure.

**Related:**

- `log_collection_feed_not_collecting`: a channel that was never collected, with the cause
- `log_collection_read_failed`: a general read error on any source, with no start and recovery records

**Example:** A product update removes and re-registers its event channel, and the collector retries until the channel is back.

## `log_collection_query_filter_not_applied`: log collection query filter not applied

The channel's event query has no place for the filter that skips events SparkLogs always discards, so the collector reads those events and discards them itself.

**Severity:** Notice

**Why it matters:** Nothing is lost and the stored events are the same. The collector does extra reading on that channel.

**In practice:** To save work, SparkLogs asks the collector to leave out, inside the channel's event query, event IDs it always discards. That works only when the query is a plain XPath filter. This channel is configured with a structured query (a QueryList), which takes no added filter, so the collector reads every record and SparkLogs discards those events after reading. The record repeats each time the collector starts the channel.

**When to ignore:** Whenever the channel keeps up; the stored data is unaffected.

**What to check:**

- No action is needed unless the channel falls behind on a busy machine.

**Related:**

- `log_collection_query_filter_rejected`: the same filter refused by Windows when the collector tried it

**Example:** The Security channel, configured with a structured query, is read without the filter after each collector start.

## `log_collection_query_filter_rejected`: log collection query filter rejected

Windows refused the event log query that skips events SparkLogs always discards, so the collector reads those events and discards them itself. Nothing is lost.

**Severity:** Warning

**Why it matters:** Stored events are unchanged. The collector does more work on that channel until it restarts, and on a busy machine that can make the channel fall behind.

**In practice:** SparkLogs asks the collector to leave out, inside the channel's event query, event IDs it always discards. The Windows Event Log service refused the query carrying that filter, with its reason in win32_error. The collector reads the channel without the filter until it next starts, and SparkLogs discards those events after reading. This refusal is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Restarting the collector, the SparkLogsVector service, retries the filter.

**Related:**

- `log_collection_query_filter_not_applied`: the filter left off because of how the channel's query is written
- `log_collection_restarted_from_oldest`: a refused query for the resume position, which re-reads records

**Example:** Windows refuses the filtered query for the Security channel, and the collector reads it unfiltered until its next start.

## `log_collection_read_failed`: log collection read failed

The collector failed to read from one of its sources, so some events were not collected.

**Severity:** Warning

**Why it matters:** Events from that source may be missing for the time of the failure, and the gap does not show in that stream itself.

**In practice:** The collector reported an error while reading one of its sources, named in component_id, and events from that source may not have been collected for that time. A source read error is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Check the device's feed health in SparkLogs, and recent data from the source named in component_id, for a gap.

**Related:**

- `log_collection_feed_unavailable`: an event log channel that stopped answering, with start and recovery records
- `log_delivery_failed`: events that were read but could not be sent

**Example:** The collector reports a read error on the agent's own log source.

## `log_collection_restarted_from_oldest`: log collection restarted from oldest

A channel with a custom event query could not resume from its last position, so the collector read it from the oldest record instead. Nothing was lost.

**Severity:** Notice

**Why it matters:** Records already collected from that channel arrive again, in a burst that ends when the read catches up. Counts and rates for the channel are inflated during that burst.

**In practice:** To resume a channel, the collector adds its saved position to the channel's event query. This channel has a custom query, and Windows rejected the combined query, with its reason in win32_error. The collector started again from the oldest record still in the channel, and collection never stopped. A spike on that channel right after this record is the re-read, not new activity.

**When to ignore:** No action is needed; the burst ends on its own.

**What to check:**

- Remove duplicates on the event record ID before counting events on that channel for the burst.

**Related:**

- `log_collection_feed_unavailable`: a gap in collection, the opposite of the duplicates here
- `log_collection_skipped_to_recover`: a failed resume that skipped records instead

**Example:** A channel with a custom query is re-read from its oldest record, and its event count spikes until the read catches up.

## `log_collection_skipped_records_overwritten`: log collection skipped records overwritten

Records were overwritten in a Windows Event Log channel before the collector read them, so they were never collected.

**Severity:** Error

**Why it matters:** The named channel is permanently missing the records between the two record IDs on this event, both on the device and in SparkLogs.

**In practice:** A Windows Event Log channel has a maximum size and, by default, overwrites its oldest records when full. This channel overwrote records the collector had not read yet, so they are gone. missing_records counts them, and previous_record_id and record_id are the last record read before the gap and the first after it. Common causes are a channel too small for what writes to it, a burst from a noisy application or a broad audit policy, and a collector that was stopped while the log kept writing.

**What to check:**

- Check the channel's maximum size in Event Viewer (Properties) or with wevtutil gl <channel>, and raise it if the channel fills within hours.
- Find what wrote the burst during the gap: an application, or an audit policy logging every file access.

**Related:**

- `log_collection_feed_unavailable`: querying stopped entirely, which can last long enough to lead here
- `log_collection_skipped_to_recover`: records the collector stepped over itself, which may still be on the device

**Example:** A burst of events fills a channel, and 4,211 records are overwritten before the collector reads them.

The field names match the per-source collector status file, so an event and a status entry for
the same channel join directly.

## `log_collection_skipped_to_recover`: log collection skipped to recover

The collector could not resume a Windows Event Log channel from its last position and moved forward past records, which were never collected.

**Severity:** Error, or Warning when the collector gave up only a single record or boundary tick

**Why it matters:** SparkLogs is missing the records the collector stepped over on the named channel. They are not collected later, though they may still be in the channel on the device.

**In practice:** When the collector cannot read a channel from its saved position, because the position is no longer valid or a record cannot be read, it steps forward until reading works again. resume_rung says how far: skip_record, isolate_one and boundary_tick give up a single record or moment; +1s through +30m skip that much time; future_only skips everything already in the channel and collects only new records. missing_records counts what was skipped. A skip is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Open the channel in Event Viewer on the device to read the skipped records if you need them.

**Related:**

- `log_collection_restarted_from_oldest`: a failed resume that re-read records instead, losing nothing
- `log_collection_skipped_records_overwritten`: records Windows overwrote before the collector read them, gone from the device too

**Example:** The collector cannot resume a channel from its saved position and skips 30 minutes, 812 records.

The field names match the per-source collector status file, so an event and a status entry for
the same channel join directly. The rung vocabulary is separate from the resume path reported on
channel recovery, even where a spelling looks the same.

## `log_collection_stream_not_started`: log collection stream not started

A collector component failed to start, so one telemetry stream is missing from this device.

**Severity:** Error

**Why it matters:** Nothing from that stream reaches SparkLogs, so searches and findings that depend on it come back empty, which can look like a quiet machine.

**In practice:** The collector could not build one of its components when it started, so the stream that component handles, named in component_id, never started. The rest of the device's data still arrives. A component that fails to build is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Check whether the stream named in component_id has any recent data from this device.

**Related:**

- `log_collection_read_failed`: a stream that started and then hit a read error

**Example:** At startup the collector cannot build the System event log source, so no System log events arrive from the device.

## `log_delivery_failed`: log delivery failed

The collector failed to deliver data from this device, so recent events may be missing or delayed.

**Severity:** Warning

**Why it matters:** Recent events from this device arrive late, or not at all if the backlog outgrows what the device can hold. A device with no recent data may have a delivery problem, not an idle machine.

**In practice:** The collector read the device's data, but sending it to SparkLogs failed, as reported by the output named in component_id. The usual causes are on the network path: a firewall or proxy blocking SparkLogs, a broken internet connection, or TLS inspection interfering with the connection. The collector retries, so one failure followed by data arriving on time was a retry that worked.

**When to ignore:** A single failure while the device's data keeps arriving on time.

**What to check:**

- Check whether the device has recent events at all.
- Check firewall, proxy and TLS inspection rules for outbound HTTPS from the device to SparkLogs.

**Related:**

- `log_collection_read_failed`: events that were never read
- `sparklogs_agent_spool_dropped`: queued device-state data the agent deleted after delivery stalled

**Example:** A new firewall rule blocks outbound HTTPS from a branch office's servers, and their data stops arriving.
