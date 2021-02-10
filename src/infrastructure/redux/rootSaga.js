import { all } from '@redux-saga/core/effects';
import session from '../../slices/Session/saga';
import tenants from '../../slices/Tenants/saga';


export function* rootSaga() {
	yield all([
        session(),
        tenants()
    ])
}