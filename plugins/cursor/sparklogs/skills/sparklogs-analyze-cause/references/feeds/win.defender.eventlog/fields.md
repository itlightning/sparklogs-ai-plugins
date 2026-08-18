<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.defender.eventlog`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason slug is read.

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
| `win.defender.eventlog.threat_name` | string | Threat identity from the detection/remediation family (1116-1119, legacy 1006-1008, 1015): `Threat Name`. |
| `win.defender.eventlog.severity_id` | int | Numeric threat severity from 1116/1006 (`Severity ID`: 1 Low, 2 Moderate, 4 High, 5 Severe). Locale-safe, so prefer it over the rendered name. |
| `win.defender.eventlog.severity_name` | string | Rendered threat severity text from 1116/1006 (`Severity Name`). Locale-sensitive fallback read only when `Severity ID` is absent. |
| `win.defender.eventlog.category_id` | int | Numeric threat category from 1116/1006 (`Category ID`). |
| `win.defender.eventlog.category_name` | string | Rendered threat category text from 1116/1006 (`Category Name`). |
| `win.defender.eventlog.threat_path` | string | File/object path the threat/rule acted on: 1116-1119 (legacy 1006-1008), 1015 (`Path`), 1121 ASR block (`Path`). |
| `win.defender.eventlog.process_name` | string | Process associated with the detection/rule: 1116-1119 (legacy 1006-1008), 1015, 1121 (`Process Name`). |
| `win.defender.eventlog.detection_origin` | string | Where the detection originated, from 1116/1006 (`Detection Origin`). |
| `win.defender.eventlog.detection_type` | string | Detection mechanism kind, from 1116/1006 (`Detection Type`). |
| `win.defender.eventlog.detection_source` | string | Detection source engine/component, from 1116/1006 (`Detection Source`). |
| `win.defender.eventlog.user` | string | User context Defender associated with the event: detection (`User`), scan lifecycle (1000/1001, `User`). |
| `win.defender.eventlog.action_id` | int | Numeric remediation action from 1117/1007 (`Action ID`). |
| `win.defender.eventlog.action_name` | string | Rendered remediation action text from 1117/1007 (`Action Name`, downcased). Locale-sensitive, so an allow on a non-English system reads in the local language. |
| `win.defender.eventlog.error_code` | string | Error code as logged: 1117/1007, 1118/1119/1008, 1005 scan failure, 2001/2003/2004 definition update failure, 3002/5008 engine failure (`Error Code`). |
| `win.defender.eventlog.new_value` | string | 5007 config-change new value (`New Value`): the setting content Defender wrote, never message text. Exclusions, real-time monitoring, anti-spyware, tamper protection and cloud reporting are the settings this value names on a tamper-shaped change. |
| `win.defender.eventlog.old_value` | string | 5007 config-change prior value (`Old Value`). |
| `win.defender.eventlog.sig_version` | string | Current security intelligence version: 2000/2002/2010/2014 update lifecycle, 2001/2003/2004 update failure (`Current security intelligence Version`). |
| `win.defender.eventlog.sig_version_previous` | string | Prior security intelligence version, same id family as `sig_version` (`Previous security intelligence Version`). |
| `win.defender.eventlog.scan_id` | string | Scan lifecycle join key: 1000/1001 (start/finish), 1002 (cancelled), 1005 (failed) (`Scan ID`). |
| `win.defender.eventlog.feature_name` | string | RTP feature name: 3002/5008 (engine failure), 3007 (recovery) (`Feature Name`). |
| `win.defender.eventlog.rule_id` | string | ASR rule GUID from 1121 block (`ID`). |
| `win.defender.eventlog.filename` | string | 2050 file-upload-for-analysis filename (`Filename`). |
| `win.defender.eventlog.sha256` | string | 2050 file-upload-for-analysis hash (`Sha256`); join key with `filename`. |

## Portable families

Cross-feed families: the same path means the same thing on every data feed that populates it, so a query written against one channel transfers.
Prefer these over the per-feed fields for anything that spans feeds.

| LQL path | Family means |
|---|---|
| `sparklogs.config_change.type` | What configuration changed, in what direction, on what. |
| `sparklogs.config_change.action` | What configuration changed, in what direction, on what. |

## What sets each field

Presence is per curated surface and per event id, because promotion is a property of the branch, not of the module.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.

| Surface | Event ids | Fields set |
|---|---|---|
| `asr_block` / `default` | 1121 | `win.defender.eventlog.process_name` `win.defender.eventlog.rule_id` `win.defender.eventlog.threat_path` |
| `av_config_tamper` / `default` | 5007 | `sparklogs.config_change.action` `sparklogs.config_change.type` `win.defender.eventlog.new_value` `win.defender.eventlog.old_value` |
| `av_tamper_blocked` / `default` | 5013 | **fields: none** |
| `av_threat_detected` / `high_severity` | 1006, 1116 | `win.defender.eventlog.category_id` `win.defender.eventlog.category_name` `win.defender.eventlog.detection_origin` `win.defender.eventlog.detection_source` `win.defender.eventlog.detection_type` `win.defender.eventlog.process_name` `win.defender.eventlog.severity_id` `win.defender.eventlog.severity_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |
| `av_threat_detected` / `standard` | 1006, 1116 | `win.defender.eventlog.category_id` `win.defender.eventlog.category_name` `win.defender.eventlog.detection_origin` `win.defender.eventlog.detection_source` `win.defender.eventlog.detection_type` `win.defender.eventlog.process_name` `win.defender.eventlog.severity_id` `win.defender.eventlog.severity_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |
| `defender_engine_failed` / `default` | 3002, 5008 | `win.defender.eventlog.error_code` `win.defender.eventlog.feature_name` |
| `defender_scan_failed` / `default` | 1005 | `win.defender.eventlog.error_code` `win.defender.eventlog.scan_id` |
| `definition_update_failed` / `default` | 2001, 2003, 2004 | `win.defender.eventlog.error_code` `win.defender.eventlog.sig_version` `win.defender.eventlog.sig_version_previous` |
| `network_protection_block` / `default` | 1126 | **fields: none** |
| `protection_disabled` / `disabled` | 5000, 5001, 5009, 5010, 5011, 5012 | `sparklogs.config_change.action` `sparklogs.config_change.type` |
| `protection_disabled` / `enabled` | 5000, 5001, 5009, 5010, 5011, 5012 | `sparklogs.config_change.action` `sparklogs.config_change.type` |
| `suspicious_behavior` / `default` | 1015 | `win.defender.eventlog.process_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` |
| `threat_not_remediated` / `default` | 1007, 1117 | `win.defender.eventlog.action_id` `win.defender.eventlog.action_name` `win.defender.eventlog.error_code` `win.defender.eventlog.process_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |
| `threat_remediated` / `default` | 1007, 1117 | `win.defender.eventlog.action_id` `win.defender.eventlog.action_name` `win.defender.eventlog.error_code` `win.defender.eventlog.process_name` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` `win.defender.eventlog.user` |
| `threat_remediation_failed` / `default` | 1008, 1118, 1119 | `win.defender.eventlog.error_code` `win.defender.eventlog.threat_name` `win.defender.eventlog.threat_path` |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `av_tamper_blocked` / `default`
- `network_protection_block` / `default`

### Surfaces with no `win.defender.eventlog.` field

These populate portable families only.
Looking for a feed-namespaced field on one of them finds nothing, and that is the design rather than a gap: the value has a cross-feed home instead.

- `protection_disabled` / `disabled`
- `protection_disabled` / `enabled`
