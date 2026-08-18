# RMM connectivity

**Trigger.** "Endpoint shows offline in the RMM but the user says it is working."

**Evidence today.** Moderate, and the honesty framing matters more here than the evidence does. The
question is whether the endpoint is reporting to US, which is a different question from whether it
is reporting to the RMM.

**Off-endpoint** (HM10): the RMM cloud itself, the RMM agent's own health, EDR quarantine of the RMM
agent, the network path.

**Call sequence.**

1. Scope. Read `agent_status` and `collection_status` on the agent row from `resolve_scope`, and
   treat them as two separate inputs, not the answer. `offline` means no signal reached SparkLogs,
   never that the machine is down; the customer's RMM is the authority on that.
2. Is the endpoint reporting to SparkLogs in the window?

   ```
   list_sources(org_ids=[...], start=..., end=..., external_investigation_id="<id>")
   ```

   Data flowing to us while the RMM shows offline localizes the problem to the RMM path. No data to
   us either means you cannot distinguish an agent problem from a machine problem from a network
   problem, and you say so.

3. Device-health silence, as the second half of that read.

   ```
   query_device_health(org_ids=[...], start=..., end=..., external_investigation_id="<id>")
   ```

   A device in the `row_kind=silent_device` list reported no state rows. That is an exact counted
   fact and you may report it. It is not "the device is healthy" and not "the agent is down".

4. Agent self-observability rows, which are stamped when an investigator must distrust other data on
   that host.

   ```
   query_logs(org_ids=[...], start=..., end=...,
     lql='source = "<host>" AND sparklogs.kind = agent_op', external_investigation_id="<id>")
   ```

   Empty here is inconclusive rather than reassuring.

5. The RMM vendor's own service and network events on the box: group by `reason` over
   `service = rmm`, and read the Application channel for the vendor's errors.

---
