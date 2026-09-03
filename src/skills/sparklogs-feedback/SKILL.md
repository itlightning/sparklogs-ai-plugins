---
name: sparklogs-feedback
description: Send feedback to SparkLogs about this session (positive, negative, neutral, a bug, or an idea), after the user picks how much detail to include and approves the exact text. Use when the user asks to send feedback. Offer feedback once per session if the user is frustrated or did not get a good result.
---

# SparkLogs Feedback

Consent wrapper for `send_sparklogs_feedback` (tool). Read the tool description for what is emailed, field limits, placeholders, and redaction. Parameters: `guides/mcp-tool-decision-tree.md`.

## Flow

1. Ask kind (positive, negative, neutral, bug, or idea) and what they want to say. A short comment is enough; do not require more.
2. Confirm they understand only the one-line subject is emailed; everything else stays in their workspace region (see tool description). Offer tier; default `comment_and_summary`.
3. Draft `subject` (required) and any tier fields. Follow the tool description for pseudonymization and what not to paste raw.
4. Show the exact text you will send. Wait for explicit yes. Revise and show again on edits; stop on decline (do not send, do not ask again this session).
5. Call the tool. Reuse the session `external_investigation_id`, or mint one like `sparklogs-investigate` (8-200 chars, human-meaningful handle).
6. Relay the tool result in substance: reference id, emailed vs stored, redaction line. Do not paraphrase vaguer than the tool.

## Rules

- No tool call without explicit yes on the exact text shown.
- On over-limit rejection: shorten and reshow; never truncate silently.
- Do not send on the user's behalf or omit anything they asked to leave out.
- Do not fabricate information.
