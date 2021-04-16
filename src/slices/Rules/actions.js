import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { RulesSchema } from "../../infrastructure/api/entities";

export const CREATE_RULE = 'CREATE_RULE';
export function createRule(values, form, onSuccess) {
    return apiCall(CREATE_RULE, appendUrl(`rules`), {
        successText: "Rule successfully created",
        form,
        onSuccess,
        schema: RulesSchema
    }, values, 'POST');
}

export const UPDATE_RULE = 'UPDATE_RULE';
export function updateRule(values, form, onSuccess) {
    return apiCall(UPDATE_RULE, appendUrl(`rules/${values.id}`), {
        successText: "Rule Updated",
        form,
        onSuccess,
        schema: RulesSchema
    }, values, 'PUT');
}

export const GET_RULES = 'GET_RULES';
export function getRules() {
    return apiCall(GET_RULES, appendUrl(`rules`), {
        schema: RulesSchema
    });
}