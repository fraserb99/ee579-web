import { getIn } from "formik";
import { denormalize } from "normalizr";
import { TenantSchema } from "../../infrastructure/api/entities";

const hydrateTenant = (state, id) => denormalize(id, TenantSchema, state.entities);
const hydrateTenants = state => 
    Object.keys(
        getIn(state.entities, ['tenants']) || {}
    )
    .map(id => hydrateTenant(state, id));

const selectCurrentTenantId = state => state.session.get('currentTenant');

export const selectCurrentTenant = state => hydrateTenant(state, selectCurrentTenantId(state));

export const selectTenants = state => hydrateTenants(state);