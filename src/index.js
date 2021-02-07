import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { rootReducer } from './infrastructure/redux/rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { setContentTypeMiddleware } from './infrastructure/api/setContentTypeMiddleware';
import { injectAuthMiddleware } from './infrastructure/api/injectAuthMiddleware';
import { apiMiddleware } from 'redux-api-middleware';
import normalizeApiResponseMiddleware from './infrastructure/api/normalizeApiResponseMiddleware';
import formErrorHandlingMiddleware from './infrastructure/api/formErrorHandlingMiddleware';
import { formatState } from './infrastructure/redux/core';
import { initialState } from './slices/Login/reducer';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const createStoreWithMiddleware = applyMiddleware(
  routerMiddleware(history),
  setContentTypeMiddleware,
  injectAuthMiddleware,
  apiMiddleware,
  normalizeApiResponseMiddleware,
  formErrorHandlingMiddleware,
  // sagaMiddleware,
  )(createStore);
const store = createStoreWithMiddleware(rootReducer(history), formatState(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
