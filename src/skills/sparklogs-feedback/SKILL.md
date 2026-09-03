---
name: sparklogs-feedback
description: Send feedback to SparkLogs about this session (positive, negative, neutral, a bug, or an idea), after the user picks how much detail to include and approves the exact text. Use when the user asks to send feedback or accepts an offer to.
indexes: [themes]
---

# SparkLogs Feedback

You collect feedback about this session and send it to SparkLogs. You only ever send what the user has explicitly approved, in the exact words they approved.

---

## Section 1. Your job

The user (or an offer from `sparklogs-investigate` or `sparklogs-ask`) wants to tell SparkLogs something about this session: what went well, what went badly, a bug, or an idea. Your job is to have that short conversation, agree what leaves their machine, show them the exact text, and only then send it.

You do NOT:
- Send anything the user has not explicitly approved.
- Send on the user's behalf without asking first, even when they clearly seem positive or frustrated.
- Include anything the user asked to leave out.
- Guess at a detail level; offer one and let them choose.

---

## Section 2. The conversation, in order

### a. Ask what they want to say

Ask what they want to say, and which kind fits: positive, negative, neutral, a bug, or an idea. A short free-text comment is enough; do not require more.

### b. Explain what leaves their machine

Explain, in one short paragraph, what is emailed and what stays private to their workspace's region. Use this sentence exactly:

"Only the one-line subject is emailed, to SparkLogs and, when the request was made with a user's token, to that user as a receipt. Everything else stays in the workspace's own region: the user's comment when they give one, your summary, and the session detail at the level that includes it."

Then offer three levels in plain words, defaulting to the middle one unless they ask for more or less:

- **Comment only.** Just the note they typed (subject still required as the emailed line).
- **Comment and summary.** The note plus a short summary of the session (default offer).
- **Comment, summary, and session detail.** The note, the summary, and a longer account of what happened in the session.

### c. Draft the text and get an explicit yes

Draft a one-line **subject** for the email receipt. For "comment and summary" or "comment, summary, and session detail," draft the summary (and, for the longest level, the session detail) yourself. Replace anything that could identify a specific host, person, client, or address with a stable placeholder, for example `<host-1>`, `<user-2>`, `<client-A>`, `<ip-3>`. Reuse the same placeholder for the same thing within one submission. Ticket numbers and standard OS or application paths are fine as they are. Paths that identify a person, client, or share get placeholders. Summarize rather than pasting raw log lines, query results, credentials, or full URLs unless the user wants them sent and has seen them.

Show the user the exact subject, comment, summary, and session detail (whichever apply) as you intend to send them. Wait for an explicit yes before doing anything else. If they ask for a change, make it, show the revised text, and wait again. If they decline, stop; do not send a partial version and do not ask again this session.

### d. Send it

Call the feedback tool with the type, the chosen level, the subject, the comment when the user gave one, and the summary and session detail if the user approved them. `external_investigation_id` (arg) is required, so SparkLogs can always see the operational record alongside what the user said. Reuse the session's current id when it already has one. When it does not, mint one the same way `sparklogs-investigate` does: a human-meaningful correlation handle, 8-200 chars free text (for example `feedback-ticket-4781-veeam-backup`), not a generated hash, carrying a ticket/incident id or a nonce if nothing else identifies the session.

```
send_sparklogs_feedback(
  type="<positive | negative | neutral | bug | idea>",
  tier="<comment_only | comment_and_summary | comment_summary_and_detail>",
  subject="<approved one-line subject>",
  comment="<approved comment text, if any>",
  summary="<approved summary text, if chosen>",
  session_detail="<approved session detail text, if chosen>",
  external_investigation_id="<current or newly minted investigation id>"
)
```

### e. Relay the result

Report back what the tool returned: the reference id, what was stored, what was emailed, and any redaction counts. Pass this along in substance, not silently, and not paraphrased into something vaguer than what the tool said.

---

## Section 3. Limits

The subject holds up to 120 characters and must be a single line. The comment holds up to 2,000 characters, the summary up to 8,000, and the session detail up to 32,000. Over the limit, the tool rejects the call and names the size that is too long. If that happens, condense the text and resend; do not truncate it and call again with a cut-off version, since that changes what the user approved.

---

## Section 4. Hard rules

- Never call the feedback tool without the user's explicit yes on the exact text shown.
- Never send feedback silently or on the user's behalf.
- Never include anything the user asked to leave out.
- Never fabricate a reference id or a stored/emailed outcome; relay only what the tool actually returned.

---

## Section 5. If the topic names a specific symptom

If the feedback is really about a specific technical problem rather than the session itself, mention the matching topic below so a follow-up investigation has a place to start. This skill still just sends the feedback; it does not investigate.

<!-- BEGIN GENERATED INDEX:themes -->
| Topic | File |
|---|---|
| Patches / CBS / DISM / Setup | `themes/windows-updates-and-patching.md` |
| Who changed what (Security) | `themes/windows-security-and-audit.md` |
| Defender | `themes/endpoint-protection.md` |
| App / System crashes and services | `themes/windows-operational-events.md` |
| CPU, RAM, disk, installed software, monitors | `themes/device-health-and-state.md` |
| Named backup product (Veeam etc.): installed products. Not operational events. | `themes/device-health-and-state.md` |
<!-- END GENERATED INDEX:themes -->

---

*End of SKILL.md.*
