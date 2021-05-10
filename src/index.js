import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './infrastructure/redux/rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { setContentTypeMiddleware } from './infrastructure/api/setContentTypeMiddleware';
import { injectAuthMiddleware } from './infrastructure/api/injectAuthMiddleware';
import { apiMiddleware } from 'redux-api-middleware';
import normalizeApiResponseMiddleware from './infrastructure/api/normalizeApiResponseMiddleware';
import formErrorHandlingMiddleware from './infrastructure/api/formErrorHandlingMiddleware';
import { formatState } from './infrastructure/redux/core';
import { rootSaga } from './infrastructure/redux/rootSaga';
import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import { injectTenantMiddleware } from './infrastructure/api/injectTenantMiddleware';
import { createBrowserHistory } from 'history';

var existingStore = localStorage.getItem('store');

const initialState = existingStore ? 
  { session: new Map({ ...JSON.parse(existingStore).session, state: '' }) }
  :
  {};

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(
  routerMiddleware(history),
  setContentTypeMiddleware,
  injectAuthMiddleware,
  injectTenantMiddleware,
  apiMiddleware,
  normalizeApiResponseMiddleware,
  formErrorHandlingMiddleware,
  sagaMiddleware,
  )(createStore);
const store = createStoreWithMiddleware(rootReducer(history), initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  const state = store.getState();
  const session = state.session.set('state', '').toJS();
  localStorage.setItem('store', JSON.stringify({ session }));
});

sagaMiddleware.run(rootSaga);

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
