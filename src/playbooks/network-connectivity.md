---
index: Internet down, slow or dropping
aliases:
  - label: Wi-Fi drops
---

# Internet down, slow or dropping

**Trigger.** "The internet keeps going down", "the internet is slow", or "Wi-Fi drops several times a day."

**Accuracy.** The agent probes the gateway, an internet target and DNS from the device, and measures TCP by route class (LAN, VPN, internet) and the adapters' link and Wi-Fi state.
That locates a problem on this device's path. It does not see the router, the ISP or the far end.
Keep four findings apart:

- Confirmed downtime: an `outages` (col) row with `state` (col) `confirmed` (value) and its down seconds.
- Failed probes without confirmed downtime: a `pending` (value) outage row, or `probe_blips` (value) evidence when a later probe answered.
- Not measured: a gateway that ignores ping shows as outages that read not placed and `gateway_probe_attempts` (col) of 0, not as downtime.
- Slow, not down: TCP heat on a route class while probes answer. Signals that suggest trouble without proving it (queueing delay, stall breadth, download loss on little traffic, Wi-Fi retries alone) grade at most `warm` (value). Read the span's `driver` (col) before calling the path slow.

Where an outage sits and what endpoint data cannot place: `guides/device-state-fields.md` (**Network outages**).
Wi-Fi drops often leave no heat, because traffic stops. They show as evidence and events.

**Device health first.** `device_network` (value) over the complaint window.

- Header coverage first: asleep and powered-off stretches end connections too, and unreported time is unknown.
- `outages` (col): role, interval, `state` (col), `ownership` (col), whether the link was down, and the gateway probes missed inside an internet or DNS outage.
- `evidence` (col): `wifi_drops` (value) is the main Wi-Fi drop signal. Beside it read `physical_link_down` (value), `network_changed` (value) (the device moved to another network), `ncsi_internet_lost` (value), `dns_resolution_timeouts` (value), `probe_blips` (value), `occurrences` (value) (device-state networking occurrences such as `network_context_changed` (value)) and `tcp_timeout_connections_total` (value) per route class.
- `domains` (col) and `heat_spans` (col): per-part bands for the link, LAN, VPN and internet. `medium` (col) on a link span says whether it was Wi-Fi or wired.
- `events` (col): networking episodes and changes, for example `network_adapter_dhcp_failed` (value), `network_adapter_link_downshifted` (value), `network_ipv6_broken` (value) and `winhttp_proxy_changed` (value). Occurrences and the sleep and shutdown marks are rows of the `events` (value) result set.

Then drill down:

- This device alone or others too: the `next_reads` (col) entry over a confirmed outage's `compare_start` (col) and `compare_end` (col) reads every device in the org. Keep to the devices on this network (`guides/device-state-fields.md`, **Network outages**: the network key). Other devices down in the same buckets points at the shared connection or at the probe target.
- Wi-Fi quality: the `adapters` (value) result set, with signal, retry and failed-frame shares beside their frame counts.
- Per-bucket probe attempts, failures and down seconds: the `network_buckets` (value) result set with the outage's `filter_lql` (col).
- DNS, proxy and adapter configuration: `latest_state` (value), as the `next_reads` (col) entry gives it.

**Events, for what health named.** Network channels on that device over the outage or drop interval:

```lql
source = "<host>" AND service = networking AND sparklogs.kind not in (inventory, delta) AND NOT sparklogs.reason in (firewall_rule_created, firewall_rule_deleted, firewall_rule_changed) AND severity >= info
```

Group by `sparklogs.reason` (LQL). The filter drops inventory rows and firewall-rule churn, and keeps Wi-Fi, DHCP, DNS and adapter reasons (many are Notice) plus uncurated network rows: group those by `provider_name` (LQL).
Domain devices that cannot find a domain controller, at boot or over a VPN: `playbooks/group-policy.md`.
Adapter, DNS, proxy and firewall changes before the onset: `playbooks/what-changed.md` (**Firewall and network policy**).

One file server or mapped drive failing while the rest of the network works: `playbooks/file-share-access.md`.
An adapter whose driver reports the card failing (`nic_driver_fault_reported` (value)), or that drops off the bus: `playbooks/hardware-faults.md` (**Devices that fail to start or drop off**).

**Off-endpoint** (HM11): the router, firewall and access points, the ISP circuit, other devices without the agent, cloud services the user was reaching.
