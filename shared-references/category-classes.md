# Category classes: NOTABLE, ELEVATED, RECOVERED (and BENIGN)

The `category` field's interpretation segment carries a **class**. Class encodes the **temporal shape**
of what the source observed, not how important it is. Importance is `severity`, which is fully
independent of class. Read both.

## The three signal classes

- **NOTABLE** answers *"what just happened"*: a discrete signal, an occurrence, onset, or transition.
- **ELEVATED** answers *"what has been going on"*: a sustained condition outside its normal band. An
  ELEVATED event carries the duration/extent fields that justify "sustained."
- **RECOVERED** is the closure of an ELEVATED condition (the band returned to normal). It is a lifecycle
  variant of NOTABLE, **not** a distinct class: it counts as NOTABLE everywhere (`cnt_notable`,
  `cnt_interesting`, retention, precedence).

`BENIGN` is unrelated to this axis: it labels a known false positive in raw log text (kept, capped at
Info). `CONTEXT` is the unlabeled default.

## Authoring test (for reading, too)

Pick class by temporal shape (discrete vs sustained), never by importance. So:

- ELEVATED + Info = busy but healthy.
- ELEVATED + Error = sustained degradation (e.g. IO latency held above threshold).
- NOTABLE + Info = a minor discrete signal.
- NOTABLE + Error = a breaking occurrence.

Never infer "worse" from ELEVATED vs NOTABLE. To rank concern, read `severity` (and `cnt_severe`).

## Pair convention (one slug across the lifecycle)

Onset, held, and closure of one condition share a single reason slug across the three classes:
`NOTABLE.io_saturated` (onset) -> `ELEVATED.io_saturated` (held) -> `RECOVERED.io_saturated` (closure).
Pivot on the slug to see a condition's full lifecycle without a join. A `RECOVERED.<slug>` always has a
matching `ELEVATED.<slug>` on the same source.

## Query notes

- **"Interesting" triage** (`cnt_interesting`, the interesting pattern HLL) = class in {NOTABLE,
  ELEVATED} OR severity >= Warning. RECOVERED is in via the NOTABLE arm.
- **NOTABLE counts include closures.** A flappy condition contributes both an onset (NOTABLE) and a
  closure (RECOVERED, counted as NOTABLE). To get onsets only, filter on the reason **slug**, not the
  class.
- **Fleet "currently degraded"** = the latest ELEVATED with severity >= Warning per host.
