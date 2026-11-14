---
index: Suspicious PowerShell / script blocks
aliases:
  - label: Encoded PowerShell command
---

# PowerShell script blocks

**Trigger.** "The EDR flagged PowerShell on `<host>`", "what did this script do", "someone deleted shadow copies or turned Defender off", or an encoded command in an alert.

**Accuracy.** A script-block event records that PowerShell processed the block, not that a command ran or succeeded: confirm the outcome from the events the outcome writes (Did it take effect, below).
Watchlist matching reads the text: a command named in a comment or a string matches like one the block calls. Read the script (below) before trusting its category.
With script block logging off (the Windows default), PowerShell still logs the blocks it judges suspicious, at `level` (LQL) Warning; with it turned on by policy, it logs every block, at Verbose. Verbose 4104 rows prove full logging; Warning-only rows are consistent with the default. Either way, no event is not proof that no PowerShell ran.
Who ran it is `user_name` (LQL) (the SID is `user_id` (LQL)); the PowerShell process is `process_id` (LQL), the key that joins a block to its launch (event 400) and to process creation (Security 4688).
Script bodies pass credential redaction before they leave the host.

## Feed and fields

`win.powershell.eventlog` (value) binds the PowerShell Operational and Admin channels and the classic Windows PowerShell log.
Script-block records (event 4104) arrive as fragments and are merged into one event per block.
Module and pipeline records (4103) are kept only when the command they invoke is on the watchlist or the record is above Informational.
Engine error records (4100) carry no reason.
Classic engine starts (400) carry no reason but hold the launch: `message` (LQL) has `host_application="..."`, the full powershell.exe command line, and `EngineVersion=`.
Reasons, in `feeds/win.powershell.eventlog/reasons.md`:

