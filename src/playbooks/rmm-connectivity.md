---
index: RMM connectivity
aliases:
  - label: Device offline in the RMM
---

# RMM connectivity

**Trigger.** "Endpoint shows offline in the RMM but the user says it is working", or the RMM agent keeps dropping off.

**Accuracy.** SparkLogs sees the RMM vendor's agent only as Windows services and the events they write to the Windows logs.
The vendor's own agent log is not collected, and the RMM console is the authority on what the RMM saw.
Whether SparkLogs itself is still collecting from the device is a separate question: `playbooks/sparklogs-collection.md`.

**Was the device up and online.** Read the SparkLogs agent's status and when its data arrived over the RMM's offline interval: SparkLogs' own receipt, not the RMM's path.
Log events and agent check-ins arriving through that interval mean the device was running and reaching the internet then, which localizes the problem to the RMM agent or the path to the RMM's servers.
No data here either: the agent, the machine and the network cannot be told apart from SparkLogs alone; say so.

**Was the device's network up.** Read the device's network view in `query_device_health` (tool) over the interval the RMM showed the device offline.
Its coverage separates asleep and powered-off stretches, from the device's own lifecycle marks, from unreported time.
The probe outages and the link-down and network-change evidence say whether the device's link and its gateway, internet and DNS probes were up in that interval.
Check the probe roles were measured (`guides/device-state-fields.md`, **Network outages**).
Measured probes and link up through the RMM's offline interval mean the device reached its gateway, the agent's internet target and DNS then. They do not test the path to the RMM's own servers.
Unreported time over that interval leaves the question open.

**The vendor's services and events.**

```lql
source = "<host>" AND service = rmm AND app != sparklogs_agent AND severity >= warning
```

Group by `app` (LQL), `sparklogs.reason` (LQL).
The vendor's Windows service events carry its token: `app in (connectwise, ninjaone, datto, atera, nable)` (LQL); `guides/msp-tool-registry.md` names each product's services.
Rows with an empty `app` (LQL) under `service = rmm` (LQL) are WinRM, WMI and the System-channel copies of SparkLogs agent start and stop (`sparklogs_agent_started` (value), `sparklogs_agent_stopped` (value)), not the RMM product.
An RMM agent service that crashes, will not start or hangs is read like any other service: `playbooks/service-failures.md`. The same service crashing across a client after one RMM agent update is the vendor's to fix.

**Off-endpoint** (HM10): RMM cloud, RMM agent health, EDR quarantine of the RMM agent, network path.
