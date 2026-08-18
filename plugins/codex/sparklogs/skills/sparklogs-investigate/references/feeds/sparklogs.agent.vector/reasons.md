<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.agent.vector`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `data_collection_feed_not_collecting` | `rmm` | Warning when the channel exists and something stops us reading it; everyday when the channel is simply absent on this host; Debug when the platform does not permit subscription |
| `data_collection_feed_unavailable` | `rmm` | Warning at onset; Debug for hourly reminders while it holds; Notice on recovery |
| `data_collection_read_failed` | `rmm` | Warning |
| `data_collection_restarted_from_oldest` | `rmm` | Notice |
| `data_collection_skipped_records_overwritten` | `rmm` | Error |
| `data_collection_skipped_to_recover` | `rmm` | Error, or Warning when the collector gave up only a single record or boundary tick |
| `data_collection_stream_not_started` | `rmm` | Error |
| `data_delivery_failed` | `rmm` | Warning |

## `data_collection_feed_not_collecting`

A Windows Event Log channel on this device's collection list is not being collected, and the cause says why.

**Severity:** Warning when the channel exists and something stops us reading it; everyday when the channel is simply absent on this host; Debug when the platform does not permit subscription

**Impact:** Nothing from the named channel is collected while the condition holds, so read its silence as a gap rather than as an idle machine. What to do depends on the cause: fix a permission, fix the custom query, or accept that the channel does not exist on this kind of host.

**Consider:**

- The cause decides the response: a permission and an absent channel need opposite actions.
- An absent channel on a host without the role that creates it is the ordinary case.

This row is about subscription, not about records: nothing that reached the collector is missing
because of it.

## `data_collection_feed_unavailable`

The collector lost access to a Windows Event Log channel it collects from, and keeps retrying.

**Severity:** Warning at onset; Debug for hourly reminders while it holds; Notice on recovery

**Impact:** Events from the named channel are not collected while the condition holds, so silence in that stream is a collection gap rather than an idle machine. On recovery the collector resumes from its last position, so the gap is usually delay rather than loss.

**Consider:**

- The channel field names the affected log; check whether that stream has recent events.
- suppressed_count and first_failure on reminder and recovery events bound the gap window.
- A product update can re-register its event channel (Windows Defender platform updates are a known trigger); the collector recovers on its own once the channel is readable again.

## `data_collection_read_failed`

The collector failed to read from one of its sources, so some events were not collected.

**Severity:** Warning

**Impact:** There may be a gap in the affected stream on this device. The gap is not visible in that stream itself, only here.

**Consider:**

- Check the component_id on the event and confirm whether that stream has continuous recent data.

## `data_collection_restarted_from_oldest`

A channel with a custom event query could not resume from its last position, so the collector read it from the oldest record instead. Nothing was lost.

**Severity:** Notice

**Impact:** Records from the named channel that were already collected arrive again, as a large but bounded burst that ends when the read catches up. Counts and rates on that channel are inflated for that window, so read a spike around this event as a re-read rather than as new activity.

**Consider:**

- The channel field names the affected log; expect duplicate records on it around this time.
- Deduplicate on the record identifier before counting events on that channel for the window.

## `data_collection_skipped_records_overwritten`

Records were overwritten in a Windows Event Log channel before the collector read them, so they were never collected.

**Severity:** Error

**Impact:** The named channel is permanently incomplete for the window between the two record identifiers on this event. Read silence in that channel for that window as a skip rather than as an idle machine, and expect no later delivery of those records.

**Consider:**

- The channel field names the affected log and the two record identifiers delimit the gap.
- A recurring gap on one channel usually means the channel is too small for what writes to it.
- Look for what generated the volume that overran the buffer during that window.

The field names match the per-source collector status file, so an event and a status entry for
the same channel join directly.

## `data_collection_skipped_to_recover`

The collector could not resume a Windows Event Log channel from its last position and moved forward past records, which were never collected.

**Severity:** Error, or Warning when the collector gave up only a single record or boundary tick

**Impact:** The named channel is permanently incomplete for the window the collector skipped. How much is missing depends on how far the resume ladder had to move, which rides the event.

**Consider:**

- The rung says how far the collector moved: a single record, seconds, minutes, or all history.
- Repeated skips on one channel point at a resume position the collector cannot store or read.

The field names match the per-source collector status file, so an event and a status entry for
the same channel join directly. The rung vocabulary is separate from the resume path reported on
channel recovery, even where a spelling looks the same.

## `data_collection_stream_not_started`

A collector component failed to start, so one telemetry stream is missing from this device.

**Severity:** Error

**Impact:** Data this component would have collected is absent until the collector is reconfigured and restarted; findings that depend on it may be incomplete.

**Consider:**

- Check which component_id is named on the event, then confirm whether that stream has any recent data.

## `data_delivery_failed`

The collector failed to deliver data from this device, so recent events may be missing or delayed.

**Severity:** Warning

**Impact:** Data from this device may arrive late or, if buffering is exhausted, not at all. Absence of recent events for this device may reflect delivery rather than the device being idle.

**Consider:**

- Check whether this device has recent events at all, and whether the agent also reported spool pressure.
