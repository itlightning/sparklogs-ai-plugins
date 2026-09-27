<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Expected patterns: `sparklogs.device.state`

A curated row renders `[<head>]<headline>[; <bare tokens>] | key=value ...`.
Pattern derivation strips `key=value` pairs by syntax and keeps bare words, so the head, the headline and the tokens ARE the pattern and the tail contributes nothing.

## What this catalog is

It is a DECISION PROCEDURE over pattern strings, not a list of them.
A pattern is expected when it decomposes into one headline below plus a legal value of that surface's slots, taken in the declared order.

Enumerating instead would be worse in both directions.
A slot renders nothing when its decode misses or the payload lacks the field, and the composer skips the slot without reordering, so ABSENT is a legal value of every slot and an enumeration has to multiply by it.
Crossing the vocabularies that way predicts thousands of combinations per surface, most of which cannot physically co-occur, and a catalog that predicts nearly everything makes the drift question vacuous: nothing is ever unexpected, so the alarm never fires.
Enumerating only what can co-occur has the opposite failure: which combinations are physically possible is fixed when the catalog is written, so every honest new combination reads as drift.
The grammar answers exactly the question the drift check asks, and its unexpected set stays meaningful: an unrecognized headline, a token from no declared vocabulary, or tokens out of slot order.

## How to decide

1. Drop a trailing ` |` if present, then split off the tail after it.
2. Match the longest surface head plus headline below that the pattern starts with. No match means the row is uncurated, not that it is unexpected.
3. The remainder is empty (every slot absent) or begins `; ` followed by space-separated tokens.
4. Walk the surface's slots in order, consuming each token with the first slot whose vocabulary contains it. A token no remaining slot accepts, or a slot order violation, is UNEXPECTED.

A surface marked **Pattern stability: none** below is excluded from step 2 entirely.
Its rendered text cannot survive pattern derivation, so a string that appears to carry it is not one of its rows and is filed uncurated.

An unexpected pattern is one of three things, in falling order of likelihood: a curated surface this catalog does not list, a vocabulary that gained a value, or a token rendered from something that is not a closed vocabulary at all. The third is the one that matters.

This module has 0 curated surface(s) and a legal-pattern language of 0 strings.
That number is why this file is a procedure and not a list.

## Surfaces

`(absent)` is legal in every slot and is not listed per row.
