# Planted positives for the generated-reference gates

Each file here is deliberately WRONG in one named way, and `scripts/lint-generated-references.mjs`
fails unless every one of them trips the rule it was planted for.

A gate asserting that something is absent proves nothing on its own: it passes identically when it
is looking in the wrong place, matching the wrong shape, or matching nothing at all. These fixtures
are the negative proof, and they run on every validate rather than once at authoring time.

| Fixture | Rule it must trip | The defect it plants |
|---|---|---|
| `gate-a-evidence-column.md` | `A1-evidence-column` | a synced table carrying the library's spec/observed evidence columns |
| `gate-a-witness-prose.md` | `A2-evidence-prose` | the witness-counting instrument explained in prose |
| `gate-b-verdict-unexpected.patterns.md` | `B1-uncurated-verdict` | a decision procedure filing an unmatched head as unexpected |
| `gate-b-verdict-missing.patterns.md` | `B1-uncurated-verdict` | a decision procedure with no unmatched-head verdict at all |
| `gate-b-alnum-head-claim.patterns.md` | `B2-alnum-head-claim` | a surface with a digit-bearing reason name claiming it renders a stable named pattern. The file also carries a control surface with no digit, which must NOT fire |

Do not "fix" these files. Correcting one silently disarms the rule it proves.
