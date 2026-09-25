<!-- GENERATED reference. Do not hand-edit. -->
# Installed products fields

Full inventory every day. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.installed_products.name` | string |  | The product's display name, as the Uninstall registry names it. |
| `sparklogs.data.installed_products.version` | string |  | The product's version, as installed. |
| `sparklogs.data.installed_products.publisher` | string |  | Who publishes the product. |
| `sparklogs.data.installed_products.location` | string |  | Where the product is installed. |
| `sparklogs.data.installed_products.install_date` | string | timestamp | Reported installation date. Changes to this field do not produce a delta. |
| `sparklogs.data.installed_products.install_context` | string |  | `machine`. Collection reads machine-wide Uninstall registry entries only. |
