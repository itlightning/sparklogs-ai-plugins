<!-- GENERATED reference. Do not hand-edit. -->
# Top kernel memory fields

Reported every hour on clock boundaries for the window ending at `t`. `sparklogs.window_coverage_pct` is below 100 when collection covered only part of the window. Use chart buckets at least 1 hour wide.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.top_kernel_memory.bucket_type` | string |  | What kind of kernel memory bucket this is: `pool_tag`, a Windows pool allocation tag. |
| `sparklogs.data.top_kernel_memory.name` | string |  | The bucket's name, exactly as the OS spells it: on Windows the four tag characters, so case and trailing spaces count (`Ntfs` and `NTFS` are two buckets). A byte that is not printable, and any `\` or `\|`, reads as `\xNN`. `(other)` on the remainder row. |
| `sparklogs.data.top_kernel_memory.pageable` | bool |  | Whether this memory can be written to disk: `true` for Windows paged pool, `false` for nonpaged pool. |
| `sparklogs.data.top_kernel_memory.entry_kind` | string |  | `bucket` for a row naming one bucket, `remainder` for the row holding every bucket the rankings did not name. |
| `sparklogs.data.top_kernel_memory.top_by` | string_array |  | The rankings that listed this bucket: `bytes` (the ten largest nonpageable and five largest pageable) and `min_1d_delta` (the ten whose daily low rose most). Empty on remainder rows. |
| `sparklogs.data.top_kernel_memory.bytes` | integer | bytes | Bytes held at the window's last sample. Listed rows and the two remainder rows add up to the tag table at that sample. Tags count the bytes drivers asked for, so the total runs below `kernel_paged_pool_bytes` and `kernel_nonpaged_pool_bytes`: 98 to 99 % of them on Server 2016, and 64 to 91 % on Server 2022, Server 2025 and Windows 11, falling with uptime. |
| `sparklogs.data.top_kernel_memory.min_bytes` | integer | bytes | The lowest sample in the window. Absent on remainder rows, whose members are known only at the window's end. |
| `sparklogs.data.top_kernel_memory.max_bytes` | integer | bytes | The highest sample in the window. Absent on remainder rows, whose members are known only at the window's end. |
| `sparklogs.data.top_kernel_memory.delta_bytes` | integer | bytes | The window's last sample minus its first; negative when the bucket shrank. Absent on a bucket first seen inside the window. |
| `sparklogs.data.top_kernel_memory.outstanding_count` | integer | count | Allocations not yet freed at the window's last sample. Absent on remainder rows. |
| `sparklogs.data.top_kernel_memory.bucket_count` | integer | count | How many buckets this remainder row holds. Absent on bucket rows. |
| `sparklogs.data.top_kernel_memory.min_1d_bytes` | integer | bytes | The lowest sample over the last 24 closed hourly windows that held a sample in this boot. One sample is enough to count a window, and a window with none does not count, so on a laptop this can span several days and little watched time. Absent on a bucket not tracked, or tracked for under 24 such windows. |
| `sparklogs.data.top_kernel_memory.min_1d_delta_bytes` | integer | bytes | `min_1d_bytes` minus its value 24 such windows earlier: a low that keeps rising is what a slow kernel leak looks like, and a busy machine's daily swing is not. Absent on a bucket tracked for under 48 such windows. |
| `sparklogs.data.top_kernel_memory.tracked_since_ts` | string | timestamp | When the agent started tracking this bucket's daily low in this boot, in UTC. Absent on a bucket not tracked. |
| `sparklogs.data.top_kernel_memory.owner_candidate_ids` | string_array |  | The `kernel_drivers` rows whose image files contain this tag, up to 3, in id order. This is where the tag is allocated, which is not always who holds the memory: a tag the kernel allocates for a caller, such as `File`, `Toke` or `IoFE`, cannot be traced to that caller and reads `owner_os_kernel`. Empty when the search matched no driver. Absent before the search, or when more than 3 drivers matched. A driver loaded after the search is not seen. Links nothing when the `kernel_drivers` topic is off. |
| `sparklogs.data.top_kernel_memory.owner_match_count` | integer | count | How many searched image files contain this tag, kernel images included. A count in the dozens means the tag is a common word and the match says nothing. Absent before the search. |
| `sparklogs.data.top_kernel_memory.owner_basis` | string |  | How the owner guess was made: `tag_in_image`, a byte search of loaded image files. A guess, never an attribution. Absent before the search. |
| `sparklogs.data.top_kernel_memory.owner_os_kernel` | bool |  | Whether `ntoskrnl.exe` or `hal.dll` contains this tag. Absent before the search. |
