---
index: Slow or freezing PC
aliases:
  - label: Slow server
---

# Slow or freezing device

**Trigger.** "The PC has been slow this week", "it freezes for a few seconds", or a server responds slowly.

**Accuracy.** The agent measures CPU, memory, paging, disk and the network path. It does not measure how long an application took to respond.
A device can feel slow with every measured lane quiet: the delay can sit inside the application, at its server, or in the far end of a connection.
Say which lanes were measured and quiet, and name the unmeasured ones, instead of calling the device healthy.
Reading heat spans, contributors and the top lists: `guides/device-state-fields.md` (**Read a device view**).
A span whose peak sat `within` (value) the device's typical range is not new for this device.

**Device health first.** `device_overview` (value) over the complaint window, up to 30 days and 1 hour.

- Header: coverage (an asleep or unreported stretch is not a quiet one), `measured` (col) and `not_measured` (col).
- `heat_spans` (col) by `domain` (col) (`cpu` (value), `ram` (value), `disk` (value)), each with its `driver` (col), peak, typical placement and contributors.
  Paging stall drives memory heat: programs waited on the disk for memory they were using.
  Disk heat is busy time pushed up by queue depth. Latency is not in it: read `disk_latency_ms` (col) in `domains` (col) for slow I/O at moderate busy time.
- `top_processes` (col): `window_rank_by` (col) says whether a row was kept for CPU, memory, disk I/O or network.
  Process I/O includes I/O that does not reach the disk. Storage readings carry disk load.
- `events` (col): episodes such as `cpu_busy` (value), `cpu_throttled_under_load` (value), `ram_pressure` (value), `disk_latency_degraded` (value) and `disk_saturated` (value), and the changes (driver, product, configuration) that overlapped a span.
- When the complaint names times, call again with a narrow `bucket` (arg) over those hours. A freeze shorter than `bucket_s` (col) leaves no span.

Then drill down from what the reading named:

- The span's process rows: the `processes` (value) result set with the span's `filter_lql` (col), or the matching `next_reads` (col) entry.
- CPU split: the `buckets` (value) result set carries user, kernel and interrupt/DPC shares; interrupt and DPC time points at drivers and hardware, not at a process.
- A process over the whole window: `top_processes_over_time` (value) with `rank_by` (arg).
- Network-bound slowness (file shares, line-of-business apps): `device_network` (value) and `playbooks/network-connectivity.md`.

Several devices slow at one site: name up to 25 in `agent_ids` (arg) for the light form, compare their worst bands and first hot times, then take up to 5 for full readings.

**Events, for what health named.** Crashes, hangs and errors on that device over the span's interval:

```
source = "<host>" AND severity >= 17
```

Group by `subsource` (LQL), then `pattern` (LQL) inside the dominant one.

**Off-endpoint** (HM12): application servers and SaaS backends, file servers without the agent, the user's own perception window.
