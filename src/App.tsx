// tslint:disable-next-line
/// <reference path='globals.d.ts' />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as StyleSheet from 'stilr';

import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import * as ReactGA from 'react-ga';

import Main from './containers/main';
import Landing from './containers/landing';
import About from './containers/about';

import Logger from './common/Logger';
import rootReducer from './reducers';
import './common.css';

declare var process: any;
const env = process.env.NODE_ENV;
const middlewares: Array<any> = [ thunk ];

if (env === 'dev') {
  middlewares.push(Logger);
}

const store = createStore(rootReducer, Map(), applyMiddleware(...middlewares));

ReactGA.initialize('UA-42294228-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/" component={Landing}/>
      <Route path="/app/:userId" component={Main}/>
      <Route path="/about" component={About}/>
    </Router>
  </Provider>,
  document.getElementById('content')
);

document.getElementById('stylesheet').textContent = StyleSheet.render();
