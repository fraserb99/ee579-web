import { normalize } from 'normalizr';
import { has } from 'lodash';

export const requiresNormalizing = action => has(action, 'meta.schema');

export default () => next => action => {
	if (action.type === 'SUCCESS' && requiresNormalizing(action)) {
		const normalized = normalize(action.payload.items, action.meta.schema);
		
		return next({
			...action,
			...normalized,
		});
	}
	
	return next(action);
};