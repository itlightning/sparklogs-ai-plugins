---
name: sparklogs-ask
description: Query SparkLogs logs and device health/state over time to answer what happened on a host or across a fleet. Counts, timelines, disk, CPU, patches, Windows events, other system and application log events, installed software, collection health. Conversational answers from SparkLogs telemetry.
indexes: [corpus-navigation, playbooks, themes, feeds]
---

# SparkLogs Ask

Answer this question from SparkLogs telemetry. This is a conversation with the data, not an investigation report.

**WEL** means Windows Event Log.

No output template. No WHAT WAS NOT CHECKED catalog. Go as deep as the question needs. Follow-ups expected.

`sparklogs-investigate` is a cited system-condition summary with findings; offer when they want a written report. `sparklogs-analyze-cause` only after a summary exists.

## Investigation discipline

Bounded discovery first, aggregate before detail, and refine a cached result before re-querying: `guides/mcp-tool-decision-tree.md` (Investigation discipline), which also has the per-tool tiers.

## How to answer

Answer first, then stop. Hedge precisely ("not in this window", "not checked", "insufficient evidence"). Reuse a short `external_investigation_id` (arg) until the topic changes.

Cite links as URLs from `meta` (col), never a bare `query_id` (arg) or investigation handle. Link the device's page when the answer is about one device, including a fleet answer that narrows to one, and each device's page when it names several. Link a specific row only when that row carries the point: one or two links, not every row. Use `query_url` (col) for the evidence query or a fleet answer. `meta.device_url` (col) is cited as returned; to fill `meta.device_url_template` (col), follow the tool's reference (`server_info` (tool) with `describe_tool` (arg)).

**Questions that pick the path:** (e.g., what is on the box? what happened and when? one host or fleet? which symptom domain? is collection trustworthy?)

**Principles:** empty `sparklogs.*` fields = uncurated (not a health finding); completeness from feed reports only (`agent_complete_through` (col)); default to named scope; ask only on fuzzy identity (`match_kind` (col) ties, weak match, zero hits). Fleet hunt only when serious/shared and they agree. A missing total on a query is not zero.

Funnel, scope, LQL errors: `guides/mcp-tool-decision-tree.md`, `guides/scope-resolution.md`, `guides/lql-reference.md`. Stuck: `guides/common-mistakes.md`, `guides/stream-kinds.md`.

## Which tool (quick route)

- Something wrong with one device or a few (slow, dropping, filling, failing) → `query_device_health` (tool), `view` (arg) `device_overview` (value), or `device_network` (value) for network trouble; then refine its result sets and read events only for the device and interval it points at
- Blue screen, app crash or unexpected restart → `playbooks/crashes-and-restarts.md`; the device's crash timeline is the same tool, `view` (arg) `event_timeline` (value) with `kinds` (arg) `["occurrence"]` (value); app hangs are only in Application-channel events (`guides/device-state-fields.md`, **Choose the view**)
- Open problems across a client, or how many devices have one → same tool, omit `view` (arg), or `group_by_reason` (arg) for device counts
- Which processes or devices stand out across the fleet → same tool, `view` (arg) `fleet_processes` (value) or `fleet_performance` (value)
- What is installed or configured now → same tool, `view` (arg) `latest_state` (value), or refine an overview's `state` (value) result set
- Collection problems → `resolve_scope` (tool) with `unhealthy_collection_only` (arg); "no data from this device": `playbooks/sparklogs-collection.md`
- Counts, patterns, when → `query_event_counts_by_severity` (tool) grouped by the fields in `guides/scope-ladder.md` (`sparklogs.reason` (LQL) first on curated data), `describe_pattern` (tool), `query_scope_activity` (tool)
- Raw event lines → `query_logs` (tool) last, then refine
- Collector debug → `sparklogs.agent.vector` (value) / `sparklogs.agent.log` (value) only

## Where to look

<!-- BEGIN GENERATED INDEX:corpus-navigation -->
## Live tool reference

