import { put, select, takeEvery } from "@redux-saga/core/effects";
import { CREATE_TENANT, GET_TENANTS, switchTenant } from "./actions";
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

function* tenantCreated(action) {
    yield put({
        type: 'RESET_ENTITIES',
        payload: {
            except: ['tenants']
        }
    });
    yield put(switchTenant(action.payload.items[0].id));
}

function* makeListeners() {
    yield(takeEvery(x => x.type === 'SUCCESS' && x.meta.type === GET_TENANTS, setCurrentTenant));

    yield(takeEvery(x => x.type === 'SUCCESS' && x.meta.type === CREATE_TENANT, tenantCreated));
}

export default makeListeners;