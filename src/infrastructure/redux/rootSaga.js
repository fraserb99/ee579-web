import { all } from '@redux-saga/core/effects';
import session from '../../slices/Login/saga';


export function* rootSaga() {
	yield all([
        session()
    ])
}