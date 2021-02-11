import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignInPage } from './slices/Session/SignInPage';
import { SignUpPage } from './slices/Session/SignUpPage';
import { NavContainer } from './components/Nav/NavContainer';
import { RulesPage } from './slices/Rules/RulesPage';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route path='/signin' component={SignInPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/' component={NavContainer} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
