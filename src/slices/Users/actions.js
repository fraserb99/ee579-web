import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { UsersSchema } from "../../infrastructure/api/entities";

export const GET_USERS = 'GET_USERS';
export function getUsers() {
    return apiCall(GET_USERS, appendUrl('users'), {
        schema: UsersSchema
    })
}