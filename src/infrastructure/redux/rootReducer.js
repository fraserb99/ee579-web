import { combineReducers } from "redux";
import { default as entities } from '../api/reducer';
import { reducer as toastr } from 'react-redux-toastr';
import session from '../../slices/Session/reducer';
import { default as users } from '../../slices/Users/reducer';
import { default as tenants } from '../../slices/Tenants/reducer';
import { default as devices } from '../../slices/Devices/reducer';
import { default as devicegroups } from '../../slices/DeviceGroups/reducer';
import { connectRouter } from "connected-react-router";
import { default as deleteDialog } from '../../components/DeleteDialog/reducer';
import { default as snackbars } from '../../components/Snackbar/reducer';

export const rootReducer = history => combineReducers({
    entities,
    users,
    devices,
    devicegroups,
    tenants,
    session,
    toastr,
    deleteDialog,
    snackbars,
    router: connectRouter(history)
})