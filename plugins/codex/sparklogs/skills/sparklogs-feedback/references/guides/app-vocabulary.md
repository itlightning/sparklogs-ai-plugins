# App vocabulary: the `app` (LQL) product-identity tokens

`app` (LQL) is the curated **product** that emits or owns the stream.
`service` (LQL) is the ticket class (`service-taxonomy.md`). Neither nests in the other.

Empty `app` (LQL) is a curated answer on OS-generic and multi-product channels (Application, System, Security, Setup, CBS, DISM).
Stream identity is **`subsource` (LQL)**. Explore: `stream-kinds.md`.

The table is pack-minted keys that have a public stream. Additive-only.
Reserved app tokens with no curated stream yet are held back for lint and are omitted here.
Other `app` (LQL) values can still arrive from non-pack senders; those are real events, not a schema error.

## Pack-minted tokens

| Token | Product |
|---|---|
| `acronis` | Acronis Cyber Protect backup agent |
| `atera` | Atera RMM agent |
| `bitdefender` | Bitdefender Endpoint Security |
| `connectwise` | ConnectWise products (Automate agent) |
| `crowdstrike` | CrowdStrike Falcon sensor |
| `datto` | Datto products (RMM agent, endpoint backup) |
| `eset` | ESET endpoint security |
| `huntress` | Huntress endpoint agent |
| `macrium` | Macrium Reflect imaging and backup |
| `malwarebytes` | Malwarebytes endpoint protection |
| `mariadb` | MariaDB Server |
| `microsoft_exchange` | Exchange Server (transport, store, and the assistants around them) |
| `microsoft_fslogix` | FSLogix profile and Office containers |
| `microsoft_hyperv` | Hyper-V host role |
| `microsoft_iis` | Internet Information Services (IIS) web server role |
| `microsoft_sql_server` | SQL Server database engine (any instance) |
| `mysql` | MySQL Server |
| `nable` | N-able products (Cove Data Protection backup, N-central agent) |
| `ninjaone` | NinjaOne RMM agent |
| `postgresql` | PostgreSQL Server |
| `sentinelone` | SentinelOne endpoint agent |
| `sparklogs_agent` | The SparkLogs Agent (self-log, collector log, state snapshots, agent event markers) |
| `veeam` | Veeam backup products (Backup and Replication, Agent for Windows) |
| `webroot` | Webroot SecureAnywhere endpoint agent |
| `windows_defender` | Microsoft Defender Antivirus |
