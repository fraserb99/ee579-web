import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { DevicesSchema } from "../../infrastructure/api/entities";

export const GET_DEVICES = 'GET_DEVICES';
export function getDevices() {
    return apiCall(GET_DEVICES, appendUrl('devices'), {
        schema: DevicesSchema
    })
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