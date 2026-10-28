---
index: Backup job failed
---

# Backup failure

**Trigger.** "Veeam, Datto, Axcient, Acronis, MSP360, Cove or Slide reports backup failed on `<source>`."
Writers, snapshots, or shadow-copy rotation with a job that looks fine: `playbooks/windows-vss.md`.

**Accuracy.** Vendor backup channels carry job outcome.
VSS plumbing errors are not a job verdict.
Two backup products competing for snapshots show on device-health inventory (`fieldset=rca`), nowhere else.

**Device health first.** `device_overview` (value) over the failed job's window.
Header coverage says whether the device was awake for it; a job window spent asleep or powered off is its own answer.
`events` (col) carry `vss_writer_failed` (value), `vss_snapshots_failing_for_space` (value) and the space-low conditions; disk heat spans and `top_processes` (col) show whether the backup ran into a busy or slow disk.
The device-health reading describes the machine around the job; the job's outcome still comes from the vendor's events.

**Events, for what health named.** Vendor / Windows Backup errors in the failure window:

```
source = "<host>" AND severity >= 17
```

Group by `pattern` (LQL).
Cite a pattern only after reading it.
Narrow Windows Backup with `provider_name: Microsoft-Windows-Backup*` on the cached slice.

Same pattern across the client:

```
pattern_hash = "<h>"
```

Group by `source` (LQL).

**Off-endpoint** (`guides/off-endpoint-causes.md` HM1): backup target NAS or cloud, EDR cloud blocking VSS, bespoke vendor with no autodetect, credential vault, Hyper-V or VMware guest writers, server-side job state.
