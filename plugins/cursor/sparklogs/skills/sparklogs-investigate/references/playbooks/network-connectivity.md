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

- This device alone or others too: the `next_reads` (col) entry over a confirmed outage's `compare_start` (col) and `compare_end` (col) reads every device in the org. Keep to the devices on this network (`../guides/device-state-fields.md`, **Network outages**: the network key). Other devices down in the same buckets points at the shared connection or at the probe target.
- Wi-Fi quality: the `adapters` result set, with signal, retry and failed-frame shares beside their frame counts.
- Per-bucket probe attempts, failures and down seconds: the `network_buckets` result set with the outage's `filter_lql` (col).
- DNS, proxy and adapter configuration: `latest_state`, as the `next_reads` (col) entry gives it.

**Events, for what health named.** The device's network reasons over the outage or drop interval:

```lql
source = "<host>" AND sparklogs.reason in (wlan_disconnected, wlan_disconnected_by_request, wlan_connect_failed, wlan_security_handshake_failed, wlan_limited_connectivity, nic_link_down, nic_driver_fault_reported, dhcp_lease_failed, dhcp_lease_denied, ip_address_conflict_detected, ncsi_internet_lost, dns_client_resolution_timed_out)
```

Group by `sparklogs.reason` (LQL), `sparklogs.reason_variant` (LQL). `wlan_disconnected` is the driver dropping the connection, the Wi-Fi drop itself. `wlan_disconnected_by_request` is a user, a policy or a switch to another network. `nic_link_down` has a `down` and a `recovered` arm: the pair bounds the link outage.
An empty result does not clear the network: the reasons above are only the curated part, and a channel that is not collected or a feed that is not current logs nothing (`sparklogs-collection.md`).

Adapter drivers write their own records, mostly uncurated (Intel Wi-Fi drivers log under `Netwtw` (other) provider names). The sweep keeps every network row except inventory and firewall-rule churn:

```lql
source = "<host>" AND service = networking AND sparklogs.kind not in (inventory, delta) AND NOT sparklogs.reason in (firewall_rule_created, firewall_rule_deleted, firewall_rule_changed) AND severity >= info
```

Group the rows with no reason by `provider_name` (LQL) and `event_id` (LQL), and read them against the drop times. VPN clients and some vendor network tools write rows the pack files under no service, so this sweep misses them: group the device's rows with no reason by `provider_name` (LQL) over the same minutes.
**Well-known causes and what each leaves.**

- Wi-Fi adapter power saving, or an old or freshly updated Wi-Fi driver: `wlan_disconnected` with the driver's own records at the same minutes, often right after a wake. A driver change before the onset: `what-changed.md`.
- Weak signal or roaming between access points: low signal and high retry shares in the `adapters` result set, `network_changed` evidence.
- An exhausted DHCP scope or a second DHCP server on the network: `dhcp_lease_failed`, `dhcp_lease_denied`, `ip_address_conflict_detected`.
- A failing DNS server: `dns_resolution_timeouts` evidence and `dns_client_resolution_timed_out` while the gateway and internet probes answer.
- The router or the ISP: a confirmed internet outage with the gateway answering, and other devices on the same network down in the same buckets.
- A proxy or VPN change: `winhttp_proxy_changed`, and the VPN client's rows.

Domain devices that cannot find a domain controller, at boot or over a VPN: `group-policy.md`.
Adapter, DNS, proxy and firewall changes before the onset: `what-changed.md` (**Firewall and network policy**).

One file server or mapped drive failing while the rest of the network works: `file-share-access.md`.
An adapter whose driver reports the card failing (`nic_driver_fault_reported`), or that drops off the bus: `hardware-faults.md` (**Devices that fail to start or drop off**).

**Off-endpoint** (HM11): the router, firewall and access points, the ISP circuit, other devices without the agent, cloud services the user was reaching.
