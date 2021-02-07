import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignInPage } from './slices/Login/SignInPage';
import { SignUpPage } from './slices/Login/SignUpPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/signin' component={SignInPage} />
          <Route path='/signup' component={SignUpPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
