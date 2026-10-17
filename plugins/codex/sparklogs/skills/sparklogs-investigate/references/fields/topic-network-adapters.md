<!-- GENERATED reference. Do not hand-edit. -->
# Network adapters fields

Full inventory every hour. Supported changes are reported when the agent observes them.

| Field | Type | Unit | Meaning |
|---|---|---|---|
| `sparklogs.data.network_adapters.adapter` | string |  | Device-scoped NET_LUID identity for the Windows interface lifetime. |
| `sparklogs.data.network_adapters.display_name` | string |  | Interface alias. Windows renames some tunnels as their state changes. |
| `sparklogs.data.network_adapters.description` | string |  | Native interface description, not provider ownership proof. |
| `sparklogs.data.network_adapters.interface_guid` | string |  | Interface GUID, lowercase; several layers can share one, so never identity. |
| `sparklogs.data.network_adapters.interface_index` | integer |  | Native interface index; it can move, so never identity. |
| `sparklogs.data.network_adapters.mtu_bytes` | integer | bytes | MTU of the adapter's topmost filter layer, the value Windows reports for the adapter. |
| `sparklogs.data.network_adapters.admin_status_code` | integer |  | Native administrative status of the topmost filter layer. |
| `sparklogs.data.network_adapters.admin_status` | string |  | Decoded `admin_status_code`: up, down, testing or unknown. |
| `sparklogs.data.network_adapters.operational_status_code` | integer |  | Native operational status of the topmost filter layer. |
| `sparklogs.data.network_adapters.operational_status` | string |  | Decoded `operational_status_code`: up, down, testing, unknown, dormant, not_present or lower_layer_down. |
| `sparklogs.data.network_adapters.root_operational_status_code` | integer |  | Native operational status of the adapter's own layer beneath its filters. It differs from `operational_status_code` when a filter reports otherwise, as filters above a device that went missing do. |
| `sparklogs.data.network_adapters.root_operational_status` | string |  | Decoded `root_operational_status_code`: up, down, testing, unknown, dormant, not_present or lower_layer_down; a code outside those reads unknown. |
| `sparklogs.data.network_adapters.media_connect_state_code` | integer |  | Native media connect state of the topmost filter layer. |
| `sparklogs.data.network_adapters.media_connect_state` | string |  | Decoded `media_connect_state_code`: connected, disconnected or unknown. |
| `sparklogs.data.network_adapters.interface_type_code` | integer |  | Native IANA interface type of the adapter. |
| `sparklogs.data.network_adapters.interface_type` | string |  | Decoded `interface_type_code`; unlisted codes read unknown. |
| `sparklogs.data.network_adapters.tunnel_type_code` | integer |  | Native tunnel encapsulation type; not VPN provider proof. |
| `sparklogs.data.network_adapters.tunnel_type` | string |  | Decoded `tunnel_type_code`: none, other, direct, 6to4, isatap, teredo or iphttps; unlisted codes read unknown. |
| `sparklogs.data.network_adapters.medium_code` | integer |  | Native NDIS medium of the adapter. |
| `sparklogs.data.network_adapters.medium` | string |  | Decoded `medium_code`; not physical implementation proof. |
| `sparklogs.data.network_adapters.physical_medium_code` | integer |  | Native NDIS physical medium of the adapter. |
| `sparklogs.data.network_adapters.physical_medium` | string |  | Decoded `physical_medium_code`; unspecified stays unspecified. |
| `sparklogs.data.network_adapters.interface_flags` | integer |  | Native interface and operational flag byte of the adapter. |
| `sparklogs.data.network_adapters.hardware_interface` | bool |  | Native hardware-interface bit; never inferred from the interface type. |
| `sparklogs.data.network_adapters.filter_interface` | bool |  | True for a filter layer that did not fold into one adapter below it. |
| `sparklogs.data.network_adapters.role_evidence` | string_array |  | Roles the native type proves: filter, loopback, tunnel, point_to_point; empty proves none. |
| `sparklogs.data.network_adapters.physical_address` | string |  | Current link address, lowercase hex; absent when Windows reports none. |
| `sparklogs.data.network_adapters.permanent_physical_address` | string |  | Permanent link address, lowercase hex; absent when Windows reports none. |
| `sparklogs.data.network_adapters.transmit_link_speed_bps` | integer |  | Native transmit link speed of the adapter in bits per second. |
| `sparklogs.data.network_adapters.receive_link_speed_bps` | integer |  | Native receive link speed of the adapter in bits per second. |
| `sparklogs.data.network_adapters.filters` | object_array |  | Filter layers folded into this adapter from the bottom up: `name`, `index`, and each native value that differs from the layer directly below. A change is decided on the ordered names. |
| `sparklogs.data.network_adapters.filters[].name` | string |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].index` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].mtu_bytes` | integer | bytes | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].admin_status_code` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].operational_status_code` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].media_connect_state_code` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].medium_code` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].physical_medium_code` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].physical_address` | string |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].transmit_link_speed_bps` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters[].receive_link_speed_bps` | integer |  | In each `filters` entry. |
| `sparklogs.data.network_adapters.filters_truncated` | bool |  | Whether `filters` was cut to its cap. |
| `sparklogs.data.network_adapters.lower_adapter_ids` | string_array |  | The nearest non-filter adapters below this one in the stack, by `adapter` id. |
| `sparklogs.data.network_adapters.lower_adapter_ids_truncated` | bool |  | Whether `lower_adapter_ids` was cut to its cap. |
| `sparklogs.data.network_adapters.ipv4_enabled` | bool |  | Whether IPv4 is enabled on the adapter in the current routing compartment. |
| `sparklogs.data.network_adapters.ipv6_enabled` | bool |  | Whether IPv6 is enabled on the adapter in the current routing compartment. |
| `sparklogs.data.network_adapters.dhcpv4_enabled` | bool |  | Native IPv4 DHCP-enabled flag. |
| `sparklogs.data.network_adapters.ipv6_managed_address_config` | bool |  | Native managed-address configuration flag, not a complete DHCPv6-enabled claim. |
| `sparklogs.data.network_adapters.ipv6_other_stateful_config` | bool |  | Native IPv6 other-stateful-configuration flag. |
| `sparklogs.data.network_adapters.addresses` | object_array |  | Unicast addresses by address then prefix length: `address`, `prefix_length`, `origin` (manual, dhcp, slaac, link_local, well_known, other), `prefix_origin_code`, `suffix_origin_code`, `dad_state`. A change is decided on IPv4 address/length exactly, router-advertised IPv6 by on-link prefix, other IPv6 exactly, IPv6 link-local never, and a duplicate dad_state. |
| `sparklogs.data.network_adapters.addresses[].address` | string |  | In each `addresses` entry. |
| `sparklogs.data.network_adapters.addresses[].prefix_length` | integer |  | In each `addresses` entry. |
| `sparklogs.data.network_adapters.addresses[].origin` | string |  | In each `addresses` entry. |
| `sparklogs.data.network_adapters.addresses[].prefix_origin_code` | integer |  | In each `addresses` entry. |
| `sparklogs.data.network_adapters.addresses[].suffix_origin_code` | integer |  | In each `addresses` entry. |
| `sparklogs.data.network_adapters.addresses[].dad_state` | string |  | In each `addresses` entry. |
| `sparklogs.data.network_adapters.addresses_truncated` | bool |  | Whether `addresses` was cut to its cap. |
| `sparklogs.data.network_adapters.dns_servers` | string_array |  | DNS server addresses in native preference order, without the site-local placeholders Windows lists when none is configured. |
| `sparklogs.data.network_adapters.dns_servers_truncated` | bool |  | Whether `dns_servers` was cut to its cap. |
| `sparklogs.data.network_adapters.dns_suffix` | string |  | Adapter DNS suffix, configured or learned. |
| `sparklogs.data.network_adapters.dns_suffixes` | string_array |  | Adapter DNS suffix list in native order; not host search policy. |
| `sparklogs.data.network_adapters.dns_suffixes_truncated` | bool |  | Whether `dns_suffixes` was cut to its cap. |
| `sparklogs.data.network_adapters.gateways` | string_array |  | Gateway addresses, ascending; not selected or reachable routes. |
| `sparklogs.data.network_adapters.gateways_truncated` | bool |  | Whether `gateways` was cut to its cap. |
| `sparklogs.data.network_adapters.ipv4_static_dns_servers` | string_array |  | IPv4 DNS servers configured on the adapter (registry `NameServer`), never the DHCP-supplied ones; `[]` when none is configured. Absent when the read failed, the value has another type, or another row holds the same interface GUID. |
| `sparklogs.data.network_adapters.ipv4_static_dns_servers_truncated` | bool |  | Whether `ipv4_static_dns_servers` was cut to its cap. |
| `sparklogs.data.network_adapters.ipv6_static_dns_servers` | string_array |  | IPv6 DNS servers configured on the adapter (registry `NameServer` under `Tcpip6`); `[]` when none is configured. Also absent when IPv6 has no key for the adapter. Absent when the read failed, the value has another type, or another row holds the same interface GUID. |
| `sparklogs.data.network_adapters.ipv6_static_dns_servers_truncated` | bool |  | Whether `ipv6_static_dns_servers` was cut to its cap. |
| `sparklogs.data.network_adapters.ipv4_static_gateways` | string_array |  | IPv4 default gateways configured on the adapter (registry `DefaultGateway`), never DHCP or router-advertised ones; `[]` when none is configured. Absent when the read failed, the value has another type, or another row holds the same interface GUID. |
| `sparklogs.data.network_adapters.ipv4_static_gateways_truncated` | bool |  | Whether `ipv4_static_gateways` was cut to its cap. |
| `sparklogs.data.network_adapters.dhcpv4_servers` | string_array |  | The IPv4 DHCP server, or empty when there is none. |
| `sparklogs.data.network_adapters.dhcpv6_servers` | string_array |  | The DHCPv6 server, or empty when there is none. |
| `sparklogs.data.network_adapters.ipv4_metric` | integer |  | IPv4 interface metric. A change is decided on the metric only when an administrator set it; an automatic metric compares as automatic. |
| `sparklogs.data.network_adapters.ipv4_automatic_metric` | bool |  | Whether Windows assigns the IPv4 metric itself. |
| `sparklogs.data.network_adapters.ipv6_metric` | integer |  | IPv6 interface metric. A change is decided on the metric only when an administrator set it; an automatic metric compares as automatic. |
| `sparklogs.data.network_adapters.ipv6_automatic_metric` | bool |  | Whether Windows assigns the IPv6 metric itself. |
