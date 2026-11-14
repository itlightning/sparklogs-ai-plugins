<!-- Moved from src/guides/off-endpoint-causes.md at 29a8d32. Implies collection of arbitrary log files or module-load tracing, which the agent does not do. -->

- **Azure AD Connect sync break.** Users get silently dropped from on-prem replica. Sync state lives in Azure AD Connect logs (which the SparkLogs Agent could ship if Connect is installed and the log location is known) but not in on-prem AD itself.
- **Vendor app internals.** The leak is in a vendor library/DLL inside a process - visible only with Sysmon-equivalent module-load tracing (not currently in scope).
