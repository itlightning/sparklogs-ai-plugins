# Kind: device state

**Standing / latest of each episode:** `query_device_health` (tool), omit `view` (arg) (`fieldset` (arg) = `rca` (value) for one host).
Columns: the response `schema.columns` (col) or the tool description. Episode and honesty interpretation: `guides/device-state-fields.md`.
A default-view row is the latest event of each episode that emitted inside the requested window, not the latest event of each subject.
What is on the box is `view` (arg) `latest_state` (value).
Series / RCA: `view` (arg) `timeline` (value) on the same tool.

**Event stream:** `query_logs` (tool) on `subsource` (LQL) `=` `"sparklogs.device.state"`.
Group `sparklogs.kind` (LQL), `sparklogs.topic` (LQL), `sparklogs.reason` (LQL).

No `provider_name` (LQL). Do not explore this feed like WEL.
Generated `feeds/sparklogs.device.state/fields.md` lists module promotions only.
The snapshot payload lives under `sparklogs.data` (LQL).
Start at `fields/INDEX.md`, then open the topic table for its exact names, types, units, and meanings.

## Which reading

| Question | Tool |
|---|---|
| Standing conditions / latest event of each episode in this window | `query_device_health` (tool), omit `view` (arg) (`fieldset` (arg) = `rca` (value) for one host). Episode and honesty interpretation: `guides/device-state-fields.md` |
| What is on the box / how it last read | `query_device_health` (tool), `view` (arg) `latest_state` (value) |
| Series of those episodes, or repeating change points | `query_device_health` (tool) `view` (arg) `timeline` (value). Same `min_severity` (arg) as the default view: peak in the window, then every in-window event of those episodes. Fieldset `fleet` (value) when duration / `sparklogs.episode.cleared_ts` (col) / `sparklogs.class` (col) matter |
| How it changed, every snapshot, hour by hour | `query_logs` (tool) on this `subsource` (LQL). Group `sparklogs.kind` (LQL), `sparklogs.topic` (LQL), `sparklogs.reason` (LQL) |

MCP column names paste straight into LQL now: `sparklogs.kind` (col) on a device-health row is `sparklogs.kind` (LQL) in logs, same spelling.
`subsource` (col) on health rows is the feed id `sparklogs.device.state` (value), the same stamp as logs.
`sparklogs.topic` (col) is the subject family (`disk_volumes` (value), `processes` (value), `services` (value)).

## Event kinds (logs)

**inventory** is the full list of what is on the box for that topic.
**delta** carries only the elements that changed, each with a delta_old sibling holding the previous reading.
**monitor** is an open condition and is where `sparklogs.reason` (LQL) is dense.

Cross-tab the two axes before reading any payload:

```
group_by: ["sparklogs.topic", "sparklogs.kind"]     lql: subsource="sparklogs.device.state"
```

That one call tells you which topics this fleet emits, at what volume, and whether a topic sends full inventories, deltas, or both. Topic cadence differs by more than a hundred to one: performance samples land every few minutes, drivers and installed software land about once a day.

## Payload shape: arrays of elements

Multi-instance topics store an ARRAY OF OBJECTS, one element per instance. The catalog marks the array before the leaf:

```
sparklogs.data.processes[].image_name
sparklogs.data.services[].current_state
sparklogs.data.disk_volumes[].free_pct
```

Host-scoped topics put their fields directly under the topic with no array:

```
sparklogs.data.performance.cpu_busy_pct_avg
sparklogs.data.system_info.reboot_pending
```

Both spellings are discoverable. No topic is keyed by process id, and LQL map wildcards over instance keys are not shipped.

`sparklogs.instance` (LQL) is empty on every snapshot event: the instance identity sits on the element, under keys such as instance, name and volume. The MCP `sparklogs.instance` (col) on device-health rows comes from the device-health tool's own per-episode identity, not this per-element key.

## Step 1: find the field

`list_fields` (tool) with `path_prefix` (arg) narrows to one topic; `path_match` (arg) is an RE2 regex over the remaining names and combines with it. Standard columns lead the response and neither argument filters them.

```
list_fields  path_prefix: sparklogs.data.processes   path_match: image|pid|working_set
```

Live rows, trimmed:

```
field                                          type  event_count
sparklogs.data.processes[].image_name          s     673
sparklogs.data.processes[].image_path          s     673
sparklogs.data.processes[].pid                 n     673
sparklogs.data.processes[].working_set_bytes   n     346
sparklogs.data.processes[].delta_old.pid       n     336
```

Two readings to take from that column. `event_count` (col) splits the topic: the paths at the higher count ride both inventory and delta events, the lower ones ride a subset. A delta_old path exists only on delta events and holds the PREVIOUS value.

## What one element carries

The generated feed reference does not carry the payload vocabulary, so read the tokens off one element. Trimmed elements from a live Windows Server fleet:

```
services (delta):    {"name":"wuauserv","instance":"service:wuauserv","current_state":"stopped",
                      "start_type":"manual","stopped_exit_code":0,"pid":772,"delta_kind":"changed",
                      "svc_crash_count_24h":0,
                      "delta_old":{"name":"wuauserv","current_state":"running","pid":772}}
disk_volumes:        {"volume":"volume:<guid>","display_name":"C:","volume_role":"os","drive_type":"fixed",
                      "filesystem":"ntfs","mount_state":"mounted","free_pct":73.75,"used_pct":26.25,
                      "free_bytes":50239832064,"fill_rate_bytes_per_h":4938622.87,
                      "projected_full_eta_h":10172.84,"writeable":true,"stale":false}
processes (delta):   {"image_name":"svchost.exe","pid":4816,"image_path":"<os>/system32/svchost.exe",
                      "instance":"process:4816|2026-09-06T04:41:50Z","services":["wuauserv"],
                      "age_s":81,"handle_count":329,"ram_growth_peak_mb":17.21,
                      "create_time_raw":134331433103133250,"delta_kind":"added"}
drivers:             {"class":"Net","provider":"Microsoft","inf":"wnetvsc.inf","device_count":1,
                      "description":"Microsoft Hyper-V Network Adapter","version":"10.0.14393.2273",
                      "driver_date":"2006-06-21T07:00:00.000000Z"}
installed_products:  {"name":"Microsoft Edge","publisher":"Microsoft Corporation","version":"152.0.4191.62",
                      "install_context":"machine","instance":"product:microsoft edge"}
```

