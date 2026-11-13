<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Field schema: `win.eventlog.apps`

Generated from the module registries at pack-render time.
Hand edits are lost.

## Contract

Read every row below as a query contract, the same way a reason code is read.

- **Additive only.** Fields and vocabulary tokens are added, never renamed or repurposed, without a documented migration.
- **Misses are honest.** An unlisted code leaves its decoded field unset and the raw value promoted; a meaning is never invented.

## Raw fallback

Every value the provider emits under a NAME is still queryable at rest under `event_data.<ProviderFieldName>`, whether or not this module promotes it.
Provider names are case-sensitive: `event_data.ipaddress` does not match `IpAddress`.
Prefer the promoted field when one exists: promoted fields are stable across pack versions, normalized, and documented here, while the raw payload is provider surface that can change with a vendor build.
A promoted field being absent does not mean the raw one is: promotion is per curated surface, so a field promoted on one event id may be raw-only on another.

## Module fields

Stored flat under the `win.eventlog.apps.` prefix.

| LQL path | Type | Meaning |
|---|---|---|
| `win.eventlog.apps.appx_package_full_name` | string | Full name of the Store or packaged app (name, version, architecture and publisher ID), as the AppX deployment, App Readiness or app runtime event names it, from `PackageFullName` or the provider's equivalent. |
| `win.eventlog.apps.appx_package_family_name` | string | Package family name of the app (name and publisher ID, without version), from `PackageFamilyName` (or `MainPackageFamilyName`) on AppX deployment failures, Shell-Core event 62164 and app runtime events 79 and 80. |
| `win.eventlog.apps.appx_operation` | string | Operation App Readiness was running, from `Operation`, as Windows wrote it. |
| `win.eventlog.apps.appx_deployment_operation` | int | Number of the AppX deployment operation, from `DeploymentOperation`, as Windows wrote it. SparkLogs does not translate it to a name. |
| `win.eventlog.apps.appx_requeue_reason` | string | Reason the AppX deployment service gave for putting a deployment back on its queue, from `RequeueReason` on AppXDeployment-Server event 626, as Windows wrote it. The deployment failure events do not carry it. |
| `win.eventlog.apps.appx_calling_process` | string | Program that asked the AppX deployment service for the operation, from `CallingProcess`. |
| `win.eventlog.apps.appx_package_type` | string | Package type the AppX deployment service reported, from `PackageType`. |
| `win.eventlog.apps.appx_cleanup_error_count` | int | Number of items a package cleanup could not remove, from `ErrorCount` on AppXDeploymentServer cleanup summary events 493, 494 and 516. |
| `win.eventlog.apps.appx_cleanup_registry_key` | string | Registry key a package cleanup could not remove, from `RegistryKeyName` on AppXDeploymentServer events 801, 802 and 808. |
| `win.eventlog.apps.appx_app_id` | string | ID of the packaged app an activation event is about, from `AppId` on app runtime and TWinUI activation events (`AppID` on TWinUI 2825). |
| `win.eventlog.apps.appx_activation_phase` | string | Phase flags of an app activation, from `PhaseFlags` on TWinUI activation events, as Windows wrote them. |
| `win.eventlog.apps.appx_contract_id` | string | Kind of activation the shell asked for (for example launching the app or opening a file with it), from `ContractId` on TWinUI activation events. |
| `win.eventlog.apps.appx_service_name` | string | Service the AppX deployment client tried to start, from `ServiceName` on AppXDeployment events 302, 303, 311 and 328. |
| `win.eventlog.apps.perf_counter_set_guid` | string | GUID of the performance counter set whose registration failed, from Diagnosis-PCW events 2 and 3. |
| `win.eventlog.apps.perf_provider_guid` | string | GUID of the performance counter provider that failed to register, from Diagnosis-PCW events 2 and 3. |
| `win.eventlog.apps.perf_counter_id` | int | ID of the performance counter named on the failure, from `CounterId` on Diagnosis-PCW events 2 and 3. |
| `win.eventlog.apps.app_domain` | string | Application domain of the hosted WCF service that hit a request exception, from `AppDomain` on Application Server-Applications events 57397, 57405 and 57408. |
| `win.eventlog.apps.exception_type` | string | .NET exception type of the failed WCF request, read from the start of the exception detail on Application Server-Applications events 57397, 57405 and 57408. A generic type keeps its type argument, such as System.ServiceModel.FaultException`1[Vendor.DetailType]. |

## Portable families

This module populates no portable family.

## Tail keys and where the value is queryable

The curated first line renders a `key=value` tail in one canonical order for the whole module, so an omitted key never moves the rest.
A key is listed with the module field of the same name; a key without one may still be queryable under another field in the table above.

| Tail key | Queryable as |
|---|---|
| `package` | no field of the same name |

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
