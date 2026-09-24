<!-- GENERATED reference. Do not hand-edit. -->
# Installed products fields

Full inventory every day; changes are reported as they happen.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.installed_products.name` | string |  | The product's display name, as the Uninstall registry names it. |
| `sparklogs.data.installed_products.version` | string |  | The product's version, as installed. |
| `sparklogs.data.installed_products.publisher` | string |  | Who publishes the product. |
| `sparklogs.data.installed_products.location` | string |  | Where the product is installed. |
| `sparklogs.data.installed_products.install_date` | string | timestamp | When the product was installed. Context for the row, never a diffed field: an install date that moved would be a different product wearing an old name, which `version` already reports. |
| `sparklogs.data.installed_products.install_context` | string |  | Always `machine`: the agent reads only the machine-wide Uninstall registry views, never a per-user hive. |
