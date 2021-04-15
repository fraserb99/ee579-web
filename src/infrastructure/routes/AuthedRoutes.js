import React, { useState } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { AddDevicePage } from '../../slices/Devices/AddDevicePage';
import { RulesPage } from '../../slices/Rules/RulesPage';
import { UsersPage } from '../../slices/Users/UsersPage';
import { DeleteDialog } from '../../components/DeleteDialog/DeleteDialog';
import { DeleteContext } from '../../components/DeleteDialog/DeleteContext';
import { useDeleteState } from '../../components/DeleteDialog/useDeleteState';
import { DevicesPage } from '../../slices/Devices/DevicesPage';
import { DeviceGroupsPage } from '../../slices/DeviceGroups/DevicesPage';
import { AddRulePage } from '../../slices/Rules/forms/AddRulesPage';

export const AuthedRoutes = () => {
    return (
        <>
            <Switch>
                <Route path='/rules/add' component={AddRulePage} />
                <Route path='/rules' component={RulesPage} />
                <Route path='/devices' component={DevicesPage} />
                <Route path='/groups' component={DeviceGroupsPage} />
                <Route path='/users' component={UsersPage} />
            </Switch>
            <DeleteDialog />
        </>
    )
}