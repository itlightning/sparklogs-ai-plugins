<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `sparklogs.agent.vector`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## Module-minted token slots

Rendered as bare words in the curated first line, so they are part of the derived pattern.

### `resume_rung_class`

How far the collector had to move to start reading a channel again, as a coarse class: it resumed from its stored bookmark, gave up a single record or a single boundary tick, jumped forward by seconds, jumped forward by minutes, or gave up on history entirely and read only what arrives next. Inline because the class is what decides how much was lost, so a reader scanning the line knows whether the gap is a handful of records or a window before opening anything. The exact ladder position stays queryable on its own field.

- `bookmark`
- `isolate_one`
- `skip_record`
- `boundary_tick`
- `time_jump_short`
- `time_jump_long`
- `future_only`

### `skip_cause`

Why a channel this host was configured to collect is not being collected. Inline because the FACT is identical on every one of these rows and the CAUSE is the whole of what a reader needs: a channel that does not exist on this machine and a channel the collector is not allowed to read are the same line with two completely different responses. A cause outside the four renders no token and stays countable through the raw field.

- `invalid_channel_path`
- `direct_channel`
- `operator_query_invalid`
- `access_denied`
