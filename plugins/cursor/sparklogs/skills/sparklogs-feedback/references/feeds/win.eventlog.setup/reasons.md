<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Reasons: `win.eventlog.setup`

Each section below is complete for its reason: every public field, in the words the reference page shows.
Search for the heading "## `<code>`" or a word from the reason's label. Do not read the whole file.

| reason | label | kind | severity | service | benign |
|---|---|---|---|---|---|
| `patch_install_failed` | patch install failed | event | Error | `patching` |  |
| `win_component_store_corruption` | win component store corruption | event | Notice to Warning | `patching` |  |

## `patch_install_failed`: patch install failed

An update or Windows package failed to install or uninstall.

**Also reported by:** `win.eventlog.system`

**Severity:** Error

**Why it matters:** The machine stays without that update, or keeps one it was meant to remove, until servicing succeeds.

**In practice:** Windows servicing writes event 3 to the Setup log (Event Viewer, Windows Logs, Setup, source Servicing) when a package such as a KB update or a Windows feature does not reach the state it was asked for. The line carries the package name, the target state (Installed or Absent) and the status code, with the code's name where Microsoft publishes one. Too little disk space, a pending restart, a damaged component store and a file another program holds are the usual causes, and the code usually says which. The same package failing on many machines points at the update. One machine failing many packages points at the machine.

**What to check:**

- Read the error code and its name on the line, and search the package name with that code.
- Check free space on the system drive and whether a restart is pending.
- Read C:\Windows\Logs\CBS\CBS.log around the failure time for the file or component that failed.
- For a store-corruption code, run DISM /Online /Cleanup-Image /RestoreHealth, then retry the update.

**Related:**

- `win_component_store_corruption`: a component-store scan that found damage, which often explains a failed install

**Example:** A cumulative update fails to install with 0x800f0831 (CBS_E_STORE_CORRUPTION) because the component store is damaged.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-setup#patch_install_failed, https://sparklogs.com/reference/reasons/patch_install_failed.json

## `win_component_store_corruption`: win component store corruption

A Windows component-store scan found damage that it did not repair.

**Also reported by:** `win.servicing.cbs`

**Severity:** Warning or Notice

**Why it matters:** Later updates and feature installs can fail on this machine until the component store is repaired.

**In practice:** The component store (C:\Windows\WinSxS) holds the files Windows servicing installs updates from. Windows servicing writes event 1014 to the Setup log when a store scan finishes, with the number of damaged items found and repaired, and event 1015 when some are left unrepaired. Only a 1014 with damage left over, and every 1015, land here. A scan that only checks reports nothing repaired by design: the line's DetectionOnly value says which kind of scan ran, and such a scan shows as Notice. A repair attempt that left damage, or a 1015, shows as Warning.

**What to check:**

- Compare the found and repaired counts on the line, and check DetectionOnly before reading zero repaired as a failed repair.
- Run DISM /Online /Cleanup-Image /RestoreHealth, then sfc /scannow, and read C:\Windows\Logs\CBS\CBS.log for what stayed damaged.
- If repair cannot reach Windows Update, point it at matching installation media with /Source.
- Check the system disk for errors if damage returns after a repair.

**Related:**

- `patch_install_failed`: an update that failed to install, which store damage often causes

**Example:** A detection scan reports 1662 instances of store corruption with none repaired.

**Docs:** https://sparklogs.com/docs/it-fleet-intelligence/reference/feeds/eventlog-setup#win_component_store_corruption, https://sparklogs.com/reference/reasons/win_component_store_corruption.json
