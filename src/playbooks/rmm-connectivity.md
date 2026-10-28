---
index: RMM connectivity
---

# RMM connectivity

**Trigger.** "Endpoint shows offline in the RMM but the user says it is working."

**Accuracy.** SparkLogs answers whether the endpoint is reporting *here*.
That is a different question from whether it is reporting to the RMM.
`agent_status` (col) and `collection_status` (col) are two columns; do not merge them.
`offline` (value) means no signal reached SparkLogs, never that the machine is down.
The customer's RMM is the authority on up/down.
`row_kind=silent_device` is an exact counted fact (no state rows), not "healthy" and not "agent down".
`sparklogs.kind = agent_op` empty is inconclusive, not reassuring.

Data flowing here while the RMM shows offline localizes to the RMM path.
No data here either: you cannot distinguish agent, machine, and network; say so.

**Device health first.** `device_network` (value) over the interval the RMM showed the device offline.
Header coverage separates asleep and powered-off stretches (from the device's own lifecycle marks) from unreported time.
`outages` (col), `physical_link_down` (value) evidence and `network_changed` (value) evidence say whether the device's own link, gateway and internet probes were up in that interval.
Probes and link up through the RMM's offline interval means this device had a working network path then; the RMM agent's logs and the RMM console say what the RMM saw.
Unreported time over that interval leaves both questions open.

**Events, for what health named.**

```
source = "<host>" AND sparklogs.kind = agent_op
```

RMM vendor errors on the box:

```
source = "<host>" AND service = rmm
```

Group by `sparklogs.reason` (LQL).
Read the Application channel for the vendor's own errors.

**Off-endpoint** (HM10): RMM cloud, RMM agent health, EDR quarantine of the RMM agent, network path.
