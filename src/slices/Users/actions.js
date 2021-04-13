import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { UsersSchema } from "../../infrastructure/api/entities";

export const GET_USERS = 'GET_USERS';
export function getUsers() {
    return apiCall(GET_USERS, appendUrl('users'), {
        schema: UsersSchema
    })
}

export const REMOVE_USER = 'REMOVE_USER';
export function removeUser(id) {
    return apiCall(REMOVE_USER, appendUrl(`tenants/users/${id}`), {
        successText: "Successfully revoked user's access",
        path: ['users', id]
    }, null, 'DELETE')
}

export const INVITE_USER = 'INVITE_USER';
export function inviteUser(values, form, onSuccess) {
    return apiCall(INVITE_USER, appendUrl(`tenants/invite`), {
        successText: "User invitation sent",
        form,
        onSuccess,
        schema: UsersSchema
    }, values, 'POST');
}

export const UPDATE_USER = 'UPDATE_USER';
export function updateUser(values, form, onSuccess) {
    return apiCall(UPDATE_USER, appendUrl(`users/${values.id}`), {
        successText: "User role updated",
        form,
        onSuccess,
        schema: UsersSchema
    }, values, 'PUT');
}