If server instructions are missing or terminology is unclear, call `server_info` (tool) with `include_instructions: true`.
For detailed views, fieldsets, aggregation or paging, call it with `describe_tool` (arg) naming the tool.
Use these references when the visible description leaves a question, not on every call.
A question about one device or a few starts with `query_device_health` (tool) `view` (arg) `device_overview` (value) or `device_network` (value): read `guides/device-state-fields.md` (**Read a device view**).
Process charts use the same tool with `view` (arg) `top_processes_over_time` (value).

## Curated data (read this before opening reference files)

- **`subsource` (LQL) = feed id.** Group before `query_logs` (tool): the scope ladder plus `sparklogs.reason` (LQL), in `guides/scope-ladder.md`.
- **Curated events** carry `sparklogs.reason` (LQL), `sparklogs.class` (LQL), and module fields. Empty `sparklogs.*` on an event means **uncurated** (not a collection-health finding).
- **Reason** (`sparklogs.reason` (LQL)) = our curated vocabulary. **Vendor code** = NTSTATUS, HRESULT, MSI exit, Kerberos result, etc. **pattern_hash** (LQL) = stable shape id on every event.
- **Device row** (`query_device_health` (tool), feed health, `agent_complete_through` (col)) is authoritative for collection and completeness. Event volume is not coverage.
- **Playbooks** = symptom recipes. **Themes** = investigation topic bundles.
- **Tags in the guides:** a name tagged (arg) is a tool input (`agent_ids` (arg)), (col) a response column (`event_count` (col)), and (LQL) a field you can filter or group on (`subsource` (LQL)).

## What is in the pack

`playbooks/`, `themes/`, `feeds/<id>/` (`README.md`, `reasons.md`, `enums.md`, `fields.md`, `recipes.md`, `patterns.md` where present), `guides/`. Artifact choice detail: `guides/generated-reference-router.md`.

## After you pick a `subsource` (LQL)

1. Open `feeds/<id>/README.md` (short index).
2. **Stream kind** and exploration order: `guides/stream-kinds.md`. Classic WEL: `provider_name` (LQL) before `pattern` (LQL); device state: `query_device_health` (tool) with `kinds` (arg) / `topics` (arg) / `reasons` (arg).
3. Open **one** artifact (read-mode table below). Rich feeds (especially `win.eventlog.security` (value)) often need `recipes.md` or `reasons.md` first, not only `fields.md` or `enums.md`. Security also carries `patterns.md` and `mapping-ecs.md` / `mapping-ocsf.md` when shape or external taxonomy is the question.

**Reason meaning:** the `sparklogs.reason` (LQL) value and the event `message` (col) together; grep `reasons.md` for the matching `##` heading (summary table first, one section only).

**Vendor codes:** grep `feeds/<id>/enums.md` for the code or `##` heading, never the whole file (Security: NTSTATUS, Kerberos, logon types, NPS; Application: MSI; Storage: SCSI, SRB; identity_security: code-integrity levels). Setup's HRESULT is `win.eventlog.setup.error_code` (LQL); a curated result is `sparklogs.result.code` (LQL).

## How much to read

| Material | When | How |
|---|---|---|
| Playbook | Symptom matches index below | One file, whole |
| Theme | Investigation topic matches index | One file, whole |
| Feed `README.md` | You picked a `subsource` (LQL) | Whole (short index) |
| `reasons.md` | Need what a reason means | Skim summary table (~first 100 lines), then **one** `##` section |
| `enums.md` | Vendor/status code | **Search only** |
| `fields.md` | Filter/group on a field | Search for field name |
| `recipes.md` | Worked pivot for this feed | One section |
| `patterns.md` | Is this pattern string expected? | Search one heading (grammar/drift, not meaning) |
| Guides | Cross-cutting stuck point | One file from skill when→file table |

## Unfamiliar `pattern_hash` (LQL)

1. `describe_pattern` (tool) for text, examples, fleet spread.
2. Grep `feeds/<id>/reasons.md` or `recipes.md` if a reason or pivot is the question.
3. `patterns.md` only when the question is whether the pack meant to produce that string shape.
<!-- END GENERATED INDEX:corpus-navigation -->

