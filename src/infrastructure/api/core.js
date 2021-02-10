import { createAction } from "redux-api-middleware";

export const API_URL = process.env.NODE_ENV !== 'development' ? 'https://ee579-dev-api.azurewebsites.net' : 'https://localhost:5001';

export const appendUrl = path => baseUrl => `${baseUrl}/${path}`;

export const apiCall = (type, buildEndpoint, meta, data, method = 'GET') => {

    return createAction({
        endpoint: buildEndpoint(API_URL),
        method,
        body: JSON.stringify(data),
        types: [
            {
                type: 'REQUEST',
                meta: {
                    type,
                    ...meta,
                },
            },
            {
                type: 'SUCCESS',
                meta: {
                    type,
                    ...meta,
                },
            },
            {
                type: 'FAILURE',
                meta: {
                    type,
                    ...meta,
                },
            },
        ],
    })
}