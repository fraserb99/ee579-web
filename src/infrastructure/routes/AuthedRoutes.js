import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { AddDevicePage } from '../../slices/Devices/AddDevicePage';
import { RulesPage } from '../../slices/Rules/RulesPage';

export const AuthedRoutes = () => (
    <Switch>
        <Route path='/rules' component={RulesPage} />
        <Route path='/devices/add' component={AddDevicePage} />
    </Switch>
)