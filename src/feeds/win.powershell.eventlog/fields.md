<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.powershell.eventlog`

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

Message field extraction is disabled on this module.
The rendered `key=value` tail exists to be READ, not re-parsed: its values are not extracted into fields, so query the promoted field named for each tail key below, never the tail key itself.

## Module fields

Stored flat under the `win.powershell.eventlog.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.powershell.eventlog.block_hash` | string | SHA-256 of the whole script block (event 4104, all fragments joined), taken before any truncation, with GUIDs and per-run temporary module names blanked out. The same script shares one hash across machines and over time. Absent on an empty block. |
| `win.powershell.eventlog.block_fragments` | int | Number of 4104 fragments the script block was made of, at most the total the block stated. |
| `win.powershell.eventlog.block_redelivered` | int | Number of fragments Windows delivered twice for this block, beyond the total it stated. When present, the script body contains a repeated span. Absent when no fragment arrived twice. |
| `win.powershell.eventlog.block_chars` | int | Length of the whole script block in characters, counted before any truncation. |
| `win.powershell.eventlog.block_lines` | int | Number of lines in the whole script block. A newline at the very end does not count as an extra line. Zero for an empty block. |
| `win.powershell.eventlog.block_partial` | bool | True when fewer fragments arrived than the block stated, so the script body is only the start of the script. |
| `win.powershell.eventlog.body_truncated` | bool | True when the script body was cut at 256 KB and ends with a note saying how many bytes were cut. The hash, character count and byte length still describe the whole block. |
| `win.powershell.eventlog.body_length` | int | Size of the whole script block in bytes, before any truncation. Recognized framework blocks ship no body but still report their size here. |
| `win.powershell.eventlog.block_framework` | string | Name of the generated framework code the block matched, such as a CDXML proxy module, or the data section of a module manifest. Such blocks are code PowerShell or a module generated, not a script someone wrote. Empty when the block matched none. |
| `win.powershell.eventlog.block_watchlist` | array | Watchlist categories the block matched: credentials, egress (network transfers), execution, encoding, persistence, defence (security settings), privilege, removal, cloud and remoting. Empty when nothing matched. |
| `win.powershell.eventlog.block_watchlist_hits` | array | The first eight watchlist terms the block matched: cmdlet names, or command text such as `vssadmin delete shadows`. Shows why a block landed in a watchlist category. |
| `win.powershell.eventlog.block_watchlist_high_impact` | bool | True when the block matched a high-impact watchlist term: deleting shadow copies, backups, volumes, partitions, directory objects or virtual machines, clearing event logs, disabling BitLocker or System Restore, changing or stopping Defender, or handling a credential directly. Counts every matched term and the decoded text of a base64 payload. Absent when nothing matched. |
| `win.powershell.eventlog.block_declares` | array | First eight function and class names the block defines, in the order it defines them. Absent on a repeat row. |
| `win.powershell.eventlog.block_calls` | array | First ten Verb-Noun commands the block calls, leaving out output commands such as Write-Host. Absent on a repeat row. |
| `win.powershell.eventlog.block_targets` | array | First three targets the block names, each as `<type>=<value>`, where the type comes from the parameter that carried the value: a URI, a host, a path written to, a virtual machine, a computer name or a user. Credentials in them are redacted. Absent on a repeat row. |
| `win.powershell.eventlog.block_obfuscation_signals` | int | How many of three obfuscation signs the block shows, from zero to three: a long base64 string, repeated string concatenation, and heavy backtick use. Absent on a repeat row. |
| `win.powershell.eventlog.block_payload` | string | What SparkLogs found when it decoded the base64 payload of a block that calls FromBase64String: decoded text with no watchlist command or compression stream in it; decoded text with one; a payload built while the script runs, or a block too complex to follow, so it could not be decoded; a payload too large to decode; or a string that is not base64 text. Absent when the block makes no such call. |
| `win.powershell.eventlog.block_repeat_count` | int | On a repeat row, how many times this script block has run within the repeat window, this run included. A repeat row replaces the body with the time and record ID of the first full copy. Absent on a full copy. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `host_application` | not queryable as a field |
| `fully_qualified_error_id` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `win_powershell_script_block_framework_code` / `default` | 4104 | **fields: none** |  |
| `win_powershell_script_block_repeated` / `default` | 4104 | **fields: none** |  |
| `win_powershell_script_block_sensitive_command` / `high_impact` | 4104 | **fields: none** |  |
| `win_powershell_script_block_sensitive_command` / `routine` | 4104 | **fields: none** |  |
| `powershell_classic_engine_start` | 400 | **fields: none** |  |
| `powershell_error_record` | 4100 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `win_powershell_script_block_framework_code` / `default`
- `win_powershell_script_block_repeated` / `default`
- `win_powershell_script_block_sensitive_command` / `high_impact`
- `win_powershell_script_block_sensitive_command` / `routine`
- `powershell_classic_engine_start`
- `powershell_error_record`
