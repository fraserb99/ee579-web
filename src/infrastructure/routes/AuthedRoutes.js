import React, { useState } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { AddDevicePage } from '../../slices/Devices/AddDevicePage';
import { RulesPage } from '../../slices/Rules/RulesPage';
import { UsersPage } from '../../slices/Users/UsersPage';
import { DeleteDialog } from '../../components/DeleteDialog/DeleteDialog';
import { DeleteContext } from '../../components/DeleteDialog/DeleteContext';
import { useDeleteState } from '../../components/DeleteDialog/useDeleteState';
import { DevicesPage } from '../../slices/Devices/DevicesPage';

export const AuthedRoutes = () => {
    return (
        <>
            <Switch>
                <Route path='/rules' component={RulesPage} />
                <Route path='/devices' component={DevicesPage} />
                <Route path='/devices/add' component={AddDevicePage} />
                <Route path='/users' component={UsersPage} />
            </Switch>
            <DeleteDialog />
        </>
    )
}