import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { SignInPage } from './slices/Login/SignInPage';
import { SignUpPage } from './slices/Login/SignUpPage';

function App({history}) {
  console.log(history);
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route path='/signin' component={SignInPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/' exact component={SignUpPage} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
