<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `win.eventlog.system`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## Module-minted token slots

Rendered as bare words in the curated first line, so they are part of the derived pattern.

### `cper_severity_word`

The severity a WHEA-Logger 1 hardware error record states in its own header, in plain words: unrecoverable is what the header calls fatal, recoverable is uncorrected but contained.

- `unrecoverable`
- `recoverable`
- `corrected`
- `informational`

### `cper_where_first`

Where the error details of a WHEA-Logger 1 record are. details_in_firmware: every section is a firmware error record reference, so the details stay in the platform firmware and are not in the event. Otherwise the first of up to three kinds of error section the record carries, in this order: memory, pcie, processor (processor generic and IA32/x64 machine check), generic, firmware (a firmware reference beside other sections), unrecognized (a section type with no published name).

- `details_in_firmware`
- `memory`
- `pcie`
- `processor`
- `generic`
- `firmware`
- `unrecognized`

### `cper_where_second`

The second kind of error section a WHEA-Logger 1 record carries, in the same fixed order as cper_where_first.

- `pcie`
- `processor`
- `generic`
- `firmware`
- `unrecognized`

### `cper_where_third`

The third kind of error section a WHEA-Logger 1 record carries, in the same fixed order as cper_where_first.

- `processor`
- `generic`
- `firmware`
- `unrecognized`

### `shutdown_cause`

What ended the previous session, as far as Kernel-Power 41 states it. `bugcheck` means the record carries a nonzero bug check code. `undetermined` means it carries none: a power loss, a hang or a held power button all read the same, so no cause is claimed.

- `bugcheck`
- `undetermined`

### `reclaim_cause`

Which ceiling the volume snapshot driver was holding to when it reclaimed the oldest shadow copy: the disk space shadow copies may occupy on the volume, the number of shadow copies that may exist for it, or copies already marked for deletion being cleared so that newer ones can be kept. The three are the axes to compare when a restore point a customer expected is missing.

- `space_limit`
- `count_limit`
- `delete_pending`
