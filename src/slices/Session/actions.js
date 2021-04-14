import { apiCall, appendUrl } from '../../infrastructure/api/core';

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export function signIn(payload, form, returnUrl) {
    return apiCall(REQUEST_SIGNIN, appendUrl('login'), { form, returnUrl }, payload, 'POST')
}

export const EXTERNAL_SIGNIN = 'EXTERNAL_SIGNIN';
export function externalSignIn(token) {
    return apiCall(EXTERNAL_SIGNIN, appendUrl('login/external'), {}, { token }, 'POST')
}

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export function signUp(payload, form, returnUrl) {
    return apiCall(REQUEST_SIGNUP, appendUrl('users/create'), { form, returnUrl }, payload, 'POST')
}

export const CLEAR_SESSION = 'CLEAR_SESSION';
export function clearSession() {
    return { type: CLEAR_SESSION }
}