Routing indexes below. Open one file when the step needs it.

Playbooks are incomplete recipes. If a recipe LQL produces empty results: widen by `subsource` (LQL), then `guides/stream-kinds.md`, then raw logs.

**Playbooks** (symptom recipes):

<!-- BEGIN GENERATED INDEX:playbooks -->
| Symptom | File |
|---|---|
| One application slow or stalling over the network | `playbooks/application-network-stall.md` |
| App slow over VPN | `playbooks/application-network-stall.md` |
| BitLocker recovery | `playbooks/bitlocker-recovery.md` |
| Certificate, TLS and enrollment failures | `playbooks/certificate-expiry.md` |
| Certificate expired or expiring | `playbooks/certificate-expiry.md` |
| TLS or Schannel errors | `playbooks/certificate-expiry.md` |
| Certificate autoenrollment failing | `playbooks/certificate-expiry.md` |
| HTTPS site or Remote Desktop certificate error | `playbooks/certificate-expiry.md` |
| Blue screens, app crashes, unexpected restarts | `playbooks/crashes-and-restarts.md` |
| Blue screen (BSOD) | `playbooks/crashes-and-restarts.md` |
| App keeps crashing | `playbooks/crashes-and-restarts.md` |
| Server restarted on its own | `playbooks/crashes-and-restarts.md` |
| Directory replication | `playbooks/directory-replication-failure.md` |
| Disk full or filling | `playbooks/disk-full-or-filling.md` |
| File share or mapped drive unreachable or slow | `playbooks/file-share-access.md` |
| Mapped drive disconnected | `playbooks/file-share-access.md` |
| Access denied on a share | `playbooks/file-share-access.md` |
| NAS or scanner share stopped working | `playbooks/file-share-access.md` |
| Group Policy not applying | `playbooks/group-policy.md` |
| Group Policy slow at startup or logon | `playbooks/group-policy.md` |
| Mapped drive, printer or shortcut from policy missing | `playbooks/group-policy.md` |
| Hardware faults (WHEA, GPU, devices, heat) | `playbooks/hardware-faults.md` |
| WHEA hardware errors | `playbooks/hardware-faults.md` |
| Display driver stopped responding | `playbooks/hardware-faults.md` |
| Device not working (Code 10, 43) | `playbooks/hardware-faults.md` |
| Overheating or thermal shutdown | `playbooks/hardware-faults.md` |
| Memory or handle leak | `playbooks/memory-or-handle-leak.md` |
| Internet down, slow or dropping | `playbooks/network-connectivity.md` |
| Wi-Fi drops | `playbooks/network-connectivity.md` |
| Suspicious PowerShell / script blocks | `playbooks/powershell-script-blocks.md` |
| Encoded PowerShell command | `playbooks/powershell-script-blocks.md` |
| Disk or RAID array failing | `playbooks/raid-or-storage-degraded.md` |
| RAID / array degraded | `playbooks/raid-or-storage-degraded.md` |
| Disk errors or bad blocks | `playbooks/raid-or-storage-degraded.md` |
| Chkdsk or file system corruption | `playbooks/raid-or-storage-degraded.md` |
| Volume missing, offline or RAW | `playbooks/raid-or-storage-degraded.md` |
| SAN or iSCSI disk lost | `playbooks/raid-or-storage-degraded.md` |
| RMM connectivity | `playbooks/rmm-connectivity.md` |
| Scheduled task did not run or failed | `playbooks/scheduled-task-failures.md` |
| Nightly script did not run | `playbooks/scheduled-task-failures.md` |
| Scheduled task disabled or missing | `playbooks/scheduled-task-failures.md` |
| Service will not start, keeps stopping or hangs | `playbooks/service-failures.md` |
| Service crashing and restarting | `playbooks/service-failures.md` |
| Automatic service stopped | `playbooks/service-failures.md` |
| Slow or freezing PC | `playbooks/slow-device.md` |
| Slow server | `playbooks/slow-device.md` |
| Slow logon | `playbooks/slow-logon.md` |
| Is SparkLogs collecting from this device | `playbooks/sparklogs-collection.md` |
| No data from a device | `playbooks/sparklogs-collection.md` |
| Skipped or missing events | `playbooks/sparklogs-collection.md` |
| SparkLogs agent not updating | `playbooks/sparklogs-collection.md` |
| TPM errors or attestation failure | `playbooks/tpm-health.md` |
| What changed on this device | `playbooks/what-changed.md` |
| It worked yesterday | `playbooks/what-changed.md` |
| Windows Update / patch failure | `playbooks/windows-update-failure.md` |
| VSS / shadow copies / backup plumbing | `playbooks/windows-vss.md` |
<!-- END GENERATED INDEX:playbooks -->

