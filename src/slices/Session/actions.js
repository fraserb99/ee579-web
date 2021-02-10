import { apiCall, appendUrl } from '../../infrastructure/api/core';

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export function signIn(payload, form, history) {
    return apiCall(REQUEST_SIGNIN, appendUrl('login'), { form, history }, payload, 'POST')
}

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export function signUp(payload, form, history) {
    return apiCall(REQUEST_SIGNUP, appendUrl('users/create'), { form, history }, payload, 'POST')
}

export const CLEAR_SESSION = 'CLEAR_SESSION';
export function clearSession() {
    return { type: CLEAR_SESSION }
}