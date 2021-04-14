import { Map } from "immutable";
import ApiReducer, { states } from "../../infrastructure/api/apiReducer";
import { GET_DEVICES, REMOVE_DEVICE, UPDATE_DEVICE } from "./actions";

export const initialState = new Map({
    items: [],
	state: '',
});

const apiHandlers = {
	REQUEST: (state, action) => state
        .set('state', states.loading)
        .remove('error'),
    SUCCESS: (state, action) => state
        .update('items', items => items.concat(action.result))
        .set('state', states.loaded),
    FAILURE: (state, action) => state
        .set('state', states.error)
        .set('error', action),
};

const handlers = {
}

const apiReducer = ApiReducer([GET_DEVICES, UPDATE_DEVICE, REMOVE_DEVICE], initialState, apiHandlers);

const reducer = (state = initialState, action) => {
	const handler = handlers[action.type];

	if (handler) {
		return handler(state, action);
	}

	return apiReducer(state, action);
};

export default reducer;