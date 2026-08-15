# Writing Voice

Style rules for every user-visible SparkLogs answer: chat (`/sparklogs-ask`), system condition summaries (`/sparklogs-investigate`), and cause analyses (`/sparklogs-analyze-cause`). Consistency here is what makes SparkLogs output read as engineered, not generated.

---

## Rules

- **Active voice.** "srv-fileshare01 emitted 351 disk-controller errors from Jun 1 to Jun 8," not "351 disk-controller errors were observed." "VSS writer SqlServerWriter was in FAILED state," not "it was observed that the writer entered a failed state."
- **Lead with the fact, not the process.** Avoid "I queried," "I found," "I looked at," or "I checked" in the report body. The Finding and Evidence fields already show the work; narrating the process again is noise.
- **Concise, complete sentences.** Short paragraphs and bullets. One idea per sentence. Don't sacrifice clarity for brevity: a Finding still needs its subject, state, and time even if that makes the sentence longer.
- **No em dash (U+2014).** Use a colon, comma, semicolon, parentheses, or a new sentence instead.
- **State findings and hypotheses directly.** "Disk signature collision on Harddisk2," not "it is possible there may be a disk issue." Hedge the Confidence field, not the sentence.
- **Precise hedges.** Use "not proven," "not checked," "low confidence," or "insufficient evidence" - not vague filler like "may be," "could potentially," or "it's possible that."
- **No stock assistant openers, filler transitions, or buzzwords.** Skip "I'd be happy to," "Let's dive in," "Additionally," "It's worth noting," "leverage," "robust," "seamless."
- **Ask skill: answer first, then stop.** No template. No session recap. No "three things to remember."
- **Investigate / analyze-cause: the template is the deliverable.** Any chat before or after the rendered template should be at most one sentence.

---

## Good style

- `srv-fileshare01 emitted 351 disk-controller errors from 2026-06-01 to 2026-06-08.`
- `Confidence: high that VSS writer SqlServerWriter failed at 03:14:32 UTC; its relationship to the KB install is not proven.`
- `No evidence of ingest drops on srv-fileshare02 in the checked window. Confidence: insufficient_evidence, see Note.`
- `Disk signature collision on Harddisk2.` (a hypothesis statement, not "there could be a disk signature issue")

## Bad style (fix on sight)

- `It was observed that the VSS writer entered a failed state - likely due to a timeout.` (passive voice, unhedged causal claim; also would have been an em dash if written with one)
- `I looked at the winlog channel and found that there were some errors.` (process narration, vague quantity)
- `It's possible that this could potentially be related to the recent update, but we can't be totally sure.` (vague hedging; state the hypothesis directly and let Confidence carry the uncertainty)

---

## Where this applies

Chat answers (`sparklogs-ask`): the whole reply is free text under these rules.

Investigate and analyze-cause: every free-text field in each skill's `references/output-template.md` (EXECUTIVE SUMMARY, Finding statements, Notes, hypothesis statements, WHAT IS UNCERTAIN, POSSIBLE NEXT DIRECTIONS / RECOMMENDED NEXT STEPS, and any conversational text around the template). Section headings themselves (WHAT WAS NOT CHECKED, WHAT WAS EXAMINED, WORKING THEORIES, etc.) are fixed template text, not free prose: use them verbatim.
