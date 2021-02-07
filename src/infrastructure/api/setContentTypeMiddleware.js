import { isRSAA, RSAA } from 'redux-api-middleware';
import { keys } from 'lodash';

export const setContentTypeMiddleware = () => next => action => {
	const callApi = action[RSAA]
	if (isRSAA(action)) {
		callApi.headers = {
			...callApi.headers,
			'content-type': 'application/json',
		};
	}

	return next(action);
};
