import { CALL_API, isRSAA, RSAA } from 'redux-api-middleware';

export const injectTenantMiddleware = store => next => action => {
    const callApi = action[RSAA];
	if (isRSAA(action)) {
		const state = store.getState();
		callApi.headers = Object.assign({}, callApi.headers, {
			'tenant-id': state.session.get('currentTenant'),
		});
	}

	return next(action);
};