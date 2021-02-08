import { call, put, takeEvery } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { REQUEST_SIGNIN, REQUEST_SIGNUP } from "./actions";

function* signInSuccess(action) {
    console.log(action);
    yield put({
        type: 'SET_TOKENS',
        payload: action.payload
    });
    // yield put(getCurrentUser());
    const { history } = action.meta;
    if (action.meta.redirectUrl) {
        yield call(() => history.push(action.meta.redirectUrl));
    } else {
        yield call(() => history.push('/'));
    }
}

function* signInFailure(action) {
    console.log(action);
    // action.meta.form.setErrors({
    //     email: 'Invalid email or password',
    //     password: 'Invalid email or password'
    // })
}

function* makeListeners() {
    yield(takeEvery(x => x.type === 'SUCCESS' && [REQUEST_SIGNIN, REQUEST_SIGNUP].includes(x.meta.type), signInSuccess));
    // yield(takeEvery(x => x.type === 'SUCCESS' && [REQUEST_SIGNIN, REQUEST_SIGNUP].includes(x.meta.type), signInSuccess));

    yield(takeEvery(x => x.type === 'FAILURE' && x.meta.type === REQUEST_SIGNIN, signInFailure));
}

export default makeListeners;