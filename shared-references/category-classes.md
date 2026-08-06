# Classes, the category ladder, and severity

Three independent axes describe a curated event, and most wrong conclusions come from collapsing two
of them.

- **Class** is temporal SHAPE: did something happen, or is something holding?
- **Severity** is CONSEQUENCE: what it does to the device or the customer.
- **Reason** is IDENTITY: the stable name of the condition.

Read all three. None of them implies another.

## Class

| Class | Means |
|---|---|
| `NOTABLE` | a discrete occurrence, onset, or transition. Something happened |
| `ELEVATED` | a sustained condition, currently holding |
| `RECOVERED` | a condition that was watched clearing |
| `ENDED` | an episode terminated without anyone seeing it clear |
| `BENIGN` | a line whose TEXT reads like a problem and is not: a known false positive, kept and labeled |
| `CONTEXT` | kept, unlabeled: nothing claimed it as signal |

**`CONTEXT` is never written.** It is the ABSENCE of a class, not a value, so `sparklogs.class = CONTEXT`
returns zero rows on a fleet full of context rows. To select them, test for the absence:
`NOT sparklogs.class!`. To select context rows of a given morphology, filter on the kind instead,
which IS written: `sparklogs.kind = inventory`.

`NOISE` exists as an authoring outcome and never reaches you: it is the one class that drops an event.

**BENIGN is about TEXT, not outcome.** A routine success is `CONTEXT`, not `BENIGN`. `BENIGN` means a
naive reader would think the line is bad and it is not.

**`CONTEXT` is not "unimportant", it is "unrecognized".** Inventory rows normally carry no class at
all, and inventory is the ground truth of what is on the box. Excluding unclassed rows from an RCA
read throws away the answer to "what is actually installed, running and mounted here".

**Never infer "worse" from `ELEVATED` versus `NOTABLE`.** Concern rides severity.

- `ELEVATED` + Info: busy but healthy.
- `ELEVATED` + Error: sustained degradation.
- `NOTABLE` + Info: a minor discrete signal.
- `NOTABLE` + Error: a breaking occurrence.

## Open monitor is not a problem

An open monitor (a holding episode) is an interesting signal, not automatically something a human
must act on.

- Problemhood rides **severity** plus the MSP's own policy, never "there is an open monitor".
- Do not treat `open_monitors_count` or a dump of open episodes as the finding list.
- `ELEVATED` + Info can be normal forever on a large share of a fleet (busy CPU, SQL memory
  dominance, crash dumps disabled on desktops) and still matter as RCA context.

## The category ladder is class-LAST

`category` is a PROJECTION computed at emit from `topic`, `reason`, `class` and `kind`, each of which
is independently stamped as its own field on the same event.

```
disk_volumes.os_volume_space_exhausting.ELEVATED
disk_volumes.NOTABLE
disk_volumes.INVENTORY
hash_mismatch.NOTABLE
```

The class segment, when present, is LAST. `ELEVATED.os_volume_space_exhausting` is not a shape this
system produces, and neither is any ladder led by the module name: the producing module is already a
field (`subsource`), so it never leads the ladder.

**Never parse a field back out of the category.** Want the reason, read `sparklogs.reason`. Want the
class, read `sparklogs.class`. A value that lives only inside a dotted string looks right in an
example while the field it was supposed to mirror is quietly absent, and that is exactly how
recurrence and fleet grouping stop being answerable.

**An empty category is a legitimate answer**, not a gap: a curated event that nothing recognized
projects to nothing and says so.

**One reason spans a lifecycle.** Onset, hold and closure of one condition share a single reason:
`….<reason>.NOTABLE` at onset, `….<reason>.ELEVATED` while held, `….<reason>.RECOVERED` at clearance.
Group by `sparklogs.reason` to collapse a lifecycle into one finding. Treating the three as three
findings triples the apparent problem count.

**Say reason, not slug.** Older material calls this field a slug. It is `sparklogs.reason`, and MSPs
read it, so the word in your output is "reason".

## Severity

SparkLogs has one severity ladder, shared across every source, so a curated pack and a raw vendor log
rank against each other honestly.

| Band | Means |
|---|---|
| `Trace` / `Debug` | retained chatter and down-capped forensic records |
| `Verbose` | extra diagnostic detail above Debug, below everyday Info |
| `Info` | everyday operation |
| `Display` | UI-surfaceable everyday |
| `Notice` | notable-normal (an account was created) |
| `Warning` | degraded, or failed then auto-recovered; also the home for transitory failures |
| `Minor` | almost Error: a real failure claim with high flake or weak blast radius |
| `Error` | failed, unrecovered, bounded in scope |
| `Serious` | host- or workload-ticket grade |
| `Severe` | infra or multi-workload; availability-threatening |
| `Critical` | integrity or availability compromised |
| `Fatal` | lost, no self-recovery |

Severity is also an integer, 1 through 24, and the two forms are the same fact. **`critical+` means
severity >= 20.**

**Use the primary names.** Write `serious`, `minor`, `severe`. Do not write `error2`, `error4`,
`warn4` or the other OTel short forms in prose, filters or findings; they exist only as ingest
aliases that normalize third-party logs onto this ladder, and they are worth naming only when you are
explaining that normalization to someone.

**Critical+ is a fetch-first contract.** Any non-zero critical+ count in scope means: fetch those
events before proceeding, whatever the ticket was about. Producers admit `Critical` only for facts an
engineer working an unrelated issue must always be told, so the count is small and always material.
The Info through Error bands carry no such mandate: read and weigh them on their evidence.

**Severity is not the provider's opinion.** Windows logging a routine auth denial at Error is that
vendor's taxonomy. A curated pack re-grades by consequence.

## Kind, and why counts double

`sparklogs.kind` says what MORPHOLOGY a row is: `inventory`, `monitor`, `delta`, `agent_op`,
`config_change`. It is a different question from class and from severity.

Counts are keyed on `kind`, and one underlying fault can legitimately appear twice: a failing volume
shows up as a `monitor` row for the condition and again inside the `inventory` row for the box. That
is one fact with two witnesses, not two problems. Say which kind you counted.

## Query notes

- **"Interesting" triage** = class in {`NOTABLE`, `ELEVATED`, `RECOVERED`, `ENDED`} OR
  severity >= Warning.
- **`NOTABLE` counts include closures.** A flapping condition contributes an onset and a closure. For
  onsets only, filter on the reason and the transition, not on the class.
- **Fleet "currently degraded"** = the latest `ELEVATED` with severity >= Warning per host.
