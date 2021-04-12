import { combineReducers } from "redux";
import { default as entities } from '../api/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import session from '../../slices/Session/reducer';
import { default as users } from '../../slices/Users/reducer';
import { default as tenants } from '../../slices/Tenants/reducer';
import { connectRouter } from "connected-react-router";

export const rootReducer = history => combineReducers({
    entities,
    users,
    tenants,
    session,
    toastr,
    router: connectRouter(history)
})