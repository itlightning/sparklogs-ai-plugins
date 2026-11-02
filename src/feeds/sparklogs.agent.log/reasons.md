<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.agent.log`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `sparklogs_agent_config_rejected` | sparklogs agent config rejected | event | Warning | `rmm` |  |
| `sparklogs_agent_emission_capped` | sparklogs agent emission capped | event | Warning | `rmm` |  |
| `sparklogs_agent_event_truncated` | sparklogs agent event truncated | event | Warning | `rmm` |  |
| `sparklogs_agent_spool_dropped` | sparklogs agent spool dropped | event | Warning | `rmm` |  |
| `sparklogs_agent_spool_expired` | sparklogs agent spool expired | event | Warning | `rmm` |  |

## `sparklogs_agent_config_rejected`: sparklogs agent config rejected

The data collection settings sent to this device were invalid, so the previous ones stayed active.

**Severity:** Warning

**Why it matters:** Collection keeps running under the previous settings, so any change the new settings were meant to make has not taken effect on this device.

**In practice:** Before the agent applies new data collection settings from SparkLogs, it checks that its collector accepts them. That check failed, so the agent kept running the last settings that worked, and the detail field carries the collector's reason. The agent reports a given rejection once, not on every retry. A rejected configuration is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Copy the detail field from the event into the support report.

**Related:**

- `log_collection_stream_not_started`: a collector component that failed to start under settings already applied

**Example:** A settings update is rejected on one device, which keeps collecting with its previous settings.

## `sparklogs_agent_emission_capped`: sparklogs agent emission capped

The agent held back routine change events for one device-state category after it reached its limit for the period.

**Severity:** Warning

**Why it matters:** Some routine changes in that category were not sent for that period, so a quiet stretch there means held back, not unchanged.

**In practice:** The agent limits how many change events each device-state category, such as processes or services, sends in a period. The category named in topic reached that limit, so the agent held back further routine changes until the period ended, then reported how many in the suppressed field. Full inventories and the records that close a condition are still sent. Reaching the limit is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Use the category's next full inventory for the device's current state.

**Related:**

- `sparklogs_agent_event_truncated`: one event left out because it was too large

**Example:** The processes category on a build server sends more changes than its limit allows, and the agent reports 200 held back.

## `sparklogs_agent_event_truncated`: sparklogs agent event truncated

The agent left out one device-state event because it was larger than the per-event size limit.

**Severity:** Warning

**Why it matters:** That one event is missing from SparkLogs, so the category named in topic has a gap at that time.

**In practice:** Every device-state event the agent queues for sending must fit a per-event size limit. This one did not, so the agent left it out whole; event_bytes gives its size and limit_bytes the limit. Despite the reason code's name, nothing is shortened: the event is not sent at all. An event this large is unexpected; if it keeps happening, report it to SparkLogs support with the device name.

**What to check:**

- Include the topic and event_bytes values in the support report.

**Related:**

- `sparklogs_agent_emission_capped`: events held back because a category sent too many, not because one was too large

**Example:** One processes event on a terminal server is larger than the size limit and is left out.

## `sparklogs_agent_spool_dropped`: sparklogs agent spool dropped

The agent deleted its oldest queued device-state file before it was sent, to stay under its disk limit.

**Severity:** Warning

**Why it matters:** The device-state events in that file never reach SparkLogs, so the oldest part of the backlog has a gap.

**In practice:** The agent queues device-state events in files on disk until the collector has read and sent them. When the queue passes its disk limit, the agent deletes the oldest file to make room; dropped_bytes says how much went. The queue grows that far only when the collector has not been reading or sending it for a long time, such as when the SparkLogsVector service is stopped or the device cannot reach SparkLogs. If the device was delivering its other data normally at the time, report it to SparkLogs support with the device name.

**What to check:**

- Check that the SparkLogsVector service is running and the device can reach SparkLogs.
- Look for a delivery failure record from the same device before the drop.

**Related:**

- `log_delivery_failed`: the collector failing to send data, which can lead here
- `sparklogs_agent_spool_expired`: older agents deleting queued data by age, not by size

**Example:** A device that cannot reach SparkLogs for days fills its queue, and the agent deletes the oldest queued file.

## `sparklogs_agent_spool_expired`: sparklogs agent spool expired

Before agent 1.14.1, the agent deleted queued device-state data that was still unsent after 24 hours.

**Severity:** Warning

**Why it matters:** The device-state events in the deleted files never reach SparkLogs, leaving a gap for that period.

**In practice:** Agents before 1.14.1 deleted queued device-state files that were still unsent after 24 hours. It happened after a device spent more than a day unable to send: off the network, asleep or switched off with data queued, or with the collector stopped. Agent 1.14.1 removed the age limit, so newer agents keep unsent files until the disk limit and do not write this record.

**What to check:**

- Update the agent to 1.14.1 or later.

**Related:**

- `sparklogs_agent_spool_dropped`: deletion at the disk limit, which current agents still do

**Example:** A laptop on an older agent spends two days off the network, and on its return the agent deletes queued data older than 24 hours.
