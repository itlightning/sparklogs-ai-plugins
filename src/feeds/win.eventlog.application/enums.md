<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `win.eventlog.application`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## `msi_error_codes`

359 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `1101` | `file_stream_open_failed` | a file stream named by the package could not be opened, with the underlying system error in the message |  |
| `1301` | `file_create_blocked_by_directory` | a file could not be created because a directory of that name already exists |  |
| `1302` | `source_media_requested` | the installation is waiting for the named source disk to be inserted |  |
| `1303` | `directory_access_denied` | the installer does not have the privileges to access a directory it needs |  |
| `1304` | `file_write_error` | writing a file failed |  |
| `1305` | `file_read_error` | reading a file failed, with the underlying system error code in the message |  |
| `1306` | `file_in_use` | the file being updated is open in another process |  |
| `1307` | `disk_full_for_file` | there is not enough disk space left to install this file |  |
| `1308` | `source_file_absent` | a source file the package lists is not present |  |
| `1309` | `source_file_open_failed` | opening a source file failed, with the underlying system error code in the message |  |
| `1310` | `destination_file_create_failed` | creating the destination file failed, with the underlying system error code in the message |  |
| `1311` | `source_cabinet_absent` | the source cabinet file could not be located |  |
| `1312` | `directory_create_blocked_by_file` | a directory could not be created because a file of that name already exists |  |
| `1313` | `volume_unavailable` | the volume the package targets is currently unavailable |  |
| `1314` | `path_unavailable` | the path the package names is unavailable |  |
| `1315` | `folder_not_writable` | the installer could not write to the folder it targets |  |
| `1316` | `source_file_network_read_error` | a network error interrupted reading the named file |  |
| `1317` | `directory_create_failed` | creating a directory the installation needs failed |  |
| `1318` | `directory_create_network_error` | a network error interrupted creating a directory the installation needs |  |
| `1319` | `source_cabinet_network_open_error` | a network error interrupted opening the source cabinet file |  |
| `1320` | `path_too_long` | the path the package names exceeds the length the system allows |  |
| `1321` | `file_modify_denied` | the installer does not have the privileges to modify a file it needs to replace |  |
| `1322` | `folder_path_segment_invalid` | part of the folder path is empty or longer than the system allows |  |
| `1323` | `folder_path_reserved_word` | the folder path contains words that are not valid in a folder path |  |
| `1324` | `folder_path_invalid_character` | the folder path contains a character that is not valid in a folder path |  |
| `1325` | `short_file_name_invalid` | the value given is not a valid short file name |  |
| `1326` | `file_security_read_failed` | reading the security settings of a file failed, with the underlying system error in the message |  |
| `1327` | `invalid_drive` | the drive the package targets is not valid on this machine |  |
| `1328` | `patch_target_file_changed` | the file the patch targets was updated by other means, so the patch can no longer modify it |  |
| `1329` | `cabinet_unsigned` | a required file could not be installed because its cabinet file is not digitally signed, which can also mean the cabinet is corrupt |  |
| `1330` | `cabinet_signature_invalid` | a required file could not be installed because its cabinet file carries an invalid digital signature, which can also mean the cabinet is corrupt |  |
| `1331` | `file_copy_crc_error` | a file failed to copy correctly and the checksum did not match |  |
| `1332` | `file_move_crc_error` | a file failed to move correctly and the checksum did not match |  |
| `1333` | `file_patch_crc_error` | a file failed to patch correctly and the checksum did not match |  |
| `1334` | `file_absent_from_cabinet` | the file cannot be installed because it is not present in the cabinet the package names, which can be a network, media or package fault |  |
| `1335` | `cabinet_corrupt` | the cabinet file the installation requires is corrupt and cannot be used |  |
| `1336` | `temp_file_create_failed` | a temporary file the installation needs could not be created, with the underlying system error code in the message |  |
| `1401` | `registry_key_create_failed` | a registry key could not be created, with the underlying system error in the message |  |
| `1402` | `registry_key_open_failed` | a registry key could not be opened, with the underlying system error in the message |  |
| `1403` | `registry_value_delete_failed` | a registry value could not be deleted, with the underlying system error in the message |  |
| `1404` | `registry_key_delete_failed` | a registry key could not be deleted, with the underlying system error in the message |  |
| `1405` | `registry_value_read_failed` | a registry value could not be read, with the underlying system error in the message |  |
| `1406` | `registry_value_write_failed` | a registry value could not be written, with the underlying system error in the message |  |
| `1407` | `registry_value_names_read_failed` | the value names under a registry key could not be listed, with the underlying system error in the message |  |
| `1408` | `registry_subkey_names_read_failed` | the sub key names under a registry key could not be listed, with the underlying system error in the message |  |
| `1409` | `registry_key_security_read_failed` | the security information on a registry key could not be read, with the underlying system error in the message |  |
| `1410` | `registry_space_increase_failed` | the available registry space could not be increased to the amount the application requires |  |
| `1500` | `another_install_in_progress` | another installation is in progress and must finish before this one continues |  |
| `1501` | `secured_data_access_failed` | secured data could not be accessed, which points at a Windows Installer configuration problem on the machine |  |
| `1601` | `out_of_disk_space` | the volume does not have the space the installation costed for it |  |
| `1603` | `file_held_by_process` | the file being updated is held open by a named process, which is why a restart is often required |  |
| `1604` | `product_already_installed` | an already installed product prevented the installation of this one |  |
| `1606` | `location_unreachable` | a location the package names could not be accessed |  |
| `1608` | `no_compliant_product_found` | no previously installed compliant product was found, so the compliance check the package requires did not pass |  |
| `1609` | `security_principal_unresolved` | applying security settings failed because the named user or group could not be resolved, which is often a domain controller reachability problem |  |
| `1701` | `product_id_invalid` | the value supplied is not a valid product id |  |
| `1702` | `restart_required_to_resume_configuration` | configuring the product cannot finish until the system restarts, and the restart resumes the configuration |  |
| `1703` | `restart_required_for_changes_to_apply` | the configuration changes take effect only after a restart, offered while no other user is logged on |  |
| `1704` | `suspended_install_must_be_undone` | an install of another product is suspended and its changes must be undone before this one continues |  |
| `1705` | `previous_install_must_be_undone` | an earlier install of this product is still in progress and its changes must be undone before this one continues |  |
| `1706` | `no_valid_source` | no valid installation source could be found for the product |  |
| `1707` | `install_operation_succeeded` | the installation operation completed successfully, the generic outcome record |  |
| `1708` | `install_operation_failed` | the installation operation failed, the generic outcome record with the cause elsewhere in the log |  |
| `1710` | `install_rollback_offered` | the installation offered to restore the computer to its previous state or to continue later |  |
| `1711` | `install_state_write_failed` | writing installation information to disk failed, which is commonly a disk space problem |  |
| `1712` | `rollback_files_missing` | one or more files needed to restore the previous state could not be found, so rollback is not possible |  |
| `1713` | `required_product_install_failed` | the product could not install one of the products it requires |  |
| `1714` | `older_version_removal_failed` | the older version of the product could not be removed |  |
| `1715` | `product_installed` | the named product was installed |  |
| `1716` | `product_configured` | the named product was configured |  |
| `1717` | `product_removed` | the named product was removed |  |
| `1718` | `file_rejected_by_signature_policy` | a file was rejected by digital signature policy |  |
| `1719` | `installer_service_inaccessible` | the Windows Installer service could not be accessed, so nothing could install until the service is registered and enabled |  |
| `1720` | `custom_action_script_error` | a script the package requires could not be run, with the script error, line and column in the message |  |
| `1721` | `custom_action_program_unrunnable` | a program the package requires could not be run, with the action and command in the message |  |
| `1722` | `custom_action_program_failed` | a program run as part of the setup did not finish as expected, with the action and command in the message |  |
| `1723` | `custom_action_dll_unrunnable` | a DLL the package requires could not be run, with the action, entry point and library in the message |  |
| `1724` | `removal_succeeded` | the product removal completed successfully |  |
| `1725` | `removal_failed` | the product removal failed |  |
| `1726` | `advertisement_succeeded` | the product advertisement completed successfully |  |
| `1727` | `advertisement_failed` | the product advertisement failed |  |
| `1728` | `configuration_succeeded` | the product configuration completed successfully |  |
| `1729` | `configuration_failed` | the product configuration failed |  |
| `1730` | `removal_requires_administrator` | removing the application requires an administrator, and the account running it is not one |  |
| `1731` | `source_package_out_of_sync` | the source installation package is out of sync with the client package, so a valid copy of the package is needed |  |
| `1732` | `restart_required_other_users_logged_on` | the install needs a restart to finish while other users are logged on, whose work the restart would interrupt |  |
| `1801` | `path_invalid` | the path given is not valid |  |
| `1802` | `out_of_memory` | the installation ran out of memory |  |
| `1803` | `drive_has_no_disk` | there is no disk in the drive the installation is reading from |  |
| `1805` | `path_does_not_exist` | the path given does not exist |  |
| `1806` | `folder_read_denied` | the account has insufficient privileges to read the folder |  |
| `1807` | `destination_folder_undetermined` | no valid destination folder for the install could be determined |  |
| `1901` | `source_database_read_error` | reading from the source install database failed |  |
| `1902` | `restart_scheduled_file_rename` | a file in use will be renamed into place at the next restart, so the operation completes only after that restart |  |
| `1903` | `restart_scheduled_file_delete` | a file in use will be deleted at the next restart, so the operation completes only after that restart |  |
| `1904` | `module_registration_failed` | a module failed to register, with the HRESULT in the message |  |
| `1905` | `module_unregistration_failed` | a module failed to unregister, with the HRESULT in the message |  |
| `1906` | `package_cache_failed` | the package could not be cached, with the underlying error in the message |  |
| `1907` | `font_registration_failed` | a font could not be registered, which is a permissions or font support problem |  |
| `1908` | `font_unregistration_failed` | a font could not be unregistered, which is usually a permissions problem |  |
| `1909` | `shortcut_create_failed` | a shortcut could not be created because the destination folder is missing or unreachable |  |
| `1910` | `shortcut_remove_failed` | a shortcut could not be removed because the shortcut file is missing or unreachable |  |
| `1911` | `type_library_registration_failed` | the type library for a file could not be registered, which is a type library or DLL load failure |  |
| `1912` | `type_library_unregistration_failed` | the type library for a file could not be unregistered, which is a type library or DLL load failure |  |
| `1913` | `ini_file_update_failed` | an ini file could not be updated because it is missing or unreachable |  |
| `1914` | `file_replace_on_restart_schedule_failed` | a file could not be scheduled to replace another at the next restart, which is a write permission problem on the target |  |
| `1915` | `odbc_driver_manager_remove_failed` | removing the ODBC driver manager failed, with the ODBC error in the message |  |
| `1916` | `odbc_driver_manager_install_failed` | installing the ODBC driver manager failed, with the ODBC error in the message |  |
| `1917` | `odbc_driver_remove_failed` | removing an ODBC driver failed, with the driver name and ODBC error in the message |  |
| `1918` | `odbc_driver_install_failed` | installing an ODBC driver failed, with the driver name and ODBC error in the message |  |
| `1919` | `odbc_data_source_configure_failed` | configuring an ODBC data source failed, with the data source name and ODBC error in the message |  |
| `1920` | `service_start_failed` | a service the package installs failed to start, which is often a privilege problem |  |
| `1921` | `service_stop_failed` | a service could not be stopped, which is often a privilege problem |  |
| `1922` | `service_delete_failed` | a service could not be deleted, which is often a privilege problem |  |
| `1923` | `service_install_failed` | a service could not be installed, which is often a privilege problem |  |
| `1924` | `environment_variable_update_failed` | an environment variable could not be updated, which is often a privilege problem |  |
| `1925` | `all_users_install_requires_administrator` | the account has insufficient privileges to install for all users of the machine |  |
| `1926` | `file_security_set_failed` | the security permissions on a file could not be set, with the underlying error in the message |  |
| `1927` | `com_plus_services_required` | the installation requires COM+ Services, which are not installed |  |
| `1928` | `com_plus_application_install_failed` | the installation failed to install the COM+ application |  |
| `1929` | `com_plus_application_remove_failed` | the installation failed to remove the COM+ application |  |
| `1930` | `service_description_change_failed` | the description of a service could not be changed |  |
| `1931` | `protected_system_file_update_skipped` | a system file was not updated because Windows protects it, with the package and OS protected versions in the message |  |
| `1932` | `protected_windows_file_update_failed` | a protected Windows file could not be updated, with the file protection error in the message |  |
| `1933` | `protected_windows_file_set_update_failed` | one or more protected Windows files could not be updated, with the list of files in the message |  |
| `1934` | `user_installs_disabled_by_policy` | per-user installations are disabled by policy on the machine |  |
| `1935` | `assembly_install_failed` | installing an assembly component failed, with the HRESULT and assembly name in the message |  |
| `1936` | `assembly_not_strongly_named` | an assembly could not be installed because it is not strongly named or is signed with too short a key |  |
| `1937` | `assembly_signature_unverifiable` | an assembly could not be installed because its signature or catalog could not be verified or is invalid |  |
| `1938` | `assembly_modules_missing` | an assembly could not be installed because one or more of its modules could not be found |  |
| `1939` | `service_configure_failed` | a service could not be configured, which is a package or privilege problem |  |
| `1940` | `service_configure_unsupported_os` | a service could not be configured because the operating system predates service configuration support |  |
| `1941` | `lock_permissions_tables_conflict` | the package carries both permission tables where only one is allowed, which is a package authoring fault |  |
| `1942` | `multiple_conditions_true` | two conditions on the same object both resolved true, which is usually a package authoring fault |  |
| `1943` | `sddl_string_unresolvable` | a security descriptor string in the package could not be resolved into a valid descriptor |  |
| `1944` | `service_security_set_failed` | the security permissions on a service could not be set, with the underlying error in the message |  |
| `1945` | `readvertise_requires_local_system` | re-advertising the product requires the calling process to run as the local system account |  |
| `1946` | `shortcut_property_set_failed` | a shortcut property could not be set, reported as a warning while the installation continues |  |
| `2101` | `shortcuts_unsupported` | the operating system does not support shortcuts |  |
| `2102` | `ini_action_invalid` | the ini action the package requests is not valid |  |
| `2103` | `shell_folder_path_unresolved` | the path for a shell folder could not be resolved |  |
| `2104` | `ini_file_write_error` | writing an ini file failed, with the underlying system error in the message |  |
| `2105` | `shortcut_creation_failed` | creating a shortcut failed, with the underlying system error in the message |  |
| `2106` | `shortcut_deletion_failed` | deleting a shortcut failed, with the underlying system error in the message |  |
| `2107` | `type_library_register_error` | registering a type library failed, with the underlying error in the message |  |
| `2108` | `type_library_unregister_error` | unregistering a type library failed, with the underlying error in the message |  |
| `2109` | `ini_action_section_missing` | the ini action names no section |  |
| `2110` | `ini_action_key_missing` | the ini action names no key |  |
| `2111` | `running_app_detection_perf_data_unavailable` | detecting running applications failed because performance data could not be read |  |
| `2112` | `running_app_detection_perf_index_unavailable` | detecting running applications failed because the performance index could not be read |  |
| `2113` | `running_app_detection_failed` | detecting running applications failed |  |
| `2200` | `database_object_create_failed` | the installer database object could not be created, with the open mode in the message |  |
| `2201` | `database_init_out_of_memory` | initializing the installer database failed for want of memory |  |
| `2202` | `database_access_out_of_memory` | reading the installer database failed for want of memory |  |
| `2203` | `database_open_failed` | the installer database file could not be opened, with the underlying system error in the message |  |
| `2219` | `installer_database_format_invalid` | the file is not in a valid Windows Installer database format |  |
| `2245` | `storage_stat_failed` | reading the properties of a storage object failed, with the underlying error in the message |  |
| `2246` | `installer_transform_format_invalid` | the file is not in a valid Windows Installer transform format |  |
| `2247` | `transform_stream_io_failure` | reading or writing a transform stream failed |  |
| `2259` | `database_table_update_failed` | updating one or more installer database tables failed |  |
| `2260` | `storage_copy_failed` | copying a storage object failed, with the underlying system error in the message |  |
| `2261` | `stream_remove_failed` | a stream could not be removed, with the underlying system error in the message |  |
| `2262` | `stream_absent` | the named stream does not exist, with the underlying system error in the message |  |
| `2263` | `stream_open_failed` | a stream could not be opened, with the underlying system error in the message |  |
| `2265` | `storage_commit_failed` | committing a storage object failed, with the underlying system error in the message |  |
| `2266` | `storage_rollback_failed` | rolling back a storage object failed, with the underlying system error in the message |  |
| `2267` | `storage_delete_failed` | deleting a storage object failed, with the underlying system error in the message |  |
| `2276` | `database_code_page_unsupported` | the code page the installer database uses is not supported by the system |  |
| `2277` | `database_table_save_failed` | saving an installer database table failed |  |
| `2281` | `stream_rename_failed` | a stream could not be renamed, with the underlying system error in the message |  |
| `2282` | `stream_name_invalid` | the stream name is not valid |  |
| `2303` | `volume_info_read_failed` | reading volume information failed, with the underlying system error in the message |  |
| `2304` | `disk_free_space_read_failed` | reading free disk space failed, with the volume and underlying system error in the message |  |
| `2305` | `patch_thread_wait_failed` | waiting on the patch thread failed, with the underlying system error in the message |  |
| `2306` | `patch_thread_create_failed` | the thread that applies the patch could not be created, with the underlying system error in the message |  |
| `2307` | `source_file_key_null` | the source file key name is missing |  |
| `2308` | `destination_file_name_null` | the destination file name is missing |  |
| `2309` | `patch_already_in_progress` | a patch was attempted on a file while a patch is already in progress on it |  |
| `2310` | `no_patch_in_progress` | a patch was continued while no patch is in progress |  |
| `2315` | `path_separator_missing` | the path given is missing a separator |  |
| `2318` | `file_does_not_exist` | the named file does not exist |  |
| `2319` | `file_attribute_set_failed` | setting an attribute on the named file failed, with the underlying system error in the message |  |
| `2320` | `file_not_writable` | the named file is not writable |  |
| `2321` | `file_create_failed` | the named file could not be created |  |
| `2322` | `user_canceled` | the user canceled the operation |  |
| `2323` | `file_attribute_invalid` | the file attribute given is not valid |  |
| `2324` | `file_open_failed` | the named file could not be opened, with the underlying system error in the message |  |
| `2325` | `file_time_read_failed` | the timestamp of the named file could not be read, with the underlying system error in the message |  |
| `2327` | `directory_remove_failed` | the named directory could not be removed, with the underlying system error in the message |  |
| `2328` | `file_version_info_read_failed` | the version information of the named file could not be read |  |
| `2329` | `file_delete_failed` | the named file could not be deleted, with the underlying system error in the message |  |
| `2330` | `file_attributes_read_failed` | the attributes of the named file could not be read, with the underlying system error in the message |  |
| `2331` | `library_load_or_entry_point_failed` | a library could not be loaded or its entry point could not be found |  |
| `2334` | `file_time_conversion_failed` | converting the timestamp of the named file to local time failed, with the underlying system error in the message |  |
| `2335` | `path_not_parent_of_target` | the path given is not a parent of the path it must contain |  |
| `2336` | `temp_file_create_on_path_failed` | a temporary file could not be created on the named path, with the underlying system error in the message |  |
| `2337` | `file_close_failed` | the named file could not be closed, with the underlying system error in the message |  |
| `2338` | `file_resource_update_failed` | the resources in the named file could not be updated, with the underlying system error in the message |  |
| `2339` | `file_time_set_failed` | the timestamp of the named file could not be set, with the underlying system error in the message |  |
| `2340` | `file_resource_missing` | the resources in the named file could not be updated because the resource is missing |  |
| `2341` | `file_resource_too_large` | the resources in the named file could not be updated because the resource is too large |  |
| `2343` | `path_empty` | the path given is empty |  |
| `2344` | `imagehlp_dll_missing` | the file could not be validated because the IMAGEHLP.DLL it needs was not found |  |
| `2345` | `file_checksum_absent` | the named file carries no valid checksum value |  |
| `2347` | `user_ignored` | the user chose to ignore the condition and continue |  |
| `2348` | `cabinet_stream_read_error` | reading from the cabinet stream failed |  |
| `2350` | `cabinet_extraction_server_error` | the cabinet extraction server reported an error |  |
| `2351` | `file_key_absent_from_cabinet` | the file key the package names is not in the cabinet, so the installation cannot continue |  |
| `2352` | `cabinet_file_server_init_failed` | the cabinet file server could not start, which points at a missing CABINET.DLL |  |
| `2353` | `not_a_cabinet` | the file the installation reads is not a cabinet |  |
| `2354` | `cabinet_unsupported` | the cabinet cannot be handled by this installer |  |
| `2355` | `cabinet_data_corrupt` | the cabinet data is corrupt |  |
| `2356` | `cabinet_absent_from_stream` | no cabinet could be located in the named stream |  |
| `2358` | `file_in_use_check_failed` | determining whether the named file is in use failed, with the underlying system error in the message |  |
| `2359` | `target_file_create_failed_possibly_in_use` | the target file could not be created, commonly because it is in use |  |
| `2362` | `folder_absent` | the named folder was not found |  |
| `2363` | `subfolder_enumeration_failed` | the subfolders of the named folder could not be listed |  |
| `2365` | `bind_image_exe_failed` | the named executable could not be bound |  |
| `2367` | `user_aborted` | the user aborted the operation |  |
| `2368` | `network_resource_info_unavailable` | network resource information could not be read, with the network path, provider and provider error in the message |  |
| `2370` | `file_checksum_mismatch` | the checksum in the file header does not match its computed value |  |
| `2371` | `patch_apply_failed` | applying a patch to the named file failed, with the underlying system error in the message |  |
| `2372` | `patch_file_corrupt` | the patch file is corrupt or in an invalid format |  |
| `2373` | `patch_file_invalid` | the named file is not a valid patch file |  |
| `2374` | `patch_destination_file_invalid` | the named file is not a valid destination for the patch being applied |  |
| `2375` | `patch_error_unknown` | the patch failed for a reason the installer does not name |  |
| `2376` | `cabinet_not_found` | the cabinet the installation needs was not found |  |
| `2379` | `file_open_for_read_failed` | opening the named file for reading failed, with the underlying system error in the message |  |
| `2380` | `file_open_for_write_failed` | opening the named file for writing failed, with the underlying system error in the message |  |
| `2381` | `directory_does_not_exist` | the named directory does not exist |  |
| `2382` | `drive_not_ready` | the named drive is not ready |  |
| `2401` | `registry_64bit_operation_on_32bit_os` | a 64-bit registry operation was attempted on a 32-bit operating system |  |
| `2501` | `rollback_script_enumerator_create_failed` | the rollback script enumerator could not be created |  |
| `2502` | `install_finalize_without_install` | the finalize step ran while no installation was in progress, which is a sequencing fault |  |
| `2503` | `run_script_without_install` | the script step ran while no installation was marked in progress, which is a sequencing fault |  |
| `2601` | `property_value_invalid` | the value assigned to the named property is not valid |  |
| `2602` | `media_table_entry_missing` | a table entry has no matching entry in the media table, which is a package authoring fault |  |
| `2603` | `table_name_duplicated` | the package declares the same table name twice |  |
| `2604` | `property_undefined` | the named property was never defined |  |
| `2605` | `server_not_found` | the server the package names could not be found |  |
| `2606` | `property_not_a_full_path` | the value of the named property is not a valid full path |  |
| `2607` | `media_table_missing_or_empty` | the media table is missing or empty, which file installation requires |  |
| `2608` | `security_descriptor_create_failed` | a security descriptor for an object could not be created, with the underlying error in the message |  |
| `2609` | `settings_migration_before_init` | product settings migration was attempted before initialization |  |
| `2611` | `compressed_file_without_cabinet_entry` | a file is marked compressed but its media entry names no cabinet, which is a package authoring fault |  |
| `2612` | `stream_absent_from_column` | the stream the named column references was not found |  |
| `2613` | `remove_existing_products_sequenced_wrong` | the action that removes existing products is sequenced incorrectly, which is a package authoring fault |  |
| `2614` | `package_storage_inaccessible` | the storage object inside the installation package could not be accessed |  |
| `2615` | `module_unregistration_skipped_source_unresolved` | unregistering a module was skipped because its source could not be resolved |  |
| `2616` | `companion_file_parent_missing` | the parent of a companion file is missing |  |
| `2617` | `shared_component_absent_from_table` | a shared component is not in the component table, which is a package authoring fault |  |
| `2618` | `isolated_component_absent_from_table` | an isolated application component is not in the component table, which is a package authoring fault |  |
| `2619` | `isolated_components_in_different_features` | two isolated components are not part of the same feature, which is a package authoring fault |  |
| `2620` | `isolated_component_key_file_absent` | the key file of an isolated application component is not in the file table |  |
| `2621` | `shortcut_resource_info_incorrect` | the resource DLL or resource id for a shortcut is set incorrectly |  |
| `2701` | `feature_tree_too_deep` | a feature exceeds the maximum feature tree depth of sixteen levels |  |
| `2702` | `feature_parent_missing` | a feature table record references a parent that does not exist |  |
| `2703` | `root_source_path_property_undefined` | the property naming the root source path is not defined |  |
| `2704` | `root_directory_property_undefined` | the root directory property is not defined |  |
| `2705` | `table_not_linkable_as_tree` | an installer table could not be linked as a tree, which is a package authoring fault |  |
| `2706` | `source_paths_not_created` | source paths were not created because no path exists for an entry in the directory table |  |
| `2707` | `target_paths_not_created` | target paths were not created because no path exists for an entry in the directory table |  |
| `2708` | `file_table_empty` | the file table holds no entries |  |
| `2709` | `component_absent_from_table` | the component name the package requests is not in the component table |  |
| `2710` | `component_select_state_illegal` | the select state requested for a component is not legal for it |  |
| `2711` | `feature_absent_from_table` | the feature name requested is not in the package feature table |  |
| `2713` | `non_nullable_column_null` | a column that cannot be null holds no value, which is a package authoring fault |  |
| `2714` | `default_folder_name_invalid` | the default folder name given is not valid |  |
| `2715` | `file_key_absent_from_table` | the file key the package requests is not in the file table |  |
| `2716` | `component_subname_generation_failed` | a random subcomponent name could not be generated, which happens when two component names share their first forty characters |  |
| `2717` | `custom_action_condition_bad` | a custom action condition is bad or calling the custom action failed |  |
| `2718` | `package_name_missing_for_product` | no package name is recorded for the named product code |  |
| `2719` | `source_path_not_unc_or_drive` | the source path is neither a UNC path nor a drive letter path |  |
| `2720` | `source_list_key_open_failed` | the source list registry key could not be opened, with the underlying error in the message |  |
| `2721` | `custom_action_absent_from_binary_table` | the custom action is not in the binary table stream |  |
| `2722` | `custom_action_absent_from_file_table` | the custom action is not in the file table |  |
| `2723` | `custom_action_type_unsupported` | the custom action declares an unsupported type |  |
| `2724` | `media_volume_label_mismatch` | the volume label on the media does not match the label the media table gives |  |
| `2725` | `database_tables_invalid` | the installer database tables are invalid |  |
| `2726` | `action_not_found` | the named action was not found |  |
| `2727` | `directory_entry_absent` | the directory entry the package references is not in its directory table |  |
| `2728` | `table_definition_error` | the definition of the named table is in error |  |
| `2729` | `install_engine_not_initialized` | the install engine was used before it was initialized |  |
| `2730` | `database_value_bad` | a value in the installer database is bad, with the table, primary key and column in the message |  |
| `2731` | `selection_manager_not_initialized` | an action needing the selection manager ran before the costing actions initialized it |  |
| `2732` | `directory_manager_not_initialized` | an action needing the directory manager ran before the costing actions initialized it |  |
| `2733` | `foreign_key_bad` | a foreign key in the installer database is bad, with the column and table in the message |  |
| `2734` | `reinstall_mode_character_invalid` | the reinstall mode string contains a character that is not valid |  |
| `2735` | `custom_action_unhandled_exception` | a custom action raised an unhandled exception and was stopped, which can be an access violation inside it |  |
| `2736` | `custom_action_temp_file_generation_failed` | the temporary file a custom action needs could not be generated |  |
| `2737` | `custom_action_entry_inaccessible` | a custom action could not be reached, with its entry point and library in the message |  |
| `2738` | `vbscript_runtime_unavailable` | a custom action needed the VBScript runtime and could not reach it |  |
| `2739` | `jscript_runtime_unavailable` | a custom action needed the JScript runtime and could not reach it |  |
| `2740` | `custom_action_script_runtime_error` | a custom action script raised an error, with the line and column in the message |  |
| `2741` | `product_configuration_information_corrupt` | the recorded configuration information for the product is corrupt |  |
| `2742` | `marshaling_to_server_failed` | marshaling the call to the installer server failed |  |
| `2743` | `custom_action_execute_failed` | a custom action could not be executed, with its location and command in the message |  |
| `2744` | `custom_action_exe_failed` | an executable launched by a custom action failed, with its location and command line in the message |  |
| `2745` | `transform_language_mismatch` | the transform does not apply to the package because it expects a different language |  |
| `2746` | `transform_product_mismatch` | the transform does not apply to the package because it expects a different product |  |
| `2747` | `transform_requires_lower_product_version` | the transform does not apply because it expects a product version below the one found |  |
| `2748` | `transform_requires_lower_or_equal_product_version` | the transform does not apply because it expects a product version at or below the one found |  |
| `2749` | `transform_requires_exact_product_version` | the transform does not apply because it expects an exact product version other than the one found |  |
| `2750` | `transform_requires_higher_or_equal_product_version` | the transform does not apply because it expects a product version at or above the one found |  |
| `2751` | `transform_requires_higher_product_version` | the transform does not apply because it expects a product version above the one found |  |
| `2752` | `transform_child_storage_open_failed` | the transform stored inside the package could not be opened |  |
| `2753` | `file_not_marked_for_installation` | the named file is not marked for installation |  |
| `2754` | `file_not_a_valid_patch` | the named file is not a valid patch file |  |
| `2755` | `server_error_installing_package` | the installer server returned an unexpected error while installing the package, with that error in the message |  |
| `2756` | `directory_property_never_assigned` | a property used as a directory property was never assigned a value, which is a package authoring fault |  |
| `2757` | `transform_summary_info_create_failed` | the summary information for the transform could not be created |  |
| `2758` | `transform_missing_msi_version` | the transform carries no Windows Installer version |  |
| `2759` | `transform_engine_version_incompatible` | the transform version is outside the range this installer engine supports |  |
| `2760` | `transform_upgrade_code_mismatch` | the transform does not apply to the package because it expects a different upgrade code |  |
| `2761` | `transaction_begin_failed_mutex` | the transaction could not begin because the global mutex is not properly initialized |  |
| `2762` | `script_record_without_transaction` | a script record could not be written because no transaction was started, which is an install sequence authoring fault |  |
| `2763` | `script_run_without_transaction` | the script could not run because no transaction was started |  |
| `2765` | `assembly_name_missing_from_table` | the assembly name is missing from the assembly name table |  |
| `2766` | `msi_storage_file_invalid` | the named file is not a valid installer storage file |  |
| `2767` | `no_more_data` | an enumeration reached the end of its data |  |
| `2768` | `patch_transform_invalid` | the transform inside the patch package is invalid |  |
| `2769` | `custom_action_leaked_handles` | a custom action did not close the installer handles it opened, which usually means the execute sequence is authored incorrectly |  |
| `2770` | `cached_folder_not_in_cache_table` | the cached folder is not defined in the internal cache folder table |  |
| `2771` | `upgrade_feature_component_missing` | a feature being upgraded is missing a component |  |
| `2772` | `upgrade_feature_not_leaf` | a new upgrade feature must be a leaf feature and is not |  |
| `2869` | `dialog_error_style_mismatch` | a dialog carries the error style bit but is not an error dialog, which is a package authoring fault |  |
| `2896` | `action_execution_failed` | the named installer action failed while executing |  |
| `2901` | `operation_parameter_invalid` | a parameter passed to the named operation is not valid |  |
| `2902` | `operation_out_of_sequence` | the named operation was called out of sequence, which can mean a side-by-side component is missing a key path |  |
| `2903` | `file_missing` | the named file is missing |  |
| `2905` | `script_file_record_read_failed` | a record could not be read from the script file |  |
| `2906` | `script_file_header_missing` | the script file has no header |  |
| `2907` | `secure_security_descriptor_create_failed` | a secure security descriptor could not be created, with the underlying error in the message |  |
| `2908` | `component_registration_failed` | a component could not be registered |  |
| `2909` | `component_unregistration_failed` | the named component could not be unregistered |  |
| `2910` | `user_security_id_undetermined` | the security id of the user could not be determined |  |
| `2911` | `folder_remove_failed` | the named folder could not be removed |  |
| `2912` | `file_removal_on_restart_schedule_failed` | the named file could not be scheduled for removal at the next restart |  |
| `2920` | `source_directory_unspecified` | no source directory is specified for the named file |  |
| `2924` | `script_version_unsupported` | the script version is outside the range this installer supports |  |
| `2927` | `shell_folder_id_invalid` | the shell folder id given is not valid |  |
| `2928` | `source_limit_exceeded` | the maximum number of sources was exceeded and a source was skipped |  |
| `2929` | `publishing_root_undetermined` | the publishing root could not be determined, with the underlying error in the message |  |
| `2932` | `script_data_file_create_failed` | a file could not be created from script data, with the underlying error in the message |  |
| `2933` | `rollback_script_init_failed` | the rollback script could not be initialized |  |
| `2934` | `transform_secure_failed` | the transform could not be secured, with the underlying error in the message |  |
| `2935` | `transform_unsecure_failed` | the transform could not be unsecured, with the underlying error in the message |  |
| `2936` | `transform_not_found` | the named transform could not be found |  |
| `2937` | `sfp_catalog_install_refused` | a system file protection catalog cannot be installed by Windows Installer, with the catalog and error in the message |  |
| `2938` | `sfp_catalog_cache_read_failed` | a system file protection catalog could not be retrieved from the cache, with the catalog and error in the message |  |
| `2939` | `sfp_catalog_cache_delete_failed` | a system file protection catalog could not be deleted from the cache, with the catalog and error in the message |  |
| `2940` | `directory_manager_not_supplied` | no directory manager was supplied for source resolution |  |
| `2941` | `file_crc_computation_failed` | the checksum of the named file could not be computed |  |
| `2942` | `bind_image_not_executed` | the bind image action was not run on the named file |  |
| `2943` | `sixty_four_bit_package_unsupported` | this version of Windows cannot deploy the 64-bit package the script belongs to |  |
| `2944` | `product_assignment_type_query_failed` | reading the assignment type of the product failed |  |
| `2945` | `complus_app_install_failed_with_error` | installing a COM+ application failed, with the application and error in the message |  |
| `3001` | `patch_list_sequencing_invalid` | the patches in the list carry sequencing information that is not consistent |  |
| `3002` | `patch_sequencing_invalid` | the named patch carries invalid sequencing information |  |

## Module-minted token slots

Rendered as bare words in the curated first line, so they are part of the derived pattern.

### `result_constant`

Published Microsoft constant for the result this compact family named. Minted to the constants these rows emit, not bound to the full win32 table. Inline because the constant is the action-changing token and the string an engineer searches for.

- `VSS_E_WRITERERROR_TIMEOUT`
- `VSS_E_WRITERERROR_RETRYABLE`
- `VSS_E_WRITERERROR_NONRETRYABLE`
- `VSS_E_FLUSH_WRITES_TIMEOUT`
- `VSS_E_HOLD_WRITES_TIMEOUT`
- `ERROR_NO_SUCH_ALIAS`

## Portable vocabularies this module uses

Library-wide closed sets, so the same token means the same thing on every data feed.

### `sparklogs.result.code_space`

- `msi`: Windows Installer error code
- `vss`: Volume Shadow Copy Service private result code (VSS_E_*/VSS_S_*)
