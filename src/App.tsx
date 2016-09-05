// tslint:disable-next-line
/// <reference path='typings/globals.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as StyleSheet from 'stilr';

import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import * as ReactGA from 'react-ga';

import Main from './containers/main';
import Landing from './containers/landing';
import About from './containers/about';

import rootReducer from './reducers';
import './common.css';

declare var process: any;
const env = process.env.NODE_ENV;
const middlewares: Array<any> = [ thunk ];

if (env === 'dev') {
  middlewares.push(createLogger());
}

const store = createStore(rootReducer, Map(), applyMiddleware(...middlewares));
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state: Map<string, any>) => state.get('routing')
  });

ReactGA.initialize('UA-42294228-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={logPageView}>
      <Route path="/" component={Landing}/>
      <Route path="/home" component={Main}/>
      <Route path="/about" component={About}/>

      <Redirect from="/home/:x" to="/home"/>
    </Router>
  </Provider>,
  document.getElementById('content')
);

document.getElementById('stylesheet').textContent = StyleSheet.render();
