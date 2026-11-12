---
index: Backup job failed
---

# Backup failure

**Trigger.** "Veeam, Datto, Axcient, Acronis, MSP360, Cove or Slide reports backup failed on `<source>`."
Writers, snapshots, or shadow-copy rotation with a job that looks fine: `playbooks/windows-vss.md`.

**Accuracy.** SparkLogs does not curate backup job results.
A vendor's job outcome reaches SparkLogs only when the vendor writes it to the Application or System log, as uncurated text with an empty `app` (LQL); a vendor's own event log channel is not collected.
`app = veeam` (LQL) and the other backup tokens mark events about that vendor's Windows services: a service that crashed, stopped or failed to start.
What SparkLogs can establish around a failed job: the vendor's services, VSS writers and snapshots, free space, and whether the device was awake.
When no job result is in the events, put the job verdict in WHAT WAS NOT CHECKED and name the backup console as where it lives.
VSS plumbing errors are not a job verdict.
Two backup products competing for snapshots show in `latest_state` (value) on topic `installed_products` (value), and as two requesters in VSS 8231 events (`playbooks/windows-vss.md`).

**Device health first.** `device_overview` (value) over the failed job's window.
Header coverage says whether the device was awake for it; a job window spent asleep or powered off is its own answer.
`events` (col) carry `vss_writer_failed` (value), `vss_snapshots_failing_for_space` (value) and the space-low conditions; disk heat spans and `top_processes` (col) show whether the backup ran into a busy or slow disk.
The device-health reading describes the machine around the job; the job's outcome comes from the vendor, in events only when the vendor writes it to Application or System.

**Events, for what health named.** Errors in the failure window, including any job text the vendor wrote to Application or System:

```lql
source: "<host>" AND severity >= error
```

Group by `pattern` (LQL).
Cite a pattern only after reading it.
Narrow Windows Backup with `provider_name: Microsoft-Windows-Backup*` on the cached slice.

Same pattern across the client:

```lql
pattern_hash = "<h>"
```

Group by `source` (LQL).

**Off-endpoint** (`guides/off-endpoint-causes.md` HM1): backup target NAS or cloud, EDR cloud blocking VSS, bespoke vendor with no autodetect, credential vault, Hyper-V or VMware guest writers, server-side job state.
