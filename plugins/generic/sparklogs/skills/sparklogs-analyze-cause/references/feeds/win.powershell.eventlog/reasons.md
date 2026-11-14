<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.powershell.eventlog`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `win_powershell_script_block_framework_code` | win powershell script block framework code | event | Verbose | `security_audit` | benign |
| `win_powershell_script_block_repeated` | win powershell script block repeated | event | Info | `security_audit` |  |
| `win_powershell_script_block_sensitive_command` | win powershell script block sensitive command | event | Info to Warning | `security_audit` |  |

## `win_powershell_script_block_framework_code`: win powershell script block framework code

A PowerShell script block that is generated code, such as the proxy module PowerShell builds when a command set is imported, or the data block of a module manifest.

**Severity:** Verbose

**Why it matters:** None on its own. It shows which PowerShell command sets are imported on the host.

**In practice:** PowerShell writes event 4104 (Event Viewer, Applications and Services Logs, Microsoft, Windows, PowerShell, Operational) for each script block it processes while script block logging is on. This line reads "framework block" and names the signature that matched, the functions the block declares, the commands it calls and a content hash. The block is code PowerShell or a module generated: a CIM cmdlet proxy set, an implicit-remoting proxy, a diagnostic package, or a module manifest's data block. It is the same on every host that imports the same module, so it shows which command sets are in use there, not what anyone ran. Generated code is not attached. A manifest data block keeps its text.

**When to ignore:** Pass over the command names inside these blocks: a storage proxy names Format-Volume and Remove-Item without either one running.

**What to check:**

- No action needed. Read the signature and declared names to see which command sets a host imports.
- The hash identifies the block if you need its text from the machine's own PowerShell Operational log.

**Related:**

- `win_powershell_script_block_repeated`: a rerun of a block already stored in full, shipped as a count
- `win_powershell_script_block_sensitive_command`: a block naming a watched command. Generated code that wraps such commands lands here instead

**Example:** Importing a CIM-based module compiles its cmdletization proxy, which declares __cmdletization_BindCommonParameters and calls Set-StrictMode.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/powershell-eventlog#win_powershell_script_block_framework_code, https://sparklogs.com/reference/reasons/win_powershell_script_block_framework_code.json

Generated framework blocks are identical across every host that imported the same module, so they are useful for inventory questions and not for questions about what a person did.

## `win_powershell_script_block_repeated`: win powershell script block repeated

A PowerShell script block ran again with the same content as one already stored from this host, so the event counts the run without a second copy of the script.

**Severity:** Info

**Why it matters:** None on its own. It counts another run of a script already stored from this host.

**In practice:** PowerShell writes event 4104 to the Microsoft-Windows-PowerShell/Operational log for each script block it processes while script block logging is on. When the same block comes back, SparkLogs ships this short line instead of the text: a repeat count, when the text was first stored and the record id that holds it. GUIDs and per-run temporary module names are ignored when blocks are compared, so two runs that differ only in such an identifier count as the same block. Scheduled tasks and management agents that rerun the same script are the usual source.

**When to ignore:** Routine for any script that runs on a schedule. Pass over it unless the script it points to is one you did not expect.

**What to check:**

- Follow first_seen_record_id to the record that holds the full script text.
- For a run rate, count these lines together with the first full copy. The repeat count covers this run too.

**Related:**

- `win_powershell_script_block_framework_code`: the other block that ships without its text: generated module code
- `win_powershell_script_block_sensitive_command`: a repeated block that names a watched command keeps that reason, not this one

**Example:** A monitoring script that runs every few minutes ships its full text once, then "repeat 2 of" lines that point back at that first record.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/powershell-eventlog#win_powershell_script_block_repeated, https://sparklogs.com/reference/reasons/win_powershell_script_block_repeated.json

Counting runs of one script means counting these receipts plus the first full copy; the receipt is not a duplicate of that copy and should not be filtered out of a rate.

## `win_powershell_script_block_sensitive_command`: win powershell script block sensitive command

A PowerShell script block named a command on the watchlist of operations worth reviewing, such as deleting data, changing a protection setting, handling a credential, or sending data out.

**Severity:** Warning when the block names a high-impact command (deleting shadow copies, backups, volumes, directory objects or virtual machines, clearing a log, disabling BitLocker, System Restore or Defender, building a credential from plaintext); Notice for every other watched command. A rerun of a script from a management agent directory is Info. Never a failure claim: the event records the block, not an outcome.

**Why it matters:** The named command was in a block processed on this host. Whether it ran, and what it did, is not recorded here, so treat it as a pointer into the script, not an outcome.

**In practice:** PowerShell writes event 4104 to the Microsoft-Windows-PowerShell/Operational log for each script block it processes while script block logging is on. This line names the family of the watched command the block contains, such as "script block with a watched data-removal command", then the tokens that matched, the commands it calls and any path, host or account its parameters name. The event records that the block was processed. It does not say the command ran or succeeded. A short high-impact set (deleting shadow copies, backups or volumes, clearing a log, disabling BitLocker or Defender, building a credential from plaintext) shows as Warning. Downloads, remoting, recursive deletes, execution-policy changes and the rest show as Notice. A rerun of a script from a known management agent's folder shows as Info.

**When to ignore:** Matching reads text, so a command named in a comment or a string scores like one the block calls. Read the block before trusting the family. Reruns from your own RMM or management tools are routine.

**What to check:**

- Start with the lines whose block_watchlist_high_impact field is true. The rest name routine administration.
- Read the matched words, the called names and any targets to see what the block was for.
- Decide whether the block belongs to automation you already run before treating it as unexpected.
- For an unexpected high-impact block, check who was signed in at that time and what else ran on the host.

**Related:**

- `win_powershell_script_block_framework_code`: generated module code that wraps the same command names and is not a finding
- `win_powershell_script_block_repeated`: a rerun of an unwatched block, shipped as a count

**Example:** An administrator's script opens a remote session with Enter-PSSession to fileserver01.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/powershell-eventlog#win_powershell_script_block_sensitive_command, https://sparklogs.com/reference/reasons/win_powershell_script_block_sensitive_command.json

Matching is text-based and has no PowerShell parser, so a command named inside a comment or a string scores like one that is called. Read the block before drawing a conclusion from the categories alone.
