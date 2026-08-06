# Expected patterns: `fixture.module`

Planted positive. The unmatched-head verdict is absent entirely, which is how a reworded
procedure would silently stop answering the question the gate asks.

## How to decide

1. Drop a trailing ` |` if present, then split off the tail after it.
2. Match the longest surface head plus headline below that the pattern starts with.
3. The remainder is empty or begins `; ` followed by space-separated tokens.
4. Walk the surface's slots in order, consuming each token with the first slot whose vocabulary
   contains it. A token no remaining slot accepts is a slot-order violation.
