<!-- GENERATED reference. Do not hand-edit. -->
# Device drivers fields

Full inventory every day; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.drivers.package` | string |  | The package's stable identity: setup class, INF and provider, lowercased and joined. |
| `sparklogs.data.drivers.class` | string |  | The Windows setup class the package installs under, as the class key names it. |
| `sparklogs.data.drivers.class_guid` | string |  | The setup class key's own GUID. |
| `sparklogs.data.drivers.inf` | string |  | The INF file that installed the package. |
| `sparklogs.data.drivers.provider` | string |  | Who published the driver. |
| `sparklogs.data.drivers.version` | string |  | The package version, as the registry spells it. |
| `sparklogs.data.drivers.driver_date` | string |  | The driver's date as a full RFC 3339 date. Omitted when the stored value is not a date this parser recognizes, so a reader of a date field always gets a date. |
| `sparklogs.data.drivers.description` | string |  | The friendly name Windows shows for the package. |
| `sparklogs.data.drivers.device_count` | integer | count | How many device instances on this machine use the package. At least one, and the measure of how much of the machine depends on a driver whose version just moved. |
