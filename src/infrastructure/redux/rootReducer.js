import { combineReducers } from "redux";
import { default as entities } from '../api/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import session from '../../slices/Session/reducer';
import { connectRouter } from "connected-react-router";

export const rootReducer = history => combineReducers({
    entities,
    session,
    toastr,
    router: connectRouter(history)
})