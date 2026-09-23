<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.apps`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.
- **Correlate with `pack_version`.** A field exists at rest only from the pack version that shipped it, so check the pack version on the events in scope before concluding a condition is absent.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.apps.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.apps.appx_package_full_name` | string | Full packaged-application identity reported by deployment, readiness, or runtime records. |
| `win.eventlog.apps.appx_package_family_name` | string | Package family identity reported by the shell or application runtime. |
| `win.eventlog.apps.appx_operation` | string | Deployment or readiness operation as the provider wrote it. Numeric deployment values remain raw. |
| `win.eventlog.apps.appx_deployment_operation` | int | Raw AppX DeploymentOperation integer. No local name map is inferred. |
| `win.eventlog.apps.appx_requeue_reason` | string | Reason the deployment provider gives for putting an attempt back on its queue, as written. |
| `win.eventlog.apps.appx_calling_process` | string | Process label the deployment provider reports as the caller. |
| `win.eventlog.apps.appx_package_type` | string | Package type reported by the deployment provider. |
| `win.eventlog.apps.appx_cleanup_error_count` | int | Number of package files a cleanup summary says remain. |
| `win.eventlog.apps.appx_cleanup_registry_key` | string | Registry key name a package cleanup record could not remove. |
| `win.eventlog.apps.appx_app_id` | string | Packaged-application identity reported by an activation record. |
| `win.eventlog.apps.appx_activation_phase` | string | Activation phase flags as the provider wrote them. |
| `win.eventlog.apps.appx_contract_id` | string | Application contract the shell attempted to activate. |
| `win.eventlog.apps.appx_service_name` | string | Packaged-application service the deployment client tried to start. |
| `win.eventlog.apps.perf_counter_set_guid` | string | Counter-set identifier whose provider registration failed. |
| `win.eventlog.apps.perf_provider_guid` | string | Performance-counter provider identifier that failed to register. |
| `win.eventlog.apps.perf_counter_id` | int | Performance-counter identifier reported by the provider. |
| `win.eventlog.apps.app_domain` | string | Hosted application domain that raised a request exception. |
| `win.eventlog.apps.exception_type` | string | Framework exception type parsed from the provider exception detail. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
Each key names one field; that field is where the value is queried.

| Tail key | Queryable as |
|---|---|
| `package` | not queryable as a field |

## What sets each field

Presence is per curated surface, from what its author declared under `promotions`: a field reaches this row only when the surface's own arm or shape names it, never from a text scan of classify guessing which branch a write belongs to.
A row lists what the surface CAN write, not what every event of it carries: a field whose value the payload does not supply stays unset, which is why absence of a field is never by itself evidence that a condition did not happen.
A surface that promotes nothing says so: an empty row is a stated fact, not an omission.
The last column is different in kind: it is the author's account of the row or evidence fields an event of that surface carries, declared per arm and compared to nothing, so read it as documentation rather than as a checked contract. An empty cell means the arm declares none, not that the event carries none.