Values are stored as lowercase tokens: current_state is running or stopped, start_type is manual, auto_delayed or disabled, volume_role is os, drive_type is fixed, mount_state is mounted. String equality ignores case, so a literal typed STOPPED matches the same events as stopped.

A stopped_exit_code of 1077 means the service has not been started since boot. It is not a failure code.

The process instance key is pid plus create time, so it changes on every restart. Group process questions on image_name, not on the instance. create_time_raw is a 64-bit count that loses digits under the default number reading; force it with `#i` when you compare it.

## Step 2: find the devices

`path[](pred)` matches an event when at least ONE element satisfies the whole predicate. `path[].leaf=v` is sugar for the single-term form.

```
sparklogs.data.processes[](image_name="svchost.exe")
sparklogs.data.services[](current_state="stopped" AND start_type="auto_delayed")
sparklogs.data.disk_volumes[](volume_role="os" AND free_pct<25)
sparklogs.data.drivers[](class="Net" AND provider="Microsoft")
sparklogs.data.installed_products[](name: Edge)
sparklogs.data.performance.commit_pct>55
```

Add `group_by: ["source"]` on `query_event_counts_by_severity` (tool) to turn any of these into the list of devices and how often each one matched.

## Bound versus uncorrelated

Two terms inside one `[]()` bind to the SAME element. The same two terms written as separate paths bind to the whole event, so they can be satisfied by two different elements.

| Query | Means |
|---|---|
| `sparklogs.data.processes[](image_name="svchost.exe" AND working_set_bytes>200000000)` | one svchost process is over 200 MB |
| `sparklogs.data.processes[].image_name="svchost.exe" AND sparklogs.data.processes[].working_set_bytes>200000000` | the box runs svchost, and something on the box is over 200 MB |

On a two-device dev fleet over 30 hours the bound form matched 0 events and the uncorrelated form matched 56. The same pair on services (stopped with auto_delayed) gave 76 bound against 94 uncorrelated. Reporting the uncorrelated count as the bound one overstates by whatever that gap happens to be.

Write the bound form whenever the two facts have to be true of one process, one service, or one volume. Reach for the uncorrelated form only to ask whether both things exist somewhere on the host.

Presence and negation follow the same scope:

```
sparklogs.data.processes[]!                        the array is present, empty array included
NOT sparklogs.data.processes[](image_name="x")     no element matches, and absent arrays match too
sparklogs.data.processes[]! AND NOT sparklogs.data.processes[](image_name="x")
```

## Step 3: see only the matching elements

**This section arrives with the next server build.** Until then, `[]` in `select` (arg) is refused with a message pointing at the filter grammar, and the workaround below is the whole answer.

Filtered element projection reuses the filter grammar in a name slot:

```
select: ["sparklogs.data.processes[](image_name=\"svchost.exe\").pid"]   the pid of each matching element
select: ["sparklogs.data.processes[](image_name=\"svchost.exe\")"]       the whole matching elements
select: ["sparklogs.data.processes[].image_name"]                        every element's leaf, unfiltered
```

The row filter and the projection are independent: the filter picks the events, the projection picks the elements shown. An empty match renders `[]`, an absent array is omitted from the JSONL row. One `[]` level per name; a nested second level is refused.

**Today, name the array itself.** `select: ["sparklogs.data.processes"]` returns the whole array, and a full inventory array (hundreds of services, dozens of driver packages) is cut at the response cap with a `…[truncated:N more items]` marker on the tail. Prefer a narrow window and one device, then read `message` (col): it carries the topic's own summary line and the low-signal cut never touches it.

## Aggregate across devices

Element leaves cannot be grouped or aggregated: `group_by` (arg) on `sparklogs.data.services[].current_state` is refused. Aggregation works on ROW columns, so pull one cache and refine it.

```
1. query_logs   lql: sparklogs.topic="performance"
                select: ["t", "source", "sparklogs.data.performance.cpu_busy_pct_avg"]
2. refine_query_result on that query_id
                group_by: ["source"]
                aggregate: [{fn: count, as: samples},
                            {fn: avg, col: "sparklogs.data.performance.cpu_busy_pct_avg", as: cpu_avg},
                            {fn: max, col: "sparklogs.data.performance.commit_pct", as: commit_max}]
                order_by: [{col: "commit_max", dir: "desc"}]
```

```
source              samples  cpu_avg   commit_max
lakeside-srv01-s01  12       0.256666  57.55
summit-app01-s01    12       0.129166  48.65
```

`select` (arg) on step 1 shrinks the response only. The cache keeps every column, so step 2 can aggregate the commit_pct path even though step 1 never returned it.

For a fleet count of one condition, `query_event_counts_by_severity` (tool) with the element filter and `group_by: ["source"]` answers in one call and needs no cache.

## Accuracy

Inventory without a `sparklogs.reason` (LQL) is still state, not a problem.
Open monitor is not an incident (`guides/category-classes.md`).
A delta says an element changed. It does not say the change caused anything.
Theme: `themes/device-health-and-state.md`.
