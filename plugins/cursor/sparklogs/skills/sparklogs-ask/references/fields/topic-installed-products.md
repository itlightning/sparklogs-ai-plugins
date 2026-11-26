<!-- GENERATED reference. Do not hand-edit. -->
# Installed products

Each program installed for the whole machine, from the Windows uninstall list, with its version, publisher, install folder and install date, plus Office and other installer updates linked to their product; per-user installs and hidden system components are not listed.

**Use when:** a question about which version of an application a machine runs, or when software was installed, upgraded or removed.

The install date moves each time Windows Installer patches or repairs a product, so it is not always the first install date. A product with both 64-bit and 32-bit builds shows as two rows, the second named with "(32-bit)".

Full inventory every day. Changes are reported between inventories.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.installed_products.name` | string |  | The product's name, as Programs and Features shows it. When the 64-bit and 32-bit lists both hold a product of that name, the 32-bit one ends in ` (32-bit)`. |
| `sparklogs.data.installed_products.version` | string |  | The installed product's version. |
| `sparklogs.data.installed_products.publisher` | string |  | The product's publisher. |
| `sparklogs.data.installed_products.location` | string |  | The folder the product's Uninstall registry entry records as its install location, as recorded with surrounding spaces trimmed. Absent when the entry records none. |
| `sparklogs.data.installed_products.install_date` | string | date | The install date the product's Uninstall registry entry records: a calendar date, sent as UTC midnight; read it as a date, not an instant. Windows Installer products move it each time a patch is applied or the product is repaired. A change to this date alone raises no change event. |
| `sparklogs.data.installed_products.install_context` | string |  | Always `machine`: the agent reads the machine-wide list of installed programs, not programs registered for one user only. |
| `sparklogs.data.installed_products.release_type` | string |  | What kind of release the product's Uninstall registry entry says it is, as recorded, such as `Security Update`, `Update` or `Service Pack`. Office MSI updates are known to record it; most products do not. Absent when the entry records none. |
| `sparklogs.data.installed_products.parent_instance` | string |  | The `instance` of the `installed_products` row this entry updates (the product named in `parent_name`), so the update can be listed under its product. Present only when that product is a row of the same list (64-bit or 32-bit) in the same capture. Absent when the entry names no product, names itself, or names a product that is not a row, and when several entries of this name name different products. |
| `sparklogs.data.installed_products.parent_name` | string |  | The name of the product this entry updates: that product's row name when `parent_instance` is present, otherwise the product name the entry records. Absent when the entry names no product, names itself, or when several entries of this name name different products. |
| `sparklogs.data.installed_products.renamed_from` | string |  | On the delta row of a subject that arrived as the update of one that left in the same capture, the instance of the subject it replaced. Absent otherwise. |
