import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { TenantsSchema } from "../../infrastructure/api/entities";

export const GET_TENANTS = 'GET_TENANTS';
export function getTenants() {
    return apiCall(GET_TENANTS, appendUrl('tenants'), {
        schema: TenantsSchema
    })
}

export const SET_CURRENT_TENANT = 'SET_CURRENT_TENANT';
export const switchTenant = (id) => ({
    type: SET_CURRENT_TENANT,
    payload: id
})