<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `win.eventlog.identity_security`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## `code_integrity_signing_levels`

12 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `0` | `signing_level_unchecked` | The signature was not checked at all. |  |
| `1` | `signing_level_unsigned` | The file is unsigned or carries no signature the policies in force accept. |  |
| `2` | `signing_level_policy_trusted` | An application-control policy on the device vouches for the file. |  |
| `3` | `signing_level_developer` | Developer signed code. |  |
| `4` | `signing_level_authenticode` | Authenticode signed by any trusted publisher. |  |
| `5` | `signing_level_store_protected` | A Microsoft Store signed app that runs as a protected process light. |  |
| `6` | `signing_level_store` | Microsoft Store signed. |  |
| `7` | `signing_level_antimalware` | Signed by an antimalware vendor whose product runs as a protected antimalware process. |  |
| `8` | `signing_level_microsoft` | Microsoft signed. |  |
| `11` | `signing_level_ngen` | Used only for signing the .NET native image compiler. |  |
| `12` | `signing_level_windows` | Windows signed. |  |
| `14` | `signing_level_windows_tcb` | Signed as part of the Windows trusted computing base. |  |
