# App vocabulary: the `app` product-identity tokens

`app` is the curated **product** that emits or owns the stream.
`service` is the ticket class (`guides/service-taxonomy.md`). Neither nests in the other.

Empty `app` is a curated answer on OS-generic and multi-product channels (Application, System, Security, Setup, CBS, DISM).
Stream identity is **`subsource`**. Explore: `guides/stream-kinds.md`.

The table is pack-minted keys that have a public stream. Additive-only.
Reserved slugs with no curated stream yet stay in the registry for lint and are omitted here.
Other `app` values can still arrive from non-pack senders; those are real events, not a schema error.

## Pack-minted tokens

<!-- BEGIN GENERATED APP_VOCABULARY -->

| Token | Product |
|---|---|
| `microsoft_hyperv` | Hyper-V host role |
| `microsoft_iis` | Internet Information Services (IIS) web server role |
| `microsoft_sql_server` | SQL Server database engine (any instance) |
| `sparklogs_agent` | The SparkLogs Agent (self-log, collector log, state snapshots, agent event markers) |
| `windows_defender` | Microsoft Defender Antivirus |

<!-- END GENERATED APP_VOCABULARY -->
