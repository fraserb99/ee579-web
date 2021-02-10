import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { TenantsSchema } from "../../infrastructure/api/entities";

export const GET_TENANTS = 'GET_TENANTS';
export function getTenants() {
    return apiCall(GET_TENANTS, appendUrl('tenants'), {
        schema: TenantsSchema
    })
}