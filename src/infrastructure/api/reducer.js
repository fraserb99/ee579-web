import { OrderedMap, fromJS, removeIn } from 'immutable';
import { requiresNormalizing } from './normalizeApiResponseMiddleware';
// import { merge, overwriteMerge } from 'deepmerge';
const merge = require('deepmerge');

const initialState = {};

const mergeOptions = {
	arrayMerge: (a, b) => b
}

const handlers = {
	SUCCESS: (state, action) => {
		if (action.meta.clear) {
			return merge(state, action.entities);
		}

		return merge(state, action.entities, mergeOptions);
	},
};

const entityHandlers = {
	'REMOVE_ENTITY': (state, action) => removeIn(state, action.path)
}

const reducer = (state = initialState, action) => {
	const handler = handlers[action.type];
	const entityHandler = entityHandlers[action.type];

	if (handler && requiresNormalizing(action)) {
		return handler(state, action);
    }

	if (entityHandler) {
		return entityHandler(state, action);
	}

    return state;
}

export default reducer;