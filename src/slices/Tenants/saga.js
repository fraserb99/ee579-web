import { put, select, takeEvery } from "@redux-saga/core/effects";
import { GET_TENANTS } from "./actions";
import { selectCurrentTenant } from "./selectors";

function* setCurrentTenant(action) {
    const currentTenant = yield select(selectCurrentTenant);

    if (!currentTenant && action.payload.items) {
        yield put({
            type: 'SET_CURRENT_TENANT',
            payload: action.payload.items[0].id
        });
    }
}

function* makeListeners() {
    yield(takeEvery(x => x.type === 'SUCCESS' && x.meta.type === GET_TENANTS, setCurrentTenant));
}

export default makeListeners;