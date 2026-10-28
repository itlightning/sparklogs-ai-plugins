---
index: One application slow or stalling over the network
aliases:
  - label: App slow over VPN
---

# One application slow or stalling over the network

**Trigger.** "Only the accounting app hangs, and only over the VPN", "Outlook stalls, everything else is fine."

**Accuracy.** Per-connection rows name the program (`image_name` (col)), the remote address and port, and `scope` (col) (local or internet).
They do not carry the route class: whether traffic went over the VPN comes from the route-class readings (`tcp_vpn_*` columns in `network_buckets` (value)) and the remote address.
Route-class bands (LAN, VPN, internet) grade a whole route and need enough traffic in a bucket to judge, so one application's trouble can stay below them while its own connections show it.
Retransmission timeouts and retransmits on that program's connections are the evidence; a quiet route band does not clear the application.
Delay above a connection's lowest round trip suggests queueing without proving it: a longer route reads the same.
Download loss is loss episodes per 1,000 data segments received, not a packet-loss percentage, and it reads low on long-distance bulk downloads.
The agent does not measure the application's own response time, its server, or UDP traffic.

**Device health first.** `device_network` (value) over a window that holds several stalls.

- `top_connections` (col): `window_rank_by` (col) says why a row was kept (traffic, struggling, retransmit, timeouts, download loss); `connection_trouble` (col) says timeouts or retransmit.
  Find the application's rows by `image_name` (col).
- `heat_spans` (col) and `domains` (col) per route: does the VPN or LAN band rise at the stall times, or only the application's connections?
- `evidence` (col): `tcp_timeout_connections_total` (value) per route class, with the bucket it peaked in; `network_changed` (value) when the device moved to another network at a stall time.
- `outages` (col): a gateway or internet outage at the stall time explains it before any per-connection reading does.

Then drill down on that program alone: the `connections` (value) result set with `image_name` (col) in the filter, by `bucket_start` (col), reading `tcp_timeouts` (col), `retransmit_pct_peak` (col), `dup_ack_per_1k_segments` (col) beside its counts, and `rtt_ms_avg` (col).
Other programs to the same remote address with no trouble point at the program; trouble across programs in the same buckets, with the VPN route's timeouts and resends up in `network_buckets` (value), points at the route.
For delay above the lowest round trip, `fieldset` (arg) `detail` (value) adds `rtt_min_ms` (col).

**Events, for what health named.** The application's own errors and the VPN client's events over the stall interval:

```
source = "<host>" AND (service = vpn OR service = networking)
```

Group by `sparklogs.reason` (LQL); then the Application channel for the program itself.

**Off-endpoint** (HM13): the application server, the VPN concentrator and its tunnel, the remote site's network, the SaaS backend.