| Reason | What it is |
|---|---|
| `win_powershell_script_block_sensitive_command` (value) | The block names a command on the watchlist. Variant `high_impact` (other) (Warning: for example deleting shadow copies, backups or volumes, clearing a log, disabling BitLocker or Defender, a credential from plaintext; the full list is `win.powershell.eventlog.block_watchlist_high_impact` (LQL) in `feeds/win.powershell.eventlog/fields.md`) or `routine` (other) (Notice: downloads, remoting, recursive deletes, execution-policy changes; Info when a known management agent's folder reruns it). A rerun of a watched block keeps this reason, as a repeat row |
| `win_powershell_script_block_repeated` (value) | A rerun of an unwatched block already stored from this host, shipped as a count with a pointer to the first full copy |
| `win_powershell_script_block_framework_code` (value) | Code PowerShell or a module generated (proxy modules, manifest data). Not a finding |

A full block with no watchlist match carries no reason.

Fields, in `feeds/win.powershell.eventlog/fields.md`:

| Field | Use |
|---|---|
| `event_data.ScriptBlockText` (LQL) | The script body, on a full copy only |
| `win.powershell.eventlog.block_watchlist` (LQL) | Categories matched: credentials, egress, execution, encoding, persistence, defence, privilege, removal, cloud, remoting |
| `win.powershell.eventlog.block_watchlist_hits` (LQL) | The terms that matched, for why a block landed in a category |
| `win.powershell.eventlog.block_watchlist_high_impact` (LQL) | True for the high-impact terms |
| `win.powershell.eventlog.block_calls` (LQL), `win.powershell.eventlog.block_targets` (LQL) | Commands the block calls; the paths, hosts, URIs or accounts its parameters name |
| `win.powershell.eventlog.block_payload` (LQL) | What decoding a `FromBase64String` payload found: `watched` (other) (the decoded text names a watchlist command), `clean` (other) (decoded, nothing watched), `runtime` (other) (built while the script runs, not decoded), `oversized` (other) (too large to decode), `undecodable` (other) (not base64 text) |
| `win.powershell.eventlog.block_obfuscation_signals` (LQL) | 0 to 3: a long base64 string, repeated concatenation, heavy backtick use |
| `win.powershell.eventlog.block_hash` (LQL) | One hash per script, the same across hosts |
| `win.powershell.eventlog.block_repeat_count` (LQL) | On a repeat row, runs since the first full copy, that copy and this run included |
| `win.powershell.eventlog.block_partial` (LQL), `win.powershell.eventlog.body_truncated` (LQL) | The body is only part of the script |

## Reasoning

- Start from the high-impact blocks, then the rest of the watched ones: they name the operations an attacker and a careless admin both use. An empty `high_impact` (other) set is the normal case.
- An encoded command is not malicious by itself: installers and management tools decode payloads. A `watched` (other) payload is the one to read first; otherwise weigh `win.powershell.eventlog.block_payload` (LQL) and the obfuscation signals with what the block calls and targets.
- The same `win.powershell.eventlog.block_hash` (LQL) on many hosts at the same times is usually your own automation (RMM, scheduled task). One host, an unfamiliar hash, an interactive user: read it.
- Count runs from the counter, not from rows. Repeat rows are throttled per script (`sparklogs.throttle.suppressed_prev` (LQL) counts the rows held back since the last one shipped), so a row count undercounts. Runs since a full copy are the highest `win.powershell.eventlog.block_repeat_count` (LQL) among the repeat rows pointing at it; a new full copy restarts the counter, so add the highest count of each copy.
- A block in several categories counts once in each category when grouped by `win.powershell.eventlog.block_watchlist` (LQL); do not sum the groups.
- Framework-code blocks name destructive cmdlets they never run. Pass over them.

## Events

Every watched block, by category:

```lql
source = "<host>" AND sparklogs.reason = win_powershell_script_block_sensitive_command
```

Group by `sparklogs.reason_variant` (LQL), `win.powershell.eventlog.block_watchlist` (LQL); then read the hits, calls and targets.

Encoded payloads that decode to a watched command:

```lql
source = "<host>" AND win.powershell.eventlog.block_payload = watched
```

All encoded or obfuscated blocks:

```lql
source = "<host>" AND win.powershell.eventlog.block_watchlist: encoding
```

Group by `win.powershell.eventlog.block_payload` (LQL), `win.powershell.eventlog.block_obfuscation_signals` (LQL).

**Read the script.** `message` (LQL) is a one-line summary, not the script. The body is `event_data.ScriptBlockText` (LQL) on the full copy: read the full script text, since a long body is cut in a first response and the query tools can return it untruncated (`guides/mcp-tool-decision-tree.md`, When the response is large).
A repeat row carries no body, calls or targets: its `message` (LQL) ends with `first_seen_record_id=<id>`, the record that holds the full copy:

```lql
source = "<host>" AND subsource = "win.powershell.eventlog" AND record_id = <first_seen_record_id>
```

`win.powershell.eventlog.block_partial` (LQL) or `win.powershell.eventlog.body_truncated` (LQL) true means the body is only part of the script.

How PowerShell was launched (classic log event 400, throttled per command line):

```lql
source = "<host>" AND subsource = "win.powershell.eventlog" AND provider_name = "PowerShell" AND event_id = 400 AND message: "-EncodedCommand"
```
<!-- confirmed with data on 2026-11-12 -->

Read `host_application` (other) in `message` (LQL) for the launch flags and any `-Command` text; the encoded payload is redacted there, and the decoded script is the 4104 with the same `process_id` (LQL).
`EngineVersion=2.0` on a 400 (`message: "EngineVersion=2.0"` (LQL)) is the version-2 engine, which writes no script-block records: a logging downgrade to explain.

Where else the same script ran:

```lql
win.powershell.eventlog.block_hash = "<hash>"
```

Group by `source` (LQL).

What else the user ran around it, including unwatched blocks:

```lql
source = "<host>" AND subsource = "win.powershell.eventlog" AND provider_name = "Microsoft-Windows-PowerShell" AND event_id = 4104 AND user_name = "<user>" AND NOT sparklogs.reason = win_powershell_script_block_framework_code
```
<!-- confirmed with data on 2026-11-12 -->

Narrow to the minutes around the block and read `message` (LQL) in time order.
Defender detections in the same window: `themes/endpoint-protection.md`.
Process creation (`themes/windows-security-and-audit.md`, 4688, only where process-creation auditing is on): the PowerShell process itself is `win.eventlog.security.new_process_id` (LQL), and a process it started has it as creator in `event_data.ProcessId` (LQL), both lowercase hex of `process_id` (LQL) (`"0x<hex>"`).

## Did it take effect

The block shows intent. These events show the outcome; read them on the same host after the block's time:

```lql
source = "<host>" AND sparklogs.reason in (scheduled_task_created, scheduled_task_updated, service_installed, audit_log_cleared, av_protection_disabled, av_tamper_blocked)
```

Group by `sparklogs.reason` (LQL). Scheduled-task and log-clear reasons need Security auditing on; `service_installed` (value) also comes from the System log.
Task Scheduler's own records of a task registered, updated or deleted are kept whether or not auditing is on: `playbooks/scheduled-task-failures.md` (**Changed, disabled or deleted**). Windows updates its own tasks often, so keep to the block's minutes.
A service the block installed or reconfigured that then fails to start: `playbooks/service-failures.md`.
Shadow copies: no event names a shadow-copy deletion itself; the volsnap events and shadow storage use in `playbooks/windows-vss.md` show what changed.
Egress: `uri=` and `host=` entries in `win.powershell.eventlog.block_targets` (LQL) name where the block meant to send; whether anything left is off-endpoint.
For the wider window, `playbooks/what-changed.md` sweeps every change on the host.

**Off-endpoint:** what the EDR console saw or blocked, the script library of the RMM that may have sent it, the proxy or firewall record of an egress target, and the remote host named in a remoting target.
