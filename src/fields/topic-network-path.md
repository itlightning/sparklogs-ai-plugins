<!-- GENERATED reference. Do not hand-edit. -->
# Network path fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.network_path.families` | object_array |  | One entry per IP family, at most two (`ipv4`, `ipv6`), always both: the family's TCP, UDP, IP and ICMP counters summed over the window's accepted intervals (UDP carries datagram counts only: since 1.14.2 no no-port or in-error counts), each group with the `_observed_ms` it covers and absent when it did not pair; the latest TCP census populations (enumerated, eligible, excluded, selected, measured, re-baselined, failed, unmeasured; selection shares one cap across both families, tcp_connections_tracked_max); the statistics groups the census enabled or found enabled (enabling one changes the kernel's accounting for that connection until it closes; since 1.14.2 the receive group counts among them); and each native source's latest `_outcome` (`ready`, `partial`, `unsupported`, `access_denied`, `malformed`, `allocation_failed`, `deadline` or `failed`). Since 1.14.1, while a per-connection statistics group (`estats_path`, `estats_data`) reads anything but `ready`, its most frequent failure on that read, a tie going to the lower code: `_error_call` (`get`, `enable`, or `confirm`: the read after a successful enable still reported collection off) and `_error_code` (the Windows error code; absent on a `confirm`). With no connection answering, that failure also names the outcome. A deadline or allocation failure names neither, so both are absent on a `ready` read and on one that failed only that way. Census and outcome members are absent without a fresh reading of their lane. |
| `sparklogs.data.network_path.families[].family` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_in_segments` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_original_out_segments` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_retransmitted_segments` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_active_opens` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_passive_opens` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_failed_opens` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_established_resets` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_out_resets` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_in_errors` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_observed_ms` | integer | milliseconds | In each `families` entry. |
| `sparklogs.data.network_path.families[].udp_in_datagrams` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].udp_out_datagrams` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].udp_observed_ms` | integer | milliseconds | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_received` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_out_requests` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_in_discards` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_out_discards` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_no_routes` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_reassembly_required` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_reassembly_failed` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_observed_ms` | integer | milliseconds | In each `families` entry. |
| `sparklogs.data.network_path.families[].icmp_in_messages` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].icmp_in_unreachable` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].icmp_in_time_exceeded` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].icmp_observed_ms` | integer | milliseconds | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_enumerated` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_eligible` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_excluded` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_selected` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_measured` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_rebaselined` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_failed` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_connections_unmeasured` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_groups_enabled` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_groups_adopted` | integer | count | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_statistics_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].udp_statistics_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].ip_statistics_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].icmp_statistics_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].tcp_table_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_path_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_data_outcome` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_path_error_code` | integer |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_path_error_call` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_data_error_code` | integer |  | In each `families` entry. |
| `sparklogs.data.network_path.families[].estats_data_error_call` | string |  | In each `families` entry. |
| `sparklogs.data.network_path.paths` | object_array |  | One entry per family and route class the measured TCP connections reached, at most six, in family then `lan`, `vpn`, `internet` order. Since 1.14.2 `address_class` is the route class: `vpn` when the connection's local address is on an adapter the agent classifies as a VPN (tunnel, miniport or virtual: the rule behind `vpn_` network context keys), whatever the peer; otherwise `internet` for a public peer and `lan` for the rest (private, shared CGNAT, link-local, documentation and other reserved ranges, an IPv4-mapped address by its IPv4: the agent's one public-address rule; not proof the peer is on the LAN). A local address no single adapter holds, or a TCP reading without a fresh adapter inventory, takes the peer rule; earlier agents reported `private` or `unclassified` by peer syntax. The performance topic's tcp_<class>_ fields count the same connections per class over the readings that landed in its five-minute window instead of the trailing one. Payload bytes (retransmitted ones included) and segments each way, the round-trip sample sum and count, connection intervals (each tracked connection once per interval it paired), and the accepted time and intervals they cover. Since 1.14.1, the loss counters over the same connection intervals: `bytes_retrans` (payload bytes sent again, also in `bytes_out`), `fast_retransmits` (Fast Retransmit invocations) and `timeouts` (retransmit timer expiries before any backoff, the backed-off repeats not counted); a TCP keep-alive probe moves none of them. Absent connections, UDP and QUIC are not counted. |
| `sparklogs.data.network_path.paths[].family` | string |  | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].address_class` | string |  | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].bytes_in` | integer | bytes | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].bytes_out` | integer | bytes | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].segments_in` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].segments_out` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].rtt_sum_ms` | integer | milliseconds | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].rtt_count` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].bytes_retrans` | integer | bytes | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].fast_retransmits` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].timeouts` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].connection_intervals` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].observed_ms` | integer | milliseconds | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].interval_count` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.probes` | object_array |  | The active probe attempts the agent took since the attempts the previous emitted row reported, oldest first, at most 32 (the newest kept): `role` (`gateway` or `internet`, an ICMP echo; `dns`, a scheduled lookup of the monitored target; `dns_confirmation`, a confirmation lookup after a failed one), `family` (`ipv4` or `ipv6`; absent for the DNS roles), `offset_s` (wall-clock seconds from the row's window start, five minutes before its capture; negative for an attempt carried over from before the window), `outcome` (`ok`, `failed` (a negative answer, a server failure, a lookup with no usable address, or since 1.14.2 an echo this host refused to send), `redirected` (a lookup answered, but not with its target's answer: only non-public addresses, or an address off the target's expected list; since 1.14.2 a name error or a refusal is `failed` for every target, a pinned one's too), `empty` (a target with expected addresses answered NOERROR with no address, and neither family failed or went unanswered) or `unanswered` (no answer before the deadline); `redirected` and `empty` are not failures), `latency_us` (microseconds, on a success only), `tcp_progress` (on an echo: whether fresh public TCP progress was seen from the echo's own source address), `failure` (since 1.14.2, on a `failed` echo this host refused to send: `refused_local`, the local stack or a local filter refused or could not send it, such as a host firewall block or no route from this host; it fails the rolling share and counts toward icmp_unanswered as an unanswered echo does, and no packet left), `corroborated` (since 1.14.1, reported on an `unanswered` echo and since 1.14.2 on a `refused_local` one; an ICMPv6 administratively prohibited reply, reported `failed`, is corroborated the same way and counts toward icmp_unanswered too: whether the path carried traffic around it, by its own TCP progress from an interval that retransmitted under 5% of the bytes it sent, or, for a gateway echo, a raw success of the internet echo within its interval before it, or, while the echo's family is the only one routed, a latest scheduled lookup before it that succeeded on a pinned target within its interval, the evidence icmp_unanswered reads), `dns_confirmation` (on a failed `dns` slot: `target_side` when a confirmation target resolved usably, `resolver` when none did, `unconfirmed` when none could be asked) and `follow_up` (since 1.14.2, true on a follow-up probe: after a failed scheduled `internet` echo or `dns` slot, up to three more of that role about 30 s apart, stopping at the first that does not fail; a follow-up is outside every rolling value and starts none of its own, and a `dns` follow-up asks no confirmation targets). Never an answer's address or a looked-up name. Each attempt is reported in one emitted row; a restart drops the ones not yet reported. Absent when there is none. Query: `sparklogs.data.network_path.probes[](role=internet outcome=failed)`. |
| `sparklogs.data.network_path.probes[].role` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].family` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].offset_s` | integer | seconds | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].outcome` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].latency_us` | integer |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].tcp_progress` | bool |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].corroborated` | bool |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].dns_confirmation` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].failure` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].follow_up` | bool |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes_dropped` | integer | count | Probe attempts older than the 32 `probes` kept, left out of every row. Absent when none was. |
| `sparklogs.data.network_path.probe_slots_unsent` | integer | count | Scheduled probe slots of every role that came due while the agent was running, since the slots the previous emitted row counted, and produced no outcome for a reason about this host's path or probing: no route (offline), the role's previous slot still running, no worker free, or a fault of the agent's own call before or during the send. Not counted: slots that passed while the agent could not run them (asleep, suspended, or a forward clock step), slots a role's policy disabled, slots with no gateway or target to probe, and a send this host refused (a `probes` entry with `failure` `refused_local`, which is an outcome). Absent while no probe is planned (the performance topic is off, or every role is disabled); 0 when probing ran and every counted reason was absent. Each slot is counted in one emitted row; a restart drops the ones not yet counted. |
| `sparklogs.data.network_path.network_context_key` | string |  | The network the host's primary path was last connected to when the row was captured: the performance singleton's network_context_key, the same value with the same retention (kept while offline or while a new network resolves, and across a restart). It names the host's primary network, not the network each measured connection or probe used; a grouping key, not anonymization. Absent until a network first resolves. |
| `sparklogs.data.network_path.tcp_connections_tracked_max` | integer | count | The most connections the TCP lane's latest reading could select for per-connection statistics, across both families: 5,000 per logical core, at most 50,000 (30,000 before 1.14.1), and never above the pack's net_tcp_tracked_max. A family's tcp_connections_selected below its tcp_connections_eligible means the cap left connections untracked. Absent without a fresh TCP reading. |
| `sparklogs.data.network_path.wlan_outcome` | string |  | What opening the WLAN service and listing its radios did at the WLAN lane's latest reading: `ready`, `unsupported` (no WLAN library on the system, as on Server Core), `access_denied`, `malformed`, `deadline` or `failed` (any other error, a stopped WLAN service among them). A `ready` host with no radio has no Wi-Fi adapter the service lists. Absent without a fresh WLAN reading. |
