import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { DeviceGroupsSchema } from "../../infrastructure/api/entities";

export const GET_DEVICEGROUPS = 'GET_DEVICEGROUPS';
export function getDeviceGroups() {
    return apiCall(GET_DEVICEGROUPS, appendUrl('devicegroups'), {
        schema: DeviceGroupsSchema
    })
}

export const CREATE_DEVICEGROUP = 'CREATE_DEVICEGROUP';
export function createDeviceGroup(values, form, onSuccess) {
    return apiCall(CREATE_DEVICEGROUP, appendUrl(`devicegroups`), {
        successText: "Device group created",
        form,
        onSuccess,
        schema: DeviceGroupsSchema
    }, values, 'POST');
}

export const UPDATE_DEVICEGROUP = 'UPDATE_DEVICEGROUP';
export function updateDeviceGroup(values, form, onSuccess) {
    return apiCall(UPDATE_DEVICEGROUP, appendUrl(`devicegroups/${values.id}`), {
        successText: "Device group succesfully updated",
        form,
        onSuccess,
        schema: DeviceGroupsSchema
    }, values, 'PUT');
}

export const DELETE_DEVICEGROUP = 'DELETE_DEVICEGROUP';
export function deleteDeviceGroup(id) {
    return apiCall(DELETE_DEVICEGROUP, appendUrl(`devicegroups/${id}`), {
        successText: "Successfully deleted device group",
        path: ['devicegroups', id]
    }, null, 'DELETE')
}