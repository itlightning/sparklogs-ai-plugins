<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.defender.eventlog`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.defender.eventlog.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.defender.eventlog.threat_name` | string | Name Defender gives the threat, from `Threat Name` on the detection and remediation events (1116 to 1119, 1015, and the older 1006 to 1008). |
| `win.defender.eventlog.severity_id` | int | Defender's rating of the threat, from `Severity ID` on events 1116 and 1006: 1 Low, 2 Moderate, 4 High, 5 Severe. The same number on every Windows language, so filter on it before the name. |
| `win.defender.eventlog.severity_name` | string | Defender's rating of the threat as text, from `Severity Name` on events 1116 and 1006, in lowercase. The text follows the Windows display language. |
| `win.defender.eventlog.category_id` | int | Number of the threat category Defender assigned, from `Category ID` on events 1116 and 1006. |
| `win.defender.eventlog.category_name` | string | Threat category Defender assigned, as text, from `Category Name` on events 1116 and 1006. |
| `win.defender.eventlog.threat_path` | string | Path of the file or other object Defender acted on, from `Path` on the detection and remediation events (1116 to 1119, 1015, and the older 1006 to 1008) and on attack surface reduction block event 1121. |
| `win.defender.eventlog.detection_origin` | string | Where the threat was found, such as a local machine or a network share, from `Detection Origin` on events 1116 and 1006. |
| `win.defender.eventlog.detection_type` | string | Kind of detection Defender made, from `Detection Type` on events 1116 and 1006. |
| `win.defender.eventlog.detection_source` | string | Defender component that made the detection, such as real-time protection or a user scan, from `Detection Source` on events 1116 and 1006. |
| `win.defender.eventlog.user` | string | User account Defender ties to the event, from `User`: the account on a detection or remediation (1116, 1117 and the older 1006, 1007), or the account that started or ran a scan (1000, 1001). |
| `win.defender.eventlog.action_id` | int | Number of the remediation action Defender took, from `Action ID` on events 1117 and 1007. |
| `win.defender.eventlog.action_name` | string | Remediation action Defender took, as text, from `Action Name` on events 1117 and 1007, in lowercase. The text follows the Windows display language, so an allow on a non-English system is not the word allow. |
| `win.defender.eventlog.status` | string | Result code Defender logged, from `Error Code`. On remediation events 1117 and 1007 it is the outcome, and a completed action reads as zero. On remediation failures (1118, 1119, 1008), scan failure 1005, security intelligence update failures (2001, 2003, 2004) and engine failures (3002, 5008) it is the failure code. |
| `win.defender.eventlog.new_value` | string | New setting Defender recorded on configuration change event 5007, from `New Value`: the registry path of the setting, often with the value it was given. A change to exclusions, real-time monitoring, anti-spyware, tamper protection or cloud reporting is reported as a protection setting change. |
| `win.defender.eventlog.old_value` | string | Setting as it was before the change, from `Old Value` on configuration change event 5007. |
| `win.defender.eventlog.sig_version` | string | Security intelligence (definitions) version on the machine, from `Current security intelligence Version` on update events 2000, 2002, 2010 and 2014 and update failures 2001, 2003 and 2004. |
| `win.defender.eventlog.sig_version_previous` | string | Security intelligence (definitions) version before the update, from `Previous security intelligence Version` on update events 2000, 2002, 2010 and 2014 and update failures 2001, 2003 and 2004. |
| `win.defender.eventlog.scan_id` | string | Identifier of one Defender scan, from `Scan ID` on scan started and finished (1000, 1001), cancelled (1002) and failed (1005). Filter on it to see one scan from start to end. |
| `win.defender.eventlog.feature_name` | string | Real-time protection feature that failed or recovered, from `Feature Name` on engine failures 3002 and 5008 and recovery event 3007. |
| `win.defender.eventlog.rule_id` | string | GUID of the attack surface reduction rule that blocked a file, from `ID` on event 1121. Microsoft's attack surface reduction documentation maps each GUID to its rule name. |
| `win.defender.eventlog.filename` | string | File Defender uploaded for cloud analysis, from `Filename` on event 2050. |
| `win.defender.eventlog.sha256` | string | SHA-256 of the file Defender uploaded for cloud analysis, from `Sha256` on event 2050. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.config_change.type` | The kind of object that changed, from a closed set of object nouns. |
| `sparklogs.config_change.action` | What was done to that object, from a closed set of verbs. |
| `sparklogs.config_change.target` | Which object it was: its own identity within its kind, as a name, a path or an id. A different field from the principal a change acted on, and a change acting on a principal carries both. |
| `sparklogs.process.path` | The process the event is about. |
| `sparklogs.process.name` | The process the event is about. |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `av_config_changed` / `default` | 5007 | `win.defender.eventlog.new_value` `win.defender.eventlog.old_value` |  |
| `av_definition_update_failed` / `default` | 2001, 2003, 2004 | `win.defender.eventlog.sig_version` `win.defender.eventlog.sig_version_previous` `win.defender.eventlog.status` |  |
| `av_engine_failed` / `default` | 3002, 5008 | `win.defender.eventlog.feature_name` `win.defender.eventlog.status` |  |
| `av_protection_disabled` / `disabled` | 5000, 5001, 5009, 5010, 5011, 5012 | **fields: none** |  |
| `av_protection_disabled` / `enabled` | 5000, 5001, 5009, 5010, 5011, 5012 | **fields: none** |  |
| `av_scan_failed` / `default` | 1005 | `win.defender.eventlog.scan_id` `win.defender.eventlog.status` |  |
| `av_suspicious_behavior_detected` / `default` | 1015 | `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` |  |
| `av_tamper_blocked` / `default` | 5013 | **fields: none** |  |
| `av_threat_detected` / `high_severity` | 1006, 1116 | `win.defender.eventlog.category_id` `win.defender.eventlog.category_name` `win.defender.eventlog.detection_origin` `win.defender.eventlog.detection_source` `win.defender.eventlog.detection_type` `win.defender.eventlog.severity_id` `win.defender.eventlog.severity_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |  |
| `av_threat_detected` / `standard` | 1006, 1116 | `win.defender.eventlog.category_id` `win.defender.eventlog.category_name` `win.defender.eventlog.detection_origin` `win.defender.eventlog.detection_source` `win.defender.eventlog.detection_type` `win.defender.eventlog.severity_id` `win.defender.eventlog.severity_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |  |
| `av_threat_not_remediated` / `default` | 1007, 1117 | `win.defender.eventlog.action_id` `win.defender.eventlog.action_name` `win.defender.eventlog.status` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |  |
| `av_threat_remediated` / `default` | 1007, 1117 | `win.defender.eventlog.action_id` `win.defender.eventlog.action_name` `win.defender.eventlog.status` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |  |
| `av_threat_remediation_failed` / `default` | 1008, 1118, 1119 | `win.defender.eventlog.status` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` |  |
| `defender_asr_blocked` / `default` | 1121 | `win.defender.eventlog.rule_id` `win.defender.eventlog.threat_path` |  |
| `defender_network_protection_blocked` / `default` | 1126 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `av_protection_disabled` / `disabled`
- `av_protection_disabled` / `enabled`
- `av_tamper_blocked` / `default`
- `defender_network_protection_blocked` / `default`
