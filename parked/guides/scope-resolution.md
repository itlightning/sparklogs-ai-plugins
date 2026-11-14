<!-- Moved from src/guides/scope-resolution.md at 29a8d32. Relay and syslog senders; today only agents and ingest keys send data. -->

- **`source` (LQL)** (origin): the hostname or device label the event is about. Under on-host agent collection, sender and origin usually match. Relay, syslog, and key-ingested data can diverge: one sender, many origins, or origin labels that do not match the sender name.
| Relay / key ingest: one `agent_id` (LQL), many `source` (LQL) values | Expected. Scope with `agent_id` (LQL) for the sender and `source` (LQL) for the origin host. |
**Conflating sender and origin.** Relay and ingest-key paths need both `agent_id` (LQL) and `source` (LQL) in vocabulary and LQL.
