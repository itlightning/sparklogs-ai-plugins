---
index: Internet down, slow or dropping
aliases:
  - label: Wi-Fi drops
---

# Internet down, slow or dropping

**Trigger.** "The internet keeps going down", "the internet is slow", or "Wi-Fi drops several times a day."

**Accuracy.** The agent probes the gateway, an internet target and DNS from the device, and measures TCP by route class (LAN, VPN, internet) and the adapters' link and Wi-Fi state.
That locates a problem on this device's path; it does not see the router, the ISP or the far end.
Keep four findings apart:

- Confirmed downtime: an `outages` (col) row with `state` (col) `confirmed` (value) and its down seconds.
- Failed probes without confirmed downtime: a `pending` (value) outage row, or `probe_blips` (value) evidence when a later probe answered.
- Not measured: the probe role is in `not_measured` (col), for example a gateway that ignores ping.
- Slow, not down: TCP heat on a route class while probes answer. Some signals that suggest trouble without proving it (queueing delay, stall breadth, download loss on little traffic, Wi-Fi retries alone) grade at most `warm` (value); read the span's `driver` (col) before calling the path slow.

Beyond the gateway covers the router's internet connection and the ISP alike: never name the ISP as the cause from endpoint data.
Wi-Fi drops often leave no heat at all, because traffic stops; they show as evidence and events.

**Device health first.** `device_network` (value) over the complaint window.

- Header coverage first: asleep and powered-off stretches end connections too, and unreported time is unknown.
- `outages` (col): role, interval, `state` (col), `ownership` (col), whether the link was down, and the gateway probes missed inside an internet or DNS outage.
- `evidence` (col): `physical_link_down` (value), `network_changed` (value) (the device moved to another network), `probe_blips` (value), `occurrences` (value) (such as `wlan_disconnected` (value) and `ncsi_internet_lost` (value)) and `tcp_timeout_connections_total` (value) per route class.
- `domains` (col) and `heat_spans` (col): per-part bands for the link, LAN, VPN and internet; `medium` (col) on a link span says whether it was Wi-Fi or wired.
- `events` (col): network occurrences, episodes and changes, for example `network_adapter_dhcp_failed` (value), `network_adapter_link_downshifted` (value), `network_ipv6_broken` (value) and `winhttp_proxy_changed` (value).

Then drill down:

- Same site or this device alone: the same-org `next_reads` (col) entry over a confirmed outage's `compare_start` (col) and `compare_end` (col). Other devices down in the same buckets points at the shared connection.
- Wi-Fi quality: the `adapters` (value) result set, with signal, retry and failed-frame shares beside their frame counts.
- Per-bucket probe attempts, failures and down seconds: the `network_buckets` (value) result set with the outage's `filter_lql` (col).
- DNS, proxy and adapter configuration: `latest_state` (value), as the `next_reads` (col) entry gives it.

**Events, for what health named.** Network channels on that device over the outage or drop interval:

```
source = "<host>" AND service = networking
```

Group by `sparklogs.reason` (LQL).

**Off-endpoint** (HM11): the router, firewall and access points, the ISP circuit, other devices without the agent, cloud services the user was reaching.
