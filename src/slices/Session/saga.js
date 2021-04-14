import { call, put, takeEvery } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { history } from "../..";
import { showErrorSnackbar } from "../../components/Snackbar/actions";
import { CLEAR_SESSION, EXTERNAL_SIGNIN, REQUEST_SIGNIN, REQUEST_SIGNUP } from "./actions";

function* signInSuccess(action) {
    yield put({
        type: 'SET_SESSION',
        payload: action.payload
    });
    // yield put(getCurrentUser());
    if (action.meta.redirectUrl) {
        yield call(() => history.push(action.meta.redirectUrl));
    } else {
        yield call(() => history.push('/'));
    }
}

function* signUpSuccess(action) {
    console.log(action);
    history.push('/account-created');
}

function* externalFailure() {
    history.push('/signin');
    yield put(showErrorSnackbar('There was a problem signing you in, please try again'));
}

function* makeListeners() {
    yield(takeEvery(x => x.type === 'SUCCESS' && [REQUEST_SIGNIN, EXTERNAL_SIGNIN].includes(x.meta.type), signInSuccess));
    // yield(takeEvery(x => x.type === 'SUCCESS' && [REQUEST_SIGNIN, REQUEST_SIGNUP].includes(x.meta.type), signInSuccess));
    yield(takeEvery(x => x.type === 'SUCCESS' && x.meta.type === REQUEST_SIGNUP, signUpSuccess));

    yield(takeEvery(x => x.type === 'FAILURE' && x.meta.type === EXTERNAL_SIGNIN, externalFailure));
}

export default makeListeners;