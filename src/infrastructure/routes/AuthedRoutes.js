import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { RulesPage } from '../../slices/Rules/RulesPage';

export const AuthedRoutes = () => (
    <Switch>
        <Route path='/rules' component={RulesPage} />
    </Switch>
)