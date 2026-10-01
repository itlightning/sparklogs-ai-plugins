<!-- GENERATED reference. Do not hand-edit. -->
# Crashes fields

Full inventory every 8 hours. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.crashes.kernel_crash_count_1d` | integer | count | Kernel crashes in the last day, counted from the crash history: distinct crashes, not dump files. |
| `sparklogs.data.crashes.kernel_crash_count_5d` | integer | count | Kernel crashes in the last five days. |
| `sparklogs.data.crashes.kernel_crash_count_10d` | integer | count | Kernel crashes in the last ten days. |
| `sparklogs.data.crashes.kernel_crash_days_since_last` | float | days | How long since the most recent kernel crash. Absent when the thirty-day history holds none. |
| `sparklogs.data.crashes.kernel_crash_coverage_days` | float | days | How long the System log has been read without a gap (no record lost to a clear or a roll-over). Absent until it has been read once. |
| `sparklogs.data.crashes.crash_id` | string |  | The crash's stable identity, the same on every report of it. Opaque. Occurrence only. |
| `sparklogs.data.crashes.time_basis` | string |  | Where the event time comes from: `dump_header` (the analyzed kernel dump's own clock), `report_event` (the crash record), or `estimated_bounds` (no crash time; `time_upper_ts` is used). Occurrence only. |
| `sparklogs.data.crashes.time_lower_ts` | string | timestamp | For `estimated_bounds`: the newest System record before the boot that followed the crash, when that read answered and is newer (the machine was running then); otherwise the latest crash evidence before that boot. An investigation bound, not the crash time. Occurrence only. |
| `sparklogs.data.crashes.time_upper_ts` | string | timestamp | The earliest evidence known to follow the crash, for `estimated_bounds`. Occurrence only. |
| `sparklogs.data.crashes.detected_ts` | string | timestamp | When the agent first found the crash; not the crash time. Occurrence only. |
| `sparklogs.data.crashes.wer_report_ids` | string_array |  | The Windows Error Reporting report ids the crash's records carry, lowercase: a report GUID, or on Windows Server 2012 R2 the small dump's base name the System report uses as its id. Occurrence only. |
| `sparklogs.data.crashes.evidence` | object_array |  | The event records the crash was built from, oldest first, at most 16: `channel`, `provider`, `event_id`, `record_id` (absent when unread) and `event_ts`. Occurrence only. |
| `sparklogs.data.crashes.evidence_total` | integer | count | How many records the crash was built from, including any past the list. Occurrence only. |
| `sparklogs.data.crashes.analysis` | string |  | What the dump analysis did: `complete`, `partial_timeout`, `partial_error`, `resource_limited`, `dump_unavailable`, `unsupported_format` or `budget_skipped`. `complete` means the supported analysis finished, not that the cause is known. Occurrence only. |
| `sparklogs.data.crashes.budget_reason` | string |  | Why the dump was not analyzed: with `budget_skipped`, `per_key` (three of this kind in a day), `overall` (64 in a day) or `queue_full`; with `resource_limited`, `commit_pressure` (the system's commit stayed too high to start the analysis). Occurrence only. |
| `sparklogs.data.crashes.analysis_elapsed_ms` | integer | milliseconds | How long the analysis ran. Absent when none ran. Occurrence only. |
| `sparklogs.data.crashes.matching_dump_count` | integer | count | How many dump files matched the crash. Occurrence only. |
| `sparklogs.data.crashes.dump_path` | string |  | The analyzed dump. Absent without one. Occurrence only. |
| `sparklogs.data.crashes.dump_name` | string |  | The analyzed dump's file name. Occurrence only. |
| `sparklogs.data.crashes.dump_size_bytes` | integer | bytes | The analyzed dump's size. Occurrence only. |
| `sparklogs.data.crashes.dump_format` | string |  | The analyzed dump's format: `kernel_triage`, `kernel_full`, `kernel_bitmap` or `user_minidump`. Occurrence only. |
| `sparklogs.data.crashes.dump_type_raw` | string |  | The dump header's raw type: the kernel `DumpType`, or the user dump's `MINIDUMP_TYPE` flags, as hex. Occurrence only. |
| `sparklogs.data.crashes.dump_truncated` | bool |  | The dump file is shorter than its header declares, so what was read from it is partial. Occurrence only. |
| `sparklogs.data.crashes.architecture` | string |  | The crashed system's or process's architecture: `x64`, `x86`, `arm64` or `other`. Occurrence only. |
| `sparklogs.data.crashes.os_build` | integer |  | The Windows build the dump was written on. Occurrence only. |
| `sparklogs.data.crashes.context_ip` | string |  | The crashing context's instruction pointer (`rip` or `eip`), as hex. Occurrence only. |
| `sparklogs.data.crashes.context_sp` | string |  | The crashing context's stack pointer (`rsp` or `esp`), as hex. Occurrence only. |
| `sparklogs.data.crashes.context_fp` | string |  | The crashing context's frame pointer (`rbp` or `ebp`), as hex. Occurrence only. |
| `sparklogs.data.crashes.modules` | object_array |  | Loaded modules from the analyzed dump, at most 512; frames refer to them by position. Each has `basename`, and where read `machine` (hex), `size_of_image`, `time_date_stamp` (8 hex digits), `identity_source`, `codeview_kind` (`rsds` or `nb10`), `pdb_name`, `pdb_guid` (32 hex digits), `pdb_signature` (8 hex digits), `pdb_age`, `debug_source`, `portable_pdb`, `pdb_checksum_algorithm`, `pdb_checksum`, `debug_directory_source`, `file_version` and `version_source`. Sources are `module_stream`, `triage_entry`, `dump_image` or `local_image`. Occurrence only. |
| `sparklogs.data.crashes.modules_total` | integer | count | How many modules the dump lists, including any past the list. Occurrence only. |
| `sparklogs.data.crashes.modules_truncated` | bool |  | Modules were left out of the list. Occurrence only. |
| `sparklogs.data.crashes.modules_walk` | string |  | How the module list walk ended: `complete`, `unavailable`, `cycle` or `iteration_cap`. Occurrence only. |
| `sparklogs.data.crashes.unloaded_modules` | object_array |  | Recently unloaded modules from the analyzed dump, at most 128: `basename`, `name_possibly_truncated`, and where read `size_of_image`, `time_date_stamp` (8 hex digits) and `unload_ts`. Occurrence only. |
| `sparklogs.data.crashes.unloaded_total` | integer | count | How many unloaded modules the dump lists. Occurrence only. |
| `sparklogs.data.crashes.unloaded_truncated` | bool |  | Unloaded modules were left out of the list. Occurrence only. |
| `sparklogs.data.crashes.unloaded_walk` | string |  | How the unloaded list walk ended: `complete`, `unavailable`, `cycle` or `iteration_cap`. Occurrence only. |
| `sparklogs.data.crashes.unloaded_order` | string |  | The unloaded list's order: `most_recent_first`, or `as_recorded` when recency is not known. Occurrence only. |
| `sparklogs.data.crashes.frames` | object_array |  | The crashing thread's stack, at most 64 frames: `module` (position in `modules`) and `offset` (hex, module-relative), or `unmapped` for an address outside every module; `address` (`instruction` for frame 0, `return_address` after), `method` (`context`, `unwind_table`, `leaf_assumed` or `frame_pointer`), `unwind_source` (`dump` or `local_image`), and `nearest_export` with `nearest_export_displacement` (hex), which is the nearest export, never a resolved symbol. Occurrence only. |
| `sparklogs.data.crashes.frames_truncated` | bool |  | The stack went on past the frame cap. Occurrence only. |
| `sparklogs.data.crashes.stack_stop` | string |  | Why the stack walk stopped: `end_of_stack`, `unmapped`, `no_image`, `image_unavailable`, `unwind_failed`, `stack_unavailable`, `frame_cap`, `unsupported_architecture` or `no_context`. Occurrence only. |
| `sparklogs.data.crashes.identity_basis` | string |  | What names a kernel crash: `boot_start` (the boot it was reported in), `report_id` or `power_41`. Kernel crash only. |
| `sparklogs.data.crashes.boot_start_missing` | bool |  | No boot-start record placed the boot the kernel crash was reported in. Kernel crash only. |
| `sparklogs.data.crashes.bugcheck_code` | string |  | The bugcheck code, `0x` and 8 hex digits. Absent only when no record or dump carried one. Kernel crash only. |
| `sparklogs.data.crashes.bugcheck_name` | string |  | The bugcheck's symbolic name, from the pack's bugcheck table. Absent when the table has no row for the code. Kernel crash only. |
| `sparklogs.data.crashes.bugcheck_param1` | string |  | The bugcheck's first parameter, as hex. Kernel crash only. |
| `sparklogs.data.crashes.bugcheck_param2` | string |  | The bugcheck's second parameter, as hex. Kernel crash only. |
| `sparklogs.data.crashes.bugcheck_param3` | string |  | The bugcheck's third parameter, as hex. Kernel crash only. |
| `sparklogs.data.crashes.bugcheck_param4` | string |  | The bugcheck's fourth parameter, as hex. Kernel crash only. |
| `sparklogs.data.crashes.sleep_in_progress` | integer |  | Kernel-Power 41's raw `SleepInProgress` value. Kernel crash only. |
| `sparklogs.data.crashes.modern_standby` | bool |  | Kernel-Power 41 says connected standby was in progress. Kernel crash only. |
| `sparklogs.data.crashes.app_name` | string |  | The crashed process's executable name. Process crash only. |
| `sparklogs.data.crashes.app_version` | string |  | The executable's file version. Process crash only. |
| `sparklogs.data.crashes.app_timestamp` | string |  | The executable's PE `TimeDateStamp`, 8 hex digits: a symbol-store key, not a date. Process crash only. |
| `sparklogs.data.crashes.app_path` | string |  | The executable's path. Process crash only. |
| `sparklogs.data.crashes.pid` | integer |  | The crashed process's id. Process crash only. |
| `sparklogs.data.crashes.process_start_ts` | string | timestamp | When the crashed process started. Process crash only. |
| `sparklogs.data.crashes.exception_code` | string |  | The exception code, `0x` and 8 hex digits. Process crash only. |
| `sparklogs.data.crashes.exception_name` | string |  | The exception code's NTSTATUS name, from the pack's status-code table. Absent when the table has no row for the code. Process crash only. |
| `sparklogs.data.crashes.exception_address` | string |  | The faulting address the dump's exception record carries, as hex. Process crash only. |
| `sparklogs.data.crashes.exception_thread_id` | integer |  | The faulting thread's id, from the dump. Process crash only. |
| `sparklogs.data.crashes.fault_module` | string |  | The module the crash record reports the fault in. Reported, not a cause. Process crash only. |
| `sparklogs.data.crashes.fault_module_version` | string |  | The fault module's file version. Process crash only. |
| `sparklogs.data.crashes.fault_module_timestamp` | string |  | The fault module's PE `TimeDateStamp`, 8 hex digits. Process crash only. |
| `sparklogs.data.crashes.fault_module_path` | string |  | The fault module's path. Process crash only. |
| `sparklogs.data.crashes.fault_offset` | string |  | The fault's offset in the fault module, as hex. Process crash only. |
| `sparklogs.data.crashes.fault_module_index` | integer |  | The fault module's position in `modules`. Process crash only. |
| `sparklogs.data.crashes.process_image_index` | integer |  | The executable's position in `modules`. Process crash only. |
| `sparklogs.data.crashes.managed_exception_type` | string |  | The .NET exception type the runtime reported for the crash. Process crash only. |
| `sparklogs.data.crashes.managed_exception_message` | string |  | The .NET exception message the runtime reported, at most 512 bytes. Untrusted text; credential shapes are swept at ingest. Process crash only. |
| `sparklogs.data.crashes.clr_version` | string |  | The .NET runtime version that reported the exception. Process crash only. |
| `sparklogs.data.crashes.managed_frames` | string_array |  | The .NET stack the runtime reported, at most 64 lines of 512 characters. Untrusted text, joined to the native stack by position only. Process crash only. |
| `sparklogs.data.crashes.managed_frames_truncated` | bool |  | The .NET stack went on past the list. Process crash only. |
| `sparklogs.data.crashes.stitch_status` | string |  | Whether the .NET stack continues the native one: `stitched`, or why not (`no_managed_frames`, `not_single_exception`, `no_native_stack`, `no_junction`). A stitch is by position, never an unwind. Process crash only. |
| `sparklogs.data.crashes.scan_candidates` | object_array |  | x86 only: stack values just past a call instruction in a module's code, at most 256, for a symbolizer to validate; never frames. Each has `module`, `offset` (hex) and `stack_offset` (bytes above the stack pointer). Process crash only. |
| `sparklogs.data.crashes.scan_window_bytes` | integer | bytes | Stack bytes searched for scan candidates. Process crash only. |
| `sparklogs.data.crashes.scan_candidates_truncated` | bool |  | Scan candidates were left out of the list. Process crash only. |
