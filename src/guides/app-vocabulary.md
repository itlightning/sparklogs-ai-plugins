# App vocabulary: the `app` (LQL) product-identity tokens

`app` (LQL) is the curated **product** that emits or owns the stream.
`service` (LQL) is the ticket class (`guides/service-taxonomy.md`). Neither nests in the other.

Empty `app` (LQL) is a curated answer on OS-generic and multi-product channels (Application, System, Security, Setup, CBS, DISM).
Stream identity is **`subsource` (LQL)**. Explore: `guides/stream-kinds.md`.

The table is pack-minted keys that have a public stream. Additive-only.
Reserved app tokens with no curated stream yet are held back for lint and are omitted here.
Other `app` (LQL) values can still arrive from non-pack senders; those are real events, not a schema error.

## Pack-minted tokens

<!-- BEGIN GENERATED APP_VOCABULARY -->

| Token | Product |
|---|---|
| `acronis` (value) | Acronis Cyber Protect backup agent |
| `atera` (value) | Atera RMM agent |
| `axcient` (value) | Axcient x360Recover backup agents |
| `bitdefender` (value) | Bitdefender Endpoint Security |
| `connectwise` (value) | ConnectWise products (Automate agent) |
| `crowdstrike` (value) | CrowdStrike Falcon sensor |
| `datto` (value) | Datto products (RMM agent, endpoint backup) |
| `eset` (value) | ESET endpoint security |
| `huntress` (value) | Huntress endpoint agent |
| `macrium` (value) | Macrium Reflect imaging and backup |
| `malwarebytes` (value) | Malwarebytes endpoint protection |
| `mariadb` (value) | MariaDB Server |
| `microsoft_exchange` (value) | Exchange Server (transport, store, and the assistants around them) |
| `microsoft_fslogix` (value) | FSLogix profile and Office containers |
| `microsoft_hyperv` (value) | Hyper-V host role |
| `microsoft_iis` (value) | Internet Information Services (IIS) web server role |
| `microsoft_sql_server` (value) | SQL Server database engine (any instance) |
| `mysql` (value) | MySQL Server |
| `nable` (value) | N-able products (Cove Data Protection backup, N-central agent) |
| `ninjaone` (value) | NinjaOne RMM agent |
| `office` (value) | Microsoft Office applications |
| `postgresql` (value) | PostgreSQL Server |
| `sentinelone` (value) | SentinelOne endpoint agent |
| `slide` (value) | Slide backup agent |
| `sparklogs_agent` (value) | The SparkLogs Agent (self-log, collector log, state snapshots, agent event markers) |
| `veeam` (value) | Veeam backup products (Backup and Replication, Agent for Windows) |
| `webroot` (value) | Webroot SecureAnywhere endpoint agent |
| `windows_defender` (value) | Microsoft Defender Antivirus |

<!-- END GENERATED APP_VOCABULARY -->
