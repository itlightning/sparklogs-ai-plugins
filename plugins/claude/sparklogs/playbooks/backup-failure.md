# Backup failure

**Trigger.** "Veeam, Datto, Axcient, Acronis, MSP360, Cove or Slide reports backup failed on `<source>`."
Writers, snapshots, or shadow-copy rotation with a job that looks fine: `${CLAUDE_PLUGIN_ROOT}/playbooks/windows-vss.md`.

**Accuracy.** Vendor backup channels carry job outcome.
VSS plumbing errors are not a job verdict.
Two backup products competing for snapshots show on device-health inventory (`fieldset=rca`), nowhere else.

**Queries.**

Vendor / Windows Backup errors in the failure window:

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

**Off-endpoint** (`${CLAUDE_PLUGIN_ROOT}/guides/off-endpoint-causes.md` HM1): backup target NAS or cloud, EDR cloud blocking VSS, bespoke vendor with no autodetect, credential vault, Hyper-V or VMware guest writers, server-side job state.
