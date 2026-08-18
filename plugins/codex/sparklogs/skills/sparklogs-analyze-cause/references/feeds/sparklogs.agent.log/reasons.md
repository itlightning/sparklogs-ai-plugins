<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.agent.log`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `data_collection_settings_invalid` | `rmm` | Error |
| `sparklogs_agent_emission_capped` | `rmm` | Error |
| `sparklogs_agent_ingest_drop` | `rmm` | Error |
| `sparklogs_agent_spool_drop` | `rmm` | Error |
| `sparklogs_agent_spool_expire` | `rmm` | Error |
| `sparklogs_agent_spool_truncate` | `rmm` | Warning |

## `data_collection_settings_invalid`

The data collection settings sent to this device were invalid, so the previous ones stayed active.

**Severity:** Error

**Impact:** Collection keeps running under the previous settings, so any collection or routing change the new settings were meant to make has not taken effect on this device until they are corrected.

## `sparklogs_agent_emission_capped`

The agent suppressed further events for one category after it hit its emission cap.

**Severity:** Error

**Impact:** Some events for that category in that window were not sent; treat gaps in it as suppression, not absence.

## `sparklogs_agent_ingest_drop`

The agent dropped events after ingest retries were exhausted.

**Severity:** Error

**Impact:** Telemetry from this host has a known data-loss gap.

## `sparklogs_agent_spool_drop`

The agent dropped sealed spool data to stay under its disk cap.

**Severity:** Error

**Impact:** Older buffered telemetry from this host is no longer recoverable.

## `sparklogs_agent_spool_expire`

The agent deleted spooled data that aged out before it could be sent.

**Severity:** Error

**Impact:** Telemetry from this host covering that period is no longer recoverable.

## `sparklogs_agent_spool_truncate`

The agent truncated an oversized event.

**Severity:** Warning

**Impact:** The event remains present but some detail is missing.
