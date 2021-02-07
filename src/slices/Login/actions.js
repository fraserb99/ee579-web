import { apiCall, appendUrl } from '../../infrastructure/api/core';

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export function signIn(payload) {
    return apiCall(REQUEST_SIGNIN, appendUrl('login'), null, payload, 'POST')
}

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export function signUp(payload) {
    return apiCall(REQUEST_SIGNUP, appendUrl('users'), null, payload, 'POST')
}