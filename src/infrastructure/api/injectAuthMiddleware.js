import { CALL_API, isRSAA, RSAA } from 'redux-api-middleware';

export const injectAuthMiddleware = store => next => action => {
    const callApi = action[RSAA];
	if (isRSAA(action)) {
		const state = store.getState();
		callApi.headers = Object.assign({}, callApi.headers, {
			Authorization: `Bearer ${state.session.get('token')}`,
		});
	}

	return next(action);
};