**Themes** (domain context):

<!-- BEGIN GENERATED INDEX:themes -->
| Topic | File |
|---|---|
| Patches / CBS / DISM / Setup | `themes/windows-updates-and-patching.md` |
| Who changed what (Security) | `themes/windows-security-and-audit.md` |
| Defender | `themes/endpoint-protection.md` |
| App / System crashes and services | `themes/windows-operational-events.md` |
| CPU, RAM, disk, network, installed software, monitors | `themes/device-health-and-state.md` |
| Named backup product (Veeam etc.): installed products. Not operational events. | `themes/device-health-and-state.md` |
<!-- END GENERATED INDEX:themes -->

**Data feeds** (`subsource` (LQL) = directory name). Follow **After you pick a `subsource` (LQL)** in the corpus block above.

<!-- BEGIN GENERATED INDEX:feeds -->
| Feed | What | Path |
|---|---|---|
| `win.eventlog.security` | Security auditing: logons, account and policy changes, actors | `feeds/win.eventlog.security/` |
| `win.eventlog.system` | System channel: services, drivers, kernel, VSS, storage | `feeds/win.eventlog.system/` |
| `win.eventlog.application` | Application channel: app crashes, hangs, vendor app events | `feeds/win.eventlog.application/` |
| `win.eventlog.setup` | Windows Update results per update | `feeds/win.eventlog.setup/` |
| `win.eventlog.platform` | Platform channels: kernel, PnP, boot, power, drivers | `feeds/win.eventlog.platform/` |
| `win.eventlog.storage` | Storage channels: disks, volumes, NTFS, storage drivers | `feeds/win.eventlog.storage/` |
| `win.eventlog.network` | Network channels: SMB client and server, DHCP, DNS client, Wi-Fi, firewall | `feeds/win.eventlog.network/` |
| `win.eventlog.identity_security` | Identity and security channels: code integrity, exploit protection, Group Policy, Entra and TPM | `feeds/win.eventlog.identity_security/` |
| `win.eventlog.management` | Management channels: Task Scheduler, BITS, WinRM, WMI, Windows Update client | `feeds/win.eventlog.management/` |
| `win.eventlog.apps` | Apps channels: packaged apps, app model, application compatibility | `feeds/win.eventlog.apps/` |
| `win.powershell.eventlog` | PowerShell engine, module and script-block channels: merged script blocks, watchlisted commands | `feeds/win.powershell.eventlog/` |
| `win.servicing.cbs` | CBS servicing internals: component store, packages | `feeds/win.servicing.cbs/` |
| `win.servicing.dism` | DISM operations and image health | `feeds/win.servicing.dism/` |
| `win.defender.eventlog` | Defender: threats, protection state | `feeds/win.defender.eventlog/` |
| `sparklogs.device.state` | Device health and state snapshots: CPU, RAM, disk, installed software, monitors | `feeds/sparklogs.device.state/` |
| `sparklogs.agent.vector` | Collector debug only: data collector internals | `feeds/sparklogs.agent.vector/` |
| `sparklogs.agent.log` | Collector debug only: agent supervisor log | `feeds/sparklogs.agent.log/` |
<!-- END GENERATED INDEX:feeds -->

## Escalation

Offer `sparklogs-investigate` for an in-depth written report (name the matching playbook from the table when it fits). `sparklogs-analyze-cause` only after that report exists.
