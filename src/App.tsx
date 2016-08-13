// tslint:disable-next-line
/// <reference path="globals.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';

import Main from './containers/main';
import Logger from './common/Logger';
import rootReducer from './reducers';
import './common.css';

const store = createStore(rootReducer, Map(), applyMiddleware(Logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('content')
);
