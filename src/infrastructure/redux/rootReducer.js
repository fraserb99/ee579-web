import { combineReducers } from "redux";
import { default as entities } from '../api/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import session from '../../slices/Login/reducer';

export const rootReducer = combineReducers({
    entities,
    session,
    toastr,
})