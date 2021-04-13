import { SET_DELETE_STATE } from "./actions";

const initialState = {open: false};

const handlers = {
    [SET_DELETE_STATE]: (state, action) => action.payload
};

const reducer = (state = initialState, action) => {
	const handler = handlers[action.type];

	if (handler) {
		return handler(state, action);
    }

    return state;
}

export default reducer;