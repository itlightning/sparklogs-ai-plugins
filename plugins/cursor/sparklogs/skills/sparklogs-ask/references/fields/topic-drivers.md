<!-- GENERATED reference. Do not hand-edit. -->
# Device drivers fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.drivers.package` | string |  | The driver package's identity: its setup class, INF file and provider, lowercased and joined. |
| `sparklogs.data.drivers.class` | string |  | The Windows device setup class the package installs under, such as `Display` or `Net`. |
| `sparklogs.data.drivers.class_guid` | string |  | The GUID of the package's device setup class. |
| `sparklogs.data.drivers.inf` | string |  | The INF file that installed the package. |
| `sparklogs.data.drivers.provider` | string |  | The driver's publisher. |
| `sparklogs.data.drivers.version` | string |  | The driver package version, as Windows records it. |
| `sparklogs.data.drivers.driver_date` | string | date | The driver's date, as Windows records it: a calendar date, sent as UTC midnight; read it as a date, not an instant. Absent when Windows stores a value that is not a recognizable date. |
| `sparklogs.data.drivers.description` | string |  | The name Windows shows for the driver package. |
| `sparklogs.data.drivers.device_count` | integer | count | How many device entries Windows holds for the package, at least one, counting devices not connected now. It shows how much of the machine depends on the driver. Can exceed the `devices` rows that link to the package. |
| `sparklogs.data.drivers.renamed_from` | string |  | On the delta row of a subject that arrived as the update of one that left in the same capture, the instance of the subject it replaced. Absent otherwise. |
