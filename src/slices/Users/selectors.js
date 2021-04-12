import { getIn } from "formik";
import { denormalize } from "normalizr";
import { UserSchema } from "../../infrastructure/api/entities";

const hydrateUser = (state, id) => denormalize(id, UserSchema, state.entities);
const hydrateUsers = state => 
    Object.keys(
        getIn(state.entities, ['users']) || {}
    )
    .map(id => hydrateUser(state, id));

export const selectUsers = state => hydrateUsers(state);