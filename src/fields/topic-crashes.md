<!-- GENERATED reference. Do not hand-edit. -->
# Crashes fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.crashes.kernel_crash_count_1d` | integer | count | Kernel crashes (stop errors) in the last day. Counts crashes, not dump files. Counts `kernel_crash` records; the latest is `sparklogs.data.crashes.kernel_crash_last_ts`. |
| `sparklogs.data.crashes.kernel_crash_count_5d` | integer | count | Kernel crashes in the last five days. Counts `kernel_crash` records; the latest is `sparklogs.data.crashes.kernel_crash_last_ts`. |
| `sparklogs.data.crashes.kernel_crash_count_10d` | integer | count | Kernel crashes in the last ten days. Counts `kernel_crash` records; the latest is `sparklogs.data.crashes.kernel_crash_last_ts`. |
| `sparklogs.data.crashes.kernel_crash_count_30d` | integer | count | Kernel crashes in the last thirty days, the whole history the agent keeps. Counts `kernel_crash` records; the latest is `sparklogs.data.crashes.kernel_crash_last_ts`. |
| `sparklogs.data.crashes.kernel_crash_days_since_last` | float | days | How long since the most recent kernel crash. Absent when there was none in the last thirty days. |
| `sparklogs.data.crashes.kernel_crash_last_ts` | string | timestamp | When the most recent kernel crash happened, the same time its kernel crash event carries. Until the agent has read the crash's memory dump, it can hold the estimated time, which moves to the time the dump records once the dump is read. Absent when there was none in the last thirty days. |
| `sparklogs.data.crashes.kernel_crash_quiet_awake_days` | float | days | How many days the machine has been awake without a kernel crash, counted from the newest one or from when the agent last started reading the System log without a break, whichever is later. Sleep and low-power idle do not count. Absent when the agent cannot account for the machine's awake time. |
| `sparklogs.data.crashes.kernel_crash_top_instance` | string |  | The `kernel_crashes` row of the newest analyzed crash with the most common stop code (`kernel_crash_top_failure_code`), as `crash_signature:<signature>`. Before 1.14.3, the signature with the most crashes in ten days. Absent when there is no such stop code, or that row is not among the `kernel_crashes` rows kept. |
| `sparklogs.data.crashes.kernel_crash_top_failure_code` | string |  | The stop code most analyzed kernel crashes in the last ten days share, whatever driver each dump blamed, or in the last thirty days when the last ten have none analyzed. A tie goes to the code with the more recent crash. Absent when no analyzed kernel crash happened in the last thirty days. Before 1.14.3, the stop code of the ten-day top signature. |
| `sparklogs.data.crashes.kernel_crash_top_blame_module` | string |  | The driver blamed by the newest analyzed crash with the most common stop code that blamed one. Before 1.14.3, that signature's newest dump. Absent when none blamed a driver, or there is no such stop code. |
| `sparklogs.data.crashes.kernel_crash_top_count_10d` | integer | count | Analyzed crashes with the most common stop code in the last ten days. Before 1.14.3, crashes of that signature. Absent when there is no such stop code. |
| `sparklogs.data.crashes.kernel_crash_top_count_30d` | integer | count | Analyzed crashes with the most common stop code in the last thirty days. Absent when there is no such stop code. |
| `sparklogs.data.crashes.app_crash_count_1d` | integer | count | Application crashes in the last day, all programs together. A crash near the start of the day can be left out. |
| `sparklogs.data.crashes.app_crash_count_5d` | integer | count | Application crashes in the last five days, all programs together. A crash on the first of the five days can be left out. |
| `sparklogs.data.crashes.app_crash_count_10d` | integer | count | Application crashes in the last ten days, all programs together. A crash on the first of the ten days can be left out. |
| `sparklogs.data.crashes.app_crash_days_since_last` | float | days | How long since the most recent application crash. Absent when there was none in the last thirty days. |
| `sparklogs.data.crashes.app_crash_quiet_awake_days` | float | days | How many days the machine has been awake without an application crash, counted from the newest one or from when the agent last started reading the Application log without a break, whichever is later. Sleep and low-power idle do not count. Absent when the agent cannot account for the machine's awake time. |
| `sparklogs.data.crashes.kernel_signatures_10d` | integer | count | How many different kernel crash signatures (stop code plus the blamed driver, when a dump named one) crashed in the last ten days. |
| `sparklogs.data.crashes.apps_crashing_10d` | integer | count | How many different programs crashed in the last ten days. |
| `sparklogs.data.crashes.kernel_signatures_total` | integer | count | How many different kernel crash signatures the last thirty days hold. `kernel_crashes` keeps rows for the 64 with the most crashes, so above 64 some have no row. |
| `sparklogs.data.crashes.apps_total` | integer | count | How many different programs crashed in the last thirty days, up to 128. `app_crashes` keeps rows for the 64 with the most crashes, so above 64 some have no row. |
| `sparklogs.data.crashes.crash_id` | string |  | The crash's ID, the same on every report of the same crash. |
| `sparklogs.data.crashes.time_basis` | string |  | Where the event time comes from: `dump_header` (the time in the analyzed kernel dump), `report_event` (the crash's event log record), or `estimated_bounds` (no crash time is known; the time is `time_upper_ts`). |
| `sparklogs.data.crashes.time_lower_ts` | string | timestamp | For an estimated crash time: the earliest the crash could have happened, from the newest System log record before the following boot, or the latest crash evidence before that boot. A bound for investigating, not the crash time. |
| `sparklogs.data.crashes.time_upper_ts` | string | timestamp | For an estimated crash time: the earliest evidence known to come after the crash. |
| `sparklogs.data.crashes.detected_ts` | string | timestamp | When the agent first found the crash, which is not the crash time. |
| `sparklogs.data.crashes.wer_report_ids` | string_array |  | The Windows Error Reporting report IDs in the crash's records, lowercase: a report GUID, or on Windows Server 2012 R2 the small dump's file name, which the System report uses as its ID. |
| `sparklogs.data.crashes.evidence` | object_array |  | The event log records the crash was built from, oldest first, at most 16: `channel`, `provider`, `event_id`, `record_id` (absent when not read) and `event_ts`. |
| `sparklogs.data.crashes.evidence[].channel` | string |  | In each `evidence` entry. |
| `sparklogs.data.crashes.evidence[].provider` | string |  | In each `evidence` entry. |
| `sparklogs.data.crashes.evidence[].event_id` | integer |  | In each `evidence` entry. |
| `sparklogs.data.crashes.evidence[].record_id` | integer |  | In each `evidence` entry. |
| `sparklogs.data.crashes.evidence[].event_ts` | string | timestamp | In each `evidence` entry. |
| `sparklogs.data.crashes.evidence_total` | integer | count | How many event log records the crash was built from, including any past the list's limit. |
| `sparklogs.data.crashes.analysis` | string |  | How the dump analysis went: `complete`, `partial_timeout`, `partial_error`, `resource_limited`, `dump_unavailable`, `unsupported_format` or `budget_skipped`. `complete` means the analysis finished, not that the cause is known. |
| `sparklogs.data.crashes.budget_reason` | string |  | Why the dump was not analyzed. With `budget_skipped`: `per_key` (the limit for crashes of this kind in a day was reached), `overall` (the daily limit for all crashes was reached) or `queue_full`. With `resource_limited`: `commit_pressure` (the machine's committed memory stayed too high to start the analysis). |
| `sparklogs.data.crashes.analysis_elapsed_ms` | integer | milliseconds | How long the dump analysis ran. Absent when none ran. |
| `sparklogs.data.crashes.analysis_peak_commit_bytes` | integer | bytes | The most memory the dump analysis committed at one time. Absent when none ran or Windows did not report it. |
| `sparklogs.data.crashes.matching_dump_count` | integer | count | How many dump files matched the crash. |
| `sparklogs.data.crashes.dump_path` | string |  | The full path of the analyzed dump file. Absent when there was none. |
| `sparklogs.data.crashes.dump_name` | string |  | The analyzed dump's file name. |
| `sparklogs.data.crashes.dump_size_bytes` | integer | bytes | The analyzed dump file's size. |
| `sparklogs.data.crashes.dump_format` | string |  | The analyzed dump's file format: `kernel_triage`, `kernel_full`, `kernel_bitmap` or `user_minidump`. |
| `sparklogs.data.crashes.dump_type_raw` | string |  | The dump type recorded in the dump file's header, in hex: the kernel dump type, or the user dump's `MINIDUMP_TYPE` flags. |
| `sparklogs.data.crashes.dump_truncated` | bool |  | True when the dump file is shorter than its header says, so the analysis read only part of it. |
| `sparklogs.data.crashes.architecture` | string |  | The processor architecture of the crashed system or process: `x64`, `x86`, `arm64` or `other`. |
| `sparklogs.data.crashes.os_build` | integer |  | The Windows build the dump was written on. |
| `sparklogs.data.crashes.context_ip` | string |  | The instruction pointer (`rip` or `eip`) at the crash, in hex. |
| `sparklogs.data.crashes.context_sp` | string |  | The stack pointer (`rsp` or `esp`) at the crash, in hex. |
| `sparklogs.data.crashes.context_fp` | string |  | The frame pointer (`rbp` or `ebp`) at the crash, in hex. |
| `sparklogs.data.crashes.modules` | object_array |  | The modules loaded at the crash, from the dump, at most 512; stack frames refer to them by position. Each has `basename` and, where read, `machine` (hex), `size_of_image`, `time_date_stamp` (8 hex digits), `file_version`, and the symbol identity a debugger needs: `codeview_kind` (`rsds` or `nb10`), `pdb_name`, `pdb_guid` (32 hex digits), `pdb_signature` (8 hex digits), `pdb_age`, `portable_pdb`, `pdb_checksum_algorithm` and `pdb_checksum`. The `*_source` members say where each part came from: `module_stream`, `triage_entry`, `dump_image` or `local_image`. |
| `sparklogs.data.crashes.modules[].basename` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].machine` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].size_of_image` | integer | bytes | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].time_date_stamp` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].identity_source` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].codeview_kind` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].pdb_name` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].pdb_guid` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].pdb_signature` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].pdb_age` | integer |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].debug_source` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].portable_pdb` | bool |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].pdb_checksum_algorithm` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].pdb_checksum` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].debug_directory_source` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].file_version` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules[].version_source` | string |  | In each `modules` entry. |
| `sparklogs.data.crashes.modules_total` | integer | count | How many modules the dump lists, including any past the list's limit. |
| `sparklogs.data.crashes.modules_truncated` | bool |  | True when some modules were left out of the list. |
| `sparklogs.data.crashes.modules_walk` | string |  | How reading the dump's module list ended: `complete`, `unavailable`, `cycle` (the list looped) or `iteration_cap` (stopped at the agent's limit). |
| `sparklogs.data.crashes.unloaded_modules` | object_array |  | Modules unloaded shortly before the crash, from the dump, at most 128: `basename`, `name_possibly_truncated`, and where read `size_of_image`, `time_date_stamp` (8 hex digits) and `unload_ts`. |
| `sparklogs.data.crashes.unloaded_modules[].basename` | string |  | In each `unloaded_modules` entry. |
| `sparklogs.data.crashes.unloaded_modules[].name_possibly_truncated` | bool |  | In each `unloaded_modules` entry. |
| `sparklogs.data.crashes.unloaded_modules[].size_of_image` | integer | bytes | In each `unloaded_modules` entry. |
| `sparklogs.data.crashes.unloaded_modules[].time_date_stamp` | string |  | In each `unloaded_modules` entry. |
| `sparklogs.data.crashes.unloaded_modules[].unload_ts` | string | timestamp | In each `unloaded_modules` entry. |
| `sparklogs.data.crashes.unloaded_total` | integer | count | How many unloaded modules the dump lists. |
| `sparklogs.data.crashes.unloaded_truncated` | bool |  | True when some unloaded modules were left out of the list. |
| `sparklogs.data.crashes.unloaded_walk` | string |  | How reading the dump's unloaded-module list ended: `complete`, `unavailable`, `cycle` (the list looped) or `iteration_cap` (stopped at the agent's limit). |
| `sparklogs.data.crashes.unloaded_order` | string |  | The order of the unloaded-module list: `most_recent_first`, or `as_recorded` when the order of unloading is not known. |
| `sparklogs.data.crashes.frames` | object_array |  | The crashing thread's stack, at most 64 frames. Each has `module` (its position in `modules`) and `offset` (hex, from the module's start), or `unmapped` for an address outside every module; `address` (`instruction` for the first frame, `return_address` after it); `method` (how the frame was found: `context`, `unwind_table`, `leaf_assumed` or `frame_pointer`); `unwind_source` (`dump` or `local_image`); and `nearest_export` with `nearest_export_displacement` (hex), the nearest exported function, not a resolved symbol. |
| `sparklogs.data.crashes.frames[].module` | integer |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].offset` | string |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].unmapped` | bool |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].address` | string |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].method` | string |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].unwind_source` | string |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].nearest_export` | string |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames[].nearest_export_displacement` | string |  | In each `frames` entry. |
| `sparklogs.data.crashes.frames_truncated` | bool |  | True when the stack went on past the 64 frames listed. |
| `sparklogs.data.crashes.stack_stop` | string |  | Why reading the stack stopped: `end_of_stack`, `unmapped`, `no_image`, `image_unavailable`, `unwind_failed`, `stack_unavailable`, `frame_cap`, `unsupported_architecture` or `no_context`. |
| `sparklogs.data.crashes.stack_stop_image` | string |  | When the stack stopped at a module whose code the dump does not hold (`stack_stop` is `no_image` or `image_unavailable`), why the agent could not use that module's file on this machine instead: `no_identity` (the dump does not record the module's build), `path_rejected` (the recorded path is not a file on a local fixed drive), `not_found` (no file there), `open_refused` (the file would not open), `not_pe` (the file is not a program image), `identity_mismatch` (the file is a different build than the one that crashed, often because it was updated since), or `cap_reached` (the agent had already opened its most files for this crash). The stopping module is the last frame's. Absent when the file was used or the stack stopped for another reason. |
| `sparklogs.data.crashes.stack_stop_image_file_time_date_stamp` | string |  | For an `identity_mismatch`, the build timestamp the file on this machine declares, in hex; the crashed build's is the stopping module's `time_date_stamp`. |
| `sparklogs.data.crashes.stack_stop_image_file_size_of_image` | integer |  | For an `identity_mismatch`, the image size in bytes the file on this machine declares; the crashed build's is the stopping module's `size_of_image`. |
| `sparklogs.data.crashes.stack_scan_candidates` | string_array |  | Possible drivers when a 64-bit kernel crash's stack stopped in its first two frames at a module whose code the dump does not hold (`stack_stop` is `no_image` or `image_unavailable`): values on the captured stack that point inside these modules, not a verified call chain. In the order found from the stack pointer up, with Windows' own modules left out as for `blame_module`. Often includes the driver involved, but not always first, so none is the cause on this evidence alone. Empty when the scanned stack pointed only into Windows' modules or into no module at all, or when the dump did not capture the stack at the stack pointer; absent when it was not scanned. |
| `sparklogs.data.crashes.stack_scan_candidates_truncated` | bool |  | True when the stack pointed into more than the 32 modules the scan keeps, so `stack_scan_candidates` may be missing some. |
| `sparklogs.data.crashes.blame_module` | string |  | The first module on the crashing stack that is not part of Windows: where to look first in a debugger, not proof of the cause. For a kernel crash, the first driver that is not one of Windows' own, so a vendor driver is blamed. For a process crash, the first module outside the Windows folder (`System32`, `SysWOW64` and `WinSxS` count as inside). Absent when no dump was analyzed or no frame qualifies. |
| `sparklogs.data.crashes.blame_offset` | string |  | Where in the blamed module the frame was, in hex: the faulting instruction for the first frame, a return address after it. |
| `sparklogs.data.crashes.failure_name` | string |  | What ended the crash. For a process crash, the .NET exception type when the runtime reported one, otherwise the name of the exception code, such as `STATUS_ACCESS_VIOLATION`. For a kernel crash, the stop error's name, such as `IRQL_NOT_LESS_OR_EQUAL`. Absent when no name is known. |
| `sparklogs.data.crashes.failure_space` | string |  | The code table the failure code belongs to: `ntstatus` for a process crash, `bugcheck` for a kernel crash. A .NET exception type in `failure_name` is not from that table. Present whenever the code is. |
| `sparklogs.data.crashes.failure_code` | string |  | The exception code of a process crash, or the stop code of a kernel crash, as `0x` and 8 hex digits. Absent only when no record or dump carried one. |
| `sparklogs.data.crashes.identity_basis` | string |  | What identifies the kernel crash: `boot_start` (the boot it was reported in), `report_id` (its error report) or `power_41` (the Kernel-Power 41 unexpected-restart record). |
| `sparklogs.data.crashes.boot_start_missing` | bool |  | True when no record shows when the boot that reported this kernel crash started. |
| `sparklogs.data.crashes.bugcheck_code` | string |  | The stop code, as `0x` and 8 hex digits. Absent only when no record or dump carried one. |
| `sparklogs.data.crashes.bugcheck_name` | string |  | The stop error's name, such as `IRQL_NOT_LESS_OR_EQUAL`. Absent when the code has no known name. |
| `sparklogs.data.crashes.bugcheck_space` | string |  | The code table the stop code belongs to: always `bugcheck`. Present whenever the code is. |
| `sparklogs.data.crashes.bugcheck_param1` | string |  | The stop error's first parameter, in hex. |
| `sparklogs.data.crashes.bugcheck_param2` | string |  | The stop error's second parameter, in hex. |
| `sparklogs.data.crashes.bugcheck_param3` | string |  | The stop error's third parameter, in hex. |
| `sparklogs.data.crashes.bugcheck_param4` | string |  | The stop error's fourth parameter, in hex. |
| `sparklogs.data.crashes.sleep_in_progress` | integer |  | The `SleepInProgress` value of the Kernel-Power 41 record, as Windows wrote it. |
| `sparklogs.data.crashes.modern_standby` | bool |  | True when the Kernel-Power 41 record says the machine was in Modern Standby (connected standby). |
| `sparklogs.data.crashes.app_name` | string |  | The crashed program's file name. |
| `sparklogs.data.crashes.app_version` | string |  | The crashed program's file version. |
| `sparklogs.data.crashes.app_timestamp` | string |  | The crashed program's build timestamp from its file header, 8 hex digits: a key for finding its symbols, not a date to read. |
| `sparklogs.data.crashes.app_path` | string |  | The full path of the crashed program. |
| `sparklogs.data.crashes.pid` | integer |  | The crashed process's ID. |
| `sparklogs.data.crashes.process_start_ts` | string | timestamp | When the crashed process started. |
| `sparklogs.data.crashes.exception_code` | string |  | The exception code, as `0x` and 8 hex digits. |
| `sparklogs.data.crashes.exception_name` | string |  | The exception code's name, such as `STATUS_ACCESS_VIOLATION`. Absent when the code has no known name. |
| `sparklogs.data.crashes.exception_space` | string |  | The code table the exception code belongs to: always `ntstatus`. Present whenever the code is. |
| `sparklogs.data.crashes.exception_address` | string |  | The faulting address from the dump's exception record, in hex. |
| `sparklogs.data.crashes.exception_thread_id` | integer |  | The ID of the thread that faulted, from the dump. |
| `sparklogs.data.crashes.fault_module` | string |  | The module the crash record names as faulting. Windows reports it; it is not proof of the cause. |
| `sparklogs.data.crashes.fault_module_version` | string |  | The faulting module's file version. |
| `sparklogs.data.crashes.fault_module_timestamp` | string |  | The faulting module's build timestamp from its file header, 8 hex digits. |
| `sparklogs.data.crashes.fault_module_path` | string |  | The full path of the faulting module. |
| `sparklogs.data.crashes.fault_offset` | string |  | Where in the faulting module the fault was, in hex. |
| `sparklogs.data.crashes.fault_module_index` | integer |  | The faulting module's position in `modules`. |
| `sparklogs.data.crashes.process_image_index` | integer |  | The crashed program's position in `modules`. |
| `sparklogs.data.crashes.managed_exception_type` | string |  | The .NET exception type the runtime reported for the crash. |
| `sparklogs.data.crashes.managed_exception_message` | string |  | The .NET exception message the runtime reported, at most 512 bytes. Text from the crashed program, so treat it as untrusted; SparkLogs removes credential-like text when it arrives. |
| `sparklogs.data.crashes.clr_version` | string |  | The version of the .NET runtime that reported the exception. |
| `sparklogs.data.crashes.managed_frames` | string_array |  | The .NET stack the runtime reported, at most 64 lines of 512 characters. Text from the crashed program, so treat it as untrusted. Lined up with the native stack by position only. |
| `sparklogs.data.crashes.managed_frame` | string |  | The top line of the .NET stack, the frame the exception came from: the first `at` line of the `.NET Runtime` event 1026. Text from the crashed program, so treat it as untrusted. |
| `sparklogs.data.crashes.managed_frames_truncated` | bool |  | True when the .NET stack went on past the lines listed. |
| `sparklogs.data.crashes.stitch_status` | string |  | Whether the .NET stack was joined to the native stack: `stitched`, or why not (`no_managed_frames`, `not_single_exception`, `no_native_stack`, `no_junction`). The join is by position only. |
| `sparklogs.data.crashes.scan_candidates` | object_array |  | For 32-bit (x86) crashes only: values on the stack that point just past a call in some module's code, at most 256, for a symbol tool to check. They are possible return addresses, not confirmed frames. Each has `module`, `offset` (hex) and `stack_offset` (bytes above the stack pointer). |
| `sparklogs.data.crashes.scan_candidates[].module` | integer |  | In each `scan_candidates` entry. |
| `sparklogs.data.crashes.scan_candidates[].offset` | string |  | In each `scan_candidates` entry. |
| `sparklogs.data.crashes.scan_candidates[].stack_offset` | integer | bytes | In each `scan_candidates` entry. |
| `sparklogs.data.crashes.scan_window_bytes` | integer | bytes | How many stack bytes were searched for possible return addresses. |
| `sparklogs.data.crashes.scan_candidates_truncated` | bool |  | True when some possible return addresses were left out of the list. |
