<!-- GENERATED reference. Do not hand-edit. -->
# Network path fields

Reported every 5 minutes on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 5 minutes wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.network_path.families` | object_array |  | One entry each for `ipv4` and `ipv6`. Each carries the machine's TCP, UDP, IP and ICMP counters for the window, with the time each group covers (`_observed_ms`); these are machine-wide and include loopback, so on a quiet machine local traffic can make up most of them. Each also carries the latest counts of TCP connections the agent found, measured and left out (`tcp_connections_*`), the per-connection statistics groups in use (`estats_groups_*`), and how each Windows query went (`_outcome`: `ready`, `partial`, `unsupported`, `access_denied`, `malformed`, `allocation_failed`, `deadline` or `failed`). When a per-connection statistics query (`estats_path`, `estats_data`) is not `ready`, `_error_call` and `_error_code` give the call that failed most often and its Windows error code. Members are absent when that part was not read in the window. |
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
| `sparklogs.data.network_path.paths` | object_array |  | TCP traffic on the connections the agent measures, one entry per IP family and route class, in `lan`, `vpn`, `internet` order. `address_class` is the route class: `vpn` when the connection's local address is on an adapter the agent treats as a VPN, otherwise `internet` for a public peer and `lan` for any other peer (private, carrier-grade NAT, link-local or reserved ranges; not proof the peer is on the LAN). Each entry has payload bytes (resent ones included) and segments each way, the round-trip time total and sample count, `bytes_out_retrans` (payload sent again), `fast_retransmits`, `timeouts` (retransmit timer expiries, counting only connections that sent data, so connection attempts and keep-alives add none), and the time and readings covered. Loopback, link-local and multicast connections, UDP and QUIC are not counted. |
| `sparklogs.data.network_path.paths[].family` | string |  | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].address_class` | string |  | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].bytes_in` | integer | bytes | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].bytes_out` | integer | bytes | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].segments_in` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].segments_out` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].rtt_sum_ms` | integer | milliseconds | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].rtt_count` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].bytes_out_retrans` | integer | bytes | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].fast_retransmits` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].timeouts` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].connection_intervals` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].observed_ms` | integer | milliseconds | In each `paths` entry. |
| `sparklogs.data.network_path.paths[].interval_count` | integer | count | In each `paths` entry. |
| `sparklogs.data.network_path.probes` | object_array |  | The agent's test pings and test lookups since the previous row, oldest first, at most 32 (the newest kept). Each has `role` (`gateway` or `internet` for a ping, `dns` for a scheduled lookup, `dns_confirmation` for a check lookup after a failed or redirected one), `family` (`ipv4` or `ipv6`, pings only), `offset_s` (seconds from the start of the row's 5-minute window; negative for one carried over from before), `outcome` and `latency_us` (microseconds, on a success). `outcome` is `ok`; `failed` (a negative or failed answer, no usable address, or a ping Windows refused to send); `unanswered` (no answer in time); or, for a lookup, `redirected` (answered with addresses that are not the name's real ones, such as a captive portal or a filter), `filtered` (redirected, while other names resolved normally, so a filter blocks the test name's zone) or `empty` (answered with no address). Only `failed` and `unanswered` are failures. A ping also has `tcp_progress` (whether this machine's TCP traffic moved over the same path), `failure` `refused_local` when Windows or a local firewall refused to send it, and `corroborated` (whether other traffic got through around a failed ping). A failed lookup has `dns_confirmation`: `target_side` when a check name resolved, `resolver` when none did, `unconfirmed` when none could be asked. `follow_up` is true on one of the up to three extra tries, about 30 seconds apart, the agent makes after a failed internet ping or scheduled lookup, stopping at the first that does not fail; follow-ups are left out of the rolling failure shares. A redirected or filtered lookup also has `zone` (the configured test name, such as `conncheck.itlightning.app`) and, per record type, `answer_a_class` or `answer_aaaa_class` (`non_public`: only private addresses, such as a portal, sinkhole or local filter; `off_list_public`: a public address that is not the name's, such as a block page) with up to two of the wrong addresses in `answer_a` or `answer_aaaa`. Private addresses there are shown in full; public ones follow the workspace's privacy setting for remote addresses. A restart drops attempts not yet reported. Absent when there were none. Query: `sparklogs.data.network_path.probes[](role=internet outcome=failed)`. |
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
| `sparklogs.data.network_path.probes[].answer_a` | string_array |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].answer_a_class` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].answer_aaaa` | string_array |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].answer_aaaa_class` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes[].zone` | string |  | In each `probes` entry. |
| `sparklogs.data.network_path.probes_dropped` | integer | count | Test pings and lookups left out because more than 32 happened since the previous row. Absent when none were. |
| `sparklogs.data.network_path.probe_slots_unsent` | integer | count | Scheduled test pings and lookups since the previous row that did not run for a reason on this machine: no network route, the previous one still running, the agent too busy, or an error in the agent's own call. Time asleep, suspended or with the agent stopped does not count, nor do turned-off tests, tests with nothing to test, or pings Windows refused to send (those are in `probes`). 0 when every scheduled test ran. Absent while no tests are scheduled. A restart drops counts not yet reported. |
| `sparklogs.data.network_path.network_context_key` | string |  | The network this machine's main connection was on when the row was captured, as a grouping key. It names the machine's primary network, which may not be the network each connection or test used. Kept while offline, while a new network is being identified, and across restarts. Absent until the agent first identifies a network. |
| `sparklogs.data.network_path.tcp_connections_tracked_max` | integer | count | The most TCP connections the agent could measure at its latest reading, across IPv4 and IPv6. It grows with the processor count up to a configured limit. When a family's `tcp_connections_selected` is below its `tcp_connections_eligible`, the limit left connections unmeasured. Absent when TCP was not read recently. |
| `sparklogs.data.network_path.wlan_outcome` | string |  | How the agent's latest query of the WLAN service for Wi-Fi radios went: `ready`, `unsupported` (no WLAN support installed, as on Server Core), `access_denied`, `malformed`, `deadline` or `failed` (any other error, including a stopped WLAN service). A `ready` machine with no radio has no Wi-Fi adapter. Absent when the WLAN service was not queried recently. |
