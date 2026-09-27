<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `sparklogs.agent.log`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity | benign |
|---|---|---|---|
| `sparklogs_agent_config_rejected` | `rmm` | Warning |  |
| `sparklogs_agent_emission_capped` | `rmm` | Warning |  |
| `sparklogs_agent_event_truncated` | `rmm` | Warning |  |
| `sparklogs_agent_spool_dropped` | `rmm` | Warning |  |
| `sparklogs_agent_spool_expired` | `rmm` | Warning |  |

## `sparklogs_agent_config_rejected`

The data collection settings sent to this device were invalid, so the previous ones stayed active.

**Severity:** Warning

**Impact:** Collection keeps running under the previous settings, so any collection or routing change the new settings were meant to make has not taken effect on this device until they are corrected.

## `sparklogs_agent_emission_capped`

The agent suppressed further events for one category after it hit its emission cap.

**Severity:** Warning

**Impact:** Some events for that category in that window were not sent; treat gaps in it as suppression, not absence.

## `sparklogs_agent_event_truncated`

The agent truncated an oversized event.

**Severity:** Warning

**Impact:** The event remains present but some detail is missing.

## `sparklogs_agent_spool_dropped`

The agent dropped sealed spool data to stay under its disk cap.

**Severity:** Warning

**Impact:** Older buffered telemetry from this host is no longer recoverable.

## `sparklogs_agent_spool_expired`

The agent deleted spooled data that aged out before it could be sent.

**Severity:** Warning

**Impact:** Telemetry from this host covering that period is no longer recoverable.
