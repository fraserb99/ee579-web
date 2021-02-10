import { Map } from "immutable";
import ApiReducer, { states } from "../../infrastructure/api/apiReducer";
import { REQUEST_SIGNIN, REQUEST_SIGNUP } from "./actions";

export const initialState = new Map({
    user: null,
    token: null,
	state: '',
});

const apiHandlers = {
	REQUEST: (state, action) => state.set('state', states.loading).remove('error'),
	SUCCESS: (state, action) => state.set('state', states.loaded),
	FAILURE: (state, action) => state.set('state', states.error).set('error', action),
};

const handlers = {
	'SET_TOKENS': (state, action) => state
		.set('token', action.payload.token)
		.set('refreshToken', action.payload.refreshToken),
	'SET_CURRENT_USER': (state, action) => state.set('user', action.payload),
	'CLEAR_SESSION': state => initialState
}

const apiReducer = ApiReducer([REQUEST_SIGNIN, REQUEST_SIGNUP], initialState, apiHandlers);

const reducer = (state = initialState, action) => {
	const handler = handlers[action.type];

	if (handler) {
		return handler(state, action);
	}

	return apiReducer(state, action);
};

export default reducer;