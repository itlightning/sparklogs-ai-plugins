<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.defender.eventlog`

Open this file and search the reason heading. Do not read the whole file.
Every section below is from the public reason block only.

| reason | service | severity |
|---|---|---|
| `asr_block` | `endpoint_protection` | Warning |
| `av_config_tamper` | `endpoint_protection` | Warning |
| `av_tamper_blocked` | `endpoint_protection` | Warning |
| `av_threat_detected` | `endpoint_protection` | Error (Defender high/severe detection) / Warning |
| `defender_engine_failed` | `endpoint_protection` | Error |
| `defender_scan_failed` | `endpoint_protection` | Warning |
| `definition_update_failed` | `endpoint_protection` | Error / Warning |
| `network_protection_block` | `endpoint_protection` | Warning |
| `protection_disabled` | `endpoint_protection` | Serious (disabled) / Notice (enabled) |
| `suspicious_behavior` | `endpoint_protection` | Warning |
| `threat_not_remediated` | `endpoint_protection` | Serious |
| `threat_remediated` | `endpoint_protection` | Warning |
| `threat_remediation_failed` | `endpoint_protection` | Error |

## `asr_block`

Microsoft Defender Attack Surface Reduction blocked an operation.

**Severity:** Warning

**Impact:** A configured ASR rule prevented behavior that policy considers risky or unwanted.

**Consider:**

- Review rule ID, Path, and Process Name.
- Distinguish enforce-mode blocks from audit-mode would-block records.

## `av_config_tamper`

Microsoft Defender recorded a configuration change to a protection-sensitive setting.

**Severity:** Warning

**Impact:** Exclusions or protection settings may have changed, which can weaken prevention, detection, or cloud reporting.

**Consider:**

- Review Old Value and New Value.
- Check whether the change came from approved GPO, Intune, or EDR policy.

## `av_tamper_blocked`

Microsoft Defender tamper protection blocked a settings change.

**Severity:** Warning

**Impact:** A protection weakening attempt was blocked; repeated events may indicate a misapplied policy or hostile tampering.

**Consider:**

- Look for nearby configuration changes and policy refreshes.
- Treat repeated 5013 events differently from a one-time management action.

## `av_threat_detected`

Microsoft Defender detected malware or potentially unwanted software.

**Severity:** Error (Defender high/severe detection) / Warning

**Impact:** A threat was present or suspected on the host; cleanup status depends on later remediation events.

**Consider:**

- Pivot on Threat Name, Path, Process Name, Detection Source, and User.
- Pair with the later 1117, 1118, or 1119 outcome.

## `defender_engine_failed`

Microsoft Defender reported a protection feature or engine failure.

**Severity:** Error

**Impact:** Endpoint protection may be degraded until the feature or engine recovers.

**Consider:**

- Review Feature Name and Error Code.
- Look for later 3007 recovery context.

## `defender_scan_failed`

A Microsoft Defender scan failed before completing.

**Severity:** Warning

**Impact:** The host may have missed scheduled or requested malware scanning coverage for that run.

**Consider:**

- Review Scan ID and Error Code.
- Distinguish scan failed from scan cancelled.

## `definition_update_failed`

Microsoft Defender failed to update or reverted security intelligence.

**Severity:** Error / Warning

**Impact:** Defender may scan with stale or rolled-back signatures until a later update succeeds.

**Consider:**

- Review Current and Previous security intelligence Version.
- Look for later successful update events before opening a stale-definitions incident.

## `network_protection_block`

Microsoft Defender Network Protection blocked a connection.

**Severity:** Warning

**Impact:** A configured protection policy prevented access to a network destination considered risky.

**Consider:**

- Separate block-mode 1126 from audit-mode 1125.
- Review destination details when present in the rendered event.

## `protection_disabled`

Microsoft Defender protection was disabled, or later re-enabled for the same protection family.

**Severity:** Serious (disabled) / Notice (enabled)

**Impact:** While disabled, Defender may not provide the expected real-time, antispyware, or antivirus protection for the host.

**Consider:**

- Check whether Intune, GPO, installer activity, or an admin action caused the change.
- Pair disabled and enabled events before judging duration.

## `suspicious_behavior`

Microsoft Defender behavior monitoring detected suspicious behavior.

**Severity:** Warning

**Impact:** A process or file behaved in a way Defender considered suspicious; later threat outcome events may clarify whether it was blocked or cleaned.

**Consider:**

- Review Threat Name, Path, and Process Name.
- Look for adjacent detection or remediation events.

## `threat_not_remediated`

Microsoft Defender recorded a detection outcome where the item was allowed instead of remediated.

**Severity:** Serious

**Impact:** Potentially unwanted or malicious software may remain active or available on the host.

**Consider:**

- Validate who or what policy allowed the item.
- Review Threat Name, Path, Process Name, User, and exclusion policy.

## `threat_remediated`

Microsoft Defender took a remediation action for a detected threat.

**Severity:** Warning

**Impact:** The host had a threat finding; Defender reports that it acted on the finding.

**Consider:**

- Review Action Name and Error Code.
- Confirm whether the action cleaned, quarantined, removed, or allowed the item.

## `threat_remediation_failed`

Microsoft Defender tried to remediate a detected threat and failed.

**Severity:** Error

**Impact:** The detected threat may remain on disk or active because the cleanup action did not complete.

**Consider:**

- Review Error Code and the affected Path.
- Run follow-up scan or manual cleanup if the threat is still present.
