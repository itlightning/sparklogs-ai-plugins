<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `win.eventlog.system`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## Module-minted token slots

Rendered as bare words in the curated first line, so they are part of the derived pattern.

### `reclaim_cause`

Which ceiling the volume snapshot driver was holding to when it reclaimed the oldest shadow copy: the disk space shadow copies may occupy on the volume, the number of shadow copies that may exist for it, or copies already marked for deletion being cleared so that newer ones can be kept. The three are the axes to compare when a restore point a customer expected is missing.

- `space_limit`
- `count_limit`
- `delete_pending`
