import { getIn } from "formik";
import { denormalize } from "normalizr";
import { RuleSchema } from "../../infrastructure/api/entities";

const hydrateRule = (state, id) => denormalize(id, RuleSchema, state.entities);
const hydrateRules = state => 
    Object.keys(
        getIn(state.entities, ['rules']) || {}
    )
    .map(id => hydrateRule(state, id));

export const selectRules = state => hydrateRules(state);

export const selectUnclaimed = state => hydrateRules(state)