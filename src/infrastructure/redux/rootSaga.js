import { all } from '@redux-saga/core/effects';
import session from '../../slices/Session/saga';


export function* rootSaga() {
	yield all([
        session()
    ])
}