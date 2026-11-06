<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.defender.eventlog`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `av_config_changed` | av config changed | event | Warning | `endpoint_protection` |  |
| `av_definition_update_failed` | av definition update failed | event | Warning to Error | `endpoint_protection` |  |
| `av_engine_failed` | av engine failed | event | Error | `endpoint_protection` |  |
| `av_protection_disabled` | av protection disabled | event | Notice to Serious | `endpoint_protection` |  |
| `av_scan_failed` | av scan failed | event | Warning | `endpoint_protection` |  |
| `av_suspicious_behavior_detected` | av suspicious behavior detected | event | Warning | `endpoint_protection` |  |
| `av_tamper_blocked` | av tamper blocked | event | Warning | `endpoint_protection` |  |
| `av_threat_detected` | av threat detected | event | Warning to Error | `endpoint_protection` |  |
| `av_threat_not_remediated` | av threat not remediated | event | Serious | `endpoint_protection` |  |
| `av_threat_remediated` | av threat remediated | event | Warning | `endpoint_protection` |  |
| `av_threat_remediation_failed` | av threat remediation failed | event | Error | `endpoint_protection` |  |
| `defender_asr_blocked` | defender asr blocked | event | Warning | `endpoint_protection` |  |
| `defender_network_protection_blocked` | defender network protection blocked | event | Warning | `endpoint_protection` |  |

## `av_config_changed`: av config changed

Microsoft Defender recorded a change to a setting that controls how much it protects.

**Severity:** Warning

**Why it matters:** A new exclusion, real-time monitoring or antispyware turned off, tamper protection changed, or cloud reporting changed can let malware run or go unreported on this machine.

**In practice:** Defender writes event 5007 in Microsoft-Windows-Windows Defender/Operational whenever its configuration changes, with Old Value and New Value naming the registry setting. This reason covers only the settings attackers and careless installers reach for: Exclusions, DisableRealtimeMonitoring, DisableAntiSpyware, TamperProtection and SpyNetReporting (cloud protection reporting). Other 5007 changes, such as update locations and scan schedules, are routine and are not part of this reason.

**When to ignore:** A change that matches a policy you deployed, at the time you deployed it, is the policy taking effect.

**What to check:**

- Read Old Value and New Value: which setting changed, and to what.
- Check whether Group Policy, Intune or your security tooling made the change; an exclusion nobody approved is a defense-evasion signal.
- List current exclusions with `Get-MpPreference` and remove any that are not sanctioned.

**Related:**

- `av_protection_disabled`: a protection component reported as turned off
- `av_tamper_blocked`: a change to Defender settings that tamper protection stopped

**Example:** A new folder exclusion appears under the Defender Exclusions\Paths policy key on a workstation.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_config_changed, https://sparklogs.com/reference/reasons/av_config_changed.json

## `av_definition_update_failed`: av definition update failed

Microsoft Defender failed to update its security intelligence or engine, or rolled its security intelligence back to an earlier version.

**Severity:** Error / Warning

**Why it matters:** Defender keeps scanning with the definitions it had, so new threats can go unrecognized until a later update succeeds.

**In practice:** Defender writes event 2001 when a security intelligence update fails, 2003 when an engine update fails and 2004 when it reverts to an earlier security intelligence version, all in Microsoft-Windows-Windows Defender/Operational. The error code says why: 0x80072EE2, for example, is a timeout reaching the update source. A proxy or firewall blocking the update sources, an update source (WSUS or a file share) that no longer offers definitions, or a machine that is offline or behind a captive portal is the usual cause. A single failure often clears at the next update; failures that repeat for days leave the machine with stale definitions.

**When to ignore:** A single failure followed by a successful update (event 2000) within the day needs no action.

**What to check:**

- Read the error code and the current and previous security intelligence versions.
- Look for a later event 2000 (update succeeded) before treating it as stale definitions.
- Run `Update-MpSignature` on the machine and check proxy, firewall and update-source settings if it fails again.

**Related:**

- `av_engine_failed`: the engine or real-time protection failing, not the update
- `av_scan_failed`: a scan that did not complete, whatever the definitions

**Example:** A laptop behind a hotel captive portal fails a security intelligence update with error 0x80072EE2.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_definition_update_failed, https://sparklogs.com/reference/reasons/av_definition_update_failed.json

## `av_engine_failed`: av engine failed

A Microsoft Defender real-time protection feature failed, or the engine stopped on an unexpected error.

**Severity:** Error

**Why it matters:** Files may be opened and programs run without being scanned until the feature or engine recovers. The Windows Security app can show protection as off when nobody turned it off.

**In practice:** Defender writes event 3002 in Microsoft-Windows-Windows Defender/Operational when one real-time protection feature fails, naming it in Feature Name, and event 5008 when the engine stops on an unexpected error. A conflicting security product, a damaged Defender installation or an engine or platform update that did not apply cleanly is the usual cause. Event 3007 records the feature returning to normal, so a 3007 soon after shows Windows recovered it.

**When to ignore:** A single 3002 followed within minutes by event 3007 for the same feature is a recovered fault.

**What to check:**

- Read Feature Name and the error code.
- Look for event 3007 for the same feature after it.
- If it repeats, check for another security product, then update the Defender platform or repair it.

**Related:**

- `av_definition_update_failed`: the update failing, while the engine keeps running
- `av_protection_disabled`: protection reported as turned off, rather than failing

**Example:** Defender's on-access protection fails with access denied (0x80070005) after a third-party security product is removed.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_engine_failed, https://sparklogs.com/reference/reasons/av_engine_failed.json

## `av_protection_disabled`: av protection disabled

Microsoft Defender real-time, antispyware or antivirus protection was turned off, or turned back on.

**Severity:** Serious or Notice

**Why it matters:** While it is off, Defender does not stop malware from running on this machine, and nothing else on the machine reports the gap.

**In practice:** Defender writes event 5001 when real-time protection is turned off, 5010 for antispyware scanning and 5012 for antivirus scanning, in Microsoft-Windows-Windows Defender/Operational. Events 5000, 5009 and 5011 record the same protection turned back on and are kept at Notice as the matching recovery. A user or administrator turning it off to get software past a block, a third-party antivirus taking over, a Defender update or policy change, or malware disabling protection before it runs are the usual causes.

**When to ignore:** The enable events at Notice are the recovery. A disable on a machine where your third-party antivirus has just taken over is expected.

**What to check:**

- Look for the matching enable event (5000, 5009 or 5011) to see how long protection was off.
- Check whether Intune, Group Policy, an installer or an administrator made the change.
- If none did, treat it as possible tampering and scan the machine.

**Related:**

- `av_config_changed`: a protection setting changed, which can lead to this
- `av_engine_failed`: protection failing on an error, not being turned off
- `av_tamper_blocked`: an attempt to change protection that tamper protection stopped

**Example:** Real-time protection is turned off on a workstation, and Defender logs event 5001.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_protection_disabled, https://sparklogs.com/reference/reasons/av_protection_disabled.json

## `av_scan_failed`: av scan failed

A Microsoft Defender scan failed before completing.

**Severity:** Warning

**Why it matters:** That scheduled or requested scan did not cover the machine, so a threat it would have found is still undetected.

**In practice:** Defender writes event 1005 in Microsoft-Windows-Windows Defender/Operational when a scan fails, with the error code. A cancelled or stopped scan is a different event, 1002, and is not part of this reason: sleep, shutdown and users stopping scans make that one common. The error code is a Windows error code: 0x8007000E, for example, is out of memory.

**When to ignore:** A single failure followed by a completed scan at the next schedule needs no action.

**What to check:**

- Read the error code and Scan ID.
- Check whether the next scheduled scan completed (event 1001).
- If scans keep failing, look up the error code, then run `Start-MpScan` by hand to reproduce it.

**Related:**

- `av_definition_update_failed`: definitions that did not update, which weakens every scan
- `av_threat_detected`: a scan that completed and found something

**Example:** A scheduled quick scan on a workstation fails with error 0x8007000E (out of memory).

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_scan_failed, https://sparklogs.com/reference/reasons/av_scan_failed.json

## `av_suspicious_behavior_detected`: av suspicious behavior detected

Microsoft Defender behavior monitoring detected suspicious behavior.

**Severity:** Warning

**Why it matters:** A program on the machine did something Defender links to malware, such as dropping or launching files in unusual places. Whether it was stopped shows in the detection and action events that follow.

**In practice:** Defender writes event 1015 in Microsoft-Windows-Windows Defender/Operational when behavior monitoring flags what a process is doing, rather than a known file. Threat Name, Path and Process Name say what was flagged and which process did it. Admin tools, scripts and installers can trip it, so the process and path matter more than the event itself.

**What to check:**

- Read Threat Name, Path and Process Name.
- Look for detection (1116) and action (1117) events for the same path just after.
- If the process is an approved tool, record it; if not, scan the machine and check how the file arrived.

**Related:**

- `av_threat_detected`: Defender identifying a specific threat, often right after this
- `av_threat_remediation_failed`: Defender failing to clean up after a detection

**Example:** cmd.exe launches a program from C:\Windows\Temp, and Defender behavior monitoring flags it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_suspicious_behavior_detected, https://sparklogs.com/reference/reasons/av_suspicious_behavior_detected.json

## `av_tamper_blocked`: av tamper blocked

Microsoft Defender tamper protection blocked a settings change.

**Severity:** Warning

**Why it matters:** Something tried to weaken Defender and was stopped, so protection is intact. Repeated blocks mean a script, installer or policy keeps trying, or someone is attempting to disable protection.

**In practice:** Defender writes event 5013 in Microsoft-Windows-Windows Defender/Operational when tamper protection stops a change to its settings, such as turning off real-time protection or adding an exclusion. Tamper protection blocks changes to protected settings made through the registry or Group Policy, even when Group Policy reports success.

**What to check:**

- Look for a policy refresh, an installer or a script running at the same time.
- If your own policy sets a protected setting, change the tamper protection policy or exclude those devices in Intune or Configuration Manager. Troubleshooting mode allows a temporary change on one device.
- Repeated blocks with no management cause: treat as attempted tampering and scan the machine.

**Related:**

- `av_config_changed`: a Defender setting change that went through
- `av_protection_disabled`: protection actually turned off

**Example:** A script on a workstation tries to turn off real-time protection, and tamper protection blocks it.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_tamper_blocked, https://sparklogs.com/reference/reasons/av_tamper_blocked.json

## `av_threat_detected`: av threat detected

Microsoft Defender detected malware or potentially unwanted software.

**Severity:** Error or Warning

**Why it matters:** A threat was found on the machine. Whether it was removed shows in the action event that follows, and until then it may still be present.

**In practice:** Defender writes event 1116 in Microsoft-Windows-Windows Defender/Operational when it detects malware or potentially unwanted software (older platform versions write 1006). The event names the threat, its severity and category, the file path, the process involved, how it was detected and the user. Defender rates each threat Low, Moderate, High or Severe; High and Severe detections are recorded at Error, the rest at Warning. The outcome follows as event 1117 (action taken), or 1118 and 1119 when the action failed.

**When to ignore:** A low-severity potentially unwanted application that Defender then quarantined, on a machine with no repeat, needs no more than a note.

**What to check:**

- Read Threat Name, Severity Name, Path, Process Name, Detection Source and User.
- Find the outcome event (1117, 1118 or 1119) for the same threat.
- For a High or Severe threat, or one that comes back after removal, find how it arrived and scan the machine fully.

**Related:**

- `av_threat_not_remediated`: the threat was allowed to stay
- `av_threat_remediated`: Defender reports it took an action on the threat
- `av_threat_remediation_failed`: Defender tried to act on the threat and failed

**Example:** A user downloads a file, and Defender detects TrojanDownloader:Win32/Banload in their Downloads folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_threat_detected, https://sparklogs.com/reference/reasons/av_threat_detected.json

## `av_threat_not_remediated`: av threat not remediated

Microsoft Defender detected a threat and allowed it to stay.

**Severity:** Serious

**Why it matters:** The detected item is still on the machine and can run. Defender stops alerting on an allowed item, so this is the last record of it.

**In practice:** Defender writes event 1117 in Microsoft-Windows-Windows Defender/Operational (1007 on older platform versions) with the action it took on a detection. This reason is the Allow action: a user, an administrator or a policy chose to let the item stay. Attackers add allows and exclusions to keep their tools running, so an allow nobody approved is a defense-evasion signal.

**What to check:**

- Find who allowed the item: the User field, an administrator, or a policy.
- Read Threat Name and Path, and check the allowed threats and exclusions with `Get-MpPreference`.
- If nobody approved it, remove the allow and scan the machine.

**Related:**

- `av_threat_detected`: the detection this outcome answers
- `av_threat_remediated`: the same event when Defender quarantined or removed the item
- `av_threat_remediation_failed`: Defender tried to remove the item and failed

**Example:** A user allows a toolbar Defender flagged as potentially unwanted software in Program Files.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_threat_not_remediated, https://sparklogs.com/reference/reasons/av_threat_not_remediated.json

## `av_threat_remediated`: av threat remediated

Microsoft Defender took an action on a detected threat.

**Severity:** Warning

**Why it matters:** Defender quarantined, removed or cleaned the item, so the threat that was found is no longer active. How it got onto the machine is still open.

**In practice:** Defender writes event 1117 in Microsoft-Windows-Windows Defender/Operational (1007 on older platform versions) after it acts on a detection, with Action Name, the path and an error code. An Allow action is a different reason, because the item stays.

**When to ignore:** A one-off quarantine of a low-severity item with no repeat needs no action beyond the record.

**What to check:**

- Read Action Name and the error code.
- Check whether the same threat returns: a repeat means its source, such as a download location, a share or a startup entry, is still there.

**Related:**

- `av_threat_detected`: the detection this outcome answers
- `av_threat_not_remediated`: the threat was allowed to stay
- `av_threat_remediation_failed`: the action failed and the threat may remain

**Example:** Defender quarantines TrojanDownloader:Win32/Banload from a user's Downloads folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_threat_remediated, https://sparklogs.com/reference/reasons/av_threat_remediated.json

## `av_threat_remediation_failed`: av threat remediation failed

Microsoft Defender tried to remediate a detected threat and failed.

**Severity:** Error

**Why it matters:** The threat may still be on disk or running, because the cleanup did not complete.

**In practice:** Defender writes event 1118 in Microsoft-Windows-Windows Defender/Operational when an action on a detection fails, and 1119 when it fails critically (1008 on older platform versions). A file held open by a running process, a threat inside an archive or container, or a pending restart is the usual cause, and Defender often succeeds on a later attempt. Malware that defends itself produces the same event.

**What to check:**

- Read the error code and Path.
- Look for a later 1117 for the same threat, which shows a retry succeeded.
- If none follows, restart and run a full scan, or a Microsoft Defender Offline scan (`Start-MpWDOScan`).

**Related:**

- `av_threat_detected`: the detection this outcome answers
- `av_threat_not_remediated`: the item was allowed rather than cleaned
- `av_threat_remediated`: the action succeeded

**Example:** Defender cannot quarantine a malicious file because the process using it holds it open.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#av_threat_remediation_failed, https://sparklogs.com/reference/reasons/av_threat_remediation_failed.json

## `defender_asr_blocked`: defender asr blocked

A Microsoft Defender attack surface reduction rule blocked an operation.

**Severity:** Warning

**Why it matters:** The blocked action did not happen. If it was malware, the rule stopped it; if it was a business application, users see that application fail.

**In practice:** Defender writes event 1121 in Microsoft-Windows-Windows Defender/Operational when an attack surface reduction rule in block mode stops an operation, with the rule ID, the path and the process. The rule ID names the rule, such as blocking Office applications from creating child processes. Audit mode writes event 1122 for what a rule would have blocked; those rows are not part of this reason.

**When to ignore:** Repeated blocks of a known business application that you have chosen not to exclude are expected.

**What to check:**

- Read the rule ID, Path and Process Name.
- If the process is a business application, add a per-rule exclusion for it through your management tool.
- If not, find what the process was trying to run and scan the machine.

**Related:**

- `av_suspicious_behavior_detected`: behavior monitoring flagging a process, without a rule block
- `defender_network_protection_blocked`: a blocked network connection, not an operation on the machine

**Example:** The rule that blocks Office applications from creating child processes stops winword.exe from starting a program in the user's Downloads folder.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#defender_asr_blocked, https://sparklogs.com/reference/reasons/defender_asr_blocked.json

## `defender_network_protection_blocked`: defender network protection blocked

Microsoft Defender Network Protection blocked a connection.

**Severity:** Warning

**Why it matters:** The program or browser on the machine could not reach that destination. If the destination was malicious, the block stopped the connection; if it was needed for work, users see it fail.

**In practice:** Defender writes event 1126 in Microsoft-Windows-Windows Defender/Operational when Network Protection, in block mode, stops a connection to a domain or address Microsoft rates as malicious or that your policy blocks. Audit mode writes event 1125 for what it would have blocked; those rows are not part of this reason.

**What to check:**

- Read the destination and process in the rendered event when present.
- Repeated blocks from the same process point at malware calling out; scan the machine.
- A blocked business site needs an allow indicator in your management tool.

**Related:**

- `av_suspicious_behavior_detected`: behavior monitoring flagging a process
- `defender_asr_blocked`: a rule blocking an operation on the machine, not a connection

**Example:** Network Protection blocks a connection from a workstation to a malicious domain.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/defender-eventlog#defender_network_protection_blocked, https://sparklogs.com/reference/reasons/defender_network_protection_blocked.json