| Surface | Event ids | Fields set | Row fields |
|---|---|---|---|
| `appid_certificate_store_verification_failed` / `default` | 4005 | **fields: none** |  |
| `appid_certificate_store_verified` / `default` | 4006 | **fields: none** |  |
| `appx_activation_failed` / `activation_timeout` | 4, 5, 18, 20, 21, 22, 26, 27, 31, 32, 35, 36, 38, 65, 66, 67, 69, 202, 203, 207, 208, 212, 215, 216, 2825, 5955, 5961, 5962, 5990 | `win.eventlog.apps.appx_activation_phase` `win.eventlog.apps.appx_app_id` `win.eventlog.apps.appx_contract_id` |  |
| `appx_activation_failed` / `administrator_token` | 4, 5, 18, 20, 21, 22, 26, 27, 31, 32, 35, 36, 38, 65, 66, 67, 69, 202, 203, 207, 208, 212, 215, 216, 2825, 5955, 5961, 5962, 5990 | `win.eventlog.apps.appx_activation_phase` `win.eventlog.apps.appx_app_id` `win.eventlog.apps.appx_contract_id` |  |
| `appx_activation_failed` / `runtime_failure` | 4, 5, 18, 20, 21, 22, 26, 27, 31, 32, 35, 36, 38, 65, 66, 67, 69, 202, 203, 207, 208, 212, 215, 216, 2825, 5955, 5961, 5962, 5990 | `win.eventlog.apps.appx_app_id` `win.eventlog.apps.appx_package_full_name` |  |
| `appx_activation_failed` / `shell_failure` | 4, 5, 18, 20, 21, 22, 26, 27, 31, 32, 35, 36, 38, 65, 66, 67, 69, 202, 203, 207, 208, 212, 215, 216, 2825, 5955, 5961, 5962, 5990 | `win.eventlog.apps.appx_activation_phase` `win.eventlog.apps.appx_app_id` `win.eventlog.apps.appx_contract_id` |  |
| `appx_cleanup_residue` / `detail` | 471, 472, 493, 494, 503, 516, 801, 802, 808, 5224, 5230 | **fields: none** |  |
| `appx_cleanup_residue` / `registry_absent` | 471, 472, 493, 494, 503, 516, 801, 802, 808, 5224, 5230 | `win.eventlog.apps.appx_cleanup_registry_key` |  |
| `appx_cleanup_residue` / `registry_other` | 471, 472, 493, 494, 503, 516, 801, 802, 808, 5224, 5230 | `win.eventlog.apps.appx_cleanup_registry_key` |  |
| `appx_cleanup_residue` / `summary` | 471, 472, 493, 494, 503, 516, 801, 802, 808, 5224, 5230 | `win.eventlog.apps.appx_cleanup_error_count` |  |
| `appx_deployment_failed` / `blocked_by_policy` | 401, 413, 441, 697, 698, 707, 10004, 10005, 10010, 62164 | `win.eventlog.apps.appx_calling_process` `win.eventlog.apps.appx_deployment_operation` `win.eventlog.apps.appx_package_family_name` `win.eventlog.apps.appx_package_full_name` `win.eventlog.apps.appx_package_type` `win.eventlog.apps.appx_requeue_reason` |  |
| `appx_deployment_failed` / `other_failure` | 401, 413, 441, 697, 698, 707, 10004, 10005, 10010, 62164 | `win.eventlog.apps.appx_calling_process` `win.eventlog.apps.appx_deployment_operation` `win.eventlog.apps.appx_package_family_name` `win.eventlog.apps.appx_package_full_name` `win.eventlog.apps.appx_package_type` `win.eventlog.apps.appx_requeue_reason` |  |
| `appx_deployment_failed` / `packages_in_use` | 401, 413, 441, 697, 698, 707, 10004, 10005, 10010, 62164 | `win.eventlog.apps.appx_calling_process` `win.eventlog.apps.appx_deployment_operation` `win.eventlog.apps.appx_package_family_name` `win.eventlog.apps.appx_package_full_name` `win.eventlog.apps.appx_package_type` `win.eventlog.apps.appx_requeue_reason` |  |
| `appx_deployment_requeued` / `default` | 626 | `win.eventlog.apps.appx_calling_process` `win.eventlog.apps.appx_deployment_operation` `win.eventlog.apps.appx_package_full_name` `win.eventlog.apps.appx_requeue_reason` |  |
| `appx_package_runtime_corrupt` / `repair_attempted` | 79, 80 | `win.eventlog.apps.appx_package_family_name` |  |
| `appx_package_runtime_corrupt` / `repair_unavailable` | 79, 80 | `win.eventlog.apps.appx_package_family_name` |  |
| `appx_provisioning_failed` / `other_failure` | 10, 11, 214, 215, 218, 304, 319 | `win.eventlog.apps.appx_operation` `win.eventlog.apps.appx_package_full_name` |  |
| `appx_provisioning_failed` / `packages_in_use` | 10, 11, 214, 215, 218, 304, 319 | `win.eventlog.apps.appx_operation` `win.eventlog.apps.appx_package_full_name` |  |
| `appx_provisioning_failed` / `retry_scheduled` | 10, 11, 214, 215, 218, 304, 319 | `win.eventlog.apps.appx_operation` `win.eventlog.apps.appx_package_full_name` |  |
| `appx_service_start_failed` / `other_failure` | 302, 303, 311, 328 | `win.eventlog.apps.appx_service_name` |  |
| `appx_service_start_failed` / `shutdown_in_progress` | 302, 303, 311, 328 | `win.eventlog.apps.appx_service_name` |  |
| `perf_counter_provider_failed` / `instance` | 2, 3 | `win.eventlog.apps.perf_counter_id` `win.eventlog.apps.perf_counter_set_guid` `win.eventlog.apps.perf_provider_guid` |  |
| `perf_counter_provider_failed` / `registration` | 2, 3 | `win.eventlog.apps.perf_counter_id` `win.eventlog.apps.perf_counter_set_guid` `win.eventlog.apps.perf_provider_guid` |  |
| `wcf_request_failed` / `default` | 57397, 57405, 57408 | `win.eventlog.apps.app_domain` `win.eventlog.apps.exception_type` |  |
| `appmodel_container_teardown` | 217 | **fields: none** |  |
| `office_alert_error_dialog` | 300 | **fields: none** |  |
| `office_alert_routine_dialog` | 300 | **fields: none** |  |

### Surfaces that promote nothing

These carry class, reason and message text only.
A predicate over them uses the reason, the class, or the retained payload; there is no promoted field to filter on.

- `appid_certificate_store_verification_failed` / `default`
- `appid_certificate_store_verified` / `default`
- `appx_cleanup_residue` / `detail`
- `appmodel_container_teardown`
- `office_alert_error_dialog`
- `office_alert_routine_dialog`
