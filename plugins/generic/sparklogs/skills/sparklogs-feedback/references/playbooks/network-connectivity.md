# Internet down, slow or dropping

**Trigger.** "The internet keeps going down", "the internet is slow", or "Wi-Fi drops several times a day."

**Accuracy.** The agent probes the gateway, an internet target and DNS from the device, and measures TCP by route class (LAN, VPN, internet) and the adapters' link and Wi-Fi state.
That locates a problem on this device's path. It does not see the router, the ISP or the far end.
Keep four findings apart:

- Confirmed downtime: an `outages` (col) row with `state` (col) `confirmed` and its down seconds.
- Failed probes without confirmed downtime: a `pending` outage row, or `probe_blips` evidence when a later probe answered.
- Not measured: a gateway that ignores ping shows as outages that read not placed and `gateway_probe_attempts` (col) of 0, not as downtime.
- Slow, not down: TCP heat on a route class while probes answer. Signals that suggest trouble without proving it (queueing delay, stall breadth, download loss on little traffic, Wi-Fi retries alone) grade at most `warm`. Read the span's `driver` (col) before calling the path slow.

Where an outage sits and what endpoint data cannot place: `../guides/device-state-fields.md` (**Network outages**).
Wi-Fi drops often leave no heat, because traffic stops. They show as evidence and events.

**Device health first.** `device_network` over the complaint window.

- Header coverage first: asleep and powered-off stretches end connections too, and unreported time is unknown.
- `outages` (col): role, interval, `state` (col), `ownership` (col), whether the link was down, and the gateway probes missed inside an internet or DNS outage.
- `evidence` (col): `wifi_drops` is the main Wi-Fi drop signal. Beside it read `physical_link_down`, `network_changed` (the device moved to another network), `ncsi_internet_lost`, `dns_resolution_timeouts`, `probe_blips`, `occurrences` (device-state networking occurrences such as `network_context_changed`) and `tcp_timeout_connections_total` per route class.
- `domains` (col) and `heat_spans` (col): per-part bands for the link, LAN, VPN and internet. `medium` (col) on a link span says whether it was Wi-Fi or wired.
- `events` (col): networking episodes and changes, for example `network_adapter_dhcp_failed`, `network_adapter_link_downshifted`, `network_ipv6_broken` and `winhttp_proxy_changed`. Occurrences and the sleep and shutdown marks are rows of the `events` result set.

Then drill down:

- This device alone or others too: the `next_reads` (col) entry over a confirmed outage's `compare_start` (col) and `compare_end` (col) reads every device in the org. Keep to the devices at this site. Other devices down in the same buckets points at the shared connection or at the probe target.
- Wi-Fi quality: the `adapters` result set, with signal, retry and failed-frame shares beside their frame counts.
- Per-bucket probe attempts, failures and down seconds: the `network_buckets` result set with the outage's `filter_lql` (col).
- DNS, proxy and adapter configuration: `latest_state`, as the `next_reads` (col) entry gives it.

**Events, for what health named.** Network channels on that device over the outage or drop interval:

```
source = "<host>" AND service = networking
```

Group by `sparklogs.reason` (LQL).

**Off-endpoint** (HM11): the router, firewall and access points, the ISP circuit, other devices without the agent, cloud services the user was reaching.
