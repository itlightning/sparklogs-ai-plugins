# Windows updates and patching

Join Setup, CBS, and DISM when a ticket is about patches that did not land, or landed and then failed.

**Data feeds:** `win.eventlog.setup`, `win.servicing.cbs`, `win.servicing.dism`.

Windows Update agent snapshot lives on `sparklogs.agent.state` (`windows_update_agent_state`). Open that feed only after this theme says to.
