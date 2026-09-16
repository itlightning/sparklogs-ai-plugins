<!-- GENERATED reference. Do not hand-edit. -->
<!-- Public reference tree: field meaning and usage. All example values are synthetic. -->

# Vocabularies: `win.eventlog.storage`

Every token an agent can group by, with what it means.
These sets are closed: a value outside them leaves its field unset rather than being invented.

## `scsi_sense_key`

16 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `0` | `no_sense` | the device reported no sense information for the command |  |
| `1` | `recovered_error` | the command completed after the device corrected the problem itself |  |
| `2` | `not_ready` | the device cannot be reached in its current state; an empty removable slot is the ordinary cause |  |
| `3` | `medium_error` | the device could not read or write the medium itself |  |
| `4` | `hardware_error` | the device detected a non-recoverable failure in its own hardware |  |
| `5` | `illegal_request` | the device does not implement the command or a field in it |  |
| `6` | `unit_attention` | the device is announcing that its own state changed since the last command |  |
| `7` | `data_protect` | the command was refused because the medium or the region is write protected |  |
| `8` | `blank_check` | the device reached blank medium where recorded data was expected |  |
| `9` | `vendor_unique` | the sense key is reserved to the device vendor and has no portable meaning |  |
| `10` | `copy_aborted` | a copy or compare operation was ended before it finished |  |
| `11` | `aborted_command` | the device aborted the command |  |
| `12` | `equal` | a search command found the value it was comparing against |  |
| `13` | `volume_overflow` | the medium ran out of space with data still buffered |  |
| `14` | `miscompare` | the data read back did not match the data the command supplied |  |
| `15` | `reserved` | the sense key is reserved and names no defined condition |  |

## `scsi_additional_sense`

5 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `32` | `illegal_command` | the device does not implement the operation code the command carried |  |
| `36` | `invalid_cdb` | a field in the command descriptor block held a value the device rejects |  |
| `40` | `medium_changed` | the medium in the device was swapped since the last command |  |
| `41` | `bus_reset` | the bus the device sits on was reset |  |
| `58` | `no_media_in_device` | the device has no medium loaded; an empty card reader or optical drive answers this way at rest |  |

## `srb_status`

28 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `0` | `pending` | the request had not completed when the status was read |  |
| `1` | `success` | the request completed as issued |  |
| `2` | `aborted` | the request was aborted before it completed |  |
| `3` | `abort_failed` | the attempt to abort the request did not succeed |  |
| `4` | `error` | the request failed and the sense data carries the device account of why |  |
| `5` | `busy` | the device was busy and could not take the request |  |
| `6` | `invalid_request` | the request itself was not one the port driver could issue |  |
| `7` | `invalid_path_id` | the request named a bus the adapter does not have |  |
| `8` | `no_device` | no device answered at the address the request named |  |
| `9` | `timeout` | the request ran past its timeout without completing |  |
| `10` | `selection_timeout` | the device did not respond when the adapter selected it |  |
| `11` | `command_timeout` | the command ran past the device command timeout |  |
| `13` | `message_rejected` | the device rejected a bus message the adapter sent |  |
| `14` | `bus_reset` | the bus was reset while the request was outstanding |  |
| `15` | `parity_error` | a parity error was detected on the bus |  |
| `16` | `request_sense_failed` | the follow-up request for sense data itself failed |  |
| `17` | `no_hba` | no host bus adapter was present to carry the request |  |
| `18` | `data_overrun` | the transfer moved a different number of bytes than the request allowed |  |
| `19` | `unexpected_bus_free` | the device released the bus at a point the protocol does not allow |  |
| `20` | `phase_sequence_failure` | the bus phases did not follow the order the protocol requires |  |
| `21` | `bad_srb_block_length` | the request block length did not match what the port driver expected |  |
| `22` | `request_flushed` | the request was discarded while the port driver flushed its queue |  |
| `32` | `invalid_lun` | the request named a logical unit the device does not have |  |
| `33` | `invalid_target_id` | the request named a target the bus does not have |  |
| `34` | `bad_function` | the request carried a function code the port driver does not implement |  |
| `35` | `error_recovery` | the port driver was running error recovery when the request ended |  |
| `36` | `not_powered` | the device was not powered when the request reached it |  |
| `48` | `internal_error` | the port driver reported a failure that is not a device or bus condition |  |

## `storage_bus_type`

21 row(s).

| Code | Token | Meaning | Constant |
|---|---|---|---|
| `0` | `bus_unknown` | the bus behind the device could not be determined |  |
| `1` | `bus_scsi` | a small computer system interface bus |  |
| `2` | `bus_atapi` | an AT attachment packet interface bus |  |
| `3` | `bus_ata` | an advanced technology attachment bus |  |
| `4` | `bus_ieee1394` | an IEEE 1394 bus |  |
| `5` | `bus_ssa` | a serial storage architecture bus |  |
| `6` | `bus_fibre_channel` | a fibre channel bus |  |
| `7` | `bus_usb` | a USB bus; the devices behind it are removable in ordinary use |  |
| `8` | `bus_raid` | a redundant array of independent disks |  |
| `9` | `bus_iscsi` | an iSCSI bus |  |
| `10` | `bus_sas` | a serial-attached SCSI bus |  |
| `11` | `bus_sata` | a serial ATA bus |  |
| `12` | `bus_sd` | a secure digital bus |  |
| `13` | `bus_mmc` | a multimedia card bus |  |
| `14` | `bus_virtual` | a virtual storage bus |  |
| `15` | `bus_file_backed_virtual` | a virtual bus backed by a file |  |
| `16` | `bus_storage_spaces` | a Storage Spaces bus |  |
| `17` | `bus_nvme` | a non-volatile memory express bus |  |
| `18` | `bus_scm` | a storage class memory bus |  |
| `19` | `bus_ufs` | a universal flash storage bus |  |
| `20` | `bus_nvme_of` | a non-volatile memory express over fabrics bus |  |
