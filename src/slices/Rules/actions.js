import { apiCall, appendUrl } from "../../infrastructure/api/core";
import { RulesSchema } from "../../infrastructure/api/entities";

export const CREATE_RULE = 'CREATE_RULE';
export function createRule(values, form, onSuccess) {
    return apiCall(CREATE_RULE, appendUrl(`rules`), {
        successText: "User invitation sent",
        form,
        onSuccess,
        schema: RulesSchema
    }, values, 'POST');
}