<!-- GENERATED reference. Do not hand-edit. -->
# Network configuration fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.network_config.default_routes` | object_array |  | Default routes in the current compartment: `adapter`, `family`, `next_hop`, route `metric`, native `protocol_code` and `origin_code`, ordered by those, and their decodes `protocol` (unlisted codes read unknown) and `origin` (manual, well_known, dhcp, router_advertisement, 6to4). Neither tells a DHCP gateway from a static one: both read `netmgmt` and `manual`. No claim about which route wins or reaches anything. |
| `sparklogs.data.network_config.default_routes[].adapter` | string |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].family` | string |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].next_hop` | string |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].metric` | integer |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].protocol_code` | integer |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].protocol` | string |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].origin_code` | integer |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes[].origin` | string |  | In each `default_routes` entry. |
| `sparklogs.data.network_config.default_routes_truncated` | bool |  | Whether `default_routes` was cut to its cap. |
| `sparklogs.data.network_config.dns_domain` | string |  | Host DNS domain from GetNetworkParams; not a complete suffix search list. |
| `sparklogs.data.network_config.legacy_ipv4_dns_servers` | string_array |  | IPv4 DNS servers from GetNetworkParams in native order; not complete resolver policy. |
| `sparklogs.data.network_config.legacy_ipv4_dns_servers_truncated` | bool |  | Whether `legacy_ipv4_dns_servers` was cut to its cap. |
| `sparklogs.data.network_config.dns_search_list` | string_array |  | The machine DNS suffix search list (registry `Tcpip\Parameters` `SearchList`), lowercased; `[]` when none is set. Absent when the read failed or the value has another type. |
| `sparklogs.data.network_config.dns_search_list_truncated` | bool |  | Whether `dns_search_list` was cut to its cap. |
| `sparklogs.data.network_config.dns_search_list_policy` | string_array |  | The DNS suffix search list Group Policy sets (registry `Policies\Microsoft\Windows NT\DNSClient` `SearchList`), lowercased; `[]` when the policy sets none. Reported beside `dns_search_list` with no precedence inferred. |
| `sparklogs.data.network_config.dns_search_list_policy_truncated` | bool |  | Whether `dns_search_list_policy` was cut to its cap. |
| `sparklogs.data.network_config.winhttp_default_proxy_access_type_code` | integer |  | Machine default static WinHTTP access type; not PAC, user or session posture. |
| `sparklogs.data.network_config.winhttp_default_proxy_access_type` | string |  | Decoded access type: default_proxy, no_proxy, named_proxy, automatic_proxy or unknown. |
| `sparklogs.data.network_config.winhttp_default_proxy_endpoints` | object_array |  | Static proxy list in native order: `request_protocol`, `transport`, `host`, `port`; absent when the list failed the safe grammar. |
| `sparklogs.data.network_config.winhttp_default_proxy_endpoints[].request_protocol` | string |  | In each `winhttp_default_proxy_endpoints` entry. |
| `sparklogs.data.network_config.winhttp_default_proxy_endpoints[].transport` | string |  | In each `winhttp_default_proxy_endpoints` entry. |
| `sparklogs.data.network_config.winhttp_default_proxy_endpoints[].host` | string |  | In each `winhttp_default_proxy_endpoints` entry. |
| `sparklogs.data.network_config.winhttp_default_proxy_endpoints[].port` | integer |  | In each `winhttp_default_proxy_endpoints` entry. |
| `sparklogs.data.network_config.winhttp_default_proxy_endpoints_truncated` | bool |  | Whether `winhttp_default_proxy_endpoints` was cut to its cap. |
| `sparklogs.data.network_config.winhttp_default_proxy_bypass` | string_array |  | Static bypass list in native order; absent when the list failed the safe grammar. |
| `sparklogs.data.network_config.winhttp_default_proxy_bypass_truncated` | bool |  | Whether `winhttp_default_proxy_bypass` was cut to its cap. |
