import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { SignInPage } from './slices/Session/SignInPage';
import { SignUpPage } from './slices/Session/SignUpPage';
import { NavContainer } from './components/Nav/NavContainer';

function App({history}) {
  console.log(history);
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route path='/signin' component={SignInPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/' component={NavContainer}>
              
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
