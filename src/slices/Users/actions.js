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
        successText: "Successfully revoked user's access"
     }, null, 'DELETE')
}