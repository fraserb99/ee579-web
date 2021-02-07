import { get, keys } from 'lodash';
import { Map } from 'immutable';

export const defaultInitialState = new Map({
	state: '',
});

export const states = {
	loading: 'loading',
	loaded: 'loaded',
	error: 'error',
};

const defaultHandlers = {
	REQUEST: (state, action) => state.set('state', states.loading).remove('error'),
	SUCCESS: (state, action) => state.set('state', states.loaded),
	FAILURE: (state, action) => state.set('state', states.error).set('error', action),
};

const ApiReducer = (baseTypes, initialState = defaultInitialState, handlers = defaultHandlers) => {
	const targetTypes = keys(handlers);
	return (state = initialState, action) => {
		if (targetTypes.includes(action.type) && baseTypes.includes(get(action, 'meta.type'))) {
			const handler = handlers[action.type];
			if (handler) {
				return handler(state, action);
			}
		}

		return state;
	};
};

export default ApiReducer;
