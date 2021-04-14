import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { DevicesSchema } from "../../infrastructure/api/entities";

export const GET_DEVICES = 'GET_DEVICES';
export function getDevices() {
    return apiCall(GET_DEVICES, appendUrl('devices'), {
        schema: DevicesSchema
    })
}

export const GET_UNCLAIMED_DEVICES = 'GET_UNCLAIMED_DEVICES';
export function getUnclaimed() {
    return apiCall(GET_UNCLAIMED_DEVICES, appendUrl('devices/unclaimed'), {
        schema: DevicesSchema
    })
}

export const IDENTIFY_DEVICE = 'IDENTIFY_DEVICE';
export function identifyDevice(id) {
    return apiCall(IDENTIFY_DEVICE, appendUrl(`devices/${id}/identify`), {
        successText: "Flashing the the device LED",
    }, null, 'POST')
}

export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export function removeDevice(id) {
    return apiCall(REMOVE_DEVICE, appendUrl(`devices/${id}/unclaim`), {
        successText: "Successfully unclaimed this device",
        path: ['devices', id]
    }, null, 'DELETE')
}

// export const INVITE_DEVICE = 'INVITE_DEVICE';
// export function inviteDevice(values, form, onSuccess) {
//     return apiCall(INVITE_DEVICE, appendUrl(`tenants/invite`), {
//         successText: "Device invitation sent",
//         form,
//         onSuccess,
//         schema: DevicesSchema
//     }, values, 'POST');
// }

export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export function updateDevice(values, form, onSuccess) {
    return apiCall(UPDATE_DEVICE, appendUrl(`devices/${values.id}`), {
        successText: "Device succesfully updated",
        form,
        onSuccess,
        schema: DevicesSchema
    }, values, 'PUT');
}

export const CLAIM_DEVICE = 'CLAIM_DEVICE';
export function claimDevice(values, form, onSuccess) {
    return apiCall(CLAIM_DEVICE, appendUrl(`devices/${values.id}/claim`), {
        successText: "Device succesfully updated",
        form,
        onSuccess,
        schema: DevicesSchema
    }, values, 'PUT');
}