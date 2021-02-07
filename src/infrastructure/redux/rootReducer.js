import { combineReducers } from "@reduxjs/toolkit";
import { default as entities } from '../api/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import { connectRouter } from "connected-react-router";
import session from '../../slices/Login/reducer';

export const rootReducer = history => combineReducers({
    entities,
    session,
    toastr,
    router: connectRouter(history)
})