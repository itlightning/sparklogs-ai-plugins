---
index: Suspicious PowerShell / script blocks
aliases:
  - label: Encoded PowerShell command
---

# PowerShell script blocks

**Trigger.** "The EDR flagged PowerShell on `<host>`", "what did this script do", "someone deleted shadow copies or turned Defender off", or an encoded command in an alert.

**Accuracy.** A script-block event records that PowerShell processed the block, not that a command ran or succeeded.
Watchlist matching reads the text: a command named in a comment or a string matches like one the block calls. Read the block before trusting its category.
With script block logging off (the Windows default), PowerShell still logs the blocks it judges suspicious; with it turned on by policy, it logs every block. The data does not say which policy a host has, so no event is not proof that no PowerShell ran.
The user and process id are in `message` (LQL) ("script block by "<user>" pid ..."); no actor field carries them.
Script bodies pass credential redaction before they leave the host.

## Feed and fields

`win.powershell.eventlog` (value) binds the PowerShell Operational and Admin channels and the classic Windows PowerShell log.
Script-block records (event 4104) arrive as fragments and are merged into one event per block; module and pipeline records (4103) are kept as written; engine error records (4100) and classic engine starts (400) carry no reason.
Reasons, in `feeds/win.powershell.eventlog/reasons.md`:

| Reason | What it is |
|---|---|
| `win_powershell_script_block_sensitive_command` (value) | The block names a command on the watchlist. Variant `high_impact` (other) (Warning: deleting shadow copies, backups or volumes, clearing a log, disabling BitLocker or Defender, a credential from plaintext) or `routine` (other) (Notice: downloads, remoting, recursive deletes, execution-policy changes; Info when a known management agent's folder reruns it) |
| `win_powershell_script_block_repeated` (value) | A rerun of a block already stored from this host, shipped as a count with a pointer to the first full copy |
| `win_powershell_script_block_framework_code` (value) | Code PowerShell or a module generated (proxy modules, manifest data). Not a finding |

A full block with no watchlist match carries no reason.

Fields, in `feeds/win.powershell.eventlog/fields.md`:

| Field | Use |
|---|---|
| `win.powershell.eventlog.block_watchlist` (LQL) | Categories matched: credentials, egress, execution, encoding, persistence, defence, privilege, removal, cloud, remoting |
| `win.powershell.eventlog.block_watchlist_hits` (LQL) | The terms that matched, for why a block landed in a category |
| `win.powershell.eventlog.block_watchlist_high_impact` (LQL) | True for the high-impact terms |
| `win.powershell.eventlog.block_calls` (LQL), `win.powershell.eventlog.block_targets` (LQL) | Commands the block calls; the paths, hosts, URIs or accounts its parameters name |
| `win.powershell.eventlog.block_payload` (LQL) | What decoding a `FromBase64String` payload found; `runtime` (other) means the payload is built while the script runs and could not be decoded |
| `win.powershell.eventlog.block_obfuscation_signals` (LQL) | 0 to 3: a long base64 string, repeated concatenation, heavy backtick use |
| `win.powershell.eventlog.block_hash` (LQL) | One hash per script, the same across hosts |
| `win.powershell.eventlog.block_repeat_count` (LQL) | On a repeat row, runs within the repeat window |
| `win.powershell.eventlog.block_partial` (LQL), `win.powershell.eventlog.body_truncated` (LQL) | The body is only part of the script |

## Reasoning

- Start from the failure side, then the high-impact blocks: they name the operations an attacker and a careless admin both use.
- An encoded command is not malicious by itself: installers and management tools decode payloads. Weigh `win.powershell.eventlog.block_payload` (LQL) and the obfuscation signals with what the block calls and targets.
- The same `win.powershell.eventlog.block_hash` (LQL) on many hosts at the same times is usually your own automation (RMM, scheduled task). One host, an unfamiliar hash, an interactive user: read it.
- To count runs of one script, add the repeat rows to its first full copy; the repeat row is not a duplicate.
- Framework-code blocks name destructive cmdlets they never run. Pass over them.

## Events

The failure side on the host:

```lql
source = "<host>" AND subsource = "win.powershell.eventlog" AND severity >= warning
```

Group by `sparklogs.reason` (LQL), `win.powershell.eventlog.block_watchlist` (LQL), then read `message` (LQL) and the hits, calls and targets.

Every watched block, by category:

```lql
source = "<host>" AND sparklogs.reason = win_powershell_script_block_sensitive_command
```

Group by `sparklogs.reason_variant` (LQL), `win.powershell.eventlog.block_watchlist` (LQL).

Encoded or obfuscated blocks:

```lql
source = "<host>" AND win.powershell.eventlog.block_watchlist: encoding
```

Group by `win.powershell.eventlog.block_payload` (LQL), `win.powershell.eventlog.block_obfuscation_signals` (LQL).

Where else the same script ran:

```lql
win.powershell.eventlog.block_hash = "<hash>"
```

Group by `source` (LQL).

What else the user ran around it, including unwatched blocks:

```lql
source = "<host>" AND subsource = "win.powershell.eventlog" AND event_id = 4104
```
<!-- confirmed with data on 2026-11-12 -->

Narrow to the minutes around the block and read `message` (LQL) in time order.
Defender detections in the same window: `themes/endpoint-protection.md`. A process the block started: `themes/windows-security-and-audit.md` (4688).

**Off-endpoint:** what the EDR console saw or blocked, the script library of the RMM that may have sent it, and the remote host named in a remoting target.
